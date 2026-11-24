/* =========================================================
   SAKA GURU — Modul Generative AI "Ning Sula"
   - Mode Online : Google Gemini API (kunci API milik pengguna, disimpan di browser)
   - Mode Offline: bank kasus + umpan balik berbasis rubrik & kata kunci
   ========================================================= */
(function () {
  const LS = { key: "saka_gemini_key", model: "saka_gemini_model", suara: "saka_suara" };
  const DEFAULT_MODEL = "gemini-2.5-flash";
  const CADANGAN = ["gemini-flash-latest", "gemini-3.5-flash", "gemini-2.5-flash", "gemini-2.0-flash"];

  const PERSONA = `Anda adalah "Ning Sula", mentor AI di aplikasi SAKA GURU untuk mata kuliah Kepemimpinan Pendidikan (Prodi Pendidikan Agama Islam, Universitas Sunan Gresik), Minggu 10: Kepemimpinan dan Kerja Sama Tim.
Anda seorang perempuan; "Ning" adalah sapaan hormat dan akrab bagi perempuan muda di lingkungan pesantren Jawa Timur. Cara membimbing Anda mengikuti "sistem among" Ki Hajar Dewantara: asah, asih, asuh. Sapa mahasiswa dengan hangat seperti seorang kakak/ustadzah muda.
Cakupan materi: (1) konsep tim & kerja sama, (2) pembentukan tim efektif (Tuckman, Hackman), (3) pembagian tugas & tanggung jawab (RACI, Belbin, amanah), (4) koordinasi (Mintzberg, Malone & Crowston), (5) kolaborasi (PLC/komunitas belajar, lesson study, KKG/MGMP), (6) motivasi (Self-Determination Theory, Herzberg, niat), (7) membangun kepercayaan (Mayer-Davis-Schoorman, Lencioni, Edmondson), (8) kepemimpinan kolaboratif (distributed leadership Spillane/Harris, trilogi Ki Hajar Dewantara, syura), (9) evaluasi kinerja tim (Hackman, After Action Review, PDCA, Rapor Pendidikan).
Gaya: bahasa Indonesia yang hangat dan santun, sesekali sapaan Jawa ringan ("Monggo", "Nggih"). Gunakan contoh nyata di SD/MI, SMP/MTs, SMA/MA/SMK, dan pesantren, terutama konteks Gresik/Jawa Timur. Kaitkan dengan nilai Islam (amanah, syura, ta'awun, ikhlas, muhasabah) dan kearifan lokal (gotong royong, sambatan, rewang, gamelan, damar kurung Gresik, ajining diri saka lathi, mulat sarira) bila relevan.
Prinsip pedagogis: jangan langsung memberi semua jawaban; dorong analisis dan sintesis dengan pertanyaan pemantik. Jawaban ringkas (maks. ±200 kata) kecuali diminta. Sebut rujukan teori secara akurat (nama & tahun). Jika ragu terhadap suatu fakta, katakan terus terang. Jangan mengarang ayat atau hadis; kutip hanya yang sahih dan umum dikenal.`;

  const store = {
    get(k, d) { try { return localStorage.getItem(k) ?? d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  const AI = {
    persona: PERSONA,
    key() { return (store.get(LS.key, "") || "").trim(); },
    model() { return store.get(LS.model, DEFAULT_MODEL) || DEFAULT_MODEL; },
    online() { return !!this.key(); },
    simpan(key, model) { store.set(LS.key, (key || "").trim()); store.set(LS.model, (model || DEFAULT_MODEL).trim()); document.dispatchEvent(new CustomEvent("saka-ai-ubah")); },

    async gemini(contents, system, opts = {}) {
      // Coba model pilihan; bila tidak tersedia (404/deprecated) otomatis beralih ke model cadangan
      const daftar = [this.model(), ...CADANGAN.filter(m => m !== this.model())];
      let galat;
      for (const model of daftar) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": this.key() },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: system || PERSONA }] },
            contents,
            generationConfig: { temperature: opts.temperature ?? 0.8, maxOutputTokens: opts.max ?? 1400 }
          })
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          const parts = data.candidates?.[0]?.content?.parts || [];
          const txt = parts.filter(p => !p.thought).map(p => p.text || "").join("").trim();
          if (!txt) throw new Error("Respons kosong dari model.");
          if (model !== this.model()) store.set(LS.model, model);
          return txt;
        }
        galat = new Error((data.error && data.error.message) || ("HTTP " + res.status));
        if (!(res.status === 404 || /not found|not supported|deprecated/i.test(galat.message))) throw galat;
      }
      throw galat;
    },

    /* Antarmuka umum: kembalikan {teks, sumber:'gemini'|'offline'} */
    async tanya(prompt, { history = [], system, temperature, fallback } = {}) {
      if (this.online()) {
        try {
          const contents = history.map(h => ({ role: h.role === "user" ? "user" : "model", parts: [{ text: h.text }] }));
          contents.push({ role: "user", parts: [{ text: prompt }] });
          return { teks: await this.gemini(contents, system, { temperature }), sumber: "gemini" };
        } catch (e) {
          console.warn("Gemini gagal:", e);
          const f = fallback ? fallback() : Offline.chat(prompt);
          return { teks: `> ⚠️ AI daring gagal (${e.message}). Beralih ke mode offline.\n\n` + f, sumber: "offline" };
        }
      }
      return { teks: fallback ? fallback() : Offline.chat(prompt), sumber: "offline" };
    },

    /* --- fitur pedagogis --- */
    kasus(topikId, jenjang) {
      const t = SAKA.topik.find(x => x.id == topikId);
      const p = `Buat SATU studi kasus orisinal dan realistis tentang topik "${t.judul}" di jenjang ${jenjang} (Indonesia, sebaiknya konteks Gresik/Jawa Timur). Format Markdown:
### Judul kasus
Narasi 120–170 kata dengan tokoh bernama, konflik/masalah tim yang jelas, dan data sederhana (angka).
**Pertanyaan analisis:** 3 pertanyaan bertingkat (C4 menganalisis, C5 mengevaluasi, C6 mencipta solusi).
**Petunjuk teori:** sebutkan 1–2 teori relevan tanpa memberi jawaban.
Kaitkan halus dengan kearifan lokal "${t.lokal.nama}" atau nilai Islam.`;
      return this.tanya(p, { temperature: 0.95, fallback: () => Offline.kasus(topikId, jenjang) });
    },
    nilai(topikId, soal, jawaban) {
      const t = SAKA.topik.find(x => x.id == topikId);
      const p = `Topik: ${t.judul}. Pertanyaan/kasus: """${soal}"""
Jawaban mahasiswa: """${jawaban}"""
Beri umpan balik formatif dengan rubrik (skor 1–4 tiap kriteria):
1) Ketepatan konsep/teori, 2) Kedalaman analisis, 3) Kelayakan solusi kontekstual di sekolah/madrasah, 4) Integrasi nilai Islam & kearifan lokal.
Format Markdown: tabel ringkas skor, lalu **Kekuatan** (2 poin), **Perlu ditingkatkan** (2 poin), dan **Pertanyaan pemantik lanjutan** (1 pertanyaan). Gunakan bahasa yang menyemangati. Maks 230 kata.`;
      return this.tanya(p, { temperature: 0.4, fallback: () => Offline.nilai(topikId, jawaban) });
    },
    jelaskan(topikId, fokus, jenjang = "SD/MI") {
      const t = SAKA.topik.find(x => x.id == topikId);
      const p = `Jelaskan "${fokus}" (bagian dari topik ${t.judul}) dalam 90–130 kata dengan SATU contoh konkret di ${jenjang} dan satu pertanyaan refleksi pendek di akhir. Bahasa lisan yang enak didengar (akan dibacakan suara).`;
      return this.tanya(p, { temperature: 0.7, fallback: () => Offline.jelaskan(topikId, fokus) });
    }
  };

  /* ---------------- MODE OFFLINE ---------------- */
  const acak = a => a[Math.floor(Math.random() * a.length)];
  const Offline = {
    kasus(id, jenjang) {
      const t = SAKA.topik.find(x => x.id == id);
      const contoh = t.contoh.find(c => jenjang.startsWith(c.jenjang.split("/")[0])) || t.contoh[0];
      return `### Kasus ${t.judul}\n${acak(SAKA.kasusOffline[id])}\n\n_Tugas tambahan: adaptasikan analisis Anda untuk jenjang **${jenjang}**._\n\n**Konteks pembanding (${contoh.jenjang}):** ${contoh.teks.replace(/<[^>]+>/g, "")}\n\n**Pertanyaan analisis:**\n1. Identifikasi akar masalah tim dalam kasus ini (C4).\n2. Evaluasi tindakan pemimpin yang sudah/ belum dilakukan (C5).\n3. Rancang solusi langkah demi langkah yang menginternalisasi nilai **${t.lokal.nama}** dan ${t.dalil.sumber} (C6).\n\n_Mode offline: kasus diambil dari bank kasus. Aktifkan Gemini untuk kasus baru yang selalu berbeda._`;
    },
    nilai(id, jawaban) {
      const t = SAKA.topik.find(x => x.id == id);
      const j = (jawaban || "").toLowerCase();
      const kata = j.split(/\s+/).filter(Boolean).length;
      const ketemu = SAKA.kunci[id].filter(k => j.includes(k));
      const islam = ["amanah", "syura", "musyawarah", "ikhlas", "ta'awun", "taawun", "muhasabah", "niat", "adil", "qs", "hadis", "allah", "islam"].filter(k => j.includes(k));
      const lokal = ["gotong", "sambatan", "rewang", "gamelan", "kendang", "damar", "ki hajar", "tut wuri", "ing ngarsa", "ing madya", "mulat", "ajining", "gresik", "kearifan"].filter(k => j.includes(k));
      const solusi = ["langkah", "pertama", "kedua", "strategi", "rencana", "solusi", "program", "jadwal", "evaluasi"].filter(k => j.includes(k));
      const s1 = Math.min(4, 1 + Math.floor(ketemu.length / 1.5));
      const s2 = kata > 150 ? 4 : kata > 90 ? 3 : kata > 40 ? 2 : 1;
      const s3 = Math.min(4, 1 + solusi.length);
      const s4 = Math.min(4, 1 + islam.length + lokal.length);
      const tot = s1 + s2 + s3 + s4;
      const kurang = SAKA.kunci[id].filter(k => !ketemu.includes(k)).slice(0, 4);
      return `| Kriteria | Skor |\n|---|---|\n| Ketepatan konsep | ${s1}/4 |\n| Kedalaman analisis | ${s2}/4 |\n| Solusi kontekstual | ${s3}/4 |\n| Nilai Islam & kearifan lokal | ${s4}/4 |\n| **Total** | **${tot}/16** |\n\n**Kekuatan**\n- ${ketemu.length ? "Anda sudah memakai konsep kunci: " + ketemu.join(", ") + "." : "Anda sudah berani menuliskan pendapat — langkah awal yang baik."}\n- ${kata > 60 ? "Uraian cukup panjang untuk menunjukkan proses berpikir." : "Jawaban ringkas dan langsung."}\n\n**Perlu ditingkatkan**\n- Perkuat dengan istilah/teori: ${kurang.join(", ") || "rujukan teori dan tahun"}.\n- ${islam.length + lokal.length ? "Perdalam kaitan nilai dengan tindakan konkret." : `Kaitkan dengan nilai ${t.lokal.nama} dan ${t.dalil.sumber}.`}\n\n**Pertanyaan pemantik:** ${acak(t.diskusi)}\n\n_Mode offline: penilaian berbasis kata kunci & rubrik. Aktifkan Gemini untuk umpan balik yang lebih mendalam._`;
    },
    jelaskan(id, fokus) {
      const t = SAKA.topik.find(x => x.id == id);
      return `**${fokus}** — ${t.ringkas.replace(/<[^>]+>/g, "")}\n\nContoh: ${t.contoh[0].teks.replace(/<[^>]+>/g, "")}\n\n_Refleksi:_ ${t.diskusi[0]}`;
    },
    chat(msg) {
      const m = (msg || "").toLowerCase();
      let best = null, skor = 0;
      SAKA.topik.forEach(t => {
        const s = SAKA.kunci[t.id].filter(k => m.includes(k)).length + (m.includes(t.judul.toLowerCase().split(" ")[0]) ? 1 : 0);
        if (s > skor) { skor = s; best = t; }
      });
      if (!best) {
        return `Monggo, pertanyaan yang menarik. Dalam mode offline saya paling bisa membantu seputar 9 topik kerja sama tim: ${SAKA.topik.map(t => t.judul).join(", ")}.\n\nCoba sebut kata kunci, misalnya *"tahap Tuckman"*, *"RACI"*, *"Lencioni"*, atau *"lesson study"*.\n\n_Untuk percakapan bebas, aktifkan Gemini lewat tombol ⚙️._`;
      }
      return `**${best.ikon} ${best.judul}**\n\n${best.ringkas.replace(/<[^>]+>/g, "")}\n\n**Kearifan lokal — ${best.lokal.nama}:** ${best.lokal.isi}\n\n**Pertanyaan untuk Anda:** ${acak(best.diskusi)}\n\n_Mode offline. Aktifkan Gemini (⚙️) untuk dialog Sokratik yang lebih hidup._`;
    }
  };
  AI.offline = Offline;

  /* ---------------- Utilitas: Markdown sederhana ---------------- */
  function esc(s) { return s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function md(src) {
    const lines = esc(src || "").split(/\r?\n/);
    let html = "", list = null, table = [];
    const inline = s => s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/(^|[^*])\*(?!\s)(.+?)\*/g, "$1<i>$2</i>").replace(/_(.+?)_/g, "<i>$1</i>").replace(/`(.+?)`/g, "<code>$1</code>");
    const tutupList = () => { if (list) { html += `</${list}>`; list = null; } };
    const tutupTabel = () => {
      if (!table.length) return;
      const rows = table.filter(r => !/^\|?\s*:?-{2,}/.test(r));
      html += '<table style="border-collapse:collapse;width:100%;font-size:13.5px;margin:6px 0">' + rows.map((r, i) => "<tr>" + r.replace(/^\||\|$/g, "").split("|").map(c => `<${i ? "td" : "th"} style="border:1px solid #bae6fd;padding:5px 8px;text-align:left">${inline(c.trim())}</${i ? "td" : "th"}>`).join("") + "</tr>").join("") + "</table>";
      table = [];
    };
    for (const raw of lines) {
      const l = raw.trimEnd();
      if (/^\s*\|.*\|\s*$/.test(l)) { tutupList(); table.push(l.trim()); continue; } else tutupTabel();
      let m;
      if ((m = l.match(/^#{1,4}\s+(.*)/))) { tutupList(); html += `<h3>${inline(m[1])}</h3>`; }
      else if ((m = l.match(/^\s*[-*•]\s+(.*)/))) { if (list !== "ul") { tutupList(); html += "<ul>"; list = "ul"; } html += `<li>${inline(m[1])}</li>`; }
      else if ((m = l.match(/^\s*\d+[.)]\s+(.*)/))) { if (list !== "ol") { tutupList(); html += "<ol>"; list = "ol"; } html += `<li>${inline(m[1])}</li>`; }
      else if ((m = l.match(/^&gt;\s?(.*)/))) { tutupList(); html += `<p style="background:#fef3c7;border-radius:8px;padding:6px 10px">${inline(m[1])}</p>`; }
      else if (!l.trim()) { tutupList(); }
      else { tutupList(); html += `<p>${inline(l)}</p>`; }
    }
    tutupList(); tutupTabel();
    return html;
  }
  AI.md = md;

  /* ---------------- Suara (TTS) & pengenalan suara ---------------- */
  const Suara = {
    aktif() { return store.get(LS.suara, "1") === "1"; },
    set(v) { store.set(LS.suara, v ? "1" : "0"); },
    bersih(t) { return (t || "").replace(/<[^>]+>/g, " ").replace(/[#*_>|`]/g, " ").replace(/[؀-ۿݐ-ݿ]+/g, " ").replace(/\s+/g, " ").trim(); },
    bicara(t) {
      if (!("speechSynthesis" in window)) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(this.bersih(t).slice(0, 1800));
      u.lang = "id-ID"; u.rate = 1; u.pitch = 1;
      const v = speechSynthesis.getVoices().find(v => /id(-|_)ID/i.test(v.lang));
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    },
    diam() { if ("speechSynthesis" in window) speechSynthesis.cancel(); },
    dengar(cb, selesai) {
      const R = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!R) { toast("Peramban ini belum mendukung input suara. Coba Chrome di Android."); selesai && selesai(); return null; }
      const r = new R(); r.lang = "id-ID"; r.interimResults = false; r.maxAlternatives = 1;
      r.onresult = e => cb(e.results[0][0].transcript);
      r.onerror = () => toast("Suara tidak tertangkap, coba lagi.");
      r.onend = () => selesai && selesai();
      r.start(); return r;
    }
  };
  AI.suara = Suara;

  function toast(t) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = t; el.classList.add("tampil");
    clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("tampil"), 2600);
  }
  AI.toast = toast;

  /* ---------------- Widget Chat Ning Sula ---------------- */
  const MODE = {
    mentor: { label: "🧭 Mentor Sokratik", sys: PERSONA + "\nMode: MENTOR SOKRATIK. Bantu mahasiswa memahami dengan bertanya balik dan memberi contoh." },
    guruSenior: { label: "🎭 Roleplay: Pak Darto (guru senior skeptis)", sys: PERSONA + "\nMode: ROLEPLAY. Anda memerankan Pak Darto, guru senior 28 tahun mengajar di sebuah MTs di Gresik, skeptis terhadap program kerja tim baru ('dari dulu begini juga jalan'). Mahasiswa berperan sebagai kepala madrasah yang ingin mengajak Anda bergabung dalam tim. Tetap dalam karakter, bicara natural dengan sedikit logat Jawa Timur. Lunak HANYA jika mahasiswa menunjukkan empati, mendengar, memberi peran bermakna (otonomi), dan membangun kepercayaan. Setelah 6–8 giliran atau bila mahasiswa mengetik 'selesai', keluar dari karakter dan beri evaluasi singkat kepemimpinannya (skor 1–4: empati, kejelasan tujuan, pembagian peran, membangun kepercayaan)." },
    guruMuda: { label: "🎭 Roleplay: Bu Nisa (guru muda pasif)", sys: PERSONA + "\nMode: ROLEPLAY. Anda memerankan Bu Nisa, guru muda honorer di sebuah SD di Gresik, cerdas tetapi pasif di tim karena merasa idenya tidak dihargai dan beban kerja tidak adil. Mahasiswa berperan sebagai ketua tim/kepala sekolah. Tetap dalam karakter, jawab singkat dan agak ragu. Terbuka bila mahasiswa membangun rasa aman psikologis, apresiasi spesifik, dan pembagian tugas adil. Setelah 6–8 giliran atau bila mahasiswa mengetik 'selesai', keluar dari karakter dan beri evaluasi singkat (skor 1–4: rasa aman psikologis, motivasi SDT, keadilan tugas, komunikasi)." },
    waliMurid: { label: "🎭 Roleplay: Pak Haji Mansur (komite kritis)", sys: PERSONA + "\nMode: ROLEPLAY. Anda memerankan Pak Haji Mansur, ketua komite sekolah sebuah SMA di Gresik yang kritis karena program sekolah sering tidak terkoordinasi dan tidak transparan. Mahasiswa berperan sebagai kepala sekolah yang ingin mengajak komite berkolaborasi. Tetap dalam karakter, santun namun tegas. Setelah 6–8 giliran atau bila mahasiswa mengetik 'selesai', keluar dari karakter dan beri evaluasi (skor 1–4: transparansi, kolaborasi, koordinasi, integritas)." }
  };

  function pasangChat(opsi = {}) {
    if (document.querySelector(".chat")) return;
    const fab = document.createElement("button");
    fab.className = "fab"; fab.setAttribute("aria-label", "Buka Ning Sula");
    fab.innerHTML = `<span class="av">🧕🏽</span><span>Tanya Ning Sula</span>`;
    const chat = document.createElement("div");
    chat.className = "chat"; chat.setAttribute("role", "dialog");
    chat.innerHTML = `
      <div class="chat-head">
        <div class="atas"><div class="av">🧕🏽</div><div><b>Ning Sula</b><small class="status-ai"></small></div>
          <div class="ikon"><button data-a="suara" title="Suara">🔊</button><button data-a="setel" title="Pengaturan AI">⚙️</button><button data-a="tutup" title="Tutup">✕</button></div></div>
        <div class="chat-mode"><select aria-label="Mode percakapan">${Object.entries(MODE).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join("")}</select><button class="btn btn-kecil btn-putih" data-a="baru" style="padding:6px 10px">↺ Baru</button></div>
      </div>
      <div class="chat-body" aria-live="polite"></div>
      <div class="saran"></div>
      <div class="chat-in"><button data-a="mic" title="Bicara">🎙️</button><textarea placeholder="Tulis pertanyaan…"></textarea><button class="kirim" data-a="kirim" title="Kirim">➤</button></div>`;
    document.body.append(fab, chat);
    pasangSetelan();

    const body = chat.querySelector(".chat-body"), ta = chat.querySelector("textarea"), sel = chat.querySelector("select"), saran = chat.querySelector(".saran");
    let riwayat = [];
    const status = () => {
      chat.querySelector(".status-ai").innerHTML = AI.online() ? `Gemini · ${AI.model()} · daring` : "Mode offline · aktifkan AI di ⚙️";
      chat.querySelector('[data-a="suara"]').textContent = Suara.aktif() ? "🔊" : "🔇";
    };
    status(); document.addEventListener("saka-ai-ubah", status);

    function tambah(role, teks) {
      const d = document.createElement("div");
      d.className = "msg " + (role === "user" ? "user" : "ai");
      d.innerHTML = role === "user" ? esc(teks) : md(teks);
      if (role !== "user") {
        const b = document.createElement("button"); b.className = "spk"; b.textContent = "🔊 Dengarkan";
        b.onclick = () => Suara.bicara(teks); d.appendChild(b);
      }
      body.appendChild(d); body.scrollTop = body.scrollHeight; return d;
    }
    function sapa() {
      body.innerHTML = ""; riwayat = [];
      const m = sel.value;
      const salam = m === "mentor"
        ? `Assalamu'alaikum, monggo pinarak. Saya **Ning Sula**, teman belajar Anda untuk **Kepemimpinan & Kerja Sama Tim**.\n\nAnda bisa bertanya tentang 9 saka (topik), meminta contoh di sekolah, atau berlatih *roleplay* menghadapi rekan kerja yang sulit (pilih di menu atas).`
        : `**${MODE[m].label.replace("🎭 Roleplay: ", "")}** siap diajak bicara. Anda berperan sebagai **kepala sekolah/ketua tim**. Mulailah membuka percakapan. Ketik **selesai** untuk meminta evaluasi.`;
      tambah("ai", salam);
      const s = m === "mentor" ? ["Apa beda tim dan kelompok?", "Jelaskan tahap Tuckman dengan contoh MI", "Buatkan RACI untuk peringatan Maulid", "Apa itu piramida Lencioni?"] : ["Assalamu'alaikum, Pak/Bu, boleh minta waktunya sebentar?", "selesai"];
      saran.innerHTML = s.map(x => `<button>${esc(x)}</button>`).join("");
      saran.querySelectorAll("button").forEach(b => b.onclick = () => kirim(b.textContent));
    }
    async function kirim(teks) {
      teks = (teks ?? ta.value).trim(); if (!teks) return;
      ta.value = ""; tambah("user", teks); saran.innerHTML = "";
      const tunggu = tambah("ai", ""); tunggu.innerHTML = '<span class="memuat"><i></i><i></i><i></i></span>';
      let fallback;
      if (sel.value !== "mentor") fallback = () => "Mode roleplay memerlukan AI daring (Gemini). Buka ⚙️ untuk memasukkan kunci API gratis Anda. Sementara itu, gunakan **Mentor Sokratik** dalam mode offline.";
      const r = await AI.tanya(teks, { history: riwayat, system: MODE[sel.value].sys, fallback });
      tunggu.remove(); tambah("ai", r.teks);
      riwayat.push({ role: "user", text: teks }, { role: "model", text: r.teks });
      if (riwayat.length > 24) riwayat = riwayat.slice(-24);
      if (Suara.aktif()) Suara.bicara(r.teks);
    }
    AI.kirimKeChat = (t, buka = true) => { if (buka) bukaChat(); sel.value = "mentor"; setTimeout(() => kirim(t), 150); };

    function bukaChat() { chat.classList.add("buka"); fab.style.display = "none"; if (!body.children.length) sapa(); setTimeout(() => ta.focus(), 100); }
    fab.onclick = bukaChat; AI.bukaChat = bukaChat;
    sel.onchange = sapa;
    let rek = null;
    chat.addEventListener("click", e => {
      const a = e.target.closest("[data-a]")?.dataset.a; if (!a) return;
      if (a === "tutup") { chat.classList.remove("buka"); fab.style.display = ""; Suara.diam(); }
      if (a === "kirim") kirim();
      if (a === "baru") sapa();
      if (a === "setel") bukaSetelan();
      if (a === "suara") { Suara.set(!Suara.aktif()); if (!Suara.aktif()) Suara.diam(); status(); toast(Suara.aktif() ? "Suara Ning Sula aktif" : "Suara dimatikan"); }
      if (a === "mic") {
        const b = e.target.closest("button");
        if (rek) { rek.stop(); return; }
        b.classList.add("rekam");
        rek = Suara.dengar(t => kirim(t), () => { b.classList.remove("rekam"); rek = null; });
      }
    });
    ta.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); kirim(); } });
    if (opsi.buka) bukaChat();
  }

  /* ---------------- Modal Pengaturan ---------------- */
  function pasangSetelan() {
    if (document.querySelector(".setel")) return;
    const s = document.createElement("div"); s.className = "setel";
    s.innerHTML = `<div class="isi" role="dialog" aria-label="Pengaturan AI">
      <h3 style="margin:0 0 4px;color:#0c4a6e">⚙️ Pengaturan Generative AI</h3>
      <p style="margin:0;color:#335f7d;font-size:14px">Ning Sula memakai <b>Google Gemini</b>. Tanpa kunci API, aplikasi tetap berjalan dalam <b>mode offline</b> (bank kasus + umpan balik berbasis rubrik).</p>
      <label for="kunci">Kunci API Gemini</label>
      <input id="kunci" type="password" placeholder="AIza…" autocomplete="off">
      <label for="model">Model</label>
      <input id="model" type="text" placeholder="${DEFAULT_MODEL}">
      <div class="catatan">Cara mendapat kunci gratis: buka <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a> → <i>Create API key</i> → salin & tempel di sini.<br>🔒 Kunci hanya disimpan di peramban Anda (localStorage) dan dikirim langsung ke Google — tidak ke server lain.</div>
      <div class="baris" style="margin-top:14px;justify-content:flex-end">
        <button class="btn btn-kecil btn-hantu" data-s="hapus">Hapus kunci</button>
        <button class="btn btn-kecil btn-putih" data-s="uji">Uji koneksi</button>
        <button class="btn btn-kecil btn-primer" data-s="simpan">Simpan</button>
        <button class="btn btn-kecil btn-putih" data-s="tutup">Tutup</button>
      </div>
      <div class="hasil-uji catatan" style="display:none"></div></div>`;
    document.body.appendChild(s);
    s.addEventListener("click", async e => {
      if (e.target === s) s.classList.remove("buka");
      const a = e.target.dataset.s; if (!a) return;
      const k = s.querySelector("#kunci").value, m = s.querySelector("#model").value || DEFAULT_MODEL, h = s.querySelector(".hasil-uji");
      if (a === "tutup") s.classList.remove("buka");
      if (a === "hapus") { AI.simpan("", m); s.querySelector("#kunci").value = ""; toast("Kunci dihapus — mode offline"); }
      if (a === "simpan") { AI.simpan(k, m); s.classList.remove("buka"); toast(k ? "AI daring aktif ✓" : "Mode offline"); }
      if (a === "uji") {
        AI.simpan(k, m); h.style.display = "block"; h.textContent = "Menguji…";
        try { const t = await AI.gemini([{ role: "user", parts: [{ text: "Jawab satu kalimat: siapa Ki Hajar Dewantara?" }] }], "Jawab singkat dalam bahasa Indonesia.", { max: 200 }); h.innerHTML = "✅ Berhasil: " + esc(t); }
        catch (err) { h.innerHTML = "❌ Gagal: " + esc(err.message) + "<br>Periksa kunci API atau ganti nama model (mis. gemini-2.5-flash, gemini-3.5-flash, atau gemini-flash-latest)."; }
      }
    });
  }
  function bukaSetelan() {
    pasangSetelan();
    const s = document.querySelector(".setel");
    s.querySelector("#kunci").value = AI.key(); s.querySelector("#model").value = AI.model();
    s.classList.add("buka");
  }
  AI.pasangChat = pasangChat; AI.bukaSetelan = bukaSetelan; AI.esc = esc;
  window.SakaAI = AI;
})();

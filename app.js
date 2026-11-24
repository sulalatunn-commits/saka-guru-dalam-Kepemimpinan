/* SAKA GURU — logika halaman utama */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const AI = window.SakaAI, D = window.SAKA, esc = AI.esc;
  const LSP = "saka_progres";
  const prog = (() => { try { return JSON.parse(localStorage.getItem(LSP)) || {}; } catch (e) { return {}; } })();
  const simpanProg = () => { try { localStorage.setItem(LSP, JSON.stringify(prog)); } catch (e) {} renderGrid(); };
  const selesai = id => prog[id] && prog[id].coba && prog[id].refleksi;
  const tautan3D = { 2: ["ar.html?m=tuckman", "📱 Lihat Tangga Tuckman di AR"], 4: ["ar.html?m=gamelan", "📱 Mainkan Gamelan Tim di AR"], 7: ["ar.html?m=lencioni", "📱 Bangun Piramida Lencioni di AR"] };

  $("#subcpmk").textContent = D.meta.subcpmk + " Indikator: " + D.meta.indikator;

  /* ---------- Grid topik ---------- */
  function renderGrid() {
    $("#grid").innerHTML = D.topik.map(t => `
      <button class="kartu ${selesai(t.id) ? "selesai" : ""}" data-id="${t.id}">
        <span class="no">${t.id}</span>
        <div class="ik">${t.ikon}</div>
        <h3>${t.judul}</h3>
        <p>${t.ringkas.replace(/<[^>]+>/g, "").slice(0, 118)}…</p>
        <div class="lok">🏮 ${t.lokal.nama}</div>
      </button>`).join("");
    const n = D.topik.filter(t => selesai(t.id)).length;
    $("#bar").style.width = (n / 9 * 100) + "%"; $("#persen").textContent = n + "/9";
    $$("#grid .kartu").forEach(k => k.onclick = () => buka(+k.dataset.id));
  }
  renderGrid();

  /* ---------- Modal ---------- */
  let T = null;
  function buka(id, tab = "pahami") {
    T = D.topik.find(t => t.id === id);
    $("#m-saka").textContent = `Saka ${T.id} dari 9 · ${T.lokal.nama}`;
    $("#m-judul").textContent = `${T.ikon} ${T.judul}`;
    const t3 = tautan3D[T.id] || [`vr.html?t=${T.id}`, "🥽 Lihat di Pendopo VR"];
    const p = prog[T.id] || {};
    $("#m-body").innerHTML = `
      <div class="tab" data-isi="pahami">
        <div class="kotak"><p style="margin-top:0">${T.ringkas}</p>
          <div class="aksi"><button class="btn btn-kecil btn-putih" data-dengar>🔊 Dengarkan</button><a class="btn btn-kecil btn-primer" href="${t3[0]}">${t3[1]}</a><button class="btn btn-kecil btn-putih" data-tanya>🧕🏽 Tanya Ning Sula</button></div></div>
        <div class="kotak"><h4>Poin kunci</h4><ul>${T.poin.map(x => `<li>${x}</li>`).join("")}</ul></div>
        <div class="kotak sumber"><h4>Rujukan</h4><ul>${T.sumber.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>
      <div class="tab" data-isi="hayati">
        <div class="kotak lokal"><div class="lambang">🏮</div><div><h4>Kearifan Lokal: ${T.lokal.nama} <span class="chip">${T.lokal.asal}</span></h4><p style="margin:0">${T.lokal.isi}</p></div></div>
        <div class="kotak dalil"><div class="arab">${T.dalil.ar}</div><p class="arti">${T.dalil.arti}</p><div class="sumber-dalil">${T.dalil.sumber}</div></div>
        <div class="kotak"><h4>💭 Renungkan</h4><p style="margin:0">Bagaimana nilai <b>${T.lokal.nama}</b> dan pesan ${T.dalil.sumber} dapat menjadi <i>budaya kerja</i> tim di sekolah/madrasah — bukan sekadar slogan di dinding?</p></div>
      </div>
      <div class="tab" data-isi="contoh">
        <div class="jenjang">${T.contoh.map(c => `<div class="kotak"><span class="lbl">${c.jenjang}</span><p style="margin:0">${c.teks}</p></div>`).join("")}</div>
        <div class="kotak" style="margin-top:14px"><h4>Pertanyaan diskusi (HOTS)</h4><ol>${T.diskusi.map(d => `<li>${d}</li>`).join("")}</ol></div>
      </div>
      <div class="tab" data-isi="coba"><div class="kotak" id="akt"></div></div>
      <div class="tab" data-isi="analisis">
        <div class="kotak">
          <div class="baris" style="justify-content:space-between"><h4 style="margin:0">🧠 Laboratorium Kasus AI</h4><span class="chip ${AI.online() ? "on" : "off"}">${AI.online() ? "Gemini daring" : "Mode offline"}</span></div>
          <p style="margin:8px 0 12px;color:#335f7d">Langkah: (1) bangkitkan kasus untuk jenjang pilihan, (2) tulis analisis & solusi Anda, (3) dapatkan umpan balik berbasis rubrik dari Ning Sula.</p>
          <div class="baris"><select class="input" id="jenjang" style="max-width:240px"><option>SD/MI</option><option>SMP/MTs</option><option>SMA/MA/SMK</option><option>Pondok Pesantren</option></select>
            <button class="btn btn-primer btn-kecil" id="b-kasus">✨ Bangkitkan Kasus</button>
            ${AI.online() ? "" : '<button class="btn btn-hantu btn-kecil" data-setel>⚙️ Aktifkan Gemini</button>'}</div>
          <div class="ai-out" id="o-kasus"></div>
          <label style="display:block;font-weight:700;margin:16px 0 6px">Analisis & solusi Anda</label>
          <textarea id="jawab" rows="6" placeholder="Tulis diagnosis masalah, teori yang relevan, langkah solusi, dan kaitan nilai Islam/kearifan lokal…">${esc(p.jawab || "")}</textarea>
          <div class="aksi"><button class="btn btn-primer btn-kecil" id="b-nilai">📋 Nilai Analisis Saya</button><button class="btn btn-putih btn-kecil" id="b-dengar-fb" style="display:none">🔊 Dengarkan umpan balik</button></div>
          <div class="ai-out" id="o-nilai"></div>
        </div>
      </div>
      <div class="tab" data-isi="refleksi">
        <div class="kotak"><h4>📝 Refleksi (3-2-1)</h4><p style="margin:0 0 10px;color:#335f7d">Tuliskan: <b>3</b> hal yang saya pelajari, <b>2</b> hal yang akan saya terapkan di sekolah/madrasah, <b>1</b> pertanyaan yang masih tersisa.</p>
          <textarea id="refleksi" rows="7">${esc(p.refleksiTeks || "")}</textarea>
          <div class="aksi"><button class="btn btn-primer btn-kecil" id="b-ref">💾 Simpan Refleksi</button>${T.id < 9 ? `<button class="btn btn-putih btn-kecil" id="b-lanjut">Saka berikutnya →</button>` : ""}</div></div>
      </div>`;
    renderAktivitas();
    pasangTab(tab);
    $("#modal").classList.add("buka"); $("#modal").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    $("[data-dengar]").onclick = () => AI.suara.bicara(T.judul + ". " + T.ringkas + ". " + T.poin.join(". "));
    $("[data-tanya]").onclick = () => AI.kirimKeChat(`Jelaskan topik "${T.judul}" dengan contoh di madrasah, lalu beri saya satu pertanyaan pemantik.`);
    const st = $("[data-setel]"); if (st) st.onclick = () => AI.bukaSetelan();
    $("#b-kasus").onclick = async () => {
      const o = $("#o-kasus"); o.classList.add("tampil"); o.innerHTML = '<span class="memuat"><i></i><i></i><i></i></span> Ning Sula sedang menyusun kasus…';
      const r = await AI.kasus(T.id, $("#jenjang").value); o.innerHTML = AI.md(r.teks); o.dataset.kasus = r.teks;
    };
    $("#b-nilai").onclick = async () => {
      const j = $("#jawab").value.trim();
      if (j.split(/\s+/).length < 15) { AI.toast("Tulis analisis minimal ±15 kata dulu, nggih."); return; }
      const soal = $("#o-kasus").dataset.kasus || T.diskusi[0];
      const o = $("#o-nilai"); o.classList.add("tampil"); o.innerHTML = '<span class="memuat"><i></i><i></i><i></i></span> Menilai dengan rubrik…';
      const r = await AI.nilai(T.id, soal, j); o.innerHTML = AI.md(r.teks);
      prog[T.id] = { ...(prog[T.id] || {}), analisis: true, jawab: j }; simpanProg();
      const b = $("#b-dengar-fb"); b.style.display = ""; b.onclick = () => AI.suara.bicara(r.teks);
    };
    $("#b-ref").onclick = () => {
      const v = $("#refleksi").value.trim();
      if (v.length < 30) { AI.toast("Refleksi masih terlalu singkat."); return; }
      prog[T.id] = { ...(prog[T.id] || {}), refleksi: true, refleksiTeks: v }; simpanProg();
      AI.toast(selesai(T.id) ? `Saka ${T.id} tuntas! ✓` : "Refleksi tersimpan. Selesaikan juga tab 🧩 Coba."); tandaiTab();
    };
    const l = $("#b-lanjut"); if (l) l.onclick = () => buka(T.id + 1);
    tandaiTab();
  }
  function tandaiTab() {
    const p = prog[T.id] || {};
    $$("#m-tabs button").forEach(b => {
      const k = b.dataset.tab; b.textContent = b.textContent.replace(" ✓", "");
      if ((k === "coba" && p.coba) || (k === "analisis" && p.analisis) || (k === "refleksi" && p.refleksi)) b.textContent += " ✓";
    });
  }
  function pasangTab(nama) {
    $$("#m-tabs button").forEach(b => { b.classList.toggle("aktif", b.dataset.tab === nama); b.onclick = () => pasangTab(b.dataset.tab); });
    $$("#m-body .tab").forEach(t => t.classList.toggle("aktif", t.dataset.isi === nama));
  }
  function tutup() { $("#modal").classList.remove("buka"); $("#modal").setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; AI.suara.diam(); }
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal" || e.target.closest("[data-tutup]")) tutup(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") tutup(); });

  /* ---------- Aktivitas ---------- */
  const acakUrut = a => { const b = a.map((x, i) => ({ x, i })); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  function lulus(pesan) {
    prog[T.id] = { ...(prog[T.id] || {}), coba: true }; simpanProg(); tandaiTab();
    AI.toast(pesan || "Aktivitas tuntas ✓");
  }
  function renderAktivitas() {
    const A = T.aktivitas, el = $("#akt");
    let html = `<h4>🧩 ${A.judul}</h4><p style="margin:0 0 8px;color:#335f7d">${A.instruksi}</p>`;
    if (A.tipe === "pasang") {
      html += A.item.map((it, i) => `<div class="akt-item" data-i="${i}"><span>${it.t}</span><select aria-label="Jawaban ${i + 1}"><option value="">— pilih —</option>${A.opsi.map(o => `<option>${o}</option>`).join("")}</select></div>`).join("");
      html += `<div class="aksi"><button class="btn btn-primer btn-kecil" id="cek">Periksa</button></div><div class="umpan" id="umpan"></div>`;
      el.innerHTML = html;
      $("#cek").onclick = () => {
        let b = 0;
        $$(".akt-item", el).forEach(r => { const it = A.item[r.dataset.i], v = $("select", r).value; const ok = v === it.k; b += ok; r.classList.toggle("benar", ok); r.classList.toggle("salah", !ok); });
        const u = $("#umpan"); u.classList.add("tampil");
        u.innerHTML = b === A.item.length ? `🎉 <b>Sempurna ${b}/${A.item.length}!</b> Anda mampu membedakan konsep dengan tepat.` : `<b>${b}/${A.item.length} benar.</b> Perhatikan item merah, baca kembali tab 👁️ Pahami, lalu coba lagi.`;
        if (b === A.item.length) lulus();
      };
    } else if (A.tipe === "urut") {
      let urut = acakUrut(A.item);
      const gambar = () => {
        $("#urut-list").innerHTML = urut.map((o, k) => `<div class="akt-item"><span><b>${k + 1}.</b> ${o.x.replace(/\s*\((Forming|Storming|Norming|Performing|Adjourning)\)/, "")}</span><span class="urut-btn"><button data-n="${k}" data-d="-1" aria-label="Naik">▲</button><button data-n="${k}" data-d="1" aria-label="Turun">▼</button></span></div>`).join("");
        $$("#urut-list button").forEach(b => b.onclick = () => { const n = +b.dataset.n, d = +b.dataset.d, m = n + d; if (m < 0 || m >= urut.length) return; [urut[n], urut[m]] = [urut[m], urut[n]]; gambar(); });
      };
      el.innerHTML = html + `<div id="urut-list"></div><div class="aksi"><button class="btn btn-primer btn-kecil" id="cek">Periksa urutan</button><button class="btn btn-putih btn-kecil" id="acak">↺ Acak ulang</button></div><div class="umpan" id="umpan"></div>`;
      gambar();
      $("#acak").onclick = () => { urut = acakUrut(A.item); gambar(); $("#umpan").classList.remove("tampil"); };
      $("#cek").onclick = () => {
        const rows = $$("#urut-list .akt-item"); let b = 0;
        urut.forEach((o, k) => { const ok = o.i === k; b += ok; rows[k].classList.toggle("benar", ok); rows[k].classList.toggle("salah", !ok); });
        const u = $("#umpan"); u.classList.add("tampil");
        u.innerHTML = b === urut.length ? `🎉 <b>Urutan tepat!</b> ${A.item.map(x => (x.match(/\((Forming|Storming|Norming|Performing|Adjourning)\)/) || [])[1] || x.split(" — ")[0].replace(/\s*\(.*$/, "")).join(" → ")}` : `<b>${b}/${urut.length} posisi tepat.</b> Gunakan tombol ▲▼ untuk memperbaiki.`;
        if (b === urut.length) lulus();
      };
    } else if (A.tipe === "kasus") {
      el.innerHTML = html + `<div class="kotak" style="background:#f0f9ff">${A.soal}</div>` + A.pilihan.map((p, i) => `<button class="pil" data-i="${i}">${String.fromCharCode(65 + i)}. ${p.t}</button>`).join("") + `<div class="umpan" id="umpan"></div>`;
      $$(".pil", el).forEach(b => b.onclick = () => {
        const p = A.pilihan[b.dataset.i]; $$(".pil", el).forEach(x => x.classList.remove("benar", "salah")); b.classList.add(p.ok ? "benar" : "salah");
        const u = $("#umpan"); u.classList.add("tampil"); u.innerHTML = (p.ok ? "✅ " : "❌ ") + p.fb; if (p.ok) lulus();
      });
    }
  }

  /* ---------- Arisan diskusi ---------- */
  const semuaQ = D.topik.flatMap(t => t.diskusi.map(q => ({ t, q })));
  let terpilih = null, sisa = 300, jalan = null;
  function kocok() {
    const g = $("#gelas"); g.classList.remove("kocok"); void g.offsetWidth; g.classList.add("kocok");
    setTimeout(() => {
      terpilih = semuaQ[Math.floor(Math.random() * semuaQ.length)];
      const nk = Math.max(2, Math.min(12, +$("#nkel").value || 6));
      $("#arisan-topik").textContent = `${terpilih.t.ikon} Saka ${terpilih.t.id}: ${terpilih.t.judul}`;
      $("#arisan-kel").textContent = `Kelompok ${1 + Math.floor(Math.random() * nk)} menjawab`;
      $("#arisan-q").textContent = terpilih.q;
    }, 900);
  }
  $("#gelas").onclick = kocok; $("#kocok").onclick = kocok;
  $("#gelas").onkeydown = e => { if (e.key === "Enter" || e.key === " ") kocok(); };
  const fmt = s => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  $("#t-mulai").onclick = () => {
    if (jalan) { clearInterval(jalan); jalan = null; $("#t-mulai").textContent = "▶ Lanjut"; return; }
    $("#t-mulai").textContent = "⏸ Jeda";
    jalan = setInterval(() => { sisa--; $("#timer").textContent = fmt(Math.max(0, sisa)); if (sisa <= 0) { clearInterval(jalan); jalan = null; AI.toast("⏰ Waktu diskusi habis — saatnya presentasi!"); $("#t-mulai").textContent = "▶ Mulai diskusi"; } }, 1000);
  };
  $("#t-reset").onclick = () => { clearInterval(jalan); jalan = null; sisa = 300; $("#timer").textContent = "05:00"; $("#t-mulai").textContent = "▶ Mulai diskusi"; };
  $("#arisan-ai").onclick = () => {
    if (!terpilih) { AI.toast("Kocok dulu pertanyaannya 🎲"); return; }
    AI.kirimKeChat(`Untuk diskusi kelas tentang "${terpilih.t.judul}", pertanyaannya: "${terpilih.q}". Beri 3 pertanyaan pemantik bertingkat dan satu mini-kasus singkat di madrasah agar diskusi kelompok lebih hidup.`);
  };

  /* ---------- Kuis ---------- */
  let qi = 0, skor = 0, jw = [];
  function kuis() {
    const K = D.kuis, el = $("#kuis");
    if (qi >= K.length) {
      const n = Math.round(skor / K.length * 100);
      el.innerHTML = `<div style="text-align:center"><div class="skor">${n}</div><p>Benar ${skor} dari ${K.length} soal</p>
        ${n >= 75 ? `<div class="lencana"><span style="font-size:52px">🏅</span><b style="color:#0369a1">Pemimpin Kolaboratif</b><small>SAKA GURU · Minggu 10</small></div>` : `<p>Belum mencapai 75. Pelajari kembali saka yang terlewat, lalu ulangi, nggih.</p>`}
        <div class="aksi" style="justify-content:center;margin-top:16px"><button class="btn btn-primer" id="ulang">↺ Ulangi</button></div>
        <details style="text-align:left;margin-top:18px"><summary style="cursor:pointer;font-weight:700">Lihat pembahasan</summary><ol>${K.map((q, i) => `<li style="margin:8px 0">${q.q}<br><b style="color:${jw[i] === q.a ? "#047857" : "#be123c"}">${jw[i] === q.a ? "✓" : "✗"} Kunci: ${q.o[q.a]}</b></li>`).join("")}</ol></details></div>`;
      $("#ulang").onclick = () => { qi = 0; skor = 0; jw = []; kuis(); };
      return;
    }
    const q = K[qi];
    el.innerHTML = `<div class="baris" style="justify-content:space-between"><span class="chip">Soal ${qi + 1} / ${K.length}</span><span class="chip">Skor: ${skor}</span></div>
      <div class="bar" style="width:100%;margin:12px 0"><i style="width:${qi / K.length * 100}%"></i></div>
      <p class="kuis-q">${q.q}</p>${q.o.map((o, i) => `<button class="pil" data-i="${i}">${String.fromCharCode(65 + i)}. ${o}</button>`).join("")}`;
    $$(".pil", el).forEach(b => b.onclick = () => {
      const i = +b.dataset.i; jw[qi] = i;
      $$(".pil", el).forEach(x => x.disabled = true);
      b.classList.add(i === q.a ? "benar" : "salah"); $$(".pil", el)[q.a].classList.add("benar");
      if (i === q.a) skor++;
      setTimeout(() => { qi++; kuis(); }, 900);
    });
  }
  kuis();

  /* ---------- AI ---------- */
  AI.pasangChat();
  $("#hero-ai").onclick = () => AI.bukaChat();
  $("#mode-ai").onclick = () => AI.bukaChat();
  $("#nav-ai").onclick = e => { e.preventDefault(); AI.bukaSetelan(); };

  /* Deep link: index.html#topik-3 */
  const m = location.hash.match(/topik-(\d)/); if (m) buka(+m[1]);
})();

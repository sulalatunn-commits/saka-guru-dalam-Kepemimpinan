/* SAKA GURU — Meja AR: Piramida Lencioni, Tangga Tuckman, Gamelan Tim */
(function () {
  const AI = window.SakaAI, $ = s => document.querySelector(s);
  const scene = $("#scene"), info = $("#info"), aksi = $("#aksi");
  const FONT = '"Plus Jakarta Sans", system-ui, sans-serif';
  const el = (tag, attrs, parent) => { const e = document.createElement(tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
  let nKv = 0;
  function kanvas(w, h, f) { const c = document.createElement("canvas"); c.id = "kv-ar-" + (nKv++); c.width = w; c.height = h; f(c.getContext("2d"), w, h); return c; }
  function tekstur(e, c) { e.setAttribute("material", { shader: "flat", side: "double", transparent: true, color: "#ffffff", src: c }); }
  function label(parent, teks, sub, pos, w = .5, warna = "#0c4a6e") {
    const p = el("a-plane", { width: w, height: w * .25, position: pos, material: "shader: flat; side: double; transparent: true" }, parent);
    tekstur(p, kanvas(512, 128, (g, W, H) => {
      g.fillStyle = "rgba(255,255,255,.94)"; g.beginPath(); g.roundRect ? g.roundRect(3, 3, W - 6, H - 6, 28) : g.rect(3, 3, W - 6, H - 6); g.fill();
      g.strokeStyle = "#7dd3fc"; g.lineWidth = 4; g.stroke();
      g.fillStyle = warna; g.textAlign = "center"; let fs = sub ? 40 : 46; do { g.font = `800 ${fs}px ${FONT}`; fs -= 2; } while (g.measureText(teks).width > W - 40 && fs > 16); g.fillText(teks, W / 2, sub ? 58 : 78);
      if (sub) { g.fillStyle = "#335f7d"; g.font = `600 28px ${FONT}`; g.fillText(sub, W / 2, 100); }
    }));
    return p;
  }
  let modelAktif = "lencioni", bagianAktif = null;

  function tampilInfo(b) {
    bagianAktif = b;
    info.innerHTML = `<button class="x" aria-label="Tutup">✕</button><span class="eyebrow">${b.eyebrow}</span><h3>${b.judul}</h3>
      <p style="margin:0 0 8px;font-size:14px">${b.isi}</p>
      ${b.solusi ? `<div class="kotak" style="padding:10px 12px;margin:8px 0;font-size:13.5px"><b>🧭 Peran pemimpin:</b> ${b.solusi}</div>` : ""}
      ${b.sekolah ? `<div class="kotak lokal" style="padding:10px 12px;margin:8px 0;font-size:13.5px"><div>🏫 <b>Di sekolah:</b> ${b.sekolah}</div></div>` : ""}
      <div class="aksi"><button class="btn btn-kecil btn-putih" data-a="dengar">🔊 Dengarkan</button><button class="btn btn-kecil btn-primer" data-a="ai">🧔🏽 Analisis AI</button><a class="btn btn-kecil btn-putih" href="index.html#topik-${b.topik}">📖 Saka ${b.topik}</a></div>
      <div class="ai-out" id="ar-ai"></div>`;
    info.classList.add("tampil");
  }
  info.addEventListener("click", async e => {
    if (e.target.closest(".x")) { info.classList.remove("tampil"); AI.suara.diam(); return; }
    const a = e.target.closest("[data-a]")?.dataset.a; if (!a || !bagianAktif) return;
    if (a === "dengar") AI.suara.bicara(bagianAktif.judul + ". " + bagianAktif.isi + ". " + (bagianAktif.solusi || ""));
    if (a === "ai") {
      const o = $("#ar-ai"); o.classList.add("tampil"); o.innerHTML = '<span class="memuat"><i></i><i></i><i></i></span>';
      const r = await AI.jelaskan(bagianAktif.topik, bagianAktif.judul, ["SD/MI", "SMP/MTs", "SMA/MA/SMK"][Math.floor(Math.random() * 3)]);
      o.innerHTML = AI.md(r.teks); AI.suara.bicara(r.teks);
    }
  });

  /* ================= 1. PIRAMIDA LENCIONI ================= */
  const LENCIONI = [
    { judul: "1. Ketiadaan Kepercayaan", isi: "Anggota enggan terbuka, menyembunyikan kelemahan, dan takut meminta bantuan. Ini fondasi seluruh disfungsi.", solusi: "Mulai dari kerentanan pemimpin: akui kekeliruan sendiri, bangun rasa aman psikologis (Edmondson, 1999), jaga amanah & rahasia.", sekolah: "Guru baru tidak berani bertanya cara mengisi rapor karena takut dianggap tidak mampu.", warna: "#0c4a6e" },
    { judul: "2. Takut Konflik", isi: "Rapat terlihat 'adem', tetapi keberatan disampaikan di belakang (grup pribadi, warung kopi). Perdebatan ide yang sehat hilang.", solusi: "Fasilitasi musyawarah beradab: undang perbedaan ide, pisahkan ide dari pribadi, tegaskan larangan ghibah.", sekolah: "Semua guru setuju program tahfidz di rapat, lalu mengeluh beban di grup WhatsApp pribadi.", warna: "#075985" },
    { judul: "3. Kurang Komitmen", isi: "Karena pendapat tak pernah dibedah, keputusan menjadi ambigu dan anggota hanya 'manut' tanpa sungguh-sungguh.", solusi: "Musyawarah lalu 'azam' (QS. Āli ‘Imrān: 159): rumuskan keputusan, PIC, dan tenggat yang jelas di akhir rapat.", sekolah: "Keputusan 'literasi pagi' tidak jelas siapa, kapan, dan bagaimana — sebulan kemudian tak berjalan.", warna: "#0369a1" },
    { judul: "4. Menghindari Akuntabilitas", isi: "Anggota sungkan mengingatkan rekan yang lalai; standar kinerja menurun diam-diam.", solusi: "Standar & RACI jelas, evaluasi rutin, budaya saling menasihati dalam kebenaran (wa tawāṣau bil-ḥaqq, QS. Al-‘Aṣr: 3).", sekolah: "Wali kelas terlambat menyetor nilai, rekan lain diam saja; operator yang menanggung lembur.", warna: "#0284c7" },
    { judul: "5. Abai terhadap Hasil", isi: "Ego, jabatan, atau kepentingan kelompok kecil lebih penting dari tujuan bersama — yaitu belajar siswa.", solusi: "Tetapkan tujuan tim yang terukur dan publik, rayakan capaian kolektif, evaluasi dengan data (Saka 9).", sekolah: "Lomba antarkelas lebih mengejar piala wali kelas daripada pembelajaran siswa.", warna: "#0ea5e9" }
  ].map(x => ({ ...x, topik: 7, eyebrow: "Piramida Lencioni (2002) · Saka 7" }));
  const mL = $("#m-lencioni");
  const lapis = [];
  LENCIONI.forEach((b, i) => {
    const rb = .42 - i * .075, rt = rb - .075, h = .12, y = i * (h + .012) + h / 2;
    const g = el("a-entity", { position: `0 ${y} 0`, class: "klik" }, mL);
    el("a-cone", { "radius-bottom": rb, "radius-top": rt, height: h, "segments-radial": 4, rotation: "0 45 0", color: b.warna, class: "klik", material: "roughness: .5; metalness: .1" }, g);
    label(g, b.judul.replace(/^\d\. /, ""), null, `${(rb + rt) / 2 * .71 + .26} 0 .05`, .42, b.warna);
    g.addEventListener("click", () => {
      lapis.forEach((l, k) => l.setAttribute("animation__z", `property: position; to: 0 ${l._y} ${k === i ? .12 : 0}; dur: 300`));
      tampilInfo(b); Gamelan.saron([1, 2, 3, 5, 6][i]);
    });
    g._y = y; lapis.push(g);
  });
  label(mL, "Piramida Disfungsi Tim", "Lencioni (2002) · ketuk tiap lapis", `0 ${5 * .132 + .16} 0`, .6);

  /* ================= 2. TANGGA TUCKMAN ================= */
  const TUCKMAN = [
    { judul: "Forming — Pembentukan", isi: "Anggota saling mengenal, sopan, masih ragu, dan bergantung pada arahan pemimpin.", solusi: "Directing: jelaskan tujuan, peran, dan aturan awal. Buat suasana ta‘āruf.", sekolah: "Rapat perdana Tim Literasi MI: perkenalan & membaca SK tim." },
    { judul: "Storming — Pancaroba", isi: "Muncul beda pendapat, perebutan peran, dan ketegangan. Wajar dan perlu dikelola, bukan dihindari.", solusi: "Coaching: dengarkan semua pihak, fasilitasi musyawarah, pegang adab berbeda pendapat.", sekolah: "Debat guru senior vs muda: pojok baca atau jam wajib membaca?" },
    { judul: "Norming — Penormaan", isi: "Tim menyepakati norma, cara kerja, dan pembagian tugas. Kohesi meningkat.", solusi: "Supporting: kukuhkan kesepakatan tertulis, buat RACI, apresiasi kemajuan.", sekolah: "Disepakati: 15 menit membaca tiap pagi + jurnal baca, PIC per kelas." },
    { judul: "Performing — Berkinerja", isi: "Tim mandiri, produktif, saling mengisi tanpa diminta. Fokus pada hasil.", solusi: "Delegating: beri otonomi, singkirkan hambatan, jaga energi tim.", sekolah: "Guru saling menggantikan jadwal literasi saat ada yang dinas luar." },
    { judul: "Adjourning — Pengakhiran", isi: "Tugas selesai; tim mengevaluasi, merayakan, dan berpisah atau berganti misi.", solusi: "Refleksi & syukur: After Action Review, apresiasi kontribusi, dokumentasi praktik baik.", sekolah: "Gelar karya literasi, AAR, dan syukuran tumpeng sederhana." }
  ].map(x => ({ ...x, topik: 2, eyebrow: "Tuckman (1965) & Tuckman-Jensen (1977) · Saka 2" }));
  const mT = $("#m-tuckman"), anak = [], bidak = [];
  TUCKMAN.forEach((b, i) => {
    const x = -.4 + i * .2, h = .06 + i * .07;
    const s = el("a-box", { width: .19, height: h, depth: .32, position: `${x} ${h / 2} 0`, color: ["#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7"][i], class: "klik" }, mT);
    label(mT, b.judul.split(" — ")[0], b.judul.split(" — ")[1], `${x} ${h + .09} .1`, .24);
    s.addEventListener("click", () => { tampilInfo(b); Gamelan.saron([1, 2, 3, 5, 6][i]); });
    anak.push({ x, h, s });
  });
  const WB = ["#e11d48", "#f59e0b", "#16a34a", "#7c3aed"];
  for (let k = 0; k < 4; k++) {
    const p = el("a-entity", { position: `${-.45 + (k % 2) * .05} 0 ${-.09 + k * .06}` }, mT);
    el("a-cone", { "radius-bottom": .025, "radius-top": .012, height: .07, position: "0 .035 0", color: WB[k] }, p);
    el("a-sphere", { radius: .018, position: "0 .085 0", color: "#c68642" }, p);
    bidak.push(p);
  }
  label(mT, "Tangga Perkembangan Tim", "tekan ▶ Simulasikan", `0 .52 -.05`, .55);
  let simJalan = false;
  function simulasiTuckman() {
    if (simJalan) return; simJalan = true;
    let i = 0;
    const langkah = () => {
      if (i >= anak.length) { simJalan = false; AI.toast("Tim telah melalui seluruh tahap 🎉"); return; }
      const a = anak[i];
      bidak.forEach((p, k) => {
        const z = -.09 + k * .06, dx = (k % 2) * .04 - .02;
        p.setAttribute("animation__p", `property: position; to: ${a.x + dx} ${a.h} ${z}; dur: 700; easing: easeOutBack`);
        p.removeAttribute("animation__r");
        if (i === 1) p.setAttribute("animation__r", `property: rotation; from: 0 -40 0; to: 0 40 0; dir: alternate; loop: 6; dur: 260`);
        else p.setAttribute("rotation", "0 0 0");
      });
      tampilInfo(TUCKMAN[i]); Gamelan.saron([1, 2, 3, 5, 6][i]); if (i === 4) Gamelan.gong();
      AI.suara.bicara(TUCKMAN[i].judul + ". " + TUCKMAN[i].isi);
      i++; setTimeout(langkah, 5200);
    };
    langkah();
  }

  /* ================= 3. GAMELAN TIM ================= */
  const GAMELAN = {
    kendang: { judul: "Kendang = Pemimpin/Koordinator", isi: "Kendang tidak memainkan melodi, tetapi menentukan tempo, memberi isyarat masuk, mempercepat, memperlambat, dan menghentikan. Tanpa kendang, setiap pemain berjalan dengan iramanya sendiri.", solusi: "Pemimpin memberi 'tempo': tujuan, jadwal, dan isyarat yang jelas — bukan memainkan semua instrumen.", sekolah: "Kepala madrasah menetapkan kalender & ritme rapat koordinasi mingguan.", topik: 4 },
    saron: { judul: "Saron = Pelaksana Inti (Implementer)", isi: "Saron membawa balungan — kerangka lagu. Ia andal, disiplin, dan menjadi pegangan instrumen lain.", solusi: "Hargai para pelaksana yang konsisten; beri SOP dan sumber daya yang memadai.", sekolah: "Guru-guru yang setia menjalankan program harian (piket, literasi, sholat berjamaah).", topik: 3 },
    bonang: { judul: "Bonang = Penggagas Kreatif (Plant)", isi: "Bonang menghias dan mengembangkan melodi dengan pola-pola kreatif, tetapi tetap mengikuti irama bersama.", solusi: "Beri ruang inovasi (otonomi) namun tetap selaras dengan tujuan tim.", sekolah: "Guru muda yang mengusulkan media pembelajaran digital untuk projek kokurikuler.", topik: 5 },
    kenong: { judul: "Kenong = Penjaga Struktur (Monitor/Completer)", isi: "Kenong menandai bagian-bagian penting dalam satu gongan sehingga semua pemain tahu posisi mereka.", solusi: "Tetapkan tonggak (milestone) dan monitoring berkala agar tim tidak tersesat.", sekolah: "Waka kurikulum yang memantau tenggat modul ajar dan asesmen.", topik: 9 },
    gong: { judul: "Gong = Tujuan & Muhasabah", isi: "Gong menandai berakhirnya satu putaran besar. Semua bermuara pada bunyi gong — tujuan bersama.", solusi: "Rayakan capaian, lakukan evaluasi (After Action Review), lalu mulai putaran baru (PDCA).", sekolah: "Rapat evaluasi akhir semester dan syukuran capaian tim.", topik: 9 }
  };
  Object.values(GAMELAN).forEach(b => b.eyebrow = "Ansambel Gamelan Tim · Koordinasi & Peran");
  const mG = $("#m-gamelan"), inst = {};
  const tambahInst = (nama, x, z, bangun, bunyi) => {
    const g = el("a-entity", { position: `${x} 0 ${z}`, class: "klik" }, mG);
    bangun(g); label(g, nama[0].toUpperCase() + nama.slice(1), null, "0 .42 0", .22);
    g.addEventListener("click", () => { bunyi(); tampilInfo(GAMELAN[nama]); denyut(nama); });
    inst[nama] = g;
  };
  const kayu = "#7c2d12", emas = "material: metalness: .7; roughness: .3";
  tambahInst("kendang", -.42, .12, g => { el("a-cone", { "radius-bottom": .07, "radius-top": .055, height: .26, rotation: "0 0 90", position: "0 .1 0", color: "#92400e", class: "klik" }, g); }, () => { Gamelan.kendang("dhung"); setTimeout(() => Gamelan.kendang("tak"), 180); });
  tambahInst("saron", -.2, -.12, g => { el("a-box", { width: .3, height: .07, depth: .12, position: "0 .035 0", color: kayu, class: "klik" }, g); for (let k = 0; k < 6; k++) el("a-box", { width: .035, height: .012, depth: .1, position: `${-.11 + k * .044} .078 0`, color: "#eab308", class: "klik" }, g); }, () => { [3, 5, 6].forEach((n, k) => setTimeout(() => Gamelan.saron(n), k * 200)); });
  tambahInst("bonang", .1, -.15, g => { el("a-box", { width: .32, height: .09, depth: .12, position: "0 .045 0", color: kayu, class: "klik" }, g); for (let k = 0; k < 5; k++) el("a-sphere", { radius: .025, scale: "1 .6 1", position: `${-.12 + k * .06} .1 0`, color: "#ca8a04", class: "klik" }, g); }, () => { Gamelan.bonang(3); setTimeout(() => Gamelan.bonang(5), 160); });
  tambahInst("kenong", .36, .02, g => { el("a-box", { width: .12, height: .1, depth: .12, position: "0 .05 0", color: kayu, class: "klik" }, g); el("a-sphere", { radius: .05, scale: "1 .65 1", position: "0 .125 0", color: "#b45309", class: "klik" }, g); }, () => Gamelan.kenong(5));
  tambahInst("gong", .05, .22, g => {
    el("a-cylinder", { radius: .012, height: .34, position: "-.13 .17 0", color: kayu }, g); el("a-cylinder", { radius: .012, height: .34, position: ".13 .17 0", color: kayu }, g);
    el("a-box", { width: .3, height: .03, depth: .03, position: "0 .34 0", color: "#e11d48" }, g);
    el("a-cylinder", { radius: .11, height: .015, rotation: "90 0 0", position: "0 .2 0", color: "#a16207", class: "klik" }, g);
    el("a-sphere", { radius: .025, position: "0 .2 .012", color: "#ca8a04", class: "klik" }, g);
  }, () => Gamelan.gong());
  function denyut(nama) { const g = inst[nama]; if (!g) return; g.setAttribute("animation__d", "property: scale; from: 1.15 1.15 1.15; to: 1 1 1; dur: 260; easing: easeOutQuad"); }
  function mainkanBersama() {
    info.classList.remove("tampil");
    AI.toast("🥁 Kendang memberi tempo — semua mengikuti irama bersama");
    Gamelan.bersama((i, n) => {
      if (i < 0) { tampilInfo({ ...GAMELAN.kendang, judul: "Selaras karena ada koordinasi", isi: "Semua instrumen memainkan peran berbeda, tetapi menyatu karena mengikuti tempo kendang dan bermuara pada gong. Inilah tim yang terkoordinasi: peran jelas (Saka 3), irama bersama (Saka 4), tujuan bersama (Saka 9)." }); return; }
      denyut("saron"); denyut("bonang"); if (i % 2) denyut("kenong"); denyut("kendang");
    });
    setTimeout(() => denyut("gong"), 16 * 420 + 250);
  }
  function tanpaKendang() {
    info.classList.remove("tampil");
    AI.toast("🙉 Tanpa kendang: setiap orang memakai temponya sendiri…");
    const ti = [setInterval(() => denyut("saron"), 330), setInterval(() => denyut("bonang"), 510), setInterval(() => denyut("kenong"), 580)];
    Gamelan.tanpaKendang(() => {
      ti.forEach(clearInterval);
      tampilInfo({ judul: "Kacau tanpa koordinasi", eyebrow: "Eksperimen · Saka 4 Koordinasi", topik: 4, isi: "Pemainnya sama, instrumennya sama, niatnya baik — tetapi tanpa tempo bersama hasilnya bising. Banyak program sekolah gagal bukan karena guru malas, tetapi karena tidak ada mekanisme koordinasi.", solusi: "Tetapkan 'kendang' tim: jadwal bersama, data induk, rapat koordinasi singkat, dan isyarat keputusan yang jelas.", sekolah: "Tiga mapel memberi tugas proyek di minggu yang sama sehingga siswa kewalahan." });
    });
  }

  /* ================= Ganti model & aksi ================= */
  const AKSI = {
    lencioni: [["🔊 Ceritakan piramida", () => AI.suara.bicara("Piramida lima disfungsi tim menurut Patrick Lencioni. Dari dasar: ketiadaan kepercayaan, takut konflik, kurang komitmen, menghindari akuntabilitas, dan abai terhadap hasil. Ketuk setiap lapis untuk penjelasan.")], ["🧔🏽 Diagnosis tim saya", () => AI.kirimKeChat("Saya ingin mendiagnosis tim di sekolah saya memakai piramida lima disfungsi Lencioni. Ajukan 5 pertanyaan diagnostik satu per satu, lalu simpulkan lapis mana yang paling bermasalah dan saran tindakannya.")]],
    tuckman: [["▶ Simulasikan", simulasiTuckman], ["🧔🏽 Tim saya di tahap mana?", () => AI.kirimKeChat("Bantu saya menentukan tim saya berada di tahap Tuckman yang mana. Tanyakan 3–4 gejala yang saya amati, lalu sarankan gaya kepemimpinan yang sesuai.")]],
    gamelan: [["🎼 Mainkan bersama kendang", mainkanBersama], ["🙉 Mainkan tanpa kendang", tanpaKendang], ["🧔🏽 Peta peran tim saya", () => AI.kirimKeChat("Pakai analogi gamelan (kendang, saron, bonang, kenong, gong) untuk memetakan peran anggota tim di sekolah. Tanyakan dulu siapa saja anggota tim saya dan kekuatan mereka.")]]
  };
  function gantiModel(m) {
    modelAktif = m; info.classList.remove("tampil");
    ["lencioni", "tuckman", "gamelan"].forEach(k => $("#m-" + k).setAttribute("visible", k === m));
    scene.setAttribute("raycaster", `objects: #m-${m} .klik; far: 20`);
    document.querySelectorAll("#tab button").forEach(b => b.classList.toggle("aktif", b.dataset.m === m));
    aksi.innerHTML = AKSI[m].map((a, i) => `<button class="pill" data-i="${i}">${a[0]}</button>`).join("");
    aksi.querySelectorAll("button").forEach(b => b.onclick = () => AKSI[m][+b.dataset.i][1]());
  }
  document.querySelector("#tab").addEventListener("click", e => { const b = e.target.closest("button"); if (b) gantiModel(b.dataset.m); });

  /* ================= Putar, skala ================= */
  const putar = $("#putar"); let rotY = 0, skala = 1, seret = null;
  const terapkan = () => { putar.setAttribute("rotation", `0 ${rotY} 0`); putar.setAttribute("scale", `${skala} ${skala} ${skala}`); };
  $("#zin").onclick = () => { skala = Math.min(2.5, skala * 1.2); terapkan(); };
  $("#zout").onclick = () => { skala = Math.max(.4, skala / 1.2); terapkan(); };
  $("#rst").onclick = () => { skala = 1; rotY = 0; terapkan(); };
  scene.addEventListener("pointerdown", e => { seret = { x: e.clientX, r: rotY }; });
  window.addEventListener("pointermove", e => { if (!seret) return; rotY = seret.r + (e.clientX - seret.x) * .5; terapkan(); });
  window.addEventListener("pointerup", () => seret = null);
  let pinch = null;
  scene.addEventListener("touchmove", e => { if (e.touches.length === 2) { const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); if (pinch) { skala = Math.max(.4, Math.min(2.5, skala * d / pinch)); terapkan(); } pinch = d; } }, { passive: true });
  scene.addEventListener("touchend", () => pinch = null);

  /* ================= Mulai ================= */
  const POS = () => innerHeight > innerWidth ? "0 1.3 -2.0" : "0 1.05 -1.35";
  $("#akar").setAttribute("position", POS());
  const awal = () => { $("#mulai").style.display = "none"; const m = new URLSearchParams(location.search).get("m"); gantiModel(["lencioni", "tuckman", "gamelan"].includes(m) ? m : "lencioni"); try { Gamelan.kenong(5); } catch (e) {} };
  $("#b-3d").onclick = awal;
  $("#b-cam").onclick = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
      const v = $("#cam"); v.srcObject = s; v.style.display = "block"; await v.play().catch(() => {});
      document.body.style.background = "#000";
      awal(); AI.toast("AR Kamera aktif — gerakkan ponsel perlahan");
    } catch (e) { AI.toast("Kamera tidak dapat diakses. Beralih ke mode 3D."); awal(); }
  };
  if (navigator.xr && navigator.xr.isSessionSupported) {
    navigator.xr.isSessionSupported("immersive-ar").then(ok => { if (ok) $("#b-xr").style.display = ""; }).catch(() => {});
  }
  $("#b-xr").onclick = () => { awal(); try { scene.enterAR(); AI.toast("Arahkan ke lantai/meja, ketuk untuk meletakkan model"); } catch (e) { AI.toast("WebXR AR gagal dimulai."); } };
  scene.addEventListener("enter-vr", () => { if (scene.is("ar-mode")) $("#akar").setAttribute("position", "0 0 -1"); });
  scene.addEventListener("exit-vr", () => $("#akar").setAttribute("position", POS()));

  AI.pasangChat();
})();

/* SAKA GURU — Pendopo VR (A-Frame / WebXR) */
(function () {
  const AI = window.SakaAI, D = window.SAKA, $ = s => document.querySelector(s);
  const scene = $("#scene");
  const R_LAMPION = 4.3;
  let aktif = null, diVR = false;

  /* ---------- utilitas tekstur kanvas ---------- */
  let nKv = 0;
  function kanvas(w, h, gambar) { const c = document.createElement("canvas"); c.id = "kv-vr-" + (nKv++); c.width = w; c.height = h; gambar(c.getContext("2d"), w, h); return c; }
  function pasangTekstur(el, c) {
    const m = el.getAttribute("material") || {};
    el.setAttribute("material", { shader: "flat", side: m.side || "front", transparent: !!m.transparent, color: "#ffffff", src: c });
    // segarkan tekstur bila kanvas digambar ulang
    const tm = el.getObject3D("mesh"); if (tm && tm.material && tm.material.map) tm.material.map.needsUpdate = true;
  }
  function bungkus(ctx, teks, x, y, maks, lh) {
    const kata = teks.split(" "); let baris = "", yy = y;
    for (const k of kata) { const uji = baris ? baris + " " + k : k; if (ctx.measureText(uji).width > maks && baris) { ctx.fillText(baris, x, yy); baris = k; yy += lh; } else baris = uji; }
    if (baris) ctx.fillText(baris, x, yy); return yy + lh;
  }
  const FONT = '"Plus Jakarta Sans", system-ui, sans-serif';
  const polos = s => s.replace(/<[^>]+>/g, "");
  const el = (tag, attrs, parent) => { const e = document.createElement(tag); for (const k in attrs) e.setAttribute(k, attrs[k]); (parent || scene).appendChild(e); return e; };

  /* ---------- langit ---------- */
  pasangTekstur($("#langit"), kanvas(16, 512, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, "#0284c7"); gr.addColorStop(0.3, "#38bdf8"); gr.addColorStop(0.47, "#bae6fd"); gr.addColorStop(0.5, "#f0f9ff"); gr.addColorStop(1, "#d1fae5");
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
  }));
  // awan
  for (let i = 0; i < 14; i++) {
    const a = Math.random() * Math.PI * 2, r = 90 + Math.random() * 60, y = 30 + Math.random() * 35;
    const awan = el("a-entity", { position: `${Math.cos(a) * r} ${y} ${Math.sin(a) * r}` });
    for (let j = 0; j < 4; j++) el("a-sphere", { radius: 5 + Math.random() * 4, position: `${j * 6 - 9} ${Math.random() * 2} ${Math.random() * 3}`, color: "#ffffff", material: "shader: flat; opacity: 0.92; transparent: true" }, awan);
    awan.setAttribute("animation", `property: rotation; to: 0 ${Math.random() > .5 ? 360 : -360} 0; dur: ${400000 + Math.random() * 200000}; loop: true; easing: linear`);
  }

  /* ---------- pepohonan ---------- */
  const pohon = $("#pohon");
  for (let i = 0; i < 46; i++) {
    let x, z; do { const a = Math.random() * Math.PI * 2, r = 15 + Math.random() * 38; x = Math.cos(a) * r; z = Math.sin(a) * r; } while (Math.abs(x) < 4 && z > 0);
    const s = 0.8 + Math.random() * 0.9, t = el("a-entity", { position: `${x} 0 ${z}`, scale: `${s} ${s} ${s}` }, pohon);
    el("a-cylinder", { radius: 0.22, height: 2.2, position: "0 1.1 0", color: "#92400e" }, t);
    if (Math.random() > 0.4) el("a-sphere", { radius: 1.7, position: "0 3.1 0", color: ["#34d399", "#10b981", "#6ee7b7"][i % 3] }, t);
    else el("a-cone", { "radius-bottom": 1.5, height: 3.6, position: "0 3.6 0", color: "#059669" }, t);
  }

  /* ---------- tiang (saka) ---------- */
  const tiang = $("#tiang");
  [[-1.6, -1.6], [1.6, -1.6], [-1.6, 1.6], [1.6, 1.6]].forEach(([x, z]) => {
    el("a-box", { width: .55, height: .3, depth: .55, position: `${x} .65 ${z}`, color: "#94a3b8" }, tiang);
    el("a-cylinder", { radius: .2, height: 5.6, position: `${x} 3.4 ${z}`, color: "#8b5a2b" }, tiang);
  });
  const tepi = [-6.5, -3.25, 0, 3.25, 6.5];
  tepi.forEach(a => tepi.forEach(b => {
    if (Math.abs(a) !== 6.5 && Math.abs(b) !== 6.5) return;
    el("a-box", { width: .45, height: .25, depth: .45, position: `${a} .62 ${b}`, color: "#94a3b8" }, tiang);
    el("a-cylinder", { radius: .14, height: 3.3, position: `${a} 2.2 ${b}`, color: "#9a6533" }, tiang);
  }));

  /* ---------- papan nama & label ---------- */
  pasangTekstur($("#papan-nama"), kanvas(1024, 184, (g, w, h) => {
    g.fillStyle = "#0c4a6e"; g.fillRect(0, 0, w, h); g.strokeStyle = "#fde68a"; g.lineWidth = 8; g.strokeRect(10, 10, w - 20, h - 20);
    g.fillStyle = "#fff"; g.textAlign = "center"; g.font = `800 64px ${FONT}`; g.fillText("PENDOPO SAKA GURU", w / 2, 92);
    g.fillStyle = "#bae6fd"; g.font = `600 30px ${FONT}`; g.fillText("Kepemimpinan & Kerja Sama Tim · Universitas Sunan Gresik", w / 2, 145);
  }));
  pasangTekstur($("#label-among"), kanvas(512, 128, (g, w, h) => {
    g.fillStyle = "rgba(255,255,255,.92)"; g.beginPath(); g.roundRect ? g.roundRect(4, 4, w - 8, h - 8, 40) : g.rect(4, 4, w - 8, h - 8); g.fill();
    g.fillStyle = "#0369a1"; g.textAlign = "center"; g.font = `800 44px ${FONT}`; g.fillText("Ki Among", w / 2, 56);
    g.fillStyle = "#335f7d"; g.font = `600 26px ${FONT}`; g.fillText("sentuh untuk bertanya", w / 2, 98);
  }));

  /* ---------- 9 Damar Kurung ---------- */
  const WARNA_BAJU = ["#e11d48", "#0284c7", "#f59e0b", "#16a34a", "#7c3aed"];
  function teksturDamar(t) {
    return kanvas(512, 680, (g, w, h) => {
      g.fillStyle = "#fffbeb"; g.fillRect(0, 0, w, h);
      const pusat = g.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, 420); pusat.addColorStop(0, "rgba(253,230,138,.85)"); pusat.addColorStop(1, "rgba(253,230,138,0)");
      g.fillStyle = pusat; g.fillRect(0, 0, w, h);
      g.strokeStyle = "#e11d48"; g.lineWidth = 18; g.strokeRect(9, 9, w - 18, h - 18);
      g.strokeStyle = "#0284c7"; g.lineWidth = 5; g.strokeRect(34, 34, w - 68, h - 68);
      g.fillStyle = "#0284c7"; g.fillRect(34, 34, w - 68, 74);
      g.fillStyle = "#fff"; g.textAlign = "center"; g.font = `800 40px ${FONT}`; g.fillText(`SAKA ${t.id}`, w / 2, 86);
      g.font = `120px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`; g.fillText(t.ikon, w / 2, 250);
      g.fillStyle = "#0c4a6e"; g.font = `800 42px ${FONT}`; const yb = bungkus(g, t.judul, w / 2, 330, w - 110, 48);
      g.fillStyle = "#be123c"; g.font = `700 28px ${FONT}`; g.fillText("— " + t.lokal.nama + " —", w / 2, yb + 10);
      // figur gotong royong ala Damar Kurung Masmundari
      const y0 = h - 120;
      for (let i = 0; i < 5; i++) {
        const x = 92 + i * 82;
        g.fillStyle = WARNA_BAJU[(i + t.id) % 5]; g.beginPath(); g.moveTo(x - 22, y0 + 62); g.lineTo(x + 22, y0 + 62); g.lineTo(x + 12, y0 + 10); g.lineTo(x - 12, y0 + 10); g.fill();
        g.fillStyle = "#c68642"; g.beginPath(); g.arc(x, y0, 14, 0, Math.PI * 2); g.fill();
        g.fillStyle = "#1f2937"; g.fillRect(x - 15, y0 - 16, 30, 8);
        if (i < 4) { g.strokeStyle = "#c68642"; g.lineWidth = 6; g.beginPath(); g.moveTo(x + 12, y0 + 24); g.lineTo(x + 70, y0 + 24); g.stroke(); }
      }
    });
  }
  const grupL = $("#lampion"), lampion = [];
  D.topik.forEach((t, i) => {
    const th = i * 40 * Math.PI / 180;
    const x = Math.sin(th) * R_LAMPION, z = Math.cos(th) * R_LAMPION;
    const g = el("a-entity", { position: `${x} 0.5 ${z}`, rotation: `0 ${i * 40} 0` }, grupL);
    el("a-cylinder", { radius: .32, height: .08, position: "0 .04 0", color: "#7c4a1e" }, g);
    el("a-cylinder", { radius: .035, height: 1.15, position: "0 .6 0", color: "#7c4a1e" }, g);
    const lp = el("a-entity", { position: "0 1.8 0", class: "klik", "data-id": t.id, animation__ayun: `property: position; to: 0 1.9 0; dir: alternate; loop: true; dur: ${2200 + i * 130}; easing: easeInOutSine` }, g);
    el("a-box", { width: .95, height: .06, depth: .95, position: "0 -.6 0", color: "#e11d48", class: "klik" }, lp);
    const badan = el("a-box", { width: .8, height: 1.06, depth: .8, material: "shader: flat", class: "klik" }, lp);
    el("a-cone", { "radius-bottom": .66, "radius-top": .08, height: .34, "segments-radial": 4, rotation: "0 45 0", position: "0 .7 0", color: "#e11d48", class: "klik" }, lp);
    el("a-sphere", { radius: .06, position: "0 .9 0", color: "#fde68a" }, lp);
    const cincin = el("a-ring", { "radius-inner": .45, "radius-outer": .58, rotation: "-90 0 0", position: "0 .02 0", color: "#38bdf8", material: "shader: flat; opacity: .0; transparent: true" }, g);
    pasangTekstur(badan, teksturDamar(t));
    lp.addEventListener("mouseenter", () => lp.setAttribute("scale", "1.1 1.1 1.1"));
    lp.addEventListener("mouseleave", () => lp.setAttribute("scale", "1 1 1"));
    lp.addEventListener("click", () => pilih(t.id));
    lampion.push({ t, g, cincin, th });
  });

  /* ---------- Gamelan ---------- */
  const gm = $("#gamelan");
  const PERAN = {
    kendang: "🥁 KENDANG = pemimpin/koordinator. Ia memberi tempo dan memberi isyarat kapan semua masuk, cepat, atau berhenti (Saka 4 & 8).",
    gong: "🔔 GONG = penanda tujuan & evaluasi. Gong menandai akhir satu putaran (gongan) — seperti target & muhasabah tim (Saka 9).",
    saron: "🎶 SARON = pelaksana inti (Implementer). Membawa 'balungan' atau kerangka lagu yang diikuti semua (Saka 3).",
    bonang: "✨ BONANG = penggagas kreatif (Plant). Menghias & mengembangkan melodi, tetapi tetap dalam irama bersama (Saka 5).",
    kenong: "🛎️ KENONG = penjaga struktur (Monitor/Completer). Menandai bagian-bagian penting agar tim tidak tersesat (Saka 2 & 9)."
  };
  function sentuhGamelan(nama, fn) { fn(); AI.toast(PERAN[nama]); }
  // saron
  const saron = el("a-entity", { position: "-1.1 0 .3", rotation: "0 25 0" }, gm);
  el("a-box", { width: 1.1, height: .28, depth: .38, position: "0 .14 0", color: "#7c2d12" }, saron);
  el("a-box", { width: 1.14, height: .04, depth: .42, position: "0 .3 0", color: "#d4a017" }, saron);
  [1, 2, 3, 5, 6, 7].forEach((n, k) => {
    const b = el("a-box", { width: .13, height: .035, depth: .3, position: `${-0.43 + k * .172} .34 0`, color: "#eab308", class: "klik", material: "metalness: .6; roughness: .35" }, saron);
    b.addEventListener("click", e => { e.stopPropagation(); sentuhGamelan("saron", () => Gamelan.saron(n)); b.setAttribute("animation", "property: position.y; from: .31; to: .34; dur: 200"); });
  });
  // bonang
  const bonang = el("a-entity", { position: "-.2 0 1.05" }, gm);
  el("a-box", { width: 1.2, height: .34, depth: .42, position: "0 .17 0", color: "#7c2d12", class: "klik" }, bonang);
  for (let k = 0; k < 5; k++) { const p = el("a-sphere", { radius: .085, scale: "1 .6 1", position: `${-0.44 + k * .22} .38 0`, color: "#ca8a04", class: "klik", material: "metalness: .7; roughness: .3" }, bonang); el("a-sphere", { radius: .03, position: `${-0.44 + k * .22} .44 0`, color: "#a16207" }, bonang); }
  bonang.addEventListener("click", () => sentuhGamelan("bonang", () => { Gamelan.bonang(3); setTimeout(() => Gamelan.bonang(5), 180); }));
  // kenong
  const kenong = el("a-entity", { position: ".9 0 .9" }, gm);
  el("a-box", { width: .42, height: .4, depth: .42, position: "0 .2 0", color: "#7c2d12", class: "klik" }, kenong);
  el("a-sphere", { radius: .17, scale: "1 .65 1", position: "0 .48 0", color: "#b45309", class: "klik", material: "metalness: .7; roughness: .3" }, kenong);
  kenong.addEventListener("click", () => sentuhGamelan("kenong", () => Gamelan.kenong(5)));
  // kendang
  const kendang = el("a-entity", { position: "1.1 0 -.2", rotation: "0 -20 0" }, gm);
  el("a-box", { width: .5, height: .2, depth: .3, position: "0 .1 0", color: "#57301a" }, kendang);
  el("a-cone", { "radius-bottom": .17, "radius-top": .13, height: .7, rotation: "0 0 90", position: "0 .37 0", color: "#92400e", class: "klik" }, kendang);
  kendang.addEventListener("click", () => sentuhGamelan("kendang", () => { Gamelan.kendang("dhung"); setTimeout(() => Gamelan.kendang("tak"), 200); setTimeout(() => Gamelan.kendang("tak"), 330); }));
  // gong
  const gong = el("a-entity", { position: "0 0 -.9" }, gm);
  el("a-cylinder", { radius: .05, height: 1.7, position: "-.65 .85 0", color: "#7c2d12" }, gong);
  el("a-cylinder", { radius: .05, height: 1.7, position: ".65 .85 0", color: "#7c2d12" }, gong);
  el("a-box", { width: 1.5, height: .14, depth: .14, position: "0 1.7 0", color: "#e11d48" }, gong);
  const piring = el("a-entity", { position: "0 1.05 0", class: "klik" }, gong);
  el("a-cylinder", { radius: .52, height: .07, rotation: "90 0 0", color: "#a16207", class: "klik", material: "metalness: .75; roughness: .3" }, piring);
  el("a-sphere", { radius: .11, position: "0 0 .06", color: "#ca8a04", class: "klik", material: "metalness: .8; roughness: .25" }, piring);
  piring.addEventListener("click", () => { sentuhGamelan("gong", () => Gamelan.gong()); piring.setAttribute("animation", "property: rotation; from: 6 0 0; to: 0 0 0; dur: 900; easing: easeOutElastic"); });

  /* ---------- Panel info (HTML) ---------- */
  const info = $("#info");
  function pilih(id) {
    const t = D.topik.find(x => x.id === id); aktif = t;
    lampion.forEach(l => l.cincin.setAttribute("material", "opacity", l.t.id === id ? .9 : 0));
    document.querySelectorAll("#nav9 button").forEach(b => b.classList.toggle("aktif", +b.dataset.id === id));
    info.innerHTML = `<button class="x" aria-label="Tutup">✕</button><span class="eyebrow">Saka ${t.id} · ${t.lokal.nama}</span>
      <h3>${t.ikon} ${t.judul}</h3><p style="margin:0 0 8px;font-size:14px">${t.ringkas}</p>
      <ul style="font-size:13.5px;padding-left:18px;margin:6px 0">${t.poin.slice(0, 3).map(p => `<li>${p}</li>`).join("")}</ul>
      <div class="kotak dalil" style="padding:10px;margin:10px 0"><div class="arab" style="font-size:20px">${t.dalil.ar}</div><div class="sumber-dalil">${t.dalil.sumber}</div></div>
      <div class="kotak lokal" style="padding:10px;margin:0 0 10px;font-size:13.5px"><div>🏮 <b>${t.lokal.nama}:</b> ${t.lokal.isi}</div></div>
      <div class="aksi"><button class="btn btn-kecil btn-putih" data-a="dengar">🔊 Dengarkan</button><button class="btn btn-kecil btn-primer" data-a="ai">🧔🏽 Ki Among, jelaskan!</button><a class="btn btn-kecil btn-putih" href="index.html#topik-${t.id}">📖 Modul & aktivitas</a></div>
      <div class="ai-out" id="vr-ai"></div>`;
    info.classList.add("tampil");
    if (diVR) tampilPapanVR(t);
  }
  info.addEventListener("click", async e => {
    if (e.target.closest(".x")) { info.classList.remove("tampil"); AI.suara.diam(); return; }
    const a = e.target.closest("[data-a]")?.dataset.a; if (!a || !aktif) return;
    if (a === "dengar") AI.suara.bicara(aktif.judul + ". " + polos(aktif.ringkas));
    if (a === "ai") {
      const o = $("#vr-ai"); o.classList.add("tampil"); o.innerHTML = '<span class="memuat"><i></i><i></i><i></i></span>';
      const r = await AI.jelaskan(aktif.id, aktif.judul, ["SD/MI", "SMP/MTs", "SMA/MA"][Math.floor(Math.random() * 3)]);
      o.innerHTML = AI.md(r.teks); AI.suara.bicara(r.teks);
    }
  });

  /* papan dalam-VR (terbaca di headset) */
  const papan = $("#papan-vr");
  function tampilPapanVR(t) {
    pasangTekstur(papan, kanvas(1024, 704, (g, w, h) => {
      g.fillStyle = "rgba(240,249,255,.97)"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#0284c7"; g.fillRect(0, 0, w, 110);
      g.fillStyle = "#fff"; g.font = `800 50px ${FONT}`; g.fillText(`${t.id}. ${t.judul}`, 36, 74);
      g.fillStyle = "#0c4a6e"; g.font = `500 30px ${FONT}`;
      let y = bungkus(g, polos(t.ringkas).slice(0, 330) + "…", 36, 160, w - 72, 40);
      g.fillStyle = "#be123c"; g.font = `700 30px ${FONT}`; y = bungkus(g, "🏮 " + t.lokal.nama + ": " + t.lokal.isi.slice(0, 150) + "…", 36, y + 14, w - 72, 38);
      g.fillStyle = "#0c4a6e"; g.font = `40px "Amiri", serif`; g.textAlign = "right"; g.direction = "rtl"; bungkus(g, t.dalil.ar, w - 36, y + 34, w - 72, 56);
      g.direction = "ltr"; g.textAlign = "left"; g.fillStyle = "#335f7d"; g.font = `600 24px ${FONT}`; g.fillText("Tatap Ki Among untuk mendengar penjelasan · tatap lampion lain untuk berpindah", 36, h - 26);
    }));
    papan.setAttribute("visible", true);
    clearTimeout(papan._t); papan._t = setTimeout(() => papan.setAttribute("visible", false), 14000);
  }

  /* ---------- Ki Among ---------- */
  $("#kiamong").addEventListener("click", async () => {
    if (diVR) {
      const t = aktif || D.topik[0];
      AI.suara.bicara("Monggo, saya jelaskan " + t.judul);
      const r = await AI.jelaskan(t.id, t.judul, "SD/MI"); AI.suara.bicara(r.teks);
    } else {
      AI.bukaChat();
      if (aktif) AI.toast(`Tanyakan apa saja tentang "${aktif.judul}"`);
    }
  });

  /* ---------- Navigasi 1–9 ---------- */
  const rig = $("#rig"), kam = $("#kamera");
  function keLampion(i) {
    const th = i * 40, rad = th * Math.PI / 180, R = 6.7;
    const x = Math.sin(rad) * R, z = Math.cos(rad) * R;
    let cur = rig.getAttribute("rotation").y % 360, tuju = th;
    if (tuju - cur > 180) tuju -= 360; if (cur - tuju > 180) tuju += 360;
    rig.setAttribute("animation__pos", `property: position; to: ${x} 0.5 ${z}; dur: 1100; easing: easeInOutQuad`);
    rig.setAttribute("animation__rot", `property: rotation; from: 0 ${cur} 0; to: 0 ${tuju} 0; dur: 1100; easing: easeInOutQuad`);
    const lc = kam.components["look-controls"]; if (lc) { lc.pitchObject.rotation.x = 0; lc.yawObject.rotation.y = 0; }
  }
  const nav = $("#nav9");
  nav.innerHTML = D.topik.map((t, i) => `<button data-id="${t.id}" data-i="${i}" title="${t.judul}">${t.id}</button>`).join("") + `<button data-among title="Ki Among">🧔🏽</button>`;
  nav.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-among")) { rig.setAttribute("animation__pos", "property: position; to: 0 0.5 3; dur: 1000; easing: easeInOutQuad"); rig.setAttribute("animation__rot", `property: rotation; to: 0 0 0; dur: 1000`); AI.bukaChat(); return; }
    keLampion(+b.dataset.i); pilih(+b.dataset.id);
  });

  /* ---------- Mode VR ---------- */
  let gaze = null;
  scene.addEventListener("enter-vr", () => {
    diVR = true; info.classList.remove("tampil");
    if (!gaze) {
      gaze = el("a-entity", { cursor: "fuse: true; fuseTimeout: 1500", raycaster: "objects: .klik; far: 30", position: "0 0 -0.9", geometry: "primitive: ring; radiusInner: 0.012; radiusOuter: 0.02", material: "color: #0284c7; shader: flat",
        animation__fusing: "property: scale; startEvents: fusing; from: 1 1 1; to: 0.3 0.3 0.3; dur: 1500", animation__leave: "property: scale; startEvents: mouseleave; to: 1 1 1; dur: 100" }, kam);
    }
    AI.suara.bicara("Sugeng rawuh di Pendopo Saka Guru. Tatap lampion untuk membuka materi.");
  });
  scene.addEventListener("exit-vr", () => { diVR = false; papan.setAttribute("visible", false); if (gaze) { gaze.remove(); gaze = null; } });

  /* ---------- Gamelan latar ---------- */
  let amb = false;
  $("#b-amb").onclick = () => { amb = !amb; Gamelan.ambient(amb); $("#b-amb").textContent = "🎵 Gamelan latar: " + (amb ? "hidup" : "mati"); };

  /* ---------- Layar mulai ---------- */
  $("#masuk").onclick = () => {
    $("#mulai").style.display = "none";
    try { Gamelan.gong(); } catch (e) {}
    const q = new URLSearchParams(location.search).get("t");
    if (q) { const i = D.topik.findIndex(t => t.id === +q); if (i >= 0) setTimeout(() => { keLampion(i); pilih(+q); }, 300); }
    else AI.toast("Sugeng rawuh! Ketuk lampion atau tombol 1–9.");
  };
  AI.pasangChat();
})();

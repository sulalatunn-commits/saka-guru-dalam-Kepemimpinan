/* SAKA GURU — Sintesis bunyi gamelan (Web Audio API, tanpa berkas audio) */
(function () {
  let ctx, master, rev;
  function siap() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = 0.55;
      // gema ruang pendopo (impulse response sintetis)
      rev = ctx.createConvolver();
      const len = ctx.sampleRate * 2.2, ir = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
      rev.buffer = ir;
      const wet = ctx.createGain(); wet.gain.value = 0.22;
      master.connect(ctx.destination); master.connect(rev); rev.connect(wet); wet.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  // Laras slendro (perkiraan, Hz) nada 1 2 3 5 6 dan 1'
  const SLENDRO = { 1: 293.7, 2: 336.9, 3: 386.4, 5: 443.3, 6: 508.5, 7: 587.4 };

  function logam(f, t, { partials = [1, 2.76, 5.4], amps = [1, .35, .12], dur = 1.4, vol = .5 } = {}) {
    const g = ctx.createGain(); g.connect(master);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    partials.forEach((p, i) => {
      const o = ctx.createOscillator(), og = ctx.createGain();
      o.type = "sine"; o.frequency.value = f * p; og.gain.value = amps[i] ?? .1;
      o.connect(og); og.connect(g); o.start(t); o.stop(t + dur + .05);
      // ombak (beating) khas gamelan
      if (i === 0) { const o2 = ctx.createOscillator(), g2 = ctx.createGain(); o2.frequency.value = f * 1.004; g2.gain.value = amps[0] * .5; o2.connect(g2); g2.connect(g); o2.start(t); o2.stop(t + dur + .05); }
    });
  }
  const Gamelan = {
    saron(n = 1, t) { siap(); logam(SLENDRO[n] || 293.7, t ?? ctx.currentTime, { dur: 1.3, vol: .45 }); },
    bonang(n = 1, t) { siap(); logam((SLENDRO[n] || 293.7) * 2, t ?? ctx.currentTime, { partials: [1, 2.02, 3.1], amps: [1, .25, .1], dur: 1.0, vol: .3 }); },
    kenong(n = 5, t) { siap(); logam((SLENDRO[n] || 443.3) / 2, t ?? ctx.currentTime, { partials: [1, 2.01, 4.2], amps: [1, .3, .08], dur: 2.6, vol: .45 }); },
    gong(t) { siap(); logam(55, t ?? ctx.currentTime, { partials: [1, 2.02, 2.48, 3.9], amps: [1, .5, .25, .08], dur: 6.5, vol: .9 }); },
    kendang(jenis = "dhung", t) {
      siap(); t = t ?? ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      const f0 = jenis === "tak" ? 320 : 170, f1 = jenis === "tak" ? 180 : 75;
      o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + .18);
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(jenis === "tak" ? .5 : .9, t + .004); g.gain.exponentialRampToValueAtTime(.0001, t + (jenis === "tak" ? .12 : .4));
      o.connect(g); g.connect(master); o.start(t); o.stop(t + .45);
      // derau kulit
      const n = ctx.createBufferSource(), b = ctx.createBuffer(1, ctx.sampleRate * .08, ctx.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
      n.buffer = b; const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = jenis === "tak" ? 2200 : 900;
      const ng = ctx.createGain(); ng.gain.value = .25; n.connect(bp); bp.connect(ng); ng.connect(master); n.start(t);
    },
    /* Gending pendek terkoordinasi: kendang memberi tempo, semua mengikuti */
    bersama(onBeat) {
      siap();
      const bal = [3, 5, 6, 5, 3, 2, 1, 2, 6, 1, 2, 3, 5, 3, 2, 1];
      const ketuk = 0.42, t0 = ctx.currentTime + .25;
      bal.forEach((n, i) => {
        const t = t0 + i * ketuk;
        this.saron(n, t);
        this.bonang(n, t); this.bonang(n, t + ketuk / 2);
        if (i % 2 === 1) this.kenong(n === 1 ? 6 : 5, t);
        this.kendang(i % 4 === 0 ? "dhung" : "tak", t);
        if (i % 4 === 3) this.kendang("tak", t + ketuk / 2);
        if (onBeat) setTimeout(() => onBeat(i, n), (t - ctx.currentTime) * 1000);
      });
      this.gong(t0 + bal.length * ketuk);
      if (onBeat) setTimeout(() => onBeat(-1), (bal.length * ketuk + .3) * 1000);
      return bal.length * ketuk + 1.5;
    },
    /* Tanpa kendang: setiap pemain jalan dengan tempo sendiri */
    tanpaKendang(onBeat) {
      siap();
      const t0 = ctx.currentTime + .2;
      const bal = [3, 5, 6, 5, 3, 2, 1, 2];
      bal.forEach((n, i) => {
        this.saron(n, t0 + i * .33);
        this.bonang(bal[(i + 3) % 8], t0 + .17 + i * .51);
        if (i % 2) this.kenong(5, t0 + .6 + i * .29);
      });
      this.gong(t0 + 1.9);
      this.gong(t0 + 3.1);
      if (onBeat) setTimeout(() => onBeat(-1), 4200);
      return 5;
    },
    ambient(on) {
      siap();
      if (!on) { clearInterval(this._amb); this._amb = null; return; }
      const nada = [1, 2, 3, 5, 6, 5, 3, 2];
      let i = 0;
      const main = () => { const t = ctx.currentTime; this.saron(nada[i % 8], t); if (i % 4 === 3) this.kenong(5, t); if (i % 16 === 15) this.gong(t + .5); i++; };
      main(); this._amb = setInterval(main, 1100);
    }
  };
  window.Gamelan = Gamelan;
})();

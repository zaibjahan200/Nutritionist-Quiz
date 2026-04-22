// ============================================================
// KINETIC ALCHEMY: THE BIO-FORGE — Sound Engine
// Pure Web Audio API — zero dependencies, zero file loading
// ============================================================

const SoundEngine = (() => {
  let ctx = null;
  let masterGain = null;
  let muted = false;
  let ambientSource = null;
  let ambientGain = null;

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.7;
      masterGain.connect(ctx.destination);
    }
    // Resume if suspended (browser autoplay policy)
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // ---- Utility: play buffer ----
  function play(buffer, vol = 1) {
    if (muted || !buffer) return;
    const c = getCtx();
    const src = c.createBufferSource();
    const g = c.createGain();
    g.gain.value = vol;
    src.buffer = buffer;
    src.connect(g);
    g.connect(masterGain);
    src.start();
    return src;
  }

  // ---- Synth helpers ----
  function makeSineBuffer(duration, freq, fadeOut = true) {
    const c = getCtx();
    const sr = c.sampleRate;
    const frames = Math.ceil(sr * duration);
    const buf = c.createBuffer(1, frames, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < frames; i++) {
      const t = i / sr;
      const env = fadeOut ? Math.max(0, 1 - t / duration) : 1;
      data[i] = Math.sin(2 * Math.PI * freq * t) * env;
    }
    return buf;
  }

  function makeSynthBuffer(duration, fn) {
    const c = getCtx();
    const sr = c.sampleRate;
    const frames = Math.ceil(sr * duration);
    const buf = c.createBuffer(1, frames, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < frames; i++) { data[i] = fn(i / sr, duration); }
    return buf;
  }

  // ---- Specific sound generators ----
  function genSparkle() {
    // Rising sparkle: 3 sine waves
    return makeSynthBuffer(0.6, (t, dur) => {
      const env = Math.max(0, 1 - t / dur);
      return (
        Math.sin(2 * Math.PI * 880 * t) * 0.35 * env +
        Math.sin(2 * Math.PI * 1320 * t) * 0.25 * Math.max(0, 1 - (t - 0.1) / dur) +
        Math.sin(2 * Math.PI * 1760 * t) * 0.2  * Math.max(0, 1 - (t - 0.2) / dur)
      );
    });
  }

  function genBuzz() {
    // Descending buzz / thud
    return makeSynthBuffer(0.5, (t, dur) => {
      const env = Math.max(0, 1 - t / dur * 1.5);
      const freq = 220 - (t / dur) * 120;
      return Math.sin(2 * Math.PI * freq * t) * 0.6 * env
           + Math.sin(2 * Math.PI * freq * 2 * t) * 0.2 * env;
    });
  }

  function genLevelUp() {
    // Kitchen-timer style ding: ascending arpeggio
    return makeSynthBuffer(1.2, (t, dur) => {
      const notes = [523, 659, 784, 1047];
      const idx = Math.floor(t / 0.25);
      if (idx >= notes.length) return 0;
      const tLocal = t - idx * 0.25;
      const env = Math.max(0, 1 - tLocal / 0.2);
      return Math.sin(2 * Math.PI * notes[idx] * t) * 0.5 * env;
    });
  }

  function genBagelCrunch() {
    // White noise burst for crunch
    return makeSynthBuffer(0.3, (t, dur) => {
      const env = Math.max(0, 1 - t / (dur * 0.5));
      return (Math.random() * 2 - 1) * 0.6 * env;
    });
  }

  function genClick() {
    return makeSynthBuffer(0.12, (t, dur) => {
      const env = Math.max(0, 1 - t / dur);
      return Math.sin(2 * Math.PI * 400 * t) * 0.3 * env;
    });
  }

  function genScanner() {
    // Rising sweep
    return makeSynthBuffer(0.4, (t, dur) => {
      const freq = 200 + (t / dur) * 800;
      const env = Math.max(0, 1 - t / dur) * 0.3;
      return Math.sin(2 * Math.PI * freq * t) * env;
    });
  }

  // Pre-build all sound buffers
  let buffers = {};
  let initialized = false;

  function initBuffers() {
    if (initialized) return;
    try {
      buffers.sparkle    = genSparkle();
      buffers.buzz       = genBuzz();
      buffers.level_up   = genLevelUp();
      buffers.crunch     = genBagelCrunch();
      buffers.click      = genClick();
      buffers.scanner    = genScanner();
      initialized = true;
    } catch (e) {
      console.warn("Sound init failed", e);
    }
  }

  // ---- Ambient music (subtle generative loop) ----
  function startAmbient() {
    if (muted) return;
    stopAmbient();
    const c = getCtx();
    ambientGain = c.createGain();
    ambientGain.gain.value = 0;
    ambientGain.connect(masterGain);

    // Gentle fade in
    ambientGain.gain.linearRampToValueAtTime(0.08, c.currentTime + 2);

    // Create a simple oscillating pad
    const notes = [130, 155, 174, 196];
    notes.forEach((freq, i) => {
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      const g = c.createGain();
      g.gain.value = 0.06;
      osc.connect(g);
      g.connect(ambientGain);
      osc.start();
      // Store to stop later
      if (!ambientSource) ambientSource = [];
      ambientSource.push(osc);
    });
  }

  function stopAmbient() {
    if (ambientSource) {
      if (Array.isArray(ambientSource)) {
        ambientSource.forEach(o => { try { o.stop(); } catch {} });
      } else {
        try { ambientSource.stop(); } catch {}
      }
      ambientSource = null;
    }
    if (ambientGain) {
      try { ambientGain.disconnect(); } catch {}
      ambientGain = null;
    }
  }

  // ---- Public API ----
  return {
    init(autoAmbient = false) {
      // Lazy-init on first user interaction
      document.addEventListener("click", () => {
        getCtx();
        initBuffers();
        if (autoAmbient) this.startAmbient();
      }, { once: true });
    },

    playSuccess()   { initBuffers(); play(buffers.sparkle, 0.8); },
    playFailure()   { initBuffers(); play(buffers.buzz,    0.7); },
    playLevelUp()   { initBuffers(); play(buffers.level_up, 0.9); },
    playCrunch()    { initBuffers(); play(buffers.crunch,  0.6); },
    playClick()     { initBuffers(); play(buffers.click,   0.5); },
    playScanner()   { initBuffers(); play(buffers.scanner, 0.3); },

    startAmbient() { initBuffers(); startAmbient(); },
    stopAmbient,

    setMuted(val) {
      muted = val;
      if (muted) stopAmbient();
      if (masterGain) masterGain.gain.value = muted ? 0 : 0.7;
    },
    isMuted() { return muted; },
    toggleMute() { this.setMuted(!muted); return muted; }
  };
})();

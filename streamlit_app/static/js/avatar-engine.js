// ============================================================
// KINETIC ALCHEMY: THE BIO-FORGE — Avatar Engine
// Canvas-based holographic scanner + CSS state system
// ============================================================

const AvatarEngine = (() => {
  let stageEl = null;
  let imgEl = null;
  let canvasEl = null;
  let labelsEl = null;
  let ctx = null;
  let currentState = "healthy";
  let currentHotspots = [];
  let scannerActive = false;
  let animFrame = null;
  let scanX = 0, scanY = 0;
  let scanWave = 0;
  let particlePool = [];

  // ---- Init ----
  function init(stageId, imgId, canvasId, labelsId) {
    stageEl  = document.getElementById(stageId);
    imgEl    = document.getElementById(imgId);
    canvasEl = document.getElementById(canvasId);
    labelsEl = document.getElementById(labelsId);
    if (!stageEl || !imgEl || !canvasEl) return;

    ctx = canvasEl.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    bindScanner();
    drawIdle();
  }

  function resizeCanvas() {
    if (!canvasEl || !stageEl) return;
    canvasEl.width  = stageEl.offsetWidth;
    canvasEl.height = stageEl.offsetHeight;
  }

  // ---- Avatar State ----
  function setState(avatarState, hotspots = []) {
    if (!imgEl) return;
    // Clear old state classes
    const classes = Array.from(imgEl.classList);
    classes.forEach(c => { if (c.startsWith("state-")) imgEl.classList.remove(c); });
    imgEl.classList.add(`state-${avatarState}`);
    currentState = avatarState;
    currentHotspots = hotspots || [];
    // Clear labels
    if (labelsEl) labelsEl.innerHTML = "";
  }

  // ---- Animations ----
  function triggerSuccess(callback) {
    if (!imgEl) return;
    imgEl.classList.remove("anim-success","anim-failure","anim-toxic","anim-celebrate");
    void imgEl.offsetWidth; // reflow
    imgEl.classList.add("anim-success");
    spawnParticles("gold");
    imgEl.addEventListener("animationend", () => {
      imgEl.classList.remove("anim-success");
      if (callback) callback();
    }, { once: true });
  }

  function triggerFailure(isToxic = false, callback) {
    if (!imgEl) return;
    imgEl.classList.remove("anim-success","anim-failure","anim-toxic","anim-celebrate");
    void imgEl.offsetWidth;
    imgEl.classList.add(isToxic ? "anim-toxic" : "anim-failure");
    spawnParticles(isToxic ? "red" : "orange");
    imgEl.addEventListener("animationend", () => {
      imgEl.classList.remove("anim-toxic","anim-failure");
      if (callback) callback();
    }, { once: true });
  }

  function triggerCelebrate(callback) {
    if (!imgEl) return;
    imgEl.classList.remove("anim-success","anim-failure","anim-toxic","anim-celebrate");
    void imgEl.offsetWidth;
    imgEl.classList.add("anim-celebrate");
    spawnParticles("rainbow");
    imgEl.addEventListener("animationend", () => {
      imgEl.classList.remove("anim-celebrate");
      if (callback) callback();
    }, { once: true });
  }

  // ---- Particle System ----
  function spawnParticles(type) {
    if (!stageEl) return;
    const colors = {
      gold:    ["#ffd700","#ff9500","#ffec6e"],
      red:     ["#ff3366","#ff6b35","#ff0066"],
      orange:  ["#ff8c00","#ffb347","#ff6b35"],
      rainbow: ["#00d4ff","#7b2eff","#00ff88","#ffd700","#ff3366"]
    }[type] || ["#00d4ff"];

    const cx = stageEl.offsetWidth / 2;
    const cy = stageEl.offsetHeight / 2;

    for (let i = 0; i < 18; i++) {
      const el = document.createElement("div");
      el.className = "particle";
      const size = 4 + Math.random() * 8;
      const angle = (Math.PI * 2 / 18) * i + Math.random() * 0.5;
      const dist  = 60 + Math.random() * 120;
      el.style.cssText = `
        width:${size}px;height:${size}px;
        left:${cx - size/2}px;top:${cy - size/2}px;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        --dx:${Math.cos(angle)*dist}px;
        --dy:${Math.sin(angle)*dist}px;
        box-shadow:0 0 6px currentColor;
        animation-duration:${0.5+Math.random()*0.4}s;
        animation-delay:${Math.random()*0.15}s;
      `;
      stageEl.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }
  }

  // ---- Holographic Scanner ----
  function bindScanner() {
    stageEl.addEventListener("mousemove", e => {
      const rect = stageEl.getBoundingClientRect();
      scanX = e.clientX - rect.left;
      scanY = e.clientY - rect.top;
      if (!scannerActive) {
        scannerActive = true;
        showSymptomLabels();
        animateScanner();
      }
    });
    stageEl.addEventListener("mouseleave", () => {
      scannerActive = false;
      if (labelsEl) labelsEl.innerHTML = "";
      if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
      if (ctx) ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    });
  }

  function showSymptomLabels() {
    if (!labelsEl || !stageEl) return;
    labelsEl.innerHTML = "";
    const w = stageEl.offsetWidth;
    const h = stageEl.offsetHeight;
    currentHotspots.forEach((hs, i) => {
      const lbl = document.createElement("div");
      lbl.className = "symptom-label";
      lbl.textContent = hs.label;
      // Position based on percentage
      const x = hs.xPct * w;
      const y = hs.yPct * h;
      lbl.style.left  = `${x + 10}px`;
      lbl.style.top   = `${y - 10}px`;
      lbl.style.animationDelay = `${i * 0.3}s`;
      labelsEl.appendChild(lbl);

      // Draw connector dot
      setTimeout(() => {
        if (ctx) {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,212,255,0.9)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(0,212,255,0.4)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }, 50);
    });
  }

  function animateScanner() {
    if (!scannerActive || !ctx) return;
    scanWave += 0.05;
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    const w = canvasEl.width;
    const h = canvasEl.height;

    // ---- Grid ----
    const gridSize = 24;
    ctx.strokeStyle = "rgba(0,212,255,0.12)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // ---- Scan line ----
    const scanLineY = ((Math.sin(scanWave) + 1) / 2) * h;
    const grad = ctx.createLinearGradient(0, scanLineY - 15, 0, scanLineY + 15);
    grad.addColorStop(0, "rgba(0,212,255,0)");
    grad.addColorStop(0.5, "rgba(0,212,255,0.45)");
    grad.addColorStop(1, "rgba(0,212,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanLineY - 15, w, 30);

    // ---- Cursor glow ----
    const radGrad = ctx.createRadialGradient(scanX, scanY, 0, scanX, scanY, 60);
    radGrad.addColorStop(0, "rgba(0,212,255,0.2)");
    radGrad.addColorStop(1, "rgba(0,212,255,0)");
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, w, h);

    // ---- Crosshair ----
    ctx.strokeStyle = "rgba(0,212,255,0.5)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(scanX, 0); ctx.lineTo(scanX, h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(w, scanY); ctx.stroke();
    ctx.setLineDash([]);

    // ---- Hotspot pulse rings ----
    currentHotspots.forEach(hs => {
      const hx = hs.xPct * w;
      const hy = hs.yPct * h;
      const pulse = (Math.sin(scanWave * 2 + hs.xPct * 5) + 1) / 2;
      const r = 10 + pulse * 8;
      ctx.beginPath();
      ctx.arc(hx, hy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,212,255,${0.5 + pulse * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(hx, hy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,212,255,0.9)";
      ctx.fill();
    });

    animFrame = requestAnimationFrame(animateScanner);
  }

  function drawIdle() {
    // Soft ambient glow on the canvas
    if (!ctx || !canvasEl) return;
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    const cx = canvasEl.width / 2;
    const cy = canvasEl.height / 2;
    const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(canvasEl.width, canvasEl.height) / 2);
    rg.addColorStop(0, "rgba(0,212,255,0.04)");
    rg.addColorStop(1, "rgba(0,212,255,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  }

  // ---- Public ----
  return { init, setState, triggerSuccess, triggerFailure, triggerCelebrate };
})();

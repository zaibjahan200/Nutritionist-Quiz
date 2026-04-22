// ============================================================
// KINETIC ALCHEMY: THE BIO-FORGE — Options UI
// Renders floating option cards with arc animation
// ============================================================

const OptionsUI = (() => {
  let containerEl = null;
  let onSelectCallback = null;
  let locked = false;

  function render(containerId, options, onSelect) {
    containerEl = document.getElementById(containerId);
    if (!containerEl) return;
    onSelectCallback = onSelect;
    locked = false;
    containerEl.innerHTML = "";

    options.forEach((opt, i) => {
      const card = document.createElement("div");
      card.className = "option-card glass-hover";
      card.id = `option-${opt.id}`;
      card.setAttribute("data-option-id", opt.id);
      card.setAttribute("data-type", opt.type);
      card.style.animationDelay = `${i * 0.15}s`;

      // Type indicator color
      const typeColors = {
        optimal:  "rgba(0,255,136,0.08)",
        deficient:"rgba(255,215,0,0.06)",
        toxic:    "rgba(255,51,102,0.08)"
      };
      if (typeColors[opt.type]) {
        card.style.setProperty("--opt-tint", typeColors[opt.type]);
      }

      card.innerHTML = `
        <span class="option-icon">${opt.icon}</span>
        <div class="option-label">${opt.label}</div>
        <div class="option-desc text-muted">${opt.description}</div>
      `;

      card.addEventListener("click", () => handleSelect(card, opt));
      card.addEventListener("mouseenter", () => {
        if (!locked) SoundEngine.playClick();
      });

      containerEl.appendChild(card);
    });
  }

  function handleSelect(card, opt) {
    if (locked) return;
    locked = true;

    // Visual feedback per type
    const classMap = {
      optimal:  "selected-optimal",
      deficient:"selected-deficient",
      toxic:    "selected-toxic"
    };
    card.classList.add(classMap[opt.type] || "selected-deficient");

    // Dim all other cards
    containerEl.querySelectorAll(".option-card").forEach(c => {
      if (c !== card) {
        c.classList.add("disabled");
        c.style.opacity = "0.35";
      }
    });

    if (onSelectCallback) onSelectCallback(opt, card);
  }

  function lock() { locked = true; }
  function unlock() {
    locked = false;
    if (!containerEl) return;
    containerEl.querySelectorAll(".option-card").forEach(c => {
      c.classList.remove("disabled","selected-optimal","selected-deficient","selected-toxic");
      c.style.opacity = "";
    });
  }

  function reveal(options) {
    // After answer: show correctness indicators on all cards
    if (!containerEl) return;
    options.forEach(opt => {
      const card = containerEl.querySelector(`[data-option-id="${opt.id}"]`);
      if (!card) return;
      const indicatorMap = {
        optimal:  { icon: "✅", color: "var(--neon-green)" },
        deficient:{ icon: "🌀", color: "var(--neon-gold)"  },
        toxic:    { icon: "☠",  color: "var(--neon-red)"   }
      };
      const ind = indicatorMap[opt.type];
      if (ind) {
        const badge = document.createElement("div");
        badge.style.cssText = `position:absolute;top:-8px;right:-8px;background:${ind.color};color:#000;
          border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;
          font-size:12px;font-weight:bold;z-index:5;box-shadow:0 0 10px ${ind.color}`;
        badge.textContent = ind.icon;
        card.style.position = "relative";
        card.appendChild(badge);
      }
    });
  }

  return { render, lock, unlock, reveal };
})();

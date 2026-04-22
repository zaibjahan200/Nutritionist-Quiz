// ============================================================
// KINETIC ALCHEMY: THE BIO-FORGE — Game State Manager
// Pure localStorage — no Firebase, no dependencies
// ============================================================

const LEVELS = [
  { name: "Intern",              minPoints: 0,    icon: "🩺" },
  { name: "Junior Dietitian",    minPoints: 300,  icon: "📋" },
  { name: "Senior Dietitian",    minPoints: 800,  icon: "🔬" },
  { name: "Chief Nutritionist",  minPoints: 1600, icon: "🏆" },
  { name: "Bio-Alchemist",       minPoints: 2800, icon: "⚗️" }
];

const OUTFITS = [
  { id: "scrubs",       label: "Clinical Scrubs",          icon: "👔", cost: 0,    unlocked: true  },
  { id: "lab_coat",     label: "Clinical Lab Coat",         icon: "🥼", cost: 200,  unlocked: false },
  { id: "chef",         label: "Community Health Vest",     icon: "🦺", cost: 500,  unlocked: false },
  { id: "professor",    label: "Research Professor Coat",   icon: "🎓", cost: 900,  unlocked: false },
  { id: "alchemist",    label: "Bio-Alchemist Robe",       icon: "⚗️", cost: 1800, unlocked: false }
];

const DEFAULT_STATE = {
  playerName: "Intern",
  totalPoints: 0,
  streak: 0,
  maxStreak: 0,
  accuracy: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  bagelsCollected: [],
  outfitId: "scrubs",
  unlockedOutfits: ["scrubs"],
  categoryStats: {
    fat_soluble_vitamins: { correct: 0, total: 0 },
    water_soluble_vitamins: { correct: 0, total: 0 },
    minerals: { correct: 0, total: 0 }
  },
  history: [],        // [{questionId, correct, pointsEarned, timestamp}]
  highScore: 0,
  progressCode: ""
};

const GS = (() => {
  // ---- Internal helpers ----
  const KEY = "bioforge_state";
  let state = null;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      state = raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : { ...DEFAULT_STATE };
    } catch {
      state = { ...DEFAULT_STATE };
    }
    return state;
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }

  function get() { return state || load(); }

  // ---- Level helpers ----
  function getLevel(pts) {
    let lv = LEVELS[0];
    for (const l of LEVELS) { if (pts >= l.minPoints) lv = l; }
    return lv;
  }
  function getNextLevel(pts) {
    for (const l of LEVELS) { if (l.minPoints > pts) return l; }
    return null;
  }
  function getLevelProgress(pts) {
    const cur = getLevel(pts);
    const nxt = getNextLevel(pts);
    if (!nxt) return 1;
    const range = nxt.minPoints - cur.minPoints;
    const progress = pts - cur.minPoints;
    return Math.min(progress / range, 1);
  }

  // ---- Public API ----
  return {
    init() { load(); return this; },
    getState() { return get(); },

    setPlayerName(name) {
      get().playerName = name.trim() || "Intern";
      save();
    },

    recordAnswer(question, chosenOption, timeBonus = 0) {
      const s = get();
      const isCorrect = chosenOption.id === question.correctOption;
      const isOptimal = chosenOption.type === "optimal";

      // Points
      let pts = 0;
      if (isCorrect) {
        pts = question.options.find(o => o.id === question.correctOption).nutri_points;
        pts += timeBonus;
        s.streak++;
        if (s.streak > s.maxStreak) s.maxStreak = s.streak;
        // Streak bonus
        if (s.streak >= 3) pts += 25;
        if (s.streak >= 5) pts += 50;
      } else {
        pts = chosenOption.nutri_points; // negative for wrong answers
        s.streak = 0;
      }
      s.totalPoints = Math.max(0, s.totalPoints + pts);
      if (s.totalPoints > s.highScore) s.highScore = s.totalPoints;

      // Stats
      s.questionsAnswered++;
      if (isCorrect) s.correctAnswers++;
      s.accuracy = Math.round((s.correctAnswers / s.questionsAnswered) * 100);

      // Category stats
      const cat = s.categoryStats[question.category];
      if (cat) {
        cat.total++;
        if (isCorrect) cat.correct++;
      }

      // Bagel collection
      if (isCorrect && question.bagel) {
        const alreadyHas = s.bagelsCollected.some(b => b.id === question.bagel.id);
        if (!alreadyHas) {
          s.bagelsCollected.push({ ...question.bagel, earnedAt: Date.now() });
        }
      }

      // History
      s.history.push({
        questionId: question.id,
        nutrient: question.nutrient,
        category: question.category,
        correct: isCorrect,
        chosenType: chosenOption.type,
        pointsEarned: pts,
        timestamp: Date.now()
      });
      // Keep last 100
      if (s.history.length > 100) s.history = s.history.slice(-100);

      save();
      return { isCorrect, pts, newStreak: s.streak, newTotal: s.totalPoints };
    },

    checkLevelUp(prevPts) {
      const s = get();
      const prevLevel = getLevel(prevPts);
      const newLevel = getLevel(s.totalPoints);
      return prevLevel.name !== newLevel.name ? newLevel : null;
    },

    purchaseOutfit(outfitId) {
      const s = get();
      const outfit = OUTFITS.find(o => o.id === outfitId);
      if (!outfit) return false;
      if (s.unlockedOutfits.includes(outfitId)) return true;
      if (s.totalPoints < outfit.cost) return false;
      s.totalPoints -= outfit.cost;
      s.unlockedOutfits.push(outfitId);
      save();
      return true;
    },

    equipOutfit(outfitId) {
      const s = get();
      if (s.unlockedOutfits.includes(outfitId)) {
        s.outfitId = outfitId;
        save();
        return true;
      }
      return false;
    },

    generateProgressCode() {
      const s = get();
      const payload = {
        n: s.playerName,
        tp: s.totalPoints,
        hs: s.highScore,
        qa: s.questionsAnswered,
        ca: s.correctAnswers,
        acc: s.accuracy,
        ms: s.maxStreak,
        bc: s.bagelsCollected.length,
        cs: s.categoryStats,
        ts: Date.now()
      };
      return btoa(JSON.stringify(payload));
    },

    getOutfits() {
      const s = get();
      return OUTFITS.map(o => ({
        ...o,
        unlocked: s.unlockedOutfits.includes(o.id),
        equipped: s.outfitId === o.id,
        canAfford: s.totalPoints >= o.cost
      }));
    },

    getLevel: (pts) => getLevel(pts !== undefined ? pts : (state?.totalPoints || 0)),
    getNextLevel: (pts) => getNextLevel(pts !== undefined ? pts : (state?.totalPoints || 0)),
    getLevelProgress: (ptsArg) => getLevelProgress(ptsArg !== undefined ? ptsArg : (state?.totalPoints || 0)),

    reset() {
      state = { ...DEFAULT_STATE };
      localStorage.removeItem(KEY);
    }
  };
})();

// Auto-init
GS.init();

/* The spine: every time and shared rect of "100 SaaS ideas". Read by every composition and by
   scripts/synth-score.mjs. 120 BPM grid (beat 0.5 s); a chapter is 18 beats (9 s). */
(function (root) {
  const BEAT = 0.5;
  const HOOK = 6.0; // the hook ends and chapter 0 starts on a bar
  const CH = 9.0; // one chapter: 18 beats
  const N = 10; // chapters
  const PER = 10; // ideas per chapter

  // inside a chapter (seconds from its t0)
  const C = {
    slam: 0.0, // number + title slam at the centre
    dock: 1.25, // the title flies to the header
    docked: 1.75,
    card0: 2.0, // first card lands; one per beat after it
    hold: 7.0, // after the tenth card lands (card0 + 9 beats + a beat)
    exit: 8.5, // the grid leaves
  };
  const CHAP = Array.from({ length: N }, (_, k) => {
    const t0 = HOOK + CH * k;
    const cards = Array.from({ length: PER }, (_, i) => t0 + C.card0 + BEAT * i);
    return { t0, slam: t0 + C.slam, dock: t0 + C.dock, docked: t0 + C.docked, cards, hold: t0 + C.hold, exit: t0 + C.exit, end: t0 + CH };
  });

  const FIN = HOOK + CH * N; // 96.0
  const T = {
    BEAT,
    hook: {
      big: 0.1, // "100" slams
      count: [0.1, 1.4], // 000 -> 100 roll
      words: [1.5, 1.75, 2.0, 2.25, 2.5], // "ideas for your next SaaS"
      sub: 3.25,
      legend: [3.75, 4.0],
      out: 5.5,
    },
    CHAP,
    fin: {
      t0: FIN,
      words: [FIN + 0.25, FIN + 0.5, FIN + 1.0, FIN + 1.25, FIN + 1.5], // "100 ideas. Pick one. Ship."
      out: FIN + 2.2,
      mark: FIN + 2.5,
      tagline: FIN + 3.25,
      cta: FIN + 4.0,
      recap: FIN + 4.75,
    },
    end: FIN + 8.0,
    win: {
      bg: [0, FIN + 8.0],
      hook: [0, HOOK + 0.1],
      chapters: [HOOK - 0.1, FIN + 0.1],
      hud: [HOOK, FIN + 0.6],
      finale: [FIN - 0.05, FIN + 8.0],
    },
  };

  // shared geometry (1920x1080)
  const G = {
    padX: 96,
    head: { x: 96, y: 60, h: 140 },
    grid: { x: 96, y: 226, w: 1728, cols: 5, gap: 22, rowH: 372 },
    bar: { x: 96, y: 1038, w: 1728, h: 6, gap: 10 },
    counter: { right: 96, y: 58 },
  };
  G.grid.colW = (G.grid.w - G.grid.gap * (G.grid.cols - 1)) / G.grid.cols;
  G.cardRect = (i) => {
    const c = i % G.grid.cols;
    const r = Math.floor(i / G.grid.cols);
    return { x: G.grid.x + c * (G.grid.colW + G.grid.gap), y: G.grid.y + r * (G.grid.rowH + G.grid.gap), w: G.grid.colW, h: G.grid.rowH };
  };

  const COPY = {
    hookWords: ["ideas", "for", "your", "next", "SaaS"],
    hookSub: "Ten markets, ten ideas each, all buildable by a small team",
    legend: [
      { type: "H", label: "Horizontal", note: "any business can use it" },
      { type: "V", label: "Vertical", note: "built for one industry" },
    ],
    finWords: [["100", "ideas."], ["Pick", "one.", "Ship."]],
    tagline: "Build the boring thing. Charge for it.",
    cta: "Browse all 100 ideas",
    url: "100-ideas-saas.vercel.app",
    recap: ["AI back office", "Dev tools", "Local services", "Health", "Compliance"],
  };

  const api = { T, G, COPY, N, PER };
  root.LAYOUT = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);

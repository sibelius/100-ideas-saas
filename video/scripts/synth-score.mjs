#!/usr/bin/env bun
/**
 * Score for "100 SaaS ideas", keyed to the spine (assets/lib/layout.js). Bright major, 120 BPM.
 * usage: bun scripts/synth-score.mjs [out.wav]   (scripts/build-score.sh normalizes to -16 LUFS)
 */
import { createRequire } from "node:module";
import { createScore } from "./score-engine.mjs";

const require = createRequire(import.meta.url);
require(process.env.LAYOUT || "../assets/lib/layout.js");
const L = globalThis.LAYOUT;
const T = L.T;
const H = T.hook;
const F = T.fin;
const CH = T.CHAP;

const S = createScore({ duration: T.end, seed: 11 });
const { kick, clap, hat, tick, thock, sub, pluck, bell, marimba, pad, blip, riser, whoosh, reverseSwell, impact } = S;

// D major, I-V-vi-IV, a bar per chord from the first chapter
const PROG = [
  [38, [62, 66, 69, 74]],
  [33, [61, 64, 69, 73]],
  [35, [62, 66, 71, 74]],
  [31, [62, 67, 71, 74]],
];
const chordAt = (t) => PROG[((Math.floor((t - CH[0].t0) / 2) % 4) + 4) % 4];
const SCALE = [62, 64, 66, 69, 71, 74, 76, 78, 81, 83, 86];

function groove(t0, t1, mode) {
  for (let t = t0; t < t1 - 1e-6; t += 0.5) {
    const beat = Math.round(t / 0.5) % 4;
    if (mode === "light") {
      if (beat === 0) kick(t, 0.7);
      if (beat === 2) kick(t, 0.45);
    } else {
      if (beat === 0 || beat === 2 || mode === "full") kick(t, beat === 0 ? 0.85 : mode === "full" ? 0.6 : 0.66);
      if (beat === 1 || beat === 3) clap(t + 0.004, mode === "full" ? 0.28 : 0.22, 0.05);
    }
    hat(t + 0.25, mode === "light" ? 0.07 : 0.1, true, 0.3);
  }
  for (let t = t0; t < t1 - 1e-6; t += 0.125) hat(t, Math.round(t / 0.125) % 2 ? (mode === "light" ? 0.04 : 0.06) : 0.03, false, -0.3);
  for (let t = t0; t < t1 - 1e-6; t += 0.5) {
    const [root] = chordAt(t);
    sub(t + 0.25, 0.18, root + 12, mode === "light" ? 0.28 : 0.36);
    if (mode === "full") sub(t + 0.375, 0.08, root + 19, 0.16);
  }
}
function arp(t0, t1, g, bright) {
  const PAT = [0, 2, 1, 3, 2, 1, 3, 2];
  for (let t = t0; t < t1 - 1e-6; t += 0.25) {
    const [, notes] = chordAt(t);
    const s = Math.round((t - CH[0].t0) / 0.25);
    pluck(t, notes[PAT[((s % 8) + 8) % 8]] + 12 + (s % 16 >= 8 ? 12 : 0), g, 0.1, bright, 0.16);
  }
}
const motif = (t, g = 0.07, p = 0) => {
  bell(t, 74, g, p, 0.5);
  bell(t + 0.125, 81, g * 1.1, p, 0.7);
};

// ── HOOK ──────────────────────────────────────────────────────────────────────
kick(H.big, 0.95);
thock(H.big, 0.34, 80);
impact(H.big, 0.18);
[62, 66, 69, 74].forEach((m, i) => bell(H.big + 0.01 + i * 0.012, m + 12, 0.05, -0.3 + i * 0.2, 0.8));
pad(0.0, H.out, [50, 62, 66, 69], 0.03, 1200, 0.2, 0.6);
for (let i = 0; i < 30; i++) tick(H.count[0] + (H.count[1] - H.count[0]) * Math.pow(i / 30, 0.6), 0.024, hash2(i), 2400 + i * 70);
bell(H.count[1], 86, 0.05, 0, 0.7);
H.words.forEach((t, i) => {
  kick(t, 0.72);
  thock(t, 0.24, 70 + i * 8);
  bell(t + 0.004, [74, 78, 81, 83, 86][i], 0.045, 0, 0.6);
});
impact(H.words[4], 0.12);
for (let t = H.words[4] + 0.5; t < H.out - 1e-6; t += 0.5) {
  kick(t, Math.round((t - H.words[4]) / 0.5) % 2 ? 0.34 : 0.5);
  hat(t + 0.25, 0.07, true, 0.3);
  sub(t + 0.25, 0.16, 50, 0.24);
}
pluck(H.sub, 78, 0.04, 0, 0.9, 0.3);
H.legend.forEach((t, i) => blip(t, 1500 + i * 220, 1100 + i * 160, 0.045, i ? 0.4 : -0.4));
riser(H.out - 1.0, CH[0].t0, 0.07, 500, 8000);
whoosh(H.out, 0.5, 0.2, 0, 0, 1800);

// ── CHAPTERS ─────────────────────────────────────────────────────────────────
CH.forEach((c, k) => {
  const mode = k < 2 ? "light" : k < 7 ? "normal" : "full";
  groove(c.t0 + 0.5, c.exit + 0.5, mode);
  if (k >= 2) arp(c.card0 ?? c.cards[0], c.exit, k < 7 ? 0.024 : 0.03, k < 7 ? 0.75 : 0.95);
  // the chapter slam and the dock
  kick(c.slam, 0.95);
  thock(c.slam, 0.3, 85);
  impact(c.slam, 0.12);
  motif(c.slam + 0.02, 0.06);
  whoosh(c.dock, 0.45, 0.1, 0.4, -0.4, 2400);
  // one note per card, climbing the scale; a soft tick on the counter
  c.cards.forEach((t, i) => {
    marimba(t, SCALE[i], 0.06, -0.6 + (i % 5) * 0.3, 0.3);
    tick(t + 0.01, 0.025, 0.7, 3600 + i * 90);
  });
  bell(c.cards[9] + 0.02, 86, 0.04, 0.2, 0.8);
  // the grid leaves, a pickup into the next chapter
  whoosh(c.exit, 0.4, 0.14, 0.6, -0.8, 2000);
  if (k < CH.length - 1) {
    reverseSwell(c.exit - 0.1, c.end, 0.08, 62);
    for (let i = 0; i < 4; i++) hat(c.exit + i * 0.125, 0.04 + i * 0.015, false, 0.2);
  }
});
pad(CH[0].t0, CH[1].t0 - CH[0].t0, [50, 62, 66, 69], 0.02, 1400, 0.5, 0.8); // a bed under the light groove

// ── FINALE ───────────────────────────────────────────────────────────────────
reverseSwell(CH[9].exit, F.words[0], 0.12, 62);
F.words.forEach((t, i) => {
  kick(t, i === 0 || i === 4 ? 0.95 : 0.7);
  thock(t, 0.26, 80 + i * 6);
  bell(t + 0.004, [74, 78, 81, 83, 86][i] + 12, 0.045, -0.2 + i * 0.1, 0.8);
});
impact(F.words[4], 0.16);
for (let t = F.words[4] + 0.5; t < F.mark - 1e-6; t += 0.25) hat(t, 0.05 + (t - F.words[4]) * 0.02, false, 0.1);
riser(F.out - 0.4, F.mark, 0.08, 600, 9000);
impact(F.mark, 0.26);
kick(F.mark, 1.0);
pad(F.mark, T.end - F.mark - 0.6, [50, 57, 62, 66, 69, 76], 0.05, 2400, 0.03, 1.3, 1.3);
motif(F.tagline, 0.075);
for (let t = F.tagline; t < F.recap + 1.0 - 1e-6; t += 0.5) {
  const beat = Math.round((t - F.tagline) / 0.5) % 4;
  if (beat === 0 || beat === 2) kick(t, 0.6);
  if (beat === 1 || beat === 3) clap(t + 0.004, 0.16, 0);
  hat(t + 0.25, 0.07, true, 0.3);
  sub(t + 0.25, 0.18, 50, 0.28);
}
pluck(F.cta, 74, 0.05, 0, 0.9, 0.3);
bell(F.cta + 0.5, 86, 0.04, 0.2, 0.8);
L.COPY.recap.forEach((_, k) => marimba(F.recap + k * 0.08, [74, 76, 78, 81, 86][k], 0.05, -0.5 + k * 0.25, 0.3));
bell(T.end - 1.5, 90, 0.03, 0, 1.2);

function hash2(i) {
  return S.hash(i, 3) * 0.5;
}

S.write(process.argv[2] ?? "assets/audio/score.wav");

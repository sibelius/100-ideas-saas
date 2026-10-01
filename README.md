# 100 SaaS ideas

Landing page for the "100 SaaS ideas" video: the 104s montage plus all 100 ideas, in 10 chapters.

- `data/ideas.json` — the ideas, shared by the site and the video (H = horizontal, V = vertical)
- `app/opengraph-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx` — share card and icons, rendered with Bricolage Grotesque from `assets/`
- `video/` — the HyperFrames project for the video (not deployed, see `.vercelignore`)

```bash
npm run dev

# re-render the video after editing data/ideas.json
cd video && bun install
node -e 'const d=require("../data/ideas.json");require("fs").writeFileSync("assets/lib/ideas.js","(function (root) {\n  root.IDEAS = "+JSON.stringify(d,null,1)+";\n  if (typeof module !== \"undefined\" && module.exports) module.exports = root.IDEAS;\n})(typeof window !== \"undefined\" ? window : globalThis);\n")'
bash scripts/hf.sh check && bash scripts/render.sh out/100-ideas-saas.mp4
ffmpeg -i out/100-ideas-saas.mp4 -c:v libx264 -crf 27 -c:a aac -movflags +faststart ../public/video/100-ideas-saas.mp4
```

import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Bricolage Grotesque static TTFs for next/og (Satori does not read woff2 or variable fonts).
export async function bricolageFonts() {
  const [semibold, extrabold] = await Promise.all([
    readFile(join(process.cwd(), "assets/bricolage-600.ttf")),
    readFile(join(process.cwd(), "assets/bricolage-800.ttf")),
  ]);
  return [
    { name: "Bricolage", data: semibold, weight: 600 as const, style: "normal" as const },
    { name: "Bricolage", data: extrabold, weight: 800 as const, style: "normal" as const },
  ];
}

import data from "@/data/ideas.json";

// H = horizontal (any business can use it), V = vertical (built for one industry).
export type Idea = { type: "H" | "V"; title: string; pitch: string; tags: string[] };
export type Chapter = { name: string; sub: string; ideas: Idea[] };

export const chapters = data as Chapter[];

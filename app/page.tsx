import { chapters } from "@/lib/ideas";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <section className="relative isolate bg-ink-900">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_75%_30%,rgba(198,244,50,0.14),transparent_70%),radial-gradient(50%_50%_at_10%_90%,rgba(44,35,114,0.9),transparent_70%)]"
        />
        <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
          <a href="#" className="text-xl font-extrabold tracking-tight">
            <span className="text-lime">100</span> SaaS ideas
          </a>
          <a
            href="#ch-1"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-bold transition hover:border-lime hover:text-lime"
          >
            Browse the ideas
          </a>
        </header>

        <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-14">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-lime">
            001 → 100
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            100 ideas for your next <span className="text-lime">SaaS</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium text-muted sm:text-xl">
            Ten markets, ten ideas each, all buildable by a small team. Some
            serve any business, some go deep on one industry.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/50">
            <video
              className="aspect-video w-full"
              src="/video/100-ideas-saas.mp4"
              poster="/video/poster.jpg"
              controls
              playsInline
              preload="metadata"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-muted">
            <span className="flex items-center gap-2">
              <span className="rounded-md bg-white px-2 py-0.5 text-xs font-extrabold text-ink-900">
                Horizontal
              </span>
              any business can use it
            </span>
            <span className="flex items-center gap-2">
              <span className="rounded-md bg-lime px-2 py-0.5 text-xs font-extrabold text-ink-900">
                Vertical
              </span>
              built for one industry
            </span>
          </div>

          <nav aria-label="Chapters" className="mt-8 flex flex-wrap gap-2">
            {chapters.map((chapter, i) => (
              <a
                key={chapter.name}
                href={`#ch-${i + 1}`}
                className="rounded-full bg-white/5 px-4 py-2 text-sm font-bold ring-1 ring-white/10 transition hover:bg-lime hover:text-ink-900"
              >
                <span className="font-mono text-lime-bright/80">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                {chapter.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {chapters.map((chapter, i) => (
        <section
          key={chapter.name}
          id={`ch-${i + 1}`}
          className="scroll-mt-4 border-t border-white/5 even:bg-ink-900/50"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex items-baseline gap-5">
              <span className="text-6xl font-extrabold tabular-nums tracking-tighter text-lime sm:text-7xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
                  {chapter.name}
                </h2>
                <p className="mt-1 font-medium text-muted">{chapter.sub}</p>
              </div>
            </div>

            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chapter.ideas.map((idea, j) => {
                const n = i * 10 + j + 1;
                const horizontal = idea.type === "H";
                return (
                  <li
                    key={idea.title}
                    className="flex flex-col rounded-2xl bg-ink-800/80 p-5 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:ring-lime/60"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm text-muted">
                        #{String(n).padStart(3, "0")}
                      </span>
                      <span
                        className={
                          horizontal
                            ? "rounded-md bg-white px-2 py-0.5 text-xs font-extrabold text-ink-900"
                            : "rounded-md bg-lime px-2 py-0.5 text-xs font-extrabold text-ink-900"
                        }
                      >
                        {horizontal ? "Horizontal" : "Vertical"}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold leading-snug">
                      {idea.title}
                    </h3>
                    <p className="mt-2 flex-1 leading-relaxed text-muted">
                      {idea.pitch}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {idea.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-md bg-white/5 px-2 py-0.5 text-xs font-bold text-white/80"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ))}

      <section className="relative isolate border-t border-white/5 bg-ink-900">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_50%_100%,rgba(198,244,50,0.16),transparent_70%)]"
        />
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
          <p className="text-5xl font-extrabold tracking-tight sm:text-7xl">
            <span className="text-lime">100</span> SaaS ideas
          </p>
          <h2 className="mt-6 text-2xl font-bold text-muted sm:text-3xl">
            Build the boring thing. Charge for it.
          </h2>
          <a
            href="#ch-1"
            className="mt-10 rounded-xl bg-lime px-7 py-4 text-lg font-extrabold text-ink-900 transition hover:bg-lime-bright"
          >
            Pick one and start
          </a>
        </div>
      </section>

      <footer className="bg-ink-950 px-4 py-8 text-center text-sm font-medium text-muted">
        Ideas, not products. Validate with real customers before you build.
      </footer>
    </main>
  );
}

import { Head } from "fresh/runtime";
import { define } from "../../utils.ts";

const proposals = [
  {
    id: "a",
    name: "Constellation",
    tag: "Deep space / connected systems",
    webgl:
      "Live particle network — nodes drift and link to their neighbours, tilting with the pointer.",
    mood:
      "Dark, high contrast, glass panels, gradient headlines. Reads like a modern AI/infra product site.",
    strength: "Highest impact. Signals AI + platform work immediately.",
    watch: "Dark-only; the existing light theme is dropped.",
    swatches: ["#05070f", "#38bdf8", "#818cf8", "#f1f5f9"],
  },
  {
    id: "b",
    name: "Aurora",
    tag: "Editorial studio / light & airy",
    webgl:
      "Full-bleed fragment shader — a slow simplex-noise gradient that drifts and follows the pointer.",
    mood:
      "Serif display type, hairline rules, numbered rows, lots of whitespace. Boutique consultancy.",
    strength: "Most timeless, best readability, keeps light + dark modes.",
    watch: "Quietest of the three; less obviously 'tech'.",
    swatches: ["#ffffff", "#a3ccfc", "#6772f1", "#0b0b16"],
  },
  {
    id: "c",
    name: "Blueprint",
    tag: "Technical schematic / terminal",
    webgl:
      "Wireframe torus knot inside an icosahedral shell over a receding grid, with scanline overlay.",
    mood:
      "JetBrains Mono throughout, grid paper, cyan on ink with amber accents, ruled data tables.",
    strength:
      "Most credible to engineers; the curl contact block finally belongs.",
    watch: "Strong personality — mono body text is a commitment.",
    swatches: ["#03060c", "#22d3ee", "#fbbf24", "#e2e8f0"],
  },
];

export default define.page(function PreviewIndex() {
  return (
    <>
      <Head>
        <title>LOOSEDAYS — Redesign proposals</title>
        <meta name="robots" content="noindex" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>

      <div class="min-h-screen bg-[#0b0d14] px-6 py-16 text-slate-300 antialiased">
        <div class="mx-auto max-w-5xl">
          <p class="text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-400">
            Local review
          </p>
          <h1 class="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            LOOSEDAYS redesign — 3 proposals
          </h1>
          <p class="mt-4 max-w-2xl leading-relaxed text-slate-400">
            Identical copy, three visual languages, each with its own three.js
            hero. The current site stays untouched at{" "}
            <a href="/" class="text-sky-400 underline underline-offset-4">/</a>.
          </p>

          <div class="mt-12 space-y-4">
            {proposals.map((p) => (
              <a
                href={p.id === "a" ? "/" : `/preview/${p.id}`}
                class="group block rounded-2xl bg-white/[0.025] p-7 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:ring-sky-400/40"
              >
                <div class="flex flex-wrap items-center gap-4">
                  <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/15 font-semibold uppercase text-sky-300">
                    {p.id}
                  </span>
                  <h2 class="text-2xl font-semibold text-white">{p.name}</h2>
                  <span class="text-sm text-slate-500">{p.tag}</span>
                  <span class="ml-auto flex gap-1.5">
                    {p.swatches.map((c) => (
                      <span
                        class="h-6 w-6 rounded-full ring-1 ring-white/15"
                        style={`background:${c}`}
                      />
                    ))}
                  </span>
                </div>

                <dl class="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt class="mb-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      three.js
                    </dt>
                    <dd class="leading-relaxed text-slate-300">{p.webgl}</dd>
                  </div>
                  <div>
                    <dt class="mb-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      Look &amp; feel
                    </dt>
                    <dd class="leading-relaxed text-slate-300">{p.mood}</dd>
                  </div>
                  <div>
                    <dt class="mb-1 text-[11px] uppercase tracking-[0.2em] text-emerald-500/80">
                      Strength
                    </dt>
                    <dd class="leading-relaxed text-slate-300">
                      {p.strength}
                    </dd>
                  </div>
                  <div>
                    <dt class="mb-1 text-[11px] uppercase tracking-[0.2em] text-amber-500/80">
                      Trade-off
                    </dt>
                    <dd class="leading-relaxed text-slate-300">{p.watch}</dd>
                  </div>
                </dl>

                <p class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-400">
                  {p.id === "a"
                    ? "Open the live site"
                    : `Open proposal ${p.id.toUpperCase()}`}
                  <span class="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </a>
            ))}
          </div>

          <p class="mt-12 text-xs text-slate-600">
            All three respect prefers-reduced-motion, pause their render loop
            off-screen, and fall back to a static background without WebGL.
          </p>
        </div>
      </div>
    </>
  );
});

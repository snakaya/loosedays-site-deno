import { Head } from "fresh/runtime";
import { define } from "../../utils.ts";
import Blueprint from "../../islands/hero/Blueprint.tsx";
import NavBar from "../../islands/site/NavBar.tsx";
import SkillCloud from "../../islands/site/SkillCloud.tsx";
import Reveal from "../../islands/site/Reveal.tsx";
import CopyCommand from "../../islands/site/CopyCommand.tsx";
import {
  companyRows,
  copyright,
  footerBlurb,
  navLinks,
  openIdUrl,
  products,
  services,
  social,
  tagline,
} from "../../content.tsx";

const SLASHES = "// ";

/** Schematic-style section header: numbered, ruled, monospaced. */
function SectionHead(
  { index, title, lead }: { index: string; title: string; lead: string },
) {
  return (
    <Reveal class="mb-14">
      <div class="mb-5 flex items-center gap-4">
        <span class="font-mono text-xs tracking-[0.24em] text-amber-400">
          {index}
        </span>
        <span class="h-px flex-1 bg-cyan-400/25" />
        <span class="font-mono text-[10px] tracking-[0.24em] text-slate-600">
          LDJ／2026
        </span>
      </div>
      <h2 class="font-mono text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p class="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-slate-400">
        <span class="text-cyan-400">{SLASHES}</span>
        {lead}
      </p>
    </Reveal>
  );
}

export default define.page(function ProposalC() {
  return (
    <>
      <Head>
        <title>LOOSEDAYS — Proposal C · Blueprint</title>
        <meta name="robots" content="noindex" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            .blueprint { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace; }
            .blueprint .font-mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace; }
            .grid-paper {
              background-image:
                linear-gradient(rgba(34,211,238,0.055) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34,211,238,0.055) 1px, transparent 1px);
              background-size: 56px 56px;
            }
            @keyframes ldj-scan {
              0%   { transform: translateY(-10%); }
              100% { transform: translateY(110%); }
            }
            .scanline::after {
              content: '';
              position: absolute;
              inset-inline: 0;
              height: 26%;
              background: linear-gradient(to bottom, transparent, rgba(34,211,238,0.05), transparent);
              animation: ldj-scan 7s linear infinite;
              pointer-events: none;
            }
            @media (prefers-reduced-motion: reduce) {
              .scanline::after { animation: none; opacity: 0.35; }
            }
          `}
        </style>
      </Head>

      <div class="blueprint grid-paper min-h-screen bg-[#03060c] text-slate-300 antialiased selection:bg-cyan-400/30">
        <NavBar variant="c" brand="LOOSEDAYS Co., Ltd._" />

        {/* ---------------------------------------------------- hero --- */}
        <section
          id="top"
          class="scanline relative flex min-h-screen items-center overflow-hidden"
        >
          <Blueprint />
          {/* Scrim: a soft wash on mobile, left-weighted once the solid moves right. */}
          <div
            class="pointer-events-none absolute inset-0 lg:hidden"
            style="background: radial-gradient(120% 80% at 50% 50%, rgba(3,6,12,0.35) 0%, rgba(3,6,12,0.55) 55%, #03060c 100%);"
          />
          <div
            class="pointer-events-none absolute inset-0 hidden lg:block"
            style="background: linear-gradient(100deg, #03060c 0%, rgba(3,6,12,0.94) 26%, rgba(3,6,12,0.6) 52%, rgba(3,6,12,0.1) 100%), radial-gradient(120% 90% at 60% 50%, rgba(3,6,12,0) 45%, rgba(3,6,12,0.8) 88%, #03060c 100%);"
          />

          {/* Corner registration marks */}
          <div class="pointer-events-none absolute inset-6 hidden md:block">
            {[
              "left-0 top-0 border-l border-t",
              "right-0 top-0 border-r border-t",
              "left-0 bottom-0 border-l border-b",
              "right-0 bottom-0 border-r border-b",
            ].map((pos) => (
              <span class={`absolute h-8 w-8 border-cyan-400/40 ${pos}`} />
            ))}
          </div>

          <div class="relative z-10 mx-auto w-full max-w-5xl px-6 py-32">
            <p class="mb-8 font-mono text-[11px] tracking-[0.32em] text-cyan-400">
              [ LOOSEDAYS CO.,LTD. — EST. 2020 — TOKYO, JP ]
            </p>

            <img
              src="/images/loosedays_logo_dark.png"
              alt="LOOSEDAYS"
              class="mb-12 w-52 sm:w-64"
            />

            <h1 class="font-mono text-3xl font-bold leading-[1.25] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {tagline.line1[0]}
              <span class="text-cyan-400">{tagline.line1[1]}</span>
              {tagline.line1[2]}
              <br />
              {tagline.line2[0]}
              <span class="text-amber-400">{tagline.line2[1]}</span>
              {tagline.line2[2]}
              <span class="ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.08em] animate-pulse bg-cyan-400" />
            </h1>

            <p class="mt-8 font-mono text-xs uppercase tracking-[0.26em] text-slate-400 sm:text-sm">
              {tagline.sub}
            </p>

            <div class="mt-12 flex flex-wrap gap-3">
              <a
                href="#sec_product"
                class="border border-cyan-400 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300 transition-colors duration-200 hover:bg-cyan-400 hover:text-slate-950"
              >
                ▸ view products
              </a>
              <a
                href="#sec_contact"
                class="border border-slate-700 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-400 transition-colors duration-200 hover:border-slate-400 hover:text-white"
              >
                ▸ contact
              </a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ products --- */}
        <section id="sec_product" class="mx-auto max-w-6xl px-6 py-24">
          <SectionHead
            index="01 / PRODUCTS"
            title="Solutions we build and ship"
            lead="Tools we use ourselves, hardened until they are worth handing to you."
          />

          <div class="grid gap-4 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal delay={i * 90} class="h-full">
                <article class="group relative flex h-full flex-col border border-cyan-400/20 bg-[#050b14]/80 p-6 transition-colors duration-300 hover:border-cyan-400/60">
                  <span
                    class="absolute left-0 top-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                    style={`background:${p.accent}`}
                  />
                  <div class="mb-4 flex items-center justify-between">
                    <span class="font-mono text-[10px] tracking-[0.24em] text-slate-600">
                      MOD.{String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      class="h-2 w-2"
                      style={`background:${p.accent}`}
                    />
                  </div>

                  {p.logo
                    ? (
                      <img
                        src={p.logo}
                        alt={p.name}
                        class="mb-3 h-7 w-auto self-start"
                      />
                    )
                    : (
                      <h3 class="mb-3 font-mono text-2xl font-bold text-white">
                        {p.name}
                      </h3>
                    )}

                  <p class="text-sm font-medium leading-snug text-slate-100">
                    {p.headline}
                  </p>
                  <p class="mt-2 flex-1 font-mono text-xs leading-relaxed text-slate-400">
                    {p.desc}
                  </p>

                  <div class="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span class="border border-slate-700 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div class="mt-5 flex flex-wrap items-center gap-4 border-t border-cyan-400/15 pt-4">
                    {p.links.map((l) => (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener"
                        class="font-mono text-xs text-cyan-300 transition-colors hover:text-amber-400"
                      >
                        ▸ {l.label}
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- work --- */}
        <section id="sec_work" class="mx-auto max-w-6xl px-6 py-24">
          <SectionHead
            index="02 / WORK"
            title="We and you can work together with…"
            lead="Four ways we plug into a team, and the ground we already cover."
          />

          <div class="grid divide-y divide-cyan-400/15 border border-cyan-400/20 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal delay={i * 80} class="h-full">
                <div class="group h-full border-cyan-400/15 p-6 transition-colors duration-300 hover:bg-cyan-400/[0.04] sm:border-l first:sm:border-l-0">
                  <div class="mb-4 flex items-baseline gap-3">
                    <span class="font-mono text-[10px] tracking-[0.2em] text-amber-400">
                      0{i + 1}
                    </span>
                    <s.icon class="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 class="font-mono text-base font-bold uppercase tracking-wide text-white">
                    {s.title}
                  </h3>
                  <p class="mt-2 font-mono text-xs leading-relaxed text-slate-400">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal class="mt-16">
            <div class="mb-8 flex items-center gap-4">
              <span class="font-mono text-xs tracking-[0.24em] text-amber-400">
                KEYWORDS
              </span>
              <span class="h-px flex-1 bg-cyan-400/25" />
            </div>
            <SkillCloud variant="c" />
          </Reveal>
        </section>

        {/* ------------------------------------------------- company --- */}
        <section id="sec_company" class="mx-auto max-w-4xl px-6 py-24">
          <SectionHead
            index="03 / COMPANY"
            title="About us"
            lead="LOOSEDAYS Co.,Ltd. — Nishi-Shinjuku, Tokyo."
          />

          <Reveal>
            <dl class="border border-cyan-400/20 font-mono text-sm">
              {companyRows.map((row, i) => (
                <div
                  class={`flex flex-col sm:flex-row ${
                    i ? "border-t border-cyan-400/15" : ""
                  }`}
                >
                  <dt class="bg-cyan-400/[0.04] px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-cyan-300/80 sm:w-64 sm:shrink-0">
                    {row.label}
                  </dt>
                  <dd class="px-5 py-3 text-slate-200">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} class="mt-6">
            <a
              href={openIdUrl}
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-3 border border-cyan-400/20 px-5 py-3 transition-colors duration-200 hover:border-cyan-400/60"
            >
              <img
                src="/images/openid_logo_dark.svg"
                alt="OpenID Foundation"
                class="h-6"
              />
              <span class="font-mono text-xs text-slate-300">
                OpenID Foundation Sponsoring Member
              </span>
            </a>
          </Reveal>
        </section>

        {/* ------------------------------------------------- contact --- */}
        <section id="sec_contact" class="mx-auto max-w-4xl px-6 py-24">
          <SectionHead
            index="04 / CONTACT"
            title="One request away"
            lead="Our contact details are served as JSON-LD. Run it."
          />
          <Reveal>
            <CopyCommand variant="c" />
          </Reveal>
        </section>

        {/* -------------------------------------------------- footer --- */}
        <footer class="border-t border-cyan-400/20 px-6 pb-10 pt-14">
          <div class="mx-auto grid max-w-6xl gap-10 font-mono md:grid-cols-3">
            <div>
              <img
                src="/images/loosedays_square_logo_dark.png"
                alt="LOOSEDAYS"
                class="w-24"
              />
              <p class="mt-4 max-w-xs text-xs leading-relaxed text-slate-500">
                {footerBlurb}
              </p>
            </div>

            <div>
              <p class="mb-4 text-[10px] uppercase tracking-[0.24em] text-amber-400">
                Navigation
              </p>
              <ul class="space-y-2 text-xs">
                {navLinks.slice(1).map((l) => (
                  <li>
                    <a
                      href={l.href}
                      class="text-slate-500 transition-colors hover:text-cyan-300"
                    >
                      ▸ {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p class="mb-4 text-[10px] uppercase tracking-[0.24em] text-amber-400">
                Connect
              </p>
              <ul class="space-y-2 text-xs">
                {social.map((s) => (
                  <li>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener"
                      class="text-slate-500 transition-colors hover:text-cyan-300"
                    >
                      ▸ {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div class="mt-5 flex items-center gap-3">
                <a
                  href="https://deno.com/"
                  target="_blank"
                  rel="noopener"
                  class="text-[11px] text-slate-500 transition-colors hover:text-cyan-300"
                >
                  Deno
                </a>
                <a href="https://fresh.deno.dev" target="_blank" rel="noopener">
                  <img
                    src="https://fresh.deno.dev/fresh-badge-dark.svg"
                    alt="Made with Fresh"
                    class="h-6"
                  />
                </a>
              </div>
            </div>
          </div>

          <p class="mx-auto mt-12 max-w-6xl border-t border-cyan-400/10 pt-6 text-center font-mono text-[11px] text-slate-600">
            {copyright}
          </p>
        </footer>
      </div>
    </>
  );
});

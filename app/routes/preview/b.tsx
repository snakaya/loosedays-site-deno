import { ComponentChildren } from "preact";
import { Head } from "fresh/runtime";
import { define } from "../../utils.ts";
import Aurora from "../../islands/hero/Aurora.tsx";
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

/** Left-aligned editorial section header with a running number. */
function SectionHead(
  { index, title, lead }: {
    index: string;
    title: ComponentChildren;
    lead: string;
  },
) {
  return (
    <Reveal from="left" class="mb-16 max-w-2xl">
      <p class="mb-6 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
        <span>{index}</span>
        <span class="h-px w-16 bg-slate-300 dark:bg-white/20" />
      </p>
      <h2 class="font-display whitespace-pre-line text-5xl leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-6xl">
        {title}
      </h2>
      <p class="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-400">
        {lead}
      </p>
    </Reveal>
  );
}

export default define.page(function ProposalB() {
  return (
    <>
      <Head>
        <title>LOOSEDAYS — Proposal B · Aurora</title>
        <meta name="robots" content="noindex" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            .font-display { font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; }
            .font-display em { font-style: italic; }
          `}
        </style>
      </Head>

      <div class="min-h-screen bg-white text-slate-800 antialiased selection:bg-indigo-200 dark:bg-[#0b0b16] dark:text-slate-300 dark:selection:bg-indigo-500/40">
        <NavBar variant="b" themeToggle />

        {/* ---------------------------------------------------- hero --- */}
        <section
          id="top"
          class="relative flex min-h-screen items-end overflow-hidden"
        >
          <Aurora />
          <div
            class="pointer-events-none absolute inset-0"
            style="background: linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.55) 100%);"
          />
          <div
            class="pointer-events-none absolute inset-0 hidden dark:block"
            style="background: linear-gradient(to bottom, rgba(11,11,22,0.45) 0%, rgba(11,11,22,0) 35%, rgba(11,11,22,0.75) 100%);"
          />

          <div class="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40 md:px-10 md:pb-32">
            <img
              src="/images/loosedays_logo_light.png"
              alt="LOOSEDAYS"
              class="mb-14 w-48 dark:hidden sm:w-60"
            />
            <img
              src="/images/loosedays_logo_dark.png"
              alt="LOOSEDAYS"
              class="mb-14 hidden w-48 dark:block sm:w-60"
            />

            <h1 class="font-display max-w-4xl text-[clamp(2.75rem,9vw,7rem)] leading-[0.95] tracking-[-0.02em] text-slate-900 dark:text-white">
              {tagline.line1[0]}
              <em class="italic">{tagline.line1[1]}</em>
              {tagline.line1[2]}
              <br />
              {tagline.line2[0]}
              <em class="italic">{tagline.line2[1]}</em>
              {tagline.line2[2]}
            </h1>

            <div class="mt-12 flex flex-col gap-6 border-t border-slate-900/10 pt-8 dark:border-white/15 sm:flex-row sm:items-center sm:justify-between">
              <p class="max-w-xl text-sm uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
                {tagline.sub}
              </p>
              <div class="flex flex-wrap items-center gap-6">
                <a
                  href="#sec_product"
                  class="group inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  See our products
                  <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="#sec_contact"
                  class="text-sm text-slate-500 underline-offset-4 transition-colors hover:text-slate-900 hover:underline dark:text-slate-400 dark:hover:text-white"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ products --- */}
        <section
          id="sec_product"
          class="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36"
        >
          <SectionHead
            index="01 — Products"
            title="Solutions we build and ship"
            lead="Tools we use ourselves, hardened until they are worth handing to you."
          />

          <div class="border-t border-slate-200 dark:border-white/10">
            {products.map((p, i) => (
              <Reveal delay={i * 90}>
                <article class="group grid gap-6 border-b border-slate-200 py-10 transition-colors duration-300 hover:bg-slate-50/70 dark:border-white/10 dark:hover:bg-white/[0.03] md:grid-cols-12 md:gap-8 md:px-4">
                  <div class="md:col-span-1">
                    <span class="text-xs font-medium tabular-nums tracking-[0.2em] text-slate-400 dark:text-slate-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div class="md:col-span-6">
                    {p.logo
                      ? (
                        <img
                          src={p.logo}
                          alt={p.name}
                          class="h-8 w-auto dark:brightness-0 dark:invert"
                        />
                      )
                      : (
                        <h3 class="font-display text-3xl tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                          {p.name}
                        </h3>
                      )}
                    <p class="mt-3 text-lg leading-snug text-slate-800 dark:text-slate-200">
                      {p.headline}
                    </p>
                    <p class="mt-3 max-w-lg text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {p.desc}
                    </p>
                  </div>

                  <div class="md:col-span-5 md:text-right">
                    <div class="flex flex-wrap gap-x-3 gap-y-1.5 md:justify-end">
                      {p.tags.map((t) => (
                        <span class="text-[11px] uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div class="mt-5 flex flex-wrap items-center gap-5 md:justify-end">
                      {p.links.map((l) => (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener"
                          class="group/link inline-flex items-center gap-1.5 border-b border-slate-300 pb-0.5 text-sm font-medium text-slate-900 transition-colors hover:border-slate-900 dark:border-white/25 dark:text-white dark:hover:border-white"
                        >
                          {l.label}
                          <span class="inline-block transition-transform duration-300 group-hover/link:translate-x-0.5">
                            ↗
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- work --- */}
        <section
          id="sec_work"
          class="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36"
        >
          <SectionHead
            index="02 — Work"
            title={
              <>
                We and you can<br />work together with…
              </>
            }
            lead="Four ways we plug into a team, and the ground we already cover."
          />

          <div class="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal delay={i * 80}>
                <div class="group border-t border-slate-900/15 pt-6 transition-colors duration-300 hover:border-slate-900 dark:border-white/15 dark:hover:border-white">
                  <s.icon class="mb-5 h-8 w-8 text-indigo-500 dark:text-indigo-400" />
                  <h3 class="font-display text-2xl text-slate-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p class="mt-2 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal class="mt-24">
            <p class="mb-8 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
              <span>Keywords</span>
              <span class="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            </p>
            <SkillCloud variant="b" />
          </Reveal>
        </section>

        {/* ------------------------------------------------- company --- */}
        <section
          id="sec_company"
          class="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36"
        >
          <SectionHead
            index="03 — Company"
            title="About us"
            lead="LOOSEDAYS Co.,Ltd. — Nishi-Shinjuku, Tokyo."
          />

          <Reveal>
            <dl class="border-t border-slate-200 dark:border-white/10">
              {companyRows.map((row) => (
                <div class="grid gap-1 border-b border-slate-200 py-5 dark:border-white/10 sm:grid-cols-12 sm:gap-8">
                  <dt class="text-[11px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 sm:col-span-4">
                    {row.label}
                  </dt>
                  <dd class="text-sm text-slate-800 dark:text-slate-200 sm:col-span-8">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} class="mt-10">
            <a
              href={openIdUrl}
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-3 border-b border-transparent pb-1 transition-colors hover:border-slate-900 dark:hover:border-white"
            >
              <img
                src="/images/openid_logo_light.svg"
                alt="OpenID Foundation"
                class="h-7 dark:hidden"
              />
              <img
                src="/images/openid_logo_dark.svg"
                alt="OpenID Foundation"
                class="hidden h-7 dark:block"
              />
              <span class="text-sm text-slate-600 dark:text-slate-300">
                OpenID Foundation Sponsoring Member
              </span>
            </a>
          </Reveal>
        </section>

        {/* ------------------------------------------------- contact --- */}
        <section
          id="sec_contact"
          class="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36"
        >
          <SectionHead
            index="04 — Contact"
            title={
              <>
                One request<br />away
              </>
            }
            lead="Our contact details are served as JSON-LD. Run it."
          />
          <Reveal>
            <div class="md:pl-0">
              <CopyCommand variant="b" />
            </div>
          </Reveal>
        </section>

        {/* -------------------------------------------------- footer --- */}
        <footer class="border-t border-slate-200 px-6 pb-10 pt-16 dark:border-white/10 md:px-10">
          <div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
            <div>
              <img
                src="/images/loosedays_square_logo_light.png"
                alt="LOOSEDAYS"
                class="w-24 dark:hidden"
              />
              <img
                src="/images/loosedays_square_logo_dark.png"
                alt="LOOSEDAYS"
                class="hidden w-24 dark:block"
              />
              <p class="mt-4 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {footerBlurb}
              </p>
            </div>

            <div>
              <p class="mb-4 text-[11px] uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                Navigation
              </p>
              <ul class="space-y-2 text-sm">
                {navLinks.slice(1).map((l) => (
                  <li>
                    <a
                      href={l.href}
                      class="text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p class="mb-4 text-[11px] uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                Connect
              </p>
              <ul class="space-y-2 text-sm">
                {social.map((s) => (
                  <li>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener"
                      class="text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
              <div class="mt-5 flex items-center gap-3">
                <a
                  href="https://deno.com/"
                  target="_blank"
                  rel="noopener"
                  class="text-xs text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
                >
                  Deno
                </a>
                <a href="https://fresh.deno.dev" target="_blank" rel="noopener">
                  <img
                    src="https://fresh.deno.dev/fresh-badge.svg"
                    alt="Made with Fresh"
                    class="h-6 dark:hidden"
                  />
                  <img
                    src="https://fresh.deno.dev/fresh-badge-dark.svg"
                    alt="Made with Fresh"
                    class="hidden h-6 dark:block"
                  />
                </a>
              </div>
            </div>
          </div>

          <p class="mx-auto mt-12 max-w-6xl border-t border-slate-200 pt-6 text-center text-xs text-slate-400 dark:border-white/10 dark:text-slate-600">
            {copyright}
          </p>
        </footer>
      </div>
    </>
  );
});

import { Head } from "fresh/runtime";
import { SiDeno, SiGithub, SiYoutube } from "react-icons/si";
import { page } from "fresh";
import { define } from "../utils.ts";
import Constellation from "../islands/hero/Constellation.tsx";
import NavBar from "../islands/site/NavBar.tsx";
import KeywordSphere from "../islands/site/KeywordSphere.tsx";
import Reveal from "../islands/site/Reveal.tsx";
import CopyCommand from "../islands/site/CopyCommand.tsx";
import AutoVideo from "../islands/site/AutoVideo.tsx";
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
} from "../content.tsx";

function XIcon({ class: className }: { class?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" class={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export const handler = define.handlers({
  GET(ctx) {
    const req = ctx.req;
    if (
      req.headers.has("X-REQUEST-CONTACT") &&
      req.headers.get("X-REQUEST-CONTACT") == "1"
    ) {
      return new Response(
        JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "Corporation",
            "name": "LOOSEDAYS Co.,Ltd.",
            "url": "https://loosedays.jp/",
            "email": "info@loosedays.jp",
            "telephone": "+81343633804",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "JP",
              "addressRegion": "Tokyo",
              "addressLocality": "Shinjyuku-ku",
              "postalCode": "1600023",
              "streetAddress":
                "6F Nishishinjuku Mizuma Bldg, 3-3-13 Nishi-Shinjuku",
            },
          },
        ),
        {
          headers: { "Content-Type": "application/ld+json; charset=utf-8" },
        },
      );
    }
    return page();
  },
});

/** Section heading used across the page. */
function SectionHead(
  { eyebrow, title, lead }: { eyebrow: string; title: string; lead: string },
) {
  return (
    <Reveal class="mb-14 text-center">
      <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-sky-400/80">
        {eyebrow}
      </p>
      <h2 class="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
        {title}
      </h2>
      <p class="mx-auto mt-4 max-w-xl text-sm text-slate-400 sm:text-base">
        {lead}
      </p>
    </Reveal>
  );
}

export default define.page<typeof handler>(function Home() {
  return (
    <>
      <Head>
        <title>LOOSEDAYS CO.,LTD.</title>
        <meta
          name="description"
          content="be smart loose, make your easy days."
        />
        <meta itemProp="name" content="LOOSEDAYS CO.,LTD." />
        <meta
          itemProp="description"
          content="be smart loose, make your easy days | IT Consulting, IT Architect, Technical Support of IT Development"
        />
        <meta
          itemProp="image"
          content="https://loosedays.jp/images/loosedays_square_card_light.png"
        />
        <meta property="og:url" content="https://loosedays.jp/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LOOSEDAYS CO.,LTD. Official" />
        <meta
          property="og:description"
          content="be smart loose, make your easy days. | IT Consulting, IT Architect, Technical Support of IT Development"
        />
        <meta
          property="og:image"
          content="https://loosedays.jp/images/loosedays_square_card_light.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="LOOSEDAYS CO.,LTD." />
        <meta
          name="twitter:description"
          content="be smart loose, make your easy days. | IT Consulting, IT Architect, Technical Support of IT Development"
        />
        <meta
          name="twitter:image"
          content="https://loosedays.jp/images/loosedays_square_card_light.png"
        />
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>

      <div class="min-h-screen bg-[#05070f] text-slate-200 antialiased selection:bg-sky-400/30">
        <NavBar variant="a" />

        {/* ---------------------------------------------------- hero --- */}
        <section
          id="top"
          class="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
          <Constellation />
          {/* Depth wash + vignette so the type always wins. */}
          <div
            class="pointer-events-none absolute inset-0"
            style="background: radial-gradient(115% 75% at 50% 45%, rgba(5,7,15,0.38) 0%, rgba(5,7,15,0.3) 32%, rgba(5,7,15,0.8) 72%, #05070f 100%);"
          />
          <div
            class="pointer-events-none absolute inset-x-0 bottom-0 h-56"
            style="background: linear-gradient(to bottom, rgba(5,7,15,0), #05070f);"
          />

          <div class="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
            <img
              src="/images/loosedays_logo_dark.png"
              alt="LOOSEDAYS"
              class="mx-auto mb-12 w-56 drop-shadow-[0_0_40px_rgba(56,189,248,0.25)] sm:w-72"
            />
            <h1 class="text-4xl font-light leading-[1.15] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {tagline.line1[0]}
              <span class="bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-300 bg-clip-text font-semibold text-transparent">
                {tagline.line1[1]}
              </span>
              {tagline.line1[2]}
              <br />
              {tagline.line2[0]}
              <span class="bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-200 bg-clip-text font-semibold text-transparent">
                {tagline.line2[1]}
              </span>
              {tagline.line2[2]}
            </h1>
            <p class="mt-10 text-xs font-medium uppercase tracking-[0.3em] text-slate-400 sm:text-sm">
              {tagline.sub}
            </p>

            <div class="mt-14 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#sec_product"
                class="rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-sky-100"
              >
                See our products
              </a>
              <a
                href="#sec_contact"
                class="rounded-full px-7 py-3 text-sm font-medium text-slate-300 ring-1 ring-white/15 transition-colors duration-200 hover:bg-white/5 hover:text-white"
              >
                Get in touch
              </a>
            </div>
          </div>

          <a
            href="#sec_product"
            aria-label="Scroll to products"
            class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-slate-500 transition-colors hover:text-white"
          >
            <svg
              class="h-6 w-6 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path stroke-linecap="round" d="M12 4v15m0 0 6-6m-6 6-6-6" />
            </svg>
          </a>
        </section>

        {/* ------------------------------------------------ products --- */}
        <section id="sec_product" class="relative mx-auto max-w-6xl px-6 py-28">
          <SectionHead
            eyebrow="Products"
            title="Solutions we build and ship"
            lead="Tools we use ourselves, hardened until they are worth handing to you."
          />

          {/* Shipping products carry the section. */}
          <div class="space-y-5">
            {products.filter((p) => p.tier === "product").map((p, i) => (
              <Reveal delay={i * 90}>
                <article class="group relative overflow-hidden rounded-3xl bg-white/[0.03] ring-1 ring-white/10 transition-all duration-300 hover:ring-white/25">
                  {/* Accent glow follows the product colour. */}
                  <div
                    class="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={`background: radial-gradient(65% 130% at 10% 45%, ${p.accent}26, transparent 70%);`}
                  />
                  <span
                    class="absolute inset-y-6 left-0 w-1 rounded-r-full"
                    style={`background:${p.accent}`}
                  />

                  <div class="relative flex flex-col gap-8 px-8 py-9 md:flex-row md:items-center md:gap-10 md:px-12 md:py-11">
                    <div class="md:flex-1">
                      <div class="flex items-center gap-4">
                        {p.mark && (
                          <p.mark class="h-11 w-11 shrink-0 text-white" />
                        )}
                        {p.logo
                          ? (
                            <img
                              src={p.logo}
                              alt={p.name}
                              class="h-10 w-auto"
                            />
                          )
                          : (
                            <h3 class="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                              {p.name}
                            </h3>
                          )}
                      </div>
                      <p class="mt-6 text-xl font-medium leading-snug text-white md:text-2xl">
                        {p.headline}
                      </p>
                      <p class="mt-3 max-w-2xl leading-relaxed text-slate-400">
                        {p.desc}
                      </p>
                      <div class="mt-6 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span class="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-slate-300 ring-1 ring-white/10">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div class="mt-7 flex flex-wrap items-center gap-4">
                        {p.links.map((l, li) => (
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener"
                            class={li === 0
                              ? "inline-flex items-center gap-1.5 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5"
                              : "inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline"}
                          >
                            {l.label}
                            <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    {p.media && (
                      <div
                        class={p.media.shape === "phone"
                          ? "mx-auto w-40 shrink-0 sm:w-44 md:mx-0"
                          : "w-full shrink-0 md:w-[46%]"}
                      >
                        <div
                          class={`overflow-hidden bg-slate-950 shadow-2xl shadow-black/50 ring-1 ring-white/15 ${
                            p.media.shape === "phone"
                              ? "rounded-[1.75rem] p-1.5"
                              : "rounded-xl"
                          }`}
                        >
                          <AutoVideo
                            src={p.media.src}
                            poster={p.media.poster}
                            label={p.media.label}
                            class={`block h-auto w-full ${
                              p.media.shape === "phone"
                                ? "rounded-[1.35rem]"
                                : ""
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Experiments we publish, deliberately lighter than the above. */}
          {products.filter((p) => p.tier === "lab").map((p) => (
            <Reveal delay={120} class="mt-5">
              <article class="group flex flex-col gap-5 rounded-2xl bg-white/[0.015] px-7 py-6 ring-1 ring-white/[0.07] transition-colors duration-300 hover:bg-white/[0.035] hover:ring-white/15 md:flex-row md:items-center">
                <div class="md:flex-1">
                  <div class="flex flex-wrap items-center gap-3">
                    {p.mark && <p.mark />}
                    <h3 class="text-xl font-semibold tracking-tight text-slate-100">
                      {p.name}
                    </h3>
                    {p.note && (
                      <span class="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 ring-1 ring-white/15">
                        {p.note}
                      </span>
                    )}
                  </div>
                  <p class="mt-3 text-base text-slate-300">{p.headline}</p>
                  <p class="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
                    {p.desc}
                  </p>
                  <div class="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span class="rounded-full px-2.5 py-0.5 text-[11px] text-slate-500 ring-1 ring-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-5 md:shrink-0 md:flex-col md:items-end md:gap-2.5">
                  {p.links.map((l) => (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener"
                      class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {l.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </section>

        {/* ---------------------------------------------------- work --- */}
        <section id="sec_work" class="relative mx-auto max-w-6xl px-6 py-28">
          <SectionHead
            eyebrow="Work"
            title="We and you can work together with…"
            lead="Four ways we plug into a team, and the ground we already cover."
          />

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal delay={i * 80}>
                <div class="group h-full rounded-2xl bg-white/[0.025] p-7 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05] hover:ring-sky-400/40">
                  <div class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 ring-1 ring-white/10">
                    <s.icon class="h-6 w-6 text-sky-300" />
                  </div>
                  <h3 class="text-lg font-semibold text-white">{s.title}</h3>
                  <p class="mt-2 text-sm leading-relaxed text-slate-400">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal class="mt-24">
            <p class="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.34em] text-sky-400/80">
              Keywords
            </p>
            <p class="mx-auto mb-10 max-w-lg text-center text-sm text-slate-400">
              Everything we have shipped with, mapped as one field. Pick a
              category to light up its cluster.
            </p>
            <KeywordSphere />
          </Reveal>
        </section>

        {/* ------------------------------------------------- company --- */}
        <section id="sec_company" class="relative mx-auto max-w-4xl px-6 py-28">
          <SectionHead
            eyebrow="Company"
            title="About us"
            lead="LOOSEDAYS Co.,Ltd. — Nishi-Shinjuku, Tokyo."
          />

          {
            /* The membership is the strongest credential on this page, so it
              leads the section rather than trailing the table. */
          }
          <Reveal class="mb-8">
            <a
              href={openIdUrl}
              target="_blank"
              rel="noopener"
              class="group flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-r from-sky-500/[0.12] via-indigo-500/[0.08] to-transparent px-7 py-6 ring-1 ring-sky-400/25 transition-all duration-300 hover:ring-sky-400/60 sm:flex-row"
            >
              <img
                src="/images/openid_logo_dark.svg"
                alt="OpenID Foundation"
                class="h-10 shrink-0"
              />
              <div class="text-center sm:text-left">
                <p class="text-lg font-semibold text-white">
                  OpenID Foundation — Sponsoring Member
                </p>
                <p class="mt-1 text-sm text-slate-400">
                  We fund and follow the standards our identity work is built
                  on.
                </p>
              </div>
              <span class="text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white sm:ml-auto">
                ↗
              </span>
            </a>
          </Reveal>

          <Reveal>
            <dl class="overflow-hidden rounded-2xl ring-1 ring-white/10">
              {companyRows.map((row, i) => (
                <div
                  class={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:gap-8 ${
                    i % 2 ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <dt class="text-xs font-medium uppercase tracking-[0.14em] text-slate-500 sm:w-52 sm:shrink-0 sm:pt-0.5">
                    {row.label}
                  </dt>
                  <dd class="text-sm text-slate-200">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ------------------------------------------------- contact --- */}
        <section id="sec_contact" class="relative mx-auto max-w-4xl px-6 py-28">
          <SectionHead
            eyebrow="Contact"
            title="One request away"
            lead="Our contact details are served as JSON-LD. Run it."
          />
          <Reveal>
            <CopyCommand variant="a" />
          </Reveal>
        </section>

        {/* -------------------------------------------------- footer --- */}
        <footer class="border-t border-white/10 px-6 pb-10 pt-16">
          <div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
            <div>
              <img
                src="/images/loosedays_square_logo_dark.png"
                alt="LOOSEDAYS"
                class="w-28"
              />
              <p class="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
                {footerBlurb}
              </p>
            </div>

            <div>
              <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                Navigation
              </p>
              <ul class="space-y-2 text-sm">
                {navLinks.slice(1).map((l) => (
                  <li>
                    <a
                      href={l.href}
                      class="text-slate-500 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                Connect
              </p>
              <ul class="space-y-2.5 text-sm">
                {social.map((s) => {
                  const Mark = s.label === "GitHub"
                    ? SiGithub
                    : s.label === "YouTube"
                    ? SiYoutube
                    : XIcon;
                  return (
                    <li>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener"
                        class="inline-flex items-center gap-2.5 text-slate-500 transition-colors hover:text-white"
                      >
                        <Mark class="h-4 w-4" />
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a
                href={openIdUrl}
                target="_blank"
                rel="noopener"
                class="mt-5 inline-flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
              >
                <img
                  src="/images/openid_logo_dark.svg"
                  alt="OpenID"
                  class="h-5"
                />
                <span class="text-xs text-slate-500">Sponsoring Member</span>
              </a>
              <div class="mt-4 flex items-center gap-3">
                <a
                  href="https://deno.com/"
                  target="_blank"
                  rel="noopener"
                  aria-label="Deno"
                  class="inline-flex items-center gap-1.5 text-slate-500 transition-colors hover:text-white"
                >
                  <SiDeno class="h-6 w-6" />
                  <span class="text-xs font-medium">Deno</span>
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

          <p class="mx-auto mt-12 max-w-6xl border-t border-white/5 pt-6 text-center text-xs text-slate-600">
            {copyright}
          </p>
        </footer>
      </div>
    </>
  );
});

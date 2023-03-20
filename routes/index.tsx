import { Head } from "$fresh/runtime.ts";
import { Header } from "../components/Header.tsx";
import Work from "../islands/Work.tsx";
import { Company } from "../components/Company.tsx";
import { Contact } from "../components/Contact.tsx";
import { Footer } from "../components/Footer.tsx";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    if(req.headers.has("X-REQUEST-CONTACT") && req.headers.get("X-REQUEST-CONTACT") == "1") {
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
                "streetAddress": "6F Nishishinjuku Mizuma Bldg, 3-3-13 Nishi-Shinjuku"
            },
          }
        ),
        {
          headers: { "Content-Type": "application/ld+json; charset=utf-8" },
        });
    } else {
      const resp = await ctx.render();
      return resp;
    }
  },
};

export default function Home() {
  return (
    <>
      <Head>
      <title>LOOSEDAYS CO.,LTD.</title>
      <meta name="description" content="be smart loose, make your easy days."></meta>
      <meta itemprop="name" content="LOOSEDAYS CO.,LTD."></meta>
      <meta itemprop="description" content="be smart loose, make your easy days | IT Consulting, IT Architect, Technical Support of IT Development"></meta>
      <meta itemprop="image" content="https://loosedays.jp/images/loosedays_square_card_light.png"></meta>
      <meta property="og:url" content="https://loosedays.jp/"></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:title" content="LOOSEDAYS CO.,LTD. Official"></meta>
      <meta property="og:description" content="be smart loose, make your easy days. | IT Consulting, IT Architect, Technical Support of IT Development"></meta>
      <meta property="og:image" content="https://loosedays.jp/images/loosedays_square_card_light.png"></meta>
      <meta name="twitter:card" content="summary"></meta>
      <meta name="twitter:title" content="LOOSEDAYS CO.,LTD."></meta>
      <meta name="twitter:description" content="be smart loose, make your easy days. | IT Consulting, IT Architect, Technical Support of IT Development"></meta>
      <meta name="twitter:image" content="https://loosedays.jp/images/loosedays_square_card_light.png"></meta>
      </Head>
      <div class="divide-y divide-gray-300 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
        <Header></Header>
        <Work></Work>
        <Company></Company>
        <Contact></Contact>
        <Footer></Footer>
      </div>
    </>
  );
}

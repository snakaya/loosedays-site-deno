import { Head } from "$fresh/runtime.ts";
import { Header } from "../components/Header.tsx";
import { Work } from "../components/Work.tsx";
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
        <link rel="shortcut icon" href="/images/favicon.ico"></link>
      </Head>
      <div class="divide-y divide-gray-300">
        <Header></Header>
        <Work></Work>
        <Company></Company>
        <Contact></Contact>
        <Footer></Footer>
      </div>
    </>
  );
}

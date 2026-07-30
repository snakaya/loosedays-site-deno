import { page } from "fresh";
import { Head } from "fresh/runtime";
import { Header } from "../components/Header.tsx";
import StickyNav from "../islands/StickyNav.tsx";
import Work from "../islands/Work.tsx";
import { Product } from "../components/Product.tsx";
import { Company } from "../components/Company.tsx";
import { Contact } from "../components/Contact.tsx";
import { Footer } from "../components/Footer.tsx";
import { define } from "../utils.ts";

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
      <div class="divide-y divide-gray-300 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
        <StickyNav />
        <Header></Header>
        <Product></Product>
        <Work></Work>
        <Company></Company>
        <Contact></Contact>
        <Footer></Footer>
      </div>
    </>
  );
});

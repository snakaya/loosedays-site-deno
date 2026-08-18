import { App, staticFiles } from "fresh";

/** The one canonical hostname; everything else is redirected to it. */
const CANONICAL_HOST = "loosedays.jp";
const REDIRECTED_HOSTS = new Set(["www.loosedays.jp"]);

export const app = new App()
  .use((ctx) => {
    const url = new URL(ctx.req.url);
    if (REDIRECTED_HOSTS.has(url.hostname)) {
      url.hostname = CANONICAL_HOST;
      // Pin the scheme: the site is https-only, and this saves the visitor a
      // second hop if the request reaches us as http.
      url.protocol = "https:";
      // Permanent: the apex domain is the one we have always advertised.
      return Response.redirect(url, 301);
    }
    return ctx.next();
  })
  .use(staticFiles())
  .fsRoutes();

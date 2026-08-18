# loosedays-site-deno

LOOSEDAYS Official Site. Live at [https://loosedays.jp/](https://loosedays.jp/).

A single page with a WebGL hero and a keyword constellation you can spin — built
with [Fresh](https://fresh.deno.dev/) 2, Preact, Tailwind CSS 4 and
[three.js](https://threejs.org/), running on Deno Deploy.

## Usage

Install dependencies and start the development server:

```sh
deno install
deno task dev
```

Format, lint and type check:

```sh
deno task check
```

Create and preview a production build:

```sh
deno task build
deno task preview
```

Deploy to Deno Deploy:

```sh
deno task deploy:prod
```

## Contact

The site answers its own contact request as JSON-LD:

```sh
curl -H "X-REQUEST-CONTACT:1" https://loosedays.jp/
```

## License

This project is licensed under the Apache License Version 2.0. See the
[LICENSE](https://github.com/snakaya/loosedays-site-deno/blob/main/LICENSE) file
for details.

Copyright(c) 2020-2026 LOOSEDAYS Co.,Ltd. All Rights Reserved.

# loosedays-site-deno

LOOSEDAYS Official Site for Deno/Fresh. Running on
[https://loosedays-site.deno.dev](https://loosedays-site.deno.dev) (redirect to
[https://loosedays.jp/](https://loosedays.jp/))

## Usage

Install dependencies and start the Vite development server:

```sh
deno install
deno task dev
```

Create and preview a production build:

```sh
deno task build
deno task preview
```

Deploy the production build to Deno Deploy:

```sh
deno task deploy:prod
```

The deployment task builds Fresh locally, packages the generated `_fresh` output
with the compatibility entrypoint expected by the existing Deno Deploy app,
deploys it to production, and verifies the public site and logo asset. Use
`deno task deploy:prod --dry-run` to validate packaging without publishing.

## License

This project is licensed under the Apache License Version 2.0. See the
[LICENSE](https://github.com/snakaya/loosedays-site-deno/blob/main/LICENSE) file
for details.

Copyright(c) 2020-2024 LOOSEDAYS Co.,Ltd. All Rights Reserved.

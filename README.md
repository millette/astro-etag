# astro-etag

Simple [Astro](https://astro.build) integration for generating ETag sidecar files for your build to feed into a web server like Caddy.

## Installation

You can use the `astro add` tool to automatically install without manual configuration:

```shell
npx astro add astro-etag
# or
yarn astro add astro-etag
# or
pnpm astro add astro-etag
```

Otherwise, you can install it manually as normal:

```shell
npm install astro-etag
# or
yarn add astro-etag
# or
pnpm add astro-etag
```

And then update your `astro.config` file to include the integration:

```js
import { defineConfig } from "astro/config";
import etag from "astro-etag";

export default defineConfig({
  integrations: [etag()],
});
```

If you're using other integrations, add `astro-etag` to the end of your integrations array, so that it can work on every generated fie from previous integrations.

## Usage with Caddy

Once built, you can tell Caddy about the `.etag` files so that it adds `ETag` headers to all requests by modifying your `file_server` directive:

```Caddyfile
file_server {
  etag_file_extensions .etag
}
```

If done correctly, you'll see the header in your browser's network inspector.

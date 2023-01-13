import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";
import astroOGImage from "astro-og-image";

// https://astro.build/config
export default defineConfig({
  site: "https://br-dev.org",
  integrations: [
    tailwind(),
    sitemap(),
    astroOGImage({
      config: {
        path: "/publicacoes", // change this value to the folder where your posts are
        // NOTE: index.md file will not get proccesed, so please avoid it
      },
    }),
  ],
});

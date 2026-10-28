import { defineConfig } from "astro/config";
import microbloggr from "microbloggr";

export const microbloggrOptions = {
  editorPath: process.env.PLAYGROUND_EDITOR_PATH || "/editor",
  providerLookups: process.env.PLAYGROUND_PROVIDER_LOOKUPS !== "off",
};

export default defineConfig({
  base: process.env.PLAYGROUND_BASE || "/",
  integrations: [microbloggr(microbloggrOptions)],
});

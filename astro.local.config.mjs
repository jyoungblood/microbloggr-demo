import config, { microbloggrOptions } from "./astro.config.mjs";
import microbloggr from "../src/index.mjs";

// Selected only by the dev launcher when nested in the package checkout.
export default {
  ...config,
  integrations: [microbloggr(microbloggrOptions)],
};

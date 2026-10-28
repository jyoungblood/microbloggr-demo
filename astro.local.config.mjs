import config, { microbloggrOptions } from "./astro.config.mjs";
import microbloggr from "../microbloggr/src/index.mjs";

// Selected only by the dev launcher when the sibling package checkout exists.
export default {
  ...config,
  integrations: [microbloggr(microbloggrOptions)],
};

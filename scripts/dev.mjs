import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const parentManifest = new URL("../package.json", root);
const localPackage =
  existsSync(parentManifest) &&
  JSON.parse(readFileSync(parentManifest, "utf8")).name === "microbloggr" &&
  existsSync(new URL("../src/index.mjs", root));

console.log(
  localPackage
    ? "Microbloggr: using local package source."
    : "Microbloggr: using installed package.",
);

const child = spawn(
  process.execPath,
  [
    fileURLToPath(new URL("node_modules/astro/bin/astro.mjs", root)),
    "dev",
    "--host",
    "127.0.0.1",
    ...(localPackage ? ["--config", "astro.local.config.mjs"] : []),
    ...process.argv.slice(2),
  ],
  { cwd: fileURLToPath(root), stdio: "inherit" },
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});
child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal === "SIGINT" ? 130 : 143);
});

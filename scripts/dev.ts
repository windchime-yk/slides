import $ from "jsr:@david/dax@0.40.0";
import { getSlidePaths } from "./lib.ts";

const slidePaths = await getSlidePaths();
const selectedPathPosition = await $.select({
  message: "どのスライドを起動する？",
  options: slidePaths,
});

$.cd(`${Deno.cwd()}/slides/${slidePaths[selectedPathPosition]}`)
await $`pnpm dev`;

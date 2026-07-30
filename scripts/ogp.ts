import $ from "jsr:@david/dax@0.40.0";
import { getSlidePaths } from "./lib.ts";

const slidePaths = await getSlidePaths();
const selectedPathPosition = await $.select({
  message: "どのスライドのOGP画像を生成する？",
  options: slidePaths,
});
const slug = slidePaths[selectedPathPosition];

$.cd(`${Deno.cwd()}/slides/${slug}`);
await $`pnpm ogp`;
await Deno.mkdir("public", { recursive: true });
await Deno.rename(".ogp-tmp/01.png", "public/og-image.png");
await Deno.remove(".ogp-tmp", { recursive: true });

import $ from "jsr:@david/dax@0.40.0";
// import { getSlidePaths } from "./lib.ts";

// const slidePaths = await getSlidePaths();
// const selectedPathPosition = await $.select({
//   message: "どのスライドを起動する？",
//   options: slidePaths,
// });

// TODO: $.selectが2つ以上の選択肢がないと起動しないため、後ほどコメントアウトを外す
// $.cd(`${Deno.cwd()}/slides/${slidePaths[selectedPathPosition]}`)
$.cd(`${Deno.cwd()}/slides/introduce-bid`)
await $`pnpm dev`

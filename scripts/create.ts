import $ from "jsr:@david/dax@0.40.0";
import chalk from "npm:chalk@5.3.0";

const projectName = await $.prompt("プロジェクト名");
const slideTitle = await $.prompt("スライドタイトル");
const successLog = (message: string, isBreak: boolean = false) =>
  $.log(`${isBreak ? "\n" : ""}${chalk.green("✔")} ${message}`);

$.logGroup("slidevの起動");
$.cd(`${Deno.cwd()}/slides`);
// TODO: 連続でstdinTextが出来ないが、スライドの作成自体はできるので一旦保留
const createResult = await $`pnpm create slidev`.stdinText(`${projectName}\n`);
if (createResult.code === 0) {
  successLog(`/slides/${projectName}の作成完了\n`, true);
}
if (createResult.code === 1) {
  $.logError(`/slides/${projectName}の作成失敗\n`, true);
  $.logError(createResult.stderr);
}
$.logGroupEnd();

$.logGroup("不要ファイルの削除");
$.cd(`${Deno.cwd()}/${projectName}`);
await $`rm -rf components pages snippets netlify.toml vercel.json README.md`;
successLog("削除完了");
$.logGroupEnd();

$.logGroup("package.jsonの修正と依存関係のインストール");
const packageJsonTemplate = {
  "name": projectName,
  "description": slideTitle,
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "slidev --open",
    "build":
      `slidev build --base /${projectName} --out ../../dist/${projectName}`,
    "export": "slidev export",
  },
};
const encoder = new TextEncoder();
await Deno.writeFile(
  "package.json",
  encoder.encode(JSON.stringify(packageJsonTemplate)),
);
await $`deno fmt package.json`;
successLog("package.jsonの修正完了");
await $`pnpm i`;
successLog("依存関係のインストール完了");
$.logGroupEnd();

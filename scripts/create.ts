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
    // Cloudflare Pagesでは_redirectsが効かず/<slug>/1のようなURLが404になるため、
    // ハッシュルーター(/<slug>/#/1)にして常に既存のindex.htmlへ着地させる
    "build":
      `slidev build --base /${projectName} --router-mode hash --out ../../dist/${projectName}`,
    "export": "slidev export",
    "ogp": "slidev export --format png --range 1 --per-slide --output .ogp-tmp",
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

$.logGroup("OGP設定の追加");
// slideTitleに#や:が含まれてもYAMLとして壊れないよう、二重引用符スカラーで埋め込む
const yamlString = (value: string) => JSON.stringify(value);
const slideUrl = `https://slides.whyk.dev/${projectName}/`;
const seoMeta = `# タイトルに " - Slidev" が付かないようにする
titleTemplate: '%s'
# OGP。og-image.pngは\`pnpm ogp\`で1枚目から生成し、public/に置いてコミットしている
seoMeta:
  ogTitle: ${yamlString(slideTitle)}
  ogDescription: ${yamlString(slideTitle)}
  ogImage: ${slideUrl}og-image.png
  ogUrl: ${slideUrl}
  twitterCard: summary_large_image
  twitterTitle: ${yamlString(slideTitle)}
  twitterDescription: ${yamlString(slideTitle)}
  twitterImage: ${slideUrl}og-image.png
  twitterUrl: ${slideUrl}
`;
// slidevのテンプレートは`download: true`で始まるが、trueだとビルド時にPDF exportが走り
// chromiumが必要になる。Cloudflare Workersのビルドイメージには共有ライブラリがなく起動できない
const downloadSetting =
  `# trueにするとビルド時にPDF exportが走りchromiumが必要になる。
# Cloudflare Workersのビルドイメージには共有ライブラリがなく起動できないため無効化している
download: false`;
const slidesMarkdown = (await Deno.readTextFile("slides.md")).replace(
  /^download: true$/m,
  downloadSetting,
);
// 先頭のheadmatterを閉じる`---`の直前に差し込む
const headmatterEnd = slidesMarkdown.indexOf("\n---", "---".length);
await Deno.writeTextFile(
  "slides.md",
  `${slidesMarkdown.slice(0, headmatterEnd + 1)}${seoMeta}${
    slidesMarkdown.slice(headmatterEnd + 1)
  }`,
);
successLog("slides.mdへのseoMeta追加完了");
await $`pnpm ogp`;
await Deno.mkdir("public", { recursive: true });
await Deno.rename(".ogp-tmp/01.png", "public/og-image.png");
await Deno.remove(".ogp-tmp", { recursive: true });
successLog("public/og-image.pngの生成完了");
$.logGroupEnd();

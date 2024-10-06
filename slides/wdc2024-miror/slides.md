---
slidev: true
download: true
# You can also start simply with 'default'
theme: default
# some information about your slides (markdown enabled)
title: WinterCG Runtime Keysについて
info: |
  Web Developer Conference 2024の1分LT枠で話したWinterCG Runtime Keysのミラースライドです。
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# WinterCG Runtime Keysについて
Web Developer Conference 2024 1分LT枠 (2024/09/07)


---
transition: slide-left
---

# このスライドについて
- このスライドは、[WDC2024](https://web-study.connpass.com/event/321711/)の1分LT枠で話した内容をコピーしたものです
  - 実際に使われたスライド資料は権限の関係で一般公開ができないものなので、その代用となります。
  - 当時のスライドのキャプチャも掲載しています
- スライドの内容は、実際に使われたスライド資料とは文言が異なります
  - 内容としては同様のものとなっています

<!--
## このスライドで書いたほうがよいことは何か
- WinterCG Runtime Keysの基本概念の説明
- 主要なキーと意外なキーの紹介
- この提案が解決しようとしている課題 / 開発者にとっての利点
- 活用事例

## このスライドで書かないほうがよいことは何か
- WinterCG自体の説明（3番目のWinterCG Minimum Common Web Platform APIの人がするはず）
- Runtime Keysをすべて列挙すること
- 個人の感情を交えたランタイムのジャッジ
- すべての情報を箇条書きにするスライド

## やりたいこと
- 各ランタイムの画像を使ってわかりやすくしたい
- タグクラウドみたいな感じで
-->

---
layout: image-right
image: ./ofetch-exports-wintercg.png
transition: slide-left
---

# WinterCG Runtime Keys
WinterCG（ブラウザ外のJS実行環境の相互運用性についてのコミュニティグループ）で決められたブラウザ以外のJS実行環境の識別キーのこと（そのまま）

Proposalではキー名の定義のみに留まり、キーの活用は利用者に委ねられている  
マルチランタイムパッケージでの活用が主という印象

Node.jsやDeno、Bunといった主要なJS/TSランタイムの他、React Server ComponentsやElectronもランタイムとしてキー名が割り当てられている  
キー名については[Proposal](https://runtime-keys.proposal.wintercg.org/#keys)を参照のこと

Node.jsでは各ランタイムでどのファイルを使うかを指定することができる  
（右画像は[ofetchでの指定例](https://github.com/unjs/ofetch/blob/main/package.json)）

<!--
それでは、WinterCG Runtime KeysについてのLTを始めます。
このProposalは、WinterCGというコミュニティグループで各ランタイムのキー名を決めているものです。

Node.jsやDenoやBunといったJS/TSランタイムの他、React Server ComponentsやElectronなどにもキー名が割り当てられています。  

各ランタイムのキーが決められたことで識別しやすくなり、ランタイム固有の機能への対応がしやすくなりました。  
Node.jsでは各ランタイムでどのファイルを使うかを指定することができ、HonoではHelperとして提供されたことで各ランタイムに合わせた処理に活用されています。

このProposalは、ブラウザ以外でのJavaScirpt実行環境の相互運用性向上に大きく寄与すると考えられます。
-->

---
transition: slide-left
---

![当日の発表スライドのキャプチャ](/original-slide-screenshot.png)

---
layout: two-cols
transition: slide-left
---

# 謝辞
ofetchの例はP-ChanさんのXでの投稿のおかげで知ることができました。ありがとうございます。

::right::

<Tweet id="1826661896118043082"/>

---
transition: slide-left
---

# 資料
以下は検討に利用したZenn Scrapです

https://zenn.dev/windchime_yk/scraps/d69a6c110a347c

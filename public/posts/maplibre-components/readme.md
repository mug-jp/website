---
title: MapLibre Styleの構成要素（タイル・フォント・アイコン）
tags: [MapLibre, foss4g, Design]
author: kanahiro_iguchi
publishedAt: 2023-12-25
---

## はじめに

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/73197/c70745c9-d36f-6f76-a9a9-bb8ad4991ba3.png)

MapLibre User Group Japanの@Kanahiroです。

MapLibreとは、モダンなWeb地図にまつわるOSSを傘下に収める開発者コミュニティです。

## 地図のデザイン＝スタイリング

Web地図の世界では、地図のデザインのことをスタイリングと呼びます（紙地図では地図調製でしょうか）。スタイリングには様々な要素ー道路の色・太さ・縁取り、ラベルのフォント・サイズ・改行、アイコン…ーが存在します。

また、Web地図は「ズーム」という概念を持ち、ある意味単一ズームの世界である紙地図とはまた違った面白さがあります。

MapLibre Styleのスタイリングについては以下の記事が詳しいです。

<https://qiita.com/moritoru/items/d439f2c3806ba5f635c6>

<https://qiita.com/moritoru/items/bc54d11ecf24ccabe76c>

本記事では、MapLibre Styleを作るために必要なデータと、その生成方法を紹介します。

## MapLbire Styleを構成するデータ

大きく、地図タイル・フォント・アイコンの3種類です。

### 地図タイル

`{z}/{x}/{y}`というURLで定義される地図タイルが必要です。
MapLibre GL JSの利点を最大限生かすならば、ベクトルタイルを利用するのが望ましいです。一方、航空写真のような画像データは、ラスタータイルを利用するのがよいでしょう。

<https://qiita.com/Kanahiro/items/ceeb20c158b4c70b62b6>

<https://qiita.com/Kanahiro/items/4b5f8db5743c69741220>

タイルじゃなくても、GeoJSONや画像（JPG/PNGなど）を利用することも出来ますが、パフォーマンスの観点からあまりお勧めはしません。

### フォント（glyphs）

MapLibre Styleでは、フォントは「glyphs」と呼ばれ、事前にプロトコルバッファに変換したファイル群が必要となります。考え方はベクトルタイルに似ており：

```
http://somehostname/{fontstack}/{range}.pbf
```

このURLテンプレートをstyle内に定義しておくことで、作成済みのフォントを利用できます。

```json
glyphs: 'http://somehostname/{fontstack}/{range}.pbf',
```

`fontstack`はフォント名、`range`はUnicodeの範囲を表します。

![Screenshot 2023-12-23 at 9.47.23.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/73197/9e46f6d3-78c9-e3c3-a87a-7084c75aadbb.png)

以下のツールを用いると、TTFファイルなどからglyphを作成することが出来ます。

<https://github.com/maplibre/font-maker>

フリーフォントを変換したglyphの例が、下記リポジトリで見られます。

<https://github.com/MIERUNE/fonts>

### 日本語に関する仕様

日本語テキストに関してはフォントの考え方が異なり：

- デフォルトでは、日本語テキストの描画時には、**glyphsを読みに行かない**。この場合、ブラウザにインストールされたフォントを参照する（CSSで定義してあってもよい）。
- Mapインスタンス定義時に`localIdeographFontFamily: false`とすることで、日本語テキストの場合にも、glyphsを読みにいくようになる。

と、若干難しい仕様になっております。これはパフォーマンスの観点によるものです。日本語をはじめとした「CJK」と呼ばれるフォント群は、描画されうるテキストに含まれる文字群のUnicodeの範囲が非常に広く、ダウンロードしなければならないglyphsファイルが多くなってしまうためです（英数字のみならUnicodeの範囲は極めて限定される）。

致命的なパフォーマンス低下にはなりませんが体感できる程度には遅さを感じるので、ご利用は計画的に。

### アイコン（sprite）

アイコンをはじめとしたMapLibre Style内で用いる画像アセットは、`sprite`をあらかじめ作成しておき、スタイル内で定義します。

```
"sprite":"https://tile.openstreetmap.jp/styles/osm-bright/sprite"
```

MapLibre Styleにおけるspriteは上記URLで定義しますが、実体はPNG画像とJSONファイルです。上記のURLから、ファイルの実体は以下のURLに存在することがわかります。

```
https://tile.openstreetmap.jp/styles/osm-bright/sprite.png
https://tile.openstreetmap.jp/styles/osm-bright/sprite.json
https://tile.openstreetmap.jp/styles/osm-bright/sprite@2x.png ## 高解像度
https://tile.openstreetmap.jp/styles/osm-bright/sprite@2x.json
```

spriteは多数の画像アセットを1枚の画像（スプライト）に押し込んだものです。jsonは、どのアセットが・スプライトのどの部分にあるか、を表現するものです。

これらにより、1枚のスプライトから関心対象のアセットのみを切り出して利用することができます。

spriteは下記のツールを用いると非常に簡単に生成することができます。

<https://github.com/flother/spreet>

なお、style外の実装が必要になりますが、PNG画像を取り込んで地図スタイル内で利用することも可能です。

<https://maplibre.org/maplibre-gl-js/docs/examples/add-image/>

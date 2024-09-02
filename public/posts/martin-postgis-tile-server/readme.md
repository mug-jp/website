---
title: MartinでPostGISからベクトルタイルを配信しよう
tags: [MapLibre, PostGIS, Rust]
author: kanahiro_iguchi
publishedAt: 2023-12-05
---

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/73197/a6c4f182-ae85-9f7d-007e-acd05217137e.png)

[MapLibre User Group Japan](https://dayjournal.notion.site/MapLibre-User-Group-Japan-Official-Web-Site-4ecb7ea313f945f39ccc2ca8dfbaad4f)の@Kanahiroです。今回はベクトルタイルサーバーMartinを紹介します。

# TL;DR

- MartinでPostGISのテーブルをベクトルタイルとして高速に配信
- glyph/sprteも動的に配信出来るぞ

# Martin

<https://github.com/maplibre/martin>

MapLibre傘下の、PostGISバックエンドなタイルサーバーです。特徴は、ベクトルタイルをPostGISのテーブルから**動的に**作成して配信出来ることです。世はまさにdynamic tiling時代。

今をときめくPMTilesをはじめとして、あらかじめ全てのタイルを作り切っておくアプローチは、配信パフォーマンスの観点では最善です。しかしたとえば頑張って大きなタイルデータを作成したとして、その原典データが更新されてしまったらどうすればよいでしょうか？PMTilesなどのアプローチでは、再度タイルを作り直す必要があります。タイル生成は、そのタイル数が多い場合、コストは小さくありません。なので、動的配信が魅力的になるわけです。

上記の議論は以下の私の発表スライドが詳しいです。

<https://docs.google.com/presentation/d/1VwN7PEX7-WvAa9tfqx-sRCJK2dih4GhHI_RVf4jRwz8/edit>

Martinの使い方は難しくはないのですが、さらにその敷居を下げるべく、以下のようなリポジトリを用意しています。

<https://github.com/mug-jp/martin-starter>

```sh
docker compose up
```

でサーバーが立つので、起動が完了したっぽいタイミングで（PostGISの初期化などが走ります）<http://localhost> を開いてみましょう。なんだかすごい地図が表示されると思います。

![Screenshot 2023-11-28 at 20.55.10.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/73197/b438db4c-2603-3843-7ce8-1842e1e168fe.png)

実はこの地図にはMartinのほぼ全ての機能が含まれています。

- PostGISテーブルの配信
- MBTiles/PMTilesの配信
- glyph（フォント）の配信
- spriteの配信

たとえばQGISなどでPostGISのテーブルの内容を変更したのちに、再度地図を表示してみると、内容が反映されているはずです。すなわち動的配信ということです。以下の登壇資料でも紹介しているので、ぜひチェックしてみてください。

<https://docs.google.com/presentation/d/1BKaVgIV1jO2rudI0UJHccs8RVLGotQpYdlWj1iVROMQ/edit#slide=id.p>

---
title: MapLibre GL JSとAmazon Location ServiceのAPIキー機能で開発環境を構築してみた
tags: [MapLibre, AWS, FOSS4G, AmazonLocationService]
author: dayjournal_nori
publishedAt: 2023-09-26
---

<br>

![img](https://memo.dayjournal.dev/images/try-103_01.gif)

![img](https://memo.dayjournal.dev/images/try-103_02.png)

<br>

### MapLibre GL JSとAmazon Location ServiceのAPIキー機能で開発環境を構築してみました :tada:  

GitHubに作成した環境を公開しています。ぜひご利用ください!  

https://github.com/mug-jp/maplibregljs-amazon-location-service-starter

<br>

## 事前準備

- Amazon Location ServiceのAPIキー作成  
[Amazon Location Service #004 - APIキー作成(マップ)](https://memo.dayjournal.dev/memo/amazon-location-service-004)
- MapLibre GL JSをを手軽に始めるビルド環境を利用  

https://github.com/mug-jp/maplibregljs-starter

実行環境

- node v20.6.1
- npm v9.8.1

<br>

## MapLibre GL JS スターターの利用方法
既存のスターターを利用し、Amazon Location Serviceの環境を構築します。ローカル環境にforkまたはダウンロードし動作確認をします。

パッケージをインストールします。

```sh
npm install
```

ローカルサーバーを起動します。

```sh
npm run dev
```

マップが表示されます。
![img](https://memo.dayjournal.dev/images/try-103_03.png)

<br>

## マップアプリケーションの構築
最後に、実際にマップアプリケーションを構築します。スターターから一部のファイル変更をします。  

全体構成
![img](https://memo.dayjournal.dev/images/try-103_04.png)

<br>

#### package.json

```json
{
  "name": "maplibregljs-amazon-location-service-starter",
  "version": "3.3.1",
  "description": "",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "keywords": [],
  "author": "MapLibre User Group Japan",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^5.2.2",
    "vite": "^4.4.9"
  },
  "dependencies": {
    "maplibre-gl": "^3.3.1"
  }
}
```

<br>

#### .env
事前準備で作成したリージョン・APIキー・マップ名をenvファイルに設定します。

```env
VITE_REGION = xxxxx
VITE_MAP_API_KEY = v1.public.xxxxx
VITE_MAP_NAME = xxxxx
```

<br>

/src
#### main.ts
リージョン・APIキー・マップ名をenvファイルから読み込み、StyleをAmazon Location Service用のURLに設定します。

```typescript
import './style.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';

const region = import.meta.env.VITE_REGION;
const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
const mapName = import.meta.env.VITE_MAP_NAME;

const map = new maplibregl.Map({
    container: 'map',
    style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${mapApiKey}`,
    center: [139.767, 35.681],
    zoom: 11,
});

map.addControl(
    new maplibregl.NavigationControl({
        visualizePitch: true,
    })
);
```

<br>

ローカルサーバーで確認

```sh
npm run dev
```

<br>

Amazon Location ServiceのAPIキー機能とMapLibre GL JSを組み合わせて表示することができました！
![img](https://memo.dayjournal.dev/images/try-103_05.png) 
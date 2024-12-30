---
title: MapLibre GL JSとSvelteを組み合わせた開発環境を構築してみた
tags: [MapLibre, GIS, FOSS4G, Svelte]
author: dayjournal_nori
publishedAt: 2023-09-21
---

<br>

![img](https://memo.dayjournal.dev/images/try-102_01.gif)

![img](https://memo.dayjournal.dev/images/try-102_02.png)

<br>

### MapLibre GL JSとSvelteを組み合わせた開発環境を構築してみました！  

GitHubに作成した環境を公開しています。ぜひご利用ください!  

https://github.com/mug-jp/maplibregljs-svelte-starter

<br>

## 事前準備

- Svelteのプロジェクト作成

[Svelte #001 – create-svelteで環境構築](https://memo.dayjournal.dev/memo/svelte-001/)

![img](https://memo.dayjournal.dev/images/try-102_03.png)

実行環境

- node v20.6.1
- npm v9.8.1

<br>

## MapLibre GL JSのインストール
MapLibre GL JSをSvelteのプロジェクトにインストールします。

```sh
npm install maplibre-gl
```

![img](https://memo.dayjournal.dev/images/try-102_04.png)

<br>

## マップアプリケーションの構築
最後に、実際にマップアプリケーションを構築します。テンプレートから一部のファイル変更と削除をします。  

全体構成
![img](https://memo.dayjournal.dev/images/try-102_05.png)

<br>

#### package.json

```json
{
	"name": "maplibregljs-svelte-starter",
	"version": "1.0.0",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"test": "npm run test:integration && npm run test:unit",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"lint": "prettier --plugin-search-dir . --check . && eslint .",
		"format": "prettier --plugin-search-dir . --write .",
		"test:integration": "playwright test",
		"test:unit": "vitest"
	},
	"keywords": [],
	"author": "MapLibre User Group Japan",
	"license": "ISC",
	"devDependencies": {
		"@fontsource/fira-mono": "^4.5.10",
		"@neoconfetti/svelte": "^1.0.0",
		"@playwright/test": "^1.28.1",
		"@sveltejs/adapter-auto": "^2.0.0",
		"@sveltejs/kit": "^1.20.4",
		"@types/cookie": "^0.5.1",
		"@typescript-eslint/eslint-plugin": "^6.0.0",
		"@typescript-eslint/parser": "^6.0.0",
		"eslint": "^8.28.0",
		"eslint-config-prettier": "^8.5.0",
		"eslint-plugin-svelte": "^2.30.0",
		"prettier": "^2.8.0",
		"prettier-plugin-svelte": "^2.10.1",
		"svelte": "^4.0.5",
		"svelte-check": "^3.4.3",
		"tslib": "^2.4.1",
		"typescript": "^5.0.0",
		"vite": "^4.4.2",
		"vitest": "^0.32.2"
	},
	"type": "module",
	"dependencies": {
		"maplibre-gl": "^3.3.1"
	}
}
```

<br>

/src/routes
#### +layout.svelte
既存のページを削除しslotタグを残します。

```html
<script lang="ts">
	import './styles.css';
</script>

<slot />

<style></style>
```

<br>

/src/routes
#### +page.svelte
マップコンポーネントを読み込むように変更します。

```html
<script lang="ts">
	import Map from '$lib/components/MapPane.svelte';
</script>

<svelte:head>
	<title>MapLibre GL JS & Svelte Starter</title>
	<meta name="description" content="MapLibre GL JS & Svelte Starter" />
</svelte:head>

<Map />

<style></style>
```

<br>

/src/lib/components
#### MapPane.svelte
新規でMapLibre GL JSのマップコンポーネントを作成します。

```html
<script setup lang="ts">
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { Map, NavigationControl } from 'maplibre-gl';
	import { onMount } from 'svelte';

	onMount(() => {
		const map = new Map({
			container: 'map',
			style: {
				version: 8,
				sources: {
					MIERUNEMAP: {
						type: 'raster',
						tiles: ['https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png'],
						tileSize: 256,
						attribution:
							"Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
					}
				},
				layers: [
					{
						id: 'MIERUNEMAP',
						type: 'raster',
						source: 'MIERUNEMAP',
						minzoom: 0,
						maxzoom: 18
					}
				]
			},
			center: [139.767, 35.681],
			zoom: 11
		});

		map.addControl(
			new NavigationControl({
				visualizePitch: true
			})
		);
	});
</script>

<div id="map" />

<style>
	#map {
		height: 100vh;
	}
</style>
```

<br>

ローカルサーバーで確認

```sh
npm run dev
```

<br>

SvelteとMapLibre GL JSを組み合わせて表示することができました！
![img](https://memo.dayjournal.dev/images/try-102_06.png)  
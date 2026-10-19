# MUG-JPのWebサイト

## 開発

Node.js 24とpnpmを使用します（`.node-version`と`package.json`の`packageManager`参照）。
pnpmのバージョンはリポジトリで固定します。Corepackを有効にしてから依存をインストールしてください。

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

開発サーバーは `http://localhost:3000` で起動します。
TanStack Start / React / Vite / Tailwind CSSを使用し、記事とRSSをビルド時に取り込んで全ページを事前生成します。公開には `dist/client/` のみを使用し、実行時のサーバーは不要です。記事中心のサイトなので静的配信を継続し、フレームワークはTanStack Startを使用します。

```sh
pnpm format:check
pnpm lint
pnpm test
pnpm build
pnpm typecheck
pnpm start
```

`pnpm build` は全ページの生成後に、記事の出力漏れ・ローカルURL・404の静的出力を検査します。
`pnpm start` は生成したサイトのプレビューです。型チェックに必要なルート定義は `pnpm dev` または `pnpm build` で自動生成されます。
Markdownの変更は開発サーバーに反映されます。RSSは起動・ビルドごとに取得するため、ネットワーク接続が必要です。取得できない場合は不完全な記事一覧を公開しないようビルドを失敗させます。

### 依存の更新とコード整形

`pnpm-workspace.yaml`の`minimumReleaseAge: 10080`で、公開から7日未満の依存パッケージをインストールしません。検疫期間内のバージョンを例外許可せず、期間を満たす最新安定版を採用します。CIではロックファイルを変更せずにインストールします。

コードを整形する場合は`pnpm format`、更新する場合は`pnpm update --latest`を実行し、ビルド・型チェック・テストを確認してください。記事本文と画像はコード整形の対象外です。

## 記事の書き方

- `public`以下に`events`と`posts`というディレクトリがあります。その中にフォルダを作成することで記事を追加できます。
- フォルダ名がURLのパスになります（例：`public/posts/hoge-fuga` -> `https://localhost:3000/posts/hoge-fuga/`）。
- 子フォルダの中には`readme.md`が必須です。記事に利用する画像はそのフォルダ内に配置して相対パスで記述できます。

### MarkdownのFrontmatter

記事を書く際、所定のFrontmatterを記述する必要があります。

#### events

```markdown
---
title: 'MapLibre Meetup Japan #01'
plannedDate: 2023-11-09
url: https://mug-jp.connpass.com/event/293158/
---
```

#### posts

```markdown
---
title: chiitilerでつくる地図タイルサーバー
tags: [TypeScript, Hono, foss4g, Node.js, lambda]
author: kanahiro_iguchi # Xのユーザー名
publishedAt: 2024-06-26
---
```

## インフラとドメイン

- 現在は @kanahiro_iguchi が管理するCloudflareアカウント下のドメイン・Pagesで動作しています。

### Cloudflare Pagesへの公開

本番・プレビューのビルド設定を次の値に揃えます。

| 設定                    | 値                                                                  |
| ----------------------- | ------------------------------------------------------------------- |
| Framework preset        | None                                                                |
| Build command           | `pnpm build`                                                        |
| Build output directory  | `dist/client`                                                       |
| 環境変数 `PNPM_VERSION` | `package.json`の`packageManager`と同じバージョン（現在は`12.12.1`） |
| 環境変数 `BASE_PATH`    | ルートドメインでの公開時は未設定                                    |

Cloudflare Pagesのビルドイメージが用意するpnpmはリポジトリのバージョンと異なることがあるため、`PNPM_VERSION`を指定します。特にv2イメージでは既定のpnpm 8で新しいロックファイルを読ませないようにしてください。pnpm更新時にはこの環境変数も更新します。[ビルドイメージの公式ドキュメント](https://developers.cloudflare.com/pages/configuration/build-image/)

### GitHub Pagesへの公開

1. リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に設定します。
2. `main` に変更をpushすると、`Deploy to GitHub Pages` ワークフローが静的ファイルを生成・公開します。Actions画面から手動実行もできます。
3. 標準の公開URLは `https://mug-jp.github.io/website/` です。

公開パスはGitHub Pagesの設定から自動取得します。独自ドメインを利用する場合は、Settings → Pagesでドメインを設定し、DNSをGitHub Pagesに向けてからワークフローを再実行してください。既存のCloudflare Pagesから移行する場合、DNSの切り替えはGitHub Pages側の公開を確認してから行ってください。

ローカルでGitHub Pagesと同じパスのビルドを確認するには、次を実行します。

```sh
pnpm install --frozen-lockfile
BASE_PATH=/website pnpm build
BASE_PATH=/website pnpm start
```

生成先は `dist/client/` です。通常の `pnpm dev` / `pnpm build` ではルートパスで動作します。

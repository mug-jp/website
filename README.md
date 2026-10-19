# MUG-JPのWebサイト

## 記事の書き方

- `public`以下に`events`と`posts`というディレクトリがあります。その中にフォルダを作成することで記事を追加できます。
- フォルダ名がURLのパスになります（例：`public/posts/hoge-fuga` -> `https://localhost:3000/posts/hoge-fuga/`）。
- 子フォルダの中には`readme.md`が必須です。記事に利用する画像はそのフォルダ内に配置して相対パスで記述できます。

### MarkdownのFrontmatter

記事を書く際、所定のFrontmatterを記述する必要があります。

#### events

```markdown
---
title: "MapLibre Meetup Japan #01"
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

### GitHub Pagesへの公開

1. リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に設定します。
2. `main` に変更をpushすると、`Deploy to GitHub Pages` ワークフローが静的ファイルを生成・公開します。Actions画面から手動実行もできます。
3. 標準の公開URLは `https://mug-jp.github.io/website/` です。

公開パスはGitHub Pagesの設定から自動取得します。独自ドメインを利用する場合は、Settings → Pagesでドメインを設定し、DNSをGitHub Pagesに向けてからワークフローを再実行してください。既存のCloudflare Pagesから移行する場合、DNSの切り替えはGitHub Pages側の公開を確認してから行ってください。

ローカルでGitHub Pagesと同じパスのビルドを確認するには、次を実行します。

```sh
npm ci
NEXT_PUBLIC_BASE_PATH=/website npm run build
```

生成先は `out/` です。通常の `npm run dev` / `npm run build` ではルートパスで動作します。

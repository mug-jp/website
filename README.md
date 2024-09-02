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

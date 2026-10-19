import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'yaml';
import Parser from 'rss-parser';
import type { Plugin } from 'vite';
import type { Event, Post, SiteContent } from './content.ts';

const moduleId = 'virtual:mug-content';
const resolvedId = `\0${moduleId}`;
const collections = ['posts', 'events', 'spaces'] as const;

export function contentFiles(collection: (typeof collections)[number]) {
    return readdirSync(`public/${collection}`, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => ({
            slug: entry.name,
            path: resolve(`public/${collection}/${entry.name}/readme.md`),
        }));
}

export function readCollection<K extends (typeof collections)[number]>(
    collection: K,
): SiteContent[K] {
    const dateKey = collection === 'posts' ? 'publishedAt' : 'plannedDate';
    const entries = contentFiles(collection).map(({ slug, path }) => {
        const source = readFileSync(path, 'utf8');
        const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(
            source,
        );
        if (!frontmatter) throw new Error(`Missing frontmatter: ${path}`);
        const data = parse(frontmatter[1]);
        const content = source.slice(frontmatter[0].length);
        // Normalize YAML dates once so SSR and the browser share the same representation.
        const date = new Date(data[dateKey]);
        if (
            !data.title ||
            Number.isNaN(date.getTime()) ||
            (collection === 'posts' && !Array.isArray(data.tags))
        ) {
            throw new Error(`Invalid frontmatter: ${path}`);
        }
        return { ...data, slug, content, [dateKey]: date.toISOString() } as
            Post | Event;
    });
    entries.sort((a, b) => {
        const date = (entry: Post | Event) =>
            'publishedAt' in entry ? entry.publishedAt : entry.plannedDate;
        return date(b).localeCompare(date(a));
    });
    return entries as SiteContent[K];
}

// Content is bundled with the pages: client navigation needs no runtime API on GitHub Pages.
export function contentPlugin(): Plugin {
    let radio: Promise<SiteContent['radio']> | undefined;
    return {
        name: 'mug-content',
        resolveId: (id) => (id === moduleId ? resolvedId : undefined),
        async load(id) {
            if (id !== resolvedId) return;
            for (const collection of collections) {
                this.addWatchFile(resolve(`public/${collection}`));
                for (const file of contentFiles(collection))
                    this.addWatchFile(file.path);
            }
            radio ??= new Parser({ timeout: 15000 })
                .parseURL('https://anchor.fm/s/ff450088/podcast/rss')
                .then((feed) =>
                    feed.items.map((item) => ({
                        title: item.title || '',
                        plannedDate: new Date(item.pubDate || '').toISOString(),
                        url: item.link || '',
                    })),
                );
            const content: SiteContent = {
                posts: readCollection('posts'),
                events: readCollection('events'),
                spaces: readCollection('spaces'),
                radio: await radio,
            };
            return `export default ${JSON.stringify(content)}`;
        },
    };
}

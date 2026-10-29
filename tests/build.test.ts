import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { contentFiles } from '../lib/content-plugin';

const output = 'dist/client';
const base = `${(process.env.BASE_PATH || '').replace(/\/$/, '')}/`;
const pages = [
    '',
    'posts',
    'events',
    ...(['posts', 'events', 'spaces'] as const).flatMap((collection) =>
        contentFiles(collection).map(
            ({ slug }) =>
                `${collection === 'spaces' ? 'events/spaces' : collection}/${slug}`,
        ),
    ),
];

test('every article and listing has prerendered content and valid local URLs', () => {
    for (const page of pages) {
        const file = join(output, page, 'index.html');
        assert.ok(existsSync(file), `Missing page: ${file}`);
        const html = readFileSync(file, 'utf8');
        assert.match(html, /<title>[^<]+<\/title>/, `Missing title: ${file}`);
        assert.match(
            html,
            page === ''
                ? /Organizers/
                : page === 'posts'
                  ? /class="truncate"/
                  : /(?:<h[12]|Published At:)/,
            `Missing content: ${file}`,
        );
        for (const [, url] of html.matchAll(
            /(?:src|href)="(\/[^"#?]*)(?:[?#][^"]*)?"/g,
        )) {
            if (url.startsWith('//')) continue;
            assert.ok(
                url.startsWith(base),
                `Incorrect base path: ${url} in ${file}`,
            );
            const target = join(
                output,
                decodeURIComponent(url.slice(base.length)),
            );
            assert.ok(
                existsSync(target),
                `Missing local target: ${url} in ${file}`,
            );
        }
    }
});

test('GitHub Pages 404 can be served at any URL without hydrating another route', () => {
    const html = readFileSync(join(output, '404.html'), 'utf8');
    assert.match(html, /<h1>404<\/h1>/);
    assert.doesNotMatch(html, /<script\b/);
});

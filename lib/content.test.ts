import assert from 'node:assert/strict';
import test from 'node:test';
import { contentFiles, readCollection } from './content-plugin';
import { contentAssetUrl, formatDate } from './utils';

test('all Markdown entries have unique slugs and are sorted newest first', () => {
    for (const collection of ['posts', 'events', 'spaces'] as const) {
        const entries = readCollection(collection);
        assert.equal(entries.length, contentFiles(collection).length);
        assert.equal(
            new Set(entries.map((entry) => entry.slug)).size,
            entries.length,
        );
        const dates = entries.map((entry) =>
            'publishedAt' in entry ? entry.publishedAt : entry.plannedDate,
        );
        assert.deepEqual(dates, [...dates].sort().reverse());
        assert.ok(entries.every((entry) => entry.title && entry.content));
    }
});

test('Markdown images resolve against the source folder under root and project hosting', () => {
    for (const base of ['/', '/website/']) {
        const prefix = base.replace(/\/$/, '');
        assert.equal(
            contentAssetUrl(
                './spaces_01.jpg',
                '/spaces/2023-02-01-spaces01',
                base,
            ),
            `${prefix}/spaces/2023-02-01-spaces01/./spaces_01.jpg`,
        );
        assert.equal(
            contentAssetUrl('/events/photo.png', '/posts/example', base),
            `${prefix}/events/photo.png`,
        );
        assert.equal(
            contentAssetUrl(
                'https://example.com/image.png',
                '/posts/example',
                base,
            ),
            'https://example.com/image.png',
        );
        assert.equal(
            contentAssetUrl('//example.com/image.png', '/posts/example', base),
            '//example.com/image.png',
        );
        assert.equal(
            contentAssetUrl(undefined, '/posts/example', base),
            undefined,
        );
    }
});

test('dates retain the source calendar date in every timezone', () => {
    assert.equal(formatDate('2023-02-01T00:00:00.000Z'), '2023/02/01');
});

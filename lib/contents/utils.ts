import fs from 'fs';
import type { Post } from './type';

export const getAllSlug = (dirPath: string) => {
    return fs.readdirSync(dirPath).map((fileName) => {
        return fileName.replace(/\/readme.md$/, '');
    });
};

import matter from 'gray-matter';

export const getMarkdown = (
    filePath: string,
): {
    data: Post;
    content: string;
} => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        data: {
            title: data.title as string,
            tags: data.tags as string[],
            author: data.author as string,
            publishedAt: data.published as Date,
            // slug = /path/to/file/content.md -> content
            slug: filePath
                .replace(/\/readme.md$/, '')
                .split('/')
                .pop()!,
        },
        content: content,
    };
};

import { remark } from 'remark';
import remarkHtml from 'remark-html';

export const markdownToHtml = async (markdownContent: string) => {
    const result = await remark().use(remarkHtml).process(markdownContent);
    return result.toString();
};

import { load } from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';

export const preprocessHtml = (html: string) => {
    const _$ = load(html);
    _$('pre code').each((_, elm) => {
        const result = hljs.highlightAuto(_$(elm).text());
        _$(elm).html(result.value);
        _$(elm).addClass('hljs');
    });

    // img
    _$('img').each((_, elm) => {
        // lazy loading
        _$(elm).attr({ loading: 'lazy', decoding: 'async' });
    });

    // script
    _$('script').each((_, elm) => {
        _$(elm).remove();
    });

    return _$.html();
};

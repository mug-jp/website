import fs from 'fs';

export const getAllSlug = (dirPath: string) => {
    return fs.readdirSync(dirPath);
};

import matter from 'gray-matter';

export function getMarkdown<T>(filePath: string): {
    data: T;
    content: string;
} {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        data: {
            ...data,
            // slug = /path/to/file/content.md -> content
            slug: filePath
                .replace(/\/readme.md$/, '')
                .split('/')
                .pop()!,
        } as T,
        content: content,
    };
}

export const formatDate = (date: Date) => {
    // yyyy/mm/dd
    return date.toISOString().split('T')[0].replace(/-/g, '/');
};

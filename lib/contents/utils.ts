import fs from 'fs';

export const getAllSlug = (dirPath: string) => {
    return fs.readdirSync(dirPath).map((fileName) => {
        return fileName.replace(/\/readme.md$/, '');
    });
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

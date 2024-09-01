import {
    getAllSlug,
    getMarkdown,
    markdownToHtml,
    preprocessHtml,
} from '@/contents/utils';
import './page.css';
import Link from 'next/link';

import MarkdownContent from '@/components/MarkdownContent';

export async function generateStaticParams() {
    const slugs = getAllSlug('contents/posts');
    const staticPaths = slugs.map((slug) => {
        return {
            slug,
        };
    });

    return staticPaths;
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { content, data } = getMarkdown(
        `contents/posts/${params.slug}/readme.md`,
    );
    const htmlContent = preprocessHtml(await markdownToHtml(content));
    return (
        <div className="container">
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <div>
                <span>
                    Author:{' '}
                    <Link href={`https://x.com/${data.author}`}>
                        @{data.author}
                    </Link>
                </span>
            </div>
            <div>
                <span>Published at: {data.publishedAt.toString()}</span>
            </div>
            <div className="space-x-1">
                <span>Tags:</span>
                {data.tags.map((tag) => (
                    <span key={tag} className="tag">
                        {tag}
                    </span>
                ))}
            </div>
            <MarkdownContent htmlContent={htmlContent} />
        </div>
    );
}

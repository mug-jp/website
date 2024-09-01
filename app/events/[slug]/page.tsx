import {
    getAllSlug,
    getMarkdown,
    markdownToHtml,
    preprocessHtml,
} from '@/contents/utils';
import './page.css';

import MarkdownContent from '@/components/MarkdownContent';

export default async function Page({ params }: { params: { slug: string } }) {
    const { content, data } = getMarkdown(
        `contents/events/${params.slug}/readme.md`,
    );
    const htmlContent = preprocessHtml(await markdownToHtml(content));
    return (
        <div className="container">
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <div>
                <span>Published at: {data.publishedAt.toString()}</span>
            </div>
            <MarkdownContent htmlContent={htmlContent} />
        </div>
    );
}

export async function generateStaticParams() {
    const slugs = getAllSlug('contents/events');
    const staticPaths = slugs.map((slug) => {
        return {
            slug,
        };
    });

    return staticPaths;
}

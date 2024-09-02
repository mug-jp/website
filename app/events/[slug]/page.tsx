import { formatDate, getAllSlug, getMarkdown } from '@/lib/utils';
import './page.css';

import MarkdownContent from '@/components/MarkdownContent';
import { Event } from '@/lib/type';

export default async function Page({ params }: { params: { slug: string } }) {
    const { content, data } = getMarkdown<Event>(
        `public/events/${params.slug}/readme.md`,
    );
    return (
        <div className="container">
            <h1 className="text-2xl md:text-4xl font-bold">{data.title}</h1>
            <div>
                <span>Planned at: {formatDate(data.plannedDate)}</span>
            </div>
            <MarkdownContent content={content} />
        </div>
    );
}

export async function generateStaticParams() {
    const slugs = getAllSlug('public/events');
    const staticPaths = slugs.map((slug) => {
        return {
            slug,
        };
    });

    return staticPaths;
}

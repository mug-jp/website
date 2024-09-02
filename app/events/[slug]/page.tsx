import { formatDate, getAllSlug, getMarkdown } from '@/lib/utils';
import './page.css';

import MarkdownContent from '@/components/MarkdownContent';
import { Event } from '@/lib/type';
import Link from 'next/link';
import { Metadata } from 'next';

export default async function Page({ params }: { params: { slug: string } }) {
    const { content, data } = getMarkdown<Event>(
        `public/events/${params.slug}/readme.md`,
    );
    return (
        <div className="container">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
                {data.title}
            </h1>
            <div className="flex flex-col">
                <span>Planned At: {formatDate(data.plannedDate)}</span>
                <span>
                    Connpass: <Link href={data.url}>{data.url}</Link>
                </span>
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

export async function generateMetadata({ params }: any): Promise<Metadata> {
    const { content, data } = getMarkdown<Event>(
        `public/events/${params.slug}/readme.md`,
    );

    return {
        title: `${data.title} - MapLibre User Group Japan`,
        description: content.replaceAll('\n', ' ').slice(0, 200) + '...',
    };
}

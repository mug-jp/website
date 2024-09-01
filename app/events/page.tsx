import { getAllSlug, getMarkdown } from '@/contents/utils';
import Link from 'next/link';

const formatDate = (date: Date) => {
    // yyyy/mm/dd
    return date.toISOString().split('T')[0].replace(/-/g, '/');
};

export default async function Page({ params }: { params: { slug: string } }) {
    const slugs = getAllSlug('contents/events');
    const markdowns = slugs.map((slug) => {
        return getMarkdown(`contents/events/${slug}/readme.md`);
    });
    return (
        <div className="flex justify-center">
            <div className="w-[800px]">
                {markdowns.map((md) => (
                    <div key={md.data.slug} className="flex space-x-2">
                        <span>{formatDate(md.data.publishedAt)}</span>
                        <Link href={`/events/${md.data.slug}`}>
                            {md.data.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

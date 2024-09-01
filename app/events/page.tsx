import { getAllSlug, getMarkdown } from '@/lib/contents/utils';
import Link from 'next/link';

const formatDate = (date: Date) => {
    // yyyy/mm/dd
    return date.toISOString().split('T')[0].replace(/-/g, '/');
};

export default async function Page({ params }: { params: { slug: string } }) {
    const slugs = getAllSlug('public/events');
    const markdowns = slugs.map((slug) => {
        return getMarkdown(`public/events/${slug}/readme.md`);
    });
    return (
        <main className="flex justify-center p-8">
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
        </main>
    );
}

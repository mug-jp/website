import { Event } from '@/lib/type';
import { getAllSlug, getMarkdown } from '@/lib/utils';
import Card from './Card';

export default async function Page({ params }: { params: { slug: string } }) {
    const slugs = getAllSlug('public/events');
    const markdowns = slugs
        .map((slug) => {
            return getMarkdown<Event>(`public/events/${slug}/readme.md`);
        })
        .sort((a, b) => {
            return b.data.plannedDate.getTime() - a.data.plannedDate.getTime();
        });
    return (
        <main className="flex justify-center p-8">
            <div className="w-full md:w-[600px] flex flex-col gap-4">
                {markdowns.map((md) => (
                    <Card
                        key={md.data.slug}
                        event={md.data}
                        content={md.content}
                    />
                ))}
            </div>
        </main>
    );
}

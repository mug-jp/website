import { getAllSlug, getMarkdown } from '@/lib/contents/utils';
import Card from './Card';

export default async function Page() {
    const slugs = getAllSlug('public/posts');
    const markdowns = slugs.map((slug) => {
        return getMarkdown(`public/posts/${slug}/readme.md`);
    });
    return (
        <main className="flex justify-center p-8">
            <div className="w-[800px] flex flex-col gap-10">
                {markdowns.map((md) => (
                    <Card post={md.data} content={md.content} />
                ))}
            </div>
        </main>
    );
}

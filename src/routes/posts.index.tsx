import { createFileRoute, Link } from '@tanstack/react-router';
import content from 'virtual:mug-content';
import { formatDate, pageHead } from '@/lib/utils';

export const Route = createFileRoute('/posts/')({
    head: () =>
        pageHead('Posts', 'Blog posts of MapLibre User Group Japan(MUG-JP).'),
    component: Posts,
});

function Posts() {
    return (
        <main className="flex justify-center p-8">
            <div className="w-full md:w-[600px] flex flex-col gap-10">
                {content.posts.map((post) => (
                    <div key={post.slug} className="flex flex-col gap-1">
                        <span>{formatDate(post.publishedAt)}</span>
                        <Link
                            to="/posts/$slug/"
                            params={{ slug: post.slug }}
                            className="truncate"
                        >
                            {post.title}
                        </Link>
                        <div className="flex gap-1">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-gray-400 dark:bg-gray-600 rounded-md px-1 text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

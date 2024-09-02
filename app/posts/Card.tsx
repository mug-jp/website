import type { Post } from '@/lib/type';
import Link from 'next/link';

const formatDate = (date: Date) => {
    // yyyy/mm/dd
    return date.toISOString().split('T')[0].replace(/-/g, '/');
};

export default function Card({
    post,
    content,
}: {
    post: Post;
    content: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <span>{formatDate(post.publishedAt)}</span>
            <Link href={`/posts/${post.slug}`} className="truncate">
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
    );
}

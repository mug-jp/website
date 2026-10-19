import { createFileRoute, notFound } from '@tanstack/react-router';
import content from 'virtual:mug-content';
import { formatDate, pageHead } from '@/lib/utils';
import MarkdownContent from '@/components/MarkdownContent';

export const Route = createFileRoute('/posts/$slug')({
    loader: ({ params }) => {
        const post = content.posts.find((post) => post.slug === params.slug);
        if (!post) throw notFound();
        return post;
    },
    head: ({ loaderData }) => loaderData ? pageHead(loaderData.title, loaderData.content.replaceAll('\n', ' ').slice(0, 200) + '...') : {},
    component: Post,
});

function Post() {
    const post = Route.useLoaderData();
    return <div className="container">
        <h1 className="text-xl md:text-4xl font-bold mb-2">{post.title}</h1>
        {post.author && <div>Author: <a href={`https://x.com/${post.author}`}>@{post.author}</a></div>}
        <div>Published At: {formatDate(post.publishedAt)}</div>
        <div className="space-x-1"><span>Tags:</span>{post.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
        <MarkdownContent content={post.content} contentDirectory={`/posts/${post.slug}`} />
    </div>;
}

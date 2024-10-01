import { formatDate, getAllSlug, getMarkdown } from '@/lib/utils';
import { Link } from 'next-view-transitions';

import MarkdownContent from '@/components/MarkdownContent';
import { Post } from '@/lib/type';
import { Metadata } from 'next';

export default async function Page({ params }: { params: { slug: string } }) {
	const { content, data } = getMarkdown<Post>(
		`public/posts/${params.slug}/readme.md`,
	);
	return (
		<div className="container">
			<h1 className="text-xl md:text-4xl font-bold mb-2">{data.title}</h1>
			{data.author && (
				<div>
					<span>
						Author:
						<Link href={`https://x.com/${data.author}`}>@{data.author}</Link>
					</span>
				</div>
			)}
			<div>
				<span>Published At: {formatDate(data.publishedAt)}</span>
			</div>
			<div className="space-x-1">
				<span>Tags:</span>
				{data.tags.map((tag) => (
					<span key={tag} className="tag">
						{tag}
					</span>
				))}
			</div>
			<MarkdownContent content={content} />
		</div>
	);
}

export async function generateStaticParams() {
	const slugs = getAllSlug('public/posts');
	const staticPaths = slugs.map((slug) => {
		return {
			slug,
		};
	});

	return staticPaths;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const { content, data } = getMarkdown<Post>(
		`public/posts/${params.slug}/readme.md`,
	);

	return {
		title: `${data.title} - MapLibre User Group Japan`,
		description: content.replaceAll('\n', ' ').slice(0, 200) + '...',
	};
}

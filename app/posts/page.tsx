import { getAllSlug, getMarkdown } from '@/lib/utils';
import Card from './Card';
import { Post } from '@/lib/type';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Posts - MapLibre User Group Japan',
	description: 'Blog posts of MapLibre User Group Japan(MUG-JP).',
	twitter: {
		card: 'summary',
		site: '@kanahiro_iguchi',
	},
};

export default async function Page() {
	const slugs = getAllSlug('public/posts');
	const markdowns = slugs
		.map((slug) => {
			return getMarkdown<Post>(`public/posts/${slug}/readme.md`);
		})
		.sort((a, b) => {
			return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
		});
	return (
		<main className="flex justify-center p-8">
			<div className="w-full md:w-[600px] flex flex-col gap-10">
				{markdowns.map((md) => (
					<Card key={md.data.slug} post={md.data} content={md.content} />
				))}
			</div>
		</main>
	);
}

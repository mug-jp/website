import { getAllSlug, getMarkdown } from '@/lib/utils';
import Card from './Card';
import Parser from 'rss-parser';
import { Event } from '@/lib/type';

async function SpacesFromRss() {
	const parser = new Parser();
	const feed = await parser.parseURL(
		'https://anchor.fm/s/ff450088/podcast/rss',
	);

	return feed.items.map((item) => {
		return {
			title: item.title || '',
			description: item.description || '',
			pubDate: item.pubDate || '',
			link: item.link || '',
		};
	});
}

export default async function Spaces() {
	const slugs = getAllSlug('public/spaces');
	const markdowns = slugs
		.map((slug) => {
			return getMarkdown<Event>(`public/spaces/${slug}/readme.md`);
		})
		.sort((a, b) => {
			return b.data.plannedDate.getTime() - a.data.plannedDate.getTime();
		});

	const rss = await SpacesFromRss();

	return (
		<div className="flex flex-col gap-4">
			{rss.map((space, index) => (
				<Card
					key={index}
					event={{
						title: space.title,
						slug: space.link,
						plannedDate: new Date(space.pubDate),
					}}
					href={space.link}
					content={space.description}
				/>
			))}
			{markdowns.map((md) => (
				<Card
					key={md.data.slug}
					event={md.data}
					content={md.content}
					href={`/events/spaces/${md.data.slug}/`}
				/>
			))}
		</div>
	);
}

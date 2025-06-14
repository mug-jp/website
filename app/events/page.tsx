import { Event } from '@/lib/type';
import { getAllSlug, getMarkdown } from '@/lib/utils';
import Card from './Card';
import { Metadata } from 'next';
import Spaces from './Spaces';

export const metadata: Metadata = {
	title: 'Events - MapLibre User Group Japan',
	description: 'Events of MapLibre User Group Japan(MUG-JP).',
	twitter: {
		card: 'summary',
		site: '@kanahiro_iguchi',
	},
};

export default async function Page({ params }: { params: { slug: string } }) {
	const slugs = getAllSlug('public/events');
	const markdowns = slugs
		.map((slug) => {
			return getMarkdown<Event>(`public/events/${slug}/readme.md`);
		})
		.sort((a, b) => {
			return b.data.plannedDate.getTime() - a.data.plannedDate.getTime();
		});

	const spaces = await Spaces();

	return (
		<main className="flex justify-center p-8">
			<div className="w-full md:w-[600px] flex flex-col gap-8">
				<div>
					<h2 className="text-2xl font-bold mb-4">General Events</h2>
					<div className="flex flex-col gap-4">
						{markdowns.map((md) => (
							<Card
								key={md.data.slug}
								event={md.data}
								content={md.content}
								href={`/events/${md.data.slug}/`}
							/>
						))}
					</div>
				</div>
				<div>
					<h2 className="text-2xl font-bold mb-4">MUG-JP Space (radio)</h2>
					{spaces}
				</div>
			</div>
		</main>
	);
}

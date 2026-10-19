import { formatDate, getAllSlug, getMarkdown } from '@/lib/utils';
import { Metadata } from 'next';
import { Event } from '@/lib/type';
import { Link } from 'next-view-transitions';
import MarkdownContent from '@/components/MarkdownContent';

export default async function Page({ params }: { params: { slug: string } }) {
	const { content, data } = getMarkdown<Event>(
		`public/spaces/${params.slug}/readme.md`,
	);
	return (
		<div className="container">
			<h1 className="text-xl md:text-4xl font-bold mb-2">{data.title}</h1>
			{data.url && (
				<div className="flex flex-col">
					<span>Planned At: {formatDate(data.plannedDate)}</span>

					<span>
						Link: <Link href={data.url}>{data.url}</Link>
					</span>
				</div>
			)}
			<MarkdownContent content={content} contentDirectory={`/spaces/${params.slug}`} />
		</div>
	);
}

export async function generateStaticParams() {
	const slugs = getAllSlug('public/spaces');
	const staticPaths = slugs.map((slug) => {
		return {
			slug,
		};
	});

	return staticPaths;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const { content, data } = getMarkdown<Event>(
		`public/spaces/${params.slug}/readme.md`,
	);

	return {
		title: `${data.title} - MapLibre User Group Japan`,
		description: content.replaceAll('\n', ' ').slice(0, 200) + '...',
		twitter: {
			card: 'summary',
			site: '@kanahiro_iguchi',
		},
	};
}

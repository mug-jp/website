import { Event } from '@/lib/type';
import { Link } from 'next-view-transitions';
import { formatDate } from '@/lib/utils';

export default function Card({
	event,
	content,
	href,
}: {
	event: Event;
	content: string;
	href: string;
}) {
	return (
		<div className="flex flex-col gap-1">
			<span>{formatDate(event.plannedDate)}</span>
			<Link href={href} className="truncate">
				{event.title}
			</Link>
		</div>
	);
}

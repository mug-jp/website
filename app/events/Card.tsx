import { Event } from '@/lib/type';
import Link from 'next/link';

const formatDate = (date: Date) => {
    // yyyy/mm/dd
    return date.toISOString().split('T')[0].replace(/-/g, '/');
};

export default function Card({
    event,
    content,
}: {
    event: Event;
    content: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <span>{formatDate(event.plannedDate)}</span>
            <a href={`/events/${event.slug}/`} className="truncate">
                {event.title}
            </a>
        </div>
    );
}

import type { Event } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import MarkdownContent from './MarkdownContent';

export default function EventDetail({
    event,
    contentDirectory,
}: {
    event: Event;
    contentDirectory: string;
}) {
    return (
        <div className="container">
            <h1 className="text-xl md:text-4xl font-bold mb-2">
                {event.title}
            </h1>
            {event.url && (
                <div className="flex flex-col">
                    <span>Planned At: {formatDate(event.plannedDate)}</span>
                    <span>
                        Link: <a href={event.url}>{event.url}</a>
                    </span>
                </div>
            )}
            <MarkdownContent
                content={event.content}
                contentDirectory={contentDirectory}
            />
        </div>
    );
}

import { createFileRoute, Link } from '@tanstack/react-router';
import content from 'virtual:mug-content';
import { formatDate, pageHead } from '@/lib/utils';

export const Route = createFileRoute('/events/')({
    head: () =>
        pageHead('Events', 'Events of MapLibre User Group Japan(MUG-JP).'),
    component: Events,
});

function Events() {
    return (
        <main className="flex justify-center p-8">
            <div className="w-full md:w-[600px] flex flex-col gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">General Events</h2>
                    <div className="flex flex-col gap-4">
                        {content.events.map((event) => (
                            <div
                                key={event.slug}
                                className="flex flex-col gap-1"
                            >
                                <span>{formatDate(event.plannedDate)}</span>
                                <Link
                                    to="/events/$slug/"
                                    params={{ slug: event.slug }}
                                    className="truncate"
                                >
                                    {event.title}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        MUG-JP Space (radio)
                    </h2>
                    <div className="flex flex-col gap-4">
                        {content.radio.map((episode) => (
                            <div
                                key={episode.url}
                                className="flex flex-col gap-1"
                            >
                                <span>{formatDate(episode.plannedDate)}</span>
                                <a href={episode.url} className="truncate">
                                    {episode.title}
                                </a>
                            </div>
                        ))}
                        {content.spaces.map((space) => (
                            <div
                                key={space.slug}
                                className="flex flex-col gap-1"
                            >
                                <span>{formatDate(space.plannedDate)}</span>
                                <Link
                                    to="/events/spaces/$slug/"
                                    params={{ slug: space.slug }}
                                    className="truncate"
                                >
                                    {space.title}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

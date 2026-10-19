import { createFileRoute, notFound } from '@tanstack/react-router';
import content from 'virtual:mug-content';
import { pageHead } from '@/lib/utils';
import EventDetail from '@/components/EventDetail';

export const Route = createFileRoute('/events/spaces/$slug')({
    loader: ({ params }) => {
        const event = content.spaces.find((event) => event.slug === params.slug);
        if (!event) throw notFound();
        return event;
    },
    head: ({ loaderData }) => loaderData ? pageHead(loaderData.title, loaderData.content.replaceAll('\n', ' ').slice(0, 200) + '...') : {},
    component: Event,
});

function Event() {
    const event = Route.useLoaderData();
    return <EventDetail event={event} contentDirectory={`/spaces/${event.slug}`} />;
}

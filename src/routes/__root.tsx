import {
    createRootRoute,
    HeadContent,
    Outlet,
    Scripts,
} from '@tanstack/react-router';
import LayoutHeader from '@/components/LayoutHeader';
import LayoutFooter from '@/components/LayoutFooter';
import NotFound from '@/components/NotFound';
import styles from '../styles.css?url';

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { title: 'MapLibre User Group Japan' },
            {
                name: 'description',
                content: 'The website of MapLibre User Group Japan(MUG-JP).',
            },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@kanahiro_iguchi' },
        ],
        links: [
            { rel: 'stylesheet', href: styles },
            { rel: 'icon', href: `${import.meta.env.BASE_URL}favicon.ico` },
        ],
    }),
    component: Root,
    notFoundComponent: NotFound,
});

function Root() {
    return (
        <html lang="ja">
            <head>
                <HeadContent />
            </head>
            <body className="dark">
                <div className="sticky top-0">
                    <LayoutHeader />
                </div>
                <div className="p-2">
                    <Outlet />
                </div>
                <LayoutFooter />
                <Scripts />
            </body>
        </html>
    );
}

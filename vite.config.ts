import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { contentFiles, contentPlugin } from './lib/content-plugin.ts';

const base = `${(process.env.BASE_PATH || '').replace(/\/$/, '')}/`;

export default defineConfig({
    base,
    resolve: { tsconfigPaths: true },
    plugins: [
        contentPlugin(),
        tailwindcss(),
        tanstackStart({
            prerender: { enabled: true, crawlLinks: false, failOnError: true },
            pages: (['posts', 'events', 'spaces'] as const).flatMap(
                (collection) =>
                    contentFiles(collection).map(({ slug }) => ({
                        path: `${collection === 'spaces' ? '/events/spaces' : `/${collection}`}/${slug}/`,
                    })),
            ),
        }),
        react(),
    ],
});

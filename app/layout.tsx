import type { Metadata } from 'next';
import { Alata } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';

import './globals.css';
import LayoutHeader from './LayoutHeader';
import LayoutFooter from './LayoutFooter';

const font = Alata({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MapLibre User Group Japan',
    description: 'The website of MapLibre User Group Japan(MUG-JP).',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html lang="ja">
                <body className={`${font.className} dark`}>
                    <div className="sticky top-0">
                        <LayoutHeader />
                    </div>
                    <div className="p-2">{children}</div>
                    <LayoutFooter />
                </body>
            </html>
        </ViewTransitions>
    );
}

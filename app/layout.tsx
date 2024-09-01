import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutHeader from './LayoutHeader';

export const runtime = 'edge';

const inter = Inter({ subsets: ['latin'] });

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
        <html lang="ja">
            <body className={inter.className}>
                <LayoutHeader />
                {children}
            </body>
        </html>
    );
}

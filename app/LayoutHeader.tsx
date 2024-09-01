import Image from 'next/image';
import MapLibreIcon from '@/assets/icon.png';
import Link from 'next/link';

export default function LayoutHeader() {
    return (
        <header className="p-2 flex items-center gap-2">
            <Link href="/" className="flex space-x-2 justify-end items-center">
                <Image
                    src={MapLibreIcon}
                    alt="MapLibre User Group Japan"
                    height={32}
                    width={32}
                />
                <span className="hidden md:block">
                    MapLibre User Group Japan
                </span>
            </Link>
            <span>|</span>
            <Link href="/posts">Posts</Link>
            <Link href="/events">Events</Link>
        </header>
    );
}

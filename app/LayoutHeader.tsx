import Image from 'next/image';
import MapLibreIcon from '@/assets/icon.png';
import Link from 'next/link';

export default function LayoutHeader() {
    return (
        <header className="p-2 flex justify-between items-center">
            <div>
                <Link href="/about">About</Link>
                <span> | </span>
                <Link href="/posts">Posts</Link>
                <span> | </span>
                <Link href="/events">Events</Link>
            </div>
            <Link href="/" className="flex space-x-2 justify-end items-center">
                <span className="">MapLibre User Group Japan</span>
                <Image
                    src={MapLibreIcon}
                    alt="MapLibre User Group Japan"
                    height={32}
                    width={32}
                />
            </Link>
        </header>
    );
}

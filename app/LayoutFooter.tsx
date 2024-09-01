import Image from 'next/image';
import MapLibreIcon from '@/assets/icon.png';
import Link from 'next/link';

export default function LayoutFooter() {
    return (
        <footer className="p-10 flex justify-center items-center text-sm">
            <span>©︎ MapLibre User Group Japan</span>
        </footer>
    );
}

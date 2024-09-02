'use client';

import Image from 'next/image';
import MapLibreIcon from '@/assets/icon.png';
import Link from 'next/link';

import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { useCallback, useEffect, useState } from 'react';

type UseDarkMode = (isDark?: boolean) => {
    isDarkMode: boolean;
    toggle: (isDark: boolean) => void;
};

// dark mode と light mode を切り替える
export const useDarkMode: UseDarkMode = (isInitialDark = false) => {
    const [isDarkMode, toggleTheme] = useState<boolean>(isInitialDark);
    const toggle = useCallback((isDark: boolean) => {
        if (typeof isDark === 'undefined') {
            toggleTheme((state) => !state);
            return;
        }

        toggleTheme(isDark);
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    return { isDarkMode, toggle };
};

export default function LayoutHeader() {
    const { isDarkMode, toggle } = useDarkMode();

    return (
        <header className="p-2 flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Link
                    href="/"
                    className="flex space-x-2 justify-end items-center"
                >
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
            </div>
            <div>
                {/* Dark Mode */}
                <DarkModeSwitch checked={isDarkMode} onChange={toggle} />
            </div>
        </header>
    );
}

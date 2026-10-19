import MapLibreIcon from '@/assets/icon.png';
import { Link } from '@tanstack/react-router';

import { useEffect, useState } from 'react';

export default function LayoutHeader() {
    const [isDarkMode, setDarkMode] = useState(true);
    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <header className="p-2 flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Link
                    to="/"
                    className="flex space-x-2 justify-end items-center"
                >
                    <img
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
                <Link to="/posts/">Posts</Link>
                <Link to="/events/">Events</Link>
            </div>
            <div>
                <button
                    type="button"
                    aria-label="ダークモード切り替え"
                    aria-pressed={isDarkMode}
                    onClick={() => setDarkMode((current) => !current)}
                    className="flex items-center justify-center size-7"
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        {isDarkMode ? (
                            <path
                                d="M21 12.8A9 9 0 0 1 11.2 3 9 9 0 1 0 21 12.8Z"
                                fill="currentColor"
                            />
                        ) : (
                            <>
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
                            </>
                        )}
                    </svg>
                </button>
            </div>
        </header>
    );
}

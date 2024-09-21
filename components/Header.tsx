'use client';

import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <header className={ `${ theme === 'light' ? 'bg-white' : 'bg-gray-900' } text-white shadow-md` }>
            <nav className="container px-4 flex justify-between items-center py-4 min-w-full">
                <a href="/"
                   className={ `flex items-center space-x-2 text-xl font-bold ${ theme === 'light' ? 'text-black' : 'text-white' }` }>
                    <Image
                        src='/awspass.png'
                        alt='AWS Pass Logo'
                        width={ 40 }
                        height={ 40 }
                        className="mb-0"
                    />
                    <span>AWS Pass</span>
                </a>

                <div className="flex space-x-4 items-center">
                    <button
                        onClick={ () => setTheme(theme === 'light' ? 'dark' : 'light') }
                        className="ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none"
                        aria-label="Toggle Dark Mode"
                    >
                        { theme === 'light' ? <FaMoon/> : <FaSun/> }
                    </button>

                    {/*<a*/ }
                    {/*    href="https://buymeacoffee.com/awsquiztool"*/ }
                    {/*    target="_blank"*/ }
                    {/*    rel="noopener noreferrer"*/ }
                    {/*    aria-label="Buy me a coffee"*/ }
                    {/*    className="flex items-center"*/ }
                    {/*>*/ }
                    {/*    <img*/ }
                    {/*        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"*/ }
                    {/*        alt="Buy Me a Coffee"*/ }
                    {/*        className="h-8 w-auto rounded-lg hover:opacity-90 transition-opacity duration-300"*/ }
                    {/*    />*/ }
                    {/*</a>*/ }
                </div>
            </nav>
        </header>
    );
}

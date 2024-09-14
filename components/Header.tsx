'use client';

import { FaTwitter, FaGithub, FaLinkedin, FaCoffee, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Ensure the component is mounted before accessing theme to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <header className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} text-white shadow-md`}>
            <nav className="container mx-auto flex justify-between items-center py-4">
                <a href="/"
                    className={`text-xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    AWS Quiz Tool
                </a>

                <div className="flex space-x-4 items-center">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-600 ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
                        <FaTwitter size={20} />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-600 ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
                        <FaGithub size={20} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-600 ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
                        <FaLinkedin size={20} />
                    </a>

                    <a href="https://buymeacoffee.com/davidsampson" target="_blank" rel="noopener noreferrer">
                        <button className="flex items-center space-x-2 bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-all duration-300">
                            <FaCoffee />
                            <span>Buy me a coffee</span>
                        </button>
                    </a>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none"
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>
                </div>
            </nav>
        </header>
    );
}

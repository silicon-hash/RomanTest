"use client";

import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { isDarkTheme, toggleThemeHandler } = useTheme();

  return (
    <>
      <nav className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <span className="text-xl font-bold">Test</span>
          </Link>
        </div>
        <button onClick={toggleThemeHandler} className="p-2">
          {isDarkTheme ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </nav>
      <div className="h-16"></div> {/* Spacer div */}
    </>
  );
}

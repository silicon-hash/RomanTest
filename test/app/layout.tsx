"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeContextProvider, useTheme } from "./context/ThemeContext";
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  return children;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ThemeContextProvider>
          <ThemeWrapper>
            <div className="transition-colors duration-200 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
              <Navbar />
              {children}
            </div>
          </ThemeWrapper>
        </ThemeContextProvider>
      </body>
    </html>
  );
}

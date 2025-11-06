"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-full transition-colors duration-200 bg-background/90 dark:bg-slate-700 w-[37px] h-[37px] flex items-center justify-center"
        disabled
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-200 
                 bg-background/90 text-slate-700 
                 dark:bg-slate-700 dark:text-slate-200 cursor-pointer"
      aria-label="Alternar tema"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}
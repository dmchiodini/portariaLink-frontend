"use client";

import { LogOut, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <User size={20} />
          <span>Lilian Marques</span>
        </div>
        <button className="flex items-center gap-1 text-red-500 hover:text-red-600 transition">
          <LogOut size={20} />
          <span className="text-sm">Sair</span>
        </button>
      </div>
    </header>
  );
}

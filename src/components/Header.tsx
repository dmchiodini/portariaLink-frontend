"use client";

import { LogOut, User, UserCheck } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-end bg-background dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 gap-4">
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <UserCheck color="#1DBC60" size={20} />
          <span>usuario@email.com</span>
        </div>
        <button className="flex items-center gap-1 text-red-600 hover:text-red-700 transition cursor-pointer">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}

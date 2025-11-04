"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Home, Package } from "lucide-react";
import clsx from "clsx";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Usuários", href: "/usuarios", icon: Users },
  { name: "Moradores", href: "/moradores", icon: Home },
  { name: "Encomendas", href: "/encomendas", icon: Package },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="text-xl font-bold mb-6 text-center">Minha Empresa</div>
      <nav className="space-y-2">
        {menuItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-3 p-2 rounded-lg transition-colors",
              pathname === href
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <Icon size={20} />
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

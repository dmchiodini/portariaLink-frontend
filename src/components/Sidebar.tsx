"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Home, Package, User, CircleUser } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { useTheme } from "next-themes";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Usuários", href: "/dashboard/usuarios", icon: Users },
  { name: "Moradores", href: "/dashboard/moradores", icon: Home },
  { name: "Encomendas", href: "/dashboard/encomendas", icon: Package },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <aside className="flex flex-col justify-between bg-foreground dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 p-4">
      <div>
        <div className="text-xl font-bold mb-6 text-center">
          <Image src={"/logo-dark.png"} alt="logo" width={200} height={150} />
        </div>
        <nav className="space-y-2">
          {menuItems.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 p-2 rounded-lg transition-colors text-white",
                pathname === href
                  ? "bg-primary text-white"
                  : "hover:bg-foreground/90 hover:text-background"
              )}
            >
              <Icon size={20} />
              {name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 bg-background/20 p-3 rounded-md text-sm">
        <CircleUser size={20} color="#FFFFFF" />
        <span className="font-semibold text-white w-full">Liliam Marques</span>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Home, Package, User, CircleUser } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { useAuthContext } from "@/context/authContext";
import { getSession } from "@/lib/auth";

const menuItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Usuários", href: "/usuarios", icon: Users },
  { name: "Moradores", href: "/moradores", icon: Home },
  { name: "Encomendas", href: "/encomendas", icon: Package },
];

export function Sidebar() {
  const pathname = usePathname();
  const session = getSession();

  return (
    <aside className="flex flex-col justify-between bg-foreground dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 p-4 h-full">
      <div>
        <div className="flex justify-center mb-6 text-center">
          <Image src={"/logo-dark.png"} alt="logo" width={200} height={150} />
        </div>
        <div className="flex flex-col justify-center items-center gap-2 bg-slate-600 p-2 rounded-md mb-10">
          <p className="font-semibold text-sm text-white">Olá, seja bem-vindo(a)</p>
          <p className="font-semibold text-white">{session.user?.name}</p>
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


    </aside>
  );
}

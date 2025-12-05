"use client";

import Avatar from "@mui/material/Avatar";
import React, { useState, useCallback, memo, useMemo } from "react";
import { CalendarCog, LayoutDashboard, Users, Settings, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemType {
  name: string;
  icon: React.FC<any>;
  href: string;
}

const navItems: NavItemType[] = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Events", icon: CalendarCog, href: "/routes/admin/envent-portfolio" },
  { name: "Users", icon: Users, href: "/routes/admin/users" },
  { name: "Settings", icon: Settings, href: "/admin/services" },
];

// ------------------- Logo Component -------------------
const SidebarLogo: React.FC = memo(() => (
  <div className="flex items-center gap-3 p-3">
    <div className="size-9 text-primary animate-[fadeIn_0.4s_ease]">
      <Avatar>A</Avatar>
    </div>
    <div className="flex flex-col">
      <h1 className="text-base font-bold text-slate-900">Admin Panel</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">Event Portfolio</p>
    </div>
  </div>
));

SidebarLogo.displayName = "SidebarLogo";



// ------------------- Navigation Link Component -------------------
interface NavLinkProps {
  item: NavItemType;
  isActive: boolean;
  closeSidebar: () => void;
}

const NavLink: React.FC<NavLinkProps> = memo(({ item, isActive, closeSidebar }) => {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={closeSidebar}
      className={`relative flex items-center gap-3 px-4 py-2 rounded-lg overflow-hidden group transition-all duration-300
        ${isActive
          ? "hover:text-[#137fec] hover:bg-[#e6f0fb] bg-[#e6f0fb] text-[#137fec] font-semibold"
          : "text-slate-600 hover:text-[#137fec] hover:bg-[#e6f0fb]"
        }`}
    >
      {/* Hover background */}
      <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />

      {/* Active left indicator */}
      {isActive && (
        <span className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md animate-[slideIn_0.3s_ease]" />
      )}

      {/* Icon */}
      <Icon
        size={20}
        className={`relative z-10 transition-all duration-300
          ${isActive
            ? "text-primary scale-110"
            : "text-slate-500 group-hover:text-primary group-hover:scale-110"
          }`}
      />

      {/* Name */}
      <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">
        {item.name}
      </span>
    </Link>
  );
});

NavLink.displayName = "NavLink";

// ------------------- Logout Button Component -------------------
const LogoutButton: React.FC = memo(() => (
  <button className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-red-50 transition-all duration-300 group w-full">
    <LogOut size={20} className="text-gray-800 transition-transform duration-300 group-hover:scale-110" />
    <span className="group-hover:translate-x-1 transition-all duration-300">Logout</span>
  </button>
));

LogoutButton.displayName = "LogoutButton";

// ------------------- Sidebar Component -------------------
const Sidebar: React.FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);

  const renderedNavItems = useMemo(
    () =>
      navItems.map(item => (
        <NavLink
          key={item.name}
          item={item}
          isActive={pathname === item.href}
          closeSidebar={closeSidebar}
        />
      )),
    [pathname, closeSidebar]
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-2 right-2 z-50 rounded-lg p-2 bg-white shadow-md"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 flex flex-col border-r border-gray-100 bg-white p-4 transition-transform duration-300 ease-out shadow-xs
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <SidebarLogo />
        <nav className="mt-6 flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-1">{renderedNavItems}</div>
          <div className="mt-4 w-full">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {/* Mobile Backdrop */}
      {isOpen && <div onClick={closeSidebar} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />}
    </>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;

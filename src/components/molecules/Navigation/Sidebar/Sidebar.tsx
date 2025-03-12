'use client';

import { useData } from '@providers/DataProvider/DataProvider';
import { Button } from '@ui/button';
import { FolderOpen, Home, Image, Moon, Palette, Sun, Tag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarProps } from './Sidebar.types';

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { isDarkMode, setIsDarkMode } = useData();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/images', label: 'Images', icon: Image },
    { href: '/palettes', label: 'Color Palettes', icon: Palette },
    { href: '/groups', label: 'Groups', icon: FolderOpen },
    { href: '/tags', label: 'Tags', icon: Tag },
  ];

  return (
    <div
      className={`w-64 border-r bg-card h-screen flex flex-col ${className}`}
    >
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Visual Reference Tool</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-center gap-2"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </Button>
      </div>
    </div>
  );
}

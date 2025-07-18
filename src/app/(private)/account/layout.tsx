'use client';

import { NAV_LINKS } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="md:min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="container mx-auto py-6 lg:py-10">
        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          className="lg:hidden mb-6 w-full justify-between bg-white shadow-sm hover:bg-slate-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="flex items-center gap-2">
            <Menu className="h-4 w-4" />
            Menu
          </span>
          <span className="text-xs text-slate-500">
            {NAV_LINKS.find((link) => link.href === pathname)?.name || 'Menu'}
          </span>
        </Button>

        <div className="flex flex-col justify-center lg:flex-row lg:gap-6 xl:gap-10">
          {/* Sidebar */}
          <div
            className={cn(
              'w-full lg:w-64 shrink-0 pb-6',
              !isMobileMenuOpen && 'hidden lg:block',
            )}
          >
            <nav className="space-y-1 rounded-lg border bg-white p-3 shadow-sm">
              {NAV_LINKS.map((link) =>
                link.href ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all',
                      pathname === link.href
                        ? 'bg-[var(--brand)] text-[var(--blue-primary)] shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <link.icon className="h-4 w-4 shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                ) : (
                  <div
                    key={link.name}
                    className={cn(
                      'flex items-center cursor-pointer gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all',
                      'text-slate-600',
                    )}
                  >
                    <link.icon className="h-4 w-4 shrink-0" />
                    <span>{link.name}</span>
                  </div>
                ),
              )}
            </nav>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="rounded-lg border bg-white p-4 lg:p-6 shadow-sm">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

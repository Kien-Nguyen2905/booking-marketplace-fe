'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';
import Link from 'next/link';
import { TSideBarProps } from '@/layouts/Sidebar/type';
import { FC } from 'react';
import { useSidebar } from './useSidebar';
import { Loading } from '@/components';

const Sidebar: FC<TSideBarProps> = ({ isCollapsed, toggleSidebar }) => {
  const { links, pathname } = useSidebar();

  if (!links) {
    return <Loading />;
  }

  return (
    <>
      <div
        className={cn(
          'bg-background border-r flex flex-col transition-all duration-200 h-full',
          isCollapsed ? 'w-17 p-2' : 'w-[250px] p-2',
        )}
      >
        <nav className="flex flex-col gap-3 overflow-y-auto">
          {/* Collapse button as first item */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn('w-fit ml-auto flex items-center justify-center p-4')}
          >
            {isCollapsed ? (
              <PanelLeftOpenIcon className="w-4 h-4" />
            ) : (
              <>
                <PanelLeftCloseIcon className="h-4 w-4" />
              </>
            )}
          </Button>
          {Object.values(links)?.length > 0 &&
            Object.values(links)?.map((item) =>
              item.href !== null ? (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : ''}
                >
                  <Button
                    variant={pathname === item.href ? 'default' : 'ghost'}
                    className={cn(
                      'w-full justify-start text-left',
                      isCollapsed && 'justify-center p-2',
                    )}
                  >
                    <item.icon
                      className={cn('h-4 w-4', !isCollapsed && 'mr-2')}
                    />
                    {!isCollapsed && item.name}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={cn(
                    'w-full text-red-500 hover:text-red-500 justify-start text-left',
                    isCollapsed && 'justify-center p-2',
                  )}
                >
                  <item.icon
                    className={cn('h-4 w-4', !isCollapsed && 'mr-2')}
                  />
                  {!isCollapsed && item.name}
                </Button>
              ),
            )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

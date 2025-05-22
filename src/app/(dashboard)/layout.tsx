'use client';
import { Sidebar } from '@/layouts/Sidebar';
import { DashboardHeader } from '@/layouts/DashboardHeader';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/AppProvider';
import { Card, CardContent } from '@/components/ui/card';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { toggleSidebar, isCollapsed } = useAppContext();
  return (
    <div className="h-screen overflow-hidden bg-slate-50 flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1 h-[calc(100vh-64px)] mt-16">
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <div
          className={cn(
            'transition-all duration-200 w-full h-full p-10 overflow-auto overflow-x-auto',
          )}
        >
          <Card x-chunk="dashboard-06-chunk-0" className="max-h-fit w-full">
            <CardContent>
              <main className="px-6 py-6">{children}</main>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

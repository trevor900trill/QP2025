import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { CompanyProvider } from '@/context/CompanyContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CompanyProvider>
        <SidebarProvider>
            <div className="min-h-screen w-full">
                <AdminSidebar />
                <div className="flex flex-col md:ml-[16rem]">
                    <AdminHeader />
                    <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-background">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    </CompanyProvider>
  );
}

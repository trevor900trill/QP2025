import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { EmployeeSidebar } from '@/components/layout/EmployeeSidebar';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { CompanyProvider } from '@/context/CompanyContext'; // Using CompanyProvider to avoid breaking header

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CompanyProvider>
      <SidebarProvider>
        <div className="min-h-screen w-full">
          <EmployeeSidebar />
          <div className="flex flex-col md:ml-[16rem]">
             {/* A simplified header can be made, for now re-using AdminHeader */}
            <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
               <p className="font-semibold">Employee Portal</p>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </CompanyProvider>
  );
}

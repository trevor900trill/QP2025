"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserCircle, FileText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const employeeNavItems = [
    { href: "/employee/profile", label: "Profile Details", icon: UserCircle },
    { href: "/employee/payslips", label: "Payslips", icon: FileText },
];

export function EmployeeSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="hidden border-r bg-sidebar md:block">
            <SidebarHeader>
                <Link href="/module-select" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="QwikPace Logo" width={32} height={32} />
                    <span className="text-xl font-semibold font-headline">QwikPace</span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarMenu>
                    {employeeNavItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href}>
                                <SidebarMenuButton isActive={pathname.startsWith(item.href)}>
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}

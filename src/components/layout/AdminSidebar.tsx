"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    Users, 
    Building, 
    FolderKanban, 
    FileText, 
    Settings, 
    ChevronDown,
    UsersRound,
    Wallet
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const adminNavItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/companies", label: "Companies", icon: Building },
    { 
        label: "Onboarding", 
        icon: FolderKanban,
        subItems: [
            { href: "/admin/onboarding/employees", label: "Employees", icon: UsersRound },
        ]
    },
    { href: "/admin/payroll", label: "Payroll", icon: Wallet },
    { href: "/admin/reports", label: "Reports", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    const isSubItemActive = (subItems: any[]) => {
        return subItems.some(item => pathname.startsWith(item.href));
    }

    return (
        <Sidebar className="hidden border-r-[--sidebar-border] bg-sidebar md:block">
            <SidebarHeader>
                <Link href="/module-select" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="QwikPace Logo" width={32} height={32} />
                    <span className="text-xl font-semibold font-headline">QwikPace</span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarMenu>
                    {adminNavItems.map((item, index) => (
                        item.subItems ? (
                            <Collapsible key={index} defaultOpen={isSubItemActive(item.subItems)}>
                                <SidebarMenuItem>
                                     <CollapsibleTrigger asChild>
                                        <SidebarMenuButton 
                                            className="w-full justify-between" 
                                            variant="default"
                                            isActive={isSubItemActive(item.subItems)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <item.icon className="w-4 h-4" />
                                                <span>{item.label}</span>
                                            </div>
                                            <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                </SidebarMenuItem>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.subItems.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.href}>
                                                <SidebarMenuButton asChild isActive={pathname.startsWith(subItem.href)}>
                                                    <Link href={subItem.href}>
                                                     <subItem.icon className="w-4 h-4" />
                                                    <span>{subItem.label}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </Collapsible>
                        ) : (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href}>
                                <SidebarMenuButton isActive={pathname === item.href}>
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        )
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}

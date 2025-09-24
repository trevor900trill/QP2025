"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UserCircle, FileText, Grid3x3, ChevronDown, Users, Briefcase } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";


const employeeNavItems = [
    { href: "/employee/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/employee/profile", label: "Profile Details", icon: UserCircle },
    { href: "/employee/payslips", label: "Payslips", icon: FileText },
];

const appSwitcherItems = [
    { href: "/admin/dashboard", label: "Admin Portal", icon: Users },
    { href: "/employee/dashboard", label: "Employee Portal", icon: Briefcase },
]

export function EmployeeSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
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
                                <SidebarMenuButton isActive={pathname === item.href}>
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-2">
                 <Collapsible>
                    <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                            <SidebarMenuButton 
                                className="w-full justify-between" 
                                variant="default"
                            >
                                <div className="flex items-center gap-2">
                                    <Grid3x3 className="w-4 h-4" />
                                    <span>Apps</span>
                                </div>
                                <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                    </SidebarMenuItem>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {appSwitcherItems.map((item) => (
                                <SidebarMenuSubItem key={item.href}>
                                    <Link href={item.href}>
                                        <SidebarMenuSubButton asChild isActive={pathname.startsWith(item.href.split('/')[1])}>
                                           <>
                                             <item.icon className="w-4 h-4" />
                                             <span>{item.label}</span>
                                           </>
                                        </SidebarMenuSubButton>
                                    </Link>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>
            </SidebarFooter>
        </Sidebar>
    );
}

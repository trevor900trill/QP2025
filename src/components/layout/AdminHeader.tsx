"use client";

import React from "react";
import { Bell, ChevronsUpDown, Building, User, LogOut, ArrowLeftRight } from "lucide-react";
import Link from 'next/link';
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCompany } from "@/context/CompanyContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AdminHeader() {
    const { selectedCompany, setSelectedCompany, availableCompanies } = useCompany();
    const [open, setOpen] = React.useState(false);
    const pathname = usePathname();

    const currentModule = pathname.startsWith('/admin') ? 'Admin Portal' : pathname.startsWith('/employee') ? 'Employee Portal' : null;

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
      <SidebarTrigger className="md:hidden"/>
      <div className="w-full flex-1 flex items-center gap-4">
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[250px] justify-between"
                >
                {selectedCompany ? (
                    <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {selectedCompany.name}
                    </div>
                ) : (
                    "Select company..."
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                <CommandInput placeholder="Search company..." />
                <CommandList>
                    <CommandEmpty>No company found.</CommandEmpty>
                    <CommandGroup>
                    {availableCompanies.map((company) => (
                        <CommandItem
                        key={company.id}
                        value={company.name}
                        onSelect={() => {
                            setSelectedCompany(company);
                            setOpen(false);
                        }}
                        >
                            <Building className="mr-2 h-4 w-4" />
                            {company.name}
                        </CommandItem>
                    ))}
                    </CommandGroup>
                </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
        {currentModule && (
             <Badge 
                variant="outline" 
                className={cn(
                    "border-2 text-xs font-semibold uppercase tracking-wider",
                    pathname.startsWith('/admin') 
                        ? "border-primary/80 text-primary" 
                        : "border-blue-500/80 text-blue-500"
                )}
            >
                {currentModule}
            </Badge>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
                <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    <User className="h-5 w-5" />
                </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/module-select">
                    <ArrowLeftRight className="mr-2 h-4 w-4"/>
                    <span>Switch Module</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/">
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span>Sign out</span>
                </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

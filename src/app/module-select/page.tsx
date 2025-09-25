"use client";

import Link from 'next/link';
import Image from 'next/image';
import { UserCog, Briefcase, ChevronRight, ShoppingCart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const modules = [
  {
    name: 'Payroll',
    description: 'Manage companies, users, payroll, and system settings.',
    icon: UserCog,
    href: '/admin/dashboard',
    role: 'admin',
    disabled: false,
  },
  {
    name: 'HR',
    description: 'View your profile, download payslips, and manage personal information.',
    icon: Briefcase,
    href: '/employee/dashboard',
    role: 'employee',
    disabled: false,
  },
  {
    name: 'POS',
    description: 'Point of Sale for retail and services.',
    icon: ShoppingCart,
    href: '#',
    role: 'pos',
    disabled: true,
  },
];

export default function ModuleSelectPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <header className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Image src="/logo.svg" alt="QwikPace Logo" width={56} height={56} />
        </div>
        <h1 className="text-4xl font-bold font-headline text-gray-800 dark:text-gray-100">Choose Your Workspace</h1>
        <p className="text-muted-foreground mt-2">Select the portal you want to access.</p>
      </header>
      <main className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => {
          const cardContent = (
            <Card 
              className={cn(
                "h-full transition-all duration-300 ease-in-out relative",
                module.disabled 
                  ? "opacity-50 cursor-not-allowed"
                  : "group-hover:shadow-lg group-hover:border-primary group-hover:-translate-y-1"
              )}
            >
              {module.disabled && (
                <Badge variant="secondary" className="absolute top-4 right-4 z-10">
                  Coming Soon
                </Badge>
              )}
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                  <module.icon className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-xl">{module.name}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                 <div className={cn(
                    "flex justify-end items-center text-sm text-primary transition-opacity",
                    !module.disabled && "opacity-0 group-hover:opacity-100"
                  )}>
                    {!module.disabled && (
                        <>
                         <span>Enter Portal</span>
                         <ChevronRight className="h-4 w-4 ml-1"/>
                        </>
                    )}
                 </div>
              </CardContent>
            </Card>
          );
          
          return module.disabled ? (
            <div key={module.name}>{cardContent}</div>
          ) : (
            <Link 
              href={module.href} 
              key={module.name} 
              className="group"
            >
              {cardContent}
            </Link>
          );
        })}
      </main>
       <footer className="mt-8">
        <Button variant="link" asChild>
            <Link href="/">Sign out</Link>
        </Button>
      </footer>
    </div>
  );
}

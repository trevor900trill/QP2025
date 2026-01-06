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
import React, { useEffect, useState } from 'react';
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
  const [userType, setUserType] = useState<number | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log("Current User Type:", user.appUserType);
        setUserType(user.appUserType);
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
  }, []);

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
          let isDisabled = module.disabled; // Default disabled state (like POS)

          if (!isDisabled && userType !== null) {
            if (module.role === 'admin') {
              // Admin module: Enabled for 1 (Admin) and 3 (Both)
              isDisabled = !(userType === 1 || userType === 3);
            } else if (module.role === 'employee') {
              // Employee module: Enabled for 2 (Employee) and 3 (Both)
              isDisabled = !(userType === 2 || userType === 3);
            }
          }

          const cardContent = (
            <Card
              className={cn(
                "h-full transition-all duration-300 ease-in-out relative",
                isDisabled
                  ? "opacity-60 cursor-not-allowed bg-muted/50"
                  : "group-hover:shadow-lg group-hover:border-primary group-hover:-translate-y-1"
              )}
            >
              {module.disabled && ( // "Coming Soon" for permanently disabled
                <Badge variant="secondary" className="absolute top-4 right-4 z-10">
                  Coming Soon
                </Badge>
              )}
              {(!module.disabled && isDisabled) && ( // "Restricted" for role mismatch
                <Badge variant="destructive" className="absolute top-4 right-4 z-10">
                  Restricted
                </Badge>
              )}
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={cn("bg-primary/10 text-primary p-3 rounded-lg", isDisabled && "grayscale")}>
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
                  !isDisabled && "opacity-0 group-hover:opacity-100"
                )}>
                  {!isDisabled && (
                    <>
                      <span>Enter Portal</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );

          return isDisabled ? (
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
        <Button variant="link" onClick={() => {
          import('@/lib/auth-api').then(({ logOutAction }) => {
            logOutAction();
          });
        }}>
          Sign out
        </Button>
      </footer>
    </div>
  );
}

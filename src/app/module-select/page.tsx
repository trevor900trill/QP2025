import Link from 'next/link';
import Image from 'next/image';
import { Building, UserCog, Briefcase, ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const modules = [
  {
    name: 'Admin Portal',
    description: 'Manage companies, users, payroll, and system settings.',
    icon: UserCog,
    href: '/admin/dashboard',
    role: 'admin',
  },
  {
    name: 'Employee Portal',
    description: 'View your profile, download payslips, and manage personal information.',
    icon: Briefcase,
    href: '/employee/dashboard',
    role: 'employee',
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
      <main className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {modules.map((module) => (
          <Link href={module.href} key={module.name} className="group">
            <Card className="h-full transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:border-primary group-hover:-translate-y-1">
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
                 <div className="flex justify-end items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Enter Portal</span>
                    <ChevronRight className="h-4 w-4 ml-1"/>
                 </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </main>
       <footer className="mt-8">
        <Button variant="link" asChild>
            <Link href="/">Sign out</Link>
        </Button>
      </footer>
    </div>
  );
}

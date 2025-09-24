"use client";

import Link from "next/link";
import {
  ChevronRight,
  Receipt,
  Building2,
  Users,
  Landmark,
  ShieldCheck,
  Settings as SettingsIcon,
} from "lucide-react";
import { AnimatedPageHeader } from "@/components/shared/AnimatedPageHeader";
import {
  Card,
  CardHeader,
} from "@/components/ui/card";

const settingsLinks = [
  {
    href: "/admin/settings/benefits",
    title: "Benefits and Deductions",
    icon: Receipt,
  },
  {
    href: "/admin/settings/departments",
    title: "Departments",
    icon: Building2,
  },
  {
    href: "/admin/settings/employee-types",
    title: "Employee Types",
    icon: Users,
  },
  {
    href: "/admin/settings/exchange-rates",
    title: "Exchange Rates",
    icon: Landmark,
  },
  {
    href: "/admin/settings/roles",
    title: "Roles Settings",
    icon: ShieldCheck,
  },
];

export default function SettingsPage() {
  return (
    <>
      <AnimatedPageHeader title="Settings" icon={SettingsIcon} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {settingsLinks.map((setting, index) => (
          <Link href={setting.href} key={setting.title} className="group" style={{ animationDelay: `${index * 100}ms` }}>
            <Card className="h-full hover:border-primary transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1 animate-fade-in-up">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium text-lg">{setting.title}</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  User,
  Receipt,
  Home,
  ShieldCheck,
  UserSquare,
  ExternalLink,
  Landmark,
  PiggyBank,
  MapPin,
  Users as UsersIcon,
  FileText,
  Gift
} from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { employees } from "@/lib/placeholder-data";
import { AnimatedPageHeader } from "@/components/shared/AnimatedPageHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const employee = employees.find((e) => e.id === 'E001')!;

const allCards = [
    { title: "Personal Details", icon: User, isModal: true, formId: "personal" },
    { title: "Address Details", icon: MapPin, isModal: true, formId: "address" },
    { title: "Banking Details", icon: Landmark, isModal: true, formId: "banking" },
    { title: "Work Details", icon: Briefcase, isModal: true, formId: "work"},
    { title: "Referee Details", icon: UsersIcon, isModal: true, formId: "referee" },
    { title: "Salary Details", icon: PiggyBank, isModal: true, formId: "salary" },
    { title: "Benefits", icon: Gift, href: "benefits", isFinancial: true},
    { title: "Deductions", icon: Receipt, href: "deductions", isFinancial: true},
    { title: "Mortgage", icon: Home, href: "mortgage", isFinancial: true},
    { title: "Life Insurance", icon: ShieldCheck, href: "life-insurance", isFinancial: true},
];

const mockFinancials = {
    benefits: [
        { id: "B001", name: "Health Insurance", amount: 300 },
        { id: "B002", name: "Transport Allowance", amount: 150 },
    ],
    deductions: [
        { id: "D001", name: "Pension Contribution", amount: 200 },
    ],
    mortgage: [
         { id: "M001", provider: "Global Bank", reference: "MORT-88372", amount: 1200 }
    ],
    "life-insurance": [
        { id: "LI01", provider: "SecureLife Assurance", policyNo: "SL-POL-99123", premium: 150 }
    ]
}


export default function EmployeeProfileEditPage() {

  return (
    <>
      <div className="mb-4">
        <Button variant="link" asChild className="px-0">
          <Link href="/employee/profile">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
        </Button>
      </div>

      <AnimatedPageHeader
        title="Edit My Profile"
        icon={UserSquare}
        iconAnimation="breathe"
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        {allCards.map((card) => (
          <Dialog key={card.title}>
            <DialogTrigger asChild>
              <Card className="group cursor-pointer hover:border-primary transition-colors">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium">
                    {card.title}
                  </CardTitle>
                  <card.icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-primary flex items-center">
                    {card.isFinancial ? 'View' : 'Edit'} {card.title.toLowerCase()}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{card.isFinancial ? '' : 'Edit'} {card.title}</DialogTitle>
              </DialogHeader>
              {card.isFinancial ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(mockFinancials[card.href as keyof typeof mockFinancials][0]).filter(k => k !== 'id').map(key => <TableHead key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableHead>)}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(mockFinancials[card.href as keyof typeof mockFinancials]).map((item: any) => (
                        <TableRow key={item.id}>
                            {Object.entries(item).filter(([key]) => key !== 'id').map(([key, value]) => (
                                <TableCell key={key}>{typeof value === 'number' ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value) : value as React.ReactNode}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="space-y-4 py-4">
                  <p className="text-muted-foreground">Form for editing your {card.title.toLowerCase()} goes here.</p>
                  {card.formId === 'personal' && (
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={employee.firstName} />
                    </div>
                  )}
                 </div>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  );
}

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
import { PersonalDetailsForm } from "@/components/forms/employee-edit/PersonalDetailsForm";
import { AddressDetailsForm } from "@/components/forms/employee-edit/AddressDetailsForm";
import { BankingDetailsForm } from "@/components/forms/employee-edit/BankingDetailsForm";
import { WorkDetailsForm } from "@/components/forms/employee-edit/WorkDetailsForm";
import { RefereeDetailsForm } from "@/components/forms/employee-edit/RefereeDetailsForm";
import { SalaryDetailsForm } from "@/components/forms/employee-edit/SalaryDetailsForm";
import { StatutoryDetailsForm } from "@/components/forms/employee-edit/StatutoryDetailsForm";

const employee = employees.find((e) => e.id === 'E001')!;

const allCards = [
    { title: "Personal Details", icon: User, isModal: true, form: PersonalDetailsForm, isReadOnly: false },
    { title: "Address Details", icon: MapPin, isModal: true, form: AddressDetailsForm, isReadOnly: false },
    { title: "Banking Details", icon: Landmark, isModal: true, form: BankingDetailsForm, isReadOnly: false },
    { title: "Work Details", icon: Briefcase, isModal: true, form: WorkDetailsForm, isReadOnly: true },
    { title: "Referee Details", icon: UsersIcon, isModal: true, form: RefereeDetailsForm, isReadOnly: false },
    { title: "Salary Details", icon: PiggyBank, isModal: true, form: SalaryDetailsForm, isReadOnly: true },
    { title: "Statutory Details", icon: FileText, isModal: true, form: StatutoryDetailsForm, isReadOnly: true },
    { title: "Benefits", icon: Gift, isFinancial: true, data: 'benefits' },
    { title: "Deductions", icon: Receipt, isFinancial: true, data: 'deductions' },
    { title: "Mortgage", icon: Home, isFinancial: true, data: 'mortgage' },
    { title: "Life Insurance", icon: ShieldCheck, isFinancial: true, data: 'life-insurance' },
];

const mockFinancials = {
    benefits: [
        { id: "B001", name: "Health Insurance", amount: 30000 },
        { id: "B002", name: "Transport Allowance", amount: 15000 },
    ],
    deductions: [
        { id: "D001", name: "Pension Contribution", amount: 20000 },
    ],
    mortgage: [
         { id: "M001", provider: "Global Bank", reference: "MORT-88372", amount: 120000 }
    ],
    "life-insurance": [
        { id: "LI01", provider: "SecureLife Assurance", policyNo: "SL-POL-99123", premium: 15000 }
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
               {card.isModal && card.form && (
                  <card.form employee={employee} isReadOnly={card.isReadOnly} />
                )}
              {card.isFinancial && card.data && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(mockFinancials[card.data as keyof typeof mockFinancials][0]).filter(k => k !== 'id').map(key => <TableHead key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableHead>)}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(mockFinancials[card.data as keyof typeof mockFinancials]).map((item: any) => (
                        <TableRow key={item.id}>
                            {Object.entries(item).filter(([key]) => key !== 'id').map(([key, value]) => (
                                <TableCell key={key}>{typeof value === 'number' ? new Intl.NumberFormat("en-US", { style: "currency", currency: "KES" }).format(value) : value as React.ReactNode}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  );
}

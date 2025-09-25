"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  User,
  Receipt,
  Home,
  ShieldCheck,
  UserSquare,
  ExternalLink,
  Trash2,
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { PersonalDetailsForm } from "@/components/forms/employee-edit/PersonalDetailsForm";
import { AddressDetailsForm } from "@/components/forms/employee-edit/AddressDetailsForm";
import { BankingDetailsForm } from "@/components/forms/employee-edit/BankingDetailsForm";
import { WorkDetailsForm } from "@/components/forms/employee-edit/WorkDetailsForm";
import { RefereeDetailsForm } from "@/components/forms/employee-edit/RefereeDetailsForm";
import { SalaryDetailsForm } from "@/components/forms/employee-edit/SalaryDetailsForm";
import { StatutoryDetailsForm } from "@/components/forms/employee-edit/StatutoryDetailsForm";


const allCards = [
    { title: "Personal Details", icon: User, isModal: true, form: PersonalDetailsForm },
    { title: "Address Details", icon: MapPin, isModal: true, form: AddressDetailsForm },
    { title: "Banking Details", icon: Landmark, isModal: true, form: BankingDetailsForm },
    { title: "KRA Details", icon: FileText, isModal: true, form: StatutoryDetailsForm },
    { title: "Work Details", icon: Briefcase, isModal: true, form: WorkDetailsForm },
    { title: "Referee Details", icon: UsersIcon, isModal: true, form: RefereeDetailsForm },
    { title: "Salary Details", icon: PiggyBank, isModal: true, form: SalaryDetailsForm },
    // Financial cards (navigation links)
    { title: "Benefits", icon: Gift, href: "benefits"},
    { title: "Deductions", icon: Receipt, href: "deductions"},
    { title: "Mortgage", icon: Home, href: "mortgage"},
    { title: "Life Insurance", icon: ShieldCheck, href: "life-insurance"},
];


export default function EmployeeProfilePage() {
  const params = useParams<{ employeeId: string }>();
  const employee = employees.find((e) => e.id === params.employeeId);

  if (!employee) {
    notFound();
  }

  return (
    <>
      <div className="mb-4">
        <Button variant="link" asChild className="px-0">
          <Link href="/admin/onboarding/employees">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employees
          </Link>
        </Button>
      </div>

      <AnimatedPageHeader
        title={employee.name}
        icon={UserSquare}
        iconAnimation="breathe"
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        {allCards.map((card) => {
          if (card.isModal && card.form) {
            const FormComponent = card.form;
            return (
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
                        Edit {card.title.toLowerCase()}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit {card.title}</DialogTitle>
                  </DialogHeader>
                  <FormComponent employee={employee} isReadOnly={false} />
                </DialogContent>
              </Dialog>
            );
          } else {
            return (
              <Link href={`/admin/onboarding/employees/${employee.id}/${card.href}`} key={card.title}>
                <Card className="group h-full hover:border-primary transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">
                      {card.title}
                    </CardTitle>
                    <card.icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-primary flex items-center">
                      Manage {card.title.toLowerCase()}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          }
        })}
      </div>
      
      <div>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Terminate Employee
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to terminate this employee?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will change the employee's status to "Terminated" and restrict their access. It cannot be undone easily.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Confirm Termination</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

"use client";

import * as React from "react";
import { notFound, useParams } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { employees } from "@/lib/placeholder-data";

// This would come from an API in a real app
const allDeductions = [
  { id: "D001", name: "Pension Contribution", type: "Deduction", amount: 20000 },
  { id: "D002", name: "Student Loan", type: "Deduction", amount: 10000 },
];

const columns = [
    { accessorKey: "name", header: "Deduction Name" },
    { 
        accessorKey: "amount", 
        header: "Amount (Monthly)",
        cell: ({ row }: any) => new Intl.NumberFormat("en-US", { style: "currency", currency: "KES" }).format(row.getValue("amount"))
    },
];

export default function EmployeeDeductionsPage() {
  const params = useParams();
  const { employeeId } = params;

  const employee = employees.find((e) => e.id === employeeId);

  if (!employee) {
    notFound();
  }

  // Mock assigned deductions
  const [assignedDeductions, setAssignedDeductions] = React.useState([allDeductions[0]]);

  const actionButton = (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Deduction
    </Button>
  );

  return (
    <>
      <PageHeader
        title={`${employee.name}'s Deductions`}
        description="Manage recurring deductions for this employee."
        backHref={`/admin/onboarding/employees/${employeeId}`}
        backText="Back to Profile"
      />
      <Card>
        <DataTable
            columns={columns}
            data={assignedDeductions}
            searchKey="name"
            actionButton={actionButton}
        />
      </Card>
    </>
  );
}

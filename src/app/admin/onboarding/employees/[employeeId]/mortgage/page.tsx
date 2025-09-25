"use client";

import * as React from "react";
import { notFound, useParams } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { employees } from "@/lib/placeholder-data";

const columns = [
    { accessorKey: "provider", header: "Mortgage Provider" },
    { accessorKey: "reference", header: "Reference No." },
    { 
        accessorKey: "amount", 
        header: "Monthly Deduction",
        cell: ({ row }: any) => new Intl.NumberFormat("en-US", { style: "currency", currency: "KES" }).format(row.getValue("amount"))
    },
];

export default function EmployeeMortgagePage() {
  const params = useParams();
  const { employeeId } = params;

  const employee = employees.find((e) => e.id === employeeId);

  if (!employee) {
    notFound();
  }

  // Mock assigned data
  const [assignedMortgages, setAssignedMortgages] = React.useState([
    { id: "M001", provider: "Global Bank", reference: "MORT-88372", amount: 120000 }
  ]);

  const actionButton = (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Mortgage Detail
    </Button>
  );

  return (
    <>
      <PageHeader
        title={`${employee.name}'s Mortgage`}
        description="Manage mortgage relief details for this employee."
        backHref={`/admin/onboarding/employees/${employeeId}`}
        backText="Back to Profile"
      />
      <Card>
        <DataTable
            columns={columns}
            data={assignedMortgages}
            searchKey="provider"
            actionButton={actionButton}
        />
      </Card>
    </>
  );
}

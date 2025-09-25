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
const allBenefits = [
  { id: "B001", name: "Health Insurance", type: "Benefit", amount: 300 },
  { id: "B002", name: "Transport Allowance", type: "Benefit", amount: 150 },
  { id: "B003", name: "Housing Allowance", type: "Benefit", amount: 500 },
];

const columns = [
    { accessorKey: "name", header: "Benefit Name" },
    { 
        accessorKey: "amount", 
        header: "Amount (Monthly)",
        cell: ({ row }: any) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(row.getValue("amount"))
    },
];

export default function EmployeeBenefitsPage() {
  const params = useParams();
  const { employeeId } = params;

  const employee = employees.find((e) => e.id === employeeId);

  if (!employee) {
    notFound();
  }

  // Mock assigned benefits
  const [assignedBenefits, setAssignedBenefits] = React.useState([allBenefits[0]]);

  const actionButton = (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Assign Benefit
    </Button>
  );

  return (
    <>
      <PageHeader
        title={`${employee.name}'s Benefits`}
        description="Manage benefits assigned to this employee."
        backHref={`/admin/onboarding/employees/${employeeId}`}
        backText="Back to Profile"
      />
      <Card>
        <DataTable
            columns={columns}
            data={assignedBenefits}
            searchKey="name"
            actionButton={actionButton}
        />
      </Card>
    </>
  );
}

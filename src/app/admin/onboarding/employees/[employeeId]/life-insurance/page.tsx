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
    { accessorKey: "provider", header: "Insurance Provider" },
    { accessorKey: "policyNo", header: "Policy No." },
    { 
        accessorKey: "premium", 
        header: "Monthly Premium",
        cell: ({ row }: any) => new Intl.NumberFormat("en-US", { style: "currency", currency: "KES" }).format(row.getValue("premium"))
    },
];

export default function EmployeeLifeInsurancePage() {
  const params = useParams();
  const { employeeId } = params;

  const employee = employees.find((e) => e.id === employeeId);

  if (!employee) {
    notFound();
  }

  // Mock assigned data
  const [assignedPolicies, setAssignedPolicies] = React.useState([
      { id: "LI01", provider: "SecureLife Assurance", policyNo: "SL-POL-99123", premium: 15000 }
  ]);

  const actionButton = (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Insurance Policy
    </Button>
  );

  return (
    <>
      <PageHeader
        title={`${employee.name}'s Life Insurance`}
        description="Manage life insurance relief details for this employee."
        backHref={`/admin/onboarding/employees/${employeeId}`}
        backText="Back to Profile"
      />
      <Card>
        <DataTable
            columns={columns}
            data={assignedPolicies}
            searchKey="provider"
            actionButton={actionButton}
        />
      </Card>
    </>
  );
}

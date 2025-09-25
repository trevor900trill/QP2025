"use client";

import * as React from "react";
import { notFound, useParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { companies } from "@/lib/placeholder-data";

type ApprovalStep = {
    id: string;
    order: number;
    role: string;
    action: string;
}

const mockMandates: ApprovalStep[] = [
    { id: 'M01', order: 1, role: 'Manager', action: 'Initial Approval' },
    { id: 'M02', order: 2, role: 'Accountant', action: 'Verification' },
    { id: 'M03', order: 3, role: 'Admin', action: 'Final Approval & Disbursement' },
];

const columns: ColumnDef<ApprovalStep>[] = [
    { accessorKey: "order", header: "Order" },
    { accessorKey: "role", header: "Approving Role" },
    { accessorKey: "action", header: "Action" },
];

export default function CompanyMandatesPage() {
  const params = useParams();
  const { companyId } = params;

  const company = companies.find((c) => c.id === companyId);

  if (!company) {
    notFound();
  }

  const actionButton = (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Approval Step
    </Button>
  );

  return (
    <>
      <PageHeader
        title={`${company.name} - Payroll Mandates`}
        description="Define the order of approval for payroll runs."
        backHref={`/admin/companies/${companyId}/edit`}
        backText="Back to Company"
      />
      <Card>
        <DataTable
            columns={columns}
            data={mockMandates}
            searchKey="role"
            actionButton={actionButton}
        />
      </Card>
    </>
  );
}

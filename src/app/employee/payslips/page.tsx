"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import type { Payslip } from "@/lib/definitions";
import { payslips } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/card";

const columns: ColumnDef<Payslip>[] = [
  {
    accessorKey: "period",
    header: "Pay Period",
  },
  {
    accessorKey: "grossPay",
    header: "Gross Pay",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("grossPay"));
      const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "deductions",
    header: "Deductions",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("deductions"));
      const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "netPay",
    header: "Net Pay",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("netPay"));
      const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Download",
    cell: ({ row }) => {
      return (
        <div className="text-center">
            <Button variant="ghost" size="icon" asChild>
                <a href={row.original.fileUrl} download>
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download payslip</span>
                </a>
            </Button>
        </div>
      );
    },
  },
];

export default function PayslipsPage() {
  return (
    <>
      <PageHeader title="My Payslips" description="View and download your past payslips." backHref="/employee/profile" backText="Back to Profile" />
      <Card>
        <DataTable columns={columns} data={payslips} searchKey="period" />
      </Card>
    </>
  );
}

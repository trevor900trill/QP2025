"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, FileText, Download, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/DataTable";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AnimatedPageHeader } from "@/components/shared/AnimatedPageHeader";

type PayrollRun = {
  id: string;
  month: string;
  employees: number;
  totalGross: number;
  totalNet: number;
  status: 'Completed' | 'Pending';
};

const payrollRuns: PayrollRun[] = [
    { id: 'PR001', month: 'July 2024', employees: 148, totalGross: 850000, totalNet: 720000, status: 'Completed' },
    { id: 'PR002', month: 'June 2024', employees: 145, totalGross: 845000, totalNet: 715000, status: 'Completed' },
    { id: 'PR003', month: 'May 2024', employees: 140, totalGross: 820000, totalNet: 690000, status: 'Completed' },
];

export default function PayrollPage() {
    const { toast } = useToast();

    const handleGenerate = (reportName: string) => {
        toast({
            title: "Generating Report...",
            description: `Your ${reportName} is being generated and will be available for download shortly.`,
        });
    }

  const columns: ColumnDef<PayrollRun>[] = [
    {
      accessorKey: "month",
      header: "Pay Period",
    },
    {
      accessorKey: "employees",
      header: "Employees",
    },
    {
      accessorKey: "totalGross",
      header: "Total Gross Pay",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalGross"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "totalNet",
      header: "Total Net Pay",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalNet"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Generate Report</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleGenerate('NHIF By-Product')}>
                <FileText className="mr-2 h-4 w-4" />
                NHIF By-Product
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleGenerate('NSSF Report')}>
                <FileText className="mr-2 h-4 w-4" />
                NSSF Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleGenerate('Bank Payroll Summary')}>
                <Download className="mr-2 h-4 w-4" />
                Bank Payroll Summary
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <AnimatedPageHeader title="Payroll" icon={Wallet} iconAnimation="shake" />
      <Card>
        <DataTable columns={columns} data={payrollRuns} searchKey="month" />
      </Card>
    </>
  );
}

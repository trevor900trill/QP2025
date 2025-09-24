"use client";

import * as React from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle, UsersRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/DataTable";
import type { Employee } from "@/lib/definitions";
import { employees } from "@/lib/placeholder-data";
import { useCompany } from "@/context/CompanyContext";
import { Card } from "@/components/ui/card";
import { AnimatedPageHeader } from "@/components/shared/AnimatedPageHeader";

export default function EmployeesPage() {
  const { selectedCompany } = useCompany();

  const filteredEmployees = React.useMemo(() => {
    if (!selectedCompany) return employees;
    return employees.filter(emp => emp.companyId === selectedCompany.id);
  }, [selectedCompany]);

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Employee",
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <div className="flex items-center gap-3">
            <Image
              src={employee.avatar}
              alt={employee.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <div className="font-medium">{employee.name}</div>
              <div className="text-sm text-muted-foreground">{employee.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "grossPay",
      header: "Gross Pay",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("grossPay"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant: "default" | "secondary" | "destructive" =
          status === "Active" ? "default" : status === "Onboarding" ? "secondary" : "destructive";
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(employee.id)}>
                Copy Employee ID
              </DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit employee</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <AnimatedPageHeader title="Employees" icon={UsersRound} iconAnimation="breathe" />
      <Card>
        <DataTable 
            columns={columns} 
            data={filteredEmployees} 
            searchKey="name" 
            actionButton={
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Employee
                </Button>
            }
        />
      </Card>
    </>
  );
}

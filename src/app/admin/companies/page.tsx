"use client";

import * as React from "react";
import Image from "next/image";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle, Building } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/DataTable";
import type { Company } from "@/lib/definitions";
import { companies } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/card";
import { AnimatedPageHeader } from "@/components/shared/AnimatedPageHeader";

const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Company",
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={company.logoUrl}
            alt={company.name}
            width={40}
            height={40}
            className="rounded-md bg-muted p-1"
          />
          <div className="font-medium">{company.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "pin",
    header: "Company PIN",
  },
  {
    accessorKey: "nssf",
    header: "NSSF No.",
  },
  {
    accessorKey: "nhif",
    header: "NHIF No.",
  },
  {
    accessorKey: "employeeCount",
    header: "Employees",
    cell: ({ row }) => <div className="text-center">{row.getValue("employeeCount")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const company = row.original;
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(company.id)}>
              Copy Company ID
            </DropdownMenuItem>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit company</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function CompaniesPage() {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  return (
    <>
      <AnimatedPageHeader title="Companies" icon={Building} iconAnimation="bob" />
      <Card>
        <DataTable
          columns={columns}
          data={companies}
          searchKey="name"
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          actionButton={
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          }
        />
      </Card>
    </>
  );
}

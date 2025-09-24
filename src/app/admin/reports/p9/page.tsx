"use client";

import * as React from "react";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { Download, Eye, Users } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import type { Employee } from "@/lib/definitions";
import { employees, companies } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { P9Form } from "./P9Form";

const columns: ColumnDef<Employee>[] = [
  // Checkbox column is automatically added by DataTable when row selection is enabled
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
];

export default function P9ReportPage() {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const selectedEmployees = Object.keys(rowSelection)
    .map(index => employees[parseInt(index)])
    .filter(Boolean);

  const company = companies.find(c => c.id === 'C001')!;

  const handleGenerate = () => {
    if (selectedEmployees.length > 0) {
      setIsModalOpen(true);
    }
  };
  
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF.
    // For now, we'll just print to console.
    console.log("Downloading P9 for:", selectedEmployees.map(e => e.name));
    window.print();
  };

  return (
    <>
      <PageHeader title="P9 Report" description="Select employees to generate their P9 tax form.">
        <Button onClick={handleGenerate} disabled={selectedEmployees.length === 0}>
          <Eye className="mr-2 h-4 w-4" />
          Generate P9 ({selectedEmployees.length})
        </Button>
      </PageHeader>
      <Card>
        <DataTable
          columns={columns}
          data={employees}
          searchKey="name"
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="dialog-bg max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>P9 Tax Deduction Card</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto p-2" id="p9-printable-area">
             {selectedEmployees.map(employee => (
                <P9Form key={employee.id} employee={employee} company={company} />
             ))}
          </div>
           <div className="flex justify-end gap-2 pt-4 border-t print:hidden">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
                <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download as PDF
                </Button>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

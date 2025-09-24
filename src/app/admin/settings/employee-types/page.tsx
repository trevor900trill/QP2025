"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const employeeTypeSchema = z.object({
  name: z.string().min(2, "Type name is too short"),
});

type EmployeeType = {
  id: string;
  name: string;
};

const initialEmployeeTypes: EmployeeType[] = [
  { id: "ET001", name: "Full-Time" },
  { id: "ET002", name: "Part-Time" },
  { id: "ET003", name: "Contractor" },
  { id: "ET004", name: "Intern" },
];

export default function EmployeeTypesPage() {
  const [employeeTypes, setEmployeeTypes] = React.useState<EmployeeType[]>(initialEmployeeTypes);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const form = useForm<z.infer<typeof employeeTypeSchema>>({
    resolver: zodResolver(employeeTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof employeeTypeSchema>) {
    const newType: EmployeeType = {
      id: `ET${String(employeeTypes.length + 1).padStart(3, '0')}`,
      name: data.name,
    };
    setEmployeeTypes([...employeeTypes, newType]);
    form.reset();
    setIsDialogOpen(false);
  }

  const columns: ColumnDef<EmployeeType>[] = [
    { accessorKey: "name", header: "Employee Type" },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Employee Types" description="Define the types of employment in your organization.">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Employee Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee Type</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </PageHeader>
      <Card>
        <DataTable columns={columns} data={employeeTypes} searchKey="name" />
      </Card>
    </>
  );
}

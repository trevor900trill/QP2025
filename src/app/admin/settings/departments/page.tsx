"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const departmentSchema = z.object({
  name: z.string().min(2, "Department name is too short"),
});

type Department = {
  id: string;
  name: string;
  employeeCount: number;
};

const initialDepartments: Department[] = [
  { id: "DEP001", name: "Engineering", employeeCount: 25 },
  { id: "DEP002", name: "Marketing", employeeCount: 15 },
  { id: "DEP003", name: "Sales", employeeCount: 20 },
  { id: "DEP004", name: "Human Resources", employeeCount: 10 },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = React.useState<Department[]>(initialDepartments);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingDepartment, setEditingDepartment] = React.useState<Department | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof departmentSchema>>({
    resolver: zodResolver(departmentSchema),
    defaultValues: { name: "" },
  });

  React.useEffect(() => {
    if (editingDepartment) {
      form.reset({ name: editingDepartment.name });
    } else {
      form.reset({ name: "" });
    }
  }, [editingDepartment, form]);

  const openForm = (department: Department | null = null) => {
    setEditingDepartment(department);
    setIsDialogOpen(true);
  };
  
  const closeForm = () => {
    setIsDialogOpen(false);
    setEditingDepartment(null);
  };

  function onSubmit(data: z.infer<typeof departmentSchema>) {
    if (editingDepartment) {
      setDepartments(departments.map(d => d.id === editingDepartment.id ? { ...d, ...data } : d));
      toast({ title: "Department Updated", description: `The ${data.name} department has been updated.` });
    } else {
      const newDepartment: Department = {
        id: `DEP${String(departments.length + 1).padStart(3, '0')}`,
        name: data.name,
        employeeCount: 0,
      };
      setDepartments([newDepartment, ...departments]);
      toast({ title: "Department Added", description: `The ${data.name} department has been added.` });
    }
    closeForm();
  }

  const handleDelete = (departmentId: string) => {
    setDepartments(departments.filter(d => d.id !== departmentId));
    toast({ title: "Department Deleted", description: "The department has been removed." });
  };

  const columns: ColumnDef<Department>[] = [
    { accessorKey: "name", header: "Department Name" },
    { accessorKey: "employeeCount", header: "No. of Employees", cell: ({row}) => <div className="text-center">{row.original.employeeCount}</div> },
    {
      id: "actions",
      cell: ({ row }) => {
        const department = row.original;
        return (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => openForm(department)}>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this department.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(department.id)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      },
    },
  ];

  const actionButton = (
    <Button onClick={() => openForm()}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Department
    </Button>
  );

  return (
    <>
      <PageHeader title="Departments" description="Manage your company's departments." />
      <Card>
        <DataTable columns={columns} data={departments} searchKey="name" actionButton={actionButton} />
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={closeForm}>
            <DialogHeader>
              <DialogTitle>{editingDepartment ? "Edit" : "Add New"} Department</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <DialogFooter>
                    <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
    </>
  );
}

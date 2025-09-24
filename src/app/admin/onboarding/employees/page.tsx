"use client";

import * as React from "react";
import Image from "next/image";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle, UsersRound, Trash2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Badge } from "@/components/ui/badge";
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
import type { Employee, Company } from "@/lib/definitions";
import { employees as initialEmployees, companies } from "@/lib/placeholder-data";
import { useCompany } from "@/context/CompanyContext";
import { Card } from "@/components/ui/card";
import { AnimatedPageHeader } from "@/components/shared/AnimatedPageHeader";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const employeeSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  department: z.string().min(2, "Department is too short"),
  role: z.string().min(2, "Role is too short"),
  grossPay: z.coerce.number().positive("Gross pay must be positive"),
  companyId: z.string(),
  status: z.enum(["Active", "Onboarding", "Terminated"]),
});

export default function EmployeesPage() {
  const { selectedCompany } = useCompany();
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [employees, setEmployees] = React.useState<Employee[]>(initialEmployees);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingEmployee, setEditingEmployee] = React.useState<Employee | null>(null);
  const { toast } = useToast();

  const filteredEmployees = React.useMemo(() => {
    if (!selectedCompany) return employees;
    return employees.filter(emp => emp.companyId === selectedCompany.id);
  }, [selectedCompany, employees]);
  
  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
      role: "",
      grossPay: 0,
      companyId: selectedCompany?.id || companies[0].id,
      status: "Onboarding",
    },
  });

  React.useEffect(() => {
    if (editingEmployee) {
      form.reset(editingEmployee);
    } else {
      form.reset({
          name: "",
          email: "",
          department: "",
          role: "",
          grossPay: 0,
          companyId: selectedCompany?.id || companies[0].id,
          status: "Onboarding",
      });
    }
  }, [editingEmployee, form, selectedCompany]);
  
  const openForm = (employee: Employee | null = null) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingEmployee(null);
    form.reset();
  };

  const onSubmit = (data: z.infer<typeof employeeSchema>) => {
    if (editingEmployee) {
      setEmployees(employees.map(e => e.id === editingEmployee.id ? { ...e, ...data } : e));
      toast({ title: "Employee Updated", description: `${data.name} has been updated.` });
    } else {
      const newEmployee: Employee = {
        id: `E${String(employees.length + 1).padStart(3, '0')}`,
        ...data,
        avatar: `https://i.pravatar.cc/150?u=${employees.length + 20}`,
      };
      setEmployees([newEmployee, ...employees]);
      toast({ title: "Employee Added", description: `${data.name} has been added to onboarding.` });
    }
    closeForm();
  };

  const handleDelete = (employeeId: string) => {
    setEmployees(employees.filter(e => e.id !== employeeId));
    toast({ title: "Employee Deleted", description: "The employee has been removed." });
  };

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
                <DropdownMenuItem onClick={() => openForm(employee)}>
                  Edit employee
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(employee.id)}>
                  Copy Employee ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete employee
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this employee's data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(employee.id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      },
    },
  ];

  const actionButton = (
    <Button onClick={() => openForm()}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Employee
    </Button>
  );

  return (
    <>
      <AnimatedPageHeader title="Employees" icon={UsersRound} iconAnimation="breathe" />
      <Card>
        <DataTable 
            columns={columns} 
            data={filteredEmployees} 
            searchKey="name"
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            actionButton={actionButton}
        />
      </Card>
       <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="dialog-bg" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={closeForm}>
          <DialogHeader>
            <DialogTitle>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="department" render={({ field }) => (
                    <FormItem><FormLabel>Department</FormLabel><FormControl><Input placeholder="Engineering" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem><FormLabel>Role</FormLabel><FormControl><Input placeholder="Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="grossPay" render={({ field }) => (
                <FormItem><FormLabel>Gross Pay (Annual)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
                <Button type="submit">Save Employee</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

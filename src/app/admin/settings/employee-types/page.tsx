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
  const [editingType, setEditingType] = React.useState<EmployeeType | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof employeeTypeSchema>>({
    resolver: zodResolver(employeeTypeSchema),
    defaultValues: { name: "" },
  });

  React.useEffect(() => {
    if (editingType) {
      form.reset({ name: editingType.name });
    } else {
      form.reset({ name: "" });
    }
  }, [editingType, form]);

  const openForm = (type: EmployeeType | null = null) => {
    setEditingType(type);
    setIsDialogOpen(true);
  };

  const closeForm = () => {
    setIsDialogOpen(false);
    setEditingType(null);
  };

  function onSubmit(data: z.infer<typeof employeeTypeSchema>) {
    if (editingType) {
      setEmployeeTypes(employeeTypes.map(t => t.id === editingType.id ? { ...t, ...data } : t));
      toast({ title: "Type Updated", description: `${data.name} has been updated.` });
    } else {
      const newType: EmployeeType = {
        id: `ET${String(employeeTypes.length + 1).padStart(3, '0')}`,
        name: data.name,
      };
      setEmployeeTypes([newType, ...employeeTypes]);
      toast({ title: "Type Added", description: `${data.name} has been added.` });
    }
    closeForm();
  }
  
  const handleDelete = (typeId: string) => {
    setEmployeeTypes(employeeTypes.filter(t => t.id !== typeId));
    toast({ title: "Type Deleted", description: "The employee type has been removed." });
  };

  const columns: ColumnDef<EmployeeType>[] = [
    { accessorKey: "name", header: "Employee Type" },
    {
      id: "actions",
      cell: ({ row }) => {
        const type = row.original;
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
                <DropdownMenuItem onClick={() => openForm(type)}>Edit</DropdownMenuItem>
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
                  This action cannot be undone. This will permanently delete this employee type.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(type.id)}>Continue</AlertDialogAction>
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
        Add Employee Type
    </Button>
  );

  return (
    <>
      <PageHeader 
        title="Employee Types" 
        description="Define the types of employment in your organization."
        backHref="/admin/settings"
        backText="Back to Settings"
      />
      <Card>
        <DataTable columns={columns} data={employeeTypes} searchKey="name" actionButton={actionButton}/>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={closeForm}>
        <DialogHeader>
            <DialogTitle>{editingType ? "Edit" : "Add New"} Employee Type</DialogTitle>
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

"use client";

import * as React from "react";
import Image from "next/image";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle, Building, Trash2 } from "lucide-react";
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
import type { Company } from "@/lib/definitions";
import { companies as initialCompanies } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/card";
import { AnimatedPageHeader } from "@/components/shared/AnimatedPageHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
} from "@/components/ui/alert-dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const companySchema = z.object({
  name: z.string().min(2, "Company name is too short"),
  pin: z.string().min(5, "PIN is too short"),
  nssf: z.string().min(5, "NSSF number is too short"),
  nhif: z.string().min(5, "NHIF number is too short"),
});


export default function CompaniesPage() {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [companies, setCompanies] = React.useState<Company[]>(initialCompanies);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingCompany, setEditingCompany] = React.useState<Company | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: { name: "", pin: "", nssf: "", nhif: "" },
  });
  
  React.useEffect(() => {
    if (editingCompany) {
      form.reset(editingCompany);
    } else {
      form.reset({ name: "", pin: "", nssf: "", nhif: "" });
    }
  }, [editingCompany, form]);

  const openForm = (company: Company | null = null) => {
    setEditingCompany(company);
    setIsFormOpen(true);
  };
  
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCompany(null);
    form.reset();
  };

  const onSubmit = (data: z.infer<typeof companySchema>) => {
    if (editingCompany) {
      setCompanies(companies.map(c => c.id === editingCompany.id ? { ...c, ...data } : c));
      toast({ title: "Company Updated", description: `${data.name} has been updated.` });
    } else {
      const newCompany: Company = {
        id: `C${String(companies.length + 1).padStart(3, '0')}`,
        ...data,
        logoUrl: '/logo.svg',
        employeeCount: 0,
      };
      setCompanies([newCompany, ...companies]);
      toast({ title: "Company Added", description: `${data.name} has been added.` });
    }
    closeForm();
  };

  const handleDelete = (companyId: string) => {
    setCompanies(companies.filter(c => c.id !== companyId));
    toast({ title: "Company Deleted", description: "The company has been removed." });
  };


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
                <DropdownMenuItem onClick={() => openForm(company)}>
                  Edit company
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(company.id)}>
                  Copy Company ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete company
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the company and all associated data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(company.id)}>Continue</AlertDialogAction>
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
      Add Company
    </Button>
  );

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
          actionButton={actionButton}
        />
      </Card>
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="dialog-bg" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={closeForm}>
          <DialogHeader>
            <DialogTitle>{editingCompany ? 'Edit Company' : 'Add New Company'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl><Input placeholder="Innovate Inc." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="pin" render={({ field }) => (
                <FormItem>
                  <FormLabel>Company PIN</FormLabel>
                  <FormControl><Input placeholder="A12345678B" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="nssf" render={({ field }) => (
                <FormItem>
                  <FormLabel>NSSF Number</FormLabel>
                  <FormControl><Input placeholder="NSSF001" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="nhif" render={({ field }) => (
                <FormItem>
                  <FormLabel>NHIF Number</FormLabel>
                  <FormControl><Input placeholder="NHIF001" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
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

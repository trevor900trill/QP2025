"use client";

import * as React from "react";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const benefitSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  type: z.enum(["Benefit", "Deduction"]),
  amount: z.coerce.number().positive("Amount must be positive"),
});

type Benefit = z.infer<typeof benefitSchema> & {
  id: string;
};

const initialBenefits: Benefit[] = [
  { id: "B001", name: "Health Insurance", type: "Benefit", amount: 30000 },
  { id: "D001", name: "Pension Contribution", type: "Deduction", amount: 20000 },
  { id: "B002", name: "Transport Allowance", type: "Benefit", amount: 15000 },
];

export default function BenefitsPage() {
  const [benefits, setBenefits] = React.useState<Benefit[]>(initialBenefits);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [editingBenefit, setEditingBenefit] = React.useState<Benefit | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof benefitSchema>>({
    resolver: zodResolver(benefitSchema),
    defaultValues: { name: "", type: "Benefit", amount: 0 },
  });

  React.useEffect(() => {
    if (editingBenefit) {
      form.reset(editingBenefit);
    } else {
      form.reset({ name: "", type: "Benefit", amount: 0 });
    }
  }, [editingBenefit, form]);

  const openForm = (benefit: Benefit | null = null) => {
    setEditingBenefit(benefit);
    setIsDialogOpen(true);
  };
  
  const closeForm = () => {
    setIsDialogOpen(false);
    setEditingBenefit(null);
  };

  function onSubmit(data: z.infer<typeof benefitSchema>) {
    if (editingBenefit) {
      setBenefits(benefits.map(b => b.id === editingBenefit.id ? { ...b, ...data } : b));
      toast({ title: "Item Updated", description: `${data.name} has been updated.` });
    } else {
      const newBenefit: Benefit = {
        id: `${data.type.charAt(0)}${String(benefits.length + 1).padStart(3, '0')}`,
        ...data,
      };
      setBenefits([newBenefit, ...benefits]);
      toast({ title: "Item Added", description: `${data.name} has been added.` });
    }
    closeForm();
  }

  const handleDelete = (benefitId: string) => {
    setBenefits(benefits.filter(b => b.id !== benefitId));
    toast({ title: "Item Deleted", description: "The item has been removed." });
  };

  const columns: ColumnDef<Benefit>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "type", header: "Type" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "KES",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const benefit = row.original;
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
                <DropdownMenuItem onClick={() => openForm(benefit)}>Edit</DropdownMenuItem>
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
                  This action cannot be undone. This will permanently delete this item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(benefit.id)}>Continue</AlertDialogAction>
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
      Add New
    </Button>
  );

  return (
    <>
      <PageHeader 
        title="Benefits and Deductions" 
        description="Manage company-wide benefits and deductions."
        backHref="/admin/settings"
        backText="Back to Settings"
      />
      <Card>
        <DataTable
            columns={columns}
            data={benefits}
            searchKey="name"
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            actionButton={actionButton}
        />
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={closeForm}>
            <DialogHeader>
              <DialogTitle>{editingBenefit ? "Edit" : "Add"} Benefit/Deduction</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="type" render={({ field }) => (
                     <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Benefit">Benefit</SelectItem>
                                <SelectItem value="Deduction">Deduction</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField control={form.control} name="amount" render={({ field }) => (
                    <FormItem><FormLabel>Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
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

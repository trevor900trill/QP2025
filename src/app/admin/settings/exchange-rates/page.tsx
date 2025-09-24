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

const rateSchema = z.object({
  currency: z.string().length(3, "Currency code must be 3 characters"),
  rate: z.coerce.number().positive("Rate must be positive"),
});

type ExchangeRate = {
  id: string;
  currency: string;
  rate: number;
};

const initialRates: ExchangeRate[] = [
  { id: "R001", currency: "USD", rate: 1.00 },
  { id: "R002", currency: "EUR", rate: 0.92 },
  { id: "R003", currency: "GBP", rate: 0.79 },
  { id: "R004", currency: "KES", rate: 130.50 },
];

export default function ExchangeRatesPage() {
  const [rates, setRates] = React.useState<ExchangeRate[]>(initialRates);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const form = useForm<z.infer<typeof rateSchema>>({
    resolver: zodResolver(rateSchema),
    defaultValues: {
      currency: "",
      rate: 0,
    },
  });

  function onSubmit(data: z.infer<typeof rateSchema>) {
    const newRate: ExchangeRate = {
      id: `R${String(rates.length + 1).padStart(3, '0')}`,
      currency: data.currency.toUpperCase(),
      rate: data.rate,
    };
    setRates([...rates, newRate]);
    form.reset();
    setIsDialogOpen(false);
  }

  const columns: ColumnDef<ExchangeRate>[] = [
    { accessorKey: "currency", header: "Currency" },
    { accessorKey: "rate", header: "Rate to USD" },
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
      <PageHeader title="Exchange Rates" description="Manage currency exchange rates relative to USD.">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Rate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Exchange Rate</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency Code (e.g., EUR)</FormLabel>
                      <FormControl><Input {...field} maxLength={3} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate to 1 USD</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
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
        <DataTable columns={columns} data={rates} searchKey="currency" />
      </Card>
    </>
  );
}

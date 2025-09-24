"use client";

import * as React from "react";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { MoreHorizontal, FileText, Download, Wallet, PlayCircle, CalendarIcon } from "lucide-react";
import { format, addMonths } from "date-fns";
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
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AnimatedPageHeader } from "@/components/shared/AnimatedPageHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

type PayrollRun = {
  id: string;
  month: string;
  employees: number;
  totalGross: number;
  totalNet: number;
  status: 'Completed' | 'Pending';
};

const initialPayrollRuns: PayrollRun[] = [
    { id: 'PR001', month: 'July 2024', employees: 148, totalGross: 850000, totalNet: 720000, status: 'Completed' },
    { id: 'PR002', month: 'June 2024', employees: 145, totalGross: 845000, totalNet: 715000, status: 'Completed' },
    { id: 'PR003', month: 'May 2024', employees: 140, totalGross: 820000, totalNet: 690000, status: 'Completed' },
];

const payrollSchema = z.object({
    payPeriod: z.date({
        required_error: "A pay period is required.",
    }),
});

export default function PayrollPage() {
    const { toast } = useToast();
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    const [payrollRuns, setPayrollRuns] = React.useState<PayrollRun[]>(initialPayrollRuns);
    const [isRunPayrollDialogOpen, setIsRunPayrollDialogOpen] = React.useState(false);

    const form = useForm<z.infer<typeof payrollSchema>>({
        resolver: zodResolver(payrollSchema),
    });

    const handleGenerate = (reportName: string) => {
        toast({
            title: "Generating Report...",
            description: `Your ${reportName} is being generated and will be available for download shortly.`,
        });
    }

    function onRunPayrollSubmit(data: z.infer<typeof payrollSchema>) {
        const month = format(data.payPeriod, "MMMM yyyy");
        const newRun: PayrollRun = {
            id: `PR${String(payrollRuns.length + 1).padStart(3, '0')}`,
            month: month,
            employees: 150, // Mock data
            totalGross: 860000, // Mock data
            totalNet: 730000, // Mock data
            status: 'Pending',
        };
        setPayrollRuns([newRun, ...payrollRuns]);
        toast({
            title: "Payroll Run Initiated",
            description: `Payroll for ${month} is now being processed.`,
        });
        form.reset();
        setIsRunPayrollDialogOpen(false);
    }

  const columns: ColumnDef<PayrollRun>[] = [
    {
      accessorKey: "month",
      header: "Pay Period",
    },
    {
      accessorKey: "employees",
      header: "Employees",
    },
    {
      accessorKey: "totalGross",
      header: "Total Gross Pay",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalGross"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "totalNet",
      header: "Total Net Pay",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalNet"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Generate Report</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleGenerate('NHIF By-Product')}>
                <FileText className="mr-2 h-4 w-4" />
                NHIF By-Product
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleGenerate('NSSF Report')}>
                <FileText className="mr-2 h-4 w-4" />
                NSSF Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleGenerate('Bank Payroll Summary')}>
                <Download className="mr-2 h-4 w-4" />
                Bank Payroll Summary
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const actionButton = (
    <Dialog open={isRunPayrollDialogOpen} onOpenChange={setIsRunPayrollDialogOpen}>
        <DialogTrigger asChild>
            <Button>
                <PlayCircle className="mr-2 h-4 w-4" />
                Run Payroll
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Run New Payroll</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onRunPayrollSubmit)} className="space-y-8">
                     <FormField
                        control={form.control}
                        name="payPeriod"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Pay Period</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "MMMM yyyy")
                                    ) : (
                                        <span>Pick a month</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Run</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  );

  return (
    <>
      <AnimatedPageHeader title="Payroll" icon={Wallet} iconAnimation="shake" />
      <Card>
        <DataTable
            columns={columns}
            data={payrollRuns}
            searchKey="month"
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            actionButton={actionButton}
        />
      </Card>
    </>
  );
}

"use client";

import * as React from "react";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { MoreHorizontal, FileText, Download, Wallet, PlayCircle, CalendarIcon, ChevronsUpDown, Building } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
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
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useCompany } from "@/context/CompanyContext";

type PayrollRun = {
  id: string;
  month: string;
  employees: number;
  totalGross: number;
  totalNet: number;
  status: 'Completed' | 'Pending';
};

const initialPayrollRuns: PayrollRun[] = [
    { id: 'PR001', month: 'July 2024', employees: 148, totalGross: 85000000, totalNet: 72000000, status: 'Completed' },
    { id: 'PR002', month: 'June 2024', employees: 145, totalGross: 84500000, totalNet: 71500000, status: 'Completed' },
    { id: 'PR003', month: 'May 2024', employees: 140, totalGross: 82000000, totalNet: 69000000, status: 'Completed' },
];

const payrollSchema = z.object({
    companyId: z.string({ required_error: "A company is required." }),
    payrollName: z.string().min(3, "Payroll name must be at least 3 characters."),
    payRunPeriod: z.object({
        from: z.date(),
        to: z.date(),
    }, { required_error: "A pay run period is required."}),
    paymentDate: z.date({ required_error: "A payment date is required." }),
});

export default function PayrollPage() {
    const { toast } = useToast();
    const { selectedCompany, availableCompanies } = useCompany();
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    const [payrollRuns, setPayrollRuns] = React.useState<PayrollRun[]>(initialPayrollRuns);
    const [isRunPayrollDialogOpen, setIsRunPayrollDialogOpen] = React.useState(false);

    const form = useForm<z.infer<typeof payrollSchema>>({
        resolver: zodResolver(payrollSchema),
        defaultValues: {
            companyId: selectedCompany?.id,
            payrollName: "",
        }
    });

    React.useEffect(() => {
        if(selectedCompany) {
            form.setValue('companyId', selectedCompany.id);
        }
    }, [selectedCompany, form]);

    const handleGenerate = (reportName: string) => {
        toast({
            title: "Generating Report...",
            description: `Your ${reportName} is being generated and will be available for download shortly.`,
        });
    }

    function onRunPayrollSubmit(data: z.infer<typeof payrollSchema>) {
        const month = format(data.payRunPeriod.from, "MMMM yyyy");
        const companyName = availableCompanies.find(c => c.id === data.companyId)?.name || 'the company';
        const newRun: PayrollRun = {
            id: `PR${String(payrollRuns.length + 1).padStart(3, '0')}`,
            month: data.payrollName,
            employees: 150, // Mock data
            totalGross: 860000, // Mock data
            totalNet: 730000, // Mock data
            status: 'Pending',
        };
        setPayrollRuns([newRun, ...payrollRuns]);
        toast({
            title: "Payroll Run Initiated",
            description: `${data.payrollName} for ${companyName} is now being processed.`,
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
          currency: "KES",
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
          currency: "KES",
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
                <form onSubmit={form.handleSubmit(onRunPayrollSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="companyId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                                        >
                                            {field.value
                                                ? availableCompanies.find(c => c.id === field.value)?.name
                                                : "Select company"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                       {/* This should be a command component but simplified for now */}
                                       {availableCompanies.map(c => (
                                          <Button key={c.id} variant="ghost" className="w-full justify-start" onClick={() => field.onChange(c.id)}>
                                             <Building className="mr-2 h-4 w-4" />
                                             {c.name}
                                          </Button>
                                       ))}
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="payrollName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payroll Name</FormLabel>
                                <FormControl><Input placeholder="e.g. August 2024 Payroll" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="payRunPeriod"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Pay Run Period</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value?.from ? (
                                                field.value.to ? (
                                                <>
                                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                                    {format(field.value.to, "LLL dd, y")}
                                                </>
                                                ) : (
                                                format(field.value.from, "LLL dd, y")
                                                )
                                            ) : (
                                                <span>Pick a date range</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={field.value?.from}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="paymentDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Payment Date</FormLabel>
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
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
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
                                        date < new Date("1900-01-01")
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

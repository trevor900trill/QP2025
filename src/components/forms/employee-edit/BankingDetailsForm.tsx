"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import type { Employee } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";

const bankingSchema = z.object({
  bankId: z.string().min(1, "Bank is required"),
  accountName: z.string().min(1, "Account name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  remarks: z.string().optional(),
});

interface BankingDetailsFormProps {
    employee: Employee;
    isReadOnly: boolean;
}

export function BankingDetailsForm({ employee, isReadOnly }: BankingDetailsFormProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof bankingSchema>>({
        resolver: zodResolver(bankingSchema),
        defaultValues: {
            bankId: employee.employeeBanking.bankId,
            accountName: employee.employeeBanking.accountName,
            accountNumber: employee.employeeBanking.accountNumber,
            remarks: employee.employeeBanking.remarks || "",
        },
    });

    function onSubmit(data: z.infer<typeof bankingSchema>) {
        console.log("Saving banking details:", data);
        toast({ title: "Banking Details Saved", description: "Your banking information has been updated."});
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="bankId" render={({ field }) => (
                        <FormItem><FormLabel>Bank</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="accountName" render={({ field }) => (
                        <FormItem><FormLabel>Account Name</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="accountNumber" render={({ field }) => (
                        <FormItem><FormLabel>Account Number</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="remarks" render={({ field }) => (
                    <FormItem><FormLabel>Remarks</FormLabel><FormControl><Textarea {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                )} />
                {!isReadOnly && (
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                )}
            </form>
        </Form>
    )
}

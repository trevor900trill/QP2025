"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import type { Employee } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";

const salarySchema = z.object({
  grossPayKES: z.coerce.number().positive(),
  currencyName: z.string().min(3),
  convertionRate: z.coerce.number().positive(),
});

interface SalaryDetailsFormProps {
    employee: Employee;
    isReadOnly: boolean;
}

export function SalaryDetailsForm({ employee, isReadOnly }: SalaryDetailsFormProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof salarySchema>>({
        resolver: zodResolver(salarySchema),
        defaultValues: {
            grossPayKES: employee.grossPayKES,
            currencyName: employee.currencyName,
            convertionRate: employee.convertionRate,
        },
    });

    function onSubmit(data: z.infer<typeof salarySchema>) {
        console.log("Saving salary details:", data);
        toast({ title: "Salary Details Saved", description: "The salary information has been updated."});
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <div className="grid grid-cols-3 gap-4">
                    <FormField control={form.control} name="grossPayKES" render={({ field }) => (
                        <FormItem><FormLabel>Gross Pay (KES)</FormLabel><FormControl><Input type="number" {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="currencyName" render={({ field }) => (
                        <FormItem><FormLabel>Currency</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="convertionRate" render={({ field }) => (
                        <FormItem><FormLabel>Conversion Rate</FormLabel><FormControl><Input type="number" {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                {!isReadOnly && (
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                )}
            </form>
        </Form>
    )
}

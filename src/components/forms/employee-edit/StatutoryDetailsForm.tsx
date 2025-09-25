"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import type { Employee } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";

const statutorySchema = z.object({
    employeePIN: z.string().min(1, "KRA PIN is required"),
    employeeNSSF: z.string().min(1, "NSSF Number is required"),
    employeeNHIF: z.string().min(1, "NHIF Number is required"),
    deductNHIF: z.boolean().default(true),
    deductNSSF: z.boolean().default(true),
    deductHousingLevy: z.boolean().default(true),
    isResident: z.boolean().default(true),
});

interface StatutoryDetailsFormProps {
    employee: Employee;
    isReadOnly: boolean;
}

export function StatutoryDetailsForm({ employee, isReadOnly }: StatutoryDetailsFormProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof statutorySchema>>({
        resolver: zodResolver(statutorySchema),
        defaultValues: {
            employeePIN: employee.kraDetail.employeePIN,
            employeeNSSF: employee.kraDetail.employeeNSSF,
            employeeNHIF: employee.kraDetail.employeeNHIF,
            deductNHIF: employee.employmentTypeSetting.deductNHIF,
            deductNSSF: employee.employmentTypeSetting.deductNSSF,
            deductHousingLevy: employee.employmentTypeSetting.deductHousingLevy,
            isResident: employee.employmentTypeSetting.isResident,
        },
    });

    function onSubmit(data: z.infer<typeof statutorySchema>) {
        console.log("Saving statutory details:", data);
        toast({ title: "Statutory Details Saved", description: "The statutory information has been updated."});
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="employeePIN" render={({ field }) => (
                        <FormItem><FormLabel>KRA PIN</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="employeeNSSF" render={({ field }) => (
                        <FormItem><FormLabel>NSSF Number</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="employeeNHIF" render={({ field }) => (
                        <FormItem><FormLabel>NHIF Number</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <FormField control={form.control} name="deductNHIF" render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isReadOnly} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Deduct NHIF?</FormLabel></div></FormItem>
                    )} />
                     <FormField control={form.control} name="deductNSSF" render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isReadOnly} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Deduct NSSF?</FormLabel></div></FormItem>
                    )} />
                     <FormField control={form.control} name="deductHousingLevy" render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isReadOnly} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Housing Levy?</FormLabel></div></FormItem>
                    )} />
                     <FormField control={form.control} name="isResident" render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isReadOnly} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Is Resident?</FormLabel></div></FormItem>
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

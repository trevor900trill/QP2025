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

const workDetailsSchema = z.object({
  title: z.string().min(2),
  workEmail: z.string().email(),
  dateOfEmployment: z.string().min(1, "Date of employment is required"),
  departmentId: z.string().min(1, "Department is required"),
  employmentTypeId: z.string().min(1, "Employment type is required"),
  isDepartmentHead: z.boolean().default(false),
});

interface WorkDetailsFormProps {
    employee: Employee;
    isReadOnly: boolean;
}

export function WorkDetailsForm({ employee, isReadOnly }: WorkDetailsFormProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof workDetailsSchema>>({
        resolver: zodResolver(workDetailsSchema),
        defaultValues: {
            title: employee.title,
            workEmail: employee.employeeWorkDetails.workEmail,
            dateOfEmployment: employee.employeeWorkDetails.dateOfEmployment,
            departmentId: employee.departmentId,
            employmentTypeId: employee.employmentTypeId,
            isDepartmentHead: employee.isDepartmentHead,
        },
    });

    function onSubmit(data: z.infer<typeof workDetailsSchema>) {
        console.log("Saving work details:", data);
        toast({ title: "Work Details Saved", description: "The work information has been updated."});
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="workEmail" render={({ field }) => (
                        <FormItem><FormLabel>Work Email</FormLabel><FormControl><Input type="email" {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="departmentId" render={({ field }) => (
                        <FormItem><FormLabel>Department</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="employmentTypeId" render={({ field }) => (
                        <FormItem><FormLabel>Employment Type</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="dateOfEmployment" render={({ field }) => (
                        <FormItem><FormLabel>Date of Employment</FormLabel><FormControl><Input type="date" {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="isDepartmentHead" render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-2">
                           <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isReadOnly} /></FormControl>
                           <div className="space-y-1 leading-none"><FormLabel>Is Department Head?</FormLabel></div>
                        </FormItem>
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

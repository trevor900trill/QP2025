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

const refereeSchema = z.object({
  names: z.string().min(1, "Name is required"),
  email: z.string().email(),
  phoneNumber: z.string().min(1, "Phone number is required"),
});

interface RefereeDetailsFormProps {
    employee: Employee;
    isReadOnly: boolean;
}

export function RefereeDetailsForm({ employee, isReadOnly }: RefereeDetailsFormProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof refereeSchema>>({
        resolver: zodResolver(refereeSchema),
        defaultValues: {
            names: employee.employeeReferee.names,
            email: employee.employeeReferee.email,
            phoneNumber: employee.employeeReferee.phoneNumber,
        },
    });

    function onSubmit(data: z.infer<typeof refereeSchema>) {
        console.log("Saving referee details:", data);
        toast({ title: "Referee Details Saved", description: "Your referee information has been updated."});
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="names" render={({ field }) => (
                        <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
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

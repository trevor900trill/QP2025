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

const addressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  postCode: z.string().min(1, "Post code is required"),
  city: z.string().min(1, "City is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  personalEmail: z.string().email("Invalid email"),
});

interface AddressDetailsFormProps {
    employee: Employee;
    isReadOnly: boolean;
}

export function AddressDetailsForm({ employee, isReadOnly }: AddressDetailsFormProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof addressSchema>>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            country: employee.address.country,
            address: employee.address.address,
            postCode: employee.address.postCode,
            city: employee.address.city,
            mobileNumber: employee.address.mobileNumber,
            personalEmail: employee.address.personalEmail,
        },
    });

    function onSubmit(data: z.infer<typeof addressSchema>) {
        console.log("Saving address details:", data);
        toast({ title: "Address Details Saved", description: "Your address information has been updated."});
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="personalEmail" render={({ field }) => (
                    <FormItem><FormLabel>Personal Email</FormLabel><FormControl><Input type="email" {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="mobileNumber" render={({ field }) => (
                    <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="postCode" render={({ field }) => (
                        <FormItem><FormLabel>Post Code</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
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

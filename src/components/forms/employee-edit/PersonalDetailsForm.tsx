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

const personalDetailsSchema = z.object({
  firstName: z.string().min(2),
  middleName: z.string().optional(),
  surname: z.string().min(2),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1),
  idNumber: z.string().min(1),
  nationality: z.string().min(1),
  passportNumber: z.string().optional(),
  maritalStatus: z.string().min(1),
  levelOfEducation: z.string().min(1),
  emergencyContactName: z.string().min(1),
  emergencyContactPhone: z.string().min(1),
  spouseName: z.string().optional(),
});

interface PersonalDetailsFormProps {
    employee: Employee;
    isReadOnly: boolean;
}

export function PersonalDetailsForm({ employee, isReadOnly }: PersonalDetailsFormProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof personalDetailsSchema>>({
        resolver: zodResolver(personalDetailsSchema),
        defaultValues: {
            firstName: employee.firstName,
            middleName: employee.middleName,
            surname: employee.surname,
            dob: employee.dob,
            gender: employee.gender,
            idNumber: employee.idNumber,
            nationality: employee.nationality,
            passportNumber: employee.passportNumber,
            maritalStatus: employee.employeePersonalDetail.maritalStatus,
            levelOfEducation: employee.employeePersonalDetail.levelOfEducation,
            emergencyContactName: employee.employeePersonalDetail.emergencyContactName,
            emergencyContactPhone: employee.employeePersonalDetail.emergencyContactPhone,
            spouseName: employee.employeePersonalDetail.spouseName,
        },
    });

    function onSubmit(data: z.infer<typeof personalDetailsSchema>) {
        console.log("Saving personal details:", data);
        toast({ title: "Personal Details Saved", description: "Your personal information has been updated."});
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
                <div className="grid grid-cols-3 gap-4">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="middleName" render={({ field }) => (
                        <FormItem><FormLabel>Middle Name</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="surname" render={({ field }) => (
                        <FormItem><FormLabel>Surname</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="dob" render={({ field }) => (
                        <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="gender" render={({ field }) => (
                        <FormItem><FormLabel>Gender</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="idNumber" render={({ field }) => (
                        <FormItem><FormLabel>ID Number</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="nationality" render={({ field }) => (
                        <FormItem><FormLabel>Nationality</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="passportNumber" render={({ field }) => (
                    <FormItem><FormLabel>Passport Number</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="maritalStatus" render={({ field }) => (
                        <FormItem><FormLabel>Marital Status</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="levelOfEducation" render={({ field }) => (
                        <FormItem><FormLabel>Level of Education</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="spouseName" render={({ field }) => (
                    <FormItem><FormLabel>Spouse Name (if applicable)</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                )} />
                 <p className="font-medium text-sm pt-2">Emergency Contact</p>
                 <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="emergencyContactName" render={({ field }) => (
                        <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="emergencyContactPhone" render={({ field }) => (
                        <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} disabled={isReadOnly} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                
                 {!isReadOnly && (
                    <DialogFooter className="pt-4">
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                 )}
            </form>
        </Form>
    )
}

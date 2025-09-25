"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  Building,
  ExternalLink,
} from "lucide-react";
import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { companies } from "@/lib/placeholder-data";
import { AnimatedPageHeader } from "@/components/shared/AnimatedPageHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Company } from "@/lib/definitions";

const companySchema = z.object({
  name: z.string().min(2, "Company name is too short"),
  pin: z.string().min(5, "PIN is too short"),
  nssf: z.string().min(5, "NSSF number is too short"),
  nhif: z.string().min(5, "NHIF number is too short"),
});


export default function EditCompanyPage() {
  const params = useParams<{ companyId: string }>();
  const company = companies.find((c) => c.id === params.companyId);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: company,
  });

  if (!company) {
    notFound();
  }

  function onSubmit(data: z.infer<typeof companySchema>) {
    toast({ title: "Company Details Saved", description: "The company information has been updated." });
    console.log("Saving company details:", data);
  }

  const editCards = [
      { title: "Company Details", icon: Building },
  ]

  return (
    <>
      <div className="mb-4">
        <Button variant="link" asChild className="px-0">
          <Link href="/admin/companies">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Companies
          </Link>
        </Button>
      </div>

      <AnimatedPageHeader
        title={`Edit ${company.name}`}
        icon={Building}
        iconAnimation="breathe"
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        <Dialog>
            <DialogTrigger asChild>
                <Card className="group cursor-pointer hover:border-primary transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-medium">
                        Company Details
                        </CardTitle>
                        <Building className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-primary flex items-center">
                            Edit company details
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Company Details</DialogTitle>
                </DialogHeader>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl><Input placeholder="Innovate Inc." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="pin" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company PIN</FormLabel>
                          <FormControl><Input placeholder="A12345678B" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="nssf" render={({ field }) => (
                        <FormItem>
                          <FormLabel>NSSF Number</FormLabel>
                          <FormControl><Input placeholder="NSSF001" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="nhif" render={({ field }) => (
                        <FormItem>
                          <FormLabel>NHIF Number</FormLabel>
                          <FormControl><Input placeholder="NHIF001" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </form>
                  </Form>
            </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

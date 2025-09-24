"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { KeyRound, Building, Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/shared/PageHeader";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const settingsSchema = z.object({
  aesKey: z.string().min(16, "AES Key must be at least 16 characters long"),
  companyName: z.string().min(2, "Company name is required"),
  emailNotifications: z.boolean().default(false),
  smsNotifications: z.boolean().default(false),
});

export default function SettingsPage() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      aesKey: process.env.NEXT_PUBLIC_AES_KEY || "YourSuperSecretKeyForAESEncrypt123",
      companyName: "QwikPace Inc.",
      emailNotifications: true,
      smsNotifications: false,
    },
  });

  function onSubmit(data: z.infer<typeof settingsSchema>) {
    console.log("Settings updated:", data);
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully.",
    });
  }

  return (
    <>
      <PageHeader title="Settings" description="Manage your account and application settings." />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5"/> Security
              </CardTitle>
              <CardDescription>Manage security-related settings for your application.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="aesKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AES Encryption Key</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      The decryption key for login tokens. This should be stored securely.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5"/> Company Profile
              </CardTitle>
              <CardDescription>Update your company's public information.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company LLC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5"/> Notifications
              </CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Email Notifications</FormLabel>
                      <FormDescription>Receive notifications via email for important events.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="smsNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>SMS Notifications</FormLabel>
                      <FormDescription>Receive critical alerts via SMS (charges may apply).</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </>
  );
}

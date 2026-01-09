"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AuthSidePanel } from "@/components/shared/AuthSidePanel";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Logging in...",
      description: "Please wait while we verify your credentials.",
    });

    try {
      // Import dynamically to avoid server-side issues if any, though "use client" handles it
      const { AuthService } = await import("@/lib/auth-api");

      // Map form values to API expected format (username/password)
      const payload = {
        username: values.email,
        password: values.password
      };

      const result = await AuthService.login(payload);

      if (result.success && result.data?.result) {
        toast({
          title: "Login Successful",
          description: "Redirecting...",
          variant: "default",
        });

        // Store user data
        localStorage.setItem("user", JSON.stringify(result.data.result));

        // Handle Redirection Logic based on User Type (ported from Vue)
        const user = result.data.result;

        // Check for return route
        const returnRoute = localStorage.getItem("QpReturn");
        if (returnRoute && returnRoute !== "/" && returnRoute !== "/login") {
          router.push(returnRoute);
          localStorage.removeItem("QpReturn");
          return;
        }

        if (user.forcePasswordChange) {
          router.push("/forgot-password");
        } else {
          // appUserType: 1 -> QP (Admin?), 2 -> Employee, 3 -> QP
          // In React, we have /module-select as a landing or direct to dashboard.
          // The prompt mentioned "there is a page after login has all the modules".
          // So we default to module-select unless specific logic dictates otherwise.
          // However, Vue logic had specific routes.
          // Vue: 1->/qp, 2->/employee, 3->/qp
          // React app has /module-select. Let's send them there to choose, 
          // OR if specific role, maybe we can direct them? 
          // User said: "there is a page after login has all the modules, etc".
          // So let's route to /module-select for everyone, or follow Vue's logic?
          // "on the react side, I am doing it using modules, there is a page after login has all the modules"
          // So routing to /module-select seems correct for the React version.
          router.push("/module-select");
        }
      } else {
        toast({
          title: "Login Failed",
          description: result.error || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center mb-4">
              <Image src="/logo.svg" alt="QwikPace Logo" width={48} height={48} />
            </div>
            <h1 className="text-3xl font-bold font-headline">Welcome to QwikPace</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your account.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="https://www.qwikpace.com/#book-demo" className="underline text-primary font-semibold">
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-primary p-0 overflow-hidden">
        <AuthSidePanel />
      </div>
    </div>
  );
}

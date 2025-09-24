"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const roleSchema = z.object({
  name: z.string().min(2, "Role name is too short"),
});

type Role = {
  id: string;
  name: string;
  userCount: number;
};

const initialRoles: Role[] = [
  { id: "R001", name: "Admin", userCount: 2 },
  { id: "R002", name: "Manager", userCount: 5 },
  { id: "R003", name: "Employee", userCount: 150 },
  { id: "R004", name: "Accountant", userCount: 3 },
];

export default function RolesPage() {
  const [roles, setRoles] = React.useState<Role[]>(initialRoles);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof roleSchema>) {
    const newRole: Role = {
      id: `R${String(roles.length + 1).padStart(3, '0')}`,
      name: data.name,
      userCount: 0,
    };
    setRoles([...roles, newRole]);
    form.reset();
    setIsDialogOpen(false);
  }

  const columns: ColumnDef<Role>[] = [
    { accessorKey: "name", header: "Role Name" },
    { accessorKey: "userCount", header: "No. of Users", cell: ({row}) => <div className="text-center">{row.original.userCount}</div> },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
            <DropdownMenuItem>Delete Role</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const actionButton = (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Role
        </Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
                <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
            </DialogFooter>
            </form>
        </Form>
        </DialogContent>
    </Dialog>
  );

  return (
    <>
      <PageHeader title="Roles Settings" description="Manage user roles and permissions."/>
      <Card>
        <DataTable columns={columns} data={roles} searchKey="name" actionButton={actionButton} />
      </Card>
    </>
  );
}

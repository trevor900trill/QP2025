"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";


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
  const [editingRole, setEditingRole] = React.useState<Role | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: "" },
  });

  React.useEffect(() => {
    if (editingRole) {
      form.reset({ name: editingRole.name });
    } else {
      form.reset({ name: "" });
    }
  }, [editingRole, form]);

  const openForm = (role: Role | null = null) => {
    setEditingRole(role);
    setIsDialogOpen(true);
  };
  
  const closeForm = () => {
    setIsDialogOpen(false);
    setEditingRole(null);
  };

  function onSubmit(data: z.infer<typeof roleSchema>) {
    if (editingRole) {
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, ...data } : r));
      toast({ title: "Role Updated", description: `The ${data.name} role has been updated.` });
    } else {
      const newRole: Role = {
        id: `R${String(roles.length + 1).padStart(3, '0')}`,
        name: data.name,
        userCount: 0,
      };
      setRoles([newRole, ...roles]);
      toast({ title: "Role Added", description: `The ${data.name} role has been added.` });
    }
    closeForm();
  }

  const handleDelete = (roleId: string) => {
    setRoles(roles.filter(r => r.id !== roleId));
    toast({ title: "Role Deleted", description: "The role has been removed." });
  };

  const columns: ColumnDef<Role>[] = [
    { accessorKey: "name", header: "Role Name" },
    { accessorKey: "userCount", header: "No. of Users", cell: ({row}) => <div className="text-center">{row.original.userCount}</div> },
    {
      id: "actions",
      cell: ({ row }) => {
        const role = row.original;
        return (
           <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => openForm(role)}>Edit Role Name</DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Role
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this role.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(role.id)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      },
    },
  ];

  const actionButton = (
    <Button onClick={() => openForm()}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Role
    </Button>
  );

  return (
    <>
      <PageHeader 
        title="Roles Settings" 
        description="Manage user roles and permissions."
        backHref="/admin/settings"
        backText="Back to Settings"
      />
      <Card>
        <DataTable columns={columns} data={roles} searchKey="name" actionButton={actionButton} />
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={closeForm}>
        <DialogHeader>
            <DialogTitle>{editingRole ? "Edit" : "Add New"} Role</DialogTitle>
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
                <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
                <Button type="submit">Save</Button>
            </DialogFooter>
            </form>
        </Form>
        </DialogContent>
    </Dialog>
    </>
  );
}

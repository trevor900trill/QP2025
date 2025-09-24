"use client";

import * as React from "react";
import Image from "next/image";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import type { User } from "@/lib/definitions";
import { users } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/card";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={user.avatar}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant: "default" | "secondary" | "destructive" =
        status === "Active" ? "default" : status === "Pending" ? "secondary" : "destructive";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit user roles</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UsersPage() {
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  return (
    <>
      <PageHeader title="Users" description="Manage system users and their permissions.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </PageHeader>
      <Card>
        <DataTable 
            columns={columns} 
            data={users} 
            searchKey="name"
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
        />
      </Card>
    </>
  );
}

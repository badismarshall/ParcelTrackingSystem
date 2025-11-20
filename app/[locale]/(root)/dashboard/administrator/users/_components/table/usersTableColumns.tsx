"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { roles, statuses } from "./users-data-table-datatest"
import { User } from "./users-data-table-schema"
import { DataTableColumnHeader } from "@/components/shared/table/data-table-column-header"
import { DataTableRowActions } from "./users-data-table-row-actions"
import { format, parseISO } from "date-fns"
import { fr } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            {/* <AvatarImage src={user.image || undefined} alt={user.name} /> */}
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span>{row.getValue("name")}</span>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[200px] items-center">
          <span>{row.getValue("email")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = roles.find((role) => role.value === row.original.role)

      if (!role) {
        return null
      }

      return (
        <div className="flex ">
          {role && <Badge variant="outline" className={`flex items-center gap-2 ${role.color}`}>
                {role.icon && (
                    <role.icon className="h-4 w-4 text-muted-foreground" />
                )}
                <span>{role.label}</span>
            </Badge>}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "status",
    accessorFn: (row) => {
      const user = row as User
      if (user.banned) {
        return "banned"
      } else if (!user.emailVerified) {
        return "unverified"
      } else {
        return "active"
      }
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const user = row.original
      let status
      
      if (user.banned) {
        status = statuses.find((s) => s.value === "banned")
      } else if (!user.emailVerified) {
        status = statuses.find((s) => s.value === "unverified")
      } else {
        status = statuses.find((s) => s.value === "active")
      }

      if (!status) {
        return null
      }

      return (
        <div className="flex ">
          {status && <Badge variant="outline" className={`flex items-center gap-2 ${status.color}`}>
                {status.icon && (
                    <status.icon className="h-4 w-4 text-muted-foreground" />
                )}
                <span>{status.label}</span>
            </Badge>}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const user = row.original as User
      let computedStatus: string
      
      if (user.banned) {
        computedStatus = "banned"
      } else if (!user.emailVerified) {
        computedStatus = "unverified"
      } else {
        computedStatus = "active"
      }
      
      return value.includes(computedStatus)
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'emailVerified',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verified" />
    ),
    cell: ({ row }) => {
      const verified = row.getValue('emailVerified') as boolean
      return (
        <div className="flex items-center">
          <Badge variant={verified ? "default" : "secondary"}>
            {verified ? "Verified" : "Unverified"}
          </Badge>
        </div>
      )
    },
    enableSorting: false,
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Created At" />
  //   ),
  //   cell: ({ row }) => <div className="flex items-center">{
  //       format(parseISO(row.getValue('createdAt')), "PPPP", {
  //         locale : fr,
  //       })
  //        } </div>,
  //   enableSorting: false,
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

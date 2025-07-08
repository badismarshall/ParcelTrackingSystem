"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { statuses } from "./orders-data-table-datatest"
import { Order } from "./orders-data-table-schema"
import { DataTableColumnHeader } from "@/components/shared/table/data-table-column-header"
import { DataTableRowActions } from "./orders-data-table-row-actions"
import { format, parseISO } from "date-fns"
import { fr } from 'date-fns/locale';

export const columns: ColumnDef<Order>[] = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.original.status)


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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("customerName")}</span>
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
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex items-center">
          <span>{row.getValue("totalAmount")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'orderDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => <div className="flex items-center">{
        format(parseISO(row.getValue('orderDate')), "PPPP", {
          locale : fr,
        })
         } </div>,
    enableSorting: false,
  },
  {
    accessorKey: 'productName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("productName")}</span>
        </div>
      )
    },
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id))
    // },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'externalID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="External ID" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("externalID")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'commonName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Common Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("commonName")}</span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
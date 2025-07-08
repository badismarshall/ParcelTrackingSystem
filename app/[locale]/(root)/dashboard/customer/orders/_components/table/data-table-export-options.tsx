"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"

interface DataTableExportOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableExportOptions<TData>({
  table,
}: DataTableExportOptionsProps<TData>) {
  // Placeholder export handler
  const handleExportSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows
    // TODO: Implement actual export logic for selectedRows
    alert(`Exporting ${selectedRows.length} selected order(s).`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-2 hidden h-8 lg:flex"
        >
          <span className="mr-2 h-4 w-4">{Icons.export ? <Icons.export /> : "⇩"}</span>
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex p-1">
        <DropdownMenuItem onClick={handleExportSelected}>
          Export Selected Orders
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
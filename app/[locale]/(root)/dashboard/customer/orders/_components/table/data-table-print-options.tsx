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

interface DataTablePrintOptionsProps<TData> {
  table: Table<TData>
}

export function DataTablePrintOptions<TData>({
  table,
}: DataTablePrintOptionsProps<TData>) {
  // Placeholder print handler
  const handlePrintSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows
    // TODO: Implement actual print logic for selectedRows
    alert(`Printing ${selectedRows.length} selected order(s).`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-2 hidden h-8 lg:flex"
        >
          <span className="mr-2 h-4 w-4"><Icons.printer /></span>
          Print
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex p-1">
        <DropdownMenuItem onClick={handlePrintSelected}>
          Print Selected Orders
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
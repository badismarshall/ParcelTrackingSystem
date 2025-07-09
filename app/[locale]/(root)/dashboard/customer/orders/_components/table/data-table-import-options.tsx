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

interface DataTableImportOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableImportOptions<TData>({
  table,
}: DataTableImportOptionsProps<TData>) {
  // Placeholder import handler
  const handleImportCSV = () => {
    // TODO: Implement actual import logic
    alert("Import from CSV clicked.")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 flex"
        >
          <span className="xl:mr-2 h-4 w-4">{Icons.import ? <Icons.import /> : "⇪"}</span>
          <span className="hidden sm:block">Import</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex p-1">
        <DropdownMenuItem onClick={handleImportCSV}>
          Import from CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/shared/table/data-table-view-options"

import { statuses } from "./orders-data-table-datatest"
import { DataTableFacetedFilter } from "@/components/shared/table/data-table-faceted-filter"
import { DataTablePrintOptions } from "./data-table-print-options"
import { DataTableExportOptions } from "./data-table-export-options"
import { DataTableImportOptions } from "./data-table-import-options"
import { DataTableRefreshOptions } from "./data-table-refresh-options"
import { DataTableCalendarOptions } from "./data-table-calendar-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Rechercher par ID"
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(order) =>
            table.getColumn("id")?.setFilterValue(order.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableRefreshOptions table={table} />
        <DataTableCalendarOptions table={table} />
        <DataTableImportOptions table={table} />
        <DataTableExportOptions table={table} />
        <DataTablePrintOptions table={table} />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
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
    <div className="flex lg:items-end items-center justify-between lg:flex-row flex-col gap-2">
      <div className="flex flex-1 items-start gap-2 lg:flex-col flex-col-reverse">

        <div className="flex items-center gap-2 justify-center">
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
            <span className="hidden xl:block">Reset</span>
            <Cross2Icon className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Input
          placeholder="Rechercher par ID"
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(order) =>
            table.getColumn("id")?.setFilterValue(order.target.value)
          }
          className="h-8 w-full"
        />
      </div>
      <div className="flex items-center justify-center gap-2">
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
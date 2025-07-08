"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Table } from "@tanstack/react-table"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import RangeCalendar from "@/components/range-calendar"

interface DataTableCalendarOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableCalendarOptions<TData>({
  table,
}: DataTableCalendarOptionsProps<TData>) {
  const [date, setDate] = useState<DateRange | undefined>()

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate)
    // TODO: Implement date range filtering logic
    console.log("Selected date range:", selectedDate)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-2 hidden h-8 lg:flex"
        >
          <span className="mr-2 h-4 w-4">{Icons.calendar ? <Icons.calendar /> : "📅"}</span>
          Calendar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto p-4">
        {/* <DropdownMenuLabel>Select Date Range</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        {/* <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleDateSelect}
          numberOfMonths={2}
        /> */}
        <RangeCalendar />
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
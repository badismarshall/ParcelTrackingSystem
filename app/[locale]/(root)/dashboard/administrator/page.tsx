import { DataTable } from "@/components/shared/table/data-table";
import { ChartAreaInteractive } from "../_components/dashboardTestComponets/ChartAreaInteractive";
import { SectionCards } from "../_components/dashboardTestComponets/section-cards";
import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

export default async function DashboardPage() {

    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        {/* <DataTable data={data} /> */}
    </div>
    )
  }
  
  
import { DataTable } from "@/components/shared/table/data-table";
import { ChartAreaInteractive } from "../_components/dashboardTestComponets/ChartAreaInteractive";
import { SectionCards } from "../_components/dashboardTestComponets/section-cards";
import { columns } from "../customer/orders/_components/table/ordersTableColumns"
import { promises as fs } from "fs"
import path from "path"
import { orderSchema } from "../customer/orders/_components/table/orders-data-table-schema"
import { DataTableToolbar } from "../customer/orders/_components/table/orders-data-table-toolbar"
import { z } from "zod"

async function getOrders() {
  const data = await fs.readFile(
      path.join(process.cwd(), "constants", "dashboard", "orders", "orders-data.json"),
      "utf8"
    )
    const orders = JSON.parse(data)
    return z.array(orderSchema).parse(orders)
}

export default async function DashboardPage() {
  const orders = await getOrders()

    return (
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              {/* <DataTable data={data} /> */}
              <div className="flex flex-col gap-4 px-4 lg:px-6">
                <DataTable 
                  data={orders} 
                  columns={columns} 
                  DataTableToolbar={DataTableToolbar}
                />
              </div>
            </div>
          </div>
        </div>
    )
  }
  
  
import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"

import { columns } from "./_components/table/ordersTableColumns"
import { DataTable } from "@/components/shared/table/data-table"
import { orderSchema } from "./_components/table/orders-data-table-schema"
import { DataTableToolbar } from "./_components/table/orders-data-table-toolbar"

export const metadata: Metadata = {
    title: "Commandes",
    description: "Une liste de toutes les commandes.",
}

async function getOrders() {
    const data = await fs.readFile(
        path.join(process.cwd(), "constants", "dashboard", "orders", "orders-data.json"),
        "utf8"
      )
      const orders = JSON.parse(data)
      return z.array(orderSchema).parse(orders)
}

export default async function OrdersPage() {
    const orders = await getOrders()
      
    return (
        <div className="h-full flex-1 flex-col space-y-8">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Content de te revoir!</h2>
              <p className="text-muted-foreground">
              Voici une liste de toutes les commandes!
              </p>
            </div>
          </div>
          <DataTable 
            data={orders} 
            columns={columns} 
            DataTableToolbar={DataTableToolbar}
            />
        </div>
    )
  }
  
  
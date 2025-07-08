import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
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
        <div className="@container/main flex flex-1 flex-col gap-2">
        {/* <div className="md:hidden">
          <Image
            src="/examples/orders-light.png"
            width={1280}
            height={998}
            alt="Playground"
            className="block dark:hidden"
          />
          <Image
            src="/examples/orders-dark.png"
            width={1280}
            height={998}
            alt="Playground"
            className="hidden dark:block"
          />    
        </div> */}
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
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
      </div>
    )
  }
  
  
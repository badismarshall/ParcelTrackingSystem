import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const orderSchema = z.object({
  id: z.string(),
  status: z.string(),
  customerName: z.string(),
  totalAmount: z.number(),
  orderDate: z.string(),
  productName: z.string(),
  externalID: z.string(),
  commonName: z.string(),
})

export type Order = z.infer<typeof orderSchema>
import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  role: z.string().nullable().optional(),
  banned: z.boolean().nullable().optional(),
  createdAt: z.date(),
  // image: z.string().nullable().optional(),
  // updatedAt: z.string(),
  // banReason: z.string().nullable().optional(),
  // banExpires: z.string().nullable().optional(),
})

export type User = z.infer<typeof userSchema>


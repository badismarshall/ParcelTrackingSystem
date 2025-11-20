import "server-only";
import { z } from "zod";

export const userSchema = z.object({
    users: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            emailVerified: z.boolean(),
            role: z.string(),
            banned: z.boolean(),
            createdAt: z.date(),
    })),
    options: z.object({
       totalCount: z.number(),
       limit: z.number(),
       offset: z.number(),
    }),
});

export type UserDTO = z.infer<typeof userSchema>;
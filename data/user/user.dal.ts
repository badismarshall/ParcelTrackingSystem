import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { UserDTO } from "./user.dto";

export const getUsers = async (
    {limit, offset, sortBy, sortDirection}: 
    {limit: number, offset: number, sortBy: string, sortDirection: "asc" | "desc"}
): Promise<UserDTO> => {
    try {
    const usersdata = await auth.api.listUsers({
          headers: await headers(),
          query: {
            limit,
            offset,
            sortBy,
            sortDirection,
          }
        })
        return {
            users: usersdata.users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
                role: user.role || "",
                banned: user.banned ?? false,
                createdAt: user.createdAt,
            })),
            options: {
                totalCount: usersdata.total,
                limit: limit,
                offset: offset,
            }
        }
    
        
    } catch (error) {
        console.error('Error getting users', error)
        return {users: [], options: {totalCount: 0, limit: 0, offset: 0}};
    }
}
import 'server-only'

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const HasPermissionUser = async (permissions: ("update" | "delete" | "create" | "list" | "set-role" | "ban" | "impersonate" | "set-password" | "get")[]) => {
    try {
    const hasAccess = await auth.api.userHasPermission({
        headers: await headers(),
        body: {
          permissions: {
            user: permissions,
          }
        }
    })
    return hasAccess;
    } catch (error) {
        console.error('Error checking permissions', error)
        return {error: error, success: false};
    }
}
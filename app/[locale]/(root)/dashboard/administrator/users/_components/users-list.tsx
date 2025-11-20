import { DataTable } from "@/components/shared/table/data-table"
import { HasPermissionUser } from "@/data/user/user-permision";
import { getUsers } from "@/data/user/user.dal";
import { redirect } from "next/navigation";
import { columns } from "./table/usersTableColumns"
import { DataTableToolbar } from "./table/users-data-table-toolbar"

export const UsersList = async () => {

    const hasAccesslistuser = await HasPermissionUser(["list"]);
    if (!hasAccesslistuser.success) return redirect("/dashboard/")


        const users = await getUsers({
            limit: 10, 
            offset: 0, 
            sortBy: "createdAt", 
            sortDirection: "desc"
      });


    return (
        <>
            <DataTable 
              data={users.users} 
              columns={columns} 
              DataTableToolbar={DataTableToolbar}
            />
        </>
    )
}
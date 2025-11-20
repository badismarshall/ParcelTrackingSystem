import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/data/user/user-auth"
import { UsersPrimaryButtons } from "./_components/users-primary-buttons"
import { Suspense } from "react"
import { UsersList } from "./_components/users-list"
import { LoaderOne } from "@/components/ui/loader"

export const metadata: Metadata = {
    title: "Utilisateurs",
    description: "Une liste de toutes les utilisateurs.",
}

export default async function UsersPage() {

    const user = await getCurrentUser();
    if (!user) {
      redirect(`/sign-in`);
    }

    return (
        <div className="h-full flex-1 flex-col space-y-8">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Content de te revoir!</h2>
              <p className="text-muted-foreground">
              Voici une liste de toutes les utilisateurs!
              </p>
            </div>
            <UsersPrimaryButtons />
          </div>
          <Suspense 
            fallback={    
              <div className="flex justify-center items-center h-full">
                <LoaderOne />
              </div>
            }>
            <UsersList />
          </Suspense>
        </div>
    )
  }
  
  
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChangePasswordForm } from "./_components/user-change-password"


export default function AccountPage() {

    return(
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Gérer Votre Compte! </h2>
                <p className="text-muted-foreground">
                    Changer votre mot de passe!
                </p>
              </div>
            </div>
          <div>
            <Card className="max-w-5xl pt-3">
              <CardContent>
                <ChangePasswordForm/>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
    )
}
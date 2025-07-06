import { Metadata } from "next"
import Link from "next/link"
import { ForgetPasswordUserForm } from "./_components/user-forgetpassword"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Parcels - Authentification",
  description: "Creéz un compte pour accéder à votre espace personnel.",
}

export default async function ForgetPasswordPage() {
  const t = await getTranslations("auth.forget_password");
  return (
    <>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
                <Button variant="outline" className="w-8 h-8 " size='icon'>
                    <Link href="/sign-in">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                </Button>
              <h1 className="text-2xl font-semibold tracking-tight">
                {t("title")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("description")}
              </p>
            </div>
            <ForgetPasswordUserForm />
          </div>
        </div>
    </>
  )
}
import { Metadata } from "next"
import { LoginUserAuthForm } from "./_components/user-signin-form"
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/data/user/user-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Parcelts - Authentification",
  description: "Creéz un compte pour accéder à votre espace personnel.",
}

export default async function SignInPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect(`/dashboard/administrator`);
  }
  
  const t = await getTranslations("auth.sign_in");
  return (
    <>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t("welcome")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("welcome_description")}
              </p>
            </div>
            <LoginUserAuthForm />
          </div>
        </div>
    </>
  )
}
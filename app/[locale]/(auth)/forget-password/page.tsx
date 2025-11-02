"use client"

import Link from "next/link"
import { ForgetPasswordUserForm } from "./_components/user-forgetpassword"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { UserResetPassword } from "./_components/user-resetpassword"



export default function ForgetPasswordPage() {
  const t = useTranslations("auth.forget_password");
  const tResetPassword = useTranslations("auth.reset_password");
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const error = searchParams.get('error')

  if (error == 'INVALID_TOKEN') {
    return (
      <>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-destructive">
                {t("invalid_link_title")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("invalid_link_description")}
              </p>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <Button asChild variant="outline" className="mt-4">
                <Link href="/forget-password">
                  {t("request_new_link")}
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link href="/sign-in">
                  {t("back_to_sign_in")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!token) {
    return (
      <>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                  <Button variant="outline" className="w-8 h-8 " size='icon' asChild> 
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
            {tResetPassword("title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {tResetPassword("description")}
          </p>
        </div>
        <UserResetPassword token={token as string} />
      </div>
    </div>
  </>
)
}
"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import Link from "next/link";

export default function PasswordResetSuccessPage() {
  const router = useRouter();
  const t =  useTranslations("auth.reset_password");
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-background rounded-md shadow-md p-8 max-w-md w-full text-center space-y-6">
        <h2 className="text-2xl font-semibold mb-2">{t("password_reset_successful")}</h2>
        <p className="text-muted-foreground mb-6">
          {t("password_reset_successful_description")}
        </p>
        <Link href="/sign-in" className="text-primary hover:text-primary/90 font-medium">
          {t("go_to_login")}
        </Link>
      </div>
    </div>
  );
}

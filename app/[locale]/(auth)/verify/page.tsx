import { useTranslations } from "next-intl";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

export default function VerifyPage() {
  const t = useTranslations("auth.verify");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <Icons.mail className="h-12 w-12 text-primary" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            {t("verification_instructions")}
          </h2>
        </div>
        <div className="mt-8 text-center">
          <Link href="/sign-in" className="text-primary hover:text-primary/90 font-medium">
            {t("back_to_sign_in")}
          </Link>
        </div>
      </div>
    </div>
  );
}

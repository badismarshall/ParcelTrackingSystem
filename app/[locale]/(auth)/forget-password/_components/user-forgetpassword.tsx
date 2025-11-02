"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useLocale, useTranslations } from "next-intl"
import { isRtlLang } from "rtl-detect"
import { 
  getForgetPasswordSchema,
  ForgetPasswordFormValues,
 } from "@/app/[locale]/(auth)/_lib/authform.schema"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { toast } from "sonner"

export function ForgetPasswordUserForm({ className, ...props }: UserAuthFormProps) {
  const t = useTranslations('auth.forget_password');

  const locale = useLocale()
  const isRTL = isRtlLang(locale)

  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const formForgetPassword = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(getForgetPasswordSchema(t)),
    defaultValues: {
      email: '',
    },
  })


 
  async function onSubmitForgetPassword(values: ForgetPasswordFormValues) {

    await authClient.forgetPassword({
      email: values.email,
      redirectTo: `/${locale}/forget-password`,
    },
    {
      onRequest: () => {
        setLoading(true)
      },
      onResponse: (ctx) => {
        setLoading(false)
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || t('failed_to_send_email'), {
          position: "bottom-center",
          duration: 3000,
        })
      },
      onSuccess: () => {
        router.push("/email-sent")
      },
    })
  }

  return (
    <>
    <Form {...formForgetPassword}>
      <form 
        onSubmit={formForgetPassword.handleSubmit(onSubmitForgetPassword)}
        className={cn("grid gap-6", className)}
      >
        <FormField
          control={formForgetPassword.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel className={`${isRTL ? "justify-end" : "justify-start"}`} htmlFor="email">
                {t("email")}
              </FormLabel>
              <FormControl>
                <Input
                    className={`${isRTL ? "placeholder:text-end" : "placeholder:text-start"}`}
                    id="email"
                    placeholder={t("email_placeholder")}
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={loading}
                    required
                    {...field}
                  />
              </FormControl>
              <FormMessage className={`${isRTL ? "text-end" : "text-start"}`}/>
            </FormItem>
          )}
        />
        <Button 
          disabled={loading} 
          type="submit"
        >
          {loading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            t("send_email")
          )}
        </Button>
      </form>
    </Form>
       <div className="relative">
         <div className="absolute inset-0 flex items-center">
           <span className="w-full border-t" />
         </div>
       </div>
    </>
  )
}
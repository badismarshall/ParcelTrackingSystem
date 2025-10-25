"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
// import { login } from "@/server/actions/userAuth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useLocale, useTranslations } from "next-intl"
import { isRtlLang } from "rtl-detect"
import { 
  getForgetPasswordSchema,
  ForgetPasswordFormValues,
  ResetPasswordFormValues,
  getResetPasswordSchema
 } from "@/app/[locale]/(auth)/_lib/authform.schema"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
import { useRouter, useSearchParams } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"

export function ForgetPasswordUserForm({ className, ...props }: UserAuthFormProps) {
  const t = useTranslations('auth.forget_password');
  const tResetPassword = useTranslations('auth.reset_password');
  const locale = useLocale()
  const isRTL = isRtlLang(locale)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const router = useRouter()
  const formForgetPassword = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(getForgetPasswordSchema(t)),
    defaultValues: {
      email: '',
    },
  })


  const formResetPassword = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(getResetPasswordSchema(t)),
    defaultValues: {
      password: '',
    },
  })
  const [loading, setLoading] = useState(false);

 
  async function onSubmitForgetPassword(values: ForgetPasswordFormValues) {

    setLoading(true)
    await authClient.forgetPassword({
      email: values.email,
      redirectTo: `/${locale}/forget-password`,
    })
   setLoading(false)
  }


  async function onSubmitResetPassword(values: ResetPasswordFormValues) {
    await authClient.resetPassword({
      newPassword: values.password,
      token: token as string,
    },
    {
      onRequest: () => {
        setLoading(true)
      },
      onResponse: () => {
        setLoading(false)
      },
      onError: (ctx) => {
      },
      onSuccess: () => {
        router.push(`/${locale}/sign-in`)
      },
    })
  }

 if (!token) {
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
                    {...field}
                  />
              </FormControl>
              <FormMessage className={`${isRTL ? "text-end" : "text-start"}`}/>
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {t("send_email")}
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
  return (
    <>
    <Form {...formResetPassword}>
      <form 
        onSubmit={formResetPassword.handleSubmit(onSubmitResetPassword)}
        className={cn("grid gap-6", className)}
      >
        <FormField
          control={formResetPassword.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel className={`${isRTL ? "justify-end" : "justify-start"}`} htmlFor="email">
                {tResetPassword("password")}
              </FormLabel>
              <FormControl>
                <Input
                    className={`${isRTL ? "placeholder:text-end" : "placeholder:text-start"}`}
                    id="password"
                    placeholder={tResetPassword("password_placeholder")}
                    type="password"
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                    disabled={loading}
                    {...field}
                  />
              </FormControl>
              <FormMessage className={`${isRTL ? "text-end" : "text-start"}`}/>
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {tResetPassword("reset_password")}
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
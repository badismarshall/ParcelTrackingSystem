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
import { useToast } from "@/hooks/use-toast"
import { useLocale, useTranslations } from "next-intl"
import { isRtlLang } from "rtl-detect"
import { 
  getForgetPasswordSchema,
  ForgetPasswordFormValues
 } from "@/app/[locale]/(auth)/_lib/authform.schema"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgetPasswordUserForm({ className, ...props }: UserAuthFormProps) {
  const t = useTranslations('auth.forget_password');
  const locale = useLocale()
  const isRTL = isRtlLang(locale)
  const form = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(getForgetPasswordSchema(t)),
    defaultValues: {
      email: '',
    },
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(values: ForgetPasswordFormValues) {

    setIsLoading(true)

    // const error = await login({
    //   email: values.email,
    //   password: values.password
    // })

    // setIsLoading(false)
    // if (error) {
    //   toast({
    //     title: "Login Failed",
    //     variant: "destructive",
    //   })
    // }
  }

  return (
    <>
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-6", className)}
      >
        <FormField
          control={form.control}
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
                    disabled={isLoading}
                    {...field}
                  />
              </FormControl>
              <FormMessage className={`${isRTL ? "text-end" : "text-start"}`}/>
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading && (
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
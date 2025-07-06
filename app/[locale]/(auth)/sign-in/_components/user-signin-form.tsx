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
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import {useLocale, useTranslations} from 'next-intl';
import { isRtlLang } from "rtl-detect"
import {
  SignInFormValues,
  getSignInSchema,
} from "@/app/[locale]/(auth)/_lib/authform.schema";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginUserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast()
  const t = useTranslations('auth.sign_in');
  const validationSignInMessage = useTranslations("auth.sign_in.validation");

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(getSignInSchema(validationSignInMessage)),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(values: SignInFormValues) {

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
  const locale = useLocale();
  const isRTL = isRtlLang(locale);
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
                {t('email')}
              </FormLabel>
              <FormControl>
                <Input
                    className={`${isRTL ? "placeholder:text-end" : "placeholder:text-start"}`}
                    id="email"
                    placeholder={t('email_placeholder')}
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className={`${isRTL ? "justify-end" : "justify-start"}`}>
                {t('password')}
              </FormLabel>
              <FormControl>
                <Input
                    className={`${isRTL ? "placeholder:text-end" : "placeholder:text-start"}`}
                    id="password"
                    placeholder={t('password_placeholder')}
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
              </FormControl>
              <FormMessage className={`${isRTL ? "text-end" : "text-start"}`}/>
              <FormDescription className="text-primary text-end">
                <Link
                  href="/forget-password"
                  className="text-primary"
                >
                  {t('forgot_password')}
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {t('sign_in')}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          {t('no_account')} {" "}
          <Link
                href="/sign-up"
                className="text-primary"
              >
                {t('sign_up')}
          </Link>
        </p>
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
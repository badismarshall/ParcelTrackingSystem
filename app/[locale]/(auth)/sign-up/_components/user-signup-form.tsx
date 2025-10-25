"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import Link from "next/link"
import {
  SignUpFormValues,
  getSignUpSchema,
} from "@/app/[locale]/(auth)/_lib/authform.schema";
import { useLocale, useTranslations } from "next-intl"
import { isRtlLang } from "rtl-detect"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/auth-client"


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpUserForm({ className, ...props }: UserAuthFormProps) {
  const t = useTranslations('auth.sign_up');
  const validationSignUpMessage = useTranslations("auth.sign_up.validation");



	const router = useRouter();
	const [loading, setLoading] = useState(false);


  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(getSignUpSchema(validationSignUpMessage)),
    defaultValues: {
      username: '', 
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  async function onSubmit(values: SignUpFormValues) {
      await signUp.email({
        email: values.email,
        password: values.password,
        name: values.username,
        fetchOptions: {
          onResponse: () => {
            setLoading(false);
          },
          onRequest: () => {
            setLoading(true);
          },
          onError: (ctx) => {
            toast.error(t('sign_up_failed'), {
              position: "bottom-center",
              duration: 3000,
            })
          },
          onSuccess: async () => {
            toast.success(t('sign_up_successful'), {
              position: "bottom-center",
              duration: 3000,
            })
            router.push("/dashboard/administrator");
          },
        },
      });

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
          name="username"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel className={`${isRTL ? "justify-end" : "justify-start"}`} htmlFor="username">
                {t("username")}
              </FormLabel>
              <FormControl>
                <Input
                    className={`${isRTL ? "placeholder:text-end" : "placeholder:text-start"}`}
                    id="username"
                    placeholder={t("username_placeholder")}
                    type="text"
                    autoCapitalize="none"
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
                    disabled={loading}
                    required
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
            <FormItem className="grid gap-1">
              <FormLabel className={`${isRTL ? "justify-end" : "justify-start"}`}>
                {t("password")}
              </FormLabel>
              <FormControl>
                <Input
                    className={`${isRTL ? "placeholder:text-end" : "placeholder:text-start"}`}
                    id="password"
                    placeholder={t("password_placeholder")}
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={loading}
                    required
                    {...field}
                  />
              </FormControl>
              <FormMessage className={`${isRTL ? "text-end" : "text-start"}`}/>
              <FormDescription className={`${isRTL ? "text-end" : "text-start"} text-gray-400 text-xs`}>
                {t("password_description")}
              </FormDescription> 
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel className={`${isRTL ? "justify-end" : "justify-start"}`}>
                {t("password_confirmation")}
              </FormLabel>
              <FormControl>
                <Input
                    className={`${isRTL ? "placeholder:text-end" : "placeholder:text-start"}`}
                    id="password_confirmation"
                    placeholder={t("password_confirmation_placeholder")}
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={loading}
                    required
                    {...field}
                    autoComplete="new-password"
                  />
              </FormControl> 
              <FormMessage className={`${isRTL ? "text-end" : "text-start"}`}/>
            </FormItem>
          )}
        />

        <Button 
          type="submit"
          disabled={loading}   
        >
          {loading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            t('sign_up')
          )}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
            {t("account_already_exists")} {" "}
          <Link
                href="/sign-in"
                className="text-primary"
              >
                 {t("sign_in")}
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
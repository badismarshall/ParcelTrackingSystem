"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { toast } from "sonner"
import {useLocale, useTranslations} from 'next-intl';
import { isRtlLang } from "rtl-detect"
import {
  SignInFormValues,
  getSignInSchema,
} from "@/app/[locale]/(auth)/_lib/authform.schema";
import { useState } from "react"
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginUserAuthForm({ className, ...props }: UserAuthFormProps) {
  const t = useTranslations('auth.sign_in');
  const validationSignInMessage = useTranslations("auth.sign_in.validation");

	const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const locale = useLocale();
  const isRTL = isRtlLang(locale);


  const form = useForm<SignInFormValues>({
    resolver: zodResolver(getSignInSchema(validationSignInMessage)),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: SignInFormValues) {
    await signIn.email(
      {
          email: values.email,
          password: values.password,
          rememberMe: true,
      },
      {
        onRequest: (ctx: any) => {
          setLoading(true);
        },
        onResponse: (ctx: any) => {
          setLoading(false);
        },
        onError: (ctx: any) => {
          toast.error(ctx.error.message || t('failed_to_login'), 
            { 
              position: "bottom-center",
              duration: 3000,
            }
          );
        },
        onSuccess: (ctx: any) => {
          toast.success(t('login_successful'), 
          {
            position: "bottom-center",
            duration: 3000,
          });
          router.push("/dashboard/administrator");
        },
      },
      );
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
                {t('email')}
              </FormLabel>
              <FormControl>
                <Input
                    className={`${isRTL ? "placeholder:text-end" : "placeholder:text-start"}`}
                    required
                    id="email"
                    placeholder={t('email_placeholder')}
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className={`${isRTL ? "justify-end" : "justify-start"}`}>
                {t('password')}
              </FormLabel>
              <FormControl>
                <div className="relative">
                <Input
                    className={`${isRTL ? "placeholder:text-end" : "placeholder:text-start"}`}
                    id="password"
                    placeholder={t('password_placeholder')}
                    type={showPassword ? "text" : "password"}
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={loading}
                    required
                    {...field}
                  />
                  <Button 
                    className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    size="icon"
                    type="button"
                    variant="ghost"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="size-4 text-muted-foreground" /> 
                        : 
                        <Eye className="size-4 text-muted-foreground" />}
                  </Button>
                </div>
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
        <Button 
          disabled={loading} 
          type="submit"
        >
          {loading ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            t('sign_in')
          )}
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
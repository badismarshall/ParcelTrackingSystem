"use client"

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getResetPasswordSchema, ResetPasswordFormValues } from "../../_lib/authform.schema"
import { authClient } from "@/lib/auth-client"
import { useLocale, useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { isRtlLang } from "rtl-detect"
import { useState } from "react"
import { Icons } from "@/components/ui/icons"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

interface UserResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
    token: string;
}


export function UserResetPassword({ className, token, ...props }: UserResetPasswordFormProps) {
    const tResetPassword = useTranslations('auth.reset_password');
    const locale = useLocale()
    const isRTL = isRtlLang(locale)
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);


    const formResetPassword = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(getResetPasswordSchema(tResetPassword)),
        defaultValues: {
          password: '',
        },
      })

    async function onSubmitResetPassword(values: ResetPasswordFormValues) {
        await authClient.resetPassword({
          newPassword: values.password,
          token: token,
        },
        {
          onRequest: () => {
            setLoading(true)
          },
          onResponse: () => {
            setLoading(false)
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || tResetPassword('failed_to_reset_password'), {
              position: "bottom-center",
              duration: 3000,
            })
          },
          onSuccess: () => {
            router.push("/password-reset")
          },
        })
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
                  <FormLabel className={`${isRTL ? "justify-end" : "justify-start"}`} htmlFor="newPassword">
                    {tResetPassword("password")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                    <Input
                        className={`${isRTL ? "placeholder:text-end" : "placeholder:text-start"}`}
                        id="newPassword"
                        placeholder={tResetPassword("password_placeholder")}
                        type={showPassword ? "text" : "password"}
                        autoCapitalize="none"
                        autoComplete="new-password"
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
'use client'

import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChangePasswordFormValues, getChangePasswordSchema } from "../../administrator/users/_lib/_lib/change-password.schema"
import { useLocale, useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { isRtlLang } from "rtl-detect"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CardFooter } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ChangePasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ChangePasswordForm({className, ...props} : ChangePasswordFormProps) {
    
    const validationChangePasswordMessage = useTranslations("")
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(getChangePasswordSchema(validationChangePasswordMessage)),
        defaultValues: {
          currentPassword: "",
          newPassword: "",
          password_confirmation: "",
        },
        mode: "onSubmit",
    })
  
    async function onSubmit(values: ChangePasswordFormValues) {

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
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-3" >
                    <FormField 
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mot de passe actuel</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="" type="password"/>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField 
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nouveau mot de passe</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="" type="password"/>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField 
                      control={form.control}
                      name="password_confirmation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="" type="password"/>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <CardFooter className="px-6 py-2 justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button type="submit">Confirmer</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Vous etes sur !</DialogTitle>
                            <DialogDescription>
                            Vous etes sur de vouloir changer votre mot de passe.                              
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button type="submit">Confirmer</Button>
                            <DialogClose asChild>
                                <Button variant="destructive">Cancel</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </form>
                </Form> 
    </>
  )
}


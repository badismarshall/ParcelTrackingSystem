"use client"

import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MailPlus, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { roles } from './table/users-data-table-datatest'
import { useTranslations } from 'next-intl'
import { 
    getInviteUserSchema, 
    InviteUserFormValues 
} from '@/app/[locale]/(root)/dashboard/administrator/users/_lib/invite-user.schemas'

export function UsersInviteDialog() {
  const t = useTranslations('users.invite')


  const form = useForm<InviteUserFormValues>({
    resolver: zodResolver(getInviteUserSchema(t)),
    defaultValues: { 
        email: '', 
        role: '', 
        desc: '' 
    },
  })

  const onSubmit = (values: InviteUserFormValues) => {
    // form.reset()

  }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button
                variant='outline'
                className='space-x-1'
            >
                <MailPlus size={18} /> {t('add_user')}
            </Button>
        </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-start'>
          <DialogTitle className='flex items-center gap-2'>
            <MailPlus /> {t('add_user')}
          </DialogTitle>
          <DialogDescription>
            {t('add_user_description')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='user-invite-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('add_user_email')}</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder={t('add_user_email_placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('add_user_role')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder={t('add_user_role_placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='desc'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>{t('add_user_description')}</FormLabel>
                  <FormControl>
                    <Textarea
                      className='resize-none'
                      placeholder={t('add_user_description_placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className='gap-y-2'>
          <DialogClose asChild>
            <Button variant='outline'>{t('cancel')}</Button>
          </DialogClose>
          <Button type='submit' form='user-invite-form'>
            <Send /> {t('invite')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
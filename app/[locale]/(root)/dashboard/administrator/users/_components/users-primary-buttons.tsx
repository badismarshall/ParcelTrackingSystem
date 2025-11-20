"use client"

import { UsersInviteDialog } from './users-invite-dialog'
import { UsersAddDialog } from './users-add-dialog'

export function UsersPrimaryButtons() {
  return (
    <div className='flex gap-2'>
      <UsersInviteDialog />
      <UsersAddDialog />
    </div>
  )
}
import { Shield, ShieldCheck, ShieldX, User, UserCheck, Ban } from "lucide-react"

export const roles = [
  {
    value: "administrator",
    label: "Administrator",
    icon: Shield,
    color: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-950 dark:text-purple-300",
  },
  {
    value: "customer",
    label: "Customer",
    icon: User,
    color: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    value: "transporter",
    label: "Transporter",
    icon: UserCheck,
    color: "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
  },
]

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: ShieldCheck,
    color: "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
  },
  {
    value: "banned",
    label: "Banned",
    icon: Ban,
    color: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
  },
  {
    value: "unverified",
    label: "Unverified",
    icon: ShieldX,
    color: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-300",
  },
]


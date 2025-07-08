
import { AlertCircle, Package, PackageCheck, PackageSearch, PackageX, Truck } from "lucide-react"

  export const statuses = [
    {
      value: "ready_to_ship",
      label: "Ready to Ship",
      icon: PackageSearch,
      color: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-300",
    },
    {
      value: "shipped",
      label: "Shipped",
      icon: Package,
      color: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
    },  
    {
      value: "delivered",
      label: "Delivered",
      icon: PackageCheck,
      color: "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      icon: PackageX,
      color: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
    },
    {
        value: "refunded",
        label: "Refunded",
        icon: PackageX,
        color: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
    },
    {
        value: "in_transit",
        label: "In Transit",
        icon: Truck,
        color: "border-gray-200 bg-secondary text-secondary-foreground dark:border-gray-900 dark:bg-gray-950 dark:text-gray-300",
    },
    {
        value: "alerted",
        label: "Alerted",
        icon: AlertCircle,
        color: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300",
    },
  ]

  // export const statuses = [
  //   {
  //     value: "ready_to_ship",
  //     label: "Ready to Ship",
  //     icon: PackageSearch,
  //     color: "bg-yellow-500",
  //   },
  //   {
  //     value: "shipped",
  //     label: "Shipped",
  //     icon: Package,
  //     color: "bg-blue-500",
  //   },  
  //   {
  //     value: "delivered",
  //     label: "Delivered",
  //     icon: PackageCheck,
  //     color: "bg-green-500",
  //   },
  //   {
  //     value: "cancelled",
  //     label: "Cancelled",
  //     icon: PackageX,
  //     color: "bg-red-500",
  //   },
  //   {
  //       value: "refunded",
  //       label: "Refunded",
  //       icon: PackageX,
  //       color: "bg-red-500",
  //   },
  //   {
  //       value: "in_transit",
  //       label: "In Transit",
  //       icon: Truck,
  //       color: "bg-gray-500",
  //   },
  //   {
  //       value: "alerted",
  //       label: "Alerted",
  //       icon: AlertCircle,
  //       color: "bg-orange-500",
  //   },
  // ]
  
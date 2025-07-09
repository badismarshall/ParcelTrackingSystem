import { Box, CreditCard, Gift, Home, Settings, ShoppingBag } from "lucide-react"


  export const customerSidebarItemsGeneral = [
    {
      title: 'Tableau de bord',
      url: '/dashboard/customer',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Commandes',
      url: '/dashboard/customer/orders',
      icon: ShoppingBag,
      isActive: false,
    },
    {
      title: 'Stock',
      url: '/dashboard/customer/stock',
      icon: Box,
      isActive: false,
    },
    {
      title: 'Paiements',
      url: '/dashboard/customer/payments',
      icon: CreditCard,
      isActive: false,
    },
    {
      title: 'Récompenses',
      url: '/dashboard/customer/rewards',
      icon: Gift,
      isActive: false,
    },
  ]

  export const customerSidebarsItemSetting= [
    {
      title: 'Paramètre',
      url: '/dashboard/customer/settings',
      icon: Settings,
      isActive: false,
    }
  ]
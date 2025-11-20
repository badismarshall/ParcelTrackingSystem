import { Box, Building2, CreditCard, Gift, Home, Settings, ShoppingBag, User, Webhook } from "lucide-react"


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
      title: 'Brands',
      url: '/dashboard/customer/brands',
      icon: Building2,
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
      title: 'Users',
      url: '/dashboard/customer/users',
      icon: User,
      isActive: false,
    },
    {
      title: 'Webhook',
      url: '/dashboard/customer/webhook',
      icon: Webhook,
      isActive: false,
    }
  ]
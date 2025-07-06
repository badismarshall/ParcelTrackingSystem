import { Home, Settings, TicketPercent, ChartNoAxesCombined, Users, BringToFront, HandCoins, TicketsPlane, CircleHelp, UserCog } from "lucide-react"

export const adminSidebarItemsGeneralSetting = [
    {
      title: 'Tableau de bord',
      url: '/dashboard/administrator',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Paramètres',
      url: '/dashboard/administrator/settings',
      icon: Settings,
      isActive: false,
      items : [
        {
          title: 'SEO, Layout',
          url: '/dashboard/administrator/settings/layout',
        },
        {
          title: 'Menu',
          url: '/dashboard/administrator/settings/menu',
        },
        {
          title: 'Page d\'accueil',
          url: '/dashboard/administrator/settings/homepage-hero',
        },
        {
          title: 'Paiements et frais',
          url: '/dashboard/administrator/settings/payments',
        },
        {
          title: 'Caisse',
          url: '/dashboard/administrator/settings/checkout',
        },
        {
          title: 'Recaptcha',
          url: '/dashboard/administrator/settings/recaptcha',
        },
        {
          title: 'Cartes',
          url: '/dashboard/administrator/settings/maps',
        },
        {
          title: 'Connexion sociale',
          url: '/dashboard/administrator/settings/social-login',
        },
        {
          title: 'Page de liste des événements',
          url: '/dashboard/administrator/settings/events-list-page',
        },
      ]
    },
    {
      title: 'Événements',
      url: '/dashboard/administrator/events',
      icon: TicketPercent,
      isActive: false,
      items : [
        {
          title: 'Gérer les événements',
          url: '/dashboard/administrator/manage-events',
        },
        {
          title: 'Catégories',
          url: '/dashboard/administrator/manage-categories',
        },
        {
          title: 'Langues',
          url: '/dashboard/administrator/events/languages',
        },
        {
          title: 'Publics',
          url: '/dashboard/administrator/events/audiences',
        }
      ]
    },
    {
      title: 'Statistique',
      url: '/dashboard/administrator/analytics',
      icon: ChartNoAxesCombined,
      isActive: false,
    },
    {
      title: 'Utilisateurs',
      url: '/dashboard/administrator/users',
      icon: Users,
      isActive: false,
    },
    {
      title: 'Commandes',
      url: '/dashboard/administrator/orders',
      icon: BringToFront,
      isActive: false,
    },
    {
      title: 'Demandes de paiement',
      url: '/dashboard/administrator/payment-requests',
      icon: HandCoins,
      isActive: false,
    },
    {
      title: 'Rapports',
      url: '/dashboard/administrator/reports',
      icon: TicketsPlane,
      isActive: false,
    },
    {
      title: 'Centre d\'aide',
      url: '/dashboard/administrator/help-center',
      icon: CircleHelp,
      isActive: false,
      items: [
        {
          title: 'Articles',
          url: '/dashboard/administrator/help-center/articles',
        },
        {
          title: 'Catégories',
          url: '/dashboard/administrator/help-center/categories',
        }
      ]
    },
    {
      title: 'Compte',
      url: '/dashboard/profile',
      icon: UserCog,
      isActive: false,
      items: [
        {
          title: 'Changer le mot de passe',
          url: '/dashboard/change-password',
        },
      ]
    }
  ]

  export const customerSidebarItemsGeneralSetting = [
    {
      title: 'Tableau de bord',
      url: '/dashboard/customer',
      icon: Home,
      isActive: true,
    }
  ]
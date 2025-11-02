import { Monitor, Bell, Palette, Wrench, UserCog } from 'lucide-react'


export const settingsSideBarItems = [
    {
      title: 'Profile',
      href: '/dashboard/settings/',
      icon: <UserCog size={18} />,
    },
    {
      title: 'Account',
      href: '/dashboard/settings/account',
      icon: <Wrench size={18} />,
    },
    {
      title: 'Appearance',
      href: '/dashboard/settings/appearance',
      icon: <Palette size={18} />,
    },
    {
      title: 'Notifications',
      href: '/dashboard/settings/notifications',
      icon: <Bell size={18} />,
    },
    {
      title: 'Display',
      href: '/dashboard/settings/display',
      icon: <Monitor size={18} />,
    },
  ]
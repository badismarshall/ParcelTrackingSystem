'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { AppSidebar } from "../../_components/sideBar/app-sidebar";
import { customerSidebarItemsGeneral, customerSidebarsItemSetting } from "../_constants/sidebaritems";
import { NavMain } from "../../_components/sideBar/nav-main";
import { NavUser } from "../../_components/sideBar/nav-user";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { NotificationCenter } from "@/components/notification-center";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Icons } from "@/components/ui/icons";
import { useSidebar } from "@/components/ui/sidebar"

// --- Simulated Backend API ---
let masterNotifications: any[] = [ /* ... initial notifications ... */ ];
let nextId = masterNotifications.length + 1;
const fetchNotifications = async () => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return [...masterNotifications];
};
const markAsRead = async (id: string) => {
  masterNotifications = masterNotifications.map(n => n.id === id ? { ...n, isRead: true } : n);
};
const markAllAsRead = async () => {
  masterNotifications = masterNotifications.map(n => ({ ...n, isRead: true }));
};
const deleteNotification = async (id: string) => {
  masterNotifications = masterNotifications.filter(n => n.id !== id);
};
// --- End of Simulated API ---

export default function CustomerSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
const queryClient = new QueryClient()
const { open } = useSidebar()
    const user = {
        name: "Badis",
        email: "me_badis@yahoo.fr",
        avatar: "CN",
    }

      // Simulate real-time updates by adding a new notification every 10 seconds
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //     const newNotification = {
    //         id: String(nextId++),
    //         title: 'New Real-time Update!',
    //         message: 'This notification was added automatically.',
    //         isRead: false,
    //         createdAt: new Date().toISOString(),
    //         priority: 'medium',
    //     };
    //     masterNotifications.unshift(newNotification);
    //     // Invalidate the query to trigger a refetch and show the new notification
    //     queryClient.invalidateQueries({ queryKey: ['notifications'] });
    //     }, 10000);
    //     return () => clearInterval(interval);
    // }, [queryClient]);
    
    return (
        <QueryClientProvider client={queryClient}>
            <AppSidebar {...props}>
                <SidebarHeader>
                    <div className="mt-2 mb-2 items-center justify-center flex gap-2">
                        <div className="pl-2.5">
                            <Icons.logo className="w-4 h-4" />
                        </div>
                        {open && (
                            <>
                                <span className="text-lg font-bold">Café Noir</span>
                            </>
                        )}
                    </div>

                    <SidebarMenu>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <a href="/dashboard/customer/orders/new" className={cn('transition-colors hover:text-foreground bg-primary')}>
                                            {<Plus/>}    
                                            <span>Ajouter commande</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </TooltipTrigger>
                            <TooltipContent side="right">Ajouter commande</TooltipContent>
                        </Tooltip>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <NavMain items={customerSidebarItemsGeneral} groupeLabel="Générale"/>
                        <NavMain items={customerSidebarsItemSetting} groupeLabel="Paramètres généraux"/>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <NotificationCenter
                        variant="popover"
                        fetchNotifications={fetchNotifications}
                        onMarkAsRead={markAsRead}
                        onMarkAllAsRead={markAllAsRead}
                        onDeleteNotification={deleteNotification}
                        enableRealTimeUpdates={true}
                        updateInterval={15000} // Refetch every 15 seconds
                        enableBrowserNotifications={true}
                    />
                    <NavUser user={user}/>
                </SidebarFooter>
            </AppSidebar>
        </QueryClientProvider>
    )
}
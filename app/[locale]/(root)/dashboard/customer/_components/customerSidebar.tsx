'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { AppSidebar } from "../../_components/sideBar/app-sidebar";
import { customerSidebarItemsGeneral, customerSidebarsItemSetting } from "../_constants/sidebaritems";
import { NavMain } from "../../_components/sideBar/nav-main";
import { NavUser } from "../../_components/sideBar/nav-user";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function CustomerSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = {
        name: "Badis",
        email: "me_badis@yahoo.fr",
        avatar: "CN",
    }
    
    return (
        <AppSidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="#" className={cn('transition-colors hover:text-foreground bg-primary')}>
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
                <NavUser user={user}/>
            </SidebarFooter>
        </AppSidebar>
    )
}
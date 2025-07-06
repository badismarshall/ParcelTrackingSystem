'use client'

import { SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { AppSidebar } from "../../_components/sideBar/app-sidebar";
import { adminSidebarItemsGeneralSetting } from "../_constants/sidebaritems";
import { NavMain } from "../../_components/sideBar/nav-main";
import {
    Sidebar,
  } from "@/components/ui/sidebar"

export default function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <AppSidebar {...props}>
            <SidebarContent>
                    <SidebarMenu>
                        <NavMain items={adminSidebarItemsGeneralSetting} groupeLabel="Paramètres généraux"/>
                    </SidebarMenu>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                {/* <NavUser user={user}/> */}
            </SidebarFooter>
        </AppSidebar>
    )
}

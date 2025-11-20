import { AppSidebar } from '../_components/sideBar/app-sidebar'
import React from 'react'
import { SettingsSideBar } from './_components/settings-side-bar';
import  { settingsSideBarItems }  from './_constants/settings-side-bar-items';


const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <>
        <SettingsSideBar
          sidebarNavItems={settingsSideBarItems}
          title='Paramètres'
          description='Gérez les paramètres de vos paramètres généraux.'
          >
            {children}
        </SettingsSideBar> 
        
    </>
  )
}

export default layout
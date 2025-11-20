import Image from 'next/image'
import React from 'react'
import { SidebarNav } from './side-bar-nav';
import type { JSX } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type SidebarNavProps = React.HTMLAttributes<HTMLElement> & {
    items: {
      href: string
      title: string
      icon: JSX.Element
    }[]
  }

export const SettingsSideBar = ({
    children,
    sidebarNavItems,
    title,
    description
  }: Readonly<{
    children: React.ReactNode;
    sidebarNavItems: SidebarNavProps['items'];
    title: string;
    description: string
  }>) => {
  return (
    <>
        <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">
              {description}
            </p>
        </div>
        {/* <SettingsTabNavigation /> */}
        
        <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12 mt-2'>
          {/* <aside className='top-0 lg:sticky lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside> */}
          <Tabs defaultValue={sidebarNavItems[0].href} className="w-full">
          <ScrollArea
            orientation='horizontal'
            type='always'
          >
            <TabsList className="h-auto rounded-none border-b bg-transparent p-0 w-full justify-start">
                {
                  sidebarNavItems.map((item) => (
                    <TabsTrigger 
                      asChild
                      key={item.href} 
                      value={item.href}
                      className="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
                    >
                      <Link href={item.href} className="flex items-center gap-2 flex-row">
                        <span className='scale-125'>{item.icon}</span>
                        <span className='text-md'>{item.title}</span>
                      </Link>
                    </TabsTrigger>
                  ))
                }
              </TabsList>
              <ScrollBar orientation="horizontal" />
              </ScrollArea>
              {
                sidebarNavItems.map((item) => (
                  <TabsContent 
                    key={item.href} 
                    value={item.href}
                    className="flex w-full overflow-y-hidden p-1 mt-4"
                  >
                    {children}
                  </TabsContent>
                ))
              }
          </Tabs>
            {/* <div className="flex w-full overflow-y-hidden p-1">
                {children}
            </div> */}
        </div>
       
      </>
  )
}
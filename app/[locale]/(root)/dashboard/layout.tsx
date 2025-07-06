import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers"
import AdminSidebar from "./administrator/_components/adminSidebar";
import CustomerSidebar from "./customer/_components/customerSidebar";
import HeaderInsetSidebar from "./_components/sideBar/header-inset-sidebare";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    const userrole: string = 'customer';

  return (
    <>	
      <SidebarProvider defaultOpen={defaultOpen}>
        {userrole === 'admin' && <AdminSidebar />}
        {userrole === 'customer' && <CustomerSidebar />}
        <SidebarInset className="px-2 pt-2">
            <HeaderInsetSidebar/>
            {/* <SidebarTrigger />	 */}
            <div className="gap-4 mt-7 sm:mt-2 sm:pt-2 md:gap-8 p-4 px-4 lg:px-6">
                {children}
            </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

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
            <div className="@container/main flex flex-1 flex-col gap-2 p-8 md:flex">
                {children}
            </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

import { DataTable } from "@/components/shared/table/data-table";
import { ChartAreaInteractive } from "../_components/dashboardTestComponets/ChartAreaInteractive";
import { SectionCards } from "../_components/dashboardTestComponets/section-cards";
import { getCurrentUser } from "@/data/user/user-auth";
import { redirect } from "next/navigation";

export default async function AdministratorDashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/sign-in`);
  }
  
    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        {/* <DataTable data={data} /> */}
    </div>
    )
  }
  
  
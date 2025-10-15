import { toast } from "sonner";
import { errorFetchingDashboardStats } from "../ErrorMessages/errorMessages";
import  {getDashboardStatsCall } from "../Services/dashboard.service";
import { getDashboardProps, useDashboardInterface } from "../interfaces/DashboardInterfaces";

export function useDashboard():useDashboardInterface{

   const getDashboardStats = async({updateData}:getDashboardProps)=>{  
    const response  = await getDashboardStatsCall()
    
       const result = await response.data
        if(response.status==200){
            result.Stats.map((data)=>{
              updateData(data.type,data.value)
            }) 

        }else{
    
            toast.error(errorFetchingDashboardStats.title,{
                description:errorFetchingDashboardStats.description
            })

        }
   }

    return {getDashboardStats}
}
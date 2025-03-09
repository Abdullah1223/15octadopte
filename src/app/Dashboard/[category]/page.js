'use client'
import Jobs from "@/app/DashboardComponents/Jobs";
import Layout from "../Layout";
import Notifications from "@/app/DashboardComponents/Notifications";
import Favorites from "@/app/DashboardComponents/Favorites";
import Messages from "@/app/DashboardComponents/Message";
import Dashboard from "../page";
import { useParams } from "next/navigation";



const RenderDetails = (category)=>{
         switch(category){
            case'jobs':
            return <Jobs></Jobs>
            
            case 'notifications':
                return <Notifications></Notifications>
            case'favorites':
            return <Favorites></Favorites>
            case 'messages':
                return <Messages></Messages>
            default :
            return <Dashboard></Dashboard>    
         }
}
export default function DashboardCategory(){
   const params = useParams()
   const category = params.category;
     console.log(category)
    return(
        <Layout>
       {RenderDetails(category)}
        </Layout>
    )
}
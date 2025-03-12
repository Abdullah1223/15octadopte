'use client'
import Jobs from "@/app/DashboardComponents/Jobs";
import Layout from "../Layout";
import Notifications from "@/app/DashboardComponents/Notifications";
import Favorites from "@/app/DashboardComponents/Favorites";
import Messages from "@/app/DashboardComponents/Message";
import Dashboard from "../page";
import { useParams } from "next/navigation";
import BarberProfile from "@/app/DashboardComponents/ProfileComponent";
import CandidateView from "@/app/DashboardComponents/CvCandidateView";



const RenderDetails = (category)=>{
         switch(category){
            case'jobs':
            return <Jobs></Jobs>
            case"cv":
            return <div className="px-12 py-12">
                 <CandidateView></CandidateView>
            </div>
            case 'notifications':
                return <Notifications></Notifications>
            case'favorites':
            return <Favorites></Favorites>
            case 'messages':
                return <Messages></Messages>
            default :
            return <BarberProfile></BarberProfile>    
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
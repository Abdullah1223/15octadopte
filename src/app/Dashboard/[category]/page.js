
import Jobs from "../../DashboardComponents/Jobs";
import Layout from "../Layout";
import Notifications from "../../DashboardComponents/Notifications";
import Favorites from "../../DashboardComponents/Favorites";
import Messages from "../../DashboardComponents/Message";
import Dashboard from "../page";
import BarberProfile from "../../DashboardComponents/ProfileComponent";
import CandidateView from "../../DashboardComponents/CvCandidateView";
import CreateJobComponent from "../../DashboardComponents/createJobs";
import MyJobsListing from "../../DashboardComponents/jobListings";
import FavoritesJobs from "../../DashboardComponents/Favorites";
import FavoriteCv from "../../DashboardComponents/FavoriteCv";
import AdManagementSystem from "../../DashboardComponents/AdsManagement";
import AdsManagementWrapper from "../../DashboardComponents/AdsManagementWrapper";
import AdsMetricsWrapper from "../../DashboardComponents/AdsMetricsWrapper";
import MainNotifications from "../../DashboardComponents/MainNotification";
const RenderDetails = (category)=>{
   
         switch(category){
            case'jobs':
            return <Jobs></Jobs>
            case'createJobs':
            return <CreateJobComponent></CreateJobComponent>
            case'jobListings':
            return <MyJobsListing></MyJobsListing>
            case"cv":
            return <div className="px-12 py-12">
                 <CandidateView></CandidateView>
            </div>
            case 'notifications':
                return <MainNotifications></MainNotifications>
            case'favoritesJobs':
            return <FavoritesJobs></FavoritesJobs>
            case'favoritesCv':
            return <FavoriteCv></FavoriteCv>
             case 'messages':
                return null;
                // return <Messages category={category}></Messages>
            case 'ads':
              return  <AdsManagementWrapper></AdsManagementWrapper>
            case "adsMetrics":
                return <AdsMetricsWrapper></AdsMetricsWrapper>     
            default :
            return <BarberProfile></BarberProfile>    
         }
}
async function DashboardCategory ({params}){
        // const params = useParams()
        // const category = params.category;
        const {category} =  await params
        console.log(category)
    
    return(
        <Layout>
       {RenderDetails(category)}
        </Layout>
    )
}
export default DashboardCategory
import { cookies } from "next/headers";
import AdManagementSystem from "./AdsManagement";

const AdsManagementWrapper = async()=>{
 
   const cookieStore =  cookies();
   const token =   cookieStore.get('token');
    const response = await fetch(`${process.env.AD_SERVICE}/Dashboard/fetch/BannerAds`,{
        headers:{
            'Content-Type':"application/json",
            Cookie:`token=${token?.value}`
        },
        method:"POST",
        body:JSON.stringify({prevDocIds:null,lastCursorId:null}),
        credentials:'include'
    })
   
    const result = await response.json()
    console.log(result)
    let bannerAds
    if(response.status==200){
         bannerAds=result.promotedAds
    }
    return <AdManagementSystem bannerAds={bannerAds}></AdManagementSystem>

}

export default AdsManagementWrapper;
import axios, { AxiosResponse } from "axios"
import { interceptorAssignment } from "../lib/authState"

const AdUrl = process.env.NEXT_PUBLIC_AD_SERVICE    
export const adInstance = axios.create({
    baseURL:AdUrl,
    withCredentials:true
})


interceptorAssignment(adInstance)

export const fetchJobAds = async():Promise<AxiosResponse>=>{
 
     try{

        const response= await adInstance.get(`/fetch/job/ads`,
          // {
          //   headers:{
          //     'Content-Type':"application/json"
          //   },
          //   method:"GET",
          //   credentials:"include"
          // }
        )
          console.log('response',response)
         return response; 

     }catch(err){
        console.log('error response' , err)
        throw Error("Error Fetching Job Ads")
     }
}




// components/AdsData.js
// import { cookies } from "next/headers";

// export default async function getAdsData() {
//  try{
//   const cookieStore =await cookies();
//   const token =  cookieStore.get('token');
//   const res = await fetch(`https://adopte.gotdns.ch/api8/fetch/banner/ads`, {
//     headers: {
//       'Content-Type': "Application/json",
//       Cookie: `token=${token?.value}`
//     },
//     method: "GET",
//     credentials: "include",
//   });
  
//   const data = await res.json();
//   return {
//     topBanner: data?.Ads?.['top banner'] ?? undefined,
//     middleBanner: data?.Ads?.['middle banner'] ?? undefined,
//     lastBanner: data?.Ads?.['lower banner'] ?? undefined
//   };
//  }catch(err){
//   throw Error('Error At Fetching Ads Data')
//  }
// }
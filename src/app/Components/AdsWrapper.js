// // components/AdsWrapper.js

// import { toast } from "sonner";
// import getAdsData from "../Services/ads.service";
// import { errorFetchingAds } from "../ErrorMessages/errorMessages";

// export default async function AdsWrapper({ children }) {
//   let adsData;
//   try{
//     const adsData = await getAdsData();
//     // This returns the ads data to be used by children
  
    
//     return children(adsData);
//   }catch(err){
//     return children(adsData)
//     // throw Error('Error Fetching Ads Data')
    
//   }
// }
import { cookies } from "next/headers";
import Homepage from "./Homepage";
export default async function   Home () {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const res = await fetch(`https://adopte.gotdns.ch/api8/fetch/banner/ads`,{
    headers:{
      'Content-Type':"Application/json",
      Cookie:`token=${token?.value}`
    },
    method:"GET",
    credentials:"include",
  })
  
   const data = await res.json()
   {console.log('loaded first')}
 
  return (
   
    <Homepage topBanner={data?.Ads?.['top banner'] ?? undefined} middleBanner={data?.Ads?.['middle banner'] ?? undefined} lastBanner={data?.Ads?.['lower banner'] ?? undefined}></Homepage>

  );
}



// import { Suspense } from 'react';
// import Homepage from './Homepage';
// import AdsWrapper from './Components/AdsWrapper';

// function HomepageWithoutAds() {
//   console.log('Fallback homepage')
//   return (
//     <Homepage 
//       topBanner={undefined}
//       middleBanner={undefined}
//       lastBanner={undefined}
//     />
//   );
// }

// export default function Home() {
//   return (
//     <Suspense fallback={<HomepageWithoutAds />}>
//       <AdsWrapper>
//         {(adsData) => (
//           <Homepage 
//             topBanner={adsData?.topBanner}
//             middleBanner={adsData?.middleBanner} 
//             lastBanner={adsData?.lastBanner}
//           />
//         )}
//       </AdsWrapper>
//     </Suspense>
//   );
// }
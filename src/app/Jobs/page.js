import HairdressingJobPortal from "../Components/FetchJobs";
import { fetchJobAds } from "../Services/ads.service";
import { fetchingJobs } from "../Services/jobs.service";



export const metadata = {
  title: "Adopte un coiffeur",
  description: "Browse the latest barber and hairdressing jobs across France. Find full-time, part-time, and freelance opportunities in salons and barber shops. Apply today.",
  keywords: ["barber jobs France", "hairdressing jobs", "salon jobs", "freelance barber", "hairdresser opportunities"],
  openGraph: {
    title: "Adopte un coiffeur",
    description: "Browse the latest barber and hairdressing jobs across France. Find full-time, part-time, and freelance opportunities in salons and barber shops. Apply today.",
    url: "https://adopteuncoiffeur.fr/Jobs", // replace with your page URL
    siteName: "Adopte un coiffeur",
    images: [
      {
        url: "https://adopteuncoiffeur.fr/JobsOg.webp", // replace with actual OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adopte un coiffeur",
    description: "Browse the latest barber and hairdressing jobs across France. Find full-time, part-time, and freelance opportunities in salons and barber shops. Apply today.",
    images: ["https://yourwebsite.com/og-image.jpg"], // same as OG image
  },
};

export default async function JobsPage(){
  let jobs = []
  let propCursorRegular;
  let propCursorPromoted;
  let propPrevDocsRegular;
  let  propPrevDocsPromoted;
  let pageRefValue=true
  let isAdError = false;
  let isJobError = false; 
  let propAds = []
  try{

     const response = await fetchJobAds()
      if(response.status==200){
        const result = await response.data
        propAds = result?.Ads
        isAdError=false;
      }else{
       console.log('this error worked')
       isAdError=true 
       propAds=null; 
      } 
    
  }catch(err){
       isAdError=true
       propAds=null
  }

  try{
    const response = await fetchingJobs(null,null,null,null)
    console.log('job ran',response)
    // console.log('fetchib JObs response on call',response)
    if(response.status==200){
      console.log('job response sucessfull',response)
      const result = await response.json()
      
       jobs = result.jobs;
       propCursorRegular=result.lastCursorRegular
       propCursorPromoted=result.lastCursorPromoted,
       propPrevDocsRegular = result.prevDocsRegularIds
       propPrevDocsPromoted = result.prevDocsPromotedIds
       pageRefValue=false  
    }else{
      isJobError=true
    }
  }catch(err){
    console.log('job error came',err)
    console.log('err' , err)
    jobs = [];
    propCursorRegular=null
    propCursorPromoted=null,
    propPrevDocsRegular = null
    propPrevDocsPromoted = null
    isJobError=true  


  }
  
     return <HairdressingJobPortal propjobs={jobs} propCursorRegular={propCursorRegular} propCursorPromoted={propCursorPromoted} propPrevDocsRegular={propPrevDocsRegular} propPrevDocsPromoted={propPrevDocsPromoted} pageRefValue={pageRefValue} isAdError={isAdError} isJobError={isJobError} propAds={propAds} ></HairdressingJobPortal>
   

}


import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import UspSection from "./Components/UspSection";
import ValueSection from "./Components/ValueSection";
import OurServicesComponentLg from "./Components/OurServicesComponentLg";
import OurServicesComponentSm from "./Components/OurServicesComponentSm";
import Testomonial from "./Components/Testomonial";

import JobSection from "./Components/JobSection";
import Footer from "./Components/Footer";
import ExploreAllJobsBtn from "./Components/ExploreAllJobsBtn";
import AdsVisibility from "./Components/AdsVisibility";

export default function Homepage({topBanner,middleBanner,lastBanner}) {
  
  return (
    <div className="bg-white ">
    <Navbar></Navbar>
     <HeroSection></HeroSection>
     {topBanner&&<AdsVisibility visibility={'hidden lg:block'} adsContent={topBanner}></AdsVisibility>}
    
     <UspSection></UspSection>
     <ValueSection></ValueSection>
     {middleBanner&&<AdsVisibility visibility={'hidden lg:block'} adsContent={middleBanner}></AdsVisibility>}
    {topBanner && <AdsVisibility visibility={'block lg:hidden'} adsContent={topBanner}></AdsVisibility>}
   <JobSection></JobSection>
 <ExploreAllJobsBtn></ExploreAllJobsBtn>

{middleBanner&& <AdsVisibility visibility={' md:block lg:hidden hidden'} adsContent={middleBanner}></AdsVisibility> }
{middleBanner&& <AdsVisibility visibility={'block md:hidden'} adsContent={middleBanner}></AdsVisibility> }
     <OurServicesComponentLg></OurServicesComponentLg>
     <OurServicesComponentSm></OurServicesComponentSm>

    {lastBanner&& <AdsVisibility visibility={'block'} adsContent={lastBanner}></AdsVisibility>} 


    <Testomonial></Testomonial>
      
    <Footer></Footer>
 
    </div>
  );
}




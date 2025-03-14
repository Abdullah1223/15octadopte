'use client';
import Image from "next/image";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import UspSection from "./Components/UspSection";
import ValueSection from "./Components/ValueSection";


// Import Swiper styles
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import OurServicesComponentLg from "./Components/OurServicesComponentLg";
import OurServicesComponentSm from "./Components/OurServicesComponentSm";
import TestomonialSliderBox from "./Components/TestomonialSliderBox";
import {Swiper,SwiperSlide} from "swiper/react";
import Testomonial from "./Components/Testomonial";
import JobCardComponent from "./Components/JobCardComponent";
import JobSection from "./Components/JobSection";
import Footer from "./Components/Footer";
import { useTranslation } from "./Context/TranslationContext.";

export default function Home() {
    const { translate, setLanguage, language } = useTranslation();
  const TrendingCategories=[
    {
    Categoryname:translate('unisex')
    },
    {
      Categoryname:translate('female_barber')
    },
    {
      Categoryname:translate('male_only')
    },

]
  return (
    <div className="bg-white ">
    <Navbar></Navbar>
     <HeroSection></HeroSection>
     
     <UspSection></UspSection>
     <ValueSection></ValueSection>
     <div className="w-full h-[1px] bg-black"></div>
     <h1 className="text-center pt-10 font-extrabold text-black text-4xl">{translate('explore_jobs')}</h1> 
   <JobSection TrendingCategories={TrendingCategories} ></JobSection>
   <div className="flex justify-center pb-5 items-center">
    <button className="bg-[#ff7300] text-white font-bold text-lg w-64 h-12">
       {translate('Explore All Jobs')}
    </button>
   </div>
     <OurServicesComponentLg></OurServicesComponentLg>
     <OurServicesComponentSm></OurServicesComponentSm> 
    <Testomonial></Testomonial>
      
    <Footer></Footer>
 
    </div>
  );
}


/*

OrangeColorCode = FF7300
Gray Color = D9D9D9


*/







{/* <div className=" flex flex-col md:p-[3%] md:ml-[3%] justify-center lg:p-[3%] lg:ml-[4%] ">

<div className=" flex  gap-4 ">
 <div className=" bg-[#ff7300]   w-6 h-6 rounded-full">
 </div>
 <div className="flex  justify-center flex-col">
   <h1 className=" md:text-lg  text-2xl font-bold"> 1.) Fill The Form </h1>
   <h1 className=" md:text-sm font-semibold text-center ml-[2%] mt-[2%] w-[48%] text-base">Tell Us What You Need By Compeleting The Form</h1>
 </div>   
 
</div>

<div className=" flex  gap-4 ">
 <div className=" bg-[#ff7300]   w-6 h-6 rounded-full">
 </div>
 <div className="flex  justify-center flex-col">
   <h1 className=" md:text-lg  text-2xl font-bold"> 1.) Fill The Form </h1>
   <h1 className=" md:text-sm font-semibold text-center ml-[2%] mt-[2%] w-[48%] text-base">Tell Us What You Need By Compeleting The Form</h1>
 </div>   
 
</div>
<div className=" flex  gap-4 ">
 <div className=" bg-[#ff7300]   w-6 h-6 rounded-full">
 </div>
 <div className="flex  justify-center flex-col">
   <h1 className=" md:text-lg  text-2xl font-bold"> 1.) Fill The Form </h1>
   <h1 className=" md:text-sm font-semibold text-center ml-[2%] mt-[2%] w-[48%] text-base">Tell Us What You Need By Compeleting The Form</h1>
 </div>   
 
</div>
</div>// */}


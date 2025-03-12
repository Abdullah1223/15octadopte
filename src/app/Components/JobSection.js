
import {Swiper,SwiperSlide} from "swiper/react";
import Image from "next/image";
import JobCardComponent from "./JobCardComponent";
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useTranslation } from "../Context/TranslationContext.";
const JobSection = ({TrendingCategories})=>{
    const { translate, setLanguage, language } = useTranslation();
return(
     TrendingCategories.map((data,index)=>{
         
        return <>
      
            <div className="flex flex-col" >
            <div className={`flex ${index==0?'pt-24':'pt-3'} p-4 px-8  justify-between items-center`}>
             <h1 className="text-black animate-slide-in-left font-bold text-lg">{data.Categoryname}</h1>
             <h1 className="text-black animate-slide-in-left font-bold text-lg">{translate('view_all')}</h1>
            </div>
            
             
       
       <Swiper
             modules={[ Autoplay]}
             spaceBetween={1}
            className="flex justify-center items-center w-full sm:w-full md:w-[100%] xl:w-[100%] "
             
             
             autoplay={{ delay: 3000 }}
             loop={true}
         
             breakpoints={{
               320: { slidesPerView: 1 },
               506:{slidesPerView:2},// Small screens
               768: { slidesPerView: 3 }, // Medium screens
               1024: { slidesPerView: 3 }, // Large screens
               1280: { slidesPerView: 3 }, // Extra-large screens
             }}
           >
             <SwiperSlide className="self-center px-4 md:px-4">
               <JobCardComponent></JobCardComponent>
             </SwiperSlide>
             <SwiperSlide className="px-4 md:px-4">
               <JobCardComponent></JobCardComponent>
             </SwiperSlide>
             <SwiperSlide className="px-4 md:px-4">
               <JobCardComponent></JobCardComponent>
             </SwiperSlide>
             <SwiperSlide className="px-4 md:px-4">
               <JobCardComponent></JobCardComponent>
             </SwiperSlide>
           </Swiper>
       
         <div className="h-16"></div>
          </div>
        </>

     })

)

}


export default JobSection;
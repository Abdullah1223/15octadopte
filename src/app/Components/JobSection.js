
'use client';
import {Swiper,SwiperSlide} from "swiper/react";
import Image from "next/image";
import JobCardComponent from "./JobCardComponent";
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useTranslation } from "../Context/TranslationContext.";
const JobSection = ()=>{
  
    const { translate, setLanguage, language } = useTranslation();
    const TrendingCategories=[
      {
      Categoryname:translate('unisex'),
      type:"unisex"
      },
      {
        Categoryname:translate('female_barber'),
        type:"femaleBarber"
      },
      
  
  ]

  const jobData = {
    unisex:[
      {
      id:"68444ffd3003d408c3b9e5e6",
      title:"Barber job",
      creatorName:"Abdullah 2",
      region:'France',
      city:"paris",
      description:"Hey this is meee mee Hey this is meee mee Hey this is meee mee Hey this is meee mee Hey this is meee mee Hey this is meee mee ",
      createdOn:'2025-06-07T14:43:09.729+00:00'
    },
    {
      id:"684f809bd6bbf4ca92906b2e",
      title:"Barber job2",
      creatorName:"BarberCompany",
      region:'France',
      city:"paris",
      description:"Hey This Is Job For Every Barber Please Apply All Soon As You Can We Have Very Limited Time",
      createdOn:'2025-06-16T02:25:31.700+00:00'
    },
    {
      id:"684449563003d408c3b9e5d3",
      title:"Barber Shop Test",
      creatorName:"Abdullah",
      region:"France",
      city:"paris",
      description:"Hey this was created for test purposes Hey this was created for test purposesHey this was created for test purposesHey this was created for test purposes",
      createdOn:"2025-06-07T14:14:46.814+00:00"
    },

  ],
   femaleBarber:[
     {
      id:"6842cb1601b8e3a2e0ddf8d0",
      title:"New Job",
      creatorName:"Abdullah",
      region:"France",
      city:"paris",
      description:"hEY this is new ",
      createdOn:"2025-06-06T11:03:50.630+00:00"
    },
    {

       id:"6842d11fcaa9a8777d3bf050",
      title:"New JJob",
      creatorName:"Abdullah",
      region:"France",
      city:"paris",
      description:"HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey",
      createdOn:"2025-06-06T11:29:35.625+00:00"

    },
    {

      
       id:"6842d48cedae0d8825a56f3a",
      title:"Unisex Barber Job",
      creatorName:"Abdullah",
      region:"France",
      city:"paris",
      description:"algoliasearchalgoliasearchalgoliasearchalgoliasearchalgoliasearchalgoliasearchalgoliasearchalgoliasearchalgoliasearchalgoliasearchalgoliasearchalgoliasearch",
      createdOn:"2025-06-06T11:44:12.361+00:00"

    }
   
  ]
    
  }


    return(
     <><div className="w-full h-[1px] bg-black"></div>
     <h1 className="text-center pt-10 font-extrabold text-black text-4xl">{translate('explore_jobs')}</h1>
     { TrendingCategories.map((data,index)=>{
         
        return <div key={index}>
      
            <div className="flex flex-col" >
            <div  className={`flex ${index==0?'pt-24':'pt-3'} p-4 px-8  justify-between items-center`}>
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

            {
              jobData[data.type].map((data,index)=>{
               return <SwiperSlide key={index} className="self-center px-4 md:px-4">
               <JobCardComponent title={data.title} id={data.id} description={data.description} city={data.city} region={data.region} createdOn={data.createdOn} creatorname={data.creatorName} ></JobCardComponent>
             </SwiperSlide>
             
              })
            }

           </Swiper>
       
         <div className="h-16"></div>
          </div>
        </div>

     })}</>

)

}


export default JobSection;
'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
const BlogPageSectionSm = ()=>{

    return (
        
   <div className="bg-[#EBEBEB] md:hidden">
    <h1 className="text-black text-2xl ml-3 mt-4 font-bold">Blog/</h1>
    
    <div className="flex justify-between px-3">
     <h1 className="text-black font-bold  mt-10 text-sm">Hair Care</h1>
     <h1 className="text-black font-bold  mt-10 text-sm">View All</h1>
    </div>
   <div className="flex">
     
     <Swiper
     className="w-full"
       slidesPerView={1} // Adjust as needed
       spaceBetween={10} // Adjust spacing
       pagination={{ clickable: true }}
       navigation={true}
       modules={[Pagination, Navigation]}
       breakpoints={{
         446: { slidesPerView: 2 },
         640:{slidesPerView:3}
       }}
    
     
     >

     <SwiperSlide>
     <div className="flex w-full sm:w-52 mt-4 px-3 flex-col">
          <img src="/Haircare.jpg" className="w-full  "></img>
          <div className="bg-white flex flex-col px-2 w-full">
          <h1 className="text-gray-300  text-sm mt-1">Hair Care - Feb 2/2/2025</h1>
          <h1 className="text-black font-bold text-base">How To Style Your Hairs</h1>
          <p className="text-gray-300">
          Lorem Ipsum is simply dummy
text of the printing and
typesetting industry. Lorem
Ipsum has been the industry'
          </p>
          <button className="self-center w-32 h-8 mt-3 mb-3 bg-[#ff7300] text-white ">Read More</button>
          </div>
    </div>
     </SwiperSlide>

    <SwiperSlide className="mr-4">
  
    <div className="flex w-full sm:w-52 mt-4  px-3   flex-col">
          <img src="/Haircare.jpg" className="w-full  "></img>
          <div className="bg-white flex flex-col px-2 w-full">
          <h1 className="text-gray-300  text-sm mt-1">Hair Care - Feb 2/2/2025</h1>
          <h1 className="text-black font-bold text-base">How To Style Your Hairs</h1>
          <p className="text-gray-300">
          Lorem Ipsum is simply dummy
text of the printing and
typesetting industry. Lorem
Ipsum has been the industry'
          </p>
          <button className="self-center w-32 h-8 mt-3 mb-3 bg-[#ff7300] text-white ">Read More</button>
          </div>
    </div>
          
    </SwiperSlide>
    <SwiperSlide className="mr-4">
  
  <div className="flex w-full sm:w-52 mt-4  px-3   flex-col">
        <img src="/Haircare.jpg" className="w-full  "></img>
        <div className="bg-white flex flex-col px-2 w-full">
        <h1 className="text-gray-300  text-sm mt-1">Hair Care - Feb 2/2/2025</h1>
        <h1 className="text-black font-bold text-base">How To Style Your Hairs</h1>
        <p className="text-gray-300">
        Lorem Ipsum is simply dummy
text of the printing and
typesetting industry. Lorem
Ipsum has been the industry'
        </p>
        <button className="self-center w-32 h-8 mt-3 mb-3 bg-[#ff7300] text-white ">Read More</button>
        </div>
  </div>
        
  </SwiperSlide>
     </Swiper>

  
    </div>   
    



   </div>
    )

}

export default BlogPageSectionSm;
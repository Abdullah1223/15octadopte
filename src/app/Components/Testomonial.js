import TestomonialSliderBox from "./TestomonialSliderBox";
import {Swiper,SwiperSlide} from "swiper/react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
const Testomonial = ()=>{
    const ImagesForTestimonial = ['star (1).png','star (1).png','star (1).png','star (1).png','star-half-filled (1).png']

   return( <>
      <div className="flex flex-col items-center justify-center md:grid mt-6 md:grid-cols-2">
      
      <div className="flex w-full md:border-[#ff3700] md:border-r bg-[#F9F7F7] h-64 flex-col justify-center items-center">
         <h1 className="font-semibold mt-6  md:mt-0 text-2xl lg:text-3xl xl:text-4xl xl:mr-5 text-black text-center md:self-end w-full lg:w-[100%] xl:w-3/4">Lets Hear What <span className="font-extrabold text-[#ff3700]"> People </span> Have </h1>
         <h1 className=" font-semibold  md:mr-5 text-2xl  lg:text-3xl xl:text-4xl text-black text-center mt-2 self-center xl:self-end  xl:w-3/4">To Say About Us</h1>
      <h1 className="xl:mt-8 text-black text-center mt-4 px-4 sm:px-4  text-sm sm:text-sm md:px-2 font-medium md:text-sm lg:text-base xl:text-lg  xl:ml-16">
        All Are Our Bussniess And Users Are Happy With Us We Are Not Saying It Reviews Do
      </h1>
      </div>
      
      <div className="flex w-full  bg-[#F9F7F7] relative items-center flex-col">
        <h1 className="text-[150px] text-gray-300 text-center">4.9</h1>
        <div className="flex absolute top-[10.1rem] ml-9 items-center ">
          {
            ImagesForTestimonial.map((Images,index)=>{
              console.log(Images)
              return <Image width={45} height={45} alt="Stars" src={`/${Images}`}>
               
              </Image>
            })
          }
        </div>
        <h1 className="text-2xl text-black  font-bold">Average Customer Rating</h1>
      </div>
    </div>          
       <Swiper
              modules={[Autoplay]}
             spaceBetween={20}
            className=" flex justify-center items-center "
             
             
             autoplay={{ delay: 3000 }}
             loop={true}
         
             breakpoints={{
               320: { slidesPerView: 1 }, // Small screens
               600: { slidesPerView: 2 },
               678: { slidesPerView: 3 }, // Medium screens
               1024: { slidesPerView: 3 }, // Large screens
               1280: { slidesPerView: 3 },
               1550:{slidesPerView:4} // Extra-large screens
             }}
           >
           <SwiperSlide className="mt-6">
           <TestomonialSliderBox></TestomonialSliderBox>
            </SwiperSlide> 
            <SwiperSlide className="mt-6">
           <TestomonialSliderBox></TestomonialSliderBox>
            </SwiperSlide> 
            <SwiperSlide className="mt-6">
           <TestomonialSliderBox></TestomonialSliderBox>
            </SwiperSlide> 
            <SwiperSlide className="mt-6">
           <TestomonialSliderBox></TestomonialSliderBox>
            </SwiperSlide> 


           </Swiper>
    </>
   )
}

export default Testomonial;
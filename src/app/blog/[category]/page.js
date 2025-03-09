'use client'
import BlogCard from "@/app/Components/BlogCard";
import Navbar from "@/app/Components/Navbar";
import { Scissors, Search } from "lucide-react";
import { useParams } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import IndiviualBlogSectionLg from "@/app/Components/IndiviualBlogSectionLg";
import BlogPageSearchSectionSm from "@/app/Components/BlogPageSearchSectionSm";
import BlogCardSm from "@/app/Components/BlogCardSm";
import BlogSwiperSection from "@/app/Components/BlogSwiperSection";
import Footer from "@/app/Components/Footer";
export default function IndiviualBlog(){
    const params = useParams()
    //console.log( params)
    const category = decodeURIComponent(params.category)
    console.log(category) 
    const MockArray=['Hair Care','Hair Trends','Style Hairs']

    return (
        <div className="bg-[#EBEBEB] h-max">
         
         <Navbar></Navbar>
         <div className="w-full h-[15rem] md:aspect-[14/4] grid place-items-center bg-cover bg-center" style={{ backgroundImage: "url('/barber1 1.png')" }}>
    <div className="bg-black bg-opacity-20 w-full h-full grid place-items-center">
        <div className="flex flex-col items-center">
            <h1 className="text-white text-lg sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-8xl">Stay Sharp Barbering Trends, Tips &</h1>
            <h1 className="text-white  text-lg sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl mt-3 2xl:text-8xl">Career Insights</h1>
        </div>
    </div>
</div>
      <div className="md:hidden">
      <BlogPageSearchSectionSm></BlogPageSearchSectionSm>
     </div> 
    <IndiviualBlogSectionLg category={category}></IndiviualBlogSectionLg>
      
     <div className="flex md:hidden w-full flex-col">
     <div className="flex flex-wrap justify-center items-center md:hidden w-full  ">
     <BlogCardSm></BlogCardSm>
     <BlogCardSm></BlogCardSm>
     <BlogCardSm></BlogCardSm>
     <BlogCardSm></BlogCardSm>
     </div>
     <BlogSwiperSection></BlogSwiperSection>
     </div>
     <Footer></Footer>
        </div>
    )
}
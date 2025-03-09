import BlogCard from "./BlogCard"
import { Scissors, Search } from "lucide-react";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import BlogSwiperSection from "./BlogSwiperSection";
import { useRouter } from "next/navigation";
const IndiviualBlogSectionLg = ({category})=>{
    const router = useRouter()
    const MockArrayPagenums=[1,2,3,4,5,6,7,8,9,10,11,12,13]
    const MockArray=['Hair Care','Hair Trends','Style Hairs']
    const MockArrayTopPost = [
        {
        Num:1,
        Title:"How to  get curly hairs naturally ",
        date:'2/2/2025'
       },
       {
        Num:2,
        Title:"How to  get Straigthen hairs naturally ",
        date:'12/2/2025'
       },
       {
        Num:3,
        Title:"Which best shampoo to choose ",
        date:'14/2/2025'
       },
       {
        Num:4,
        Title:"Are Shampoo Really Dangerous",
        date:'10/2/2025'
       },
       {
        Num:5,
        Title:"How to choose Hair Style",
        date:'2/1/2025'
       },

] 
 return(
    <div className="hidden bg-[#EBEBEB] md:grid mt-4  md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <div className="flex xl:col-span-3 md:col-span-2 2xl:col-span-4 flex-col">
        <h1 className="text-black md:px-0 lg:px-5 font-bold mt-8 text-4xl lg:text-5xl">
          Blog/{category}
        </h1>

        <div className="flex flex-col w-[100%] "> 
       <div className="grid ml-8 md:ml-0 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
       <BlogCard></BlogCard>
       <BlogCard></BlogCard>
       <BlogCard></BlogCard>
       <BlogCard></BlogCard>
       <BlogCard></BlogCard>
       <BlogCard></BlogCard>
       </div>
      
       <div className="flex items-center justify-center relative w-full mt-10">
    {/* Custom Navigation Buttons */}
    <button className="swiper-button-prev absolute left-72 z-10  bg-orange-300  text-white p-2 rounded-md">❮</button>
    <button className="swiper-button-next absolute right-72 z-10 bg-gray-400  text-white p-2 rounded-md"> ❯</button>

   <BlogSwiperSection></BlogSwiperSection>
</div>
       </div>
      
      </div>

      <div className="flex flex-col">
        <div className="md:px-0  relative ">
          <input
            type="text"
            placeholder="Search Articles"
            className="mt-8 pr-10 shadow-md rounded-md placeholder:text-black  md:w-56 lg:w-72 outline-none px-4 bg-white h-10 "
          ></input>
          <Search
            size={18}
            className="absolute top-[2.7rem] lg:left-[76%] "
          ></Search>
        </div>

       <div className="flex mt-24  bg-white md:w-56 md:h-56  lg:h-72 lg:w-72  rounded-lg flex-col">
             <h1 className="px-5 text-black text-xl lg:text-2xl font-bold py-3">
             Categories
             </h1> 
 
          
          {MockArray.map((data)=>{
             return <div 
             onClick={()=>{router.push(`/blog/${data}`)}}
             className={`flex px-6  gap-4 items-center border-b cursor-pointer  ${data==category?'bg-[#f77300] text-white ':'text-black hover:bg-gray-100'}  `}>
              <Scissors size={18}></Scissors>
             <h1 className="  text-base lg:text-lg font-bold py-3">
                {data}
                </h1> 
             </div>
          })}
 
         
       </div>

       <div className="flex flex-col   bg-white h-auto md:w-56 lg:w-72 mt-8">
           <h1 className="text-2xl mt-4 px-4 text-black font-extrabold">Top Posts</h1> 
        
      {
        MockArrayTopPost.map((data)=>{
            return    <div className="flex hover:bg-gray-100 cursor-pointer px-2 py-2 gap-6 mt-4">
            <h1 className="text-5xl font-extrabold text-black">{data.Num}</h1>
            <div className=" flex mt-1  flex-col">
             <h1 className="text-black font-bold ">{data.Title}</h1>
             <h1 className="text-gray-500 font-bold text-sm mt-1">{data.date}</h1>
            </div>
          </div>
        })
      }
      <div className="h-4"></div>
       </div>
       

      </div>
    </div>
 )

}

export default IndiviualBlogSectionLg
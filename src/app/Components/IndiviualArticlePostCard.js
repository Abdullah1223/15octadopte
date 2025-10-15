'use client';
import { Share2, Bookmark, Eye, MessageCircle, ThumbsUp }  from 'lucide-react'
import { useParams } from "next/navigation";

export const IndiviualArticlePostCard = ()=>{
    const params = useParams();
      //console.log( params)
      const category = decodeURIComponent(params.category);
    const MockArraySocialSection = [
        {
          text: "3.8k",
          icon: Eye,
        },
        {
          text: "2.3k",
          icon: MessageCircle,
        },
        {
          text: "3.8k",
          icon: Share2,
        },
      ];
 return(
    <div className="flex flex-col">
      <h1 className="text-black font-bold mt-3 text-3xl">{category}</h1>
      <div className="flex justify-center items-center ">
      <div className="flex flex-col  bg-white w-[20rem] sm:w-[38rem] mr-4 md:w-[26rem] lg:w-[35rem] xl:w-[37rem] h-full rounded-tr-3xl rounded-tl-3xl">
        <div className=" px-5 py-3 ">
          <img
            src="/haircare.jpg"
            className="rounded-tr-[1.7rem] rounded-tl-[1.7rem]"
          ></img>
        </div>

        <div className="flex justify-between px-4 md:px-5 lg:px-8">
          <div className=" flex items-center justify-center w-20 md:w-20 lg:w-40 rounded-lg h-8 bg-[#F9E5CB]">
            <h1 className="text-[#f77300] text-xs lg:text-lg text-center font-bold">
              {category}
            </h1>
          </div>
          <div className=" flex gap-3 md:gap-3 lg:gap-7">
            {MockArraySocialSection.map((data) => {
              return (
                <div className="flex items-center gap-2">
                  <data.icon color="grey" size={18}></data.icon>
                  <h1 className="text-black text-xs  md:text-sm lg:text-base font-bold">{data.text}</h1>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 mt-8">
          <div className="flex flex-col ">
            <h1 className="text-black text-sm sm:text-xl md:text-base lg:text-xl font-bold px-5">
              How To Actually Care For Your Hairs
            </h1>
            <h1 className="text-black  text-xs lg:text-sm font-bold px-5 mt-2">
              By:Shiekh Solutions
            </h1>
          </div>

          <div className="flex flex-col px-3 sm:px-8 md:px-2 lg:px-5">
            <button className="border hover:bg-gray-100 border-black  h-10 rounded-full">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-2 sm:px-4 lg:gap-4 px-2 md:px-2 lg:px-3 ">
                <Bookmark size={20} color="black" className="hidden md:block"></Bookmark>
                <div className=" md:hidden">
                <Bookmark size={15} color="black"></Bookmark>
                </div>
                <h1 className="text-black text-[0.65rem] sm:text-xs md:text-xs lg:text-base xl:text-lg  font-bold">
                  Add To Faviouties
                </h1>
              </div>
            </button>

            <button className=" mt-4  bg-[#F9E5CB] border-black  h-10 rounded-full">
              <div className="flex items-center md:gap-2 lg:gap-4 px-2 sm:px-4 gap-2 md:px-2 lg:px-3  ">
                <Share2 size={20} color="darkorange" className="hidden md:block"></Share2>
                <div className="md:hidden">
                <Share2 size={15} color="darkorange" ></Share2>             
                </div>
                <h1 className=" text-[#ff7300] text-[0.65rem] sm:gap-3 sm:text-xs md:text-xs lg:text-base xl:text-lg font-bold">
                  Share On Media
                </h1>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col px-5 py-8">
          <h1 className="text-black font-bold text-3xl ">Good Shampoo</h1>
          <p className="text-black font-bold mt-2">
            But I must explain to you how all this mistaken idea of
            denouncing pleasure and praising pain was born and I will give
            you a complete account of the system, and expound the actual
            teachings of the great who chooses to enjoy a pleasure that
            has no annoying consequences, or one who avoids a pain that
            produces no resultant pleasure?"
          </p>

          <h1 className="text-black font-bold mt-4 text-3xl ">
            Frequent Baths
          </h1>
          <p className="text-black font-bold mt-2">
            But I must explain to you how all this mistaken idea of
            denouncing pleasure and praising pain was born and I will give
            you a complete account of the system, and expound the actual
            teachings of the great who chooses to enjoy a pleasure that
            has no annoying consequences, or one who avoids a pain that
            produces no resultant pleasure?"
          </p>
        </div>


        <div className="self-end px-8">
          <h1 className="text-black font-bold">Published On:<span className="text-[#ff7300] font-bold">2/2/2024</span></h1>
        </div>

        <div className=' flex flex-col '>

        <div className='px-5 py-3 gap-4 flex justify-evenly  border-t border-b  '>
        <div className='flex items-center gap-3'>
            <ThumbsUp size={22} color='gray'></ThumbsUp>
            <h1 className='text-black mt-1 font-bold text-lg'>Like</h1>
         </div>
         <div className='flex items-center gap-3'>
            <MessageCircle size={22} color='gray'></MessageCircle>
            <h1 className='text-black mt-1 font-bold text-lg'>Comments</h1>
         </div>
         <div className='flex items-center gap-3'>
            <Share2 size={22} color='gray'></Share2>
            <h1 className='text-black mt-1 font-bold text-lg'>Share</h1>
         </div>
        </div>

        <div className='px-3  flex py-4 items-center '>
            <div className='w-12 h-11 rounded-full'>
                 <img src='/images.jpg' className='rounded-full w-full h-full'></img>
            </div>
          <div className='px-4 w-full'>
          <input placeholder='Write A  Comment' className='w-full bg-gray-100 items-center flex px-4 h-10 rounded-2xl'>
          
          </input> 
          </div>
         </div>
        </div>  

      </div>

      </div>
    </div>
  
 )


}


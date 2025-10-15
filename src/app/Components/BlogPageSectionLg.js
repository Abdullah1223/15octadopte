import { Scissors, Search } from "lucide-react";
import BlogCard from "./BlogCard";

const BlogPageSectionLg = () => {
  const MockArray = ["Hair Care", "Hair Trends", "Style Hairs"];

  return (
    <div className="hidden bg-[#EBEBEB] md:grid mt-4  md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <div className="flex xl:col-span-3 md:col-span-2 2xl:col-span-4 flex-col">
        <h1 className="text-black md:px-0 lg:px-5 font-bold mt-8 text-4xl lg:text-5xl">
          Blog/
        </h1>

        <div className="grid ml-8 md:ml-0 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 ">
       <BlogCard></BlogCard>
       <BlogCard></BlogCard>
       <BlogCard></BlogCard>
       <BlogCard></BlogCard>
       <BlogCard></BlogCard>
       <BlogCard></BlogCard>
       </div>
      </div>

      <div className="flex flex-col">
        <div className="md:px-0 lg:px-4 relative ">
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

        <div className="flex mt-24  bg-white  md:w-56 md:h-56  lg:h-72 lg:w-72  lg:ml-5 rounded-lg flex-col">
              <h1 className="px-5 text-black text-xl lg:text-2xl font-bold py-3">
              Categories
              </h1>

          {MockArray.map((data)=>{
             return <div className="flex px-6  gap-4 items-center border-b cursor-pointer hover:bg-gray-100 ">
              <Scissors size={18}></Scissors>
             <h1 className=" text-black text-base lg:text-lg font-bold py-3">
                {data}
                </h1>
             </div>
          })}

       </div>

      </div>
    </div>

   
  );
};

export default BlogPageSectionLg;

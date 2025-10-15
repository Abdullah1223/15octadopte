const BlogCard = ()=>{

return (
    <div className=" md:px-4 lg:px-8  mt-24  w-full">
    <div className="flex flex-col bg-white md:w-[9rem] h-auto lg:h-auto  lg:w-64 hover:scale-110 ">

    <img src="/haircare.jpg" className=" md:w-44 lg:w-64  lg:h-44 "></img>
    <h1 className="text-sm lg:text-lg font-bold text-gray-400 px-4 mt-2">Hair Care Feb 29/2/2025</h1>
    <h1 className="text-black font-bold text-base lg:text-xl px-4 mt-3">How To Care For Your Hairs</h1>
    <p className="px-4 mt-2 text-gray-500 text-xs lg:text-sm font-bold">Lorem Ipsum is simply dummy
text of the printing and
typesetting industry. Lorem
Ipsum has been the industry's
standard dummy text ever</p>

<button className="self-center w-28 h-8  md:h-7 lg:w-44 lg:h-9 bg-[#ff7300] md:text-sm lg:text-lg mt-4 mb-5 lg:font-bold rounded-sm text-white">Read More</button>
    </div>
  </div>
)

}

export default BlogCard
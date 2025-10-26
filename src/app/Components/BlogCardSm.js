const BlogCardSm = ()=>{
 return(
    <div className="flex w-[10rem] sm:w-52 mt-4 px-2    flex-col">
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
 )

}

export default BlogCardSm;
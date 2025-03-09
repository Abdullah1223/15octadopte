import Image from "next/image"
import { inView, useInView } from "react-intersection-observer"


const ValueSection = ()=>{

   const  {ref,inView}=useInView()
 return (
    
    
<div className=" pt-8 md:pt-20 flex bg-[#F9F7F7] flex-col justify-center items-center lg:grid lg:grid-cols-2"> 
       <div className="flex justify-center items-center flex-col">
       <h1 className="text-black text-lg sm:text-3xl md:text-4xl font-extrabold lg:text-2xl xl:text-4xl text-center">Get Connected to Top <span className="text-[#ff7300]">Talent</span></h1>
      <h1 className="text-black text-lg sm:text-3xl md:text-4xl font-extrabold lg:text-2xl xl:text-4xl pt-3 text-center">or Leading <span className="text-[#ff7300]">Businesses</span> in the </h1>
      <h1 className="text-black text-lg sm:text-3xl md:text-4xl font-extrabold lg:text-2xl xl:text-4xl pt-3 text-center">Barber Industry </h1>
       <button className="hidden lg:block animate-slide-up shadow-xl shadow-slate-200 lg:mt-44 xl:mt-52 lg:w-48 xl:w-56 text-white  rounded-sm font-bold text-center h-12 bg-[#ff7300]">Sign Up For Free</button>
      <div className=" h-8 md:h-12"></div>
       </div>
       
       <div  ref={ref} className="flex lg:pt-7   lg:ml-9 xl:pt-16 xl:ml-24  gap-3 px-4 md:p-0 md:gap-4 flex-col">
        <div  className={`flex shadow-xl transition-transform duration-300 hover:scale-110  shadow-gray-100 md:shadow-gray-300 items-center ${inView?"animate-[slideDownSm_2s] lg:animate-[slideDown_2s]":"opacity-0"} bg-[#FAD6BA]    h-20 md:w-[102%] lg:w-[94%] xl:w-[87%] `}>
         <Image className="ml-4 md:block hidden " src={'/file.png'} width={30} height={30} alt="Thunder"></Image>
        <div className="w-6 mr-2 md:hidden " ><Image className="ml-4 md:hidden " src={'/file.png'} width={30} height={30} alt="Thunder"></Image>
        </div> 
         <div className="flex ml-4  flex-col">
          <h1 className="text-black text-sm sm:text-sm md:text-base lg:text-base xl:text-lg font-bold">Sign Up</h1>
          <h1 className="text-black  lg:text-[0.70rem] text-[0.60rem] md:text-sm sm:text-[0.75rem]  md:text-nowrap xl:text-xs font-semibold">Seeking For Job Or Talent
          Dont Worry Signup Easy</h1>
         </div>          
        </div>


        <div className={`flex items-center shadow-lg shadow-gray-100 transition-transform duration-300 hover:scale-110  md:shadow-gray-300 ${inView?"animate-[slideDownSm_1s] lg:animate-[slideDown_1s]":"opacity-0"}   bg-[#F5ECAE] h-20 md:w-[102%] lg:w-[94%] xl:w-[87%] `}>
         <Image className="ml-4 md:block hidden" src={'/magnifying-glass.png'} width={30} height={30} alt="Thunder"></Image>  
         <div className="w-6 mr-2 md:hidden " ><Image className="ml-4 md:hidden " src={'/magnifying-glass.png'} width={30} height={30} alt="Thunder"></Image>
         </div> 
         <div className="flex ml-4  flex-col">
          <h1 className="text-black text-sm sm:text-sm lg:text-base md:text-base xl:text-lg font-bold">Search Jobs Or Talent</h1>
          <h1 className="text-black   text-[0.50rem] sm:text-[0.75rem] lg:text-[0.68rem] md:text-sm  xl:text-xs font-semibold">Find Jobs That Suit You Best or Discover Barbers That Meet Your Needs</h1>
         </div>          
        </div>

        <div  className={`flex items-center shadow-md shadow-gray-100 transition-transform duration-300 hover:scale-110 md:shadow-gray-300 ${inView?"animate-[slideDownSm_0.5s] lg:animate-[slideDown_0.5s]":"opacity-0"}  md:w-[102%] lg:w-[94%] bg-[#EDF9F0] h-20 xl:w-[87%]`}>
         <Image className="ml-4 md:block hidden" src={'/deal.png'} width={35} height={35} alt="Thunder"></Image>  
         <div className="w-6 mr-2 md:hidden " ><Image className="ml-4 md:hidden " src={'/deal.png'} width={30} height={30} alt="Thunder"></Image>
         </div> 
         <div className="flex ml-4  flex-col">
          <h1 className="text-black  text-sm sm:text-sm  lg:text-base md:text-base xl:text-lg font-bold">Get Hired Or Hire</h1>
          <h1 className="text-black  mr-4 md:mr-0  text-[0.60rem] sm:text-[0.75rem] lg:text-[0.68rem] md:text-sm xl:text-xs font-semibold">Congratulations! You've Been Hired, or
          You've Hired the Perfect Match</h1>
         </div>          
        </div>
       </div>
      
       <button className=" lg:hidden  mt-9 sm:mt-12 w-44 sm:w-64 mb-4 sm:text-lg text-sm text-white  rounded-sm font-bold text-center h-10 bg-[#ff7300]">Sign Up For Free</button>


      </div> 
 )

}

export default ValueSection
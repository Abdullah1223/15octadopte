'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeroSection = ()=>{
   const router = useRouter();
   const handleClick = (value) => {
    console.log('Clicked')
    router.push(`/login?value=${value}`); // Correct: String path with query
  };
 return (
     
      
    <div className="relative flex flex-col   md:grid border-b border-[#D9D9D9] grid-cols-2 ">
    
    <div className="md:hidden flex  mt-4 justify-center items-center ">
      
     <Image src={'/Frame.png'} width={250} height={250} alt="Hero Section"></Image> 
     </div>
       <div className=" flex justify-center md:ml-12 md:mt-10 lg:mt-10 items-center">
            <div className="   md:flex  flex-col gap-3">
              <div className=" mt-4 flex items-center md:mt-0 text-[#FF9300] gap-2">
              <div className="  h-[2px]  w-24 md:w-28  lg:w-40 bg-[#FF9300]"></div>
              <h1 className="items-center text-xs md:text-base  lg:text-lg ">500+ Trusted Companies & Users</h1>
              </div>
               {/*this is start to sm heading seciton*/}
            <h1 className="md:hidden  md:mt-0  md:ml-0 text-black font-bold  text-xl sm:text-3xl">CONNECTING JOB SEEKERS </h1>
            <h1 className="md:hidden text-center md:mt-0  md:ml-0  text-3xl text-black font-bold">&</h1>
            <h1 className="md:hidden text-center md:mt-0  md:ml-0  text-xl sm:text-3xl text-black font-bold">EMPLOYERS <span className="text-[#ff7300]"> SEAMLESSLY! </span> </h1>
            <div className=" md:hidden flex justify-center items-center mt-4  gap-2 sm:gap-3">
              <button onClick={()=>handleClick('Candidate')} className="border-[2px] rounded-[4px] border-black w-32 h-10 text-xs sm:w-36 sm:h-10 sm:text-base text-black  ">I am a Candidate</button> 
              <button onClick={()=>handleClick('Employer')} className=" rounded-[4px] bg-[#FA4909] w-32 h-10 text-xs sm:w-36 sm:h-10 sm:text-base  text-white ">I am a Employer</button> 
             </div>
            {/*this is from md to xl heading*/}
            <h1 className=" hidden md:block  md:text-3xl lg:text-4xl xl:text-5xl text-black font-bold">CONNECTING JOB</h1>
            <h1 className=" hidden md:block md:text-3xl lg:text-4xl xl:text-5xl text-black font-bold">SEEKERS & EMPLOYERS</h1>
            <h1 className="hidden md:block md:text-3xl lg:text-4xl xl:text-5xl text-[#ff7300] font-bold">SEAMLESSLY!</h1>
             <div className="hidden md:flex mt-2 gap-6">
              <button onClick={()=>handleClick('Candidate')} className="border-[2px] rounded-[4px] border-black md:h-[47px] md:w-44 lg:w-44 lg:h-[50px]  ">I am a Candidate</button> 
              <button onClick={()=>handleClick('Employer')} className=" rounded-[4px] bg-[#FA4909] md:h-[47px] md:w-44  lg:w-44 lg:h-[50px]  text-white ">I am a Employer</button> 
             </div>
             <div className="h-6"></div>
            </div>
            
       </div>
     

     <div className="hidden md:flex justify-center items-center md:ml-24 md:w-[69%] md:h-auto lg:w-[65%] lg:ml-40  xl:w-[70%] xl:ml-32">
     <Image src={'/Frame.png'} width={500} height={500} alt="Hero Section"></Image> 
     </div>
    </div>
    
 )

}

export default HeroSection;
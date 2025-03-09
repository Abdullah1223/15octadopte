import Image from "next/image"
import { useInView } from "react-intersection-observer"

const OurServicesComponentLg = ()=>{
const {ref,inView}=useInView()
return (
    <>
    
    <div className=" hidden md:flex justify-center bg-[#FAE1C0] items-center">
      <h1 className="text-4xl font-bold text-black mt-8 mb-12 ">Our Services</h1>
      </div>
 <div ref={ref} className="w-full hidden md:flex flex-col relative  md:h-[46rem] lg:h-[58rem]  bg-[#FAE1C0] items-center" >
       <div  className={`flex  absolute md:top-[4%] lg:top-20 md:left-[5%] ${inView?"animate-[slideDown_1s]":"opacity-0"}  lg:left-[8%] xl:left-[12%] flex-col  w-[10.2rem] h-[10.2rem] lg:w-[12rem] lg:h-[12rem]`}>
       <div className="self-center mt-2"> <Image src={'/magnifying-glass.png'} width={40} height={40}></Image></div>
        <h1 className="md:text-xl lg:text-2xl md:mt-1 lg:mt-4 font-bold text-center">Jobs</h1> 
        <h1 className="break-words md:p-1 md:text-xs lg:text-sm lg:p-1  text-center">Discover the best barbering opportunities near you. Apply for jobs effortlessly and take the next step in your career</h1>
        </div>
         
        <div className={`flex absolute  top-20 md:top-[4%] md:right-[8%] lg:right-[9%]  xl:right-[12%] ${inView?"animate-[slideDown_1s]":"opacity-0"}   flex-col  w-[10.2rem] h-[10.2rem] lg:w-[12rem] lg:h-[12rem] `}>
        <div className="self-center mt-2"> <Image src={'/suitcase.png'} width={35} height={35}></Image></div>
        <h1 className="md:text-xl lg:text-2xl md:mt-1 lg:mt-4 font-bold text-center">Platform To Hire Talent</h1> 
        <h1 className="break-words md:p-1 md:text-xs lg:text-sm lg:p-1   mt-1 text-center">Discover the best barbering talent near you .Hire them and grow your busniess</h1>
        
        </div> 
        <div className={`flex absolute  top-80 md:top-[34%] lg:top-[33%] xl:top-[33%] md:right-[8%]  lg:right-[9%]  xl:right-[12%] ${inView?"animate-[slideDown_1s]":"opacity-0"}  flex-col  w-[10.2rem] h-[10.2rem] lg:w-[12rem] lg:h-[12rem] `}>
        <div className="self-center mt-2"> <Image src={'/verify.png'} width={35} height={35}></Image></div>
        <h1 className="md:text-xl lg:text-2xl md:mt-1 lg:mt-4 font-bold text-center">Verified & Secure</h1> 
        <h1 className="break-words md:p-1 md:text-xs lg:text-sm lg:p-1   mt-1 text-center">On Adopte Un Coiffer,everything is verified and secure from getting job to hiring someone all talent and bussniess are verified</h1>
        
        </div>  
        <div className={`flex absolute  md:top-[34%] lg:top-80 md:left-[5%] lg:left-[8%] xl:left-[12%] ${inView?"animate-[slideDown_1s]":"opacity-0"}  flex-col w-[10.2rem] h-[10.2rem] lg:w-[12rem] lg:h-[12rem] `}>
        <div className="self-center mt-2"> <Image src={'/verify.png'} width={35} height={35}></Image></div>
        <h1 className="md:text-xl lg:text-2xl md:mt-1 lg:mt-4 font-bold text-center">Skill-Based Matching</h1> 
        <h1 className="break-words md:p-1 md:text-xs lg:text-sm lg:p-1   mt-1 text-center">Hey wheater you have two years experience or 2 months we are open to everyone!</h1>
        </div> 
        <div className={`flex absolute  md:top-[60%] lg:top-[60%]  ${inView?"animate-[slideDown_1s]":"opacity-0"}  flex-col w-[10.2rem] h-[10.2rem] lg:w-[12rem] lg:h-[12rem]`}>
        <div className="self-center mt-2"> <Image src={'/verify.png'} width={35} height={35}></Image></div>
        <h1 className="md:text-xl lg:text-2xl md:mt-1 lg:mt-4 font-bold text-center">Skill-Based Matching</h1> 
        <h1 className="break-words md:p-1 md:text-xs lg:text-sm lg:p-1   mt-1 text-center">Hey wheater you have two years experience or 2 months we are open to everyone!</h1>
        </div> 

        <button className="absolute md:top-[89%]  animate-[bounce_2s] lg:top-[90%]  w-64 h-12 hover:bg-[#ff3700] border border-black text-black hover:text-white hover:border-0 ">
          Lets Explore
        </button>
      
        <img className={`md:w-56 lg:w-72 ${inView?"animate-slide-up":"opacity-0"}  `} src={'/iphone (1).png'} alt="dasdas"></img>
 </div>
    </>
)

}


export default OurServicesComponentLg
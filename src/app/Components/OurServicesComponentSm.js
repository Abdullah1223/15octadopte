import Image from "next/image"

const OurServicesComponentSm = ()=>{

    return(
        <>
        
        <div className="md:hidden py-4 bg-[#FAE1C0] text-center mt-2 text-black font-bold text-2xl">
      <h1>Our Services</h1>
      </div>  
      <div className="md:hidden flex text-black  h-full bg-[#FAE1C0] items-center flex-col">
         <div className=" mt-4  w-44">
          <img src="/iphone (1).png"></img>
          </div>
        
       
                <div className="self-center mt-6"> <Image src={'/magnifying-glass.png'} width={40} height={40}></Image></div>
                 <h1 className=" text-2xl mt-2 font-bold text-center">Jobs</h1> 
                 <h1 className="break-words   text-base px-4 mt-2  text-center">Discover the best barbering opportunities near you. Apply for jobs effortlessly and take the next step in your career</h1>
                 
                 <div className="self-center mt-10"> <Image src={'/suitcase.png'} width={40} height={40}></Image></div>
                 <h1 className=" text-2xl mt-2 font-bold text-center">Platform To Hire Talent</h1> 
                 <h1 className="break-words   text-base px-4 mt-2  text-center">Discover the best barbering talent near you .Hire them and grow your busniess</h1>
                 
                 <div className="self-center mt-10"> <Image src={'/verify.png'} width={40} height={40}></Image></div>
                 <h1 className=" text-2xl mt-2 font-bold text-center">Verified & Secure</h1> 
                 <h1 className="break-words   text-base px-4 mt-2  text-center">On Adopte Un Coiffer,everything is verified and secure from getting job to hiring someone all talent and bussniess are verified</h1>
                 
                 <div className="self-center mt-10"> <Image src={'/magnifying-glass.png'} width={40} height={40}></Image></div>
                 <h1 className=" text-2xl mt-2 font-bold text-center">Skill-Based Matching</h1> 
                 <h1 className="break-words   text-base px-4 mt-2  text-center">Hey wheater you have two years experience or 2 months we are open to everyone!</h1>
                 
                 <div className="self-center mt-10"> <Image src={'/magnifying-glass.png'} width={40} height={40}></Image></div>
                 <h1 className=" text-2xl mt-2 font-bold text-center">Skill-Based Matching</h1> 
                 <h1 className="break-words  mb-4 text-base px-4 mt-2  text-center">Hey wheater you have two years experience or 2 months we are open to everyone!</h1>
      

      </div>
        </>
    )

}

export default OurServicesComponentSm
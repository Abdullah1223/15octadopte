import Image from "next/image"
import { useTranslation } from "../Context/TranslationContext.";

const OurServicesComponentSm = ()=>{
      const { translate, setLanguage, language } = useTranslation();  

    return(
        <>
        
        <div className="md:hidden py-4 bg-[#FAE1C0] text-center mt-2 text-black font-bold text-2xl">
      <h1>{translate('our_services')}</h1>
      </div>  
      <div className="md:hidden flex text-black  h-full bg-[#FAE1C0] items-center flex-col">
         <div className=" mt-4  w-44">
          <img src="/iphone (1).png"></img>
          </div>
        
       
                <div className="self-center mt-6"> <Image src={'/magnifying-glass.png'} width={40} height={40}></Image></div>
                 <h1 className=" text-2xl mt-2 font-bold text-center">{translate('Jobs')}</h1> 
                 <h1 className="break-words   text-base px-4 mt-2  text-center">{translate('Jobs_subheading')}</h1>
                 
                 <div className="self-center mt-10"> <Image src={'/suitcase.png'} width={40} height={40}></Image></div>
                 <h1 className=" text-2xl mt-2 font-bold text-center">{translate('platform_to_hire_talent')}</h1> 
                 <h1 className="break-words   text-base px-4 mt-2  text-center">{translate('platform_to_hire_talent_subheading')}</h1>
                 
                 <div className="self-center mt-10"> <Image src={'/verify.png'} width={40} height={40}></Image></div>
                 <h1 className=" text-2xl mt-2 font-bold text-center">{translate('verified_&_secure')}</h1> 
                 <h1 className="break-words   text-base px-4 mt-2  text-center">{translate('verified_&_secure_subheading')}</h1>
                 
                 <div className="self-center mt-10"> <Image src={'/magnifying-glass.png'} width={40} height={40}></Image></div>
                 <h1 className=" text-2xl mt-2 font-bold text-center">{translate('talent_above_all')}</h1> 
                 <h1 className="break-words   text-base px-4 mt-2  text-center">{translate('talent_above_all_subheading')}</h1>
                 
             

      </div>
        </>
    )

}

export default OurServicesComponentSm
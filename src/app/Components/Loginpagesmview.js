'use client';
import { useTranslation } from "../Context/TranslationContext.";
import LoginCard from "./LoginCard"

const Loginpagesmview = ()=>{

         const { translate, setLanguage, language } = useTranslation();
 
   return( 

    <div className="">
        <div className="flex flex-col  items-center lg:hidden bg-[#FA4909] h-[23rem] sm:h-[26rem]">
    <div className="ml-2 sm:ml-0 mt-8 md:mt-8">
    <h1 className="   text-black font-semibold text-2xl sm:text-4xl md:text-5xl  ">ADOPTE UN COIFFEUR</h1>
    <h1 className="mt-1 text-black font-semibold text-2xl sm:text-4xl md:text-5xl ">{translate('where')} <span className="bg-[white] text-[#ff7300] px-3 text-center mr-1"> {translate('Talents')} </span> {translate('meets')}</h1>
    <h1 className="  text-black font-semibold text-2xl sm:text-4xl md:text-5xl   ">{translate('Opportunities')}</h1>

    <img className=" mt-4 sm:mt-0 ml-16 sm:ml-28 w-44 md:ml-44 sm:w-56" src="/loginimg.png"></img>

   </div>

    
    </div>
    <div className="lg:hidden flex mt-4 flex-col justify-center items-center">
    
    <LoginCard></LoginCard>
    </div>

    <div className="h-4"></div>
    </div>
   )

}

export default Loginpagesmview
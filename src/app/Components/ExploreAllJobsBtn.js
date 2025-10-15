'use client';
import { useRouter } from "next/navigation";
import { useTranslation } from "../Context/TranslationContext.";

const ExploreAllJobsBtn = ()=>{
    const { translate, setLanguage, language } = useTranslation();
   const route = useRouter()
   return <div className="flex justify-center pb-5 items-center">
    <button
    onClick={()=>{route.push('/Jobs')}}
    className="bg-[#ff7300] text-white font-bold text-lg w-64 h-12">
       {translate('Explore All Jobs')}
    </button>
   </div>

}
export default ExploreAllJobsBtn;
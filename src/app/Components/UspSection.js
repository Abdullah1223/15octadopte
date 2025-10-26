'use client';
import Image from "next/image";
import { useTranslation } from "../Context/TranslationContext.";

const UspSection = ()=>{
  const { translate, setLanguage, language } = useTranslation();
  const ValueSection = [
        {
        title:translate('Usp_1'),
        subheading:translate('Usp_1_subheading'),
        image:'/thunder.png'
        },
        {
          title:translate('Usp_2'),
          subheading:translate('Usp_2_subheading'),
          image:'/location-pin.png'
        },
        {
          title:translate('Usp_3'),
          subheading:translate('Usp_3_subheading'),
          image:'/verify.png'
        },
        {
          title:translate("Usp_4"),
          subheading:translate("Usp_4_subheading"),
          image:'/24-7.png'
        },
        
    
    ]
return (
    
    <div className="hidden px-8 md:grid md:grid-cols-2 bg-[#F9F7F7]  pt-3">
      
      {
        ValueSection.map((data,index)=>{
         return <div key={index} className={` animate-fade-in flex  md:p-4 ${index==3?"lg:ml-[6.3rem]":"lg:ml-24"} md:ml-5 md:gap-3 lg:ml-24 xl:ml-0   items-center xl:p-8 xl:gap-4 `}>
          <Image src={data.image} width={25} height={25}
          sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 96px, 128px"
          alt="Thunder"
          loading="lazy"
          ></Image>
          <div className="flex flex-col  ">
            <h1 className="md:text-base  lg:text-lg xl:text-xl font-bold">{data.title}</h1>
            <p className={`lg:text-xs ${language=='fr' && index==1?'text-wrap':'text-nowrap'}  text-xs`} >{data.subheading}</p>
            
          </div>
        </div>  
        })
      }
        
     </div>
)

}

export default UspSection;
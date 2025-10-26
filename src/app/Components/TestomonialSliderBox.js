import Image from "next/image";
import { useTranslation } from "../Context/TranslationContext.";

const TestomonialSliderBox = ()=>{
 
      const { translate, setLanguage, language } = useTranslation();
      const ImagesForTestimonial = ['star (1).png','star (1).png','star (1).png','star (1).png','star-half-filled (1).png']

return(
        <div className="flex  w-full px-4 sm:px-4  2xl:w-96 2xl:px-6  sm:w-full  md:w-auto md:px-4 lg:w-full lg:px-4  flex-col">
          <div className="flex  rounded-lg bg-[#FAE1C0]  p-2 flex-col border border-[#ff7300]">
           <h1 className="px-2 break-words text-lg font-bold">
            {translate('no_doubt')} <span className="bg-orange-500 text-nowrap text-white px-2">{translate('best_services')}</span> {translate('testimonial')} 
           </h1>
           <div className="  px-2 mt-3 flex">
           {
            ImagesForTestimonial.map((ImagesUri,index)=>{
              return <Image src={`/${ImagesUri}`} width={20} height={20} alt="Images"></Image>
            })
           }
           </div>
          </div>
          <div className="flex justify-center items-center gap-2">
          <h1 className="text-center text-black mt-2 font-semibold ">SHIEKH SOLUTIONS</h1>
          <h1 className="text-center text-black mt-2 text-xs ">Paris</h1>
          </div>
        </div> 
     
)

}

export default TestomonialSliderBox;
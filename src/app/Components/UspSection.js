
import Image from "next/image";

const UspSection = ()=>{
    const ValueSection = [
        {
        title:'Easy & Fast',
        subheading:'Find or Post Job In Easy Three Steps',
        image:'/thunder.png'
        },
        {
          title:'Local Oppourtunities',
          subheading:'Discover jobs near you or hire talent in your area',
          image:'/location-pin.png'
        },
        {
          title:'Verified',
          subheading:'All Our Talent And Bussniess Are Verified',
          image:'/verify.png'
        },
        {
          title:'Customer Support',
          subheading:'We Are Always Ready To Help',
          image:'/24-7.png'
        },
        
    
    ]
return (
    
    <div className="hidden px-8 md:grid md:grid-cols-2 bg-[#F9F7F7] xl:flex justify-evenly items-center pt-3">
      
      {
        ValueSection.map((data,index)=>{
         return <div key={index} className={` animate-fade-in flex  md:p-4 ${index==3?"lg:ml-[6.3rem]":"lg:ml-24"} md:ml-5 md:gap-3 lg:ml-24 xl:ml-0   items-center xl:p-8 xl:gap-4 `}>
          <Image src={data.image} width={25} height={25}
          sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 96px, 128px"
          alt="Thunder"></Image>
          <div className="flex flex-col  ">
            <h1 className="md:text-base  lg:text-lg xl:text-xl font-bold">{data.title}</h1>
            <p className="lg:text-xs  text-nowrap text-xs" >{data.subheading}</p>
            
          </div>
        </div>  
        })
      }
        
     </div>
)

}

export default UspSection;
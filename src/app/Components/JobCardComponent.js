import Image from "next/image"

const JobCardComponent = ()=>{

 return(
   <div className="flex  flex-col  border  w-full sm:w-full md:w-full border-y-gray-400 rounded-lg px-3 py-3 mx-2">
    <Image 
        className="self-end mt-1 mr-2 w-4 h-4 sm:w-5 sm:h-5"
        alt="Save" 
        src={'/ribbon.png'} 
        width={20}
        height={20}
    />

    <div className="flex items-center">
        <div className="flex-shrink-0 rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-[#cecac6]">
            <img 
                className="w-full h-full p-1.5 object-contain" 
                src="/thunder.png" 
                alt="Company logo"
            />
        </div>
        <div className="ml-2 truncate">
            <h1 className="text-xs sm:text-sm font-semibold text-black truncate">
                Shiekh Solutions
            </h1>
            <div className="flex items-center gap-1">
                <Image 
                    src={'/location-pin.png'} 
                    width={10}
                    height={10}
                    alt="Location"
                    className="hidden xs:inline"
                />
                <span className="text-[10px] sm:text-xs text-gray-500 truncate">
                    Paris, France
                </span>
            </div>  
        </div>  
    </div>

    <div className="mt-2 sm:mt-3">
        <h1 className="text-sm sm:text-base font-bold text-black leading-tight break-words">
            Barber Needed For Unisex Salon
        </h1>

        <p className="mt-1 text-gray-600 text-xs sm:text-sm leading-snug line-clamp-2">
            Hey We Need Experience Barber in Paris at Paris Salon
        </p>

        <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500">
            Posted 11 Hours Ago
        </p>
        
        <div className="mt-3 sm:mt-4 flex  flex-col  gap-3">
            <button className="w-full  h-8 text-xs sm:text-sm border rounded-md text-black hover:bg-gray-50 transition-colors">
                View Jobs
            </button>
            <button className="w-full h-8  text-xs sm:text-sm rounded-md bg-[#FA4909] text-white hover:bg-[#E54108] transition-colors">
                Apply Now
            </button>
        </div> 
    </div>
</div>
 )


}

export default JobCardComponent
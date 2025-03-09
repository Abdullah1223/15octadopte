const Uploadfilecomponent = ({title,acceptableformats})=>{

return(
    <>
    <h1 className="font-bold text-black mt-3">{title}</h1>
        <p className="mt-0 text-sm text-gray-400">Acceptable formats are {acceptableformats}</p>
        <div className="flex items-center relative ">   
        <div className="flex items-center justify-center border h-16 border-gray-400 border-dashed flex-col w-[17rem] sm:w-full lg:w-[21.5rem] xl:w-[25rem]">
          <div className="flex gap-1"> 
          <h1 className="font-bold hover:underline cursor-pointer text-[#ff7300] ">Choose file</h1>
          <h1 className="  text-[black] ">or drop here</h1>
          </div>
        </div>
        </div> 
   </>
)

}

export default Uploadfilecomponent;
const Newsletter = ()=>{
    return(
        <div className="flex justify-center">
        <div className="bg-white rounded-xl shadow-lg  w-[92%] h-96  mt-[37rem]">
            <div className=" flex gap-20 items-center justify-center h-full">
               <img className="w-[35rem] px-8 py-8" src="/newsletter 1.png"></img>
               <div className="flex flex-col px-3  py-8 self-start mt-16">
               <h1 className="text-black  font-bold text-3xl">Get News About Barber Industry</h1>
               <h1 className="text-gray-400 font-bold text-center mt-5 text-2xl">Subscribe Us To Get More Info</h1>
               
               <div className="flex gap-8 ">
                  <input type="text" className="w-56 h-10 mt-10 placeholder:text-black bg-gray-300 rounded-md shadow-xl px-4 " placeholder="Email"></input>  
                  <button className="bg-[#ff7300] shadow-xl text-white w-56 rounded-md  font-bold h-10 mt-10">Subscribe</button> 
               </div>
               </div>
            </div>
          </div>
        </div>
    )
}

export default Newsletter;
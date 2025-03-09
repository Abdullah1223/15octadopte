import Image from "next/image";
import Navbar from "../Components/Navbar";
import LoginCard from "../Components/LoginCard";
import Loginpagelgview from "../Components/Loginpagelgview";
import Loginpagesmview from "../Components/Loginpagesmview";

export default function Login(){


    return (
       <div>
        <Navbar></Navbar>
        <Loginpagelgview></Loginpagelgview>
        <Loginpagesmview></Loginpagesmview>   
       </div>
    )



}

//  <div>
//                <Navbar></Navbar>
//         <div className="w-full flex h-full  justify-center items-center">
//                <div className="mt-[4%]  justify-center  flex items-center w-full ">
//                  <div className="w-full  flex justify-center  items-center ">
                   
//                    <div className="grid  grid-cols-2">
//                          <div className="w-full rounded-2xl relative shadow-2xl shadow-gray-400 flex flex-col justify-center items-center border p-6   ">
                         
//                          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#FA490990] to-transparent"></div>

//                             <h1 className="text-3xl font-bold mt-10  text-black">ADOPTE UN COIFFER</h1>
//                             <h1 className="text-xl mt-1 font-bold text-center text-black">Where <span className="text-[white] bg-[#ff7300] px-2 font-bold">Barbers</span> Find </h1>
//                             <h1 className="text-3xl mt-1  font-bold text-center text-black">OPPORTUNITIES</h1>
//                            <div className="flex justify-center items-center mt-8">
//                            <Image className="z-10" src={'/loginpic.png'} width={200} height={200}></Image>
//                            </div>
//                          </div>
//                          <div className="relative -z-10  rounded-2xl shadow-2xl animate-slide-in-left bg-[#1D1D1D] shadow-gray-400 border w-full flex justify-center items-center p-10 ">
//                              <h1 className="text-black text-3xl font-bold">Welcome Back</h1>
// </div>

//                    </div>



//                  </div>     

//                </div>

//         </div>



//         </div>
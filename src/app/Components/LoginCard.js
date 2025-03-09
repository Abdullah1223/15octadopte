'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { Upload, File, ChevronDown, CircleUser, BriefcaseBusiness, User, UserIcon } from "lucide-react";
import Uploadfilecomponent from "./uploadfilecomponent";
import { useParams, useSearchParams } from "next/navigation";
const LoginCard = ()=>{
  const searchParams = useSearchParams()
  const value = searchParams.get('value')
  console.log(value)
  const [isSignup,setisSignup]=useState(true)
  const [file, setFile] = useState(null);
  const [isDropdown,setisDropdown]=useState(false)
  const [listVal,setlistVal]=useState('Candidate')
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    if (value) {
      setlistVal(value); // Update state when `value` changes
    }
  }, [value]);
  const handleDropdown=()=>{
    if(listVal=='Employer'){
      setlistVal('Candidate')
      setisDropdown(false)
    }else{
      setlistVal('Employer')
      setisDropdown(false)
    }
  }
return(

     isSignup?
     <div className={`flex lg:absolute shadow-xl top-16 lg:left-[61%] xl:left-[64%] bg-white border h-[23rem] ${listVal=='Candidate'?'h-full lg:h-[46rem]':'h-full lg:h-[58.9rem]'}  p-4 sm:p-9 lg:p-6 xl:p-9 rounded-xl`}>
      <div className="flex flex-col items-start">
      <h1 className=" font-extrabold text-gray-400 text-3xl ">Signup</h1>
        <div className="hidden lg:flex gap-4 items-center relative "> 
        <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
        <input type="text" placeholder="Name" className="h-11 w-[17rem] sm:w-[12rem] lg:w-[10rem]  xl:w-[12rem] px-8 border-black mt-10 border box-border rounded-md"></input>
        <Image className="absolute bottom-[17%] lg:ml-[11.5rem] xl:ml-[13.5rem] " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
        <input type="text" placeholder="Last Name" className="h-11 w-[17rem] sm:w-[12rem] lg:w-[10rem] xl:w-[12rem] px-8 border-black mt-10 border box-border rounded-md"></input>
        </div>

       <div className="flex lg:hidden gap-4 items-center relative">
       <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
        <input type="text" placeholder="Name" className="h-11 w-[17rem] sm:w-[21.5rem] px-8 border-black mt-6 border box-border rounded-md"></input>
      
       </div>
         
       <div className="flex lg:hidden gap-4 items-center relative">
       <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
        <input type="text" placeholder="Name" className="h-11 w-[17rem] sm:w-[21.5rem] px-8 border-black mt-6 border box-border rounded-md"></input>
      
       </div> 
        <div className="flex items-center relative "> 
        <Image className="absolute bottom-[22%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
        <input type="email" placeholder="Please Enter Your Email" className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.2rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
        </div>  


        {
          listVal=='Candidate'?
          <div>
                <div className="flex items-center relative "> 
                    <Image className="absolute bottom-[20%] ml-2 " src={"/padlock.png"} width={16} height={16} alt="Email name"></Image>
                    <Image className="absolute bottom-[20%] md:left-[90%] lg:left-[85%] xl:left-[90%] " src={"/view.png"} width={15} height={15} alt="Email name"></Image>
    
                    <input type="password" placeholder="Please Enter Your Password" className="h-11 w-[17rem] sm:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
                   </div>
        <Uploadfilecomponent title={"Please Upload A Cv"} acceptableformats={"Pdf"}></Uploadfilecomponent>
        <Uploadfilecomponent title={"Please Upload Profile Picture"} acceptableformats={"Png Jpg Jpeg"}></Uploadfilecomponent>
  
               </div>    
          :
          <div>
          <div className="flex items-center relative "> 
          <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
          <input type="email" placeholder="Please Enter Your Company Name" className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
         </div>
         <div className="flex items-center relative "> 
          <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
          <input type="text" placeholder="Please Enter Your SIRET Number" className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
         </div> 

          <div className="flex items-center relative "> 
          <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
          <input type="text" placeholder="Please Enter Id" className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
         </div>   
         <div className="flex items-center relative "> 
                    <Image className="absolute bottom-[20%] ml-2 " src={"/padlock.png"} width={16} height={16} alt="Email name"></Image>
                    <Image className="absolute bottom-[20%] left-[90%] " src={"/view.png"} width={15} height={15} alt="Email name"></Image>
    
                    <input type="password" placeholder="Please Enter Your Password" className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
                   </div>
         <Uploadfilecomponent title={"Please Upload Recent Kibs Document"} acceptableformats={"Pdf"}></Uploadfilecomponent> 
         <Uploadfilecomponent title={"Please Upload Company Logo "} acceptableformats={"Png Jpg Jpeg"}></Uploadfilecomponent> 
         </div>
        }

        <div className="flex items-center relative group">
  <div className="flex px-4 py-2 mt-4 rounded-lg h-12 items-center justify-between w-[17rem] sm:w-[21.5rem] lg:w-[21.2rem] xl:w-[25rem] border border-gray-300 hover:border-gray-400 focus-within:border-[#ff7300] transition-all duration-200 shadow-sm hover:shadow-md">
    <div className="flex items-center gap-3">
      {listVal=='Candidate'?<CircleUser size={20} className="text-gray-600" />:<BriefcaseBusiness size={20} className="text-gray-600"></BriefcaseBusiness>}
      <h1 className="font-semibold text-gray-700">{listVal=='Candidate'?"I'm a Candidate":"I'm a Employer"}</h1>
    </div>
    <ChevronDown 
      onClick={() => setisDropdown(!isDropdown)}
      className={`text-gray-500 transform transition-transform duration-200 ${isDropdown ? 'rotate-180' : ''}`}
    />
  </div>

  {isDropdown && (
    <div className="absolute top-[3.75rem] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mt-1">
      <div 
      onClick={()=>{handleDropdown()}}
        className="flex items-center gap-3 px-4 py-3 hover:bg-[#fff5e6] cursor-pointer transition-colors duration-200 group/item"
        role="button"
        tabIndex={0}
      >
       {listVal=='Candidate'?  <BriefcaseBusiness  size={18} className="text-gray-600 group-hover/item:text-[#ff7300]" />:
       <UserIcon  size={18} className="text-gray-600 group-hover/item:text-[#ff7300]"></UserIcon>
     } 
        <span className="text-gray-700 group-hover/item:text-[#ff7300] font-medium">{listVal=='Candidate'?"I'm a Employer":"I'm a Candidate"}</span>
      </div>
    </div>
  )}
</div>

  <p onClick={()=>setisSignup(false)} className="self-center text-black mt-5">Already Have A Account ? <span className="text-[#ff7300] cursor-pointer hover:underline">Login</span></p>
        {/* <Uploadfilecomponent title={"Please Upload A Cv"} acceptableformats={"Pdf"}></Uploadfilecomponent> */}
     <button className="self-center mt-5 h-10 text-white font-bold w-44 rounded-lg bg-[#ff3700]">Signup</button>
      </div>
      
     </div>
      :
      <div className="flex lg:absolute shadow-xl top-16 lg:left-[61%] xl:left-[64%] bg-white border h-[23rem] sm:h-[25rem] p-4 sm:p-9 rounded-xl">
                  <div className="flex flex-col items-start">
                  <h1 className=" font-extrabold text-gray-400 text-3xl ">Login</h1>
                   <div className="flex items-center relative "> 
                    <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
                    <input type="email" placeholder="Please Enter Your Email" className="h-11 w-[17rem] sm:w-[19rem] px-8 border-black mt-10 border box-border rounded-md"></input>
                   </div>  
                   <div className="flex items-center relative "> 
                    <Image className="absolute bottom-[20%] ml-2 " src={"/padlock.png"} width={16} height={16} alt="Email name"></Image>
                    <Image className="absolute bottom-[20%] left-[90%] " src={"/view.png"} width={15} height={15} alt="Email name"></Image>
    
                    <input type="email" placeholder="Please Enter Your Email" className="h-11 w-[17rem] sm:w-[19rem] px-8 border-black mt-8 border box-border rounded-md"></input>
                   </div> 
                   <h1 className="self-end mt-2 font-bold hover:text-[#ff7300] text-black ">Forget Password?</h1> 
                   <h1

                   onClick={()=>{setisSignup(true)}}
                   className="self-center text-black cursor-pointer mt-4">Dont Have Account?<span className="text-[#ff7300]"> Signup</span> </h1>   
                   <button className="w-44 h-10 self-center mt-6  bg-[#ff7300] text-white rounded-lg">Login</button>
                  </div>
                </div>
)



}

export default LoginCard;








// 'use client'
// import Image from "next/image";
// import { Suspense, useEffect, useState } from "react";
// import { Upload, File, ChevronDown, CircleUser, BriefcaseBusiness, User, UserIcon, MapPin } from "lucide-react";
// import Uploadfilecomponent from "./uploadfilecomponent";
// import { useParams, useSearchParams } from "next/navigation";
// import { useTranslation } from "../Context/TranslationContext.";
// const LoginCard = ()=>{
//         const { translate, setLanguage, language } = useTranslation();
//   const searchParams = useSearchParams()
//   const value = searchParams.get('value')
//   console.log(value)
//   const [isSignup,setisSignup]=useState(true)
//   const [file, setFile] = useState(null);
//   const [isDropdown,setisDropdown]=useState(false)
//   const [isRegionDropdown,setIsRegionDropdown]=useState(false)
//   const [listVal,setlistVal]=useState('Candidate')
//   const [selectedRegion,setSelectedRegion]=useState(translate('select_region'))
  
//   const regions = [
//     "Auvergne-Rhône-Alpes",
//     "Bourgogne-Franche-Comté",
//     "Bretagne",
//     "Centre-Val de Loire",
//     "Corse",
//     "Grand Est",
//     "Hauts-de-France",
//     "Île-de-France",
//     "Normandie",
//     "Nouvelle-Aquitaine",
//     "Occitanie",
//     "Pays de la Loire",
//     "Provence-Alpes-Côte d'Azur (PACA)",
//     "Guadeloupe",
//     "Guyane",
//     "La Réunion",
//     "Martinique",
//     "Mayotte"
//   ]
  
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };

//   useEffect(() => {
//     if (value) {
//       setlistVal(value); // Update state when `value` changes
//     }
//   }, [value]);
  
//   const handleDropdown=()=>{
//     if(listVal=='Employer'){
//       setlistVal('Candidate')
//       setisDropdown(false)
//     }else{
//       setlistVal('Employer')
//       setisDropdown(false)
//     }
//   }
  
//   const handleRegionSelect = (region) => {
//     setSelectedRegion(region)
//     setIsRegionDropdown(false)
//   }
  
// return(

//      isSignup?
//      <div className={`flex lg:absolute shadow-xl top-16 lg:left-[61%] xl:left-[64%] bg-white border h-[23rem] ${listVal=='Candidate'?'h-full lg:h-[52rem]':'h-full lg:h-[64rem]'}  p-4 sm:p-9 lg:p-6 xl:p-9 rounded-xl`}>
//       <div className="flex flex-col items-start">
//       <h1 className=" font-extrabold text-gray-400 text-3xl ">{translate('sign_up')}</h1>
//         <div className="hidden lg:flex gap-4 items-center relative "> 
//         <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
//         <input type="text" placeholder={translate('name')} className="h-11 w-[17rem] sm:w-[12rem] lg:w-[10rem]  xl:w-[12rem] px-8 border-black mt-10 border box-border rounded-md"></input>
//         <Image className="absolute bottom-[17%] lg:ml-[11.5rem] xl:ml-[13.5rem] " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
//         <input type="text" placeholder={translate('last_name')}  className="h-11 w-[17rem] sm:w-[12rem] lg:w-[10rem] xl:w-[12rem] px-8 border-black mt-10 border box-border rounded-md"></input>
//         </div>

//        <div className="flex lg:hidden gap-4 items-center relative">
//        <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
//         <input type="text" placeholder={translate('name')} className="h-11 w-[17rem] sm:w-[21.5rem] px-8 border-black mt-6 border box-border rounded-md"></input>
      
//        </div>
         
//        <div className="flex lg:hidden gap-4 items-center relative">
//        <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
//         <input type="text" placeholder={translate('last_name')} className="h-11 w-[17rem] sm:w-[21.5rem] px-8 border-black mt-6 border box-border rounded-md"></input>
      
//        </div> 
//         <div className="flex items-center relative "> 
//         <Image className="absolute bottom-[22%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
//         <input type="email" placeholder={translate('enter_email')}  className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.2rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
//         </div>  
        
//         {/* Region Dropdown */}
//         <div className="flex items-center relative group">
//           <div className="flex px-4 py-2 mt-6 rounded-lg h-12 items-center justify-between w-[17rem] sm:w-[21.5rem] lg:w-[21.2rem] xl:w-[25rem] border border-gray-300 hover:border-gray-400 focus-within:border-[#ff7300] transition-all duration-200 shadow-sm hover:shadow-md">
//             <div className="flex items-center gap-3">
//               <MapPin size={20} className="text-gray-600" />
//               <h1 className="font-semibold text-gray-700 truncate">{selectedRegion}</h1>
//             </div>
//             <ChevronDown 
//               onClick={() => setIsRegionDropdown(!isRegionDropdown)}
//               className={`text-gray-500 transform transition-transform duration-200 ${isRegionDropdown ? 'rotate-180' : ''}`}
//             />
//           </div>

//           {isRegionDropdown && (
//             <div className="absolute top-[3.75rem] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-64 mt-1 z-20">
//               {regions.map((region, index) => (
//                 <div 
//                   key={index}
//                   onClick={() => handleRegionSelect(region)}
//                   className="flex items-center gap-3 px-4 py-3 hover:bg-[#fff5e6] cursor-pointer transition-colors duration-200 group/item"
//                   role="button"
//                   tabIndex={0}
//                 >
//                   <MapPin size={18} className="text-gray-600 group-hover/item:text-[#ff7300]" />
//                   <span className="text-gray-700 group-hover/item:text-[#ff7300] font-medium">{region}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>


//         {
//           listVal=='Candidate'?
//           <div>
//                 <div className="flex items-center relative "> 
//                     <Image className="absolute bottom-[20%] ml-2 " src={"/padlock.png"} width={16} height={16} alt="Email name"></Image>
//                     <Image className="absolute bottom-[20%] left-[79%] sm:left-[90%] md:left-[90%] lg:left-[85%] xl:left-[90%] " src={"/view.png"} width={15} height={15} alt="Email name"></Image>
    
//                     <input type="password" placeholder={translate('enter_password')}  className="h-11 w-[17rem] sm:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
//                    </div>
//         <Uploadfilecomponent title={translate('upload_cv_login')}  acceptableformats={"Pdf"}></Uploadfilecomponent>
//         <Uploadfilecomponent title={translate('upload_profile_pic')} acceptableformats={"Png Jpg Jpeg"}></Uploadfilecomponent>
  
//                </div>    
//           :
//           <div>
//           <div className="flex items-center relative "> 
//           <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
//           <input type="email" placeholder={translate('enter_company_name')} className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
//          </div>
//          <div className="flex items-center relative "> 
//           <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
//           <input type="text" placeholder={translate('enter_siret_num')} className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
//          </div> 

//           <div className="flex items-center relative "> 
//           <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
//           <input type="text" placeholder={translate('enter_id')} className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
//          </div>   
//          <div className="flex items-center relative "> 
//                     <Image className="absolute bottom-[20%] ml-2 " src={"/padlock.png"} width={16} height={16} alt="Email name"></Image>
//                     <Image className="absolute bottom-[20%] left-[89%] " src={"/view.png"} width={15} height={15} alt="Email name"></Image>
    
//                     <input type="password" placeholder={translate('enter_password')} className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
//                    </div>
//          <Uploadfilecomponent title={translate('upload_kibs')} acceptableformats={"Pdf"}></Uploadfilecomponent> 
//          </div>
//         }

//         <div className="flex items-center relative group">
//   <div className="flex px-4 py-2 mt-4 rounded-lg h-12 items-center justify-between w-[17rem] sm:w-[21.5rem] lg:w-[21.2rem] xl:w-[25rem] border border-gray-300 hover:border-gray-400 focus-within:border-[#ff7300] transition-all duration-200 shadow-sm hover:shadow-md">
//     <div className="flex items-center gap-3">
//       {listVal=='Candidate'?<CircleUser size={20} className="text-gray-600" />:<BriefcaseBusiness size={20} className="text-gray-600"></BriefcaseBusiness>}
//       <h1 className="font-semibold text-gray-700">{listVal=='Candidate'?translate('i_am_a_candidate'):translate('i_am_a_employer')}</h1>
//     </div>
//     <ChevronDown 
//       onClick={() => setisDropdown(!isDropdown)}
//       className={`text-gray-500 transform transition-transform duration-200 ${isDropdown ? 'rotate-180' : ''}`}
//     />
//   </div>

//   {isDropdown && (
//     <div className="absolute top-[3.75rem] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mt-1 z-20">
//       <div 
//       onClick={()=>{handleDropdown()}}
//         className="flex items-center gap-3 px-4 py-3 hover:bg-[#fff5e6] cursor-pointer transition-colors duration-200 group/item"
//         role="button"
//         tabIndex={0}
//       >
//        {listVal=='Candidate'?  <BriefcaseBusiness  size={18} className="text-gray-600 group-hover/item:text-[#ff7300]" />:
//        <UserIcon  size={18} className="text-gray-600 group-hover/item:text-[#ff7300]"></UserIcon>
//      } 
//         <span className="text-gray-700 group-hover/item:text-[#ff7300] font-medium">{listVal=='Candidate'?translate('i_am_a_employer'):translate('i_am_a_candidate')}</span>
//       </div>
//     </div>
//   )}
// </div>

//   <p onClick={()=>setisSignup(false)} className="self-center text-black mt-5">{translate('already_have_account')} <span className="text-[#ff7300] cursor-pointer hover:underline">{translate('login')}</span></p>
//         {/* <Uploadfilecomponent title={"Please Upload A Cv"} acceptableformats={"Pdf"}></Uploadfilecomponent> */}
//      <button className="self-center mt-5 h-10 text-white font-bold w-44 rounded-lg bg-[#ff3700]">{translate('sign_up')}</button>
//       </div>
      
//      </div>
//       :
//       <div className="flex lg:absolute shadow-xl top-16 lg:left-[61%] xl:left-[64%] bg-white border h-[23rem] sm:h-[25rem] p-4 sm:p-9 rounded-xl">
//                   <div className="flex flex-col items-start">
//                   <h1 className=" font-extrabold text-gray-400 text-3xl ">{translate('login')}</h1>
//                    <div className="flex items-center relative "> 
//                     <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
//                     <input type="email" placeholder={translate('enter_email')} className="h-11 w-[17rem] sm:w-[19rem] px-8 border-black mt-10 border box-border rounded-md"></input>
//                    </div>  
//                    <div className="flex items-center relative "> 
//                     <Image className="absolute bottom-[20%] ml-2 " src={"/padlock.png"} width={16} height={16} alt="Email name"></Image>
//                     <Image className="absolute bottom-[20%] left-[90%] " src={"/view.png"} width={15} height={15} alt="Email name"></Image>
    
//                     <input type="email" placeholder={translate('enter_password')} className="h-11 w-[17rem] sm:w-[19rem] px-8 border-black mt-8 border box-border rounded-md"></input>
//                    </div> 
//                    <h1 className="self-end mt-2 font-bold hover:text-[#ff7300] text-black ">{translate('forget_password')}</h1> 
//                    <h1

//                    onClick={()=>{setisSignup(true)}}
//                    className="self-center text-black cursor-pointer mt-4">{translate('dont_have_account')}<span className="text-[#ff7300]"> {translate('sign_up')}</span> </h1>   
//                    <button className="w-44 h-10 self-center mt-6  bg-[#ff7300] text-white rounded-lg">{translate('login')}</button>
//                   </div>
//                 </div>
// )



// }

// export default function LoginCardWrapper() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <LoginCard />
//     </Suspense>
//   );
// }










'use client'
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { Upload, File, ChevronDown, CircleUser, BriefcaseBusiness, User, UserIcon, MapPin, Phone, Scissors, LogIn } from "lucide-react";
import Uploadfilecomponent from "./uploadfilecomponent";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "../Context/TranslationContext.";
const LoginCard = ()=>{
        const { translate, setLanguage, language } = useTranslation();
  const searchParams = useSearchParams()
  const value = searchParams.get('value')
  console.log(value)
  const [isSignup,setisSignup]=useState(true)
  const [file, setFile] = useState(null);
  const [isDropdown,setisDropdown]=useState(false)
  const [isRegionDropdown,setIsRegionDropdown]=useState(false)
  const [isCandidateTypeDropdown,setIsCandidateTypeDropdown]=useState(false)
  const [listVal,setlistVal]=useState('Candidate')
  const [selectedRegion,setSelectedRegion]=useState(translate('select_region'))
  const candidatetype = translate('select_candidate_type')
  const [selectedCandidateType,setSelectedCandidateType]=useState(candidatetype)
  
  const regions = [
    "Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté",
    "Bretagne",
    "Centre-Val de Loire",
    "Corse",
    "Grand Est",
    "Hauts-de-France",
    "Île-de-France",
    "Normandie",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Pays de la Loire",
    "Provence-Alpes-Côte d'Azur (PACA)",
    "Guadeloupe",
    "Guyane",
    "La Réunion",
    "Martinique",
    "Mayotte"
  ]
  
  // Hairdresser specialization options in French
  const candidateTypes = [
    "Coiffeur", // Barber
    "Coiffeur Mixte", // Mixed hairdresser
    "Coiffeur Femme", // Women's hairdresser
    "Coloriste", // Colorist
    "Coiffeur Homme", // Men's hairdresser
    "Coiffeur Enfant", // Children's hairdresser
    "Styliste", // Hair stylist
    "Technicien", // Technical specialist
    "Apprenti", // Apprentice
    "Alternant"
  ]
  
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
  
  const handleRegionSelect = (region) => {
    setSelectedRegion(region)
    setIsRegionDropdown(false)
  }
  
  const handleCandidateTypeSelect = (type) => {
    setSelectedCandidateType(type)
    setIsCandidateTypeDropdown(false)
  }
  
return(

     isSignup?
     <div className={`flex lg:absolute shadow-xl top-16 lg:left-[61%] xl:left-[64%] bg-white border h-[23rem] ${listVal=='Candidate'?'h-full lg:h-[62rem]':'h-full lg:h-[64rem]'}  p-4 sm:p-9 lg:p-6 xl:p-9 rounded-xl`}>
      <div className="flex flex-col items-start">
      <h1 className=" font-extrabold text-gray-400 text-3xl ">{translate('sign_up')}</h1>
        <div className="hidden lg:flex gap-4 items-center relative "> 
        <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
        <input type="text" placeholder={translate('name')} className="h-11 w-[17rem] sm:w-[12rem] lg:w-[10rem]  xl:w-[12rem] px-8 border-black mt-10 border box-border rounded-md"></input>
        <Image className="absolute bottom-[17%] lg:ml-[11.5rem] xl:ml-[13.5rem] " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
        <input type="text" placeholder={translate('last_name')}  className="h-11 w-[17rem] sm:w-[12rem] lg:w-[10rem] xl:w-[12rem] px-8 border-black mt-10 border box-border rounded-md"></input>
        </div>

       <div className="flex lg:hidden gap-4 items-center relative">
       <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
        <input type="text" placeholder={translate('name')} className="h-11 w-[17rem] sm:w-[21.5rem] px-8 border-black mt-6 border box-border rounded-md"></input>
      
       </div>
         
       <div className="flex lg:hidden gap-4 items-center relative">
       <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
        <input type="text" placeholder={translate('last_name')} className="h-11 w-[17rem] sm:w-[21.5rem] px-8 border-black mt-6 border box-border rounded-md"></input>
      
       </div> 
        <div className="flex items-center relative "> 
        <Image className="absolute bottom-[22%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
        <input type="email" placeholder={translate('enter_email')}  className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.2rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
        </div>  
        
        {/* Telephone input */}
        <div className="flex items-center relative "> 
          <Phone className="absolute bottom-[22%] ml-2 text-gray-600" size={15} />
          <input 
            type="tel" 
            placeholder={translate('enter_telephone')} 
            className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.2rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"
          />
        </div>
        
        {/* Region Dropdown */}
        <div className="flex items-center relative group">
          <div className="flex px-4 py-2 mt-6 rounded-lg h-12 items-center justify-between w-[17rem] sm:w-[21.5rem] lg:w-[21.2rem] xl:w-[25rem] border border-gray-300 hover:border-gray-400 focus-within:border-[#ff7300] transition-all duration-200 shadow-sm hover:shadow-md">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-600" />
              <h1 className="font-semibold text-gray-700 truncate">{selectedRegion}</h1>
            </div>
            <ChevronDown 
              onClick={() => setIsRegionDropdown(!isRegionDropdown)}
              className={`text-gray-500 transform transition-transform duration-200 ${isRegionDropdown ? 'rotate-180' : ''}`}
            />
          </div>

          {isRegionDropdown && (
            <div className="absolute top-[3.75rem] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-64 mt-1 z-20">
              {regions.map((region, index) => (
                <div 
                  key={index}
                  onClick={() => handleRegionSelect(region)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#fff5e6] cursor-pointer transition-colors duration-200 group/item"
                  role="button"
                  tabIndex={0}
                >
                  <MapPin size={18} className="text-gray-600 group-hover/item:text-[#ff7300]" />
                  <span className="text-gray-700 group-hover/item:text-[#ff7300] font-medium">{region}</span>
                </div>
              ))}
            </div>
          )}
        </div>


        {
          listVal=='Candidate'?
          <div>
                <div className="flex items-center relative "> 
                    <Image className="absolute bottom-[20%] ml-2 " src={"/padlock.png"} width={16} height={16} alt="Email name"></Image>
                    <Image className="absolute bottom-[20%] left-[79%] sm:left-[90%] md:left-[90%] lg:left-[85%] xl:left-[90%] " src={"/view.png"} width={15} height={15} alt="Email name"></Image>
    
                    <input type="password" placeholder={translate('enter_password')}  className="h-11 w-[17rem] sm:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
                </div>
                
                {/* Candidate Type Dropdown */}
                <div className="flex items-center relative group">
                  <div className="flex px-4 py-2 mt-6 rounded-lg h-12 items-center justify-between w-[17rem] sm:w-[21.5rem] lg:w-[21.2rem] xl:w-[25rem] border border-gray-300 hover:border-gray-400 focus-within:border-[#ff7300] transition-all duration-200 shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <Scissors size={20} className="text-gray-600" />
                      <h1 className="font-semibold text-gray-700 truncate">{selectedCandidateType}</h1>
                    </div>
                    <ChevronDown 
                      onClick={() => setIsCandidateTypeDropdown(!isCandidateTypeDropdown)}
                      className={`text-gray-500 transform transition-transform duration-200 ${isCandidateTypeDropdown ? 'rotate-180' : ''}`}
                    />
                  </div>

                  {isCandidateTypeDropdown && (
                    <div className="absolute top-[3.75rem] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-64 mt-1 z-20">
                      {candidateTypes.map((type, index) => (
                        <div 
                          key={index}
                          onClick={() => handleCandidateTypeSelect(type)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-[#fff5e6] cursor-pointer transition-colors duration-200 group/item"
                          role="button"
                          tabIndex={0}
                        >
                          <Scissors size={18} className="text-gray-600 group-hover/item:text-[#ff7300]" />
                          <span className="text-gray-700 group-hover/item:text-[#ff7300] font-medium">{type}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Uploadfilecomponent title={translate('upload_cv_login')}  acceptableformats={"Pdf"}></Uploadfilecomponent>
                <Uploadfilecomponent title={translate('upload_profile_pic')} acceptableformats={"Png Jpg Jpeg"}></Uploadfilecomponent>
          </div>    
          :
          <div>
          <div className="flex items-center relative "> 
          <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
          <input type="email" placeholder={translate('enter_company_name')} className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
         </div>
         <div className="flex items-center relative "> 
          <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
          <input type="text" placeholder={translate('enter_siret_num')} className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
         </div> 

          <div className="flex items-center relative "> 
          <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
          <input type="text" placeholder={translate('enter_id')} className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
         </div>   
         <div className="flex items-center relative "> 
                    <Image className="absolute bottom-[20%] ml-2 " src={"/padlock.png"} width={16} height={16} alt="Email name"></Image>
                    <Image className="absolute bottom-[20%] left-[89%] " src={"/view.png"} width={15} height={15} alt="Email name"></Image>
    
                    <input type="password" placeholder={translate('enter_password')} className="h-11 w-[17rem] sm:w-[21.5rem] lg:w-[21.5rem] xl:w-[25rem] px-8 border-black mt-6 border box-border rounded-md"></input>
                   </div>
         <Uploadfilecomponent title={translate('upload_kibs')} acceptableformats={"Pdf"}></Uploadfilecomponent> 
         </div>
        }

        <div className="flex items-center relative group">
  <div className="flex px-4 py-2 mt-4 rounded-lg h-12 items-center justify-between w-[17rem] sm:w-[21.5rem] lg:w-[21.2rem] xl:w-[25rem] border border-gray-300 hover:border-gray-400 focus-within:border-[#ff7300] transition-all duration-200 shadow-sm hover:shadow-md">
    <div className="flex items-center gap-3">
      {listVal=='Candidate'?<CircleUser size={20} className="text-gray-600" />:<BriefcaseBusiness size={20} className="text-gray-600"></BriefcaseBusiness>}
      <h1 className="font-semibold text-gray-700">{listVal=='Candidate'?translate('i_am_a_candidate'):translate('i_am_a_employer')}</h1>
    </div>
    <ChevronDown 
      onClick={() => setisDropdown(!isDropdown)}
      className={`text-gray-500 transform transition-transform duration-200 ${isDropdown ? 'rotate-180' : ''}`}
    />
  </div>

  {isDropdown && (
    <div className="absolute top-[3.75rem] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mt-1 z-20">
      <div 
      onClick={()=>{handleDropdown()}}
        className="flex items-center gap-3 px-4 py-3 hover:bg-[#fff5e6] cursor-pointer transition-colors duration-200 group/item"
        role="button"
        tabIndex={0}
      >
       {listVal=='Candidate'?  <BriefcaseBusiness  size={18} className="text-gray-600 group-hover/item:text-[#ff7300]" />:
       <UserIcon  size={18} className="text-gray-600 group-hover/item:text-[#ff7300]"></UserIcon>
     } 
        <span className="text-gray-700 group-hover/item:text-[#ff7300] font-medium">{listVal=='Candidate'?translate('i_am_a_employer'):translate('i_am_a_candidate')}</span>
      </div>
    </div>
  )}
</div>

  <p onClick={()=>setisSignup(false)} className="self-center text-black mt-5">{translate('already_have_account')} <span className="text-[#ff7300] cursor-pointer hover:underline">{translate('login')}</span></p>
        {/* <Uploadfilecomponent title={"Please Upload A Cv"} acceptableformats={"Pdf"}></Uploadfilecomponent> */}
     <button className="self-center mt-5 h-10 text-white font-bold w-44 rounded-lg bg-[#ff3700]">{translate('sign_up')}</button>
      </div>
      
     </div>
      :
      <div className="flex lg:absolute shadow-xl top-16 lg:left-[61%] xl:left-[64%] bg-white border h-[23rem] sm:h-[25rem] p-4 sm:p-9 rounded-xl">
                  <div className="flex flex-col items-start">
                  <h1 className=" font-extrabold text-gray-400 text-3xl ">{translate('login')}</h1>
                   <div className="flex items-center relative "> 
                    <Image className="absolute bottom-[17%] ml-2 " src={"/user (1).png"} width={15} height={15} alt="Email name"></Image>
                    <input type="email" placeholder={translate('enter_email')} className="h-11 w-[17rem] sm:w-[19rem] px-8 border-black mt-10 border box-border rounded-md"></input>
                   </div>  
                   <div className="flex items-center relative "> 
                    <Image className="absolute bottom-[20%] ml-2 " src={"/padlock.png"} width={16} height={16} alt="Email name"></Image>
                    <Image className="absolute bottom-[20%] left-[90%] " src={"/view.png"} width={15} height={15} alt="Email name"></Image>
    
                    <input type="email" placeholder={translate('enter_password')} className="h-11 w-[17rem] sm:w-[19rem] px-8 border-black mt-8 border box-border rounded-md"></input>
                   </div> 
                  <div className=" w-full gap-2 flex justify-end items-center">
                  <h1 className="  mt-2 font-bold hover:text-[#ff7300] text-black ">{translate('forget_password')}</h1> 
                  <LogIn className="mt-2" size={20}></LogIn>
                  </div>
                   <h1

                   onClick={()=>{setisSignup(true)}}
                   className="self-center text-black cursor-pointer mt-4">{translate('dont_have_account')}<span className="text-[#ff7300]"> {translate('sign_up')}</span> </h1>   
                   <button className="w-44 h-10 self-center mt-6  bg-[#ff7300] text-white rounded-lg">{translate('login')}</button>
                  
                   
                   </div>
                </div>
)



}

export default function LoginCardWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginCard />
    </Suspense>
  );
}
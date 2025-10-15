
import { Suspense } from "react";
import MainProfilePage from "../../Components/MainProfilePage";
import EmployerProfileSkeleton from "../../Sekeletons/ProfileInfoSkeleton";
import { getUserProfileInfo } from "../../Services/user.service";
import { Profile } from "../../interfaces/profileinterface";
// import { SetErrorInterface } from "../../interfaces/errorInterface";
// import { FaUserSlash } from "react-icons/fa";
import { cookies } from "next/headers";



export default async function page({params}){
  let profileDataProp:Profile | null = null;
  let isOwnerProp:boolean=false;
  let isFollowedProp:boolean=false;
  let error:boolean=false;
  let errorType:string |  null=null;
  
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  try{
    const userId = await params.id
   const response = await getUserProfileInfo(userId,token)

   const result = await response.json() 
   if(response.status==200){
    profileDataProp = result.userDetails;
    isOwnerProp = result.isOwner;
    isFollowedProp = result.userDetails.isFollowed
    error=false;
    errorType=null;
    // errorData=null; 
  }else if(response.status==400){
     if(result.type==="not_connected"){
       error=true;
       errorType="notLoggedIn";
     }
     error=true;
     errorType='Bad Request';
         
   }else if(response.status==404){
    error=true;
    errorType="NotFound";
        
   }else{
    error=true;
    errorType='ServerError';
    
   }
  }catch(err){
     profileDataProp = null;
     isOwnerProp=false;
     isFollowedProp=false;
     error=true;
     errorType='ServerError';
    
  } 
  
  console.log('profileInfo Data' , profileDataProp)
  return (
  
  <Suspense fallback={<EmployerProfileSkeleton></EmployerProfileSkeleton>}>
       <MainProfilePage profileDataProp={profileDataProp} isOwnerProp={isOwnerProp} isFollowedProp={isFollowedProp} errorProp={error}  errorTypeProp={errorType}></MainProfilePage>
  </Suspense>
  
)
   
}

import { updateCandidateProfilePictureProps } from "../interfaces/candidateInterface";
import axios, { AxiosError } from "axios";
import { interceptorAssignment } from "../lib/authState";
const identificationUrl = process.env.NEXT_PUBLIC_IDENTIFICATION_SERVICE

export const userInstance  = axios.create({
  baseURL:identificationUrl,
  withCredentials:true
})

// let isRefreshing=false;
// let failedQueue:any[]=[];

// const processQueue = (error:any, token:any=null)=>{
//   console.log('failedQueue` before',failedQueue)
//   failedQueue.forEach(prom=>{
//     if(error){
//       prom.reject(error)
//     }else{
//       prom.resolve(token)
//     }

//   })
 
//   failedQueue=[]
//  console.log('failedQUEUE after',failedQueue) 
// }

// // console.log('job Instance',userInstance.request)
// userInstance.interceptors.response.use((response)=>{
//   console.log('response from job service',response)
//   return response
// }, async error=>{
//   const originalRequest = error.config;
//   console.log('error response',error.response)
//   console.log('original request',originalRequest)  
//   if(error.response?.status===400 && !originalRequest._retry && error.response.data.type=="not_connected"){{
//       originalRequest._retry=true;
//       if(isRefreshing){
//         console.log('isRRefreshing', isRefreshing)
//         return new Promise((resolve,reject)=>{
//           failedQueue.push({resolve,reject})
//         }).then(token=>{
//           originalRequest.headers['Authorization']=`Bearer ${token}`;
//           return userInstance(originalRequest);
//         }).catch(err=>{
//           return Promise.reject(err);
//         })
//        console.log('is refreshing', isRefreshing) 
//       }else{
//         isRefreshing=true;
//         try{
//           const response = await axios.get(`${process.env.NEXT_PUBLIC_IDENTIFICATION_SERVICE}/auth/refresh`,{
//             withCredentials:true
//           });
//           const {accessToken} = response.data;
//           userInstance.defaults.headers['Authorization']=`Bearer ${accessToken}`;
//           processQueue(null,accessToken);
//           console.log('response from refresh',response)
//           return axios(originalRequest);
//         }catch(err){
//           processQueue(err);
//           return Promise.reject(err);
//         }finally{
//           isRefreshing=false;
//         }
//       }
//     }
//   } else{
//       return error
//     }
// })


interceptorAssignment(userInstance);

export const getUserProfileInfo = async(userId:string,token?:any)=>{
   
    try{
        const response = await fetch(`${identificationUrl}/user/fetch/userInfo/${userId}`, {
            headers: {
              'Content-Type': "application/json",
              Cookie:`token=${token?.value}`
            },
            method: "GET",
            credentials: "include"
          });
    
         return response; 
         
    }catch(Err){
        throw Error('Error Fetching Profile Info')
    }
}


export interface updateUserProfileInfoInterface{
    data:any,
    editingField:string,
    editValues:any
}
export const updateUserProfileInfo = async({data,editingField,editValues}:updateUserProfileInfoInterface)=>{

  
  try{

    const updatedVals = await userInstance.put(`${identificationUrl}/update/user/userProfile`, 
      {
        candidateId: data._id, 
        field: editingField, 
        value: editValues 
      },
      // {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ 
    //     candidateId: data._id, 
    //     field: editingField, 
    //     value: editValues 
    //   }),
    //   credentials:'include'
    // }
  );
  
    return updatedVals;
  }catch(err){
    throw Error('Error Updating User Profile')
  }
}


export const updateCandidateProfilePictureCall = async({fileInfo}:updateCandidateProfilePictureProps)=>{
  
           try{

            const response = await userInstance.put(`${identificationUrl}/update/profilePicture`,
             {fileInfo:fileInfo}
              // {
            //       headers:{
            //         'Content-Type':'Application/json'
            //       },
            //       method:'PUT',
            //       body:JSON.stringify({fileInfo:fileInfo}),
            //       credentials:'include',
            // }
          )

            return response;
           }catch(err){
            throw Error('Error At Uploading Profile Picture')
           }    

}

export const saveUserFav=async({userId,toSave})=>{
  try{

    const response = await userInstance.post('/save/user',{saveUserId:userId,toSave})
    return response;

  }catch(err){
    throw Error('Error At Saving User Favorite')
  }
}


export const changeEmailCall = async(email:string)=>{

  try{
    
    const response  = await userInstance.post('/Change/Email',{email})
    return response
  }catch(err){
    if(err instanceof AxiosError){
      return err.response;
    }
    throw Error('Error AT Chaning Email')
  }
}


export const verifyChangeEmailOtpCall = async(email:string,code:string)=>{

  try{
    
    const response  = await userInstance.post('/Verify/EmailChangeOtp',{email,code})
    return response
  }catch(err){
    if(err instanceof AxiosError){
      return err.response;
    }
    throw Error('Error At Verifying Otp')
  }
}

export const enableTwoFactorCall = async(isTwoFactor:boolean)=>{
  try{

    const response = await userInstance.post('/Enable/TwoFactor',{isTwoFactor})
    return response;
  }catch(err){
     if(err instanceof AxiosError){
      return err.response
     }
     throw Error('Error At Two Factor Authentication')
  }
}

export const verifyTwoFactorCall = async(verificationCode:string)=>{
  try{

    const response = await userInstance.post('/Validate/Authentication/TwoFactor',{verificationCode})
    return response;
  }catch(err){
     if(err instanceof AxiosError){
      return err.response
     }
     throw Error('Error At Two Factor Authentication')
  }
}


export const getSecuritySettingsCall = async()=>{
  try{

    const response = await userInstance.get('/Security/Settings')
    return response;
  }catch(err){
     if(err instanceof AxiosError){
      return err.response
     }
     throw Error('Error At FEtching Security Settings Authentication')
  }
}


export const verifyDisable2FACall = async(verificationCode:string)=>{
  try{

    const response = await userInstance.post('/Verify/Disable/2FA',{verificationCode})
    return response;
  }catch(err){
     if(err instanceof AxiosError){
      return err.response
     }
     throw Error('Error At FEtching Security Settings Authentication')
  }
}

export const verifyCurrentPasswordCall = async(currentPassword:string)=>{
  try{

    const response = await userInstance.post('/Current/Verify/Password',{currentPassword})
    return response;
  }catch(err){
     if(err instanceof AxiosError){
      return err.response
     }
     throw Error('Error At FEtching Security Settings Authentication')
  }
}


export const changePasswordCall = async(password:string,confirmPassword:string,token:string,)=>{
  try{

    const response = await userInstance.post('/Password/Change',{password,confirmPassword,token})
    return response;
  }catch(err){
     if(err instanceof AxiosError){
      return err.response
     }
     throw Error('Error At FEtching Security Settings Authentication')
  }
}
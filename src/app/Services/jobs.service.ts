import {  Dispatch, SetStateAction } from "react"
import { JobFetchErrorServer } from "../ErrorMessages/errorMessages"
import axios, { AxiosResponse } from "axios"
import { interceptorAssignment } from "../lib/authState"
const jobUrl = process.env.NEXT_PUBLIC_JOB_SERVICE      
export const jobInstance  = axios.create({
  baseURL:jobUrl,
  withCredentials:true
})

// let isRefreshing=false;
// let failedQueue:any[]=[];

// const processQueue = (error:any, token:any=null)=>{
//   failedQueue.forEach(prom=>{
//     if(error){
//       prom.reject(error)
//     }else{
//       prom.resolve(token)
//     }

//   })
// }

// // console.log('job Instance',jobInstance.request)
// jobInstance.interceptors.response.use((response)=>{
//   console.log('response from job service',response)
//   return response
// }, async error=>{
//   const originalRequest = error.config;
//   console.log('error response',error.response)
//   console.log('original request',originalRequest)  
//   if(error.response?.status===401 && !originalRequest._retry){{
//       originalRequest._retry=true;
//       if(isRefreshing){
//         return new Promise((resolve,reject)=>{
//           failedQueue.push({resolve,reject})
//         }).then(token=>{
//           originalRequest.headers['Authorization']=`Bearer ${token}`;
//           return axios(originalRequest);
//         }).catch(err=>{
//           return Promise.reject(err);
//         })
//        console.log('is refreshing', isRefreshing) 
//       }else{
//         isRefreshing=true;
//         try{
//           const response = await axios.get(`${process.env.NEXT_PUBLIC_IDENTIFICATION_SERVICE}/refresh`,{
//             withCredentials:true
//           });
//           const {accessToken} = response.data;
//           jobInstance.defaults.headers['Authorization']=`Bearer ${accessToken}`;
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
//   } 
// })

interceptorAssignment(jobInstance)

export const fetchingJobs = async(
    cursorRegular:string,cursorPromoted:string,prevDocsRegular:string[],prevDocsPromoted:string,
  

)=>{
    const jobUrl = process.env.NEXT_PUBLIC_JOB_SERVICE      
   try{
    const response = await fetch(`${jobUrl}/mainJobs/get/jobs`,
      {  
      headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({cursorRegular,cursorPromoted,prevDocsRegular,prevDocsPromoted}),
    } )
    
        // console.log('jobInstance',jobInstance.request)
    
      //  console.log('fetching jobs response before call) 
       return response;

       }catch(err){
        console.log('err')
        throw Error('Error fetching jobs from server')
       } 
    }


export interface getEmployerJobsInterface{
    cursor:string[],
    prevDocIds:string[]
}    
export const getEmployerJobs = async({cursor,prevDocIds}:getEmployerJobsInterface):Promise<AxiosResponse>=>{
      try{const response = await jobInstance.post('/fetch/jobs/employerDashboard',
       {cursor,prevDocIds}
        //   {
      //   headers:{
      //     'Content-Type':"application/json"
      //   },
      //   method:"POST",
      //   body:JSON.stringify({cursor,prevDocIds}),
      //   credentials:"include"
       
      // }
    )   
      
        return response;
    
       }catch(err){
        throw Error('Error Fetching Employer Jobs')
       }
     }   


export const fetchingJobInfo = async(jobId:string)=>{

   try{
    
  const response = await jobInstance.get(`/job/info/${jobId}`,
  //   {
  //   headers:{
  //     'Content-Type':'Application/json'
  //   },
  //   method:"GET",
  //   credentials:'include'
  //  }
  )
   
   return response;
   }catch(err){
    throw Error('Error Fetching Job Info')
   }

}     


export interface likeJobInterface{
  jobId:string,
  isLiked:boolean
}
export const likeJob  = async({jobId,isLiked}:likeJobInterface)=>{
  try{
    const response = await jobInstance.post(`${jobUrl}/job/liked`,
    {jobId,isLiked:!isLiked},
      //    {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ jobId, isLiked: !isLiked }),
    //   credentials:"include"
    // }
  );
    
    return response;

  }catch(err){
    console.log('err' , err)
    throw Error('Error Liking Job')
  }
}

export interface saveJobInterface{
  jobId:string,
  isSaved:boolean
}
export const saveJob = async({jobId,isSaved})=>{
  try{
    const response = await fetch(`${jobUrl}/job/saved`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, isSaved: !isSaved }),
      credentials:"include"
    });
    return response;
  }catch(err){
    console.log('err' , err)
    throw Error('Error Saving Job')
  }
}


export const getCreatorJobs=async({creatorId,lastCursor,prevDocuments})=>{


   try{

     const response = await jobInstance.post(`/get/creatorJobs`, 
     {creatorId,lastCursor,prevDocuments}
      //   {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   method: "POST",
    //   credentials: "include",
    //   body: JSON.stringify({creatorId, lastCursor, prevDocuments })
    // }
  );
    
    return response;

   }catch(err){
    // console.log('Error',err)
    throw Error('Error Fetching Creator Jobs')
   }

}
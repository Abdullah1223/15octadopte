import { jobInstance } from "./jobs.service";
import { userInstance } from "./user.service";

const jobUrl = process.env.NEXT_PUBLIC_JOB_SERVICE
const identificationUrl = process.env.NEXT_PUBLIC_IDENTIFICATION_SERVICE
export const fetchCv = async(userId:string)=>{
    try{
        
    const response = await jobInstance.get(`${jobUrl}/fetch/cv/${userId}`,
    //   {
    //     headers:{
    //         'Content-Type':"application/json"
    //     },
    //     method:"GET",
    //     credentials:"include"
    // }
  )

    return response;
    }catch(err){
        throw Error('Error Fetching CV')
    }
}

export const getCvProfileInfoCall = async(candidateId:string)=>{

   try{

    const response = await userInstance.get(`/view/getCv/${candidateId}`)
    return response;

   }catch(err){
    throw Error('Error Fetching Cv Profile Info Call')
   }
}
export const userInfoCv = async(cursor:string,prevDocs:string[])=>{
    try{

        const response = await userInstance.post(`${identificationUrl}/fetch/userInfoCv`,
          {cursor,prevDocs},
          // {
          //   headers:{
          //     'Content-Type':"application/json"
          //   },
          //   method:"POST",
          //   body:JSON.stringify({cursor,prevDocs}),
          //   credentials:"include"
          // }
        )
          console.log('before fetch cv response',response)
         return response; 
    }catch(err){
        throw Error('Error Fetching User Cvs')
    }
  
}

export const getSavedCv = async({cursor,prevDocs})=>{
    try{
        const response = await userInstance.post(`/fetch/savedCvDetails`,
          {cursor,prevDocs},
          //  {
          //   headers: {
          //     'Content-Type': "application/json"
          //   },
          //   method: "POST",
          //   body:JSON.stringify({cursor,prevDocs}),
          //   credentials: "include"
          // }
        );

        return response;
    }catch(err){
        throw Error('Error Fetching Saved CVs')
    }
}


export const saveUserCv =async  ({userId,saveUser})=>{
  try{
    const response = await userInstance.post('/save/user',
     {saveUserId:userId,toSave:saveUser},
      // {
      
      //   headers:{
      //     'Content-Type':"application/json"
      //   },
      //   body:JSON.stringify({saveUserId:userId,toSave:saveUser}),
      //   credentials:"include",
      //   method:"POST"
      // }
    )

    return response;
  }catch(err){
    throw Error('Error Saving User Cv')
  }
}


export const uploadCvCall = async ({fileName,fileSize,fileType})=>{

  try{


    const response = await userInstance.post('/uploadCv',{name:fileName,size:fileSize,type:fileType})
    return response;


  }catch(err){
    throw Error('Error Uploading Cv')
  }
}


export const getUploadCvPresigned = async({fileMetadata})=>{
    try{

       const  response = userInstance.post('/uploadCv',fileMetadata) 
       return response;

    }catch(err){
        throw Error ('Error  uploading cv')
    }
}
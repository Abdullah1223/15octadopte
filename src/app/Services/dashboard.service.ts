import { userInstance } from "./user.service"

export const getDashboardStatsCall = async()=>{
   try{
        const response = await userInstance('/Dashboard/Stats',
        // {
    //   headers:{
    //     'Content-Type':'application/json'
    //   },
    //   method:"GET",
    //   credentials:"include"
    // }

)
  
return response;

   }catch(err){
    throw Error('Error Fetching DAshboard Stats')
   }
}
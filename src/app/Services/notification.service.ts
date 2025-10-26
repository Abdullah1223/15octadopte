import { messageInstance } from "./message.service";

export const fetchNotifications = async(cursor,prevDocs)=>{
    try{
        const response = await messageInstance.post(`/notifications/fetch`,
          {cursor,prevDocs}
          // {
        
          //   headers:{
          //     'Content-Type':'Application/json'
          //   },
          //   method:"POST",
          //   body:JSON.stringify({cursor,prevDocs}),
          //   credentials:"include"
          // }
        )
          
        return response;  
    }catch(err){
        throw Error('Error At Fetching Notifications')
    }
     
}
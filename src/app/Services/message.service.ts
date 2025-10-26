import { Dispatch, SetStateAction } from "react";
import { MessageInterface } from "../interfaces/MessageInterfaces";
import { Result } from "../interfaces/errorInterface";
// import
import axios from "axios";
import { interceptorAssignment } from "../lib/authState";
const Url = process.env.NEXT_PUBLIC_NOTIFICATION_AND_MESSAGE_SERVICE

export const messageInstance = axios.create({
  baseURL:Url,
  withCredentials:true
})

interceptorAssignment(messageInstance)



export const fetchingMessages = async(chatId:string,prevId:string | null,prevDocumentIds:string[] | null,setCurrentConversation:Dispatch<SetStateAction<MessageInterface[]>>,setPrevId:Dispatch<SetStateAction<string | null>>,setPrevDocumentIds:Dispatch<SetStateAction<any[]>>,setHasMore:Dispatch<SetStateAction<boolean>> ):Promise<MessageInterface[]>=>{
 try{
    // console.log('ftehcingMessages'  ,prevId,prevDocumentIds)
    const response = await messageInstance.post(`/fetch/chat`,
      {chatId,prevId,prevDocumentIds}
      // {
      //   headers:{
      //     'Content-Type':"application/json"
      //   },
      //   method:"POST",
      //   body:JSON.stringify({chatId,prevId,prevDocumentIds}),
      //   credentials:'include'
      // }
    )

    const result =  await response.data;
    // console.log('response status' , response.status)
    //console.log('cha'  , result.messages) 
    if(response.status==200){
        // console.log('result' , result)
        setCurrentConversation((prev: MessageInterface[]) => {
          if (prev.length === 0) {
            return result.messages;
          }
        
          const existingIds = new Set(prev.map(msg => msg?._id?.toString()));
        
          const newOnes = result?.messages?.filter(
            msg => !existingIds.has(msg?._id.toString())
          );
        
          return [...newOnes,...prev];
        });
    setPrevId(result.previousId)
    setPrevDocumentIds((prev:any)=>{
      if(prev==null){
        return result?.previousDocumentIds
      }
      return [...prev,...result?.previousDocumentIds]
    })
    setHasMore(result.hasMore) 
  }else if(response.status==404){
    setHasMore(false)
  }
    
   return result

 }catch(err){

    return err
 }
}


export const messageSent = async(uniqueId:string,newMessage:string,receiverId:string)=>{

    try{
      const response = await messageInstance.post(`/user/message/messageSent`,
      {messageDetails:{_id:uniqueId,messageContent:newMessage,receiverId:receiverId}}
        //   {
      //   headers:{
      //     'Content-Type':"application/json"
      //   },
      //   method:"POST",
      //   credentials:"include",
      //   body:JSON.stringify({messageDetails:{_id:uniqueId,messageContent:newMessage,receiverId:receiverId}})
      // }
    )
     
      return response;
      
    }catch(err){
      console.log('Err At messageSent')
      throw Error('Error At Sending Message')
    }
   
}
import { QueryObserverResult, useMutation, useQuery } from "@tanstack/react-query"
import { fetchingMessages, messageSent } from "../Services/message.service"
import { handleMessageSentProps, MessageInterface, useMessageSentInterface } from "../interfaces/MessageInterfaces"
import { Result } from "../interfaces/errorInterface"
import { Dispatch, SetStateAction } from "react"
import { toast } from "sonner"
import { messageSentError, NotLoggedInErrorMessage } from "../ErrorMessages/errorMessages"

export interface useMessageInterface{
     messages:MessageInterface[] | undefined,
     messagesLoading:boolean,
     messagesError:Error | null;
     refetchMessages: () => void;
}
export function useMessage(chatId:string,prevId:string | null,prevDocumentIds:string[] | null,setCurrentConversation:Dispatch<SetStateAction<MessageInterface[]>>,setPrevId:Dispatch<SetStateAction<string | null>>,setPrevDocumentIds:Dispatch<SetStateAction<any[]>>,setHasMore:Dispatch<SetStateAction<boolean>>):useMessageInterface{

     const {data:messages,isPending:messagesLoading,error:messagesError,mutate:refetchMessages} = useMutation<MessageInterface[],Error>({
       
        mutationFn:()=>fetchingMessages(chatId,prevId,prevDocumentIds,setCurrentConversation,setPrevId,setPrevDocumentIds,setHasMore),
        
     }) 
    
   
   return {
    messages,
    messagesLoading,
    messagesError,
    refetchMessages
   }  

}




export function UseMessageSent():useMessageSentInterface{
     
    const handleMessageSent = async({uniqueId,newMessage,receiverId,setCurrentConversation}:handleMessageSentProps)=>{
 
    try{

      
      const response = await messageSent(uniqueId,newMessage,receiverId)
      const result = await response.data;
      // console.log('handlesentmessage',result)
     if(response.status==200){
      setCurrentConversation((prev)=>{
        return  prev.map((message)=>{
         // console.log('message',message)
            if(message.uniqueId==result.uniqueId){
              console.log('inside one')
               return {
               ...message,
               messageStatus:result.messageStatus,
               messageId:result.messageId
              }
            }
           return message; 
         })
      })
     }else if(response.status==400){
      if(result.type=="not_connected"){
         toast.error(NotLoggedInErrorMessage.title,{
            description:NotLoggedInErrorMessage.description
         })
        setCurrentConversation((prev)=>{
         const filteredArray = prev.filter((message)=>message.uniqueId!==uniqueId)
         return filteredArray
        }) 
         return ;
      }
      toast.error(messageSentError.title,{
         description:messageSentError.description
      })
      setCurrentConversation((prev)=>{
          const filteredArray = prev.filter((message)=>message.uniqueId!==result.uniqueId)
         return [...filteredArray]
         })

     }      
    }catch(err){
         console.log('err')
         toast.error(messageSentError.title,{
            description:messageSentError.description
         })
         setCurrentConversation((prev)=>{
            const filteredArray = prev.filter((message)=>message.uniqueId!==uniqueId)
            return filteredArray
           })
      //revert the message
      //show the error
      throw Error('Error At Sending Message')
    }

    }

    return {
      handleMessageSent
    }

}
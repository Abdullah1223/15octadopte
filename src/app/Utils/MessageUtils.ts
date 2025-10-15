import { chatOpponentDetails } from "../interfaces/chatInterface";

interface chats{
    chatId:string,
    opponentName:string,
    opponentId:string,
    avatar_url:string,
}
export const isSender = (senderId:string,userId:string):boolean=>{
    return senderId?.toString() === userId?.toString();
};
export const findSenderDetails = (chatId:string,senderId:string,userId:string,chats:chats[],isWant?:boolean):chatOpponentDetails | null=>{
        // console.log('find Sender Details',chatId,senderId,userId,chats)

       const isSent = isSender(senderId,userId);
    //    console.log('isSent ', isSent)
       if(isWant){

       if(isSent){
           return null;
       } 
    }
     console.log('chatId' , chatId)
       const chat = chats.find((item)=>item.chatId.toString()==chatId.toString());
    //    console.log('returned chat' , chat)
       return chat ;
                    
}
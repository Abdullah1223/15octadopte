import { Dispatch, SetStateAction } from "react"

export interface MessageInterface{

    messageId:string,
    chatId:string,
    senderId:string,
    receiverId:string,
    message:string,
    messageStatus:string,
    createdAt:Date,
    updatedAt:Date,
    isRead:boolean,
    isDeleted:boolean,
    deletedAt:Date,
    editedAt:Date,
    editedMessage:string,
    message_type:string,
    isEdited:boolean,
    isLiked:boolean,
    likedType:string,
    uniqueId?:string,
}

export interface handleMessageSentProps{
    uniqueId:string,
    newMessage:string,
    receiverId:string,
    setCurrentConversation:Dispatch<SetStateAction<MessageInterface[]>>
}
export interface useMessageSentInterface{
  
    handleMessageSent(props:handleMessageSentProps):Promise<void>
     
}

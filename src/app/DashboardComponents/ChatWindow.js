// // ChatWindow.jsx
// import { useEffect, useState } from 'react';
// import MessageBubble from './MessageBubble';
// import Image from 'next/image';
// import PreviewPage from '../PreviewPageFolder/page';

'use client';

import { ArrowLeft, Mic, MoreVertical, Paperclip, Phone, Send, Smile, Video } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { addChat, findChat } from "../store/ChatInfo";
import { useDispatch, useSelector } from "react-redux";
import { useMessage, UseMessageSent } from "../Hooks/useMessages";
import { findSenderDetails, isSender } from "../Utils/MessageUtils";
import { useInView } from "react-intersection-observer";
import { useSocket } from "../Context/socketContext";
import Image from "next/image";

// const ChatWindow = ({ conversation, onBack, isMobile,setConversation,currentChat }) => {
//   const [newMessage, setNewMessage] = useState('');
//   const [currentConversation,setCurrentConversation]=useState({})
//   console.log('conversation' , conversation)
//   const uniqueId = crypto.randomUUID();
//   console.log('currentChat' , currentChat)
//   const findingCurrentConversation = (chatData)=>{
    
//     const  currentConvo = conversation?.find((item)=>item.chatId===chatData.chatId)
//     console.log('current Convo ' , currentConvo) 
//     setCurrentConversation({...currentConvo,receiverId:chatData?.opponentId})
//   }
//   useEffect(()=>{
//     console.log('use Effect ran')
//     console.log('currentChat',  currentChat)  
//     findingCurrentConversation(currentChat)
//   },[currentChat])
  
//   const handleSend = async(e) => {
//     e.preventDefault();
//    console.log('currentConversation' , currentConversation) 
//     console.log(conversation)
//      setCurrentConversation((prev)=>{
//     //console.log('inside set ' , prev)
//     if(!Array.isArray(prev)){
//       return;
//     }
//     console.log('past array check')
//      for(const i of prev){
//       console.log('inside set',i)
//       if(i.chatId===currentChat.chatId){
//         i?.messages?.push({ sender:"you",
//           content:newMessage,
//           id:uniqueId,
//           messageStatus:'seen', 
//           time:"24 feb"
//         })
      
//       }
//      }
//       // if(prev.chatId==conversation.chatId){
//       //   prev?.messages?.push({ sender:"you",
//       //     content:newMessage,
//       //     _id:uniqueId,
//       //     messageStatus:'seen', 
//       //     time:"24 feb"
//       //   })
//       // } 
//       console.log('returning prev' , prev)
//       return prev;
      
//      })
//      console.log('cuurentConversation' , currentConversation)
//     // const response = await fetch('http://localhost:8004/user/message/messageSent',{
//     //   headers:{
//     //     'Content-Type':"application/json"
//     //   },
//     //   method:"POST",
//     //   credentials:"include",
//     //   body:JSON.stringify({messageDetails:{_id:uniqueId,messageContent:newMessage,receiverId:currentChat.receiverId}})
//     // })

//     // const result = await response.json()
//     // if(response.status==200){
//     //   setCurrentConversation((prev) => {
//     //     if (!Array.isArray(prev)) return [];
      
//     //     return prev.map(chat => {
//     //       if (chat.chatId !== currentChat.chatId) return chat;
      
//     //       // Update the messages inside the matching chat
//     //       const updatedMessages = chat.messages.map(message => {
//     //         if (message.id === result.uniqueId) {
//     //           return {
//     //             ...message,
//     //             messageStatus: 'sent', // or whatever you want to update
//     //             // add other properties you want to update
//     //           };
//     //         }
//     //         return message;
//     //       });
      
//     //       return {
//     //         ...chat,
//     //         messages: updatedMessages,
//     //       };
//     //     });
//     //   });
//     // }      
//   };
  
//   return (
//     <div className=" w-[100vh]  flex flex-col h-full">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 p-4 flex items-center">
//         {isMobile && (
//           <button 
//             onClick={onBack} 
//             className="mr-3 text-gray-600"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//         )}
//         <div className="w-10 h-10 rounded-full bg-gray-200 mr-3">
//           <img src={conversation?.opponentDetails?.profilePicture?.url || "/user (1).png"} width={40} height={40} alt="user"></img>
//         </div>
//         <h3 className="font-medium">{conversation?.contact}</h3>
//       </div>
      
//       {/* Messages area */}
//       <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//         {currentConversation?.messages?.map((message, index) => (
//           <MessageBubble 
//             key={index}
//             message={message}
//             messageStatus={message.messageStatus}
//             isSent={message.sender === 'you'}
            
//           />
//         ))}
//       </div>
      
//       {/* Input area */}
//       <div className="border-t border-gray-200 p-4 bg-white">
//         <form onSubmit={handleSend} className="flex">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//             placeholder="Type your message..."
//           />
//           <button 
//             type="submit" 
//             className="bg-orange-500 text-white p-2 rounded-r-lg"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//             </svg>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;




// ChatWindow Component - Completely rebuilt
const ChatWindow = ({ conversation, onBack, isMobile, setConversation, currentChat }) => {
  const [newMessage, setNewMessage] = useState('');
  const [currentConversation, setCurrentConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [prevId,setPrevId]=useState(null)
  const {socket} = useSocket()
  const [prevDocumentIds,setPrevDocumentIds]=useState(null)
  const [hasMore,setHasMore]=useState(true)
  const selector  = useSelector(  (state)=>state.chat)
  const {ref,inView}=useInView() 
  const userSelector = useSelector((state)=>state.user)
  const userId = userSelector.userId;
  const chatId = useParams().chatId;
  const loadCount = useRef(0)
  const uniqueId = crypto.randomUUID();
  const dispatch = useDispatch()
  const [userDetails,setUserDetails]=useState({})
  const {handleMessageSent} = UseMessageSent()
  const {messages,messagesLoading,messagesError,refetchMessages} = useMessage(chatId,prevId,prevDocumentIds,setCurrentConversation,setPrevId,setPrevDocumentIds,setHasMore)
   
  // {console.log('hasMore' , hasMore)}
  //  console.log('conversation' , currentConversation)
  useEffect(()=>{
    refetchMessages()
  },[])

  useEffect(()=>{
    loadCount.current++
    // console.log('loadCount' , loadCount.current)
    if(inView && !messagesLoading && !messagesError && loadCount.current>3 && hasMore){
      // console.log('refetch called')
      // console.log('prevId',prevId)
      // console.log('prevDocumentIds',prevDocumentIds)
      // console.log('hasMore',hasMore)
      refetchMessages()
    }
  },[inView])
  
  const handleSend = async () => {
    if (!newMessage.trim()) return;
     const details = findSenderDetails(chatId,userId,userId,selector.chats,false)
    //  console.log('details' , details.opponentId)
     
    const newMsg = {
      senderId:userId,
      message: newMessage,
      chatId:details.chatId,
      createdAt:Date.now(),
      editedAt:null,
      editedMessage:"",
      isDeleted:false,
      isEdited:false,
      isLiked:false,
      isRead:false,
      likedTyped:"none",
      messageId:'',
      messageStatus:"pending",
      message_type:"text",
      receiverId:details.opponentId,
      uniqueId: uniqueId,
    
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setCurrentConversation((prev) => [...prev,newMsg]);
   await handleMessageSent({uniqueId:uniqueId,newMessage:newMsg.message,receiverId:details.opponentId,setCurrentConversation}) 
  
   // setCurrentConversation((prev) => {
    //   if (!prev || !prev.messages) return prev;
    //   return {
    //     ...prev,
    //     messages: [...prev.messages, newMsg]
    //   };
    // });

    setNewMessage('');
    
    // Simulate typing indicator
    // setTimeout(() => {
    //   setIsTyping(true);
    //   setTimeout(() => {
    //     setIsTyping(false);
    //     setCurrentConversation((prev) => [...prev,newMsg]);
    //     console.log('currentconvo' , currentConversation)
    //   }, 2000);
    // }, 500);
    // console.log('current Convo ' , currentConversation)
  };

  useEffect(()=>{
    const chatInfo = selector?.chats?.find(chat=>chat?.chatId===chatId)
    setUserDetails(chatInfo)
  },[chatId])

  useEffect(()=>{
    socket?.on('new_Message',(data)=>{
      console.log('data',data)
      if(chatId==data.chatId){
        setCurrentConversation((prev)=>[...prev,data])
        // setCurrentConversation((prev)=>{
        //   return prev.map((prevMessage)=>{
        //     console.log('prevMessage',prevMessage)
        //     if(prevMessage?.messageId==data?.messageId){
        //       return {...prevMessage,messageStatus:data.messageStatus}
        //     }
        //     return prevMessage;
        //   })
        // })
      }
    })
    socket?.on('message_Status',(data)=>{
     if(chatId==data.chatId){
      setCurrentConversation((prev)=>{
          return prev.map((prevMessage)=>{
            // console.log('prevMessage',prevMessage)
            if(prevMessage?.messageId==data?.messageId){
              return {...prevMessage,messageStatus:data.messageStatus}
            }
            return prevMessage;
          })
        })
     }
    })
  },[socket])
  // if (!currentConversation || !currentConversation.messages) {
  //   return (
  //     <div className="flex-1 h-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
  //       {/* Animated background elements */}
  //       <div className="absolute inset-0 overflow-hidden">
  //         <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse" />
  //         <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 animate-bounce" />
  //       </div>
        
  //       <div className="text-center z-10">
  //         <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
  //           <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  //           </svg>
  //         </div>
  //         <h3 className="text-2xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
  //           Start a Conversation
  //         </h3>
  //         <p className="text-gray-600 font-medium">Select a chat to begin messaging</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div  className="flex  flex-col h-full bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Header with glassmorphism */}
      <div className="bg-white bg-opacity-80 backdrop-blur-sm border-b border-white border-opacity-50 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <button 
                onClick={onBack} 
                className="mr-3 p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
            )}
            
            <div className="relative mr-4">
              {
                userDetails?.avatar_url ? 
                <Image
                  src={userDetails?.avatar_url}
                  alt="User Avatar" 
                  width={40}
                  height={40}
                  className="w-12 h-12 rounded-full"
                /> :
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg">
                {(userDetails?.avatar_url || 'U').charAt(0).toUpperCase()}
              </div>
             }
              {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse" /> */}
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{userDetails?.opponentName || 'User'}</h3>
              {/* <p className="text-sm text-green-500 font-medium flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                Active now
              </p> */}
            </div>
          </div>
{/*           
          <div className="flex items-center space-x-1">
            {[Phone, Video, MoreVertical].map((Icon, index) => (
              <button 
                key={index}
                className="p-3 hover:bg-white hover:bg-opacity-50 rounded-full transition-all duration-200 transform hover:scale-110 group"
              >
                <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </button>
            ))}
          </div> */}
        </div>
      </div>
      
      {/* Messages area with custom scrollbar */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-gradient-to-b from-purple-50 via-transparent to-blue-50">
        <div  className="space-y-4">
          <div ref={ref} ></div>
          {currentConversation?.map((message, index) => {
             const isSent = isSender(message.senderId, userId);
            //  console.log('message',message)
             const opponentDetails =   findSenderDetails(message?.chatId,message?.senderId,userId,selector?.chats,true);
             return <MessageBubble 

             opponentDetails={opponentDetails}
              key={message.id || index}
              message={message}
              messageStatus={message.messageStatus}
              isSent={isSent}
            />
})}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white text-xs font-bold mr-3 shadow-lg">
                {(conversation?.contact || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="bg-white border border-gray-200 rounded-3xl px-6 py-4 shadow-lg">
                <div className="flex space-x-2">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Enhanced Input area */}
      <div className="p-4 bg-white bg-opacity-80 backdrop-blur-sm border-t border-white border-opacity-50">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <div className="relative bg-gray-50 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="w-full px-4 py-4 pr-16 bg-transparent rounded-2xl focus:outline-none placeholder-gray-500 resize-none"
                placeholder="Type your message..."
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1.5 hover:bg-gray-200 rounded-full transition-all duration-200 transform hover:scale-110"
                >
                  <Smile className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded-full transition-all duration-200 transform hover:scale-110">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
          
          {newMessage.trim() ? (
            <button 
              onClick={handleSend}
              className="p-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-all duration-200 group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          ) : (
            <button className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200">
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
 'use client';
// import { useState, useEffect } from 'react';
// import ChatWindow from "./ChatWindow";
// import MessageList from "./MessageList";
// import SearchBar from "./SearchBar";
// import { useSocket } from '../Context/socketContext';
// import { useRouter } from 'next/navigation';

import { Archive, Plus, Search, Settings, Star } from "lucide-react";
import MessageList from "./MessageList";
import ChatWindow from "./ChatWindow";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addChat } from "../store/ChatInfo";
import { useDispatch } from "react-redux";
import { messageInstance } from "../Services/message.service";

// export default function Messages() {
//   const [isMobile, setIsMobile] = useState(false);
//   const [showMessages, setShowMessages] = useState(true);
//   const [showChat, setShowChat] = useState(false);
//   const [chatList,setChatList]=useState([])
//   const [selectedConversation, setSelectedConversation] = useState([]);
//   const [currentChat,setCurrentChat]=useState();
//   const navigate = useRouter()
//   const {socket}=useSocket()
//   console.log('selectedConversation' , selectedConversation)
//   const messages = [
//     {
//       id: 1,
//       sender: 'Shiekh Solutions',
//       content: 'Hey We Liked Your Cv Can we discuss the specifics',
//       time: '24 feb 9:30p',
//       messageStatus:"sent"
//     },
//     {
//       id: 2,
//       sender: 'Shiekh Solutions',
//       content: 'Hey We Liked Your Cv Can we discuss the specifics',
//       time: '24 feb 9:30p',
//     },
//     {
//       id: 3,
//       sender: 'Shiekh Solutions',
//       content: 'Hey We Liked Your Cv Can we discuss the specifics',
//       time: '24 feb 9:30p',
//     },
//   ];

//   const conversation = {
//     contact: 'Shiekh Solutions',
//     messages: [
//       {
//         sender: 'contact',
//         content: 'Hey We Liked Your Cv Can we discuss the specifics',
//         time: '9:30pm',
//       },
//       {
//         sender: 'you',
//         content: 'Yeah Sure Why Not',
//         time: '9:32pm',
//       },
//     ],
//   };

//   useEffect(()=>{
//           socket?.on("new_Message",(data)=>{
//             console.log(data)
//           })
//   },[socket])

//   const makingReq = async()=>{
//     const response = await fetch(`http://localhost:8004/fetch/chats`,{
//       headers:{
//         'Content-Type':"application/json"
//       },
//       method:"GET",
//       credentials:"include"
//     })
//   const result = await response.json()
//   console.log('chat fetch result ' , result)
//   if(response.status==200){
//     console.log('chat list fetched' , result)
//     setChatList((prev)=>[...prev,...result.chats])
//   }
//   }
//   useEffect(()=>{
//    makingReq()
//   },[])
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setShowMessages(true);
//         setShowChat(true);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   const handleChatClick = (message) => {
//     console.log('chaht details' , message )
//     navigate.push(`/Dashboard/messages/${message.chatId}`)
//     setCurrentChat({chatId:message.chatId,receiverId:message?.opponentId})
//     //setSelectedConversation(message);
//     // setSelectedConversation({
//     //   chatId:message.chatId,
//     //   messages:[{id:message.lastMessageId,sender:"you"||message.lastMessageSenderId,messageStatus:'seen',content:message.lastMessage,time:"24 feb"}]
//     // })
//     // if (isMobile) {
//     //   setShowMessages(false);
//     //   setShowChat(true);
//     // }
//     setSelectedConversation((prev) => {
//       if (!Array.isArray(prev)) prev = [];
    
//       const ifChat = prev.some((item) => item.chatId === message.chatId);
    
//       if (ifChat) {
//         return prev; // don’t reset to null
//       } else {
//         return [
//           ...prev,
//           {
//             chatId: message.chatId,
//             messages: [
//               {
//                 id: message.lastMessageId || "1",
//                 sender: message.lastMessageSenderId || "you", // "you" || x was always "you"
//                 messageStatus: "seen",
//                 content: message.lastMessage,
//                 time: "24 feb",
//               },
//             ],
//           },
//         ];
//       }
//     });
    
//   };

//   const handleBackToMessages = () => {
//     if (isMobile) {
//       setShowMessages(true);
//       setShowChat(false);
//     }
//   };

//   return (
//     <div className="h-full  w-full md:w-2/3 flex ">
//       {/* Messages List Section */}
//       {showMessages && (
//         <div className="w-full md:w-2/3 border-r border-gray-200 flex flex-col">
//           <div className="p-4 border-b border-gray-200">
//             <SearchBar placeholder="Search Chat & Messages" />
//           </div>
//           <div className="flex-1 overflow-hidden">
//             <MessageList 
//               messages={chatList} 
//               onMessageClick={handleChatClick} 
//               selectedMessageId={selectedConversation?._id}
//             />
//           </div>
//         </div>
//       )}

//       {/* Chat Window Section
//       {showChat && (
//         <div className="w-full md:w-2/3 flex flex-col h-full">
//           <ChatWindow 
//           currentChat={currentChat}
//            setConversation = {setSelectedConversation}
//             conversation={selectedConversation} 
//             onBack={handleBackToMessages}
//             isMobile={isMobile}
//           />
//         </div>
//       )} */}

//       {/* Empty state for larger screens when no conversation is selected */}
//       {!isMobile && !showChat && !selectedConversation && (
//         <div className="w-2/3 flex items-center justify-center bg-gray-50">
//           <div className="text-center text-gray-500">
//             <p>Select a conversation to start chatting</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// MessageList.jsx


















// SearchBar Component - Redesigned with glassmorphism
const SearchBar = ({ placeholder, value, onChange }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
    <div className="relative bg-white bg-opacity-80 backdrop-blur-sm border border-white border-opacity-50 rounded-2xl">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
      />
    </div>
  </div>
);

// MessageList Component - Enhanced with better UX

// Main Messages Component - Completely rebuilt
const Messages = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMessages, setShowMessages] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [chatList,setChatList]=useState([])
  const navigate = useRouter()
  const dispatch = useDispatch()
  // Enhanced sample data
  const messages = [
    {
      id: 1,
      contact: 'Shiekh Solutions',
      content: 'Hey! We loved your CV. Can we discuss the specifics about the role?',
      time: '9:30 PM',
      messageStatus: "sent"
    },
    {
      id: 2,
      contact: 'TechCorp Inc.',
      content: 'Thank you for your application. We would like to schedule an interview with our team.',
      time: '2:15 PM',
      messageStatus: "seen"
    },
    {
      id: 3,
      contact: 'StartupXYZ',
      content: 'Your portfolio looks impressive! Let\'s discuss the frontend developer position.',
      time: '10:45 AM',
    },
    {
      id: 4,
      contact: 'Digital Agency',
      content: 'We have an exciting opportunity that matches your skills perfectly.',
      time: 'Yesterday',
    },
    {
      id: 5,
      contact: 'Innovation Labs',
      content: 'Would you be interested in a senior developer role? The compensation is competitive.',
      time: '2 days ago',
    }
  ];

    const makingReq = async()=>{
    const response = await messageInstance.get(`/fetch/chats`,
      // {
    //   headers:{
    //     'Content-Type':"application/json"
    //   },
    //   method:"GET",
    //   credentials:"include"
    // }
  )
  const result = await response.data
  console.log('chat fetch result ' , result)
  if(response.status==200){
    console.log('chat lis fetched' , result)
    dispatch(addChat(result.chats))
    setChatList((prev)=>{
      if(prev.length==0){
        return result.chats
       }
       const newChats = prev.map((chat)=>{
        const isFound = result.chats.find((item)=>item.chatId==chat.chatId)
        if(isFound){
          return isFound
        }
        return chat
       })
      return newChats;  
    })
  }
  }
  useEffect(()=>{
   makingReq()
  },[])


  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setShowMessages(true);
        setShowChat(selectedConversation.length > 0);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [selectedConversation]);

  const handleChatClick = (message) => {
    setCurrentChat({ chatId: message.id, receiverId: message?.opponentId });
    navigate.push(`/Dashboard/messages/${message.chatId}`);
    setSelectedConversation([{
      chatId: message.id,
      contact: message.contact,
      messages: [
        {
          id: message.id,
          sender: "contact",
          messageStatus: message.messageStatus,
          content: message.content,
          time: message.time,
        },
        {
          id: crypto.randomUUID(),
          sender: "you",
          content: "Thanks for reaching out! I'm definitely interested.",
          time: "9:32 PM",
          messageStatus: "seen"
        }
      ],
    }]);

    if (isMobile) {
      setShowMessages(false);
      setShowChat(true);
    } else {
      setShowChat(true);
    }
  };

  const handleBackToMessages = () => {
    if (isMobile) {
      setShowMessages(true);
      setShowChat(false);
    }
  };

  return (
    <div className="h-full w-[100vh] flex bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 shadow-2xl rounded-2xl overflow-hidden">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
      `}</style>
      
      {/* Messages List Section */}
      {showMessages && (
        <div className={`${isMobile ? 'w-full' : 'w-full'} bg-white bg-opacity-60 backdrop-blur-lg border-r border-white border-opacity-30 flex flex-col shadow-xl`}>
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-orange-600 via-black-600 to-orange-400 text-white">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Messages</h1>
              <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200 transform hover:scale-110">
                <Plus className="w-6 h-6" />
              </button>
            </div>
            <SearchBar 
              placeholder="Search conversations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Quick Actions */}
          {/* <div className="p-4 bg-white bg-opacity-40">
            <div className="flex space-x-2">
              {[
                { icon: Archive, label: 'Archived' },
                { icon: Star, label: 'Starred' },
                { icon: Settings, label: 'Settings' }
              ].map(({ icon: Icon, label }, index) => (
                <button 
                  key={index}
                  className="flex items-center space-x-2 px-3 py-2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </button>
              ))}
            </div>
          </div>
           */}
          <div className="flex-1  w-full overflow-hidden">
            <MessageList 
              messages={chatList} 
              onMessageClick={handleChatClick} 
              selectedMessageId={selectedConversation?.[0]?.chatId}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      )}

      {/* Chat Window Section */}
      {/* {showChat && selectedConversation.length > 0 && (
        <div className={`${isMobile ? 'w-full' : 'flex-1'} flex flex-col h-full bg-white bg-opacity-40 backdrop-blur-lg`}>
          <ChatWindow 
            currentChat={currentChat}
            setConversation={setSelectedConversation}
            conversation={selectedConversation[0]} 
            onBack={handleBackToMessages}
            isMobile={isMobile}
          />
        </div>
      )} */}

      {/* Empty state for larger screens */}
      {/* {!isMobile && !showChat && (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse" />
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-10 animate-bounce" />
          </div>
          
          <div className="text-center z-10">
            <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome to Messages
            </h2>
            <p className="text-xl text-gray-600 font-medium mb-6">Choose a conversation to get started</p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Start New Chat
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Messages;




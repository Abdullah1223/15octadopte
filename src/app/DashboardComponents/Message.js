// import ChatWindow from "./ChatWindow";
// import MessageList from "./MessageList";
// import SearchBar from "./SearchBar";

// export default function Messages() {
//     const messages = [
//       {
//         sender: 'Shiekh Solutions',
//         content: 'Hey We Liked Your Cv Can we discuss the specifics',
//         time: '24 feb 9:30p',
//       },
//       {
//         sender: 'Shiekh Solutions',
//         content: 'Hey We Liked Your Cv Can we discuss the specifics',
//         time: '24 feb 9:30p',
//       },
//       {
//         sender: 'Shiekh Solutions',
//         content: 'Hey We Liked Your Cv Can we discuss the specifics',
//         time: '24 feb 9:30p',
//       },
//     ];
  
//     const conversation = {
//       contact: 'Shiekh Solutions',
//       messages: [
//         {
//           sender: 'contact',
//           content: 'Hey We Liked Your Cv Can we discuss the specifics',
//           time: '9:30pm',
//         },
//         {
//           sender: 'you',
//           content: 'Yeah Sure Why Not',
//           time: '9:32pm',
//         },
//       ],
//     };
  
//     return (
      
//         <div className="h-full flex">
//           <div className="w-1/3 border-r border-gray-200">
//             <div className="p-4">
//               <SearchBar placeholder="Search Chat & Messages" />
//             </div>
//             <MessageList messages={messages} />
//           </div>
//           <div className="w-2/3">
//             <ChatWindow conversation={conversation} />
//           </div>
//         </div>
 
//     );
//   }









































  // Messages.jsx - Main component
import { useState, useEffect } from 'react';
import ChatWindow from "./ChatWindow";
import MessageList from "./MessageList";
import SearchBar from "./SearchBar";

export default function Messages() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMessages, setShowMessages] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const messages = [
    {
      id: 1,
      sender: 'Shiekh Solutions',
      content: 'Hey We Liked Your Cv Can we discuss the specifics',
      time: '24 feb 9:30p',
    },
    {
      id: 2,
      sender: 'Shiekh Solutions',
      content: 'Hey We Liked Your Cv Can we discuss the specifics',
      time: '24 feb 9:30p',
    },
    {
      id: 3,
      sender: 'Shiekh Solutions',
      content: 'Hey We Liked Your Cv Can we discuss the specifics',
      time: '24 feb 9:30p',
    },
  ];

  const conversation = {
    contact: 'Shiekh Solutions',
    messages: [
      {
        sender: 'contact',
        content: 'Hey We Liked Your Cv Can we discuss the specifics',
        time: '9:30pm',
      },
      {
        sender: 'you',
        content: 'Yeah Sure Why Not',
        time: '9:32pm',
      },
    ],
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMessages(true);
        setShowChat(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleMessageClick = (message) => {
    setSelectedConversation(message);
    if (isMobile) {
      setShowMessages(false);
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
    <div className="h-full flex flex-col md:flex-row">
      {/* Messages List Section */}
      {showMessages && (
        <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <SearchBar placeholder="Search Chat & Messages" />
          </div>
          <div className="flex-1 overflow-hidden">
            <MessageList 
              messages={messages} 
              onMessageClick={handleMessageClick} 
              selectedMessageId={selectedConversation?.id}
            />
          </div>
        </div>
      )}

      {/* Chat Window Section */}
      {showChat && (
        <div className="w-full md:w-2/3 flex flex-col h-full">
          <ChatWindow 
            conversation={selectedConversation || conversation} 
            onBack={handleBackToMessages}
            isMobile={isMobile}
          />
        </div>
      )}

      {/* Empty state for larger screens when no conversation is selected */}
      {!isMobile && !showChat && !selectedConversation && (
        <div className="w-2/3 flex items-center justify-center bg-gray-50">
          <div className="text-center text-gray-500">
            <p>Select a conversation to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
}





// MessageList.jsx




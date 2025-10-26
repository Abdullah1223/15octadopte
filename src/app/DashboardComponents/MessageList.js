// import MessageItem from "./MessageItem";

import Image from "next/image";

// const MessageList = ({ messages, onMessageClick, selectedMessageId }) => {
//   return (
//     <div className="h-full text-black overflow-y-auto">
//       {messages?.map((message) => (
//         <MessageItem 
//           key={message.id} 
//           message={message} 
//           isActive={message.id === selectedMessageId}
//           onClick={onMessageClick}
//         />
//       ))}
//     </div>
//   );
// };

// export default MessageList;

const MessageList = ({ messages, onMessageClick, selectedMessageId, searchTerm }) => {
  console.log('messages', messages)
  const filteredMessages = messages.filter(message => 
    (message.contact || message.sender || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (message.content || message.lastMessage || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-y-auto h-full custom-scrollbar">
      <div className="p-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={message.id || index}
            onClick={() => onMessageClick(message)}
            className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-102 hover:shadow-lg group ${
              selectedMessageId === message.id 
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 shadow-md border-l-4 border-blue-500' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              {/* Avatar with gradient and online indicator */}
              {
          message?.opponentDetails?.profilePicture?.url ? 
          
            <Image src={message?.opponentDetails?.profilePicture?.url} height={80} width={80} alt="Thunder"></Image>
              
               :
<div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  
                    {(message.contact || message.sender || 'U').charAt(0).toUpperCase()}
                     
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm" />
               
              </div>
              
              } 
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 truncate text-lg group-hover:text-blue-600 transition-colors">
                    {message.contact || message.sender || message?.opponentDetails?.firstName}
                  </h3>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {new Date(message.lastMessageDate).toLocaleString()}
                    </span>
                    {message.messageStatus && (
                      <div className="text-blue-500">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 truncate font-medium leading-relaxed">
                  {message.content || message.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
// ChatWindow.jsx
import { useState } from 'react';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ conversation, onBack, isMobile }) => {
  const [newMessage, setNewMessage] = useState('');
  
  const handleSend = (e) => {
    e.preventDefault();
    // Handle sending message logic
    setNewMessage('');
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center">
        {isMobile && (
          <button 
            onClick={onBack} 
            className="mr-3 text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
        <h3 className="font-medium">{conversation.contact}</h3>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {conversation?.messages?.map((message, index) => (
          <MessageBubble 
            key={index}
            message={message}
            isSent={message.sender === 'you'}
          />
        ))}
      </div>
      
      {/* Input area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSend} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Type your message..."
          />
          <button 
            type="submit" 
            className="bg-orange-500 text-white p-2 rounded-r-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;

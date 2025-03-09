// MessageBubble.jsx
const MessageBubble = ({ message, isSent }) => {
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
          isSent 
            ? 'bg-orange-500 text-white rounded-br-none' 
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="break-words">{message.content}</p>
        <div className={`text-xs mt-1 ${isSent ? 'text-orange-200' : 'text-gray-500'}`}>
          {message.time}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
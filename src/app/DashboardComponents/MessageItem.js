// MessageItem.jsx
const MessageItem = ({ message, isActive, onClick }) => {
  return (
    <div 
      className={`border-b border-gray-200 p-4 hover:bg-gray-50 cursor-pointer ${isActive ? 'bg-gray-50' : ''}`}
      onClick={() => onClick(message)}
    >
      <div className="flex">
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-semibold truncate">{message.sender}</h4>
            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{message.time}</span>
          </div>
          <p className="text-gray-700 text-sm truncate">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;

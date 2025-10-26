const MessageItem = ({ message, isActive, onClick }) => {
  console.log(message)
  const formatted = new Date(message?.lastMessageDate).toLocaleString('en-US', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return (
    <div 
      className={`border-b border-gray-200 p-4 hover:bg-gray-50 cursor-pointer ${isActive ? 'bg-gray-50' : ''}`}
      onClick={() => onClick(message)}
    >
      <div className="flex">
       
          <img className="w-10 h-10 rounded-full mr-3 flex-shrink-0" src={message.opponentDetails.profilePicture.url} ></img>
    
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-semibold text-black truncate">{message?.opponentDetails?.firstName}</h4>
            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{formatted}</span>
          </div>
          <p className="text-gray-700 text-sm truncate">{message?.lastMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;

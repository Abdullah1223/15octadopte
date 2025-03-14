import MessageItem from "./MessageItem";

const MessageList = ({ messages, onMessageClick, selectedMessageId }) => {
  return (
    <div className="h-full text-black overflow-y-auto">
      {messages?.map((message) => (
        <MessageItem 
          key={message.id} 
          message={message} 
          isActive={message.id === selectedMessageId}
          onClick={onMessageClick}
        />
      ))}
    </div>
  );
};

export default MessageList;
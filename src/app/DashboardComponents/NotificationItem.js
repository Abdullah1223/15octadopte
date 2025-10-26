// import { MessageSquare, Briefcase, FileText, ChevronRight, Eye, Send } from 'lucide-react';

// const NotificationItem = ({ notification }) => {
//   const getIcon = (type) => {
//     switch (type) {
//       case 'Job Proposal':
//       case 'accept_proposal':
//       case 'reject_proposal':
//         return <Briefcase className="w-5 h-5" />;
//       case 'Message':
//         return <MessageSquare className="w-5 h-5" />;
//       default:
//         return <FileText className="w-5 h-5" />;
//     }
//   };

//   const getTypeStyles = (type) => {
//     switch (type) {
//       case 'Job Proposal':
//       case 'accept_proposal':
//         return 'bg-green-50 text-green-700 border-green-200';
//       case 'reject_proposal':
//         return 'bg-red-50 text-red-700 border-red-200';
//       case 'Message':
//         return 'bg-orange-50 text-orange-700 border-orange-200';
//       default:
//         return 'bg-blue-50 text-blue-700 border-blue-200';
//     }
//   };

//   const getStatusText = (type, creatorName) => {
//     if (type === 'Accept_Proposal66') {
//       return (
//         <div className="flex items-center mt-1">
//           <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//           <span className="text-sm text-green-700">
//             Proposal accepted by <span className="font-medium">{creatorName}</span>
//           </span>
//         </div>
//       );
//     } else if (type === 'Reject_Proposal66') {
//       return (
//         <div className="flex items-center mt-1">
//           <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
//           <span className="text-sm text-red-700">
//             Proposal rejected by <span className="font-medium">{creatorName}</span>
//           </span>
//         </div>
//       );
//     }
//     return null;
//   };

//   const renderActionButtons = () => {
//     if (notification.type === 'Accept_Proposal66' || notification.type === 'Reject_Proposal66') {
//       return (
//         <div className="mt-4 flex flex-wrap gap-3">
//           <button 
//             className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
//           >
//             <Eye className="w-4 h-4 mr-2" />
//             View Job
//           </button>
//           <button 
//             className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             <Briefcase className="w-4 h-4 mr-2" />
//             View Proposal
//           </button>
//           <button 
//             className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//           >
//             <Send className="w-4 h-4 mr-2" />
//             Message
//           </button>
//         </div>
//       );
//     }
    
//     return (
//       <div className="mt-3 flex items-center">
//         <a 
//           href="#" 
//           className="inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-600 group-hover:underline"
//         >
//           {notification.actionText}
//           <ChevronRight className="ml-1 w-4 h-4" />
//         </a>
//       </div>
//     );
//   };

//   return (
//     <div className="group hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
//       <div className="px-6 py-4">
//         <div className="flex items-start gap-4 max-w-5xl mx-auto">
//           <div className={`flex-shrink-0 p-2 rounded-lg ${getTypeStyles(notification.type)} border`}>
//             {getIcon(notification.type)}
//           </div>
          
//           <div className="flex-1 min-w-0">
//             <div className="flex justify-between items-start">
//               <div>
//                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeStyles(notification.type)}`}>
//                   {notification.type}
//                 </span>
//                 <h4 className="mt-2 text-base font-medium text-gray-900 leading-5">
//                   {notification.details.jobTitle}
//                 </h4>
//                 {getStatusText(notification.type, notification.details.creatorName)}
//               </div>
//               <time className="text-xs text-gray-500 whitespace-nowrap">
//                 {notification.sentAt}
//               </time>
//             </div>
            
//             <p className="mt-1 text-sm text-gray-600 leading-5">
//               {notification.details.Notification}
//             </p>
            
//             {renderActionButtons()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationItem;


import { MessageSquare, Briefcase, FileText, ChevronRight, Eye, Send, X, Router, UserIcon, Megaphone, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ChatDialog = ({ isOpen, onClose, creatorName }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    // Sample chat history - replace with actual chat data
    {
      sender: creatorName,
      message: "Hello! Thanks for reaching out.",
      time: "2 mins ago",
      isCreator: true
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, {
      sender: 'You',
      message: message.trim(),
      time: 'Just now',
      isCreator: false
    }]);

    // Clear input
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Chat with {creatorName}</h3>
              <p className="text-sm text-gray-500">Messages will be saved in your inbox</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`flex ${chat.isCreator ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] ${
                chat.isCreator 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'bg-orange-500 text-white'
              } rounded-2xl px-4 py-2`}>
                <p className="text-sm">{chat.message}</p>
                <p className="text-xs mt-1 opacity-75">{chat.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const NotificationTypeText = (type)=>{
  switch(type){
    case "followedByNotification":
      return <p>Follow Notification</p>
    case "Accept_Proposal":
      return <p>Proposal Accepted</p>
    case "Reject_Proposal":
      return <p>Proposal Rejected</p>
    case "Proposal_Sent":
      return <p>Proposal Sent</p>
    case "Banner_Ad_Created":
      return <p>Banner Ad Created</p>
    case "Ad_Paid":
      return <p>Ad Payment Successfull</p>          
  }
}

const NotificationItem = ({ notification }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const route = useRouter()
  const getIcon = (type) => {
    switch (type) {
      case 'Job Proposal':
      case 'Accept_Proposal':
      case 'Reject_Proposal':
        return <Briefcase className="w-5 h-5" />;
      case "Proposal_Sent":
        return <Send className="w-5 h-5" />  
      case 'Message':
        return <MessageSquare className="w-5 h-5" />;
      case "followedByNotification":
        return <UserIcon className='w-5 h-5'></UserIcon>
      case "Banner_Ad_Created":
        return <Megaphone className='w-5 h-5'></Megaphone>
      case "Job_Ad_Created":
        return <Briefcase className='w-5 h-5'></Briefcase>
      case "Ad_Paid":
        return <CreditCard className='w-5 h-5' color='green'></CreditCard>        
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeStyles = (type) => {
    switch (type) {
      
      case 'Accept_Proposal':
        return 'bg-green-50 text-green-700 border-green-200';

      case 'Reject_Proposal':
        return 'bg-red-50 text-red-700 border-red-200';
      
      case "Proposal_Sent":
        return 'bg-orange-50 text-orange-700 border-orange-200';  
      case 'Message':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case "Banner_Ad_Created":
        return 'bg-blue-50 text-orange-black border-blue-200'; 
      case "Job_Ad_Created":
        return "bg-blue-50 text-orange-black border-blue-200";   
      case "Ad_Paid":
         return "bg-green-50 text-green-700 border-green-200";
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getStatusText = (type, creatorName) => {
    if (type === 'Accept_Proposal') {
      return (
        <div className="flex items-center mt-1">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-green-700">
            Proposal accepted by <span className="font-medium">{notification.details.creatorName}</span>
          </span>
        </div>
      );
    } else if (type === 'Reject_Proposal') {
      return (
        <div className="flex items-center mt-1">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-red-700">
            Proposal rejected by <span className="font-medium">{creatorName}</span>
          </span>
        </div>
      );
    }else if(type==="followedByNotification"){
      return (
        <div className="flex items-center mt-1">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        <span className="text-sm text-green-700">
          Followed By <span className="font-medium">{notification.details.followedBy}</span>
        </span>
      </div>
      )
    }else if(type=="Banner_Ad_Created"){
     
  return    <div className="flex items-center mt-1">
      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
      <span className="text-sm text-green-700">
        Your Banner Ad {notification.details.title} Has Been Created
      </span>
    </div>    
    }
    else if(type=="Job_Ad_Created"){
     
     return <div className="flex items-center mt-1">
      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
      <span className="text-sm text-green-700">
        Your Job Ad {notification.details.title} Has Been Created
      </span>
    </div>    
    } else if(type=="Ad_Paid"){
     
    return  <div className="flex items-center mt-1">
      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
      <span className="text-sm text-green-700">
        Your Payment Of {notification.details.Title} Ad  Has Been Successfull
      </span>
    </div>    
    }
    else if(type=="Proposal_Sent"){
      return (
        <div className="flex items-center mt-1">
        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
        <span className="text-sm text-orange-700">
          <span className="font-medium">{notification.details.Notification}</span>
        </span>
      </div>
      )
    }
    return null;
  };

  const renderActionButtons = () => {
    if (notification.type === 'Accept_Proposal' || notification.type === 'Reject_Proposal') {
      return (
        <div className="mt-4 flex flex-wrap gap-3">
          <button 
            onClick={()=>route.push(`/JobInfo/${notification.details.jobId}`)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Job
          </button>
          <button 
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Briefcase className="w-4 h-4 mr-2" />
            View Proposal
          </button>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            Message
          </button>
        </div>
      );
    }else if(notification.type==="followedByNotification"){

    return(  <div className="mt-3 flex items-center">
        {/* <a 
          href={`profileInfo/${notification.details.followerId}`} 
          className="inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-600 group-hover:underline"
        >
          {`View ${notification.details.followedBy} Profile`}
          <ChevronRight className="ml-1 w-4 h-4" />
        </a> */}
         <p 
      onClick={() => route.push(`/profileInfo/${notification.details.followerId}`)} 
      className="text-sm text-orange-600 hover:underline cursor-pointer inline-flex items-center"
    >
      <ChevronRight className="w-4 h-4 mr-1" />
      View  Profile
    </p>
      </div>
      )
    }else if(notification.type=="Banner_Ad_Created"){
     return <div className="mt-4 flex flex-wrap gap-3">
     
      <button 
      onClick={()=>{route.push(`/ads/${notification.details.adId}`)}}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Briefcase className="w-4 h-4 mr-2" />
        View Ad
      </button>
    </div>
    }else if(notification.type==="Ad_Paid"){
     return <div className="mt-4 flex flex-wrap gap-3">
     
      <button 
      onClick={()=>{route.push(`/ads/${notification.details.adId}`)}}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Briefcase className="w-4 h-4 mr-2" />
        View Ad
      </button>
    </div>
    }
    else if(notification.type==="Job_Ad_Created"){
    return  <div className="mt-4 flex flex-wrap gap-3">
     
      <button 
      onClick={()=>{route.push(`/ads/${notification.details.adId}`)}}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Briefcase className="w-4 h-4 mr-2" />
        View Ad
      </button>
    </div>
    }
    else if(notification.type==="Proposal_Sent"){
      return (
        <div className="mt-4 flex flex-wrap gap-3">
        <button 
          onClick={()=>route.push(`/JobInfo/${notification.details.jobId}`)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Job
        </button>
        <button 
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Briefcase className="w-4 h-4 mr-2" />
          View Proposal
        </button>
       
      </div>
      )
    }
    
    return (
      <div className="mt-3 flex items-center">
        <a 
          href="#" 
          className="inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-600 group-hover:underline"
        >
          {notification.details.Notification}
          <ChevronRight className="ml-1 w-4 h-4" />
        </a>
      </div>
    );
  };

  return (
    
    <>
    
      <div className="group hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-start gap-4 max-w-5xl mx-auto">
            <div className={`flex-shrink-0 p-2 rounded-lg ${getTypeStyles(notification.type)} border`}>
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeStyles(notification.type)}`}>
                    {/* {notification.type} */}
                    {NotificationTypeText(notification.type)}
                  </span>
                  <h4 className="mt-2 text-base font-medium text-gray-900 leading-5">
                    {notification.details.jobTitle}
                  </h4>
                  {getStatusText(notification.type, notification.details.creatorName)}
                </div>
                <time className="text-xs text-gray-500 whitespace-nowrap">
  {new Date(notification.sentAt).toLocaleString()}
</time>
              </div>
              
              <p className="mt-1 text-sm text-gray-600 leading-5">
                {notification.details.Notification}
              </p>
              
              {renderActionButtons()}
            </div>
          </div>
        </div>
      </div>

      <ChatDialog 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        creatorName={notification.details.creatorName}
      />
    </>
  );
};

export default NotificationItem;
import { JSX, ReactNode } from "react";
import { chatOpponentDetails } from "../interfaces/chatInterface";
import { MessageInterface } from "../interfaces/MessageInterfaces";
import Image from "next/image";
import { Check, Circle, MessageCircle, MessageSquare } from "lucide-react";

interface MessageBubbleProps {
    message:MessageInterface,
    isSent:boolean,
    messageStatus:string,
    opponentDetails:chatOpponentDetails | null
}
const MessageBubble = ({ message, isSent, messageStatus,opponentDetails }:MessageBubbleProps):JSX.Element => {
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-6 group`}>
      {!isSent && (
       <div>
        {
          opponentDetails?.avatar_url ? 
          <div className="flex justify-center items-center w-12 h-12 rounded-full"> 
            <Image alt="U" src={opponentDetails.avatar_url} width={50} className="rounded-full" height={50} ></Image> 
          </div>
          :
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white text-xs font-bold mr-3 shadow-lg">
          {message.senderId ? message.senderId.charAt(0).toUpperCase() : 'U'}
        </div>
         }
 
       </div>
       
      )}
      
      <div className={`max-w-xs lg:max-w-md relative ${
        isSent 
          ? 'bg-gradient-to-r from-orange-500 via-white-600 to-orange-600 text-white shadow-lg' 
          : 'bg-white text-gray-800 shadow-md border border-gray-100'
      } px-5 py-3 rounded-3xl transform transition-all duration-200 hover:scale-105 hover:shadow-xl`}>
        
        <p className="text-sm leading-relaxed font-medium">{message.message}</p>
        
        <div className="flex items-center justify-end mt-2 space-x-2">
          <span className={`text-xs font-medium ${
            isSent ? 'text-blue-100' : 'text-gray-500'
          }`}>
                    {new Date(message.createdAt).toLocaleString()}
          </span>
          
          {isSent && (
            <div className="flex items-center">
              {messageStatus === 'sent' && (
               <Check size={15}></Check>
              // <div className="w-4 h-4 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                //   <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                //     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                //   </svg>
                // </div>
              )}
              {messageStatus === 'seen' ? (
                <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              ):messageStatus=="pending" ?
              
                  <Circle color="orange" size={10}></Circle>
              :messageStatus=="delivered"?
              <div className="w-4 h-4 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              :null
              // :messageStatus=="sent" ? 
              // <Check size={15} color="orange"></Check>
              // :null
              //   <div className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center">
            //   <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            //     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            //   </svg>
            // </div>:null
            }
            </div>
          )}
        </div>
        
        {/* Message tail */}
        <div className={`absolute top-4 ${
          isSent 
            ? '-right-2 border-l-8 border-l-orange-600 border-t-8 border-t-transparent border-b-8 border-b-transparent' 
            : '-left-2 border-r-8 border-r-white border-t-8 border-t-transparent border-b-8 border-b-transparent'
        }`} />
      </div>
    </div>
  );
};

export default MessageBubble;
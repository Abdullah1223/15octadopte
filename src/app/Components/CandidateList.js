'use client'
import { forwardRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGraduationCap, FaMapMarkerAlt, FaBriefcase, FaEnvelope, FaTimes, FaCheck } from 'react-icons/fa'
import { MessageSquare, Send, X } from 'lucide-react'
import CandidateDetails from './CandidateDetails'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { messageInstance } from '../Services/message.service'

const ChatDialog = ({ isOpen, onClose, candidate }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const uniqueId = crypto.randomUUID();
  const route = useRouter()
  const handleSendMessage = async(e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    // setChatHistory(prev => [...prev, {
    //   sender: 'You',
    //   message: message.trim(),
    //   time: 'Just now',
    //   isCreator: true
    // }]);

   const response = await messageInstance.post('/message/firstMessageSent',
     {message,receiverId:candidate._id,uniqueId}
    //   {
  //   headers:{"Content-Type":"Application/json"},
  //   body:JSON.stringify({message,receiverId:candidate._id,uniqueId}),
  //   credentials:"include",
  //   method:"POST"
  //  }
  )
     
   if(response.status==200){
    const result = await response.data
    console.log('result',result)
     route.push(`/Dashboard/messages/${result.chatId}`)
    // setChatHistory(prev => [...prev, {
    //   sender: 'You',
    //   message: message.trim(),
    //   time: 'Just now',
    //   isCreator: true,
    //   uniqueId:result.uniqueId
    // }]);
   }
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-lg flex flex-col max-h-[80vh]"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={candidate?.profilePicture?.url || '/default-avatar.png'}
                alt={candidate.firstName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{candidate.firstName}</h3>
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`flex ${chat.isCreator ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${
                chat.isCreator 
                  ? 'bg-orange-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              } rounded-lg px-4 py-2`}>
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
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const CandidatesList = ({  isCreator, candidates,hasMore,setHasMoreTrigger }) => {
  console.log('this ran')
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [chatCandidate, setChatCandidate] = useState(null)
  const {ref,inView}=useInView()
  const selector = useSelector((state)=>(state.user))

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {selectedCandidate && (
          <CandidateDetails
            candidateInfo={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
            isCreator={isCreator}
          />
        )}
      </AnimatePresence>

      {/* Scrollable Container for Candidates */}
      <div className="h-[600px] overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 gap-6">
          {
          candidates.length == 0 ? 
          <div className='flex justify-center items-center w-full h-full'>
            <p className="text-center text-xl text-gray-500">No candidates found</p>
          </div>
          :
          candidates?.map((candidate) => (
            <motion.div
              key={candidate?._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={candidate?.profilePicture?.url|| '/default-avatar.png'}
                    alt={candidate?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{candidate?.firstName}</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center text-gray-600">
                        <FaBriefcase className="mr-2 text-orange-500" />
                        <span>{candidate?.yearsOfExperience} years</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaMapMarkerAlt className="mr-2 text-orange-500" />
                        <span>{candidate?.location},{candidate.City}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h4 className="font-medium text-gray-700">Skills:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {candidate?.Skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-2">
                  {selector.role=="employer" ? <button
                    onClick={() => setSelectedCandidate(candidate)}
                    className="w-full md:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    View Details
                  </button>:null}
                  {isCreator && (
                    <motion.button 
                      onClick={() => setChatCandidate(candidate)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaEnvelope className="w-4 h-4" />
                      <span>Message</span>
                    </motion.button>
                  )}
                </div>
              </div>
              

           
            </motion.div>
          ))}
          <div ref={ref}></div>
             { hasMore && candidates.length>0 ?  
               
               <div className='flex justify-center items-center'>
                    <button
                    onClick={()=>{setHasMoreTrigger(true)}}
                    className=' bg-orange-500 rounded-lg text-white w-44 h-12'>Load More Candidates</button> 
               </div>
             
           :null} 
        </div>
                   
      </div>

      <AnimatePresence>
        {chatCandidate && (
          <ChatDialog
            isOpen={true}
            onClose={() => setChatCandidate(null)}
            candidate={chatCandidate}
          />
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #f97316 #f3f4f6;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </div>
  )
}

export default CandidatesList
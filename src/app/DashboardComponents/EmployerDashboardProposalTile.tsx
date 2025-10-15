'use client';
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import JobError from '../Components/JobError'
import { 
  CheckCircle,
  XCircle, 
  Clock,
  Star,
  ExternalLink,
  Briefcase,
  DollarSign,
  Award
} from 'lucide-react';
import useProposals from "../Hooks/useProposals";
export const ProposalTile = ({ proposal,setProposal }) => {
    console.log('proposal' , proposal)
    
    const [isExpanded, setIsExpanded] = useState(false);
   const {acceptProposal} = useProposals()
   const handleProposal = ({apiType,proposalId})=>{
    const status = apiType=="Accept_Proposal"?"accepted":"rejected"
       setProposal((prev)=>{
         return prev.map((proposal)=>{
            if(proposal.proposalId==proposalId){
              return {...proposal,status:status}
            }else{
              return proposal;
            }
         })
       })
   }
    const getStatusIcon = (status) => {
      switch (status) {
        case 'accepted': return <CheckCircle className="w-4 h-4 text-green-500" />;
        case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
        default: return <Clock className="w-4 h-4 text-yellow-500" />;
      }
    };
  
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    const formatSalary = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0
      }).format(amount);
    };
  
    return (
      <motion.div
        className="bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors duration-200"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="p-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={proposal.profilePicture}
                alt={proposal.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-800">{proposal.firstName}</h4>
                  {getStatusIcon(proposal.status)}
                </div>
                <p className="text-sm text-gray-600">{proposal.specialization}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Star className="w-3 h-3" />
                  <span>{proposal.yearsOfExperience} years experience</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">
                {formatDate(proposal.sentAt)}
              </div>
              <div className={`text-xs font-medium ${
                proposal.available ? 'text-green-600' : 'text-red-600'
              }`}>
                {proposal.available ? 'Available' : 'Busy'}
              </div>
            </div>
          </div>
        </motion.div>
  
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t  border-gray-200"
            >
              <div className="p-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">Proposal Description</h5>
                    <p className="text-gray-700 text-sm mb-4">{proposal.Proposal}</p>
                    
                    <h5 className="font-semibold text-gray-800 mb-2">Skills</h5>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proposal.Skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">Professional Details</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{proposal.professionalDetails.yearsOfExperience} years experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                        <a
                          href={proposal.professionalDetails.linkedinProfile}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                        <a
                          href={proposal.professionalDetails.portfolioUrl}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Portfolio
                        </a>
                      </div>
                    </div>
                    
                    <h5 className="font-semibold text-gray-800 mb-2 mt-4">Contract Details</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{proposal.contractType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{proposal.expectedSalary}</span>
                      </div>
                    </div>
                  </div>
                </div>
               <div className="flex items-center justify-between w-[45%] ml-2">
                {
                  proposal.status == 'pending' ? (
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => acceptProposal({proposalId:proposal.proposalId,apiType:"Accept_Proposal",sucessFunction:()=>handleProposal({apiType:"Accept_Proposal",proposalId:proposal.proposalId})})}    
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => acceptProposal({proposalId:proposal.proposalId,apiType:"Reject_Proposal",sucessFunction:()=>handleProposal({apiType:"Reject_Proposal",proposalId:proposal.proposalId})})}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Decline
                      </button>
                    </div>
                  ):null
                }
                <button className="bg-orange-400 px-4 py-2 rounded-md hover:bg-orange-600 text-white mt-4 ">
                    View Profile
                </button>
                </div> 
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  
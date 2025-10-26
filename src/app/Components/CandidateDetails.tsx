// 'use client'

// import { motion } from 'framer-motion'
// import { useEffect, useState } from 'react'
// import { FaGraduationCap, FaMapMarkerAlt, FaBriefcase, FaPhoneAlt, FaEnvelope, FaUser, FaFileAlt, FaTimesCircle, FaLinkedin, FaGlobe, FaClock, FaCheck, FaTimes, FaSearch, FaUserSlash, FaExclamationTriangle } from 'react-icons/fa'
// import JobError from './JobError'
// import LoadingSpinner from './LoadingSpinner'
// import Toast from './Toast'
// import useCv from '../Hooks/useCv'
// import { Candidate, candidateInfoInterface } from '../interfaces/candidateInterface'
// import useProposals from '../Hooks/useProposals'

// interface CandidateDetailsProps {
//    candidateInfo: candidateInfoInterface;
//    onClose: () => void;
//    isCreator: boolean
// }

// const CandidateDetails = ({ candidateInfo,onClose, isCreator }:CandidateDetailsProps) => {
//    const [candidate,setCandidate]=useState<Candidate>()
//    console.log('candidateInfo' , candidateInfo)
//    const [error,setError]=useState(null)
//    const [isLoading,setIsLoading]=useState(true)
//    const {getCv}= useCv()
//    const {fetchSpecificProposal}=useProposals()
//    const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
//    const {acceptProposal} = useProposals()
//   const showToast = (message, type = 'success') => {
//     setToast({ show: true, message, type })
//     // Auto-hide after 5 seconds
//     setTimeout(() => {
//       setToast(prev => ({ ...prev, show: false }))
//     }, 5000)
//   }
//   const makingReq = async()=>{
//     const fetchedDetails = await fetchSpecificProposal({candidateInfo,setCandidate,setIsLoading,setError})
//   }
 
//   useEffect(()=>{
//     makingReq()
//   },[])


//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     })
//   }

//   return (
//     <>
      
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <Toast
//         isVisible={toast.show}
//         message={toast.message}
//         type={toast.type}
//         onClose={() => setToast(prev => ({ ...prev, show: false }))}
//       />
//       {error?
//       <JobError
//       isDialog={true}
//       onClose={onClose}
//       customError={
//         error
//       }
//       ></JobError>: isLoading?<LoadingSpinner size={50}></LoadingSpinner>:
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//       >
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-900">Candidate Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 transition-colors"
//           >
//             <FaTimesCircle size={24} />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Basic Info */}
//           <div className="flex items-start gap-6">
//             <img
//               src={candidate?.profilePicture || '/default-avatar.png'}
//               alt={`${candidate?.firstName} ${candidate?.lastName}`}
//               className="w-24 h-24 rounded-full object-cover"
//             />
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900">
//                 {candidate?.firstName} {candidate?.lastName}
//               </h3>
//               <div className="mt-2 space-y-2">
//                 <div className="flex items-center text-gray-600">
//                   <FaEnvelope className="mr-2 text-orange-500" />
//                   <span>{candidate?.email}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <FaPhoneAlt className="mr-2 text-orange-500" />
//                   <span>{candidate?.phoneNum}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <FaUser className="mr-2 text-orange-500" />
//                   <span>Type: {candidate?.type}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Professional Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div className="flex items-center text-gray-600">
//                 <FaBriefcase className="mr-2 text-orange-500" />
//                 <span>Experience: {candidate?.professionalDetails?.yearsOfExperience} years</span>
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaClock className="mr-2 text-orange-500" />
//                 <span>Available From: {formatDate(candidate?.availabe)}</span>
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaLinkedin className="mr-2 text-orange-500" />
//                 <a 
//                   href={candidate?.professionalDetails?.linkedinProfile} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   LinkedIn Profile
//                 </a>
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaGlobe className="mr-2 text-orange-500" />
//                 <a 
//                   href={candidate?.professionalDetails?.portfolioUrl} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   Portfolio
//                 </a>
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div className="text-gray-600">
//                 <div className="font-medium mb-2">Contract Type:</div>
//                 <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
//                   {candidate?.contractType}
//                 </span>
//               </div>
//               <div className="text-gray-600">
//                 <div className="font-medium mb-2">Expected Salary:</div>
//                 <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
//                   ${candidate?.expectedSalary}
//                 </span>
//               </div>
//               <div className="text-gray-600">
//                 <div className="font-medium mb-2">Status:</div>
//                 <span className={`px-3 py-1 rounded-full ${
//                   candidate?.status === 'pending'
//                     ? 'bg-yellow-100 text-yellow-700'
//                     : candidate?.status === 'accepted'
//                     ? 'bg-green-100 text-green-700'
//                     : 'bg-red-100 text-red-700'
//                 }`}>
//                   {candidate?.status?.charAt(0).toUpperCase() + candidate?.status?.slice(1)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Skills */}
//           <div>
//             <h4 className="text-lg font-semibold mb-3">Skills</h4>
//             <div className="flex flex-wrap gap-2">
//               {candidate?.skills?.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Proposal Text */}
//           <div>
//             <h4 className="text-lg font-semibold mb-3">Proposal</h4>
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-gray-700 whitespace-pre-wrap">{candidate?.Proposal}</p>
//             </div>
//           </div>

//           {/* Actions and Submission Info */}
//           <div className="border-t pt-4 flex flex-col sm:flex-row justify-between gap-4">
//             <div className="text-sm text-gray-500">
//               Submitted on: {formatDate(candidate?.sentAt)}
//             </div>
//             <div className="flex gap-3">
//               {isCreator && candidate?.status === 'pending' && (
//                 <>
//                   <button
//                   onClick={()=>acceptProposal({proposalId:candidate._id,apiType:"Accept_Proposal",setCandidate})}
//                     className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
//                   >
//                     <FaCheck />
//                     Accept
//                   </button>
//                   <button
//                   onClick={()=>acceptProposal({proposalId:candidate._id,apiType:"Reject_Proposal",setCandidate})}
//                     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
//                   >
//                     <FaTimes />
//                     Reject
//                   </button>
//                 </>
//               )}
//               <button
             
//                onClick={()=>{getCv(candidateInfo?._id)}}

//                 className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
//               >
//                 <FaFileAlt />
//                 View CV
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//       }
//     </div>
//     </>
//   )
// }

// export default CandidateDetails 














'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaGraduationCap, FaMapMarkerAlt, FaBriefcase, FaPhoneAlt, FaEnvelope, FaUser, FaFileAlt, FaTimesCircle, FaLinkedin, FaGlobe, FaClock, FaCheck, FaTimes, FaSearch, FaUserSlash, FaExclamationTriangle, FaStar, FaAward, FaCalendarAlt, FaDollarSign } from 'react-icons/fa'
import JobError from './JobError'
import LoadingSpinner from './LoadingSpinner'
import Toast from './Toast'
import useCv from '../Hooks/useCv'
import { Candidate, candidateInfoInterface } from '../interfaces/candidateInterface'
import useProposals from '../Hooks/useProposals'

interface CandidateDetailsProps {
   candidateInfo: candidateInfoInterface;
   onClose: () => void;
   isCreator: boolean
}

const CandidateDetails = ({ candidateInfo, onClose, isCreator }: CandidateDetailsProps) => {
   const [candidate, setCandidate] = useState<Candidate>()
   console.log('candidate' , candidate)
   console.log('candidateInfo', candidateInfo)
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   const { getCv } = useCv()
   const { fetchSpecificProposal } = useProposals()
   const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
   const { acceptProposal } = useProposals()
   const [activeSection, setActiveSection] = useState('overview')
   
   const handleSucess = ({apiType,candidateId}):void=>{
      if(apiType=="Accept_Proposal"){
           setCandidate((prev)=>({...prev,status:'accepted'}))
      }else{
           setCandidate((prev)=>({...prev,status:'rejected'}))
      }
   }
   const showToast = (message, type = 'success') => {
      setToast({ show: true, message, type })
      setTimeout(() => {
         setToast(prev => ({ ...prev, show: false }))
      }, 5000)
   }

   const makingReq = async () => {
      const fetchedDetails = await fetchSpecificProposal({ candidateInfo, setCandidate, setIsLoading, setError })
   }

   useEffect(() => {
      makingReq()
   }, [])

   const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      })
   }

   const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
         case 'pending':
            return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white'
         case 'accepted':
            return 'bg-gradient-to-r from-green-400 to-green-500 text-white'
         case 'rejected':
            return 'bg-gradient-to-r from-red-400 to-red-500 text-white'
         default:
            return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
      }
   }

   const sections = [
      { id: 'overview', label: 'Overview', icon: '👤' },
      { id: 'proposal', label: 'Proposal', icon: '📝' },
      { id: 'professional', label: 'Professional', icon: '💼' },
   ]

   return (
      <>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
         >
            <Toast
               isVisible={toast.show}
               message={toast.message}
               type={toast.type}
               onClose={() => setToast(prev => ({ ...prev, show: false }))}
            />

            {error ? (
               <JobError
                  isDialog={true}
                  onClose={onClose}
                  customError={error}
               />
            ) : isLoading ? (
               <div className="bg-white rounded-3xl p-12 shadow-2xl">
                  <div className="text-center">
                     <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-6"></div>
                     <LoadingSpinner size={50} />
                     <p className="text-gray-600 mt-4">Loading candidate details...</p>
                  </div>
               </div>
            ) : (
               <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 50 }}
                  className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col"
                  onClick={(e) => e.stopPropagation()}
               >
                  {/* Header */}
                  <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-6 flex justify-between items-center z-10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                           <FaUser className="text-xl" />
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold">Candidate Profile</h2>
                           <p className="text-orange-100">Detailed information and proposal</p>
                        </div>
                     </div>
                     <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                     >
                        <FaTimesCircle size={20} />
                     </motion.button>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="bg-gray-50 border-b px-8 py-4">
                     <div className="flex gap-2">
                        {sections.map((section) => (
                           <motion.button
                              key={section.id}
                              onClick={() => setActiveSection(section.id)}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className={`
                                 flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all
                                 ${activeSection === section.id
                                    ? 'bg-white text-orange-600 shadow-md'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                 }
                              `}
                           >
                              <span>{section.icon}</span>
                              <span>{section.label}</span>
                           </motion.button>
                        ))}
                     </div>
                  </div>

                  {/* Content - REMOVED fixed height */}
                  <div className="flex-1 overflow-y-auto">
                     <AnimatePresence mode="wait">
                        {activeSection === 'overview' && (
                           <motion.div
                              key="overview"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="p-8 space-y-8"
                           >
                              {/* Profile Header */}
                              <div className="flex flex-col lg:flex-row gap-8">
                                 <div className="flex flex-col sm:flex-row items-start gap-6">
                                    <div className="relative">
                                       <img
                                          src={candidate?.profilePicture || '/default-avatar.png'}
                                          alt={`${candidate?.firstName} ${candidate?.lastName}`}
                                          className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
                                       />
                                       <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white"></div>
                                    </div>
                                    <div className="space-y-3">
                                       <div>
                                          <h3 className="text-3xl font-bold text-gray-900">
                                             {candidate?.firstName} {candidate?.lastName}
                                          </h3>
                                          <div className="flex items-center gap-2 mt-2">
                                             <span className={`px-4 py-2 rounded-2xl font-semibold text-sm ${getStatusColor(candidate?.status)}`}>
                                                {candidate?.status?.charAt(0).toUpperCase() + candidate?.status?.slice(1)}
                                             </span>
                                             <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-2xl font-semibold text-sm">
                                                {candidate?.type}
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              {/* Contact & Basic Info Grid */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                 {/* Contact Information */}
                                 <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-6">
                                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                       <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
                                          <FaEnvelope className="text-white text-sm" />
                                       </div>
                                       Contact Information
                                    </h4>
                                    <div className="space-y-4">
                                       <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
                                          <FaEnvelope className="text-orange-500 text-lg" />
                                          <div>
                                             <div className="text-sm text-gray-500">Email</div>
                                             <div className="font-semibold text-gray-900">{candidate?.email}</div>
                                          </div>
                                       </div>
                                       <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
                                          <FaPhoneAlt className="text-orange-500 text-lg" />
                                          <div>
                                             <div className="text-sm text-gray-500">Phone</div>
                                             <div className="font-semibold text-gray-900">{candidate?.phoneNum}</div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 {/* Key Details */}
                                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6">
                                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                       <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
                                          <FaBriefcase className="text-white text-sm" />
                                       </div>
                                       Key Details
                                    </h4>
                                    <div className="space-y-4">
                                       <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
                                          <FaBriefcase className="text-blue-500 text-lg" />
                                          <div>
                                             <div className="text-sm text-gray-500">Experience</div>
                                             <div className="font-semibold text-gray-900">{candidate?.professionalDetails?.yearsOfExperience} years</div>
                                          </div>
                                       </div>
                                       <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
                                          <FaDollarSign className="text-green-500 text-lg" />
                                          <div>
                                             <div className="text-sm text-gray-500">Expected Salary</div>
                                             <div className="font-semibold text-gray-900">${candidate?.expectedSalary}</div>
                                          </div>
                                       </div>
                                       <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
                                          <FaCalendarAlt className="text-purple-500 text-lg" />
                                          <div>
                                             <div className="text-sm text-gray-500">Available From</div>
                                             <div className="font-semibold text-gray-900">{formatDate(candidate?.availabe)}</div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              {/* Skills Section - IMPROVED */}
                              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6">
                                 <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center">
                                       <FaAward className="text-white text-sm" />
                                    </div>
                                    Skills & Expertise
                                 </h4>
                                 {candidate?.skills && candidate.skills.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                       {candidate.skills.map((skill, index) => (
                                          <motion.span
                                             key={index}
                                             initial={{ opacity: 0, scale: 0.8 }}
                                             animate={{ opacity: 1, scale: 1 }}
                                             transition={{ delay: index * 0.1 }}
                                             className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl font-medium text-sm hover:shadow-lg transition-shadow whitespace-nowrap"
                                          >
                                             {skill}
                                          </motion.span>
                                       ))}
                                    </div>
                                 ) : (
                                    <div className="text-gray-500 italic p-4 bg-white rounded-2xl">
                                       No skills listed
                                    </div>
                                 )}
                              </div>
                           </motion.div>
                        )}

                        {/* Other sections remain the same */}
                        {activeSection === 'proposal' && (
                           <motion.div
                              key="proposal"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="p-8 space-y-6"
                           >
                              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8">
                                 <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center">
                                       <FaFileAlt className="text-white" />
                                    </div>
                                    Candidate Proposal
                                 </h4>
                                 <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                                       {candidate?.Proposal || "No proposal submitted yet."}
                                    </p>
                                 </div>
                                 <div className="mt-6 p-4 bg-white rounded-2xl">
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                       <span>Submitted on: {formatDate(candidate?.sentAt)}</span>
                                       <span className="flex items-center gap-2">
                                          <FaClock />
                                          {new Date(candidate?.sentAt).toLocaleTimeString()}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </motion.div>
                        )}

                        {activeSection === 'professional' && (
                           <motion.div
                              key="professional"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="p-8 space-y-6"
                           >
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                 {/* Professional Links */}
                                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6">
                                    <h4 className="text-xl font-bold text-gray-900 mb-6">Professional Links</h4>
                                    <div className="space-y-4">
                                       <a
                                          href={candidate?.professionalDetails?.linkedinProfile}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-md transition-shadow group"
                                       >
                                          <FaLinkedin className="text-blue-600 text-xl group-hover:scale-110 transition-transform" />
                                          <div>
                                             <div className="text-sm text-gray-500">LinkedIn Profile</div>
                                             <div className="font-semibold text-blue-600 group-hover:underline">View Profile</div>
                                          </div>
                                       </a>
                                       <a
                                          href={candidate?.professionalDetails?.portfolioUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-md transition-shadow group"
                                       >
                                          <FaGlobe className="text-green-600 text-xl group-hover:scale-110 transition-transform" />
                                          <div>
                                             <div className="text-sm text-gray-500">Portfolio Website</div>
                                             <div className="font-semibold text-green-600 group-hover:underline">View Portfolio</div>
                                          </div>
                                       </a>
                                    </div>
                                 </div>

                                 {/* Contract Details */}
                                 <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6">
                                    <h4 className="text-xl font-bold text-gray-900 mb-6">Contract Details</h4>
                                    <div className="space-y-4">
                                       <div className="p-4 bg-white rounded-2xl">
                                          <div className="text-sm text-gray-500 mb-1">Contract Type</div>
                                          <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold">
                                             {candidate?.contractType}
                                          </span>
                                       </div>
                                       <div className="p-4 bg-white rounded-2xl">
                                          <div className="text-sm text-gray-500 mb-1">Expected Compensation</div>
                                          <div className="text-2xl font-bold text-green-600">${candidate?.expectedSalary}</div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>

                  {/* Footer Actions */}
                  <div className="sticky bottom-0 bg-white border-t px-8 py-6">
                     <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-500">
                           <span className="flex items-center gap-2">
                              <FaCalendarAlt />
                              Application submitted: {formatDate(candidate?.sentAt)}
                           </span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                           {isCreator && candidate?.status === 'pending' && (
                              <>
                                 <motion.button
                                    onClick={() => acceptProposal({ proposalId: candidate._id, apiType: "Accept_Proposal", sucessFunction:()=>{handleSucess({apiType:"Accept_Proposal",candidateId:candidate._id})} })}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                                 >
                                    <FaCheck />
                                    Accept Proposal
                                 </motion.button>
                                 <motion.button
                                    onClick={() => acceptProposal({ proposalId: candidate._id, apiType: "Reject_Proposal", sucessFunction:()=>{handleSucess({apiType:"Reject_Proposal",candidateId:candidate._id})} })}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                                 >
                                    <FaTimes />
                                    Reject Proposal
                                 </motion.button>
                              </>
                           )}
                           <motion.button
                              onClick={() => { getCv(candidateInfo?._id) }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                           >
                              <FaFileAlt />
                              Download CV
                           </motion.button>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}
         </motion.div>
      </>
   )
}

export default CandidateDetails
// 'use client'

// import { motion } from 'framer-motion'
// import { FaRegEye, FaRegHeart, FaHeart, FaShare, FaMapMarkerAlt, FaCalendar, FaGraduationCap, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa'
// import { useState } from 'react'

// const JobInfo = ({ job, isCreator, initialIsLiked }) => {
//   const [isLiked, setIsLiked] = useState(initialIsLiked);
//   const [likeCount, setLikeCount] = useState(job.Liked || 0);

//   const handleLikeClick = async () => {
//     try {
//       // Toggle like state immediately for better UX
//       setIsLiked(prev => !prev);
//       setLikeCount(prev => prev + (isLiked ? -1 : 1));

//       // Here you would make your API call
//       const response = await fetch('http://localhost:8002/job/liked', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ jobId: job._id, isLiked: !isLiked }),
//         credentials:"include"
//       });
      
    
//       if (!response.ok) {
//         setIsLiked(prev => !prev);
//         setLikeCount(prev => prev + (isLiked ? 1 : -1));
//       }
//     } catch (error) {
//       // Revert on error
//       setIsLiked(prev => !prev);
//       setLikeCount(prev => prev + (isLiked ? 1 : -1));
//       console.error('Error toggling like:', error);
//     }
//   };

//   const {
//     Title,
//     Description,
//     postedBy,
//     dateOfDebut,
//     status,
//     minimumSalary,
//     maximumSalary,
//     isDiplomaRequired,
//     experienceRequired,
//     Region,
//     City,
//     contractType,
//     Views,
//     shares
//   } = job

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-6"
//     >
//       <div className="flex justify-between items-start">
//         <h1 className="text-3xl font-bold text-gray-900">{Title}</h1>
//         <div className="flex space-x-4">
//           <div className="flex items-center text-gray-500">
//             <FaRegEye className="mr-2" />
//             <span>{Views}</span>
//           </div>
//           <button 
//             onClick={handleLikeClick}
//             className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
//           >
//             {isLiked ? (
//               <FaHeart className="mr-2 text-red-500" />
//             ) : (
//               <FaRegHeart className="mr-2" />
//             )}
//             <span>{likeCount}</span>
//           </button>
//           <div className="flex items-center text-gray-500">
//             <FaShare className="mr-2" />
//             <span>{shares}</span>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="flex items-center text-gray-600">
//           <FaCalendar className="mr-2 text-orange-500" />
//           <span>Interview Date: {new Date(dateOfDebut).toLocaleDateString()}</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <FaMapMarkerAlt className="mr-2 text-orange-500" />
//           <span>{Region} - {City}</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <FaGraduationCap className="mr-2 text-orange-500" />
//           <span>Diploma Required: {isDiplomaRequired ? 'Yes' : 'No'}</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <FaBriefcase className="mr-2 text-orange-500" />
//           <span>Experience: {experienceRequired} years</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <FaMoneyBillWave className="mr-2 text-orange-500" />
//           <span>Salary: ${minimumSalary} - {maximumSalary}</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <FaBriefcase className="mr-2 text-orange-500" />
//           <span>Contract Type: {contractType}</span>
//         </div>
//       </div>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-4">Description</h2>
//         <p className="text-gray-700 whitespace-pre-wrap">{Description}</p>
//       </div>

//       <div className="border-t pt-6 mt-6">
//         <div className="flex items-center">
//           <img
//             src={postedBy?.avatar || '/default-avatar.png'}
//             alt={postedBy?.nameOfCreator}
//             className="w-12 h-12 rounded-full"
//           />
//           <div className="ml-4">
//             <p className="font-medium text-gray-900">Posted by {postedBy?.nameOfCreator}</p>
//             <p className="text-gray-500">Status: {job.status}</p>
//           </div>
//         </div>
//       </div>

//       {isCreator && (
//         <div className="border-t pt-6 mt-6">
//           <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
//             Edit Job
//           </button>
//         </div>
//       )}
//     </motion.div>
//   )
// }

// export default JobInfo 




'use client'

import { motion } from 'framer-motion'
import { FaRegEye, FaRegHeart, FaHeart, FaShare, FaMapMarkerAlt, FaCalendar, FaGraduationCap, FaBriefcase, FaMoneyBillWave, FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { useState } from 'react'
import useJobs from '../Hooks/useJobs'

const JobInfo = ({ job, isCreator, initialIsLiked, initialIsSaved }) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [likeCount, setLikeCount] = useState(job.Liked || 0);
   const {likeJobHook,saveJobHook} = useJobs()
  const handleLikeClick = async () => {
    const liked = await likeJobHook({jobId:job._id,isLiked,setIsLiked,setLikeCount})
  };

  const handleSaveClick = async () => {
    const saved = await saveJobHook({jobId:job._id,isSaved,setIsSaved})
  };

  const {
    Title,
    Description,
    postedBy,
    dateOfDebut,
    status,
    minimumSalary,
    maximumSalary,
    isDiplomaRequired,
    experienceRequired,
    Region,
    City,
    contractType,
    Views,
    shares,
    nameOfCreator
  } = job

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between w-full items-start">
        <h1 className="text-3xl font-bold text-gray-900">{Title}</h1>
        <div className="flex space-x-4">
          <div className="flex items-center text-gray-500">
            <FaRegEye className="mr-2" />
            <span>{Views}</span>
          </div>
          <button 
            onClick={handleLikeClick}
            className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
          >
            {isLiked ? (
              <FaHeart className="mr-2 text-red-500" />
            ) : (
              <FaRegHeart className="mr-2" />
            )}
            <span>{likeCount}</span>
          </button>
          <button 
            onClick={handleSaveClick}
            className="flex items-center text-gray-500 hover:text-orange-500 transition-colors"
            title={isSaved ? "Remove from saved" : "Save job"}
          >
            {isSaved ? (
              <FaBookmark className="mr-2 text-orange-500" />
            ) : (
              <FaRegBookmark className="mr-2" />
            )}
          </button>
          <div className="flex items-center text-gray-500">
            <FaShare className="mr-2" />
            <span>{shares}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center text-gray-600">
          <FaCalendar className="mr-2 text-orange-500" />
          <span>Interview Date: {new Date(dateOfDebut).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-orange-500" />
          <span>{Region} - {City}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaGraduationCap className="mr-2 text-orange-500" />
          <span>Diploma Required: {isDiplomaRequired ? 'Yes' : 'No'}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaBriefcase className="mr-2 text-orange-500" />
          <span>Experience: {experienceRequired} years</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaMoneyBillWave className="mr-2 text-orange-500" />
          <span>Salary: ${minimumSalary} - {maximumSalary}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaBriefcase className="mr-2 text-orange-500" />
          <span>Contract Type: {contractType}</span>
        </div>
      </div>

      <div className="mt-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700 w-[60%] text-lg ">{Description}</p>
      </div>

      <div className="border-t pt-6 mt-6">
        <div className="flex items-center">
          <img
            src={postedBy?.avatar || '/default-avatar.png'}
            alt={job?.nameOfCreator}
            className="w-12 h-12 rounded-full"
          />
          {/* {console.log(job)} */}
          <div className="ml-4">
            <p className="font-medium text-gray-900">Posted by {nameOfCreator}</p>
            <p className="text-gray-500">Status: {job.status}</p>
          </div>
        </div>
      </div>

      {isCreator && (
        <div className="border-t pt-6 mt-6">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Edit Job
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default JobInfo 
// 'use client'

// import { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import JobInfo from '../../Components/JobInfo'
// import CandidatesList from '../../Components/CandidateList'
// import ProposalForm from '../../Components/ProposalForm'
// import JobSidebar from '../../Components/JobSidebar'
// import Navbar from '../../Components/Navbar'
// import { useParams } from 'next/navigation'
// import { useSelector } from 'react-redux'
// import JobError from '../../Components/JobError'
// import LoadingSpinner from '../../Components/LoadingSpinner'
// import useJobs from '../../Hooks/useJobs'
// import useProposals from '../../Hooks/useProposals'


// const JobDetailsPage = ({   currentUser}) => {
//   console.log('this  ran job details page')
//   const [activeTab, setActiveTab] = useState('details')
//   const jobId = useParams().jobinfo
//   const [job,setJob]=useState({})
//   const [isCreator,setIsCreator]=useState()
//   const selector = useSelector((state)=>state.user)
//   const [jobError,setJobError]=useState(null)
//   const [isLoading,setIsLoading]=useState(true)
//   const [isLiked,setisLiked]=useState(false)
//   const [isSaved,setisSaved]=useState(false)
//   const {getJobInfo}=useJobs()
//   const {fetchCandidates}=useProposals()
//   const [candidates,setCandidates]=useState([])
//   const [candidateCursor,setCandidateCursor]=useState()
//   const [candidatePrevDocsIds,setCandidatesPrevDocsIds]=useState([])
//   const [hasMore,setHasMore]=useState(true)
//   const [hasMoreTrigger,setHasMoreTrigger]=useState(false)
//   const fetchingCandidates = async(candidateCursor,candidatePrevDocsIds,jobId)=>{
//         const fetchedCandidates = await fetchCandidates({candidateCursor,candidatePrevDocsIds,jobId,setCandidates,setHasMore,setCandidateCursor,setCandidatesPrevDocsIds})
    
//   }
  

//  const makingReq = async(jobId)=>{
  
//      const jobInfoFetched =  await getJobInfo({jobId, setJob, setisLiked, setisSaved, setIsLoading, setIsCreator, setJobError})
  
//  }
//   useEffect(()=>{
//    makingReq(jobId)
//   },[])
//   useEffect(()=>{
//     if(hasMoreTrigger==true){
//       fetchingCandidates(candidateCursor,candidatePrevDocsIds,jobId)
//     }
//   },[hasMoreTrigger])
//   useEffect(()=>{
//     if(activeTab=="candidates" && candidates.length==0){
//            fetchingCandidates(null,null,jobId) 
//     }
//   },[activeTab])
//   return (
//    <> <Navbar></Navbar> 
//   <div className="container mx-auto px-4 py-8">
 
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left Section */}
//         <motion.div 
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="w-full lg:w-2/3"
//         >
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="border-b border-gray-200">
//               <nav className="-mb-px flex space-x-8">
//                 <button
//                   onClick={() => setActiveTab('details')}
//                   className={`${
//                     activeTab === 'details'
//                       ? 'border-orange-500 text-orange-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
//                 >
//                   Job Details
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('candidates')}
//                   className={`${
//                     activeTab === 'candidates'
//                       ? 'border-orange-500 text-orange-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
//                 >
//                   Candidates
//                 </button>
//               </nav>
//             </div>

//             <div className="mt-6">
//               {activeTab === 'details' ? (
             
          
//               jobError?<JobError type={jobError}></JobError>  : 
             
//             isLoading?  <LoadingSpinner size={50}></LoadingSpinner>  : <JobInfo job={job} initialIsSaved={isSaved} initialIsLiked={isLiked} isCreator={isCreator} />
             
//               ) : (
//                 <CandidatesList 

//                   setHasMoreTrigger={setHasMoreTrigger}
//                   hasMore={hasMore}
//                   candidates={candidates} 
//                   isCreator={isCreator}
//                   jobId={job._id}
//                 />
//               )}

//             </div>
//                {/* after work i have to put ! this behind isCreator */}
//             {!isCreator && activeTab === 'details' && (
//               <ProposalForm jobId={job._id} currentUser={currentUser} />
//             )}
//           </div>
//         </motion.div>

//       </div>
//     </div>
//     </>
//   )
// }

// export default JobDetailsPage 








'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import JobInfo from '../../Components/JobInfo'
import CandidatesList from '../../Components/CandidateList'
import ProposalForm from '../../Components/ProposalForm'
import JobSidebar from '../../Components/JobSidebar'
import Navbar from '../../Components/Navbar'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import JobError from '../../Components/JobError'
import LoadingSpinner from '../../Components/LoadingSpinner'
import useJobs from '../../Hooks/useJobs'
import useProposals from '../../Hooks/useProposals'


const JobDetailsPage = ({   currentUser}) => {
  console.log('this  ran job details page')
  const [activeTab, setActiveTab] = useState('details')
  const jobId = useParams().jobinfo
  const [job,setJob]=useState({})
  const [isCreator,setIsCreator]=useState()
  const selector = useSelector((state)=>state.user)
  const [jobError,setJobError]=useState(null)
  const [isLoading,setIsLoading]=useState(true)
  const [isLiked,setisLiked]=useState(false)
  const [isSaved,setisSaved]=useState(false)
  const {getJobInfo}=useJobs()
  const {fetchCandidates}=useProposals()
  const [candidates,setCandidates]=useState([])
  const [candidateCursor,setCandidateCursor]=useState()
  const [candidatePrevDocsIds,setCandidatesPrevDocsIds]=useState([])
  const [hasMore,setHasMore]=useState(true)
  const [hasMoreTrigger,setHasMoreTrigger]=useState(false)
  const fetchingCandidates = async(candidateCursor,candidatePrevDocsIds,jobId)=>{
        const fetchedCandidates = await fetchCandidates({candidateCursor,candidatePrevDocsIds,jobId,setCandidates,setHasMore,setCandidateCursor,setCandidatesPrevDocsIds})
    
  }
  

 const makingReq = async(jobId)=>{
  
     const jobInfoFetched =  await getJobInfo({jobId, setJob, setisLiked, setisSaved, setIsLoading, setIsCreator, setJobError})
  
 }
  useEffect(()=>{
   makingReq(jobId)
  },[])
  useEffect(()=>{
    if(hasMoreTrigger==true){
      fetchingCandidates(candidateCursor,candidatePrevDocsIds,jobId)
    }
  },[hasMoreTrigger])
  useEffect(()=>{
    if(activeTab=="candidates" && candidates.length==0){
           fetchingCandidates(null,null,jobId) 
    }
  },[activeTab])
  return (
   <> 
   <Navbar></Navbar> 
   {/* Full width container with minimal padding */}
   <div className="w-full min-h-screen bg-gray-50">
     <div className="w-full max-w-none px-6 py-6">
       
       {/* Single column layout taking full width */}
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="w-full"
       >
         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
           {/* Tab Navigation */}
           <div className="border-b border-gray-200 px-8 pt-6">
             <nav className="-mb-px flex space-x-12">
               <button
                 onClick={() => setActiveTab('details')}
                 className={`${
                   activeTab === 'details'
                     ? 'border-orange-500 text-orange-600 bg-orange-50'
                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                 } whitespace-nowrap py-4 px-6 border-b-2 font-semibold text-lg rounded-t-lg transition-all duration-200`}
               >
                 Job Details
               </button>
               <button
                 onClick={() => setActiveTab('candidates')}
                 className={`${
                   activeTab === 'candidates'
                     ? 'border-orange-500 text-orange-600 bg-orange-50'
                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                 } whitespace-nowrap py-4 px-6 border-b-2 font-semibold text-lg rounded-t-lg transition-all duration-200`}
               >
                 Candidates
               </button>
             </nav>
           </div>

           {/* Content Area - Full Width */}
           <div className="p-8">
             {activeTab === 'details' ? (
               <div className="w-full">
                 {jobError ? (
                   <JobError type={jobError}></JobError>  
                 ) : isLoading ? (
                   <div className="flex justify-center items-center py-20">
                     <LoadingSpinner size={50}></LoadingSpinner>
                   </div>
                 ) : (
                   <div className="w-full">
                     <JobInfo 
                       job={job} 
                       initialIsSaved={isSaved} 
                       initialIsLiked={isLiked} 
                       isCreator={isCreator} 
                     />
                   </div>
                 )}
               </div>
             ) : (
               <div className="w-full">
                 <CandidatesList 
                   setHasMoreTrigger={setHasMoreTrigger}
                   hasMore={hasMore}
                   candidates={candidates} 
                   isCreator={isCreator}
                   jobId={job._id}
                 />
               </div>
             )}
           </div>

           {/* Proposal Form - Full Width */}
           {!isCreator && activeTab === 'details' && (
             <div className="border-t border-gray-200 p-8 bg-gray-50">
               <ProposalForm jobId={job._id} currentUser={currentUser} />
             </div>
           )}
         </div>
       </motion.div>

     </div>
   </div>
   </>
  )
}

export default JobDetailsPage
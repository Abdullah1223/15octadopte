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
//    <> 
//    <Navbar></Navbar> 
//    {/* Full width container with minimal padding */}
//    <div className="w-full min-h-screen bg-gray-50">
//      <div className="w-full max-w-none px-6 py-6">
       
//        {/* Single column layout taking full width */}
//        <motion.div 
//          initial={{ opacity: 0, y: 20 }}
//          animate={{ opacity: 1, y: 0 }}
//          className="w-full"
//        >
//          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//            {/* Tab Navigation */}
//            <div className="border-b border-gray-200 px-8 pt-6">
//              <nav className="-mb-px flex space-x-12">
//                <button
//                  onClick={() => setActiveTab('details')}
//                  className={`${
//                    activeTab === 'details'
//                      ? 'border-orange-500 text-orange-600 bg-orange-50'
//                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
//                  } whitespace-nowrap py-4 px-6 border-b-2 font-semibold text-lg rounded-t-lg transition-all duration-200`}
//                >
//                  Job Details
//                </button>
//                <button
//                  onClick={() => setActiveTab('candidates')}
//                  className={`${
//                    activeTab === 'candidates'
//                      ? 'border-orange-500 text-orange-600 bg-orange-50'
//                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
//                  } whitespace-nowrap py-4 px-6 border-b-2 font-semibold text-lg rounded-t-lg transition-all duration-200`}
//                >
//                  Candidates
//                </button>
//              </nav>
//            </div>

//            {/* Content Area - Full Width */}
//            <div className="p-8">
//              {activeTab === 'details' ? (
//                <div className="w-full">
//                  {jobError ? (
//                    <JobError type={jobError}></JobError>  
//                  ) : isLoading ? (
//                    <div className="flex justify-center items-center py-20">
//                      <LoadingSpinner size={50}></LoadingSpinner>
//                    </div>
//                  ) : (
//                    <div className="w-full">
//                      <JobInfo 
//                        job={job} 
//                        initialIsSaved={isSaved} 
//                        initialIsLiked={isLiked} 
//                        isCreator={isCreator} 
//                      />
//                    </div>
//                  )}
//                </div>
//              ) : (
//                <div className="w-full">
//                  <CandidatesList 
//                    setHasMoreTrigger={setHasMoreTrigger}
//                    hasMore={hasMore}
//                    candidates={candidates} 
//                    isCreator={isCreator}
//                    jobId={job._id}
//                  />
//                </div>
//              )}
//            </div>

//            {/* Proposal Form - Full Width */}
//            {!isCreator && activeTab === 'details' && (
//              <div className="border-t border-gray-200 p-8 bg-gray-50">
//                <ProposalForm jobId={job._id} currentUser={currentUser} />
//              </div>
//            )}
//          </div>
//        </motion.div>

//      </div>
//    </div>
//    </>
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


const JobDetailsPage = ({ currentUser }) => {
  console.log('this ran job details page')
  const [activeTab, setActiveTab] = useState('details')
  const jobId = useParams().jobinfo
  const [job, setJob] = useState({})
  const [isCreator, setIsCreator] = useState()
  const selector = useSelector((state) => state.user)
  const [jobError, setJobError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setisLiked] = useState(false)
  const [isSaved, setisSaved] = useState(false)
  const { getJobInfo } = useJobs()
  const { fetchCandidates } = useProposals()
  const [candidates, setCandidates] = useState([])
  const [candidateCursor, setCandidateCursor] = useState()
  const [candidatePrevDocsIds, setCandidatesPrevDocsIds] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [hasMoreTrigger, setHasMoreTrigger] = useState(false)
  const [isProposalSent,setIsProposalSent] = useState(false)
  const [candidateErrorType,setCandidateErrorType]=useState('none')
  const fetchingCandidates = async (candidateCursor, candidatePrevDocsIds, jobId) => {
    const fetchedCandidates = await fetchCandidates({
      candidateCursor,
      candidatePrevDocsIds,
      jobId,
      setCandidates,
      setHasMore,
      setCandidateCursor,
      setCandidatesPrevDocsIds,
      setCandidateErrorType
    })
  }

  const makingReq = async (jobId) => {
    const jobInfoFetched = await getJobInfo({
      jobId,
      setJob,
      setisLiked,
      setisSaved,
      setIsLoading,
      setIsCreator,
      setJobError,
      setIsProposalSent
    })
  }

  useEffect(() => {
    makingReq(jobId)
    console.log('isProposalSent',isProposalSent)
  }, [])

  useEffect(() => {
    if (hasMoreTrigger == true) {
      fetchingCandidates(candidateCursor, candidatePrevDocsIds, jobId)
    }
  }, [hasMoreTrigger])

  useEffect(() => {
    if (activeTab == "candidates" && candidates.length == 0) {
      fetchingCandidates(null, null, jobId)
    }
  }, [activeTab])

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-orange-50/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full px-4 sm:px-6 py-6 sm:py-8"
        >
          <div className="max-w-4xl mx-auto">
            
            {/* Main Card Container */}
            <div className="bg-white rounded-3xl shadow-lg border border-orange-100 overflow-hidden">
              
              {/* Tab Navigation - Integrated Inside */}
              <div className="border-b-2 border-orange-100 px-6 sm:px-8 pt-6">
                <div className="flex gap-2 sm:gap-4">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={() => setActiveTab('details')}
                    className={`pb-4 px-2 sm:px-4 font-semibold text-base sm:text-lg transition-all duration-300 relative ${
                      activeTab === 'details'
                        ? 'text-orange-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Job Details
                    {activeTab === 'details' && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-t-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                      />
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={() => setActiveTab('candidates')}
                    className={`pb-4 px-2 sm:px-4 font-semibold text-base sm:text-lg transition-all duration-300 relative ${
                      activeTab === 'candidates'
                        ? 'text-orange-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Candidates
                    {activeTab === 'candidates' && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-t-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                      />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-8">
                {/* Details Tab */}
                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {jobError ? (
                      <JobError type={jobError} />
                    ) : isLoading ? (
                      <div className="flex justify-center items-center py-16 sm:py-20">
                        <LoadingSpinner size={50} />
                      </div>
                    ) : (
                      <JobInfo
                        job={job}
                        initialIsSaved={isSaved}
                        initialIsLiked={isLiked}
                        isCreator={isCreator}
                      />
                    )}
                  </motion.div>
                )}

                {/* Candidates Tab */}
                {activeTab === 'candidates' && (
                  <motion.div
                    key="candidates"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CandidatesList
                      setHasMoreTrigger={setHasMoreTrigger}
                      hasMore={hasMore}
                      candidates={candidates}
                      isCreator={isCreator}
                      jobId={job._id}
                      candidateErrorType={candidateErrorType}
                    />
                  </motion.div>
                )}
              </div>

              {/* Proposal Form - Bottom Section if Not Creator */}
              {!isCreator && activeTab === 'details' && !isProposalSent && jobError==null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="border-t-2 border-orange-100 bg-gradient-to-r from-orange-50/50 to-white px-6 sm:px-8 py-6 sm:py-8"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Submit Your Proposal
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Send your proposal to this job
                  </p>
                  <ProposalForm jobId={job._id} currentUser={currentUser} />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default JobDetailsPage
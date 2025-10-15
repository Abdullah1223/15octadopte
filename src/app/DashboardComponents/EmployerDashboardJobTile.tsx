'use client';
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useProposals from "../Hooks/useProposals";
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, 
    Eye, 
    Heart, 
    User, 
   
  } from 'lucide-react';
import LoadingSpinner from "../Components/LoadingSpinner";
import { ProposalTile } from "./EmployerDashboardProposalTile";
export const JobTile = ({ job, isExpanded, onToggle,expandedJob }) => {
    const [activeTab, setActiveTab] = useState('waiting');
    const [waitingCursor,setWaitingCursor]=useState(null)
    const [acceptedCursor,setAcceptedCursor]=useState(null)
    const [rejectedCursor,setRejectedCursor]=useState(null)
    const [waitingPrevDocsIds,setWaitingPrevDocsIds]=useState([])
    const [acceptedPrevDocsIds,setAcceptedPrevDocsIds]=useState([])
    const [rejectedPrevDocsIds,setRejectedPrevDocsIds]=useState([])
    const [waitingHasMore,setWaitingHasMore]=useState(true)
    const [acceptedHasMore,setAcceptedHasMore]=useState(true)
    const [rejectedHasMore,setRejectedHasMore]=useState(true)
    const [waitingProposalData,setWaitingProposalData]=useState([])
    const [acceptedProposalData,setacceptedProposalData]=useState([])
    const [rejectedProposalData,setRejectedProposalData]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [isButton,setIsButton]=useState(false)
    const {ref,inView}=useInView()
    const {fetchProposal} = useProposals()
    const getStatusColor = (status) => {
      switch (status) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'inactive': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    const getProposalCounts = () => {
      return {
        waiting: job.proposalWaitingForApprovalCount,
        accepted: job.acceptedProposalCount,
        rejected: job.rejectedProposalCount,
      };
    };
  
    const counts = getProposalCounts();
  
    const makingReq = async(Cursor,prevDocIds,type,jobId)=>{
        
        fetchProposal({Cursor,prevDocIds,type,jobId,setIsLoading,
          setWaitingProposalData,
          setWaitingCursor,
          setWaitingPrevDocsIds,
          setWaitingHasMore,
          setacceptedProposalData,
          setAcceptedCursor,
          setAcceptedPrevDocsIds,
          setAcceptedHasMore,
          setRejectedProposalData,
          setRejectedCursor,
          setRejectedPrevDocsIds,
          setRejectedHasMore})
    }
   
    useEffect(()=>{
      console.log('inView' , inView)
      if(inView){
        setIsButton(true)
      }
    },[inView])
   useEffect(()=>{
    if(expandedJob==job._id && activeTab=="waiting" && waitingCursor==null && waitingPrevDocsIds.length==0  && waitingProposalData.length==0 ){
      
      makingReq(waitingCursor,waitingPrevDocsIds,"pending",job._id)
     
    }else if(expandedJob==job._id && activeTab=="accepted" && acceptedCursor==null && acceptedProposalData.length==0 && acceptedPrevDocsIds.length==0 ){
      makingReq(acceptedCursor,acceptedPrevDocsIds,'accepted',job._id)
    }else if(expandedJob==job._id && activeTab=="rejected" && rejectedCursor == null && rejectedProposalData.length==0 &&  rejectedPrevDocsIds.length==0){
      makingReq(rejectedCursor,rejectedPrevDocsIds,"rejected",job._id)
    }
   },[isExpanded])
  
    useEffect(()=>{
      if(expandedJob==job._id){
        
        if(activeTab=="waiting" && waitingHasMore==true && waitingProposalData.length==0 ){
          makingReq(waitingCursor,waitingPrevDocsIds,'pending',job._id)
        }else if(activeTab=="accepted" && acceptedHasMore==true && acceptedProposalData.length==0 ){
          makingReq(acceptedCursor,acceptedPrevDocsIds,"accepted",job._id)
        }else if(activeTab=="rejected" && rejectedHasMore==true && rejectedProposalData.length==0){
          makingReq(rejectedCursor,rejectedPrevDocsIds,"rejected",job._id)
        }
       
      }
    },[activeTab])
  
  
    const loadMore = (type)=>{
      if(type=="pending"){
        makingReq(waitingCursor,waitingPrevDocsIds,'pending',job._id)
      }else if(type=="accepted"){
        makingReq(acceptedCursor,acceptedPrevDocsIds,"accepted",job._id)
      }else{
        makingReq(rejectedCursor,rejectedPrevDocsIds,"rejected",job._id) 
      }
    }
  
  
    return (
      <motion.div
        layout
        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="p-6 cursor-pointer"
          onClick={onToggle}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-800">{job.Title}</h3>
                {job.isPromoted && (
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-semibold">
                    Promoted
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm"> {job.Region},{job.City}</span>
              </div>
              <p className="text-gray-700 text-sm line-clamp-2">{job.Description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                {job.status}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{job.Views}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{job.Liked}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">{job.nameOfCreator}</span>
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
              className="border-t  border-gray-100"
            >
              <div className="p-6 ">
                <div className="flex space-x-1 mb-6">
                  {[
                    { key: 'waiting', label: 'Waiting for Approval', count: counts.waiting || 0, color: 'text-yellow-600' },
                    { key: 'accepted', label: 'Accepted', count: counts.accepted || 0, color: 'text-green-600' },
                    { key: 'rejected', label: 'Rejected', count: counts.rejected || 0, color: 'text-red-600' }
                  ].map((tab) => (
                    <motion.button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        activeTab === tab.key
                          ? 'bg-orange-100 text-orange-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tab.label} ({tab.count})
                    </motion.button>
                  ))}
                </div>
  
  
        
  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
  {/* {console.log('data',waitingProposalData)} */}
    {
     isLoading ? 
     <LoadingSpinner size={50}></LoadingSpinner>
     : 
      activeTab === "waiting" ? (
        waitingProposalData?.length > 0 ? (
          <div>
         { waitingProposalData.map((data,index) => {
                
          return <div key={data._id} ref={index === waitingProposalData.length - 1 ? ref : null}>
       
            <ProposalTile key={data._id} proposal={data} setProposal={setWaitingProposalData} />
          </div>
})}
          {isButton === true && waitingHasMore === true ? (
            <button 
            onClick={()=>loadMore('pending')}
            className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Load More
            </button>
          ) : null}
          
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No proposals in this category yet.
          </div>
        )
      ) : activeTab === "accepted" ? (
        acceptedProposalData?.length > 0 ? (
          <div>
            {acceptedProposalData.map((data, index) => (
              <div key={index} ref={index === acceptedProposalData.length - 1 ? ref : null}>
                <ProposalTile key={data._id} proposal={data} setProposal={setacceptedProposalData} />
              </div>
            ))}
            {isButton === true && acceptedHasMore === true ? (
              <button
              onClick={()=>loadMore('accepted')}
              className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Load More
              </button>
            ) : null}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No proposals in this category yet.
          </div>
        )
      ) : activeTab === "rejected" ? (
        rejectedProposalData?.length > 0 ? (
         <div>{ rejectedProposalData.map((data) => (
            <ProposalTile key={data._id} proposal={data} setProposal={setRejectedProposalData} />
          ))}
            {isButton === true && rejectedHasMore === true ? (
              <button
              onClick={()=>loadMore('rejected')}
              className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Load More
              </button>
            ) : null}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No proposals in this category yet.
          </div>
        )
      ) : null
    }
  </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  
import { Dispatch, SetStateAction } from "react";
import { fetchCandidatesInterface, fetchProposalInterface, fetchSpecificProposalInterface, getCandidatesInterface, useProposalInterface } from "../interfaces/proposalinterfaces";
import { acceptProposalCall, acceptProposalInterface, getCandidates, getProposal, getSpecificProposal } from "../Services/proposals.service";
import { toast } from "sonner";
import { NotLoggedInErrorMessage, proposalNotFoundErrorMessage, proposalServerErrorMessage } from "../ErrorMessages/errorMessages";
import { FaExclamationTriangle, FaSearch, FaUserSlash } from "react-icons/fa";

export default function useProposals():useProposalInterface{
  
     
  const fetchProposal = async(
 {   Cursor,prevDocIds,type,jobId,setIsLoading,
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
    setRejectedHasMore,
}:fetchProposalInterface)=>{
    try{ 
        setIsLoading(true)
        console.log('call made ', " type ", type)
        console.log(jobId)
        const response = await getProposal({Cursor,prevDocIds,type,jobId})
      
       const result = await response.data
       if(response.status==200){
         if(type=="pending"){
           setWaitingProposalData((prev)=>[...prev,...result.proposalDetails])
           setWaitingCursor(result.lastCursor)
           setWaitingPrevDocsIds(result.previousDocumentIds)
           setWaitingHasMore(result.hasMore)  
         }else if(type=="accepted"){
              setacceptedProposalData((prev)=>[...prev,...result.proposalDetails])
              setAcceptedCursor(result.lastCursor)
              setAcceptedPrevDocsIds(result.previousDocumentIds)
              setAcceptedHasMore(result.hasMore) 
         }else {
             setRejectedProposalData((prev)=>[...prev,...result.proposalDetails]) 
             setRejectedCursor(result.lastCursor)
             setRejectedPrevDocsIds(result.previousDocumentIds)
             setRejectedHasMore(result.hasMore)
           }
       }else if(response.status==404){
         
        toast.error(proposalNotFoundErrorMessage.title,{description:proposalNotFoundErrorMessage.description})
        
       }else if(response.status==400){
         if(result.type=="not_connected"){
            toast.error(NotLoggedInErrorMessage.title,{
                description:NotLoggedInErrorMessage.description
            })
         }  
       }else{
         toast.error(proposalServerErrorMessage.title,{description:proposalServerErrorMessage.description})
       }
       setIsLoading(false)
    }catch(err){
        setIsLoading(false)
        toast.error(proposalServerErrorMessage.title,{description:proposalServerErrorMessage.description})
    }
}
    
 const fetchCandidates = async({
  candidateCursor,candidatePrevDocsIds,jobId,
  setCandidates,
  setHasMore,
  setCandidateCursor,
  setCandidatesPrevDocsIds
 }:fetchCandidatesInterface)=>{
     try{
      const response = await getCandidates({candidateCursor,candidatePrevDocsIds,jobId})
      const result = await response.data 
      console.log('fetch Candidates Result',result)
      if(response.status==200){
        setCandidates((prev)=>[...prev,...result.candidateDetails])
        setHasMore(result.hasMore)
        setCandidateCursor(result.lastCursor)
        setCandidatesPrevDocsIds(result.prevDocumentIds)
    
      }else if(response.status==404){
        
      }
    
     }catch(err){
       console.log(err)
     } 
}


  const fetchSpecificProposal = async({
    candidateInfo,
      setCandidate,
      setIsLoading,
      setError

  }:fetchSpecificProposalInterface)=>{

    const response = await getSpecificProposal(candidateInfo)
    const result = await response.data;
    if(response.status==200){
      console.log('result candidate details', result)
      setCandidate(result.AllDetails)
      setIsLoading(false)
    }else{
       if(response.status==404){
        setError({
          icon: FaSearch,
          title: 'Candidate Not Found',
          description: 'The Candidate you\'re looking for doesn\'t exist or has been removed.',
          actionText: 'Browse Jobs',
          actionLink: '/jobs'
        })
       }else if(response.status==400){
        setError({
         
              icon: FaUserSlash,
              title: 'Authentication Required',
              description: 'Please sign in to view proposal details',
              actionText: 'Sign In',
              actionLink: '/login'
            
        })

       }else if(response.status==500){
        setError({
           icon: FaExclamationTriangle,
              title: 'Something Went Wrong',
              description: 'An error occurred while loading the proposal details.',
              actionText: 'Try Again',
              actionLink: '#'
        })
       } 
   setIsLoading(false)
      }
  }

   const acceptProposal=async({proposalId,apiType,setCandidate,sucessFunction}:acceptProposalInterface)=>{
    const response = await acceptProposalCall({proposalId,apiType})
  console.log('proposalId',proposalId)
    const result = await response.data;
    if(response.status==200){
     let Message:string;
     let title:string;
     if(apiType=="Accept_Proposal"){
       Message='Proposal Accepted Secussfully'
       title='Proposal Accepted';
      //  setCandidate((prev)=>({...prev,status:'accepted'}))
      sucessFunction();
      }else{
       Message='Proposal Rejected Secussfully'
       title='Proposal Rejected'
       sucessFunction();
      //  setCandidate((prev)=>({...prev,status:'rejected'}))
      }
     toast.success(title,{
       description:Message
     })
    }else if(response.status==400){
     if(result.type==`Already_${apiType}`){
       toast.error(`You Have Already ${apiType=="Accept_Proposal"?"Accepted":"Rejected"} This Proposal `)
     }else{
         toast.error('Please Log In')
     }
     //
    }else if(response.status==403){
     toast.error('Unauthorized',{description:'You are not authorized to perform this action.'})
    }
   }

    return {
       fetchProposal,
       fetchCandidates,
       fetchSpecificProposal,
       acceptProposal
      }
     

}


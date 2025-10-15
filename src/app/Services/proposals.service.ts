import { Dispatch, SetStateAction } from "react";
import { Candidate, candidateInfoInterface } from "../interfaces/candidateInterface";
import { getCandidatesInterface, getProposalInterface } from "../interfaces/proposalinterfaces";
import { jobInstance } from "./jobs.service";
import { AxiosResponse } from "axios";

const jobUrl = process.env.NEXT_PUBLIC_JOB_SERVICE      

export const getProposal = async({Cursor,prevDocIds,type,jobId}:getProposalInterface):Promise<AxiosResponse>=>{
     
    try{
        
    const response = await jobInstance.post(`/fetch/employerDashboard/proposals`,
      {Cursor,prevDocIds,type,jobId}
      // {
      //   headers:{
      //     'Content-Type':"application/json"
      //   },
      //   credentials:"include",
      //   method:"POST",
      //   body:JSON.stringify({Cursor,prevDocIds,type,jobId})
      // }
    )
     
      return response;

    }catch(err){
        throw Error('Error Fetching Proposal')
    }
}

export const getCandidates =async({candidateCursor,candidatePrevDocsIds,jobId}:getCandidatesInterface):Promise<AxiosResponse>=>{
  try{
    const response = await jobInstance.post(`proposal/fetch/Candidates/Proposal`,
    {candidateCursor,candidatePrevDocsIds,jobId}
      // {
    //   headers:{
    //     "Content-Type":"Application/json"
    //   },
    //   method:"POST",
    //   body:JSON.stringify({candidateCursor,candidatePrevDocsIds,jobId})
    // }
  )
    return response;
  }catch(err){
    throw Error('Error Fetching Candidates')
  }
}


export const  getSpecificProposal = async(candidateInfo:candidateInfoInterface)=>{
             
   try{
    const response = await jobInstance.post(`/proposal/details`,
      {candidateInfo}
      // {
   
      //   headers:{
    //     "Content-Type":"Application/json"
    //   },
    //   method:"POST",
    //   body:JSON.stringify({candidateInfo}),
    //   credentials:"include",
    // }
  )
  
   return response;
  
   
   }catch(err){
    console.log('error' , err)
    throw Error('Error Fetching Specific Proposal')
   }
}


export interface acceptProposalInterface{
  proposalId:string,
  apiType:string,
  setCandidate?:Dispatch<SetStateAction<Candidate>>
  sucessFunction?:()=>void;
}
export const acceptProposalCall=async({proposalId,apiType}:acceptProposalInterface)=>{
   try{
    const response = await jobInstance.post(`/proposal/accept`,
      {proposalId,apiType}
      // {
    //   headers:{
    //     'Content-Type':"Application/json"
    //   },
    //   method:"POST",
    //   credentials:"include",
    //   body:JSON.stringify({proposalId,apiType})
    // }
  )
    return response;
    
   }catch(err){
    throw Error('Error Accepting Proposal')
   }
}


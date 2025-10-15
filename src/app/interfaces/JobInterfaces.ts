import { Dispatch, SetStateAction } from "react";
import { likeJobInterface, saveJobInterface } from "../Services/jobs.service";

export interface fetchEmployerDashboardJobsProps {
    cursor:string[],prevDocIds:string[],
          setJobs:Dispatch<SetStateAction<string[]>>
          ,setCursor:Dispatch<SetStateAction<string[]>>
          ,setPrevDocsIds:Dispatch<SetStateAction<string[]>>
          ,setHasMore:Dispatch<SetStateAction<boolean>>,
          setError:Dispatch<SetStateAction<{}>>
          setIsLoading:Dispatch<SetStateAction<boolean>>
}

export interface fetchEmployerDashboardJobsReturn { 
    Jobs:string[],
    lastCursor:string[],
    previousIds:string[],
    hasMore:boolean
}


export interface likeJobHookInterface extends likeJobInterface {
        setIsLiked:Dispatch<SetStateAction<boolean>>,
        setLikeCount:Dispatch<SetStateAction<number>>
}

export interface  saveJobHookInterface extends saveJobInterface{
    setIsSaved:Dispatch<SetStateAction<boolean>>
}

export interface getJobInfoInterface{
    jobId:string,
      setJob:Dispatch<SetStateAction<{}>>,
      setisLiked:Dispatch<SetStateAction<boolean>>,
      setisSaved:Dispatch<SetStateAction<boolean>>,
      setIsLoading:Dispatch<SetStateAction<boolean>>,
      setIsCreator:Dispatch<SetStateAction<boolean>>,
      setJobError:Dispatch<SetStateAction<string|null>>
      
}

export interface fetchCreatorJobsInterface{
    cursor:string,
    creatorId:string,
    prevDocuments:string[],
    setJobs:Dispatch<SetStateAction<Job[]>>,
    setCursor:Dispatch<SetStateAction<string | null>>,
    setExcludeDocIds:Dispatch<SetStateAction<string[] | []>>,
    setHasMore:Dispatch<SetStateAction<boolean>>,
    setLoading:Dispatch<SetStateAction<boolean>>
}



export interface Job{
       
             Title:string,
             createdBy:string,
             nameOfCreator:string,
             contractType:string,
             minimumSalary:number,
             maximumSalary:number,
             createdOn:Date,
             dateOfDebut:Date,
             Region:string,
             City:string,
             Department:string,
             isDiplomaRequired:boolean,
             isPromoted:boolean,
             diploma:string,
             experienceRequired:string,
             Specialization:string,
             Description:string,
             status:string,
             savedBy:{
               userId:string,
               dateOfSaved:Date,
             },
            appiliedCandidates:[
               {
                userId:string,
               proposalReference:string,
               dateOfApplying:Date}
            ],
            acceptedCandidates:[{
               userId:string,
               proposalReference:string,
               dateOfAccept:Date
            }],
            rejectedCandidates:[{
             userId:string,
             proposalReference:string,
             dateOfAccept:Date
          }],
            matchingCandidates:[{
               userId:string,
            }], 
           Views:number,
          
           
           candidatesCount:number,
           Liked:number,
       
           LikedBy:[
             {
                userId:string
             }
           ],
           Shares:number,
           proposalWaitingForApprovalCount:number
           acceptedProposalCount:number,
           rejectedProposalCount:number
       
}
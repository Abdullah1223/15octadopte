import { Dispatch, SetStateAction } from "react"
import {SetErrorInterface} from '../interfaces/errorInterface'
import { updateCandidateProfileInterface, updateCandidateProfilePictureProps } from "./candidateInterface"
export interface useProfileInterface{

    fetchProfileInfo(props:fetchProfileInfoProps):Promise<void>
    updateProfileInfoEmployer(props:updateProfileInfoEmployerProps):Promise<void>
   updateCandidateProfilePicture(props:updateCandidateProfilePictureProps):Promise<void>;
   updateCandidateProfile(props:updateCandidateProfileInterface):Promise<void>;
}

export interface Profile{
           _id:string,
           companyName:string,
           email:string,
           followersCount:number,
           followingCount:number,
           firstName:string,
           lastName:string,
           isFollowed:boolean,
           location:string,
           proposalAcceptedCount:number,
           proposalRejectedCount:number,
           proposalWaitingForApproval:number,
           username:string,
           role:string,
           foundingYear:Date,
           companySize:number,
           companyWebsite:string,
           aboutCompany:string
}

export interface CandidateProfileInterface{
   profilePicture:{
      key:string
      url:string
    },
    candidateType:string,
    proposalSentCount:number,
    preferredContractType:string,
    Specialization:string,
    City:string,
    salaryExpectationMinimum:number,
    salaryExpectationMaximum:number,
    yearsOfExperience:string,
    Skills:string[],
    savedJobType:number,
    savedTotalCount:number
    experience:any
}

export interface fetchProfileInfoProps{
    userId:string,
    setProfileData:Dispatch<SetStateAction<Profile>>,
    setIsOwner:Dispatch<SetStateAction<boolean>>,
    setIsFollowed:Dispatch<SetStateAction<boolean>>,
    setError:Dispatch<SetStateAction<boolean>>,
    setErrorType:Dispatch<SetStateAction<string>>,
    setErrorData:Dispatch<SetStateAction<SetErrorInterface>>,
    setLoading:Dispatch<SetStateAction<boolean>>,
}
export interface updateProfileInfoEmployerProps{
  validateField:(editingField:string,editValues:any)=>{},
  editingField:string,
  editValues:{},
  setValidationErrors:Dispatch<SetStateAction<{}>>,
  data:any,
  setIsVisible:Dispatch<SetStateAction<boolean>>,
  onUpdate:(editValues:any)=>void;
  setEditModalOpen:Dispatch<SetStateAction<boolean>>
}
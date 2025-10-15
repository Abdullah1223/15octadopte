import { Dispatch, SetStateAction } from "react"
import { localDataInterface } from "../Components/profileInfoCandidateView"

export interface candidateInfoInterface {
    City:string,
    Skills:string[],
    firstName:string,
    location:string,
    profilePicture:{
        key:string,
        url:string
    },
    proposalReference:string,
    type:string,
    username:string,
    yearsOfExperience:string
    _id:string
}

export interface Candidate{
    Proposal:string,
    availabe:Date,
    candidateId:string,
    contractType:string,
    email:string,
    expectedSalary:string,
    firstName:string,
    jobId:string,
    lastName:string,
    phoneNum:number,
    professionalDetails:{
      linkedinProfile:string,
      portfolioUrl:string,
      yearsOfExperience:string,
    },
    profilePicture:string,
    sentAt:Date,
    skills:string[],
    status:string,
    type:string,
    _id:string,
  }

  export interface fileInfo {
    name:string,
    size:number,
    type:string
  }
  export interface updateCandidateProfilePictureProps{
    fileInfo:fileInfo,
    file?:File,
    setEditValues?:Dispatch<SetStateAction<{}>>,
    editValues?:{},
    onUpdate?:Dispatch<SetStateAction<{}>>,
    dispatch?:any
  }

 export interface updateCandidateProfileInterface{
  editingField:string
  ,editValues:any,
  setExperiences:Dispatch<SetStateAction<{}>>,
  experiences:any,
  data:localDataInterface,
  setIsVisible:Dispatch<SetStateAction<boolean>>,
  onUpdate:(editValues:any)=>void,
  setEditModalOpen:Dispatch<SetStateAction<boolean>>,
  setValidationErrors:Dispatch<SetStateAction<{}>>
 } 
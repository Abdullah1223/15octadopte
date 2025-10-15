import { Dispatch, RefObject, SetStateAction } from "react";
import { localDataInterface } from "../Components/profileInfoCandidateView";

export interface useCvInterface {
    getCv(userId:any)
    fetchUserInfoCv(props:fetchUserInfoCvInterface);
    fetchSavedCv(props:fetchSavedCvInterface);
    getCvProfileInfo(props:getCvProfileInfoInterface);
    uploadCv(props:uploadCvInterface);
    getUploadCvPresignedUrl(props:getUploadCvPresignedInterface);
}

export interface getCvProfileInfoInterface{
    candidateId:string,
    data:localDataInterface;
    onUpdate:(updates:localDataInterface)=>void;

}

export interface getUploadCvPresignedInterface{
    fileMetadata:any,
    setUploadState:Dispatch<SetStateAction<uploadCvInterface>>;
}

export interface uploadCvInterface{
    fileName:string,
    fileSize:number,
    fileType:string,
    setBackendErrors:Dispatch<SetStateAction<any>>;
    pdfBlob:Blob,
    setIsLoading:Dispatch<SetStateAction<boolean>>;
    setShowStatusBar:Dispatch<SetStateAction<boolean>>
}
export interface fetchUserInfoCvInterface{
    cursor:string,
    prevDocs:string[]
    setPageLoading:Dispatch<SetStateAction<boolean>>;
    setUsers:Dispatch<SetStateAction<UserCvInterface[]>>;
    setCursor:Dispatch<SetStateAction<string|null>>;
    setPrevDocs:Dispatch<SetStateAction<string[]>>;
    setHasMore:Dispatch<SetStateAction<boolean>>;
    pageRef:RefObject<any>;
}


export interface fetchSavedCvInterface{
    cursor:string,
    prevDocs:string[]
    setLoading:Dispatch<SetStateAction<boolean>>;
    loading:boolean;
    loadRef:RefObject<any>;
    setCvData:Dispatch<SetStateAction<UserCvInterface[]>>;
    setCursor:Dispatch<SetStateAction<string|null>>;
    setHasMore:Dispatch<SetStateAction<boolean>>;
    setSavedCvCount:Dispatch<SetStateAction<number>>;
    setPrevDocs:Dispatch<SetStateAction<string[]>>;

}
export interface UserCvInterface {
    City:string,
    Cv:string,
    Skills:string[],
    Specialization:string,
    email:string,
    firstName:string,
    isSaved:boolean,
    location:string,
    preferredContractType:string,
    profilePicture:string,
    salaryExpectationMaximum:number,
    salaryExpectationMinimum:number,
    type:string,
    yearsOfExperience:string,
    _id:string
}
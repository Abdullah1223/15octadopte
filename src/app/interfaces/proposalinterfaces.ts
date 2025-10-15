import { Dispatch, SetStateAction } from "react";
import { SetErrorInterface } from "./errorInterface";
import { Candidate, candidateInfoInterface } from "./candidateInterface";
import { acceptProposalInterface } from "../Services/proposals.service";

export  interface   getProposalInterface {
    Cursor:string | null;
    prevDocIds:string[]|null;
    type:string;
    jobId:string
}

export interface fetchProposalInterface{
    Cursor:string | null;
    prevDocIds:string[]|null;
    type:string;
    jobId:string;
    setIsLoading:Dispatch<SetStateAction<boolean>>
    setWaitingProposalData:Dispatch<SetStateAction<string[]>>;
    setWaitingCursor:Dispatch<SetStateAction<string | null>>,
    setWaitingPrevDocsIds:Dispatch<SetStateAction<string[]>>,
    setWaitingHasMore:Dispatch<SetStateAction<boolean>>,
    setacceptedProposalData:Dispatch<SetStateAction<string[]>>,
    setAcceptedCursor:Dispatch<SetStateAction<string | null>>,
    setAcceptedPrevDocsIds:Dispatch<SetStateAction<string[]>>,
    setAcceptedHasMore:Dispatch<SetStateAction<boolean>>,
    setRejectedProposalData:Dispatch<SetStateAction<string[]>>,
    setRejectedCursor:Dispatch<SetStateAction<string | null>>,
    setRejectedPrevDocsIds:Dispatch<SetStateAction<string[]>>,
    setRejectedHasMore:Dispatch<SetStateAction<boolean>>
}

export interface fetchSpecificProposalInterface {
    candidateInfo:candidateInfoInterface,
      setCandidate:Dispatch<SetStateAction<Candidate>>,
      setIsLoading:Dispatch<SetStateAction<boolean>>,
      setError:Dispatch<SetStateAction<SetErrorInterface|null>>
}

export interface useProposalInterface {
    fetchProposal:(props:fetchProposalInterface)=>Promise<void>;
    fetchCandidates(props:fetchCandidatesInterface):Promise<void>;
    fetchSpecificProposal(props:fetchSpecificProposalInterface):Promise<void>;
    acceptProposal(props:acceptProposalInterface):Promise<void>;
}

export interface getCandidatesInterface{
    candidateCursor:string | null;
    candidatePrevDocsIds:Dispatch<SetStateAction<string[]>>;
    jobId:string;
}

export interface fetchCandidatesInterface extends getCandidatesInterface{
    setCandidates:Dispatch<SetStateAction<string[]>>;
    setHasMore:Dispatch<SetStateAction<boolean>>;
    setCandidateCursor:Dispatch<SetStateAction<string | null>>,
    setCandidatesPrevDocsIds:Dispatch<SetStateAction<string[]>>
}
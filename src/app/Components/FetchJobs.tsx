'use client';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import { algoliasearch } from 'algoliasearch';
import { InstantSearch} from 'react-instantsearch';
import CustomSearchBar2 from './CustomSearchBarJobs';
import { useInView } from 'react-intersection-observer';
import AdsPreview from './AdsPreview';
import { toast } from 'sonner';
import { JobAdError, JobFetchErrorServer, } from '../ErrorMessages/errorMessages';
import useJobs from '../Hooks/useJobs';
import ConditionalHits from './JobsConditionHits';
import { JobsList } from './JobList';
import Footer from './Footer';


function Header (){
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4" >
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Votre emploi de rêve dans la coiffure idéale n’est qu’à un clic.
        </h1>

        <h2
          className="text-xl md:text-2xl text-orange-100"
        >
          Découvrez des opportunités passionnantes dans les meilleurs salons à travers la France.
       </h2>
      </div>
    </div>
  );
};




interface HairdressingJobPortalProps {
    propjobs:string[],
    propCursorRegular:string|null,
    propCursorPromoted:string | null,
    propPrevDocsRegular:string[] | null
    propPrevDocsPromoted:string[] | null ,
    pageRefValue:boolean,
    isJobError:boolean,
    isAdError:boolean,
    propAds:string[];
  }
const HairdressingJobPortal = ({propjobs,propCursorRegular,propCursorPromoted,propPrevDocsRegular,propPrevDocsPromoted,pageRefValue,isJobError,isAdError,propAds}:HairdressingJobPortalProps) => {
  console.log('isAdError',isAdError)
  console.log('isJobError',isJobError)
  const [jobs, setJobs] = useState(propjobs);
  const {getJobs,getJobsAd} = useJobs()
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [cursorRegular,setCursorRegular]=useState(propCursorRegular)
  const searchClient = algoliasearch('ZTJ32FOJMI', 'd829fbb07a8cbd8d503c6f523ee51ea5');
  const [filters, setFilters] = useState({
    region: '',
    contractType: '',
    minimumSalary: '',
    specialization: ''
  });
  const {ref,inView}=useInView()
  const [cursorPromoted,setCursorPromoted]=useState(propCursorPromoted)
  const [prevDocsRegular,setPrevDocsRegular]=useState(propPrevDocsRegular)
  const [isLoading,setIsLoading]=useState(false)
  const [prevDocsPromoted,setPrevDocsPromoted]=useState(propPrevDocsPromoted)
  const [Ads,setAds]=useState(propAds)
  const [hasMore,setHasMore]=useState(true)
  const [errorState,setErrorState]=useState({jobError:isJobError,adError:isAdError,})

  // const errorTrack = useRef({
  //   jobError:isJobError,
  //   jobErrorCount:0,
  //   adError:isAdError,
  //   adErrorCount:0
  // }) 
  const pageRef = useRef(pageRefValue)
  const makingReq = async(cursorRegular,cursorPromoted)=>{
    const response = await getJobs(cursorRegular,cursorPromoted,prevDocsRegular,prevDocsPromoted,setJobs,setCursorPromoted,setCursorRegular,setPrevDocsRegular,setPrevDocsPromoted,setHasMore,setIsLoading,pageRef);
  }


  useEffect(()=>{
    
    if(pageRef.current==false && inView==true && hasMore==true ){
      console.log('cursorRegular',cursorRegular,cursorPromoted)
      console.log('Request Made')
      makingReq(cursorRegular,cursorPromoted)
    }
  
  },[inView])
  
  useEffect(()=>{
     
    setErrorState({jobError:isJobError,adError:isAdError})
  },[isJobError, isAdError])

  const renderToast = ()=>{
    if(errorState.jobError){
      toast.error(JobFetchErrorServer.title,{
        description:JobFetchErrorServer.description
      })
    }
    if(errorState.adError){
      toast.error(JobAdError.title,{
        description:JobAdError.description
      })
    }
  }
  
  return (
    <>
    
        <main className="min-h-screen bg-gray-50">
        {renderToast()}
      <Navbar></Navbar> 
      
      <Header />
       <AdsPreview data={Ads}></AdsPreview>
      <InstantSearch indexName='Jobs' searchClient={searchClient}>
      <CustomSearchBar2 filters={filters} setFilters={setFilters}  ></CustomSearchBar2>
     <ConditionalHits></ConditionalHits>
      </InstantSearch>
       
      <JobsList jobs={jobs} isLoading={isLoading} ref={ref} />
       <Footer></Footer>
    </main>
    </>

  );
};

export default HairdressingJobPortal;


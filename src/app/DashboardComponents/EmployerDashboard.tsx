import React, { useEffect, useState } from 'react';
import JobError from '../Components/JobError'
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../Components/LoadingSpinner';
import useJobs from '../Hooks/useJobs';
import { JobTile } from './EmployerDashboardJobTile';
const JobDashboard = () => {
  const [expandedJob, setExpandedJob] = useState(null);
 const [jobs,setJobs]=useState([])
 const [cursor,setCursor]=useState([])
 const [prevDocIds,setPrevDocsIds]=useState([])
 const [hasMore,setHasMore]=useState(true)
 const [error,setError] = useState(null)
 const [isLoading,setIsLoading]=useState(false)
 const {fetchEmployerDashboardJobs} = useJobs()
 const {inView,ref} = useInView()

useEffect(()=>{
if(inView && hasMore){
  fetchEmployerDashboardJobs({cursor:cursor,prevDocIds:prevDocIds,setJobs:setJobs,setCursor:setCursor,setPrevDocsIds:setPrevDocsIds,setHasMore:setHasMore,setError,setIsLoading})
    
  }
},[inView])

 useEffect(()=>{
  if(jobs.length==0){
    fetchEmployerDashboardJobs({cursor:null,prevDocIds:null,setJobs:setJobs,setCursor:setCursor,setPrevDocsIds:setPrevDocsIds,setHasMore:setHasMore,setError,setIsLoading})
  }
 },[])
  const toggleJob = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  if(jobs.length==0){
   return <JobError customError={
     error
   }/>    
  }
  return (
    
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
    

        <div className="space-y-6">
          {jobs.map((job) => (
            <JobTile
              key={job._id}
              job={job}
              expandedJob={expandedJob}
              isExpanded={expandedJob === job._id}
              onToggle={() => toggleJob(job._id)}
            />
          ))}
         <div ref={ref}></div>
         {isLoading ? 
        <LoadingSpinner size={50}></LoadingSpinner>:
        hasMore==false ? 
        <div className='flex justify-center items-center'>
         <p className='text-black text-xl'>Vous avez tout couvert</p>   
        </div>
        :null 
        } 
        </div>
      </div>
    </div>
  );
};

export default JobDashboard;

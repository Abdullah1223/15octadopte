import { Dispatch, SetStateAction } from "react";
import { fetchingJobInfo, fetchingJobs, getCreatorJobs, getEmployerJobs, likeJob, likeJobInterface, saveJob } from "../Services/jobs.service";
import { creatorJobsNotFound, errorFetchingJobs, JobAdError, JobFetchErrorServer, LikedServerErrorMessage, SavedJobServerErrorMessage, serverErrorOccurredCreatorJobs } from "../ErrorMessages/errorMessages";
import { toast } from "sonner"; // or wherever your toast comes from
import { fetchJobAds } from "../Services/ads.service";
import { fetchCreatorJobsInterface, fetchEmployerDashboardJobsProps, fetchEmployerDashboardJobsReturn, getJobInfoInterface, likeJobHookInterface, saveJobHookInterface } from "../interfaces/JobInterfaces";
import { FaExclamationTriangle, FaUserSlash } from "react-icons/fa";

interface useJobsInterface {
    getJobs: (
        
    cursorRegular:string,cursorPromoted:string,prevDocsRegular:string[],prevDocsPromoted:string[]|string,
    setJobs:Dispatch<SetStateAction<string[]>>,
    setCursorPromoted:Dispatch<SetStateAction<string | null>>,
    setCursorRegular:Dispatch<SetStateAction<string | null>>,
    setPrevDocsRegular:Dispatch<SetStateAction<string[]>>,
    setPrevDocsPromoted:Dispatch<SetStateAction<string[]>>,
    setHasMore:Dispatch<SetStateAction<boolean>>,
    setIsLoading:Dispatch<SetStateAction<boolean>>,
    pageRef:React.MutableRefObject<boolean>
    ) =>void

    getJobsAd:(setAds:Dispatch<SetStateAction<string[]>>)=>void,


    fetchEmployerDashboardJobs:(props:fetchEmployerDashboardJobsProps)=>Promise<fetchEmployerDashboardJobsReturn>,
    getJobInfo:(props:getJobInfoInterface)=>Promise<void>
    likeJobHook:(props:likeJobHookInterface)=>Promise<void>
    saveJobHook:(props:saveJobHookInterface)=>Promise<void>
    fetchCreatorJobs:(props:fetchCreatorJobsInterface)=>Promise<void>
}
export default function useJobs():useJobsInterface{
     const AdUrl = process.env.NEXT_PUBLIC_AD_SERVICE    
    
    const getJobs = async(
   
    cursorRegular:string,cursorPromoted:string,prevDocsRegular:string[],prevDocsPromoted:string,
    setJobs:Dispatch<SetStateAction<string[]>>,
    setCursorPromoted:Dispatch<SetStateAction<string | null>>,
    setCursorRegular:Dispatch<SetStateAction<string | null>>,
    setPrevDocsRegular:Dispatch<SetStateAction<string[]>>,
    setPrevDocsPromoted:Dispatch<SetStateAction<string[]>>,
    setHasMore:Dispatch<SetStateAction<boolean>>,
    setIsLoading:Dispatch<SetStateAction<boolean>>,
    pageRef:React.MutableRefObject<boolean>
    )=>{
       try{
        
       setIsLoading(true)        
      const response = await fetchingJobs(cursorRegular,cursorPromoted,prevDocsRegular,prevDocsPromoted);  
    const result = await response.data;
    console.log(result)
   if(response.status==200){
    setIsLoading(false)
    setJobs((prev)=>[...prev,...result.jobs])
    setCursorPromoted(result.lastCursorPromoted)
    setCursorRegular(result.lastCursorRegular)
    setPrevDocsRegular(result.prevDocsRegularIds)
    setPrevDocsPromoted(result.prevDocsPromotedIds)
    setHasMore(result.hasMore)
    pageRef.current=false;   
  }else if(response.status==404){
    setHasMore(false)
    setIsLoading(false)
    toast.error(JobFetchErrorServer.title,{
      description:JobFetchErrorServer.description  
  })
  }else if(response.status==400){
     setIsLoading(false)
  }else{
    setIsLoading(false)
    console.log('this error worked')
    toast.error('Server Is Busy Try Again Later')
  }
  
  }catch(err){
    toast.error(JobFetchErrorServer.title,{
        description:JobFetchErrorServer.description  
    })
  }


    }
 

    const fetchEmployerDashboardJobs = async({cursor,prevDocIds,setJobs,setCursor,setPrevDocsIds,setHasMore,setError,setIsLoading}:fetchEmployerDashboardJobsProps):Promise<fetchEmployerDashboardJobsReturn>=>{
       try{
          setIsLoading(true)     
          const response = await getEmployerJobs({cursor,prevDocIds})
          const result = await response.data 
          if(response.status==200){
            setJobs((prev)=>[...prev,...result.Jobs])
            setCursor(result.lastCursor)
            setPrevDocsIds(result.previousIds)
            setHasMore(result.hasMore)
            setIsLoading(false)
          }else if(response.status==404){
           setHasMore(result.hasMore) 
           setIsLoading(false)
           toast.error(JobFetchErrorServer.title, {
             description: JobFetchErrorServer.description,
           })
          }else if(response.status==400){
            setError({
              icon: FaUserSlash,
              title: 'Authentification requise',
              description: 'Veuillez vous connecter pour voir les annonces.',
              actionText: 'Se connecter',
              actionLink: '/login'
            })
          setIsLoading(false)
          }
         return result; 
       }catch(err){
        setIsLoading(false)
        toast.error(JobFetchErrorServer.title, {
          description: JobFetchErrorServer.description,
        })

        setError(
          {
            icon: FaExclamationTriangle,
            title: "Une erreur s'est produite",
            description: 'Une erreur s’est produite lors du chargement des détails de la proposition.',
            actionText: 'Réessayer',
            actionLink: '#'
          }
        )

       }
     }
    

    /**
     * Fetches job ads from the server.
     * The response object from the server is returned.
     * @returns {Promise<Response>} - The response object from the server.
     */
    const getJobsAd = async(setAds)=>{
        const response = await fetchJobAds()
        try{
          if(response.status==200){
            const result = await response.json()
            setAds(result?.Ads)
          }else{
           console.log('this error worked')
            setAds(null)
            
          }
        }catch(err){
           toast.error(JobAdError.title, {
                        description: JobAdError.description,
                      });
        }
    }


    const getJobInfo =async({
        jobId,
        setJob, 
        setisLiked,
        setisSaved, 
        setIsLoading,
        setIsCreator,
        setJobError
    }:getJobInfoInterface):Promise<void>=>{
         const response = await fetchingJobInfo(jobId)  
           
         const result = await response.data
         console.log(result)
          if(response.status==200){
            setJob(result.jobInfo) 
            setisLiked(result.isLiked)
            setisSaved(result.isSaved)
            setIsLoading(false)
            setIsCreator(result.isCreator)
          }else{
            
             if(response.status==400){
             setJobError("default")       
            }else if(response.status==404){
             setJobError('notFound') 
            }else if(response.status==500){
               setJobError("default") 
            }
            setIsLoading(false)
          } 
    }



    const likeJobHook = async ({jobId,isLiked,setIsLiked,setLikeCount}:likeJobHookInterface)=>{
      try {
        // Toggle like state immediately for better UX
        setIsLiked(prev => !prev);
        setLikeCount(prev => prev + (isLiked ? -1 : 1));
          
        const response = await likeJob({jobId,isLiked})
        //  console.log('like hook data',response.response.data)
         if(response.status==200){
          console.log('like job hook',response)
          if(!isLiked){
            toast.success("Liked Updated",{
              description:"You Like Has Been Added"
            })
          }else{
            toast.warning("Liked Updated",{
              description:"You Like Has Been Removed"
            })
          }
          
         }
        if (response.status!==200) {
          // console.log('like job hook',response)

          setIsLiked(prev => !prev);
          setLikeCount(prev => prev + (isLiked ? 1 : -1));
          toast.error(LikedServerErrorMessage.title, {
            description: LikedServerErrorMessage.description
          })
        }
      } catch (error) {
        // Revert on error
        setIsLiked(prev => !prev);
        setLikeCount(prev => prev + (isLiked ? 1 : -1));
        toast.error(LikedServerErrorMessage.title, {
          description: LikedServerErrorMessage.description
        })
        console.error('Error toggling like:', error);

      }
    }

    const saveJobHook = async ({jobId,isSaved,setIsSaved}:saveJobHookInterface)=>{
      try {
        // Toggle save state immediately for better UX
        setIsSaved(prev => !prev);
       const response = await saveJob({jobId,isSaved})    

       if(response.ok){
        if(!isSaved){
          toast.success("Saved Job Updated",{
            description:"You Saved Job Has Been Added"
          })
        }else{
          toast.warning("Saved Job Updated",{
            description:"You Saved Job Has Been Removed"
          })
        }
       }
        if (!response.ok) {
          // Revert on error
          setIsSaved(prev => !prev);
          toast.error(SavedJobServerErrorMessage.title, {
            description: SavedJobServerErrorMessage.description
          })
        }
      } catch (error) {
        // Revert on error
        setIsSaved(prev => !prev);
        console.error('Error toggling save:', error);
        toast.error(SavedJobServerErrorMessage.title, {
          description: SavedJobServerErrorMessage.description
        })
      }
    }

   const fetchCreatorJobs=async({cursor,creatorId,prevDocuments,setJobs,setCursor,setExcludeDocIds,setHasMore,setLoading})=>{
    
    
     try {
    if(cursor==null){
        setLoading(true);
    }
    const response = await getCreatorJobs({creatorId,lastCursor:cursor,prevDocuments})
    if (response.status==200) {
      const data = await response.data;
      setJobs((prev)=>[...prev,...data.Jobs]); 
      setCursor(data.nextCursor);
      setExcludeDocIds(data.prevDocsIds);
      setHasMore(data.hasMore)
      setLoading(false)
    } else if(response.status==404){
      toast.error(creatorJobsNotFound.title,{
        description:creatorJobsNotFound.description
       })
      setLoading(false) 
         setHasMore(false)
    }else if(response.status==400){
       toast.error(errorFetchingJobs.title,{
        description:errorFetchingJobs.description
       })  
      setLoading(false) 
    }else{
      toast.error(serverErrorOccurredCreatorJobs.title,{
        description:serverErrorOccurredCreatorJobs.description
      })
     setLoading(false) 
    }
  } catch (err) {
    toast.error(serverErrorOccurredCreatorJobs.title,{
      description:serverErrorOccurredCreatorJobs.description
    })
    setLoading(false)
    console.error('Error fetching jobs:', err);
  } finally {
    setLoading(false);
  }


   } 
    return {
        getJobs,
        getJobsAd,
        fetchEmployerDashboardJobs,
        getJobInfo,
        likeJobHook,
        saveJobHook,
        fetchCreatorJobs
      }
}    
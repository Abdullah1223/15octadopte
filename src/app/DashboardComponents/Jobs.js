'use client';
import { Filter } from 'lucide-react';
import Layout from '../Dashboard/Layout';
import SearchBar from './SearchBar';
import JobCard from './JobCard';
import { useTranslation } from '../Context/TranslationContext.';
import { InstantSearch } from 'react-instantsearch';
import CustomSearchBar2 from '../Components/CustomSearchBarJobs';
import ConditionalHits from '../Components/JobsConditionHits';
import { algoliasearch } from 'algoliasearch';
import { useEffect, useRef, useState } from 'react';
import useJobs from '../Hooks/useJobs';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../Components/LoadingSpinner';

 export default function Jobs() {
        const { translate, setLanguage, language } = useTranslation();
          const searchClient = algoliasearch('ZTJ32FOJMI', 'd829fbb07a8cbd8d503c6f523ee51ea5');
         const {fetchJobsForYou} = useJobs()
         const pageRef = useRef(0)
         const [lastCursorPromoted,setLastCursorPromoted]=useState(null)
         const [lastCursorRegular,setLastCursorRegular]=useState(null)
         const [promotedPrevDocs,setPromotedPrevDocs]=useState([])
         const [regularPrevDocs,setRegularPrevDocs] = useState([])
         const [promotedHasMore,setPromotedHasMore]=useState(true)
         const [regularHasMoe,setRegularHasMore]=useState(true)
         const [FetchLoading,setFetchLoading]=useState(false)
         const {ref,inView}=useInView()
         const [jobs,setJobs]=useState([])


          const [filters, setFilters] = useState({
              region: '',
              contractType: '',
              minimumSalary: '',
              specialization: ''
            });
        


            const getJobs = async()=>{
              
               await fetchJobsForYou({lastCursorPromoted,promotedPrevDocs,lastCursorRegular,regularPrevDocs,setLastCursorPromoted,setPromotedPrevDocs,setLastCursorRegular,setRegularPrevDocs,setPromotedHasMore,setRegularHasMore,setFetchLoading,setJobs})
              
            }
     
         
   useEffect(()=>{ 
     pageRef.current++;
    console.log('promotedHAsmore',promotedHasMore)
    console.log('reguarlhasmore',regularHasMoe)
    console.log('pageREf',pageRef.current)
    if(pageRef.current>1){

      if(inView &&  regularHasMoe || promotedHasMore ){
      console.log('call made')
      setFetchLoading(true)
      getJobs()
    }
    }

    },[inView])

  useEffect(()=>{
    getJobs()
  
    console.log(lastCursorPromoted,lastCursorRegular)
  },[])          

  // const jobs = [
  //   {
  //     title: translate('Barber In Paris'),
  //     company: 'Shiekh Solutions',
  //     location: 'Paris, France',
  //     experience: '3 Years',
  //     salary: '4000$',
  //     type: 'Part Time',
  //     skills: ['Unisex', 'Female Only', 'Male Only'],
  //     publishedDate: '2/2/25',
  //   },
  //   {
  //     title: translate('Barber In Paris') ,
  //     company: 'Shiekh Solutions',
  //     location: 'Paris, France',
  //     experience: '3 Years',
  //     salary: '4000$',
  //     type: 'Part Time',
  //     skills: ['Unisex', 'Female Only', 'Male Only'],
  //     publishedDate: '2/2/25',
  //   },
  //   {
  //     title: translate('Barber In Paris'),
  //     company: 'Shiekh Solutions',
  //     location: 'Paris, France',
  //     experience: '3 Years',
  //     salary: '4000$',
  //     type: 'Part Time',
  //     skills: ['Unisex', 'Female Only', 'Male Only'],
  //     publishedDate: '2/2/25',
  //   },
  // ];

  return ( 
    
      <div className="p-6">
        <div className='w-full pb-8'>
            <InstantSearch indexName='Jobs' searchClient={searchClient}>
              <CustomSearchBar2 filters={filters} setFilters={setFilters}  ></CustomSearchBar2>
             <ConditionalHits></ConditionalHits>
              </InstantSearch>
        </div>
        {/* <div className="mb-6">
          <h1 className="text-2xl text-black font-bold mb-4">{translate('find_&_search_jobs')}</h1>
          <div className="flex gap-4">
            <div className="flex-1">
              <SearchBar placeholder="Search Jobs By Location,Skill,jobtitle" />
            </div>
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Filter size={18} className="mr-2" />
              <span>Filters</span>
            </button>
          </div>
        </div> */}

        <div className="bg-white rounded-lg shadow">
          {jobs?.map((job, index) => (
            <div ref={jobs?.length -1 ? ref :null}>
            <JobCard key={index} _id={job._id} Title={job.Title} City={job.City} Department={job.Department} Description={job.Description} Region={job.Region} Specialization={job.Specialization} contractType={job.contractType} createdBy={job.createdBy} createdOn={job.createdOn} dateOfDebut={job.dateOfDebut} diploma={job.diploma} experienceRequired={job.experienceRequired} isDiplomaRequired={job.isDiplomaRequired} isPromoted={job.isPromoted} maximumSalary={job.maximumSalary} minimumSalary={job.minimumSalary} nameOfCreator={job.nameOfCreator} status={job.status} Likes={job.Liked} Views={job.Views} />
            {index == jobs.length - 1 && FetchLoading ? <div className='flex justify-center items-center w-full'> <LoadingSpinner size={40} ></LoadingSpinner> </div>: null }
          </div>
          ))}
        </div>
      </div>
    
  );
}
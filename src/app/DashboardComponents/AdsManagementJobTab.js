// import { Briefcase, Clock, MapPin, Search, Target, Trash2 } from "lucide-react";
// import { Controller, useForm } from "react-hook-form";
// import ErrorMessage from "./AdsManagementErrorComponent";
// import { deleteAd, MultiSelectRegions } from "./AdsManagementFunctions";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { z } from 'zod';
// import AdsManagementJobTabCustomSearchBar from "./AdsManagementJobTabSearchBar";
// import { Hits, InstantSearch, useSearchBox } from "react-instantsearch";
// import { algoliasearch } from "algoliasearch";

// const jobPromoteSchema = z.object({
//     title: z.string()
//       .min(1, 'Title is required')
//       .max(100, 'Title must be less than 100 characters'),
//     description: z.string()
//       .min(1, 'Description is required')
//       .max(500, 'Description must be less than 500 characters'),
//     targetSpecialization: z.array(z.string())
//       .min(1, 'At least one specialization must be selected'),
//     targetRegions: z.array(z.string())
//       .min(1, 'At least one region must be selected'),
//     duration: z.coerce.number()
//       .min(1, 'Duration is required')
//       .refine(val => !isNaN(val) && val > 0, 'Duration must be a positive number'),
//   });

// // Multi-select component for specializations
// const MultiSelectSpecializations = ({ value, onChange, error, placeholder }) => {
//   const [isOpen, setIsOpen] = useState(false);
  
//   const specializations = [
//     'Developers',
//     'Designers', 
//     'Product Managers',
//     'Data Scientists',
//     'DevOps Engineers',
//     'QA Engineers',
//     'Marketing Specialists',
//     'Sales Representatives',
//     'All Users'
//   ];

//   const toggleSpecialization = (specialization) => {
//     const newValue = value.includes(specialization)
//       ? value.filter(item => item !== specialization)
//       : [...value, specialization];
//     onChange(newValue);
//   };

//   return (
//     <div className="relative">
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         className={`w-full p-3 border rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-start justify-between ${
//           error ? 'border-red-300' : 'border-gray-300'
//         } ${value.length === 0 ? 'text-gray-400' : 'text-gray-900'}`}
//       >
//         <div className="flex-1 min-w-0">
//           {value.length === 0 ? (
//             placeholder
//           ) : (
//             <div className="flex flex-wrap gap-1">
//               {value.map((specialization) => (
//                 <span
//                   key={specialization}
//                   className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
//                 >
//                   {specialization}
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSpecialization(specialization);
//                     }}
//                     className="ml-1 text-blue-600 hover:text-blue-800"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>
//         <span className="ml-2 flex-shrink-0 self-start mt-0.5">▼</span>
//       </div>
      
//       {isOpen && (
//         <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//           {specializations.map(specialization => (
//             <div
//               key={specialization}
//               onClick={() => toggleSpecialization(specialization)}
//               className={`p-3 cursor-pointer hover:bg-gray-100 ${
//                 value.includes(specialization) ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
//               }`}
//             >
//               <input
//                 type="checkbox"
//                 checked={value.includes(specialization)}
//                 onChange={() => {}}
//                 className="mr-2"
//               />
//               {specialization}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const AdManagementJobTab  = ({setIsOpen,setAmount,setDurationType,setDuration,setClientSecret,setIsLoading,setIsToastOpen,setToastType,setToastData})=>{
//        const [selectedJobForPromotion, setSelectedJobForPromotion] = useState(null);
//        const [searchTerm, setSearchTerm] = useState('');
       
//        const searchClient = algoliasearch('ZTJ32FOJMI', 'd829fbb07a8cbd8d503c6f523ee51ea5');

// function Hit({hit}){

//  return (
//   <div key={hit._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
//                             <div className="flex justify-between items-start">
//                               <div className="flex-1">
//                                 <h4 className="font-semibold text-gray-900">{hit.Title}</h4>
//                                 <p className="text-sm text-gray-600">{hit.nameOfCreator}</p>
//                                 <p className="text-sm text-gray-500">{hit.Region}</p>
//                               </div>
//                               <button
//                                 onClick={() => setSelectedJobForPromotion(hit._id)}
//                                 className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
//                               >
//                                 Promote
//                               </button>
//                             </div>
//                           </div>
//  )
// }

// function ConditionalHits() {
//   const { query } = useSearchBox();

//   if (!query) {
//     return null; // Or return null to hide completely
//   }

//   return <Hits hitComponent={Hit} />;
// }

//        const [jobAds, setJobAds] = useState([
//            {
//              id: 1,
//              jobTitle: 'Senior React Developer',
//              company: 'Tech Corp',
//              location: 'Remote',
//              isPromoted: true,
//              title: 'Exciting React Developer Opportunity',
//              description: 'Join our dynamic team and work on cutting-edge React applications with modern technologies.',
//              targetSpecialization: ['Developers'],
//              targetRegions: ['Global'],
//              duration: '30 days',
//              views: 456,
//              applications: 23
//            }
//          ]);
       

// const [availableJobs] = useState([
//     { id: 1, title: 'Senior React Developer', company: 'Tech Corp', location: 'Remote' },
//     { id: 2, title: 'UX Designer', company: 'Design Studio', location: 'New York' },
//     { id: 3, title: 'Data Scientist', company: 'Analytics Inc', location: 'San Francisco' },
//     { id: 4, title: 'Product Manager', company: 'Startup Hub', location: 'Austin' }
//   ]);    
//          const filteredJobs = availableJobs.filter(job => 
//             job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             job.company.toLowerCase().includes(searchTerm.toLowerCase())
//           );
        
//     const jobPromoteForm = useForm({
//         resolver: zodResolver(jobPromoteSchema),
//         defaultValues: {
//           title: '',
//           description: '',
//           targetSpecialization: [],
//           targetRegions: [],
//           duration: 30
//         }
//       });
      
//     const promoteJob = async(data) => {
//         if (!selectedJobForPromotion) return;
//         setIsLoading(true)
//         const response = await fetch('https://adopte.gotdns.ch/api8/ads/jobs/promotion/creation',{
//           headers:{
//             'Content-Type':"application/json"
//           },
//           body:JSON.stringify({...data,jobId:selectedJobForPromotion}),
//           credentials:"include",
//           method:"POST"
//         })
//         const result = await response.json()
//         if(response.status==200){
//           setIsLoading(false)
//           setIsToastOpen(true)
//           setToastType('success')
//           setToastData('Congragulations Your Ad Has Been Created')
//           setIsOpen(true)
//           setAmount(result.price)
//           setDurationType(result.durationType)
//           setDuration(result.duration)
//           setClientSecret(result.client_secret)
//            const job = availableJobs.find(j => j.id.toString() === selectedJobForPromotion.toString());
//         const newJobAd = {
//           id: Date.now(),
//           jobTitle: job.title,
//           company: job.company,
//           location: job.location,
//           isPromoted: true,
//           ...data,
//           views: 0,
//           applications: 0
//         };

//         setJobAds(prev => [...prev, newJobAd]);
//         jobPromoteForm.reset();
//         setSelectedJobForPromotion(null);    
//         }else if(response.status==400){
//              if(result.type=="not_connected"){
//               setIsLoading(false)
//               setIsToastOpen(true)
//               setToastType('error')
//               setToastData('Please Login')
//              }else{
//               setIsLoading(false)
//         setIsToastOpen(true)
//         setToastType('error')
//         setToastData('Please Enter Accurate Details')
//              } 
       
//             }else if(response.status==403){
//              if(result.type=="not_authorized"){
//               setIsLoading(false)
//               setIsToastOpen(true)
//               setToastType('error')
//               setToastData('You  Are Not Authorized To Access This')
//              }   
//         }else{

//           setIsLoading(false)
//         setIsToastOpen(true)
//         setToastType('error')
//         setToastData('Server Error! Please Try Again Later')
//         }
       
//       };




//            return  <div>
//                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//                     <h2 className="text-2xl font-bold text-gray-900">Job Advertisements</h2>
//                   </div>
    
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="text-lg font-semibold mb-4">Available Jobs</h3>
//                       <InstantSearch indexName="Jobs" searchClient={searchClient}>
//                     <AdsManagementJobTabCustomSearchBar></AdsManagementJobTabCustomSearchBar>
                    
//                       <div className="space-y-3 max-h-96 overflow-y-auto">
//                     <ConditionalHits></ConditionalHits>
                   
//                         {/* {filteredJobs.map(job => (
//                           <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
//                             <div className="flex justify-between items-start">
//                               <div className="flex-1">
//                                 <h4 className="font-semibold text-gray-900">{job.title}</h4>
//                                 <p className="text-sm text-gray-600">{job.company}</p>
//                                 <p className="text-sm text-gray-500">{job.location}</p>
//                               </div>
//                               <button
//                                 onClick={() => setSelectedJobForPromotion(job.id)}
//                                 className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
//                               >
//                                 Promote
//                               </button>
//                             </div>
//                           </div>
//                         ))} */}
//                       </div>
//                       </InstantSearch>
//                     </div>
    
//                     <div>
//                       <h3 className="text-lg font-semibold mb-4">Promote Job</h3>
//                       {selectedJobForPromotion && (
//                         <div className="bg-gray-50 rounded-lg p-6">
//                           <form onSubmit={jobPromoteForm.handleSubmit(promoteJob)}>
//                             <div className="space-y-4">
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Advertisement Title *</label>
//                                 <Controller
//                                   name="title"
//                                   control={jobPromoteForm.control}
//                                   render={({ field, fieldState }) => (
//                                     <>
//                                       <input
//                                         {...field}
//                                         type="text"
//                                         placeholder="Enter a catchy title for your job advertisement"
//                                         className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                           fieldState.error ? 'border-red-300' : 'border-gray-300'
//                                         }`}
//                                       />
//                                       <ErrorMessage error={fieldState.error} />
//                                     </>
//                                   )}
//                                 />
//                               </div>

//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Advertisement Description *</label>
//                                 <Controller
//                                   name="description"
//                                   control={jobPromoteForm.control}
//                                   render={({ field, fieldState }) => (
//                                     <>
//                                       <textarea
//                                         {...field}
//                                         rows={4}
//                                         placeholder="Describe what makes this job opportunity special and attractive to candidates"
//                                         className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
//                                           fieldState.error ? 'border-red-300' : 'border-gray-300'
//                                         }`}
//                                       />
//                                       <div className="flex justify-between text-xs text-gray-500 mt-1">
//                                         <span>{field.value?.length || 0}/500 characters</span>
//                                       </div>
//                                       <ErrorMessage error={fieldState.error} />
//                                     </>
//                                   )}
//                                 />
//                               </div>

//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Target Specializations *</label>
//                                 <Controller
//                                   name="targetSpecialization"
//                                   control={jobPromoteForm.control}
//                                   render={({ field, fieldState }) => (
//                                     <>
//                                       <MultiSelectSpecializations
//                                         value={field.value}
//                                         onChange={field.onChange}
//                                         error={fieldState.error}
//                                         placeholder="Select target specializations"
//                                       />
//                                       <ErrorMessage error={fieldState.error} />
//                                     </>
//                                   )}
//                                 />
//                               </div>
    
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Target Regions *</label>
//                                 <Controller
//                                   name="targetRegions"
//                                   control={jobPromoteForm.control}
//                                   render={({ field, fieldState }) => (
//                                     <>
//                                       <MultiSelectRegions
//                                         value={field.value}
//                                         onChange={field.onChange}
//                                         error={fieldState.error}
//                                         placeholder="Select target regions"
//                                       />
//                                       <ErrorMessage error={fieldState.error} />
//                                     </>
//                                   )}
//                                 />
//                               </div>
    
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days) *</label>
//                                 <Controller
//                                   name="duration"
//                                   control={jobPromoteForm.control}
//                                   render={({ field, fieldState }) => (
//                                     <>
//                                       <input
//                                         {...field}
//                                         type="number"
//                                         className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                           fieldState.error ? 'border-red-300' : 'border-gray-300'
//                                         }`}
//                                         min="1"
//                                       />
//                                       <ErrorMessage error={fieldState.error} />
//                                     </>
//                                   )}
//                                 />
//                               </div>
    
//                               <button
//                                 type="submit"
//                                 className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
//                               >
//                                 Promote Job
//                               </button>
//                             </div>
//                           </form>
//                         </div>
//                       )}
//                     </div>
//                   </div>
    
//                   <div className="mt-8">
//                     <h3 className="text-lg font-semibold mb-4">Promoted Jobs</h3>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                       {jobAds.map(job => (
//                         <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
//                           <div className="flex justify-between items-start mb-4">
//                             <div className="flex items-center gap-2">
//                               <Briefcase size={16} className="text-green-600" />
//                               <span className="text-sm font-medium text-green-600">Promoted</span>
//                             </div>
//                             <button
//                               onClick={() => deleteAd(job.id, 'job',null,setJobAds)}
//                               className="p-2 text-gray-400 hover:text-red-600 transition-colors"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
    
//                           <div className="mb-4">
//                             <h4 className="font-bold text-gray-900 mb-1">{job.title || job.jobTitle}</h4>
//                             <p className="text-sm text-gray-600 mb-2">{job.description}</p>
//                             <p className="text-sm text-gray-600">{job.company}</p>
//                             <p className="text-sm text-gray-500">{job.location}</p>
//                           </div>
    
//                           <div className="space-y-2 text-sm text-gray-600">
//                             <div className="flex items-start gap-2">
//                               <Target size={14} className="mt-0.5 flex-shrink-0" />
//                               <div className="flex flex-wrap gap-1">
//                                 {job.targetSpecialization.map((specialization, index) => (
//                                   <span key={specialization} className="bg-blue-100 px-2 py-0.5 rounded text-xs">
//                                     {specialization}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex items-start gap-2">
//                               <MapPin size={14} className="mt-0.5 flex-shrink-0" />
//                               <div className="flex flex-wrap gap-1">
//                                 {job.targetRegions.map((region, index) => (
//                                   <span key={region} className="bg-gray-100 px-2 py-0.5 rounded text-xs">
//                                     {region}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <Clock size={14} />
//                               <span>{job.duration}</span>
//                             </div>
//                           </div>
    
//                           <div className="flex justify-between text-sm text-gray-500 mt-4 pt-4 border-t">
//                             <span>Views: {job.views}</span>
//                             <span>Applications: {job.applications}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

// }

// export default AdManagementJobTab;




// Enhanced Job Tab Component
import { Briefcase, Clock, MapPin, Search, Target, Trash2, Users, TrendingUp, Eye, FileUser } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "./AdsManagementErrorComponent";
import { deleteAd, MultiSelectRegions } from "./AdsManagementFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from 'zod';
import AdsManagementJobTabCustomSearchBar from "./AdsManagementJobTabSearchBar";
import { Hits, InstantSearch, useSearchBox } from "react-instantsearch";
import { algoliasearch } from "algoliasearch";
import ErrorTypeWork from "./errorTypeWork";

const jobPromoteSchema = z.object({
    title: z.string()
      .min(1, 'Title is required')
      .max(100, 'Title must be less than 100 characters'),
    description: z.string()
      .min(1, 'Description is required')
      .max(500, 'Description must be less than 500 characters'),
    targetSpecialization: z.array(z.string())
      .min(1, 'At least one specialization must be selected'),
    targetRegions: z.array(z.string())
      .min(1, 'At least one region must be selected'),
    duration: z.coerce.number()
      .min(1, 'Duration is required')
      .refine(val => !isNaN(val) && val > 0, 'Duration must be a positive number'),
  });

// Enhanced Multi-select component for specializations
const MultiSelectSpecializations = ({ value, onChange, error, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const specializations = [
    'Developers',
    'Designers', 
    'Product Managers',
    'Data Scientists',
    'DevOps Engineers',
    'QA Engineers',
    'Marketing Specialists',
    'Sales Representatives',
    'All Users'
  ];

  const toggleSpecialization = (specialization) => {
    const newValue = value.includes(specialization)
      ? value.filter(item => item !== specialization)
      : [...value, specialization];
    onChange(newValue);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 flex items-start justify-between bg-white hover:border-slate-300 ${
          error ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100'
        } ${value.length === 0 ? 'text-slate-400' : 'text-slate-900'}`}
      >
        <div className="flex-1 min-w-0">
          {value.length === 0 ? (
            <span className="font-medium">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {value.map((specialization) => (
                <span
                  key={specialization}
                  className="inline-flex items-center bg-slate-100 text-slate-800 text-sm px-3 py-1.5 rounded-lg font-medium border border-slate-200"
                >
                  {specialization}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSpecialization(specialization);
                    }}
                    className="ml-2 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <svg className={`ml-3 w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
          {specializations.map(specialization => (
            <div
              key={specialization}
              onClick={() => toggleSpecialization(specialization)}
              className={`p-4 cursor-pointer transition-all duration-150 flex items-center gap-3 ${
                value.includes(specialization) 
                  ? 'bg-slate-50 text-slate-900 border-l-4 border-slate-900' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={value.includes(specialization)}
                onChange={() => {}}
                className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-500"
              />
              <span className="font-medium">{specialization}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdManagementJobTab = ({setIsOpen,setAmount,setDurationType,setDuration,setClientSecret,setIsLoading,setIsToastOpen,setToastType,setToastData})=>{
       const [selectedJobForPromotion, setSelectedJobForPromotion] = useState(null);
       const [searchTerm, setSearchTerm] = useState('');
       
       const searchClient = algoliasearch('ZTJ32FOJMI', 'd829fbb07a8cbd8d503c6f523ee51ea5');

function Hit({hit}){
 return (
  <div className="group bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-200">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <h4 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-slate-700 transition-colors">{hit.Title}</h4>
        <div className="space-y-1 mb-3">
          <p className="text-slate-600 font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            {hit.nameOfCreator}
          </p>
          <p className="text-slate-500 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {hit.Region}
          </p>
        </div>
      </div>
      <button
        onClick={() => setSelectedJobForPromotion(hit._id)}
        className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
      >
        <TrendingUp className="w-4 h-4" />
        Promote
      </button>
    </div>
  </div>
 )
}

function ConditionalHits() {
  const { query } = useSearchBox();

  if (!query) {
    return null;
  }

  return <Hits hitComponent={Hit} />;
}

       const [jobAds, setJobAds] = useState([
           {
             id: 1,
             jobTitle: 'Senior React Developer',
             company: 'Tech Corp',
             location: 'Remote',
             isPromoted: true,
             title: 'Exciting React Developer Opportunity',
             description: 'Join our dynamic team and work on cutting-edge React applications with modern technologies.',
             targetSpecialization: ['Developers'],
             targetRegions: ['Global'],
             duration: '30 days',
             views: 456,
             applications: 23
           }
         ]);
       
const [availableJobs] = useState([
    { id: 1, title: 'Senior React Developer', company: 'Tech Corp', location: 'Remote' },
    { id: 2, title: 'UX Designer', company: 'Design Studio', location: 'New York' },
    { id: 3, title: 'Data Scientist', company: 'Analytics Inc', location: 'San Francisco' },
    { id: 4, title: 'Product Manager', company: 'Startup Hub', location: 'Austin' }
  ]);    
         const filteredJobs = availableJobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase())
          );
        
    const jobPromoteForm = useForm({
        resolver: zodResolver(jobPromoteSchema),
        defaultValues: {
          title: '',
          description: '',
          targetSpecialization: [],
          targetRegions: [],
          duration: 30
        }
      });
      
    const promoteJob = async(data) => {
        if (!selectedJobForPromotion) return;
        setIsLoading(true)
        const response = await fetch('https://adopte.gotdns.ch/api8/ads/jobs/promotion/creation',{
          headers:{
            'Content-Type':"application/json"
          },
          body:JSON.stringify({...data,jobId:selectedJobForPromotion}),
          credentials:"include",
          method:"POST"
        })
        const result = await response.json()
        if(response.status==200){
          setIsLoading(false)
          setIsToastOpen(true)
          setToastType('success')
          const responseText = result?.successType=="jobAlreadyExists" ? "Job Already Exists Please Pay To Add It" : 'Congragulations Your Ad Has Been Created' 
          setToastData(responseText)
          setIsOpen(true)
          setAmount(result.price)
          setDurationType(result.durationType)
          setDuration(result.duration)
          setClientSecret(result.client_secret)
           const job = availableJobs.find(j => j.id.toString() === selectedJobForPromotion.toString());
        const newJobAd = {
          id: Date.now(),
          jobTitle: job.title,
          company: job.company,
          location: job.location,
          isPromoted: true,
          ...data,
          views: 0,
          applications: 0
        };

        setJobAds(prev => [...prev, newJobAd]);
        jobPromoteForm.reset();
        setSelectedJobForPromotion(null);    
        }else if(response.status==400){
             if(result.type=="not_connected"){
              setIsLoading(false)
              setIsToastOpen(true)
              setToastType('error')
              setToastData('Please Login')
             }
             else{
              
    setIsLoading(false)
    setIsToastOpen(true)
    setToastType('error')
    setToastData(result.errors.general)
             
             } 
       
            }else if(response.status==403){
             if(result.type=="not_authorized"){
              setIsLoading(false)
              setIsToastOpen(true)
              setToastType('error')
              setToastData('You  Are Not Authorized To Access This')
             }   
        }else{

          setIsLoading(false)
        setIsToastOpen(true)
        setToastType('error')
        setToastData('Server Error! Please Try Again Later')
        }
       
      };

    return (
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Job Advertisement Management</h2>
            <p className="text-slate-600 text-lg">Promote your job listings to reach the right candidates</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* Available Jobs Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Available Jobs</h3>
                <p className="text-slate-600">Select a job to promote</p>
              </div>
            </div>
            
            <InstantSearch indexName="Jobs" searchClient={searchClient}>
              <AdsManagementJobTabCustomSearchBar />
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                <ConditionalHits />
              </div>
            </InstantSearch>
          </div>

          {/* Promotion Form Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Promote Job</h3>
                <p className="text-slate-600">Create your advertisement campaign</p>
              </div>
            </div>
            
            {selectedJobForPromotion ? (
              <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-8 shadow-sm">
                <form onSubmit={jobPromoteForm.handleSubmit(promoteJob)} className="space-y-8">
                  {/* Title Field */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Advertisement Title *</label>
                    <Controller
                      name="title"
                      control={jobPromoteForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <input
                            {...field}
                            type="text"
                            placeholder="Enter a compelling title for your job advertisement"
                            className={`w-full p-4 border-2 rounded-xl font-medium transition-all duration-200 bg-white ${
                              fieldState.error 
                                ? 'border-red-300 ring-2 ring-red-100 focus:border-red-400' 
                                : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100'
                            }`}
                          />
                          <ErrorMessage error={fieldState.error} />
                        </>
                      )}
                    />
                  </div>

                  {/* Description Field */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Advertisement Description *</label>
                    <Controller
                      name="description"
                      control={jobPromoteForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <textarea
                            {...field}
                            rows={5}
                            placeholder="Describe what makes this job opportunity special and attractive to candidates"
                            className={`w-full p-4 border-2 rounded-xl font-medium transition-all duration-200 bg-white resize-none ${
                              fieldState.error 
                                ? 'border-red-300 ring-2 ring-red-100 focus:border-red-400' 
                                : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100'
                            }`}
                          />
                          <div className="flex justify-between text-sm text-slate-500 mt-2 font-medium">
                            <span>{field.value?.length || 0}/500 characters</span>
                          </div>
                          <ErrorMessage error={fieldState.error} />
                        </>
                      )}
                    />
                  </div>

                  {/* Specializations Field */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Target Specializations *</label>
                    <Controller
                      name="targetSpecialization"
                      control={jobPromoteForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <MultiSelectSpecializations
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error}
                            placeholder="Select target specializations"
                          />
                          <ErrorMessage error={fieldState.error} />
                        </>
                      )}
                    />
                  </div>

                  {/* Regions Field */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Target Regions *</label>
                    <Controller
                      name="targetRegions"
                      control={jobPromoteForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <MultiSelectRegions
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error}
                            placeholder="Select target regions"
                          />
                          <ErrorMessage error={fieldState.error} />
                        </>
                      )}
                    />
                  </div>

                  {/* Duration Field */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Duration (days) *</label>
                    <Controller
                      name="duration"
                      control={jobPromoteForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <input
                            {...field}
                            type="number"
                            min="1"
                            className={`w-full p-4 border-2 rounded-xl font-medium transition-all duration-200 bg-white ${
                              fieldState.error 
                                ? 'border-red-300 ring-2 ring-red-100 focus:border-red-400' 
                                : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100'
                            }`}
                          />
                          <ErrorMessage error={fieldState.error} />
                        </>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Promote Job Advertisement
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
                <div className="max-w-sm mx-auto">
                  <div className="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Select a Job to Promote</h3>
                  <p className="text-slate-600 leading-relaxed">Choose a job from the available listings to create a targeted advertisement campaign.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Promoted Jobs Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Active Promoted Jobs</h3>
              <p className="text-slate-600">Monitor your active job advertisement campaigns</p>
            </div>
          </div>

          {jobAds.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {jobAds.map(job => (
                <div key={job.id} className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-slate-300 hover:shadow-xl transition-all duration-300">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                        Active Campaign
                      </span>
                    </div>
                    <button
                      onClick={() => deleteAd(job.id, 'job', null, setJobAds)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xl mb-2 group-hover:text-slate-700 transition-colors">
                        {job.title || job.jobTitle}
                      </h4>
                      <p className="text-slate-600 leading-relaxed mb-4">{job.description}</p>
                      <div className="space-y-2">
                        <p className="text-slate-700 font-semibold flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {job.company}
                        </p>
                        <p className="text-slate-600 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tags and Info */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Target className="w-4 h-4 mt-1 text-slate-500 flex-shrink-0" />
                      <div className="flex flex-wrap gap-2">
                        {job.targetSpecialization.map((specialization) => (
                          <span key={specialization} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium border border-blue-200">
                            {specialization}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-1 text-slate-500 flex-shrink-0" />
                      <div className="flex flex-wrap gap-2">
                        {job.targetRegions.map((region) => (
                          <span key={region} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium border border-slate-200">
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 font-medium">{job.duration}</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex justify-between items-center pt-6 border-t-2 border-slate-100">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Eye className="w-4 h-4" />
                      <span className="font-semibold">{job.views.toLocaleString()}</span>
                      <span className="text-sm">views</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <FileUser className="w-4 h-4" />
                      <span className="font-semibold">{job.applications}</span>
                      <span className="text-sm">applications</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-16 text-center">
              <div className="max-w-lg mx-auto">
                <div className="h-20 w-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Target className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">No Active Campaigns</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Start promoting your job listings to reach qualified candidates and grow your team.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
};

export default AdManagementJobTab;
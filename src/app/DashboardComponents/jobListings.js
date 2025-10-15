// 'use client';
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   Edit, 
//   Trash2, 
//   Power, 
//   User, 
//   Star, 
//   MessageSquare, 
//   Calendar, 
//   Save, 
//   Plus,
//   Search,
//   X
// } from "lucide-react";
// import { useInView } from "react-intersection-observer";
// import JobSearchWithFilters from "./jobListingSearchBar";





// export default function MyJobsListing() {
//   const { ref, inView } = useInView({
//     threshold: 1.0,           // Entire element must be visible
//      // Better than fixed pixels
//     initialInView: true,     // Crucial: prevents initial false positive
//           // Keep observing
//   });
//   const [jobs, setJobs] = useState([]);
//   const [expandedJobId, setExpandedJobId] = useState(null);
//   const [activeTab, setActiveTab] = useState("details");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const RenderRef = useRef(true)
//   const [Cursor,setCursor]=useState(null)
//   const [hasMore,setHasMore]=useState(true)
//   const toggleJobExpansion = (jobId) => {
//     setExpandedJobId(expandedJobId === jobId ? null : jobId);
//     setActiveTab("details");
//   };

//   const toggleJobStatus = (jobId) => {
//     setJobs(
//       jobs.map(job => 
//         job.id === jobId 
//           ? { ...job, status: job.status === "active" ? "inactive" : "active" } 
//           : job
//       )
//     );
//   };
  
//   // Search functionality
//   // useEffect(() => {
//   //   if (searchQuery.trim() === "") {
//   //     setFilteredJobs(jobs);
//   //   } else {
//   //     const query = searchQuery.toLowerCase();
//   //     const filtered = jobs.filter(job => 
//   //       job.title.toLowerCase().includes(query) ||
//   //       job.location.toLowerCase().includes(query) ||
//   //       job.contractType.toLowerCase().includes(query) ||
//   //       job.description.toLowerCase().includes(query) ||
//   //       job.specialization.some(spec => spec.toLowerCase().includes(query))
//   //     );
//   //     setFilteredJobs(filtered);
//   //   }
//   // }, [searchQuery, jobs]);

// const IntialRequest = async(Cursor)=>{
//   const response = await fetch(`http://localhost:8002/jobList/${Cursor}`,{
//     headers:{
//       'Content-Type':'application/json'
//     },
//     method:"GET",
//     credentials:"include"
//   })
//   const result = await response.json()
//   console.log(result)
//   if(response.status==200){
  
//     setJobs(prev => {
//       const existingIds = new Set(prev.map(job => job._id.toString()));
//       const newJobs = result.Jobs.filter(job => !existingIds.has(job._id.toString()));
//       return [...prev, ...newJobs];
//     });
//     setFilteredJobs(prev => {
//       const existingIds = new Set(prev.map(job => job._id.toString()));
//       const newJobs = result.Jobs.filter(job => !existingIds.has(job._id.toString()));
//       return [...prev, ...newJobs];
//     }); 
//      setCursor(result.nextCursor) 
//      setHasMore(result.hasMore)
//   }else{

//   }
// }

//   useEffect(()=>{
//      IntialRequest(null)   
  

//   },[])
//   useEffect(()=>{
//     if(RenderRef.current==false && hasMore==true && inView==true){
//       IntialRequest(Cursor)
//     }
   
//     RenderRef.current=false
//   },[inView])

//   const deleteJob = (jobId) => {
//     setJobs(jobs.filter(job => job.id !== jobId));
//   };

//   const updateApplicantStatus = (jobId, applicantId, newStatus) => {
//     setJobs(
//       jobs.map(job => 
//         job.id === jobId 
//           ? {
//               ...job,
//               applicants: job.applicants.map(applicant => 
//                 applicant.id === applicantId 
//                   ? { ...applicant, status: newStatus }
//                   : applicant
//               )
//             }
//           : job
//       )
//     );
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         duration: 0.3,
//         when: "beforeChildren",
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { duration: 0.3 }
//     }
//   };

//   const expandVariants = {
//     hidden: { height: 0, opacity: 0 },
//     visible: { 
//       height: "auto", 
//       opacity: 1,
//       transition: { duration: 0.3 }
//     }
//   };

//   return (
//     <div className="w-full bg-white p-4 rounded-lg shadow">
//       <motion.div 
//         className="mb-6"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-gray-800">Mes Offres d'Emploi</h2>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow"
//           >
//             <Plus size={18} />
//             <span>Nouvelle Offre</span>
//           </motion.button>
//         </div>
        
//         {/* Search Bar */}
//         <motion.div 
//           className="relative"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <div className="relative">
//             <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Rechercher une offre par titre, lieu, type de contrat..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             />
//             {searchQuery && (
//               <button 
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X size={18} />
//               </button>
//             )}
//           </div>
//           {searchQuery && (
//             <motion.div 
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-sm text-gray-600 mt-2"
//             >
//               {filteredJobs.length} résultat(s) trouvé(s) pour "{searchQuery}"
//             </motion.div>
//           )}
//         </motion.div>
//       </motion.div>
     
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="space-y-4"
//       >
//         {filteredJobs?.length === 0 ? (
//           <motion.div 
//             variants={itemVariants}
//             className="text-center py-8 text-gray-500"
//           >
//             {jobs?.length === 0 
//               ? "Aucune offre d'emploi publiée pour le moment." 
//               : "Aucune offre ne correspond à votre recherche."}
//           </motion.div>
//         ) : (
//           filteredJobs?.map(job => (
//             <motion.div
//               key={job.id}
//               variants={itemVariants}
//               className="border border-gray-200 rounded-lg overflow-hidden"
//             >
//               {/* Job Header - Always visible */}
//               <motion.div 
//                 className={`p-4 cursor-pointer ${job.status === "inactive" ? "bg-gray-100" : "bg-white"}`}
//                 onClick={() => toggleJobExpansion(job._id)}
//                 whileHover={{ backgroundColor: "#f9fafb" }}
//               >
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-3 h-3 rounded-full ${job.status === "active" ? "bg-green-500" : "bg-gray-400"}`}></div>
//                     <h3 className="font-semibold text-lg text-gray-800">{job.Title}</h3>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm text-gray-500">{job?.applicants?.length} candidat(s)</span>
//                     {expandedJobId === job._id ? (
//                       <ChevronUp size={20} className="text-gray-500" />
//                     ) : (
//                       <ChevronDown size={20} className="text-gray-500" />
//                     )}
//                   </div>
//                 </div>
//                 <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
//                   <span>{job.Region}</span>
//                   <span>•</span>
//                   <span>{job.contractType}</span>
//                   <span>•</span>
//                   <span>{job.maximumSalary}</span>
//                 </div>
//               </motion.div>

//               {/* Expanded content */}
//               <AnimatePresence>
//                 {expandedJobId === job._id && (
//                   <motion.div
//                     variants={expandVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="hidden"
//                     className="border-t border-gray-200"
//                   >
//                     {/* Tabs */}
//                     <div className="flex border-b border-gray-200">
//                       <button
//                         className={`px-4 py-2 text-sm font-medium ${activeTab === "details" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
//                         onClick={() => setActiveTab("details")}
//                       >
//                         Détails
//                       </button>
//                       <button
//                         className={`px-4 py-2 text-sm font-medium ${activeTab === "applicants" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
//                         onClick={() => setActiveTab("applicants")}
//                       >
//                         Candidats ({job?.applicants?.length})
//                       </button>
//                       <button
//                         className={`px-4 py-2 text-sm font-medium ${activeTab === "topMatches" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
//                         onClick={() => setActiveTab("topMatches")}
//                       >
//                         Meilleurs Profils ({job?.topMatches?.length})
//                       </button>
//                     </div>

//                     {/* Tab content */}
//                     <div className="p-4">
//                       {activeTab === "details" && (
//                         <motion.div
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           className="space-y-4"
//                         >
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                               <h4 className="text-sm font-medium text-gray-500">Lieu</h4>
//                               <p>{job.Region} ({job.Department})</p>
//                             </div>
//                             <div>
//                               <h4 className="text-sm font-medium text-gray-500">Type de contrat</h4>
//                               <p>{job.contractType}</p>
//                             </div>
//                             <div>
//                               <h4 className="text-sm font-medium text-gray-500">Salaire</h4>
//                               <p>{job.maximumSalary}</p>
//                             </div>
//                             <div>
//                               <h4 className="text-sm font-medium text-gray-500">Date de début</h4>
//                               <p>{job.dateOfDebut}</p>
//                             </div>
//                             <div>
//                               <h4 className="text-sm font-medium text-gray-500">Expérience requise</h4>
//                               <p>{job.experienceRequired}</p>
//                             </div>
//                             <div>
//                               <h4 className="text-sm font-medium text-gray-500">Spécialisation</h4>
//                               <p>{job.Specialization}</p>
//                             </div>
//                           </div>
                          
//                           <div>
//                             <h4 className="text-sm font-medium text-gray-500">Description</h4>
//                             <p className="text-gray-700">{job.Description}</p>
//                           </div>
                          
//                           <div className="flex flex-wrap gap-2 pt-2">
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm"
//                             >
//                               <Edit size={16} />
//                               <span>Modifier</span>
//                             </motion.button>
                            
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded text-sm"
//                               onClick={() => deleteJob(job.id)}
//                             >
//                               <Trash2 size={16} />
//                               <span>Supprimer</span>
//                             </motion.button>
                            
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               className={`flex items-center gap-1 ${
//                                 job?.status === "active" 
//                                   ? "bg-orange-50 text-orange-600" 
//                                   : "bg-green-50 text-green-600"
//                               } px-3 py-1 rounded text-sm`}
//                               onClick={() => toggleJobStatus(job.id)}
//                             >
//                               <Power size={16} />
//                               <span>
//                                 {job.status === "active" ? "Désactiver" : "Activer"}
//                               </span>
//                             </motion.button>
//                           </div>
//                         </motion.div>
//                       )}

//                       {activeTab === "applicants" && (
//                         <motion.div
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           className="space-y-4"
//                         >
//                           {job.applicants.length === 0 ? (
//                             <p className="text-center py-4 text-gray-500">Aucun candidat pour cette offre pour le moment.</p>
//                           ) : (
//                             <div className="space-y-3">
//                               {job.applicants.map(applicant => (
//                                 <motion.div
//                                   key={applicant.id}
//                                   whileHover={{ backgroundColor: "#f9fafb" }}
//                                   className="p-3 border border-gray-200 rounded-lg"
//                                 >
//                                   <div className="flex justify-between items-start">
//                                     <div className="flex items-center gap-3">
//                                       <div className="bg-gray-200 rounded-full p-2">
//                                         <User size={24} className="text-gray-600" />
//                                       </div>
//                                       <div>
//                                         <h4 className="font-medium">{applicant.name}</h4>
//                                         <p className="text-sm text-gray-600">Expérience: {applicant.experience}</p>
//                                         <div className="flex items-center gap-1 mt-1">
//                                           <div className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium">
//                                             {applicant.match}% match
//                                           </div>
//                                           <span className="text-gray-400">•</span>
//                                           <span className="text-xs text-gray-500 capitalize">
//                                             {
//                                               applicant.status === "pending" ? "En attente" :
//                                               applicant.status === "accepted" ? "Accepté" :
//                                               "Refusé"
//                                             }
//                                           </span>
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div className="flex gap-2">
//                                       <motion.button
//                                         whileHover={{ scale: 1.05 }}
//                                         whileTap={{ scale: 0.95 }}
//                                         className="bg-blue-50 text-blue-600 p-1 rounded"
//                                       >
//                                         <MessageSquare size={18} />
//                                       </motion.button>
//                                       <motion.button
//                                         whileHover={{ scale: 1.05 }}
//                                         whileTap={{ scale: 0.95 }}
//                                         className="bg-orange-50 text-orange-600 p-1 rounded"
//                                       >
//                                         <Calendar size={18} />
//                                       </motion.button>
//                                     </div>
//                                   </div>
                                  
//                                   <div className="mt-3 flex flex-wrap gap-2">
//                                     {applicant.skills.map((skill, index) => (
//                                       <span 
//                                         key={index}
//                                         className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
//                                       >
//                                         {skill}
//                                       </span>
//                                     ))}
//                                   </div>
                                  
//                                   <div className="mt-3 flex justify-end gap-2">
//                                     <motion.button
//                                       whileHover={{ scale: 1.05 }}
//                                       whileTap={{ scale: 0.95 }}
//                                       className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded text-sm"
//                                       onClick={() => updateApplicantStatus(job.id, applicant.id, "accepted")}
//                                       disabled={applicant.status === "accepted"}
//                                       style={{ opacity: applicant.status === "accepted" ? 0.7 : 1 }}
//                                     >
//                                       <span>Accepter</span>
//                                     </motion.button>
                                    
//                                     <motion.button
//                                       whileHover={{ scale: 1.05 }}
//                                       whileTap={{ scale: 0.95 }}
//                                       className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded text-sm"
//                                       onClick={() => updateApplicantStatus(job.id, applicant.id, "rejected")}
//                                       disabled={applicant.status === "rejected"}
//                                       style={{ opacity: applicant.status === "rejected" ? 0.7 : 1 }}
//                                     >
//                                       <span>Refuser</span>
//                                     </motion.button>
//                                   </div>
//                                 </motion.div>
//                               ))}
//                             </div>
//                           )}
//                         </motion.div>
//                       )}

//                       {activeTab === "topMatches" && (
//                         <motion.div
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           className="space-y-4"
//                         >
//                           {job.topMatches.length === 0 ? (
//                             <p className="text-center py-4 text-gray-500">Aucun profil correspondant trouvé.</p>
//                           ) : (
//                             <div className="space-y-3">
//                               {job.topMatches.map(match => (
//                                 <motion.div
//                                   key={match.id}
//                                   whileHover={{ backgroundColor: "#f9fafb" }}
//                                   className="p-3 border border-gray-200 rounded-lg"
//                                 >
//                                   <div className="flex justify-between items-start">
//                                     <div className="flex items-center gap-3">
//                                       <div className="bg-orange-100 rounded-full p-2">
//                                         <Star size={24} className="text-orange-500" />
//                                       </div>
//                                       <div>
//                                         <h4 className="font-medium">{match.name}</h4>
//                                         <p className="text-sm text-gray-600">Expérience: {match.experience}</p>
//                                         <div className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium mt-1 inline-block">
//                                           {match.match}% match
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div className="flex gap-2">
//                                       <motion.button
//                                         whileHover={{ scale: 1.05 }}
//                                         whileTap={{ scale: 0.95 }}
//                                         className="bg-blue-50 text-blue-600 p-1 rounded"
//                                       >
//                                         <Save size={18} />
//                                       </motion.button>
//                                       <motion.button
//                                         whileHover={{ scale: 1.05 }}
//                                         whileTap={{ scale: 0.95 }}
//                                         className="bg-blue-50 text-blue-600 p-1 rounded"
//                                       >
//                                         <MessageSquare size={18} />
//                                       </motion.button>
//                                     </div>
//                                   </div>
                                  
//                                   <div className="mt-3 flex flex-wrap gap-2">
//                                     {match.skills.map((skill, index) => (
//                                       <span 
//                                         key={index}
//                                         className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
//                                       >
//                                         {skill}
//                                       </span>
//                                     ))}
//                                   </div>
                                  
//                                   <div className="mt-3 flex justify-end">
//                                     <motion.button
//                                       whileHover={{ scale: 1.05 }}
//                                       whileTap={{ scale: 0.95 }}
//                                       className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded text-sm"
//                                     >
//                                       <Calendar size={16} />
//                                       <span>Inviter à un entretien</span>
//                                     </motion.button>
//                                   </div>
//                                 </motion.div>
//                               ))}
//                             </div>
//                           )}
//                         </motion.div>
//                       )}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           ))
//         )}
//         <div ref={ref} ></div>
//       </motion.div>
//     </div>
//   );
// }



'use client';
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  Edit, 
  Trash2, 
  Power, 
  User, 
  Star, 
  MessageSquare, 
  Calendar, 
  Save, 
  Plus,
  Search,
  X,
  Filter,
  MapPin,
  Briefcase,
  DollarSign,
  Award,
  XCircle,
  CheckCircle,
  Clock,
  Building2
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Hits, InstantSearch, RefinementList, SearchBox, useSearchBox } from "react-instantsearch";
import { algoliasearch } from "algoliasearch";
import CustomSearchBar from "./jobListingCustomSearchBar";
import ContractTypeRefimentFilter from "./RefimentFilters";
import ContractTypeFilter from "./RefimentFilters";
import { useRouter } from "next/navigation";
import { jobInstance } from "../Services/jobs.service";

function Hit({ hit }) {
  const router = useRouter()  
  return (
    <div 
    onClick={()=>router.push(`/JobInfo/${hit._id}`)}
    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all duration-200 p-6 mb-4 cursor-pointer group">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 mb-2 line-clamp-2">
            {hit.Title}
          </h3>
        </div>
        
        {/* Status and Contract Type */}
        <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
          {/* Active Status */}
          <div className="flex items-center gap-1">
            {hit.status ? (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800">
                <CheckCircle size={12} />
                <span className="text-xs font-medium">Actif</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-800">
                <XCircle size={12} />
                <span className="text-xs font-medium">Inactif</span>
              </div>
            )}
          </div>
          
          {/* Contract Type Badge */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            {hit.contractType?.toUpperCase() || 'CDI'}
          </span>
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Region */}
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-700 truncate">
            {hit.Region || 'Région non spécifiée'}
          </span>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-700 truncate">
            {hit.maximumSalary ? `${hit.maximumSalary}` : 'Salaire à négocier'}
          </span>
        </div>

        {/* Experience Required */}
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-700 truncate">
            {hit.experienceRequired || 'Expérience non spécifiée'}
          </span>
        </div>

        {/* Date of Interview */}
        {hit.dateOfDebut && (
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate">
              Entretien: {hit.dateOfDebut}
            </span>
          </div>
        )}

        {/* Department */}
        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-700 truncate">
            {hit.Department || 'Département non spécifié'}
          </span>
        </div>

        {/* Diploma Required */}
        <div className="flex items-center gap-2">
          <Award size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-700 truncate">
            {hit.isDiplomaRequired ? 'Diplôme requis' : 'Diplôme non requis'}
          </span>
        </div>
      </div>

      {/* Description Preview */}
      {hit.Description && (
        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {hit.Description}
          </p>
        </div>
      )}

      {/* Action Indicators */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        
        
        <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Cliquer pour voir les détails →
        </div>
      </div>
    </div>
  );
}

function ConditionalHits() {
  const { query } = useSearchBox();

  if (!query) {
    return null; // Or return null to hide completely
  }

  return <Hits hitComponent={Hit} />;
}

export default function MyJobsListing() {
  const searchClient = algoliasearch('ZTJ32FOJMI', 'd829fbb07a8cbd8d503c6f523ee51ea5');

  const { ref, inView } = useInView({
    threshold: 1.0,           // Entire element must be visible
     // Better than fixed pixels
    initialInView: true,     // Crucial: prevents initial false positive
          // Keep observing
  });
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [excludeDocIds,setExcludeDocIds]=useState([])
  const [filters, setFilters] = useState({
    region: '',
    contractType: '',
    minimumSalary: '',
    specialization: ''
  });
  const RenderRef = useRef(true)
  const [Cursor,setCursor]=useState(null)
  const [hasMore,setHasMore]=useState(true)
  
  const toggleJobExpansion = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
    setActiveTab("details");
  };

  const toggleJobStatus = (jobId) => {
    setJobs(
      jobs.map(job => 
        job.id === jobId 
          ? { ...job, status: job.status === "active" ? "inactive" : "active" } 
          : job
      )
    );
  };
  
  // Clear individual filter
  const clearFilter = (filterKey) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: ''
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      region: '',
      contractType: '',
      minimumSalary: '',
      specialization: ''
    });
    setSearchQuery('');
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(value => value !== '') || searchQuery !== '';
  
  // Search functionality
  // useEffect(() => {
  //   if (searchQuery.trim() === "") {
  //     setFilteredJobs(jobs);
  //   } else {
  //     const query = searchQuery.toLowerCase();
  //     const filtered = jobs.filter(job => 
  //       job.title.toLowerCase().includes(query) ||
  //       job.location.toLowerCase().includes(query) ||
  //       job.contractType.toLowerCase().includes(query) ||
  //       job.description.toLowerCase().includes(query) ||
  //       job.specialization.some(spec => spec.toLowerCase().includes(query))
  //     );
  //     setFilteredJobs(filtered);
  //   }
  // }, [searchQuery, jobs]);

const IntialRequest = async(Cursor,excludeDocIds)=>{
  console.log(excludeDocIds)
  const response = await jobInstance.post(`/fetch/jobList`,
    {Cursor,excludeDocIds}
    // {
  //   headers:{
  //     'Content-Type':'application/json'
  //   },
  //   method:"POST",
  //   credentials:"include",
  //   body:JSON.stringify({Cursor,excludeDocIds})
  // }
)
  const result = await response.data
  console.log(result)
  if(response.status==200){
  
    setJobs(prev => {
      const existingIds = new Set(prev.map(job => job._id.toString()));
      const newJobs = result.Jobs.filter(job => !existingIds.has(job._id.toString()));
      return [...prev, ...newJobs];
    });
    setFilteredJobs(prev => {
      const existingIds = new Set(prev.map(job => job._id.toString()));
      const newJobs = result.Jobs.filter(job => !existingIds.has(job._id.toString()));
      return [...prev, ...newJobs];
    }); 
     setCursor(result.nextCursor)
     setExcludeDocIds(result.prevDocsIds) 
     setHasMore(result.hasMore)
  }else{

  }
}

  useEffect(()=>{
     IntialRequest(null,null)   
  

  },[])
  useEffect(()=>{
    if(RenderRef.current==false && hasMore==true && inView==true){
      IntialRequest(Cursor,excludeDocIds)
    }
   
    RenderRef.current=false
  },[inView])

  const deleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const updateApplicantStatus = (jobId, applicantId, newStatus) => {
    setJobs(
      jobs.map(job => 
        job.id === jobId 
          ? {
              ...job,
              applicants: job.applicants.map(applicant => 
                applicant.id === applicantId 
                  ? { ...applicant, status: newStatus }
                  : applicant
              )
            }
          : job
      )
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const expandVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Mes Offres d'Emploi</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow"
          >
            <Plus size={18} />
            <span>Nouvelle Offre</span>
          </motion.button>
        </div>
        
        <InstantSearch indexName="Jobs" searchClient={searchClient}>
        <CustomSearchBar filters={filters} setFilters={setFilters}></CustomSearchBar> 


  <ConditionalHits></ConditionalHits>
</InstantSearch>
        
      </motion.div>
     
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {filteredJobs?.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="text-center py-8 text-gray-500"
          >
            {jobs?.length === 0 
              ? "Aucune offre d'emploi publiée pour le moment." 
              : "Aucune offre ne correspond à votre recherche."}
          </motion.div>
        ) : (
          filteredJobs?.map(job => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Job Header - Always visible */}
              <motion.div 
                className={`p-4 cursor-pointer ${job.status === "inactive" ? "bg-gray-100" : "bg-white"}`}
                onClick={() => toggleJobExpansion(job._id)}
                whileHover={{ backgroundColor: "#f9fafb" }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${job.status === "active" ? "bg-green-500" : "bg-gray-400"}`}></div>
                    <h3 className="font-semibold text-lg text-gray-800">{job.Title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{job?.applicants?.length} candidat(s)</span>
                    {expandedJobId === job._id ? (
                      <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
                  <span>{job.Region}</span>
                  <span>•</span>
                  <span>{job.contractType}</span>
                  <span>•</span>
                  <span>{job.maximumSalary}</span>
                </div>
              </motion.div>

              {/* Expanded content */}
              <AnimatePresence>
                {expandedJobId === job._id && (
                  <motion.div
                    variants={expandVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="border-t border-gray-200"
                  >
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                      <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "details" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
                        onClick={() => setActiveTab("details")}
                      >
                        Détails
                      </button>
                      <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "applicants" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
                        onClick={() => setActiveTab("applicants")}
                      >
                        Candidats ({job?.applicants?.length})
                      </button>
                      <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "topMatches" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
                        onClick={() => setActiveTab("topMatches")}
                      >
                        Meilleurs Profils ({job?.topMatches?.length})
                      </button>
                    </div>

                    {/* Tab content */}
                    <div className="p-4">
                      {activeTab === "details" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Lieu</h4>
                              <p>{job.Region} ({job.Department})</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Type de contrat</h4>
                              <p>{job.contractType}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Salaire</h4>
                              <p>{job.maximumSalary}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Date de début</h4>
                              <p>{job.dateOfDebut}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Expérience requise</h4>
                              <p>{job.experienceRequired}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Spécialisation</h4>
                              <p>{job.Specialization}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Description</h4>
                            <p className="text-gray-700">{job.Description}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 pt-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm"
                            >
                              <Edit size={16} />
                              <span>Modifier</span>
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded text-sm"
                              onClick={() => deleteJob(job.id)}
                            >
                              <Trash2 size={16} />
                              <span>Supprimer</span>
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex items-center gap-1 ${
                                job?.status === "active" 
                                  ? "bg-orange-50 text-orange-600" 
                                  : "bg-green-50 text-green-600"
                              } px-3 py-1 rounded text-sm`}
                              onClick={() => toggleJobStatus(job.id)}
                            >
                              <Power size={16} />
                              <span>
                                {job.status === "active" ? "Désactiver" : "Activer"}
                              </span>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "applicants" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-4"
                        >
                          {job.applicants.length === 0 ? (
                            <p className="text-center py-4 text-gray-500">Aucun candidat pour cette offre pour le moment.</p>
                          ) : (
                            <div className="space-y-3">
                              {job.applicants.map(applicant => (
                                <motion.div
                                  key={applicant.id}
                                  whileHover={{ backgroundColor: "#f9fafb" }}
                                  className="p-3 border border-gray-200 rounded-lg"
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                      <div className="bg-gray-200 rounded-full p-2">
                                        <User size={24} className="text-gray-600" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium">{applicant.name}</h4>
                                        <p className="text-sm text-gray-600">Expérience: {applicant.experience}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                          <div className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                            {applicant.match}% match
                                          </div>
                                          <span className="text-gray-400">•</span>
                                          <span className="text-xs text-gray-500 capitalize">
                                            {
                                              applicant.status === "pending" ? "En attente" :
                                              applicant.status === "accepted" ? "Accepté" :
                                              "Refusé"
                                            }
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-blue-50 text-blue-600 p-1 rounded"
                                      >
                                        <MessageSquare size={18} />
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-orange-50 text-orange-600 p-1 rounded"
                                      >
                                        <Calendar size={18} />
                                      </motion.button>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {applicant.skills.map((skill, index) => (
                                      <span 
                                        key={index}
                                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                  
                                  <div className="mt-3 flex justify-end gap-2">
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded text-sm"
                                      onClick={() => updateApplicantStatus(job.id, applicant.id, "accepted")}
                                      disabled={applicant.status === "accepted"}
                                      style={{ opacity: applicant.status === "accepted" ? 0.7 : 1 }}
                                    >
                                      <span>Accepter</span>
                                    </motion.button>
                                    
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded text-sm"
                                      onClick={() => updateApplicantStatus(job.id, applicant.id, "rejected")}
                                      disabled={applicant.status === "rejected"}
                                      style={{ opacity: applicant.status === "rejected" ? 0.7 : 1 }}
                                    >
                                      <span>Refuser</span>
                                    </motion.button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {activeTab === "topMatches" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-4"
                        >
                          {job.topMatches.length === 0 ? (
                            <p className="text-center py-4 text-gray-500">Aucun profil correspondant trouvé.</p>
                          ) : (
                            <div className="space-y-3">
                              {job.topMatches.map(match => (
                                <motion.div
                                  key={match.id}
                                  whileHover={{ backgroundColor: "#f9fafb" }}
                                  className="p-3 border border-gray-200 rounded-lg"
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                      <div className="bg-orange-100 rounded-full p-2">
                                        <Star size={24} className="text-orange-500" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium">{match.name}</h4>
                                        <p className="text-sm text-gray-600">Expérience: {match.experience}</p>
                                        <div className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium mt-1 inline-block">
                                          {match.match}% match
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-blue-50 text-blue-600 p-1 rounded"
                                      >
                                        <Save size={18} />
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-blue-50 text-blue-600 p-1 rounded"
                                      >
                                        <MessageSquare size={18} />
                                      </motion.button>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {match.skills.map((skill, index) => (
                                      <span 
                                        key={index}
                                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                  
                                  <div className="mt-3 flex justify-end">
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded text-sm"
                                    >
                                      <Calendar size={16} />
                                      <span>Inviter à un entretien</span>
                                    </motion.button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
        <div ref={ref} ></div>
      </motion.div>
    </div>
  );
}
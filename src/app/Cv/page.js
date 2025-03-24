// 'use client'
// import React, { useState } from 'react';
// import { 
//   Search, 
//   BookmarkPlus, 
//   Upload, 
//   FileText, 
//   Briefcase, 
//   User, 
//   Lock, 
//   Filter, 
//   Plus, 
//   ChevronDown, 
//   MapPin, 
//   DollarSign, 
//   Clock, 
//   Award, 
//   Languages, 
//   Star
// } from 'lucide-react';
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';

// export default function CVTechApp (){
//   const [activeTab, setActiveTab] = useState('employer');
//   const [showFilters, setShowFilters] = useState(false);
  
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}
//       <Navbar></Navbar>
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-center h-16">
           
//             <div className="flex  items-center">
//               <div className=" gap-4 md:gap-0  md:ml-6 flex md:space-x-8">
//                 <button 
//                   onClick={() => setActiveTab('employer')}
//                   className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
//                     activeTab === 'employer' 
//                       ? 'border-orange-500 text-gray-900' 
//                       : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
//                   }`}
//                 >
//                   <Briefcase className="mr-2 h-4 w-4" />
//                   For Employers
//                 </button>
//                 <button 
//                   onClick={() => setActiveTab('candidate')}
//                   className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
//                     activeTab === 'candidate' 
//                       ? 'border-orange-500 text-gray-900' 
//                       : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
//                   }`}
//                 >
//                   <User className="mr-2 h-4 w-4" />
//                   For Candidates
//                 </button>
//               </div>
//             </div>
           
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {activeTab === 'employer' ? (
//           <EmployerView showFilters={showFilters} setShowFilters={setShowFilters} />
//         ) : (
//           <CandidateView />
//         )}
//       </main>

//       {/* Footer */}
//       <Footer></Footer>
//     </div>
//   );
// };

// // Employer View Component
// const EmployerView = ({ showFilters, setShowFilters }) => {
//   // Sample candidate data
//   const candidates = [
//     {
//       id: 1,
//       name: 'Alex Johnson',
//       role: 'Senior Frontend Developer',
//       location: 'New York, USA',
//       experience: '7 years',
//       salary: '$90,000 - $120,000',
//       contractType: 'Full-time',
//       skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Node.js'],
//       languages: ['English (Native)', 'Spanish (Intermediate)'],
//       lastActive: '2 days ago'
//     },
//     {
//       id: 2,
//       name: 'Sarah Williams',
//       role: 'UX/UI Designer',
//       location: 'London, UK',
//       experience: '5 years',
//       salary: '£50,000 - £65,000',
//       contractType: 'Contract',
//       skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping'],
//       languages: ['English (Native)', 'French (Basic)'],
//       lastActive: 'Today'
//     },
//     {
//       id: 3,
//       name: 'Michael Chen',
//       role: 'Backend Engineer',
//       location: 'Toronto, Canada',
//       experience: '4 years',
//       salary: 'C$80,000 - C$95,000',
//       contractType: 'Full-time',
//       skills: ['Python', 'Django', 'SQL', 'AWS', 'Docker'],
//       languages: ['English (Fluent)', 'Mandarin (Native)'],
//       lastActive: '1 week ago'
//     }
//   ];

//   return (
//     <div>
//       <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
//         <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
//           CV Search & Filtering
//         </h2>
//         <div className="mt-3 sm:mt-0 sm:ml-4">
//           <button 
//             type="button" 
//             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
//           >
//             <Star className="mr-2 h-4 w-4" />
//             Upgrade to Premium
//           </button>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="mt-4">
//         <div className="flex flex-col md:flex-row">
//           <div className="relative flex-grow mb-4 md:mb-0 md:mr-4">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
//               placeholder="Search candidates by skills, job title, or keywords"
//             />
//           </div>
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//           >
//             <Filter className="mr-2 h-4 w-4" />
//             Filters
//             <ChevronDown className={`ml-2 h-4 w-4 transform ${showFilters ? 'rotate-180' : 'rotate-0'}`} />
//           </button>
//         </div>

//         {/* Expanded Filters */}
//         {showFilters && (
//           <div className="mt-4 p-4 bg-white shadow rounded-md">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Location</label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <MapPin className="h-4 w-4 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
//                     placeholder="Any location"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Contract Type</label>
//                 <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
//                   <option>Any Type</option>
//                   <option>Full-time</option>
//                   <option>Part-time</option>
//                   <option>Contract</option>
//                   <option>Freelance</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Salary Range</label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <DollarSign className="h-4 w-4 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
//                     placeholder="Any salary"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Experience Level</label>
//                 <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
//                   <option>Any Experience</option>
//                   <option>Entry Level (0-2 years)</option>
//                   <option>Mid Level (3-5 years)</option>
//                   <option>Senior (6-9 years)</option>
//                   <option>Expert (10+ years)</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Specialty</label>
//                 <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
//                   <option>Any Specialty</option>
//                   <option>Frontend Development</option>
//                   <option>Backend Development</option>
//                   <option>Full Stack</option>
//                   <option>UX/UI Design</option>
//                   <option>Data Science</option>
//                   <option>DevOps</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Last Active</label>
//                 <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
//                   <option>Any Time</option>
//                   <option>Today</option>
//                   <option>Last 3 days</option>
//                   <option>Last week</option>
//                   <option>Last month</option>
//                 </select>
//               </div>
//             </div>
//             <div className="mt-4 flex justify-end">
//               <button className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">
//                 Clear All
//               </button>
//               <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
//                 Apply Filters
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Candidate Results */}
//       <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
//         <ul className="divide-y divide-gray-200">
//           {candidates.map(candidate => (
//             <li key={candidate.id}>
//               <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
//                 <div className="flex items-center justify-between">
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-lg font-medium text-[#ff7300] truncate">{candidate.name}</h3>
//                     <p className="text-sm font-medium text-gray-900">
//                       {candidate.role}
//                     </p>
//                   </div>
//                   <div className="ml-4 flex-shrink-0 flex">
//                     <button className="bg-white rounded-md font-medium text-orange-600 hover:text-indigo-500 focus:outline-none flex items-center">
//                       <BookmarkPlus className="h-5 w-5 mr-1" />
//                       Save
//                     </button>
//                     <button className="ml-4 bg-[#F9E5CB] px-3 py-1 rounded-md font-medium text-[#ff7300] hover:bg-orange-200">
//                       View CV
//                     </button>
//                   </div>
//                 </div>
//                 <div className="mt-2 sm:flex sm:justify-between">
//                   <div className="sm:flex">
//                     <p className="flex items-center text-sm text-gray-500">
//                       <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
//                       {candidate.location}
//                     </p>
//                     <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
//                       <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
//                       {candidate.experience}
//                     </p>
//                     <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
//                       <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
//                       {candidate.salary}
//                     </p>
//                     <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
//                       <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
//                       {candidate.contractType}
//                     </p>
//                   </div>
//                   <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
//                     <p className="text-sm text-gray-500">
//                       Last active: {candidate.lastActive}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="mt-2">
//                   <div className="mt-2">
//                     <p className="text-sm font-medium text-gray-500">Skills:</p>
//                     <div className="mt-1 flex flex-wrap">
//                       {candidate.skills.map((skill, index) => (
//                         <span key={index} className="mr-2 mb-2 px-2 py-1 text-xs rounded-full bg-[#ff7300] text-white">
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>

//         <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//           <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//             <div>
//               <p className="text-sm text-gray-700">
//                 Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">12</span> results
//               </p>
//             </div>
//             <div>
//               <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                 <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                   <span className="sr-only">Previous</span>
//                   <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                     <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </a>
//                 <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//                   1
//                 </a>
//                 <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//                   2
//                 </a>
//                 <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//                   3
//                 </a>
//                 <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                   <span className="sr-only">Next</span>
//                   <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </a>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Candidate View Component
// const CandidateView = () => {
//   const [activeTab, setActiveTab] = useState('upload');
  
//   return (
//     <div>
//       <div className="pb-5 border-b border-gray-200">
//         <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
//           CV Management & Job Matching
//         </h2>
//         <p className="mt-2 max-w-4xl text-sm text-gray-500">
//           Upload your CV to find relevant job opportunities or create a new CV with our builder.
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="mt-4">
//         <div className="sm:hidden">
//           <select
//             id="tabs"
//             name="tabs"
//             className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
//             value={activeTab}
//             onChange={(e) => setActiveTab(e.target.value)}
//           >
//             <option value="upload">Upload CV</option>
//             <option value="builder">CV Builder</option>
//             <option value="matching">Job Matching</option>
//           </select>
//         </div>
//         <div className="hidden sm:block">
//           <div className="border-b border-gray-200">
//             <nav className="-mb-px flex space-x-8" aria-label="Tabs">
//               <button
//                 onClick={() => setActiveTab('upload')}
//                 className={`${
//                   activeTab === 'upload'
//                     ? 'border-orange-500 text-orange-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
//               >
//                 <Upload className="mr-2 h-5 w-5" />
//                 Upload CV
//               </button>
//               <button
//                 onClick={() => setActiveTab('builder')}
//                 className={`${
//                   activeTab === 'builder'
//                     ? 'border-orange-500 text-orange-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
//               >
//                 <FileText className="mr-2 h-5 w-5" />
//                 CV Builder
//               </button>
//               <button
//                 onClick={() => setActiveTab('matching')}
//                 className={`${
//                   activeTab === 'matching'
//                     ? 'border-orange-500 text-orange-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
//               >
//                 <Briefcase className="mr-2 h-5 w-5" />
//                 Job Matching
//               </button>
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="mt-6">
//         {activeTab === 'upload' && (
//           <div className="bg-white shadow sm:rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">CV Upload & Extraction</h3>
//               <div className="mt-2 max-w-xl text-sm text-gray-500">
//                 <p>Upload your CV and we'll automatically extract your skills, experience, and other details.</p>
//               </div>
//               <div className="mt-5">
//                 <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                   <div className="space-y-1 text-center">
//                     <svg
//                       className="mx-auto h-12 w-12 text-gray-400"
//                       stroke="currentColor"
//                       fill="none"
//                       viewBox="0 0 48 48"
//                       aria-hidden="true"
//                     >
//                       <path
//                         d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <div className="flex text-sm text-gray-600">
//                       <label
//                         htmlFor="file-upload"
//                         className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none"
//                       >
//                         <span>Upload a file</span>
//                         <input id="file-upload" name="file-upload" type="file" className="sr-only" />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG up to 10MB</p>
//                   </div>
//                 </div>
//                 <p className="mt-2 text-sm text-gray-500">
//                   By uploading your CV, you agree to our <a href="#" className="font-medium text-orange-600 hover:text-orange-500">Privacy Policy</a>.
//                 </p>
//                 <div className="mt-5">
//                   <button
//                     type="button"
//                     className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
//                   >
//                     <Upload className="mr-2 h-4 w-4" />
//                     Upload CV
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
// </div>
// </div>)}
'use client'
import React, { useState } from 'react';
import { 
  Search, 
  BookmarkPlus, 
  Upload, 
  FileText, 
  Briefcase, 
  User, 
  Lock, 
  Filter, 
  Plus, 
  ChevronDown, 
  MapPin, 
  DollarSign, 
  Clock, 
  Award, 
  Languages, 
  Star,
  Menu,
  X,
  Euro
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useTranslation } from '../Context/TranslationContext.';

export default function CVTechApp() {
  const [activeTab, setActiveTab] = useState('employer');
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
      const { translate, setLanguage, language } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div className="flex items-center">
              <div className="flex flex-wrap gap-4 md:gap-0 md:ml-6 md:space-x-8">
                <button 
                  onClick={() => setActiveTab('employer')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'employer' 
                      ? 'border-orange-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  {translate('for_employers')}
                </button>
                <button 
                  onClick={() => setActiveTab('candidate')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'candidate' 
                      ? 'border-orange-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <User className="mr-2 h-4 w-4" />
                  {translate('for_candidates')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'employer' ? (
          <EmployerView showFilters={showFilters} setShowFilters={setShowFilters} />
        ) : (
          <CandidateView />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Employer View Component
const EmployerView = ({ showFilters, setShowFilters }) => {

  // Sample candidate data
  const { translate, setLanguage, language } = useTranslation();
  const candidates = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: translate('Barber_for_cv'),
      location: 'Paris, France',
      experience: '7 years',
      salary: '€90,000 - €120,000',
      contractType: translate('full_time'),
      skills: [ translate('color_expert'), translate('male_only'), translate('unisex')],
      languages: ['English (Native)', 'Spanish (Intermediate)','French'],
      lastActive: '2 days ago'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: translate('chief_barber'),
      location: 'Paris, France',
      experience: '5 years',
      salary: '€50,000 - €65,000',
      contractType: translate('part_time'),
      skills: [translate('female_barber'),translate('color_expert')],
      languages: ['English (Native)', 'French (Basic)'],
      lastActive: 'Today'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: translate('head'),
      location: 'Paris,France',
      experience: '4 years',
      salary: '€80,000 - €95,000',
      contractType: 'Freelance',
      skills: [translate('female_barber'),translate('color_expert')],
      languages: ['English (Fluent)', 'Mandarin (Native)'],
      lastActive: '1 week ago'
    }
  ];

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-2xl lg:text-3xl">
         {translate('cv_search_&_filtering')}
        </h2>
        {/* <div className="mt-3 sm:mt-0 sm:ml-4">
          <button 
            type="button" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
          >
            <Star className="mr-2 h-4 w-4" />
            {translate('upgrade_to_premium')}
          </button>
        </div> */}
      </div>

      {/* Search and Filters */}
      <div className="mt-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-grow mb-4 md:mb-0 md:mr-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
              placeholder={translate('search_candidates_by_skills_job_title_or_keywords')}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            <ChevronDown className={`ml-2 h-4 w-4 transform ${showFilters ? 'rotate-180' : 'rotate-0'}`} />
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white shadow rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{translate('location')}</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Any location"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{translate('contract_type')}</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Any Type</option>
                  <option>{translate('full_time')}</option>
                  <option>{translate('part_time')}</option>
                  <option>{translate('contract')}</option>
                  <option>Freelance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{translate('salary_range')}</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Euro className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Any salary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{translate('experience_level')}</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Any Experience</option>
                  <option>Entry Level (0-2 years)</option>
                  <option>Mid Level (3-5 years)</option>
                  <option>Senior (6-9 years)</option>
                  <option>Expert (10+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{translate('speciality')}</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Unisex hairdresser</option>
                  <option>Male hairdresser</option>
                  <option>Female hairdresser</option>
                  <option>Barber</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Active</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Any Time</option>
                  <option>Today</option>
                  <option>Last 3 days</option>
                  <option>Last week</option>
                  <option>Last month</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">
                Clear All
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Candidate Results */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {candidates.map(candidate => (
            <li key={candidate.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-[#ff7300] truncate">{candidate.name}</h3>
                    {/* <p className="text-sm font-medium text-gray-900">
                      {candidate.role}
                    </p> */}
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0 flex">
                    <button className="bg-white rounded-md font-medium text-orange-600 hover:text-indigo-500 focus:outline-none flex items-center">
                      <BookmarkPlus className="h-5 w-5 mr-1" />
                      {translate('save')}
                    </button>
                    <button className="ml-4 bg-[#F9E5CB] px-3 py-1 rounded-md font-medium text-[#ff7300] hover:bg-orange-200">
                      {translate('view_cv')}
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                  <div className="flex flex-col sm:flex-row flex-wrap">
                    <p className="flex items-center text-sm text-gray-500">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {candidate.location}
                    </p>
                    {/* <p className="mt-2 sm:mt-0 sm:ml-6 flex items-center text-sm text-gray-500">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {candidate.experience}
                    </p> */}
                    <p className="mt-2 sm:mt-0 sm:ml-6 flex items-center text-sm text-gray-500">
                      <Euro className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {candidate.salary}
                    </p>
                    <p className="mt-2 sm:mt-0 sm:ml-6 flex items-center text-sm text-gray-500">
                      <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {candidate.contractType}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center text-sm text-gray-500">
                    <p className="text-sm text-gray-500">
                      {translate('last_active')} {candidate.lastActive}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-500">{translate('skills_')}:</p>
                    <div className="mt-1 flex flex-wrap">
                      {candidate.skills.map((skill, index) => (
                        <span key={index} className="mr-2 mb-2 px-2 py-1 text-xs rounded-full bg-[#ff7300] text-white">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">12</span> results
              </p>
            </div>
            <div className="mt-3 sm:mt-0">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Candidate View Component
const CandidateView = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const { translate, setLanguage, language } = useTranslation();

  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-2xl lg:text-3xl">
          {translate('cv_management_&_job_matching')}
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          {translate('cv_management_subheading')}
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-4">
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option  value="upload">{translate('upload_cv')}</option>
            <option value="builder">{translate('cv_builder')}</option>
            <option value="matching">{translate('job_matching')}</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap space-x-2 md:space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('upload')}
                className={`${
                  activeTab === 'upload'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Upload className="mr-2 h-5 w-5" />
                {translate('upload_cv')}
              </button>
              <button
                onClick={() => setActiveTab('builder')}
                className={`${
                  activeTab === 'builder'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FileText className="mr-2 h-5 w-5" />
                {translate('cv_builder')}
              </button>
              <button
                onClick={() => setActiveTab('matching')}
                className={`${
                  activeTab === 'matching'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                {translate('job_matching')}
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'upload' && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{translate('cv_upload_&_extraction')}</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>{translate('cv_upload_&_extraction_subheading')}</p>
              </div>
              <div className="mt-5">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex flex-col sm:flex-row justify-center text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none"
                      >
                        <span>{translate('upload_a_file')}</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">{translate('or_drag_drop')}</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG up to 10MB</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {translate('by_uploading')} <a href="#" className="font-medium text-orange-600 hover:text-orange-500">{translate('Privacy_policy')}</a>.
                </p>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                   {translate('upload_cv')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'builder' && (
          <div className="bg-white shadow sm:rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">CV Builder</h3>
            <p className="mt-2 text-sm text-gray-500">Create a professional CV with our easy-to-use builder.</p>
            {/* CV Builder content would go here */}
          </div>
        )}
        
        {activeTab === 'matching' && (
          <div className="bg-white shadow sm:rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Job Matching</h3>
            <p className="mt-2 text-sm text-gray-500">Find jobs that match your skills and experience.</p>
            {/* Job Matching content would go here */}
          </div>
        )}
      </div>
    </div>
  );
};
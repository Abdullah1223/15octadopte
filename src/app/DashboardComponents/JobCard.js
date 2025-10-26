// import { MapPin, Clock, DollarSign, Briefcase, Bookmark, Euro } from 'lucide-react';
// import { useTranslation } from '../Context/TranslationContext.';

// const JobCard = ({ job }) => {
//           const { translate, setLanguage, language } = useTranslation();
//   return (
//     <div className="border-b px-4 border-gray-200 py-6">
//       {/* Header section - stack vertically on mobile */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
//         <div className="mb-3 sm:mb-0">
//           <h3 className="text-xl font-medium text-orange-500">{job.title}</h3>
//           <p className="text-gray-600">{job.company}</p>
//         </div>
//         <div className="flex items-center self-start sm:self-auto">
//           <button 
//           onClick={()=>{saveJob("Save")}}
//           className="flex items-center mr-2 text-orange-500">
//             <Bookmark size={18} className="mr-1" />
//             <span className="hidden sm:inline">{translate('save_jobs')}</span>
//           </button>
//           <button className="px-4 py-1 bg-orange-100 text-orange-500 rounded hover:bg-orange-200 transition-colors">
//             {translate('views_jobs')}
//           </button>
//         </div>
//       </div>

//       {/* Job details - wrap on smaller screens */}
//       <div className="flex flex-wrap items-center text-gray-500 text-sm mb-4">
//         <div className="flex items-center mr-4 mb-2">
//           <MapPin size={16} className="mr-1" />
//           <span>{job.location}</span>
//         </div>
//         {/* <div className="flex items-center mr-4 mb-2">
//           <Clock size={16} className="mr-1" />
//           <span>{job.experience}</span>
//         </div> */}
//         <div className="flex items-center mr-4 mb-2">
//           <Euro size={16} className="mr-1" />
//           <span>{job.salary}</span>
//         </div>
//         <div className="flex items-center mb-2">
//           <Briefcase size={16} className="mr-1" />
//           <span>{job.type}</span>
//         </div>
//       </div>

//       {/* Skills tags - already responsive with flex-wrap */}
//       <div className="flex flex-wrap">
//         {job?.skills?.map((skill, index) => (
//           <span 
//             key={index} 
//             className={`text-xs px-3 py-1 rounded-full mr-2 mb-2 ${
//               skill === 'Unisex' 
//                 ? 'bg-orange-100 text-orange-600' 
//                 : skill === 'Female Only' 
//                   ? 'bg-pink-100 text-pink-600' 
//                   : 'bg-blue-100 text-blue-600'
//             }`}
//           >
//             {skill}
//           </span>
//         ))}
//       </div>

//       {/* Published date - maintain right alignment */}
//       {job.publishedDate && (
//         <div className="mt-2 text-right text-sm text-gray-500">
//           {translate('Published On: 2/2/25')} {job.publishedDate}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobCard;



// import React from 'react';

// const JobCard = ({
//   Title,
//   createdBy,
//   nameOfCreator,
//   contractType,
//   minimumSalary,
//   maximumSalary,
//   createdOn,
//   dateOfDebut,
//   Region,
//   City,
//   Department,
//   isDiplomaRequired,
//   isPromoted,
//   diploma,
//   experienceRequired,
//   Specialization,
//   Description,
//   status,
//   Views = 0,
//   Likes = 0
// }) => {
//   const formatSalary = (min, max) => {
//     if (!min || !max) return 'Salary not specified';
//     return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
//   };

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   const statusColor = status === 'Open' 
//     ? 'bg-green-100 text-green-800 border-green-200' 
//     : status === 'Closed' 
//     ? 'bg-red-100 text-red-800 border-red-200' 
//     : 'bg-gray-100 text-gray-800 border-gray-200';

//   return (
//     <article className="bg-white shadow-md border border-gray-100 rounded-xl p-5 mb-6 max-w-full mx-auto hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1" itemScope itemType="http://schema.org/JobPosting">
//       {/* Header Section */}
//       <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-gray-100 pb-4">
//         <div>
//           <h2 className="text-xl font-extrabold text-gray-900 mb-1 tracking-tight" itemProp="title">{Title || 'Untitled Position'}</h2>
//           <p className="text-sm text-gray-500 font-medium">
//             By <span itemProp="hiringOrganization">{nameOfCreator || 'Anonymous'}</span> | Posted {formatDate(createdOn)}
//           </p>
//         </div>
//         {isPromoted && (
//           <span className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
//             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
//             Promoted
//           </span>
//         )}
//       </header>

//       {/* Key Details - Enhanced Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-5 text-sm">
//         <div className="flex flex-col">
//           <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Contract</span>
//           <span className="font-medium text-gray-900" itemProp="employmentType">{contractType}</span>
//         </div>
//         <div className="flex flex-col">
//           <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Salary</span>
//           <span className="font-medium text-gray-900" itemProp="baseSalary">{formatSalary(minimumSalary, maximumSalary)}</span>
//         </div>
//         <div className="flex flex-col">
//           <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Location</span>
//           <span className="font-medium text-gray-900" itemProp="jobLocation">{City || Region || 'Remote'}</span>
//         </div>
//         <div className="flex flex-col">
//           <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Start Date</span>
//           <span className="font-medium text-gray-900">{formatDate(dateOfDebut)}</span>
//         </div>
//         <div className="flex flex-col">
//           <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Experience</span>
//           <span className="font-medium text-gray-900">{experienceRequired}</span>
//         </div>
//         <div className="flex flex-col">
//           <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Specialization</span>
//           <span className="font-medium text-gray-900" itemProp="occupationalCategory">{Specialization}</span>
//         </div>
//         {Department && (
//           <div className="flex flex-col">
//             <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Department</span>
//             <span className="font-medium text-gray-900">{Department}</span>
//           </div>
//         )}
//         {isDiplomaRequired && diploma && (
//           <div className="flex flex-col">
//             <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Diploma</span>
//             <span className="font-medium text-gray-900">{diploma}</span>
//           </div>
//         )}
//       </div>

//       {/* Description */}
//       <div className="mb-5">
//         <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">Description</h3>
//         <p className="text-gray-600 text-base leading-relaxed line-clamp-4" itemProp="description">
//           {Description || 'No detailed description available for this position.'}
//         </p>
//       </div>

//       {/* Footer: Status, Engagement, Apply */}
//       <footer className="flex flex-col sm:flex-row items-center justify-between gap-4">
//         <div className="flex items-center space-x-6 text-sm text-gray-500">
//           <span className={`px-3 py-1 rounded-md border font-medium ${statusColor}`}>
//             {status}
//           </span>
//           <div className="flex items-center space-x-4">
//             <span className="flex items-center">
//               <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
//               {Views} Views
//             </span>
//             <span className="flex items-center">
//               <svg className="w-4 h-4 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.5a1.5 1.5 0 11-3 0v-5.5a1.5 1.5 0 113 0zm4.5-6.5a1.5 1.5 0 10-3 0v11.5a1.5 1.5 0 103 0V4.833zm4.5 3.5a1.5 1.5 0 10-3 0v8.5a1.5 1.5 0 103 0v-8.5z"/></svg>
//               {Likes} Likes
//             </span>
//           </div>
//         </div>
//         <button
//           className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
//           aria-label={`Apply for ${Title}`}
//           onClick={() => {
//             // Implement apply logic here, e.g., navigate to application form or API call
//             alert('Redirecting to application form...');
//           }}
//         >
//           Apply Now
//         </button>
//       </footer>

//       {/* SEO Enhancements */}
//       <meta itemProp="datePosted" content={createdOn ? new Date(createdOn).toISOString() : ''} />
//       <meta itemProp="validThrough" content={dateOfDebut ? new Date(dateOfDebut).toISOString() : ''} />
//       <meta itemProp="identifier" content={createdBy} />
//     </article>
//   );
// };

// export default JobCard;


import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import {useInView} from 'react-intersection-observer'

const JobCard = ({
  _id,
  Title,
  createdBy,
  nameOfCreator,
  contractType,
  minimumSalary,
  maximumSalary,
  createdOn,
  dateOfDebut,
  Region,
  City,
  Department,
  isDiplomaRequired,
  isPromoted,
  diploma,
  experienceRequired,
  Specialization,
  Description,
  status,
  Views = 0,
  Likes = 0
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const route = useRouter()
   
  const formatSalary = (min, max) => {
    if (!min || !max) return 'Salary not specified';
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };
  
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };


 

  const statusColor = status === 'active' 
    ? 'bg-green-100 text-green-800 border-green-200' 
    : status === 'stopped' 
    ? 'bg-red-100 text-red-800 border-red-200' 
    : 'bg-gray-100 text-gray-800 border-gray-200';

  // Shared details content for both desktop and modal
  const renderDetails = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-5 text-sm">
      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Contract</span>
        <span className="font-medium text-gray-900" itemProp="employmentType">{contractType}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Salary</span>
        <span className="font-medium text-gray-900" itemProp="baseSalary">{formatSalary(minimumSalary, maximumSalary)}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Location</span>
        <span className="font-medium text-gray-900" itemProp="jobLocation">{City || Region || 'Remote'}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Start Date</span>
        <span className="font-medium text-gray-900">{formatDate(dateOfDebut)}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Experience</span>
        <span className="font-medium text-gray-900">{experienceRequired}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Specialization</span>
        <span className="font-medium text-gray-900" itemProp="occupationalCategory">{Specialization}</span>
      </div>
      {Department && (
        <div className="flex flex-col">
          <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Department</span>
          <span className="font-medium text-gray-900">{Department}</span>
        </div>
      )}
      {isDiplomaRequired && diploma && (
        <div className="flex flex-col">
          <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Diploma</span>
          <span className="font-medium text-gray-900">{diploma}</span>
        </div>
      )}
    </div>
  );

  // Shared description
  const renderDescription = () => (
    <div className="mb-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">Description</h3>
      <p className="text-gray-600 text-base break-words leading-relaxed" itemProp="description">
        {Description || 'No detailed description available for this position.'}
      </p>
    </div>
  );

  // Shared footer engagement (without apply)
  const renderEngagement = () => (
    <div className="flex items-center space-x-6 text-sm text-gray-500">
      <span className={`px-3 py-1 rounded-md border font-medium ${statusColor}`}>
        {status}
      </span>
      <div className="flex items-center space-x-4">
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          {Views} Views
        </span>
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.5a1.5 1.5 0 11-3 0v-5.5a1.5 1.5 0 113 0zm4.5-6.5a1.5 1.5 0 10-3 0v11.5a1.5 1.5 0 103 0V4.833zm4.5 3.5a1.5 1.5 0 10-3 0v8.5a1.5 1.5 0 103 0v-8.5z"/></svg>
          {Likes} Likes
        </span>
      </div>
    </div>
  );

  return (
    <article className="bg-white shadow-md border border-gray-100 rounded-xl p-5 mb-6 max-w-full mx-auto hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1" itemScope itemType="http://schema.org/JobPosting">
      {/* Unified Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-1 tracking-tight" itemProp="title">{Title || 'Untitled Position'}</h2>
          <p className="text-sm text-gray-500 font-medium">
            By <span itemProp="hiringOrganization">{nameOfCreator || 'Anonymous'}</span> | Posted {formatDate(createdOn)}
          </p>
          {/* Mobile Hero Extras: Salary and Location */}
          <div className="mt-3 sm:hidden">
            <p className="text-lg font-semibold text-orange-600">{formatSalary(minimumSalary, maximumSalary)}</p>
            <p className="text-base font-medium text-gray-700">{City || Region || 'Remote'}</p>
          </div>
        </div>
        {isPromoted && (
          <span className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            Promoted
          </span>
        )}
      </header>

      {/* Desktop Layout: Original full content */}
      <div className="hidden sm:block">
        {renderDetails()}
        {renderDescription()}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {renderEngagement()}
          <button
            className="w-full sm:w-auto bg-orange-500 text-white font-bold sm:px-4 sm:py-6 lg:px-10 lg:py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
            aria-label={`Apply for ${Title}`}
            onClick={() => {
              // alert('Redirecting to application form...');
              route.push(`/JobInfo/${_id}`)
            }}
          >
           Apply For {Title}
          </button>
        </footer>
      </div>

      {/* Mobile Layout: Hero + Trigger for Bottom Sheet */}
      <div className="sm:hidden">
        <button
          onClick={() => setModalOpen(true)}
          className="w-full text-left py-4 border-b border-gray-200 flex justify-between items-center"
          aria-label="View details"
        >
          <span className="text-sm font-semibold text-blue-600">View Details</span>
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <button
          className="mt-4 w-full bg-orange-500 text-white font-bold py-2 px-3  rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md text-base"
          aria-label={`Apply for ${Title}`}
          onClick={() => {
            route.push(`/JobInfo/${_id}`)
            // alert('Redirecting to application form...');
          }}
        >
          Apply Now
        </button>
      </div>

      {/* Mobile Bottom Sheet Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 sm:hidden flex items-end justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setModalOpen(false)}></div>
          {/* Sheet */}
          <div className="relative bg-white w-full max-h-[80vh] rounded-t-xl shadow-2xl overflow-y-auto animate-slideUp p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Job Details</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-5 mb-6 text-sm">
              {/* Stacked details for mobile sheet - relaxed single column */}
              <div className="flex flex-col border-b pb-3">
                <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Contract</span>
                <span className="font-medium text-gray-900 text-base">{contractType}</span>
              </div>
              <div className="flex flex-col border-b pb-3">
                <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Salary</span>
                <span className="font-medium text-gray-900 text-base">{formatSalary(minimumSalary, maximumSalary)}</span>
              </div>
              <div className="flex flex-col border-b pb-3">
                <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Location</span>
                <span className="font-medium text-gray-900 text-base">{City || Region || 'Remote'}</span>
              </div>
              <div className="flex flex-col border-b pb-3">
                <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Start Date</span>
                <span className="font-medium text-gray-900 text-base">{formatDate(dateOfDebut)}</span>
              </div>
              <div className="flex flex-col border-b pb-3">
                <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Experience</span>
                <span className="font-medium text-gray-900 text-base">{experienceRequired}</span>
              </div>
              <div className="flex flex-col border-b pb-3">
                <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Specialization</span>
                <span className="font-medium text-gray-900 text-base">{Specialization}</span>
              </div>
              {Department && (
                <div className="flex flex-col border-b pb-3">
                  <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Department</span>
                  <span className="font-medium text-gray-900 text-base">{Department}</span>
                </div>
              )}
              {isDiplomaRequired && diploma && (
                <div className="flex flex-col border-b pb-3">
                  <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Diploma</span>
                  <span className="font-medium text-gray-900 text-base">{diploma}</span>
                </div>
              )}
            </div>
            {renderDescription()}
            <div className="border-t pt-4">
              {renderEngagement()}
            </div>
            <button
              className="mt-5 w-full bg-orange-500 text-white font-bold py-2 px-3  rounded-lg hover:bg-orange-600 transition-all shadow-md text-base"
              onClick={() => {
                setModalOpen(false);
                route.push(`/JobInfo/${_id}`)
                // alert('Redirecting to application form...');
              }}
            >
              Apply Now
            </button>
          </div>
        </div>
      )}

     
      {/* SEO Enhancements */}
      <meta itemProp="datePosted" content={createdOn ? new Date(createdOn).toISOString() : ''} />
      <meta itemProp="validThrough" content={dateOfDebut ? new Date(dateOfDebut).toISOString() : ''} />
      {/* <meta itemProp="identifier" content={createdBy} /> */}
    </article>
  );
};

export default JobCard;
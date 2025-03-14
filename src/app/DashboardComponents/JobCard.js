
// import { MapPin, Clock, DollarSign, Briefcase, Bookmark } from 'lucide-react';

// const JobCard = ({ job }) => {
//   return (
//     <div className="border-b px-4 border-gray-200 py-6">
//       <div className="flex justify-between items-start mb-2">
//         <div>
//           <h3 className="text-xl font-medium text-orange-500">{job.title}</h3>
//           <p className="text-gray-600">{job.company}</p>
//         </div>
//         <div className="flex items-center">
//           <button className="flex items-center mr-2 text-orange-500">
//             <Bookmark size={18} className="mr-1" />
//             <span>Save</span>
//           </button>
//           <button className="px-4 py-1 bg-orange-100 text-orange-500 rounded hover:bg-orange-200 transition-colors">
//             View Job
//           </button>
//         </div>
//       </div>

//       <div className="flex items-center text-gray-500 text-sm mb-4">
//         <div className="flex items-center mr-4">
//           <MapPin size={16} className="mr-1" />
//           <span>{job.location}</span>
//         </div>
//         <div className="flex items-center mr-4">
//           <Clock size={16} className="mr-1" />
//           <span>{job.experience}</span>
//         </div>
//         <div className="flex items-center mr-4">
//           <DollarSign size={16} className="mr-1" />
//           <span>{job.salary}</span>
//         </div>
//         <div className="flex items-center">
//           <Briefcase size={16} className="mr-1" />
//           <span>{job.type}</span>
//         </div>
//       </div>

//       <div className="flex flex-wrap">
//         {job.skills.map((skill, index) => (
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

//       {job.publishedDate && (
//         <div className="mt-2 text-right text-sm text-gray-500">
//           Published On: {job.publishedDate}
//         </div>
//       )}
//     </div>
//   );
// };
// export default JobCard;


import { MapPin, Clock, DollarSign, Briefcase, Bookmark } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext.';

const JobCard = ({ job }) => {
          const { translate, setLanguage, language } = useTranslation();
  return (
    <div className="border-b px-4 border-gray-200 py-6">
      {/* Header section - stack vertically on mobile */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
        <div className="mb-3 sm:mb-0">
          <h3 className="text-xl font-medium text-orange-500">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <div className="flex items-center self-start sm:self-auto">
          <button className="flex items-center mr-2 text-orange-500">
            <Bookmark size={18} className="mr-1" />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button className="px-4 py-1 bg-orange-100 text-orange-500 rounded hover:bg-orange-200 transition-colors">
            {translate('views_jobs')}
          </button>
        </div>
      </div>

      {/* Job details - wrap on smaller screens */}
      <div className="flex flex-wrap items-center text-gray-500 text-sm mb-4">
        <div className="flex items-center mr-4 mb-2">
          <MapPin size={16} className="mr-1" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <Clock size={16} className="mr-1" />
          <span>{job.experience}</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <DollarSign size={16} className="mr-1" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center mb-2">
          <Briefcase size={16} className="mr-1" />
          <span>{job.type}</span>
        </div>
      </div>

      {/* Skills tags - already responsive with flex-wrap */}
      <div className="flex flex-wrap">
        {job.skills.map((skill, index) => (
          <span 
            key={index} 
            className={`text-xs px-3 py-1 rounded-full mr-2 mb-2 ${
              skill === 'Unisex' 
                ? 'bg-orange-100 text-orange-600' 
                : skill === 'Female Only' 
                  ? 'bg-pink-100 text-pink-600' 
                  : 'bg-blue-100 text-blue-600'
            }`}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Published date - maintain right alignment */}
      {job.publishedDate && (
        <div className="mt-2 text-right text-sm text-gray-500">
          {translate('Published On: 2/2/25')} {job.publishedDate}
        </div>
      )}
    </div>
  );
};

export default JobCard;
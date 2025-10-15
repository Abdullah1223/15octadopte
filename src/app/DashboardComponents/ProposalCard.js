'use client'
import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../Context/TranslationContext.';
import { useInView } from 'react-intersection-observer';

const ProposalCard = ({ proposal }) => {
  const { translate } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('proposal');
  const [isLoaded,setisLoaded]=useState(true)
  const [hasMore,sethasMore]=useState(true)
  // const {ref,inView}=useInView()

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const isAccepted = proposal.status === 'accepted' || proposal.status === "Accepté";
  // useEffect(()=>{
    
  //   console.log(inView)
  // },[inView])
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mb-6 overflow-hidden ${isExpanded ? 'ring-2 ring-orange-200' : 'border border-gray-100'}`}
    >
      {/* Main Card Content */}
      <motion.div 
        layout="position"
        className="p-5 flex flex-col sm:flex-row cursor-pointer hover:bg-gray-50/50 transition-colors duration-200"
        onClick={toggleExpand}
      >
        <motion.div 
          layout="position"
          className="w-full sm:w-20 h-40 sm:h-20 rounded-lg bg-gray-100 overflow-hidden sm:mr-5 mb-4 sm:mb-0 shadow-inner"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.img 
            src={proposal.image} 
            alt="Proposal" 
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <motion.div layout="position" className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
            <div>
              <motion.h3 
                layout="position"
                className="text-lg font-semibold text-gray-900 hover:text-orange-500 transition-colors duration-200"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {proposal?.jobDetails?.Title}
              </motion.h3>
              <motion.div 
                layout="position"
                className="flex items-center text-sm text-gray-500 mt-1"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{proposal.jobDetails.Region}</span>
              </motion.div>
            </div>
            <motion.div 
              layout="position"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`px-4 py-1.5 text-sm font-medium rounded-full mt-2 sm:mt-0 ${
                isAccepted
                  ? 'bg-green-50 text-green-700 ring-1 ring-green-200 hover:bg-green-100'
                  : 'bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100'
              }`}
            >
              {proposal.status}
            </motion.div>
          </div>
          <motion.p 
            layout="position"
            className="text-gray-600 text-sm leading-relaxed"
          >
            {proposal.jobDetails.Description}
          </motion.p>
        </motion.div>
      </motion.div>
    
      {/* Expandable Details Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-gray-100 overflow-hidden"
          >
            {/* Tabs */}
            <motion.div 
              layout
              className="flex border-b border-gray-100 bg-gray-50/50"
            >
              <motion.button
                whileHover={{ backgroundColor: activeTab === 'proposal' ? 'rgba(255,255,255,1)' : 'rgba(249,250,251,1)' }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 py-3.5 px-4 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'proposal' 
                    ? 'text-orange-500 border-b-2 border-orange-500 bg-white' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('proposal')}
              >
                {translate('proposal_details')}
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: activeTab === 'job' ? 'rgba(255,255,255,1)' : 'rgba(249,250,251,1)' }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 py-3.5 px-4 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'job' 
                    ? 'text-orange-500 border-b-2 border-orange-500 bg-white' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('job')}
              >
                {translate('job_details')}
              </motion.button>
            </motion.div>

            {/* Tab Content */}
            <motion.div 
              layout
              className="p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'proposal' ? (
                    <div className="space-y-6">
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                      >
                        <DetailItem 
                          icon={<StatusIcon />}
                          label={translate('status')} 
                          value={proposal.status} 
                          isStatus={true}
                          status={isAccepted}
                        />
                        <DetailItem 
                          icon={<CalendarIcon />}
                          label={translate('sent_at')} 
                          value={format(new Date(proposal.sentAt), 'PPP')} 
                        />
                        <DetailItem 
                          icon={<ExperienceIcon />}
                          label={translate('experience')} 
                          value={proposal.professionalDetails.yearsOfExperience} 
                        />
                        <DetailItem 
                          icon={<ContractIcon />}
                          label={translate('contract_type')} 
                          value={proposal.contractType} 
                        />
                        <DetailItem 
                          icon={<SalaryIcon />}
                          label={translate('expected_salary')} 
                          value={proposal.expectedSalary} 
                        />
                        <DetailItem 
                          icon={<AvailableIcon />}
                          label={translate('available_from')} 
                          value={format(new Date(proposal.availabe), 'PPP')} 
                        />
                      </motion.div>

                      {/* Links Section */}
                      <motion.div 
                        className="space-y-3 bg-gray-50 rounded-lg p-4"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <h4 className="text-sm font-medium text-gray-700 mb-3">{translate('professional_links')}</h4>
                        <div className="space-y-2">
                          {proposal.professionalDetails.portfolioUrl && (
                            <LinkItem icon={<PortfolioIcon />} label={translate('portfolio')} url={proposal.professionalDetails.portfolioUrl} />
                          )}
                          {proposal.professionalDetails.linkedinProfile && (
                            <LinkItem icon={<LinkedInIcon />} label="LinkedIn" url={proposal.professionalDetails.linkedinProfile} />
                          )}
                        </div>
                      </motion.div>

                      {/* Skills */}
                      <motion.div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">{translate('skills')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {proposal.skills.map((skill, index) => (
                            <motion.span 
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ 
                                scale: 1.1,
                                backgroundColor: "rgb(251 146 60 / 0.2)",
                                color: "rgb(234 88 12)"
                              }}
                              className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                      >
                        <DetailItem 
                          icon={<CompanyIcon />}
                          label={translate('job_name')} 
                          value={proposal.jobDetails.Title} 
                        />
                        <DetailItem 
                          icon={<LocationIcon />}
                          label={translate('location')} 
                          value={proposal.jobDetails.Region} 
                        />
                        <DetailItem 
                          icon={<SalaryIcon />}
                          label={translate('salary_range')} 
                          value={`${proposal.jobDetails.minimumSalary} - ${proposal.jobDetails.maximumSalary}`} 
                        />
                        <DetailItem 
                          icon={<ContractIcon />}
                          label={translate('contract_type')} 
                          value={proposal.jobDetails.contractType} 
                        />
                        <DetailItem 
                          icon={<UserIcon />}
                          label={translate('posted_by')} 
                          value={proposal.jobDetails.nameOfCreator} 
                        />
                        <DetailItem 
                          icon={<CalendarIcon />}
                          label={translate('interview_date')} 
                          value={format(new Date(proposal.jobDetails.dateOfDebut), 'PPP')} 
                        />
                        {/* <DetailItem 
                          icon={<ClockIcon />}
                          label={translate('posted_at')} 
                          value={format(new Date(proposal.jobDetails.createdAt), 'PPP')} 
                        /> */}
                        <DetailItem 
                          icon={<ViewsIcon />}
                          label={translate('views')} 
                          value={proposal.jobDetails.views} 
                        />
                        <DetailItem 
                          icon={<DiplomaIcon />}
                          label={translate('diploma_required')} 
                          value={proposal.jobDetails.isDiplomaRequired ? 'Yes' : 'No'} 
                        />
                        <DetailItem 
                          icon={<SpecializationIcon />}
                          label={translate('specialization')} 
                          value={proposal.jobDetails.Specialization} 
                        />
                      </motion.div>

                      <motion.div 
                        className="bg-gray-50 rounded-lg p-4"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <h4 className="text-sm font-medium text-gray-700 mb-2">{translate('description')}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{proposal.jobDetails.Description}</p>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Message Button - Only shown for accepted proposals */}
              {isAccepted && (
                <motion.div 
                  className="mt-6 pt-6 border-t border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add your message handling logic here
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow group"
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                      whileHover={{ rotate: 15 }}
                    >
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </motion.svg>
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 2 }}
                    >
                      {translate('message')}
                    </motion.span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
     
    </motion.div>
  );
};

const DetailItem = ({ icon, label, value, isStatus = false, status = false }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 w-5 h-5 mt-0.5 text-gray-400">
      {icon}
    </div>
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className={`mt-1 text-sm ${
        isStatus 
          ? status 
            ? 'text-green-600 font-medium'
            : 'text-red-600 font-medium'
          : 'text-gray-900'
      }`}>
        {value}
      </dd>
    </div>
  </div>
);

const LinkItem = ({ icon, label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200 group"
  >
    <span className="w-5 h-5 mr-2 text-gray-400 group-hover:text-orange-500 transition-colors duration-200">
      {icon}
    </span>
    <span className="mr-1 font-medium">{label}:</span>
    <span className="truncate hover:underline">{url}</span>
  </a>
);

// Icons components (using heroicons style)
const StatusIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ExperienceIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ContractIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SalaryIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AvailableIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PortfolioIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const CompanyIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const LocationIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const UserIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ClockIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ViewsIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const DiplomaIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const SpecializationIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export default ProposalCard; 
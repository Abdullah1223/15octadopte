
import { motion } from 'framer-motion';
import { JobCard } from './JobCard';
import React from 'react';

interface JobsListProps {
  jobs:string[],
  isLoading:Boolean,
  
}
export const JobsList = React.forwardRef<HTMLDivElement , JobsListProps>(({ jobs,isLoading},ref) => {
  
    return (
     <div>
     <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Opportunités disponibles
          </h2>
          <p className="text-gray-600 text-lg">
            {jobs?.length} poste{jobs?.length > 1 ? 's' : ''} trouvé{jobs?.length > 1 ? 's' : ''}
          </p>
  </motion.div>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs?.map((job, index) => (
           
          <div key={index} ref={index==jobs.length - 1 ? ref :null}>
            <JobCard key={job?.id} job={job} index={index} />
          </div>
          ))}
         
        </div>
        
         {/* Infinite Scroll Trigger Point */}
        {
          isLoading ? 
          <div className="mt-8 flex justify-center">
          <div className="w-full h-20 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"
            />
          </div>
        </div>:null
        } 
      </div>
      
    );
  });

  JobsList.displayName = "JobsList";

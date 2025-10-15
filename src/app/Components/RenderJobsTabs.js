'use client';
import {  AnimatePresence,motion } from 'framer-motion';
import { Briefcase, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import ProfileInfoJobCard from './profileInfoJobCard';

const RenderJobsTab = ({isOwner,cursor,excludeDocIds,jobs,hasMore,loading,fetchingJobs}) => {
  console.log('render jobs tabs loaded')
  console.log(jobs.length)
  
//  useEffect(()=>{
//   if(pageRef.current==true){

//     fetchingJobs(null,null)
//   }
//  },[])
    const handleViewJob = (jobId) => {
      // Handle view job action - you can navigate to job details page
      console.log('View job:', jobId);
      // Example: router.push(`/jobs/${jobId}`);
    };
  

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Job Postings</h3>
          {/* {isOwner && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Post New Job
            </motion.button>
          )} */}
        </div>
  
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading jobs...</p>
          </div>
        ) 
         : jobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No job postings yet</p>
            {isOwner && (
              <button className="text-orange-500 hover:text-orange-600 font-medium">
                Create your first job posting
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <ProfileInfoJobCard
                key={job._id}
                job={job}
                onViewJob={handleViewJob}
              />
           
            ))}
            
            {/* Load More Button (if you have pagination) */}
            {hasMore && (
              <div className="text-center mt-6">
                <button
                  onClick={() => {fetchingJobs(cursor, excludeDocIds)}}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Load More Jobs
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  export default RenderJobsTab
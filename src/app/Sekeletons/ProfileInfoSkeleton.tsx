'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Building, Camera, Info, Briefcase, Clock as WaitingIcon, CheckCircle as AcceptedIcon, XCircle as RejectedIcon, TrendingUp as RateIcon } from 'lucide-react';

/**
 * Skeleton component for the EmployerProfile view.
 * It simulates the structure and layout of the main profile 
 * while the actual data is loading.
 */
export const SkeletonStatCard = () => (
  <motion.div
    className="p-5 bg-white rounded-xl flex flex-col items-start shadow-md animate-pulse border-t-2 border-transparent"
  >
    {/* Icon Placeholder */}
    <div className="p-2 rounded-lg mb-3 bg-gray-200">
      <div className="w-5 h-5 bg-gray-300 rounded-full" />
    </div>
    {/* Title Placeholder */}
    <div className="w-2/3 h-4 bg-gray-300 rounded mb-2" />
    {/* Value Placeholder */}
    <div className="w-1/2 h-7 bg-gray-400 rounded" />
  </motion.div>
);

const EmployerProfileSkeleton = () => {
  // --- Reusable Skeleton Stat Card Component ---
  
  // --- Render Overview Tab Skeleton ---
  const renderDetailsTabSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Left Column (2/3 width): About Us & Details */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* About Us Card Skeleton */}
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-t-4 border-gray-300 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            {/* Header Title Placeholder */}
            <div className="w-1/3 h-6 bg-gray-300 rounded" />
            {/* Edit Button Placeholder */}
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>
          {/* Content Lines */}
          <div className="space-y-3 pt-2">
            <div className="w-full h-4 bg-gray-200 rounded" />
            <div className="w-11/12 h-4 bg-gray-200 rounded" />
            <div className="w-5/6 h-4 bg-gray-200 rounded" />
            <div className="w-4/5 h-4 bg-gray-200 rounded" />
            <div className="w-1/2 h-4 bg-gray-200 rounded" />
          </div>
        </section>

        {/* Basic Information Card Skeleton */}
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-t-4 border-gray-300 animate-pulse">
          {/* Section Title Placeholder */}
          <div className="w-2/5 h-6 bg-gray-300 rounded mb-6" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            
            {/* Item 1: Representative */}
            <div className="space-y-1">
              <div className="w-1/3 h-3 bg-gray-200 rounded" />
              <div className="w-3/4 h-5 bg-gray-300 rounded" />
            </div>

            {/* Item 2: Location */}
            <div className="space-y-1">
              <div className="w-1/3 h-3 bg-gray-200 rounded" />
              <div className="w-3/4 h-5 bg-gray-300 rounded" />
            </div>
            
            {/* Item 3: Email */}
            <div className="col-span-1 space-y-1">
              <div className="w-1/4 h-3 bg-gray-200 rounded" />
              <div className="w-5/6 h-5 bg-gray-300 rounded" />
            </div>

            {/* Item 4: Website */}
            <div className="space-y-1">
              <div className="w-1/4 h-3 bg-gray-200 rounded" />
              <div className="w-5/6 h-5 bg-gray-300 rounded" />
            </div>
            
            {/* Item 5: Founding Year */}
            <div className="space-y-1">
              <div className="w-1/3 h-3 bg-gray-200 rounded" />
              <div className="w-2/3 h-5 bg-gray-300 rounded" />
            </div>
            
            {/* Item 6: Company Size */}
            <div className="space-y-1">
              <div className="w-1/3 h-3 bg-gray-200 rounded" />
              <div className="w-2/3 h-5 bg-gray-300 rounded" />
            </div>
          </div>
        </section>
      </div>

      {/* Right Column (1/3 width): KPIs */}
      <div className="lg:col-span-1 space-y-6">
        {/* KPI Header Placeholder */}
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-4 animate-pulse" />
        <div className="space-y-4">
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
        </div>
      </div>
    </div>
  );

  // --- Render Jobs Tab Skeleton (Minimalist) ---
  const renderJobsTabSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      {/* Job Card Skeleton 1 */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-300">
        <div className="space-y-4">
          <div className="w-3/4 h-6 bg-gray-300 rounded" />
          <div className="w-1/2 h-4 bg-gray-200 rounded" />
          <div className="flex justify-between items-center pt-2">
            <div className="w-1/5 h-4 bg-gray-200 rounded" />
            <div className="w-1/6 h-8 bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
      {/* Job Card Skeleton 2 */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-300">
        <div className="space-y-4">
          <div className="w-2/3 h-6 bg-gray-300 rounded" />
          <div className="w-2/5 h-4 bg-gray-200 rounded" />
          <div className="flex justify-between items-center pt-2">
            <div className="w-1/6 h-4 bg-gray-200 rounded" />
            <div className="w-1/5 h-8 bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
  
  // The main skeleton container
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- Header Section Skeleton --- */}
      <div className="bg-white shadow-md border-b border-gray-200 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            
            {/* Company Logo Placeholder */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                <Building className="w-14 h-14 text-gray-400" />
              </div>
              {/* Camera Icon Placeholder */}
              <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg border border-gray-200">
                 <Camera className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Basic Info & Actions Placeholder */}
            <div className="flex-1 pt-0 md:pt-2 text-center md:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                
                {/* Name and Handle Placeholder */}
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <div className="w-64 h-8 bg-gray-300 rounded-lg" /> {/* Company Name */}
                  </div>
                  <div className="w-40 h-5 bg-gray-200 rounded-lg mb-4 mx-auto md:mx-0" /> {/* Username */}
                </div>

                {/* Action Buttons Placeholder */}
                <div className="flex gap-3 justify-center md:justify-end flex-shrink-0">
                  <div className="w-28 h-10 bg-gray-300 rounded-lg" /> {/* Follow Button */}
                  <div className="w-28 h-10 bg-gray-300 rounded-lg" /> {/* Message Button */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tab Navigation Skeleton */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-6">
            <div className="w-24 h-5 bg-gray-300 rounded-t-lg py-3 px-1 border-b-2 border-orange-500" /> {/* Active Tab */}
            <div className="w-28 h-5 bg-gray-200 rounded-t-lg py-3 px-1 border-b-2 border-transparent" /> {/* Inactive Tab */}
          </nav>
        </div>

        {/* Content Area Skeleton (Defaulting to Overview) */}
        {renderDetailsTabSkeleton()}
        
        {/* If the logic required rendering jobs on load: 
        {renderJobsTabSkeleton()} 
        */}
      </div>
    </div>
  );
};

export default EmployerProfileSkeleton;
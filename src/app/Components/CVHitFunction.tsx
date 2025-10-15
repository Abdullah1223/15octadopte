'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, } from 'framer-motion';
import { 
  MapPin, 
  DollarSign, 
  User, 
  Star,
  Clock,
  
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Hit({ hit }) {


    const router = useRouter()
    
    return (
      <div 
        onClick={() => router.push(`/profileInfo/${hit._id}`)}
        className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 p-6 mb-4 cursor-pointer group"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex items-start gap-4 flex-1">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              {hit.profilePicture ? (
                <img 
                  src={hit.profilePicture.url} 
                  alt={`${hit.Name} ${hit.lastname}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={24} className="text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Name and Specialization */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                {hit.firstName} {hit.lastName}
              </h3>
              {hit.specialization && (
                <p className="text-sm text-gray-600 font-medium">
                  {hit.specialization}
                </p>
              )}
            </div>
          </div>
          
          {/* Contract Type Badge */}
          {hit.preferredContractType && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {hit.preferredContractType.toUpperCase()}
              </span>
            </div>
          )}
        </div>
  
        {/* Main Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Location */}
          {(hit.City || hit.Region) && (
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate">
                {hit.City && hit.Region ? `${hit.City}, ${hit.Region}` : hit.City || hit.Region}
              </span>
            </div>
          )}
  
          {/* Experience */}
          {hit.yearsOfExperience && (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate">
                {hit.yearsOfExperience} {"ans d'expérience"}
              </span>
            </div>
          )}
  
          {/* Salary Range */}
          {(hit.salaryExpectationMinimum || hit.salaryExpectationMaximum) && (
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate">
                {hit.salaryExpectationMinimum && hit.salaryExpectationMaximum 
                  ? `${hit.salaryExpectationMinimum} - ${hit.salaryExpectationMaximum}`
                  : hit.salaryExpectationMinimum 
                    ? `À partir de ${hit.salaryExpectationMinimum}`
                    : `Jusqu'à ${hit.salaryExpectationMaximum}`
                }
              </span>
            </div>
          )}
        </div>
      
        {/* Skills Section */}
        {hit?.skills && Array.isArray(hit.skills) && hit.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Compétences:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {hit.skills.slice(0, 4).map((skill, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {skill}
                </span>
              ))}
              {hit.skills.length > 4 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-600">
                  +{hit.skills.length - 4} autres
                </span>
              )}
            </div>
          </div>
        )}
        {/* Action Indicator */}
        <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-50">
          <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Cliquer pour voir le profil →
          </div>
        </div>
      </div>
    );
  }
  
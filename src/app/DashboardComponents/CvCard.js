import React, { useEffect, useRef, useState } from 'react';
import { Eye, User, Heart, DollarSign, Clock, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { saveUserCv } from '../Services/cv.service';
import { toast } from 'sonner';



function CvCard({ cv,setCvData }){

    const route  = useRouter()

    const unSaveHandle = async(id)=>{
      try{
        const response = await saveUserCv({userId:cv?._id,saveUser:false})
      const result = await response.data
      if(response.status==200){
        setCvData((prev) => prev.filter((cv) => cv._id !== id));
        toast.success("Cv Unsaved Successfully",{
          description:"The Cv has been unsaved successfully"
        })
      }else if(response.status==400){
        
        toast.error("Error Unsaving Cv",{
          description:"An error occurred while unsaving the Cv"
        })
      }
      }catch(err){
        toast.error("Error Unsaving Cv",{
          description:"An error occurred while unsaving the Cv"
        })
      }
    }

    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
        {/* Profile Image Section - Takes half the card height */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={cv?.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'} 
            alt={`${cv?.firstName || 'Unknown'} ${cv?.lastName || 'User'}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div
          onClick={()=>{unSaveHandle(cv?._id)}}
          className="absolute z-10 top-3 right-3">
            <div className="bg-orange-500 p-2 rounded-full shadow-lg">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

  
        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {cv?.firstName || 'Unknown'} {cv?.lastName }
            </h3>
            <p className="text-orange-600 font-semibold text-sm">
              {cv?.Specialization || 'Not specified'}
            </p>
          </div>
  
          {/* Experience and Contract Type */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{cv?.yearsOfExperience} years</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <FileText className="w-4 h-4" />
              <span>{cv?.preferredContractType || 'Not specified'}</span>
            </div>
          </div>
  
          {/* Salary Range */}
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-gray-800">Salary Range</span>
            </div>
            <p className="text-sm text-gray-700 font-medium">
              ${cv?.salaryExpectationMinimum?.toLocaleString() || '0'} - ${cv?.salaryExpectationMaximum?.toLocaleString() || '0'}
            </p>
          </div>
  
          {/* Skills */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700">Skills:</h4>
            <div className="flex flex-wrap gap-1">
              {cv?.Skills?.slice(0, 3).map((skill, index) => (
                <span 
                  key={index}
                  className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
              {cv?.Skills?.length > 3 && (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                  +{cv?.Skills?.length - 3} more
                </span>
              )}
              {(!cv?.Skills || cv?.Skills?.length === 0) && (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                  No skills listed
                </span>
              )}
            </div>
          </div>
  
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
            onClick={() => window.open(cv?.Cv, '_blank')}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
              <Eye className="w-4 h-4" />
              View CV
            </button>
            <button
            onClick={()=>{route.push(`/profileInfo/${cv._id}`)}}
            className="flex-1 bg-white hover:bg-orange-50 text-orange-600 font-semibold py-2.5 px-4 rounded-lg border-2 border-orange-500 transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
              <User className="w-4 h-4" />
              Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

export default CvCard;
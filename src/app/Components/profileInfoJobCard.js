import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Heart, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  User, 
  Briefcase,
  ChevronDown,
  ChevronUp,
  Star,
  Badge,
  Building,
  FileText,
  GraduationCap,
  Share2
} from 'lucide-react';

const ProfileInfoJobCard = ({ 
  job,
  onViewJob
}) => {
  const [isExpanded, setIsExpanded] = useState(false);


  const handleViewJob = () => {
    if (onViewJob) {
      onViewJob(job._id);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSalary = (min, max) => {
    return `€${min.toLocaleString()} - €${max.toLocaleString()}`;
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200"
    >
      {/* Main Card Content */}
      <div className="p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-orange-600 transition-colors line-clamp-2">
                {job.Title}
              </h3>
              {job.isPromoted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shrink-0"
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span className="hidden sm:inline">Promoted</span>
                </motion.div>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <User className="w-4 h-4 shrink-0" />
              <span className="text-sm truncate">{job.nameOfCreator}</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-600 mb-3">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="text-sm">{job.City}, {job.Region}</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              {isExpanded ? job.Description : truncateDescription(job.Description)}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Debut: {formatDate(job.dateOfDebut)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Posted: {formatDate(job.createdOn)}</span>
              </div>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">{job.Views}</span>
              <span className="sm:hidden">{job.Views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{job.Liked}</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              <span>{job.Shares}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-orange-600 hover:text-orange-700 transition-colors p-1"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewJob}
              className="bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              <span className="hidden sm:inline">View Job</span>
              <span className="sm:hidden">View</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100 bg-gray-50"
          >
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Job Details */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Job Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contract Type:</span>
                      <span className="font-medium">{job.contractType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{job.experienceRequired} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">{job.Department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Specialization:</span>
                      <span className="font-medium capitalize">{job.Specialization}</span>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Requirements
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Diploma Required:</span>
                      <span className={`font-medium ${job.isDiplomaRequired ? 'text-red-600' : 'text-green-600'}`}>
                        {job.isDiplomaRequired ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {job.isDiplomaRequired && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Diploma:</span>
                        <span className="font-medium">{job.diploma}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Compensation */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Compensation
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salary Range:</span>
                      <span className="font-medium text-green-600">
                        {formatSalary(job.minimumSalary, job.maximumSalary)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleViewJob}
                  className="flex-1 bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  Apply Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-white text-orange-600 py-3 px-4 rounded-lg border border-orange-500 hover:bg-orange-50 transition-colors font-medium"
                >
                  Save Job
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfileInfoJobCard;
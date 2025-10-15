import { Briefcase, Calendar, Clock, Euro, GraduationCap, Heart, MapPin, Star } from "lucide-react";
import { motion } from 'framer-motion';
import {useState} from 'react';
import { useRouter } from "next/navigation";
export const JobCard = ({ job, index }) => {
    const [isLiked, setIsLiked] = useState(false);
    const route = useRouter()
    const getStatusColor = (status) => {
      switch (status) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'inactive': return 'bg-gray-100 text-gray-800';
        default: return 'bg-blue-100 text-blue-800';
      }
    };
  
    const getContractTypeColor = (type) => {
      switch (type) {
        case 'CDI': return 'bg-green-100 text-green-800';
        case 'CDD': return 'bg-blue-100 text-blue-800';
        case 'Stage': return 'bg-purple-100 text-purple-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 relative overflow-hidden"
      >
        {/* Promoted Tag */}
        {job.isPromoted && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-bl-2xl">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span className="text-sm font-semibold">Promoted</span>
            </div>
          </div>
        )}
  
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{job.Title}</h3>
            <p className="text-orange-600 font-semibold text-lg">{job.nameOfCreator}</p>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
          </div>
        </div>
  
        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>{job.City}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getContractTypeColor(job.contractType)}`}>
              {job.contractType}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Briefcase className="w-4 h-4 text-orange-500" />
            <span>{job.Specialization}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>{job.experienceRequired} {"ans d'expérience"}</span>
          </div>
        </div>
  
        {/* Description */}
        <p className="text-gray-700 mb-4 leading-relaxed">{job.Description}</p>
  
        {/* Salary and Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Euro className="w-4 h-4 text-orange-500" />
            <span className="font-semibold">{job.minimumSalary}€ - {job.maximumSalary}€</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <GraduationCap className="w-4 h-4 text-orange-500" />
            <span>{job.isDiplomaRequired ? 'Diplôme requis' : 'Pas de diplôme requis'}</span>
          </div>
        </div>
  
        {/* Interview Date */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Calendar className="w-4 h-4 text-orange-500" />
          <span>Entretien le {new Date(job.dateOfDebut).toLocaleDateString('fr-FR')}</span>
        </div>
  
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <motion.button
          onClick={()=>{route.push(`/JobInfo/${job._id}`)}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Postuler
          </motion.button>
          <div className="flex items-center gap-4">
           
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="font-medium">{job.Liked}</span>
          </div>
        </div>
      </motion.div>
    );
  };
  
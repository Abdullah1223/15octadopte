
import React, { useState,  } from 'react';
import { motion, } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  FileText, 
  Bookmark,
  
} from 'lucide-react';
import { UserCvInterface } from '../interfaces/CvInterfaces';
import { useRouter } from 'next/navigation';
import { useUser } from '../Hooks/useUser';

interface UserCardProps{
  user:UserCvInterface,
  setUsers:React.Dispatch<React.SetStateAction<UserCvInterface[]>>,
  index:number,
  setIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedCv:React.Dispatch<React.SetStateAction<string | null>>
}

export const UserCard = ({ user,setUsers, index,setIsOpen,setSelectedCv }:UserCardProps) => {
  
    const [saved, setSaved] = useState(user.isSaved);
    const route   = useRouter();
    const {saveUser} = useUser()
    // Format salary range
    const formatSalaryRange = () => {
      const min = user.salaryExpectationMinimum;
      const max = user.salaryExpectationMaximum;
      
      if (min && max) {
        return `${min.toLocaleString()}€ - ${max.toLocaleString()}€`;
      } else if (min) {
        return `À partir de ${min.toLocaleString()}€`;
      } else if (max) {
        return `Jusqu'à ${max.toLocaleString()}€`;
      }
      return 'Salaire à négocier';
    };
  
    // Format location with additional details
    const formatLocation = () => {
      const locationParts = [];
      
      if (user.City) locationParts.push(user.City);
      if (user.location) locationParts.push(user.location);
      // if (user.country) locationParts.push(user.country);
      // if (user.postalCode) locationParts.push(user.postalCode);
      
      return locationParts.length > 0 ? locationParts.join(', ') : 'Non spécifié';
    };
  
    return (
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -2 }}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img
                src={user?.profilePicture}
                alt={user.firstName}
                className="w-16 h-16 rounded-lg object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{user.firstName}</h3>
                  <p className="text-sm text-gray-600">{user.Specialization}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>{user.yearsOfExperience} {"ans d'expérience"}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-4 h-4 text-orange-500" />
                  <span>{user.preferredContractType}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="truncate">{formatLocation()}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4 text-orange-500" />
                  <span>{formatSalaryRange()}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {user.Skills && user.Skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <motion.button
                  onClick={() => saveUser({userId:user._id,toSave:!user.isSaved,setUsers:setUsers})}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                     user.isSaved
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Bookmark className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                onClick={()=>{route.push(`profileInfo/${user._id}`)}}
                  className="flex-1 px-3 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Voir le profil
                </motion.button>
                
                <motion.button
                onClick={()=>{
                  setIsOpen(true); 
                  setSelectedCv(user?.Cv); }}
                  className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  
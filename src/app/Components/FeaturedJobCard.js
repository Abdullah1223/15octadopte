'use client';
import { AlertCircle, Bookmark, Briefcase, ChevronDown, Clock, DollarSign, Euro, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "../Context/TranslationContext.";

const FeaturedJobCard = ({ job, index }) => {
    const [expanded, setExpanded] = useState(false);
          const { translate, setLanguage, language } = useTranslation();
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-all duration-300"
      >
        <div className="p-6 relative">
          <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center shadow-md">
            <Star size={12} className="mr-1" />
           {translate('promoted')}
          </div>
          
          <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
            <div>
              <h3 className="text-xl font-semibold text-orange-600">{job.title}</h3>
              <p className="text-gray-700 flex items-center">
                {job.company}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-orange-500 hover:text-orange-600 bg-white px-3 py-1 rounded-full border border-orange-200 shadow-sm"
              >
                <Bookmark size={16} className="mr-1" />
                <span className="text-sm font-medium">{translate('save_jobs')}</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors font-medium shadow-md"
              >
                {translate('apply_now')}
              </motion.button>
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-gray-600 text-sm mb-4">
            <div className="flex items-center bg-white p-2 rounded-lg border border-orange-100">
              <MapPin size={16} className="mr-2 text-orange-400" />
              <span>{job.location}</span>
            </div>
            {/* <div className="flex items-center bg-white p-2 rounded-lg border border-orange-100">
              <Clock size={16} className="mr-2 text-orange-400" />
              <span>{job.experience}</span>
            </div> */}
            <div className="flex items-center bg-white p-2 rounded-lg border border-orange-100">
              <Euro size={16} className="mr-2 text-orange-400" />
              <span className="font-medium">{job.salary}</span>
            </div>
            <div className="flex items-center bg-white p-2 rounded-lg border border-orange-100">
              <Briefcase size={16} className="mr-2 text-orange-400" />
              <span>{job.type}</span>
            </div>
          </div>
  
          <div className="mt-4">
            <p className="text-gray-700">{job.description}</p>
          </div>
  
          <div className="mt-4 flex flex-wrap gap-2">
            {job.skills.map((skill, idx) => (
              <span 
                key={idx} 
                className={`text-xs px-3 py-1 rounded-full ${
                  skill.includes('Unisex') 
                    ? 'bg-orange-200 text-orange-700' 
                    : skill.includes('Female') 
                      ? 'bg-pink-200 text-pink-700' 
                      : skill.includes('Male')
                        ? 'bg-blue-200 text-blue-700'
                        : 'bg-amber-200 text-amber-700'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
  
          <AnimatePresence>
            {expanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-5 text-gray-700 border-t border-orange-200 pt-4"
              >
                <h4 className="font-medium mb-3 text-orange-600">{translate('why_you_will_love')}</h4>
                <ul className="space-y-2">
                  {[
                    translate('competitive_salary'),
                    translate('flexible_working_hours'),
                    translate('professional_development'),
                    translate('modern_salon'),
                    translate('loyal_client_base')
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mr-2 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
  
          <div className="mt-5 flex justify-between items-center">
            <div className="flex items-center text-xs bg-orange-100 px-3 py-1 rounded-full text-orange-600">
              <AlertCircle size={12} className="mr-1" />
              {translate('promotion_ends')} {job.promotionEnds}
            </div>
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="text-orange-600 flex items-center text-sm hover:text-orange-700 font-medium"
            >
              {expanded ? translate('show_less') : translate('show_more')}
              <ChevronDown size={16} className={`ml-1 transform transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };
 export default FeaturedJobCard 
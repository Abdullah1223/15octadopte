import { Building, Calendar, Edit } from "lucide-react";
import {motion} from 'framer-motion'
const ExperienceCard = ({ experience, isOwner, onEdit, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100 hover:shadow-md transition-all duration-300"
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <Building className="w-5 h-5 text-orange-600" />
          <h4 className="text-lg font-semibold text-gray-900">{experience.position}</h4>
        </div>
        <p className="text-orange-600 font-medium mb-2">{experience.company}</p>
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{experience.startDate} - {experience.endDate || 'Present'}</span>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{experience.description}</p>
      </div>
      {isOwner && (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(experience)}
            className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  </motion.div>
);

export default ExperienceCard;
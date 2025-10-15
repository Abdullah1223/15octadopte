import { Award, Building2, Calendar, CheckCircle, Clock, DollarSign, MapPin, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hit({ hit }) {
    console.log('Data Hit',hit)
    const router = useRouter()  
    return (
      <div 
      onClick={()=>router.push(`/JobInfo/${hit._id}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all duration-200 p-6 mb-4 cursor-pointer group">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 mb-2 line-clamp-2">
              {hit.Title}
            </h3>
          </div>
          
          {/* Status and Contract Type */}
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            {/* Active Status */}
            <div className="flex items-center gap-1">
              {hit.status ? (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800">
                  <CheckCircle size={12} />
                  <span className="text-xs font-medium">Actif</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-800">
                  <XCircle size={12} />
                  <span className="text-xs font-medium">Inactif</span>
                </div>
              )}
            </div>
            
            {/* Contract Type Badge */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              {hit.contractType?.toUpperCase() || 'CDI'}
            </span>
          </div>
        </div>
  
        {/* Main Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Region */}
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate">
              {hit.Region || 'Région non spécifiée'}
            </span>
          </div>
  
          {/* Salary */}
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate">
              {hit.maximumSalary ? `${hit.maximumSalary}` : 'Salaire à négocier'}
            </span>
          </div>
  
          {/* Experience Required */}
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate">
              {hit.experienceRequired || 'Expérience non spécifiée'}
            </span>
          </div>
  
          {/* Date of Interview */}
          {hit.dateOfDebut && (
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate">
                Entretien: {hit.dateOfDebut}
              </span>
            </div>
          )}
  
          {/* Department */}
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate">
              {hit.Department || 'Département non spécifié'}
            </span>
          </div>
  
          {/* Diploma Required */}
          <div className="flex items-center gap-2">
            <Award size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate">
              {hit.isDiplomaRequired ? 'Diplôme requis' : 'Diplôme non requis'}
            </span>
          </div>
        </div>
  
        {/* Description Preview */}
        {hit.Description && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {hit.Description}
            </p>
          </div>
        )}
  
        {/* Action Indicators */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          
          
          <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Cliquer pour voir les détails →
          </div>
        </div>
      </div>
    );
  }
  
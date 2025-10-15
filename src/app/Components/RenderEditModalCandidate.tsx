import { Plus, Star, Upload, X } from "lucide-react";
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";
import { fileInfo } from "../interfaces/candidateInterface";
import { handleFile } from "../Utils/CandidateProfileUtils";

 export interface renderEditModalInterface{
    editingField:string,
    setEditValues:Dispatch<SetStateAction<{}>>
    ,editValues:any,
    renderError:(type:any)=>ReactNode,
    validationErrors:any,
    setFileInfo:Dispatch<SetStateAction<fileInfo>>
    // handleFile:(e:ChangeEvent<HTMLInputElement>)=>void,
    fileInfo:fileInfo,
    locations:string[],
    candidateTypes:string[],
    contractTypes:string[],
    profilePicture:string
 }

  const renderEditModal = ({editingField,setEditValues,editValues,renderError,validationErrors,fileInfo,setFileInfo,locations,candidateTypes,contractTypes,profilePicture}:renderEditModalInterface) => {

    switch(editingField) {
      case 'name':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
              <input
                type="text"
                value={editValues.firstName || ''}
                onChange={(e) => setEditValues({...editValues, firstName: e.target.value})}
                className={`w-full ${validationErrors.firstName ? "border-red-400" : 'border-gray-200'} px-4 py-3 border  rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              />
              {renderError('firstName')}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                value={editValues.lastName || ''}
                onChange={(e) => setEditValues({...editValues, lastName: e.target.value})}
                className={`${validationErrors.lastName ? "border-red-400" : 'border-gray-200'} w-full px-4 py-3 border  rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              />
              {renderError('lastName')}
            </div>
          </div>
        );
        case "profilePicture":
        return (
          <div className="space-y-6">
            {/* Current Image Display */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-4">Image actuelle</label>
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profil actuel"
                  className="w-32 h-32 object-cover rounded-full border-4 border-orange-500 shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border border-gray-300">
                  {"Pas d'image"}
                </div>
              )}
            </div>

            {/* File Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Télécharger une nouvelle image</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-orange-500 transition-all cursor-pointer bg-gray-50">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFile({e,setFileInfo,setEditValues,editValues})}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload className="w-6 h-6 text-orange-500 mb-2" />
                  <p className="text-sm text-gray-700 font-medium">
                    {fileInfo ? `Fichier sélectionné : ${fileInfo.name}` : "Cliquez pour sélectionner ou glissez-déposez une image"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPEG ou PNG. Taille maximale : 5 Mo.
                  </p>
                </div>
              </div>
              
              {/* Optional: Display selected file info (for confirmation/debugging) */}
              {fileInfo && (
                <div className="mt-3 p-3 bg-orange-50 border border-orange-100 rounded-xl text-sm text-gray-700">
                  <p><strong>Nom:</strong> {fileInfo.name}</p>
                  <p><strong>Type:</strong> {fileInfo.type}</p>
                  <p><strong>Taille:</strong> {(fileInfo.size / (1024 * 1024)).toFixed(2)} Mo</p>
                </div>
              )}
              {/* Placeholder for error display related to file upload */}
               {renderError('profilePicture')} 
            </div>
          </div>
        );

        case 'Skills':
          return (
            <div className="space-y-4">
              {/* Add new skill section */}
              <div className="flex gap-2">
               <div className='flex flex-col w-full'>
                <input
                  type="text"
                  placeholder="Ajouter une nouvelle compétence"
                  value={editValues.newSkill || ''}
                  onChange={(e) => setEditValues({...editValues, newSkill: e.target.value.toLowerCase()})}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && editValues.newSkill?.trim()) {
                      const currentSkills = editValues.Skills || [];
                      const newSkill = editValues.newSkill.trim();
                      if (!currentSkills.includes(newSkill)) {
                        setEditValues({
                          ...editValues, 
                          Skills: [...currentSkills, newSkill],
                          
                        });
                      }
                    }
                  }}
                  className={`flex-1 px-4 py-3 border ${validationErrors.Skills ? 'border-red-400' : " border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}/>
                {renderError('Skills')}
               </div>
                <button
                  type="button"
                  onClick={() => {
                    if (editValues.newSkill?.trim()) {
                      const currentSkills = editValues.Skills || [];
                      const newSkill = editValues.newSkill.trim();
                      if (!currentSkills.includes(newSkill)) {
                        setEditValues({
                          ...editValues, 
                          Skills: [...currentSkills, newSkill],
                          newSkill:''
                        });
                      }
                    }
                  }}
                  className="w-32  p-4 h-12 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all flex items-center gap-2 font-medium shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                 <div className='flex justify-center items-center w-full '>
                     
                  Ajouter
                 </div>
                </button>
              </div>
        
              {/* Current skills display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Compétences actuelles</label>
                {editValues.Skills && editValues.Skills.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {editValues.Skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-xl group hover:from-orange-100 hover:to-amber-100 transition-all"
                      >
                        <span className="text-gray-800 font-medium">{skill}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedSkills = editValues.Skills.filter((_, i) => i !== index);
                            setEditValues({...editValues, Skills: updatedSkills});
                          }}
                          className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                          title="Supprimer cette compétence"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <Star className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Aucune compétence ajoutée</p>
                  </div>
                )}
              </div>
            </div>
          );
      case 'salary':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salaire minimum (€)</label>
              <input
                type="number"
                value={editValues.salaryExpectationMinimum || ''}
                onChange={(e) => setEditValues({...editValues, salaryExpectationMinimum: parseInt(e.target.value)})}
                className={`${validationErrors.salaryExpectationMinimum ? "border-red-400 "  : "border-gray-200"} w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              />
              {renderError('salaryExpectationMinimum')}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salaire maximum (€)</label>
              <input
                type="number"
                value={editValues.salaryExpectationMaximum || ''}
                onChange={(e) => setEditValues({...editValues, salaryExpectationMaximum: parseInt(e.target.value)})}
                className={`${validationErrors.salaryExpectationMaximum ? "border-red-400" : "border-gray-200"} w-full px-4 py-3 border  rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}/>
              {renderError('salaryExpectationMaximum')}
            </div>
          </div>
        );

      case 'location':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Région</label>
            <select
              value={editValues.location || ''}
              onChange={(e) => setEditValues({...editValues, location: e.target.value})}
              className={`${validationErrors.location ? "border-red-400" : "border-gray-200"} w-full px-4 py-3 border  rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
            >
              <option value="">Sélectionner une région</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
           {renderError('location')} 
          </div>
        );

      case 'candidateType':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de candidat</label>
            <select
              value={editValues.candidateType || ''}
              onChange={(e) => setEditValues({...editValues, candidateType: e.target.value})}
              className={`${validationErrors.candidateType ? "border-red-400" : "border-gray-400"} w-full px-4 py-3 border  rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
            >
              <option value="">Sélectionner un type</option>
              {candidateTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {renderError('candidateType')}
          </div>
        );

      case 'preferredContractType':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de contrat</label>
            <select
              value={editValues.preferredContractType || ''}
              onChange={(e) => setEditValues({...editValues, preferredContractType: e.target.value})}
              className={`${validationErrors.preferredContractType ? "border-red-400"  : "border-gray-400"} w-full px-4 py-3 border  rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}>
              <option value="">Sélectionner un type de contrat</option>
              {contractTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {renderError('preferredContractType')}
          </div>
        );

      case 'addExperience':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Poste</label>
              <input
                type="text"
                value={editValues.position || ''}
                onChange={(e) => setEditValues({...editValues, position: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
              <input
                type="text"
                value={editValues.company || ''}
                onChange={(e) => setEditValues({...editValues, company: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
                <input
                  type="month"
                  value={editValues.startDate || ''}
                  onChange={(e) => setEditValues({...editValues, startDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                <input
                  type="month"
                  value={editValues.endDate || ''}
                  onChange={(e) => setEditValues({...editValues, endDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={editValues.description || ''}
                onChange={(e) => setEditValues({...editValues, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {editingField.charAt(0).toUpperCase() + editingField.slice(1)}
            </label>
            <input
              type="text"
              value={editValues[editingField] || ''}
              onChange={(e) => setEditValues({...editValues, [editingField]: e.target.value})}
              className={`${validationErrors[editingField] ? "border-red-400" : "border-gray-400"} w-full px-4 py-3 border  rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}/>
            {renderError([editingField])}
          </div>
        );
    }
  };

  export default renderEditModal;
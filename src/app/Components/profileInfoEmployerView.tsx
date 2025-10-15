import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit, 
  Mail, 
  Building, 
  Briefcase, 
  MessageCircle, 
  UserPlus, 
  UserCheck,
  Camera,
  Save,
  X,
  AlertCircle,
  Clock as WaitingIcon,
  CheckCircle as AcceptedIcon,
  XCircle as RejectedIcon,
  TrendingUp as RateIcon,
  InfoIcon as AboutIcon,
  Globe as WebsiteIcon,
  Info,
} from 'lucide-react';

import { z } from 'zod';
import RenderJobsTab from './RenderJobsTabs';
import useProfile from '../Hooks/useProfile';
import useJobs from '../Hooks/useJobs';
import { Profile } from '../interfaces/profileinterface';
import { Job } from '../interfaces/JobInterfaces';
import { aboutUsSchema, companyNameSchema, companyWebsite, locationSchema, nameSchema } from '../DTOs/profileInfoEmployerViewDTO';
import { useSelector } from 'react-redux';


const EditModal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-white rounded-xl p-6 md:p-8 w-full max-w-lg shadow-2xl" 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6 border-b pb-3">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);


interface localDataInterface extends Profile,Job {

}
export interface EmployerProfileProps{
    data:localDataInterface,
    isOwnerProp:boolean,
    isFollowed:boolean,
    onFollow:(id:string,isFollowed:boolean)=>void;
    onMessage:()=>void;
    onUpdate:()=>void;
    userId:string
}

const EmployerProfile=({ data, isOwnerProp, isFollowed, onFollow, onMessage, onUpdate,userId }:EmployerProfileProps) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editingField, setEditingField] = useState('');
  const [editValues, setEditValues] = useState<any>({});
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [originalValues, setOriginalValues] = useState({});
  const [isOwner,setIsOwner]=useState<boolean>(isOwnerProp)
  const [isVisible, setIsVisible] = useState(false);
  const selector = useSelector((state:any) => state.user);
  const [cursor, setCursor] = useState<string | null>(null);
  const [excludeDocIds, setExcludeDocIds] = useState<string[] | []>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const {updateProfileInfoEmployer} = useProfile()
  const {fetchCreatorJobs} = useJobs()
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore,setHasMore]=useState<boolean>(true)
  const locations = [
    "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne", "Centre-Val de Loire",
    "Corse", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandie",
    "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur (PACA)",
    "Guadeloupe", "Guyane", "La Réunion", "Martinique", "Mayotte"
  ];

  const getSchema = (field) => {
    switch (field) {
      case 'companyName': return companyNameSchema;
      case 'name': return nameSchema;
      case 'location': return locationSchema;
      case 'aboutCompany': return aboutUsSchema;
      case "companyWebsite": return companyWebsite;
      default: return z.object({});
    }
  };
const getAcceptanceRate = (approvalCount, acceptedCount, rejectedCount) => {
  const totalCount = acceptedCount + rejectedCount;
  if (totalCount === 0) return 0;
  return (acceptedCount / totalCount) * 100;
};

  const openEditModal = (field) => {
    setEditingField(field);
    setValidationErrors({});
    
    let values = {};
    if (field === "name") {
      values = { firstName: data.firstName, lastName: data.lastName };
    } else {
      values = { [field]: data[field] };
    }
    setEditValues(values);
    setOriginalValues(values);
    
    setEditModalOpen(true);
  };

  const validateField = (field, values) => {
    try {
        getSchema(field).parse(values);
        
        if (field === 'location' && !locations.includes(values.location)) {
          return { location: "Please select a valid location" };
        }

        const newErrors = {};
        Object.keys(values).forEach(key => {
            if (values[key] === originalValues[key]) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} must be different from the current value`;
            }
        });
        if (Object.keys(newErrors).length > 0) return newErrors;

      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = {};
        error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        return errors;
      }
      return {};
    }
  };

  const handleInputChange = (field, value) => {
    const newValues = { ...editValues, [field]: value };
    setEditValues(newValues);
    
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Existing handleSave, NOT CHANGED
  const handleSave = async() => {
    const response = await updateProfileInfoEmployer({validateField,editingField,editValues,setValidationErrors,data,setIsVisible,onUpdate,setEditModalOpen})
    
  };

  const renderError = (field) => {
    if (validationErrors[field]) {
      return (
        <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{validationErrors[field]}</span>
        </div>
      );
    }
    return null;
  };

  const hasErrors = Object.keys(validationErrors).length > 0;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building },
    { id: 'jobs', label: 'Posted Jobs', icon: Briefcase }
  ];

  // Existing fetchingJobs, NOT CHANGED
  const fetchingJobs = async(cursor,excludeDocIds)=>{
  await  fetchCreatorJobs({creatorId:userId,cursor,prevDocuments:excludeDocIds,setJobs,setCursor,setExcludeDocIds,setHasMore,setLoading})
  }

  useEffect(()=>{
    if(activeTab=="jobs" && jobs.length==0){
      fetchingJobs(null,[])
    }
  },[activeTab]) 
  

  useEffect(()=>{
    if(selector.isUserLoggedIn && data._id==selector.userId){
      setIsOwner(true);
    }else{
      setIsOwner(false);
    }
  },[selector.isUserLoggedIn])

  const profileData = { ...data };

  const StatCard = ({ icon: Icon, title, value, colorClass }) => (
    <motion.div
      className="p-5 bg-white rounded-xl flex flex-col items-start shadow-md transition duration-300 hover:shadow-lg border-t-2 border-orange-500/0 hover:border-orange-500/50"
      whileHover={{ y: -2 }}
    >
      <div className={`p-2 rounded-lg mb-3 ${colorClass.replace('text', 'bg')} bg-opacity-10`}>
        <Icon className={`w-5 h-5 ${colorClass}`} />
      </div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">{title}</p>
      <p className={`text-2xl font-semibold text-gray-800`}>{value}</p>
    </motion.div>
  );

  // --- Render Overview Tab (Modern, Balanced Layout) ---
  const renderDetailsTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
    >
      {/* Left Column (2/3 width): About Us & Details */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* About Us Card */}
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-t-4 border-orange-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-800 flex items-center gap-2">
              <AboutIcon className="w-5 h-5 text-orange-500" />
              Company Overview
            </h2>
            {isOwner && (
              <button
                onClick={() => openEditModal('aboutCompany')}
                className="text-gray-400 hover:text-orange-600 transition-colors p-1 rounded-full hover:bg-orange-50"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-gray-600 w-[90%] text-black break-words text-base ">
            {profileData?.aboutCompany || "No description provided."}
          </p>
        </section>

        {/* Contact & Location Card (Single Card, 2 Columns internally) */}
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-t-4 border-orange-500">
          <h3 className="text-xl font-medium text-gray-800 mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-orange-500" />
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            
            {/* Contact Person */}
            
            <div className="flex justify-between items-center group">
              <div>
                <p className="text-sm text-gray-500">Representative</p>
                <p className="text-base text-gray-800 font-medium">{profileData.firstName} {profileData.lastName}</p>
              </div>
              {isOwner && (
                <button
                  onClick={() => openEditModal('name')}
                  className="text-gray-400 group-hover:text-orange-500 transition-colors p-1 rounded-full"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Headquarters Location */}
            <div className="flex justify-between items-center group">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base text-gray-800 font-medium">{profileData.location}</p>
              </div>
              {isOwner && (
                <button
                  onClick={() => openEditModal('location')}
                  className="text-gray-400 group-hover:text-orange-500 transition-colors p-1 rounded-full"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              
            </div>
           
           
                
            {/* Email */}
            <div className='col-span-1 '>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base text-gray-800 flex items-center gap-2">
                <Mail className='w-4 h-4 text-orange-400'/>
                {profileData.email}
              </p>
            </div>
            
            {/* Website */}
            <div className='flex justify-between'>
              <div>
              <p className="text-sm text-gray-500">Website</p>
              <a href={profileData?.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-base text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-2">
                <WebsiteIcon className='w-4 h-4 text-orange-500'/>
                {profileData?.companyWebsite ? new URL(profileData?.companyWebsite).hostname : 'N/A'}
              </a>
              </div>
              {isOwner && (
              <button
                onClick={() => openEditModal('companyWebsite')}
                className="text-gray-400 hover:text-orange-600 transition-colors p-1 rounded-full hover:bg-orange-50"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            </div>
{/* 
           <div className='flex justify-between'>
              <div>
              <p className="text-sm text-gray-500">Founding Year</p>
              <a href={profileData?.foundedYear} target="_blank" rel="noopener noreferrer" className="text-base text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-2">
                <File className='w-4 h-4 text-orange-500'/>
                {profileData?.foundedYear ? profileData.foundedYear : 'Not Specificed'}
              </a>
              </div>
              {isOwner && (
              <button
                onClick={() => openEditModal('foundedYear')}
                className="text-gray-400 hover:text-orange-600 transition-colors p-1 rounded-full hover:bg-orange-50"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            </div> 
            
            
           <div>
              <p className="text-sm text-gray-500">Company Size</p>
              <a href={profileData?.companySize} target="_blank" rel="noopener noreferrer" className="text-base text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-2">
                <UserIcon className='w-4 h-4 text-orange-500'/>
                {profileData?.companySize ? profileData.companySize : 'Not Specificed'}
              </a>
            </div> 
             */}

          </div>
        </section>
      </div>

      {/* Right Column (1/3 width): KPIs */}
      <div className="lg:col-span-1 space-y-6">
        <h2 className="text-xl font-medium text-gray-800 mb-2">Proposal Metrics</h2>
        <div className="space-y-4">
          <StatCard
            icon={WaitingIcon}
            title="Waiting For Approval"
            value={profileData.proposalWaitingForApprovalCount}
            colorClass="text-blue-600"
          />
          <StatCard
            icon={AcceptedIcon}
            title="Proposals Accepted"
            value={profileData.proposalAcceptedCount}
            colorClass="text-green-600"
          />
          <StatCard
            icon={RejectedIcon}
            title="Proposals Rejected"
            value={profileData.proposalRejectedCount}
            colorClass="text-red-600"
          />
          <StatCard
            icon={RateIcon}
            title="Acceptance Rate"
            value={`${getAcceptanceRate(0,profileData.proposalAcceptedCount,profileData.proposalRejectedCount)}%`}
            colorClass="text-orange-600"
          />
        </div>
      </div>
    </motion.div>
  );


  return (
    <div className="h-[100%] bg-gray-50">
   
      <div className="bg-white h-[100%] shadow-md border-b border-orange-100">
        <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            
            {/* Company Logo and Edit Button: Aligned with text block */}
            <div className="relative flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-orange-100 flex items-center justify-center border-4 border-white shadow-lg"
              >
                <Building className="w-14 h-14 text-orange-500" />
              </motion.div>
              {isOwner && (
                <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg border border-gray-200 text-orange-500 hover:bg-orange-100 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Basic Info & Actions: Cleanly Stacked */}
            <div className="flex-1 pt-0 md:pt-2 text-center md:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                
                {/* Name and Handle */}
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                      {profileData.companyName}
                    </h1>
                    {isOwner && (
                      <button
                        onClick={() => openEditModal('companyName')}
                        className="text-gray-400 hover:text-orange-600 transition-colors p-1 rounded-full hover:bg-orange-50"
                        title="Edit Company Name"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-base text-orange-600 font-medium mb-4">@{profileData.username}</p>
                </div>

                {/* Action Buttons */}
                {!isOwner && (
                  <div className="flex gap-3 justify-center md:justify-end flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { onFollow(profileData._id, isFollowed) }}
                      className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm shadow-md transition-colors ${
                        isFollowed
                          ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                          : 'bg-orange-500 text-white hover:bg-orange-600'
                      }`}
                    >
                      {isFollowed ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                      {isFollowed ? 'Following' : 'Follow'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onMessage}
                      className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition-colors shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-base transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'jobs' ? (
              <RenderJobsTab 
                isOwner={isOwner} 
                cursor={cursor} 
                excludeDocIds={excludeDocIds} 
                jobs={jobs} 
                hasMore={hasMore} 
                loading={loading} 
                fetchingJobs={fetchingJobs} 
              />
            ) : activeTab === "overview" ? (
              renderDetailsTab()
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Edit Modal (Logic Kept as is) */}
      <EditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setValidationErrors({});
        }}
        title={`Edit ${editingField === 'name' ? 'Contact Name' : editingField === 'aboutCompany' ? 'About Us' : editingField == "foundedYear" ? "Founded Year"  : editingField=="companyWebsite" ? "Company Website" : editingField.charAt(0).toUpperCase() + editingField.slice(1)}`}
      >
        <div className="space-y-5">
          {/* Company Name Edit */}
          {editingField === 'companyName' && (
            <div>
              <label className="block text-black text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={editValues.companyName || ''}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  validationErrors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {renderError('companyName')}
            </div>
          )}
          
          {editingField === 'companyWebsite' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
              <input
                type="text"
                value={editValues.companyWebsite || ''}
                onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                className={`w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  validationErrors.companyWebsite ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {renderError('companyWebsite')}
            </div>
          )}
{/*           
          {editingField === 'foundedYear' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Founded Year</label>
              <input
                type="text"
                value={editValues.foundedYear || ''}
                onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  validationErrors.companyWebsite ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {renderError('foundedYear')}
            </div>
          )}
           */}

          {/* Name Edit */}
          {editingField === 'name' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={editValues.firstName || ''}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    validationErrors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {renderError('firstName')}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={editValues.lastName || ''}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    validationErrors.lastName ? 'text-red border-red-500' : 'border-gray-300'
                  }`}
                />
                {renderError('lastName')}
              </div>
            </>
          )}
          
          {/* Location Edit */}
          {editingField === 'location' && (
            <div>
              <label className="block  text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={editValues.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white ${
                  validationErrors.location ? 'text-red border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {renderError('location')}
            </div>
          )}

          {/* About Us Edit (New Field) */}
          {editingField === 'aboutCompany' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company About Us</label>
              <textarea
                value={editValues.aboutCompany || ''}
                onChange={(e) => handleInputChange('aboutCompany', e.target.value)}
                rows={5}
                className={`w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
                  validationErrors.aboutCompany ? 'text-red border-red-500' : 'border-gray-300'
                }`}
                placeholder="Share your company's mission, values, and culture with potential candidates..."
              />
              {renderError('aboutCompany')}
            </div>
          )}
          
          <div className="flex gap-4 pt-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={hasErrors}
              className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                hasErrors
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md'
              }`}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </motion.button>
            <button
              onClick={() => {
                setEditModalOpen(false);
                setValidationErrors({});
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </EditModal>
    </div>
  );
};
export default EmployerProfile;
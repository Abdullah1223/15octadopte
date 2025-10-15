import React, { useState, SetStateAction, Dispatch, useEffect } from "react";
// import { motion } from 'framer-motion';
import {
  Edit,
  MapPin,
  Mail,
  User,
  Building,
  Briefcase,
  DollarSign,
  Clock,
  FileText,
  MessageCircle,
  UserPlus,
  UserCheck,
  Camera,
  Save,
  X,
  Plus,
  Eye,
  Star,
  Award,
  Calendar,
  AlertCircle,
  Upload,
} from "lucide-react";
// import Navbar from '@/app/Components/Navbar';
import { useParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Toast from "./Toast";
import z from "zod";
import useProfile from "../Hooks/useProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  CandidateProfileInterface,
  Profile,
} from "../interfaces/profileinterface";
import { Job } from "../interfaces/JobInterfaces";
import ExperienceCard from "./CandidateProfileExperienceCard";
import renderEditModal from "./RenderEditModalCandidate";
import openEditModalCandidate from "./CandidateOpenEditModal";
import { fileInfo } from "../interfaces/candidateInterface";
import {
  handleFile,
  validateFieldCandidate,
} from "../Utils/CandidateProfileUtils";
import { EditModalCandidate } from "./CandidateEditModal";
import { getCvProfileInfoCall } from "../Services/cv.service";
import useCv from "../Hooks/useCv";

// Mock data for demonstration

const locations = [
  "Auvergne-Rhône-Alpes",
  "Bourgogne-Franche-Comté",
  "Bretagne",
  "Centre-Val de Loire",
  "Corse",
  "Grand Est",
  "Hauts-de-France",
  "Île-de-France",
  "Normandie",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Pays de la Loire",
  "Provence-Alpes-Côte d'Azur (PACA)",
  "Guadeloupe",
  "Guyane",
  "La Réunion",
  "Martinique",
  "Mayotte",
];

const candidateTypes = [
  "Coiffeur",
  "Coiffeur Mixte",
  "Coiffeur Femme",
  "Coloriste",
  "Coiffeur Homme",
  "Coiffeur Enfant",
  "Styliste",
  "Technicien",
  "Apprenti",
  "Alternant",
];

const contractTypes = ["CDD", "CDI", "Freelance", "PartTime"];

const tabs = [
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "cv", label: "CV", icon: FileText },
];

export interface localDataInterface
  extends Profile,
    CandidateProfileInterface {}
export interface candidateProfileProps {
  data: localDataInterface;
  isOwnerProp: boolean;
  isFollowed: boolean;
  onFollow: (id: string, isFollowed: boolean) => void;
  onMessage: () => void;
  onUpdate: (updates:any) => void;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}
export default function CandidateProfile({
  data,
  isOwnerProp,
  isFollowed,
  onFollow,
  onMessage,
  onUpdate,
  isVisible,
  setIsVisible,
}: candidateProfileProps) {
  // console.log('Candidate Profile')
 
  const [activeTab, setActiveTab] = useState<string>("experience");
  const selector = useSelector((state:any) => state.user);
  //  let isOwner = isOwnerProp && data._id==selector.userId ? true : false ;
  const [isOwner,setIsOwner] = useState<boolean>(isOwnerProp)
   const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editingField, setEditingField] = useState<string>("");
  const [editValues, setEditValues] = useState<any>({});
  const [orginalValues, setOrginalValues] = useState<any>({});
  const [experiences, setExperiences] = useState<any>(data.experience || []);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [showCV, setShowCV] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState("");
  const {getCvProfileInfo}=useCv()
  const [fileInfo, setFileInfo] = useState<fileInfo>({
    name: "",
    type: "",
    size: 0,
  });
  const [toastType, setToastType] = useState("");
  const { updateCandidateProfilePicture, updateCandidateProfile } =
    useProfile();
  const dispatch = useDispatch();

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

  useEffect(()=>{
    if(selector.isUserLoggedIn && data._id==selector.userId){
      setIsOwner(true);
    }else{
      setIsOwner(false);
    }
  },[selector.isUserLoggedIn])

  const openEditModal = (field) => {
    openEditModalCandidate({
      field,
      data,
      setEditingField,
      setOrginalValues,
      setEditValues,
      setEditModalOpen,
    });
  };

  const handleSave = async () => {
    const errors = validateFieldCandidate({
      field: editingField,
      values: editValues,
      orginalValues,
      locations,
      candidateTypes,
      contractTypes,
    });
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    if (editingField == "profilePicture") {
      await updateCandidateProfilePicture({
        fileInfo,
        file: editValues.profilePicture,
        setEditValues,
        editValues,
        onUpdate,
        dispatch,
      });
      return;
    }
    await updateCandidateProfile({
      data: data,
      editingField,
      editValues,
      experiences,
      onUpdate,
      setEditModalOpen,
      setExperiences,
      setIsVisible,
      setValidationErrors,
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Header Section */}
      <Toast
        message={toastMessage}
        isVisible={isVisible}
        type={`${toastType}`}
        onClose={() => setIsVisible(false)}
      ></Toast>
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Picture */}
            <div className="relative">
              <div
                // whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center relative shadow-lg"
              >
                {data.profilePicture.url ? (
                  <img
                    src={data.profilePicture.url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-orange-600" />
                )}
                {isOwner && (
                  <button
                    // whileHover={{ scale: 1.1 }}
                    // whileTap={{ scale: 0.9 }}
                    onClick={() => openEditModal("profilePicture")}
                    className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {data.firstName} {data.lastName}
                    </h1>
                    {isOwner && (
                      <button
                        // whileHover={{ scale: 1.1 }}
                        // whileTap={{ scale: 0.9 }}
                        onClick={() => openEditModal("name")}
                        className="text-orange-500 hover:text-orange-600 transition-colors p-1"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <p className="text-lg text-orange-600 font-medium mb-3">
                    @{data.username}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Briefcase className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="font-medium">{data.Specialization}</span>
                      {isOwner && (
                        <button
                          onClick={() => openEditModal("Specialization")}
                          className="text-orange-500 hover:text-orange-600 transition-colors p-1"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <MapPin className="w-4 h-4 text-orange-600" />
                      </div>
                      <span>{data.location}</span>
                      {isOwner && (
                        <button
                          onClick={() => openEditModal("location")}
                          className="text-orange-500 hover:text-orange-600 transition-colors p-1"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Mail className="w-4 h-4 text-orange-600" />
                      </div>
                      <span>{data.email}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {!isOwner && (
                  <div className="flex gap-3">
                    <button
                      // whileHover={{ scale: 1.05 }}
                      // whileTap={{ scale: 0.95 }}
                      onClick={() => onFollow(data._id, isFollowed)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg ${
                        isFollowed
                          ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
                          : "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
                      }`}
                    >
                      {isFollowed ? (
                        <UserCheck className="w-4 h-4" />
                      ) : (
                        <UserPlus className="w-4 h-4" />
                      )}
                      {isFollowed ? "Suivi" : "Suivre"}
                    </button>
                    <button
                      // whileHover={{ scale: 1.05 }}
                      // whileTap={{ scale: 0.95 }}
                      onClick={onMessage}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition-all shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-1 space-y-6">
            <div
              // initial={{ opacity: 0, y: 20 }}
              // animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-orange-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-600" />
                Détails
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold text-gray-900">
                      {data.candidateType}
                    </p>
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => openEditModal("candidateType")}
                      className="text-orange-500 hover:text-orange-600 p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-600">Ville</p>
                    <p className="font-semibold text-gray-900">{data.City}</p>
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => openEditModal("City")}
                      className="text-orange-500 hover:text-orange-600 p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-600">Type de contrat</p>
                    <p className="font-semibold text-gray-900">
                      {data.preferredContractType}
                    </p>
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => openEditModal("preferredContractType")}
                      className="text-orange-500 hover:text-orange-600 p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-600">
                      Fourchette salariale
                    </p>
                    <p className="font-semibold text-gray-900">
                      €{data.salaryExpectationMinimum} - €
                      {data.salaryExpectationMaximum}
                    </p>
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => openEditModal("salary")}
                      className="text-orange-500 hover:text-orange-600 p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div
              // initial={{ opacity: 0, y: 20 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-orange-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-orange-600" />
                  Compétences
                </h3>
                {isOwner && (
                  <button
                    onClick={() => openEditModal("Skills")}
                    className="text-orange-500 hover:text-orange-600 p-1"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {data.Skills?.map((skill, index) => (
                  <span
                    key={index}
                    // initial={{ opacity: 0, scale: 0.8 }}
                    // animate={{ opacity: 1, scale: 1 }}
                    // transition={{ delay: index * 0.1 }}
                    className="px-3 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-xl text-sm font-medium border border-orange-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-6 border border-orange-100">
              <div className="flex border-b border-orange-100">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 font-medium transition-all rounded-t-2xl ${
                      activeTab === tab.id
                        ? "text-orange-600 bg-orange-50 border-b-2 border-orange-500"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <div
                  key={activeTab}
                  // initial={{ opacity: 0, y: 20 }}
                  // animate={{ opacity: 1, y: 0 }}
                  // transition={{ duration: 0.3 }}
                >
                  {activeTab === "experience" && (
                    <div>
                      {experiences.length > 0 ? (
                        <div className="space-y-4">
                          {experiences.map((exp, index) => (
                            <ExperienceCard
                              onDelete={() => {
                                console.log("Deleted");
                              }}
                              key={exp.id || index}
                              experience={exp}
                              isOwner={isOwner}
                              onEdit={(exp) => {
                                setEditingField("editExperience");
                                setEditValues(exp);
                                setEditModalOpen(true);
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-10 h-10 text-orange-400" />
                          </div>
                          <p className="text-gray-500 mb-4">
                            Aucune expérience ajoutée
                          </p>
                        </div>
                      )}

                      {isOwner && (
                        <button
                          // whileHover={{ scale: 1.02 }}
                          // whileTap={{ scale: 0.98 }}
                          onClick={() => openEditModal("addExperience")}
                          className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
                        >
                          <Plus className="w-5 h-5" />
                          Ajouter une expérience
                        </button>
                      )}
                    </div>
                  )}

                  {activeTab === "cv" && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-10 h-10 text-orange-400" />
                      </div>
                      <p className="text-gray-500 mb-6">CV non téléchargé</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        {/* {isOwner && (
                          <button
                            // whileHover={{ scale: 1.05 }}
                            // whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
                          >
                            <FileText className="w-4 h-4" />
                            Télécharger CV
                          </button>
                        )} */}
                        <button
                          // whileHover={{ scale: 1.05 }}
                          // whileTap={{ scale: 0.95 }}
                           onClick={() => getCvProfileInfo({ candidateId: data._id,data:data,onUpdate:onUpdate })}
                          // onClick={() => setShowCV(true)}
                          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-orange-500 text-orange-600 rounded-xl font-medium hover:bg-orange-50 transition-all shadow-lg"
                        >
                          <Eye
                           
                            className="w-4 h-4"
                          />
                          Voir CV
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModalCandidate
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={
          editingField === "addExperience"
            ? "Ajouter une expérience"
            : `Modifier ${editingField}`
        }
      >
        {renderEditModal({
          editingField,
          setEditValues,
          editValues,
          renderError,
          validationErrors,
          fileInfo,
          setFileInfo,
          locations,
          candidateTypes,
          contractTypes,
          profilePicture: data.profilePicture.url,
        })}
        <div className="flex gap-3 pt-6">
          <button
            // whileHover={{ scale: 1.02 }}
            // whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2 font-medium shadow-lg"
          >
            <Save className="w-4 h-4" />
            Sauvegarder
          </button>
          <button
            // whileHover={{ scale: 1.02 }}
            // whileTap={{ scale: 0.98 }}
            onClick={() => setEditModalOpen(false)}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-all font-medium"
          >
            Annuler
          </button>
        </div>
      </EditModalCandidate>

      {/* CV Modal */}
      <AnimatePresence>
        {showCV && (
          <div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCV(false)}
          >
            <div
              // initial={{ scale: 0.9, opacity: 0 }}
              // animate={{ scale: 1, opacity: 1 }}
              // exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  CV de {data.firstName} {data.lastName}
                </h3>
                <button
                  onClick={() => setShowCV(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-gray-100 rounded-xl p-8 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aperçu du CV sera affiché ici</p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

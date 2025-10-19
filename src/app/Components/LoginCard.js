'use client'
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { Upload, File, ChevronDown, CircleUser, BriefcaseBusiness, User, UserIcon, MapPin, Phone, Scissors, LogIn, AlertCircle } from "lucide-react";
import Uploadfilecomponent from "./uploadfilecomponent";
import { useParams,  useSearchParams } from "next/navigation";

import { useTranslation } from "../Context/TranslationContext.";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import OtpVerification from "./OtpVerificationForm";
import ForgotPasswordForm from "./forgetPassword";
import OtpForm from "./signUpOtpVerificationForm";
import { useRouter } from "next/navigation";
import { checkingUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { socketConnectivity } from "../store/socketSlice";
import { io } from "socket.io-client";
import { useSocket } from "../Context/socketContext";
import { toast } from "sonner";

const LoginCard = () => {
  const { translate, setLanguage, language } = useTranslation();
  const searchParams = useSearchParams();
  const value = searchParams.get('value');
  const dispatch = useDispatch()
  const router = useRouter()
  const [isSignup, setIsSignup] = useState(false);
  const [file, setFile] = useState(null);
  const [isDropdown, setIsDropdown] = useState(false);
  const [isRegionDropdown, setIsRegionDropdown] = useState(false);
  const [isCandidateTypeDropdown, setIsCandidateTypeDropdown] = useState(false);
  const [listVal, setListVal] = useState('Candidate');
  const [selectedRegion, setSelectedRegion] = useState(translate('select_region'));
  const candidatetype = translate('select_candidate_type');
  const [selectedCandidateType, setSelectedCandidateType] = useState(candidatetype);
  const [apiErrors, setApiErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpVerification,setIsOtpVerification]=useState(false)
  const [isForgetPassword,setIsForgetPassword]=useState(false)
  const [isSignUpOtpVerification,setIsSignUpOtpVerification]=useState(false)
  const [emailVerification,setEmailVerification]=useState('')
  const [showPassword,setShowPassword]=useState(true)
  const {connectSocket}=useSocket()
  const selector = useSelector((state)=>state.socket)
  const loginSchema = z.object({
    email: z.string().email({ message: translate("L'adresse e-mail est requise") }),
    password: z.string().min(1, { message: translate('Le mot de passe est requis.') }),
  });
  
  // Login form
  const { 
    register: registerLogin, 
    handleSubmit: handleLoginSubmit, 
    formState: {  errors:loginErrors }, 
    setError:setErrors,
    setValue:setLoginValue
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });
  
  // Login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });


  // Common form schema
  const commonSchema = z.object({
    firstName: z.string().min(1, { message: translate('Veuillez entrer votre prénom') }),
    lastName: z.string().min(1, { message: translate('Veuillez entrer votre nom de famille') }),
    email: z.string().email({ message: translate('Veuillez entrer une adresse e-mail valide') }),
    telephoneNumber: z.string().min(1, { message: translate('Veuillez entrer un numéro de téléphone') }),
    region: z.string().min(1, { message: translate('Veuillez entrer votre région') }),
    password: z.string()
      .min(8, { message: translate('La longueur minimale du mot de passe est de 8 caractères') })
      .regex(/[A-Z]/, { message: translate('Le mot de passe doit contenir une lettre majuscule') })
      .regex(/[a-z]/, { message: translate('Le mot de passe doit contenir une lettre minuscule') })
      .regex(/[0-9]/, { message: translate('Le mot de passe doit contenir un chiffre') })
      .regex(/[^A-Za-z0-9]/, { message: translate("Le mot de passe doit contenir un caractère spécial") }),
  });

  // Conditional schema based on user type
  const candidateSchema = commonSchema.extend({
    candidateType: z.string().min(1, { message: translate('Veuillez entrer le type de candidat') }),
    hasCv: z.boolean().refine(val => val === true, { 
      message: translate('Veuillez entrer le CV') 
    }),
    hasProfilePic: z.boolean().refine(val => val === true, { 
      message: translate('Veuillez entrer la photo de profil.') 
    }),
    preferredContractType: z.enum(['Part-time', 'Freelance', 'CDD', 'CDI'], { message: translate('Veuillez sélectionner le type de contrat préféré') }),
    expectedSalaryMin: z.string().min(1, { message: translate('Veuillez entrer le salaire minimum attendu') }),
    expectedSalaryMax: z.string().min(1, { message: translate('Veuillez entrer le salaire maximum attendu') }),
    preferredCity: z.string().min(1, { message: translate('Veuillez entrer la ville préférée') }),
    yearsOfExperience: z.string().min(1, { message: translate('Veuillez entrer les années d\'expérience') }),
    specialization: z.string().min(1, { message: translate('Veuillez entrer la spécialisation') }),
    skills: z.array(z.string()).min(1, { message: translate('Veuillez ajouter au moins une compétence') }),
  });

  const employerSchema = commonSchema.extend({
    companyName: z.string().min(1, { message: translate("Le nom de l'entreprise est requis") }),
    siretNum: z.string()
      .length(14, { message: translate('Le numéro SIRET doit comporter 14 chiffres') })
      .regex(/^\d+$/, { message: translate('Le numéro SIRET doit être constitué uniquement de chiffres') }),
    username: z.string().min(1, { message: translate("Le nom d'utilisateur est requis") }),
    hasKibsDocument: z.boolean().refine(val => val === true, { 
      message: translate('Le document KIBS est requis') 
    }),
  });

  // Initialize form with react-hook-form
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue, 
    watch,
    setError,
    clearErrors
  } = useForm({
    resolver: zodResolver(listVal === 'Candidate' ? candidateSchema : employerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      telephoneNumber: '',
      region: '',
      password: '',
      candidateType: '',
      companyName: '',
      siretNum: '',
      username: '',
      hasCv: false,
      hasProfilePic: false,
      hasKibsDocument: false,
    }
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: "",
    telephoneNumber: "",
    region: "",
    password: '',
    username:'',
  });

  const [candidateData, setcandidateData] = useState({
    candidateType: '',
    cvFileName: '',
    cvFileType: '',
    cvFileSize: '',
    profilePhotoFileName: '',
    profilePhotoFileType: '',
    profilePhotoFileSize: '',
    preferredContractType: '',
    expectedSalaryMin: '',
    expectedSalaryMax: '',
    preferredCity: '',
    yearsOfExperience: '',
    specialization: '',
    skills: [],
  });
  
  const [employeeData, setemployeeData] = useState({
    companyName: "",
    siretNum: '',
    kibsDocumentFileName: '',
    kibsDocumentFileSize: '',
    kibsDocumentFileType: '',
  });
  
  const [candidateCvFile, setcandidateCvFile] = useState();
  const [candidateProfilePic, setcandidateProfilePic] = useState();
  const [employerKibsDocument, setEmployerKibsDocument] = useState();
  
  const regions = [
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
    "Mayotte"
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
    "Alternant"
  ];

  useEffect(() => {
    if (value) {
      setListVal(value);
    }
  }, [value]);
  
  useEffect(() => {
    // Reset errors when switching between candidate and employer forms
    setApiErrors({});
  }, [listVal]);

  const handleDropdown = () => {
    if (listVal == 'Employer') {
      setListVal('Candidate');
      setIsDropdown(false);
    } else {
      setListVal('Employer');
      setIsDropdown(false);
    }
  };
  
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setIsRegionDropdown(false);
    setValue('region', region, { shouldValidate: true });
    
    setFormData((prev) => ({
      ...prev,
      region: region
    }));
  };
  
  const handleCandidateTypeSelect = (type) => {
    setSelectedCandidateType(type);
    setIsCandidateTypeDropdown(false);
    setValue('candidateType', type, { shouldValidate: true });
    
    setcandidateData((prev) => ({
      ...prev,
      candidateType: type
    }));
  };
  
  const handleCvFileChange = (fileData) => {
    if (fileData) {
      setcandidateCvFile(fileData.file);
      setValue('hasCv', true, { shouldValidate: true });
      clearErrors('hasCv');
      setcandidateData(prev => ({
        ...prev,
        cvFileName: fileData.fileName,
        cvFileType: fileData.fileType,
        cvFileSize: fileData.fileSize,
      }));
    } else {
      setcandidateCvFile(null);
      setValue('hasCv', false, { shouldValidate: true });
      setcandidateData(prev => ({
        ...prev,
        cvFileName: '',
        cvFileType: '',
        cvFileSize: '',
      }));
    }
  };

  const handleProfilePicChange = (fileData) => {
    if (fileData) {
      setcandidateProfilePic(fileData.file);
      setValue('hasProfilePic', true, { shouldValidate: true });
      clearErrors('hasProfilePic');
      setcandidateData(prev => ({
        ...prev,
        profilePhotoFileName: fileData.fileName,
        profilePhotoFileType: fileData.fileType,
        profilePhotoFileSize: fileData.fileSize,
      }));
    } else {
      setcandidateProfilePic(null);
      setValue('hasProfilePic', false, { shouldValidate: true });
      setcandidateData(prev => ({
        ...prev,
        profilePhotoFileName: '',
        profilePhotoFileType: '',
        profilePhotoFileSize: '',
      }));
    }
  };

  const handleKibsDocumentChange = (fileData) => {
    if (fileData) {
      setEmployerKibsDocument(fileData.file);
      setValue('hasKibsDocument', true, { shouldValidate: true });
      clearErrors('hasKibsDocument');
      setemployeeData(prev => ({
        ...prev,
        kibsDocumentFileName: fileData.fileName,
        kibsDocumentFileType: fileData.fileType,
        kibsDocumentFileSize: fileData.fileSize,
      }));
    } else {
      setEmployerKibsDocument(null);
      setValue('hasKibsDocument', false, { shouldValidate: true });
      setemployeeData(prev => ({
        ...prev,
        kibsDocumentFileName: '',
        kibsDocumentFileType: '',
        kibsDocumentFileSize: '',
      }));
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiErrors({});
    
    try {
      let submitData;
      if (listVal === 'Candidate') {
        submitData = {
          formData,
          specificData: candidateData,
          type: listVal 
        };
      } else { 
        submitData = {
          formData,
          specificData: employeeData,
          type: listVal 
        };
      }
      
      const response = await fetch('https://adopte.gotdns.ch/api1/SignUp', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(submitData),
        credentials:"include"
      });

      const result = await response.json();
      console.log(response.status)
      console.log(result)
      if (response.status !== 200) {
        // Handle API validation errors
        if (result.errors) {
          const apiErrorFields = result.errors;
          setApiErrors(apiErrorFields);
          
              if(result.errorType=="verify"){
                Object.keys(apiErrorFields).forEach(field => {
                  setError(field, {
                    type: 'server',
                    message:    <>
                {apiErrorFields[field]} <a className="text-blue-800 underline text-[1rem]" href="/verifyUser">Verify</a>
              </>
                  });
                });      
              }else{
                Object.keys(apiErrorFields).forEach(field => {
                  setError(field, {
                    type: 'server',
                    message: apiErrorFields[field]
                  });
                  toast.error(result.errors[field]) 
                });
               
              }

          // Set react-hook-form errors based on API response
          
        }
        return;
      }
      
      // Handle file uploads if signup was successful
      setEmailVerification(result.email)
      try {
        if (listVal === 'Candidate') {
          const uploadResults = [];
          
          // Upload profile picture (first URL)
          if (candidateProfilePic && result.preSignedUrls?.[0]) {
            const profilePicResponse = await fetch(result.preSignedUrls[0], {
              headers: {
                "Content-Type": candidateProfilePic.type,
              },
              body: candidateProfilePic, 
              method: "PUT"
            });
            
            if (!profilePicResponse.ok) {
              throw new Error('Profile picture upload failed');
            }
            uploadResults.push({ type: 'profilePic', success: true });
          }
      
          // Upload CV (second URL)
          if (candidateCvFile && result.preSignedUrls?.[1]) {
            const cvResponse = await fetch(result.preSignedUrls[1], {
              headers: {
                "Content-Type": candidateCvFile.type,
              },
              body: candidateCvFile, 
              method: "PUT"
            });
            
            if (!cvResponse.ok) {
              throw new Error('CV upload failed');
            }
            uploadResults.push({ type: 'cv', success: true });
          }
      
          // Check if all required uploads succeeded
          const requiredUploads = candidateProfilePic ? (candidateCvFile ? 2 : 1) : 0;
          if (uploadResults.length < requiredUploads) {
            throw new Error('Some uploads failed or were missing');
          }
      
          // If we get here, all uploads succeeded
          console.log('All candidate uploads successful', uploadResults);
          // Proceed with your success logic here
      
        } else if (listVal === 'Employer') {
          if (employerKibsDocument && result.preSignedUrls?.[0]) {
            const kibsResponse = await fetch(result.preSignedUrls[0], {
              headers: {
                "Content-Type": employerKibsDocument.type,
              },
              body: employerKibsDocument, 
              method: "PUT"
            });
            
            if (!kibsResponse.ok) {
              throw new Error('KIBS document upload failed');
            }
            
            console.log('Employer upload successful');
            // Proceed with your success logic here
          }
        }
      } catch (error) {
        console.error('Upload failed:', error);
        // Handle the error (show message to user, retry logic, etc.)
        // You might want to return or set some state here
        throw error; // Re-throw if you want calling code to handle it
      }
      
      // Handle successful signup
    
      setIsSignup(false); // Redirect to login
      setIsSignUpOtpVerification(true)   
    } catch (error) {
      console.error("Error during signup:", error);
      setApiErrors({
        general: translate('signup_failed')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form field changes
  const handleFormChange = (e, field) => {
    const value = e.target.value;
    setValue(field, value, { shouldValidate: true });
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleEmployeeDataChange = (e, field) => {
    const value = e.target.value;
    setValue(field, value, { shouldValidate: true });
    
    setemployeeData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleLoginChange = (e, field) => {
    const value = e.target.value;
    setLoginValue(field, value, { shouldValidate: true });
    
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle login form submission
  const onLoginSubmit = async (data) => {
    //setIsLoggingIn(true);
    setApiErrors({});
    console.log('login hit')
   const datatoSend = {
    loginData
   }
    try {
      const response = await fetch('https://adopte.gotdns.ch/api1/login', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        credentials:'include',
        body: JSON.stringify(datatoSend)
      });
     console.log('response' , response)
      const result = await response.json();
      
      if (response.status !== 200) {
        // Handle login errors
    
        const apiErrorFields = result.errors;
        setApiErrors(apiErrorFields);
          
          // Set react-hook-form errors based on API response
          Object.keys(apiErrorFields).forEach(field => {
            if(result.errorType=="verify"){
              
              setErrors(field, {
                type: 'server',
                message:    <>
                {apiErrorFields[field]} <a className="text-blue-800 underline text-[1rem]" href="verifyUser">Verify</a>
              </>
              });
            }else{
              
              setErrors(field, {
                type: 'server',
                message: apiErrorFields[field]
              });
            }
           toast.error(result.errors[field]) 
          });
        //  toast.error(result?.errors?.general || result.errors.email) 
        return;
      }
      
      // Handle successful login
      const data = {
        status:200,
        userDetails:result
      }
      router.push('/Dashboard',{shallow:true})
      connectSocket()
      dispatch(checkingUser(data))
               
      // Add code to redirect user or update app state
      
    } catch (error) {
      console.log('error',error)
      // connectSocket()
      console.error("Error during login:", error);
      setApiErrors({
        loginError: translate('login_failed')
      });
    } finally {
     // setIsLoggingIn(false);
    }
  };

  // Error display component
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    
    return (
      <div className="flex items-center text-red-500 text-xs mt-1">
        <AlertCircle size={12} className="mr-1" />
        <span>{error.message}</span>
      </div>
    );
  };
  
  // Candidate extra field handlers
  const handleCandidateDataChange = (e, field) => {
    const value = e.target.value;
    setValue(field, value, { shouldValidate: true });
    setcandidateData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Skills array handlers
  const [skillInput, setSkillInput] = useState('');
  const handleSkillAdd = () => {
    if (skillInput.trim()) {
      setcandidateData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skillInput.trim()]
      }));
      setValue('skills', [...(candidateData.skills || []), skillInput.trim()], { shouldValidate: true });
      setSkillInput('');
      clearErrors('skills');
    }
  };
  const handleSkillRemove = (skillToRemove) => {
    const newSkills = (candidateData.skills || []).filter(skill => skill !== skillToRemove);
    setcandidateData(prev => ({
      ...prev,
      skills: newSkills
    }));
    setValue('skills', newSkills, { shouldValidate: true });
  };
  
  return (
   isSignUpOtpVerification?
   <div className="flex justify-center items-center px-4 py-4  w-full "><OtpForm
   email={emailVerification}
   onSuccess={(result)=>{
    setIsSignup(false)
    setIsSignUpOtpVerification(false)
   }}
   onClose={(result)=>{
    setIsSignup(false)
    setIsSignUpOtpVerification(false)
   }}
   >

   </OtpForm></div>
   :
   isForgetPassword?<ForgotPasswordForm
   onSuccess={()=>{
    setIsSignup(false)
    setIsForgetPassword(false)
   }}
   ></ForgotPasswordForm>
   :isOtpVerification ? <OtpVerification
    email={"abdullahjava212@gmail.com"}
    >

    </OtpVerification> 
    : isSignup ? (
      <div className={`flex lg:absolute shadow-xl top-16 lg:left-[61%] xl:left-[64%] bg-white border    p-4 sm:p-9 lg:p-6 xl:p-9 rounded-xl`}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start w-full">
          <h1 className="font-extrabold text-gray-400 text-3xl">{translate('sign_up')}</h1>
          
          {/* API general error */}
          {apiErrors.general && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
              <span className="block sm:inline">{apiErrors.general}</span>
            </div>
          )}
          
          {/* Name fields - Desktop */}
          <div className="hidden lg:flex gap-4 items-center relative"> 
          <div className="flex flex-col">  
          <div className="relative w-[10rem] xl:w-[12rem]">
              <Image className="absolute bottom-[28%] ml-2 translate-y-1/2" src={"/user (1).png"} width={15} height={15} alt="Email name" />
              <input 
                {...register('firstName')}
                onChange={(e) => handleFormChange(e, 'firstName')}
                type="text" 
                placeholder={translate('name')} 
                className={`h-11 w-full px-8 border-black mt-10 border box-border rounded-md ${errors.firstName ? 'border-red-500' : ''}`}
              />
            </div>
            <ErrorMessage error={errors.firstName} />
            </div>
           <div>
            <div className="relative w-[10rem] xl:w-[12rem]">
              <Image className="absolute bottom-[28%] ml-2 translate-y-1/2" src={"/user (1).png"} width={15} height={15} alt="Email name" />
              <input
                {...register('lastName')}
                onChange={(e) => handleFormChange(e, 'lastName')}
                type="text" 
                placeholder={translate('last_name')} 
                className={`h-11 w-full px-8 border-black mt-10 border box-border rounded-md ${errors.lastName ? 'border-red-500' : ''}`}
              />
              
            </div>
            <ErrorMessage error={errors.lastName} />
            </div>
          </div>

          {/* Name fields - Mobile */}
          <div className="flex lg:hidden flex-col w-full">
            <div className="relative">
              <Image className="absolute bottom-[50%] ml-2 translate-y-1/2" src={"/user (1).png"} width={15} height={15} alt="Email name" />
              <input
                {...register('firstName')}
                onChange={(e) => handleFormChange(e, 'firstName')}
                type="text" 
                placeholder={translate('name')} 
                className={`h-11 w-full px-8 border-black mt-6 border box-border rounded-md ${errors.firstName ? 'border-red-500' : ''}`}
              />
              <ErrorMessage error={errors.firstName} />
            </div>
            
            <div className="relative mt-2">
              <Image className="absolute bottom-[50%] ml-2 translate-y-1/2" src={"/user (1).png"} width={15} height={15} alt="Email name" />
              <input
                {...register('lastName')}
                onChange={(e) => handleFormChange(e, 'lastName')}
                type="text" 
                placeholder={translate('last_name')} 
                className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.lastName ? 'border-red-500' : ''}`}
              />
              <ErrorMessage error={errors.lastName} />
            </div>
          </div>
          
          {/* Email */}
          <div className="flex items-center relative w-full mt-4"> 
            <Image className="absolute bottom-[50%] ml-2 translate-y-1/2" src={"/user (1).png"} width={15} height={15} alt="Email name" />
            <input
              {...register('email')}
              onChange={(e) => handleFormChange(e, 'email')}
              type="email" 
              placeholder={translate('enter_email')} 
              className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.email || apiErrors.email ? 'border-red-500' : ''}`}
            />
          </div>
          <ErrorMessage error={errors.email } />
            
          {/* Telephone */}
          <div className="flex items-center relative w-full mt-4"> 
            <Phone className="absolute bottom-[50%] ml-2 translate-y-1/2 text-gray-600" size={15} />
            <input 
              {...register('telephoneNumber')}
              onChange={(e) => handleFormChange(e, 'telephoneNumber')}
              type="tel" 
              placeholder={translate('enter_telephone')} 
              className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.telephoneNumber ? 'border-red-500' : ''}`}
            />
          </div>
          <ErrorMessage error={errors.telephoneNumber} />
            
          {/* Region Dropdown */}
          <div className="flex items-center relative group w-full mt-4">
            <div className={`flex px-4 py-2 mt-2 rounded-lg h-12 items-center justify-between w-full border ${errors.region ? 'border-red-500' : 'border-gray-300'} hover:border-gray-400 focus-within:border-[#ff7300] transition-all duration-200 shadow-sm hover:shadow-md`}>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-gray-600" />
                <h1 className="font-semibold text-gray-700 truncate">{selectedRegion}</h1>
              </div>
              <ChevronDown 
                onClick={() => setIsRegionDropdown(!isRegionDropdown)}
                className={`text-gray-500 transform transition-transform duration-200 ${isRegionDropdown ? 'rotate-180' : ''}`}
              />
            </div>
            <input type="hidden" {...register('region')} />
            
            {isRegionDropdown && (
              <div className="absolute top-[3.75rem] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-64 mt-1 z-20">
                {regions.map((region, index) => (
                  <div 
                    key={index}
                    onClick={() => handleRegionSelect(region)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#fff5e6] cursor-pointer transition-colors duration-200 group/item"
                    role="button"
                    tabIndex={0}
                  >
                    <MapPin size={18} className="text-gray-600 group-hover/item:text-[#ff7300]" />
                    <span className="text-gray-700 group-hover/item:text-[#ff7300] font-medium">{region}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <ErrorMessage error={errors.region} />

          {/* Username */}
          <div className="flex items-center relative w-full mt-4"> 
            <Image className="absolute bottom-[50%] ml-2 translate-y-1/2" src={"/user (1).png"} width={15} height={15} alt="ID" />
            <input 
              {...register('username')}
              onChange={(e) => handleFormChange(e, 'username')}
              type="text" 
              placeholder={translate('enter_username')} 
              className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.username ? 'border-red-500' : ''}`}
            />
          </div>
          <ErrorMessage error={errors.username} />

          {/* Candidate specific fields */}
          {listVal === 'Candidate' ? (
            <div className="w-full">
              {/* Password field */}
              <div className="flex items-center relative w-full mt-4"> 
                <Image className="absolute bottom-[50%] ml-2 translate-y-1/2" src={"/padlock.png"} width={16} height={16} alt="Email name" />
                <Image
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute bottom-[50%] right-3 translate-y-1/2" src={"/view.png"} width={15} height={15} alt="Email name" />
    
                <input
                  {...register('password')}
                  onChange={(e) => handleFormChange(e, 'password')}
                  type={showPassword ? "password" : "text"} 
                  placeholder={translate('enter_password')} 
                  className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.password ? 'border-red-500' : ''}`}
                />
              </div>
              <ErrorMessage error={errors.password} />
            
              {/* Password strength indicator */}
              {watch('password') && (
                <div className="mt-2 space-y-1">
                  <div className="text-xs font-medium text-gray-600">{translate('password_strength')}</div>
                  <div className="flex gap-1 items-center">
                    <div className={`h-1 flex-1 rounded-full ${watch('password').length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(watch('password')) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${/[a-z]/.test(watch('password')) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${/[0-9]/.test(watch('password')) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${/[^A-Za-z0-9]/.test(watch('password')) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                </div>
              )}
              {/* Preferred Contract Type Dropdown */}
              <div className="flex items-center relative group w-full mt-4">
                <div className={`flex px-4 py-2 mt-2 rounded-lg h-12 items-center justify-between w-full border ${errors.preferredContractType ? 'border-red-500' : 'border-gray-300'} hover:border-gray-400 focus-within:border-[#ff7300] transition-all duration-200 shadow-sm hover:shadow-md`}>
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness size={20} className="text-gray-600" />
                    <h1 className="font-semibold text-gray-700 truncate">{candidateData.preferredContractType || translate('select_contract_type')}</h1>
                  </div>
                  <ChevronDown 
                    onClick={() => setIsCandidateTypeDropdown(!isCandidateTypeDropdown)}
                    className={`text-gray-500 transform transition-transform duration-200 ${isCandidateTypeDropdown ? 'rotate-180' : ''}`}
                  />
                </div>
                <input type="hidden" {...register('preferredContractType')} />
                {isCandidateTypeDropdown && (
                  <div className="absolute top-[3.75rem] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-64 mt-1 z-20">
                    {['Part-time', 'Freelance', 'CDD', 'CDI'].map((type, index) => (
                      <div 
                        key={index}
                        onClick={() => {
                          setcandidateData(prev => ({ ...prev, preferredContractType: type }));
                          setValue('preferredContractType', type, { shouldValidate: true });
                          setIsCandidateTypeDropdown(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#fff5e6] cursor-pointer transition-colors duration-200 group/item"
                        role="button"
                        tabIndex={0}
                      >
                        <BriefcaseBusiness size={18} className="text-gray-600 group-hover/item:text-[#ff7300]" />
                        <span className="text-gray-700 group-hover/item:text-[#ff7300] font-medium">{type}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <ErrorMessage error={errors.preferredContractType} />
              {/* Expected Salary Min */}
              <div className="flex items-center relative w-full mt-4">
                <input
                  {...register('expectedSalaryMin')}
                  onChange={e => handleCandidateDataChange(e, 'expectedSalaryMin')}
                  type="number"
                  placeholder={translate('expected_salary_min')}
                  className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.expectedSalaryMin ? 'border-red-500' : ''}`}
                />
              </div>
              <ErrorMessage error={errors.expectedSalaryMin} />
              {/* Expected Salary Max */}
              <div className="flex items-center relative w-full mt-4">
                <input
                  {...register('expectedSalaryMax')}
                  onChange={e => handleCandidateDataChange(e, 'expectedSalaryMax')}
                  type="number"
                  placeholder={translate('expected_salary_max')}
                  className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.expectedSalaryMax ? 'border-red-500' : ''}`}
                />
              </div>
              <ErrorMessage error={errors.expectedSalaryMax} />
              {/* Preferred City */}
              <div className="flex items-center relative w-full mt-4">
                <input
                  {...register('preferredCity')}
                  onChange={e => handleCandidateDataChange(e, 'preferredCity')}
                  type="text"
                  placeholder={translate('preferred_city')}
                  className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.preferredCity ? 'border-red-500' : ''}`}
                />
              </div>
              <ErrorMessage error={errors.preferredCity} />
              {/* Years of Experience */}
              <div className="flex items-center relative w-full mt-4">
                <input
                  {...register('yearsOfExperience')}
                  onChange={e => handleCandidateDataChange(e, 'yearsOfExperience')}
                  type="text"
                  placeholder={translate('years_of_experience')}
                  className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.yearsOfExperience ? 'border-red-500' : ''}`}
                />
              </div>
              <ErrorMessage error={errors.yearsOfExperience} />
              {/* Specialization */}
              <div className="flex items-center relative w-full mt-4">
                <input
                  {...register('specialization')}
                  onChange={e => handleCandidateDataChange(e, 'specialization')}
                  type="text"
                  placeholder={translate('specialization')}
                  className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.specialization ? 'border-red-500' : ''}`}
                />
              </div>
              <ErrorMessage error={errors.specialization} />
              {/* Skills Array */}
              <div className="w-full mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{translate('skills')}</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={translate('add_skill')}
                  />
                  <button
                    type="button"
                    onClick={handleSkillAdd}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    {translate('add')}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(candidateData.skills || []).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full flex items-center"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleSkillRemove(skill)}
                        className="ml-2 text-orange-700 hover:text-orange-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input type="hidden" {...register('skills')} value={candidateData.skills} />
                <ErrorMessage error={errors.skills} />
              </div>
              {/* Candidate Type Dropdown */}
              <div className="flex items-center relative group w-full mt-4">
                <div className={`flex px-4 py-2 mt-2 rounded-lg h-12 items-center justify-between w-full border ${errors.candidateType ? 'border-red-500' : 'border-gray-300'} hover:border-gray-400 focus-within:border-[#ff7300] transition-all duration-200 shadow-sm hover:shadow-md`}>
                  <div className="flex items-center gap-3">
                    <Scissors size={20} className="text-gray-600" />
                    <h1 className="font-semibold text-gray-700 truncate">{selectedCandidateType}</h1>
                  </div>
                  <ChevronDown 
                    onClick={() => setIsCandidateTypeDropdown(!isCandidateTypeDropdown)}
                    className={`text-gray-500 transform transition-transform duration-200 ${isCandidateTypeDropdown ? 'rotate-180' : ''}`}
                  />
                </div>
                <input type="hidden" {...register('candidateType')} />

                {isCandidateTypeDropdown && (
                  <div className="absolute top-[3.75rem] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-64 mt-1 z-20">
                    {candidateTypes.map((type, index) => (
                      <div 
                        key={index}
                        onClick={() => handleCandidateTypeSelect(type)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#fff5e6] cursor-pointer transition-colors duration-200 group/item"
                        role="button"
                        tabIndex={0}
                      >
                        <Scissors size={18} className="text-gray-600 group-hover/item:text-[#ff7300]" />
                        <span className="text-gray-700 group-hover/item:text-[#ff7300] font-medium">{type}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <ErrorMessage error={errors.candidateType} />
              {/* CV Upload */}
              <div className="mt-4">
                <input type="hidden" {...register('hasCv')} />
                <Uploadfilecomponent 
                  title={translate('upload_cv_login')} 
                  acceptableformats={"Pdf"} 
                  onFileChange={handleCvFileChange}
                  fileType="cv"
                  hasError={!!errors.hasCv}
                />
                <ErrorMessage error={errors.hasCv} />
              </div>
              {/* Profile Picture Upload */}
              <div className="mt-4">
                <input type="hidden" {...register('hasProfilePic')} />
                <Uploadfilecomponent 
                  title={translate('upload_profile_pic')} 
                  acceptableformats={"Png Jpg Jpeg"} 
                  onFileChange={handleProfilePicChange}
                  fileType="profilePic"
                  hasError={!!errors.hasProfilePic}
                />
                <ErrorMessage error={errors.hasProfilePic} />
              </div>
            </div>    
          ) : (
            <div className="w-full">
              {/* Company Name */}
              <div className="flex items-center relative w-full mt-4"> 
                <Image className="absolute bottom-[50%] ml-2 translate-y-1/2" src={"/user (1).png"} width={15} height={15} alt="Company name" />
                <input
                  {...register('companyName')}
                  onChange={(e) => handleEmployeeDataChange(e, 'companyName')}
                  type="text" 
                  placeholder={translate('enter_company_name')} 
                  className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.companyName ? 'border-red-500' : ''}`}
                />
              </div>
              <ErrorMessage error={errors.companyName} />
              
              {/* SIRET Number */}
              <div className="flex items-center relative w-full mt-4"> 
                <Image className="absolute bottom-[50%] ml-2 translate-y-1/2" src={"/user (1).png"} width={15} height={15} alt="SIRET number" />
                <input
                  {...register('siretNum')}
                  onChange={(e) => handleEmployeeDataChange(e, 'siretNum')}
                  type="text" 
                  placeholder={translate('enter_siret_num')} 
                  className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.siretNum ? 'border-red-500' : ''}`}
                  maxLength={14}
                />
              </div>
              <ErrorMessage error={errors.siretNum} />

              {/* ID field */}
             
                
              {/* Password */}
              <div className="flex items-center relative w-full mt-4"> 
                <Image className="absolute bottom-[50%] ml-2 translate-y-1/2" src={"/padlock.png"} width={16} height={16} alt="Password" />
                <Image
                onClick={()=>{setShowPassword(!showPassword)}}
                className="absolute bottom-[50%] right-3 translate-y-1/2" src={"/view.png"} width={15} height={15} alt="View password" />
    
                <input
                  {...register('password')}
                  onChange={(e) => handleFormChange(e, 'password')}
                  type={showPassword ? "password" : "text"}
                  placeholder={translate('enter_password')} 
                  className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${errors.password ? 'border-red-500' : ''}`}
                />
              </div>
              <ErrorMessage error={errors.password} />
              
              {/* Password strength indicator */}
              {watch('password') && (
                <div className="mt-2 space-y-1">
                  <div className="text-xs font-medium text-gray-600">{translate('password_strength')}</div>
                  <div className="flex gap-1 items-center"></div><div className="flex gap-1 items-center">
                    <div className={`h-1 flex-1 rounded-full ${watch('password').length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(watch('password')) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${/[a-z]/.test(watch('password')) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${/[0-9]/.test(watch('password')) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${/[^A-Za-z0-9]/.test(watch('password')) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                </div>
              )}
              
              {/* KIBS Document Upload */}
              <div className="mt-4">
                <input type="hidden" {...register('hasKibsDocument')} />
                <Uploadfilecomponent 
                  title={translate('upload_kibs')} 
                  acceptableformats={"Pdf"} 
                  onFileChange={handleKibsDocumentChange}
                  fileType="kibsDocument"
                  hasError={!!errors.hasKibsDocument}
                />
                <ErrorMessage error={errors.hasKibsDocument} />
              </div>
            </div>
          )}

          {/* Account Type Selector */}
          <div className="flex items-center relative group w-full mt-6">
            <div className="flex px-4 py-2 rounded-lg h-12 items-center justify-between w-full border border-gray-300 hover:border-gray-400 focus-within:border-[#ff7300] transition-all duration-200 shadow-sm hover:shadow-md">
              <div className="flex items-center gap-3">
                {listVal === 'Candidate' ? (
                  <CircleUser size={20} className="text-gray-600" />
                ) : (
                  <BriefcaseBusiness size={20} className="text-gray-600" />
                )}
                <h1 className="font-semibold text-gray-700">
                  {listVal === 'Candidate' ? translate('i_am_a_candidate') : translate('i_am_a_employer')}
                </h1>
              </div>
              <ChevronDown 
                onClick={() => setIsDropdown(!isDropdown)}
                className={`text-gray-500 transform transition-transform duration-200 ${isDropdown ? 'rotate-180' : ''}`}
              />
            </div>

            {isDropdown && (
              <div className="absolute top-[3.75rem] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mt-1 z-20">
                <div 
                  onClick={() => handleDropdown()}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#fff5e6] cursor-pointer transition-colors duration-200 group/item"
                  role="button"
                  tabIndex={0}
                >
                  {listVal === 'Candidate' ? (
                    <BriefcaseBusiness size={18} className="text-gray-600 group-hover/item:text-[#ff7300]" />
                  ) : (
                    <UserIcon size={18} className="text-gray-600 group-hover/item:text-[#ff7300]" />
                  )}
                  <span className="text-gray-700 group-hover/item:text-[#ff7300] font-medium">
                    {listVal === 'Candidate' ? translate('i_am_a_employer') : translate('i_am_a_candidate')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Login Link */}
          <p onClick={() => setIsSignup(false)} className="self-center text-black mt-5">
            {translate('already_have_account')} <span className="text-[#ff7300] cursor-pointer hover:underline">{translate('login')}</span>
          </p>
          
          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="self-center mt-5 h-10 text-white font-bold w-44 rounded-lg bg-[#ff3700] hover:bg-[#e63200] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? translate('signing_up') : translate('sign_up')}
          </button>
        </form>
      </div>
    ) : (
      <div className="flex lg:absolute shadow-xl top-16 lg:left-[61%] xl:left-[64%] bg-white border h-96 sm:h-[90%] p-4 sm:p-9 rounded-xl">
      <form className="flex flex-col items-start" onSubmit={handleLoginSubmit(onLoginSubmit)}>
        <h1 className="font-extrabold text-gray-400 text-3xl">{translate('login')}</h1>
        
        <div className="flex items-center relative w-full"> 
          <Image className="absolute bottom-[17%] ml-2" src="/user (1).png" width={15} height={15} alt="Email icon" />
          <input 
            type="email" 
            
            {...registerLogin('email')}
            onChange={(e) => handleLoginChange(e, 'email')}
            placeholder={translate('enter_email')} 
            className="h-11 w-full px-8 border-black mt-10 border box-border rounded-md" 
                      />
        </div>  
  
        <ErrorMessage error={loginErrors.email}></ErrorMessage> 
        <div className="flex items-center relative w-full"> 
          <Image className="absolute bottom-[20%] ml-2" src="/padlock.png" width={16} height={16} alt="Password icon" />
          <input 
            type={showPassword ? "password" :"text"}
           
            {...registerLogin('password')}
            onChange={(e) => handleLoginChange(e, 'password')}
            placeholder={translate('enter_password')} 
            className="h-11 w-full px-8 border-black mt-8 border box-border rounded-md" 
          
          />
          <div 
            className="absolute bottom-[20%] right-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Image src="/view.png" width={15} height={15} alt="Toggle password visibility" />
          </div>

       
        </div> 
        <ErrorMessage error={loginErrors.password}></ErrorMessage> 
        <div className="w-full gap-2 flex justify-between items-center">
        
          <button 
            type="button"
            onClick={()=>{setIsForgetPassword(true)}} 
            className="mt-2 font-bold hover:text-orange-500 text-black"
          >
            {translate('forget_password')}
          </button> 
          <LogIn className="mt-2" size={20} />
        </div>
        
        <div className="self-center text-black cursor-pointer mt-4">
          {translate('dont_have_account')}
          <span 
            className="text-orange-500 ml-1"
            onClick={() => setIsSignup(true)}
          >
            {translate('sign_up')}
          </span>
        </div>   
        
        <button 
  type="submit" 
  className="w-44 h-10 self-center mt-6 bg-orange-500 text-white rounded-lg disabled:bg-orange-300"
  
>
  { translate('login')}
</button>
      </form>
    </div>
    )
    
  );
};

export default function LoginCardWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginCard />
    </Suspense>
  );
}


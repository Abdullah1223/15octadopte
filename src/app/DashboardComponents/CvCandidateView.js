// 'use client';
// import { Briefcase, FileText, Upload } from "lucide-react";

// const { useState } = require("react");
// const { useTranslation } = require("../Context/TranslationContext.");

// const CandidateView = () => {
//     const [activeTab, setActiveTab] = useState('upload');
//     const { translate, setLanguage, language } = useTranslation();
  
//     return (
//       <div>
//         <div className="pb-5 border-b border-gray-200">
//           <h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-2xl lg:text-3xl">
//             {translate('cv_management_&_job_matching')}
//           </h2>
//           <p className="mt-2 max-w-4xl text-sm text-gray-500">
//             {translate('cv_management_subheading')}
//           </p>
//         </div>
  
//         {/* Tabs */}
//         <div className="mt-4">
//           <div className="sm:hidden">
//             <select
//               id="tabs"
//               name="tabs"
//               className="block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
//               value={activeTab}
//               onChange={(e) => setActiveTab(e.target.value)}
//             >
//               <option  value="upload">{translate('upload_cv')}</option>
//               <option value="builder">{translate('cv_builder')}</option>
//               <option value="matching">{translate('job_matching')}</option>
//             </select>
//           </div>
//           <div className="hidden sm:block">
//             <div className="border-b border-gray-200">
//               <nav className="-mb-px flex flex-wrap space-x-2 md:space-x-8" aria-label="Tabs">
//                 <button
//                   onClick={() => setActiveTab('upload')}
//                   className={`${
//                     activeTab === 'upload'
//                       ? 'border-orange-500 text-orange-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
//                 >
//                   <Upload className="mr-2 h-5 w-5" />
//                   {translate('upload_cv')}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('builder')}
//                   className={`${
//                     activeTab === 'builder'
//                       ? 'border-orange-500 text-orange-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
//                 >
//                   <FileText className="mr-2 h-5 w-5" />
//                   {translate('cv_builder')}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('matching')}
//                   className={`${
//                     activeTab === 'matching'
//                       ? 'border-orange-500 text-orange-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
//                 >
//                   <Briefcase className="mr-2 h-5 w-5" />
//                   {translate('job_matching')}
//                 </button>
//               </nav>
//             </div>
//           </div>
//         </div>
  
//         {/* Tab Content */}
//         <div className="mt-6">
//           {activeTab === 'upload' && (
//             <div className="bg-white shadow sm:rounded-lg">
//               <div className="px-4 py-5 sm:p-6">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900">{translate('cv_upload_&_extraction')}</h3>
//                 <div className="mt-2 max-w-xl text-sm text-gray-500">
//                   <p>{translate('cv_upload_&_extraction_subheading')}</p>
//                 </div>
//                 <div className="mt-5">
//                   <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                     <div className="space-y-1 text-center">
//                       <svg
//                         className="mx-auto h-12 w-12 text-gray-400"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 48 48"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <div className="flex flex-col sm:flex-row justify-center text-sm text-gray-600">
//                         <label
//                           htmlFor="file-upload"
//                           className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none"
//                         >
//                           <span>Upload a file</span>
//                           <input id="file-upload" name="file-upload" type="file" className="sr-only" />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                       </div>
//                       <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG up to 10MB</p>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-sm text-gray-500">
//                     By uploading your CV, you agree to our <a href="#" className="font-medium text-orange-600 hover:text-orange-500">Privacy Policy</a>.
//                   </p>
//                   <div className="mt-5">
//                     <button
//                       type="button"
//                       className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
//                     >
//                       <Upload className="mr-2 h-4 w-4" />
//                       Upload CV
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {activeTab === 'builder' && (
//             <div className="bg-white shadow sm:rounded-lg p-6">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">CV Builder</h3>
//               <p className="mt-2 text-sm text-gray-500">Create a professional CV with our easy-to-use builder.</p>
//               {/* CV Builder content would go here */}
//             </div>
//           )}
          
//           {activeTab === 'matching' && (
//             <div className="bg-white shadow sm:rounded-lg p-6">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">Job Matching</h3>
//               <p className="mt-2 text-sm text-gray-500">Find jobs that match your skills and experience.</p>
//               {/* Job Matching content would go here */}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   export default CandidateView;


'use client';
import { useState } from 'react';
import { Briefcase, FileText, Upload, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { z } from 'zod';
import CVBuilder from './CvBuilder';
import { useDashboard } from '../Hooks/useDashboard';
import useCv from '../Hooks/useCv';

const { useTranslation } = require("../Context/TranslationContext.");

// File validation schema
const fileSchema = z.object({
  name: z.string().min(1, 'File name is required'),
  size: z.number()
    .max(24 * 1024 * 1024, 'File size must be less than 10MB')
    .min(1, 'File cannot be empty'),
  type: z.string().refine(
    (type) => [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg'
    ].includes(type),
    'Only PDF, DOC, DOCX, and JPG files are allowed'
  )
});

const CandidateView = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadState, setUploadState] = useState({
    isUploading: false,
    progress: 0,
    error: null,
    success: false,
    fileName: ''
  });
  const {getUploadCvPresignedUrl} = useCv()
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const { translate, setLanguage, language } = useTranslation();

  // Mock API functions
  const getPresignedUrl = async (fileMetadata) => {
    // Simulate API call delay
    const response = await getUploadCvPresignedUrl({fileMetadata,setUploadState})
    return response;
  };

  const uploadFileToS3 = async (file, uploadUrl, onProgress) => {
    // Simulate file upload with progress
    // return new Promise((resolve, reject) => {
    //   let progress = 0;
    //   const interval = setInterval(() => {
    //     progress += Math.random() * 20;
    //     if (progress >= 100) {
    //       progress = 100;
    //       clearInterval(interval);
    //       onProgress(progress);
    //       setTimeout(() => resolve({ success: true }), 500);
    //     } else {
    //       onProgress(progress);
    //     }
    //   }, 200);
    // });
    const cvResponse = await fetch(uploadUrl, {
      headers: {
        "Content-Type": file.type,
      },
      body: file, 
      method: "PUT"
    });
  };

  const handleFileUpload = async (file) => {
    try {
      // Reset state
      setUploadState({
        isUploading: true,
        progress: 0,
        error: null,
        success: false,
        fileName: file.name
      });

      // Validate file
      const fileData = {
        name: file.name,
        size: file.size,
        type: file.type
      };

      const validation = fileSchema.safeParse(fileData);
      if (!validation.success) {
        const errorMessage = validation.error.errors[0]?.message || 'Invalid file';
        setUploadState(prev => ({
          ...prev,
          isUploading: false,
          error: { general: errorMessage }
        }));
        return;
      }

      // Get presigned URL
      const { uploadUrl, fileId,errors } = await getPresignedUrl(fileData);
    //  console.log('presign error',errors)
      if(uploadUrl==null){
        setUploadState(prev => ({
          ...prev,
          isUploading: false,
          error: { general: errors?.errors?.general || errors.message }
        }));    
      }else{
        await uploadFileToS3(file, uploadUrl, (progress) => {
          setUploadState(prev => ({
            ...prev,
            progress: Math.round(progress)
          }));
        });
  
        // Success
        setUploadState(prev => ({
          ...prev,
          isUploading: false,
          success: true
        }));
        setShowSuccessBar(true);
      }  
      // Upload file
      

    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        error: { general: error.message || 'Upload failed. Please try again.' }
      }));
    }
  };

  const handleFileInput = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const closeSuccessBar = () => {
    setShowSuccessBar(false);
  };

  const resetUpload = () => {
    setUploadState({
      isUploading: false,
      progress: 0,
      error: null,
      success: false,
      fileName: ''
    });
    setShowSuccessBar(false);
    
    // Reset file input
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div>
      {/* Success Bar */}
      {showSuccessBar && (
        <div 
          className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-in slide-in-from-right-5 duration-300"
          style={{
            animation: 'slideInFromRight 0.3s ease-out'
          }}
        >
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">CV uploaded successfully!</span>
          <button
            onClick={closeSuccessBar}
            className="ml-4 text-white hover:text-green-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="pb-5 border-b border-gray-200">
        <h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-2xl lg:text-3xl">
          {translate('cv_management_&_job_matching')}
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          {translate('cv_management_subheading')}
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-4">
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="upload">{translate('upload_cv')}</option>
            <option value="builder">{translate('cv_builder')}</option>
            <option value="matching">{translate('job_matching')}</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap space-x-2 md:space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('upload')}
                className={`${
                  activeTab === 'upload'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Upload className="mr-2 h-5 w-5" />
                {translate('upload_cv')}
              </button>
              <button
                onClick={() => setActiveTab('builder')}
                className={`${
                  activeTab === 'builder'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FileText className="mr-2 h-5 w-5" />
                {translate('cv_builder')}
              </button>
              <button
                onClick={() => setActiveTab('matching')}
                className={`${
                  activeTab === 'matching'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                {translate('job_matching')}
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'upload' && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {translate('cv_upload_&_extraction')}
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>{translate('cv_upload_&_extraction_subheading')}</p>
              </div>

              {/* Error Display */}
              {uploadState.error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <p className="text-sm text-red-800">
                        {uploadState.error.general}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              {uploadState.isUploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Uploading {uploadState.fileName}...</span>
                    <span>{uploadState.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadState.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Upload Area */}
              <div className="mt-5">
                <div 
                  className={`max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${
                    uploadState.isUploading 
                      ? 'border-orange-300 bg-orange-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="space-y-1 text-center">
                    {uploadState.isUploading ? (
                      <Loader2 className="mx-auto h-12 w-12 text-orange-400 animate-spin" />
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="flex flex-col sm:flex-row justify-center text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className={`relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none ${
                          uploadState.isUploading ? 'pointer-events-none opacity-50' : ''
                        }`}
                      >
                        <span>Upload a file</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          className="sr-only" 
                          onChange={handleFileInput}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg"
                          disabled={uploadState.isUploading}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG up to 10MB</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  By uploading your CV, you agree to our{' '}
                  <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                    Privacy Policy
                  </a>.
                </p>

                {/* Action Buttons */}
                <div className="mt-5 flex space-x-3">
                  {!uploadState.success && (
                    <button
                      type="button"
                      onClick={() => document.getElementById('file-upload')?.click()}
                      disabled={uploadState.isUploading}
                      className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none transition-colors ${
                        uploadState.isUploading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {uploadState.isUploading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      {uploadState.isUploading ? 'Uploading...' : 'Upload CV'}
                    </button>
                  )}
                  
                  {(uploadState.success || uploadState.error) && (
                    <button
                      type="button"
                      onClick={resetUpload}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                    >
                      Upload Another
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'builder' && (
          // <div className="bg-white shadow sm:rounded-lg p-6">
          //   <h3 className="text-lg leading-6 font-medium text-gray-900">CV Builder</h3>
          //   <p className="mt-2 text-sm text-gray-500">Create a professional CV with our easy-to-use builder.</p>
            
          // </div>
          <CVBuilder></CVBuilder>
        )}
        
        {activeTab === 'matching' && (
          <div className="bg-white shadow sm:rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Job Matching</h3>
            <p className="mt-2 text-sm text-gray-500">Find jobs that match your skills and experience.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CandidateView;
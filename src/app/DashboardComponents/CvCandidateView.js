import { Briefcase, FileText, Upload } from "lucide-react";

const { useState } = require("react");
const { useTranslation } = require("../Context/TranslationContext.");

const CandidateView = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const { translate, setLanguage, language } = useTranslation();
  
    return (
      <div>
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
              <option  value="upload">{translate('upload_cv')}</option>
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
                <h3 className="text-lg leading-6 font-medium text-gray-900">{translate('cv_upload_&_extraction')}</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>{translate('cv_upload_&_extraction_subheading')}</p>
                </div>
                <div className="mt-5">
                  <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
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
                      <div className="flex flex-col sm:flex-row justify-center text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG up to 10MB</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    By uploading your CV, you agree to our <a href="#" className="font-medium text-orange-600 hover:text-orange-500">Privacy Policy</a>.
                  </p>
                  <div className="mt-5">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload CV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'builder' && (
            <div className="bg-white shadow sm:rounded-lg p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">CV Builder</h3>
              <p className="mt-2 text-sm text-gray-500">Create a professional CV with our easy-to-use builder.</p>
              {/* CV Builder content would go here */}
            </div>
          )}
          
          {activeTab === 'matching' && (
            <div className="bg-white shadow sm:rounded-lg p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Job Matching</h3>
              <p className="mt-2 text-sm text-gray-500">Find jobs that match your skills and experience.</p>
              {/* Job Matching content would go here */}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default CandidateView;
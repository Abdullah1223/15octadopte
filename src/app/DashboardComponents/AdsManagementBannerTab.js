import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Play, 
  Pause, 
  Clock, 
  Target, 
  MapPin, 
  Briefcase, 
  Monitor, 
  AlertCircle, 
  DeleteIcon, 
  Trash, 
  X, 
  Upload, 
  Image as ImageIcon,
  Link,
  Palette,
  TrendingUp,
  MousePointer,
  Globe,
  BarChart3,
  Sparkles
} from 'lucide-react';
import ErrorMessage from './AdsManagementErrorComponent';
import { deleteAd, MultiSelectRegions, toggleAdStatus } from './AdsManagementFunctions';
import BannerAdsComponent from './BannerAdsComponent';

const bannerAdSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  content: z.string()
    .min(1, 'Content is required')
    .min(10, 'Content must be at least 10 characters')
    .max(500, 'Content must be less than 500 characters'),
  backgroundColor: z.string().min(1, 'Background color is required'),
  duration: z.coerce.number()
    .min(1, 'Duration is required')
    .refine(val => !isNaN(val) && val > 0, 'Duration must be a positive number'),
  targetUrl: z.string()
    .min(1, 'Target URL is required')
    .url('Please enter a valid URL'),
  specialization: z.string().min(1, 'Specialization is required'),
  regions: z.array(z.string())
    .min(1, 'At least one region must be selected'),
  placement: z.string().min(1, 'Ad placement is required'),
  fileName: z.string()
    .transform(val => val.trim() === '' ? null : val)
    .nullable()
    .optional(),
  fileSize: z.number()
    .transform(val => val === 0 ? null : val)
    .nullable()
    .optional(),
  fileType: z.string()
    .transform(val => val.trim() === '' ? null : val)
    .nullable()
    .optional(),
});

const AdsManagementBannerTab = ({
  setIsOpen,
  setAmount,
  setDurationType,
  setDuration,
  setClientSecret,
  setIsLoading,
  setIsToastOpen,
  setToastType,
  setToastData,
  bannerAdsProp
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [fileStored, setFileStored] = useState();

  const [bannerAds, setBannerAds] = useState(bannerAdsProp);
  console.log('adsmanagebannertab ' , bannerAds)
  const [backgroundImage, setBackgroundImage] = useState(null);
  const fileInputRef = useRef(null);
  const fileHoldRef = useRef(null);

  const bannerForm = useForm({
    resolver: zodResolver(bannerAdSchema),
    defaultValues: {
      title: '',
      content: '',
      backgroundColor: '#3b82f6',
      duration: 7,
      targetUrl: '',
      specialization: '',
      regions: [],
      placement: '',
      fileName: null,
      fileSize: 0,
      fileType: null,
    }
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    fileHoldRef.current = file;
    setFileStored(file);
    setUploadError(null);
    
    const includeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!includeTypes.includes(file.type)) {
      setUploadError("Only JPG, PNG, and JPEG files are allowed.");
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setUploadError("File size must be less than 5MB.");
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target.result);
        bannerForm.setValue('fileName', file.name);
        bannerForm.setValue('fileType', file.type);
        bannerForm.setValue('fileSize', file.size);
      };
      reader.readAsDataURL(file);
    }
  };

  const createBannerAd = async (data) => {
    setIsLoading(true);
    const tobeSent = {
      ...data,
      isBackgroundImage: backgroundImage == null ? false : true,
    };

    try {
      const response = await fetch('https://adopte.gotdns.ch/api8/ads/create/banner', {
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ data: tobeSent }),
        method: "POST",
        credentials: 'include'
      });

      const result = await response.json();

      if (response.status == 200) {
        if (result.backgroundImage == null) {
          setIsLoading(false);
          setIsToastOpen(true);
          setToastType('success');
          setToastData('Banner ad created successfully!');
          setIsOpen(true);
          setAmount(result.price);
          setDurationType(result.durationType);
          setDuration(result.duration);
          setClientSecret(result.client_secret);
        } else {
          const uploadFileResponse = await fetch(result.backgroundImage, {
            headers: {
              "Content-Type": fileHoldRef.current.type,
            },
            body: fileStored,
            method: "PUT"
          });
          
          if (uploadFileResponse.ok) {
            setIsLoading(false);
            setIsToastOpen(true);
            setToastType('success');
            setToastData('Banner ad created successfully!');
            setIsOpen(true);
            setAmount(result.price);
            setDurationType(result.durationType);
            setDuration(result.duration);
            setClientSecret(result.client_secret);
          }
        }
      } else {
        setIsLoading(false);
        setIsToastOpen(true);
        setToastType('error');
        setToastData('Please enter accurate details');
      }
    } catch (error) {
      setIsLoading(false);
      setIsToastOpen(true);
      setToastType('error');
      setToastData('Server error! Please try again later.');
    }

    bannerForm.reset();
    setBackgroundImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setShowCreateForm(false);
  };

  const BannerPreview = () => {
    const watchedData = bannerForm.watch();
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-lg font-bold text-slate-900">Live Preview</h4>
        </div>
        
        <div className="border-2 border-slate-200 rounded-xl p-4 bg-slate-50">
          <div 
            className="w-full h-32 rounded-xl flex items-center justify-center text-white p-6 shadow-lg relative overflow-hidden"
            style={{
              backgroundColor: backgroundImage ? 'transparent' : watchedData.backgroundColor,
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay for better text readability on images */}
            {backgroundImage && (
              <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
            )}
            
            <div className="text-center relative z-10">
              <h3 className="font-bold text-xl mb-2 drop-shadow-sm">
                {watchedData.title || 'Your Banner Title'}
              </h3>
              <p className="text-sm opacity-95 leading-relaxed drop-shadow-sm">
                {watchedData.content || 'Your banner content will appear here with compelling messaging'}
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                {watchedData.placement || 'Ad Placement'}
              </span>
              <span className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                {watchedData.targetUrl ? 'URL configured' : 'No URL set'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Banner Advertisement Management</h2>
          <p className="text-slate-600 text-lg">Create and manage engaging banner campaigns to promote your content</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3"
        >
          <Plus className="w-5 h-5" />
          Create Banner Ad
        </button>
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-8 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Create New Banner Advertisement</h3>
                <p className="text-slate-600">Design a compelling banner to engage your target audience</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowCreateForm(false);
                bannerForm.reset();
                setBackgroundImage(null);
                setUploadError(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={bannerForm.handleSubmit(createBannerAd)} className="space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              {/* Form Fields */}
              <div className="space-y-8">
                {/* Title and Content */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Banner Title *</label>
                    <Controller
                      name="title"
                      control={bannerForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <input
                            {...field}
                            type="text"
                            placeholder="Enter a compelling banner title"
                            className={`w-full p-4 border-2 rounded-xl font-medium transition-all duration-200 bg-white ${
                              fieldState.error 
                                ? 'border-red-300 ring-2 ring-red-100 focus:border-red-400' 
                                : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100'
                            }`}
                          />
                          <ErrorMessage error={fieldState.error} />
                        </>
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Banner Content *</label>
                    <Controller
                      name="content"
                      control={bannerForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <textarea
                            {...field}
                            rows={4}
                            placeholder="Write compelling content that will engage your audience"
                            className={`w-full p-4 border-2 rounded-xl font-medium transition-all duration-200 bg-white resize-none ${
                              fieldState.error 
                                ? 'border-red-300 ring-2 ring-red-100 focus:border-red-400' 
                                : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100'
                            }`}
                          />
                          <div className="flex justify-between text-sm text-slate-500 mt-2 font-medium">
                            <span>{field.value?.length || 0}/500 characters</span>
                          </div>
                          <ErrorMessage error={fieldState.error} />
                        </>
                      )}
                    />
                  </div>
                </div>

                {/* Background Section */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Banner Background</label>
                  <div className="space-y-4">
                    {/* Image Upload */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <ImageIcon className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700">Upload Background Image</span>
                      </div>
                      <div className="relative">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="w-full p-4 border-2 border-dashed border-slate-300 rounded-xl font-medium transition-all duration-200 bg-white hover:border-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-100"
                        />
                        {backgroundImage && (
                          <button
                            type="button"
                            onClick={() => {
                              setBackgroundImage(null);
                              fileInputRef.current.value = null;
                              setUploadError(null);
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <ErrorMessage error={uploadError} />
                      <p className="text-xs text-slate-500 mt-2">Maximum file size: 5MB. Supported formats: JPG, PNG, JPEG</p>
                    </div>

                    {/* Color Picker */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Palette className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700">Or choose a background color</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Controller
                          name="backgroundColor"
                          control={bannerForm.control}
                          render={({ field }) => (
                            <div className="flex items-center gap-3">
                              <input
                                {...field}
                                type="color"
                                className="w-16 h-12 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-colors"
                              />
                              <span className="text-sm font-medium text-slate-700">{field.value}</span>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duration and URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Duration (days) *</label>
                    <Controller
                      name="duration"
                      control={bannerForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <input
                            {...field}
                            type="number"
                            min="1"
                            className={`w-full p-4 border-2 rounded-xl font-medium transition-all duration-200 bg-white ${
                              fieldState.error 
                                ? 'border-red-300 ring-2 ring-red-100 focus:border-red-400' 
                                : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100'
                            }`}
                          />
                          <ErrorMessage error={fieldState.error} />
                        </>
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Target URL *</label>
                    <Controller
                      name="targetUrl"
                      control={bannerForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <input
                            {...field}
                            type="url"
                            placeholder="https://example.com"
                            className={`w-full p-4 border-2 rounded-xl font-medium transition-all duration-200 bg-white ${
                              fieldState.error 
                                ? 'border-red-300 ring-2 ring-red-100 focus:border-red-400' 
                                : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100'
                            }`}
                          />
                          <ErrorMessage error={fieldState.error} />
                        </>
                      )}
                    />
                  </div>
                </div>

                {/* Specialization and Placement */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Target Specialization *</label>
                    <Controller
                      name="specialization"
                      control={bannerForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <select
                            {...field}
                            className={`w-full p-4 border-2 rounded-xl font-medium transition-all duration-200 bg-white ${
                              fieldState.error 
                                ? 'border-red-300 ring-2 ring-red-100 focus:border-red-400' 
                                : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100'
                            }`}
                          >
                            <option value="">Select specialization</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile Development">Mobile Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="DevOps">DevOps</option>
                            <option value="All Users">All Users</option>
                          </select>
                          <ErrorMessage error={fieldState.error} />
                        </>
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Ad Placement *</label>
                    <Controller
                      name="placement"
                      control={bannerForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <select
                            {...field}
                            className={`w-full p-4 border-2 rounded-xl font-medium transition-all duration-200 bg-white ${
                              fieldState.error 
                                ? 'border-red-300 ring-2 ring-red-100 focus:border-red-400' 
                                : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100'
                            }`}
                          >
                            <option value="">Select placement</option>
                            <option value="Top Banner">Top Banner</option>
                            <option value="Middle Banner">Middle Banner</option>
                            <option value="Lower Banner">Lower Banner</option>
                            <option value="Sidebar Banner">Sidebar Banner</option>
                          </select>
                          <ErrorMessage error={fieldState.error} />
                        </>
                      )}
                    />
                  </div>
                </div>

                {/* Target Regions */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Target Regions *</label>
                  <Controller
                    name="regions"
                    control={bannerForm.control}
                    render={({ field, fieldState }) => (
                      <>
                        <MultiSelectRegions
                          value={field.value}
                          onChange={field.onChange}
                          error={fieldState.error}
                          placeholder="Select target regions"
                        />
                        <ErrorMessage error={fieldState.error} />
                      </>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-5 h-5" />
                  Create Banner Advertisement
                </button>
              </div>

              {/* Preview Section */}
              <div className="xl:sticky xl:top-8">
                <BannerPreview />
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Active Banner Ads Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Active Banner Campaigns</h3>
            <p className="text-slate-600">Monitor and manage your banner advertisement performance</p>
          </div>
        </div>

        {bannerAds?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {bannerAds?.map(ad => (
              <BannerAdsComponent ad={ad}></BannerAdsComponent>
              // <div key={ad.id} className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-slate-300 hover:shadow-xl transition-all duration-300">
              //   {/* Header */}
              //   <div className="flex justify-between items-start mb-6">
              //     <div className="flex items-center gap-3">
              //       <div className={`h-3 w-3 rounded-full ${ad.status === 'active' ? 'bg-emerald-500' : 'bg-yellow-500'}`}></div>
              //       <span className={`text-sm font-bold px-3 py-1 rounded-full ${
              //         ad.status === 'active' 
              //           ? 'text-emerald-700 bg-emerald-50' 
              //           : 'text-yellow-700 bg-yellow-50'
              //       }`}>
              //         {ad.status === 'active' ? 'Active Campaign' : 'Paused Campaign'}
              //       </span>
              //     </div>
              //     <div className="flex gap-2">
              //       <button
              //         onClick={() => toggleAdStatus(ad.id, 'banner', setBannerAds)}
              //         className={`p-2 rounded-lg transition-all duration-200 ${
              //           ad.status === 'active' 
              //             ? 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50' 
              //             : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'
              //         }`}
              //       >
              //         {ad.status === 'active' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              //       </button>
              //       <button
              //         onClick={() => deleteAd(ad.id, 'banner', setBannerAds, null)}
              //         className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              //       >
              //         <Trash2 className="w-5 h-5" />
              //       </button>
              //     </div>
              //   </div>

              //   {/* Banner Preview */}
              //   <div 
              //     className="w-full h-28 rounded-xl flex items-center justify-center text-white p-4 mb-6 shadow-lg relative overflow-hidden"
              //     style={{
              //       backgroundColor: ad.backgroundImage ? 'transparent' : ad.backgroundColor,
              //       backgroundImage: ad.backgroundImage ? `url(${ad.backgroundImage})` : 'none',
              //       backgroundSize: 'cover',
              //       backgroundPosition: 'center'
              //     }}
              //   >
              //     {ad.backgroundImage && (
              //       <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
              //     )}
              //     <div className="text-center relative z-10">
              //       <h4 className="font-bold text-lg mb-1 drop-shadow-sm">{ad.title}</h4>
              //       <p className="text-xs opacity-90 leading-relaxed drop-shadow-sm line-clamp-2">{ad.content}</p>
              //     </div>
              //   </div>

              //   {/* Details */}
              //   <div className="space-y-4 mb-6">
              //     <div className="flex items-center gap-3 text-slate-700">
              //       <Target className="w-4 h-4 text-slate-500" />
              //       <span className="font-medium">{ad.specialization}</span>
              //     </div>
                  
              //     <div className="flex items-start gap-3">
              //       <MapPin className="w-4 h-4 text-slate-500 mt-1 flex-shrink-0" />
              //       <div className="flex flex-wrap gap-2">
              //         {ad.regions.map((region) => (
              //           <span key={region} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium border border-slate-200">
              //             {region}
              //           </span>
              //         ))}
              //       </div>
              //     </div>
                  
              //     <div className="flex items-center gap-3 text-slate-700">
              //       <Monitor className="w-4 h-4 text-slate-500" />
              //       <span className="font-medium">{ad.placement}</span>
              //     </div>
                  
              //     <div className="flex items-center gap-3 text-slate-700">
              //       <Clock className="w-4 h-4 text-slate-500" />
              //       <span className="font-medium">{ad.duration}</span>
              //     </div>
                  
              //     <div className="flex items-center gap-3 text-slate-700">
              //       <Link className="w-4 h-4 text-slate-500" />
              //       <a 
              //         href={ad.targetUrl} 
              //         target="_blank" 
              //         rel="noopener noreferrer"
              //         className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200 truncate"
              //       >
              //         {ad.targetUrl}
              //       </a>
              //     </div>
              //   </div>

              //   {/* Performance Metrics */}
              //   <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              //     <div className="flex items-center gap-2 mb-3">
              //       <TrendingUp className="w-4 h-4 text-slate-600" />
              //       <span className="text-sm font-bold text-slate-900">Performance Metrics</span>
              //     </div>
                  
              //     <div className="grid grid-cols-3 gap-4">
              //       <div className="text-center">
              //         <div className="text-xl font-bold text-slate-900">{ad.views.toLocaleString()}</div>
              //         <div className="text-xs text-slate-600 font-medium">Views</div>
              //       </div>
              //       <div className="text-center">
              //         <div className="text-xl font-bold text-slate-900">{ad.clicks.toLocaleString()}</div>
              //         <div className="text-xs text-slate-600 font-medium">Clicks</div>
              //       </div>
              //       <div className="text-center">
              //         <div className="text-xl font-bold text-emerald-600">{ad.ctr}%</div>
              //         <div className="text-xs text-slate-600 font-medium">CTR</div>
              //       </div>
              //     </div>
              //   </div>

              //   {/* Action Buttons */}
              //   <div className="flex gap-3 mt-6">
              //     <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2">
              //       <Edit className="w-4 h-4" />
              //       Edit
              //     </button>
              //     <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2">
              //       <Eye className="w-4 h-4" />
              //       View Details
              //     </button>
              //   </div>
              // </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Banner Ads Yet</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              You haven't created any banner advertisements yet. Create your first banner ad to start promoting your content.
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Create Your First Banner Ad
            </button>
          </div>
        )}
      </div>

      {/* Quick Stats Section */}
      <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Campaign Overview</h3>
            <p className="text-slate-600">Your banner advertising performance at a glance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border-2 border-slate-200 rounded-xl p-6 text-center hover:border-slate-300 transition-colors duration-200">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{bannerAds?.length || 0}</div>
            <div className="text-sm text-slate-600 font-medium">Total Campaigns</div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-xl p-6 text-center hover:border-slate-300 transition-colors duration-200">
            <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Play className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {bannerAds?.filter(ad => ad.Status === 'active')?.length}
            </div>
            <div className="text-sm text-slate-600 font-medium">Active Campaigns</div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-xl p-6 text-center hover:border-slate-300 transition-colors duration-200">
            <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {bannerAds?.reduce((total, ad) => total + ad.Impressions, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-600 font-medium">Total Views</div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-xl p-6 text-center hover:border-slate-300 transition-colors duration-200">
            <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MousePointer className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {bannerAds?.reduce((total, ad) => total + ad.Clicks, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-600 font-medium">Total Clicks</div>
          </div>
        </div>

        {bannerAds?.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-900">Average Performance</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">
                  {Math.round(bannerAds.reduce((total, ad) => total + ad.views, 0) / bannerAds.length).toLocaleString()}
                </div>
                <div className="text-sm text-blue-700 font-medium">Avg Views per Campaign</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">
                  {Math.round(bannerAds.reduce((total, ad) => total + ad.clicks, 0) / bannerAds.length).toLocaleString()}
                </div>
                <div className="text-sm text-blue-700 font-medium">Avg Clicks per Campaign</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">
                  {(bannerAds.reduce((total, ad) => total + ad.ctr, 0) / bannerAds.length).toFixed(1)}%
                </div>
                <div className="text-sm text-blue-700 font-medium">Average CTR</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdsManagementBannerTab;
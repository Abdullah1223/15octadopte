'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Upload } from "lucide-react";

// Form validation schemas
const candidateFileSchema = z.object({
  cv: z.instanceof(FileList).refine((files) => files.length > 0, "CV is required"),
  profilePicture: z.instanceof(FileList).refine((files) => files.length > 0, "Profile picture is required"),
});

const employerFileSchema = z.object({
  kibsDocument: z.instanceof(FileList).refine((files) => files.length > 0, "KIBS document is required"),
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 }
};

const FilesStep = ({ userType, onSubmit, onBack, serverErrors }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});

  // Files form for candidates
  const candidateFilesForm = useForm({
    resolver: zodResolver(candidateFileSchema),
    defaultValues: {
      cv: undefined,
      profilePicture: undefined,
    },
  });

  // Files form for employers
  const employerFilesForm = useForm({
    resolver: zodResolver(employerFileSchema),
    defaultValues: {
      kibsDocument: undefined,
    },
  });

  const handleFileChange = (e, fieldName) => {
    const files = e.target.files;
    if (files.length > 0) {
      setSelectedFiles(prev => ({
        ...prev,
        [fieldName]: files[0].name
      }));
    }
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const success = await onSubmit(data);
      if (!success) {
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="files-step"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Upload Required Documents</h2>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <Upload size={48} className="text-orange-500" />
        </motion.div>

        {userType === "candidate" ? (
          <form onSubmit={candidateFilesForm.handleSubmit(handleSubmit)}>
            <motion.div variants={itemVariants} className="mb-4">
              <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">
                Upload CV
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-orange-500 transition-colors">
                <input
                  type="file"
                  id="cv"
                  {...candidateFilesForm.register("cv")}
                  onChange={(e) => {
                    candidateFilesForm.register("cv").onChange(e);
                    handleFileChange(e, "cv");
                  }}
                  className="hidden"
                />
                <label htmlFor="cv" className="cursor-pointer">
                  {selectedFiles.cv ? 
                    <span className="text-green-500">{selectedFiles.cv}</span> : 
                    <><span className="text-orange-500">Click to upload</span> or drag and drop</>
                  }
                </label>
              </div>
              {candidateFilesForm.formState.errors.cv && (
                <p className="mt-1 text-sm text-red-600">{candidateFilesForm.formState.errors.cv.message}</p>
              )}
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-4">
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
                Upload Profile Picture
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-orange-500 transition-colors">
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  {...candidateFilesForm.register("profilePicture")}
                  onChange={(e) => {
                    candidateFilesForm.register("profilePicture").onChange(e);
                    handleFileChange(e, "profilePicture");
                  }}
                  className="hidden"
                />
                <label htmlFor="profilePicture" className="cursor-pointer">
                  {selectedFiles.profilePicture ? 
                    <span className="text-green-500">{selectedFiles.profilePicture}</span> : 
                    <><span className="text-orange-500">Click to upload</span> or drag and drop</>
                  }
                </label>
              </div>
              {candidateFilesForm.formState.errors.profilePicture && (
                <p className="mt-1 text-sm text-red-600">{candidateFilesForm.formState.errors.profilePicture.message}</p>
              )}
            </motion.div>
            
            {serverErrors?.files && (
              <motion.p variants={itemVariants} className="mt-1 mb-4 text-sm text-red-600">
                {serverErrors.files}
              </motion.p>
            )}
            
            <motion.div variants={itemVariants} className="flex gap-3">
              <button
                type="button"
                onClick={onBack}
                className="w-1/3 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                Continue
              </button>
            </motion.div>
          </form>
        ) : (
          <form onSubmit={employerFilesForm.handleSubmit(handleSubmit)}>
            <motion.div variants={itemVariants} className="mb-4">
              <label htmlFor="kibsDocument" className="block text-sm font-medium text-gray-700 mb-1">
                Upload KIBS Document
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-orange-500 transition-colors">
                <input
                  type="file"
                  id="kibsDocument"
                  {...employerFilesForm.register("kibsDocument")}
                  onChange={(e) => {
                    employerFilesForm.register("kibsDocument").onChange(e);
                    handleFileChange(e, "kibsDocument");
                  }}
                  className="hidden"
                />
                <label htmlFor="kibsDocument" className="cursor-pointer">
                  {selectedFiles.kibsDocument ? 
                    <span className="text-green-500">{selectedFiles.kibsDocument}</span> : 
                    <><span className="text-orange-500">Click to upload</span> or drag and drop</>
                  }
                </label>
              </div>
              {employerFilesForm.formState.errors.kibsDocument && (
                <p className="mt-1 text-sm text-red-600">{employerFilesForm.formState.errors.kibsDocument.message}</p>
              )}
            </motion.div>
            
            {serverErrors?.files && (
              <motion.p variants={itemVariants} className="mt-1 mb-4 text-sm text-red-600">
                {serverErrors.files}
              </motion.p>
            )}
            
            <motion.div variants={itemVariants} className="flex gap-3">
              <button
                type="button"
                onClick={onBack}
                className="w-1/3 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                Continue
              </button>
            </motion.div>
          </form>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FilesStep;
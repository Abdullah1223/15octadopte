'use client'

/**
 * Formats file metadata for backend request
 * @param {Object} files - Object containing FileList objects
 * @returns {Array} Array of file metadata objects
 */
export const formatFileMetadata = (files) => {
  return Object.entries(files).map(([fieldName, fileList]) => {
    const file = fileList[0];
    return {
      fieldName,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    };
  });
};

/**
 * Uploads a single file to S3 using a presigned URL
 * @param {File} file - The file to upload
 * @param {string} presignedUrl - The presigned URL for the upload
 * @returns {Promise} Promise resolving to the upload result
 */
export const uploadFileToS3 = async (file, presignedUrl) => {
  try {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type
      },
      body: file
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    return {
      success: true,
      fileName: file.name,
      fileUrl: presignedUrl.split('?')[0] // Base S3 URL without query parameters
    };
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

/**
 * Uploads multiple files to S3 using presigned URLs
 * @param {Object} files - Object containing FileList objects
 * @param {Object} presignedUrls - Object mapping field names to presigned URLs
 * @returns {Promise} Promise resolving to an object with upload results
 */
export const uploadFilesToS3 = async (files, presignedUrls) => {
  try {
    const uploadPromises = Object.entries(files).map(async ([fieldName, fileList]) => {
      const file = fileList[0];
      console.log(fieldName)
      const presignedUrl = presignedUrls[fieldName];
      
      if (!presignedUrl) {
        throw new Error(`No presigned URL for ${fieldName}`);
      }

      const result = await uploadFileToS3(file, presignedUrl);
      return {
        fieldName,
        ...result
      };
    });

    const results = await Promise.all(uploadPromises);
    
    // Convert results to object format
    const uploadedFilesData = {};
    results.forEach(result => {
      uploadedFilesData[result.fieldName] = result;
    });

    return {
      success: true,
      uploadedFiles: uploadedFilesData
    };
  } catch (error) {
    console.error("Error in batch upload:", error);
    return {
      success: false,
      error: error.message || "Failed to upload files"
    };
  }
};

/**
 * Requests presigned URLs from the backend
 * @param {string} email - User email
 * @param {string} userType - Type of user (candidate or employer)
 * @param {Array} filesMeta - Array of file metadata objects
 * @returns {Promise} Promise resolving to the presigned URLs
 */
export const getPresignedUrls = async (email, userType, filesMeta) => {
  try {
    const response = await fetch('/api/get-upload-urls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email,
        userType,
        files: filesMeta
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to get upload URLs");
    }
    
    return data.presignedUrls;
  } catch (error) {
    console.error("Error getting presigned URLs:", error);
    throw error;
  }
};

/**
 * Confirms file uploads with the backend
 * @param {string} email - User email
 * @param {string} userType - Type of user (candidate or employer)
 * @param {Object} uploadedFiles - Object containing upload results
 * @returns {Promise} Promise resolving to the confirmation result
 */
export const confirmUploads = async (email, userType, uploadedFiles) => {
  try {
    const response = await fetch('/api/confirm-uploads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email,
        userType,
        uploadedFiles: Object.values(uploadedFiles).map(file => ({
          fieldName: file.fieldName,
          fileName: file.fileName,
          fileUrl: file.fileUrl
        }))
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to confirm uploads");
    }
    
    return data;
  } catch (error) {
    console.error("Error confirming uploads:", error);
    throw error;
  }
};
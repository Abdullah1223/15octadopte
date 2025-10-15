// 'use client'
// import { useState } from "react";
// import EmailStep from "../Components/verifyUser/emailStep";
// import FilesStep from "../Components/verifyUser/fileStep";
// import OtpStep from "../Components/verifyUser/otpStep";
// import SuccessStep from "../Components/verifyUser/successStep";
// import { motion } from "framer-motion";
// import { Scissors } from "lucide-react";
// import { 
//   formatFileMetadata, 
//   getPresignedUrls,
//   uploadFilesToS3,
//   confirmUploads
// } from "../Components/verifyUser/s3Function";

// const VerifyUserComponent = () => {
//   const [step, setStep] = useState("email");
//   const [userType, setUserType] = useState(null);
//   const [errorType, setErrorType] = useState(null);
//   const [serverErrors, setServerErrors] = useState({});
//   const [emailAddress, setEmailAddress] = useState("");
//   const [uploadedFiles, setUploadedFiles] = useState({});

//   // Handle email submission
//   const handleEmailSubmit = async (email) => {
//     try {
//       setEmailAddress(email);
      
//       // Call backend API to verify email
//       const response = await fetch('http://localhost:8001/verifyUser-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email })
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.errors.email || "An error occurred");
//       }
      
//       setUserType(data.userType);
//       setErrorType(data.errorType);
      
//       // Determine next step
//       if (data.errorType === "otpnotsent") {
//         setStep("otp");
//       } else if (data.errorType === "filesnotuploaded") {
//         setStep("files");
//       } else {
//         setStep("files");
//       }
//     } catch (error) {
//       setServerErrors({ email: error.message || "An error occurred" });
//       return false;
//     }
//     return true;
//   };

//   // Complete file submission process
//   const handleFilesSubmit = async (files) => {
//     try {
//       // 1. Format file metadata for backend request
//       const filesMeta = formatFileMetadata(files);
//       const response = await fetch(`http://localhost:8001/verifyUser-files`,{
//         headers:{
//           'Content-Type':"application/json"
//         },
//         method:"POST",
//         body:JSON.stringify({filesData:filesMeta,userType,email:emailAddress})
//       }) 
//       const filesDataResult = await response.json()  
//       if (response.status!=200) {
//         console.log(filesDataResult)
//         throw new Error(filesDataResult.errors.general || "Failed to upload files");
//       } 
//       // 2. Get presigned URLs for each file

//       //const presignedUrls = await getPresignedUrls(emailAddress, userType, filesMeta);
//       const presignedUrls = filesDataResult.presignedUrls
//       // 3. Upload files to S3 using presigned URLs
      
//       const uploadResult = await uploadFilesToS3(files, presignedUrls);
//       console.log(uploadResult)
//       if (!uploadResult.success) {
//         console.log(uploadResult)
//         throw new Error(uploadResult.errors.general || "Failed to upload files");
//       }
      
//       // Save uploaded files information
//       if(uploadResult.success==true){
//         setStep("otp");
//       }
      
//       return true;
//     } catch (error) {
//       setServerErrors({ files: error.message || "An error occurred with file upload" });
//       return false;
//     }
//   };

//   // Handle OTP submission
//   const handleOtpSubmit = async (otp) => {
//     try {
//       // Verify OTP with backend
//       const response = await fetch('http://localhost:8001/otpVerification', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           email: emailAddress,
//           code:otp 
//         })
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.errors.general || data.errors.code);
//       }
      
//       setStep("success");
//       return true;
//     } catch (error) {
//       setServerErrors({ otp: error.message || "Invalid OTP" });
//       return false;
//     }
//   };

//   // Handle OTP resend
//   const handleResendOtp = async () => {
//     try {
//       const response = await fetch('/api/resend-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: emailAddress })
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to resend OTP");
//       }
      
//       // Show a temporary success message
//       setServerErrors({ otpResent: "Verification code resent successfully!" });
      
//       // Clear the success message after 3 seconds
//       setTimeout(() => {
//         setServerErrors(prev => {
//           const newErrors = {...prev};
//           delete newErrors.otpResent;
//           return newErrors;
//         });
//       }, 3000);
      
//       return true;
//     } catch (error) {
//       setServerErrors({ otp: error.message || "Failed to resend OTP" });
//       return false;
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-50 to-orange-100">
//       <div className="absolute top-0 left-0 w-full h-full opacity-10">
//         <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
//           <Scissors size={120} className="text-orange-300" />
//         </div>
//         <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
//           <Scissors size={120} className="text-orange-300 rotate-45" />
//         </div>
//       </div>
      
//       <motion.div 
//         className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl relative overflow-hidden"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Orange accent line at top */}
//         <div className="absolute top-0 left-0 right-0 h-2 bg-orange-500"></div>
        
//         {step === "email" && (
//           <EmailStep 
//             onSubmit={handleEmailSubmit}
//             serverErrors={serverErrors}
//           />
//         )}

//         {step === "files" && (
//           <FilesStep 
//             userType={userType}
//             onSubmit={handleFilesSubmit}
//             onBack={() => setStep("email")}
//             serverErrors={serverErrors}
//           />
//         )}

//         {step === "otp" && (
//           <OtpStep 
//             onSubmit={handleOtpSubmit}
//             onBack={() => setStep(errorType === "otpnotsent" ? "email" : "files")}
//             onResend={handleResendOtp}
//             serverErrors={serverErrors}
//           />
//         )}

//         {step === "success" && (
//           <SuccessStep />
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default VerifyUserComponent;
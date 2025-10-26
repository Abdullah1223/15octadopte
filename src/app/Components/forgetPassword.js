'use client'
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "../Context/TranslationContext.";

const ForgotPasswordForm = ({ onSuccess }) => {
  const { translate } = useTranslation();
  const [currentStep, setCurrentStep] = useState("email"); // "email", "verification", or "resetPassword"
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Email form schema
  const emailSchema = z.object({
    email: z.string().email({ message: translate("L'adresse e-mail est requise") }),
  });

  // Verification code schema
  const verificationCodeSchema = z.object({
    code: z.string().min(4, { message: translate("Code de vérification requis") }),
  });

  // Reset password schema
  const resetPasswordSchema = z.object({
    password: z.string()
      .min(8, { message: translate("Le mot de passe doit contenir au moins 8 caractères") })
      .regex(/[A-Z]/, { message: translate("Le mot de passe doit contenir au moins une lettre majuscule") })
      .regex(/[a-z]/, { message: translate("Le mot de passe doit contenir au moins une lettre minuscule") })
      .regex(/[0-9]/, { message: translate("Le mot de passe doit contenir au moins un chiffre") })
      .regex(/[^A-Za-z0-9]/, { message: translate("Le mot de passe doit contenir au moins un caractère spécial") }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: translate("Les mots de passe ne correspondent pas"),
    path: ["confirmPassword"],
  });

  // Email form
  const { 
    register: registerEmail, 
    handleSubmit: handleEmailSubmit, 
    formState: { errors: emailErrors }, 
    setError: setEmailError
  } = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    }
  });

  // Verification form
  const { 
    register: registerVerification, 
    handleSubmit: handleVerificationSubmit, 
    formState: { errors: verificationErrors }, 
    setError: setVerificationError
  } = useForm({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      code: '',
    }
  });

  // Reset password form
  const { 
    register: registerResetPassword, 
    handleSubmit: handleResetPasswordSubmit, 
    formState: { errors: resetPasswordErrors }, 
    setError: setResetPasswordError
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  });

  // Handle sending the code to email
  const onSendCode = async (data) => {
    setIsSubmitting(true);
    setApiErrors({});
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFICATION_SERVICE}/sendResetCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();
      
      if (response.status !== 200) {
        // Handle API errors
        if (result.errors) {
          const apiErrorFields = result.errors;
          setApiErrors(apiErrorFields);
          
          // Set react-hook-form errors based on API response
          Object.keys(apiErrorFields).forEach(field => {
            setEmailError(field, {
              type: 'server',
              message: apiErrorFields[field]
            });
          });
        }
        return;
      }
      
      // Success - show verification form
      setSubmittedEmail(data.email);
      setCurrentStep("verification");
      
    } catch (error) {
      console.error("Error sending reset code:", error);
      setApiErrors({
        general: translate('send_code_failed')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle verifying the code
  const onVerifyCode = async (data) => {
    setIsSubmitting(true);
    setApiErrors({});
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFICATION_SERVICE}/verifyForgetPasswordCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: submittedEmail,
          code: data.code 
        }),
      });

      const result = await response.json();
      
      if (response.status !== 200) {
        // Handle API errors
        if (result.errors) {
          const apiErrorFields = result.errors;
          setApiErrors(apiErrorFields);
          
          // Set react-hook-form errors based on API response
          Object.keys(apiErrorFields).forEach(field => {
            setVerificationError(field, {
              type: 'server',
              message: apiErrorFields[field]
            });
          });
        }
        return;
      }
      
      // Success - store token and show reset password form
      setResetToken(result.token || result.resetToken);
      setCurrentStep("resetPassword");
      
    } catch (error) {
      console.error("Error verifying code:", error);
      setApiErrors({
        general: translate('verify_code_failed')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle password reset submission
  const onResetPassword = async (data) => {
    setIsSubmitting(true);
    setApiErrors({});
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFICATION_SERVICE}/forgetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: submittedEmail,
          token: resetToken,
          password: data.password,
          confirmPassword: data.confirmPassword
        }),
      });

      const result = await response.json();
      
      if (response.status !== 200) {
        // Handle API errors
        if (result.errors) {
          const apiErrorFields = result.errors;
          setApiErrors(apiErrorFields);
          
          // Set react-hook-form errors based on API response
          Object.keys(apiErrorFields).forEach(field => {
            setResetPasswordError(field, {
              type: 'server',
              message: apiErrorFields[field]
            });
          });
        }
        return;
      }
      
      // Success - call the onSuccess callback
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
      
    } catch (error) {
      console.error("Error resetting password:", error);
      setApiErrors({
        general: translate('reset_password_failed')
      });
    } finally {
      setIsSubmitting(false);
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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="lg:absolute top-[55%] left-[65%] flex shadow-xl bg-white border p-4 sm:p-9 rounded-xl w-full max-w-md">
      {currentStep === "email" && (
        <form onSubmit={handleEmailSubmit(onSendCode)} className="flex flex-col items-start w-full">
          <h1 className="font-extrabold text-gray-400 text-3xl">Mot de passe oublié</h1>
          <p className="text-gray-500 mt-2 mb-4">Entrez l'email pour réinitialiser</p>
          
          {/* API general error */}
          {apiErrors.general && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 mb-4">
              <span className="block sm:inline">{apiErrors.general}</span>
            </div>
          )}
          
          {/* Email input */}
          <div className="flex items-center relative w-full"> 
            <Image className="absolute bottom-[50%] ml-2 translate-y-1/2" src={"/user (1).png"} width={15} height={15} alt="Email icon" />
            <input
              {...registerEmail('email')}
              type="email" 
              placeholder={translate('enter_email')} 
              className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${emailErrors.email || apiErrors.email ? 'border-red-500' : ''}`}
            />
          </div>
          <ErrorMessage error={emailErrors.email || (apiErrors.email && { message: apiErrors.email })} />
          
          {/* Submit button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="self-center mt-6 h-10 text-white font-bold w-44 rounded-lg bg-[#ff3700] hover:bg-[#e63200] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Envoi en cours" : "Envoyer le code"}
          </button>
        </form>
      )}

      {currentStep === "verification" && (
        <form onSubmit={handleVerificationSubmit(onVerifyCode)} className="flex flex-col items-start w-full">
          <h1 className="font-extrabold text-gray-400 text-3xl">{translate('verify_code')}</h1>
          <p className="text-gray-500 mt-2 mb-4">
            {translate('code_sent_to')} <span className="font-medium">{submittedEmail}</span>
          </p>
          
          {/* API general error */}
          {apiErrors.general && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 mb-4">
              <span className="block sm:inline">{apiErrors.general}</span>
            </div>
          )}
          
          {/* Verification code input */}
          <div className="flex items-center relative w-full"> 
            <Image className="absolute bottom-[50%] ml-2 translate-y-1/2" src={"/padlock.png"} width={16} height={16} alt="Code icon" />
            <input
              {...registerVerification('code')}
              type="text" 
              placeholder={translate('enter_verification_code')} 
              className={`h-11 w-full px-8 border-black mt-2 border box-border rounded-md ${verificationErrors.code || apiErrors.code ? 'border-red-500' : ''}`}
            />
          </div>
          <ErrorMessage error={verificationErrors.code || (apiErrors.code && { message: apiErrors.code })} />
          
          {/* Resend code button */}
          <button 
            type="button"
            onClick={() => setCurrentStep("email")}
            className="text-[#ff7300] hover:underline self-start mt-2 text-sm font-medium"
          >
            {translate('resend_code')}
          </button>
          
          {/* Submit button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="self-center mt-6 h-10 text-white font-bold w-44 rounded-lg bg-[#ff3700] hover:bg-[#e63200] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? translate('verifying') : translate('verify_code')}
          </button>
        </form>
      )}

      {currentStep === "resetPassword" && (
        <form onSubmit={handleResetPasswordSubmit(onResetPassword)} className="flex flex-col items-start w-full">
          <h1 className="font-extrabold text-gray-400 text-3xl">{translate('reset_password')}</h1>
          <p className="text-gray-500 mt-2 mb-4">
            {translate('create_new_password')}
          </p>
          
          {/* API general error */}
          {apiErrors.general && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 mb-4">
              <span className="block sm:inline">{apiErrors.general}</span>
            </div>
          )}
          
          {/* New Password input */}
          <div className="flex items-center relative w-full mt-2"> 
            <Image className="absolute bottom-[50%] ml-2 translate-y-1/2" src={"/padlock.png"} width={16} height={16} alt="Password icon" />
            <input
              {...registerResetPassword('password')}
              type={showPassword ? "text" : "password"} 
              placeholder={translate('new_password')} 
              className={`h-11 w-full px-8 border-black border box-border rounded-md ${resetPasswordErrors.password || apiErrors.password ? 'border-red-500' : ''}`}
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} className="text-gray-500" /> : <Eye size={18} className="text-gray-500" />}
            </button>
          </div>
          <ErrorMessage error={resetPasswordErrors.password || (apiErrors.password && { message: apiErrors.password })} />
          
          {/* Confirm Password input */}
          <div className="flex items-center relative w-full mt-4"> 
            <Image className="absolute bottom-[50%] ml-2 translate-y-1/2" src={"/padlock.png"} width={16} height={16} alt="Password icon" />
            <input
              {...registerResetPassword('confirmPassword')}
              type={showConfirmPassword ? "text" : "password"} 
              placeholder={translate('confirm_password')} 
              className={`h-11 w-full px-8 border-black border box-border rounded-md ${resetPasswordErrors.confirmPassword || apiErrors.confirmPassword ? 'border-red-500' : ''}`}
            />
            <button 
              type="button" 
              onClick={toggleConfirmPasswordVisibility} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff size={18} className="text-gray-500" /> : <Eye size={18} className="text-gray-500" />}
            </button>
          </div>
          <ErrorMessage error={resetPasswordErrors.confirmPassword || (apiErrors.confirmPassword && { message: apiErrors.confirmPassword })} />
          
          {/* Submit button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="self-center mt-6 h-10 text-white font-bold w-44 rounded-lg bg-[#ff3700] hover:bg-[#e63200] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? translate('updating') : translate('reset_password')}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
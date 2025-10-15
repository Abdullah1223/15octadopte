'use client'
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const OtpVerification = ({ 
  onResend, 
  length = 6, 
  isLoading = false, 
  email,
  expiryTime = 60, // Seconds until OTP expires
  apiErrors = {}, // To handle backend errors
  translate = (text) => text, // For i18n support
  onClose = () => {} // Optional close/cancel function
}) => {
  const [timeLeft, setTimeLeft] = useState(expiryTime);
  const [canResend, setCanResend] = useState(false);

  // Zod schema for OTP validation
  const otpSchema = z.object({
    code: z.string()
      .min(length, { message: translate('otp_length_error') })
      .regex(/^\d+$/, { message: translate('otp_format_error') }),
    email:z.string().email({ message: translate('invalid_email') }), 
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setError,
    clearErrors 
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: ''
    }
  });

  const onVerify = async(code,email)=>{
    const data = {
        code,
        email
    }  
    const response = await fetch('http://localhost:8001/otpVerification',{
        headers:{
            'Content-Type':"Application/json"
        },
        method:"POST",   
        body:JSON.stringify(data)
      })

    const result = await response.json()

    console.log(result)
  
}



  // Countdown timer for OTP expiry
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Effect to set API errors into form errors
  useEffect(() => {
    if (apiErrors.code) {
      setError('code', {
        type: 'server',
        message: apiErrors.code
      });
    }
    
    if (apiErrors.general) {
      setError('general', {
        type: 'server',
        message: apiErrors.general
      });
    }
  }, [apiErrors, setError]);

  // Handle form submission
  const onSubmit = (data) => {
    onVerify(data.code,email);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    onResend();
    setTimeLeft(expiryTime);
    setCanResend(false);
    clearErrors();
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full mt-10 md:mt-4 lg:absolute top-56 left-[65%] mb-80   max-w-md mx-auto bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
      Vérifiez votre compte
      </h2>
      
      <p className="text-gray-600 mb-6">
      Entrez le code de vérification
      </p>
      
      {/* General error message from backend */}
      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm flex items-start">
          <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
          <span>{errors.general.message}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            {...register('code')}
            placeholder={"Entrez l'OTP"}
            className={`h-12 w-full px-4 border ${
              errors.code ? 'border-red-500' : 'border-gray-300'
            } rounded-md text-lg tracking-widest text-center font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
            autoComplete="one-time-code"
            maxLength={length}
          />
          
          {errors.code && (
            <div className="flex items-center text-red-500 text-xs mt-1">
              <AlertCircle size={12} className="mr-1" />
              <span>{errors.code.message}</span>
            </div>
          )}
        </div>
        
         {email!=null?
          <div className="relative">
          <input
            type="email"
            {...register('email')}
            placeholder={"Entrez Email"}
            className={`h-12 w-full px-4 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md text-lg tracking-widest text-center font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
            
          />
          
          {errors.email && (
            <div className="flex items-center text-red-500 text-xs mt-1">
              <AlertCircle size={12} className="mr-1" />
              <span>{errors.email.message}</span>
            </div>
          )}
        </div>
        :null}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Vérification en cours":"Vérifier"}
        </button>
        
        <div className="flex justify-between items-center text-sm">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
           Annuler
          </button>
          
          {!canResend ? (
            <p className="text-gray-500">
              Renvoyer le code dans <span className="font-medium">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-orange-500 font-medium hover:text-orange-600 hover:underline transition-colors"
            >
              Renvoyer le code
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OtpVerification;
'use client'
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "../Context/TranslationContext.";

const OtpForm = ({ 
  onSuccess, // Callback function when OTP verification is successful
  email, // Email address for verification (required)
  length = 6, // Length of OTP code
  expiryTime = 60, // Seconds until OTP expires
  apiErrors = {}, // To handle backend errors
  isLoading = false, // Loading state for the verify button
  onClose = () => {}, // Optional close/cancel function

}) => {
  const [timeLeft, setTimeLeft] = useState(expiryTime);
  const [canResend, setCanResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const {translate} = useTranslation()
  // Zod schema for OTP validation
  const otpSchema = z.object({
    code: z.string()
      .min(length, { message: translate('Please enter a valid verification code') })
      .regex(/^\d+$/, { message: translate('Code must contain only numbers') }),
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setError,
    clearErrors,
    reset
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: ''
    }
  });

  // Verify OTP function
  const verifyOtp = async (code) => {
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFICATION_SERVICE}/otpVerification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code, email })
      });

      const result = await response.json();
      
      if (!response.ok) {
        // Handle API errors
        if (result.errors?.code) {
          setError('code', {
            type: 'server',
            message: result.errors.code
          });
        }
        
        if (result.errors?.general) {
          setError('general', {
            type: 'server',
            message: result.errors.general
          });
        }
        return false;
      }
      
      // If successful
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result);
      }
      return true;
      
    } catch (error) {
      setError('general', {
        type: 'server',
        message: translate('Failed to verify code. Please try again.')
      });
      return false;
    }
  };

  // Resend OTP function
  const resendOtp = async () => {
    if (!canResend || resendLoading) return;
    
    setResendLoading(true);
    try {
      const response = await fetch('/resendSignUpOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      
      if (!response.ok) {
        setError('general', {
          type: 'server',
          message: result.message || translate('Failed to resend code')
        });
        return;
      }
      
      // Reset the timer and form state
      setTimeLeft(expiryTime);
      setCanResend(false);
      clearErrors();
      reset({ code: '' });
      
    } catch (error) {
      setError('general', {
        type: 'server',
        message: translate('Failed to resend code. Please try again.')
      });
    } finally {
      setResendLoading(false);
    }
  };

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
  const onSubmit = async (data) => {
    await verifyOtp(data.code);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    // <div className="fixed left-4 right-4 bottom-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-3 sm:p-6 border border-gray-200 z-50 max-h-[86vh] overflow-auto">
        <div className="absolute top-[80%] sm:top-[90%] px-4 py-4 md:top-[90%] w-full max-w-md mx-auto lg:left-[55%] xl:right-0 lg:top-[50%]  bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-4">
        {translate('verify_your_account')}
      </h2>
      
      <p className="text-gray-600 text-sm mb-4 sm:mb-6">
        {translate('enter_verification_code')}
      </p>
      
      {/* General error message from backend */}
      {errors.general && (
        <div role="alert" aria-live="assertive" className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm flex items-start">
          <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
          <span>{errors.general.message}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
        <div className="flex flex-col">
          <label htmlFor="otp-code" className="sr-only">{translate('enter_otp')}</label>
          <input
            id="otp-code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            {...register('code')}
            placeholder={translate('enter_otp')}
            className={`h-10 sm:h-12 w-full px-3 sm:px-4 border ${
              errors.code ? 'border-red-500' : 'border-gray-300'
            } rounded-md text-base sm:text-lg tracking-normal sm:tracking-widest text-center font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
            autoComplete="one-time-code"
            maxLength={length}
            aria-invalid={errors.code ? 'true' : 'false'}
          />

          {errors.code && (
            <div className="flex items-center text-red-500 text-xs mt-2">
              <AlertCircle size={12} className="mr-1" />
              <span>{errors.code.message}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 sm:h-11 bg-orange-500 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
            aria-label={translate('verify')}
          >
            {isLoading ? translate("verifying") : translate("verify")}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full h-10 sm:h-11 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            {translate('cancel')}
          </button>
        </div>

        <div className="flex justify-center items-center text-sm">
          {!canResend ? (
            <p className="text-gray-500 text-center">
              {translate('resend_code_in')} <span className="font-medium">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={resendOtp}
              disabled={resendLoading}
              className="text-orange-500 font-medium hover:text-orange-600 hover:underline transition-colors disabled:opacity-50"
            >
              {resendLoading ? translate('sending') : translate('resend_code')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OtpForm;
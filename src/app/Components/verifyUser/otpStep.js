'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

// Form validation schema
const otpSchema = z.object({
  otp: z.string().min(4, "OTP must be at least 4 characters").max(6, "OTP cannot exceed 6 characters"),
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

const OtpStep = ({ onSubmit, onBack, onResend, serverErrors }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // OTP form
  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const success = await onSubmit(data.otp);
      if (!success) {
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await onResend();
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="otp-step"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Enter Verification Code</h2>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <Mail size={48} className="text-orange-500" />
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-center text-gray-600 mb-6">
          We've sent a verification code to your email address. Please enter it below.
        </motion.p>
        
        <form onSubmit={otpForm.handleSubmit(handleSubmit)}>
          <motion.div variants={itemVariants} className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="otp"
              {...otpForm.register("otp")}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-2xl letter-spacing-wide"
              placeholder="Enter code"
              maxLength={6}
            />
            {otpForm.formState.errors.otp && (
              <p className="mt-1 text-sm text-red-600">{otpForm.formState.errors.otp.message}</p>
            )}
            {serverErrors?.otp && (
              <p className="mt-1 text-sm text-red-600">{serverErrors.otp}</p>
            )}
            {serverErrors?.otpResent && (
              <p className="mt-1 text-sm text-green-600">{serverErrors.otpResent}</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex gap-3">
            {/* <button
              type="button"
              onClick={onBack}
              className="w-1/3 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Back
            </button> */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-2/3 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              Verify
            </button>
          </motion.div>
        </form>
        
        <motion.div variants={itemVariants} className="mt-4 text-center">
          <button 
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-orange-500 text-sm hover:underline flex items-center justify-center mx-auto"
          >
            {isResending ? (
              <span className="inline-block w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : null}
            Didn't receive a code? Resend
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OtpStep;
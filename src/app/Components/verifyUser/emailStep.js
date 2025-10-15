'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

// Form validation schema
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
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

const EmailStep = ({ onSubmit, serverErrors }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email form
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const success = await onSubmit(data.email);
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
        key="email-step"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Verify Your Account</h2>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <Mail size={48} className="text-orange-500" />
        </motion.div>
        
        <form onSubmit={emailForm.handleSubmit(handleSubmit)}>
          <motion.div variants={itemVariants} className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...emailForm.register("email")}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
            {emailForm.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">{emailForm.formState.errors.email.message}</p>
            )}
            {serverErrors?.email && (
              <p className="mt-1 text-sm text-red-600">{serverErrors.email}</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              Continue
            </button>
          </motion.div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmailStep;
'use client'
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

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

const SuccessStep = () => {
  const redirectToDashboard = () => {
    // Navigate to dashboard
    window.location.href = "/login";
  };

  return (
    <motion.div
      key="success-step"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center"
    >
      <motion.div variants={itemVariants} className="mb-6 flex justify-center">
        <CheckCircle size={64} className="text-green-500" />
      </motion.div>
      
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-4 text-gray-800">
        Verification Complete!
      </motion.h2>
      
      <motion.p variants={itemVariants} className="text-gray-600 mb-6">
        Your account has been successfully verified. You can now access all features.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <button
          onClick={redirectToDashboard}
          className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition duration-200"
        >
          Log Into Account
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessStep;
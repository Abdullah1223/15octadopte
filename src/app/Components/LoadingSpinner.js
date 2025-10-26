'use client';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 24 }) => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Loader2 
          size={size} 
          className="text-orange-500 stroke-[3]"
          style={{ filter: 'drop-shadow(0 0 8px rgba(255, 165, 0, 0.3))' }}
        />
      </motion.div>
      <style jsx global>{`
        .lucide-loader-2 {
          color: #f97316;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner; 
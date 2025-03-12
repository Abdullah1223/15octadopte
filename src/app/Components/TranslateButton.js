'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../Context/TranslationContext.';

const TranslateButton = () => {
  const { translate, setLanguage, language } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);
   const handleTranslate = ()=>{
       setLanguage(language=='en'?"fr":"en")
   }
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="flex items-center justify-center bg-[#ff7300] text-white rounded-full shadow-lg p-4 hover:bg-orange-600 transition-colors"
        onClick={handleTranslate}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe size={24} />
        {isHovered && (
          <motion.span 
            className="ml-2 font-medium"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            Translate
          </motion.span>
        )}
      </motion.button>
    </motion.div>
  );
};

export default TranslateButton;
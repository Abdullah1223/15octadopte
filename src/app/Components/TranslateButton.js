'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext.';

const TranslateButton = () => {
  const { translate, setLanguage, language } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);
   const handleTranslate = ()=>{
       setLanguage(language=='en'?"fr":"en")
   }
  return (
    <div
      className="fixed bottom-6 right-6 z-50"
 
    >
      <button
        className="flex   items-center justify-center bg-[#ff7300] text-white rounded-full shadow-lg p-4 hover:bg-orange-600 transition-colors"
        onClick={handleTranslate}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
       
      >
        
        <Globe size={24} />
        <span className="sr-only">Translate</span>
        {isHovered && (
          <span 
            className="ml-2 font-medium"
            
          >
            Translate
          </span>
        )}
      </button>
    </div>
  );
};

export default TranslateButton;
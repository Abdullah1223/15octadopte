'use client'
import React, { createContext, useState, useContext } from "react";
import translations from '@/app/locales/translation.json' // Import translations

// Create context
const TranslationContext = createContext();

// Provider component
export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  // Function to translate text based on the current language
  const translate = (key) => translations[language][key] || key;

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use translation
export const useTranslation = () => useContext(TranslationContext);

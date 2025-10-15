'use client'
import React, { createContext, useState, useContext } from "react";
import translations from '../locales/translation.json' // Import translations

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("fr");

  const translate = (key) => translations[language][key] || key;

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);

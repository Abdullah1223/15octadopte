'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "../Context/TranslationContext.";

const HeroSection = () => {
      const { translate, setLanguage, language } = useTranslation();
  const router = useRouter();
  const words = ["SEAMLESSLY!", "EFFORTLESSLY!", "EFFICIENTLY!", "INSTANTLY!", "PERFECTLY!"];
  const frwords=['SANS EFFORT!', 'FACILEMENT!',"EFFICACEMENT!","INSTANTANÉMENT!","PARFAITEMENT!"]
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const typingSpeed = isDeleting ? 75 : 150;
    const wordArray = language === 'fr' ? frwords : words;
    const word = wordArray[currentWord];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setCurrentText(word.substring(0, currentText.length + 1));
        
        // Completed typing current word
        if (currentText === word) {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        setCurrentText(word.substring(0, currentText.length - 1));
        
        // Completed deleting
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWord, words]);

  const handleClick = (value) => {
    console.log('Clicked')
    router.push(`/login?value=${value}`); // Correct: String path with query
  };
  
  return (
    <div className="relative flex flex-col md:grid border-b border-[#D9D9D9] grid-cols-2">
      <div className="md:hidden flex mt-4 justify-center items-center">
        <div
          // initial={{ opacity: 0, scale: 0.9 }}
          // animate={{ opacity: 1, scale: 1 }}
          // transition={{ duration: 0.5 }}
        >
          <Image src={'/Frame.webp'} width={250} height={250} alt="Hero Section" loading="lazy"></Image>
        </div>
      </div>
      <div className="flex justify-center md:ml-12 md:mt-10 lg:mt-10 items-center">
        <div className="md:flex flex-col gap-3">
          <div 
            // initial={{ opacity: 0, x: -50 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0 }}
            className="mt-4 flex items-center md:mt-0 text-[#FF9300] gap-2"
          >
            <div className="h-[2px] w-24 md:w-28 lg:w-40 bg-[#FF9300]"></div>
            <h1 className="items-center text-xs md:text-base lg:text-lg">{translate('500+_trusted_companies_&_users')}</h1>
          </div>
          
          {/*this is start to sm heading seciton*/}
          <h1 
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: 0.2, duration: 0.5 }}
            className={`md:hidden text-center md:mt-0 md:ml-0 text-black font-bold ${language=='fr'?'text-lg':'text-xl'}  sm:text-3xl`}
          >
           {translate('our_mission_sm')}
          </h1>
          <h1 
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: 0.2, duration: 0.5 }}
            className={`text-center md:hidden md:mt-0 md:ml-0 text-black font-bold ${language=='fr'?'text-lg':'text-xl'}  sm:text-3xl`}
          >
           {translate('connecting_job_seekers_sm')}
          </h1>
        
          <h1 
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: 0.4, duration: 0.5 }}
            className={`md:hidden text-center md:mt-0 md:ml-0 ${language=='fr'?'text-lg':"text-xl"}  sm:text-3xl text-black font-bold`}
          >
           
            <div className="inline-block relative">
              <span className="text-[#ff7300] relative">
                {currentText}
              </span>
              <span 
                className="inline-block w-[3px] h-6 ml-1 bg-[#ff7300] absolute"
                // animate={{ opacity: [1, 1] }}
                // transition={{ repeat: Infinity, duration: 0 }}
              />
            </div>
          </h1>
          
          <div 
            // initial={{ opacity: 0, y: 30 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: 0.6, duration: 0.5 }}
            className="md:hidden flex justify-center items-center mt-4 gap-2 sm:gap-3"
          >
            <button 
              // whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
              // whileTap={{ scale: 0.95 }}
              onClick={() => handleClick('Candidate')} 
              className="border-[2px] rounded-[4px] border-black w-32 h-10 text-xs sm:w-36 sm:h-10 sm:text-base text-black"
            >
              {translate('i_am_a_candidate')}
            </button>
            <button 
              // whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(250, 73, 9, 0.3)" }}
              // whileTap={{ scale: 0.95 }}
              onClick={() => handleClick('Employer')} 
              className="rounded-[4px] bg-[#FA4909] w-32 h-10 text-xs sm:w-36 sm:h-10 sm:text-base text-white"
            >
              {translate('i_am_a_employer')}
            </button>
          </div>
          
          {/*this is from md to xl heading*/}
          <h1 
            // initial={{ opacity: 1, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: 0, duration: 0 }}
            className="hidden md:block md:text-3xl lg:text-4xl xl:text-5xl text-black font-bold"
          >
            {translate('our_mission')}
          </h1>
          <h1 
            // initial={{ opacity: 1, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: 0, duration: 0 }}
            className="hidden md:block md:text-3xl lg:text-4xl xl:text-5xl text-black font-bold"
          >
            {translate('connecting_job')}
          </h1>
          <h1 
            // initial={{ opacity: 1, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: 0, duration: 0 }}
            className="hidden md:block md:text-3xl lg:text-4xl xl:text-5xl text-black font-bold"
          >
            {translate("&_employers")}
          </h1>
          <h1 
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0 }}
            className="hidden md:block md:text-3xl lg:text-4xl xl:text-5xl text-[#ff7300] font-bold"
          >
            <div className="inline-block relative">
              <span className="relative">
                {currentText}
              </span>
              <span 
                className="inline-block w-[3px] h-8 ml-1 bg-[#ff7300] absolute"
                // animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            </div>
          </h1>
          
          <div 
            // initial={{ opacity: 1, y: 30 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: 0, duration: 0 }}
            className="hidden md:flex mt-2 gap-6"
          >
            <button 
              // whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
              // whileTap={{ scale: 0.95 }}
              onClick={() => handleClick('Candidate')} 
              className="border-[2px] rounded-[4px] border-black md:h-[47px] md:w-44 lg:w-44 lg:h-[50px]"
            >
              {translate('i_am_a_candidate')}
            </button>
            <button 
              // whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(250, 73, 9, 0.3)" }}
              // whileTap={{ scale: 0.95 }}
              onClick={() => handleClick('Employer')} 
              className="rounded-[4px] bg-[#FA4909] md:h-[47px] md:w-44 lg:w-44 lg:h-[50px] text-white"
            >
             {translate('i_am_a_employer')}
            </button>
          </div>
          <div className="h-6"></div>
        </div>
      </div>

      <div className="hidden md:flex justify-center items-center md:ml-24 md:w-[69%] md:h-auto lg:w-[65%] lg:ml-40 xl:w-[70%] xl:ml-32">
        <div
          // initial={{ opacity: 1, scale: 0.9, y: 20 }}
          // animate={{ opacity: 1, scale: 1, y: 0 }}
          // transition={{ duration: 0, delay: 0 }}
        >
          <Image src={'/Frame.webp'} width={500} height={500} alt="Hero Section" loading="lazy"  ></Image>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
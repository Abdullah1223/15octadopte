// import { useSelector } from "react-redux";

// const dashboardWrapper = ({children})=>{
 
//     const selector = useSelector((state)=>state.user)

     
//     return <>
     
//      {children}
//      </>


// }


// export default dashboardWrapper;
'use client';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const DashboardWrapper = ({ children }) => {
  const selector = useSelector((state) => state.user);
  const [showDialog, setShowDialog] = useState(false);
  const route = useRouter() 
  useEffect(() => {
    // Check if user is not logged in
    console.log(selector)
    if (selector.isUserLoggedIn == false ) {
      setShowDialog(true);
    }
  }, [selector.isUserLoggedIn]);

  const handleLogin = () => {
    // Add your login logic here
    route.push('/login')
    // For demo purposes, we'll just close the dialog
    setShowDialog(false);
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0,
      y: 30
    },
    visible: { 
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 30,
        delay: 0.1
      }
    },
    exit: { 
      scale: 0.9,
      opacity: 0,
      y: -20,
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 40,
        duration: 0.3 
      }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95 }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.3 + custom * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  // Decorative elements animation
  const decorationVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { 
        delay: 0.6,
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative">
      {children}
      
      <AnimatePresence>
        {showDialog && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-2xl overflow-hidden w-11/12 max-w-md relative"
              variants={modalVariants}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden opacity-20">
                <motion.svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-orange-500"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.circle 
                    cx="70" 
                    cy="30" 
                    r="20" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="none" 
                    variants={decorationVariants}
                  />
                  <motion.path 
                    d="M20,80 Q50,20 80,80" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="none" 
                    variants={decorationVariants}
                  />
                </motion.svg>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-5 relative">
                <motion.div 
                  className="absolute top-0 right-0 mt-2 mr-2"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 0.2, rotate: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <svg className="w-16 h-16 text-white" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" strokeWidth="2" stroke="currentColor" fill="none" />
                  </svg>
                </motion.div>
                
                <motion.h2 
                  className="text-white text-2xl font-bold"
                  custom={0}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Please Connexion
                </motion.h2>
                
                <motion.div 
                  className="w-16 h-1 bg-white rounded-full mt-2 mb-1"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 64, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                />
              </div>
              
              <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                <motion.p 
                  className="text-black text-lg mb-8"
                  custom={1}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Vous devez être connecté pour accéder à ce contenu.
                </motion.p>
                
                <motion.div 
                  className="flex justify-end space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.button 
                    onClick={() => setShowDialog(false)}
                    className="px-6 py-2 border border-gray-300 rounded-full text-black bg-white hover:bg-gray-50 transition-colors duration-200"
                    variants={buttonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Annuler
                  </motion.button>
                  <motion.button 
                    onClick={handleLogin}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full text-white shadow-lg hover:shadow-xl transition-shadow duration-200"
                    variants={buttonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Connexion
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardWrapper;
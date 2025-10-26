'use client';
import { Menu, Scissors, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "../Context/TranslationContext.";

const BlogPageSearchSectionSm = () => {
  const [menuOpen, setMenuOpen] = useState(false);
        const { translate, setLanguage, language } = useTranslation();
  const router = useRouter();
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-900 sticky top-0 z-30"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <input 
            type="text" 
            placeholder="Search blogs..." 
            className="w-full bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
          />
          <Search 
            size={16} 
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/50" 
          />
        </div>

        <motion.button 
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <Menu color="white" size={20} />
        </motion.button>
      </div>
      
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: menuOpen ? "auto" : 0,
          opacity: menuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="bg-neutral-800 text-white overflow-hidden"
      >
        <div className="container mx-auto px-4 py-3">
          <h3 className="font-medium mb-2 text-white/70">Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            {[translate('Hair Care'), translate('Hair Trends'), translate('Style Tips'), translate('Grooming Essentials'), translate('Beard Care')].map((category, i) => (
              <motion.div 
                onClick={()=>{router.push(`/blog/${category}`)}}
                key={category} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-2 py-2"
              >
                <Scissors size={14} className="text-orange-500" />
                <span>{category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogPageSearchSectionSm
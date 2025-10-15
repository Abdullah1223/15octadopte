import { motion } from "framer-motion";
import { useTranslation } from "../Context/TranslationContext.";

const NewsletterNew = ()=>{
            const { translate, setLanguage, language } = useTranslation();
  
    return (
        <motion.div 
                className="mt-8 bg-neutral-800 text-white rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                <p className="text-neutral-300 text-sm mb-4">{translate('newsletter')}</p>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-lg py-2 px-4 mb-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-lg font-medium transition-all"
                >
                  Subscribe
                </motion.button>
              </motion.div>
    )
}

export default NewsletterNew;
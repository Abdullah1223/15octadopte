'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, MapPin, Clock, DollarSign, Building, Users, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { jobInstance } from '../Services/jobs.service';
import { useRouter } from 'next/navigation';

// Mock translation context for demo
const useTranslation = () => ({
  t: (key) => {
    const translations = {
      'favorites.title': 'Emplois Favoris',
      'favorites.subtitle': 'Vos emplois sauvegardés',
      'favorites.views': 'vues',
      'favorites.experience': 'Expérience',
      'favorites.noJobs': 'Aucun emploi favori trouvé',
      'favorites.loadMore': 'Charger plus',
      'favorites.loading': 'Chargement...',
      'favorites.apply': 'Postuler',
      'favorites.remove': 'Retirer des favoris'
    };
    return translations[key] || key;
  }
});

// Mock job data generator


export default function FavoritesJobs() {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const route = useRouter()
 const [cursor,setCursor]=useState(null)
 const {ref,inView}=useInView()
  // Initial load
 

  const makingReq = async(cursor)=>{
         
    const response = await jobInstance.get(`/fetch/fetchSavedJobs/${cursor}`,
      // {
    //   headers:{
    //     'Content-Type':"application/json"
    //   },
    //   method:"GET",
    //   credentials:"include"
    // }
  )

    const result = await response.data
    console.log(result)
    if(response.status==200){
      
      setJobs((prev)=>[...prev,...result.savedDetails])
      setCursor(result.Cursor)
      setHasMore(result.hasMore)
    }
  }


 useEffect(()=>{
       makingReq(null)
 },[])

 useEffect(()=>{
  if(inView==true && hasMore){
    console.log(cursor)
    makingReq(cursor)
  }
  
 },[inView])
  // Load more jobs
 

  const toggleSaved = (jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-orange-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {t('favorites.title')}
              </h1>
              <p className="text-slate-600 mt-1">{t('favorites.subtitle')}</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            >
              {jobs.length} emplois
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {jobs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Heart className="mx-auto h-16 w-16 text-orange-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">{t('favorites.noJobs')}</h3>
            <p className="text-slate-500">Commencez à sauvegarder des emplois pour les voir ici</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {jobs?.map((job) => (
                <motion.div
                  key={job.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-orange-200/30 overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 text-lg mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
                          {job.Title}
                        </h3>
                        <div className="flex items-center text-slate-600 mb-2">
                          <Building className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">{job.creatorName}</span>
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.City}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleSaved(job._id)}
                        className="p-2 rounded-full bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors"
                      >
                        <Heart className="h-5 w-5 fill-current" />
                      </motion.button>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-slate-600">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{job.experienceRequired}</span>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{job.Views} {t('favorites.views')}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-slate-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>{job.minimumSalary} - {job.maximumSalary}</span>
                      </div>

                      <div className="flex items-center text-sm text-slate-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{new Date(job.createdOn).toLocaleString()}</span>
                        <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                          {job.contractType}
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {job?.skills?.map((skill, index) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium hover:bg-orange-100 transition-colors"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm mt-4 line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-orange-50/30 border-t border-orange-100">
                    <div className="flex items-center justify-end">
                      {/* <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm group"
                      >
                        Voir les détails
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </motion.button> */}
                      <motion.button
                       onClick={()=>{
                        route.push(`/JobInfo/${job._id}`)
                       }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r self-end from-orange-500 to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
                      >
                        {t('favorites.apply')}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={ref} ></div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-12"
          >
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full"
              />
              <span className="text-slate-600">{t('favorites.loading')}</span>
            </div>
          </motion.div>
        )}

        {/* End Message */}
        {!hasMore && jobs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm">
              <Heart className="h-4 w-4 mr-2" />
              Vous avez vu tous vos emplois favoris
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
// 'use client'

// import { motion } from 'framer-motion'
// import { FaExclamationTriangle, FaLock, FaSearch, FaUserSlash } from 'react-icons/fa'
// import Link from 'next/link'

// const errorTypes = {
//   notFound: {
//     icon: FaSearch,
//     title: 'Job Not Found',
//     description: 'The job you\'re looking for doesn\'t exist or has been removed.',
//     actionText: 'Browse Jobs',
//     actionLink: '/jobs'
//   },
//   unauthorized: {
//     icon: FaLock,
//     title: 'Access Denied',
//     description: 'You need to be logged in to view this job.',
//     actionText: 'Sign In',
//     actionLink: '/login'
//   },
//   notLoggedIn: {
//     icon: FaUserSlash,
//     title: 'Authentication Required',
//     description: 'Please sign in to view job details and apply.',
//     actionText: 'Sign In',
//     actionLink: '/login'
//   },
//   default: {
//     icon: FaExclamationTriangle,
//     title: 'Something Went Wrong',
//     description: 'An error occurred while loading the job details.',
//     actionText: 'Try Again',
//     actionLink: '#'
//   }
// }

// const JobError = ({ type = 'default', customError = null }) => {
//   const error = customError || errorTypes[type] || errorTypes.default
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-lg p-8 text-center"
//     >
//       <div className="w-16 h-16 mb-6 text-orange-500">
//         {error.icon && <error.icon size={64} />}
//       </div>

//       <motion.h2
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="text-2xl font-bold text-gray-900 mb-3"
//       >
//         {error.title}
//       </motion.h2>

//       <motion.p
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//         className="text-gray-600 mb-8 max-w-md"
//       >
//         {error.description}
//       </motion.p>

//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//       >
//         <Link
//           href={error.actionLink}
//           className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//         >
//           {error.actionText}
//         </Link>
//       </motion.div>

//       {error.secondaryAction && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="mt-4"
//         >
//           <Link
//             href={error.secondaryAction.link}
//             className="text-orange-500 hover:text-orange-600 transition-colors"
//           >
//             {error.secondaryAction.text}
//           </Link>
//         </motion.div>
//       )}
//     </motion.div>
//   )
// }

// export default JobError 


'use client'

import { motion } from 'framer-motion'
import { FaExclamationTriangle, FaLock, FaSearch, FaUserSlash, FaTimes } from 'react-icons/fa'
import Link from 'next/link'

// const errorTypes = {
//   notFound: {
//     icon: FaSearch,
//     title: 'Job Not Found',
//     description: 'The job you\'re looking for doesn\'t exist or has been removed.',
//     actionText: 'Browse Jobs',
//     actionLink: '/jobs'
//   },
//   unauthorized: {
//     icon: FaLock,
//     title: 'Access Denied',
//     description: 'You need to be logged in to view this job.',
//     actionText: 'Sign In',
//     actionLink: '/login'
//   },
//   notLoggedIn: {
//     icon: FaUserSlash,
//     title: 'Authentication Required',
//     description: 'Please sign in to view job details and apply.',
//     actionText: 'Sign In',
//     actionLink: '/login'
//   },
//   default: {
//     icon: FaExclamationTriangle,
//     title: 'Something Went Wrong',
//     description: 'An error occurred while loading the job details.',
//     actionText: 'Try Again',
//     actionLink: '#'
//   }
// }

const errorTypes = {
  notFound: {
    icon: FaSearch,
    title: 'Offre introuvable',
    description: 'L\'offre que vous recherchez n\'existe pas ou a été supprimée.',
    actionText: 'Parcourir les offres',
    actionLink: '/jobs'
  },
  unauthorized: {
    icon: FaLock,
    title: 'Accès refusé',
    description: 'Vous devez être connecté pour voir cette offre.',
    actionText: 'Se connecter',
    actionLink: '/login'
  },
  notLoggedIn: {
    icon: FaUserSlash,
    title: 'Authentification requise',
    description: 'Veuillez vous connecter pour voir les détails de l\'offre et postuler.',
    actionText: 'Se connecter',
    actionLink: '/login'
  },
  default: {
    icon: FaExclamationTriangle,
    title: 'Une erreur est survenue',
    description: 'Une erreur s\'est produite lors du chargement des détails de l\'offre.',
    actionText: 'Réessayer',
    actionLink: '#'
  }
}

const JobError = ({ 
  type = 'default', 
  customError = null, 
  isDialog = false, 
  onClose = () => {} 
}) => {
  const error = customError || errorTypes[type] || errorTypes.default
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-lg p-8 text-center"
    >
      {/* Conditional Close Button */}
      {isDialog && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close dialog"
        >
          <FaTimes size={24} />
        </button>
      )}

      <div className="w-16 h-16 mb-6 text-orange-500">
        {error.icon && <error.icon size={64} />}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-gray-900 mb-3"
      >
        {error.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-8 max-w-md"
      >
        {error.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {isDialog ? (
          <button
            onClick={onClose}
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            {error.actionText}
          </button>
        ) : (
          <Link
            href={error.actionLink}
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            {error.actionText}
          </Link>
        )}
      </motion.div>

      {error.secondaryAction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4"
        >
          {isDialog ? (
            <button
              onClick={onClose}
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              {error.secondaryAction.text}
            </button>
          ) : (
            <Link
              href={error.secondaryAction.link}
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              {error.secondaryAction.text}
            </Link>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default JobError 
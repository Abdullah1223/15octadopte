'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

const variants = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-500',
    hoverColor: 'hover:text-green-200'
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-500',
    hoverColor: 'hover:text-red-200'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-500',
    hoverColor: 'hover:text-blue-200'
  }
}

const Toast = ({ 
  message, 
  type='success', 
  isVisible, 
  onClose,
  position = 'top-right'
}) => {
  const variant = variants[type] || variants.success
  const Icon = variant.icon

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: type === 'error' ? -100 : 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: type === 'error' ? -100 : 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`
            fixed z-50 ${positionClasses[position]}
            ${variant.bgColor} text-white 
            px-6 py-4 rounded-lg shadow-lg 
            flex items-center space-x-3
            md:min-w-[320px]
            max-w-[calc(100vw-2rem)]
            mx-4
            md:mx-0
          `}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          <span className="font-medium text-sm md:text-base flex-grow">{message}</span>
          <button
            onClick={onClose}
            className={`ml-4 text-white ${variant.hoverColor} transition-colors flex-shrink-0`}
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast 
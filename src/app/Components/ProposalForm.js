// 'use client'

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { z } from 'zod'
// import Toast from './Toast'
// import { jobInstance } from '../Services/jobs.service'

// // Get current date in YYYY-MM-DD format and remove time portion for fair comparison
// const today = new Date()
// today.setHours(0, 0, 0, 0)
// const todayStr = today.toISOString().split('T')[0]

// const proposalSchema = z.object({
//   skills: z.array(z.string()).min(1, 'At least one skill is required'),
//   experience: z.string().min(1, 'Experience is required'),
//   preferredContractType: z.enum(['Full-time', 'Part-time', 'Freelance', 'Contract']),
//   proposalText: z.string()
//     .min(50, 'Proposal must be at least 50 characters')
//     .max(1000, 'Proposal cannot exceed 1000 characters'),
//   expectedSalary: z.string().min(1, 'Expected salary is required'),
//   availableFrom: z.string()
//     .min(1, 'Available from date is required')
//     .refine((dateStr) => {
//       if (!dateStr) return false
//       const selectedDate = new Date(dateStr)
//       selectedDate.setHours(0, 0, 0, 0)
//       return selectedDate >= today
//     }, 'Please select today or a future date'),
//   linkedinProfile: z.string().url('Invalid LinkedIn URL').optional(),
//   portfolioUrl: z.string().url('Invalid portfolio URL').optional(),
// })

// const ProposalForm = ({ jobId, currentUser }) => {
//   const [formData, setFormData] = useState({
//     skills: [],
//     experience: '',
//     preferredContractType: 'Full-time',
//     proposalText: '',
//     expectedSalary: '',
//     availableFrom: '',
//     linkedinProfile: '',
//     portfolioUrl: '',
//   })

//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [skillInput, setSkillInput] = useState('')
//   const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

//   const showToast = (message, type = 'success') => {
//     setToast({ show: true, message, type })
//     // Auto-hide after 5 seconds
//     setTimeout(() => {
//       setToast(prev => ({ ...prev, show: false }))
//     }, 5000)
//   }

//   const handleSkillAdd = () => {
//     if (skillInput.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         skills: [...prev.skills, skillInput.trim()]
//       }))
//       setSkillInput('')
//     }
//   }

//   const handleSkillRemove = (skillToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       skills: prev.skills.filter(skill => skill !== skillToRemove)
//     }))
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
    
//     // Special handling for date input to validate immediately
//     if (name === 'availableFrom') {
//       const selectedDate = new Date(value)
//       selectedDate.setHours(0, 0, 0, 0)
      
//       if (selectedDate < today) {
//         setErrors(prev => ({
//           ...prev,
//           availableFrom: 'Please select today or a future date'
//         }))
//       } else {
//         setErrors(prev => {
//           const newErrors = { ...prev }
//           delete newErrors.availableFrom
//           return newErrors
//         })
//       }
//     }

//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log('Form submission started')
    
//     setIsSubmitting(true)
//     setErrors({})
    
//     try {
//       // console.log('Validating form data:', formData)
//       const validated = proposalSchema.parse(formData)
//       // console.log('Validation successful:', validated)
      
//       // console.log('Sending request to server...')
//       const response = await jobInstance.post(`/proposalSent`,
//         {Details:validated,jobId:jobId} 
//         // {
//       //   headers: {
//       //     'Content-Type': 'application/json'
//       //   },
//       //   method: "POST",
//       //   body: JSON.stringify({Details:validated,jobId:jobId}),
//       //   credentials: "include",
//       // }
//     )
//       const data =   await response.data
//       //  console.log('data',data)
//       if (!response.ok) {
//         if (data.errors) {
//           // Handle field-specific errors
//           if (data.errors.general) {
//             // Show general error in toast
//             showToast(data.errors.general, 'error')
//           } else {
//             // Set field-specific errors
//             setErrors(data.errors)
//           }
//           throw new Error('Validation failed')
//         } else {
//           throw new Error(data.message || 'Failed to submit proposal')
//         }
//       }

//       // console.log('Server success response:', data)
      
//       // Reset form after successful submission
//       // setFormData({
//       //   skills: [],
//       //   experience: '',
//       //   preferredContractType: 'Full-time',
//       //   proposalText: '',
//       //   expectedSalary: '',
//       //   availableFrom: '',
//       //   linkedinProfile: '',
//       //   portfolioUrl: '',
//       // })

//       showToast('Proposal submitted successfully!')

//     } catch (error) {
//       // console.log('error',error)
//       console.error('Full error details:', {
//         name: error.name,
//         message: error.message,
//         stack: error.stack
//       })
      
//       if (error instanceof z.ZodError) {
//         const errorMessages = {}
//         error.errors.forEach(err => {
//           const field = err.path[0]
//           errorMessages[field] = err.message
//         })
//         setErrors(errorMessages)
//         showToast('Please check the form for errors', 'error')
//       } else if (error.message !== 'Validation failed') {
//         // Only show toast for non-validation errors
//         showToast(error.message || 'Failed to submit proposal', 'error')
//       }
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <>
//       <Toast
//         isVisible={toast.show}
//         message={toast.message}
//         type={toast.type}
//         onClose={() => setToast(prev => ({ ...prev, show: false }))}
//       />
      
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mt-8 bg-white rounded-lg shadow-lg p-6"
//       >
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Proposal</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Skills */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Skills
//             </label>
//             <div className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 value={skillInput}
//                 onChange={(e) => setSkillInput(e.target.value)}
//                 className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 placeholder="Add a skill"
//               />
//               <button
//                 type="button"
//                 onClick={handleSkillAdd}
//                 className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {formData.skills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full flex items-center"
//                 >
//                   {skill}
//                   <button
//                     type="button"
//                     onClick={() => handleSkillRemove(skill)}
//                     className="ml-2 text-orange-700 hover:text-orange-900"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//             {errors.skills && (
//               <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
//             )}
//           </div>

//           {/* Experience */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Years of Experience
//             </label>
//             <input
//               type="number"
//               name="experience"
//               value={formData.experience}
//               onChange={handleChange}
//               className={`w-full border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
//             />
//             {errors.experience && (
//               <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
//             )}
//           </div>

          
//           {/* Contract Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Preferred Contract Type
//             </label>
//             <select
//               name="preferredContractType"
//               value={formData.preferredContractType}
//               onChange={handleChange}
//               className={`w-full border ${errors.preferredContractType ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
//             >
//               <option value="Full-time">Full-time</option>
//               <option value="Part-time">Part-time</option>
//               <option value="Freelance">Freelance</option>
//               <option value="Contract">Contract</option>
//             </select>
//             {errors.preferredContractType && (
//               <p className="text-red-500 text-sm mt-1">{errors.preferredContractType}</p>
//             )}
//           </div>

//           {/* Expected Salary */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Expected Salary
//             </label>
//             <input
//               type="text"
//               name="expectedSalary"
//               value={formData.expectedSalary}
//               onChange={handleChange}
//               className={`w-full border ${errors.expectedSalary ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
//               placeholder="e.g. $50,000/year"
//             />
//             {errors.expectedSalary && (
//               <p className="text-red-500 text-sm mt-1">{errors.expectedSalary}</p>
//             )}
//           </div>

//           {/* Available From */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Available From
//             </label>
//             <input
//               type="date"
//               name="availableFrom"
//               value={formData.availableFrom}
//               onChange={handleChange}
//               min={todayStr}
//               className={`w-full border ${errors.availableFrom ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
//             />
//             {errors.availableFrom && (
//               <p className="text-red-500 text-sm mt-1">{errors.availableFrom}</p>
//             )}
//             <p className="text-gray-500 text-sm mt-1">
//               Please select today or a future date
//             </p>
//           </div>

//           {/* Proposal Text */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Your Proposal
//             </label>
//             <textarea
//               name="proposalText"
//               value={formData.proposalText}
//               onChange={handleChange}
//               rows={6}
//               className={`w-full border ${errors.proposalText ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
//               placeholder="Describe why you're the best fit for this position..."
//             />
//             {errors.proposalText && (
//               <p className="text-red-500 text-sm mt-1">{errors.proposalText}</p>
//             )}
//           </div>

//           {/* Social Links */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 LinkedIn Profile
//               </label>
//               <input
//                 type="url"
//                 name="linkedinProfile"
//                 value={formData.linkedinProfile}
//                 onChange={handleChange}
//                 className={`w-full border ${errors.linkedinProfile ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                 placeholder="https://linkedin.com/in/..."
//               />
//               {errors.linkedinProfile && (
//                 <p className="text-red-500 text-sm mt-1">{errors.linkedinProfile}</p>
//               )}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Portfolio URL
//               </label>
//               <input
//                 type="url"
//                 name="portfolioUrl"
//                 value={formData.portfolioUrl}
//                 onChange={handleChange}
//                 className={`w-full border ${errors.portfolioUrl ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                 placeholder="https://..."
//               />
//               {errors.portfolioUrl && (
//                 <p className="text-red-500 text-sm mt-1">{errors.portfolioUrl}</p>
//               )}
//             </div>
//           </div>


//           {/* Display server errors */}
//           {errors.submit && (
//             <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">
//               {errors.submit}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors ${
//               isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
//           </button>
//         </form>
//       </motion.div>
//     </>
//   )
// }

// export default ProposalForm 






'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import { 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Globe, 
  Link, 
  Plus, 
  X, 
  Text, 
  User 
} from 'lucide-react'
import Toast from './Toast'
import { jobInstance } from '../Services/jobs.service'

// Get current date in YYYY-MM-DD format
const today = new Date()
today.setHours(0, 0, 0, 0)
const todayStr = today.toISOString().split('T')[0]

const proposalSchema = z.object({
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  experience: z.string().min(1, 'Experience is required'),
  preferredContractType: z.enum(['Full-time', 'Part-time', 'Freelance', 'Contract']),
  proposalText: z
    .string()
    .min(50, 'Proposal must be at least 50 characters')
    .max(1000, 'Proposal cannot exceed 1000 characters'),
  expectedSalary: z.string().min(1, 'Expected salary is required'),
  availableFrom: z
    .string()
    .min(1, 'Available from date is required')
    .refine(
      (dateStr) => {
        if (!dateStr) return false
        const selectedDate = new Date(dateStr)
        selectedDate.setHours(0, 0, 0, 0)
        return selectedDate >= today
      },
      'Please select today or a future date'
    ),
  linkedinProfile: z.string().url('Invalid LinkedIn URL').optional(),
  portfolioUrl: z.string().url('Invalid portfolio URL').optional(),
})

const ProposalForm = ({ jobId, currentUser }) => {
  const [formData, setFormData] = useState({
    skills: [],
    experience: '',
    preferredContractType: 'Full-time',
    proposalText: '',
    expectedSalary: '',
    availableFrom: '',
    linkedinProfile: '',
    portfolioUrl: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }))
    }, 5000)
  }

  const handleSkillAdd = () => {
    if (skillInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput('')
    }
  }

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === 'availableFrom') {
      const selectedDate = new Date(value)
      selectedDate.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        setErrors((prev) => ({
          ...prev,
          availableFrom: 'Please select today or a future date',
        }))
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.availableFrom
          return newErrors
        })
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const validated = proposalSchema.parse(formData)
      const response = await jobInstance.post(`/proposalSent`, {
        Details: validated,
        jobId: jobId,
      })
      const data = await response.data

      if (!response.ok) {
        if (data.errors) {
          if (data.errors.general) {
            showToast(data.errors.general, 'error')
          } else {
            setErrors(data.errors)
          }
          throw new Error('Validation failed')
        } else {
          throw new Error(data.message || 'Failed to submit proposal')
        }
      }

      showToast('Proposal submitted successfully!')
    } catch (error) {
      console.error('Full error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      })

      if (error instanceof z.ZodError) {
        const errorMessages = {}
        error.errors.forEach((err) => {
          const field = err.path[0]
          errorMessages[field] = err.message
        })
        setErrors(errorMessages)
        showToast('Please check the form for errors', 'error')
      } else if (error.message !== 'Validation failed') {
        showToast(error.message || 'Failed to submit proposal', 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white py-6 px-4 sm:px-6">
      <Toast
        isVisible={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f5f5f5' fill-opacity='0.4'%3E%3Cpath d='M0 0h1v1H0zM1 1h1v1H1zM2 2h1v1H2zM3 3h1v1H3zM4 4h1v1H4zM5 5h1v1H5zM6 6h1v1H6zM7 7h1v1H7zM8 8h1v1H8zM9 9h1v1H9zM10 10h1v1H10zM11 11h1v1H11zM12 12h1v1H12zM13 13h1v1H13zM14 14h1v1H14zM15 15h1v1H15zM16 16h1v1H16zM17 17h1v1H17zM18 18h1v1H18zM19 19h1v1H19z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-left flex items-center">
          <Briefcase className="w-6 h-6 mr-2 text-orange-500" />
          Submit Your Proposal
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
              <User className="w-4 h-4 mr-1.5 text-orange-500" />
              Skills
            </label>
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="e.g., JavaScript, UX Design"
                aria-label="Add a skill"
              />
              <button
                type="button"
                onClick={handleSkillAdd}
                className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            <AnimatePresence>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="px-3 py-1.5 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                      className="ml-2 text-orange-600 hover:text-orange-800"
                      aria-label={`Remove ${skill}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.span>
                ))}
              </div>
            </AnimatePresence>
            {errors.skills && (
              <p className="text-red-500 text-xs mt-1.5">{errors.skills}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
              <Briefcase className="w-4 h-4 mr-1.5 text-orange-500" />
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={`w-full rounded-lg border ${
                errors.experience ? 'border-red-500' : 'border-gray-300'
              } px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all`}
              placeholder="e.g., 5"
              aria-label="Years of experience"
            />
            {errors.experience && (
              <p className="text-red-500 text-xs mt-1.5">{errors.experience}</p>
            )}
          </div>

          {/* Contract Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
              <Briefcase className="w-4 h-4 mr-1.5 text-orange-500" />
              Preferred Contract Type
            </label>
            <select
              name="preferredContractType"
              value={formData.preferredContractType}
              onChange={handleChange}
              className={`w-full rounded-lg border ${
                errors.preferredContractType ? 'border-red-500' : 'border-gray-300'
              } px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all`}
              aria-label="Select contract type"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Freelance">Freelance</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.preferredContractType && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.preferredContractType}
              </p>
            )}
          </div>

          {/* Expected Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
              <DollarSign className="w-4 h-4 mr-1.5 text-orange-500" />
              Expected Salary
            </label>
            <input
              type="text"
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleChange}
              className={`w-full rounded-lg border ${
                errors.expectedSalary ? 'border-red-500' : 'border-gray-300'
              } px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all`}
              placeholder="e.g., $50,000/year"
              aria-label="Expected salary"
            />
            {errors.expectedSalary && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.expectedSalary}
              </p>
            )}
          </div>

          {/* Available From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
              <Calendar className="w-4 h-4 mr-1.5 text-orange-500" />
              Available From
            </label>
            <input
              type="date"
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleChange}
              min={todayStr}
              className={`w-full rounded-lg border ${
                errors.availableFrom ? 'border-red-500' : 'border-gray-300'
              } px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all`}
              aria-label="Available from date"
            />
            {errors.availableFrom && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.availableFrom}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-1.5">
              Select today or a future date
            </p>
          </div>

          {/* Proposal Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
              <Text className="w-4 h-4 mr-1.5 text-orange-500" />
              Your Proposal
            </label>
            <textarea
              name="proposalText"
              value={formData.proposalText}
              onChange={handleChange}
              rows={6}
              className={`w-full rounded-lg border ${
                errors.proposalText ? 'border-red-500' : 'border-gray-300'
              } px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-y`}
              placeholder="Describe why you're the best fit for this position..."
              aria-label="Your proposal"
            />
            {errors.proposalText && (
              <p className="text-red-500 text-xs mt-1.5">{errors.proposalText}</p>
            )}
          </div>

          {/* Social Links */}
          <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
                <Link className="w-4 h-4 mr-1.5 text-orange-500" />
                LinkedIn Profile (Optional)
              </label>
              <input
                type="url"
                name="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={handleChange}
                className={`w-full rounded-lg border ${
                  errors.linkedinProfile ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all`}
                placeholder="https://linkedin.com/in/..."
                aria-label="LinkedIn profile URL"
              />
              {errors.linkedinProfile && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.linkedinProfile}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
                <Globe className="w-4 h-4 mr-1.5 text-orange-500" />
                Portfolio URL (Optional)
              </label>
              <input
                type="url"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                className={`w-full rounded-lg border ${
                  errors.portfolioUrl ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all`}
                placeholder="https://..."
                aria-label="Portfolio URL"
              />
              {errors.portfolioUrl && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.portfolioUrl}
                </p>
              )}
            </div>
          </div>

          {/* Server Errors */}
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm p-3 bg-red-50 rounded-lg"
            >
              {errors.submit}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-4 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-center ${
              isSubmitting
                ? 'bg-orange-300 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
            aria-label={isSubmitting ? 'Submitting proposal' : 'Submit proposal'}
          >
            <Briefcase className="w-4 h-4 mr-1" />
            {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default ProposalForm
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import Toast from './Toast'
import { jobInstance } from '../Services/jobs.service'

// Get current date in YYYY-MM-DD format and remove time portion for fair comparison
const today = new Date()
today.setHours(0, 0, 0, 0)
const todayStr = today.toISOString().split('T')[0]

const proposalSchema = z.object({
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  experience: z.string().min(1, 'Experience is required'),
  preferredContractType: z.enum(['Full-time', 'Part-time', 'Freelance', 'Contract']),
  proposalText: z.string()
    .min(50, 'Proposal must be at least 50 characters')
    .max(1000, 'Proposal cannot exceed 1000 characters'),
  expectedSalary: z.string().min(1, 'Expected salary is required'),
  availableFrom: z.string()
    .min(1, 'Available from date is required')
    .refine((dateStr) => {
      if (!dateStr) return false
      const selectedDate = new Date(dateStr)
      selectedDate.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, 'Please select today or a future date'),
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
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, 5000)
  }

  const handleSkillAdd = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }))
      setSkillInput('')
    }
  }

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    // Special handling for date input to validate immediately
    if (name === 'availableFrom') {
      const selectedDate = new Date(value)
      selectedDate.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        setErrors(prev => ({
          ...prev,
          availableFrom: 'Please select today or a future date'
        }))
      } else {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.availableFrom
          return newErrors
        })
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submission started')
    
    setIsSubmitting(true)
    setErrors({})
    
    try {
      // console.log('Validating form data:', formData)
      const validated = proposalSchema.parse(formData)
      // console.log('Validation successful:', validated)
      
      // console.log('Sending request to server...')
      const response = await jobInstance.post(`/proposalSent`,
        {Details:validated,jobId:jobId} 
        // {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   method: "POST",
      //   body: JSON.stringify({Details:validated,jobId:jobId}),
      //   credentials: "include",
      // }
    )
      const data =   await response.data
      //  console.log('data',data)
      if (!response.ok) {
        if (data.errors) {
          // Handle field-specific errors
          if (data.errors.general) {
            // Show general error in toast
            showToast(data.errors.general, 'error')
          } else {
            // Set field-specific errors
            setErrors(data.errors)
          }
          throw new Error('Validation failed')
        } else {
          throw new Error(data.message || 'Failed to submit proposal')
        }
      }

      // console.log('Server success response:', data)
      
      // Reset form after successful submission
      // setFormData({
      //   skills: [],
      //   experience: '',
      //   preferredContractType: 'Full-time',
      //   proposalText: '',
      //   expectedSalary: '',
      //   availableFrom: '',
      //   linkedinProfile: '',
      //   portfolioUrl: '',
      // })

      showToast('Proposal submitted successfully!')

    } catch (error) {
      // console.log('error',error)
      console.error('Full error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
      
      if (error instanceof z.ZodError) {
        const errorMessages = {}
        error.errors.forEach(err => {
          const field = err.path[0]
          errorMessages[field] = err.message
        })
        setErrors(errorMessages)
        showToast('Please check the form for errors', 'error')
      } else if (error.message !== 'Validation failed') {
        // Only show toast for non-validation errors
        showToast(error.message || 'Failed to submit proposal', 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toast
        isVisible={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Proposal</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Add a skill"
              />
              <button
                type="button"
                onClick={handleSkillAdd}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className="ml-2 text-orange-700 hover:text-orange-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={`w-full border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
            )}
          </div>

          {/* Currently Working */}
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              name="currentlyWorking"
              checked={formData.currentlyWorking}
              onChange={handleChange}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              I am currently working
            </label>
          </div> */}

          {/* Contract Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contract Type
            </label>
            <select
              name="preferredContractType"
              value={formData.preferredContractType}
              onChange={handleChange}
              className={`w-full border ${errors.preferredContractType ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Freelance">Freelance</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.preferredContractType && (
              <p className="text-red-500 text-sm mt-1">{errors.preferredContractType}</p>
            )}
          </div>

          {/* Expected Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Salary
            </label>
            <input
              type="text"
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleChange}
              className={`w-full border ${errors.expectedSalary ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="e.g. $50,000/year"
            />
            {errors.expectedSalary && (
              <p className="text-red-500 text-sm mt-1">{errors.expectedSalary}</p>
            )}
          </div>

          {/* Available From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available From
            </label>
            <input
              type="date"
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleChange}
              min={todayStr}
              className={`w-full border ${errors.availableFrom ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            {errors.availableFrom && (
              <p className="text-red-500 text-sm mt-1">{errors.availableFrom}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              Please select today or a future date
            </p>
          </div>

          {/* Proposal Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Proposal
            </label>
            <textarea
              name="proposalText"
              value={formData.proposalText}
              onChange={handleChange}
              rows={6}
              className={`w-full border ${errors.proposalText ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Describe why you're the best fit for this position..."
            />
            {errors.proposalText && (
              <p className="text-red-500 text-sm mt-1">{errors.proposalText}</p>
            )}
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={handleChange}
                className={`w-full border ${errors.linkedinProfile ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                placeholder="https://linkedin.com/in/..."
              />
              {errors.linkedinProfile && (
                <p className="text-red-500 text-sm mt-1">{errors.linkedinProfile}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio URL
              </label>
              <input
                type="url"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                className={`w-full border ${errors.portfolioUrl ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                placeholder="https://..."
              />
              {errors.portfolioUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.portfolioUrl}</p>
              )}
            </div>
          </div>

          {/* CV Upload */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload CV
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFormData(prev => ({ ...prev, cvFile: e.target.files[0] }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.cvFile && (
              <p className="text-red-500 text-sm mt-1">{errors.cvFile}</p>
            )}
          </div> */}

          {/* Display server errors */}
          {errors.submit && (
            <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
          </button>
        </form>
      </motion.div>
    </>
  )
}

export default ProposalForm 
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import LoadingSpinner from './LoadingSpinner'

const JobSidebar = ({isLoading}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    contractType: '',
    region: '',
    minSalary: '',
    maxSalary: ''
  })

  const contractTypes = ['Full-time', 'Part-time', 'Freelance', 'Contract']
  const regions = ['North', 'South', 'East', 'West', 'Central']

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        
        <div className="space-y-4">
          {/* Contract Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contract Type
            </label>
            <select
              value={filters.contractType}
              onChange={(e) => handleFilterChange('contractType', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">All Types</option>
              {contractTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Region
            </label>
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minSalary}
                onChange={(e) => handleFilterChange('minSalary', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxSalary}
                onChange={(e) => handleFilterChange('maxSalary', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        <button 
          className="w-full mt-6 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Apply Filters
        </button>
      </motion.div>

      {/* Similar Jobs */}
     {
      isLoading? <LoadingSpinner></LoadingSpinner>: <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Similar Jobs</h3>
      <div className="space-y-4">
        {/* Placeholder for similar jobs */}
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
            <h4 className="font-medium">Software Developer</h4>
            <p className="text-sm text-gray-600">Company Name</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">Full-time</span>
              <span className="text-sm font-medium text-orange-500">$75k-$95k</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
     }
    </div>
  )
}

export default JobSidebar 
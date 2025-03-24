'use client';
import React, { useState, useEffect } from 'react';
import { Filter, Search, MapPin, Clock, DollarSign, Briefcase, Bookmark, X, ChevronDown, Star, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import JobCard from '../DashboardComponents/JobCard';
import FeaturedJobCard from '../Components/FeaturedJobCard';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useTranslation } from '../Context/TranslationContext.';

export default function Jobs() {
        const { translate, setLanguage, language } = useTranslation();
    
  const jobs = [
    {
      id: 1,
      title: 'Senior Barber',
      company: 'Shiekh Solutions',
      location: 'Paris, France',
      experience: '3 Years',
      salary: '4000€',
      type: translate('full_time'),
      skills: [translate('unisex'), translate('beard_styling'), translate('hair_coloring')],
      publishedDate: '2/2/25',
    },
    {
      id: 2,
      title: 'Hair Stylist',
      company: 'Beauty Hub',
      location: 'Lyon, France',
      experience: '2 Years',
      salary: '3500€',
      type: translate('part_time'),
      skills: [translate('unisex'), translate('beard_styling'), translate('hair_coloring')],
      publishedDate: '1/28/25',
    },
    {
      id: 3,
      title: 'Barber Apprentice',
      company: 'Classic Cuts',
      location: 'Marseille, France',
      experience: '1 Year',
      salary: '2800€',
      type: 'Contract',
      skills: [translate('unisex'), translate('beard_styling'), translate('hair_coloring')],
      publishedDate: '2/5/25',
    },
    {
      id: 4,
      title: 'Color Specialist',
      company: 'Trendy Salon',
      location: 'Bordeaux, France',
      experience: '4 Years',
      salary: '4200€',
      type: translate('part_time'),
      skills: [translate('unisex'), translate('beard_styling'), translate('hair_coloring')],
      publishedDate: '2/1/25',
    },
  ];

  // Sample data with promoted jobs
  const promotedJobs = [
    {
      id: 5,
      title: translate('Creative Director - Hair Salon'),
      company: translate('Elite Beauty Group'),
      location: 'Paris, France',
      experience: '5+ Years',
      salary: '5000€',
      type:translate('full_time'),
      skills: [translate('unisex'), translate('creative_styling'),translate('team_management')],
      publishedDate: '3/1/25',
      promoted: true,
      promotionEnds: '3/15/25',
      description: translate('promoted_jobs_1_subheading')
    },
    
  ];

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [allJobsData, setAllJobsData] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    contractType: '',
    minSalary: '',
    specialization: [],
    searchQuery: ''
  });

  const locations = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Nice', 'Toulouse'];
  const contractTypes = [translate('full_time'), translate('part_time'), 'Contract', 'Freelance'];
  const salaryRanges = ['2500€', '3000€', '3500€', '4000€', '4500€'];
  const specializations = [translate('unisex'), translate('female_barber'), translate('male_only'),translate('beard_styling'), translate('hair_coloring'), translate('bridal'), translate('hair_extensions'), translate('color_expert'), translate('creative_styling'), translate('team_management')];

  // Initialize jobs data on component mount
  useEffect(() => {
    const combinedJobs = [...promotedJobs, ...jobs];
    setAllJobsData(combinedJobs);
    setFilteredJobs(combinedJobs);
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: value
    });
  };

  const handleSpecializationChange = (specialization) => {
    const updatedSpecializations = filters.specialization.includes(specialization)
      ? filters.specialization.filter(item => item !== specialization)
      : [...filters.specialization, specialization];
    
    setFilters({
      ...filters,
      specialization: updatedSpecializations
    });
  };

  const applyFilters = () => {
    let filtered = [...allJobsData];
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query) || 
        job.company.toLowerCase().includes(query) || 
        job.location.toLowerCase().includes(query)
      );
    }
    
    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.contractType) {
      filtered = filtered.filter(job => job.type === filters.contractType);
    }
    
    if (filters.minSalary) {
      const minSalary = parseInt(filters.minSalary.replace('€', ''));
      filtered = filtered.filter(job => 
        parseInt(job.salary.replace('€', '')) >= minSalary
      );
    }
    
    if (filters.specialization.length > 0) {
      filtered = filtered.filter(job => 
        filters.specialization.some(spec => 
          job.skills.includes(spec)
        )
      );
    }
    
    setFilteredJobs(filtered);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      contractType: '',
      minSalary: '',
      specialization: [],
      searchQuery: ''
    });
    setFilteredJobs(allJobsData);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setFilters({
      ...filters,
      searchQuery: query
    });

    // Immediate search without waiting for filter button
    if (query === '') {
      setFilteredJobs(allJobsData);
    } else {
      const filtered = allJobsData.filter(job => 
        job.title.toLowerCase().includes(query.toLowerCase()) || 
        job.company.toLowerCase().includes(query.toLowerCase()) || 
        job.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  // Check if there are promoted jobs in filtered results
  const hasPromotedJobs = filteredJobs.some(job => job.promoted);

  return (
    <div>
        <Navbar></Navbar>
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header and Search Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{translate('find_your_perfect_hairstylist_job')}</h1>
        <p className="text-gray-600 mb-6">{translate('find_your_perfect_hairstylist_job_subheading')}</p>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={20} className="text-orange-400" />
            </div>
            <input
              type="text"
              placeholder={translate('Search_by_job')}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm text-gray-700"
              value={filters.searchQuery}
              onChange={handleSearch}
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 border border-orange-200 bg-white rounded-lg hover:bg-orange-50 flex items-center justify-center shadow-sm md:w-auto w-full text-orange-500 font-medium transition-all duration-200"
            onClick={toggleFilter}
          >
            <Filter size={18} className="mr-2" />
            <span>Filters</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden border border-orange-100"
          >
            <div className="p-5 md:p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Filter size={18} className="mr-2 text-orange-500" />
                  {translate('refine_your_search')}
                </h2>
                <button 
                  onClick={toggleFilter}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <MapPin size={16} className="mr-1 text-orange-400" />
                    {translate('location')}
                  </label>
                  <select 
                    className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  >
                    <option value="">{translate('any_location')}</option>
                    {locations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                {/* Contract Type Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <Briefcase size={16} className="mr-1 text-orange-400" />
                    {translate('contract_type')}
                  </label>
                  <select 
                    className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50"
                    value={filters.contractType}
                    onChange={(e) => handleFilterChange('contractType', e.target.value)}
                  >
                    <option value="">{translate('any_type')}</option>
                    {contractTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                {/* Minimum Salary Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <DollarSign size={16} className="mr-1 text-orange-400" />
                    {translate('minimum_salary')}
                  </label>
                  <select 
                    className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50"
                    value={filters.minSalary}
                    onChange={(e) => handleFilterChange('minSalary', e.target.value)}
                  >
                    <option value="">{translate('any_salary')}</option>
                    {salaryRanges.map((range, index) => (
                      <option key={index} value={range}>Min {range}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Specialization Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Sparkles size={16} className="mr-1 text-orange-400" />
                  Specialization
                </label>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((specialization, index) => (
                    <button
                      key={index}
                      onClick={() => handleSpecializationChange(specialization)}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                        filters.specialization.includes(specialization)
                          ? 'bg-orange-500 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {specialization}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetFilters}
                  className="px-5 py-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {translate('reset_all')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={applyFilters}
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-md hover:from-orange-600 hover:to-amber-600 transition-all shadow-md font-medium"
                >
                  {translate('apply_filters')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured/Promoted Jobs Section */}
      {hasPromotedJobs && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center mb-5">
            <div className="bg-orange-100 p-2 rounded-lg mr-3">
              <Sparkles size={20} className="text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{translate('premium_opportunities')}</h2>
          </div>
          
          <div className="space-y-5">
            {filteredJobs
              .filter(job => job.promoted)
              .map((job, index) => (
                <FeaturedJobCard key={job.id} job={job} index={index} />
              ))}
          </div>
{/*           
          <div className="mt-5 text-right">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors"
            >
              {translate('promote_your_job_posting')}
              <ArrowRight size={16} className="ml-1" />
            </motion.button>
          </div> */}
        </motion.div>
      )}

      {/* Results Count */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-5 flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <div className="bg-orange-100 h-8 w-8 rounded-full flex items-center justify-center text-orange-500 font-medium">
            {filteredJobs.filter(job => !job.promoted).length}
          </div>
          <span className="text-gray-600">{translate('jobs_found_matching_your_criteria')}</span>
        </div>
        <div className="text-sm text-gray-500">
        Mis à Jour Aujourd'Hui
        </div>
      </motion.div>

      {/* Regular Job Cards */}
      <div className="space-y-5">
        {filteredJobs.filter(job => !job.promoted).length > 0 ? (
          filteredJobs
            .filter(job => !job.promoted)
            .map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-100"
          >
            <div className="flex justify-center mb-4">
              <AlertCircle size={36} className="text-orange-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No matching jobs found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria to see more results.</p>
            <button 
              onClick={resetFilters}
              className="px-4 py-2 bg-orange-100 text-orange-500 rounded-md hover:bg-orange-200 transition-colors inline-flex items-center"
            >
              <Filter size={16} className="mr-2" />
              Reset filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
}

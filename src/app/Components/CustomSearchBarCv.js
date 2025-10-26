'use client';
import { motion, AnimatePresence } from "framer-motion";
import { Award, Briefcase, ChevronDown, DollarSign, Filter, MapPin, Search, X } from "lucide-react";
import { useState } from "react";
import { useSearchBox } from "react-instantsearch";
import ContractTypeFilter from "../DashboardComponents/RefimentFilters";

const CustomSearchBarCv = ({filters,setFilters}) => {
  const [showFilters, setShowFilters] = useState(false);
  
  
  const { query, refine } = useSearchBox();
  
  // Check if there are active filters
  const hasActiveFilters = Object.values(filters).some(value => value !== '') || query !== '';
  
  // Function to clear a specific filter
  const clearFilter = (filterKey) => {
    setFilters(prev => ({ ...prev, [filterKey]: '' }));
  };
  
  // Function to clear all filters
  const clearAllFilters = () => {
    setFilters({
      region: '',
      contractType: '',
      minimumSalary: '',
      specialization: ''
    });
    refine('');
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une offre par titre, lieu, type de contrat..."
            value={query}
            onChange={(e) => refine(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          {query && (
            <button 
              onClick={() => refine('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
            showFilters 
              ? 'bg-orange-50 border-orange-200 text-orange-600' 
              : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Filter size={18} />
          <span>Filtres</span>
          {hasActiveFilters && (
            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              {Object.values(filters).filter(v => v !== '').length + (query ? 1 : 0)}
            </span>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Filtres avancés</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Effacer tout
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ContractTypeFilter 
  displayMode="dropdown"
  attribute={"Region"}
  clearFilter={clearFilter}
  title={"Region"}
/>

                {/* <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin size={16} className="text-gray-500" />
                    Région
                  </label>
                  <div className="relative">
                    <select
                      value={filters.region}
                      onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Toutes les régions</option>
                      <option value="paris">Paris</option>
                      <option value="lyon">Lyon</option>
                      <option value="marseille">Marseille</option>
                      <option value="toulouse">Toulouse</option>
                      <option value="bordeaux">Bordeaux</option>
                      <option value="nantes">Nantes</option>
                      <option value="strasbourg">Strasbourg</option>
                      <option value="lille">Lille</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    {filters.region && (
                      <button
                        onClick={() => clearFilter('region')}
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div> */}

                <ContractTypeFilter 
  displayMode="dropdown"
  attribute={"peferredContractType"}
  clearFilter={clearFilter}
  title={"Type de contrat"}
/>

<ContractTypeFilter 
  displayMode="dropdown"
  attribute={"salaryExpectationMaximum"}
  clearFilter={clearFilter}
  title={"Maximum Salary"}
/>            
<ContractTypeFilter 
  displayMode="dropdown"
  attribute={"salaryExpectationMinimum"}
  clearFilter={clearFilter}
  title={"Minimum Salary"}
/>            
<ContractTypeFilter 
  displayMode="dropdown"
  attribute={"specialization"}
  clearFilter={clearFilter}
  title={"Specialization"}
/>
<ContractTypeFilter 
  displayMode="dropdown"
  attribute={"yearsOfExperience"}
  clearFilter={clearFilter}
  title={"Years Of Experience"}
/>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 items-center"
        >
          <span className="text-sm text-gray-600">Filtres actifs:</span>
          
          {query && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
            >
              <Search size={12} />
              <span>"{query}"</span>
              <button
                onClick={() => refine('')}
                className="hover:bg-orange-200 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
          
          {Object.entries(filters).map(([key, value]) => 
            value && (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                <span className="capitalize">
                  {key === 'contractType' ? 'Contrat' : 
                   key === 'minimumSalary' ? 'Salaire' : 
                   key === 'specialization' ? 'Spécialisation' : 
                   'Région'}:
                </span>
                <span>{value}</span>
                <button
                  onClick={() => clearFilter(key)}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </motion.div>
            )
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CustomSearchBarCv;
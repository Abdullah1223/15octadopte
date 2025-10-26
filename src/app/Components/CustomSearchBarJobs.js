'use client';
import { motion, AnimatePresence } from "framer-motion";
import { Award, Briefcase, ChevronDown, DollarSign, Filter, MapPin, Search, X } from "lucide-react";
import { useState } from "react";
import { useSearchBox } from "react-instantsearch";
import ContractTypeFilter from "../DashboardComponents/RefimentFilters";

const CustomSearchBar2 = ({filters, setFilters}) => {
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
      className="space-y-6 mt-4 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* Main Search Bar Container */}
      <div className="bg-white rounded-2xl shadow-lg p-2">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un poste, salon, ville..."
              value={query}
              onChange={(e) => refine(e.target.value)}
              className="w-full pl-12 pr-12 py-4 text-lg border-0 rounded-xl bg-transparent focus:outline-none placeholder-gray-400"
            />
            {query && (
              <button 
                onClick={() => refine('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
          
          {/* Filters Toggle Button - Now on the right side */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
              showFilters 
                ? 'bg-orange-100 text-orange-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Filter size={18} />
            <span className="font-medium hidden sm:inline">Filtres</span>
            {hasActiveFilters && (
              <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                {Object.values(filters).filter(v => v !== '').length + (query ? 1 : 0)}
              </span>
            )}
            <ChevronDown 
              size={16} 
              className={`transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`}
            />
          </motion.button>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Filtres avancés</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors"
                  >
                    Effacer tout
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ContractTypeFilter 
                  displayMode="dropdown"
                  attribute={"Region"}
                  clearFilter={clearFilter}
                  title={"Région"}
                />

                <ContractTypeFilter 
                  displayMode="dropdown"
                  attribute={"contractType"}
                  clearFilter={clearFilter}
                  title={"Type de contrat"}
                />

                <ContractTypeFilter 
                  displayMode="dropdown"
                  attribute={"maximumSalary"}
                  clearFilter={clearFilter}
                  title={"Salaire"}
                />            

                <ContractTypeFilter 
                  displayMode="dropdown"
                  attribute={"Specialization"}
                  clearFilter={clearFilter}
                  title={"Spécialisation"}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 items-center justify-center"
        >
          <span className="text-sm text-gray-600 font-medium">Filtres actifs:</span>
          
          {query && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Search size={14} />
              <span>"{query}"</span>
              <button
                onClick={() => refine('')}
                className="hover:bg-orange-200 rounded-full p-1 transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
          
          {Object.entries(filters).map(([key, value]) => 
            value && (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <span className="capitalize">
                  {key === 'contractType' ? 'Contrat' : 
                   key === 'minimumSalary' ? 'Salaire' : 
                   key === 'specialization' ? 'Spécialisation' : 
                   'Région'}:
                </span>
                <span className="font-semibold">{value}</span>
                <button
                  onClick={() => clearFilter(key)}
                  className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CustomSearchBar2;
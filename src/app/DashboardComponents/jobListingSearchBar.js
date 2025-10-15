import React, { useState } from 'react';
import { Search, X, Filter, ChevronDown, MapPin, Briefcase, DollarSign, Users } from 'lucide-react';

const JobSearchWithFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    region: "",
    contractType: "",
    salaryMin: "",
    specialization: ""
  });

  // Mock data for dropdowns
  const regions = [
    "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir", 
    "Meknès", "Oujda", "Kenitra", "Tétouan", "Safi", "El Jadida"
  ];

  const contractTypes = [
    "CDI", "CDD", "Stage", "Freelance", "Temps partiel", "Apprentissage"
  ];

  const specializations = [
    "Informatique & Tech", "Marketing & Communication", "Finance & Comptabilité",
    "Ressources Humaines", "Commercial & Vente", "Ingénierie", "Santé",
    "Éducation", "Design & Créatif", "Juridique", "Logistique", "BTP"
  ];

  const salaryRanges = [
    { label: "3000 DH", value: "3000" },
    { label: "5000 DH", value: "5000" },
    { label: "8000 DH", value: "8000" },
    { label: "12000 DH", value: "12000" },
    { label: "15000 DH", value: "15000" },
    { label: "20000 DH+", value: "20000" }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      region: "",
      contractType: "",
      salaryMin: "",
      specialization: ""
    });
    setSearchQuery("");
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Main Search Bar */}
      <div className="relative mb-4">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une offre par titre, lieu, type de contrat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-20 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-orange-500 text-white border-orange-500' 
                  : 'text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter size={16} />
              <span className="hidden sm:inline">Filtres</span>
              {activeFiltersCount > 0 && (
                <span className="bg-white text-orange-500 text-xs rounded-full px-2 py-1 font-semibold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 mb-4 transition-all duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Region Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin size={16} className="text-orange-500" />
                Région
              </label>
              <div className="relative">
                <select
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Toutes les régions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Contract Type Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Briefcase size={16} className="text-orange-500" />
                Type de contrat
              </label>
              <div className="relative">
                <select
                  value={filters.contractType}
                  onChange={(e) => handleFilterChange('contractType', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Tous les contrats</option>
                  {contractTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Salary Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <DollarSign size={16} className="text-orange-500" />
                Salaire minimum
              </label>
              <div className="relative">
                <select
                  value={filters.salaryMin}
                  onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Tous les salaires</option>
                  {salaryRanges.map(salary => (
                    <option key={salary.value} value={salary.value}>
                      {salary.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Specialization Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Users size={16} className="text-orange-500" />
                Spécialisation
              </label>
              <div className="relative">
                <select
                  value={filters.specialization}
                  onChange={(e) => handleFilterChange('specialization', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Toutes les spécialisations</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200 gap-4">
            <div className="text-sm text-gray-600">
              {activeFiltersCount > 0 ? (
                `${activeFiltersCount} filtre(s) actif(s)`
              ) : (
                'Aucun filtre appliqué'
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Effacer tout
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-6 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Tags */}
      {(activeFiltersCount > 0) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchQuery && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
              Recherche: "{searchQuery}"
              <button onClick={() => setSearchQuery("")}>
                <X size={14} />
              </button>
            </span>
          )}
          {filters.region && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {filters.region}
              <button onClick={() => handleFilterChange('region', '')}>
                <X size={14} />
              </button>
            </span>
          )}
          {filters.contractType && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              {filters.contractType}
              <button onClick={() => handleFilterChange('contractType', '')}>
                <X size={14} />
              </button>
            </span>
          )}
          {filters.salaryMin && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
              {salaryRanges.find(s => s.value === filters.salaryMin)?.label}
              <button onClick={() => handleFilterChange('salaryMin', '')}>
                <X size={14} />
              </button>
            </span>
          )}
          {filters.specialization && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
              {filters.specialization}
              <button onClick={() => handleFilterChange('specialization', '')}>
                <X size={14} />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Search Results Summary */}
      {(searchQuery || activeFiltersCount > 0) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              Résultats de recherche simulés - Intégrez votre logique de filtrage ici
            </span>
            <span className="font-medium text-orange-600">
              125 offres trouvées
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearchWithFilters;
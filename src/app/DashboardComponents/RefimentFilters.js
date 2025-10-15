'use client';
import { Briefcase, ChevronDown, X } from "lucide-react";
import { useRefinementList } from "react-instantsearch";

const ContractTypeFilter = ({ 
  clearFilter,
  attribute,
  title
}) => {
  const { items, refine } = useRefinementList({ attribute: attribute });
  
  // Get currently selected items
  const selectedItems = items.filter(item => item.isRefined);
  const hasSelection = selectedItems.length > 0;
  
  // For dropdown mode, create a display value
  const getDropdownDisplayValue = () => {
    if (selectedItems.length === 0) return "Tous les contrats";
    if (selectedItems.length === 1) return selectedItems[0].label;
    return `${selectedItems.length} contrats sélectionnés`;
  };

  // Handle dropdown selection
  const handleDropdownChange = (value) => {
    // Clear all current selections first
    selectedItems.forEach(item => refine(item.value));
    
    // Apply new selection if not empty
    if (value) {
      refine(value);
    }
  };

  // Clear all selections
  const handleClearAll = () => {
    selectedItems.forEach(item => refine(item.value));
    if (clearFilter) clearFilter('contractType');
  };



  // Dropdown mode (default)
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Briefcase size={16} className="text-gray-500" />
        {title}
      </label>
      <div className="relative">
        <select
          value={selectedItems.length === 1 ? selectedItems[0].value : ''}
          onChange={(e) => handleDropdownChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
        >
       
          {items.map(item => (
            <option key={item.value} value={item.value}>
              {item.value} ({item.count})
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        {hasSelection && (
          <button
            onClick={handleClearAll}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            title="Effacer la sélection"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContractTypeFilter;
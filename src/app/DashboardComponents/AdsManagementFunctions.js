import { X } from "lucide-react";
import { useState } from "react";

export const MultiSelectRegions = ({ value = [], onChange, error, placeholder = "Select regions" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
 
    const regions = [
        'Auvergne-Rhône-Alpes',
        'Bourgogne-Franche-Comté',
        'Bretagne',
        'Centre-Val de Loire',
        'Corse',
        'Grand Est',
        'Hauts-de-France',
        'Île-de-France',
        'Normandie',
        'Nouvelle-Aquitaine',
        'Occitanie',
        'Pays de la Loire',
        'Provence-Alpes-Côte d\'Azur',
        'Guadeloupe',
        'Guyane',
        'La Réunion',
        'Martinique',
        'Mayotte'
      ];

    const filteredRegions = regions.filter(region => 
      region.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleRegion = (region) => {
      const newValue = value.includes(region)
        ? value.filter(r => r !== region)
        : [...value, region];
      onChange(newValue);
    };

    const removeRegion = (regionToRemove) => {
      onChange(value.filter(r => r !== regionToRemove));
    };

    return (
      <div className="relative">
        <div 
          className={`w-full p-3 border rounded-lg cursor-pointer flex flex-wrap gap-1 min-h-[48px] ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {value.length === 0 ? (
            <span className="text-gray-500 self-center">{placeholder}</span>
          ) : (
            value.map(region => (
              <span 
                key={region}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
              >
                {region}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRegion(region);
                  }}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            ))
          )}
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
            <div className="p-2 border-b">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search regions..."
                className="w-full p-2 border border-gray-200 rounded text-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredRegions.map(region => (
                <div
                  key={region}
                  className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-2 ${
                    value.includes(region) ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                  onClick={() => toggleRegion(region)}
                >
                  <input
                    type="checkbox"
                    checked={value.includes(region)}
                    onChange={() => {}}
                    className="rounded"
                  />
                  <span className="text-sm">{region}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

 export const toggleAdStatus = (id, type,setBannerAds) => {
    if (type === 'banner') {
      setBannerAds(prev => prev.map(ad => 
        ad.id === id ? { ...ad, status: ad.status === 'active' ? 'paused' : 'active' } : ad
      ));
    }
  };

 export const deleteAd = (id, type,setBannerAds,setJobAds) => {
    if (type === 'banner') {
      setBannerAds(prev => prev.filter(ad => ad.id !== id));
    } else {
      setJobAds(prev => prev.filter(ad => ad.id !== id));
    }
  };


 

  
import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

const regions = [
  { id: 'all', name: 'All Africa', count: '55 countries', slug: 'all-africa' },
  { id: 'north', name: 'North Africa', count: '7 countries', slug: 'north-africa' },
  { id: 'west', name: 'West Africa', count: '16 countries', slug: 'west-africa' },
  { id: 'east', name: 'East Africa', count: '18 countries', slug: 'east-africa' },
  { id: 'central', name: 'Central Africa', count: '9 countries', slug: 'central-africa' },
  { id: 'southern', name: 'Southern Africa', count: '5 countries', slug: 'southern-africa' },
];

interface AfricaRegionFiltersProps {
  onRegionChange?: (regionId: string) => void;
}

export function AfricaRegionFilters({ onRegionChange }: AfricaRegionFiltersProps) {
  const [activeRegion, setActiveRegion] = useState('all');

  // Read initial region from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const regionParam = params.get('region');
    
    if (regionParam) {
      const region = regions.find(r => r.slug === regionParam);
      if (region) {
        setActiveRegion(region.id);
        onRegionChange?.(region.id);
      }
    }
  }, []);

  const handleRegionClick = (regionId: string, regionSlug: string) => {
    // Update active region state
    setActiveRegion(regionId);
    
    // Notify parent component for client-side filtering
    onRegionChange?.(regionId);
    
    // Generate shareable deep link and update URL without navigation
    const newUrl = regionId === 'all' 
      ? window.location.pathname 
      : `${window.location.pathname}?region=${regionSlug}`;
    
    window.history.replaceState({}, '', newUrl);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm mb-3">
            <Globe className="w-4 h-4" />
            <span>Explore by Region</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Discover Africa by Region
          </h2>
          <p className="text-lg text-gray-600">
            Filter destinations by African regions to find your perfect getaway
          </p>
        </div>

        {/* Horizontal Pill Filters - Single Row */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 justify-center min-w-max px-4 md:px-0">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => handleRegionClick(region.id, region.slug)}
                className={`
                  group relative px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap
                  border-2 overflow-hidden
                  ${
                    activeRegion === region.id
                      ? 'bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] text-white border-transparent shadow-xl scale-105'
                      : 'bg-white text-[#765B8E] border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:shadow-lg hover:scale-102'
                  }
                `}
              >
                {/* Hover gradient overlay for inactive state */}
                {activeRegion !== region.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                )}
                
                <div className="relative z-10">
                  <div className="font-bold text-base">{region.name}</div>
                  <div className={`text-xs mt-0.5 ${activeRegion === region.id ? 'text-white/90' : 'text-gray-500'}`}>
                    {region.count}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Region Description (Optional - shows based on active region) */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            {activeRegion === 'all' && 'Explore all 55 incredible countries across the African continent'}
            {activeRegion === 'north' && 'Discover the Mediterranean charm and ancient wonders of North Africa'}
            {activeRegion === 'west' && 'Experience vibrant cultures and coastal beauty in West Africa'}
            {activeRegion === 'east' && 'Safari adventures and pristine beaches await in East Africa'}
            {activeRegion === 'central' && 'Explore lush rainforests and diverse wildlife in Central Africa'}
            {activeRegion === 'southern' && 'Wine regions, wildlife, and stunning landscapes in Southern Africa'}
          </p>
        </div>
      </div>
    </section>
  );
}

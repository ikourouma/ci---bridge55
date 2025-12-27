import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Plane, Hotel, Car, MapPin, Sparkles, Calendar, Globe, Bell, 
  Newspaper, Briefcase, Heart, DollarSign, MessageCircle, Menu,
  SlidersHorizontal, X, ChevronDown, Star, Share2, Bookmark
} from 'lucide-react';

interface Destination {
  name: string;
  image: string;
  emoji: string;
}

interface SearchResult {
  id: string;
  type: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  price: number;
  priceLabel: string;
  details: string[];
  imageUrl: string;
}

export function DiaSearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['Under $3,359']);
  const [sortBy, setSortBy] = useState('recommended');
  const [nightlyFeesIncluded, setNightlyFeesIncluded] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  
  // Additional filter states
  const [freeBreakfast, setFreeBreakfast] = useState(false);
  const [class4Plus, setClass4Plus] = useState(false);
  const [rating8Plus, setRating8Plus] = useState(false);
  const [showFreebiesMenu, setShowFreebiesMenu] = useState(false);
  const [showAmenitiesMenu, setShowAmenitiesMenu] = useState(false);

  const query = searchParams.get('query') || 'Affordable hotels in Kenya';
  const dateRange = 'Mon 12/8 - Fri 12/26';

  // Destinations
  const destinations: Destination[] = [
    { name: 'Watamu', emoji: '🏖️', image: 'beach' },
    { name: 'Nakuru', emoji: '🦩', image: 'lake' },
    { name: 'Kisumu', emoji: '🌊', image: 'city' },
    { name: 'Nairobi', emoji: '🏙️', image: 'city' },
  ];

  // Sample results
  const results: SearchResult[] = [
    {
      id: '1',
      type: 'hotel',
      title: 'Flat in Lavington',
      location: 'Downtown, Nairobi',
      rating: 8.8,
      reviewCount: 11,
      badge: 'Very good',
      price: 42,
      priceLabel: '$831 total',
      details: ['Sleeps 2', '1 bedroom, 1 bath', 'Free cancellation', 'Rental'],
      imageUrl: '🏢'
    },
    {
      id: '2',
      type: 'hotel',
      title: 'Luced Homes',
      location: 'Nairobi',
      rating: 9.2,
      reviewCount: 5,
      badge: 'Wonderful',
      price: 30,
      priceLabel: '$630 total',
      details: ['Sleeps 4', '1 bedroom, 1 bath', 'Free cancellation', 'Rental'],
      imageUrl: '🏘️'
    },
    {
      id: '3',
      type: 'hotel',
      title: 'Giraffe Manor',
      location: 'Karen, Nairobi',
      rating: 9.8,
      reviewCount: 342,
      badge: 'Exceptional',
      price: 890,
      priceLabel: '$8,900 total',
      details: ['Luxury boutique hotel', 'Breakfast included', 'Giraffe feeding', 'Pool & Spa'],
      imageUrl: '🦒'
    },
  ];

  const menuItems = [
    { icon: Plane, label: 'Flights', path: '/flights/results' },
    { icon: Hotel, label: 'Stays', path: '/stays/results', active: true },
    { icon: Car, label: 'Cars', path: '/cars/results' },
    { icon: MapPin, label: 'Experiences', path: '/experiences/results' },
    { icon: Sparkles, label: 'Ask Dia', path: '/ai-trip-planner', separator: true },
    { icon: Calendar, label: 'My Trips', path: '/account/trips' },
    { icon: Globe, label: 'Explore', path: '/explore' },
    { icon: Bell, label: 'Price Alerts', path: '/alerts' },
    { icon: Newspaper, label: 'Travel Stories', path: '/blog' },
    { icon: Briefcase, label: 'Business', path: '/business' },
    { icon: Heart, label: 'Favorites', path: '/account/favorites', separator: true },
    { icon: DollarSign, label: 'USD', path: '/settings/currency' },
    { icon: MessageCircle, label: 'Feedback', path: '/feedback' },
  ];

  // Dynamic filter and sort functions
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleDestinationClick = (destName: string) => {
    setSelectedDestination(destName === selectedDestination ? null : destName);
  };

  // Dynamic filtering
  const filteredResults = results.filter(result => {
    // Price filter
    if (activeFilters.includes('Under $3,359') && result.price > 3359) return false;
    
    // Destination filter
    if (selectedDestination && !result.location.includes(selectedDestination)) return false;
    
    // Rating filter
    if (rating8Plus && result.rating < 8) return false;
    
    // You can add more filter logic here:
    // if (freeBreakfast && !result.details.includes('Breakfast')) return false;
    // if (class4Plus && result.rating < 8) return false;
    
    return true;
  });

  // Dynamic sorting
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'review':
        return b.rating - a.rating;
      case 'hotel-class':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - KAYAK Style */}
      <div 
        className={`bg-white border-r transition-all duration-300 ${
          sidebarExpanded ? 'w-56' : 'w-16'
        } flex-shrink-0`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="py-4">
          {/* Logo */}
          <div className="px-4 mb-6 flex items-center justify-center">
            {sidebarExpanded ? (
              <img src="/logo.png" alt="Bridge55" className="h-8" />
            ) : (
              <img src="/favicon.png" alt="B55" className="w-10 h-10" />
            )}
          </div>

          {/* Menu Items */}
          <nav className="space-y-1">
            {menuItems.map((item, idx) => (
              <div key={idx}>
                {item.separator && <div className="my-3 border-t" />}
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors ${
                    item.active ? 'bg-purple-50 text-purple-600' : 'text-gray-600'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarExpanded && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">{query}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-600">{dateRange}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Heart className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Sign in
              </button>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white border-b px-6 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-purple-500 whitespace-nowrap transition-all">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="font-semibold">All filters</span>
              <span className="px-1.5 py-0.5 bg-gray-900 text-white text-xs rounded-full">
                {activeFilters.length}
              </span>
            </button>

            {activeFilters.map((filter, idx) => (
              <button
                key={idx}
                onClick={() => removeFilter(filter)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 whitespace-nowrap transition-all shadow-sm"
              >
                <span>{filter}</span>
                <X className="w-4 h-4" />
              </button>
            ))}

            <button 
              onClick={() => setFreeBreakfast(!freeBreakfast)}
              className={`px-4 py-2 border-2 rounded-lg whitespace-nowrap transition-all ${
                freeBreakfast 
                  ? 'border-purple-600 bg-purple-50 text-purple-700 font-semibold' 
                  : 'border-gray-300 hover:border-purple-400'
              }`}
            >
              Free breakfast
            </button>
            
            <button 
              onClick={() => setClass4Plus(!class4Plus)}
              className={`px-4 py-2 border-2 rounded-lg whitespace-nowrap transition-all ${
                class4Plus 
                  ? 'border-purple-600 bg-purple-50 text-purple-700 font-semibold' 
                  : 'border-gray-300 hover:border-purple-400'
              }`}
            >
              Class 4+
            </button>
            
            <button 
              onClick={() => setRating8Plus(!rating8Plus)}
              className={`px-4 py-2 border-2 rounded-lg whitespace-nowrap transition-all ${
                rating8Plus 
                  ? 'border-purple-600 bg-purple-50 text-purple-700 font-semibold' 
                  : 'border-gray-300 hover:border-purple-400'
              }`}
            >
              8+ rating
            </button>
            
            <button 
              onClick={() => setShowFreebiesMenu(!showFreebiesMenu)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-purple-400 whitespace-nowrap flex items-center gap-1 transition-all"
            >
              Freebies
              <ChevronDown className={`w-4 h-4 transition-transform ${showFreebiesMenu ? 'rotate-180' : ''}`} />
            </button>
            
            <button 
              onClick={() => setShowAmenitiesMenu(!showAmenitiesMenu)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-purple-400 whitespace-nowrap flex items-center gap-1 transition-all"
            >
              Amenities
              <ChevronDown className={`w-4 h-4 transition-transform ${showAmenitiesMenu ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Results Sidebar (40%) */}
            <div className="w-2/5 bg-white border-r overflow-y-auto">
              {/* Destinations Carousel */}
              <div className="p-4 border-b">
                <h3 className="font-bold text-xs text-gray-500 mb-2 uppercase tracking-wide">Bridge55's Top {destinations.length}</h3>
                <h2 className="text-lg font-bold mb-3 text-gray-900">
                  Destinations in {query.includes('Kenya') ? 'Kenya' : 'Africa'}
                </h2>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {destinations.map((dest, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDestinationClick(dest.name)}
                      className={`flex-shrink-0 relative rounded-lg overflow-hidden transition-all group ${
                        selectedDestination === dest.name ? 'ring-2 ring-purple-600 shadow-xl' : 'hover:shadow-lg'
                      }`}
                      style={{ width: '140px', height: '100px' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-80" />
                      <div className="relative h-full flex flex-col items-center justify-center text-white p-2">
                        <div className="text-2xl mb-1">{dest.emoji}</div>
                        <div className="font-semibold text-sm text-center">{dest.name}</div>
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 rounded text-xs font-semibold text-gray-700">
                        Most popular
                      </div>
                      {selectedDestination === dest.name && (
                        <div className="absolute inset-0 border-2 border-purple-600 rounded-lg pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="nightlyFees" 
                      checked={nightlyFeesIncluded}
                      onChange={(e) => setNightlyFeesIncluded(e.target.checked)}
                      className="w-4 h-4 cursor-pointer" 
                    />
                    <label htmlFor="nightlyFees" className="text-sm text-gray-600 cursor-pointer">
                      Nightly including fees
                    </label>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">{sortedResults.length} results</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600">Sort by:</span>
                    <select 
                      value={sortBy}
                      onChange={handleSort}
                      className="font-semibold text-gray-900 border-none outline-none cursor-pointer bg-transparent"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="price-low">Price (low to high)</option>
                      <option value="price-high">Price (high to low)</option>
                      <option value="hotel-class">Hotel class (highest first)</option>
                      <option value="review">Review score</option>
                      <option value="distance">Distance</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Result Cards */}
              <div>
                {sortedResults.map((result) => (
                  <div key={result.id} className="p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex gap-4">
                      {/* Image - Kayak size with real photos */}
                      <div className="w-52 h-36 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-5xl flex-shrink-0 relative group overflow-hidden">
                        {result.imageUrl}
                        
                        {/* Save & Share buttons - Top left */}
                        <div className="absolute top-2 left-2 flex gap-2">
                          <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <Bookmark className="w-4 h-4 text-gray-700" />
                          </button>
                          <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <Share2 className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                        
                        {/* Image dots - Bottom center */}
                        <div className="absolute bottom-2 left-0 right-0 flex gap-1.5 justify-center">
                          {[1,2,3,4,5].map((dot) => (
                            <div key={dot} className={`w-2 h-2 rounded-full ${dot === 1 ? 'bg-white' : 'bg-white/50'}`} />
                          ))}
                        </div>
                      </div>

                      {/* Details - Left side */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        {/* Badges & Rating */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="px-2 py-1 bg-green-700 text-white text-xs font-bold rounded">
                            {result.rating}
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{result.badge}</span>
                          <span className="text-xs text-gray-500">({result.reviewCount})</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded flex items-center gap-1">
                            <Hotel className="w-3 h-3" />
                            Rental
                          </span>
                        </div>

                        {/* Title & Location */}
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{result.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{result.location}</p>

                        {/* Details */}
                        <div className="text-sm text-gray-700 mb-4 space-y-1">
                          {result.details.map((detail, idx) => (
                            <p key={idx}>{detail}</p>
                          ))}
                        </div>
                      </div>

                      {/* Price & CTA - Right side column */}
                      <div className="flex flex-col items-end justify-between min-w-[180px]">
                        {/* Bridge55 branding badge */}
                        <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded">
                          BRIDGE55
                        </div>

                        {/* Price - Top right like Kayak */}
                        <div className="text-right mt-auto">
                          <div className="text-3xl font-bold text-gray-900 mb-1">${result.price}</div>
                          <div className="text-sm text-gray-600 mb-1">{result.priceLabel}</div>
                          <div className="text-xs text-green-600 mb-4">Free cancellation</div>
                          
                          {/* View Deal button */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/stays/${result.id}`);
                            }}
                            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
                          >
                            View Deal
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map (60%) */}
            <div className="flex-1 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Map View</h3>
                <p className="text-gray-600 max-w-md">
                  Interactive map showing all locations
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  Google Maps integration
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

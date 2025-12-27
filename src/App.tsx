import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TopNav } from './components/navigation/TopNav';
import { SideMenu } from './components/navigation/SideMenu';
import { BottomNav } from './components/navigation/BottomNav';
// import { FloatingDia } from './components/FloatingDia'; // TODO: Fix FloatingDia component
import { getMenuConfig } from './config/navigation';

type ServiceType = 'stays' | 'flights' | 'cars' | 'experiences' | 'evisa' | 'ai';

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<ServiceType>('stays');
  
  // Debug handler to see if clicks are working
  const handleServiceChange = (service: ServiceType) => {
    console.log('🔄 Service changing from:', activeService, 'to:', service);
    setActiveService(service);
  };
  
  // For demo purposes - you'd detect this from domain or user selection
  const platformMode = 'pan-african'; // or 'country-specific'
  const countryCode = undefined; // or 'CI' for Côte d'Ivoire
  const countryName = undefined; // or 'Côte d\'Ivoire'

  // Service-specific hero content
  const heroContent: Record<ServiceType, { title: string; subtitle: string }> = {
    stays: {
      title: 'Find Your Perfect African Stay',
      subtitle: 'Hotels, safari lodges, and unique homes across the continent'
    },
    flights: {
      title: 'Find the Best Flights to, from & within Africa',
      subtitle: 'Compare hundreds of airlines and book with confidence'
    },
    cars: {
      title: 'Rentals, Taxis & Rideshares in One Place',
      subtitle: 'Your ride, your way. From city taxis to safari 4x4s'
    },
    experiences: {
      title: 'Discover Unforgettable African Experiences',
      subtitle: 'Activities, events, and tours across the continent'
    },
    evisa: {
      title: 'Simplify Your Africa Visa & Entry',
      subtitle: 'Fast, reliable eVisa and ETA services for your destination'
    },
    ai: {
      title: 'Plan Your Dream African Trip with AI',
      subtitle: 'Get a personalized itinerary from "Dia", your AI travel expert'
    }
  };

  const currentHero = heroContent[activeService];
  
  // Debug log to see current values
  console.log('🎯 Current active service:', activeService);
  console.log('📝 Current hero:', currentHero);

  const menuSections = getMenuConfig(platformMode, countryCode);

  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <TopNav
        onMenuClick={() => setIsSideMenuOpen(true)}
        platformMode={platformMode}
        countryName={countryName}
      />

      {/* Side Menu */}
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        sections={menuSections}
      />

      {/* Bottom Navigation (Mobile) */}
      <BottomNav />

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              {currentHero.title}
            </h1>
            <p className="text-lg text-gray-600">
              {currentHero.subtitle}
            </p>
          </div>

          {/* Service Tabs */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <ServiceTabs activeService={activeService} onServiceChange={handleServiceChange} />
            
            {/* Search Interface based on active service */}
            <div className="mt-6">
              <SearchInterface service={activeService} />
            </div>
          </div>

          {/* Demo Info */}
          <div className="mt-8 p-6 bg-white/80 backdrop-blur rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🎮 Demo Controls
            </h2>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Current Mode:</strong>{' '}
                <span className="text-primary font-semibold">
                  {platformMode === 'pan-african' ? '🌍 Pan-African' : `🇨🇮 ${countryName}`}
                </span>
              </p>
              <p>
                <strong>Active Service:</strong>{' '}
                <span className="text-blue-600 font-semibold capitalize">
                  {activeService === 'evisa' ? 'eVisa' : activeService === 'ai' ? 'AI Trip Planning' : activeService}
                </span>
              </p>
              <div>
                <strong>Try:</strong>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• Click hamburger menu (☰) to see all services</li>
                  <li>• Switch between service tabs above</li>
                  <li>• Watch the hero title change!</li>
                  <li>• Resize window for mobile view</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <FeatureCard
              icon="✈️"
              title="8 Services"
              description="Flights, Stays, Cars, Tours, Events, Activities, Visa, AI Planning"
            />
            <FeatureCard
              icon="🌍"
              title="54 Countries"
              description="Complete coverage of all African countries with local expertise"
            />
            <FeatureCard
              icon="🤖"
              title="BridgeAI"
              description="AI-powered trip planning tailored for African destinations"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Feature Card Component
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

// Service Tabs Component
interface ServiceTabsProps {
  activeService: ServiceType;
  onServiceChange: (service: ServiceType) => void;
}

function ServiceTabs({ activeService, onServiceChange }: ServiceTabsProps) {
  const services = [
    { id: 'stays' as const, label: 'Stays', icon: '🏨' },
    { id: 'flights' as const, label: 'Flights', icon: '✈️' },
    { id: 'cars' as const, label: 'Cars', icon: '🚗' },
    { id: 'experiences' as const, label: 'Experiences', icon: '🎭' },
    { id: 'evisa' as const, label: 'eVisa', icon: '🛂' },
    { id: 'ai' as const, label: 'Plan My Trip', icon: '✨', special: true },
  ];

  return (
    <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => onServiceChange(service.id)}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
            transition-all duration-200
            ${activeService === service.id
              ? service.special
                ? 'bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-white shadow-lg'
                : 'bg-blue-50 text-blue-700 border-2 border-blue-500'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }
            ${service.special && activeService !== service.id
              ? 'border-2 border-transparent bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10'
              : ''
            }
          `}
        >
          <span className="text-lg">{service.icon}</span>
          <span>{service.label}</span>
        </button>
      ))}
    </div>
  );
}

// Search Interface Component
interface SearchInterfaceProps {
  service: ServiceType;
}

function SearchInterface({ service }: SearchInterfaceProps) {
  const [flightType, setFlightType] = useState<'roundtrip' | 'one-way' | 'multi-city'>('roundtrip');
  const [carType, setCarType] = useState<'rental' | 'taxi' | 'rideshare'>('rental');
  const [experienceType, setExperienceType] = useState<'things-to-do' | 'events' | 'tours'>('things-to-do');
  
  // Search form state for Stays
  const [staysLocation, setStaysLocation] = useState('');
  const [staysDates, setStaysDates] = useState('Nov 13 — Nov 15');
  const [staysGuests, setStaysGuests] = useState('2 Adults, 1 Room');
  
  // Search form state for Flights
  const [flightsFrom, setFlightsFrom] = useState('');
  const [flightsTo, setFlightsTo] = useState('');
  const [flightsDates, setFlightsDates] = useState('Nov 13 — Nov 15');
  const [flightsTravelers, setFlightsTravelers] = useState('1 Adult, Economy');
  
  // Search form state for Cars
  const [carsLocation, setCarsLocation] = useState('');
  const [carsPickup, setCarsPickup] = useState('Nov 13');
  const [carsReturn, setCarsReturn] = useState('Nov 15');
  
  // Search form state for Experiences
  const [experiencesLocation, setExperiencesLocation] = useState('');
  const [experiencesDate, setExperiencesDate] = useState('Nov 13');
  
  const handleStaysSearch = () => {
    // Navigate to results with search params
    const params = new URLSearchParams({
      location: staysLocation || 'Africa',
      dates: staysDates,
      guests: staysGuests
    });
    window.location.href = `/stays/results?${params.toString()}`;
  };
  
  const handleFlightsSearch = () => {
    const params = new URLSearchParams({
      from: flightsFrom || 'New York',
      to: flightsTo || 'Nairobi',
      date: flightsDates.split(' —')[0].trim(),
      travelers: flightsTravelers
    });
    window.location.href = `/flights/results?${params.toString()}`;
  };
  
  const handleCarsSearch = () => {
    const params = new URLSearchParams({
      location: carsLocation || 'Nairobi',
      pickup: carsPickup,
      return: carsReturn
    });
    window.location.href = `/cars/results?${params.toString()}`;
  };
  
  const handleExperiencesSearch = () => {
    const params = new URLSearchParams({
      location: experiencesLocation || 'Kenya',
      date: experiencesDate
    });
    window.location.href = `/experiences/results?${params.toString()}`;
  };

  // AI Mode
  if (service === 'ai') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5 rounded-lg border-2 border-transparent bg-clip-padding">
          <span className="text-2xl">✨</span>
          <input
            type="text"
            placeholder="Tell me about your dream African adventure..."
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 font-medium"
          />
          <Link to="/ai-trip-planner" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold">
            Plan My Trip
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/ai-trip-planner"><SuggestionChip>🦁 Safari in Kenya</SuggestionChip></Link>
          <Link to="/ai-trip-planner"><SuggestionChip>🏖️ Beach getaway</SuggestionChip></Link>
          <Link to="/ai-trip-planner"><SuggestionChip>🏛️ Cultural tours</SuggestionChip></Link>
          <Link to="/ai-trip-planner"><SuggestionChip>💰 Budget options</SuggestionChip></Link>
        </div>
      </div>
    );
  }

  // Flights
  if (service === 'flights') {
    return (
      <div className="space-y-4">
        {/* Flight Type Tabs */}
        <div className="flex gap-2 pb-3 border-b border-gray-200">
          <SubTab active={flightType === 'roundtrip'} onClick={() => setFlightType('roundtrip')}>
            Roundtrip
          </SubTab>
          <SubTab active={flightType === 'one-way'} onClick={() => setFlightType('one-way')}>
            One-Way
          </SubTab>
          <SubTab active={flightType === 'multi-city'} onClick={() => setFlightType('multi-city')}>
            Multi-City
          </SubTab>
        </div>

        {/* Search Fields - Now with inline button */}
        <div className="grid md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <input
              type="text"
              placeholder="City or airport"
              value={flightsFrom}
              onChange={(e) => setFlightsFrom(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <input
              type="text"
              placeholder="City or airport"
              value={flightsTo}
              onChange={(e) => setFlightsTo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {flightType === 'roundtrip' ? 'Depart — Return' : 'Depart'}
            </label>
            <input
              type="text"
              placeholder="Nov 13 — Nov 15"
              value={flightsDates}
              onChange={(e) => setFlightsDates(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
            <input
              type="text"
              placeholder="1 Adult, Economy"
              value={flightsTravelers}
              onChange={(e) => setFlightsTravelers(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleFlightsSearch}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Cars
  if (service === 'cars') {
    return (
      <div className="space-y-4">
        {/* Car Type Tabs */}
        <div className="flex gap-2 pb-3 border-b border-gray-200">
          <SubTab active={carType === 'rental'} onClick={() => setCarType('rental')}>
            🚗 Rental Cars
          </SubTab>
          <SubTab active={carType === 'taxi'} onClick={() => setCarType('taxi')}>
            🚕 Taxi
          </SubTab>
          <SubTab active={carType === 'rideshare'} onClick={() => setCarType('rideshare')}>
            🚙 Ride Share
          </SubTab>
        </div>

        {/* Search Fields */}
        {carType === 'rental' ? (
          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Location</label>
              <input
                type="text"
                placeholder="City or airport"
                value={carsLocation}
                onChange={(e) => setCarsLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Date</label>
              <input
                type="text"
                placeholder="Nov 13"
                value={carsPickup}
                onChange={(e) => setCarsPickup(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Date</label>
              <input
                type="text"
                placeholder="Nov 15"
                value={carsReturn}
                onChange={(e) => setCarsReturn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Driver Age</label>
              <input
                type="text"
                placeholder="25+"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleCarsSearch}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Search
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Location</label>
              <input
                type="text"
                placeholder="Enter address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location</label>
              <input
                type="text"
                placeholder="Enter address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">When</label>
              <input
                type="text"
                placeholder="Now or schedule"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Experiences
  if (service === 'experiences') {
    // Different categories for each experience type
    const categories = {
      'things-to-do': [
        'All activities',
        'Safari & Wildlife',
        'Water Sports',
        'Adventure & Hiking',
        'Food & Dining',
        'Nightlife & Entertainment',
        'Museums & Culture',
        'Shopping',
        'Wellness & Spa'
      ],
      'events': [
        'All events',
        'Music Festivals',
        'Cultural Celebrations',
        'Sports Events',
        'Art & Film Festivals',
        'Food & Wine Events',
        'Business & Conferences',
        'Religious Events'
      ],
      'tours': [
        'All tours',
        'City Tours',
        'Safari Tours',
        'Historical Tours',
        'Food Tours',
        'Day Trips',
        'Multi-Day Tours',
        'Private Tours',
        'Group Tours'
      ]
    };

    return (
      <div className="space-y-4">
        {/* Experience Type Tabs */}
        <div className="flex gap-2 pb-3 border-b border-gray-200">
          <SubTab active={experienceType === 'things-to-do'} onClick={() => setExperienceType('things-to-do')}>
            🎭 Things to Do
          </SubTab>
          <SubTab active={experienceType === 'events'} onClick={() => setExperienceType('events')}>
            🎪 Events
          </SubTab>
          <SubTab active={experienceType === 'tours'} onClick={() => setExperienceType('tours')}>
            🗺️ Tours
          </SubTab>
        </div>

        {/* Search Fields - Now with inline button */}
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Where</label>
            <input
              type="text"
              placeholder="Destination"
              value={experiencesLocation}
              onChange={(e) => setExperiencesLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">When</label>
            <input
              type="text"
              placeholder="Nov 13"
              value={experiencesDate}
              onChange={(e) => setExperiencesDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
              {categories[experienceType].map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleExperiencesSearch}
              className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Stays (default)
  if (service === 'stays') {
    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Going to</label>
            <input
              type="text"
              placeholder="City, property, or airport"
              value={staysLocation}
              onChange={(e) => setStaysLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-in — Check-out</label>
            <input
              type="text"
              placeholder="Nov 13 — Nov 15"
              value={staysDates}
              onChange={(e) => setStaysDates(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
            <input
              type="text"
              placeholder="2 Adults, 1 Room"
              value={staysGuests}
              onChange={(e) => setStaysGuests(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleStaysSearch}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  // eVisa
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Nationality</label>
          <input
            type="text"
            placeholder="Select country"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Traveling To</label>
          <input
            type="text"
            placeholder="African country"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
          <input
            type="text"
            placeholder="Select date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="flex items-end">
          <Link to="/evisa/requirements?country=CI" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center">
            Check Visa
          </Link>
        </div>
      </div>

      {/* Floating Dia AI Assistant - TODO: Fix component */}
      {/* <FloatingDia /> */}
    </div>
  );
}

// Suggestion Chip Component
function SuggestionChip({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all">
      {children}
    </button>
  );
}

// SubTab Component for sub-options
interface SubTabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function SubTab({ active, onClick, children }: SubTabProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 text-sm font-medium rounded-md transition-all
        ${active
          ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
          : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
        }
      `}
    >
      {children}
    </button>
  );
}

export default App;

// Import the new DiaSearchResults page
import { DiaSearchResults } from './pages/DiaSearchResults';

import { useState } from 'react';
import { TopNav } from '../components/navigation/TopNav';
import { SideMenu } from '../components/navigation/SideMenu';
import { BottomNav } from '../components/navigation/BottomNav';
import { getMenuConfig } from '../config/navigation';
import { ServiceTabs } from '../components/ServiceTabs';
import { SearchInterface } from '../components/SearchInterface';

type ServiceType = 'stays' | 'flights' | 'cars' | 'experiences' | 'evisa' | 'ai';

export function Home() {
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

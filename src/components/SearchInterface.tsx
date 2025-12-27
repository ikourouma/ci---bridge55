import { useState } from 'react';

// Import existing form components (we'll create the new ones)
// import { FlightsSearchForm } from './forms/FlightsSearchForm';
// import { StaysSearchForm } from './forms/StaysSearchForm';
import { CarsSearchForm } from './forms/CarsSearchForm';
import { ExperiencesSearchForm } from './forms/ExperiencesSearchForm';
// import { EvisaSearchForm } from './forms/EvisaSearchForm';
// import { AISearchForm } from './forms/AISearchForm';

type ServiceType = 'stays' | 'flights' | 'cars' | 'experiences' | 'evisa' | 'ai';

interface SearchInterfaceProps {
  service: ServiceType;
}

export function SearchInterface({ service }: SearchInterfaceProps) {
  // Placeholder for flights search
  if (service === 'flights') {
    return (
      <div className="p-8 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-600">Flights Search Form (Coming Soon)</p>
        <p className="text-sm text-gray-500 mt-2">Search for flights across Africa</p>
      </div>
    );
  }

  // Placeholder for stays search
  if (service === 'stays') {
    return (
      <div className="p-8 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-600">Stays Search Form (Coming Soon)</p>
        <p className="text-sm text-gray-500 mt-2">Find hotels, resorts, and unique accommodations</p>
      </div>
    );
  }

  // Cars Search with Sub-Services
  if (service === 'cars') {
    return <CarsSearchForm />;
  }

  // Experiences Search with Sub-Services
  if (service === 'experiences') {
    return <ExperiencesSearchForm />;
  }

  // Placeholder for eVisa
  if (service === 'evisa') {
    return (
      <div className="p-8 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-600">eVisa Requirements Checker (Coming Soon)</p>
        <p className="text-sm text-gray-500 mt-2">Check visa requirements and apply online</p>
      </div>
    );
  }

  // Placeholder for AI
  if (service === 'ai') {
    return (
      <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg text-center">
        <p className="text-gray-700 font-semibold">✨ BridgeAI Trip Planner</p>
        <p className="text-sm text-gray-600 mt-2">Chat with Dia to plan your perfect African adventure</p>
        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
          Start Planning
        </button>
      </div>
    );
  }

  return null;
}


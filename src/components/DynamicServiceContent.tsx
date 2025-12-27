import { useState, useEffect } from 'react';
import { Sparkles, Plane, Car, MapPin, FileText } from 'lucide-react';
import { FeaturedStays } from './FeaturedStays';
import { EvisaComparison } from './EvisaComparison';
import { SliderContainer } from './SliderContainer';
import { ErrorBoundary } from './ErrorBoundary';
import { OptimizedImage } from './OptimizedImage';
import { useNavigate } from 'react-router-dom';

type ServiceType = 'stays' | 'flights' | 'cars' | 'experiences' | 'evisa';

interface DynamicServiceContentProps {
  activeService: ServiceType;
  activeRegion?: string;
}

// Flight destinations data
const flightDestinations = [
  {
    id: 1,
    city: 'Cairo',
    country: 'Egypt',
    region: 'north',
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80',
    fromPrice: 245,
    popular: true,
  },
  {
    id: 2,
    city: 'Nairobi',
    country: 'Kenya',
    region: 'east',
    imageUrl: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800&q=80',
    fromPrice: 189,
    popular: false,
  },
  {
    id: 3,
    city: 'Lagos',
    country: 'Nigeria',
    region: 'west',
    imageUrl: 'https://images.unsplash.com/photo-1632832561211-49f467bcb269?w=800&q=80',
    fromPrice: 299,
    popular: false,
  },
  {
    id: 4,
    city: 'Cape Town',
    country: 'South Africa',
    region: 'southern',
    imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
    fromPrice: 320,
    popular: true,
  },
];

// Car rental deals data
const carRentalDeals = [
  {
    id: 1,
    location: 'Johannesburg',
    country: 'South Africa',
    region: 'southern',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    carType: 'SUV',
    fromPrice: 45,
  },
  {
    id: 2,
    location: 'Marrakech',
    country: 'Morocco',
    region: 'north',
    imageUrl: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80',
    carType: 'Compact',
    fromPrice: 28,
  },
  {
    id: 3,
    location: 'Nairobi',
    country: 'Kenya',
    region: 'east',
    imageUrl: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800&q=80',
    carType: '4x4',
    fromPrice: 65,
  },
  {
    id: 4,
    location: 'Accra',
    country: 'Ghana',
    region: 'west',
    imageUrl: 'https://images.unsplash.com/photo-1611348586755-53860f7ae57f?w=800&q=80',
    carType: 'Economy',
    fromPrice: 32,
  },
];

// Experiences data
const experiences = [
  {
    id: 1,
    title: 'Serengeti Safari',
    location: 'Tanzania',
    region: 'east',
    imageUrl: 'https://images.unsplash.com/photo-1547970810-dc1e684middle8a6?w=800&q=80',
    fromPrice: 450,
    rating: 4.9,
  },
  {
    id: 2,
    title: 'Table Mountain Hike',
    location: 'South Africa',
    region: 'southern',
    imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
    fromPrice: 85,
    rating: 4.8,
  },
  {
    id: 3,
    title: 'Sahara Desert Tour',
    location: 'Morocco',
    region: 'north',
    imageUrl: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&q=80',
    fromPrice: 220,
    rating: 4.9,
  },
  {
    id: 4,
    title: 'Victoria Falls Tour',
    location: 'Zimbabwe',
    region: 'southern',
    imageUrl: 'https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800&q=80',
    fromPrice: 150,
    rating: 4.9,
  },
];

export function DynamicServiceContent({ activeService, activeRegion = 'all' }: DynamicServiceContentProps) {
  const navigate = useNavigate();

  // Filter data based on active region
  const filterByRegion = <T extends { region: string }>(items: T[]) => {
    if (activeRegion === 'all') return items;
    return items.filter(item => item.region === activeRegion);
  };

  const filteredFlights = filterByRegion(flightDestinations);
  const filteredCars = filterByRegion(carRentalDeals);
  const filteredExperiences = filterByRegion(experiences);

  // Stays Service
  if (activeService === 'stays') {
    return <FeaturedStays />;
  }

  // Flights Service
  if (activeService === 'flights') {
    return (
      <ErrorBoundary>
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                <Plane className="w-4 h-4" />
                <span>Flight Deals</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Top Destinations by Flight
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the best flight deals to Africa's most popular cities
              </p>
            </div>

            {/* Unified Slider Container with Navigation */}
            <SliderContainer
              totalItems={filteredFlights.length}
              itemsPerPage={4}
              showIndicators={true}
              ariaLabel="Top flight destinations across Africa"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFlights.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => navigate(`/flights/results?to=${dest.city}`)}
                    className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={dest.imageUrl}
                        alt={`${dest.city}, ${dest.country}`}
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      {dest.popular && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                          Popular
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{dest.city}</h3>
                      <p className="text-sm text-gray-600 mb-3">{dest.country}</p>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-xs text-gray-600">From</span>
                        <span className="text-2xl font-bold text-blue-600">${dest.fromPrice}</span>
                      </div>
                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold text-sm hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SliderContainer>

            {/* View All CTA - Matches "View All Deals" Standard */}
            <div className="text-center mt-12">
              <button 
                onClick={() => navigate('/flights')}
                className="bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
              >
                <span>View All Flights</span>
                <span className="text-2xl">→</span>
              </button>
            </div>
          </div>
        </section>
      </ErrorBoundary>
    );
  }

  // Cars Service
  if (activeService === 'cars') {
    return (
      <ErrorBoundary>
        <section className="py-16 bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                <Car className="w-4 h-4" />
                <span>Car Rentals</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured Car Rental Deals
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore Africa at your own pace with our best car rental offers
              </p>
            </div>

            {/* Unified Slider Container with Navigation */}
            <SliderContainer
              totalItems={filteredCars.length}
              itemsPerPage={4}
              showIndicators={true}
              ariaLabel="Featured car rental deals across Africa"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCars.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => navigate(`/cars/results?location=${car.location}`)}
                    className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={car.imageUrl}
                        alt={`${car.location}, ${car.country}`}
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                        {car.carType}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{car.location}</h3>
                      <p className="text-sm text-gray-600 mb-3">{car.country}</p>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-xs text-gray-600">From</span>
                        <span className="text-2xl font-bold text-green-600">${car.fromPrice}</span>
                        <span className="text-xs text-gray-600">/day</span>
                      </div>
                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold text-sm hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SliderContainer>

            {/* View All CTA - Matches "View All Deals" Standard */}
            <div className="text-center mt-12">
              <button 
                onClick={() => navigate('/cars')}
                className="bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
              >
                <span>View All Rental Cars</span>
                <span className="text-2xl">→</span>
              </button>
            </div>
          </div>
        </section>
      </ErrorBoundary>
    );
  }

  // Experiences Service
  if (activeService === 'experiences') {
    return (
      <ErrorBoundary>
        <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>Local Experiences</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Top Local Experiences
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Unforgettable adventures and authentic cultural experiences across Africa
              </p>
            </div>

            {/* Unified Slider Container with Navigation */}
            <SliderContainer
              totalItems={filteredExperiences.length}
              itemsPerPage={4}
              showIndicators={true}
              ariaLabel="Top local experiences across Africa"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => navigate(`/experiences/details/${exp.id}`)}
                    className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={exp.imageUrl}
                        alt={exp.title}
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                        ★ {exp.rating}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{exp.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{exp.location}</p>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-xs text-gray-600">From</span>
                        <span className="text-2xl font-bold text-orange-600">${exp.fromPrice}</span>
                      </div>
                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold text-sm hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SliderContainer>

            {/* View All CTA - Matches "View All Deals" Standard */}
            <div className="text-center mt-12">
              <button 
                onClick={() => navigate('/experiences')}
                className="bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
              >
                <span>View All Experiences</span>
                <span className="text-2xl">→</span>
              </button>
            </div>
          </div>
        </section>
      </ErrorBoundary>
    );
  }

  // eVisa Service - Trust-first approach with comparison
  if (activeService === 'evisa') {
    return (
      <ErrorBoundary>
        {/* Primary Content: Trust Comparison */}
        <EvisaComparison />

        {/* Secondary Content: Quick Guide */}
        <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                <FileText className="w-4 h-4" />
                <span>Simple Process</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Get your eVisa in 3 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
                <div className="w-12 h-12 bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Check Requirements</h3>
                <p className="text-gray-600">Verify visa requirements for your destination country</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
                <div className="w-12 h-12 bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Apply Online</h3>
                <p className="text-gray-600">Submit your application through our secure platform</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
                <div className="w-12 h-12 bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Receive eVisa</h3>
                <p className="text-gray-600">Get your approved eVisa delivered via email</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => navigate('/evisa')}
                className="bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] text-white px-10 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Start Your Application
              </button>
            </div>
          </div>
        </section>
      </ErrorBoundary>
    );
  }

  return null;
}

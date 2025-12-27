import { DestinationCard } from './DestinationCard';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SliderContainer } from './SliderContainer';
import { ErrorBoundary } from './ErrorBoundary';

const featuredDestinations = [
  {
    id: 1,
    name: 'Cape Town',
    country: 'South Africa',
    imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
    pricePerNight: 89,
    rating: 4.8,
    reviewCount: 12543,
    popularTag: 'Most Popular'
  },
  {
    id: 2,
    name: 'Nairobi',
    country: 'Kenya',
    imageUrl: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800&q=80',
    pricePerNight: 120,
    rating: 4.7,
    reviewCount: 8921,
    popularTag: 'Safari Hub'
  },
  {
    id: 3,
    name: 'Marrakech',
    country: 'Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80',
    pricePerNight: 75,
    rating: 4.9,
    reviewCount: 15234,
    popularTag: 'Best Value'
  },
  {
    id: 4,
    name: 'Zanzibar',
    country: 'Tanzania',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
    pricePerNight: 95,
    rating: 4.9,
    reviewCount: 7654,
    popularTag: 'Beach Paradise'
  },
];

interface FeaturedStaysProps {
  onDestinationClick?: (destination: string) => void;
}

export function FeaturedStays({ onDestinationClick }: FeaturedStaysProps) {
  const navigate = useNavigate();

  const handleCardClick = (stayId: number) => {
    navigate(`/stays/${stayId}`);
  };

  const handleExploreAll = () => {
    navigate('/stays');
  };

  return (
    <ErrorBoundary>
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Featured Destinations</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Amazing Stays Across{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Africa
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From luxury resorts to boutique hotels, find your perfect accommodation in Africa's most stunning destinations
            </p>
          </div>

          {/* Unified Slider Container */}
          <SliderContainer
            totalItems={featuredDestinations.length}
            itemsPerPage={4}
            showIndicators={true}
            ariaLabel="Featured stays across Africa"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredDestinations.map((destination) => (
                <div key={destination.id} onClick={() => handleCardClick(destination.id)}>
                  <DestinationCard
                    name={destination.name}
                    country={destination.country}
                    imageUrl={destination.imageUrl}
                    pricePerNight={destination.pricePerNight}
                    rating={destination.rating}
                    reviewCount={destination.reviewCount}
                    popularTag={destination.popularTag}
                  />
                </div>
              ))}
            </div>
          </SliderContainer>

          {/* View All CTA */}
          <div className="text-center mt-4">
            <button 
              onClick={handleExploreAll}
              className="bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Explore All Destinations</span>
              <span className="text-2xl">→</span>
            </button>
          </div>

          {/* Trust Signals */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-purple-600">50,000+</p>
                <p className="text-gray-600 mt-1">Properties Listed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">2M+</p>
                <p className="text-gray-600 mt-1">Happy Travelers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">4.8★</p>
                <p className="text-gray-600 mt-1">Average Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">24/7</p>
                <p className="text-gray-600 mt-1">Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}

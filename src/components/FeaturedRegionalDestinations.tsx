import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const regionalDestinations = [
  {
    id: 1,
    name: 'Table Mountain',
    region: 'Southern Africa',
    regionSlug: 'southern-africa',
    country: 'South Africa',
    imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
  },
  {
    id: 2,
    name: 'Victoria Falls',
    region: 'Southern Africa',
    regionSlug: 'southern-africa',
    country: 'Zimbabwe',
    imageUrl: 'https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800&q=80',
  },
  {
    id: 3,
    name: 'Pyramids of Giza',
    region: 'North Africa',
    regionSlug: 'north-africa',
    country: 'Egypt',
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80',
  },
  {
    id: 4,
    name: 'Djemaa el-Fna',
    region: 'North Africa',
    regionSlug: 'north-africa',
    country: 'Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80',
  },
  {
    id: 5,
    name: 'Serengeti Plains',
    region: 'East Africa',
    regionSlug: 'east-africa',
    country: 'Tanzania',
    imageUrl: 'https://images.unsplash.com/photo-1547970810-dc1e684middle8a6?w=800&q=80',
  },
  {
    id: 6,
    name: 'Mount Kilimanjaro',
    region: 'East Africa',
    regionSlug: 'east-africa',
    country: 'Tanzania',
    imageUrl: 'https://images.unsplash.com/photo-1609198092357-a9cdbb6f9636?w=800&q=80',
  },
  {
    id: 7,
    name: 'Zuma Rock',
    region: 'West Africa',
    regionSlug: 'west-africa',
    country: 'Nigeria',
    imageUrl: 'https://images.unsplash.com/photo-1632832561211-49f467bcb269?w=800&q=80',
  },
  {
    id: 8,
    name: 'Independence Square',
    region: 'West Africa',
    regionSlug: 'west-africa',
    country: 'Ghana',
    imageUrl: 'https://images.unsplash.com/photo-1611348586755-53860f7ae57f?w=800&q=80',
  },
];

export function FeaturedRegionalDestinations() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 4;
  const totalSlides = Math.ceil(regionalDestinations.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleDestinationClick = (regionSlug: string) => {
    // Redirect to discover page with specific region filter pre-applied
    navigate(`/stays?region=${regionSlug}`);
  };

  const handleExploreAllRegions = () => {
    // Redirect to main discovery page
    navigate('/stays');
  };

  const visibleDestinations = regionalDestinations.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Regional Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover iconic landmarks and breathtaking destinations across all African regions
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-xl border-2 border-gray-200 flex items-center justify-center hover:bg-purple-50 hover:border-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-xl border-2 border-gray-200 flex items-center justify-center hover:bg-purple-50 hover:border-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleDestinations.map((destination) => (
              <div
                key={destination.id}
                onClick={() => handleDestinationClick(destination.regionSlug)}
                className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden bg-gray-200">
                  <img
                    src={destination.imageUrl}
                    alt={`${destination.name}, ${destination.country}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                  {/* Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                    <p className="text-sm text-white/90 mb-1">{destination.country}</p>
                    <p className="text-xs text-white/70">{destination.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? 'w-8 bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleExploreAllRegions}
            className="bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] text-white px-10 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3 transform hover:scale-105"
          >
            <span>Explore All Regions</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

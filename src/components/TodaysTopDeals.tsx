import { TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SliderContainer } from './SliderContainer';
import { ErrorBoundary } from './ErrorBoundary';
import { OptimizedImage } from './OptimizedImage';

const topDeals = [
  {
    id: 1,
    title: 'Maasai Mara Safari',
    location: 'Kenya',
    nights: 3,
    originalPrice: 650,
    salePrice: 450,
    discount: 31,
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
  },
  {
    id: 2,
    title: 'Zanzibar Beach Resort',
    location: 'Tanzania',
    nights: 2,
    originalPrice: 120,
    salePrice: 89,
    discount: 26,
    imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80',
  },
  {
    id: 3,
    title: 'Cape Town City Break',
    location: 'South Africa',
    nights: 3,
    originalPrice: 140,
    salePrice: 95,
    discount: 32,
    imageUrl: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800&q=80',
  },
  {
    id: 4,
    title: 'Marrakech Experience',
    location: 'Morocco',
    nights: 2,
    originalPrice: 110,
    salePrice: 75,
    discount: 32,
    imageUrl: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&q=80',
  },
];

export function TodaysTopDeals() {
  const navigate = useNavigate();

  const handleDealClick = (dealId: number) => {
    navigate(`/deals/${dealId}`);
  };

  const handleViewAllDeals = () => {
    navigate('/deals');
  };

  return (
    <ErrorBoundary>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm mb-3">
              <TrendingUp className="w-4 h-4" />
              <span>Limited Time</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Today's Top Deals
            </h2>
            <p className="text-xl text-gray-600">
              Limited-time offers you don't want to miss
            </p>
          </div>

          {/* Unified Slider Container */}
          <SliderContainer
            totalItems={topDeals.length}
            itemsPerPage={4}
            showIndicators={true}
            ariaLabel="Today's top travel deals"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topDeals.map((deal) => (
                <div
                  key={deal.id}
                  onClick={() => handleDealClick(deal.id)}
                  className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <OptimizedImage
                      src={deal.imageUrl}
                      alt={`${deal.title}, ${deal.location}`}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                      Save {deal.discount}%
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title & Duration */}
                    <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                      {deal.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {deal.nights} nights
                    </p>

                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-purple-600">
                          ${deal.salePrice}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          ${deal.originalPrice}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SliderContainer>

          {/* View All Deals CTA */}
          <div className="text-center mt-12">
            <button 
              onClick={handleViewAllDeals}
              className="bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              <span>View All Deals</span>
              <span className="text-2xl">→</span>
            </button>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}

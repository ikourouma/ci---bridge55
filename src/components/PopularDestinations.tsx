import { ArrowRight } from 'lucide-react';

const popularDestinations = [
  {
    id: 1,
    name: 'Maasai Mara',
    country: 'Kenya',
    category: 'Safari',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    priceFrom: 450,
  },
  {
    id: 2,
    name: 'Zanzibar',
    country: 'Tanzania',
    category: 'Beach',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
    priceFrom: 89,
  },
  {
    id: 3,
    name: 'Marrakech',
    country: 'Morocco',
    category: 'Culture',
    imageUrl: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80',
    priceFrom: 65,
  },
  {
    id: 4,
    name: 'Victoria Falls',
    country: 'Zimbabwe',
    category: 'Adventure',
    imageUrl: 'https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800&q=80',
    priceFrom: 120,
  },
  {
    id: 5,
    name: 'Cape Town',
    country: 'South Africa',
    category: 'City',
    imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
    priceFrom: 95,
  },
  {
    id: 6,
    name: 'Serengeti',
    country: 'Tanzania',
    category: 'Safari',
    imageUrl: 'https://images.unsplash.com/photo-1547970810-dc1e684middle8a6?w=800&q=80',
    priceFrom: 380,
  },
  {
    id: 7,
    name: 'Essaouira',
    country: 'Morocco',
    category: 'Beach',
    imageUrl: 'https://images.unsplash.com/photo-1570026517541-4cb01c7e9f6b?w=800&q=80',
    priceFrom: 55,
  },
  {
    id: 8,
    name: 'Kruger Park',
    country: 'South Africa',
    category: 'Wildlife',
    imageUrl: 'https://images.unsplash.com/photo-1535338244499-d099a3e1f68d?w=800&q=80',
    priceFrom: 200,
  },
];

const categoryColors: Record<string, string> = {
  Safari: 'bg-orange-100 text-orange-700',
  Beach: 'bg-blue-100 text-blue-700',
  Culture: 'bg-purple-100 text-purple-700',
  Adventure: 'bg-green-100 text-green-700',
  City: 'bg-pink-100 text-pink-700',
  Wildlife: 'bg-yellow-100 text-yellow-700',
};

export function PopularDestinations() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the best of Africa - from safaris to beaches, cities to culture
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((destination) => (
            <div
              key={destination.id}
              className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1"
            >
              {/* Image Container with Category Badge */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={destination.imageUrl}
                  alt={`${destination.name}, ${destination.country}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[destination.category]} shadow-md`}>
                  {destination.category}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Destination Name */}
                <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                  {destination.name}
                </h3>
                
                {/* Country */}
                <p className="text-gray-600 text-sm mb-4">
                  {destination.country}
                </p>

                {/* Price & Arrow */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-purple-600 font-bold text-xl">
                      From ${destination.priceFrom}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-600 hover:text-white transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
            <span>Explore All Destinations</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

import { MapPin, Star, TrendingUp } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface DestinationCardProps {
  name: string;
  country: string;
  imageUrl: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  popularTag?: string;
  onClick?: () => void;
}

export function DestinationCard({
  name,
  country,
  imageUrl,
  pricePerNight,
  rating,
  reviewCount,
  popularTag,
  onClick
}: DestinationCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <OptimizedImage
          src={imageUrl}
          alt={`${name}, ${country}`}
          className="group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Popular Tag */}
        {popularTag && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-10">
            <TrendingUp className="w-3 h-3" />
            {popularTag}
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span>{country}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-purple-600 text-white px-2 py-1 rounded-md text-sm font-bold">
            <Star className="w-3 h-3 fill-current" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-600 text-sm">
            {reviewCount.toLocaleString()} reviews
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-gray-600 text-xs">Starting from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-purple-600">
                ${pricePerNight}
              </span>
              <span className="text-gray-600 text-sm">/night</span>
            </div>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

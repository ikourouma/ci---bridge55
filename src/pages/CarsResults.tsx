import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MapPin, Star, Phone, ExternalLink } from 'lucide-react';

interface CarListing {
  id: string;
  title: string;
  description: string;
  car_subtype: string;
  city: string;
  country: string;
  location: string;
  price: number;
  price_unit: string;
  currency: string;
  images: string[];
  rating: number;
  review_count: number;
  contact_phone?: string;
  contact_whatsapp?: string;
  service_data: {
    capacity?: number;
    transmission?: string;
    fuel_type?: string;
    insurance_included?: boolean;
  };
}

export function CarsResults() {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const subservice = searchParams.get('subservice') || 'rental_car';
  const location = searchParams.get('location') || '';

  useEffect(() => {
    fetchCars();
  }, [subservice, location]);

  async function fetchCars() {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('listings')
        .select('*')
        .eq('service_type', 'car')
        .eq('active', true);

      // Add location filter if provided
      if (location) {
        query = query.or(`city.ilike.%${location}%,location.ilike.%${location}%`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setListings(data || []);
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError('Failed to load car listings. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const subserviceTitles = {
    rental_car: 'Rental Cars',
    taxi: 'Taxi Services',
    rideshare: 'Rideshare Options',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="text-sm text-blue-600 hover:underline mb-2 inline-block">
                ← Back to Search
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                {subserviceTitles[subservice as keyof typeof subserviceTitles]}
              </h1>
              {location && (
                <p className="text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {location}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {listings.length} result{listings.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading {subserviceTitles[subservice as keyof typeof subserviceTitles]}...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => fetchCars()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && listings.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <p className="text-lg text-gray-800 mb-2">No {subserviceTitles[subservice as keyof typeof subserviceTitles]} found</p>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {!loading && !error && listings.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 relative">
                  {car.images && car.images[0] ? (
                    <img
                      src={car.images[0]}
                      alt={car.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                      🚗
                    </div>
                  )}
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 bg-white text-green-700 text-xs font-semibold rounded-full capitalize">
                      {car.car_subtype.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-gray-900">{car.title}</h3>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">{car.description}</p>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{car.location}</span>
                  </div>

                  {/* Rating */}
                  {car.rating > 0 && (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{car.rating.toFixed(1)}</span>
                      <span className="text-xs text-gray-500">({car.review_count} reviews)</span>
                    </div>
                  )}

                  {/* Service Data */}
                  {car.service_data && (
                    <div className="flex flex-wrap gap-2 text-xs">
                      {car.service_data.capacity && (
                        <span className="px-2 py-1 bg-gray-100 rounded">
                          👥 {car.service_data.capacity} seats
                        </span>
                      )}
                      {car.service_data.transmission && (
                        <span className="px-2 py-1 bg-gray-100 rounded capitalize">
                          ⚙️ {car.service_data.transmission}
                        </span>
                      )}
                      {car.service_data.fuel_type && (
                        <span className="px-2 py-1 bg-gray-100 rounded capitalize">
                          ⛽ {car.service_data.fuel_type}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Price & CTA */}
                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-700">
                        {car.currency === 'USD' ? '$' : car.currency} {car.price}
                      </p>
                      <p className="text-xs text-gray-500">
                        {car.price_unit.replace('_', ' ')}
                      </p>
                    </div>
                    
                    {car.contact_whatsapp && (
                      <a
                        href={`https://wa.me/${car.contact_whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MapPin, Star, Users, Bed, Bath, Home, ArrowRight } from 'lucide-react';

interface StayListing {
  id: string;
  title: string;
  description: string;
  property_type: string;
  type: string;
  city: string;
  country: string;
  address: string;
  price_per_night: number;
  currency: string;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  review_count: number;
  images: string[];
  amenities: string[];
  featured: boolean;
  active: boolean;
}

export function StaysResults() {
  const [searchParams] = useSearchParams();
  const [stays, setStays] = useState<StayListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkin') || '';
  const checkOut = searchParams.get('checkout') || '';
  const guests = searchParams.get('guests') || '1';
  const rooms = searchParams.get('rooms') || '1';

  useEffect(() => {
    fetchStays();
  }, [destination, guests]);

  async function fetchStays() {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching stays with params:', { destination, checkIn, checkOut, guests, rooms });

      // Build query step by step
      let query = supabase
        .from('listings')
        .select('*')
        .in('type', ['hotel', 'guesthouse', 'resort', 'villa', 'apartment'])
        .eq('active', true);

      // Filter by destination (city or country)
      if (destination) {
        // Use ilike for case-insensitive search on city or country
        query = query.or(`city.ilike.%${destination}%,country.ilike.%${destination}%`);
      }

      // Filter by guest capacity
      if (guests && parseInt(guests) > 0) {
        query = query.gte('max_guests', parseInt(guests));
      }

      const { data, error: fetchError } = await query;

      console.log('✅ Stays query result:', { count: data?.length, data, error: fetchError });

      if (fetchError) throw fetchError;

      setStays(data || []);
    } catch (err) {
      console.error('❌ Error fetching stays:', err);
      setError('Failed to load stays. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const nights = calculateNights();

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
              <h1 className="text-3xl font-bold text-gray-900">Stays in {destination || 'Africa'}</h1>
              {checkIn && checkOut && (
                <p className="text-gray-600 mt-1">
                  {new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}
                  {' • '}{nights} night{nights !== 1 ? 's' : ''}
                  {' • '}{guests} guest{Number(guests) !== 1 ? 's' : ''}
                  {rooms && ` • ${rooms} room${Number(rooms) !== 1 ? 's' : ''}`}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {stays.length} propert{stays.length !== 1 ? 'ies' : 'y'} found
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
            <p className="mt-4 text-gray-600">Searching stays...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => fetchStays()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && stays.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <Home className="w-16 h-16 mx-auto text-yellow-600 mb-4" />
            <p className="text-lg text-gray-800 mb-2">No properties found</p>
            <p className="text-gray-600">Try adjusting your search criteria</p>
            <Link
              to="/"
              className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              New Search
            </Link>
          </div>
        )}

        {!loading && !error && stays.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stays.map((stay) => (
              <div
                key={stay.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100">
                  {stay.images && stay.images.length > 0 ? (
                    <img
                      src={stay.images[0]}
                      alt={stay.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Home className="w-16 h-16 text-gray-400" />
                    </div>
                  )}

                  {/* Featured Badge */}
                  {stay.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Property Type Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur text-gray-800 text-xs font-semibold rounded-full capitalize">
                      {stay.property_type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="line-clamp-1">{stay.city}, {stay.country}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {stay.title}
                  </h3>

                  {/* Property Details */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{stay.max_guests} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{stay.bedrooms} bed{stay.bedrooms !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{stay.bathrooms} bath{stay.bathrooms !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  {/* Amenities Preview */}
                  {stay.amenities && stay.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {stay.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                      {stay.amenities.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{stay.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Rating */}
                  {stay.rating > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{stay.rating.toFixed(1)}</span>
                      </div>
                      {stay.review_count > 0 && (
                        <span className="text-xs text-gray-500">({stay.review_count} reviews)</span>
                      )}
                    </div>
                  )}

                  {/* Price & CTA */}
                  <div className="border-t pt-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          {stay.currency === 'USD' ? '$' : stay.currency}{stay.price_per_night}
                        </p>
                        <p className="text-xs text-gray-500">per night</p>
                        {nights > 1 && (
                          <p className="text-sm text-gray-600 mt-1">
                            ${stay.price_per_night * nights} total
                          </p>
                        )}
                      </div>
                      <Link
                        to={`/stays/${stay.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm"
                      >
                        View
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
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

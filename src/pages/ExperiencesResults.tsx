import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MapPin, Star, Clock, Users, Phone } from 'lucide-react';

interface ExperienceListing {
  id: string;
  title: string;
  description: string;
  experience_subtype: string;
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
    duration_hours?: number;
    duration_days?: number;
    languages?: string[];
    group_size_max?: number;
    difficulty_level?: string;
    event_date?: string;
    category?: string;
  };
}

export function ExperiencesResults() {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState<ExperienceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const subservice = searchParams.get('subservice') || 'things_to_do';
  const location = searchParams.get('location') || '';

  useEffect(() => {
    fetchExperiences();
  }, [subservice, location]);

  async function fetchExperiences() {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('listings')
        .select('*')
        .eq('service_type', 'experience')
        .eq('active', true);

      // Add location filter if provided
      if (location) {
        query = query.or(`city.ilike.%${location}%,location.ilike.%${location}%`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setListings(data || []);
    } catch (err) {
      console.error('Error fetching experiences:', err);
      setError('Failed to load experiences. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const subserviceTitles = {
    things_to_do: 'Things to Do',
    tour: 'Tours',
    event: 'Events',
  };

  const subserviceColors = {
    things_to_do: { bg: 'from-orange-500 to-orange-700', text: 'orange-700', badge: 'orange-700' },
    tour: { bg: 'from-purple-500 to-purple-700', text: 'purple-700', badge: 'purple-700' },
    event: { bg: 'from-pink-500 to-pink-700', text: 'pink-700', badge: 'pink-700' },
  };

  const colors = subserviceColors[subservice as keyof typeof subserviceColors];

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
              onClick={() => fetchExperiences()}
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
            {listings.map((experience) => (
              <div
                key={experience.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className={`h-48 bg-gradient-to-br ${colors.bg} relative`}>
                  {experience.images && experience.images[0] ? (
                    <img
                      src={experience.images[0]}
                      alt={experience.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                      {subservice === 'things_to_do' ? '🎯' : subservice === 'tour' ? '🗺️' : '🎉'}
                    </div>
                  )}
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-block px-3 py-1 bg-white text-${colors.badge} text-xs font-semibold rounded-full capitalize`}>
                      {experience.experience_subtype === 'things_to_do' ? 'Activity' : experience.experience_subtype}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{experience.title}</h3>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">{experience.description}</p>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{experience.location}</span>
                  </div>

                  {/* Rating */}
                  {experience.rating > 0 && (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{experience.rating.toFixed(1)}</span>
                      <span className="text-xs text-gray-500">({experience.review_count} reviews)</span>
                    </div>
                  )}

                  {/* Service Data */}
                  {experience.service_data && (
                    <div className="flex flex-wrap gap-2 text-xs">
                      {(experience.service_data.duration_hours || experience.service_data.duration_days) && (
                        <span className="px-2 py-1 bg-gray-100 rounded flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {experience.service_data.duration_days 
                            ? `${experience.service_data.duration_days} days`
                            : `${experience.service_data.duration_hours} hours`
                          }
                        </span>
                      )}
                      {experience.service_data.group_size_max && (
                        <span className="px-2 py-1 bg-gray-100 rounded flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Max {experience.service_data.group_size_max}
                        </span>
                      )}
                      {experience.service_data.languages && experience.service_data.languages.length > 0 && (
                        <span className="px-2 py-1 bg-gray-100 rounded">
                          🗣️ {experience.service_data.languages.join(', ')}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Price & CTA */}
                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      <p className={`text-2xl font-bold text-${colors.text}`}>
                        {experience.currency === 'USD' ? '$' : experience.currency} {experience.price}
                      </p>
                      <p className="text-xs text-gray-500">
                        {experience.price_unit.replace('_', ' ')}
                      </p>
                    </div>
                    
                    {experience.contact_whatsapp && (
                      <a
                        href={`https://wa.me/${experience.contact_whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 bg-${colors.text} text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity`}
                      >
                        <Phone className="w-4 h-4" />
                        Book
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

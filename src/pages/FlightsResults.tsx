import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Plane, Clock, Users, Briefcase, Calendar, ArrowRight } from 'lucide-react';

interface FlightListing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  review_count: number;
  service_data: {
    airline: string;
    flight_number: string;
    departure_city: string;
    departure_airport: string;
    departure_time: string;
    arrival_city: string;
    arrival_airport: string;
    arrival_time: string;
    duration_hours: number;
    duration_minutes: number;
    stops: number;
    aircraft: string;
    cabin_class: string;
    baggage_allowance: string;
    meals_included: boolean;
    available_seats: number;
  };
}

export function FlightsResults() {
  const [searchParams] = useSearchParams();
  const [flights, setFlights] = useState<FlightListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departDate = searchParams.get('depart') || '';
  const returnDate = searchParams.get('return') || '';
  const travelers = searchParams.get('travelers') || '1';

  useEffect(() => {
    fetchFlights();
  }, [from, to]);

  async function fetchFlights() {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching flights with params:', { from, to, departDate, returnDate, travelers });

      let query = supabase
        .from('listings')
        .select('*')
        .eq('service_type', 'flight')
        .eq('active', true);

      // Filter by departure city (from)
      if (from) {
        query = query.ilike('city', `%${from}%`);
      }

      // Filter by arrival city (to) - search in title
      if (to) {
        query = query.ilike('title', `%${to}%`);
      }

      const { data, error: fetchError } = await query;

      console.log('✅ Flights query result:', { data, error: fetchError });

      if (fetchError) throw fetchError;

      setFlights(data || []);
    } catch (err) {
      console.error('❌ Error fetching flights:', err);
      setError('Failed to load flights. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const formatDuration = (hours: number, minutes: number) => {
    return `${hours}h ${minutes}m`;
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
              <h1 className="text-3xl font-bold text-gray-900">Flight Results</h1>
              {from && to && (
                <p className="text-gray-600 mt-1">
                  <Plane className="w-4 h-4 inline mr-1" />
                  {from} → {to}
                  {departDate && ` • ${new Date(departDate).toLocaleDateString()}`}
                  {returnDate && ` - ${new Date(returnDate).toLocaleDateString()}`}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {flights.length} flight{flights.length !== 1 ? 's' : ''} found
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {travelers} traveler{Number(travelers) !== 1 ? 's' : ''}
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
            <p className="mt-4 text-gray-600">Searching flights...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => fetchFlights()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && flights.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <Plane className="w-16 h-16 mx-auto text-yellow-600 mb-4" />
            <p className="text-lg text-gray-800 mb-2">No flights found</p>
            <p className="text-gray-600">Try adjusting your search criteria</p>
            <Link
              to="/"
              className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              New Search
            </Link>
          </div>
        )}

        {!loading && !error && flights.length > 0 && (
          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-6">
                    {/* Flight Info */}
                    <div className="flex-1">
                      {/* Airline */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Plane className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            {flight.service_data.airline}
                          </p>
                          <p className="text-sm text-gray-500">
                            {flight.service_data.flight_number} • {flight.service_data.aircraft}
                          </p>
                        </div>
                      </div>

                      {/* Route Timeline */}
                      <div className="grid grid-cols-3 gap-4 items-center mb-4">
                        {/* Departure */}
                        <div className="text-left">
                          <p className="text-2xl font-bold text-gray-900">
                            {flight.service_data.departure_time}
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            {flight.service_data.departure_city}
                          </p>
                          <p className="text-xs text-gray-500">
                            {flight.service_data.departure_airport}
                          </p>
                        </div>

                        {/* Duration & Stops */}
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <div className="h-px flex-1 bg-gray-300"></div>
                            <Plane className="w-4 h-4 text-gray-400" />
                            <div className="h-px flex-1 bg-gray-300"></div>
                          </div>
                          <p className="text-sm font-medium text-gray-600">
                            {formatDuration(
                              flight.service_data.duration_hours,
                              flight.service_data.duration_minutes
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            {flight.service_data.stops === 0 ? 'Direct' : `${flight.service_data.stops} stop${flight.service_data.stops > 1 ? 's' : ''}`}
                          </p>
                        </div>

                        {/* Arrival */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {flight.service_data.arrival_time}
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            {flight.service_data.arrival_city}
                          </p>
                          <p className="text-xs text-gray-500">
                            {flight.service_data.arrival_airport}
                          </p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{flight.service_data.baggage_allowance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{flight.service_data.cabin_class}</span>
                        </div>
                        {flight.service_data.meals_included && (
                          <div className="flex items-center gap-1">
                            <span>🍽️</span>
                            <span>Meal included</span>
                          </div>
                        )}
                        {flight.service_data.available_seats <= 10 && (
                          <div className="text-orange-600 font-medium">
                            Only {flight.service_data.available_seats} seats left!
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="text-right border-l pl-6">
                      <div className="mb-4">
                        <p className="text-3xl font-bold text-primary">
                          {flight.currency === 'USD' ? '$' : flight.currency} {flight.price}
                        </p>
                        <p className="text-sm text-gray-500">per person</p>
                      </div>

                      {flight.rating > 0 && (
                        <div className="flex items-center justify-end gap-1 mb-4">
                          <span className="text-yellow-400">★</span>
                          <span className="font-semibold">{flight.rating.toFixed(1)}</span>
                          <span className="text-xs text-gray-500">
                            ({flight.review_count})
                          </span>
                        </div>
                      )}

                      <Link
                        to={`/flights/${flight.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        Select
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <p className="text-xs text-gray-500 mt-2">
                        {Number(travelers) > 1 && (
                          <>Total: ${flight.price * Number(travelers)}</>
                        )}
                      </p>
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

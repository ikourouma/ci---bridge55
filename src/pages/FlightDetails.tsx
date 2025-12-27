import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { 
  Plane, Clock, Calendar, Users, Briefcase, Check, X, 
  ChevronRight, AlertCircle, Info, Star, Wifi, Coffee, Tv, Utensils
} from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';
import { ContactCard } from '../components/ContactCard';

// Flight details data
const FLIGHT_DETAILS: Record<string, any> = {
  '1': {
    id: 1,
    airline: 'Kenya Airways',
    logo: '🇰🇪',
    flightNumber: 'KQ 100',
    aircraft: 'Boeing 787-8 Dreamliner',
    departure: { 
      airport: 'JFK', 
      city: 'New York', 
      time: '10:30 PM', 
      date: 'Nov 13',
      terminal: 'Terminal 4',
      gate: 'B22'
    },
    arrival: { 
      airport: 'NBO', 
      city: 'Nairobi', 
      time: '7:45 PM', 
      date: 'Nov 14',
      terminal: 'Terminal 1A',
      gate: 'C8'
    },
    duration: '14h 15m',
    stops: 0,
    price: 850,
    classes: [
      { 
        name: 'Economy', 
        price: 850, 
        features: ['Standard seat', '2 × 23kg baggage', 'Meals included', 'Entertainment'],
        refundable: false
      },
      { 
        name: 'Premium Economy', 
        price: 1250, 
        features: ['Extra legroom', '2 × 23kg baggage', 'Premium meals', 'Priority boarding', 'Entertainment'],
        refundable: true,
        popular: true
      },
      { 
        name: 'Business', 
        price: 3200, 
        features: ['Lie-flat seat', '3 × 32kg baggage', 'Gourmet dining', 'Lounge access', 'Entertainment'],
        refundable: true
      }
    ],
    amenities: ['WiFi (Paid)', 'Power outlets', 'Entertainment', 'Meals', 'USB ports'],
    baggage: {
      cabin: '1 × 7kg',
      checked: '2 × 23kg',
      extra: '$75 per additional bag'
    },
    requirements: [
      'Valid passport (at least 6 months validity)',
      'Visa/ETA for Kenya (eVisa available)',
      'Yellow fever vaccination certificate (if coming from endemic area)',
      'Travel insurance recommended',
      'COVID-19 requirements: Check current regulations'
    ],
    cancellation: {
      economy: 'Non-refundable. Changes allowed for $150 fee + fare difference',
      premium: 'Refundable up to 24 hours before departure. Changes free',
      business: 'Fully refundable. Changes free anytime'
    },
    rating: 4.6,
    reviews: 1834,
    seatMap: {
      rows: 30,
      columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'],
      occupied: ['1A', '1B', '2C', '3D', '5A', '5B', '7F', '8G', '10A', '12C', '15E', '18B'],
      premium: ['10A', '10B', '10C', '10D', '10E', '10F', '10G', '10H', '10J'],
      extraLegroom: ['15A', '15B', '15C', '15D', '15E', '15F', '15G', '15H', '15J']
    }
  }
};

export function FlightDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const flight = FLIGHT_DETAILS[id || '1'];
  
  const from = searchParams.get('from') || 'New York';
  const to = searchParams.get('to') || 'Nairobi';
  const date = searchParams.get('date') || 'Nov 13';
  const travelers = searchParams.get('travelers') || '1 Adult';

  const [selectedClass, setSelectedClass] = useState(0); // Economy by default
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [showSeatMap, setShowSeatMap] = useState(false);

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Flight not found</h1>
          <Link to="/flights/results" className="text-blue-600 hover:underline">
            ← Back to results
          </Link>
        </div>
      </div>
    );
  }

  const currentClass = flight.classes[selectedClass];
  const totalPrice = currentClass.price;

  const getSeatPrice = (seat: string) => {
    if (flight.seatMap.premium.includes(seat)) return 50;
    if (flight.seatMap.extraLegroom.includes(seat)) return 30;
    return 0;
  };

  const isSeatOccupied = (seat: string) => flight.seatMap.occupied.includes(seat);
  const isSeatPremium = (seat: string) => flight.seatMap.premium.includes(seat);
  const isSeatExtraLegroom = (seat: string) => flight.seatMap.extraLegroom.includes(seat);

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedTopNav />
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <Link to="/flights/results" className="hover:text-blue-600">Flights</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{flight.airline} {flight.flightNumber}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight Header */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-5xl">{flight.logo}</div>
                  <div>
                    <h1 className="text-2xl font-bold">{flight.airline}</h1>
                    <p className="text-gray-600">{flight.flightNumber} • {flight.aircraft}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-current text-blue-600" />
                  <span className="font-bold text-blue-900">{flight.rating}</span>
                  <span className="text-sm text-gray-600">({flight.reviews})</span>
                </div>
              </div>

              {/* Flight Timeline */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{flight.departure.time}</div>
                  <div className="font-semibold text-gray-900">{flight.departure.airport} - {flight.departure.city}</div>
                  <div className="text-sm text-gray-600">{flight.departure.date}</div>
                  <div className="text-xs text-gray-500 mt-1">{flight.departure.terminal} • Gate {flight.departure.gate}</div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">{flight.duration}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <Plane className="w-5 h-5 text-blue-600" />
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>
                  <div className="text-sm font-semibold text-green-600 mt-2">
                    {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{flight.arrival.time}</div>
                  <div className="font-semibold text-gray-900">{flight.arrival.airport} - {flight.arrival.city}</div>
                  <div className="text-sm text-gray-600">{flight.arrival.date}</div>
                  <div className="text-xs text-gray-500 mt-1">{flight.arrival.terminal} • Gate {flight.arrival.gate}</div>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                {flight.amenities.map((amenity: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Class Selection */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Select Cabin Class</h2>
              <div className="space-y-4">
                {flight.classes.map((cls: any, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedClass(idx)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedClass === idx
                        ? 'border-blue-600 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg">{cls.name}</h3>
                          {cls.popular && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                              Popular
                            </span>
                          )}
                          {selectedClass === idx && (
                            <Check className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <ul className="space-y-1 mb-2">
                          {cls.features.map((feature: string, i: number) => (
                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-600">
                          {cls.refundable ? '✅ Refundable' : '❌ Non-refundable'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${cls.price}</div>
                        <div className="text-sm text-gray-600">per person</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seat Selection */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Select Your Seat</h2>
                <button
                  onClick={() => setShowSeatMap(!showSeatMap)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showSeatMap ? 'Hide Seat Map' : 'View Seat Map'}
                </button>
              </div>

              {selectedSeat && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-900">Selected Seat: {selectedSeat}</div>
                  {getSeatPrice(selectedSeat) > 0 && (
                    <div className="text-sm text-gray-600">
                      Additional cost: ${getSeatPrice(selectedSeat)}
                    </div>
                  )}
                </div>
              )}

              {showSeatMap && (
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="mb-4">
                    <div className="flex items-center gap-4 flex-wrap text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded border border-gray-300"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-400 rounded border border-gray-500"></div>
                        <span>Occupied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded border-2 border-blue-600"></div>
                        <span>Selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded border border-purple-300"></div>
                        <span>Extra Legroom (+$30)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-100 rounded border border-yellow-300"></div>
                        <span>Premium (+$50)</span>
                      </div>
                    </div>
                  </div>

                  {/* Seat Map */}
                  <div className="overflow-x-auto">
                    <div className="inline-block min-w-full">
                      {/* Column Headers */}
                      <div className="flex justify-center gap-1 mb-2">
                        <div className="w-10"></div>
                        {flight.seatMap.columns.slice(0, 3).map((col: string) => (
                          <div key={col} className="w-10 text-center text-sm font-semibold text-gray-600">
                            {col}
                          </div>
                        ))}
                        <div className="w-8"></div>
                        {flight.seatMap.columns.slice(3, 6).map((col: string) => (
                          <div key={col} className="w-10 text-center text-sm font-semibold text-gray-600">
                            {col}
                          </div>
                        ))}
                        <div className="w-8"></div>
                        {flight.seatMap.columns.slice(6).map((col: string) => (
                          <div key={col} className="w-10 text-center text-sm font-semibold text-gray-600">
                            {col}
                          </div>
                        ))}
                      </div>

                      {/* Rows */}
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(row => (
                        <div key={row} className="flex justify-center gap-1 mb-1">
                          <div className="w-10 text-center text-sm font-semibold text-gray-600 flex items-center justify-center">
                            {row}
                          </div>
                          {flight.seatMap.columns.slice(0, 3).map((col: string) => {
                            const seatId = `${row}${col}`;
                            const occupied = isSeatOccupied(seatId);
                            const premium = isSeatPremium(seatId);
                            const extraLegroom = isSeatExtraLegroom(seatId);
                            const selected = selectedSeat === seatId;

                            return (
                              <button
                                key={seatId}
                                onClick={() => !occupied && setSelectedSeat(seatId)}
                                disabled={occupied}
                                className={`w-10 h-10 rounded text-xs font-medium transition-all ${
                                  occupied
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : selected
                                    ? 'bg-blue-100 border-2 border-blue-600'
                                    : premium
                                    ? 'bg-yellow-100 border border-yellow-300 hover:border-yellow-500'
                                    : extraLegroom
                                    ? 'bg-purple-100 border border-purple-300 hover:border-purple-500'
                                    : 'bg-gray-200 border border-gray-300 hover:bg-gray-300'
                                }`}
                              >
                                {col}
                              </button>
                            );
                          })}
                          <div className="w-8"></div>
                          {flight.seatMap.columns.slice(3, 6).map((col: string) => {
                            const seatId = `${row}${col}`;
                            const occupied = isSeatOccupied(seatId);
                            const premium = isSeatPremium(seatId);
                            const extraLegroom = isSeatExtraLegroom(seatId);
                            const selected = selectedSeat === seatId;

                            return (
                              <button
                                key={seatId}
                                onClick={() => !occupied && setSelectedSeat(seatId)}
                                disabled={occupied}
                                className={`w-10 h-10 rounded text-xs font-medium transition-all ${
                                  occupied
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : selected
                                    ? 'bg-blue-100 border-2 border-blue-600'
                                    : premium
                                    ? 'bg-yellow-100 border border-yellow-300 hover:border-yellow-500'
                                    : extraLegroom
                                    ? 'bg-purple-100 border border-purple-300 hover:border-purple-500'
                                    : 'bg-gray-200 border border-gray-300 hover:bg-gray-300'
                                }`}
                              >
                                {col}
                              </button>
                            );
                          })}
                          <div className="w-8"></div>
                          {flight.seatMap.columns.slice(6).map((col: string) => {
                            const seatId = `${row}${col}`;
                            const occupied = isSeatOccupied(seatId);
                            const premium = isSeatPremium(seatId);
                            const extraLegroom = isSeatExtraLegroom(seatId);
                            const selected = selectedSeat === seatId;

                            return (
                              <button
                                key={seatId}
                                onClick={() => !occupied && setSelectedSeat(seatId)}
                                disabled={occupied}
                                className={`w-10 h-10 rounded text-xs font-medium transition-all ${
                                  occupied
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : selected
                                    ? 'bg-blue-100 border-2 border-blue-600'
                                    : premium
                                    ? 'bg-yellow-100 border border-yellow-300 hover:border-yellow-500'
                                    : extraLegroom
                                    ? 'bg-purple-100 border border-purple-300 hover:border-purple-500'
                                    : 'bg-gray-200 border border-gray-300 hover:bg-gray-300'
                                }`}
                              >
                                {col}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Baggage */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Baggage Allowance</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-semibold">Cabin Baggage</div>
                    <div className="text-gray-600">{flight.baggage.cabin}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-semibold">Checked Baggage</div>
                    <div className="text-gray-600">{flight.baggage.checked}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <div className="font-semibold">Additional Baggage</div>
                    <div className="text-gray-600">{flight.baggage.extra}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Requirements */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Travel Requirements</h2>
              <div className="space-y-3">
                {flight.requirements.map((req: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{req}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Cancellation Policy</h2>
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-900">Economy</div>
                  <p className="text-gray-600">{flight.cancellation.economy}</p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Premium Economy</div>
                  <p className="text-gray-600">{flight.cancellation.premium}</p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Business</div>
                  <p className="text-gray-600">{flight.cancellation.business}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-24 shadow-lg">
              <h3 className="font-bold text-xl mb-4">Booking Summary</h3>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <div className="text-sm text-gray-600">Route</div>
                  <div className="font-semibold">{from} → {to}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-semibold">{date}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Travelers</div>
                  <div className="font-semibold">{travelers}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Class</div>
                  <div className="font-semibold">{currentClass.name}</div>
                </div>
                {selectedSeat && (
                  <div>
                    <div className="text-sm text-gray-600">Seat</div>
                    <div className="font-semibold">{selectedSeat}</div>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-700">Base fare</span>
                  <span className="font-semibold">${currentClass.price}</span>
                </div>
                {selectedSeat && getSeatPrice(selectedSeat) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Seat selection</span>
                    <span className="font-semibold">${getSeatPrice(selectedSeat)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-700">Taxes & fees</span>
                  <span className="font-semibold">${Math.round(totalPrice * 0.15)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span className="text-blue-600">
                  ${totalPrice + (selectedSeat ? getSeatPrice(selectedSeat) : 0) + Math.round(totalPrice * 0.15)}
                </span>
              </div>

              <Link
                to={`/checkout?service=flight&name=${encodeURIComponent(flight.airline)}&from=${from}&to=${to}&date=${date}&total=${totalPrice}`}
                className="block w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-center mb-3"
              >
                Continue to Payment
              </Link>

              <p className="text-center text-xs text-gray-600 mb-4">
                Price locked for 10 minutes
              </p>

              <ContactCard
                businessName="Kenya Airways"
                businessType="Airline"
                license="KQ-IATA-106"
                rating={4.6}
                reviews={18400}
                totalBookings="2.5M+ passengers/year"
                location="Nairobi, Kenya (HQ)"
                phone="+254202327000"
                whatsapp="+254712345678"
                responseTime="24/7 Support Available"
                since="1977"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

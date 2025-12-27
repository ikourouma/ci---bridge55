import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, Hotel, Car, MapPin, Sparkles, Star, Shield, 
  Clock, Globe, TrendingUp, ArrowRight, Check, Heart, X
} from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';
import { ComprehensiveMenu } from '../components/navigation/ComprehensiveMenu';
import { SEOHead } from '../components/SEOHead';
import { GuestSelector } from '../components/GuestSelector';
import { TravelerSelector } from '../components/TravelerSelector';
import { AfricaRegionFilters } from '../components/AfricaRegionFilters';
import { TodaysTopDeals } from '../components/TodaysTopDeals';
import { FeaturedRegionalDestinations } from '../components/FeaturedRegionalDestinations';
import { DynamicServiceContent } from '../components/DynamicServiceContent';

type ServiceType = 'stays' | 'flights' | 'cars' | 'experiences' | 'evisa';

export function HomeLanding() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<ServiceType>('stays');
  const [activeRegion, setActiveRegion] = useState('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Stays - Guest details
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  
  // Flights-specific state
  const [flightType, setFlightType] = useState<'roundtrip' | 'oneway' | 'multicity'>('roundtrip');
  const [flightAdults, setFlightAdults] = useState(1);
  const [flightChildren, setFlightChildren] = useState(0);

  // Flights - Single row for round-trip
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [cabinClass, setCabinClass] = useState('Economy');
  
  // Multi-city flights
  const [flightLegs, setFlightLegs] = useState([
    { from: '', to: '', date: '', cabin: 'Economy' },
  ]);

  // Experiences sub-categories
  const [experienceType, setExperienceType] = useState<'things-to-do' | 'tours' | 'events'>('things-to-do');

  // Cars sub-categories
  const [carType, setCarType] = useState<'rental' | 'taxi' | 'rideshare'>('rental');

  // Stays add-ons
  const [addFlight, setAddFlight] = useState(false);
  const [addCar, setAddCar] = useState(false);

  // Service-specific CTAs with enhanced SEO
  const serviceCTAs: Record<ServiceType, { title: string; subtitle: string }> = {
    stays: {
      title: 'Find Your Perfect African Stay',
      subtitle: 'Hotels, safari lodges, beach resorts, and unique homes across 55 countries'
    },
    flights: {
      title: 'Find the Best Flights to, from & within Africa',
      subtitle: 'Compare 500+ airlines, get the best prices, and book with confidence'
    },
    cars: {
      title: 'Rentals, Taxis & Rideshares in One Place',
      subtitle: 'Your ride, your way. From city taxis to safari 4x4s across Africa'
    },
    experiences: {
      title: 'Discover Unforgettable African Experiences',
      subtitle: 'Safaris, tours, activities, and events across the continent - book with local experts'
    },
    evisa: {
      title: 'Simplify Your Africa Visa & Entry',
      subtitle: 'Fast, reliable eVisa and ETA services for 55+ African destinations'
    },
  };

  const addFlightLeg = () => {
    setFlightLegs([...flightLegs, { from: '', to: '', date: '', cabin: 'Economy' }]);
  };

  const removeFlightLeg = (index: number) => {
    if (flightLegs.length > 1) {
      setFlightLegs(flightLegs.filter((_, i) => i !== index));
    }
  };

  const clearAllFlights = () => {
    setFlightLegs([{ from: '', to: '', date: '', cabin: 'Economy' }]);
  };

  const updateFlightLeg = (index: number, field: string, value: string) => {
    const updated = [...flightLegs];
    updated[index] = { ...updated[index], [field]: value };
    setFlightLegs(updated);
  };

  const handleSearch = () => {
    if (activeService === 'stays' && searchLocation) {
      const totalGuests = adults + children;
      const params = new URLSearchParams({
        destination: searchLocation,
        checkin: checkIn,
        checkout: checkOut,
        guests: totalGuests.toString(),
        rooms: rooms.toString()
      });
      navigate(`/stays/results?${params.toString()}`);
    } else if (activeService === 'flights') {
      const totalTravelers = flightAdults + flightChildren;
      const params = new URLSearchParams({
        from: fromLocation,
        to: toLocation,
        depart: departDate,
        return: returnDate || '',
        travelers: totalTravelers.toString(),
        cabin: cabinClass
      });
      navigate(`/flights/results?${params.toString()}`);
    } else if (activeService === 'cars') {
      navigate('/cars/results');
    } else if (activeService === 'experiences') {
      navigate('/experiences/results');
    } else if (activeService === 'evisa') {
      navigate('/evisa');
    }
  };

  const handleDiaClick = () => {
    navigate('/ai-trip-planner');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEOHead
        title="Bridge55 - Africa's Travel Platform | Book Hotels, Flights & Experiences"
        description="Discover Africa's best travel experiences. Book hotels, flights, safaris & more across 55 countries. AI trip planner included. Trusted by 50,000+ travelers."
        keywords="Africa travel, African hotels, safari bookings, flights Africa, Kenya travel, Tanzania safari, Morocco tours, African experiences, eVisa Africa"
      />
      <SharedTopNav onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      {/* Mobile Sticky Service Tabs - Shows below top nav on scroll */}
      <div className="md:hidden sticky top-16 z-40 bg-white shadow-md border-b border-gray-200">
        <div className="overflow-x-auto scrollbar-hide px-4 py-3">
          <div className="flex gap-2 min-w-max">
            {[
              { id: 'stays' as ServiceType, icon: Hotel, label: 'Stays' },
              { id: 'flights' as ServiceType, icon: Plane, label: 'Flights' },
              { id: 'cars' as ServiceType, icon: Car, label: 'Cars' },
              { id: 'experiences' as ServiceType, icon: MapPin, label: 'Experiences' },
              { id: 'evisa' as ServiceType, icon: Globe, label: 'eVisa' },
            ].map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap text-sm ${
                  activeService === service.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <service.icon className="w-4 h-4" />
                {service.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Menu (Mobile & Desktop) */}
      <ComprehensiveMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeService={activeService}
        onServiceChange={(service) => setActiveService(service as ServiceType)}
      />

      {/* HERO SECTION - Above the Fold */}
      <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          {/* Hero Content - Dynamic based on service */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                {serviceCTAs[activeService].title}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-purple-100 max-w-3xl mx-auto mb-8">
              {serviceCTAs[activeService].subtitle}
            </p>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-purple-200">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>50,000+ Happy Travelers</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Service Tabs - Desktop: Inside white container, Mobile: Sticky below nav */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 mb-6">
            {[
              { id: 'stays' as ServiceType, icon: Hotel, label: 'Stays' },
              { id: 'flights' as ServiceType, icon: Plane, label: 'Flights' },
              { id: 'cars' as ServiceType, icon: Car, label: 'Cars' },
              { id: 'experiences' as ServiceType, icon: MapPin, label: 'Experiences' },
              { id: 'evisa' as ServiceType, icon: Globe, label: 'eVisa' },
            ].map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform ${
                  activeService === service.id
                    ? 'bg-white text-purple-900 shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 hover:scale-102'
                }`}
              >
                <service.icon className="w-5 h-5" />
                {service.label}
              </button>
            ))}
          </div>

          {/* Search Widget - Stays */}
          {activeService === 'stays' && (
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-6xl mx-auto overflow-visible">
              {/* Add Flight / Add Car Options */}
              <div className="flex items-center gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addFlight}
                    onChange={(e) => setAddFlight(e.target.checked)}
                    className="w-4 h-4 text-purple-600 cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-gray-700">Add a flight</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addCar}
                    onChange={(e) => setAddCar(e.target.checked)}
                    className="w-4 h-4 text-purple-600 cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-gray-700">Add a car</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Where to?
                  </label>
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Search destinations..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Guests
                  </label>
                  <GuestSelector
                    adults={adults}
                    children={children}
                    rooms={rooms}
                    onUpdate={(newAdults, newChildren, newRooms) => {
                      setAdults(newAdults);
                      setChildren(newChildren);
                      setRooms(newRooms);
                    }}
                  />
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
              >
                <MapPin className="w-5 h-5" />
                Search Stays
              </button>
            </div>
          )}

          {/* Search Widget - Flights (Kayak Style) */}
          {activeService === 'flights' && (
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-6xl mx-auto overflow-visible">
              {/* Flight Type Selector */}
              <div className="flex items-center gap-4 mb-6">
                <select 
                  value={flightType}
                  onChange={(e) => {
                    const newType = e.target.value as 'roundtrip' | 'oneway' | 'multicity';
                    setFlightType(newType);
                    if (newType === 'multicity') {
                      setFlightLegs([{ from: '', to: '', date: '', cabin: 'Economy' }]);
                    }
                  }}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900 font-semibold"
                >
                  <option value="roundtrip">Round-trip</option>
                  <option value="oneway">One-way</option>
                  <option value="multicity">Multi-city</option>
                </select>

                <div className="w-64">
                  <TravelerSelector
                    adults={flightAdults}
                    children={flightChildren}
                    onUpdate={(newAdults, newChildren) => {
                      setFlightAdults(newAdults);
                      setFlightChildren(newChildren);
                    }}
                  />
                </div>
              </div>

              {/* Round-trip & One-way: Single Row */}
              {(flightType === 'roundtrip' || flightType === 'oneway') && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className={`grid grid-cols-1 gap-4 ${flightType === 'roundtrip' ? 'md:grid-cols-5' : 'md:grid-cols-4'}`}>
                    {/* From */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        From
                      </label>
                      <input
                        type="text"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        placeholder="Departure city..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                      />
                    </div>

                    {/* To */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        To
                      </label>
                      <input
                        type="text"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        placeholder="Arrival city..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                      />
                    </div>

                    {/* Depart Date */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Depart
                      </label>
                      <input
                        type="date"
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                      />
                    </div>

                    {/* Return Date (only for round-trip) */}
                    {flightType === 'roundtrip' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Return
                        </label>
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                        />
                      </div>
                    )}

                    {/* Cabin Class */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cabin
                      </label>
                      <select
                        value={cabinClass}
                        onChange={(e) => setCabinClass(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                      >
                        <option>Economy</option>
                        <option>Premium Economy</option>
                        <option>Business</option>
                        <option>First Class</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Multi-city: Multiple Rows */}
              {flightType === 'multicity' && (
                <>
                  <div className="space-y-4">
                    {flightLegs.map((leg, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {/* From */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              From?
                            </label>
                            <input
                              type="text"
                              value={leg.from}
                              onChange={(e) => updateFlightLeg(index, 'from', e.target.value)}
                              placeholder="City or airport..."
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                            />
                          </div>

                          {/* To */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              To?
                            </label>
                            <input
                              type="text"
                              value={leg.to}
                              onChange={(e) => updateFlightLeg(index, 'to', e.target.value)}
                              placeholder="City or airport..."
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                            />
                          </div>

                          {/* Date */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Departure
                            </label>
                            <input
                              type="date"
                              value={leg.date}
                              onChange={(e) => updateFlightLeg(index, 'date', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                            />
                          </div>

                          {/* Cabin Class */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Cabin
                            </label>
                            <select
                              value={leg.cabin}
                              onChange={(e) => updateFlightLeg(index, 'cabin', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                            >
                              <option>Economy</option>
                              <option>Premium Economy</option>
                              <option>Business</option>
                              <option>First Class</option>
                            </select>
                          </div>
                        </div>

                        {/* Remove Button - Below the row */}
                        {flightLegs.length > 1 && (
                          <div className="mt-3 flex justify-end">
                            <button
                              onClick={() => removeFlightLeg(index)}
                              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove flight"
                            >
                              <X className="w-5 h-5" />
                              <span className="text-sm font-semibold">Remove Flight</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Another Flight / Clear All */}
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={addFlightLeg}
                      className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                    >
                      + Add another flight
                    </button>
                    <button
                      onClick={clearAllFlights}
                      className="text-gray-600 font-semibold hover:text-gray-700 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                </>
              )}

              {/* Search Button - UNIFIED PURPLE */}
              <button
                onClick={handleSearch}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
              >
                <Plane className="w-5 h-5" />
                Search Flights
              </button>
            </div>
          )}

          {/* Search Widget - Cars */}
          {activeService === 'cars' && (
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-6xl mx-auto overflow-visible">
              {/* Car Type Selector */}
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setCarType('rental')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    carType === 'rental'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rental Cars
                </button>
                <button
                  onClick={() => setCarType('taxi')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    carType === 'taxi'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Taxi
                </button>
                <button
                  onClick={() => setCarType('rideshare')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    carType === 'rideshare'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rideshare
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {carType === 'rental' ? 'Pick-up Location' : 'Pick-up Address'}
                  </label>
                  <input
                    type="text"
                    placeholder={carType === 'rental' ? 'City or airport...' : 'Enter address...'}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                  />
                </div>

                {carType === 'rental' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pick-up Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Drop-off Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Car Type
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900">
                        <option>Any</option>
                        <option>Economy</option>
                        <option>SUV</option>
                        <option>Luxury</option>
                        <option>Safari 4x4</option>
                      </select>
                    </div>
                  </>
                )}

                {(carType === 'taxi' || carType === 'rideshare') && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Drop-off Address
                      </label>
                      <input
                        type="text"
                        placeholder="Enter destination..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        When?
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Passengers
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900">
                        <option>1 Passenger</option>
                        <option>2 Passengers</option>
                        <option>3 Passengers</option>
                        <option>4+ Passengers</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={handleSearch}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
              >
                <Car className="w-5 h-5" />
                {carType === 'rental' ? 'Search Rentals' : 
                 carType === 'taxi' ? 'Book Taxi' : 'Book Rideshare'}
              </button>
            </div>
          )}

          {/* Search Widget - Experiences */}
          {activeService === 'experiences' && (
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-6xl mx-auto overflow-visible">
              {/* Experience Type Selector */}
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setExperienceType('things-to-do')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    experienceType === 'things-to-do'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Things to Do
                </button>
                <button
                  onClick={() => setExperienceType('tours')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    experienceType === 'tours'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tours
                </button>
                <button
                  onClick={() => setExperienceType('events')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    experienceType === 'events'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Events
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {experienceType === 'things-to-do' ? 'What do you want to do?' : 
                     experienceType === 'tours' ? 'Search tours' : 'Search events'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      experienceType === 'things-to-do' ? 'Safari, diving, hiking...' :
                      experienceType === 'tours' ? 'City tours, food tours...' :
                      'Festivals, concerts, cultural...'
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Where?
                  </label>
                  <input
                    type="text"
                    placeholder="Destination..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    When?
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                  />
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
              >
                <MapPin className="w-5 h-5" />
                Search {experienceType === 'things-to-do' ? 'Activities' : 
                        experienceType === 'tours' ? 'Tours' : 'Events'}
              </button>
            </div>
          )}

          {/* Search Widget - eVisa */}
          {activeService === 'evisa' && (
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-6xl mx-auto overflow-visible">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Nationality
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900">
                    <option>Select country...</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>France</option>
                    <option>Germany</option>
                    <option>China</option>
                    <option>India</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Destination Country
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900">
                    <option>Select destination...</option>
                    <option>Kenya</option>
                    <option>Tanzania</option>
                    <option>South Africa</option>
                    <option>Morocco</option>
                    <option>Egypt</option>
                    <option>Rwanda</option>
                    <option>Ghana</option>
                    <option>Nigeria</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Visa Type
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900">
                    <option>Tourist</option>
                    <option>Business</option>
                    <option>Transit</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => navigate('/evisa')}
                className="w-full mt-4 bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] text-white font-bold py-4 px-8 rounded-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
              >
                <Globe className="w-5 h-5" />
                Check Visa Requirements
              </button>
            </div>
          )}

          {/* AI Trip Planner CTA */}
          <div className="mt-6 text-center">
            <button
              onClick={handleDiaClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white rounded-full font-semibold transition-all backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Or let Dia plan your dream trip with AI</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-purple-200 text-sm mt-2">Get a personalized itinerary from Dia, your AI travel expert</p>
          </div>
        </div>
      </div>

      {/* DYNAMIC SERVICE-SPECIFIC CONTENT (Position 4) */}
      <DynamicServiceContent 
        activeService={activeService}
        activeRegion={activeRegion}
      />

      {/* TODAY'S TOP DEALS SECTION - 4 Column Layout (Position 5) */}
      <TodaysTopDeals />

      {/* AFRICA REGION FILTERS - Dynamic Client-Side Filtering (Position 6) */}
      <AfricaRegionFilters onRegionChange={setActiveRegion} />

      {/* FEATURED REGIONAL DESTINATIONS - New 4-Column Slider */}
      <FeaturedRegionalDestinations />

      {/* WHY BRIDGE55 */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Bridge55?
            </h2>
            <p className="text-lg text-gray-600">
              Africa's complete travel platform - built for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">55 Countries</h3>
              <p className="text-gray-600">
                Complete coverage across the African continent
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">AI Trip Planner</h3>
              <p className="text-gray-600">
                Let Dia create your perfect itinerary in seconds
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Secure & Trusted</h3>
              <p className="text-gray-600">
                Mobile money, cards, and local payment methods
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Compare thousands of options to find your perfect deal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST & REVIEWS */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Trusted by 50,000+ Travelers
            </h2>
            <p className="text-lg text-gray-600">
              4.8/5 average rating from verified reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', location: 'Kenya', text: 'Amazing safari experience! Bridge55 made booking so easy.' },
              { name: 'James K.', location: 'Tanzania', text: 'Best prices I found anywhere. Highly recommend!' },
              { name: 'Amara N.', location: 'Morocco', text: 'The AI trip planner helped me create the perfect itinerary.' },
            ].map((review, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Exclusive Travel Deals
          </h2>
          <p className="text-purple-100 text-lg mb-8">
            Join 50,000+ travelers and get insider tips, exclusive deals, and travel inspiration
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-white text-purple-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all whitespace-nowrap">
              Subscribe Free
            </button>
          </div>

          <p className="text-purple-200 text-sm mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Hotels</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Flights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Car Rentals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Experiences</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sitemap</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Bridge55. All rights reserved. Built with ❤️ for Africa.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

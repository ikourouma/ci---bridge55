import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';

// Car Sub-Service Types
type CarSubService = 'rental_car' | 'taxi' | 'rideshare';

export function CarsSearchForm() {
  const navigate = useNavigate();
  const [activeSubService, setActiveSubService] = useState<CarSubService>('rental_car');

  // Common form state
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [dropoffTime, setDropoffTime] = useState('10:00');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Navigate to results with subservice parameter
    const params = new URLSearchParams({
      location,
      subservice: activeSubService,
      pickup_date: pickupDate,
      dropoff_date: dropoffDate || pickupDate,
      pickup_time: pickupTime,
      dropoff_time: dropoffTime,
    });

    navigate(`/cars/results?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      {/* Sub-Service Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSubService('rental_car')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeSubService === 'rental_car'
              ? 'bg-green-50 text-green-700 border-2 border-green-500'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <span className="text-lg">🚙</span>
          <span>Rental Cars</span>
        </button>

        <button
          onClick={() => setActiveSubService('taxi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeSubService === 'taxi'
              ? 'bg-yellow-50 text-yellow-700 border-2 border-yellow-500'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <span className="text-lg">🚕</span>
          <span>Taxis</span>
        </button>

        <button
          onClick={() => setActiveSubService('rideshare')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeSubService === 'rideshare'
              ? 'bg-purple-50 text-purple-700 border-2 border-purple-500'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <span className="text-lg">📱</span>
          <span>Rideshares</span>
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Rental Car Form */}
        {activeSubService === 'rental_car' && (
          <>
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Pickup Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or airport (e.g., Nairobi)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            {/* Dates & Times */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Pickup */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Pickup Date & Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Dropoff */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Dropoff Date & Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="time"
                    value={dropoffTime}
                    onChange={(e) => setDropoffTime(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Search Rental Cars
            </button>
          </>
        )}

        {/* Taxi Form */}
        {activeSubService === 'taxi' && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where do you need a taxi?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Pickup Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Find Taxis
            </button>
          </>
        )}

        {/* Rideshare Form */}
        {activeSubService === 'rideshare' && (
          <>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Connect to Rideshare Services
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Access Uber, Bolt, and other rideshare apps in your city
              </p>
              
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  className="px-4 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
                >
                  🚗 Uber
                </button>
                <button
                  type="button"
                  className="px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
                >
                  ⚡ Bolt
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Opens in the respective app or website
              </p>
            </div>
          </>
        )}
      </form>

      {/* Service Info */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          {activeSubService === 'rental_car' && '🚙 Browse rental cars from trusted providers across Africa'}
          {activeSubService === 'taxi' && '🚕 Book local taxi services with verified drivers'}
          {activeSubService === 'rideshare' && '📱 Connect to popular rideshare apps like Uber and Bolt'}
        </p>
      </div>
    </div>
  );
}


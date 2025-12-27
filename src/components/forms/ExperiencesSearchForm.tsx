import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';

// Experience Sub-Service Types
type ExperienceSubService = 'things_to_do' | 'tour' | 'event';

export function ExperiencesSearchForm() {
  const navigate = useNavigate();
  const [activeSubService, setActiveSubService] = useState<ExperienceSubService>('things_to_do');

  // Common form state
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Navigate to results with subservice parameter
    const params = new URLSearchParams({
      destination,
      subservice: activeSubService,
      date: date || new Date().toISOString().split('T')[0],
      guests,
    });

    navigate(`/experiences/results?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      {/* Sub-Service Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSubService('things_to_do')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeSubService === 'things_to_do'
              ? 'bg-orange-50 text-orange-700 border-2 border-orange-500'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <span className="text-lg">🎯</span>
          <span>Things to Do</span>
        </button>

        <button
          onClick={() => setActiveSubService('tour')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeSubService === 'tour'
              ? 'bg-blue-50 text-blue-700 border-2 border-blue-500'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <span className="text-lg">🗺️</span>
          <span>Tours</span>
        </button>

        <button
          onClick={() => setActiveSubService('event')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeSubService === 'event'
              ? 'bg-pink-50 text-pink-700 border-2 border-pink-500'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <span className="text-lg">🎪</span>
          <span>Events</span>
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Things to Do Form */}
        {activeSubService === 'things_to_do' && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Where
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="City or region (e.g., Cape Town)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  When
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Find Activities
            </button>
          </>
        )}

        {/* Tours Form */}
        {activeSubService === 'tour' && (
          <>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Destination */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where do you want to tour? (e.g., Serengeti)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Travelers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Travelers
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5+ People</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Preferred Start Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Search Tours
            </button>
          </>
        )}

        {/* Events Form */}
        {activeSubService === 'event' && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  City
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Which city? (e.g., Lagos, Nairobi)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Event Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Event Category (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type (Optional)
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                <option value="">All Events</option>
                <option value="music">🎵 Music & Concerts</option>
                <option value="festivals">🎉 Festivals</option>
                <option value="sports">⚽ Sports</option>
                <option value="conferences">💼 Conferences</option>
                <option value="exhibitions">🎨 Exhibitions & Art</option>
                <option value="food">🍽️ Food & Wine</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Find Events
            </button>
          </>
        )}
      </form>

      {/* Service Info */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          {activeSubService === 'things_to_do' && '🎯 Discover local activities, attractions, and experiences'}
          {activeSubService === 'tour' && '🗺️ Join guided tours and multi-day adventures across Africa'}
          {activeSubService === 'event' && '🎪 Find concerts, festivals, conferences, and special events'}
        </p>
      </div>
    </div>
  );
}


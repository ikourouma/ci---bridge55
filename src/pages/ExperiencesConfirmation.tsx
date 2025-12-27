import { useEffect, useState } from 'react';
import { AskDiaButton } from '../components/AskDiaButton';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Users, MapPin, Camera, FileText, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';
import { ShareButtons } from '../components/ShareButtons';
import { ServiceContactCard } from '../components/ServiceContactCard';

export function ExperiencesConfirmation() {
  const [searchParams] = useSearchParams();
  const confirmation = `EX${Date.now().toString().slice(-8)}`;
  const name = searchParams.get('name') || 'Serengeti Safari Adventure';
  const [showItinerary, setShowItinerary] = useState(false);

  const hostDetails = {
    name: 'Safari Adventures Ltd',
    address: 'Serengeti National Park, Tanzania',
    phone: '+255 27 250 3471',
    email: 'contact@safariadventures.tz',
    whatsapp: '+255784567890'
  };

  const itinerary = [
    { time: '06:00 AM', activity: 'Hotel Pickup', description: 'Professional guide picks you up from your hotel' },
    { time: '07:00 AM', activity: 'Enter Serengeti', description: 'Park entrance and briefing on wildlife viewing' },
    { time: '09:00 AM', activity: 'Morning Game Drive', description: 'Explore the savannah and spot the Big Five' },
    { time: '12:30 PM', activity: 'Bush Lunch', description: 'Enjoy a picnic lunch in the wild' },
    { time: '02:00 PM', activity: 'Afternoon Safari', description: 'Continue wildlife viewing and photography' },
    { time: '04:00 PM', activity: 'Sunset Viewing', description: 'Watch the sunset over the plains' },
    { time: '06:00 PM', activity: 'Return Journey', description: 'Drive back to your hotel' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedTopNav />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-block p-6 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle className="w-20 h-20 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Experience Booked!</h1>
          <p className="text-xl text-gray-600">Get ready for an amazing adventure</p>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8 mb-6 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm opacity-90 mb-1">Booking Reference</div>
              <div className="text-3xl font-bold tracking-wider">{confirmation}</div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">Experience</div>
              <div className="text-2xl font-bold">{name}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6">Your Itinerary</h2>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-lg">Date & Time</div>
                <div className="text-gray-600">November 15, 2025 at 6:00 AM</div>
                <div className="text-sm text-gray-500 mt-1">Duration: Full Day (10 hours)</div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <MapPin className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-lg">Meeting Point</div>
                <div className="text-gray-600">Serengeti National Park Main Gate</div>
                <div className="text-sm text-gray-500 mt-1">GPS: -2.3333, 34.8333</div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <Users className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-lg">Group Size</div>
                <div className="text-gray-600">2 travelers</div>
                <div className="text-sm text-gray-500 mt-1">Small group experience (max 8 people)</div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
            <div className="font-semibold mb-2 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              What to Bring
            </div>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Camera with extra batteries</li>
              <li>• Comfortable walking shoes</li>
              <li>• Sunscreen and hat</li>
              <li>• Water bottle (refillable)</li>
              <li>• Light jacket for early morning</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <div className="font-semibold mb-2">✨ What's Included</div>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
              <div>• Professional safari guide</div>
              <div>• 4x4 safari vehicle</div>
              <div>• Park entrance fees</div>
              <div>• Lunch and refreshments</div>
              <div>• Binoculars</div>
              <div>• Hotel pickup/drop-off</div>
            </div>
          </div>

          {/* Collapsible Detailed Itinerary */}
          <div className="mb-6">
            <button
              onClick={() => setShowItinerary(!showItinerary)}
              className="w-full flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <span className="font-semibold text-purple-900">📋 Detailed Itinerary</span>
              {showItinerary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            {showItinerary && (
              <div className="mt-4 space-y-3 p-4 bg-white border-2 border-purple-100 rounded-lg">
                {itinerary.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-3 border-b last:border-b-0">
                    <div className="text-sm font-semibold text-purple-600 min-w-[80px]">{item.time}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{item.activity}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <ShareButtons confirmationNumber={confirmation} service="Experience" />
          </div>
        </div>

        {/* Host/Tour Operator Contact */}
        <ServiceContactCard
          title="Tour Operator"
          name={hostDetails.name}
          address={hostDetails.address}
          phone={hostDetails.phone}
          email={hostDetails.email}
          whatsapp={hostDetails.whatsapp}
          verified
        />

        <div className="grid md:grid-cols-3 gap-4 mb-6" style={{display: 'none'}}>
          <button className="flex items-center justify-center gap-2 p-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700">
            <FileText className="w-5 h-5" />
            View Voucher
          </button>
          <button className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
            <Calendar className="w-5 h-5" />
            Add to Calendar
          </button>
          <button className="flex items-center justify-center gap-2 p-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700">
            <Share2 className="w-5 h-5" />
            Share Trip
          </button>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-8 text-center mt-6">
          <h3 className="text-2xl font-bold mb-3">Make it a Complete Trip</h3>
          <p className="text-gray-600 mb-6">Book accommodation and transportation</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/stays/results" className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700">
              Find Hotels
            </Link>
            <Link to="/cars/results" className="px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700">
              Rent a Car
            </Link>
            <Link to="/flights/results" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
              Book Flights
            </Link>
          </div>
        </div>

        {/* Ask Dia AI Assistant */}
        <div className="mt-6">
          <AskDiaButton 
            context="experience-confirmation" 
            bookingId={confirmation}
            suggestions={[
              '🏨 Nearby hotels',
              '✈️ Book return flights',
              '🎯 More experiences',
              '📸 Photo tips'
            ]}
          />
        </div>
      </div>
    </div>
  );
}

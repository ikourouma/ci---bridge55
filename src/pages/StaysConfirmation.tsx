import { useEffect } from 'react';
import { AskDiaButton } from '../components/AskDiaButton';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Home, Calendar, MapPin, Mail, Phone, Star } from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';
import { ShareButtons } from '../components/ShareButtons';
import { ServiceContactCard } from '../components/ServiceContactCard';

export function StaysConfirmation() {
  const [searchParams] = useSearchParams();
  const confirmation = `BK${Date.now().toString().slice(-8)}`;
  const hotelName = searchParams.get('hotel') || 'Giraffe Manor';
  const checkIn = searchParams.get('checkIn') || 'Nov 15';
  const checkOut = searchParams.get('checkOut') || 'Nov 18';
  
  const hotelContact = {
    name: hotelName,
    address: '123 Luxury Avenue, Nairobi, Kenya',
    phone: '+254 20 123 4567',
    email: 'reservations@hotel.com',
    whatsapp: '+254712345678'
  };

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
          <h1 className="text-4xl font-bold mb-3">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600">Your stay at {hotelName} is confirmed</p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-6 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm opacity-90 mb-1">Confirmation Number</div>
              <div className="text-3xl font-bold tracking-wider">{confirmation}</div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">Property</div>
              <div className="text-2xl font-bold">{hotelName}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6">Reservation Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold">Check-in</div>
                <div className="text-gray-600">{checkIn}, after 3:00 PM</div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold">Check-out</div>
                <div className="text-gray-600">{checkOut}, before 11:00 AM</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="font-semibold mb-2">Important Information</div>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Photo ID and credit card required at check-in</li>
              <li>• Early check-in subject to availability</li>
              <li>• Late check-out available for additional fee</li>
              <li>• Free cancellation up to 48 hours before check-in</li>
            </ul>
          </div>

          <div className="mb-6">
            <ShareButtons confirmationNumber={confirmation} service="Stay" />
          </div>

          <div className="flex gap-4">
            <Link to="/stays/results" className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center">
              Book Another Stay
            </Link>
            <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              View Booking
            </button>
          </div>
        </div>

        {/* Hotel Contact Information */}
        <ServiceContactCard
          title="Hotel Contact"
          name={hotelContact.name}
          address={hotelContact.address}
          phone={hotelContact.phone}
          email={hotelContact.email}
          whatsapp={hotelContact.whatsapp}
          verified
          hours="24/7 Front Desk Available"
        />

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 text-center mt-6">
          <h3 className="text-2xl font-bold mb-3">Complete Your Trip</h3>
          <p className="text-gray-600 mb-6">Add flights, car rentals, and experiences</p>
          <div className="flex gap-4 justify-center">
            <Link to="/flights/results" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Book Flights
            </Link>
            <Link to="/cars/results" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
              Rent a Car
            </Link>
          </div>
        </div>

        {/* Ask Dia AI Assistant */}
        <div className="mt-6">
          <AskDiaButton 
            context="stay-confirmation" 
            bookingId={confirmation}
            suggestions={[
              '✈️ Book flights',
              '🚗 Rent a car',
              '🎯 Find experiences',
              '🗺️ Plan itinerary'
            ]}
          />
        </div>
      </div>
    </div>
  );
}

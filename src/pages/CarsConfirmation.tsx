import { useEffect } from 'react';
import { AskDiaButton } from '../components/AskDiaButton';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Car, Calendar, MapPin, Shield, FileText } from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';
import { ShareButtons } from '../components/ShareButtons';
import { ServiceContactCard } from '../components/ServiceContactCard';

export function CarsConfirmation() {
  const [searchParams] = useSearchParams();
  const confirmation = `CR${Date.now().toString().slice(-8)}`;
  const carName = searchParams.get('name') || 'Toyota Land Cruiser';
  const pickupLocation = searchParams.get('pickupLocation') || 'Nairobi Airport (NBO)';
  const returnLocation = searchParams.get('returnLocation') || 'Nairobi Airport (NBO)';
  const insurance = searchParams.get('insurance') === 'true';

  const rentalCompany = {
    name: 'Safari Rentals Kenya',
    address: 'Jomo Kenyatta International Airport, Nairobi',
    phone: '+254 20 123 4567',
    email: 'rentals@safarikenya.com',
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
          <h1 className="text-4xl font-bold mb-3">Rental Confirmed!</h1>
          <p className="text-xl text-gray-600">Your {carName} is reserved</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <Car className="w-16 h-16 text-blue-600" />
            <div className="flex-1">
              <div className="text-sm text-gray-600">Reservation Number</div>
              <div className="text-3xl font-bold">{confirmation}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="font-semibold">Pickup</div>
                  <div className="text-sm text-gray-600">Nov 15, 2025 at 9:00 AM</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <div className="font-semibold">Return</div>
                  <div className="text-sm text-gray-600">Nov 20, 2025 at 9:00 AM</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-sm text-gray-600">Nairobi Airport (NBO)</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                What to Bring
              </div>
              <ul className="text-sm space-y-2">
                <li>• Valid driver's license</li>
                <li>• Credit card (for security deposit)</li>
                <li>• Confirmation number</li>
                <li>• Passport/ID</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
            <div className="font-semibold mb-2">⚠️ Important Information</div>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Security deposit: $500 (refundable)</li>
              <li>• Fuel policy: Full to Full</li>
              <li>• Mileage: Unlimited</li>
              <li>• Late return: $50/hour penalty</li>
              {insurance && <li className="text-green-600 font-semibold">• Full Coverage Insurance: ✓ Included</li>}
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="font-semibold mb-2">📍 Pickup & Return</div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Pickup:</span>
                <span className="font-semibold ml-2">{pickupLocation}</span>
              </div>
              <div>
                <span className="text-gray-600">Return:</span>
                <span className="font-semibold ml-2">{returnLocation}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <ShareButtons confirmationNumber={confirmation} service="Car Rental" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              <FileText className="w-5 h-5" />
              View Rental Agreement
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50">
              <Calendar className="w-5 h-5" />
              Modify Reservation
            </button>
          </div>
        </div>

        {/* Rental Company Contact */}
        <ServiceContactCard
          title="Rental Company"
          name={rentalCompany.name}
          address={rentalCompany.address}
          phone={rentalCompany.phone}
          email={rentalCompany.email}
          whatsapp={rentalCompany.whatsapp}
          verified
          hours="6:00 AM - 10:00 PM Daily"
        />

        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 text-center mt-6">
          <h3 className="text-2xl font-bold mb-3">Plan Your Road Trip</h3>
          <p className="text-gray-600 mb-6">Discover amazing experiences and places to stay</p>
          <div className="flex gap-4 justify-center">
            <Link to="/experiences/results" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
              Find Experiences
            </Link>
            <Link to="/stays/results" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Book Hotels
            </Link>
          </div>
        </div>

        {/* Ask Dia AI Assistant */}
        <div className="mt-6">
          <AskDiaButton 
            context="car-confirmation" 
            bookingId={confirmation}
            suggestions={[
              '🎯 Road trip ideas',
              '🏨 Hotels on route',
              '📍 Top destinations',
              '⛽ Fuel cost calculator'
            ]}
          />
        </div>
      </div>
    </div>
  );
}

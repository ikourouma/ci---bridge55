import { useEffect } from 'react';
import { AskDiaButton } from '../components/AskDiaButton';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Plane, Calendar, Users, Download, Mail, Smartphone } from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';
import { ShareButtons } from '../components/ShareButtons';
import { ServiceContactCard } from '../components/ServiceContactCard';

export function FlightsConfirmation() {
  const [searchParams] = useSearchParams();
  const confirmation = `FL${Date.now().toString().slice(-8)}`;
  const from = searchParams.get('from') || 'New York';
  const to = searchParams.get('to') || 'Nairobi';
  const airline = searchParams.get('name') || 'Kenya Airways';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Airport data
  const airports: Record<string, { code: string; name: string; city: string }> = {
    'New York': { code: 'JFK', name: 'John F. Kennedy International', city: 'New York' },
    'Nairobi': { code: 'NBO', name: 'Jomo Kenyatta International', city: 'Nairobi' },
    'London': { code: 'LHR', name: 'London Heathrow', city: 'London' },
    'Paris': { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris' },
    'Dubai': { code: 'DXB', name: 'Dubai International', city: 'Dubai' },
  };

  const fromAirport = airports[from] || { code: 'JFK', name: 'John F. Kennedy International', city: from };
  const toAirport = airports[to] || { code: 'NBO', name: 'Jomo Kenyatta International', city: to };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedTopNav />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-block p-6 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle className="w-20 h-20 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Flight Confirmed!</h1>
          <p className="text-xl text-gray-600">Your flight from {from} to {to} is booked</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between mb-6 pb-6 border-b">
            <div>
              <div className="text-sm text-gray-600 mb-1">Confirmation Code</div>
              <div className="text-3xl font-bold text-blue-600">{confirmation}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Airline</div>
              <div className="font-bold text-xl">{airline}</div>
              <div className="text-sm text-gray-600">Flight KQ001</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">DEPARTURE</div>
              <div className="font-bold text-2xl mb-1">{fromAirport.code}</div>
              <div className="font-semibold text-lg mb-1">{fromAirport.name}</div>
              <div className="text-sm text-gray-600 mb-3">{fromAirport.city}</div>
              <div className="text-sm font-semibold">Nov 15, 2025 • 10:30 PM</div>
              <div className="text-xs text-gray-600 mt-1">Terminal 4 • Gate B22</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">ARRIVAL</div>
              <div className="font-bold text-2xl mb-1">{toAirport.code}</div>
              <div className="font-semibold text-lg mb-1">{toAirport.name}</div>
              <div className="text-sm text-gray-600 mb-3">{toAirport.city}</div>
              <div className="text-sm font-semibold">Nov 16, 2025 • 7:45 PM</div>
              <div className="text-xs text-gray-600 mt-1">Terminal 1A • Gate C15</div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="font-semibold mb-2">✈️ Flight Details</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Flight Number:</span>
                <span className="font-semibold ml-2">KQ001</span>
              </div>
              <div>
                <span className="text-gray-600">Aircraft:</span>
                <span className="font-semibold ml-2">Boeing 787-8</span>
              </div>
              <div>
                <span className="text-gray-600">Class:</span>
                <span className="font-semibold ml-2">Economy</span>
              </div>
              <div>
                <span className="text-gray-600">Baggage:</span>
                <span className="font-semibold ml-2">2 × 23kg</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
            <div className="font-semibold mb-2">⚠️ Important Reminders</div>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Arrive at airport 3 hours before departure</li>
              <li>• Check-in online 24 hours before flight</li>
              <li>• Valid passport required (6+ months validity)</li>
              <li>• Print or save mobile boarding pass</li>
            </ul>
          </div>

          <ShareButtons confirmationNumber={confirmation} service="Flight" />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6" style={{display: 'none'}}>
          <button className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
            <Download className="w-5 h-5" />
            Download Ticket
          </button>
          <button className="flex items-center justify-center gap-2 p-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700">
            <Mail className="w-5 h-5" />
            Email Confirmation
          </button>
          <button className="flex items-center justify-center gap-2 p-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700">
            <Smartphone className="w-5 h-5" />
            Add to Wallet
          </button>
        </div>

        {/* Airline Contact Information */}
        <ServiceContactCard
          title="Airline Contact"
          name={airline}
          address="Jomo Kenyatta International Airport, Nairobi, Kenya"
          phone="+254 20 327 4747"
          email="customer.relations@kenya-airways.com"
          whatsapp="+254722172747"
          verified
          hours="24/7 Customer Service"
        />

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center mt-6">
          <h3 className="text-2xl font-bold mb-3">Complete Your Trip</h3>
          <p className="text-gray-600 mb-6">Book accommodation and ground transportation</p>
          <div className="flex gap-4 justify-center">
            <Link to="/stays/results" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Book Hotels
            </Link>
            <Link to="/cars/results" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
              Rent a Car
            </Link>
          </div>
        </div>

        {/* Ask Dia AI Assistant */}
        <div className="mt-6">
          <AskDiaButton 
            context="flight-confirmation" 
            bookingId={confirmation}
            suggestions={[
              '🏨 Book hotels',
              '🚗 Rent a car',
              '🎯 Find experiences',
              '🗺️ Complete trip plan'
            ]}
          />
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, MapPin, Users, Fuel, Settings, Shield, Check, Calendar, ChevronLeft, Clock } from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';
import { ImageGallery } from '../components/ImageGallery';

const CAR_DETAILS: Record<string, any> = {
  '1': {
    name: 'Toyota Land Cruiser V8',
    company: 'Safari Car Rental Kenya',
    rating: 4.8,
    reviews: 156,
    price: 120,
    image: '🚙',
    images: ['🚙', '🚗', '🏎️', '🚕', '🚐'],
    specs: {
      year: 2023,
      transmission: 'Automatic',
      fuel: 'Diesel',
      seats: 7,
      doors: 5,
      luggage: 4
    },
    features: ['4WD', 'GPS Navigation', 'Air Conditioning', 'Bluetooth', 'USB Charging', 'Roof Rack', 'Spare Tire', 'First Aid Kit'],
    insurance: ['Basic Coverage', 'Collision Damage Waiver', 'Theft Protection', 'Third Party Liability'],
    terms: ['Minimum age: 25 years', 'Valid driving license required', 'Security deposit: $500', 'Fuel policy: Full to Full', 'Mileage: Unlimited', 'Additional driver: $10/day']
  },
  '2': {
    name: 'Nissan Patrol 4x4',
    company: 'Kenya 4x4 Rentals',
    rating: 4.9,
    reviews: 203,
    price: 135,
    image: '🚙',
    images: ['🚙', '🚗', '🏎️', '🚕', '🚐'],
    specs: {
      year: 2024,
      transmission: 'Automatic',
      fuel: 'Diesel',
      seats: 7,
      doors: 5,
      luggage: 5
    },
    features: ['4WD', 'GPS', 'AC', 'Bluetooth', 'Cruise Control', 'Roof Rack', 'Snorkel', 'Recovery Kit'],
    insurance: ['Basic', 'CDW', 'Theft Protection', 'Personal Accident Insurance'],
    terms: ['Min age: 23', 'License required', 'Deposit: $600', 'Full to Full', 'Unlimited km']
  }
};

export function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('Nairobi Airport (NBO)');
  const [returnLocation, setReturnLocation] = useState('Nairobi Airport (NBO)');
  const [insurance, setInsurance] = useState(false);

  const car = CAR_DETAILS[id || '1'] || CAR_DETAILS['1'];
  
  const days = pickupDate && returnDate ? 
    Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)) : 1;
  const insuranceCost = insurance ? 25 * days : 0;
  const total = (car.price * days) + insuranceCost;

  const handleBook = () => {
    if (!pickupDate || !returnDate) {
      alert('Please select pickup and return dates');
      return;
    }
    navigate(`/checkout?service=car&name=${encodeURIComponent(car.name)}&pickup=${pickupDate}&pickupLocation=${pickupLocation}&return=${returnDate}&returnLocation=${returnLocation}&total=${total}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedTopNav />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button onClick={() => navigate('/cars/results')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ChevronLeft className="w-5 h-5" />
            Back to cars
          </button>
        </div>
      </div>

      <ImageGallery images={car.images} title={car.name} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-4xl font-bold mb-3">{car.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{car.rating}</span>
                  <span className="text-gray-600">({car.reviews} reviews)</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="text-sm font-semibold">{car.specs.seats} Seats</div>
                </div>
                <div className="text-center">
                  <Settings className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="text-sm font-semibold">{car.specs.transmission}</div>
                </div>
                <div className="text-center">
                  <Fuel className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="text-sm font-semibold">{car.specs.fuel}</div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {car.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Insurance Options</h2>
                <div className="space-y-2">
                  {car.insurance.map((ins: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span>{ins}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Rental Terms</h2>
                <div className="space-y-2">
                  {car.terms.map((term: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-gray-600 mt-0.5" />
                      <span>{term}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  ${car.price}
                  <span className="text-lg text-gray-600 font-normal"> / day</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{car.rating}</span>
                  <span className="text-gray-600">({car.reviews} reviews)</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Pickup Date</label>
                  <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Return Date</label>
                  <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} min={pickupDate} className="w-full px-4 py-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pickup Location</label>
                  <input type="text" placeholder="Airport or City" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} className="w-full px-4 py-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Return Location</label>
                  <input type="text" placeholder="Airport or City" value={returnLocation} onChange={(e) => setReturnLocation(e.target.value)} className="w-full px-4 py-3 border rounded-lg" />
                </div>
                
                {/* Insurance Option */}
                <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={insurance}
                      onChange={(e) => setInsurance(e.target.checked)}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-blue-900">Add Full Coverage Insurance</div>
                      <div className="text-sm text-blue-700 mt-1">$25/day - Zero deductible, complete peace of mind</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span>${car.price} × {days} days</span>
                  <span>${car.price * days}</span>
                </div>
                {insurance && (
                  <div className="flex justify-between text-sm text-blue-600">
                    <span>Insurance × {days} days</span>
                    <span>${insuranceCost}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span className="text-blue-600">${total}</span>
              </div>

              <button onClick={handleBook} disabled={!pickupDate || !returnDate} className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 mb-4">
                Reserve Now
              </button>

              <div className="pt-6 border-t">
                <h3 className="font-bold text-lg mb-4">Rental Company</h3>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-xl">
                    🚗
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">{car.company}</h4>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">License #KE-CR-4521</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>4.8 • 3,400 rentals</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>Nairobi, Kenya</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <a href="tel:+254712345678" className="px-3 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"/><path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.859 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 00.648-.291l1.86-2.171a.997.997 0 00-.086-1.391l-4.064-3.696z"/></svg>
                    Call
                  </a>
                  <a href="https://wa.me/254712345678" target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#20BA5A] flex items-center justify-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </div>

                <button className="w-full py-2.5 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 flex items-center justify-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  Message Company
                </button>

                <p className="text-xs text-center text-gray-500 mt-2">
                  Contact shows based on your location
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Shield, AlertCircle } from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';
import { PaymentFlow } from '../components/PaymentFlow';
import { ServiceContactCard } from '../components/ServiceContactCard';
import { MarketingBanner, MARKETING_BANNERS } from '../components/MarketingBanner';

export function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const service = searchParams.get('service') || 'stay';
  const total = parseFloat(searchParams.get('total') || '0');
  const name = searchParams.get('name') || '';
  
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);

  // Service provider contact details
  const serviceContacts = {
    stay: {
      title: 'Hotel Contact',
      name: name || 'Luxury Resort',
      address: '123 Beachfront Avenue, Mombasa, Kenya',
      phone: '+254 41 123 4567',
      email: 'reservations@hotel.com',
      whatsapp: '+254712345678'
    },
    flight: {
      title: 'Airline Contact',
      name: 'Kenya Airways',
      address: 'Jomo Kenyatta International Airport, Nairobi',
      phone: '+254 20 327 4747',
      email: 'support@kenya-airways.com',
      whatsapp: '+254722172747'
    },
    car: {
      title: 'Rental Company',
      name: 'Safari Rentals Kenya',
      address: 'Airport Road, Nairobi, Kenya',
      phone: '+254 20 123 4567',
      email: 'rentals@safarikenya.com',
      whatsapp: '+254712345678'
    },
    experience: {
      title: 'Tour Operator',
      name: 'Safari Adventures Ltd',
      address: 'Serengeti National Park, Tanzania',
      phone: '+255 27 250 3471',
      email: 'contact@safariadventures.tz',
      whatsapp: '+255784567890'
    },
    evisa: {
      title: 'Visa Processing Center',
      name: 'Bridge55 Visa Services',
      address: 'Virtual Processing Center',
      phone: '+254 20 XXX XXXX',
      email: 'visa@bridge55.com',
      whatsapp: '+254700000000'
    }
  };

  const contact = serviceContacts[service as keyof typeof serviceContacts] || serviceContacts.stay;

  const handlePaymentComplete = (paymentDetails: any) => {
    setPaymentReady(true);
  };

  // Check if all requirements are met
  const canCompleteBooking = agreedToTerms && agreedToPolicy && paymentReady;

  const handleFinalizeBooking = () => {
    if (!agreedToTerms || !agreedToPolicy) {
      alert('Please accept terms and conditions');
      return;
    }

    if (!paymentReady) {
      alert('Please select a payment method');
      return;
    }

    // Redirect to appropriate confirmation
    const confirmationRoutes: Record<string, string> = {
      stay: '/stays/confirmation',
      flight: '/flights/confirmation',
      car: '/cars/confirmation',
      experience: '/experiences/confirmation',
      evisa: '/evisa/confirmation'
    };

    navigate(`${confirmationRoutes[service]}?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedTopNav />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
        <p className="text-gray-600 mb-8">Secure payment powered by Bridge55</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Flow - Left Side */}
          <div className="lg:col-span-2">
            <PaymentFlow
              amount={total}
              onPaymentComplete={handlePaymentComplete}
            />
            
            {/* Terms & Conditions */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 mt-1"
                  />
                  <span className="text-sm">
                    I agree to the <a href="#" className="text-blue-600 underline">Terms and Conditions</a> and understand the cancellation policy
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToPolicy}
                    onChange={(e) => setAgreedToPolicy(e.target.checked)}
                    className="w-5 h-5 mt-1"
                  />
                  <span className="text-sm">
                    I agree to the <a href="#" className="text-blue-600 underline">Privacy Policy</a> and consent to data processing
                  </span>
                </label>
              </div>

              <div className="mt-6 flex items-start gap-3 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-900">
                  <div className="font-semibold mb-1">Your payment is secure</div>
                  <div>Bank-level encryption • PCI DSS compliant • 3D Secure protected</div>
                </div>
              </div>

              <button
                onClick={handleFinalizeBooking}
                disabled={!canCompleteBooking}
                className={`mt-6 w-full py-4 font-bold rounded-xl transition-all shadow-lg text-lg ${
                  canCompleteBooking
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Complete Booking
              </button>

              {!canCompleteBooking && (
                <div className="mt-4 space-y-1">
                  {!paymentReady && (
                    <div className="flex items-start gap-2 text-sm text-orange-600">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Please select a payment method</span>
                    </div>
                  )}
                  {!agreedToTerms && (
                    <div className="flex items-start gap-2 text-sm text-orange-600">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Please accept the terms and conditions</span>
                    </div>
                  )}
                  {!agreedToPolicy && (
                    <div className="flex items-start gap-2 text-sm text-orange-600">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Please accept the privacy policy</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
              
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service</span>
                  <span className="font-semibold capitalize">{service}</span>
                </div>
                {name && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item</span>
                    <span className="font-semibold text-sm text-right max-w-[60%]">{name}</span>
                  </div>
                )}
                
                {/* Service-specific details */}
                {service === 'stay' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-in</span>
                      <span className="font-semibold">Nov 20, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-out</span>
                      <span className="font-semibold">Nov 25, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Guests</span>
                      <span className="font-semibold">2 Adults</span>
                    </div>
                  </>
                )}
                
                {service === 'flight' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Route</span>
                      <span className="font-semibold">JFK → NBO</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date</span>
                      <span className="font-semibold">Nov 15, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Passengers</span>
                      <span className="font-semibold">1 Adult</span>
                    </div>
                  </>
                )}
                
                {service === 'car' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pickup</span>
                      <span className="font-semibold">Nov 20, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Return</span>
                      <span className="font-semibold">Nov 25, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold">5 days</span>
                    </div>
                  </>
                )}
                
                {service === 'experience' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date</span>
                      <span className="font-semibold">Nov 20, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold">Full Day</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Participants</span>
                      <span className="font-semibold">2 Adults</span>
                    </div>
                  </>
                )}
                
                {service === 'evisa' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Destination</span>
                      <span className="font-semibold">Kenya</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type</span>
                      <span className="font-semibold">Tourist Visa</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Travelers</span>
                      <span className="font-semibold">1 Person</span>
                    </div>
                  </>
                )}
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-2 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee (5%)</span>
                  <span className="font-semibold">${(total * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-bold text-blue-600">${(total * 1.05).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-blue-900">Protected Booking</span>
                </div>
                <ul className="ml-6 space-y-1 text-xs">
                  <li>• Free cancellation (48 hours)</li>
                  <li>• Price match guarantee</li>
                  <li>• 24/7 customer support</li>
                  <li>• Secure payment encryption</li>
                </ul>
              </div>
              </div>

              {/* Service Provider Contact */}
              <ServiceContactCard
                title={contact.title}
                name={contact.name}
                address={contact.address}
                phone={contact.phone}
                email={contact.email}
                whatsapp={contact.whatsapp}
                verified
              />

              {/* Marketing Banner */}
              <MarketingBanner {...MARKETING_BANNERS.walletTopUp} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { AskDiaButton } from '../components/AskDiaButton';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Download, Mail, MessageCircle, Calendar, CreditCard, FileText, ArrowRight } from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';

import { ServiceContactCard } from '../components/ServiceContactCard';
export function EvisaConfirmation() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'traveler@example.com';
  const reference = `EV${Date.now().toString().slice(-8)}`;
  const country = searchParams.get('country') || 'Côte d\'Ivoire';

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedTopNav />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-block p-6 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle className="w-20 h-20 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            eVisa Application Submitted!
          </h1>
          <p className="text-xl text-gray-600">
            Your application for {country} has been successfully submitted
          </p>
        </div>

        {/* Application Reference */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">Application Reference</div>
              <div className="text-3xl font-bold tracking-wider">{reference}</div>
              <div className="text-sm opacity-90 mt-2">Save this reference number for tracking</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90 mb-1">Submitted</div>
              <div className="text-lg font-semibold">{new Date().toLocaleDateString()}</div>
              <div className="text-sm opacity-90">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6">What Happens Next?</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email Confirmation</h3>
                <p className="text-gray-600">
                  We've sent a confirmation email to <strong>{email}</strong> with your application details and reference number.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-purple-600">2</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Document Verification</h3>
                <p className="text-gray-600">
                  Our team will verify your documents within <strong>24 hours</strong>. You'll be notified if additional information is needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-green-600">3</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Government Processing</h3>
                <p className="text-gray-600">
                  Your application will be submitted to {country} immigration authorities. Processing typically takes <strong>5-7 business days</strong>.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-orange-600">4</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">eVisa Delivery</h3>
                <p className="text-gray-600 mb-2">
                  Once approved, your eVisa will be sent to your email as a <strong>PDF document</strong>. Print it and carry it with your passport.
                </p>
                <p className="text-sm text-blue-600 font-semibold">
                  📱 Your eVisa will also be available in your Bridge55 Dashboard for easy access anytime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Link
            to={`/evisa/track?ref=${reference}`}
            className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-lg">Track Application</div>
                <div className="text-sm text-gray-600">Check status anytime</div>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </Link>

          <button className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-lg">Download Receipt</div>
                <div className="text-sm text-gray-600">Save for your records</div>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-green-600 transition-colors" />
          </button>
        </div>

        {/* Important Reminders */}
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-lg mb-3 text-orange-900">Important Reminders</h3>
          <ul className="space-y-2 text-sm text-orange-800">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>Check your email (including spam folder) regularly for updates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>Keep your reference number safe - you'll need it to track your application</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>Processing times are estimates - actual time may vary based on application volume</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>Approval is at the discretion of {country} immigration authorities</span>
            </li>
          </ul>
        </div>

        {/* Visa Processing Support Contact */}
        <ServiceContactCard
          title="Visa Processing Support"
          name="Bridge55 Visa Services"
          address="Virtual Processing Center - Available Worldwide"
          phone="+254 20 800 5500"
          email="visa-support@bridge55.com"
          whatsapp="+254700555000"
          verified
          hours="Mon-Fri 8AM-6PM EAT"
        />

        {/* Continue Planning */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 text-center mt-6">
          <h3 className="text-2xl font-bold mb-3">Continue Planning Your Trip</h3>
          <p className="text-gray-600 mb-6">
            While you wait for your visa, explore flights, hotels, and experiences in {country}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/flights/results"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Find Flights
            </Link>
            <Link
              to="/stays/results"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Book Hotels
            </Link>
            <Link
              to="/experiences/results"
              className="px-6 py-3 border-2 border-gray-300 bg-white rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Explore Tours
            </Link>
          </div>
        </div>

        {/* Support */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Need help?</p>
          <div className="flex gap-4 justify-center">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <MessageCircle className="w-5 h-5" />
              Live Chat
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Mail className="w-5 h-5" />
              Email Support
            </button>
          </div>
        </div>

        {/* Ask Dia AI Assistant - Well Spaced */}
        <div className="mt-12">
          <AskDiaButton 
            context="evisa-confirmation" 
            bookingId={reference}
            suggestions={[
              '🦁 Safari in Kenya',
              '🏖️ Beach getaway', 
              '🏛️ Cultural tours',
              '💰 Budget options'
            ]}
          />
        </div>
      </div>
    </div>
  );
}

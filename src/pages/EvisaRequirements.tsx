import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, AlertTriangle, CheckCircle, FileText, Clock, DollarSign, Plane, Info } from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';

const TRAVEL_ADVISORIES = [
  "🔒 Yellow fever vaccination required for travelers from endemic countries",
  "📋 Valid passport with 6 months validity required",
  "🏥 Travel insurance recommended for all visitors",
  "💳 Proof of sufficient funds may be requested at border",
  "🎫 Return or onward ticket required for entry"
];

const COUNTRY_REQUIREMENTS: any = {
  'CI': {
    name: "Côte d'Ivoire",
    flag: '🇨🇮',
    processingTime: '5-7 business days',
    validityPeriod: '90 days',
    stayDuration: 'Up to 90 days',
    fee: '$73 - $250',
    requirements: [
      'Valid passport with at least 6 months validity',
      'Recent passport-sized photograph',
      'Proof of accommodation in Côte d\'Ivoire',
      'Return or onward flight ticket',
      'Yellow fever vaccination certificate',
      'Bank statement (last 3 months)',
      'Travel itinerary',
      'Travel insurance (recommended)'
    ],
    restrictions: [
      'Travelers from certain countries may require additional documentation',
      'Business visa holders cannot engage in employment',
      'Extension of stay must be applied for at least 15 days before expiry',
      'Overstaying can result in fines and deportation'
    ],
    healthRequirements: [
      'Yellow fever vaccination mandatory',
      'COVID-19 vaccination may be required',
      'Malaria prophylaxis recommended',
      'Travel health insurance strongly advised'
    ]
  }
};

export function EvisaRequirements() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentAdvisory, setCurrentAdvisory] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [readPolicy, setReadPolicy] = useState(false);

  const country = searchParams.get('country') || 'CI';
  const requirements = COUNTRY_REQUIREMENTS[country];

  // Rotate travel advisories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdvisory((prev) => (prev + 1) % TRAVEL_ADVISORIES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleAcceptAndContinue = () => {
    if (!accepted) {
      alert('Please accept the disclaimer to continue');
      return;
    }
    navigate(`/evisa?country=${country}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedTopNav />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header with Rotating Advisory */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-5xl">{requirements.flag}</span>
                <div>
                  <h1 className="text-3xl font-bold">eVisa Requirements</h1>
                  <p className="text-blue-100">Destination: {requirements.name}</p>
                </div>
              </div>
            </div>
            
            {/* Rotating Travel Advisory */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-80">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 animate-pulse" />
                <span className="text-sm font-semibold">Travel Advisory</span>
              </div>
              <p className="text-sm leading-relaxed transition-all duration-500">
                {TRAVEL_ADVISORIES[currentAdvisory]}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <Clock className="w-8 h-8 text-blue-600 mb-2" />
            <div className="text-xs text-gray-600">Processing Time</div>
            <div className="font-bold">{requirements.processingTime}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <div className="text-xs text-gray-600">Validity Period</div>
            <div className="font-bold">{requirements.validityPeriod}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <Plane className="w-8 h-8 text-purple-600 mb-2" />
            <div className="text-xs text-gray-600">Stay Duration</div>
            <div className="font-bold">{requirements.stayDuration}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <DollarSign className="w-8 h-8 text-orange-600 mb-2" />
            <div className="text-xs text-gray-600">Visa Fee</div>
            <div className="font-bold">{requirements.fee}</div>
          </div>
        </div>

        {/* Document Requirements */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Required Documents
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {requirements.requirements.map((req: string, i: number) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Health Requirements */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-600" />
            Health Requirements
          </h2>
          <div className="space-y-3">
            {requirements.healthRequirements.map((req: string, i: number) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Restrictions & Important Notes */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            Important Restrictions
          </h2>
          <div className="space-y-3">
            {requirements.restrictions.map((restriction: string, i: number) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{restriction}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-900">
            <Shield className="w-6 h-6" />
            Important Disclaimer
          </h2>
          <div className="prose prose-sm max-w-none text-gray-800 mb-6">
            <p className="mb-4">
              <strong>Bridge55 is a facilitation platform only.</strong> We assist in the application process but do not make visa decisions. All visa approvals and rejections are at the sole discretion of the {requirements.name} government authorities.
            </p>
            <p className="mb-4">
              By proceeding with this application, you acknowledge that:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>All information provided must be accurate and truthful</li>
              <li>Bridge55 is not responsible for visa rejections or delays</li>
              <li>Processing fees are non-refundable regardless of outcome</li>
              <li>You meet all entry requirements of the destination country</li>
              <li>You have reviewed and understood all restrictions and requirements</li>
              <li>Final entry decision rests with immigration authorities at the border</li>
            </ul>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <input
              type="checkbox"
              id="readPolicy"
              checked={readPolicy}
              onChange={(e) => setReadPolicy(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="readPolicy" className="text-sm">
              I have read and understood the{' '}
              <button className="text-blue-600 hover:underline font-semibold">
                full terms and conditions
              </button>{' '}
              and{' '}
              <button className="text-blue-600 hover:underline font-semibold">
                privacy policy
              </button>
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="acceptDisclaimer"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="acceptDisclaimer" className="text-sm">
              <strong>I accept the disclaimer</strong> and understand that Bridge55 is a facilitation platform and not responsible for visa decisions made by government authorities.
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAcceptAndContinue}
            disabled={!accepted || !readPolicy}
            className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            Accept & Continue to Application
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          By continuing, you will proceed to the eVisa application form
        </p>
      </div>
    </div>
  );
}

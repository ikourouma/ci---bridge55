import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Clock, Upload, Check, AlertCircle } from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';
import { PhoneInput } from '../components/PhoneInput';

const VISA_DATA: any = {
  name: "Côte d'Ivoire",
  flag: '🇨🇮',
  types: [
    { id: '30', name: 'Tourist 30 days', price: 73, duration: '30 days' },
    { id: '90', name: 'Tourist 90 days', price: 143, duration: '90 days', popular: true },
    { id: 'business', name: 'Business Visa', price: 180, duration: '90 days' },
    { id: 'student', name: 'Student Visa', price: 250, duration: '1 year' }
  ],
  speeds: [
    { id: 'standard', name: 'Standard', time: '5-7 days', price: 0 },
    { id: 'express', name: 'Express', time: '2-3 days', price: 50 },
    { id: 'urgent', name: 'Urgent', time: '24 hours', price: 100 }
  ],
  requirements: [
    'Valid passport (6+ months)',
    'Passport photo (white background)',
    'Yellow fever certificate',
    'Hotel booking or invitation',
    'Return flight ticket',
    'Bank statement (3 months)'
  ]
};

export function EvisaApplication() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [visaType, setVisaType] = useState('90');
  const [speed, setSpeed] = useState('standard');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [passport, setPassport] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [hotel, setHotel] = useState('');
  const [docs, setDocs] = useState<string[]>([]);

  const selectedVisa = VISA_DATA.types.find((v: any) => v.id === visaType);
  const selectedSpeed = VISA_DATA.speeds.find((s: any) => s.id === speed);
  const total = (selectedVisa?.price || 0) + (selectedSpeed?.price || 0);

  const canContinue = () => {
    if (step === 1) return visaType && speed;
    if (step === 2) return firstName && lastName && dob && passport && email && phone;
    if (step === 3) return arrivalDate && departureDate && hotel;
    if (step === 4) return docs.length >= 3;
    return true;
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      navigate(`/checkout?service=evisa&country=Cote-dIvoire&email=${email}&total=${total}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedTopNav />
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">eVisa Application</h1>
              <p className="text-blue-100">🇺🇸 United States → {VISA_DATA.flag} {VISA_DATA.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            {[1,2,3,4,5].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step > s ? 'bg-green-500 text-white' :
                  step === s ? 'bg-blue-600 text-white' : 'bg-gray-300'
                }`}>
                  {step > s ? <Check className="w-6 h-6" /> : s}
                </div>
                {s < 5 && <div className={`h-1 flex-1 ${step > s ? 'bg-green-500' : 'bg-gray-300'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            {/* Step 1 */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Select Visa Type</h2>
                <div className="space-y-3 mb-6">
                  {VISA_DATA.types.map((v: any) => (
                    <button
                      key={v.id}
                      onClick={() => setVisaType(v.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left ${
                        visaType === v.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="font-bold">{v.name}</div>
                          <div className="text-sm text-gray-600">{v.duration}</div>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">${v.price}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <h3 className="font-bold mb-3">Processing Speed</h3>
                <div className="grid grid-cols-3 gap-3">
                  {VISA_DATA.speeds.map((s: any) => (
                    <button
                      key={s.id}
                      onClick={() => setSpeed(s.id)}
                      className={`p-4 rounded-lg border-2 text-center ${
                        speed === s.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="font-bold capitalize">{s.name}</div>
                      <div className="text-xs text-gray-600">{s.time}</div>
                      <div className="text-sm font-semibold text-blue-600 mt-1">
                        {s.price === 0 ? 'Free' : `+$${s.price}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Passport Number"
                    value={passport}
                    onChange={(e) => setPassport(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    label="Phone Number"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Travel Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Arrival Date</label>
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Departure Date</label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      min={arrivalDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Hotel name or address in Côte d'Ivoire"
                    value={hotel}
                    onChange={(e) => setHotel(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Upload Documents</h2>
                <div className="space-y-3">
                  {VISA_DATA.requirements.map((req: string, i: number) => (
                    <div key={i} className="border-2 border-dashed rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Upload className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{req}</div>
                            {docs.includes(req) && (
                              <div className="text-sm text-green-600">✓ Uploaded</div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (!docs.includes(req)) {
                              setDocs([...docs, req]);
                            }
                          }}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            docs.includes(req)
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          {docs.includes(req) ? 'Uploaded' : 'Upload'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5 */}
            {step === 5 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Review Application</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-bold mb-2">Personal Info</h3>
                    <div className="text-sm space-y-1">
                      <div>Name: {firstName} {lastName}</div>
                      <div>DOB: {dob}</div>
                      <div>Passport: {passport}</div>
                      <div>Email: {email}</div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-bold mb-2">Travel Info</h3>
                    <div className="text-sm space-y-1">
                      <div>Arrival: {arrivalDate}</div>
                      <div>Departure: {departureDate}</div>
                      <div>Hotel: {hotel}</div>
                    </div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-bold mb-2">Visa Details</h3>
                    <div className="text-sm space-y-1">
                      <div>Type: {selectedVisa?.name}</div>
                      <div>Processing: {selectedSpeed?.name}</div>
                      <div>Documents: {docs.length} uploaded</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border-2 rounded-lg font-semibold"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canContinue()}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300"
              >
                {step === 5 ? 'Proceed to Payment' : 'Continue'}
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Summary</h3>
            <div className="space-y-4 mb-6">
              <div>
                <div className="text-sm text-gray-600">Destination</div>
                <div className="font-semibold">{VISA_DATA.flag} {VISA_DATA.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Visa Type</div>
                <div className="font-semibold">{selectedVisa?.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Processing</div>
                <div className="font-semibold">{selectedSpeed?.name}</div>
                <div className="text-xs text-gray-500">{selectedSpeed?.time}</div>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Visa Fee</span>
                <span>${selectedVisa?.price}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span>Processing</span>
                <span>${selectedSpeed?.price}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">${total}</span>
              </div>
            </div>
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 font-semibold mb-2">
                <Clock className="w-4 h-4" />
                Timeline
              </div>
              <div className="text-xs space-y-1">
                <div>Day 0: Application submitted</div>
                <div>Day 1: Under review</div>
                <div>Day 3: Processing</div>
                <div>Day 5: Approved & sent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

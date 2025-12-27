import { useState } from 'react';
import { X, Building2, CreditCard, Shield } from 'lucide-react';
import { ALL_COUNTRIES } from '../config/countries-full';

interface BankAccountModalProps {
  onClose: () => void;
  onAdd: (account: any) => void;
}

export function BankAccountModal({ onClose, onAdd }: BankAccountModalProps) {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const [routingNumber, setRoutingNumber] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [country, setCountry] = useState('US');
  const [isDefault, setIsDefault] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState('microdeposit');
  
  // Debit card verification fields
  const [cardLast4, setCardLast4] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const account = {
      id: Date.now(),
      bankName,
      accountNumber,
      accountType,
      routingNumber,
      swiftCode,
      country,
      isDefault,
      verificationMethod,
      ...(verificationMethod === 'debitcard' && { cardLast4, cardExpiry }),
      verified: false,
      status: 'pending'
    };
    
    onAdd(account);
    onClose();
  };

  const selectedCountry = ALL_COUNTRIES.find(c => c.code === country);
  const isInternational = country !== 'US';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Link Bank Account</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Country Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Country *</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {ALL_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Bank Name *</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Enter bank name"
                required
                className="w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium mb-2">Account Number *</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Account Type *</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="business">Business</option>
            </select>
          </div>

          {/* US: Routing Number */}
          {!isInternational && (
            <div>
              <label className="block text-sm font-medium mb-2">Routing Number (US) *</label>
              <input
                type="text"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 9))}
                placeholder="9-digit routing number"
                required
                maxLength={9}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Found on your checks or bank statement</p>
            </div>
          )}

          {/* International: SWIFT/BIC */}
          {isInternational && (
            <div>
              <label className="block text-sm font-medium mb-2">SWIFT/BIC Code *</label>
              <input
                type="text"
                value={swiftCode}
                onChange={(e) => setSwiftCode(e.target.value.toUpperCase().slice(0, 11))}
                placeholder="8 or 11 character code"
                required
                maxLength={11}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
              />
              <p className="text-xs text-gray-500 mt-1">International bank identifier code</p>
            </div>
          )}

          {/* Verification Method */}
          <div>
            <label className="block text-sm font-medium mb-2">Verification Method *</label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="radio"
                  name="verification"
                  value="microdeposit"
                  checked={verificationMethod === 'microdeposit'}
                  onChange={(e) => setVerificationMethod(e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-semibold">Micro-deposit Verification</div>
                  <div className="text-sm text-gray-600">We'll make 2 small deposits (1-2 business days)</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="radio"
                  name="verification"
                  value="debitcard"
                  checked={verificationMethod === 'debitcard'}
                  onChange={(e) => setVerificationMethod(e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-semibold">Debit Card Verification</div>
                  <div className="text-sm text-gray-600">Verify using associated debit card (instant)</div>
                </div>
              </label>
            </div>
          </div>

          {/* Debit Card Verification Fields */}
          {verificationMethod === 'debitcard' && (
            <div className="bg-blue-50 rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-2 text-blue-900 font-semibold">
                <CreditCard className="w-5 h-5" />
                <span>Debit Card Details</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Last 4 Digits *</label>
                  <input
                    type="text"
                    value={cardLast4}
                    onChange={(e) => setCardLast4(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    placeholder="1234"
                    required={verificationMethod === 'debitcard'}
                    maxLength={4}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry (MM/YY) *</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                      }
                      setCardExpiry(value);
                    }}
                    placeholder="MM/YY"
                    required={verificationMethod === 'debitcard'}
                    maxLength={5}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Default Account */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm">Set as default for disbursements</span>
          </label>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-900">
              <div className="font-semibold mb-1">Your information is secure</div>
              <div>We use bank-level encryption and never store your full account details</div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
          >
            Link Bank Account
          </button>
        </form>
      </div>
    </div>
  );
}

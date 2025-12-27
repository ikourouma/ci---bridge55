import { useState, useEffect } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

const COUNTRIES = [
  { code: 'US', flag: '🇺🇸', dial: '+1', name: 'United States' },
  { code: 'CI', flag: '🇨🇮', dial: '+225', name: 'Côte d\'Ivoire' },
  { code: 'KE', flag: '🇰🇪', dial: '+254', name: 'Kenya' },
  { code: 'NG', flag: '🇳🇬', dial: '+234', name: 'Nigeria' },
  { code: 'ZA', flag: '🇿🇦', dial: '+27', name: 'South Africa' },
  { code: 'GH', flag: '🇬🇭', dial: '+233', name: 'Ghana' },
  { code: 'EG', flag: '🇪🇬', dial: '+20', name: 'Egypt' },
  { code: 'MA', flag: '🇲🇦', dial: '+212', name: 'Morocco' },
  { code: 'ET', flag: '🇪🇹', dial: '+251', name: 'Ethiopia' },
  { code: 'TZ', flag: '🇹🇿', dial: '+255', name: 'Tanzania' },
  { code: 'UG', flag: '🇺🇬', dial: '+256', name: 'Uganda' },
  { code: 'RW', flag: '🇷🇼', dial: '+250', name: 'Rwanda' },
  { code: 'SN', flag: '🇸🇳', dial: '+221', name: 'Senegal' },
  { code: 'GB', flag: '🇬🇧', dial: '+44', name: 'United Kingdom' },
  { code: 'FR', flag: '🇫🇷', dial: '+33', name: 'France' },
  { code: 'DE', flag: '🇩🇪', dial: '+49', name: 'Germany' },
  { code: 'CA', flag: '🇨🇦', dial: '+1', name: 'Canada' },
];

export function PhoneInput({ value, onChange, label = 'Phone Number', required = false }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Auto-detect user's country (defaults to US, but in production use geolocation)
  useEffect(() => {
    // In production: detect from IP or browser settings
    const userCountry = COUNTRIES.find(c => c.code === 'US') || COUNTRIES[0];
    setSelectedCountry(userCountry);
  }, []);

  // Update full phone number when country or number changes
  useEffect(() => {
    if (phoneNumber) {
      onChange(`${selectedCountry.dial}${phoneNumber}`);
    }
  }, [selectedCountry, phoneNumber]);

  // Parse existing value if provided
  useEffect(() => {
    if (value && value.startsWith('+')) {
      const country = COUNTRIES.find(c => value.startsWith(c.dial));
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.replace(country.dial, ''));
      }
    }
  }, [value]);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex gap-2">
        {/* Country Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-lg hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white min-w-[120px]"
          >
            <span className="text-2xl">{selectedCountry.flag}</span>
            <span className="font-medium">{selectedCountry.dial}</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
              <div className="absolute z-20 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(country);
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium">{country.name}</div>
                      <div className="text-sm text-gray-500">{country.dial}</div>
                    </div>
                    {selectedCountry.code === country.code && (
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            // Only allow numbers
            const cleaned = e.target.value.replace(/[^0-9]/g, '');
            setPhoneNumber(cleaned);
          }}
          placeholder="712 345 678"
          required={required}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Format: {selectedCountry.dial} - Area Code - Number
      </p>
    </div>
  );
}

import { X, Hotel, Plane, Car, MapPin, Globe, User, Heart, Clock, HelpCircle, Settings, CreditCard, Bell, DollarSign, Languages } from 'lucide-react';

interface ComprehensiveMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeService: string;
  onServiceChange: (service: string) => void;
}

export function ComprehensiveMenu({ isOpen, onClose, activeService, onServiceChange }: ComprehensiveMenuProps) {
  const services = [
    { id: 'stays', icon: Hotel, label: 'Stays', description: 'Hotels & Accommodations' },
    { id: 'flights', icon: Plane, label: 'Flights', description: 'Book Flights' },
    { id: 'cars', icon: Car, label: 'Cars', description: 'Car Rentals' },
    { id: 'experiences', icon: MapPin, label: 'Experiences', description: 'Tours & Activities' },
    { id: 'evisa', icon: Globe, label: 'eVisa', description: 'Travel Documents' },
  ];

  const accountItems = [
    { icon: User, label: 'My Account', href: '#' },
    { icon: Heart, label: 'Saved Trips', href: '#' },
    { icon: Clock, label: 'Booking History', href: '#' },
    { icon: CreditCard, label: 'Payment Methods', href: '#' },
    { icon: Bell, label: 'Notifications', href: '#' },
  ];

  const helpItems = [
    { icon: HelpCircle, label: 'Help Center', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Menu Drawer */}
      <div className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-pink-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-white">
                <p className="font-semibold">Welcome</p>
                <p className="text-sm text-purple-100">Sign in for more</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Services Section */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Services
            </h3>
            <nav className="space-y-1">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    onServiceChange(service.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                    activeService === service.id
                      ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-600'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <service.icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold">{service.label}</p>
                    <p className="text-xs text-gray-500">{service.description}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Account Section */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Account
            </h3>
            <nav className="space-y-1">
              {accountItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Settings */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Preferences
            </h3>
            
            {/* Currency Selector */}
            <div className="mb-4">
              <label className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <DollarSign className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-700">Currency</p>
                  <select className="text-sm text-gray-500 bg-transparent border-none outline-none cursor-pointer">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                    <option>ZAR - South African Rand</option>
                    <option>NGN - Nigerian Naira</option>
                    <option>KES - Kenyan Shilling</option>
                  </select>
                </div>
              </label>
            </div>

            {/* Language Selector */}
            <div>
              <label className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <Languages className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-700">Language</p>
                  <select className="text-sm text-gray-500 bg-transparent border-none outline-none cursor-pointer">
                    <option>English</option>
                    <option>Français</option>
                    <option>Español</option>
                    <option>العربية</option>
                    <option>Português</option>
                    <option>Swahili</option>
                  </select>
                </div>
              </label>
            </div>
          </div>

          {/* Help & Support */}
          <div className="p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Help & Support
            </h3>
            <nav className="space-y-1">
              {helpItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>

            {/* Quick Links */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">About Bridge55</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Privacy Policy</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>

          {/* Footer - Sign In/Up */}
          <div className="mt-auto p-6 border-t border-gray-200 bg-gray-50">
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-md">
                Sign In
              </button>
              <button className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

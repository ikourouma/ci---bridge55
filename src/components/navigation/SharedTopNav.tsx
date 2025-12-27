import { Link } from 'react-router-dom';
import { Menu, Globe, DollarSign, Bell, User, ChevronDown } from 'lucide-react';

interface SharedTopNavProps {
  onMenuClick?: () => void;
  showSearch?: boolean;
  simplified?: boolean; // For checkout/payment pages
}

export function SharedTopNav({ onMenuClick, showSearch = false, simplified = false }: SharedTopNavProps) {
  if (simplified) {
    // Simplified nav for checkout/payment pages
    return (
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              {/* Hamburger Menu - Always Visible */}
              {onMenuClick && (
                <button
                  onClick={onMenuClick}
                  className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Open menu"
                  title="Menu"
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
              )}
              
              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img src="/logo.png" alt="Bridge55" className="h-8" />
              </Link>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <span className="hidden sm:inline">Secure Connection</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            {/* Hamburger Menu - Always Visible on All Screen Sizes */}
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open menu"
                title="Menu"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            )}
            
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="Bridge55" className="h-8" />
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            <Link 
              to="/" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              🔍 Discover Africa
            </Link>
            <Link 
              to="/deals" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              💰 Deals
            </Link>
            <Link 
              to="/bridgeai" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              ✨ BridgeAI
            </Link>
            <Link 
              to="/support" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Support
            </Link>
          </div>

          {/* Right: Language, Currency, Notifications, Sign In */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <button className="hidden md:flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">EN</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Currency */}
            <button className="hidden md:flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">USD</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Sign In */}
            <Link
              to="/signin"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

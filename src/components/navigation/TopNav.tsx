import React, { useState, useEffect } from 'react';
import { Menu, Search, Sparkles, Bell, User, Globe, ChevronDown } from 'lucide-react';

interface TopNavProps {
  onMenuClick: () => void;
  platformMode?: 'pan-african' | 'country-specific';
  countryName?: string;
}

export const TopNav: React.FC<TopNavProps> = ({ 
  onMenuClick, 
  platformMode = 'pan-african',
  countryName 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [currentCurrency, setCurrentCurrency] = useState('USD');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-nav h-nav-height
        bg-white border-b border-gray-200 transition-shadow duration-300
        ${isScrolled ? 'shadow-md' : 'shadow-sm'}
      `}
    >
      <div className="max-w-[1400px] mx-auto px-4 h-full flex items-center justify-between gap-6">
        
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Menu Button - Always Visible on All Screen Sizes */}
          <button
            onClick={onMenuClick}
            className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
            title="Menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Bridge55" className="h-8" />
            {platformMode === 'country-specific' && countryName && (
              <span className="text-sm font-medium text-gray-600 ml-1">
                {countryName}
              </span>
            )}
          </a>
        </div>

        {/* Center Section - Desktop Navigation */}
        <div className="hidden lg:flex items-center flex-1 justify-center gap-6">
          <NavLink href="#discover" icon={Search}>
            Discover {platformMode === 'country-specific' && countryName ? countryName : 'Africa'}
          </NavLink>
          <NavLink href="#deals">
            Deals
          </NavLink>
          <NavLink href="#bridgeai" className="text-primary font-semibold" icon={Sparkles}>
            BridgeAI
          </NavLink>
          <NavLink href="#support">
            Support
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <button 
            className="hidden md:flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Select language"
          >
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">{currentLanguage}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* Currency Selector */}
          <button 
            className="hidden md:flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Select currency"
          >
            <span className="text-sm font-semibold text-gray-700">{currentCurrency}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* Notifications */}
          <button 
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-red-600 text-white text-[11px] font-bold rounded-full border-2 border-white">
              3
            </span>
          </button>

          {/* User / Sign In */}
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all hover:-translate-y-0.5 shadow-md">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Sign In</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// NavLink Component
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon: Icon, className = '' }) => {
  return (
    <a
      href={href}
      className={`
        flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg
        transition-all hover:bg-gray-100
        ${className || 'text-gray-700 hover:text-gray-900'}
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </a>
  );
};

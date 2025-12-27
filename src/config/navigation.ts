// Menu Configuration

import { MenuSection, UserRole } from '../types/navigation';
import { PlatformMode } from '../types/country';

export const getMenuConfig = (
  mode: PlatformMode,
  countryCode?: string,
  userRole: UserRole = 'traveler'
): MenuSection[] => {
  
  const discoveryTitle = mode === 'country-specific' 
    ? `DISCOVER ${getCountryName(countryCode)}`
    : 'DISCOVER AFRICA';

  const sections: MenuSection[] = [
    // Book Your Experience
    {
      id: 'book',
      title: 'BOOK YOUR EXPERIENCE',
      items: [
        { 
          id: 'flights', 
          label: 'Flights', 
          icon: 'plane', 
          href: '/flights',
          children: [
            { id: 'flights-roundtrip', label: 'Roundtrip Flights', href: '/flights/roundtrip' },
            { id: 'flights-oneway', label: 'One-Way Flights', href: '/flights/one-way' },
            { id: 'flights-multi', label: 'Multi-City Flights', href: '/flights/multi-city' },
          ]
        },
        { 
          id: 'stays', 
          label: 'Stays', 
          icon: 'home', 
          href: '/stays',
          children: [
            { id: 'stays-hotels', label: 'Hotels', href: '/stays/hotels' },
            { id: 'stays-lodges', label: 'Safari Lodges', href: '/stays/lodges' },
            { id: 'stays-homes', label: 'Vacation Homes', href: '/stays/homes' },
            { id: 'stays-hostels', label: 'Hostels', href: '/stays/hostels' },
          ]
        },
        { 
          id: 'cars', 
          label: 'Cars & Transport', 
          icon: 'car', 
          href: '/cars',
          children: [
            { id: 'cars-rental', label: 'Rental Cars', href: '/cars/rental' },
            { id: 'cars-taxi', label: 'Taxi Services', href: '/cars/taxi' },
            { id: 'cars-rideshare', label: 'Ride Share', href: '/cars/rideshare' },
            { id: 'cars-airport', label: 'Airport Transfers', href: '/cars/airport' },
          ]
        },
        { 
          id: 'tours', 
          label: 'Tours & Safaris', 
          icon: 'map', 
          href: '/tours',
          children: [
            { id: 'tours-safari', label: 'Safari Tours', href: '/tours/safari' },
            { id: 'tours-city', label: 'City Tours', href: '/tours/city' },
            { id: 'tours-day', label: 'Day Trips', href: '/tours/day-trips' },
            { id: 'tours-multi', label: 'Multi-Day Tours', href: '/tours/multi-day' },
          ]
        },
        { 
          id: 'things', 
          label: 'Things to Do', 
          icon: 'compass', 
          href: '/things-to-do',
          children: [
            { id: 'things-wildlife', label: 'Safari & Wildlife', href: '/things-to-do/wildlife' },
            { id: 'things-water', label: 'Water Sports', href: '/things-to-do/water-sports' },
            { id: 'things-adventure', label: 'Adventure & Hiking', href: '/things-to-do/adventure' },
            { id: 'things-culture', label: 'Museums & Culture', href: '/things-to-do/culture' },
            { id: 'things-food', label: 'Food & Dining', href: '/things-to-do/food' },
            { id: 'things-nightlife', label: 'Nightlife', href: '/things-to-do/nightlife' },
          ]
        },
        { 
          id: 'events', 
          label: 'Events & Festivals', 
          icon: 'calendar', 
          href: '/events',
          children: [
            { id: 'events-music', label: 'Music Festivals', href: '/events/music' },
            { id: 'events-cultural', label: 'Cultural Celebrations', href: '/events/cultural' },
            { id: 'events-sports', label: 'Sports Events', href: '/events/sports' },
            { id: 'events-art', label: 'Art & Film Festivals', href: '/events/art' },
            { id: 'events-food', label: 'Food & Wine Events', href: '/events/food' },
          ]
        },
        { 
          id: 'visa', 
          label: 'Visa & Travel Docs', 
          icon: 'file-check', 
          href: '/visa',
          children: [
            { id: 'visa-evisa', label: 'eVisa Applications', href: '/visa/evisa' },
            { id: 'visa-check', label: 'Visa Requirements', href: '/visa/requirements' },
            { id: 'visa-track', label: 'Track Application', href: '/visa/track' },
          ]
        },
        { 
          id: 'packages', 
          label: 'Vacation Packages', 
          icon: 'package', 
          href: '/packages',
          children: [
            { id: 'packages-safari', label: 'Safari Packages', href: '/packages/safari' },
            { id: 'packages-beach', label: 'Beach Holidays', href: '/packages/beach' },
            { id: 'packages-culture', label: 'Cultural Tours', href: '/packages/culture' },
            { id: 'packages-luxury', label: 'Luxury Escapes', href: '/packages/luxury' },
          ]
        },
      ]
    },

    // BridgeAI
    {
      id: 'bridgeai',
      title: 'BRIDGEAI - YOUR TRAVEL ASSISTANT',
      items: [
        { id: 'ai-plan', label: 'Plan My Trip', icon: 'sparkles', href: '/ai/plan' },
        { id: 'ai-ideas', label: 'Destination Ideas', icon: 'lightbulb', href: '/ai/inspiration' },
        { id: 'ai-prices', label: 'Price Intelligence', icon: 'trending-down', href: '/ai/prices' },
        { id: 'ai-itinerary', label: 'Smart Itineraries', icon: 'route', href: '/ai/itineraries' },
      ]
    },

    // Discovery Section (Adaptive)
    {
      id: 'discover',
      title: discoveryTitle,
      items: mode === 'country-specific' 
        ? getCountrySpecificDiscovery(countryCode)
        : getPanAfricanDiscovery()
    },
  ];

  // Add secondary discovery for country-specific mode
  if (mode === 'country-specific') {
    sections.push({
      id: 'explore-africa',
      title: 'EXPLORE AFRICA',
      items: [
        { id: 'regions', label: 'By Region', icon: 'map', href: '/africa/regions' },
        { id: 'safari', label: 'Safari Adventures', icon: 'mountain', href: '/africa/safari' },
        { id: 'heritage', label: 'Heritage Sites', icon: 'landmark', href: '/africa/heritage' },
        { id: 'islands', label: 'Beach & Islands', icon: 'sun', href: '/africa/islands' },
      ]
    });
  }

  // Operator section (only for operators/admins)
  if (userRole === 'operator' || userRole === 'admin') {
    sections.push({
      id: 'operator',
      title: 'FOR TRAVEL OPERATORS',
      items: [
        { id: 'dashboard', label: 'Operator Dashboard', icon: 'layout-dashboard', href: '/operator/dashboard' },
        { id: 'list', label: 'List Your Business', icon: 'plus-circle', href: '/operator/list' },
        { id: 'analytics', label: 'Analytics & Insights', icon: 'bar-chart', href: '/operator/analytics' },
        { id: 'earnings', label: 'Earnings & Payouts', icon: 'dollar-sign', href: '/operator/earnings' },
        { id: 'manage', label: 'Manage Listings', icon: 'settings', href: '/operator/manage' },
      ],
      visibleFor: ['operator', 'admin']
    });
  }

  // Tools & Resources
  sections.push({
    id: 'tools',
    title: 'TOOLS & RESOURCES',
    items: [
      { id: 'currency', label: 'Currency Converter', icon: 'coins', href: '/tools/currency' },
      { id: 'calendar', label: 'Travel Calendar', icon: 'calendar', href: '/tools/calendar' },
      { id: 'apps', label: 'Mobile Apps', icon: 'smartphone', href: '/apps' },
      { id: 'planner', label: 'Trip Planner', icon: 'map-pin', href: '/tools/planner' },
      { id: 'guides', label: 'Travel Guides', icon: 'book-open', href: '/guides' },
      { id: 'weather', label: 'Weather & Climate', icon: 'cloud', href: '/tools/weather' },
    ]
  });

  // My Account
  sections.push({
    id: 'account',
    title: 'MY ACCOUNT',
    items: [
      { id: 'bookings', label: 'My Bookings', icon: 'calendar', href: '/account/bookings' },
      { id: 'saved', label: 'Saved & Favorites', icon: 'heart', href: '/account/saved' },
      { id: 'reviews', label: 'My Reviews', icon: 'star', href: '/account/reviews' },
      { id: 'notifications', label: 'Notifications', icon: 'bell', href: '/account/notifications', badge: 3 },
      { id: 'payments', label: 'Payment Methods', icon: 'credit-card', href: '/account/payments' },
      { id: 'profile', label: 'Profile Settings', icon: 'user', href: '/account/profile' },
      { id: 'privacy', label: 'Privacy & Security', icon: 'shield', href: '/account/privacy' },
    ]
  });

  // Help & Support
  sections.push({
    id: 'support',
    title: 'HELP & SUPPORT',
    items: [
      { id: 'support-24', label: '24/7 Support', icon: 'phone', href: '/support' },
      { id: 'whatsapp', label: 'WhatsApp Help', icon: 'message-circle', href: '/support/whatsapp' },
      { id: 'email', label: 'Email Support', icon: 'mail', href: '/support/email' },
      { id: 'help', label: 'Help Center', icon: 'help-circle', href: '/help' },
      { id: 'chat', label: 'Live Chat', icon: 'message-square', href: '/support/chat' },
      { id: 'insurance', label: 'Travel Insurance', icon: 'shield', href: '/insurance' },
      { id: 'faq', label: 'FAQs', icon: 'info', href: '/faq' },
    ]
  });

  // About Bridge55
  sections.push({
    id: 'about',
    title: 'ABOUT BRIDGE55',
    items: [
      { id: 'about-us', label: 'About Us', icon: 'building', href: '/about' },
      { id: 'mission', label: 'Our Mission', icon: 'target', href: '/mission' },
      { id: 'partner', label: 'Partner With Us', icon: 'handshake', href: '/partners' },
      { id: 'careers', label: 'Careers', icon: 'briefcase', href: '/careers' },
      { id: 'press', label: 'Press & Media', icon: 'newspaper', href: '/press' },
      { id: 'blog', label: 'Travel Blog', icon: 'book-open', href: '/blog' },
      { id: 'terms', label: 'Terms of Service', icon: 'file-text', href: '/terms' },
      { id: 'privacy', label: 'Privacy Policy', icon: 'lock', href: '/privacy' },
    ]
  });

  return sections;
};

// Helper: Get country name
function getCountryName(countryCode?: string): string {
  const countryNames: Record<string, string> = {
    CI: "CÔTE D'IVOIRE",
    KE: "KENYA",
    ZA: "SOUTH AFRICA",
    // Add more as needed
  };
  return countryNames[countryCode || ''] || 'THIS COUNTRY';
}

// Helper: Pan-African Discovery Items
function getPanAfricanDiscovery() {
  return [
    {
      id: 'safari',
      label: 'Safari Adventures',
      icon: 'mountain',
      href: '/discover/safari',
      children: [
        { id: 'east-safari', label: 'East Africa Safaris', href: '/discover/safari/east' },
        { id: 'south-safari', label: 'Southern Africa Wildlife', href: '/discover/safari/southern' },
        { id: 'west-safari', label: 'West Africa Parks', href: '/discover/safari/west' },
      ]
    },
    {
      id: 'beaches',
      label: 'Beach & Islands',
      icon: 'sun',
      href: '/discover/beaches',
      children: [
        { id: 'zanzibar', label: 'Zanzibar & East Coast', href: '/discover/beaches/zanzibar' },
        { id: 'seychelles', label: 'Seychelles & Mauritius', href: '/discover/beaches/islands' },
        { id: 'cape-verde', label: 'Cape Verde Islands', href: '/discover/beaches/cape-verde' },
      ]
    },
    {
      id: 'mountains',
      label: 'Adventure & Nature',
      icon: 'mountain',
      href: '/discover/adventure'
    },
    {
      id: 'culture',
      label: 'Culture & Heritage',
      icon: 'landmark',
      href: '/discover/culture'
    },
    {
      id: 'food',
      label: 'Food & Culinary',
      icon: 'utensils',
      href: '/discover/food'
    },
    {
      id: 'festivals',
      label: 'Festivals & Events',
      icon: 'calendar',
      href: '/discover/festivals'
    },
    {
      id: 'cities',
      label: 'Top Cities',
      icon: 'building',
      href: '/discover/cities'
    },
    {
      id: 'regions',
      label: 'Travel by Region',
      icon: 'map',
      href: '/discover/regions',
      children: [
        { id: 'east', label: '🌍 East Africa', href: '/regions/east' },
        { id: 'west', label: '🌍 West Africa', href: '/regions/west' },
        { id: 'southern', label: '🌍 Southern Africa', href: '/regions/southern' },
        { id: 'north', label: '🌍 North Africa', href: '/regions/north' },
        { id: 'central', label: '🌍 Central Africa', href: '/regions/central' },
        { id: 'islands', label: '🌍 Island Nations', href: '/regions/islands' },
      ]
    },
  ];
}

// Helper: Country-Specific Discovery Items
function getCountrySpecificDiscovery(countryCode?: string) {
  // This would be dynamically generated based on country config
  // For now, return generic items
  return [
    { id: 'dest-1', label: 'Featured Destination 1', icon: 'map-pin', href: '/discover/1' },
    { id: 'dest-2', label: 'Featured Destination 2', icon: 'map-pin', href: '/discover/2' },
    { id: 'dest-3', label: 'Featured Destination 3', icon: 'map-pin', href: '/discover/3' },
    { id: 'culture-local', label: 'Local Culture', icon: 'users', href: '/discover/culture' },
    { id: 'food-local', label: 'Local Cuisine', icon: 'utensils', href: '/discover/food' },
    { id: 'events-local', label: 'Local Events', icon: 'calendar', href: '/discover/events' },
  ];
}

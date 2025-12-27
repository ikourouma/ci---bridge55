import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Send, Sparkles, MapPin, Star, Users, Calendar, DollarSign, Menu, X, ChevronDown, ChevronUp, Loader2, SlidersHorizontal } from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  searchResults?: SearchResult[];
  destinations?: Destination[];
  showMap?: boolean;
}

interface SearchResult {
  id: string;
  type: 'flight' | 'hotel' | 'experience' | 'package';
  title: string;
  subtitle: string;
  price: number;
  priceType?: 'per person' | 'per night' | 'total';
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  details: string[];
  link: string;
}

interface Destination {
  name: string;
  emoji: string;
  description: string;
}

export function AiTripPlanner() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Initialize
  useEffect(() => {
    const context = searchParams.get('context');
    const booking = searchParams.get('booking');

    let initialMsg: Message;
    if (context && booking) {
      initialMsg = {
        role: 'assistant',
        content: `I see you just booked ${context}! How can I help complete your trip?`,
      };
    } else {
      initialMsg = {
        role: 'assistant',
        content: "Hi! I'm Dia, your AI travel assistant. Try asking: 'Find affordable hotels in Kenya' or 'Plan a safari trip'",
      };
    }

    setMessages([initialMsg]);
  }, [searchParams]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate AI response with Kayak-style results
  const generateResponse = async (query: string): Promise<Message> => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTyping(false);

    const lq = query.toLowerCase();

    // Hotel search
    if (lq.includes('hotel') || lq.includes('stay') || lq.includes('accommodation') || lq.includes('affordable')) {
      return {
        role: 'assistant',
        content: "I found 5,017 hotels in Kenya. Here are the top recommendations:",
        showMap: true,
        destinations: [
          { name: 'Watamu', emoji: '🏖️', description: 'Beach paradise' },
          { name: 'Nakuru', emoji: '🦩', description: 'Flamingo lake' },
          { name: 'Kisumu', emoji: '🌊', description: 'Lake Victoria' },
        ],
        searchResults: [
          {
            id: '1',
            type: 'hotel',
            title: 'Flat in Lavington',
            subtitle: 'Downtown, Nairobi',
            price: 42,
            priceType: 'per night',
            rating: 8.8,
            reviews: 11,
            image: '🏢',
            badge: 'Very good',
            location: 'Nairobi, Kenya',
            coordinates: { lat: -1.2741, lng: 36.7697 },
            details: [
              'Sleeps 2 • 1 bedroom, 1 bath',
              'Free cancellation',
              'Rental'
            ],
            link: '/stays/results'
          },
          {
            id: '2',
            type: 'hotel',
            title: 'Luced Homes',
            subtitle: 'Nairobi',
            price: 30,
            priceType: 'per night',
            rating: 9.2,
            reviews: 5,
            image: '🏘️',
            badge: 'Wonderful',
            location: 'Nairobi, Kenya',
            coordinates: { lat: -1.2921, lng: 36.8219 },
            details: [
              'Sleeps 4 • 1 bedroom, 1 bath',
              'Free cancellation',
              'Rental'
            ],
            link: '/stays/results'
          },
          {
            id: '3',
            type: 'hotel',
            title: 'Giraffe Manor',
            subtitle: 'Luxury boutique hotel',
            price: 890,
            priceType: 'per night',
            rating: 9.8,
            reviews: 342,
            image: '🦒',
            badge: 'Exceptional',
            location: 'Nairobi, Kenya',
            coordinates: { lat: -1.2921, lng: 36.7470 },
            details: [
              'Breakfast included',
              'Unique giraffe experience',
              'Luxury amenities'
            ],
            link: '/stays/results'
          },
        ]
      };
    }

    // Safari/Experience search
    if (lq.includes('safari') || lq.includes('experience') || lq.includes('tour')) {
      return {
        role: 'assistant',
        content: "Found amazing safari experiences! Here are the best options:",
        showMap: true,
        destinations: [
          { name: 'Masai Mara', emoji: '🦁', description: 'Big Five safari' },
          { name: 'Serengeti', emoji: '🐘', description: 'Migration route' },
          { name: 'Amboseli', emoji: '🗻', description: 'Kilimanjaro views' },
        ],
        searchResults: [
          {
            id: '1',
            type: 'experience',
            title: '3-Day Masai Mara Safari',
            subtitle: 'All-inclusive game drives',
            price: 450,
            priceType: 'per person',
            rating: 4.9,
            reviews: 342,
            image: '🦁',
            badge: 'Bestseller',
            location: 'Masai Mara, Kenya',
            details: [
              'Includes: Accommodation, meals, park fees',
              'Game drives: Morning & evening',
              'Group size: 2-12 people',
              'Guide: Expert naturalist'
            ],
            link: '/experiences/results'
          },
          {
            id: '2',
            type: 'experience',
            title: 'Serengeti Migration Tour',
            subtitle: '7-day luxury tented camp',
            price: 2890,
            priceType: 'per person',
            rating: 5.0,
            reviews: 128,
            image: '🐘',
            badge: 'Once in a lifetime',
            location: 'Serengeti, Tanzania',
            details: [
              'Includes: Luxury tents, all meals, flights',
              'Witness the great migration',
              'Private guide available',
              'Photography workshop included'
            ],
            link: '/experiences/results'
          },
          {
            id: '3',
            type: 'package',
            title: 'Complete Kenya Safari Package',
            subtitle: '10 days: Nairobi + Mara + Beach',
            price: 3200,
            priceType: 'per person',
            rating: 4.8,
            reviews: 256,
            image: '🌍',
            badge: 'Package Deal',
            location: 'Kenya',
            details: [
              'Day 1-2: Nairobi city tour',
              'Day 3-6: Masai Mara safari',
              'Day 7-10: Diani Beach relaxation',
              'Includes: Hotels, transport, meals, activities'
            ],
            link: '/experiences/results'
          },
        ]
      };
    }

    // Flight search
    if (lq.includes('flight') || lq.includes('fly')) {
      return {
        role: 'assistant',
        content: "Found great flight deals! Prices are below average.",
        searchResults: [
          {
            id: '1',
            type: 'flight',
            title: 'Nairobi (NBO) → Mombasa (MBA)',
            subtitle: 'Kenya Airways • Direct',
            price: 89,
            priceType: 'per person',
            rating: 4.7,
            reviews: 1250,
            image: '✈️',
            badge: 'Best Price',
            location: 'Kenya',
            details: [
              'Duration: 1h 10m',
              'Direct flight',
              'Departure: 8:30 AM',
              'Includes: 23kg baggage'
            ],
            link: '/flights/results'
          },
        ]
      };
    }

    // Package deal
    if (lq.includes('package') || lq.includes('complete trip') || lq.includes('plan')) {
      return {
        role: 'assistant',
        content: "I can help plan your complete trip! Here are some package deals:",
        showMap: true,
        searchResults: [
          {
            id: '1',
            type: 'package',
            title: 'East Africa Explorer',
            subtitle: '14 days across Kenya & Tanzania',
            price: 4500,
            priceType: 'per person',
            rating: 4.9,
            reviews: 189,
            image: '🗺️',
            badge: 'Complete Package',
            location: 'Kenya & Tanzania',
            details: [
              'Includes: Flights, hotels, safaris, meals',
              'Day 1-3: Nairobi exploration',
              'Day 4-8: Masai Mara & Serengeti safari',
              'Day 9-12: Zanzibar beach resort',
              'Day 13-14: Stone Town & departure'
            ],
            link: '/experiences/results'
          },
        ]
      };
    }

    // Default
    return {
      role: 'assistant',
      content: "I can help you with flights, hotels, safaris, or complete trip packages! What are you interested in?",
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const query = input;
    setInput('');

    // Navigate to search results page with query
    navigate(`/dia-search?query=${encodeURIComponent(query)}`);
  };

  const lastMessage = messages[messages.length - 1];
  const hasResults = lastMessage?.role === 'assistant' && lastMessage.searchResults && lastMessage.searchResults.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedTopNav />
      
      {!hasResults ? (
        // Initial chat view
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-full mb-4 shadow-xl">
              <Sparkles className="w-7 h-7 text-white animate-pulse" />
              <h1 className="text-3xl font-bold text-white">Ask Dia</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Get instant answers about your booking, destinations, and travel tips
            </p>
            
            {/* Suggestion Chips */}
            <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
              <button
                onClick={() => setInput('Find affordable hotels in Kenya')}
                className="px-4 py-2 bg-white border-2 border-purple-200 rounded-full text-sm font-semibold text-purple-700 hover:border-purple-400 hover:bg-purple-50 transition-all shadow-sm"
              >
                🏨 Affordable hotels in Kenya
              </button>
              <button
                onClick={() => setInput('Best time for safari')}
                className="px-4 py-2 bg-white border-2 border-purple-200 rounded-full text-sm font-semibold text-purple-700 hover:border-purple-400 hover:bg-purple-50 transition-all shadow-sm"
              >
                🦁 Best time for safari
              </button>
              <button
                onClick={() => setInput('Beach destinations in Tanzania')}
                className="px-4 py-2 bg-white border-2 border-purple-200 rounded-full text-sm font-semibold text-purple-700 hover:border-purple-400 hover:bg-purple-50 transition-all shadow-sm"
              >
                🏖️ Beach destinations
              </button>
              <button
                onClick={() => setInput('Plan a complete trip to Ghana')}
                className="px-4 py-2 bg-white border-2 border-purple-200 rounded-full text-sm font-semibold text-purple-700 hover:border-purple-400 hover:bg-purple-50 transition-all shadow-sm"
              >
                ✈️ Plan complete trip
              </button>
              <button
                onClick={() => setInput('Safari packages under $1000')}
                className="px-4 py-2 bg-white border-2 border-purple-200 rounded-full text-sm font-semibold text-purple-700 hover:border-purple-400 hover:bg-purple-50 transition-all shadow-sm"
              >
                💰 Budget safari packages
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-6 mb-32">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-6 py-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-900 shadow-xl border-2 border-purple-100'
                }`}>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white shadow-xl border-2 border-purple-100 px-6 py-4 rounded-2xl flex items-center gap-2">
                  <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                  <span className="text-gray-600">Searching...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Fixed Input */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-4 z-40">
            <div className="max-w-5xl mx-auto flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Try: 'Find affordable hotels in Kenya' or 'Plan a safari trip'"
                className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isTyping ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        // KAYAK-style results view with map
        <div className="flex h-screen pt-16">
          {/* Left Sidebar - Results */}
          <div className={`${showSidebar ? 'w-full md:w-[45%] lg:w-[40%]' : 'w-0'} transition-all duration-300 overflow-hidden bg-white border-r flex flex-col`}>
            {/* Sidebar Header */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {lastMessage.searchResults?.length} results
                  </h2>
                  <p className="text-sm text-gray-600">{lastMessage.content}</p>
                </div>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="md:hidden p-2 hover:bg-gray-200 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Destinations */}
              {lastMessage.destinations && lastMessage.destinations.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {lastMessage.destinations.map((dest, idx) => (
                    <button
                      key={idx}
                      className="flex-shrink-0 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-all"
                    >
                      <div className="text-2xl mb-1">{dest.emoji}</div>
                      <div className="font-semibold text-sm">{dest.name}</div>
                      <div className="text-xs text-gray-500">{dest.description}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Filters */}
              <button className="mt-3 flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-all">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-semibold text-sm">All filters</span>
                <span className="ml-auto px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">1</span>
              </button>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto">
              {lastMessage.searchResults?.map((result) => (
                <div
                  key={result.id}
                  onClick={() => setSelectedResult(result)}
                  className="p-4 border-b hover:bg-purple-50 cursor-pointer transition-colors"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-32 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                      {result.image}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      {/* Badge & Rating */}
                      <div className="flex items-center gap-2 mb-1">
                        {result.badge && (
                          <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded">
                            {result.badge}
                          </span>
                        )}
                        <div className="flex items-center gap-1">
                          <div className="px-2 py-0.5 bg-green-700 text-white text-xs font-bold rounded">
                            {result.rating}
                          </div>
                          <span className="text-xs text-gray-600">({result.reviews})</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-gray-900 mb-1">{result.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{result.subtitle}</p>

                      {/* Key details */}
                      <div className="space-y-1">
                        {result.details.slice(0, 2).map((detail, idx) => (
                          <p key={idx} className="text-xs text-gray-600">{detail}</p>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="mt-3 flex items-end justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">${result.price}</div>
                          {result.priceType && (
                            <div className="text-xs text-gray-500">{result.priceType}</div>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(result.link);
                          }}
                          className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          View Deal
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable details */}
                  {selectedResult?.id === result.id && (
                    <div className="mt-4 pt-4 border-t space-y-2">
                      <h4 className="font-bold text-sm">Details:</h4>
                      {result.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{detail}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="flex-1 relative">
            {!showSidebar && (
              <button
                onClick={() => setShowSidebar(true)}
                className="absolute top-4 left-4 z-10 p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            
            {/* Map Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Map View</h3>
                <p className="text-gray-600 max-w-md">
                  Interactive map showing all {lastMessage.searchResults?.length} locations
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  Google Maps integration coming soon
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MapPin, Calendar, DollarSign, Info, Mic, Image as ImageIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  type: 'user' | 'dia';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  results?: SearchResult[];
  insights?: Insight[];
}

interface SearchResult {
  type: 'stay' | 'flight' | 'experience' | 'car';
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  location?: string;
  duration?: string;
  description?: string;
  goodDeal?: boolean;
  link: string;
}

interface Insight {
  type: 'price' | 'season' | 'visa' | 'weather' | 'cultural';
  title: string;
  description: string;
  icon: string;
}

export function DiaChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'dia',
      content: "Hi! I'm Dia, your AI travel assistant for Africa. I can help you find flights, hotels, experiences, and plan your entire trip. What are you looking for?",
      timestamp: new Date(),
      suggestions: [
        "Plan a 5-day safari in Kenya",
        "Find cheap flights to Lagos",
        "Best hotels in Zanzibar",
        "I need a visa for Tanzania"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate Dia response
    setTimeout(() => {
      const diaResponse = generateDiaResponse(input);
      setMessages(prev => [...prev, diaResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateDiaResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase();

    // Safari query
    if (lowerQuery.includes('safari') || lowerQuery.includes('masai mara') || lowerQuery.includes('serengeti')) {
      return {
        id: Date.now().toString(),
        type: 'dia',
        content: "Great choice! I found some amazing safari experiences for you. The best time to visit is July-October for the Great Migration. Here are my top recommendations:",
        timestamp: new Date(),
        results: [
          {
            type: 'experience',
            id: '1',
            name: '5-Day Masai Mara Safari',
            price: 1250,
            originalPrice: 1500,
            image: '🦁',
            rating: 4.9,
            location: 'Masai Mara, Kenya',
            duration: '5 days',
            description: 'Witness the Great Migration, Big Five sightings, luxury tented camps',
            goodDeal: true,
            link: '/experiences/1'
          },
          {
            type: 'experience',
            id: '2',
            name: '7-Day Serengeti & Ngorongoro',
            price: 1800,
            image: '🐘',
            rating: 4.8,
            location: 'Tanzania',
            duration: '7 days',
            description: 'UNESCO World Heritage Sites, crater exploration, cultural visits',
            link: '/experiences/2'
          },
          {
            type: 'stay',
            id: '3',
            name: 'Luxury Safari Lodge',
            price: 450,
            image: '🏕️',
            rating: 4.9,
            location: 'Near Masai Mara',
            description: 'All-inclusive, game drives, infinity pool overlooking savanna',
            link: '/stays/1'
          }
        ],
        insights: [
          {
            type: 'season',
            title: 'Best Time to Visit',
            description: 'July-October for Great Migration. June-September for dry season (best wildlife viewing)',
            icon: '📅'
          },
          {
            type: 'price',
            title: 'Price Insight',
            description: 'Prices 30% lower in April-May (green season). Still excellent wildlife viewing!',
            icon: '💰'
          },
          {
            type: 'visa',
            title: 'Visa Required',
            description: 'Kenya eVisa ($51) - Get it in 3-5 days. Tanzania available on arrival ($50)',
            icon: '📋'
          }
        ],
        suggestions: [
          "Show me flights to Nairobi",
          "What should I pack for a safari?",
          "Add cultural experiences",
          "Find lodges under $300/night"
        ]
      };
    }

    // Flight query
    if (lowerQuery.includes('flight') || lowerQuery.includes('fly') || lowerQuery.includes('ticket')) {
      return {
        id: Date.now().toString(),
        type: 'dia',
        content: "I'll help you find the best flights! Here are some great options:",
        timestamp: new Date(),
        results: [
          {
            type: 'flight',
            id: '1',
            name: 'New York (JFK) → Nairobi (NBO)',
            price: 850,
            originalPrice: 1200,
            image: '✈️',
            location: 'Kenya Airways',
            duration: '14h 30m',
            description: 'Direct flight, 1 stop in Amsterdam',
            goodDeal: true,
            link: '/flights/1'
          }
        ],
        insights: [
          {
            type: 'price',
            title: 'Excellent Deal!',
            description: '42% cheaper than average. Book within 24 hours to lock this price.',
            icon: '🎯'
          }
        ],
        suggestions: [
          "Find hotels near the airport",
          "Show me return flights",
          "Add baggage options",
          "Check visa requirements"
        ]
      };
    }

    // Hotel/Stay query
    if (lowerQuery.includes('hotel') || lowerQuery.includes('stay') || lowerQuery.includes('accommodation')) {
      const location = lowerQuery.includes('zanzibar') ? 'Zanzibar' :
                      lowerQuery.includes('cape town') ? 'Cape Town' :
                      lowerQuery.includes('lagos') ? 'Lagos' : 'Nairobi';

      return {
        id: Date.now().toString(),
        type: 'dia',
        content: `Found amazing stays in ${location}! Here are my top picks:`,
        timestamp: new Date(),
        results: [
          {
            type: 'stay',
            id: '1',
            name: `${location} Beach Resort`,
            price: 180,
            image: '🏖️',
            rating: 4.7,
            location: location,
            description: 'Beachfront, infinity pool, spa, free breakfast',
            link: '/stays/1'
          },
          {
            type: 'stay',
            id: '2',
            name: `${location} City Hotel`,
            price: 95,
            image: '🏨',
            rating: 4.5,
            location: `${location} City Center`,
            description: 'Modern rooms, rooftop bar, walking distance to attractions',
            goodDeal: true,
            link: '/stays/2'
          }
        ],
        insights: [
          {
            type: 'weather',
            title: 'Perfect Weather',
            description: 'Sunny and warm (28°C/82°F). Best time for beach activities!',
            icon: '☀️'
          }
        ],
        suggestions: [
          `Find experiences in ${location}`,
          "Show hotels with free cancellation",
          "I need airport transfer",
          "What's nearby?"
        ]
      };
    }

    // Visa query
    if (lowerQuery.includes('visa') || lowerQuery.includes('evisa')) {
      return {
        id: Date.now().toString(),
        type: 'dia',
        content: "I can help you get your visa! Here's what you need to know:",
        timestamp: new Date(),
        insights: [
          {
            type: 'visa',
            title: 'Kenya eVisa',
            description: 'Processing: 3-5 business days. Cost: $51. Valid: 90 days. Apply now through Bridge55!',
            icon: '🇰🇪'
          },
          {
            type: 'visa',
            title: 'Tanzania Visa',
            description: 'eVisa ($50) or on-arrival ($50). eVisa recommended to avoid airport queues.',
            icon: '🇹🇿'
          },
          {
            type: 'visa',
            title: 'South Africa Visa',
            description: 'Many countries visa-free for up to 90 days. Check requirements based on nationality.',
            icon: '🇿🇦'
          }
        ],
        suggestions: [
          "Apply for Kenya eVisa now",
          "Check if I need a visa",
          "What documents do I need?",
          "Show me visa-free countries"
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'dia',
      content: "I can help you with flights, hotels, safaris, experiences, car rentals, and visa applications across all 54 African countries. What would you like to explore?",
      timestamp: new Date(),
      suggestions: [
        "Plan a trip to Kenya",
        "Find beach resorts in Zanzibar",
        "Book a desert tour in Morocco",
        "Get a visa for Nigeria"
      ]
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className={`flex flex-col bg-white rounded-2xl shadow-2xl border-2 border-purple-200 transition-all ${isExpanded ? 'fixed inset-4 z-50' : 'h-[600px]'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Dia AI Assistant</h2>
            <p className="text-white/80 text-xs">Powered by Bridge55 Intelligence</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isExpanded ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-50/30 to-white">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border-2 border-purple-100'} rounded-2xl p-4 shadow-lg`}>
              {/* Message content */}
              <p className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                {message.content}
              </p>

              {/* Search Results */}
              {message.results && (
                <div className="mt-4 space-y-3">
                  {message.results.map((result) => (
                    <Link
                      key={result.id}
                      to={result.link}
                      className="block bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-4xl flex-shrink-0">{result.image}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {result.name}
                            </h4>
                            {result.goodDeal && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full whitespace-nowrap">
                                Great Deal!
                              </span>
                            )}
                          </div>
                          {result.location && (
                            <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {result.location}
                            </p>
                          )}
                          {result.duration && (
                            <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {result.duration}
                            </p>
                          )}
                          {result.description && (
                            <p className="text-xs text-gray-600 mb-2">{result.description}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold text-purple-600">${result.price}</span>
                              {result.originalPrice && (
                                <span className="text-sm text-gray-400 line-through ml-2">${result.originalPrice}</span>
                              )}
                            </div>
                            {result.rating && (
                              <div className="flex items-center gap-1 text-yellow-500">
                                <span className="text-sm font-bold">{result.rating}</span>
                                <span className="text-xs">★</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Insights */}
              {message.insights && (
                <div className="mt-4 space-y-2">
                  {message.insights.map((insight, idx) => (
                    <div key={idx} className="bg-blue-50 border-l-4 border-blue-500 rounded p-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xl">{insight.icon}</span>
                        <div className="flex-1">
                          <h5 className="font-bold text-sm text-blue-900 mb-1">{insight.title}</h5>
                          <p className="text-xs text-blue-700">{insight.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {message.suggestions && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full text-xs font-semibold transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <p className="text-xs opacity-50 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-purple-100 rounded-2xl p-4 shadow-lg">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t-2 border-purple-100 p-4 bg-white rounded-b-2xl">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Dia anything about travel in Africa..."
            className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Dia can search flights, hotels, experiences, and help with visa applications
        </p>
      </div>
    </div>
  );
}

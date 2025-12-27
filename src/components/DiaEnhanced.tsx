import { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, MapPin, Calendar, DollarSign, Users, TrendingDown, Star, Clock } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  priceInsight?: PriceInsight;
  recommendations?: Recommendation[];
  quickActions?: QuickAction[];
}

interface PriceInsight {
  current: number;
  average: number;
  trend: 'up' | 'down' | 'stable';
  bestTime: string;
  savings: number;
}

interface Recommendation {
  title: string;
  subtitle: string;
  price: number;
  rating: number;
  image: string;
  badge?: string;
  link: string;
}

interface QuickAction {
  label: string;
  query: string;
  icon: string;
}

export function DiaEnhanced() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Initialize with context if provided
  useEffect(() => {
    const context = searchParams.get('context');
    const booking = searchParams.get('booking');
    
    let initialMessage: Message;
    
    if (context && booking) {
      initialMessage = {
        role: 'assistant',
        content: `I see you just booked ${context}! How can I help with your trip planning?`,
        quickActions: [
          { label: 'Add flights', query: 'Find flights for my trip', icon: '✈️' },
          { label: 'Book hotels', query: 'Show me hotels near my booking', icon: '🏨' },
          { label: 'Find experiences', query: 'What experiences are available?', icon: '🎯' },
          { label: 'Trip itinerary', query: 'Create a full itinerary for me', icon: '📋' }
        ]
      };
    } else {
      initialMessage = {
        role: 'assistant',
        content: "Hi! I'm Dia, your AI travel expert for Africa. I can help you find the best deals, plan itineraries, and answer any questions about African travel. What are you looking for?",
        quickActions: [
          { label: 'Beach vacation', query: 'Plan a beach vacation in East Africa', icon: '🏖️' },
          { label: 'Safari adventure', query: 'Best safari deals this month', icon: '🦁' },
          { label: 'City exploration', query: 'Top cities to visit in West Africa', icon: '🏙️' },
          { label: 'Budget trip', query: 'Plan a budget-friendly 2-week trip', icon: '💰' }
        ]
      };
    }
    
    setMessages([initialMessage]);
  }, [searchParams]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Smart AI response generator
  const generateAIResponse = async (query: string): Promise<Message> => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTyping(false);

    const lowerQuery = query.toLowerCase();

    // Price insights response
    if (lowerQuery.includes('cheap') || lowerQuery.includes('deal') || lowerQuery.includes('price')) {
      return {
        role: 'assistant',
        content: "Great news! I found some excellent deals for you. Prices are currently 23% below average!",
        priceInsight: {
          current: 450,
          average: 585,
          trend: 'down',
          bestTime: 'Next week (Nov 22-28)',
          savings: 135
        },
        recommendations: [
          {
            title: '3-Day Masai Mara Safari',
            subtitle: 'All-inclusive with game drives',
            price: 420,
            rating: 4.9,
            image: '🦁',
            badge: 'Best Price!',
            link: '/experiences/results'
          },
          {
            title: 'Zanzibar Beach Resort',
            subtitle: '5 nights with breakfast',
            price: 380,
            rating: 4.8,
            image: '🏖️',
            badge: '40% Off',
            link: '/stays/results'
          }
        ]
      };
    }

    // Flight search
    if (lowerQuery.includes('flight') || lowerQuery.includes('fly')) {
      return {
        role: 'assistant',
        content: "I found great flight options! Prices are trending down - book soon to save!",
        priceInsight: {
          current: 650,
          average: 780,
          trend: 'down',
          bestTime: 'This Friday',
          savings: 130
        },
        recommendations: [
          {
            title: 'Nairobi → Cape Town',
            subtitle: 'Kenya Airways • 1 stop',
            price: 650,
            rating: 4.7,
            image: '✈️',
            badge: 'Good Deal',
            link: '/flights/results'
          },
          {
            title: 'Lagos → Accra',
            subtitle: 'Direct flight',
            price: 180,
            rating: 4.6,
            image: '✈️',
            link: '/flights/results'
          }
        ],
        quickActions: [
          { label: 'Filter by direct flights', query: 'Show only direct flights', icon: '🎯' },
          { label: 'Flexible dates', query: 'Show prices for flexible dates', icon: '📅' }
        ]
      };
    }

    // Hotel/accommodation
    if (lowerQuery.includes('hotel') || lowerQuery.includes('stay') || lowerQuery.includes('accommodation')) {
      return {
        role: 'assistant',
        content: "I found some amazing places! These hotels have great reviews and competitive prices:",
        recommendations: [
          {
            title: 'Giraffe Manor - Nairobi',
            subtitle: 'Luxury boutique hotel',
            price: 890,
            rating: 4.9,
            image: '🦒',
            badge: 'Top Rated',
            link: '/stays/results'
          },
          {
            title: 'Serena Hotel - Kigali',
            subtitle: 'Business & leisure',
            price: 220,
            rating: 4.7,
            image: '🏨',
            link: '/stays/results'
          },
          {
            title: 'Beach Villa - Mombasa',
            subtitle: 'Ocean view with pool',
            price: 145,
            rating: 4.8,
            image: '🌊',
            badge: 'Great Value',
            link: '/stays/results'
          }
        ],
        quickActions: [
          { label: 'Filter by price', query: 'Show me budget hotels', icon: '💰' },
          { label: 'Luxury only', query: 'Show luxury hotels only', icon: '⭐' }
        ]
      };
    }

    // Safari/experiences
    if (lowerQuery.includes('safari') || lowerQuery.includes('tour') || lowerQuery.includes('experience')) {
      return {
        role: 'assistant',
        content: "Perfect timing for safaris! Migration season is starting. Here are my top picks:",
        recommendations: [
          {
            title: 'Serengeti Migration Safari',
            subtitle: '7 days, all-inclusive',
            price: 2450,
            rating: 5.0,
            image: '🐘',
            badge: 'Once in a lifetime',
            link: '/experiences/results'
          },
          {
            title: 'Kruger Park Big 5',
            subtitle: '4 days with expert guide',
            price: 890,
            rating: 4.9,
            image: '🦁',
            badge: 'Bestseller',
            link: '/experiences/results'
          }
        ],
        priceInsight: {
          current: 2450,
          average: 2850,
          trend: 'stable',
          bestTime: 'Book 3+ months ahead',
          savings: 400
        }
      };
    }

    // Budget/itinerary planning
    if (lowerQuery.includes('plan') || lowerQuery.includes('itinerary') || lowerQuery.includes('budget')) {
      return {
        role: 'assistant',
        content: "I'll help you plan the perfect trip! Here's a sample 10-day East Africa itinerary:",
        quickActions: [
          { label: 'Day 1-3: Nairobi', query: 'Tell me about Nairobi activities', icon: '🏙️' },
          { label: 'Day 4-7: Masai Mara', query: 'Safari options in Masai Mara', icon: '🦁' },
          { label: 'Day 8-10: Zanzibar', query: 'Beach hotels in Zanzibar', icon: '🏖️' },
          { label: 'See full itinerary', query: 'Create detailed 10-day plan', icon: '📋' }
        ],
        recommendations: [
          {
            title: 'Complete East Africa Package',
            subtitle: '10 days: Nairobi + Safari + Beach',
            price: 3200,
            rating: 4.9,
            image: '🌍',
            badge: 'All-inclusive',
            link: '/experiences/results'
          }
        ]
      };
    }

    // Default response
    return {
      role: 'assistant',
      content: "I can help you with that! What specifically would you like to know?",
      quickActions: [
        { label: 'Find flights', query: 'Search for flights', icon: '✈️' },
        { label: 'Book hotels', query: 'Find hotels', icon: '🏨' },
        { label: 'Plan activities', query: 'Show me experiences', icon: '🎯' },
        { label: 'Get visa info', query: 'Do I need a visa?', icon: '📄' }
      ]
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const aiResponse = await generateAIResponse(input);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
            <Sparkles className="w-6 h-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Dia - AI Travel Expert</h1>
          </div>
          <p className="text-gray-600">Ask me anything about African travel. I'll find the best deals and help you plan!</p>
        </div>

        {/* Messages */}
        <div className="space-y-6 mb-32">
          {messages.map((message, index) => (
            <div key={index} className="space-y-4">
              {/* Message bubble */}
              <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-6 py-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white shadow-lg border-2 border-purple-100'
                }`}>
                  <p className={message.role === 'user' ? 'text-white' : 'text-gray-900'}>
                    {message.content}
                  </p>
                </div>
              </div>

              {/* Price Insight */}
              {message.priceInsight && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="w-5 h-5 text-green-600" />
                    <h3 className="font-bold text-green-900">Price Insight</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-green-700 mb-1">Current Price</p>
                      <p className="text-2xl font-bold text-green-900">${message.priceInsight.current}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700 mb-1">You Save</p>
                      <p className="text-2xl font-bold text-green-600">${message.priceInsight.savings}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <p className="text-sm"><span className="font-semibold">Best time to book:</span> {message.priceInsight.bestTime}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {message.recommendations && message.recommendations.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {message.recommendations.map((rec, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(rec.link)}
                      className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-xl transition-all text-left group"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-4xl">{rec.image}</div>
                        <div className="flex-1">
                          {rec.badge && (
                            <span className="inline-block px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-2">
                              {rec.badge}
                            </span>
                          )}
                          <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                            {rec.title}
                          </h4>
                          <p className="text-sm text-gray-600">{rec.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-semibold text-gray-700">{rec.rating}</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">${rec.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Actions */}
              {message.quickActions && message.quickActions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {message.quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action.query)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-purple-200 rounded-full hover:border-purple-400 hover:bg-purple-50 transition-all"
                    >
                      <span>{action.icon}</span>
                      <span className="font-semibold text-purple-700">{action.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white shadow-lg border-2 border-purple-100 px-6 py-4 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Fixed Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything: 'Find cheap safaris' or 'Plan a 2-week trip'..."
              className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 outline-none text-lg"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

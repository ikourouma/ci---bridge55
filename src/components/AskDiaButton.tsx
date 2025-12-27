import { MessageCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AskDiaButtonProps {
  context?: string;
  bookingId?: string;
  suggestions?: string[];
}

export function AskDiaButton({ context, bookingId, suggestions }: AskDiaButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    const params = new URLSearchParams();
    if (context) params.set('context', context);
    if (bookingId) params.set('booking', bookingId);
    
    navigate(`/ai-trip-planner?${params.toString()}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const params = new URLSearchParams();
    params.set('query', suggestion);
    if (context) params.set('context', context);
    if (bookingId) params.set('booking', bookingId);
    
    navigate(`/ai-trip-planner?${params.toString()}`);
  };

  // Default suggestions based on context
  const defaultSuggestions = suggestions || [
    '🦁 Safari in Kenya',
    '🏖️ Beach getaway',
    '🏛️ Cultural tours',
    '💰 Budget options'
  ];

  return (
    <div className="my-8">
      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {defaultSuggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestionClick(suggestion)}
            className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-purple-400 hover:bg-purple-50 transition-all shadow-sm hover:shadow-md"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Main Ask Dia Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-2xl shadow-xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }} />
        </div>

        <button
          onClick={handleClick}
          className="relative w-full py-6 px-6 text-white hover:scale-[1.02] transition-transform"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
              <MessageCircle className="w-6 h-6" />
            </div>
            
            <h3 className="text-2xl font-bold">Ask Dia - AI Travel Assistant</h3>
            
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          {/* Description */}
          <p className="text-white/90 text-base">
            Get instant answers about your booking, destinations, and travel tips
          </p>
        </button>
      </div>
    </div>
  );
}

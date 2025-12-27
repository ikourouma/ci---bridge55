import { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { DiaChat } from './DiaChat';

export function FloatingDia() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[95vw] sm:w-[450px] max-w-[450px]">
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <DiaChat />
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group"
        >
          <div className="relative">
            {/* Ping animation */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-ping opacity-75" />
            
            {/* Main button */}
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <span className="hidden sm:block font-bold pr-2">Ask Dia AI</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
              <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-xl">
                Ask Dia anything about your trip!
                <div className="absolute top-full right-4 -mt-1">
                  <div className="border-8 border-transparent border-t-gray-900" />
                </div>
              </div>
            </div>
          </div>
        </button>
      )}
    </>
  );
}

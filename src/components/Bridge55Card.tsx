import { CreditCard, Eye, EyeOff, Copy, Lock } from 'lucide-react';
import { useState } from 'react';

interface Bridge55CardProps {
  balance: number;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
  type: 'virtual' | 'physical';
}

export function Bridge55Card({ 
  balance, 
  cardNumber = '4242 4242 4242 4242',
  expiryDate = '12/28',
  cvv = '123',
  cardholderName = 'BRIDGE55 MEMBER',
  type 
}: Bridge55CardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCardNumber = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative max-w-md mx-auto">
      {/* Card Visual - Standard Credit Card Ratio */}
      <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '1.586' }}>
        {/* Bridge55 Brand Colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          {/* Subtle Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="bridge55Pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="20" fill="none" stroke="white" strokeWidth="1.5"/>
                  <circle cx="30" cy="30" r="10" fill="none" stroke="white" strokeWidth="1"/>
                  <line x1="30" y1="0" x2="30" y2="60" stroke="white" strokeWidth="0.5"/>
                  <line x1="0" y1="30" x2="60" y2="30" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#bridge55Pattern)"/>
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
        </div>

        {/* Card Content - Absolute Positioning for Perfect Control */}
        <div className="absolute inset-0 text-white">
          
          {/* TOP LEFT - Balance */}
          <div className="absolute top-5 left-5 sm:top-6 sm:left-6">
            <div className="text-[10px] sm:text-xs opacity-75 mb-1">Balance</div>
            <div className="text-xl sm:text-2xl font-bold">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>

          {/* TOP RIGHT - Bridge55 Logo */}
          <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
            <div className="text-base sm:text-lg font-bold">
              <span className="text-white">bridge</span>
              <span className="text-blue-200">55</span>
            </div>
          </div>

          {/* TOP RIGHT BELOW LOGO - Type Badge */}
          <div className="absolute top-12 right-5 sm:top-14 sm:right-6">
            <div className="px-2.5 py-0.5 bg-white/15 backdrop-blur-sm rounded text-[9px] sm:text-[10px] font-bold tracking-widest">
              {type === 'virtual' ? 'VIRTUAL' : 'PHYSICAL'}
            </div>
          </div>

          {/* MIDDLE LEFT - Chip & NFC */}
          <div className="absolute top-1/2 -translate-y-1/2 left-5 sm:left-6 flex items-center gap-3">
            {/* EMV Chip */}
            <div className="w-10 h-8 sm:w-11 sm:h-9 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded relative overflow-hidden">
              <div className="absolute inset-1 grid grid-cols-3 gap-[1px]">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-yellow-600/30" />
                ))}
              </div>
            </div>
            
            {/* Contactless */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
              <div className="absolute inset-0 border-[1.5px] border-white/60 rounded-full" />
              <div className="absolute inset-[3px] border-[1.5px] border-white/40 rounded-full" />
              <div className="absolute inset-[6px] border-[1.5px] border-white/20 rounded-full" />
            </div>
          </div>

          {/* BOTTOM SECTION - Card Number (65% from top) */}
          <div className="absolute left-5 right-5 sm:left-6 sm:right-6" style={{ top: '65%' }}>
            <div className="flex items-center justify-between gap-2">
              <div className="font-mono text-sm sm:text-base tracking-[0.2em]">
                {showDetails ? cardNumber : '•••• •••• •••• ' + cardNumber.slice(-4)}
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="p-1 hover:bg-white/10 rounded flex-shrink-0"
              >
                {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* BOTTOM LEFT - Cardholder (85% from top) */}
          <div className="absolute left-5 sm:left-6" style={{ top: '85%' }}>
            <div className="text-[9px] sm:text-[10px] opacity-70 mb-0.5 tracking-wider">CARDHOLDER</div>
            <div className="text-xs sm:text-sm font-semibold tracking-wide max-w-[180px] truncate">
              {cardholderName}
            </div>
          </div>

          {/* BOTTOM CENTER-RIGHT - Expiry (85% from top, 50% from left) */}
          <div className="absolute" style={{ top: '85%', left: '55%' }}>
            <div className="text-[9px] sm:text-[10px] opacity-70 mb-0.5 tracking-wider">EXPIRES</div>
            <div className="text-xs sm:text-sm font-mono">{expiryDate}</div>
          </div>

          {/* BOTTOM CENTER-RIGHT - CVV (85% from top, 75% from left) - Only if showing details */}
          {showDetails && (
            <div className="absolute" style={{ top: '85%', left: '75%' }}>
              <div className="text-[9px] sm:text-[10px] opacity-70 mb-0.5 tracking-wider">CVV</div>
              <div className="text-xs sm:text-sm font-mono">{cvv}</div>
            </div>
          )}

          {/* BOTTOM FAR RIGHT - VISA Logo (Bottom-right corner, separate from all other elements) */}
          <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5">
            <div className="text-white text-xl sm:text-2xl font-bold italic opacity-90" style={{ fontFamily: 'serif' }}>
              VISA
            </div>
          </div>

        </div>
      </div>

      {/* Card Actions */}
      {showDetails && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={copyCardNumber}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy Number'}
          </button>
          {type === 'physical' && (
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">
              <Lock className="w-4 h-4" />
              Freeze
            </button>
          )}
        </div>
      )}

      {/* Type Indicator */}
      <div className="mt-3 text-center text-xs text-gray-600">
        {type === 'virtual' ? (
          <span>💳 Instant virtual card for online bookings</span>
        ) : (
          <span>📬 Physical card ships in 5-7 business days</span>
        )}
      </div>
    </div>
  );
}

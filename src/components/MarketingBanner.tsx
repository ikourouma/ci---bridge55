import { Link } from 'react-router-dom';
import { Sparkles, Gift, TrendingUp, ArrowRight } from 'lucide-react';

interface MarketingBannerProps {
  type: 'discount' | 'feature' | 'cross-sell' | 'referral';
  title: string;
  description: string;
  cta: string;
  link: string;
}

export function MarketingBanner({ type, title, description, cta, link }: MarketingBannerProps) {
  const config = {
    discount: {
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      icon: <Sparkles className="w-6 h-6" />,
      badge: '🎉 Limited Time'
    },
    feature: {
      gradient: 'from-blue-500 via-purple-500 to-indigo-500',
      icon: <TrendingUp className="w-6 h-6" />,
      badge: '✨ New Feature'
    },
    'cross-sell': {
      gradient: 'from-green-500 via-teal-500 to-cyan-500',
      icon: <Gift className="w-6 h-6" />,
      badge: '💎 Complete Your Trip'
    },
    referral: {
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      icon: <Gift className="w-6 h-6" />,
      badge: '🎁 Earn Rewards'
    }
  };

  const { gradient, icon, badge } = config[type];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-r ${gradient} rounded-xl p-6 text-white shadow-lg`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative">
        {/* Badge */}
        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold mb-3">
          {badge}
        </div>

        {/* Content */}
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0">
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">{title}</h3>
            <p className="text-white/90 mb-4 text-sm sm:text-base">{description}</p>
            
            <Link
              to={link}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              {cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pre-configured banners for easy use
export const MARKETING_BANNERS = {
  firstStayDiscount: {
    type: 'discount' as const,
    title: 'Save 20% on Your First Stay',
    description: 'Book your first accommodation and get 20% off with code BRIDGE20',
    cta: 'Browse Hotels',
    link: '/stays/results'
  },
  completeTripFlights: {
    type: 'cross-sell' as const,
    title: 'Complete Your Trip with Flights',
    description: 'Save 15% when you book flights and accommodation together',
    cta: 'Find Flights',
    link: '/flights/results'
  },
  referralBonus: {
    type: 'referral' as const,
    title: 'Refer Friends, Earn $50 Each',
    description: 'Share Bridge55 with friends. You both get $50 wallet credit when they book',
    cta: 'Get Referral Link',
    link: '/account/referrals'
  },
  walletTopUp: {
    type: 'feature' as const,
    title: 'Top Up Your Wallet, Get 5% Bonus',
    description: 'Add $100+ to your Bridge55 Wallet and receive 5% extra credit',
    cta: 'Add Funds Now',
    link: '/checkout'
  },
  experiencesDiscover: {
    type: 'cross-sell' as const,
    title: 'Discover Amazing Experiences',
    description: 'From safaris to cultural tours - make your trip unforgettable',
    cta: 'Explore Experiences',
    link: '/experiences/results'
  }
};

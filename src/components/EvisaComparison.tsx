import { X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function EvisaComparison() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/evisa');
  };

  const diyProblems = [
    'Confusing government websites, confusing forms, and confusing instructions',
    'One mistake? Get rejected or delayed',
    'Limited times when government will accept',
    'Usually no assistance or support available',
    'Start all over if you lose progress',
    'Limited payment methods',
  ];

  const bridge55Benefits = [
    'Intuitive application, done in minutes',
    'Detailed application review ensures approval on the first try',
    'Apply anytime, 24/7',
    'Chat, WhatsApp, and email round-the-clock support',
    'Save and continue later',
    'Multiple payment options',
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Travelers Choose Bridge55 for eVisa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Skip the confusion and delays. Get your visa approved faster with expert support every step of the way.
          </p>
        </div>

        {/* Comparison Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* LEFT COLUMN - The Risk (DIY) */}
          <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Do it yourself
              </h3>
              <p className="text-gray-600">Government Websites & DIY</p>
            </div>

            <div className="space-y-4">
              {diyProblems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3">
                  {/* Red X Circle */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-red-600" strokeWidth={3} />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - The Value (Bridge55) */}
          <div className="bg-white rounded-2xl p-8 border-4 border-transparent relative overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] -z-10"></div>
            <div className="absolute inset-[4px] rounded-[14px] bg-white z-0"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">With</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] bg-clip-text text-transparent">
                    Bridge55 eVisa
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {bridge55Benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {/* Gradient Check Circle */}
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <p className="text-gray-900 font-medium leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-8 text-center">
                <button 
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Below */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] bg-clip-text text-transparent">
                99.6%
              </p>
              <p className="text-gray-600 mt-1">Approval Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] bg-clip-text text-transparent">
                24/7
              </p>
              <p className="text-gray-600 mt-1">Expert Support</p>
            </div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] bg-clip-text text-transparent">
                100K+
              </p>
              <p className="text-gray-600 mt-1">Visas Processed</p>
            </div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7] bg-clip-text text-transparent">
                4.9★
              </p>
              <p className="text-gray-600 mt-1">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

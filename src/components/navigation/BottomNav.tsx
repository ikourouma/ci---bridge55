import React, { useState } from 'react';
import { Home, Compass, Sparkles, Calendar, User } from 'lucide-react';

type TabId = 'home' | 'explore' | 'ai' | 'trips' | 'account';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const tabs: Tab[] = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'explore', label: 'Explore', icon: Compass, href: '/explore' },
  { id: 'ai', label: 'AI', icon: Sparkles, href: '/ai' },
  { id: 'trips', label: 'Trips', icon: Calendar, href: '/trips' },
  { id: 'account', label: 'Account', icon: User, href: '/account' },
];

export const BottomNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  const handleTabClick = (tabId: TabId, href: string) => {
    setActiveTab(tabId);
    // In a real app, you'd use React Router or similar
    // window.location.href = href;
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-bottom-nav h-bottom-nav-height bg-white border-t border-gray-200 shadow-lg">
      <div className="h-full flex items-center justify-around px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.href)}
              className={`
                flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg
                transition-all duration-200
                ${isActive 
                  ? 'text-primary -translate-y-0.5' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

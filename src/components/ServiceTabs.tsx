type ServiceType = 'stays' | 'flights' | 'cars' | 'experiences' | 'evisa' | 'ai';

interface ServiceTabsProps {
  activeService: ServiceType;
  onServiceChange: (service: ServiceType) => void;
}

export function ServiceTabs({ activeService, onServiceChange }: ServiceTabsProps) {
  const services = [
    { id: 'stays' as const, label: 'Stays', icon: '🏨' },
    { id: 'flights' as const, label: 'Flights', icon: '✈️' },
    { id: 'cars' as const, label: 'Cars', icon: '🚗' },
    { id: 'experiences' as const, label: 'Experiences', icon: '🎭' },
    { id: 'evisa' as const, label: 'eVisa', icon: '🛂' },
    { id: 'ai' as const, label: 'Plan Trip', icon: '✨', special: true },
  ];

  return (
    <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => onServiceChange(service.id)}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
            transition-all duration-200
            ${activeService === service.id
              ? service.special
                ? 'bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-white shadow-lg'
                : 'bg-blue-50 text-blue-700 border-2 border-blue-500'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }
            ${service.special && activeService !== service.id
              ? 'border-2 border-transparent bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10'
              : ''
            }
          `}
        >
          <span className="text-lg">{service.icon}</span>
          <span>{service.label}</span>
        </button>
      ))}
    </div>
  );
}

export type { ServiceType };

import { CounterSelector } from './CounterSelector';

interface TravelerSelectorProps {
  adults: number;
  children: number;
  onUpdate: (adults: number, children: number) => void;
}

export function TravelerSelector({ adults, children, onUpdate }: TravelerSelectorProps) {
  const items = [
    { id: 'adults', label: 'Adults', description: 'Ages 18+', value: adults, min: 1, max: 9 },
    { id: 'children', label: 'Children', description: 'Ages 0-17', value: children, min: 0, max: 9 },
  ];

  const displayText = () => {
    const total = adults + children;
    if (total === 1) return '1 Traveler';
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
    if (children > 0) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
    return parts.join(', ');
  };

  const handleUpdate = (values: Record<string, number>) => {
    onUpdate(values.adults, values.children);
  };

  return (
    <CounterSelector
      items={items}
      onUpdate={handleUpdate}
      displayText={displayText()}
      note="Maximum 9 travelers per booking"
    />
  );
}

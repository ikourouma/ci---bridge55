import { CounterSelector } from './CounterSelector';

interface GuestSelectorProps {
  adults: number;
  children: number;
  rooms: number;
  onUpdate: (adults: number, children: number, rooms: number) => void;
}

export function GuestSelector({ adults, children, rooms, onUpdate }: GuestSelectorProps) {
  const items = [
    { id: 'adults', label: 'Adults', description: 'Ages 18+', value: adults, min: 1, max: 10 },
    { id: 'children', label: 'Children', description: 'Ages 0-17', value: children, min: 0, max: 10 },
    { id: 'rooms', label: 'Rooms', description: 'Number of rooms', value: rooms, min: 1, max: 5 },
  ];

  const displayText = () => {
    const parts = [];
    parts.push(`${adults} Adult${adults !== 1 ? 's' : ''}`);
    if (children > 0) parts.push(`${children} Child${children !== 1 ? 'ren' : ''}`);
    parts.push(`${rooms} Room${rooms !== 1 ? 's' : ''}`);
    return parts.join(', ');
  };

  const handleUpdate = (values: Record<string, number>) => {
    onUpdate(values.adults, values.children, values.rooms);
  };

  return (
    <CounterSelector
      items={items}
      onUpdate={handleUpdate}
      displayText={displayText()}
    />
  );
}

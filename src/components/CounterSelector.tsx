import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Users } from 'lucide-react';

interface CounterItem {
  id: string;
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
}

interface CounterSelectorProps {
  items: CounterItem[];
  onUpdate: (values: Record<string, number>) => void;
  displayText: string;
  note?: string;
}

export function CounterSelector({ items, onUpdate, displayText, note }: CounterSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localValues, setLocalValues] = useState<Record<string, number>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.value }), {})
  );
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Sync with props
  useEffect(() => {
    setLocalValues(items.reduce((acc, item) => ({ ...acc, [item.id]: item.value }), {}));
  }, [items]);

  // Calculate dropdown position when opened
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 500; // max height
      
      // Check if dropdown would go off screen
      const spaceBelow = viewportHeight - rect.bottom;
      const shouldPositionAbove = spaceBelow < dropdownHeight && rect.top > dropdownHeight;
      
      setDropdownPosition({
        top: shouldPositionAbove 
          ? rect.top + window.scrollY - dropdownHeight - 8
          : rect.bottom + window.scrollY + 8,
        left: Math.max(8, rect.left + window.scrollX), // Ensure 8px min from left edge
        width: Math.min(rect.width, window.innerWidth - 16) // Ensure fits within viewport
      });
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = 500;
        
        const spaceBelow = viewportHeight - rect.bottom;
        const shouldPositionAbove = spaceBelow < dropdownHeight && rect.top > dropdownHeight;
        
        setDropdownPosition({
          top: shouldPositionAbove 
            ? rect.top + window.scrollY - dropdownHeight - 8
            : rect.bottom + window.scrollY + 8,
          left: Math.max(8, rect.left + window.scrollX),
          width: Math.min(rect.width, window.innerWidth - 16)
        });
      }
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  const handleDone = () => {
    onUpdate(localValues);
    setIsOpen(false);
  };

  const handleClear = () => {
    const resetValues = items.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.min }),
      {}
    );
    setLocalValues(resetValues);
  };

  const increment = (id: string, max: number) => {
    if (localValues[id] < max) {
      setLocalValues({ ...localValues, [id]: localValues[id] + 1 });
    }
  };

  const decrement = (id: string, min: number) => {
    if (localValues[id] > min) {
      setLocalValues({ ...localValues, [id]: localValues[id] - 1 });
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Input Trigger */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-gray-900 text-left flex items-center justify-between hover:border-gray-300 transition-colors bg-white"
      >
        <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis pr-2">
          {displayText}
        </span>
        <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </button>

      {/* Dropdown Portal - Renders to document.body, escapes all parent constraints */}
      {isOpen && createPortal(
        <div 
          className="fixed bg-white rounded-xl shadow-2xl border-2 border-gray-300"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${Math.max(Math.min(dropdownPosition.width, window.innerWidth - 16), 320)}px`,
            maxWidth: 'calc(100vw - 16px)',
            zIndex: 999999,
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Content Area - Scrollable */}
          <div className="p-6 pb-4 overflow-y-auto flex-1">
            {/* Counter Rows */}
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center justify-between py-4 gap-6 ${
                  index < items.length - 1 || note ? 'border-b border-gray-200' : ''
                }`}
              >
                {/* Label */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-lg">{item.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>

                {/* Counter Controls */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => decrement(item.id, item.min)}
                    disabled={localValues[item.id] <= item.min}
                    className="w-10 h-10 rounded-full border-2 border-purple-600 text-purple-600 font-bold text-xl disabled:border-gray-300 disabled:text-gray-300 hover:bg-purple-50 transition-colors flex items-center justify-center bg-white"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-lg text-gray-900">
                    {localValues[item.id]}
                  </span>
                  <button
                    type="button"
                    onClick={() => increment(item.id, item.max)}
                    disabled={localValues[item.id] >= item.max}
                    className="w-10 h-10 rounded-full border-2 border-purple-600 text-purple-600 font-bold text-xl disabled:border-gray-300 disabled:text-gray-300 hover:bg-purple-50 transition-colors flex items-center justify-center bg-white"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* Optional Note */}
            {note && (
              <div className="py-3">
                <p className="text-sm text-gray-500">{note}</p>
              </div>
            )}
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="bg-white border-t border-gray-200 p-6 pt-4 flex items-center justify-between gap-4 flex-shrink-0">
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-700 font-bold hover:text-gray-900 transition-colors text-base px-4 py-2"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleDone}
              className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors shadow-lg text-base"
            >
              Done
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

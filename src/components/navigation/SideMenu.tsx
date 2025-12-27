import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { MenuSection } from '../../types/navigation';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sections: MenuSection[];
}

export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, sections }) => {
  
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-overlay transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Side Menu */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-[85%] max-w-[320px] bg-white z-side-menu
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          overflow-y-auto
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span className="text-lg font-bold text-gray-900">Bridge55</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="px-4 py-4">
          {sections.map((section) => (
            <MenuSectionComponent key={section.id} section={section} onClose={onClose} />
          ))}
        </div>
      </div>
    </>
  );
};

// Menu Section Component
interface MenuSectionComponentProps {
  section: MenuSection;
  onClose: () => void;
}

const MenuSectionComponent: React.FC<MenuSectionComponentProps> = ({ section, onClose }) => {
  return (
    <div className="mb-6">
      {/* Section Title */}
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
        {section.title}
      </h3>

      {/* Menu Items */}
      <div className="space-y-1">
        {section.items.map((item) => (
          <MenuItem key={item.id} item={item} onClose={onClose} />
        ))}
      </div>
    </div>
  );
};

// Menu Item Component
interface MenuItemProps {
  item: {
    id: string;
    label: string;
    icon?: string;
    href?: string;
    badge?: number | string;
    children?: Array<{
      id: string;
      label: string;
      href?: string;
    }>;
  };
  onClose: () => void;
  depth?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onClose, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  // Get icon component
  const IconComponent = item.icon 
    ? (LucideIcons as any)[item.icon.split('-').map((s: string) => 
        s.charAt(0).toUpperCase() + s.slice(1)
      ).join('')]
    : null;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (item.href) {
      // Navigate and close menu
      window.location.href = item.href;
      onClose();
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
          text-sm font-medium text-gray-700
          hover:bg-gray-100 hover:text-gray-900 transition-colors
          ${depth > 0 ? 'pl-6' : ''}
        `}
      >
        {IconComponent && <IconComponent className="w-5 h-5 flex-shrink-0" />}
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge && (
          <span className="px-2 py-0.5 text-xs font-bold bg-red-600 text-white rounded-full">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <LucideIcons.ChevronDown 
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      {/* Children (Sub-menu) */}
      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {item.children!.map((child) => (
            <MenuItem key={child.id} item={child} onClose={onClose} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

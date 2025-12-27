// Navigation Types

export type UserRole = 'traveler' | 'operator' | 'admin';

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  badge?: number | string;
  children?: MenuItem[];
  roles?: UserRole[];
  visible?: boolean;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
  visibleFor?: UserRole[];
}

export interface NotificationItem {
  id: string;
  type: 'booking' | 'payment' | 'review' | 'alert' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  icon?: string;
}

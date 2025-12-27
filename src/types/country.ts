// Country Configuration Types

export type AfricanRegion = 'east' | 'west' | 'southern' | 'northern' | 'central' | 'islands';

export type PlatformMode = 'pan-african' | 'country-specific';

export interface Country {
  code: string;
  name: string;
  localName: string;
  flag: string;
  domain?: string;
  currency: string;
  languages: string[];
  primaryLanguage: string;
  timezone: string;
  region: AfricanRegion;
  active: boolean;
}

export interface CountryConfig {
  code: string;
  name: string;
  localName: string;
  flag: string;
  domain?: string;
  
  // Localization
  currency: string;
  languages: string[];
  primaryLanguage: string;
  timezone: string;
  
  // Regional
  region: AfricanRegion;
  neighboringCountries: string[];
  
  // Platform customization
  featuredDestinations: string[];
  popularExperiences: string[];
  
  // Content
  discoveryTitle: string;
  heroImages: string[];
  marketingCopy: {
    tagline: string;
    description: string;
  };
}

export interface GeoData {
  ip?: string;
  countryCode: string;
  countryName: string;
  city?: string;
  timezone: string;
  currency: string;
  languages: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface NavigationContext {
  platform: PlatformMode;
  countryCode?: string;
  detectedLocation: {
    country: string;
    city?: string;
    timezone: string;
    currency: string;
    language: string;
  };
  userPreferences: {
    currency?: string;
    language?: string;
  };
}

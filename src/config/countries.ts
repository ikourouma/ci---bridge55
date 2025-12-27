// Country Configurations

import { CountryConfig } from '../types/country';

// Côte d'Ivoire Configuration
export const COTE_DIVOIRE_CONFIG: CountryConfig = {
  code: 'CI',
  name: "Côte d'Ivoire",
  localName: "Côte d'Ivoire",
  flag: '🇨🇮',
  domain: 'bridge55.ci',
  
  // Localization
  currency: 'XOF',
  languages: ['fr', 'en'],
  primaryLanguage: 'fr',
  timezone: 'Africa/Abidjan',
  
  // Regional
  region: 'west',
  neighboringCountries: ['GH', 'BF', 'ML', 'GN', 'LR'],
  
  // Platform customization
  featuredDestinations: [
    'Abidjan',
    'Yamoussoukro',
    'Grand-Bassam',
    'Bouaké',
    'San-Pédro'
  ],
  popularExperiences: [
    'Beach resorts in Assinie',
    'Basilica of Our Lady of Peace',
    'Grand-Bassam colonial architecture',
    'Taï National Park',
    'Abidjan nightlife'
  ],
  
  // Content
  discoveryTitle: "Découvrir la Côte d'Ivoire",
  heroImages: [
    '/images/ci/abidjan-skyline.jpg',
    '/images/ci/grand-bassam.jpg',
    '/images/ci/basilica.jpg'
  ],
  marketingCopy: {
    tagline: "Découvrez la perle de l'Afrique de l'Ouest",
    description: 'Des plages paradisiaques aux forêts tropicales, explorez la diversité ivoirienne'
  }
};

// Kenya Configuration
export const KENYA_CONFIG: CountryConfig = {
  code: 'KE',
  name: 'Kenya',
  localName: 'Kenya',
  flag: '🇰🇪',
  domain: 'bridge55.ke',
  
  currency: 'KES',
  languages: ['en', 'sw'],
  primaryLanguage: 'en',
  timezone: 'Africa/Nairobi',
  
  region: 'east',
  neighboringCountries: ['TZ', 'UG', 'SO', 'ET', 'SS'],
  
  featuredDestinations: [
    'Nairobi',
    'Masai Mara',
    'Mombasa',
    'Amboseli',
    'Diani Beach'
  ],
  popularExperiences: [
    'Safari in Masai Mara',
    'Mount Kenya hiking',
    'Beach resorts in Diani',
    'Nairobi National Park',
    'Cultural tours'
  ],
  
  discoveryTitle: 'Discover Kenya',
  heroImages: [],
  marketingCopy: {
    tagline: 'Experience the Heart of Africa',
    description: 'From the Great Migration to pristine beaches, Kenya offers unforgettable adventures'
  }
};

// South Africa Configuration
export const SOUTH_AFRICA_CONFIG: CountryConfig = {
  code: 'ZA',
  name: 'South Africa',
  localName: 'South Africa',
  flag: '🇿🇦',
  domain: 'bridge55.za',
  
  currency: 'ZAR',
  languages: ['en', 'af', 'zu'],
  primaryLanguage: 'en',
  timezone: 'Africa/Johannesburg',
  
  region: 'southern',
  neighboringCountries: ['NA', 'BW', 'ZW', 'MZ', 'SZ', 'LS'],
  
  featuredDestinations: [
    'Cape Town',
    'Johannesburg',
    'Kruger National Park',
    'Durban',
    'Garden Route'
  ],
  popularExperiences: [
    'Safari in Kruger',
    'Table Mountain',
    'Cape Winelands',
    'Robben Island',
    'Garden Route drive'
  ],
  
  discoveryTitle: 'Discover South Africa',
  heroImages: [],
  marketingCopy: {
    tagline: 'A World in One Country',
    description: 'Explore diverse landscapes, vibrant cities, and incredible wildlife'
  }
};

// All Country Configurations
export const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  CI: COTE_DIVOIRE_CONFIG,
  KE: KENYA_CONFIG,
  ZA: SOUTH_AFRICA_CONFIG,
  // Add more countries as needed
};

// Default configuration for pan-African mode
export const DEFAULT_CONFIG: CountryConfig = {
  code: 'AFRICA',
  name: 'Africa',
  localName: 'Africa',
  flag: '🌍',
  
  currency: 'USD',
  languages: ['en', 'fr', 'ar', 'pt', 'sw'],
  primaryLanguage: 'en',
  timezone: 'Africa/Lagos',
  
  region: 'west',
  neighboringCountries: [],
  
  featuredDestinations: [
    'Kenya',
    'South Africa',
    'Morocco',
    'Egypt',
    'Tanzania'
  ],
  popularExperiences: [
    'Safari Adventures',
    'Beach & Islands',
    'Cultural Heritage',
    'Mountain Trekking',
    'City Experiences'
  ],
  
  discoveryTitle: 'Discover Africa',
  heroImages: [],
  marketingCopy: {
    tagline: 'Explore Your Next Adventure in Africa',
    description: 'Discover authentic experiences across 54 countries'
  }
};

/**
 * Bridge55 Shared Country Configuration
 * =====================================
 * 
 * This file is shared across all Bridge55 SaaS platforms:
 * - Bridge55 Core
 * - Country-Specific (Tourism Boards)
 * - AfCON (Sports Edition)
 * 
 * Usage:
 * import { countries, getCountry, applyCountryTheme } from '../shared/config/countries.js';
 * 
 * @version 1.0.0
 * @author Afronovation
 */

// ═══════════════════════════════════════════════════════════════════════════
// COUNTRY REGISTRY
// ═══════════════════════════════════════════════════════════════════════════

export const countries = {
    // Pan-African (Default)
    'pan-african': {
        code: 'pan-african',
        name: 'Pan-African',
        flag: '🌍',
        flagUrl: 'https://flagcdn.com/w40/xx.png',
        primary: '#FF6B35',
        primaryDark: '#E55A2B',
        primaryLight: '#FFF5EB',
        secondary: '#004E89',
        accent: '#FFD700',
        currency: 'USD',
        languages: ['en'],
        timezone: 'Africa/Lagos',
        mobilePayment: 'Mobile Money',
        exploreText: 'Explore Africa',
        capital: null
    },

    // ══════════════════════════════════════════════════════════════════════
    // NORTH AFRICA
    // ══════════════════════════════════════════════════════════════════════
    
    'ma': {
        code: 'ma',
        name: 'Morocco',
        localName: 'المغرب',
        flag: '🇲🇦',
        flagUrl: 'https://flagcdn.com/w40/ma.png',
        primary: '#C1272D',
        primaryDark: '#A01F24',
        primaryLight: '#FFF5F5',
        secondary: '#006233',
        accent: '#FFD700',
        currency: 'MAD',
        languages: ['ar', 'fr'],
        timezone: 'Africa/Casablanca',
        mobilePayment: 'inwi money',
        exploreText: 'Explore Morocco',
        capital: 'Rabat',
        region: 'north'
    },
    
    'eg': {
        code: 'eg',
        name: 'Egypt',
        localName: 'مصر',
        flag: '🇪🇬',
        flagUrl: 'https://flagcdn.com/w40/eg.png',
        primary: '#C8102E',
        primaryDark: '#A00D24',
        primaryLight: '#FFF5F6',
        secondary: '#000000',
        accent: '#C09A5B',
        currency: 'EGP',
        languages: ['ar', 'en'],
        timezone: 'Africa/Cairo',
        mobilePayment: 'Fawry',
        exploreText: 'Explore Egypt',
        capital: 'Cairo',
        region: 'north'
    },
    
    'dz': {
        code: 'dz',
        name: 'Algeria',
        localName: 'الجزائر',
        flag: '🇩🇿',
        flagUrl: 'https://flagcdn.com/w40/dz.png',
        primary: '#006233',
        primaryDark: '#004D28',
        primaryLight: '#E8F5EC',
        secondary: '#D21034',
        accent: '#FFFFFF',
        currency: 'DZD',
        languages: ['ar', 'fr'],
        timezone: 'Africa/Algiers',
        mobilePayment: 'CIB',
        exploreText: 'Explore Algeria',
        capital: 'Algiers',
        region: 'north'
    },
    
    'tn': {
        code: 'tn',
        name: 'Tunisia',
        localName: 'تونس',
        flag: '🇹🇳',
        flagUrl: 'https://flagcdn.com/w40/tn.png',
        primary: '#E70013',
        primaryDark: '#C4000F',
        primaryLight: '#FFF5F5',
        secondary: '#FFFFFF',
        accent: '#E70013',
        currency: 'TND',
        languages: ['ar', 'fr'],
        timezone: 'Africa/Tunis',
        mobilePayment: 'MobiCash',
        exploreText: 'Explore Tunisia',
        capital: 'Tunis',
        region: 'north'
    },

    // ══════════════════════════════════════════════════════════════════════
    // WEST AFRICA
    // ══════════════════════════════════════════════════════════════════════
    
    'ng': {
        code: 'ng',
        name: 'Nigeria',
        flag: '🇳🇬',
        flagUrl: 'https://flagcdn.com/w40/ng.png',
        primary: '#008751',
        primaryDark: '#006B3F',
        primaryLight: '#E8F5EE',
        secondary: '#FFFFFF',
        accent: '#008751',
        currency: 'NGN',
        languages: ['en'],
        timezone: 'Africa/Lagos',
        mobilePayment: 'Flutterwave',
        exploreText: 'Explore Nigeria',
        capital: 'Abuja',
        region: 'west'
    },
    
    'gh': {
        code: 'gh',
        name: 'Ghana',
        flag: '🇬🇭',
        flagUrl: 'https://flagcdn.com/w40/gh.png',
        primary: '#EF3340',
        primaryDark: '#CE1126',
        primaryLight: '#FFF5F6',
        secondary: '#FCD116',
        accent: '#006B3F',
        currency: 'GHS',
        languages: ['en'],
        timezone: 'Africa/Accra',
        mobilePayment: 'MTN MoMo',
        exploreText: 'Explore Ghana',
        capital: 'Accra',
        region: 'west'
    },
    
    'ci': {
        code: 'ci',
        name: "Côte d'Ivoire",
        localName: "Côte d'Ivoire",
        flag: '🇨🇮',
        flagUrl: 'https://flagcdn.com/w40/ci.png',
        primary: '#FF8C00',
        primaryDark: '#E67300',
        primaryLight: '#FFF8EB',
        secondary: '#00954A',
        accent: '#FFFFFF',
        currency: 'XOF',
        languages: ['fr'],
        timezone: 'Africa/Abidjan',
        mobilePayment: 'Orange Money',
        exploreText: "Explore Côte d'Ivoire",
        capital: 'Yamoussoukro',
        region: 'west'
    },
    
    'sn': {
        code: 'sn',
        name: 'Senegal',
        localName: 'Sénégal',
        flag: '🇸🇳',
        flagUrl: 'https://flagcdn.com/w40/sn.png',
        primary: '#00853F',
        primaryDark: '#006B32',
        primaryLight: '#E8F5EC',
        secondary: '#FDEF42',
        accent: '#E31B23',
        currency: 'XOF',
        languages: ['fr'],
        timezone: 'Africa/Dakar',
        mobilePayment: 'Orange Money',
        exploreText: 'Explore Senegal',
        capital: 'Dakar',
        region: 'west'
    },
    
    'cm': {
        code: 'cm',
        name: 'Cameroon',
        localName: 'Cameroun',
        flag: '🇨🇲',
        flagUrl: 'https://flagcdn.com/w40/cm.png',
        primary: '#007A3D',
        primaryDark: '#006230',
        primaryLight: '#E8F5EC',
        secondary: '#CE1126',
        accent: '#FCD116',
        currency: 'XAF',
        languages: ['fr', 'en'],
        timezone: 'Africa/Douala',
        mobilePayment: 'MTN MoMo',
        exploreText: 'Explore Cameroon',
        capital: 'Yaoundé',
        region: 'west'
    },

    // ══════════════════════════════════════════════════════════════════════
    // EAST AFRICA
    // ══════════════════════════════════════════════════════════════════════
    
    'ke': {
        code: 'ke',
        name: 'Kenya',
        flag: '🇰🇪',
        flagUrl: 'https://flagcdn.com/w40/ke.png',
        primary: '#BB0000',
        primaryDark: '#8B0000',
        primaryLight: '#FFF5F5',
        secondary: '#006600',
        accent: '#FFFFFF',
        currency: 'KES',
        languages: ['en', 'sw'],
        timezone: 'Africa/Nairobi',
        mobilePayment: 'M-Pesa',
        exploreText: 'Explore Kenya',
        capital: 'Nairobi',
        region: 'east'
    },
    
    'tz': {
        code: 'tz',
        name: 'Tanzania',
        flag: '🇹🇿',
        flagUrl: 'https://flagcdn.com/w40/tz.png',
        primary: '#1EB53A',
        primaryDark: '#169030',
        primaryLight: '#E8F8EC',
        secondary: '#00A3DD',
        accent: '#FCD116',
        currency: 'TZS',
        languages: ['sw', 'en'],
        timezone: 'Africa/Dar_es_Salaam',
        mobilePayment: 'M-Pesa',
        exploreText: 'Explore Tanzania',
        capital: 'Dodoma',
        region: 'east'
    },
    
    'ug': {
        code: 'ug',
        name: 'Uganda',
        flag: '🇺🇬',
        flagUrl: 'https://flagcdn.com/w40/ug.png',
        primary: '#D4B800',
        primaryDark: '#B39B00',
        primaryLight: '#FFFBEA',
        secondary: '#000000',
        accent: '#DE3831',
        currency: 'UGX',
        languages: ['en', 'sw'],
        timezone: 'Africa/Kampala',
        mobilePayment: 'MTN MoMo',
        exploreText: 'Explore Uganda',
        capital: 'Kampala',
        region: 'east'
    },
    
    'rw': {
        code: 'rw',
        name: 'Rwanda',
        flag: '🇷🇼',
        flagUrl: 'https://flagcdn.com/w40/rw.png',
        primary: '#00A1DE',
        primaryDark: '#0080B0',
        primaryLight: '#E8F7FC',
        secondary: '#FAD201',
        accent: '#20603D',
        currency: 'RWF',
        languages: ['en', 'fr', 'rw'],
        timezone: 'Africa/Kigali',
        mobilePayment: 'MTN MoMo',
        exploreText: 'Explore Rwanda',
        capital: 'Kigali',
        region: 'east'
    },
    
    'et': {
        code: 'et',
        name: 'Ethiopia',
        localName: 'ኢትዮጵያ',
        flag: '🇪🇹',
        flagUrl: 'https://flagcdn.com/w40/et.png',
        primary: '#078930',
        primaryDark: '#056C25',
        primaryLight: '#E8F5EC',
        secondary: '#DA121A',
        accent: '#FCDD09',
        currency: 'ETB',
        languages: ['am', 'en'],
        timezone: 'Africa/Addis_Ababa',
        mobilePayment: 'Telebirr',
        exploreText: 'Explore Ethiopia',
        capital: 'Addis Ababa',
        region: 'east'
    },

    // ══════════════════════════════════════════════════════════════════════
    // SOUTHERN AFRICA
    // ══════════════════════════════════════════════════════════════════════
    
    'za': {
        code: 'za',
        name: 'South Africa',
        flag: '🇿🇦',
        flagUrl: 'https://flagcdn.com/w40/za.png',
        primary: '#007749',
        primaryDark: '#005C38',
        primaryLight: '#E8F5EE',
        secondary: '#FFB81C',
        accent: '#DE3831',
        currency: 'ZAR',
        languages: ['en', 'af', 'zu'],
        timezone: 'Africa/Johannesburg',
        mobilePayment: 'SnapScan',
        exploreText: 'Explore South Africa',
        capital: 'Pretoria',
        region: 'south'
    },
    
    'zm': {
        code: 'zm',
        name: 'Zambia',
        flag: '🇿🇲',
        flagUrl: 'https://flagcdn.com/w40/zm.png',
        primary: '#198754',
        primaryDark: '#146C43',
        primaryLight: '#E8F5EE',
        secondary: '#EF7D00',
        accent: '#000000',
        currency: 'ZMW',
        languages: ['en'],
        timezone: 'Africa/Lusaka',
        mobilePayment: 'MTN MoMo',
        exploreText: 'Explore Zambia',
        capital: 'Lusaka',
        region: 'south'
    },
    
    'zw': {
        code: 'zw',
        name: 'Zimbabwe',
        flag: '🇿🇼',
        flagUrl: 'https://flagcdn.com/w40/zw.png',
        primary: '#006400',
        primaryDark: '#005000',
        primaryLight: '#E8F5EC',
        secondary: '#FFD200',
        accent: '#EF3340',
        currency: 'ZWL',
        languages: ['en'],
        timezone: 'Africa/Harare',
        mobilePayment: 'EcoCash',
        exploreText: 'Explore Zimbabwe',
        capital: 'Harare',
        region: 'south'
    },
    
    'bw': {
        code: 'bw',
        name: 'Botswana',
        flag: '🇧🇼',
        flagUrl: 'https://flagcdn.com/w40/bw.png',
        primary: '#00AEEF',
        primaryDark: '#0090C5',
        primaryLight: '#E8F7FC',
        secondary: '#000000',
        accent: '#FFFFFF',
        currency: 'BWP',
        languages: ['en', 'tn'],
        timezone: 'Africa/Gaborone',
        mobilePayment: 'Orange Money',
        exploreText: 'Explore Botswana',
        capital: 'Gaborone',
        region: 'south'
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get country configuration by code
 * @param {string} code - Two-letter country code or 'pan-african'
 * @returns {Object} Country configuration object
 */
export function getCountry(code) {
    return countries[code?.toLowerCase()] || countries['pan-african'];
}

/**
 * Get all countries in a region
 * @param {string} region - 'north', 'west', 'east', 'south'
 * @returns {Array} Array of country objects
 */
export function getCountriesByRegion(region) {
    return Object.values(countries).filter(c => c.region === region);
}

/**
 * Apply country theme to document
 * @param {string} code - Country code
 */
export function applyCountryTheme(code) {
    const country = getCountry(code);
    const root = document.documentElement;
    
    // Set data attribute
    root.setAttribute('data-country', code);
    
    // Apply CSS variables
    root.style.setProperty('--primary', country.primary);
    root.style.setProperty('--primary-dark', country.primaryDark);
    root.style.setProperty('--primary-light', country.primaryLight);
    root.style.setProperty('--secondary', country.secondary);
    root.style.setProperty('--accent', country.accent);
    
    // Store in localStorage
    localStorage.setItem('bridge55-country', code);
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('countryChange', { 
        detail: { code, country } 
    }));
    
    return country;
}

/**
 * Get current country from localStorage or URL
 * @returns {string} Country code
 */
export function getCurrentCountry() {
    // Check URL first
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('country')) {
        return urlParams.get('country');
    }
    
    // Check localStorage
    return localStorage.getItem('bridge55-country') || 'pan-african';
}

/**
 * Initialize country theme on page load
 */
export function initCountryTheme() {
    const code = getCurrentCountry();
    applyCountryTheme(code);
    return code;
}

// ═══════════════════════════════════════════════════════════════════════════
// AFCON-SPECIFIC HELPERS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * AfCON tournament host countries
 */
export const afconHosts = {
    '2025': 'ma',  // Morocco
    '2027': 'sn',  // Senegal
    '2023': 'ci',  // Côte d'Ivoire
    '2021': 'cm',  // Cameroon
    '2019': 'eg'   // Egypt
};

/**
 * Get AfCON host country for a given year
 * @param {string|number} year - Tournament year
 * @returns {Object} Country configuration
 */
export function getAfconHost(year) {
    const code = afconHosts[year] || afconHosts['2025'];
    return getCountry(code);
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTO-INITIALIZATION (if not in module context)
// ═══════════════════════════════════════════════════════════════════════════

if (typeof window !== 'undefined' && !window.Bridge55Countries) {
    window.Bridge55Countries = {
        countries,
        getCountry,
        getCountriesByRegion,
        applyCountryTheme,
        getCurrentCountry,
        initCountryTheme,
        afconHosts,
        getAfconHost
    };
}





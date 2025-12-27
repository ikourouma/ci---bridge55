# 🌍 BRIDGE55 - COUNTRY BRANDING SYSTEM

**Version:** 1.0  
**Date:** November 28, 2025  
**Status:** Active - 3 Countries Configured (Expandable to 54)  
**Purpose:** Dynamic country-specific theming for Bridge55 platform instances

---

## 📊 OVERVIEW

Bridge55's country branding system enables each African country to have a customized instance (e.g., `bridge55.ci`, `bridge55.gh`) with colors derived from their national flags. This creates emotional connection and local pride.

### **Current Status:**
- ✅ **3 Countries Configured:** Côte d'Ivoire, Ghana, Kenya
- 🔄 **51 Countries Pending:** To be added incrementally
- 🎨 **Dynamic Theming:** CSS Variables + JavaScript switcher
- 🌐 **Pan-African Default:** Bridge55 orange/blue branding

---

## 🎨 COUNTRY THEME CONFIGURATIONS

### **TIER 1: LAUNCH COUNTRIES (Priority)**

#### **1. CÔTE D'IVOIRE (CI)** 🇨🇮
**Instance:** `bridge55.ci`  
**Region:** West Africa  
**Capital:** Yamoussoukro (Political), Abidjan (Economic)

**Flag Colors:**
- Orange: Left vertical band
- White: Center vertical band
- Green: Right vertical band

**Theme Configuration:**
```css
[data-country="ci"] {
  --primary: #FF8C00;           /* Orange */
  --primary-dark: #E67300;      /* Darker Orange */
  --primary-light: #FFB347;     /* Lighter Orange */
  --secondary: #00954A;         /* Green */
  --secondary-dark: #006633;    /* Darker Green */
  --secondary-light: #00B359;   /* Lighter Green */
  --accent: #FFFFFF;            /* White */
  --gradient: linear-gradient(135deg, #FF8C00 0%, #00954A 100%);
}
```

**JavaScript Configuration:**
```javascript
{
  code: 'ci',
  name: 'Côte d\'Ivoire',
  nameLocal: 'Côte d\'Ivoire',
  flag: '🇨🇮',
  region: 'West Africa',
  currency: 'XOF',
  currencyName: 'West African CFA franc',
  languages: ['fr', 'en'],
  primaryLanguage: 'fr',
  timezone: 'Africa/Abidjan',
  callingCode: '+225',
  domain: 'bridge55.ci',
  colors: {
    primary: '#FF8C00',
    primaryDark: '#E67300',
    primaryLight: '#FFB347',
    secondary: '#00954A',
    secondaryDark: '#006633',
    secondaryLight: '#00B359',
    accent: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #FF8C00 0%, #00954A 100%)'
  },
  featuredDestinations: [
    'Abidjan',
    'Yamoussoukro',
    'Grand-Bassam',
    'Man',
    'Sassandra'
  ],
  paymentMethods: ['orange_money', 'mtn_money', 'moov_money', 'wave', 'card'],
  touristHighlights: [
    'Basilica of Our Lady of Peace',
    'Comoe National Park',
    'Grand-Bassam UNESCO Site',
    'Man\'s Mountains',
    'Taï National Park'
  ],
  visaPolicy: 'eVisa available',
  bestTimeToVisit: 'November to March (Dry season)'
}
```

---

#### **2. GHANA (GH)** 🇬🇭
**Instance:** `bridge55.gh`  
**Region:** West Africa  
**Capital:** Accra

**Flag Colors:**
- Red: Top horizontal band
- Gold/Yellow: Middle horizontal band
- Green: Bottom horizontal band
- Black Star: Center (on yellow)

**Theme Configuration:**
```css
[data-country="gh"] {
  --primary: #EF3340;           /* Red */
  --primary-dark: #CE1126;      /* Darker Red */
  --primary-light: #FF5C67;     /* Lighter Red */
  --secondary: #FCD116;         /* Gold/Yellow */
  --secondary-dark: #E6BE00;    /* Darker Yellow */
  --secondary-light: #FFDB4D;   /* Lighter Yellow */
  --accent: #006B3F;            /* Green */
  --gradient: linear-gradient(135deg, #EF3340 0%, #FCD116 50%, #006B3F 100%);
}
```

**JavaScript Configuration:**
```javascript
{
  code: 'gh',
  name: 'Ghana',
  nameLocal: 'Ghana',
  flag: '🇬🇭',
  region: 'West Africa',
  currency: 'GHS',
  currencyName: 'Ghanaian cedi',
  languages: ['en'],
  primaryLanguage: 'en',
  timezone: 'Africa/Accra',
  callingCode: '+233',
  domain: 'bridge55.gh',
  colors: {
    primary: '#EF3340',
    primaryDark: '#CE1126',
    primaryLight: '#FF5C67',
    secondary: '#FCD116',
    secondaryDark: '#E6BE00',
    secondaryLight: '#FFDB4D',
    accent: '#006B3F',
    gradient: 'linear-gradient(135deg, #EF3340 0%, #FCD116 50%, #006B3F 100%)'
  },
  featuredDestinations: [
    'Accra',
    'Kumasi',
    'Cape Coast',
    'Elmina',
    'Tamale',
    'Mole National Park'
  ],
  paymentMethods: ['mtn_money', 'vodafone_cash', 'airtel_tigo_money', 'card'],
  touristHighlights: [
    'Cape Coast Castle',
    'Elmina Castle',
    'Kakum National Park',
    'Lake Volta',
    'Ashanti Kingdom Sites',
    'Mole National Park'
  ],
  visaPolicy: 'eVisa available',
  bestTimeToVisit: 'November to April (Dry season)',
  specialEvents: [
    'Panafest (July-August)',
    'Aboakyer Festival (May)',
    'Homowo Festival (August)'
  ]
}
```

---

#### **3. KENYA (KE)** 🇰🇪
**Instance:** `bridge55.ke`  
**Region:** East Africa  
**Capital:** Nairobi

**Flag Colors:**
- Black: Top horizontal band
- Red: Center horizontal band
- Green: Bottom horizontal band
- White: Thin lines separating bands
- Maasai Shield & Spears: Center

**Theme Configuration:**
```css
[data-country="ke"] {
  --primary: #BB0000;           /* Red */
  --primary-dark: #8B0000;      /* Darker Red */
  --primary-light: #DD0000;     /* Lighter Red */
  --secondary: #006600;         /* Green */
  --secondary-dark: #004D00;    /* Darker Green */
  --secondary-light: #008000;   /* Lighter Green */
  --accent: #000000;            /* Black */
  --gradient: linear-gradient(135deg, #000000 0%, #BB0000 35%, #FFFFFF 50%, #006600 100%);
}
```

**JavaScript Configuration:**
```javascript
{
  code: 'ke',
  name: 'Kenya',
  nameLocal: 'Kenya',
  flag: '🇰🇪',
  region: 'East Africa',
  currency: 'KES',
  currencyName: 'Kenyan shilling',
  languages: ['en', 'sw'],
  primaryLanguage: 'en',
  timezone: 'Africa/Nairobi',
  callingCode: '+254',
  domain: 'bridge55.ke',
  colors: {
    primary: '#BB0000',
    primaryDark: '#8B0000',
    primaryLight: '#DD0000',
    secondary: '#006600',
    secondaryDark: '#004D00',
    secondaryLight: '#008000',
    accent: '#000000',
    gradient: 'linear-gradient(135deg, #000000 0%, #BB0000 35%, #FFFFFF 50%, #006600 100%)'
  },
  featuredDestinations: [
    'Nairobi',
    'Mombasa',
    'Masai Mara',
    'Amboseli',
    'Diani Beach',
    'Lake Nakuru',
    'Tsavo',
    'Lamu'
  ],
  paymentMethods: ['mpesa', 'airtel_money', 'tkash', 'card'],
  touristHighlights: [
    'Masai Mara National Reserve',
    'Amboseli National Park',
    'Mount Kenya',
    'Lake Nakuru',
    'Lamu Old Town (UNESCO)',
    'Hell\'s Gate National Park',
    'Tsavo National Parks',
    'Great Rift Valley'
  ],
  visaPolicy: 'eVisa required (eTA)',
  bestTimeToVisit: 'June to October (Great Migration), January to February',
  specialEvents: [
    'Great Migration (July-October)',
    'Lamu Cultural Festival (November)',
    'Maralal Camel Derby (August)'
  ],
  safariCapital: true,
  wildlifeHighlight: 'Big Five + Great Migration'
}
```

---

### **DEFAULT: PAN-AFRICAN (BRIDGE55)** 🌍

**Instance:** `bridge55.com`  
**Purpose:** Main hub for all 54 countries

**Theme Configuration:**
```css
:root {
  --primary: #FF6B35;           /* Bridge55 Orange */
  --primary-dark: #E64A19;      /* Darker Orange */
  --primary-light: #FF8A65;     /* Lighter Orange */
  --secondary: #004E89;         /* Bridge55 Blue */
  --secondary-dark: #003366;    /* Darker Blue */
  --secondary-light: #0055A4;   /* Lighter Blue */
  --accent: #F7B32B;            /* Golden Yellow */
  --success: #00A86B;           /* Green */
  --warning: #FFA500;           /* Orange */
  --error: #D90000;             /* Red */
  --gradient: linear-gradient(135deg, #FF6B35 0%, #004E89 100%);
}
```

**JavaScript Configuration:**
```javascript
{
  code: 'pan-african',
  name: 'Bridge55',
  nameLocal: 'Bridge55 - Discover Africa',
  flag: '🌍',
  region: 'Pan-African',
  currency: 'USD',
  currencyName: 'US Dollar',
  languages: ['en', 'fr', 'ar', 'pt', 'sw'],
  primaryLanguage: 'en',
  timezone: 'UTC',
  callingCode: null,
  domain: 'bridge55.com',
  colors: {
    primary: '#FF6B35',
    primaryDark: '#E64A19',
    primaryLight: '#FF8A65',
    secondary: '#004E89',
    secondaryDark: '#003366',
    secondaryLight: '#0055A4',
    accent: '#F7B32B',
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #004E89 100%)'
  },
  featuredDestinations: [
    'All 54 African Countries'
  ],
  paymentMethods: ['card', 'mobile_money', 'bank_transfer'],
  description: 'The Operating System for African Tourism'
}
```

---

## 💻 TECHNICAL IMPLEMENTATION

### **1. CSS Variables System**

**File:** `country-themes.css`

```css
/* ============================================
   BRIDGE55 COUNTRY BRANDING SYSTEM
   Dynamically apply country-specific themes
   ============================================ */

/* DEFAULT: Pan-African (Bridge55) */
:root {
  --primary: #FF6B35;
  --primary-dark: #E64A19;
  --primary-light: #FF8A65;
  --secondary: #004E89;
  --secondary-dark: #003366;
  --secondary-light: #0055A4;
  --accent: #F7B32B;
  --success: #00A86B;
  --warning: #FFA500;
  --error: #D90000;
  --gradient: linear-gradient(135deg, #FF6B35 0%, #004E89 100%);
}

/* CÔTE D'IVOIRE */
[data-country="ci"] {
  --primary: #FF8C00;
  --primary-dark: #E67300;
  --primary-light: #FFB347;
  --secondary: #00954A;
  --secondary-dark: #006633;
  --secondary-light: #00B359;
  --accent: #FFFFFF;
  --gradient: linear-gradient(135deg, #FF8C00 0%, #00954A 100%);
}

/* GHANA */
[data-country="gh"] {
  --primary: #EF3340;
  --primary-dark: #CE1126;
  --primary-light: #FF5C67;
  --secondary: #FCD116;
  --secondary-dark: #E6BE00;
  --secondary-light: #FFDB4D;
  --accent: #006B3F;
  --gradient: linear-gradient(135deg, #EF3340 0%, #FCD116 50%, #006B3F 100%);
}

/* KENYA */
[data-country="ke"] {
  --primary: #BB0000;
  --primary-dark: #8B0000;
  --primary-light: #DD0000;
  --secondary: #006600;
  --secondary-dark: #004D00;
  --secondary-light: #008000;
  --accent: #000000;
  --gradient: linear-gradient(135deg, #000000 0%, #BB0000 35%, #FFFFFF 50%, #006600 100%);
}

/* ============================================
   UTILITY CLASSES
   Apply CSS variables to elements
   ============================================ */

.bg-primary {
  background-color: var(--primary);
}

.bg-secondary {
  background-color: var(--secondary);
}

.bg-gradient {
  background: var(--gradient);
}

.text-primary {
  color: var(--primary);
}

.text-secondary {
  color: var(--secondary);
}

.border-primary {
  border-color: var(--primary);
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background-color: var(--secondary);
  color: white;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: var(--secondary-dark);
}
```

---

### **2. JavaScript Theme Switcher**

**File:** `country-theme-switcher.js`

```javascript
/**
 * BRIDGE55 COUNTRY THEME SWITCHER
 * Dynamically switch between country themes
 */

// Country configuration database
const COUNTRY_THEMES = {
  'ci': {
    code: 'ci',
    name: 'Côte d\'Ivoire',
    nameLocal: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    region: 'West Africa',
    currency: 'XOF',
    currencyName: 'West African CFA franc',
    languages: ['fr', 'en'],
    primaryLanguage: 'fr',
    timezone: 'Africa/Abidjan',
    callingCode: '+225',
    domain: 'bridge55.ci',
    colors: {
      primary: '#FF8C00',
      primaryDark: '#E67300',
      primaryLight: '#FFB347',
      secondary: '#00954A',
      secondaryDark: '#006633',
      secondaryLight: '#00B359',
      accent: '#FFFFFF',
      gradient: 'linear-gradient(135deg, #FF8C00 0%, #00954A 100%)'
    },
    featuredDestinations: ['Abidjan', 'Yamoussoukro', 'Grand-Bassam', 'Man', 'Sassandra'],
    paymentMethods: ['orange_money', 'mtn_money', 'moov_money', 'wave', 'card'],
    visaPolicy: 'eVisa available'
  },
  
  'gh': {
    code: 'gh',
    name: 'Ghana',
    nameLocal: 'Ghana',
    flag: '🇬🇭',
    region: 'West Africa',
    currency: 'GHS',
    currencyName: 'Ghanaian cedi',
    languages: ['en'],
    primaryLanguage: 'en',
    timezone: 'Africa/Accra',
    callingCode: '+233',
    domain: 'bridge55.gh',
    colors: {
      primary: '#EF3340',
      primaryDark: '#CE1126',
      primaryLight: '#FF5C67',
      secondary: '#FCD116',
      secondaryDark: '#E6BE00',
      secondaryLight: '#FFDB4D',
      accent: '#006B3F',
      gradient: 'linear-gradient(135deg, #EF3340 0%, #FCD116 50%, #006B3F 100%)'
    },
    featuredDestinations: ['Accra', 'Kumasi', 'Cape Coast', 'Elmina', 'Tamale', 'Mole National Park'],
    paymentMethods: ['mtn_money', 'vodafone_cash', 'airtel_tigo_money', 'card'],
    visaPolicy: 'eVisa available'
  },
  
  'ke': {
    code: 'ke',
    name: 'Kenya',
    nameLocal: 'Kenya',
    flag: '🇰🇪',
    region: 'East Africa',
    currency: 'KES',
    currencyName: 'Kenyan shilling',
    languages: ['en', 'sw'],
    primaryLanguage: 'en',
    timezone: 'Africa/Nairobi',
    callingCode: '+254',
    domain: 'bridge55.ke',
    colors: {
      primary: '#BB0000',
      primaryDark: '#8B0000',
      primaryLight: '#DD0000',
      secondary: '#006600',
      secondaryDark: '#004D00',
      secondaryLight: '#008000',
      accent: '#000000',
      gradient: 'linear-gradient(135deg, #000000 0%, #BB0000 35%, #FFFFFF 50%, #006600 100%)'
    },
    featuredDestinations: ['Nairobi', 'Mombasa', 'Masai Mara', 'Amboseli', 'Diani Beach', 'Lake Nakuru', 'Tsavo', 'Lamu'],
    paymentMethods: ['mpesa', 'airtel_money', 'tkash', 'card'],
    visaPolicy: 'eVisa required (eTA)',
    safariCapital: true
  },
  
  'pan-african': {
    code: 'pan-african',
    name: 'Bridge55',
    nameLocal: 'Bridge55 - Discover Africa',
    flag: '🌍',
    region: 'Pan-African',
    currency: 'USD',
    currencyName: 'US Dollar',
    languages: ['en', 'fr', 'ar', 'pt', 'sw'],
    primaryLanguage: 'en',
    timezone: 'UTC',
    callingCode: null,
    domain: 'bridge55.com',
    colors: {
      primary: '#FF6B35',
      primaryDark: '#E64A19',
      primaryLight: '#FF8A65',
      secondary: '#004E89',
      secondaryDark: '#003366',
      secondaryLight: '#0055A4',
      accent: '#F7B32B',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #004E89 100%)'
    },
    featuredDestinations: ['All 54 African Countries'],
    paymentMethods: ['card', 'mobile_money', 'bank_transfer']
  }
};

/**
 * Set country theme
 * @param {string} countryCode - ISO 3166-1 alpha-2 country code
 */
function setCountryTheme(countryCode) {
  const theme = COUNTRY_THEMES[countryCode] || COUNTRY_THEMES['pan-african'];
  
  // Update data attribute on html element
  document.documentElement.setAttribute('data-country', countryCode);
  
  // Update UI elements
  updateHeaderCountry(theme);
  updateCTAContent(theme);
  updateColorDisplay(theme);
  updateCurrencyDisplay(theme);
  updateLanguageDisplay(theme);
  
  // Store preference
  localStorage.setItem('bridge55_country', countryCode);
  
  // Log theme change
  console.log(`🌍 Bridge55 Theme: ${theme.name}`, theme.colors);
  
  // Trigger custom event for other components
  document.dispatchEvent(new CustomEvent('countryThemeChanged', { 
    detail: { countryCode, theme } 
  }));
  
  return theme;
}

/**
 * Update header country display
 */
function updateHeaderCountry(theme) {
  const flagElement = document.getElementById('current-flag');
  const countryElement = document.getElementById('current-country');
  const regionElement = document.getElementById('country-region');
  
  if (flagElement) flagElement.textContent = theme.flag;
  if (countryElement) countryElement.textContent = theme.name;
  if (regionElement) regionElement.textContent = theme.region;
}

/**
 * Update CTA content based on country
 */
function updateCTAContent(theme) {
  const discoverText = document.getElementById('discoverText');
  if (discoverText) {
    if (theme.code === 'pan-african') {
      discoverText.textContent = 'Discover Africa';
    } else {
      discoverText.textContent = `Discover ${theme.name}`;
    }
  }
}

/**
 * Update color palette display (for demo/admin)
 */
function updateColorDisplay(theme) {
  const displays = {
    'color-primary': theme.colors.primary,
    'color-secondary': theme.colors.secondary,
    'color-primary-dark': theme.colors.primaryDark,
    'color-primary-light': theme.colors.primaryLight
  };
  
  Object.entries(displays).forEach(([id, color]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = color;
  });
}

/**
 * Update currency display
 */
function updateCurrencyDisplay(theme) {
  const currencyElement = document.querySelector('.currency-selector');
  if (currencyElement) {
    currencyElement.textContent = theme.currency;
    currencyElement.setAttribute('data-currency', theme.currency);
  }
}

/**
 * Update language display
 */
function updateLanguageDisplay(theme) {
  const languageElement = document.querySelector('.language-selector');
  if (languageElement) {
    const primaryLang = theme.primaryLanguage.toUpperCase();
    languageElement.textContent = primaryLang;
    languageElement.setAttribute('data-language', primaryLang);
  }
}

/**
 * Detect country from domain or subdomain
 */
function detectCountryFromDomain() {
  const hostname = window.location.hostname;
  
  // Check for country-specific subdomain/domain
  // bridge55.ci → ci
  // bridge55.gh → gh
  // bridge55.ke → ke
  const domainMatch = hostname.match(/bridge55\.([a-z]{2})$/i);
  
  if (domainMatch) {
    return domainMatch[1].toLowerCase();
  }
  
  // Default to pan-african for bridge55.com
  return 'pan-african';
}

/**
 * Initialize theme on page load
 */
function initializeCountryTheme() {
  // 1. Check URL parameter (?country=ci)
  const urlParams = new URLSearchParams(window.location.search);
  const urlCountry = urlParams.get('country');
  
  // 2. Check localStorage
  const savedCountry = localStorage.getItem('bridge55_country');
  
  // 3. Detect from domain
  const domainCountry = detectCountryFromDomain();
  
  // Priority: URL > localStorage > Domain > Default
  const countryCode = urlCountry || savedCountry || domainCountry || 'pan-african';
  
  // Apply theme
  setCountryTheme(countryCode);
}

/**
 * Get current theme
 */
function getCurrentTheme() {
  const countryCode = document.documentElement.getAttribute('data-country') || 'pan-african';
  return COUNTRY_THEMES[countryCode];
}

/**
 * Get all available countries
 */
function getAvailableCountries() {
  return Object.keys(COUNTRY_THEMES).filter(code => code !== 'pan-african');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCountryTheme);
} else {
  initializeCountryTheme();
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setCountryTheme,
    getCurrentTheme,
    getAvailableCountries,
    COUNTRY_THEMES
  };
}
```

---

## 📋 EXPANSION ROADMAP (51 More Countries)

### **TIER 2: HIGH-PRIORITY COUNTRIES (Next 7)**

| Country | Code | Region | Priority | Rationale |
|---------|------|--------|----------|-----------|
| **South Africa** | ZA | Southern | High | Major tourism hub, English-speaking |
| **Morocco** | MA | North | High | Popular destination, gateway to Africa |
| **Tanzania** | TZ | East | High | Serengeti, Zanzibar, safari tourism |
| **Egypt** | EG | North | High | Ancient tourism, Red Sea resorts |
| **Nigeria** | NG | West | High | Largest population, economic powerhouse |
| **Senegal** | SN | West | High | Cultural hub, francophone |
| **Ethiopia** | ET | East | High | Ancient culture, unique attractions |

### **TIER 3: MEDIUM-PRIORITY COUNTRIES (Next 14)**

Rwanda, Uganda, Botswana, Namibia, Zimbabwe, Zambia, Malawi, Mozambique, Mauritius, Seychelles, Tunisia, Algeria, Cameroon, DRC

### **TIER 4: REMAINING COUNTRIES (30)**

All other African nations, added based on demand and partnership agreements.

---

## 🔧 USAGE EXAMPLES

### **Example 1: Automatic Theme Detection**

```html
<!-- User visits bridge55.ci -->
<!-- Automatically applies Côte d'Ivoire theme -->
<html data-country="ci">
  <!-- Orange and green colors throughout -->
</html>
```

### **Example 2: Manual Theme Switching**

```javascript
// Switch to Ghana theme
setCountryTheme('gh');

// Get current theme
const theme = getCurrentTheme();
console.log(theme.name); // "Ghana"
console.log(theme.colors.primary); // "#EF3340"
```

### **Example 3: Country Selector UI**

```html
<div class="country-selector">
  <button onclick="setCountryTheme('ci')">
    🇨🇮 Côte d'Ivoire
  </button>
  <button onclick="setCountryTheme('gh')">
    🇬🇭 Ghana
  </button>
  <button onclick="setCountryTheme('ke')">
    🇰🇪 Kenya
  </button>
  <button onclick="setCountryTheme('pan-african')">
    🌍 Pan-African
  </button>
</div>
```

---

## 📊 DATABASE INTEGRATION

### **Table: `country_themes`**

```sql
CREATE TABLE country_themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_code CHAR(2) UNIQUE NOT NULL,
  country_name VARCHAR(255) NOT NULL,
  country_name_local VARCHAR(255),
  flag_emoji VARCHAR(10),
  region VARCHAR(100),
  currency CHAR(3),
  currency_name VARCHAR(255),
  languages TEXT[],
  primary_language CHAR(2),
  timezone VARCHAR(100),
  calling_code VARCHAR(10),
  domain VARCHAR(255) UNIQUE,
  
  -- Theme colors
  theme_config JSONB NOT NULL,
  
  -- Metadata
  tenant_id UUID REFERENCES tenants(id),
  is_active BOOLEAN DEFAULT true,
  launch_priority INTEGER DEFAULT 999,
  launch_date DATE,
  
  -- SEO & Marketing
  featured_destinations TEXT[],
  payment_methods TEXT[],
  tourist_highlights TEXT[],
  visa_policy TEXT,
  best_time_to_visit TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial 3 countries
INSERT INTO country_themes (country_code, country_name, country_name_local, flag_emoji, region, currency, currency_name, languages, primary_language, timezone, calling_code, domain, theme_config, launch_priority, featured_destinations, payment_methods, visa_policy, best_time_to_visit) VALUES
(
  'CI',
  'Côte d''Ivoire',
  'Côte d''Ivoire',
  '🇨🇮',
  'West Africa',
  'XOF',
  'West African CFA franc',
  ARRAY['fr', 'en'],
  'fr',
  'Africa/Abidjan',
  '+225',
  'bridge55.ci',
  '{
    "primary": "#FF8C00",
    "primaryDark": "#E67300",
    "primaryLight": "#FFB347",
    "secondary": "#00954A",
    "secondaryDark": "#006633",
    "secondaryLight": "#00B359",
    "accent": "#FFFFFF",
    "gradient": "linear-gradient(135deg, #FF8C00 0%, #00954A 100%)"
  }'::jsonb,
  1,
  ARRAY['Abidjan', 'Yamoussoukro', 'Grand-Bassam', 'Man', 'Sassandra'],
  ARRAY['orange_money', 'mtn_money', 'moov_money', 'wave', 'card'],
  'eVisa available',
  'November to March (Dry season)'
),
(
  'GH',
  'Ghana',
  'Ghana',
  '🇬🇭',
  'West Africa',
  'GHS',
  'Ghanaian cedi',
  ARRAY['en'],
  'en',
  'Africa/Accra',
  '+233',
  'bridge55.gh',
  '{
    "primary": "#EF3340",
    "primaryDark": "#CE1126",
    "primaryLight": "#FF5C67",
    "secondary": "#FCD116",
    "secondaryDark": "#E6BE00",
    "secondaryLight": "#FFDB4D",
    "accent": "#006B3F",
    "gradient": "linear-gradient(135deg, #EF3340 0%, #FCD116 50%, #006B3F 100%)"
  }'::jsonb,
  2,
  ARRAY['Accra', 'Kumasi', 'Cape Coast', 'Elmina', 'Tamale', 'Mole National Park'],
  ARRAY['mtn_money', 'vodafone_cash', 'airtel_tigo_money', 'card'],
  'eVisa available',
  'November to April (Dry season)'
),
(
  'KE',
  'Kenya',
  'Kenya',
  '🇰🇪',
  'East Africa',
  'KES',
  'Kenyan shilling',
  ARRAY['en', 'sw'],
  'en',
  'Africa/Nairobi',
  '+254',
  'bridge55.ke',
  '{
    "primary": "#BB0000",
    "primaryDark": "#8B0000",
    "primaryLight": "#DD0000",
    "secondary": "#006600",
    "secondaryDark": "#004D00",
    "secondaryLight": "#008000",
    "accent": "#000000",
    "gradient": "linear-gradient(135deg, #000000 0%, #BB0000 35%, #FFFFFF 50%, #006600 100%)"
  }'::jsonb,
  3,
  ARRAY['Nairobi', 'Mombasa', 'Masai Mara', 'Amboseli', 'Diani Beach', 'Lake Nakuru', 'Tsavo', 'Lamu'],
  ARRAY['mpesa', 'airtel_money', 'tkash', 'card'],
  'eVisa required (eTA)',
  'June to October (Great Migration), January to February'
);
```

---

## 🎯 NEXT STEPS

1. **Review & Approve** this branding system
2. **Implement** CSS and JavaScript files
3. **Test** theme switching functionality
4. **Expand** to Tier 2 countries (7 more)
5. **Iterate** based on user feedback

---

## 📝 NOTES

- **Scalability:** System designed to handle all 54 African countries
- **Flexibility:** Easy to add new countries via database or config file
- **Performance:** CSS variables ensure instant theme switching
- **Consistency:** All countries follow same structure and pattern
- **Localization:** Support for multiple languages per country

---

**Last Updated:** November 28, 2025  
**Maintained By:** Bridge55 Development Team  
**Version:** 1.0 - 3 Countries (CI, GH, KE)



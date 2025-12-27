# Bridge55 Localization & Accessibility API Documentation

## Version: 2.0
## Last Updated: December 13, 2025

> **AFRICAN CONTEXT DIFFERENTIATORS** - These features are non-negotiable for Bridge55:
> - 🌤️ Weather widget (safari/travel planning)
> - 🕐 Local time display (timezone awareness)
> - 🔊 Voice output (for non-readers)
> - 📴 Offline mode (low-connectivity regions)
> - ♿ Accessibility toolbar (high contrast for outdoor use)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Auto-Detection Features](#auto-detection-features)
3. [Translation API Recommendations](#translation-api-recommendations)
4. [Voice Input API (Accessibility)](#voice-input-api-accessibility)
5. [User Profile Settings Integration](#user-profile-settings-integration)
6. [Implementation Guide](#implementation-guide)
7. [API Endpoints Specification](#api-endpoints-specification)

---

## 🌍 Overview

Bridge55's unique Pan-African platform requires robust localization and accessibility features. This document outlines the APIs and implementation strategies for:

- **Multi-language support** (English, French, Arabic, Portuguese, Kiswahili)
- **Country-based branding** (12 African countries)
- **Auto-detection** (geolocation + device language)
- **Voice input** (accessibility for users who cannot type)
- **Manual override** with profile settings persistence

### Key Differentiator
> No other African travel platform offers automatic country/language detection with seamless manual override. Bridge55 users can explore Pan-African or dive into country-specific experiences with one click.

---

## 🔍 Auto-Detection Features

### 1. Geolocation Detection

**Implementation Status**: ✅ Implemented in Global Header v3.1

```javascript
// Uses OpenStreetMap Nominatim (Free, No API Key Required)
async function autoDetectLocation() {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return data.address.country_code; // Returns ISO 3166-1 alpha-2
}
```

**Supported Countries**:
| ISO Code | Bridge55 Code | Country |
|----------|---------------|---------|
| CI | ci | Côte d'Ivoire |
| EG | eg | Egypt |
| GH | gh | Ghana |
| KE | ke | Kenya |
| MA | ma | Morocco |
| NG | ng | Nigeria |
| RW | rw | Rwanda |
| ZA | za | South Africa |
| TZ | tz | Tanzania |
| UG | ug | Uganda |
| ZM | zm | Zambia |

**Fallback**: If country not in network → Pan-African view

### 2. Device Language Detection

**Implementation Status**: ✅ Implemented in Global Header v3.1

```javascript
function detectDeviceLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    // Maps to: en, fr, ar, pt, sw
    return langCode;
}
```

---

## 🌐 Translation API Recommendations

### Recommended APIs (Production-Ready)

#### 1. **Google Cloud Translation API** (Recommended)
- **Pros**: Highest accuracy, 100+ languages, real-time
- **Cons**: Cost ($20 per 1M characters)
- **Best For**: Production with high traffic
- **Endpoint**: `https://translation.googleapis.com/language/translate/v2`

```javascript
// Example Integration
async function translateText(text, targetLang) {
    const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        {
            method: 'POST',
            body: JSON.stringify({
                q: text,
                target: targetLang,
                format: 'text'
            })
        }
    );
    return response.json();
}
```

#### 2. **DeepL API** (Best Quality)
- **Pros**: Superior translation quality, especially FR/EN/PT
- **Cons**: Limited African languages
- **Best For**: High-quality European language translations
- **Free Tier**: 500,000 characters/month

#### 3. **Microsoft Translator Text API** (Azure)
- **Pros**: Good Arabic support, Kiswahili available
- **Cons**: Requires Azure subscription
- **Best For**: Enterprise with existing Azure infrastructure

#### 4. **LibreTranslate** (Open Source)
- **Pros**: Free, self-hosted, no API limits
- **Cons**: Lower quality than commercial options
- **Best For**: Development/testing, cost-sensitive deployment

### Bridge55-Specific Implementation

```javascript
// Recommended Translation Service Wrapper
class Bridge55Translator {
    constructor(apiKey, provider = 'google') {
        this.apiKey = apiKey;
        this.provider = provider;
        this.cache = new Map(); // Cache translations
    }
    
    async translate(text, targetLang, sourceLang = 'en') {
        const cacheKey = `${sourceLang}:${targetLang}:${text}`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        // Call translation API
        const translated = await this.callAPI(text, targetLang, sourceLang);
        
        // Cache result
        this.cache.set(cacheKey, translated);
        return translated;
    }
    
    async translatePage(targetLang) {
        // Get all translatable elements
        const elements = document.querySelectorAll('[data-translate]');
        
        for (const el of elements) {
            const originalText = el.dataset.originalText || el.textContent;
            el.dataset.originalText = originalText;
            el.textContent = await this.translate(originalText, targetLang);
        }
    }
}
```

### Cost Estimation (Monthly)

| Provider | 1M chars | 5M chars | 10M chars |
|----------|----------|----------|-----------|
| Google | $20 | $100 | $200 |
| DeepL | $25 | $125 | $250 |
| Microsoft | $10 | $50 | $100 |
| LibreTranslate | Free | Free | Free |

**Recommendation**: Start with Google Cloud Translation for production, use LibreTranslate for development.

---

## 🎙️ Voice Input API (Accessibility)

### Implementation Status: ✅ Implemented in Global Header v3.1

### Web Speech API (Built-in Browser)

```javascript
// Already implemented in global-header.html
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = true;
recognition.lang = 'en-US'; // or user's language

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    // Send to Dia AI or search
};

recognition.start();
```

### Browser Support
| Browser | Support |
|---------|---------|
| Chrome (Desktop/Android) | ✅ Full |
| Safari (iOS/macOS) | ✅ Full |
| Edge | ✅ Full |
| Firefox | ⚠️ Partial |
| Opera | ✅ Full |

### Voice Input Event System

```javascript
// Other components can listen for voice input
window.addEventListener('bridge55-voice-input', (event) => {
    const { transcript, isFinal } = event.detail;
    
    if (isFinal) {
        // Complete voice command - process it
        processVoiceCommand(transcript);
    } else {
        // Interim result - show live transcription
        showLiveTranscription(transcript);
    }
});
```

### Integration with Dia AI

```javascript
// In ai/concierge.html
window.addEventListener('bridge55-voice-input', (event) => {
    if (event.detail.isFinal) {
        const message = event.detail.transcript;
        // Populate the chat input
        document.getElementById('chatInput').value = message;
        // Optionally auto-send
        // sendMessage();
    }
});
```

### Accessibility Features

1. **Visual Indicator**: Pulsing microphone icon when listening
2. **Audio Feedback**: Optional beep when recording starts/stops
3. **Error Handling**: Clear messages if microphone access denied
4. **Language Matching**: Uses user's selected language for recognition

---

## 👤 User Profile Settings Integration

### Settings to Save

```javascript
// User preferences stored in localStorage and synced to profile
const userPreferences = {
    // Localization
    country: 'ke',           // Kenya
    language: 'en',          // English
    currency: 'KES',         // Kenyan Shilling
    
    // Manual override flags
    countryManual: true,     // User explicitly chose this
    languageManual: false,   // Auto-detected
    currencyManual: true,    // User explicitly chose this
    
    // Accessibility
    voiceInputEnabled: true,
    highContrastMode: false,
    textSize: 'medium'       // small, medium, large
};
```

### Profile Settings UI Requirements

Create in `user/profile.html` under "Preferences" section:

```html
<!-- Regional Settings -->
<div class="settings-section">
    <h4>Regional Preferences</h4>
    
    <div class="setting-item">
        <label>Default Country</label>
        <select id="prefCountry">
            <option value="pan-african">🌍 Pan-African (Explore All)</option>
            <option value="ke">🇰🇪 Kenya</option>
            <option value="ng">🇳🇬 Nigeria</option>
            <!-- ... all 12 countries -->
        </select>
        <p class="hint">Auto-detected based on your location. Change to customize.</p>
    </div>
    
    <div class="setting-item">
        <label>Language</label>
        <select id="prefLanguage">
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="ar">🇸🇦 العربية</option>
            <option value="pt">🇵🇹 Português</option>
            <option value="sw">🇹🇿 Kiswahili</option>
        </select>
        <p class="hint">Auto-detected from your device. Change to customize.</p>
    </div>
    
    <div class="setting-item">
        <label>Currency</label>
        <select id="prefCurrency">
            <option value="USD">🇺🇸 USD - US Dollar</option>
            <option value="KES">🇰🇪 KES - Kenyan Shilling</option>
            <!-- ... all currencies -->
        </select>
    </div>
</div>

<!-- Accessibility Settings -->
<div class="settings-section">
    <h4>Accessibility</h4>
    
    <div class="setting-item toggle">
        <label>Voice Input (Talk to Dia)</label>
        <input type="checkbox" id="voiceInputEnabled" checked>
        <p class="hint">Enable microphone for voice commands and search.</p>
    </div>
    
    <div class="setting-item toggle">
        <label>High Contrast Mode</label>
        <input type="checkbox" id="highContrastMode">
    </div>
    
    <div class="setting-item">
        <label>Text Size</label>
        <select id="textSize">
            <option value="small">Small</option>
            <option value="medium" selected>Medium</option>
            <option value="large">Large</option>
        </select>
    </div>
</div>
```

### JavaScript Integration

```javascript
// Save preferences from profile page
function savePreferences() {
    const prefs = {
        country: document.getElementById('prefCountry').value,
        language: document.getElementById('prefLanguage').value,
        currency: document.getElementById('prefCurrency').value,
        voiceInputEnabled: document.getElementById('voiceInputEnabled').checked
    };
    
    // Save to localStorage
    Object.keys(prefs).forEach(key => {
        localStorage.setItem(`bridge55-${key}`, prefs[key]);
        localStorage.setItem(`bridge55-${key}-manual`, 'true');
    });
    
    // Apply immediately
    Bridge55.setCountry(prefs.country);
    Bridge55.setLanguage(prefs.language);
    Bridge55.setCurrency(prefs.currency);
    
    // Sync to backend (when user is logged in)
    if (isLoggedIn) {
        syncPreferencesToBackend(prefs);
    }
}
```

---

## 🛠️ Implementation Guide

### Phase 1: Current State (✅ Complete)
- Auto-detection via geolocation
- Device language detection
- localStorage persistence
- Voice input Web Speech API
- Manual override support

### Phase 2: Backend Integration (Planned)
1. User preferences API endpoint
2. Sync preferences across devices
3. Translation API integration
4. Voice-to-text fallback (Google Cloud Speech)

### Phase 3: Advanced Features (Future)
1. Real-time translation for user-generated content
2. Voice output (text-to-speech) for Dia responses
3. Offline language packs
4. Regional content recommendations

---

## 📡 API Endpoints Specification

### Preferences API

```yaml
# Get User Preferences
GET /api/v1/user/preferences
Response:
  country: "ke"
  language: "en"
  currency: "KES"
  voiceEnabled: true
  autoDetect: false

# Update User Preferences
PUT /api/v1/user/preferences
Body:
  country: "ng"
  language: "en"
  currency: "NGN"
Response:
  success: true
  message: "Preferences updated"

# Reset to Auto-Detect
DELETE /api/v1/user/preferences/manual
Response:
  success: true
  message: "Preferences reset to auto-detect"
```

### Translation API Proxy

```yaml
# Translate Text (Uses configured translation provider)
POST /api/v1/translate
Body:
  text: "Book a flight to Nairobi"
  targetLang: "fr"
  sourceLang: "en" # optional
Response:
  translation: "Réserver un vol pour Nairobi"
  detectedLang: "en"
  confidence: 0.98

# Translate Page Elements (Batch)
POST /api/v1/translate/batch
Body:
  texts: ["Home", "Search", "My Trips"]
  targetLang: "sw"
Response:
  translations: ["Nyumbani", "Tafuta", "Safari Zangu"]
```

### Voice Input API (Server-Side Fallback)

```yaml
# Transcribe Audio (When browser API unavailable)
POST /api/v1/voice/transcribe
Headers:
  Content-Type: audio/wav
Body: <binary audio data>
Response:
  transcript: "Find hotels in Cape Town"
  confidence: 0.95
  language: "en"
```

---

## 🔐 Security Considerations

1. **API Key Protection**: Never expose translation API keys in frontend
2. **Rate Limiting**: Implement rate limits on translation endpoints
3. **Audio Data**: Voice recordings should not be stored permanently
4. **GDPR Compliance**: Clear consent for geolocation and voice input
5. **Data Minimization**: Only store preferences, not detection history

---

## 📊 Analytics & Monitoring

Track these metrics for localization success:

1. **Language Distribution**: Which languages are most used?
2. **Country Detection Accuracy**: How often do users override?
3. **Voice Input Adoption**: % of users using voice features
4. **Translation Quality**: User feedback/corrections
5. **Accessibility Usage**: High contrast, text size preferences

---

## 📝 Changelog

### v3.1 (December 13, 2025)
- Added auto-detection for country and language
- Implemented Web Speech API for voice input
- Created manual override with profile persistence
- Documented recommended translation APIs

### v3.0 (December 12, 2025)
- Initial localization framework
- Country selector with 12 African countries
- Language and currency selectors

---

## 🌤️ Weather Widget

### Implementation Status: ✅ Implemented in Global Header v3.2

Uses **Open-Meteo API** (free, no API key required):

```javascript
// Fetch weather for selected country
async function fetchWeather(countryCode) {
    const coords = cityCoords[countryCode]; // Pre-defined coordinates
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`
    );
    // Returns temperature, weather code, wind speed
}
```

**UI Design**: Subtle display in header, expands on hover with full details.

---

## 🕐 Time Zone Display

### Implementation Status: ✅ Implemented in Global Header v3.2

Uses browser's `Intl.DateTimeFormat` with IANA timezone database:

```javascript
const options = { 
    timeZone: 'Africa/Nairobi', // Based on selected country
    hour: '2-digit',
    minute: '2-digit'
};
const localTime = new Date().toLocaleTimeString('en-US', options);
```

**Supported Timezones**:
| Country | Timezone | Capital |
|---------|----------|---------|
| Côte d'Ivoire | Africa/Abidjan | Abidjan |
| Egypt | Africa/Cairo | Cairo |
| Ghana | Africa/Accra | Accra |
| Kenya | Africa/Nairobi | Nairobi |
| Morocco | Africa/Casablanca | Rabat |
| Nigeria | Africa/Lagos | Lagos |
| Rwanda | Africa/Kigali | Kigali |
| South Africa | Africa/Johannesburg | Johannesburg |
| Tanzania | Africa/Dar_es_Salaam | Dar es Salaam |
| Uganda | Africa/Kampala | Kampala |
| Zambia | Africa/Lusaka | Lusaka |

---

## 📴 Offline Mode

### Implementation Status: ✅ Implemented with Service Worker

**Files Created**:
- `/sw.js` - Service Worker for caching
- `/pages/offline.html` - Offline fallback page

### Cached Resources
1. Static HTML pages (index, about, contact, FAQ)
2. CSS and JavaScript files
3. Font files and icons
4. Language packs
5. User's booking confirmations

### Offline Features
- View saved bookings
- Access boarding passes & e-tickets
- Browse cached destinations
- View travel documents

```javascript
// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

// Cache booking for offline access
window.addEventListener('bridge55-cache-booking', (event) => {
    navigator.serviceWorker.controller.postMessage({
        action: 'cacheBooking',
        booking: event.detail
    });
});
```

---

## ♿ Accessibility Toolbar

### Implementation Status: ✅ Implemented in Global Header v3.2

**Features**:
| Feature | Description | localStorage Key |
|---------|-------------|------------------|
| High Contrast | Black/white with yellow accents | `bridge55-high-contrast` |
| Text Size | Small / Medium / Large | `bridge55-text-size` |
| Voice Output | Dia speaks responses (TTS) | `bridge55-voice-output` |
| Voice Input | Microphone commands | `bridge55-voice-input` |
| Screen Reader | Enhanced ARIA attributes | `bridge55-screen-reader` |
| Reduce Motion | Disables animations | `bridge55-reduce-motion` |

### UI Location
Floating Action Button (FAB) at bottom-left corner:
- 💙 Blue circular button with accessibility icon
- Opens panel on click
- Toggle switches for each feature

```javascript
// Toggle high contrast
function toggleHighContrast() {
    document.documentElement.classList.toggle('high-contrast');
    localStorage.setItem('bridge55-high-contrast', isActive);
}
```

---

*This document is part of the Bridge55 Platform Architecture. For questions, contact the development team.*


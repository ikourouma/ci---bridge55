# Airline Logos & IATA Codes API Reference

## Overview
This document contains references to free airline logo resources and IATA code databases for the Bridge55 platform.

---

## 1. Airline Logos CDN (RECOMMENDED)

### Primary Source - pics.avs.io
**CDN URL Pattern**:
```
https://pics.avs.io/{width}/{height}/{IATA_CODE}.png
```

**Available Sizes**:
- Small: `https://pics.avs.io/32/32/{IATA}.png`
- Medium: `https://pics.avs.io/60/60/{IATA}.png`
- Large: `https://pics.avs.io/100/100/{IATA}.png`
- Extra Large: `https://pics.avs.io/200/200/{IATA}.png`

**Example**:
- Kenya Airways (KQ): `https://pics.avs.io/60/60/KQ.png`
- Emirates (EK): `https://pics.avs.io/60/60/EK.png`
- Ethiopian Airlines (ET): `https://pics.avs.io/60/60/ET.png`

**Advantages**:
- ✅ Reliable CDN with high availability
- ✅ Supports all major airlines worldwide
- ✅ Multiple size options
- ✅ Fast loading times
- ✅ Properly formatted PNG images

### Alternative Source - AirHex
**CDN URL Pattern**:
```
https://content.airhex.com/content/logos/airlines_{IATA}_{width}_{height}.png
```

### Backup Source - GitHub
**GitHub Repository**: [sexym0nk3y/airline-logos](https://github.com/sexym0nk3y/airline-logos)
**URL Pattern**: `https://raw.githubusercontent.com/sexym0nk3y/airline-logos/main/logos/{IATA_CODE}.png`

**Note**: GitHub repository may not have all airlines and is less reliable than CDN options.

---

## 2. IATA Airline Codes Database

### Primary Reference
**GitHub Repository**: [nilesh121196/aircaterpillar](https://github.com/nilesh121196/aircaterpillar/blob/master/public/iataAirline.js)

### African Airlines IATA Codes

| Airline | IATA Code | Country |
|---------|-----------|---------|
| Ethiopian Airlines | ET | Ethiopia |
| Kenya Airways | KQ | Kenya |
| South African Airways | SA | South Africa |
| Royal Air Maroc | AT | Morocco |
| EgyptAir | MS | Egypt |
| RwandAir | WB | Rwanda |
| Air Senegal | HC | Senegal |
| Air Côte d'Ivoire | HF | Côte d'Ivoire |
| ASKY Airlines | KP | Togo |
| Air Tanzania | TC | Tanzania |
| Uganda Airlines | UR | Uganda |
| Air Mauritius | MK | Mauritius |
| Tunisair | TU | Tunisia |
| Air Algérie | AH | Algeria |
| Precision Air | PW | Tanzania |
| Jambojet | JM | Kenya |
| FlySafair | FA | South Africa |

### International Airlines Flying to Africa

| Airline | IATA Code | Country |
|---------|-----------|---------|
| Emirates | EK | UAE |
| Qatar Airways | QR | Qatar |
| Turkish Airlines | TK | Turkey |
| Air France | AF | France |
| British Airways | BA | UK |
| KLM | KL | Netherlands |
| Lufthansa | LH | Germany |
| Delta Air Lines | DL | USA |
| United Airlines | UA | USA |
| Brussels Airlines | SN | Belgium |

---

## 3. Implementation in Bridge55

### JavaScript Usage
```javascript
// Base URL for airline logos (pics.avs.io CDN)
const AIRLINE_LOGO_BASE = 'https://pics.avs.io/60/60';

// Get logo URL
function getAirlineLogo(iataCode) {
    return `${AIRLINE_LOGO_BASE}/${iataCode}.png`;
}

// Example usage
const kenyaAirwaysLogo = getAirlineLogo('KQ');
// Returns: https://pics.avs.io/60/60/KQ.png
```

### Fallback Strategy
```javascript
// Handle missing logos with fallback
function getAirlineLogoWithFallback(iataCode, airlineName) {
    const primaryUrl = `${AIRLINE_LOGO_BASE}/${iataCode}.png`;
    const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(airlineName)}&background=FF6B35&color=fff&size=48`;
    
    return primaryUrl;
}

// Image error handling in HTML
<img src="${logo}" onerror="this.src='fallback.png'" alt="${airlineName}">
```

---

## 4. Logo Specifications

### Recommended Sizes
- **Carousel/List View**: 48x48px
- **Flight Card**: 32x32px
- **Details Page**: 64x64px
- **Confirmation/E-ticket**: 80x80px

### CSS Styling
```css
.airline-logo {
    width: 48px;
    height: 48px;
    object-fit: contain;
    border-radius: 8px;
    background: white;
    padding: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

---

## 5. API Rate Limits & Caching

### GitHub Raw Content
- No authentication required
- No rate limits for reasonable usage
- Recommend caching logos locally or using CDN

### Recommended Caching Strategy
```javascript
// Cache logos in localStorage
function cacheAirlineLogo(iataCode, logoUrl) {
    const cache = JSON.parse(localStorage.getItem('airlineLogos') || '{}');
    cache[iataCode] = logoUrl;
    localStorage.setItem('airlineLogos', JSON.stringify(cache));
}
```

---

## 6. Future Enhancements

### Planned Integrations
1. **Amadeus API** - Official airline data with logos
2. **FlightAware** - Real-time flight data with airline info
3. **Aviation Edge** - Comprehensive airline database

### Self-Hosted Solution
Consider hosting logos on Bridge55 CDN for:
- Faster loading times in Africa
- No dependency on external services
- Custom logo sizes and formats

---

## 7. Legal Considerations

- Airline logos are trademarks of their respective owners
- Usage is permitted for informational/booking purposes
- Always link to official airline websites
- Consider obtaining official partnership agreements for commercial use

---

*Last Updated: December 2025*
*Document Version: 1.0*


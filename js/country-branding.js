/**
 * Bridge55 Country Branding System
 * Maintains consistent country theming across all pages
 * Adapts to user's geolocation with ability to change anytime
 */

const Bridge55Country = {
    // Country configurations
    countries: {
        'pan-african': {
            name: 'Pan-African',
            flag: '🌍',
            primary: '#FF6B35',
            primaryDark: '#E55A2B',
            secondary: '#004E89',
            gradient: 'linear-gradient(135deg, #FF6B35 0%, #004E89 100%)',
            currency: 'USD',
            currencySymbol: '$',
            phone: '+1',
            language: 'en'
        },
        'ke': {
            name: 'Kenya',
            flag: '🇰🇪',
            primary: '#BB0000',
            primaryDark: '#8B0000',
            secondary: '#006600',
            gradient: 'linear-gradient(135deg, #000000 0%, #BB0000 35%, #006600 100%)',
            currency: 'KES',
            currencySymbol: 'KSh',
            phone: '+254',
            language: 'en',
            mobileMoneyDefault: 'mpesa'
        },
        'gh': {
            name: 'Ghana',
            flag: '🇬🇭',
            primary: '#EF3340',
            primaryDark: '#CE1126',
            secondary: '#FCD116',
            gradient: 'linear-gradient(135deg, #EF3340 0%, #FCD116 50%, #006B3F 100%)',
            currency: 'GHS',
            currencySymbol: 'GH₵',
            phone: '+233',
            language: 'en',
            mobileMoneyDefault: 'mtn'
        },
        'ci': {
            name: 'Côte d\'Ivoire',
            flag: '🇨🇮',
            primary: '#FF8C00',
            primaryDark: '#E67300',
            secondary: '#00954A',
            gradient: 'linear-gradient(135deg, #FF8C00 0%, #00954A 100%)',
            currency: 'XOF',
            currencySymbol: 'CFA',
            phone: '+225',
            language: 'fr',
            mobileMoneyDefault: 'orange'
        },
        'ma': {
            name: 'Morocco',
            flag: '🇲🇦',
            primary: '#C1272D',
            primaryDark: '#A01F24',
            secondary: '#006233',
            gradient: 'linear-gradient(135deg, #C1272D 0%, #006233 100%)',
            currency: 'MAD',
            currencySymbol: 'DH',
            phone: '+212',
            language: 'fr',
            mobileMoneyDefault: 'card'
        },
        'ng': {
            name: 'Nigeria',
            flag: '🇳🇬',
            primary: '#008751',
            primaryDark: '#006B3F',
            secondary: '#FFFFFF',
            gradient: 'linear-gradient(135deg, #008751 0%, #006B3F 100%)',
            currency: 'NGN',
            currencySymbol: '₦',
            phone: '+234',
            language: 'en',
            mobileMoneyDefault: 'card'
        },
        'za': {
            name: 'South Africa',
            flag: '🇿🇦',
            primary: '#007749',
            primaryDark: '#005C38',
            secondary: '#FFB81C',
            gradient: 'linear-gradient(135deg, #007749 0%, #FFB81C 100%)',
            currency: 'ZAR',
            currencySymbol: 'R',
            phone: '+27',
            language: 'en',
            mobileMoneyDefault: 'card'
        },
        'ug': {
            name: 'Uganda',
            flag: '🇺🇬',
            primary: '#FCDC04',
            primaryDark: '#D4B800',
            secondary: '#000000',
            gradient: 'linear-gradient(135deg, #000000 0%, #FCDC04 50%, #D90000 100%)',
            currency: 'UGX',
            currencySymbol: 'USh',
            phone: '+256',
            language: 'en',
            mobileMoneyDefault: 'mtn'
        },
        'tz': {
            name: 'Tanzania',
            flag: '🇹🇿',
            primary: '#1EB53A',
            primaryDark: '#169030',
            secondary: '#00A3DD',
            gradient: 'linear-gradient(135deg, #1EB53A 0%, #00A3DD 100%)',
            currency: 'TZS',
            currencySymbol: 'TSh',
            phone: '+255',
            language: 'sw',
            mobileMoneyDefault: 'mpesa'
        },
        'rw': {
            name: 'Rwanda',
            flag: '🇷🇼',
            primary: '#00A1DE',
            primaryDark: '#0080B0',
            secondary: '#FAD201',
            gradient: 'linear-gradient(135deg, #00A1DE 0%, #FAD201 100%)',
            currency: 'RWF',
            currencySymbol: 'FRw',
            phone: '+250',
            language: 'en',
            mobileMoneyDefault: 'mtn'
        }
    },

    // Storage key
    STORAGE_KEY: 'bridge55-country',

    /**
     * Initialize country branding on page load
     */
    init: function() {
        // Try to get saved country or detect from browser
        let country = this.getSavedCountry();
        
        if (!country) {
            country = this.detectCountry();
            this.saveCountry(country);
        }
        
        this.applyBranding(country);
        this.setupCountrySelector();
        
        console.log('🌍 Bridge55 Country Branding initialized:', country);
        return country;
    },

    /**
     * Get saved country from localStorage
     */
    getSavedCountry: function() {
        try {
            return localStorage.getItem(this.STORAGE_KEY);
        } catch (e) {
            console.warn('localStorage not available');
            return null;
        }
    },

    /**
     * Save country to localStorage
     */
    saveCountry: function(countryCode) {
        try {
            localStorage.setItem(this.STORAGE_KEY, countryCode);
            // Also save to sessionStorage for current session
            sessionStorage.setItem(this.STORAGE_KEY, countryCode);
        } catch (e) {
            console.warn('Storage not available');
        }
    },

    /**
     * Detect country from browser settings (simulated)
     * In production, use IPinfo.io or similar service
     */
    detectCountry: function() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const urlCountry = urlParams.get('country');
        if (urlCountry && this.countries[urlCountry]) {
            return urlCountry;
        }

        // Check browser language for hints
        const lang = navigator.language || navigator.userLanguage || 'en';
        
        // French speakers might be CI or MA
        if (lang.startsWith('fr')) {
            return 'ci'; // Default to Côte d'Ivoire for French
        }
        
        // Swahili speakers likely KE or TZ
        if (lang.startsWith('sw')) {
            return 'ke';
        }

        // Default to pan-african
        return 'pan-african';
    },

    /**
     * Apply branding to the current page
     */
    applyBranding: function(countryCode) {
        const country = this.countries[countryCode] || this.countries['pan-african'];
        
        // Set data attribute on HTML element
        document.documentElement.setAttribute('data-country', countryCode);
        
        // Apply CSS variables
        document.documentElement.style.setProperty('--bs-primary', country.primary);
        document.documentElement.style.setProperty('--primary', country.primary);
        document.documentElement.style.setProperty('--primary-dark', country.primaryDark);
        document.documentElement.style.setProperty('--secondary', country.secondary);
        document.documentElement.style.setProperty('--gradient', country.gradient);
        
        // Update any country-specific UI elements
        this.updateCountryUI(countryCode, country);
        
        // Dispatch event for other components to react
        window.dispatchEvent(new CustomEvent('bridge55-country-changed', {
            detail: { countryCode, country }
        }));
        
        return country;
    },

    /**
     * Update UI elements with country info
     */
    updateCountryUI: function(countryCode, country) {
        // Update country selector buttons
        document.querySelectorAll('.country-btn').forEach(btn => {
            btn.classList.remove('active');
            const btnCountry = btn.getAttribute('data-country') || 
                              btn.getAttribute('onclick')?.match(/switchCountry\('([^']+)'\)/)?.[1];
            if (btnCountry === countryCode) {
                btn.classList.add('active');
            }
        });

        // Update logo text if it has country name
        const logoCountryName = document.querySelector('.logo-country-name');
        if (logoCountryName) {
            logoCountryName.textContent = country.name;
        }

        // Update currency displays
        document.querySelectorAll('[data-currency]').forEach(el => {
            el.textContent = country.currencySymbol;
        });

        // Update phone code displays
        document.querySelectorAll('[data-phone-code]').forEach(el => {
            el.textContent = country.phone;
        });

        // Highlight recommended mobile money for the country
        if (country.mobileMoneyDefault) {
            const mmBadge = document.getElementById(`${country.mobileMoneyDefault}-badge`);
            if (mmBadge) {
                mmBadge.style.display = 'inline-block';
                mmBadge.textContent = 'YOUR COUNTRY';
            }
        }
    },

    /**
     * Setup country selector functionality
     */
    setupCountrySelector: function() {
        // Make switchCountry globally available
        window.switchCountry = (countryCode) => {
            this.saveCountry(countryCode);
            this.applyBranding(countryCode);
            console.log('🌍 Country switched to:', countryCode);
        };
    },

    /**
     * Get current country config
     */
    getCurrentCountry: function() {
        const code = this.getSavedCountry() || 'pan-african';
        return {
            code,
            ...this.countries[code]
        };
    },

    /**
     * Generate country selector HTML
     */
    generateSelector: function(style = 'buttons') {
        const current = this.getSavedCountry() || 'pan-african';
        const mainCountries = ['pan-african', 'ke', 'gh', 'ci', 'ma'];
        
        if (style === 'buttons') {
            return mainCountries.map(code => {
                const c = this.countries[code];
                const active = code === current ? 'active' : '';
                return `<button class="country-btn ${active}" data-country="${code}" onclick="switchCountry('${code}')">${c.flag} ${code === 'pan-african' ? 'Pan-African' : code.toUpperCase()}</button>`;
            }).join('');
        }
        
        if (style === 'dropdown') {
            const options = Object.entries(this.countries).map(([code, c]) => {
                const selected = code === current ? 'selected' : '';
                return `<option value="${code}" ${selected}>${c.flag} ${c.name}</option>`;
            }).join('');
            return `<select class="country-select" onchange="switchCountry(this.value)">${options}</select>`;
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Bridge55Country.init());
} else {
    Bridge55Country.init();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Bridge55Country;
}

















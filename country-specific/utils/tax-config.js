/**
 * Tax Configuration - Platform Standard
 * Centralized tax configuration for all pricing calculations
 * 
 * @module tax-config
 */

/**
 * Country-level tax configurations
 * Managed by Super Admin Dashboard
 */
const CountryTaxConfig = {
    'CI': {
        countryCode: 'CI',
        countryName: 'Côte d\'Ivoire',
        taxLabel: 'VAT',
        taxRate: 0.18, // 18%
        currency: 'XOF',
        currencySymbol: 'XOF',
        displayCurrency: '$', // For demo purposes using USD display
        enabled: true
    },
    'DEFAULT': {
        countryCode: 'DEFAULT',
        countryName: 'Default',
        taxLabel: 'Tax',
        taxRate: 0.10, // 10%
        currency: 'USD',
        currencySymbol: '$',
        displayCurrency: '$',
        enabled: true
    }
};

/**
 * Get tax configuration for a country
 * @param {string} countryCode - ISO country code (e.g., 'CI')
 * @returns {Object} Tax configuration object
 */
function getTaxConfig(countryCode = 'CI') {
    return CountryTaxConfig[countryCode] || CountryTaxConfig['DEFAULT'];
}

/**
 * Calculate total price with tax
 * @param {number} basePrice - Base price before tax
 * @param {number} [taxRate] - Optional tax rate override (0-1)
 * @param {string} [countryCode] - Country code for tax config
 * @returns {{basePrice: number, taxAmount: number, total: number, taxRate: number, taxLabel: string}}
 */
function calculateTotalWithTax(basePrice, taxRate = null, countryCode = 'CI') {
    const config = getTaxConfig(countryCode);
    const rate = taxRate !== null ? taxRate : config.taxRate;
    const taxAmount = Math.round(basePrice * rate * 100) / 100;
    const total = Math.round((basePrice + taxAmount) * 100) / 100;
    
    return {
        basePrice: basePrice,
        taxAmount: taxAmount,
        total: total,
        taxRate: rate,
        taxLabel: `${config.taxLabel} (${Math.round(rate * 100)}%)`
    };
}

/**
 * Format price with currency
 * @param {number} amount - Amount to format
 * @param {string} [countryCode] - Country code for currency
 * @returns {string} Formatted price string
 */
function formatPrice(amount, countryCode = 'CI') {
    const config = getTaxConfig(countryCode);
    return `${config.displayCurrency}${amount.toFixed(2)}`;
}

/**
 * Render a price breakdown HTML element
 * @param {number} basePrice - Base price
 * @param {number} [quantity] - Quantity (e.g., number of travelers)
 * @param {string} [countryCode] - Country code
 * @returns {string} HTML string for price breakdown
 */
function renderPriceBreakdown(basePrice, quantity = 1, countryCode = 'CI') {
    const subtotal = basePrice * quantity;
    const taxInfo = calculateTotalWithTax(subtotal, null, countryCode);
    const config = getTaxConfig(countryCode);
    
    return `
        <div class="price-breakdown">
            <div class="price-row">
                <span class="price-label">${config.displayCurrency}${basePrice} × ${quantity}</span>
                <span class="price-value">${config.displayCurrency}${subtotal.toFixed(2)}</span>
            </div>
            <div class="price-row tax-row">
                <span class="price-label">${taxInfo.taxLabel}</span>
                <span class="price-value">${config.displayCurrency}${taxInfo.taxAmount.toFixed(2)}</span>
            </div>
            <div class="price-row total-row">
                <span class="price-label">Total</span>
                <span class="price-value">${config.displayCurrency}${taxInfo.total.toFixed(2)}</span>
            </div>
        </div>
    `;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        CountryTaxConfig,
        getTaxConfig, 
        calculateTotalWithTax, 
        formatPrice,
        renderPriceBreakdown
    };
}

if (typeof window !== 'undefined') {
    window.TaxHelpers = { 
        CountryTaxConfig,
        getTaxConfig, 
        calculateTotalWithTax, 
        formatPrice,
        renderPriceBreakdown
    };
}




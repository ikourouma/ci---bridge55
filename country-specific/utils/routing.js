/**
 * Canonical Routing Helpers - Platform Standard
 * DO NOT hardcode routes anywhere. Use these helpers.
 * 
 * @module routing
 */

/**
 * Base paths for different entity types
 */
const ROUTES = {
    OPERATOR_DETAILS: 'operator-details.html',
    EXPERIENCE_DETAILS: 'experience-details.html',
    ITINERARY_DETAILS: 'itinerary-details.html',
    REGION_DETAILS: 'region-details.html',
    INTEREST_DETAILS: 'interest-details.html',
    STAY_DETAILS: 'stay-details.html',
    EVENT_DETAILS: 'event-details.html'
};

/**
 * Get the canonical URL for an operator profile page
 * @param {Object} operator - Operator object with id and optional slug
 * @param {string} operator.id - Required operator ID (e.g., 'op-001')
 * @param {string} [operator.slug] - Optional URL-friendly slug
 * @returns {string|null} URL string or null if invalid
 */
function getOperatorUrl(operator) {
    if (!operator || !operator.id) {
        console.warn('[Routing] getOperatorUrl called with missing operator or id', operator);
        return null;
    }
    const id = operator.slug || operator.id;
    return `${ROUTES.OPERATOR_DETAILS}?id=${encodeURIComponent(id)}`;
}

/**
 * Get the canonical URL for a service/experience details page
 * @param {Object} service - Service object with id and type
 * @param {string} service.id - Required service ID
 * @param {string} [service.type] - Service type (experience, stay, event, itinerary)
 * @returns {string|null} URL string or null if invalid
 */
function getServiceUrl(service) {
    if (!service || !service.id) {
        console.warn('[Routing] getServiceUrl called with missing service or id', service);
        return null;
    }
    
    const type = (service.type || 'experience').toLowerCase();
    let basePath = ROUTES.EXPERIENCE_DETAILS;
    
    if (type === 'stay' || type === 'hotel' || type === 'lodge') {
        basePath = ROUTES.STAY_DETAILS;
    } else if (type === 'itinerary') {
        basePath = ROUTES.ITINERARY_DETAILS;
    } else if (type === 'event') {
        basePath = ROUTES.EVENT_DETAILS;
    }
    
    return `${basePath}?id=${encodeURIComponent(service.id)}`;
}

/**
 * Get the canonical URL for a listing (alias for getServiceUrl for consistency)
 * @param {Object} listing - Listing object with id and type
 * @returns {string|null} URL string or null if invalid
 */
function getListingUrl(listing) {
    return getServiceUrl(listing);
}

/**
 * Get the canonical URL for a region details page
 * @param {Object} region - Region object with id
 * @param {string} region.id - Required region ID
 * @returns {string|null} URL string or null if invalid
 */
function getRegionUrl(region) {
    if (!region || !region.id) {
        console.warn('[Routing] getRegionUrl called with missing region or id', region);
        return null;
    }
    return `${ROUTES.REGION_DETAILS}?id=${encodeURIComponent(region.id)}`;
}

/**
 * Get the canonical URL for an itinerary details page
 * @param {Object} itinerary - Itinerary object with id
 * @param {string} itinerary.id - Required itinerary ID (e.g., 'it-1')
 * @param {string} [itinerary.slug] - Optional URL-friendly slug
 * @returns {string|null} URL string or null if invalid
 */
function getItineraryUrl(itinerary) {
    if (!itinerary || !itinerary.id) {
        console.warn('[Routing] getItineraryUrl called with missing itinerary or id', itinerary);
        return null;
    }
    const id = itinerary.slug || itinerary.id;
    return `${ROUTES.ITINERARY_DETAILS}?id=${encodeURIComponent(id)}`;
}

/**
 * Get the canonical URL for an interest details page
 * @param {Object} interest - Interest object with id
 * @param {string} interest.id - Required interest ID (e.g., 'beach', 'culture')
 * @param {string} [interest.slug] - Optional URL-friendly slug
 * @returns {string|null} URL string or null if invalid
 */
function getInterestUrl(interest) {
    if (!interest || !interest.id) {
        console.warn('[Routing] getInterestUrl called with missing interest or id', interest);
        return null;
    }
    const id = interest.slug || interest.id;
    return `${ROUTES.INTEREST_DETAILS}?id=${encodeURIComponent(id)}`;
}

/**
 * Validate operator linkage on a listing/service
 * @param {Object} item - Item to validate
 * @returns {{valid: boolean, operatorId: string|null, error: string|null}}
 */
function validateOperatorLinkage(item) {
    if (!item) {
        return { valid: false, operatorId: null, error: 'Item is null or undefined' };
    }
    
    const operatorId = item.operatorId || item.operator?.id || item.operatorDetails?.id;
    
    if (!operatorId) {
        console.warn('[Routing] Missing operator linkage for item:', item.id || item.name);
        return { valid: false, operatorId: null, error: 'Missing operator linkage' };
    }
    
    return { valid: true, operatorId, error: null };
}

/**
 * Build a search URL with query parameters
 * @param {string} basePath - Base search page path
 * @param {Object} params - Query parameters
 * @returns {string} Full URL with query string
 */
function buildSearchUrl(basePath, params = {}) {
    const queryParts = [];
    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            if (Array.isArray(value)) {
                value.forEach(v => queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`));
            } else {
                queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        }
    });
    return queryParts.length > 0 ? `${basePath}?${queryParts.join('&')}` : basePath;
}

// Export for module systems, also attach to window for script usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        getOperatorUrl, 
        getServiceUrl, 
        getListingUrl, 
        getRegionUrl,
        getItineraryUrl,
        getInterestUrl,
        validateOperatorLinkage,
        buildSearchUrl,
        ROUTES 
    };
}

if (typeof window !== 'undefined') {
    window.RoutingHelpers = { 
        getOperatorUrl, 
        getServiceUrl, 
        getListingUrl, 
        getRegionUrl,
        getItineraryUrl,
        getInterestUrl,
        validateOperatorLinkage,
        buildSearchUrl,
        ROUTES 
    };
}


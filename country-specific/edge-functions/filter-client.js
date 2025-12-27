/**
 * Edge Function Client Library
 * Client-side JavaScript for calling edge functions from CI pages
 * 
 * @version 1.0.0
 * @author Bridge55 Platform Team
 */

const EdgeFilterClient = (function() {
    'use strict';
    
    // Configuration
    const config = {
        // For local development, use local mock
        // For production, use deployed edge function URL
        baseUrl: window.location.hostname === 'localhost' 
            ? '/api/filter'
            : 'https://bridge55-ci-edge.vercel.app/api/filter',
        timeout: 5000,
        cacheEnabled: true,
        cacheTTL: 300000 // 5 minutes
    };
    
    // Simple in-memory cache
    const cache = new Map();
    
    /**
     * Generate cache key from endpoint and filters
     */
    function getCacheKey(endpoint, filters) {
        return `${endpoint}:${JSON.stringify(filters)}`;
    }
    
    /**
     * Check if cached data is still valid
     */
    function isValidCache(cacheEntry) {
        if (!cacheEntry || !config.cacheEnabled) return false;
        return Date.now() - cacheEntry.timestamp < config.cacheTTL;
    }
    
    /**
     * Build URL with query parameters
     */
    function buildUrl(endpoint, filters) {
        const url = new URL(`${config.baseUrl}/${endpoint}`, window.location.origin);
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                url.searchParams.append(key, value);
            }
        });
        return url.toString();
    }
    
    /**
     * Fetch data from edge function with fallback to local data
     */
    async function fetchWithFallback(endpoint, filters, localData) {
        const cacheKey = getCacheKey(endpoint, filters);
        
        // Check cache first
        const cachedEntry = cache.get(cacheKey);
        if (isValidCache(cachedEntry)) {
            console.log(`📦 [EdgeFilter] Cache hit for ${endpoint}`);
            return cachedEntry.data;
        }
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), config.timeout);
            
            const response = await fetch(buildUrl(endpoint, filters), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            // Cache the result
            cache.set(cacheKey, {
                data: result.data,
                timestamp: Date.now()
            });
            
            console.log(`🌐 [EdgeFilter] Fetched ${result.count} items from edge for ${endpoint}`);
            return result.data;
            
        } catch (error) {
            console.warn(`⚠️ [EdgeFilter] Edge function error, using local filter:`, error.message);
            
            // Fallback to local filtering
            return filterLocally(endpoint, filters, localData);
        }
    }
    
    /**
     * Local fallback filter function
     */
    function filterLocally(endpoint, filters, data) {
        if (!data || !Array.isArray(data)) return [];
        
        let results = [...data];
        
        // Apply filters based on endpoint type
        Object.entries(filters).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '' || value === 'All') return;
            
            switch (key) {
                case 'type':
                    results = results.filter(item => item.type === value);
                    break;
                case 'interest':
                    results = results.filter(item => item.interest === value);
                    break;
                case 'region':
                    results = results.filter(item => item.region === value);
                    break;
                case 'area':
                    results = results.filter(item => item.area?.toLowerCase().includes(value.toLowerCase()));
                    break;
                case 'minPrice':
                    results = results.filter(item => item.price >= parseFloat(value));
                    break;
                case 'maxPrice':
                    results = results.filter(item => item.price <= parseFloat(value));
                    break;
                case 'minRating':
                    results = results.filter(item => item.rating >= parseFloat(value));
                    break;
                case 'featured':
                    results = results.filter(item => item.featured === (value === 'true' || value === true));
                    break;
                case 'duration':
                    if (value === 'short') results = results.filter(item => item.duration <= 3);
                    else if (value === 'medium') results = results.filter(item => item.duration >= 4 && item.duration <= 5);
                    else if (value === 'long') results = results.filter(item => item.duration > 5);
                    break;
            }
        });
        
        // Apply sorting
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'price-asc':
                    results.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    results.sort((a, b) => b.price - a.price);
                    break;
                case 'rating-desc':
                    results.sort((a, b) => b.rating - a.rating);
                    break;
                case 'name':
                    results.sort((a, b) => a.name.localeCompare(b.name));
                    break;
            }
        }
        
        console.log(`💻 [EdgeFilter] Filtered ${results.length} items locally for ${endpoint}`);
        return results;
    }
    
    // ===== PUBLIC API =====
    
    return {
        /**
         * Filter experiences
         * @param {Object} filters - Filter criteria
         * @param {Array} localData - Local data for fallback
         * @returns {Promise<Array>} Filtered experiences
         */
        async filterExperiences(filters = {}, localData = []) {
            return fetchWithFallback('experiences', filters, localData);
        },
        
        /**
         * Filter recommendations
         * @param {Object} filters - Filter criteria
         * @param {Array} localData - Local data for fallback
         * @returns {Promise<Array>} Filtered recommendations
         */
        async filterRecommendations(filters = {}, localData = []) {
            return fetchWithFallback('recommendations', filters, localData);
        },
        
        /**
         * Filter itineraries
         * @param {Object} filters - Filter criteria
         * @param {Array} localData - Local data for fallback
         * @returns {Promise<Array>} Filtered itineraries
         */
        async filterItineraries(filters = {}, localData = []) {
            return fetchWithFallback('itineraries', filters, localData);
        },
        
        /**
         * Filter regions
         * @param {Object} filters - Filter criteria
         * @param {Array} localData - Local data for fallback
         * @returns {Promise<Array>} Filtered regions
         */
        async filterRegions(filters = {}, localData = []) {
            return fetchWithFallback('regions', filters, localData);
        },
        
        /**
         * Clear cache
         */
        clearCache() {
            cache.clear();
            console.log('🗑️ [EdgeFilter] Cache cleared');
        },
        
        /**
         * Configure client
         * @param {Object} options - Configuration options
         */
        configure(options) {
            Object.assign(config, options);
            console.log('⚙️ [EdgeFilter] Configuration updated:', config);
        },
        
        /**
         * Get current configuration
         * @returns {Object} Current configuration
         */
        getConfig() {
            return { ...config };
        }
    };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EdgeFilterClient;
}

// Make available globally
window.EdgeFilterClient = EdgeFilterClient;




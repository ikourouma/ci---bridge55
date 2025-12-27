/**
 * Smart Image Component - Platform Standard
 * Universal image handling with contextual fallbacks
 * 
 * @module smart-image
 */

/**
 * Category-based placeholder images
 * Contextually relevant placeholders for different service types
 */
const PLACEHOLDER_IMAGES = {
    beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    museum: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=800&q=80',
    city: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
    hiking: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    safari: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    food: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    flight: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    event: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    culture: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&w=800&q=80',
    adventure: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=800&q=80',
    wellness: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    nightlife: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80',
    market: 'https://images.unsplash.com/photo-1555529771-7888783a18d3?auto=format&fit=crop&w=800&q=80',
    nature: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    heritage: 'https://images.unsplash.com/photo-1580896697724-6cf7b0c5e5e8?auto=format&fit=crop&w=800&q=80',
    operator: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    default: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
};

/**
 * Location keyword to category mapping for Côte d'Ivoire
 */
const LOCATION_CATEGORY_MAP = {
    'grand-bassam': 'heritage',
    'bassam': 'heritage',
    'assinie': 'beach',
    'abidjan': 'city',
    'yamoussoukro': 'heritage',
    'basilica': 'heritage',
    'man': 'hiking',
    'tonkpi': 'hiking',
    'comoe': 'safari',
    'tai': 'nature',
    'banco': 'nature'
};

/**
 * Get appropriate placeholder based on context
 * @param {Object} context - Context object
 * @param {string} [context.category] - Service category
 * @param {string} [context.type] - Service type
 * @param {string} [context.location] - Location name
 * @param {string[]} [context.tags] - Array of tags
 * @returns {string} Placeholder image URL
 */
function getPlaceholder(context = {}) {
    // Check category first
    if (context.category && PLACEHOLDER_IMAGES[context.category.toLowerCase()]) {
        return PLACEHOLDER_IMAGES[context.category.toLowerCase()];
    }
    
    // Check type
    if (context.type) {
        const type = context.type.toLowerCase();
        if (type.includes('stay') || type.includes('hotel') || type.includes('lodge')) {
            return PLACEHOLDER_IMAGES.hotel;
        }
        if (type.includes('flight')) return PLACEHOLDER_IMAGES.flight;
        if (type.includes('event')) return PLACEHOLDER_IMAGES.event;
        if (type.includes('safari') || type.includes('wildlife')) return PLACEHOLDER_IMAGES.safari;
        if (type.includes('beach') || type.includes('coastal')) return PLACEHOLDER_IMAGES.beach;
        if (type.includes('culture') || type.includes('heritage')) return PLACEHOLDER_IMAGES.heritage;
        if (type.includes('food') || type.includes('culinary')) return PLACEHOLDER_IMAGES.food;
        if (type.includes('adventure') || type.includes('mountain')) return PLACEHOLDER_IMAGES.adventure;
    }
    
    // Check location
    if (context.location) {
        const loc = context.location.toLowerCase();
        for (const [keyword, category] of Object.entries(LOCATION_CATEGORY_MAP)) {
            if (loc.includes(keyword)) {
                return PLACEHOLDER_IMAGES[category];
            }
        }
    }
    
    // Check tags
    if (context.tags && Array.isArray(context.tags)) {
        for (const tag of context.tags) {
            const t = tag.toLowerCase();
            if (PLACEHOLDER_IMAGES[t]) return PLACEHOLDER_IMAGES[t];
        }
    }
    
    return PLACEHOLDER_IMAGES.default;
}

/**
 * Create a smart image element with fallback handling
 * @param {string} src - Original image source
 * @param {string} alt - Alt text
 * @param {Object} [context] - Context for placeholder selection
 * @param {string} [className] - CSS class name
 * @returns {string} HTML string for image element
 */
function createSmartImage(src, alt, context = {}, className = '') {
    const placeholder = getPlaceholder(context);
    const safeSrc = src || placeholder;
    
    return `<img 
        src="${safeSrc}" 
        alt="${alt || 'Image'}" 
        class="${className} smart-image" 
        onerror="this.onerror=null; this.src='${placeholder}'; this.classList.add('fallback-image');"
        loading="lazy"
    >`;
}

/**
 * Initialize smart images on the page
 * Attaches error handlers to all images with data-smart-image attribute
 */
function initSmartImages() {
    document.querySelectorAll('img[data-smart-image]').forEach(img => {
        const context = {
            category: img.dataset.category,
            type: img.dataset.type,
            location: img.dataset.location
        };
        const placeholder = getPlaceholder(context);
        
        img.onerror = function() {
            this.onerror = null;
            this.src = placeholder;
            this.classList.add('fallback-image');
        };
        
        // Check if current src is broken
        if (!img.complete || img.naturalWidth === 0) {
            img.src = placeholder;
        }
    });
}

// Auto-initialize on DOM ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmartImages);
    } else {
        initSmartImages();
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        PLACEHOLDER_IMAGES,
        getPlaceholder, 
        createSmartImage, 
        initSmartImages 
    };
}

if (typeof window !== 'undefined') {
    window.SmartImage = { 
        PLACEHOLDER_IMAGES,
        getPlaceholder, 
        createSmartImage, 
        initSmartImages 
    };
}




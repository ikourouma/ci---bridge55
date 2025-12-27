/**
 * Edge Function: Dynamic Filter Handler
 * 
 * This edge function provides low-latency filtering for:
 * - Experiences (explore by interest)
 * - Recommendations
 * - Regions
 * - Itineraries
 * 
 * Deploy to: Vercel Edge Functions, Cloudflare Workers, Netlify Edge Functions
 * 
 * @version 1.0.0
 * @author Bridge55 Platform Team
 */

// ===== DATA SOURCES =====
// In production, these would come from a database or CMS
// For demo purposes, we define sample data here

const experiencesData = [
    { id: 1, type: 'Experience', name: 'Grand-Bassam Heritage Walk', location: 'Grand-Bassam', region: 'Comoé', interest: 'History & Culture', price: 25, rating: 4.8 },
    { id: 2, type: 'Stay', name: 'Radisson Blu Abidjan Airport', location: 'Abidjan', region: 'Abidjan', interest: 'Luxury', price: 150, rating: 4.7 },
    { id: 3, type: 'Experience', name: 'Korhogo Senufo Culture Tour', location: 'Korhogo', region: 'Savanes', interest: 'History & Culture', price: 75, rating: 4.9 },
    { id: 4, type: 'Event', name: 'FEMUA Music Festival', location: 'Abidjan', region: 'Abidjan', interest: 'Entertainment', price: 45, rating: 4.6 },
    { id: 5, type: 'Experience', name: 'Taï National Park Safari', location: 'San-Pédro', region: 'Bas-Sassandra', interest: 'Wildlife & Nature', price: 180, rating: 4.8 },
    { id: 6, type: 'Stay', name: 'Assinie Beach Resort', location: 'Assinie', region: 'Comoé', interest: 'Beach', price: 220, rating: 4.9 },
    { id: 7, type: 'Experience', name: 'Mount Nimba Hiking', location: 'Man', region: 'Montagnes', interest: 'Adventure', price: 95, rating: 4.7 },
    { id: 8, type: 'Experience', name: 'Cocoa Plantation Tour', location: 'Daloa', region: 'Sassandra-Marahoué', interest: 'Agriculture', price: 35, rating: 4.5 }
];

const itinerariesData = [
    { id: 'itin-001', route: ['Abidjan', 'Grand-Bassam', 'Assinie'], duration: 3, type: 'Beach & Heritage', price: 320, rating: 4.9, featured: true },
    { id: 'itin-002', route: ['Abidjan', 'Yamoussoukro', 'Bouaké'], duration: 4, type: 'Cultural Capital', price: 450, rating: 4.8, featured: false },
    { id: 'itin-003', route: ['Abidjan', 'Man', 'Danané'], duration: 5, type: 'Mountain Adventure', price: 580, rating: 4.9, featured: true },
    { id: 'itin-004', route: ['Abidjan', 'Korhogo'], duration: 4, type: 'Senufo Discovery', price: 420, rating: 4.7, featured: false },
    { id: 'itin-005', route: ['Abidjan', 'San-Pédro', 'Taï'], duration: 5, type: 'Wildlife Safari', price: 650, rating: 4.8, featured: true }
];

const regionsData = [
    { id: 'abidjan', name: 'Abidjan', area: 'Coastal/South', experiences: 120, ethnic: ['Akan', 'Krou'] },
    { id: 'comoe', name: 'Comoé', area: 'Coastal/South', experiences: 85, ethnic: ['Akan'] },
    { id: 'lagunes', name: 'Lagunes', area: 'Coastal/South', experiences: 72, ethnic: ['Akan'] },
    { id: 'yamoussoukro', name: 'Yamoussoukro', area: 'Central', experiences: 65, ethnic: ['Akan', 'Mande'] },
    { id: 'montagnes', name: 'Montagnes', area: 'Western', experiences: 58, ethnic: ['Krou', 'Mande'] },
    { id: 'savanes', name: 'Savanes', area: 'Northern', experiences: 45, ethnic: ['Senufo', 'Mande'] },
    { id: 'zanzan', name: 'Zanzan', area: 'Eastern', experiences: 38, ethnic: ['Akan', 'Mande'] }
];

// ===== FILTER FUNCTIONS =====

/**
 * Filter experiences by multiple criteria
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered experiences
 */
function filterExperiences(filters = {}) {
    let results = [...experiencesData];
    
    if (filters.type && filters.type !== 'All') {
        results = results.filter(e => e.type === filters.type);
    }
    
    if (filters.interest) {
        results = results.filter(e => e.interest === filters.interest);
    }
    
    if (filters.region) {
        results = results.filter(e => e.region === filters.region);
    }
    
    if (filters.minPrice !== undefined) {
        results = results.filter(e => e.price >= filters.minPrice);
    }
    
    if (filters.maxPrice !== undefined) {
        results = results.filter(e => e.price <= filters.maxPrice);
    }
    
    if (filters.minRating !== undefined) {
        results = results.filter(e => e.rating >= filters.minRating);
    }
    
    // Sorting
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
    
    return results;
}

/**
 * Filter itineraries by multiple criteria
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered itineraries
 */
function filterItineraries(filters = {}) {
    let results = [...itinerariesData];
    
    if (filters.duration) {
        if (filters.duration === 'short') {
            results = results.filter(i => i.duration <= 3);
        } else if (filters.duration === 'medium') {
            results = results.filter(i => i.duration >= 4 && i.duration <= 5);
        } else if (filters.duration === 'long') {
            results = results.filter(i => i.duration > 5);
        }
    }
    
    if (filters.type) {
        results = results.filter(i => i.type.toLowerCase().includes(filters.type.toLowerCase()));
    }
    
    if (filters.featured !== undefined) {
        results = results.filter(i => i.featured === filters.featured);
    }
    
    if (filters.minPrice !== undefined) {
        results = results.filter(i => i.price >= filters.minPrice);
    }
    
    if (filters.maxPrice !== undefined) {
        results = results.filter(i => i.price <= filters.maxPrice);
    }
    
    if (filters.destination) {
        results = results.filter(i => 
            i.route.some(city => city.toLowerCase().includes(filters.destination.toLowerCase()))
        );
    }
    
    // Sorting
    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'price-asc':
                results.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                results.sort((a, b) => b.price - a.price);
                break;
            case 'duration-asc':
                results.sort((a, b) => a.duration - b.duration);
                break;
            case 'duration-desc':
                results.sort((a, b) => b.duration - a.duration);
                break;
            case 'rating-desc':
                results.sort((a, b) => b.rating - a.rating);
                break;
        }
    }
    
    return results;
}

/**
 * Filter regions by multiple criteria
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered regions
 */
function filterRegions(filters = {}) {
    let results = [...regionsData];
    
    if (filters.area && filters.area !== 'all') {
        results = results.filter(r => r.area.toLowerCase().includes(filters.area.toLowerCase()));
    }
    
    if (filters.ethnic) {
        results = results.filter(r => r.ethnic.includes(filters.ethnic));
    }
    
    if (filters.minExperiences !== undefined) {
        results = results.filter(r => r.experiences >= filters.minExperiences);
    }
    
    // Sorting
    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'name':
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'experiences-desc':
                results.sort((a, b) => b.experiences - a.experiences);
                break;
        }
    }
    
    return results;
}

// ===== EDGE FUNCTION HANDLER =====

/**
 * Main handler for edge function requests
 * Compatible with Vercel Edge, Cloudflare Workers, and Netlify Edge
 * @param {Request} request - Incoming request
 * @returns {Response} JSON response with filtered data
 */
export default async function handler(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // CORS headers
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=300' // Cache for 5 minutes at edge
    };
    
    // Handle OPTIONS (preflight)
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders });
    }
    
    try {
        // Parse query parameters as filters
        const filters = {};
        for (const [key, value] of url.searchParams) {
            if (value === 'true') filters[key] = true;
            else if (value === 'false') filters[key] = false;
            else if (!isNaN(parseFloat(value))) filters[key] = parseFloat(value);
            else filters[key] = value;
        }
        
        let data;
        let meta = {
            timestamp: new Date().toISOString(),
            filters: filters,
            cached: false
        };
        
        // Route to appropriate filter function
        if (pathname.includes('/experiences') || pathname.includes('/recommendations')) {
            data = filterExperiences(filters);
            meta.type = 'experiences';
        } else if (pathname.includes('/itineraries')) {
            data = filterItineraries(filters);
            meta.type = 'itineraries';
        } else if (pathname.includes('/regions')) {
            data = filterRegions(filters);
            meta.type = 'regions';
        } else {
            return new Response(JSON.stringify({
                error: 'Unknown endpoint',
                availableEndpoints: ['/experiences', '/recommendations', '/itineraries', '/regions']
            }), { 
                status: 404, 
                headers: corsHeaders 
            });
        }
        
        return new Response(JSON.stringify({
            success: true,
            count: data.length,
            data: data,
            meta: meta
        }), { 
            status: 200, 
            headers: corsHeaders 
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), { 
            status: 500, 
            headers: corsHeaders 
        });
    }
}

// For Cloudflare Workers compatibility
export const config = {
    runtime: 'edge'
};




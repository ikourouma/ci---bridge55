/**
 * CANONICAL DEMO ITINERARIES DATASET
 * Part of the CURSOR MASTER EXECUTION INSTRUCTION
 * 
 * This is the single source of truth for demo itineraries.
 * All itinerary cards must reference IDs from this dataset.
 * 
 * Schema Contract:
 * - id: Unique itinerary ID (string, e.g., 'it-1')
 * - route: Array of city/location names
 * - duration: Number of days
 * - type: Itinerary type (string)
 * - price: Base price (number)
 * - rating: Rating 1-5 (decimal)
 * - reviews: Review count (number)
 * - tags: Array of tag strings
 * - featured: Boolean
 * - image: Image URL
 * - highlights: Array of highlight strings
 * 
 * @module demo-itineraries
 * @version 1.0.0
 * @date 2025-12-27
 */

(function() {
    'use strict';

    const DEMO_ITINERARIES = [
        {
            id: 'it-1',
            route: ['Abidjan', 'Grand-Bassam', 'Assinie'],
            duration: 3,
            type: 'Beach & Heritage',
            price: 280,
            rating: 4.9,
            reviews: 124,
            tags: ['Coastal', 'UNESCO', 'Beach'],
            featured: true,
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            highlights: ['UNESCO Site', 'Beach Resort', 'Colonial History']
        },
        {
            id: 'it-2',
            route: ['Abidjan', 'Yamoussoukro', 'Bouaké'],
            duration: 4,
            type: 'Cultural Discovery',
            price: 350,
            rating: 4.8,
            reviews: 89,
            tags: ['Culture', 'Basilica', 'Capital'],
            featured: false,
            image: 'https://images.unsplash.com/photo-1580896697724-6cf7b0c5e5e8?auto=format&fit=crop&w=800&q=80',
            highlights: ['Notre-Dame Basilica', 'Presidential Palace', 'Markets']
        },
        {
            id: 'it-3',
            route: ['Abidjan', 'Man', 'Danané'],
            duration: 5,
            type: 'Mountain Adventure',
            price: 450,
            rating: 4.9,
            reviews: 67,
            tags: ['Mountains', 'Waterfalls', 'Adventure'],
            featured: true,
            image: 'https://images.unsplash.com/photo-1518611507436-f9221403cca2?auto=format&fit=crop&w=800&q=80',
            highlights: ['Mount Tonkpi', 'La Cascade', 'Dan Villages']
        },
        {
            id: 'it-4',
            route: ['Abidjan', 'Korhogo', 'Comoé Park'],
            duration: 6,
            type: 'Safari & Senufo',
            price: 520,
            rating: 4.7,
            reviews: 45,
            tags: ['Safari', 'North', 'Wildlife'],
            featured: false,
            image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
            highlights: ['Comoé National Park', 'Senufo Culture', 'Safari']
        },
        {
            id: 'it-5',
            route: ['San-Pédro', 'Sassandra', 'Fresco'],
            duration: 4,
            type: 'Western Coast',
            price: 380,
            rating: 4.6,
            reviews: 38,
            tags: ['Beach', 'Fishing', 'Coastal'],
            featured: false,
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
            highlights: ['Fishing Villages', 'Pristine Beaches', 'Seafood']
        },
        {
            id: 'it-6',
            route: ['Complete CI Tour'],
            duration: 14,
            type: 'All Regions',
            price: 1200,
            rating: 5.0,
            reviews: 23,
            tags: ['Complete', 'Premium', 'All-Inclusive'],
            featured: true,
            image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
            highlights: ['All 14 Regions', 'Expert Guides', 'Premium Stays']
        },
        {
            id: 'it-7',
            route: ['Abidjan', 'Jacqueville', 'Tiagba'],
            duration: 2,
            type: 'Lagoon Discovery',
            price: 180,
            rating: 4.5,
            reviews: 56,
            tags: ['Lagoon', 'Village', 'Day Trip'],
            featured: false,
            image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=800&q=80',
            highlights: ['Stilt Villages', 'Ébrié Lagoon', 'Local Culture']
        },
        {
            id: 'it-8',
            route: ['Abidjan', 'Bondoukou', 'Bouna'],
            duration: 5,
            type: 'Eastern Heritage',
            price: 420,
            rating: 4.8,
            reviews: 31,
            tags: ['Heritage', 'East', 'Mosques'],
            featured: false,
            image: 'https://images.unsplash.com/photo-1531588428361-55e36ee3aee2?auto=format&fit=crop&w=800&q=80',
            highlights: ['Historic Mosques', 'Akan Culture', 'Border Towns']
        }
    ];

    // Export to window
    window.DEMO_ITINERARIES = DEMO_ITINERARIES;

})();


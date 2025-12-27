/**
 * CANONICAL DEMO EXPERIENCES DATASET
 * Part of the CURSOR MASTER EXECUTION INSTRUCTION
 * 
 * This is the single source of truth for demo experiences.
 * All experience cards must reference IDs from this dataset.
 * 
 * Schema Contract:
 * - id: Unique experience ID (number)
 * - name: Display name
 * - category: Experience category (beach, culture, safari, food, adventure, nightlife)
 * - region: Region code (abidjan, coastal, east, central, west, north)
 * - price: Base price (number)
 * - rating: Rating 1-5 (decimal)
 * - reviews: Review count (number)
 * - duration: Duration string (half-day, full-day, multi-day)
 * - image: Image URL
 * - location: Location name (string)
 * - badge: Badge type (bestseller, featured, new, null)
 * - features: Array of feature strings
 * 
 * @module demo-experiences
 * @version 1.0.0
 * @date 2025-12-27
 */

(function() {
    'use strict';

    const DEMO_EXPERIENCES = [
        {
            id: 1,
            name: 'La Corniche Sunset Tour',
            category: 'beach',
            region: 'abidjan',
            price: 45,
            rating: 4.8,
            reviews: 234,
            duration: 'half-day',
            image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80',
            location: 'Abidjan',
            badge: 'bestseller',
            features: ['free-cancellation', 'instant-confirm']
        },
        {
            id: 2,
            name: 'Grand-Bassam UNESCO Heritage Walk',
            category: 'culture',
            region: 'coastal',
            price: 25,
            rating: 4.9,
            reviews: 186,
            duration: 'half-day',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            location: 'Grand-Bassam',
            badge: 'featured',
            features: ['instant-confirm']
        },
        {
            id: 3,
            name: 'Comoé National Park Safari',
            category: 'safari',
            region: 'east',
            price: 189,
            rating: 4.7,
            reviews: 89,
            duration: 'full-day',
            image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
            location: 'Bouna',
            badge: 'new',
            features: ['private', 'free-cancellation']
        },
        {
            id: 4,
            name: 'Yamoussoukro Basilica Tour',
            category: 'culture',
            region: 'central',
            price: 35,
            rating: 4.9,
            reviews: 312,
            duration: 'full-day',
            image: 'https://images.unsplash.com/photo-1580896697724-6cf7b0c5e5e8?auto=format&fit=crop&w=800&q=80',
            location: 'Yamoussoukro',
            badge: 'bestseller',
            features: ['instant-confirm', 'skip-line']
        },
        {
            id: 5,
            name: 'Abidjan Food Tour',
            category: 'food',
            region: 'abidjan',
            price: 55,
            rating: 4.8,
            reviews: 156,
            duration: 'half-day',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
            location: 'Abidjan',
            badge: null,
            features: ['free-cancellation']
        },
        {
            id: 6,
            name: 'Mount Tonkpi Trek',
            category: 'adventure',
            region: 'west',
            price: 95,
            rating: 4.6,
            reviews: 78,
            duration: 'full-day',
            image: 'https://images.unsplash.com/photo-1518611507436-f9221403cca2?auto=format&fit=crop&w=800&q=80',
            location: 'Man',
            badge: 'new',
            features: ['private']
        },
        {
            id: 7,
            name: 'Korhogo Cloth Workshop',
            category: 'culture',
            region: 'north',
            price: 45,
            rating: 4.7,
            reviews: 67,
            duration: 'half-day',
            image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
            location: 'Korhogo',
            badge: null,
            features: ['instant-confirm']
        },
        {
            id: 8,
            name: 'Assinie Beach Day',
            category: 'beach',
            region: 'coastal',
            price: 75,
            rating: 4.5,
            reviews: 203,
            duration: 'full-day',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
            location: 'Assinie',
            badge: 'bestseller',
            features: ['free-cancellation', 'instant-confirm']
        },
        {
            id: 9,
            name: 'Treichville Market Experience',
            category: 'food',
            region: 'abidjan',
            price: 30,
            rating: 4.6,
            reviews: 145,
            duration: 'half-day',
            image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
            location: 'Abidjan',
            badge: null,
            features: ['instant-confirm']
        },
        {
            id: 10,
            name: 'Stilt Dancers of Danané',
            category: 'culture',
            region: 'west',
            price: 65,
            rating: 4.8,
            reviews: 92,
            duration: 'half-day',
            image: 'https://images.unsplash.com/photo-1531588428361-55e36ee3aee2?auto=format&fit=crop&w=800&q=80',
            location: 'Danané',
            badge: 'featured',
            features: ['private']
        },
        {
            id: 11,
            name: 'Tengréla Sacred Lake Visit',
            category: 'safari',
            region: 'north',
            price: 55,
            rating: 4.9,
            reviews: 56,
            duration: 'half-day',
            image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
            location: 'Tengréla',
            badge: 'new',
            features: ['instant-confirm']
        },
        {
            id: 12,
            name: 'Zone 4 Nightlife Tour',
            category: 'nightlife',
            region: 'abidjan',
            price: 85,
            rating: 4.4,
            reviews: 178,
            duration: 'half-day',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
            location: 'Abidjan',
            badge: null,
            features: ['free-cancellation']
        },
        {
            id: 13,
            name: 'San-Pédro Surfing Lesson',
            category: 'adventure',
            region: 'coastal',
            price: 65,
            rating: 4.5,
            reviews: 43,
            duration: 'half-day',
            image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
            location: 'San-Pédro',
            badge: 'new',
            features: ['instant-confirm', 'free-cancellation']
        },
        {
            id: 14,
            name: 'Bouaké Market Day',
            category: 'culture',
            region: 'central',
            price: 35,
            rating: 4.6,
            reviews: 89,
            duration: 'full-day',
            image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
            location: 'Bouaké',
            badge: null,
            features: ['instant-confirm']
        },
        {
            id: 15,
            name: 'Cascades de Man',
            category: 'adventure',
            region: 'west',
            price: 45,
            rating: 4.7,
            reviews: 112,
            duration: 'full-day',
            image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
            location: 'Man',
            badge: 'featured',
            features: ['free-cancellation']
        },
        {
            id: 16,
            name: 'Agni Royal Court Visit',
            category: 'culture',
            region: 'east',
            price: 55,
            rating: 4.8,
            reviews: 67,
            duration: 'half-day',
            image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
            location: 'Abengourou',
            badge: null,
            features: ['private', 'instant-confirm']
        }
    ];

    // Export to window
    window.DEMO_EXPERIENCES = DEMO_EXPERIENCES;

})();


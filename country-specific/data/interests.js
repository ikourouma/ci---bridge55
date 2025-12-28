/**
 * Côte d'Ivoire Interests/Categories Data
 * Centralized data for travel interests and categories
 * 
 * @version 1.0.0
 * @date 2025-12-28
 */

(function() {
    'use strict';

    const interestsData = {
        'culture': {
            id: 'culture',
            name: 'Culture & Heritage',
            icon: 'fas fa-landmark',
            color: '#8B5CF6',
            description: 'Discover the rich cultural tapestry of Côte d\'Ivoire, from traditional masks and dances to colonial architecture and vibrant festivals. Experience the living heritage of over 60 ethnic groups.',
            heroImage: 'https://images.unsplash.com/photo-1580394693539-64e6b5d6e2e9?w=1200',
            images: [
                'https://images.unsplash.com/photo-1580394693539-64e6b5d6e2e9?w=800',
                'https://images.unsplash.com/photo-1590845947376-2638caa89309?w=800'
            ],
            highlights: [
                'Traditional Mask Ceremonies',
                'Goli Dance of the Baoulé',
                'Colonial Heritage Sites',
                'Local Artisan Villages',
                'Music & Festival Culture'
            ],
            experienceCount: 12,
            popularExperiences: ['exp-1', 'exp-2', 'exp-4']
        },
        'beaches': {
            id: 'beaches',
            name: 'Beaches & Coast',
            icon: 'fas fa-umbrella-beach',
            color: '#0EA5E9',
            description: 'Relax on pristine Atlantic beaches, explore coastal lagoons, and enjoy water sports along Côte d\'Ivoire\'s stunning 500km coastline. From luxury resorts to untouched paradise beaches.',
            heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
            images: [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
                'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800'
            ],
            highlights: [
                'Assinie Beach Resort',
                'Grand-Bassam Beaches',
                'Ébrié Lagoon',
                'Water Sports',
                'Sunset Cruises'
            ],
            experienceCount: 8,
            popularExperiences: ['exp-5']
        },
        'wildlife': {
            id: 'wildlife',
            name: 'Wildlife & Safari',
            icon: 'fas fa-paw',
            color: '#22C55E',
            description: 'Embark on unforgettable safaris through Comoé National Park and other protected areas. Spot elephants, hippos, chimpanzees, and over 500 bird species in their natural habitat.',
            heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
            images: [
                'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
                'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800'
            ],
            highlights: [
                'Comoé National Park Safari',
                'Taï National Park Chimps',
                'Bird Watching',
                'Elephant Tracking',
                'River Cruises'
            ],
            experienceCount: 6,
            popularExperiences: ['exp-3']
        },
        'food': {
            id: 'food',
            name: 'Food & Culinary',
            icon: 'fas fa-utensils',
            color: '#F59E0B',
            description: 'Savor the flavors of Ivorian cuisine, from iconic Attiéké to spicy Kedjenou. Join cooking classes, explore vibrant markets, and taste the fusion of African and French influences.',
            heroImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
            images: [
                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
                'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800'
            ],
            highlights: [
                'Street Food Tours',
                'Cooking Classes',
                'Market Visits',
                'Restaurant Experiences',
                'Coffee & Cocoa Tours'
            ],
            experienceCount: 10,
            popularExperiences: ['exp-6']
        },
        'adventure': {
            id: 'adventure',
            name: 'Adventure & Outdoor',
            icon: 'fas fa-hiking',
            color: '#EF4444',
            description: 'Get your adrenaline pumping with hiking, kayaking, zip-lining, and more. Explore rainforests, climb mountains, and discover hidden waterfalls across Côte d\'Ivoire.',
            heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200',
            images: [
                'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'
            ],
            highlights: [
                'Mt. Nimba Hiking',
                'Rainforest Trekking',
                'Kayaking & Canoeing',
                'Zip-lining',
                'Rock Climbing'
            ],
            experienceCount: 7,
            popularExperiences: []
        },
        'wellness': {
            id: 'wellness',
            name: 'Wellness & Relaxation',
            icon: 'fas fa-spa',
            color: '#EC4899',
            description: 'Rejuvenate your mind and body at luxury spas, yoga retreats, and wellness centers. Experience traditional healing practices and modern wellness in beautiful tropical settings.',
            heroImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200',
            images: [
                'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
                'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'
            ],
            highlights: [
                'Luxury Spa Resorts',
                'Yoga Retreats',
                'Traditional Healing',
                'Meditation Centers',
                'Beach Wellness'
            ],
            experienceCount: 5,
            popularExperiences: []
        },
        'nightlife': {
            id: 'nightlife',
            name: 'Nightlife & Entertainment',
            icon: 'fas fa-music',
            color: '#6366F1',
            description: 'Experience the legendary Abidjan nightlife scene with coupé-décalé music, vibrant clubs, and rooftop bars. From live music venues to upscale lounges, the night comes alive.',
            heroImage: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200',
            images: [
                'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800',
                'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800'
            ],
            highlights: [
                'Live Music Venues',
                'Rooftop Bars',
                'Dance Clubs',
                'Jazz Lounges',
                'Beach Parties'
            ],
            experienceCount: 6,
            popularExperiences: []
        },
        'religious': {
            id: 'religious',
            name: 'Religious & Spiritual',
            icon: 'fas fa-church',
            color: '#8B5CF6',
            description: 'Visit the world\'s largest church, historic mosques, and sacred sites across Côte d\'Ivoire. Experience the spiritual diversity of Christianity, Islam, and traditional beliefs.',
            heroImage: 'https://images.unsplash.com/photo-1580394693539-64e6b5d6e2e9?w=1200',
            images: [
                'https://images.unsplash.com/photo-1580394693539-64e6b5d6e2e9?w=800'
            ],
            highlights: [
                'Basilica of Our Lady of Peace',
                'St. Paul\'s Cathedral',
                'Grande Mosquée de Yamoussoukro',
                'Sacred Forests',
                'Traditional Shrines'
            ],
            experienceCount: 4,
            popularExperiences: ['exp-4']
        }
    };

    // Export to window for global access
    window.InterestsDB = {
        getAll: () => interestsData,
        getById: (id) => interestsData[id] || interestsData[String(id).toLowerCase()],
        getList: () => Object.values(interestsData),
        search: (query) => {
            const q = query.toLowerCase();
            return Object.values(interestsData).filter(i => 
                i.name.toLowerCase().includes(q) || 
                i.description.toLowerCase().includes(q)
            );
        }
    };

    console.log('[InterestsDB] Loaded', Object.keys(interestsData).length, 'interest categories');
})();


/**
 * Côte d'Ivoire Regions Data
 * Centralized data for all CI regions
 * 
 * @version 1.0.0
 * @date 2025-12-28
 */

(function() {
    'use strict';

    const regionsData = {
        'abidjan': {
            id: 'abidjan',
            name: 'Abidjan',
            subtitle: 'Economic Capital',
            description: 'The vibrant economic capital of Côte d\'Ivoire, Abidjan is a bustling metropolis known for its modern skyline, rich cultural heritage, and dynamic nightlife. From the iconic St. Paul\'s Cathedral to the bustling Treichville market, Abidjan offers an unforgettable urban African experience.',
            population: '5.6 million',
            climate: 'Tropical',
            timezone: 'GMT+0',
            heroImage: 'https://images.unsplash.com/photo-1590845947376-2638caa89309?w=1200',
            images: [
                'https://images.unsplash.com/photo-1590845947376-2638caa89309?w=800',
                'https://images.unsplash.com/photo-1580394693539-64e6b5d6e2e9?w=800',
                'https://images.unsplash.com/photo-1597435877916-b7e6dfae3f23?w=800'
            ],
            highlights: [
                'Plateau Business District',
                'St. Paul\'s Cathedral',
                'Banco National Park',
                'Treichville Market',
                'La Pyramide'
            ],
            attractions: [
                { name: 'St. Paul\'s Cathedral', type: 'Religious', rating: 4.7 },
                { name: 'Banco National Park', type: 'Nature', rating: 4.5 },
                { name: 'Musée des Civilisations', type: 'Museum', rating: 4.3 },
                { name: 'Plateau District', type: 'Urban', rating: 4.6 }
            ],
            bestTimeToVisit: 'November - March (Dry Season)',
            gettingThere: 'Félix Houphouët-Boigny International Airport (ABJ)',
            localCuisine: ['Attiéké', 'Alloco', 'Garba', 'Kedjenou'],
            coordinates: { lat: 5.3600, lng: -4.0083 }
        },
        'yamoussoukro': {
            id: 'yamoussoukro',
            name: 'Yamoussoukro',
            subtitle: 'Political Capital',
            description: 'The political capital of Côte d\'Ivoire, Yamoussoukro is home to the magnificent Basilica of Our Lady of Peace, the largest church in the world. This planned city offers wide boulevards, the Presidential Palace surrounded by crocodiles, and a glimpse into Ivorian political heritage.',
            population: '355,000',
            climate: 'Tropical',
            timezone: 'GMT+0',
            heroImage: 'https://images.unsplash.com/photo-1580394693539-64e6b5d6e2e9?w=1200',
            images: [
                'https://images.unsplash.com/photo-1580394693539-64e6b5d6e2e9?w=800',
                'https://images.unsplash.com/photo-1597435877916-b7e6dfae3f23?w=800',
                'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800'
            ],
            highlights: [
                'Basilica of Our Lady of Peace',
                'Presidential Palace',
                'Crocodile Lake',
                'Foundation Félix Houphouët-Boigny'
            ],
            attractions: [
                { name: 'Basilica of Our Lady of Peace', type: 'Religious', rating: 4.9 },
                { name: 'Presidential Palace', type: 'Landmark', rating: 4.5 },
                { name: 'Crocodile Lake', type: 'Wildlife', rating: 4.3 }
            ],
            bestTimeToVisit: 'November - February',
            gettingThere: 'Yamoussoukro Airport (ASK) or 3hr drive from Abidjan',
            localCuisine: ['Foutou', 'Sauce Graine', 'Poisson Braisé'],
            coordinates: { lat: 6.8276, lng: -5.2893 }
        },
        'grand-bassam': {
            id: 'grand-bassam',
            name: 'Grand-Bassam',
            subtitle: 'UNESCO Heritage Town',
            description: 'A UNESCO World Heritage Site, Grand-Bassam is the former colonial capital of Côte d\'Ivoire. This charming coastal town features well-preserved French colonial architecture, beautiful beaches, and a rich history that tells the story of early 20th century West Africa.',
            population: '85,000',
            climate: 'Tropical Coastal',
            timezone: 'GMT+0',
            heroImage: 'https://images.unsplash.com/photo-1597435877916-b7e6dfae3f23?w=1200',
            images: [
                'https://images.unsplash.com/photo-1597435877916-b7e6dfae3f23?w=800',
                'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'
            ],
            highlights: [
                'Colonial Quarter (UNESCO)',
                'National Costume Museum',
                'Beaches',
                'Artisan Markets',
                'Colonial Governor\'s Palace'
            ],
            attractions: [
                { name: 'Colonial Quarter', type: 'Heritage', rating: 4.7 },
                { name: 'National Costume Museum', type: 'Museum', rating: 4.4 },
                { name: 'Grand-Bassam Beach', type: 'Beach', rating: 4.5 }
            ],
            bestTimeToVisit: 'November - March',
            gettingThere: '45 min drive from Abidjan',
            localCuisine: ['Fresh Seafood', 'Grilled Fish', 'Coconut Rice'],
            coordinates: { lat: 5.2000, lng: -3.7333 }
        },
        'assinie': {
            id: 'assinie',
            name: 'Assinie-Mafia',
            subtitle: 'Beach Paradise',
            description: 'Assinie is Côte d\'Ivoire\'s premier beach destination, known for its pristine sandy beaches, luxury resorts, and the famous Ébrié Lagoon. This tropical paradise offers water sports, relaxation, and a taste of Ivorian coastal luxury.',
            population: '25,000',
            climate: 'Tropical Coastal',
            timezone: 'GMT+0',
            heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
            images: [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
                'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
                'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800'
            ],
            highlights: [
                'Ébrié Lagoon',
                'Club Med Assinie',
                'Water Sports',
                'Beach Resorts',
                'Tropical Gardens'
            ],
            attractions: [
                { name: 'Assinie Beach', type: 'Beach', rating: 4.8 },
                { name: 'Ébrié Lagoon', type: 'Nature', rating: 4.6 },
                { name: 'Club Med Assinie', type: 'Resort', rating: 4.7 }
            ],
            bestTimeToVisit: 'December - April',
            gettingThere: '1.5hr drive from Abidjan',
            localCuisine: ['Grilled Lobster', 'Coconut Prawns', 'Fresh Oysters'],
            coordinates: { lat: 5.1500, lng: -3.4667 }
        },
        'bouake': {
            id: 'bouake',
            name: 'Bouaké',
            subtitle: 'Second City',
            description: 'The second-largest city in Côte d\'Ivoire, Bouaké is a major commercial hub in the heart of the country. Known for its vibrant markets, traditional Baoulé culture, and as a gateway to the northern regions.',
            population: '680,000',
            climate: 'Tropical Savanna',
            timezone: 'GMT+0',
            heroImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200',
            images: [
                'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
                'https://images.unsplash.com/photo-1580394693539-64e6b5d6e2e9?w=800'
            ],
            highlights: [
                'Grande Mosquée',
                'Central Market',
                'Baoulé Cultural Center',
                'Textile Industry'
            ],
            attractions: [
                { name: 'Grande Mosquée', type: 'Religious', rating: 4.3 },
                { name: 'Central Market', type: 'Market', rating: 4.4 }
            ],
            bestTimeToVisit: 'November - February',
            gettingThere: 'Bouaké Airport (BYK) or 4hr drive from Abidjan',
            localCuisine: ['Sauce Arachide', 'Riz Gras', 'Bouillie'],
            coordinates: { lat: 7.6833, lng: -5.0333 }
        },
        'comoe': {
            id: 'comoe',
            name: 'Comoé National Park',
            subtitle: 'UNESCO Biosphere',
            description: 'One of the largest protected areas in West Africa, Comoé National Park is a UNESCO World Heritage Site. This vast savanna ecosystem is home to elephants, hippos, lions, and over 500 bird species, offering an authentic African safari experience.',
            population: 'N/A (Protected Area)',
            climate: 'Tropical Savanna',
            timezone: 'GMT+0',
            heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
            images: [
                'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
                'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
                'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800'
            ],
            highlights: [
                'African Elephants',
                'Hippos',
                'Bird Watching',
                'Safari Drives',
                'Comoé River'
            ],
            attractions: [
                { name: 'Safari Game Drives', type: 'Wildlife', rating: 4.8 },
                { name: 'Comoé River', type: 'Nature', rating: 4.6 },
                { name: 'Bird Watching Tours', type: 'Wildlife', rating: 4.5 }
            ],
            bestTimeToVisit: 'December - April (Dry Season)',
            gettingThere: '7hr drive from Abidjan via Bondoukou',
            localCuisine: ['Bush Meat (Legal)', 'Grilled Fish', 'Local Stews'],
            coordinates: { lat: 9.0000, lng: -3.7500 }
        }
    };

    // Export to window for global access
    window.RegionsDB = {
        getAll: () => regionsData,
        getById: (id) => regionsData[id] || regionsData[String(id).toLowerCase()],
        getApproved: () => Object.values(regionsData),
        search: (query) => {
            const q = query.toLowerCase();
            return Object.values(regionsData).filter(r => 
                r.name.toLowerCase().includes(q) || 
                r.subtitle.toLowerCase().includes(q) ||
                r.description.toLowerCase().includes(q)
            );
        }
    };

    console.log('[RegionsDB] Loaded', Object.keys(regionsData).length, 'regions');
})();


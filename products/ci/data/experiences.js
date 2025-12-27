/**
 * Centralized Experiences Data Store
 * 
 * This file serves as the single source of truth for all experience data.
 * When Supabase is ready, this will be replaced with API calls.
 * 
 * Usage in any page:
 *   <script src="../data/experiences.js"></script>
 *   const experience = window.ExperiencesDB.getById('exp-1');
 */

(function() {
    'use strict';

    // ==========================================================================
    // EXPERIENCES DATABASE - Single Source of Truth
    // ==========================================================================
    const EXPERIENCES = {
        // Support both numeric and prefixed IDs for backward compatibility
        '1': null, // Will be aliased to exp-1
        '2': null, // Will be aliased to exp-2
        
        'exp-1': {
            id: 'exp-1',
            name: 'Abidjan City Discovery Tour',
            category: 'Cultural Tour',
            location: 'Abidjan',
            region: 'abidjan',
            rating: 4.8,
            reviews: 89,
            price: 75,
            originalPrice: 85,
            discount: 12,
            duration: '6 hours',
            daysOfWeek: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
            groupSize: '2-8 people',
            languages: ['French', 'English'],
            description: 'Explore the vibrant heart of Abidjan with our comprehensive city tour. Visit the bustling Treichville market, marvel at St. Paul\'s Cathedral, stroll through the Plateau business district, and end with sunset views from the Banco National Park. This immersive experience showcases why Abidjan is called the "Pearl of Lagoons."',
            highlights: ['Treichville Market', 'St. Paul\'s Cathedral', 'Plateau District', 'Banco National Park', 'Local Cuisine Tasting', 'Street Art Tour'],
            images: [
                'https://images.unsplash.com/photo-1596401057633-54a921f99834?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1518611507436-f9221403cca2?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80'
            ],
            included: ['Professional guide', 'Transportation', 'Entrance fees', 'Light refreshments', 'Bottled water'],
            notIncluded: ['Meals', 'Personal expenses', 'Tips'],
            operator: {
                id: 'op-ci-55001',
                name: 'Kouamé Yao',
                logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                rating: 4.8,
                reviews: 89,
                verified: true,
                since: 2020,
                phone: '+225 07 08 09 10 11',
                whatsapp: '+225 07 08 09 10 11',
                email: 'kouame.yao@gmail.com'
            }
        },

        'exp-2': {
            id: 'exp-2',
            name: 'Club Med Assinie',
            category: 'Beach Resort',
            location: 'Assinie-Mafia',
            region: 'sud-comoe',
            rating: 4.8,
            reviews: 245,
            price: 250,
            originalPrice: 300,
            discount: 15,
            duration: 'Minimum 3 nights',
            daysOfWeek: ['Daily'],
            groupSize: 'Families & Couples',
            languages: ['French', 'English'],
            description: 'Escape to paradise at Club Med Assinie, where the Atlantic Ocean meets lush tropical gardens. This all-inclusive resort offers pristine beaches, water sports, kids clubs, and evening entertainment. Perfect for families seeking a memorable beach vacation with world-class service.',
            highlights: ['Private Beach', 'All-Inclusive Dining', 'Kids Club', 'Water Sports', 'Evening Entertainment', 'Spa Services'],
            images: [
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80'
            ],
            included: ['All meals & drinks', 'Water sports', 'Kids club access', 'Evening shows', 'WiFi'],
            notIncluded: ['Spa treatments', 'Excursions', 'Premium drinks', 'Airport transfers'],
            operator: {
                id: 'op-2',
                name: 'Club Med',
                logo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80',
                rating: 4.9,
                reviews: 200,
                verified: true,
                since: 2015,
                phone: '+225 21 23 45 67',
                whatsapp: '+225 21 23 45 67',
                email: 'contact@tourci.ci'
            }
        },

        'exp-3': {
            id: 'exp-3',
            name: 'Assinie Beach Day',
            category: 'Beach & Leisure',
            location: 'Assinie',
            region: 'sud-comoe',
            rating: 4.7,
            reviews: 134,
            price: 120,
            originalPrice: 140,
            discount: 14,
            duration: 'Full day',
            daysOfWeek: ['Daily'],
            groupSize: '2-12 people',
            languages: ['French', 'English'],
            description: 'Spend a perfect day at the stunning beaches of Assinie. Enjoy crystal-clear waters, water sports, fresh seafood lunch at a beachfront restaurant, and breathtaking sunset views.',
            highlights: ['Beach Access', 'Water Sports', 'Seafood Lunch', 'Sunset Views', 'Photography Spots'],
            images: [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80'
            ],
            included: ['Transportation', 'Beach setup', 'Lunch', 'Water sports equipment'],
            notIncluded: ['Drinks', 'Personal expenses'],
            operator: {
                id: 'co-ci-10004',
                name: 'Lagunes Adventures',
                logo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80',
                rating: 4.7,
                reviews: 156,
                verified: true,
                since: 2019,
                phone: '+225 27 21 77 88 99',
                whatsapp: '+225 07 21 77 88 99',
                email: 'hello@lagunes.ci'
            }
        },

        'exp-4': {
            id: 'exp-4',
            name: 'Comoé Safari Adventure',
            category: 'Safari & Wildlife',
            location: 'Comoé National Park',
            region: 'comoe',
            rating: 4.8,
            reviews: 78,
            price: 180,
            originalPrice: 200,
            discount: 10,
            duration: '2 days',
            daysOfWeek: ['Friday', 'Saturday'],
            groupSize: '4-8 people',
            languages: ['French', 'English'],
            description: 'Embark on an unforgettable safari adventure in Comoé National Park, a UNESCO World Heritage site. Spot elephants, hippos, antelopes, and over 500 bird species in their natural habitat.',
            highlights: ['Wildlife Viewing', 'Bird Watching', 'Camping', 'Photography', 'Local Guide'],
            images: [
                'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'
            ],
            included: ['Transportation', 'Park fees', 'Camping equipment', 'Meals', 'Guide'],
            notIncluded: ['Photography equipment', 'Travel insurance'],
            operator: {
                id: 'co-ci-10002',
                name: 'Safari Ivoirien',
                logo: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=200&q=80',
                rating: 4.8,
                reviews: 245,
                verified: true,
                since: 2014,
                phone: '+225 27 21 33 44 55',
                whatsapp: '+225 07 21 33 44 55',
                email: 'info@safariivoirien.ci'
            }
        },

        'exp-5': {
            id: 'exp-5',
            name: 'Grand-Bassam UNESCO Heritage Walk',
            category: 'Heritage & History',
            location: 'Grand-Bassam',
            region: 'sud-comoe',
            rating: 4.9,
            reviews: 200,
            price: 45,
            originalPrice: 55,
            discount: 18,
            duration: '3 hours',
            daysOfWeek: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
            groupSize: '2-10 people',
            languages: ['French', 'English'],
            description: 'Walk through history in Grand-Bassam, Côte d\'Ivoire\'s first capital and UNESCO World Heritage site. Explore colonial architecture, visit museums, and learn about the rich history of this charming coastal town.',
            highlights: ['Colonial Architecture', 'Museum Visits', 'Historical Commentary', 'Beach Walk', 'Photo Opportunities'],
            images: [
                'https://images.unsplash.com/photo-1582510003099-b374837a8162?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1518611507436-f9221403cca2?auto=format&fit=crop&w=800&q=80'
            ],
            included: ['Expert guide', 'Museum entrance', 'Refreshments'],
            notIncluded: ['Transportation to Grand-Bassam', 'Meals'],
            operator: {
                id: 'co-ci-10005',
                name: 'Bassam Heritage Tours',
                logo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
                rating: 4.9,
                reviews: 200,
                verified: true,
                since: 2015,
                phone: '+225 21 23 45 67',
                whatsapp: '+225 21 23 45 67',
                email: 'contact@bassamheritage.ci'
            }
        },

        'exp-6': {
            id: 'exp-6',
            name: 'Yamoussoukro Basilica & Palace Tour',
            category: 'Cultural & Religious',
            location: 'Yamoussoukro',
            region: 'yamoussoukro',
            rating: 4.6,
            reviews: 42,
            price: 65,
            originalPrice: 75,
            discount: 13,
            duration: '4 hours',
            daysOfWeek: ['Daily except Monday'],
            groupSize: '2-15 people',
            languages: ['French'],
            description: 'Visit the world\'s largest church, the Basilica of Our Lady of Peace, and the Presidential Palace with its sacred crocodile lake. A must-see experience in Côte d\'Ivoire\'s political capital.',
            highlights: ['Basilica Tour', 'Palace Gardens', 'Crocodile Lake', 'Architecture', 'History'],
            images: [
                'https://images.unsplash.com/photo-1580896697724-6cf7b0c5e5e8?auto=format&fit=crop&w=800&q=80'
            ],
            included: ['Guide', 'Entrance fees', 'Transportation within city'],
            notIncluded: ['Meals', 'Transport to Yamoussoukro'],
            operator: {
                id: 'op-ci-55002',
                name: 'Fatou Diallo',
                logo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
                rating: 4.6,
                reviews: 42,
                verified: true,
                since: 2019,
                phone: '+225 27 30 11 22 33',
                whatsapp: '+225 07 30 11 22 33',
                email: 'fatou.diallo@gmail.com'
            }
        },

        'exp-7': {
            id: 'exp-7',
            name: 'Korhogo Cloth Workshop',
            category: 'Art & Crafts',
            location: 'Korhogo',
            region: 'savanes',
            rating: 4.7,
            reviews: 67,
            price: 45,
            originalPrice: 50,
            discount: 10,
            duration: '4 hours',
            daysOfWeek: ['Daily'],
            groupSize: '2-6 people',
            languages: ['French', 'English'],
            description: 'Learn the ancient art of Senufo cloth painting in Korhogo. Work alongside master artisans to create your own traditional Korhogo cloth using natural dyes and centuries-old techniques.',
            highlights: ['Hands-on Workshop', 'Meet Artisans', 'Take Home Creation', 'Traditional Techniques'],
            images: [
                'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
            ],
            included: ['Materials', 'Instruction', 'Your finished cloth', 'Refreshments'],
            notIncluded: ['Transportation', 'Meals'],
            operator: {
                id: 'op-exp-7',
                name: 'Korhogo Artisans',
                logo: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=200&q=80',
                rating: 4.7,
                reviews: 67,
                verified: true,
                since: 2015,
                phone: '+225 27 34 55 66 77',
                whatsapp: '+225 07 34 55 66 77',
                email: 'info@korhogoartisans.ci'
            }
        },

        'exp-8': {
            id: 'exp-8',
            name: 'Bouaké Market & Culture Tour',
            category: 'Cultural Tour',
            location: 'Bouaké',
            region: 'vallee-du-bandama',
            rating: 4.7,
            reviews: 56,
            price: 55,
            originalPrice: 65,
            discount: 15,
            duration: '5 hours',
            daysOfWeek: ['Daily'],
            groupSize: '2-8 people',
            languages: ['French', 'Dioula'],
            description: 'Explore the vibrant markets and rich culture of Bouaké, the commercial hub of central Côte d\'Ivoire. Experience traditional textiles, local cuisine, and authentic Dioula hospitality.',
            highlights: ['Market Tour', 'Textile Shopping', 'Local Food Tasting', 'Cultural Experience'],
            images: [
                'https://images.unsplash.com/photo-1531588428361-55e36ee3aee2?auto=format&fit=crop&w=800&q=80'
            ],
            included: ['Guide', 'Tastings', 'Transport within city'],
            notIncluded: ['Purchases', 'Meals'],
            operator: {
                id: 'op-ci-55003',
                name: 'Ibrahim Koné',
                logo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
                rating: 4.7,
                reviews: 56,
                verified: true,
                since: 2018,
                phone: '+225 27 31 22 33 44',
                whatsapp: '+225 07 31 22 33 44',
                email: 'ibrahim.kone@gmail.com'
            }
        }
    };

    // Create numeric aliases for backward compatibility
    EXPERIENCES['1'] = EXPERIENCES['exp-1'];
    EXPERIENCES['2'] = EXPERIENCES['exp-2'];
    EXPERIENCES['3'] = EXPERIENCES['exp-3'];
    EXPERIENCES['4'] = EXPERIENCES['exp-4'];
    EXPERIENCES['5'] = EXPERIENCES['exp-5'];
    EXPERIENCES['6'] = EXPERIENCES['exp-6'];
    EXPERIENCES['7'] = EXPERIENCES['exp-7'];
    EXPERIENCES['8'] = EXPERIENCES['exp-8'];

    // ==========================================================================
    // API LAYER - Ready for Supabase migration
    // ==========================================================================
    const ExperiencesDB = {
        /**
         * Get experience by ID
         * @param {string} id - Experience ID
         * @returns {Object|null} Experience object or null if not found
         */
        getById: function(id) {
            return EXPERIENCES[id] || EXPERIENCES[String(id)] || null;
        },

        /**
         * Get all experiences
         * @returns {Object[]} Array of all experiences
         */
        getAll: function() {
            // Return unique experiences (exclude aliases)
            return Object.values(EXPERIENCES).filter((exp, index, self) => 
                exp && self.findIndex(e => e && e.id === exp.id) === index
            );
        },

        /**
         * Get experiences by region
         * @param {string} regionId - Region ID
         * @returns {Object[]} Array of experiences
         */
        getByRegion: function(regionId) {
            return this.getAll().filter(exp => exp.region === regionId);
        },

        /**
         * Get experiences by category
         * @param {string} category - Category name
         * @returns {Object[]} Array of experiences
         */
        getByCategory: function(category) {
            return this.getAll().filter(exp => 
                exp.category.toLowerCase().includes(category.toLowerCase())
            );
        },

        /**
         * Check if experience exists
         * @param {string} id - Experience ID
         * @returns {boolean}
         */
        exists: function(id) {
            return (id in EXPERIENCES) || (String(id) in EXPERIENCES);
        },

        /**
         * Get all experience IDs
         * @returns {string[]} Array of unique IDs
         */
        getAllIds: function() {
            return [...new Set(
                Object.values(EXPERIENCES)
                    .filter(exp => exp)
                    .map(exp => exp.id)
            )];
        }
    };

    // Export to window for global access
    window.ExperiencesDB = ExperiencesDB;
    window.EXPERIENCES_DATA = EXPERIENCES; // For backward compatibility

    console.log('[ExperiencesDB] Loaded', ExperiencesDB.getAll().length, 'experiences');

})();


/**
 * Centralized Operators Data Store
 * 
 * This file serves as the single source of truth for all operator data.
 * When Supabase is ready, this will be replaced with API calls.
 * 
 * Usage in any page:
 *   <script src="../data/operators.js"></script>
 *   const operator = window.OperatorsDB.getById('op-001');
 */

(function() {
    'use strict';

    // ==========================================================================
    // OPERATORS DATABASE - Single Source of Truth
    // ==========================================================================
    const OPERATORS = {
        // ======================================================================
        // COMPANY OPERATORS (co-ci-xxxxx)
        // ======================================================================
        'co-ci-10001': {
            id: 'co-ci-10001',
            type: 'company',
            name: 'Akwaba Tours CI',
            tagline: 'Your Gateway to Authentic Ivorian Adventures',
            logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80',
            rating: 4.9,
            reviewCount: 328,
            since: 2016,
            regNumber: 'MTI-2024-10001',
            phone: '+225 27 20 11 22 33',
            whatsapp: '+225 07 08 09 10 11',
            email: 'contact@akwabatours.ci',
            website: 'https://akwabatours.ci',
            verified: true,
            topRated: true,
            insured: true,
            localExpert: true,
            languages: ['French', 'English', 'Spanish'],
            about: 'Akwaba Tours CI is one of the most respected tour operators in Côte d\'Ivoire, offering premium travel experiences since 2016. With a team of 25 passionate guides and travel specialists, we\'ve helped over 15,000 travelers discover the Pearl of West Africa. Our name "Akwaba" means "Welcome" in Baoulé, and we embody this spirit in every journey we create.',
            services: ['Cultural Tours', 'Safari Expeditions', 'Beach Holidays', 'Business Travel', 'Group Tours', 'Private Tours', 'Airport Transfers', 'Hotel Bookings'],
            images: [
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'
            ],
            listings: [
                { id: 'it-1', name: 'Abidjan → Grand-Bassam → Assinie', price: 280, rating: 4.9, reviews: 156, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80', type: 'itinerary' },
                { id: 'exp-1', name: 'Abidjan City Discovery Tour', price: 75, rating: 4.8, reviews: 89, img: 'https://images.unsplash.com/photo-1596401057633-54a921f99834?auto=format&fit=crop&w=200&q=80', type: 'experience' }
            ],
            reviews: [
                { name: 'Marie Dupont', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', rating: 5, date: 'November 2024', text: 'Exceptional service from start to finish! Our guide Kouamé was incredibly knowledgeable about the local history and culture. Highly recommend!', countryCode: 'FR', verified: true, status: 'approved' },
                { name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', rating: 5, date: 'October 2024', text: 'Best tour experience I\'ve ever had in West Africa. Professional, punctual, and went above expectations.', countryCode: 'US', verified: true, status: 'approved' }
            ]
        },

        'co-ci-10002': {
            id: 'co-ci-10002',
            type: 'company',
            name: 'Safari Ivoirien',
            tagline: 'Experience the Wild Heart of Africa',
            logo: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=200&q=80',
            rating: 4.8,
            reviewCount: 245,
            since: 2014,
            regNumber: 'MTI-2024-10002',
            phone: '+225 27 21 33 44 55',
            whatsapp: '+225 07 21 33 44 55',
            email: 'info@safariivoirien.ci',
            website: 'https://safariivoirien.ci',
            verified: true,
            topRated: true,
            insured: true,
            localExpert: true,
            languages: ['French', 'English'],
            about: 'Safari Ivoirien specializes in wildlife adventures across Côte d\'Ivoire\'s national parks. From the elephants of Comoé to the hippos of Taï, we bring you face-to-face with Africa\'s magnificent wildlife in their natural habitat.',
            services: ['Safari Tours', 'Wildlife Photography', 'National Park Expeditions', 'Eco-Tourism', 'Bird Watching'],
            images: [
                'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'
            ],
            listings: [
                { id: 'exp-4', name: 'Comoé Safari Adventure', price: 180, rating: 4.8, reviews: 78, img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=200&q=80', type: 'experience' }
            ],
            reviews: [
                { name: 'Hans Mueller', rating: 5, date: 'December 2024', text: 'Incredible safari experience! Saw elephants, monkeys, and so many birds. The guides know exactly where to find wildlife.', countryCode: 'DE', verified: true, status: 'approved' }
            ]
        },

        'co-ci-10003': {
            id: 'co-ci-10003',
            type: 'company',
            name: 'Côte d\'Ivoire Prestige',
            tagline: 'Luxury Travel Redefined',
            logo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80',
            rating: 4.9,
            reviewCount: 178,
            since: 2018,
            regNumber: 'MTI-2024-10003',
            phone: '+225 27 22 55 66 77',
            whatsapp: '+225 07 22 55 66 77',
            email: 'concierge@ciprestige.ci',
            website: 'https://ciprestige.ci',
            verified: true,
            topRated: true,
            insured: true,
            localExpert: false,
            languages: ['French', 'English', 'Arabic'],
            about: 'Côte d\'Ivoire Prestige caters to discerning travelers seeking the finest experiences. From private jets to exclusive villa rentals, we handle every detail of your luxury journey.',
            services: ['Luxury Tours', 'Private Transfers', 'VIP Services', 'Exclusive Experiences', 'Yacht Charters'],
            images: [
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
            ],
            listings: [
                { id: 'exp-2', name: 'Club Med Assinie', price: 250, rating: 4.8, reviews: 245, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80', type: 'experience' }
            ],
            reviews: [
                { name: 'Sophie Laurent', rating: 5, date: 'November 2024', text: 'Absolute perfection. Every detail was taken care of. This is how travel should be.', countryCode: 'FR', verified: true, status: 'approved' }
            ]
        },

        'co-ci-10004': {
            id: 'co-ci-10004',
            type: 'company',
            name: 'Lagunes Adventures',
            tagline: 'Coastal Wonders Await',
            logo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80',
            rating: 4.7,
            reviewCount: 156,
            since: 2019,
            regNumber: 'MTI-2024-10004',
            phone: '+225 27 21 77 88 99',
            whatsapp: '+225 07 21 77 88 99',
            email: 'hello@lagunes.ci',
            website: 'https://lagunes.ci',
            verified: true,
            topRated: false,
            insured: true,
            localExpert: true,
            languages: ['French', 'English'],
            about: 'Lagunes Adventures is your specialist for coastal and lagoon experiences in Côte d\'Ivoire. From Grand-Bassam to Assinie, we know every beach, every fishing village, and every hidden gem along the coast.',
            services: ['Beach Tours', 'Lagoon Cruises', 'Fishing Trips', 'Water Sports', 'Island Hopping'],
            images: [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
            ],
            listings: [
                { id: 'exp-3', name: 'Assinie Beach Day', price: 120, rating: 4.7, reviews: 134, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80', type: 'experience' }
            ],
            reviews: [
                { name: 'Amara Koné', rating: 5, date: 'October 2024', text: 'Best beach experience in CI! The team knows all the local spots.', countryCode: 'CI', verified: true, status: 'approved' }
            ]
        },

        'co-ci-10005': {
            id: 'co-ci-10005',
            type: 'company',
            name: 'Bassam Heritage Tours',
            tagline: 'Where History Comes Alive',
            logo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
            rating: 4.9,
            reviewCount: 200,
            since: 2015,
            regNumber: 'MTI-2024-10005',
            phone: '+225 21 23 45 67',
            whatsapp: '+225 21 23 45 67',
            email: 'contact@bassamheritage.ci',
            website: 'https://bassamheritage.ci',
            verified: true,
            topRated: true,
            insured: true,
            localExpert: true,
            languages: ['French', 'English'],
            about: 'Bassam Heritage Tours specializes in UNESCO World Heritage site experiences in Grand-Bassam, the historic first capital of Côte d\'Ivoire. Our expert historians bring the colonial era to life through immersive walking tours.',
            services: ['Heritage Tours', 'Walking Tours', 'Cultural Experiences', 'Photography Tours', 'Museum Visits'],
            images: [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
            ],
            listings: [
                { id: 'exp-5', name: 'Grand-Bassam UNESCO Heritage Walk', price: 45, rating: 4.9, reviews: 200, img: 'https://images.unsplash.com/photo-1582510003099-b374837a8162?auto=format&fit=crop&w=200&q=80', type: 'experience' }
            ],
            reviews: [
                { name: 'Pierre Martin', rating: 5, date: 'December 2024', text: 'Fascinating history tour! Our guide was incredibly knowledgeable about the colonial architecture.', countryCode: 'FR', verified: true, status: 'approved' }
            ]
        },

        // ======================================================================
        // INDIVIDUAL OPERATORS (op-ci-xxxxx)
        // ======================================================================
        'op-ci-55001': {
            id: 'op-ci-55001',
            type: 'individual',
            name: 'Kouamé Yao',
            tagline: 'Your Personal Guide to Abidjan',
            logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            rating: 4.8,
            reviewCount: 89,
            since: 2020,
            regNumber: 'MTI-2024-55001',
            phone: '+225 07 08 09 10 11',
            whatsapp: '+225 07 08 09 10 11',
            email: 'kouame.yao@gmail.com',
            website: '',
            verified: true,
            topRated: true,
            insured: true,
            localExpert: true,
            languages: ['French', 'English', 'Baoulé'],
            about: 'Born and raised in Abidjan, Kouamé Yao is a licensed independent guide with deep knowledge of the city\'s neighborhoods, markets, and hidden gems. With over 5 years of experience and fluency in 3 languages, he provides personalized tours for solo travelers, couples, and small groups across 5 regions.',
            services: ['City Tours', 'Market Tours', 'Food Tours', 'Local Experiences', 'Photography Tours'],
            images: [
                'https://images.unsplash.com/photo-1596401057633-54a921f99834?auto=format&fit=crop&w=800&q=80'
            ],
            listings: [
                { id: 'exp-1', name: 'Abidjan City Discovery Tour', price: 75, rating: 4.8, reviews: 89, img: 'https://images.unsplash.com/photo-1596401057633-54a921f99834?auto=format&fit=crop&w=200&q=80', type: 'experience' }
            ],
            reviews: [
                { name: 'Emma Thompson', rating: 5, date: 'November 2024', text: 'Kouamé is the BEST guide! His knowledge of Abidjan is unmatched.', countryCode: 'GB', verified: true, status: 'approved' }
            ]
        },

        'op-ci-55002': {
            id: 'op-ci-55002',
            type: 'individual',
            name: 'Fatou Diallo',
            tagline: 'Your Personal Guide to Yamoussoukro',
            logo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
            rating: 4.6,
            reviewCount: 42,
            since: 2019,
            regNumber: 'MTI-2024-55002',
            phone: '+225 27 30 11 22 33',
            whatsapp: '+225 07 30 11 22 33',
            email: 'fatou.diallo@gmail.com',
            website: '',
            verified: true,
            topRated: false,
            insured: true,
            localExpert: true,
            languages: ['French'],
            about: 'Fatou Diallo is an independent guide based in Yamoussoukro, the political capital. Specializing in tours of the magnificent Basilica of Our Lady of Peace and the Presidential Palace crocodile lake, Fatou brings local insights and warm hospitality to every experience across 2 regions.',
            services: ['Basilica Tours', 'Palace Tours', 'City Tours', 'Local Experiences'],
            images: [
                'https://images.unsplash.com/photo-1580896697724-6cf7b0c5e5e8?auto=format&fit=crop&w=800&q=80'
            ],
            listings: [
                { id: 'exp-6', name: 'Yamoussoukro Basilica & Palace Tour', price: 65, rating: 4.6, reviews: 42, img: 'https://images.unsplash.com/photo-1580896697724-6cf7b0c5e5e8?auto=format&fit=crop&w=200&q=80', type: 'experience' }
            ],
            reviews: [
                { name: 'Claude Bernard', rating: 5, date: 'October 2024', text: 'Fatou made our visit to the Basilica unforgettable. So much history!', countryCode: 'FR', verified: true, status: 'approved' }
            ]
        },

        'op-ci-55003': {
            id: 'op-ci-55003',
            type: 'individual',
            name: 'Ibrahim Koné',
            tagline: 'Discover the Real Bouaké',
            logo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
            rating: 4.7,
            reviewCount: 56,
            since: 2018,
            regNumber: 'MTI-2024-55003',
            phone: '+225 27 31 22 33 44',
            whatsapp: '+225 07 31 22 33 44',
            email: 'ibrahim.kone@gmail.com',
            website: '',
            verified: true,
            topRated: false,
            insured: true,
            localExpert: true,
            languages: ['French', 'Dioula'],
            about: 'Ibrahim Koné is a certified guide based in Bouaké, the commercial hub of central Côte d\'Ivoire. With deep roots in the local Dioula community, Ibrahim offers authentic cultural experiences including market tours, textile workshops, and traditional music performances.',
            services: ['Market Tours', 'Cultural Tours', 'Textile Workshops', 'Music Experiences'],
            images: [
                'https://images.unsplash.com/photo-1531588428361-55e36ee3aee2?auto=format&fit=crop&w=800&q=80'
            ],
            listings: [
                { id: 'exp-8', name: 'Bouaké Market & Culture Tour', price: 55, rating: 4.7, reviews: 56, img: 'https://images.unsplash.com/photo-1531588428361-55e36ee3aee2?auto=format&fit=crop&w=200&q=80', type: 'experience' }
            ],
            reviews: [
                { name: 'Aisha Mohammed', rating: 5, date: 'September 2024', text: 'Ibrahim showed us the real Bouaké. The textile market was amazing!', countryCode: 'NG', verified: true, status: 'approved' }
            ]
        },

        // ======================================================================
        // EXPERIENCE-LINKED OPERATORS (op-exp-x for backward compatibility)
        // ======================================================================
        'op-exp-1': {
            id: 'op-exp-1',
            type: 'individual',
            name: 'Abidjan City Guides',
            tagline: 'Discover Abidjan Like a Local',
            logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            rating: 4.8,
            reviewCount: 89,
            since: 2018,
            regNumber: 'MTI-2024-00159',
            phone: '+225 27 20 11 22 33',
            whatsapp: '+225 07 20 11 22 33',
            email: 'info@abidjancityguides.ci',
            website: 'https://abidjancityguides.ci',
            verified: true,
            topRated: true,
            insured: true,
            localExpert: true,
            languages: ['French', 'English'],
            about: 'Abidjan City Guides is a collective of passionate locals offering authentic urban experiences in the Pearl of West Africa.',
            services: ['City Tours', 'Walking Tours', 'Food Tours', 'Nightlife Tours'],
            images: ['https://images.unsplash.com/photo-1596401057633-54a921f99834?auto=format&fit=crop&w=400&q=80'],
            listings: [{ id: 'exp-1', name: 'Abidjan City Discovery', price: 75, rating: 4.8, reviews: 89, img: 'https://images.unsplash.com/photo-1596401057633-54a921f99834?auto=format&fit=crop&w=200&q=80', type: 'experience' }],
            reviews: [{ name: 'Tourist', rating: 5, date: 'October 2024', text: 'Amazing experience exploring Abidjan!', countryCode: 'US', verified: true, status: 'approved' }]
        },

        'op-exp-2': {
            id: 'op-exp-2',
            type: 'company',
            name: 'Club Med',
            tagline: 'All-Inclusive Paradise',
            logo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80',
            rating: 4.8,
            reviewCount: 245,
            since: 2005,
            regNumber: 'MTI-2024-00002',
            phone: '+225 27 21 55 66 77',
            whatsapp: '+225 07 21 55 66 77',
            email: 'info@clubmed.ci',
            website: 'https://clubmed.ci',
            verified: true,
            topRated: true,
            insured: true,
            localExpert: false,
            languages: ['French', 'English'],
            about: 'Club Med Assinie is Côte d\'Ivoire\'s premier all-inclusive beach resort offering world-class amenities and unforgettable experiences.',
            services: ['All-Inclusive Resort', 'Water Sports', 'Kids Club', 'Entertainment', 'Dining'],
            images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80'],
            listings: [{ id: 'exp-2', name: 'Club Med Assinie', price: 250, rating: 4.8, reviews: 245, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80', type: 'experience' }],
            reviews: [{ name: 'Guest', rating: 5, date: 'November 2024', text: 'Paradise found!', countryCode: 'FR', verified: true, status: 'approved' }]
        },

        'op-exp-7': {
            id: 'op-exp-7',
            type: 'company',
            name: 'Korhogo Artisans',
            tagline: 'Traditional Senufo Cloth Painters',
            logo: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=200&q=80',
            rating: 4.7,
            reviewCount: 67,
            since: 2015,
            regNumber: 'MTI-2024-00162',
            phone: '+225 27 34 55 66 77',
            whatsapp: '+225 07 34 55 66 77',
            email: 'info@korhogoartisans.ci',
            website: 'https://korhogoartisans.ci',
            verified: true,
            topRated: true,
            insured: true,
            localExpert: true,
            languages: ['French', 'English'],
            about: 'Korhogo Artisans is a cooperative of master Senufo cloth painters offering authentic workshops in the traditional art form that has been passed down through generations.',
            services: ['Cloth Painting Workshop', 'Art Tours', 'Village Visits', 'Cultural Immersion'],
            images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80'],
            listings: [{ id: 'exp-7', name: 'Korhogo Cloth Workshop', price: 45, rating: 4.7, reviews: 67, img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=200&q=80', type: 'experience' }],
            reviews: [{ name: 'Art Lover', rating: 5, date: 'September 2024', text: 'Amazing traditional craft experience!', countryCode: 'US', verified: true, status: 'approved' }]
        },

        // Alias for op-2 used in some experience links
        'op-2': {
            id: 'op-2',
            type: 'company',
            name: 'Club Med',
            tagline: 'All-Inclusive Paradise',
            logo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80',
            rating: 4.8,
            reviewCount: 245,
            since: 2005,
            regNumber: 'MTI-2024-00002',
            phone: '+225 27 21 55 66 77',
            whatsapp: '+225 07 21 55 66 77',
            email: 'info@clubmed.ci',
            website: 'https://clubmed.ci',
            verified: true,
            topRated: true,
            insured: true,
            localExpert: false,
            languages: ['French', 'English'],
            about: 'Club Med Assinie is Côte d\'Ivoire\'s premier all-inclusive beach resort.',
            services: ['All-Inclusive Resort', 'Water Sports', 'Kids Club', 'Entertainment'],
            images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80'],
            listings: [{ id: '2', name: 'Club Med Assinie', price: 250, rating: 4.8, reviews: 245, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80', type: 'experience' }],
            reviews: [{ name: 'Guest', rating: 5, date: 'November 2024', text: 'Paradise!', countryCode: 'FR', verified: true, status: 'approved' }]
        }
    };

    // ==========================================================================
    // API LAYER - Ready for Supabase migration
    // ==========================================================================
    const OperatorsDB = {
        /**
         * Get operator by ID
         * @param {string} id - Operator ID
         * @returns {Object|null} Operator object or null if not found
         */
        getById: function(id) {
            return OPERATORS[id] || null;
        },

        /**
         * Get all operators
         * @returns {Object[]} Array of all operators
         */
        getAll: function() {
            return Object.values(OPERATORS);
        },

        /**
         * Get operators filtered by type
         * @param {string} type - 'company' or 'individual'
         * @returns {Object[]} Array of operators
         */
        getByType: function(type) {
            return Object.values(OPERATORS).filter(op => op.type === type);
        },

        /**
         * Get verified operators only
         * @returns {Object[]} Array of verified operators
         */
        getVerified: function() {
            return Object.values(OPERATORS).filter(op => op.verified === true);
        },

        /**
         * Get top-rated operators
         * @returns {Object[]} Array of top-rated operators
         */
        getTopRated: function() {
            return Object.values(OPERATORS).filter(op => op.topRated === true);
        },

        /**
         * Check if operator exists
         * @param {string} id - Operator ID
         * @returns {boolean}
         */
        exists: function(id) {
            return id in OPERATORS;
        },

        /**
         * Get all operator IDs
         * @returns {string[]} Array of IDs
         */
        getAllIds: function() {
            return Object.keys(OPERATORS);
        }
    };

    // Export to window for global access
    window.OperatorsDB = OperatorsDB;
    window.OPERATORS_DATA = OPERATORS; // For backward compatibility

    console.log('[OperatorsDB] Loaded', Object.keys(OPERATORS).length, 'operators');

})();


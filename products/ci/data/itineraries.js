/**
 * Centralized Itineraries Data Store
 * 
 * This file serves as the single source of truth for all itinerary data.
 * When Supabase is ready, this will be replaced with API calls.
 * 
 * Usage in any page:
 *   <script src="../data/itineraries.js"></script>
 *   const itinerary = window.ItinerariesDB.getById('it-1');
 */

(function() {
    'use strict';

    // ==========================================================================
    // ITINERARIES DATABASE - Single Source of Truth
    // ==========================================================================
    const ITINERARIES = {
        'it-1': {
            id: 'it-1',
            title: 'Abidjan → Grand-Bassam → Assinie',
            type: 'Beach & Heritage',
            duration: '3 days',
            groupSize: '2-8 people',
            languages: ['French', 'English'],
            diaPick: true,
            rating: 4.9,
            reviews: 156,
            price: 280,
            originalPrice: 350,
            discount: 20,
            description: 'Experience the best of Côte d\'Ivoire\'s coastline with this 3-day journey from vibrant Abidjan to the UNESCO heritage town of Grand-Bassam and the pristine beaches of Assinie. Perfect for first-time visitors wanting to experience culture, history, and relaxation.',
            tags: ['Coastal', 'UNESCO', 'Beach', 'Heritage'],
            images: [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1582510003099-b374837a8162?auto=format&fit=crop&w=800&q=80'
            ],
            days: [
                {
                    day: 1,
                    title: 'Abidjan Discovery',
                    description: 'Arrive in Abidjan and explore the Plateau district, visit the Treichville market, and enjoy dinner at a rooftop restaurant.',
                    highlights: ['Airport pickup', 'City tour', 'Local market', 'Welcome dinner']
                },
                {
                    day: 2,
                    title: 'Grand-Bassam Heritage',
                    description: 'Drive to Grand-Bassam, explore the UNESCO World Heritage colonial quarter, visit museums, and enjoy fresh seafood.',
                    highlights: ['UNESCO site', 'Colonial architecture', 'Beach walk', 'Seafood lunch']
                },
                {
                    day: 3,
                    title: 'Assinie Beach Paradise',
                    description: 'Relax on the pristine beaches of Assinie, enjoy water sports, and watch the sunset before returning to Abidjan.',
                    highlights: ['Beach time', 'Water sports', 'Sunset cruise', 'Airport drop-off']
                }
            ],
            included: ['Accommodation (2 nights)', 'Transportation', 'English-speaking guide', 'Breakfast daily', 'Entrance fees'],
            notIncluded: ['Flights', 'Lunch/Dinner (except Day 1)', 'Personal expenses', 'Travel insurance'],
            operator: {
                id: 'co-ci-10001',
                name: 'Akwaba Tours CI',
                logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80',
                rating: 4.9,
                reviews: 328,
                verified: true,
                since: 2016,
                phone: '+225 27 20 11 22 33',
                whatsapp: '+225 07 08 09 10 11',
                email: 'contact@akwabatours.ci'
            }
        },

        'it-2': {
            id: 'it-2',
            title: 'Abidjan → Yamoussoukro → Bouaké',
            type: 'Cultural Discovery',
            duration: '4 days',
            groupSize: '2-10 people',
            languages: ['French', 'English'],
            diaPick: true,
            rating: 4.8,
            reviews: 98,
            price: 350,
            originalPrice: 420,
            discount: 17,
            description: 'Discover the cultural heart of Côte d\'Ivoire on this 4-day journey from Abidjan to the political capital Yamoussoukro and the commercial hub of Bouaké. Visit the world\'s largest basilica and experience authentic Ivorian culture.',
            tags: ['Culture', 'Basilica', 'Markets', 'History'],
            images: [
                'https://images.unsplash.com/photo-1580896697724-6cf7b0c5e5e8?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1531588428361-55e36ee3aee2?auto=format&fit=crop&w=800&q=80'
            ],
            days: [
                {
                    day: 1,
                    title: 'Abidjan to Yamoussoukro',
                    description: 'Depart Abidjan, drive through beautiful landscapes to Yamoussoukro.',
                    highlights: ['Scenic drive', 'Village stops', 'Hotel check-in']
                },
                {
                    day: 2,
                    title: 'Yamoussoukro Exploration',
                    description: 'Full day exploring the Basilica of Our Lady of Peace and Presidential Palace.',
                    highlights: ['Basilica tour', 'Palace gardens', 'Crocodile lake']
                },
                {
                    day: 3,
                    title: 'Bouaké Markets',
                    description: 'Drive to Bouaké and immerse yourself in the vibrant markets and local culture.',
                    highlights: ['Market tour', 'Textile shopping', 'Local cuisine']
                },
                {
                    day: 4,
                    title: 'Return to Abidjan',
                    description: 'Morning at leisure, then return to Abidjan with scenic stops along the way.',
                    highlights: ['Village visits', 'Photo opportunities', 'Airport drop-off']
                }
            ],
            included: ['Accommodation (3 nights)', 'Transportation', 'Guide', 'Breakfast daily', 'Entrance fees'],
            notIncluded: ['Flights', 'Meals', 'Personal expenses'],
            operator: {
                id: 'co-ci-10001',
                name: 'Akwaba Tours CI',
                logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80',
                rating: 4.9,
                reviews: 328,
                verified: true,
                since: 2016,
                phone: '+225 27 20 11 22 33',
                whatsapp: '+225 07 08 09 10 11',
                email: 'contact@akwabatours.ci'
            }
        },

        'it-3': {
            id: 'it-3',
            title: 'Wildlife Safari Adventure',
            type: 'Safari & Nature',
            duration: '5 days',
            groupSize: '4-8 people',
            languages: ['French', 'English'],
            diaPick: false,
            rating: 4.7,
            reviews: 45,
            price: 550,
            originalPrice: 650,
            discount: 15,
            description: 'Explore Côte d\'Ivoire\'s incredible wildlife in the UNESCO-listed Comoé National Park and Taï National Park. See elephants, hippos, chimpanzees, and hundreds of bird species.',
            tags: ['Safari', 'Wildlife', 'Nature', 'UNESCO'],
            images: [
                'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'
            ],
            days: [
                { day: 1, title: 'Arrival & Briefing', description: 'Arrive, safety briefing, and first game drive.', highlights: ['Orientation', 'Sunset game drive'] },
                { day: 2, title: 'Comoé Full Day', description: 'Full day safari in Comoé National Park.', highlights: ['Wildlife viewing', 'Bird watching'] },
                { day: 3, title: 'Comoé to Taï', description: 'Transfer to Taï National Park.', highlights: ['Scenic drive', 'Forest trails'] },
                { day: 4, title: 'Chimpanzee Tracking', description: 'Track chimpanzees in their natural habitat.', highlights: ['Chimp encounter', 'Forest walk'] },
                { day: 5, title: 'Return', description: 'Morning walk and return to Abidjan.', highlights: ['Final safari', 'Departure'] }
            ],
            included: ['Accommodation', 'All transport', 'Park fees', 'Guide', 'Meals'],
            notIncluded: ['Flights', 'Personal items', 'Tips'],
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

        'it-4': {
            id: 'it-4',
            title: 'Northern Cultural Immersion',
            type: 'Cultural & Art',
            duration: '6 days',
            groupSize: '2-6 people',
            languages: ['French'],
            diaPick: false,
            rating: 4.9,
            reviews: 34,
            price: 480,
            originalPrice: 580,
            discount: 17,
            description: 'Journey to the north of Côte d\'Ivoire to experience Senufo culture, traditional mask ceremonies, and the famous Korhogo cloth painting.',
            tags: ['Culture', 'Art', 'Traditions', 'Masks'],
            images: [
                'https://images.unsplash.com/photo-1531588428361-55e36ee3aee2?auto=format&fit=crop&w=800&q=80'
            ],
            days: [
                { day: 1, title: 'Abidjan to Korhogo', description: 'Journey north with stops at key villages.', highlights: ['Scenic drive', 'Village stops'] },
                { day: 2, title: 'Korhogo Art', description: 'Learn cloth painting from master artisans.', highlights: ['Workshop', 'Create your own'] },
                { day: 3, title: 'Senufo Villages', description: 'Visit traditional Senufo villages.', highlights: ['Village life', 'Crafts'] },
                { day: 4, title: 'Mask Ceremonies', description: 'Witness sacred mask dances (seasonal).', highlights: ['Traditional dance', 'Cultural exchange'] },
                { day: 5, title: 'Man & Dent', description: 'Explore the Dent de Man region.', highlights: ['Mountain views', 'Hiking'] },
                { day: 6, title: 'Return', description: 'Return to Abidjan.', highlights: ['Departure'] }
            ],
            included: ['Accommodation', 'Transport', 'Guide', 'Workshops', 'Meals'],
            notIncluded: ['Flights', 'Personal purchases', 'Tips'],
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

        'it-5': {
            id: 'it-5',
            title: 'Luxury Coastal Retreat',
            type: 'Luxury & Relaxation',
            duration: '7 days',
            groupSize: '2 people',
            languages: ['French', 'English'],
            diaPick: true,
            rating: 5.0,
            reviews: 28,
            price: 1200,
            originalPrice: 1500,
            discount: 20,
            description: 'Ultimate luxury experience along Côte d\'Ivoire\'s coast. Stay in premium resorts, enjoy spa treatments, private dining, and exclusive experiences.',
            tags: ['Luxury', 'Beach', 'Spa', 'Romance'],
            images: [
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
            ],
            days: [
                { day: 1, title: 'Arrival', description: 'VIP airport pickup, champagne welcome.', highlights: ['Private transfer', 'Welcome dinner'] },
                { day: 2, title: 'Spa Day', description: 'Full day of relaxation and treatments.', highlights: ['Couples massage', 'Pool'] },
                { day: 3, title: 'Private Beach', description: 'Private beach setup with gourmet lunch.', highlights: ['Beach', 'Fine dining'] },
                { day: 4, title: 'Yacht Day', description: 'Private yacht cruise along the coast.', highlights: ['Yacht', 'Sunset'] },
                { day: 5, title: 'Grand-Bassam', description: 'Private heritage tour and shopping.', highlights: ['Private guide', 'Antiques'] },
                { day: 6, title: 'Culinary', description: 'Private cooking class with renowned chef.', highlights: ['Cooking class', 'Wine pairing'] },
                { day: 7, title: 'Departure', description: 'Leisurely departure.', highlights: ['VIP transfer'] }
            ],
            included: ['5-star accommodation', 'All meals', 'Private transfers', 'Spa', 'Yacht', 'Cooking class'],
            notIncluded: ['Flights', 'Premium alcohol'],
            operator: {
                id: 'co-ci-10003',
                name: 'Côte d\'Ivoire Prestige',
                logo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80',
                rating: 4.9,
                reviews: 178,
                verified: true,
                since: 2018,
                phone: '+225 27 22 55 66 77',
                whatsapp: '+225 07 22 55 66 77',
                email: 'concierge@ciprestige.ci'
            }
        },

        'it-6': {
            id: 'it-6',
            title: 'Complete Côte d\'Ivoire',
            type: 'Comprehensive Tour',
            duration: '10 days',
            groupSize: '4-12 people',
            languages: ['French', 'English'],
            diaPick: true,
            rating: 4.9,
            reviews: 67,
            price: 890,
            originalPrice: 1100,
            discount: 19,
            description: 'The ultimate Côte d\'Ivoire experience covering all major destinations: Abidjan, Grand-Bassam, Yamoussoukro, Bouaké, Korhogo, Man, and Assinie.',
            tags: ['Complete', 'All-Inclusive', 'Comprehensive'],
            images: [
                'https://images.unsplash.com/photo-1596401057633-54a921f99834?auto=format&fit=crop&w=800&q=80'
            ],
            days: [
                { day: 1, title: 'Abidjan', description: 'Arrive and explore Abidjan.', highlights: ['City tour'] },
                { day: 2, title: 'Grand-Bassam', description: 'UNESCO heritage.', highlights: ['Heritage walk'] },
                { day: 3, title: 'Yamoussoukro', description: 'Basilica.', highlights: ['Basilica tour'] },
                { day: 4, title: 'Yamoussoukro', description: 'Palace.', highlights: ['Palace visit'] },
                { day: 5, title: 'Bouaké', description: 'Markets.', highlights: ['Market tour'] },
                { day: 6, title: 'Korhogo', description: 'Drive north.', highlights: ['Scenic route'] },
                { day: 7, title: 'Korhogo', description: 'Art workshops.', highlights: ['Cloth painting'] },
                { day: 8, title: 'Man', description: 'Mountains.', highlights: ['Hiking'] },
                { day: 9, title: 'Assinie', description: 'Beach.', highlights: ['Beach day'] },
                { day: 10, title: 'Departure', description: 'Return to Abidjan.', highlights: ['Farewell'] }
            ],
            included: ['All accommodation', 'Transport', 'Guide', 'Entrance fees', 'Most meals'],
            notIncluded: ['Flights', 'Some meals', 'Tips'],
            operator: {
                id: 'co-ci-10001',
                name: 'Akwaba Tours CI',
                logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80',
                rating: 4.9,
                reviews: 328,
                verified: true,
                since: 2016,
                phone: '+225 27 20 11 22 33',
                whatsapp: '+225 07 08 09 10 11',
                email: 'contact@akwabatours.ci'
            }
        }
    };

    // ==========================================================================
    // API LAYER - Ready for Supabase migration
    // ==========================================================================
    const ItinerariesDB = {
        getById: function(id) {
            return ITINERARIES[id] || null;
        },

        getAll: function() {
            return Object.values(ITINERARIES);
        },

        getDiaPicks: function() {
            return Object.values(ITINERARIES).filter(it => it.diaPick === true);
        },

        getByType: function(type) {
            return Object.values(ITINERARIES).filter(it => 
                it.type.toLowerCase().includes(type.toLowerCase())
            );
        },

        exists: function(id) {
            return id in ITINERARIES;
        },

        getAllIds: function() {
            return Object.keys(ITINERARIES);
        }
    };

    // Export to window for global access
    window.ItinerariesDB = ItinerariesDB;
    window.ITINERARIES_DATA = ITINERARIES;

    console.log('[ItinerariesDB] Loaded', Object.keys(ITINERARIES).length, 'itineraries');

})();


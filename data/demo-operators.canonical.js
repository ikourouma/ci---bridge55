/**
 * CANONICAL DEMO OPERATOR DATASET
 * Part of the CURSOR MASTER INSTRUCTION v9 Standard
 * 
 * This is the single source of truth for demo operators.
 * All demo cards, listings, and references must use this dataset.
 * 
 * Schema Contract (DO NOT CHANGE):
 * - id: Unique operator ID (op-{country}-{number})
 * - country: ISO 2-letter country code
 * - type: "company" | "individual"
 * - companyId: Tourism Board Company ID (for companies)
 * - name: Display name
 * - description: Full description
 * - verified: Boolean (super admin approved)
 * - rating: 1-5 decimal
 * - reviews: Total review count
 * - since: Year established
 * - registrationNumber: Official registration
 * - badges: Array of badge names
 * - logo: Path to logo image
 * - contact: { phone, whatsapp, email, website }
 * - services: Array of service types
 * - regions: Array of regions covered
 * - images: Array of image paths
 * - operators: Array of individual operators (for companies)
 * 
 * @module demo-operators
 * @version 1.0.0
 * @date 2025-12-27
 */

(function() {
    'use strict';

    const DEMO_OPERATORS = [
        // =========================================================================
        // CÔTE D'IVOIRE OPERATORS
        // =========================================================================
        {
            id: "op-ci-001",
            country: "ci",
            type: "company",
            companyId: "CI-TB-2024-001",
            name: "Heritage & Nature Côte d'Ivoire",
            description: "Officially licensed cultural and eco-tourism operator specializing in curated journeys across Côte d'Ivoire. We offer immersive experiences that connect travelers with the authentic heart of Ivorian culture, from the bustling markets of Abidjan to the sacred forests of Man.",
            verified: true,
            rating: 4.9,
            reviews: 312,
            since: 2017,
            registrationNumber: "MTI-CI-000231",
            badges: ["Verified", "Insured", "Top Rated", "Eco-Certified"],
            logo: "/assets/operators/heritage-ci.png",
            cover: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80",
            contact: {
                phone: "+2252721456789",
                whatsapp: "+2250708091011",
                email: "contact@heritageci.ci",
                website: "https://heritageci.ci"
            },
            services: ["Itineraries", "Experiences", "Private Tours", "Cultural Immersion"],
            regions: ["Abidjan", "Grand-Bassam", "Man", "Yamoussoukro", "Korhogo"],
            languages: ["French", "English", "Dioula"],
            images: [
                "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
            ],
            operators: [
                {
                    operatorId: "op-ci-001-a",
                    name: "Jean Kouamé",
                    role: "Lead Cultural Guide",
                    registrationNumber: "CI-GUIDE-88921",
                    languages: ["French", "English", "Dioula"],
                    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                },
                {
                    operatorId: "op-ci-001-b",
                    name: "Aminata Diallo",
                    role: "Eco-Tourism Specialist",
                    registrationNumber: "CI-GUIDE-77654",
                    languages: ["French", "English"],
                    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80"
                }
            ]
        },
        {
            id: "op-ci-002",
            country: "ci",
            type: "company",
            companyId: "CI-TB-2024-002",
            name: "Ivory Coast Adventures",
            description: "Premier adventure tourism operator offering thrilling experiences from mountain trekking in the west to beach activities along the Atlantic coast. Our expert guides bring over 15 years of combined experience in outdoor adventures.",
            verified: true,
            rating: 4.8,
            reviews: 287,
            since: 2015,
            registrationNumber: "MTI-CI-000187",
            badges: ["Verified", "Insured", "Adventure Certified"],
            logo: "/assets/operators/ica-logo.png",
            cover: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
            contact: {
                phone: "+2252722334455",
                whatsapp: "+2250507654321",
                email: "info@icadventures.ci",
                website: "https://icadventures.ci"
            },
            services: ["Trekking", "Beach Tours", "Wildlife Safari", "Mountain Climbing"],
            regions: ["Man", "Taï", "Assinie", "San-Pédro"],
            languages: ["French", "English"],
            images: [
                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80"
            ],
            operators: [
                {
                    operatorId: "op-ci-002-a",
                    name: "Moussa Traoré",
                    role: "Adventure Guide Lead",
                    registrationNumber: "CI-GUIDE-55432",
                    languages: ["French", "English"],
                    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                }
            ]
        },
        {
            id: "op-ci-003",
            country: "ci",
            type: "individual",
            companyId: null,
            name: "Marie-Claire Bamba",
            description: "Independent culinary tour guide specializing in Ivorian gastronomy. I take small groups through local markets, street food scenes, and traditional cooking experiences in Abidjan and beyond.",
            verified: true,
            rating: 4.95,
            reviews: 156,
            since: 2019,
            registrationNumber: "CI-GUIDE-99123",
            badges: ["Verified", "Top Rated", "Culinary Expert"],
            logo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
            cover: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
            contact: {
                phone: "+2250708887766",
                whatsapp: "+2250708887766",
                email: "marieclaire.tours@gmail.com",
                website: null
            },
            services: ["Food Tours", "Cooking Classes", "Market Tours"],
            regions: ["Abidjan", "Grand-Bassam"],
            languages: ["French", "English"],
            images: [
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
            ],
            operators: []
        },
        {
            id: "op-ci-004",
            country: "ci",
            type: "company",
            companyId: "CI-TB-2024-004",
            name: "Dia's Curated Journeys",
            description: "AI-powered travel curation meets local expertise. We partner with the Côte d'Ivoire Tourism Board to create the most thoughtfully designed itineraries, blending cultural immersion with modern comfort.",
            verified: true,
            rating: 4.92,
            reviews: 89,
            since: 2023,
            registrationNumber: "MTI-CI-000412",
            badges: ["Verified", "Insured", "Dia Partner", "Top Rated"],
            logo: "/assets/operators/dia-journeys.png",
            cover: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
            contact: {
                phone: "+2252723456789",
                whatsapp: "+2250709876543",
                email: "journeys@dia-ci.ai",
                website: "https://dia-ci.ai/journeys"
            },
            services: ["Curated Itineraries", "AI-Powered Planning", "VIP Experiences", "Group Tours"],
            regions: ["All Regions"],
            languages: ["French", "English", "Spanish"],
            images: [
                "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
            ],
            operators: [
                {
                    operatorId: "op-ci-004-a",
                    name: "Yves Konan",
                    role: "Chief Experience Officer",
                    registrationNumber: "CI-GUIDE-12345",
                    languages: ["French", "English", "Spanish"],
                    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
                }
            ]
        },
        {
            id: "op-ci-005",
            country: "ci",
            type: "company",
            companyId: "CI-TB-2024-005",
            name: "Basilica Tours Yamoussoukro",
            description: "Official tour operator for the Basilica of Our Lady of Peace and the political capital. We provide expert-guided tours of this architectural marvel and surrounding government landmarks.",
            verified: true,
            rating: 4.85,
            reviews: 423,
            since: 2010,
            registrationNumber: "MTI-CI-000098",
            badges: ["Verified", "Insured", "Official Partner"],
            logo: "/assets/operators/basilica-tours.png",
            cover: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80",
            contact: {
                phone: "+2252730112233",
                whatsapp: "+2250701234567",
                email: "tours@basilica-yamoussoukro.ci",
                website: "https://basilica-yamoussoukro.ci"
            },
            services: ["Guided Tours", "Religious Tourism", "Architecture Tours", "School Groups"],
            regions: ["Yamoussoukro"],
            languages: ["French", "English", "Italian", "Spanish"],
            images: [
                "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1555991220-3e99a0c7de38?auto=format&fit=crop&w=800&q=80"
            ],
            operators: [
                {
                    operatorId: "op-ci-005-a",
                    name: "Pierre Aka",
                    role: "Senior Guide",
                    registrationNumber: "CI-GUIDE-33221",
                    languages: ["French", "English", "Italian"],
                    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
                }
            ]
        }
    ];

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    /**
     * Get operator by ID
     * @param {string} id - Operator ID
     * @returns {Object|null} Operator object or null
     */
    function getOperatorById(id) {
        return DEMO_OPERATORS.find(op => op.id === id) || null;
    }

    /**
     * Get all operators for a country
     * @param {string} countryCode - 2-letter country code
     * @returns {Array} Array of operators
     */
    function getOperatorsByCountry(countryCode) {
        return DEMO_OPERATORS.filter(op => op.country === countryCode && op.verified);
    }

    /**
     * Get operators by service type
     * @param {string} service - Service type
     * @returns {Array} Array of operators
     */
    function getOperatorsByService(service) {
        return DEMO_OPERATORS.filter(op => 
            op.verified && op.services.some(s => 
                s.toLowerCase().includes(service.toLowerCase())
            )
        );
    }

    /**
     * Get operators by region
     * @param {string} region - Region name
     * @returns {Array} Array of operators
     */
    function getOperatorsByRegion(region) {
        return DEMO_OPERATORS.filter(op => 
            op.verified && (
                op.regions.includes("All Regions") ||
                op.regions.some(r => r.toLowerCase().includes(region.toLowerCase()))
            )
        );
    }

    /**
     * Validate operator data completeness
     * @param {Object} operator - Operator object
     * @returns {Object} { isComplete, missingFields }
     */
    function validateOperator(operator) {
        const requiredFields = ['id', 'name', 'registrationNumber', 'contact', 'verified'];
        const missingFields = requiredFields.filter(field => !operator[field]);
        
        // Also check contact sub-fields
        if (operator.contact) {
            if (!operator.contact.email && !operator.contact.phone) {
                missingFields.push('contact.email or contact.phone');
            }
        }
        
        return {
            isComplete: missingFields.length === 0,
            missingFields
        };
    }

    /**
     * Get all verified operators (for demo display)
     * @returns {Array} Array of verified operators
     */
    function getVerifiedOperators() {
        return DEMO_OPERATORS.filter(op => op.verified);
    }

    // =========================================================================
    // EXPORT TO WINDOW
    // =========================================================================
    
    window.DEMO_OPERATORS = DEMO_OPERATORS;
    window.DemoOperators = {
        data: DEMO_OPERATORS,
        getById: getOperatorById,
        getByCountry: getOperatorsByCountry,
        getByService: getOperatorsByService,
        getByRegion: getOperatorsByRegion,
        getVerified: getVerifiedOperators,
        validate: validateOperator
    };

})();


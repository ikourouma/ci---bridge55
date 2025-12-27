/**
 * CANONICAL DEMO REGIONS (DISTRICTS) DATASET
 * Part of the CURSOR MASTER EXECUTION INSTRUCTION
 * 
 * This is the single source of truth for demo regions/districts.
 * All region cards must reference IDs from this dataset.
 * 
 * Schema Contract:
 * - id: Unique region/district ID (string)
 * - name: Full district name
 * - shortName: Short display name
 * - area: Geographic area (coast, central, east, west, north)
 * - type: District type (autonomous, district)
 * - regions: Array of sub-region names
 * - capital: Capital city name
 * - description: Description text
 * - highlights: Array of highlight strings
 * - experiences: Number of experiences (number)
 * - img: Image URL
 * - ethnic: Array of ethnic group codes
 * - tags: Array of tag strings
 * 
 * @module demo-regions
 * @version 1.0.0
 * @date 2025-12-27
 */

(function() {
    'use strict';

    const DEMO_REGIONS = [
        {
            id: 'abidjan',
            name: 'District Autonome d\'Abidjan',
            shortName: 'Abidjan',
            area: 'coast',
            type: 'autonomous',
            regions: ['Abidjan Metropolitan'],
            capital: 'Abidjan',
            description: 'Economic capital and largest city of Côte d\'Ivoire',
            highlights: ['Plateau Business District', 'Cocody', 'La Corniche', 'Markets'],
            experiences: 300,
            img: 'https://images.unsplash.com/photo-1590845947376-2638caa89309?auto=format&fit=crop&w=800&q=80',
            ethnic: ['akan', 'diverse'],
            tags: ['City', 'Business', 'Nightlife', 'Shopping']
        },
        {
            id: 'yamoussoukro',
            name: 'District Autonome de Yamoussoukro',
            shortName: 'Yamoussoukro',
            area: 'central',
            type: 'autonomous',
            regions: ['Yamoussoukro'],
            capital: 'Yamoussoukro',
            description: 'Political capital with the world\'s largest basilica',
            highlights: ['Basilica of Our Lady of Peace', 'Presidential Palace', 'Crocodile Lake'],
            experiences: 45,
            img: 'https://images.unsplash.com/photo-1580896697724-6cf7b0c5e5e8?auto=format&fit=crop&w=800&q=80',
            ethnic: ['akan'],
            tags: ['Heritage', 'Architecture', 'Culture']
        },
        {
            id: 'lagunes',
            name: 'District des Lagunes',
            shortName: 'Lagunes',
            area: 'coast',
            type: 'district',
            regions: ['Agnéby-Tiassa', 'Grands-Ponts', 'La Mé'],
            capital: 'Dabou',
            description: 'South-Southeast lagoon region with rich Ébrié culture',
            highlights: ['Ébrié Lagoon', 'Jacqueville Beach', 'Traditional Villages'],
            experiences: 65,
            img: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=800&q=80',
            ethnic: ['akan'],
            tags: ['Beach', 'Lagoon', 'Traditional']
        },
        {
            id: 'bas-sassandra',
            name: 'District du Bas-Sassandra',
            shortName: 'Bas-Sassandra',
            area: 'coast',
            type: 'district',
            regions: ['Gbôklé', 'Nawa', 'San-Pédro'],
            capital: 'San-Pédro',
            description: 'Southwest coast with major port and pristine beaches',
            highlights: ['San-Pédro Port', 'Surfing Beaches', 'Sassandra Colonial Town'],
            experiences: 78,
            img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
            ethnic: ['krou'],
            tags: ['Beach', 'Surfing', 'Port', 'History']
        },
        {
            id: 'goh-djiboua',
            name: 'District du Gôh-Djiboua',
            shortName: 'Gôh-Djiboua',
            area: 'coast',
            type: 'district',
            regions: ['Gôh', 'Lôh-Djiboua'],
            capital: 'Gagnoa',
            description: 'South-central coast with Bété culture and agriculture',
            highlights: ['Bété Culture', 'Coffee & Cocoa Farms', 'Traditional Masks'],
            experiences: 42,
            img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
            ethnic: ['krou'],
            tags: ['Culture', 'Agriculture', 'Traditional']
        },
        {
            id: 'comoe',
            name: 'District du Comoé',
            shortName: 'Comoé',
            area: 'east',
            type: 'district',
            regions: ['Indénié-Djuablin', 'Sud-Comoé'],
            capital: 'Abengourou',
            description: 'Southeast region with Agni kingdom and UNESCO Grand-Bassam',
            highlights: ['Grand-Bassam UNESCO', 'Assinie Beach', 'Agni Royal Court'],
            experiences: 95,
            img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            ethnic: ['akan'],
            tags: ['UNESCO', 'Beach', 'Royalty', 'History']
        },
        {
            id: 'zanzan',
            name: 'District du Zanzan',
            shortName: 'Zanzan',
            area: 'east',
            type: 'district',
            regions: ['Bounkani', 'Gontougo'],
            capital: 'Bondoukou',
            description: 'Far east with Comoé National Park and historic mosques',
            highlights: ['Comoé National Park', 'Bondoukou Mosques', 'Lobi Culture'],
            experiences: 38,
            img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
            ethnic: ['akan', 'mande'],
            tags: ['Safari', 'UNESCO', 'History', 'Wildlife']
        },
        {
            id: 'lacs',
            name: 'District des Lacs',
            shortName: 'Lacs',
            area: 'east',
            type: 'district',
            regions: ['Bélier', 'Iffou', 'Moronou', 'N\'Zi'],
            capital: 'Dimbokro',
            description: 'East-central lakes region with Baoulé heritage',
            highlights: ['Baoulé Culture', 'Lake Villages', 'Gold Mining History'],
            experiences: 35,
            img: 'https://images.unsplash.com/photo-1531588428361-55e36ee3aee2?auto=format&fit=crop&w=800&q=80',
            ethnic: ['akan'],
            tags: ['Culture', 'Lakes', 'Heritage']
        },
        {
            id: 'vallee-bandama',
            name: 'District de la Vallée du Bandama',
            shortName: 'Vallée du Bandama',
            area: 'central',
            type: 'district',
            regions: ['Gbêkê', 'Hambol'],
            capital: 'Bouaké',
            description: 'Central hub with second largest city and Bandama River',
            highlights: ['Bouaké Markets', 'Katiola Pottery', 'Bandama River'],
            experiences: 55,
            img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
            ethnic: ['akan'],
            tags: ['Commerce', 'Crafts', 'Urban']
        },
        {
            id: 'sassandra-marahoue',
            name: 'District du Sassandra-Marahoué',
            shortName: 'Sassandra-Marahoué',
            area: 'central',
            type: 'district',
            regions: ['Haut-Sassandra', 'Marahoué'],
            capital: 'Daloa',
            description: 'West-central cocoa capital with Marahoué National Park',
            highlights: ['Cocoa Capital', 'Marahoué National Park', 'Bété Culture'],
            experiences: 48,
            img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
            ethnic: ['krou', 'mande'],
            tags: ['Agriculture', 'Nature', 'Safari']
        },
        {
            id: 'montagnes',
            name: 'District des Montagnes',
            shortName: 'Montagnes',
            area: 'west',
            type: 'district',
            regions: ['Cavally', 'Guémon', 'Tonkpi'],
            capital: 'Man',
            description: 'Mountainous west with 18 peaks and stilt dancers',
            highlights: ['La Dent de Man', 'Stilt Dancers', 'Waterfalls', 'Rainforest'],
            experiences: 72,
            img: 'https://images.unsplash.com/photo-1518611507436-f9221403cca2?auto=format&fit=crop&w=800&q=80',
            ethnic: ['mande'],
            tags: ['Mountains', 'Adventure', 'Culture', 'Nature']
        },
        {
            id: 'woroba',
            name: 'District du Woroba',
            shortName: 'Woroba',
            area: 'west',
            type: 'district',
            regions: ['Béré', 'Bafing', 'Worodougou'],
            capital: 'Séguéla',
            description: 'Northwest diamond region with Mount Touba',
            highlights: ['Diamond Mining', 'Mount Touba', 'Malinké Heritage'],
            experiences: 28,
            img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
            ethnic: ['mande'],
            tags: ['Mining', 'Mountains', 'Traditional']
        },
        {
            id: 'denguele',
            name: 'District du Denguélé',
            shortName: 'Denguélé',
            area: 'west',
            type: 'district',
            regions: ['Folon', 'Kabadougou'],
            capital: 'Odienné',
            description: 'Far northwest with Malinké traditions and sacred sites',
            highlights: ['Malinké Culture', 'Traditional Architecture', 'Sacred Forests'],
            experiences: 22,
            img: 'https://images.unsplash.com/photo-1531588428361-55e36ee3aee2?auto=format&fit=crop&w=800&q=80',
            ethnic: ['mande'],
            tags: ['Culture', 'Traditional', 'Sacred']
        },
        {
            id: 'savanes',
            name: 'District des Savanes',
            shortName: 'Savanes',
            area: 'north',
            type: 'district',
            regions: ['Bagoué', 'Poro', 'Tchologo'],
            capital: 'Korhogo',
            description: 'Northern savanna with Sénoufo culture and sacred lakes',
            highlights: ['Korhogo', 'Sénoufo Masks', 'Sacred Hippo Lake', 'Painted Cloth'],
            experiences: 58,
            img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
            ethnic: ['senufo'],
            tags: ['Culture', 'Safari', 'Traditional', 'Crafts']
        }
    ];

    // Export to window
    window.DEMO_REGIONS = DEMO_REGIONS;

})();


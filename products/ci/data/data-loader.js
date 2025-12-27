/**
 * Bridge55 Data Loader
 * 
 * This is the abstraction layer for all data operations.
 * Currently uses local demo data, but is ready for Supabase migration.
 * 
 * When Supabase is ready:
 * 1. Update the SUPABASE_* constants
 * 2. Set USE_SUPABASE = true
 * 3. All pages will automatically use live data
 * 
 * Usage:
 *   <script src="../data/data-loader.js"></script>
 *   const operator = await window.DataLoader.operators.getById('op-001');
 */

(function() {
    'use strict';

    // ==========================================================================
    // CONFIGURATION - Update these when Supabase is ready
    // ==========================================================================
    const USE_SUPABASE = false; // Set to true when Supabase is configured
    const SUPABASE_URL = ''; // Your Supabase project URL
    const SUPABASE_ANON_KEY = ''; // Your Supabase anon key

    // Supabase client (initialized when USE_SUPABASE is true)
    let supabaseClient = null;

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================
    function initSupabase() {
        if (USE_SUPABASE && SUPABASE_URL && SUPABASE_ANON_KEY) {
            if (typeof supabase !== 'undefined') {
                supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                console.log('[DataLoader] Supabase initialized');
                return true;
            } else {
                console.error('[DataLoader] Supabase library not loaded. Add the Supabase JS CDN to your page.');
                return false;
            }
        }
        return false;
    }

    // ==========================================================================
    // OPERATORS API
    // ==========================================================================
    const OperatorsAPI = {
        /**
         * Get operator by ID
         * @param {string} id - Operator ID
         * @returns {Promise<Object|null>}
         */
        getById: async function(id) {
            if (USE_SUPABASE && supabaseClient) {
                const { data, error } = await supabaseClient
                    .from('operators')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (error) {
                    console.error('[DataLoader] Supabase error:', error);
                    return null;
                }
                return data;
            }
            
            // Fallback to local data
            if (window.OperatorsDB) {
                return window.OperatorsDB.getById(id);
            }
            console.warn('[DataLoader] OperatorsDB not loaded');
            return null;
        },

        /**
         * Get all verified operators
         * @returns {Promise<Object[]>}
         */
        getAll: async function() {
            if (USE_SUPABASE && supabaseClient) {
                const { data, error } = await supabaseClient
                    .from('operators')
                    .select('*')
                    .eq('verified', true)
                    .order('rating', { ascending: false });
                
                if (error) {
                    console.error('[DataLoader] Supabase error:', error);
                    return [];
                }
                return data || [];
            }
            
            if (window.OperatorsDB) {
                return window.OperatorsDB.getVerified();
            }
            return [];
        },

        /**
         * Check if operator exists
         * @param {string} id
         * @returns {Promise<boolean>}
         */
        exists: async function(id) {
            const operator = await this.getById(id);
            return operator !== null;
        }
    };

    // ==========================================================================
    // EXPERIENCES API
    // ==========================================================================
    const ExperiencesAPI = {
        getById: async function(id) {
            if (USE_SUPABASE && supabaseClient) {
                const { data, error } = await supabaseClient
                    .from('experiences')
                    .select('*, operator:operators(*)')
                    .eq('id', id)
                    .single();
                
                if (error) {
                    console.error('[DataLoader] Supabase error:', error);
                    return null;
                }
                return data;
            }
            
            if (window.ExperiencesDB) {
                return window.ExperiencesDB.getById(id);
            }
            return null;
        },

        getAll: async function() {
            if (USE_SUPABASE && supabaseClient) {
                const { data, error } = await supabaseClient
                    .from('experiences')
                    .select('*')
                    .order('rating', { ascending: false });
                
                if (error) return [];
                return data || [];
            }
            
            if (window.ExperiencesDB) {
                return window.ExperiencesDB.getAll();
            }
            return [];
        },

        getByRegion: async function(regionId) {
            if (USE_SUPABASE && supabaseClient) {
                const { data, error } = await supabaseClient
                    .from('experiences')
                    .select('*')
                    .eq('region', regionId);
                
                if (error) return [];
                return data || [];
            }
            
            if (window.ExperiencesDB) {
                return window.ExperiencesDB.getByRegion(regionId);
            }
            return [];
        },

        exists: async function(id) {
            const exp = await this.getById(id);
            return exp !== null;
        }
    };

    // ==========================================================================
    // ITINERARIES API
    // ==========================================================================
    const ItinerariesAPI = {
        getById: async function(id) {
            if (USE_SUPABASE && supabaseClient) {
                const { data, error } = await supabaseClient
                    .from('itineraries')
                    .select('*, operator:operators(*)')
                    .eq('id', id)
                    .single();
                
                if (error) return null;
                return data;
            }
            
            if (window.ItinerariesDB) {
                return window.ItinerariesDB.getById(id);
            }
            return null;
        },

        getAll: async function() {
            if (USE_SUPABASE && supabaseClient) {
                const { data, error } = await supabaseClient
                    .from('itineraries')
                    .select('*')
                    .order('rating', { ascending: false });
                
                if (error) return [];
                return data || [];
            }
            
            if (window.ItinerariesDB) {
                return window.ItinerariesDB.getAll();
            }
            return [];
        },

        getDiaPicks: async function() {
            if (USE_SUPABASE && supabaseClient) {
                const { data, error } = await supabaseClient
                    .from('itineraries')
                    .select('*')
                    .eq('dia_pick', true)
                    .order('rating', { ascending: false });
                
                if (error) return [];
                return data || [];
            }
            
            if (window.ItinerariesDB) {
                return window.ItinerariesDB.getDiaPicks();
            }
            return [];
        },

        exists: async function(id) {
            const it = await this.getById(id);
            return it !== null;
        }
    };

    // ==========================================================================
    // REGIONS API
    // ==========================================================================
    const RegionsAPI = {
        getById: async function(id) {
            if (USE_SUPABASE && supabaseClient) {
                const { data, error } = await supabaseClient
                    .from('regions')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (error) return null;
                return data;
            }
            
            if (window.RegionsDB) {
                return window.RegionsDB.getById(id);
            }
            return null;
        },

        getAll: async function() {
            if (USE_SUPABASE && supabaseClient) {
                const { data, error } = await supabaseClient
                    .from('regions')
                    .select('*');
                
                if (error) return [];
                return data || [];
            }
            
            if (window.RegionsDB) {
                return window.RegionsDB.getAll();
            }
            return [];
        },

        exists: async function(id) {
            const region = await this.getById(id);
            return region !== null;
        }
    };

    // ==========================================================================
    // UTILITY FUNCTIONS
    // ==========================================================================
    const Utils = {
        /**
         * Get ID from URL parameter
         * @param {string} param - Parameter name (default: 'id')
         * @returns {string|null}
         */
        getIdFromUrl: function(param = 'id') {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        },

        /**
         * Redirect to search page with error
         * @param {string} searchPage - Search page URL
         * @param {string} id - The ID that wasn't found
         */
        redirectToSearch: function(searchPage, id) {
            const url = id 
                ? `${searchPage}?error=notfound&id=${encodeURIComponent(id)}`
                : searchPage;
            window.location.href = url;
        },

        /**
         * Generate operator URL
         * @param {string} id - Operator ID
         * @returns {string}
         */
        getOperatorUrl: function(id) {
            return `operator-details.html?id=${encodeURIComponent(id)}`;
        },

        /**
         * Generate experience URL
         * @param {string} id - Experience ID
         * @returns {string}
         */
        getExperienceUrl: function(id) {
            return `experience-details.html?id=${encodeURIComponent(id)}`;
        },

        /**
         * Generate itinerary URL
         * @param {string} id - Itinerary ID
         * @returns {string}
         */
        getItineraryUrl: function(id) {
            return `itinerary-details.html?id=${encodeURIComponent(id)}`;
        },

        /**
         * Generate region URL
         * @param {string} id - Region ID
         * @returns {string}
         */
        getRegionUrl: function(id) {
            return `region-details.html?id=${encodeURIComponent(id)}`;
        }
    };

    // ==========================================================================
    // MAIN DATA LOADER OBJECT
    // ==========================================================================
    const DataLoader = {
        // APIs
        operators: OperatorsAPI,
        experiences: ExperiencesAPI,
        itineraries: ItinerariesAPI,
        regions: RegionsAPI,
        
        // Utilities
        utils: Utils,

        // Configuration
        isUsingSupabase: function() {
            return USE_SUPABASE && supabaseClient !== null;
        },

        // Initialize (call this after all data scripts are loaded)
        init: function() {
            if (USE_SUPABASE) {
                initSupabase();
            }
            console.log('[DataLoader] Initialized. Mode:', USE_SUPABASE ? 'Supabase' : 'Demo Data');
        }
    };

    // Export to window
    window.DataLoader = DataLoader;

    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => DataLoader.init());
    } else {
        DataLoader.init();
    }

    console.log('[DataLoader] Module loaded');

})();


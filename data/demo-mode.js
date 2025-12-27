/**
 * DEMO MODE CONFIGURATION
 * Part of the CURSOR MASTER EXECUTION INSTRUCTION
 * 
 * This file sets up the global demo mode flag and ensures all pages
 * operate in demo mode by default. When demo mode is ON:
 * 
 * - "Not Found" states are FORBIDDEN
 * - Empty profiles are FORBIDDEN
 * - Missing data is FORBIDDEN
 * - Every card MUST have a populated detail page
 * 
 * @module demo-mode
 * @version 1.0.0
 * @date 2025-12-27
 */

(function() {
    'use strict';

    // =========================================================================
    // GLOBAL DEMO MODE FLAG (B1)
    // =========================================================================
    
    window.__DEMO_MODE__ = true;
    
    // Make it non-configurable (enforced)
    Object.defineProperty(window, '__DEMO_MODE__', {
        value: true,
        writable: false,
        configurable: false,
        enumerable: true
    });

    // =========================================================================
    // DEMO MODE VALIDATION HELPER
    // =========================================================================
    
    /**
     * Validates that demo data exists for a given ID
     * @param {string} id - Entity ID to check
     * @param {string} type - Entity type ('operator', 'experience', 'itinerary', 'region', 'interest')
     * @returns {boolean} True if demo data exists
     */
    window.DemoDB = {
        exists: function(id, type) {
            if (!id || !type) return false;
            
            // Check operators
            if (type === 'operator' || type === 'operators') {
                return window.DEMO_OPERATORS && 
                       window.DEMO_OPERATORS.some(op => op.id === id);
            }
            
            // Check experiences
            if (type === 'experience' || type === 'experiences') {
                return window.DEMO_EXPERIENCES && 
                       window.DEMO_EXPERIENCES.some(exp => exp.id === id || exp.id === parseInt(id));
            }
            
            // Check itineraries
            if (type === 'itinerary' || type === 'itineraries') {
                return window.DEMO_ITINERARIES && 
                       window.DEMO_ITINERARIES.some(it => it.id === id);
            }
            
            // Check regions
            if (type === 'region' || type === 'regions') {
                return window.DEMO_REGIONS && 
                       window.DEMO_REGIONS.some(reg => reg.id === id);
            }
            
            // Check interests
            if (type === 'interest' || type === 'interests') {
                return window.DEMO_INTERESTS && 
                       window.DEMO_INTERESTS.some(int => int.id === id);
            }
            
            return false;
        },
        
        /**
         * Get entity by ID and type
         * @param {string} id - Entity ID
         * @param {string} type - Entity type
         * @returns {Object|null} Entity object or null
         */
        getById: function(id, type) {
            if (!this.exists(id, type)) return null;
            
            if (type === 'operator' || type === 'operators') {
                return window.DEMO_OPERATORS?.find(op => op.id === id) || null;
            }
            
            if (type === 'experience' || type === 'experiences') {
                return window.DEMO_EXPERIENCES?.find(exp => exp.id === id || exp.id === parseInt(id)) || null;
            }
            
            if (type === 'itinerary' || type === 'itineraries') {
                return window.DEMO_ITINERARIES?.find(it => it.id === id) || null;
            }
            
            if (type === 'region' || type === 'regions') {
                return window.DEMO_REGIONS?.find(reg => reg.id === id) || null;
            }
            
            if (type === 'interest' || type === 'interests') {
                return window.DEMO_INTERESTS?.find(int => int.id === id) || null;
            }
            
            return null;
        },
        
        /**
         * Validate that all required demo datasets are loaded
         * @returns {Object} Validation result
         */
        validate: function() {
            const missing = [];
            
            if (!window.DEMO_OPERATORS || window.DEMO_OPERATORS.length === 0) {
                missing.push('DEMO_OPERATORS');
            }
            
            if (!window.DEMO_EXPERIENCES || window.DEMO_EXPERIENCES.length === 0) {
                missing.push('DEMO_EXPERIENCES');
            }
            
            if (!window.DEMO_ITINERARIES || window.DEMO_ITINERARIES.length === 0) {
                missing.push('DEMO_ITINERARIES');
            }
            
            if (!window.DEMO_REGIONS || window.DEMO_REGIONS.length === 0) {
                missing.push('DEMO_REGIONS');
            }
            
            return {
                valid: missing.length === 0,
                missing: missing
            };
        }
    };

    // =========================================================================
    // CONSOLE WARNING ON PAGE LOAD
    // =========================================================================
    
    console.log('%c🎭 DEMO MODE ACTIVE', 'background: #FF8C00; color: white; font-weight: bold; padding: 4px 8px;');
    console.log('All pages must have complete demo data. "Not Found" states are forbidden.');

})();


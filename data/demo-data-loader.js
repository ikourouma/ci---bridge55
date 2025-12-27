/**
 * DEMO DATA LOADER
 * Part of the CURSOR MASTER EXECUTION INSTRUCTION
 * 
 * This script loads all canonical demo datasets and initializes demo mode.
 * Include this script on all pages BEFORE any page-specific scripts.
 * 
 * Usage:
 * <script src="../data/demo-data-loader.js"></script>
 * 
 * @module demo-data-loader
 * @version 1.0.0
 * @date 2025-12-27
 */

(function() {
    'use strict';

    // Load all demo datasets in order
    const scripts = [
        '../data/demo-mode.js',
        '../data/demo-operators.canonical.js',
        '../data/demo-experiences.canonical.js',
        '../data/demo-itineraries.canonical.js',
        '../data/demo-regions.canonical.js'
    ];

    let loadedCount = 0;
    const totalScripts = scripts.length;

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = false; // Load sequentially
            script.onload = () => {
                loadedCount++;
                resolve();
            };
            script.onerror = () => {
                console.error(`❌ Failed to load demo dataset: ${src}`);
                reject(new Error(`Failed to load ${src}`));
            };
            document.head.appendChild(script);
        });
    }

    // Load all scripts sequentially
    async function loadAllDemoData() {
        try {
            for (const src of scripts) {
                await loadScript(src);
            }
            
            console.log(`✅ Demo data loaded: ${loadedCount}/${totalScripts} datasets`);
            
            // Validate all datasets are loaded
            if (window.DemoDB && window.DemoDB.validate) {
                const validation = window.DemoDB.validate();
                if (validation.valid) {
                    console.log('✅ All demo datasets validated successfully');
                } else {
                    console.warn('⚠️ Some demo datasets missing:', validation.missing);
                }
            }
        } catch (error) {
            console.error('❌ Error loading demo data:', error);
        }
    }

    // Start loading immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAllDemoData);
    } else {
        loadAllDemoData();
    }

})();


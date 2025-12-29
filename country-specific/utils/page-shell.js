/**
 * Page Shell Utilities - Platform Standard
 * Handles global header/footer loading, layout sync, and defensive helpers
 * 
 * @module page-shell
 * @version 1.0.0
 * @date 2025-12-27
 */

(function() {
    'use strict';

    // =========================================================================
    // CONFIGURATION
    // =========================================================================
    const CONFIG = {
        // Use mega-menu-v2 by default (Block 0 implementation)
        headerPath: '../components/header/mega-menu-v2.html',
        headerPathV1: '../components/header/mega-menu.html', // Legacy fallback
        footerPath: '../components/footer/global-footer-ci.html',
        fallbackFooter: `
            <footer style="background:#0a2540;color:#fff;padding:2rem;text-align:center;">
                <p>© ${new Date().getFullYear()} Visit Côte d'Ivoire. All rights reserved.</p>
                <p style="font-size:0.8rem;opacity:0.7;">Powered by Bridge55</p>
            </footer>
        `
    };

    // =========================================================================
    // A1) LOAD GLOBAL SHELL (Header + Footer)
    // =========================================================================
    
    /**
     * Load global header and footer components
     * @param {Object} options - Configuration options
     * @param {string} options.country - Country code (default: 'ci')
     * @param {boolean} options.hideDemo - Hide demo content (default: true)
     */
    async function loadGlobalShell(options = {}) {
        const { country = 'ci', hideDemo = true } = options;
        
        await Promise.all([
            loadHeader({ country, hideDemo }),
            loadFooter({ country })
        ]);
        
        // Sync layout variables after shell is loaded
        syncLayoutVars();
        
        // Re-sync on resize
        window.addEventListener('resize', debounce(syncLayoutVars, 100));
    }

    /**
     * Load header component
     */
    async function loadHeader(options = {}) {
        const { hideDemo = true, useLegacy = false } = options;
        
        try {
            // Ensure header container exists
            let headerContainer = document.getElementById('global-header');
            if (!headerContainer) {
                headerContainer = document.createElement('div');
                headerContainer.id = 'global-header';
                document.body.insertBefore(headerContainer, document.body.firstChild);
            }
            
            // Prevent duplicate loading
            if (headerContainer.dataset.loaded === 'true') return;
            
            // Try v2 first, fallback to v1 if needed
            const headerPath = useLegacy ? CONFIG.headerPathV1 : CONFIG.headerPath;
            let response = await fetch(headerPath);
            
            // Fallback to legacy if v2 fails
            if (!response.ok && !useLegacy) {
                console.warn('[PageShell] v2 header not found, trying v1');
                response = await fetch(CONFIG.headerPathV1);
            }
            
            if (!response.ok) throw new Error(`Header fetch failed: ${response.status}`);
            
            const html = await response.text();
            
            // Parse HTML and extract scripts to execute them properly
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Get the body content (skip doctype, html, head if present)
            const bodyContent = doc.body ? doc.body.innerHTML : html;
            headerContainer.innerHTML = bodyContent;
            headerContainer.dataset.loaded = 'true';
            
            // Execute inline scripts (critical for mega menu JS)
            const scripts = headerContainer.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                // Copy attributes
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                // Copy content
                newScript.textContent = oldScript.textContent;
                // Replace old script with new one to execute it
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
            
            // Hide demo content if present
            if (hideDemo) {
                const demoContent = headerContainer.querySelector('.demo-content');
                if (demoContent) demoContent.style.display = 'none';
            }
            
            // Initialize mega menu safely (backup in case script execution timing varies)
            setTimeout(() => {
                if (typeof window.initMegaMenu === 'function') {
                    window.initMegaMenu();
                }
            }, 150);
            
            console.log('[PageShell] Header loaded successfully');
            
        } catch (error) {
            console.error('[PageShell] Failed to load header:', error);
        }
    }

    /**
     * Load footer component
     */
    async function loadFooter(options = {}) {
        try {
            // Ensure footer container exists (use placeholder, never append to body)
            let footerContainer = document.getElementById('global-footer');
            if (!footerContainer) {
                footerContainer = document.createElement('div');
                footerContainer.id = 'global-footer';
                document.body.appendChild(footerContainer);
            }
            
            // Prevent duplicate loading
            if (footerContainer.dataset.loaded === 'true') return;
            
            // Remove any existing inline footer elements (prevent duplicates)
            document.querySelectorAll('body > footer:not(#global-footer footer)').forEach(el => el.remove());
            
            const response = await fetch(CONFIG.footerPath);
            if (!response.ok) throw new Error(`Footer fetch failed: ${response.status}`);
            
            const html = await response.text();
            footerContainer.innerHTML = html;
            footerContainer.dataset.loaded = 'true';
            
        } catch (error) {
            console.error('[PageShell] Failed to load footer, using fallback:', error);
            const footerContainer = document.getElementById('global-footer');
            if (footerContainer) {
                footerContainer.innerHTML = CONFIG.fallbackFooter;
                footerContainer.dataset.loaded = 'true';
            }
        }
    }

    // =========================================================================
    // A2) SYNC LAYOUT VARIABLES (Dynamic Heights)
    // =========================================================================
    
    /**
     * Measure and set CSS variables for header/breadcrumb heights
     */
    function syncLayoutVars() {
        const root = document.documentElement;
        
        // Measure header height - look for actual visible header components
        let headerHeight = 0;
        
        // Try to find the actual header elements (utility bar + main nav)
        const utilityBar = document.querySelector('.utility-bar, .top-bar');
        const mainNav = document.querySelector('.main-nav, nav[role="navigation"]');
        
        if (utilityBar && mainNav) {
            headerHeight = utilityBar.offsetHeight + mainNav.offsetHeight;
        } else {
            // Fallback to container measurement
            const header = document.getElementById('global-header') 
                || document.querySelector('.mega-menu-container')
                || document.querySelector('header');
            headerHeight = header ? header.offsetHeight : 0;
            
            // If still 0, check for fixed/absolute positioned children
            if (headerHeight === 0 && header) {
                const fixedChildren = header.querySelectorAll('[style*="position: fixed"], [style*="position: absolute"]');
                fixedChildren.forEach(child => {
                    headerHeight = Math.max(headerHeight, child.offsetHeight);
                });
            }
            
            // Ultimate fallback to known header elements
            if (headerHeight === 0) {
                const anyNav = document.querySelector('nav');
                headerHeight = anyNav ? anyNav.offsetHeight + 40 : 120;
            }
        }
        
        // Measure breadcrumb height (prefer #global-breadcrumb)
        const breadcrumb = document.getElementById('global-breadcrumb')
            || document.querySelector('.breadcrumb-bar')
            || document.querySelector('.page-breadcrumb');
        const breadcrumbHeight = (breadcrumb && breadcrumb.offsetHeight > 0) ? breadcrumb.offsetHeight : 0;
        
        // Set CSS variables
        root.style.setProperty('--header-height', `${headerHeight}px`);
        root.style.setProperty('--breadcrumb-height', `${breadcrumbHeight}px`);
        root.style.setProperty('--header-total-height', `${headerHeight + breadcrumbHeight}px`);
        
        // Also set body padding if not already handled
        document.body.style.paddingTop = `calc(var(--header-height) + var(--breadcrumb-height))`;
    }

    // =========================================================================
    // BREADCRUMB RENDERING
    // =========================================================================
    
    /**
     * Render breadcrumb navigation (Destinations-style pattern)
     * @param {Object} options - Configuration
     * @param {Array} options.items - Array of breadcrumb items [{label, href, icon?}]
     * Last item is current page (no href)
     * @param {Object} options.country - Optional country badge {code, name, flag}
     * @param {boolean} options.scrollBehavior - Enable scroll-triggered visibility (default: true)
     */
    function renderBreadcrumb(options = {}) {
        const { items = [], country = null, scrollBehavior = true } = options;
        
        // Get or create breadcrumb container (support both IDs for compatibility)
        let container = document.getElementById('global-breadcrumb') || document.getElementById('breadcrumbBar');
        if (!container) {
            container = document.createElement('nav');
            container.id = 'global-breadcrumb';
            container.className = 'breadcrumb-bar';
            container.setAttribute('aria-label', 'Breadcrumb');
            
            // Insert after header
            const header = document.getElementById('global-header');
            if (header && header.nextSibling) {
                header.parentNode.insertBefore(container, header.nextSibling);
            } else if (header) {
                header.parentNode.appendChild(container);
            } else {
                document.body.insertBefore(container, document.body.firstChild);
            }
        }
        
        // Hide if less than 2 items
        if (items.length < 2) {
            container.style.display = 'none';
            return;
        }
        
        container.style.display = '';
        
        // Build breadcrumb HTML (destinations-style with breadcrumb-inner wrapper)
        const inner = document.createElement('div');
        inner.className = 'breadcrumb-inner';
        
        // Build breadcrumb items
        items.forEach((item, index) => {
            const isLast = index === items.length - 1;
            
            if (isLast) {
                // Current page - no link
                const current = document.createElement('span');
                current.className = 'breadcrumb-current';
                current.setAttribute('aria-current', 'page');
                
                // Add icon if provided
                if (item.icon) {
                    const icon = document.createElement('i');
                    icon.className = item.icon;
                    icon.classList.add('icon-accent');
                    current.appendChild(icon);
                }
                
                current.appendChild(document.createTextNode(item.label));
                inner.appendChild(current);
            } else {
                // Link
                const link = document.createElement('a');
                link.className = 'breadcrumb-link';
                link.href = item.href || '#';
                
                // Add icon if provided
                if (item.icon) {
                    const icon = document.createElement('i');
                    icon.className = item.icon;
                    icon.classList.add('icon-accent');
                    link.appendChild(icon);
                }
                
                link.appendChild(document.createTextNode(item.label));
                inner.appendChild(link);
                
                // Separator
                const sep = document.createElement('span');
                sep.className = 'breadcrumb-sep';
                sep.setAttribute('aria-hidden', 'true');
                sep.innerHTML = '<i class="fas fa-chevron-right"></i>';
                inner.appendChild(sep);
            }
        });
        
        // Add country badge if provided
        if (country && country.code && country.code !== 'pan-african') {
            const badge = document.createElement('span');
            badge.className = 'breadcrumb-country-badge';
            badge.id = 'breadcrumbCountry';
            
            if (country.flag) {
                const flagSpan = document.createElement('span');
                flagSpan.id = 'breadcrumbFlag';
                flagSpan.textContent = country.flag;
                badge.appendChild(flagSpan);
            }
            
            const nameSpan = document.createElement('span');
            nameSpan.id = 'breadcrumbCountryName';
            nameSpan.textContent = country.name || country.code.toUpperCase();
            badge.appendChild(nameSpan);
            
            inner.appendChild(badge);
        } else {
            // Ensure badge is hidden if not needed
            const existingBadge = document.getElementById('breadcrumbCountry');
            if (existingBadge) {
                existingBadge.style.display = 'none';
            }
        }
        
        container.innerHTML = '';
        container.appendChild(inner);
        
        // Initialize scroll behavior if enabled
        if (scrollBehavior) {
            initBreadcrumbScrollBehavior(container);
        }
        
        // Re-sync layout vars after breadcrumb is rendered
        setTimeout(syncLayoutVars, 50);
    }
    
    /**
     * Initialize scroll-triggered breadcrumb visibility
     * @param {HTMLElement} container - Breadcrumb container element
     */
    function initBreadcrumbScrollBehavior(container) {
        if (!container || container.dataset.scrollInit === 'true') return;
        container.dataset.scrollInit = 'true';
        
        const onScroll = () => {
            if (window.scrollY > 140) {
                container.classList.add('visible');
            } else {
                container.classList.remove('visible');
            }
        };
        
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // Initial check
    }

    // =========================================================================
    // A3) ROUTING HELPERS
    // =========================================================================
    
    /**
     * Get detail page URL for any entity type
     * @param {Object} entity - Entity with id and type
     * @returns {string|null} URL or null if invalid
     */
    function getDetailUrl(entity) {
        if (!entity || !entity.id) {
            console.warn('[PageShell] getDetailUrl called with invalid entity:', entity);
            return null;
        }
        
        // Prefer RoutingHelpers if available
        if (window.RoutingHelpers?.getServiceUrl) {
            return window.RoutingHelpers.getServiceUrl(entity);
        }
        
        // Fallback to type-based routing
        const type = (entity.type || 'experience').toLowerCase();
        const id = encodeURIComponent(entity.id);
        
        const routes = {
            'experience': `experience-details.html?id=${id}`,
            'stay': `stay-details.html?id=${id}`,
            'hotel': `stay-details.html?id=${id}`,
            'lodge': `stay-details.html?id=${id}`,
            'event': `event-details.html?id=${id}`,
            'itinerary': `itinerary-details.html?id=${id}`,
            'region': `region-details.html?id=${id}`,
            'operator': `operator-details.html?id=${id}`,
            'interest': `interest-details.html?id=${id}`
        };
        
        return routes[type] || routes['experience'];
    }

    // =========================================================================
    // A4) DEFENSIVE RENDERING HELPERS
    // =========================================================================
    
    /**
     * Safely set text content with fallback
     */
    function safeText(el, value, fallback = '') {
        if (!el) return;
        el.textContent = value ?? fallback;
    }

    /**
     * Safely parse number with fallback
     */
    function safeNumber(value, fallback = 0) {
        const num = parseFloat(value);
        return isNaN(num) || !isFinite(num) ? fallback : num;
    }

    /**
     * Format money with currency
     */
    function formatMoney(amount, currency = '$') {
        const num = safeNumber(amount, 0);
        return `${currency}${num.toFixed(2)}`;
    }

    /**
     * Safely parse JSON with fallback
     */
    function safeJsonParse(str, fallback = null) {
        try {
            return JSON.parse(str) ?? fallback;
        } catch (e) {
            return fallback;
        }
    }

    /**
     * Normalize ID to lowercase with hyphens
     */
    function normalizeId(str) {
        if (!str) return '';
        return String(str).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    /**
     * Slugify a string
     */
    function slugify(str) {
        return normalizeId(str);
    }

    // =========================================================================
    // A6) STORAGE HELPERS (Country-scoped)
    // =========================================================================
    
    const STORAGE_KEYS = {
        favOperators: 'ci:favs:operators',
        favListings: 'ci:favs:listings',
        favItineraries: 'ci:favs:itineraries',
        favRegions: 'ci:favs:regions',
        bookingExperience: 'ci:booking:experience',
        bookingItinerary: 'ci:booking:itinerary'
    };

    /**
     * Get favorites for a specific type
     */
    function getFavorites(type = 'listings') {
        const key = STORAGE_KEYS[`fav${type.charAt(0).toUpperCase() + type.slice(1)}`] || STORAGE_KEYS.favListings;
        return safeJsonParse(localStorage.getItem(key), []);
    }

    /**
     * Toggle favorite status
     */
    function toggleFavorite(id, type = 'listings') {
        const key = STORAGE_KEYS[`fav${type.charAt(0).toUpperCase() + type.slice(1)}`] || STORAGE_KEYS.favListings;
        let favorites = getFavorites(type);
        
        if (favorites.includes(id)) {
            favorites = favorites.filter(f => f !== id);
        } else {
            favorites.push(id);
        }
        
        localStorage.setItem(key, JSON.stringify(favorites));
        return favorites.includes(id);
    }

    /**
     * Check if item is favorited
     */
    function isFavorite(id, type = 'listings') {
        return getFavorites(type).includes(id);
    }

    // =========================================================================
    // A9) DIA CONCIERGE HELPER
    // =========================================================================
    
    /**
     * Open Dia Concierge with consistent parameters
     */
    function openDiaConcierge(options = {}) {
        const { mode = 'chat', source = 'page', country = 'ci', entityId = '' } = options;
        
        const params = new URLSearchParams({
            mode,
            country,
            source
        });
        
        if (entityId) params.set('id', entityId);
        
        const url = `../../ai/concierge.html?${params.toString()}`;
        window.location.href = url;
    }

    // =========================================================================
    // A8) SAFE IMAGE FALLBACK
    // =========================================================================
    
    const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80';

    /**
     * Add fallback to image element
     */
    function addImageFallback(img, fallbackSrc = DEFAULT_FALLBACK_IMAGE) {
        if (!img) return;
        img.onerror = function() {
            this.onerror = null;
            this.src = fallbackSrc;
        };
    }

    /**
     * Apply fallbacks to all images in container
     */
    function applyImageFallbacks(container = document, fallbackSrc = DEFAULT_FALLBACK_IMAGE) {
        container.querySelectorAll('img').forEach(img => addImageFallback(img, fallbackSrc));
    }

    // =========================================================================
    // A8) SAFE AOS INIT
    // =========================================================================
    
    /**
     * Safely initialize AOS if available
     */
    function safeAOSInit(options = {}) {
        if (typeof window.AOS !== 'undefined' && typeof window.AOS.init === 'function') {
            window.AOS.init({
                duration: 600,
                once: true,
                offset: 50,
                ...options
            });
        }
    }

    // =========================================================================
    // A15) NAVBAR SCROLL BEHAVIOR
    // =========================================================================
    
    /**
     * Get navbar element with fallback selectors
     */
    function getNavbarEl() {
        return document.getElementById('navbar')
            || document.querySelector('.navbar-explore')
            || document.querySelector('#global-header nav')
            || document.querySelector('.mega-menu-container nav');
    }

    /**
     * Setup scroll behavior for navbar
     */
    function setupNavbarScroll(threshold = 50) {
        window.addEventListener('scroll', () => {
            const navbar = getNavbarEl();
            if (!navbar) return;
            navbar.classList.toggle('scrolled', window.scrollY > threshold);
        });
    }

    // =========================================================================
    // A13) ACCESSIBILITY HELPERS
    // =========================================================================
    
    /**
     * Setup Escape key handler for closing dropdowns/modals
     */
    function setupEscapeHandler() {
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            
            // Close active dropdowns
            document.querySelectorAll('.dropdown.active, [data-dropdown].active').forEach(d => {
                d.classList.remove('active');
                const trigger = d.querySelector('[aria-expanded]');
                if (trigger) trigger.setAttribute('aria-expanded', 'false');
            });
            
            // Close modals
            if (typeof window.closeDiaCustomizeModal === 'function') {
                window.closeDiaCustomizeModal();
            }
            
            // Close any modal with .modal.active
            document.querySelectorAll('.modal.active, [role="dialog"].active').forEach(m => {
                m.classList.remove('active');
            });
        });
    }

    /**
     * Toggle aria-expanded on element
     */
    function toggleAriaExpanded(el) {
        if (!el) return;
        const current = el.getAttribute('aria-expanded') === 'true';
        el.setAttribute('aria-expanded', String(!current));
    }

    // =========================================================================
    // A12) SEARCH REDIRECT HELPER
    // =========================================================================
    
    /**
     * Build search URL preserving all inputs
     */
    function buildSearchRedirect(baseUrl, inputs = {}) {
        const params = new URLSearchParams();
        
        Object.entries(inputs).forEach(([key, value]) => {
            if (value && value.trim()) {
                params.set(key, value.trim());
            }
        });
        
        const queryString = params.toString();
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }

    // =========================================================================
    // UTILITY FUNCTIONS
    // =========================================================================
    
    /**
     * Debounce function
     */
    function debounce(fn, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // =========================================================================
    // EXPORT TO WINDOW
    // =========================================================================
    
    window.PageShell = {
        // A1) Shell loading
        loadGlobalShell,
        loadHeader,
        loadFooter,
        
        // A2) Layout sync
        syncLayoutVars,
        
        // Breadcrumb
        renderBreadcrumb,
        initBreadcrumbScrollBehavior,
        
        // A3) Routing
        getDetailUrl,
        
        // A4) Defensive helpers
        safeText,
        safeNumber,
        formatMoney,
        safeJsonParse,
        normalizeId,
        slugify,
        
        // A6) Storage
        STORAGE_KEYS,
        getFavorites,
        toggleFavorite,
        isFavorite,
        
        // A8) Safe image/AOS
        addImageFallback,
        applyImageFallbacks,
        safeAOSInit,
        
        // A9) Dia Concierge
        openDiaConcierge,
        
        // A12) Search
        buildSearchRedirect,
        
        // A13) Accessibility
        setupEscapeHandler,
        toggleAriaExpanded,
        
        // A15) Navbar
        getNavbarEl,
        setupNavbarScroll,
        
        // Utilities
        debounce
    };

    // Auto-setup accessibility handlers
    document.addEventListener('DOMContentLoaded', () => {
        setupEscapeHandler();
    });

})();


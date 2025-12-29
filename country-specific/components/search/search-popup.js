/**
 * ============================================================================
 * BLOCK 0.5: SEARCH POPUP (Light SearchHub)
 * ============================================================================
 * Version: 1.0.0
 * Component: Top Navigation Search Popup
 * Dependencies: None (standalone module)
 * 
 * This JavaScript module is INDEPENDENT and modular. Changes here do not affect:
 * - Block 0: Mega Menu (mega-menu-v2.js)
 * - Block 1+: Other components
 * 
 * Integration Point: Triggered by search icon in mega-menu-v2.html
 * 
 * PUBLIC API:
 * - window.SearchPopup.open()
 * - window.SearchPopup.close()
 * - window.SearchPopup.toggle()
 * - window.SearchPopup.search(query, category)
 * ============================================================================
 */

(function() {
    'use strict';

    // ==========================================================================
    // CONFIGURATION
    // ==========================================================================
    const CONFIG = {
        // DOM Element IDs
        overlayId: 'searchPopupOverlay',
        popupId: 'searchPopup',
        inputId: 'searchPopupInput',
        
        // Keyboard shortcuts
        openShortcut: { key: 'k', ctrlKey: true },
        closeKey: 'Escape',
        
        // Categories
        categories: [
            { id: 'all', label: 'All', icon: 'fas fa-search' },
            { id: 'stays', label: 'Stays', icon: 'fas fa-hotel' },
            { id: 'flights', label: 'Flights', icon: 'fas fa-plane' },
            { id: 'cars', label: 'Cars', icon: 'fas fa-car' },
            { id: 'experiences', label: 'Experiences', icon: 'fas fa-compass' },
            { id: 'packages', label: 'Packages', icon: 'fas fa-box-open' }
        ],
        
        // Demo data for trending destinations (CI-specific)
        trendingDestinations: [
            { name: 'Abidjan', image: 'https://images.unsplash.com/photo-1590767950092-42b8362368da?w=300&h=300&fit=crop', url: '/destinations/abidjan' },
            { name: 'Yamoussoukro', image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=300&h=300&fit=crop', url: '/destinations/yamoussoukro' },
            { name: 'Grand-Bassam', image: 'https://images.unsplash.com/photo-1596397249471-4c2c8c8b4c9a?w=300&h=300&fit=crop', url: '/destinations/grand-bassam' },
            { name: 'Assinie', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop', url: '/destinations/assinie' }
        ],
        
        // Popular searches
        popularSearches: [
            { query: 'Hotels in Abidjan', category: 'stays', icon: 'fas fa-hotel' },
            { query: 'Basilica of Yamoussoukro', category: 'experiences', icon: 'fas fa-church' },
            { query: 'Beach resorts', category: 'stays', icon: 'fas fa-umbrella-beach' },
            { query: 'Airport transfer', category: 'cars', icon: 'fas fa-shuttle-van' },
            { query: 'Cultural tours', category: 'experiences', icon: 'fas fa-masks-theater' }
        ],
        
        // Storage key for recent searches
        recentSearchesKey: 'bridge55_recent_searches',
        maxRecentSearches: 5
    };

    // ==========================================================================
    // STATE
    // ==========================================================================
    let state = {
        isOpen: false,
        activeCategory: 'all',
        recentSearches: []
    };

    // ==========================================================================
    // DOM REFERENCES
    // ==========================================================================
    let elements = {
        overlay: null,
        popup: null,
        input: null
    };

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================
    function init() {
        // Create DOM elements if not exists
        if (!document.getElementById(CONFIG.popupId)) {
            createPopupDOM();
        }
        
        // Cache DOM references
        elements.overlay = document.getElementById(CONFIG.overlayId);
        elements.popup = document.getElementById(CONFIG.popupId);
        elements.input = document.getElementById(CONFIG.inputId);
        
        // Load recent searches from localStorage
        loadRecentSearches();
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('[SearchPopup] Initialized. Press Ctrl+K to open.');
    }

    // ==========================================================================
    // DOM CREATION
    // ==========================================================================
    function createPopupDOM() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = CONFIG.overlayId;
        overlay.className = 'search-popup-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        
        // Create popup
        const popup = document.createElement('div');
        popup.id = CONFIG.popupId;
        popup.className = 'search-popup';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-modal', 'true');
        popup.setAttribute('aria-label', 'Search');
        
        popup.innerHTML = `
            <!-- Header: Search Input -->
            <div class="search-popup-header">
                <div class="search-input-wrapper">
                    <i class="fas fa-search search-input-icon"></i>
                    <input 
                        type="text" 
                        id="${CONFIG.inputId}"
                        class="search-popup-input"
                        placeholder="Search destinations, stays, experiences..."
                        autocomplete="off"
                        aria-label="Search"
                    >
                    <div class="search-shortcut-hint">
                        <span class="search-shortcut-key">ESC</span>
                        <span>to close</span>
                    </div>
                    <button class="search-close-btn" onclick="window.SearchPopup.close()" aria-label="Close search">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <!-- Category Tabs -->
            <div class="search-popup-tabs" role="tablist" aria-label="Search categories">
                ${CONFIG.categories.map((cat, idx) => `
                    <button 
                        class="search-tab ${idx === 0 ? 'active' : ''}" 
                        data-category="${cat.id}"
                        role="tab"
                        aria-selected="${idx === 0}"
                        onclick="window.SearchPopup.setCategory('${cat.id}')"
                    >
                        <i class="${cat.icon} search-tab-icon"></i>
                        <span>${cat.label}</span>
                    </button>
                `).join('')}
            </div>
            
            <!-- Body: Dynamic Content -->
            <div class="search-popup-body">
                <!-- Popular Searches -->
                <div class="search-section popular-section">
                    <div class="search-section-title">
                        <i class="fas fa-fire"></i> Popular Searches
                    </div>
                    <div class="search-chips">
                        ${CONFIG.popularSearches.map(item => `
                            <a href="#" class="search-chip" data-query="${item.query}" data-category="${item.category}" onclick="window.SearchPopup.handleChipClick(event, '${item.query}', '${item.category}')">
                                <i class="${item.icon} search-chip-icon"></i>
                                <span>${item.query}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Trending Destinations -->
                <div class="search-section destinations-section">
                    <div class="search-section-title">
                        <i class="fas fa-map-marker-alt"></i> Trending Destinations
                    </div>
                    <div class="search-destinations">
                        ${CONFIG.trendingDestinations.map(dest => `
                            <a href="${dest.url}" class="search-destination-card" onclick="window.SearchPopup.handleDestinationClick(event, '${dest.name}')">
                                <img src="${dest.image}" alt="${dest.name}" loading="lazy">
                                <div class="search-destination-label">${dest.name}</div>
                            </a>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Recent Searches (dynamically populated) -->
                <div class="search-section recent-section" id="recentSearchesSection" style="display: none;">
                    <div class="search-section-title">
                        <i class="fas fa-clock"></i> Recent Searches
                    </div>
                    <div class="search-recent-list" id="recentSearchesList">
                        <!-- Populated dynamically -->
                    </div>
                </div>
            </div>
            
            <!-- Footer: Dia AI Prompt -->
            <div class="search-popup-footer">
                <div class="search-dia-prompt" onclick="window.SearchPopup.openDia()">
                    <div class="search-dia-icon">
                        <i class="fas fa-wand-magic-sparkles"></i>
                    </div>
                    <div class="search-dia-text">
                        <div class="search-dia-title">Ask Dia AI</div>
                        <div class="search-dia-subtitle">Try: "Plan a 3-day cultural tour in Côte d'Ivoire"</div>
                    </div>
                    <i class="fas fa-arrow-right search-dia-arrow"></i>
                </div>
            </div>
        `;
        
        // Append to body
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
    }

    // ==========================================================================
    // EVENT LISTENERS
    // ==========================================================================
    function setupEventListeners() {
        // Overlay click to close
        elements.overlay.addEventListener('click', close);
        
        // Keyboard shortcut to open (Ctrl+K)
        document.addEventListener('keydown', function(e) {
            // Open with Ctrl+K or Cmd+K
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                toggle();
            }
            
            // Also open with just "/" when not in an input
            if (e.key === '/' && !isInputFocused()) {
                e.preventDefault();
                open();
            }
            
            // Close with Escape
            if (e.key === 'Escape' && state.isOpen) {
                close();
            }
        });
        
        // Input handling
        if (elements.input) {
            elements.input.addEventListener('input', handleInputChange);
            elements.input.addEventListener('keydown', handleInputKeydown);
        }
    }

    // ==========================================================================
    // CORE FUNCTIONS
    // ==========================================================================
    function open() {
        if (state.isOpen) return;
        
        state.isOpen = true;
        
        elements.overlay.classList.add('active');
        elements.popup.classList.add('active');
        elements.overlay.setAttribute('aria-hidden', 'false');
        
        // Focus input
        setTimeout(() => {
            if (elements.input) {
                elements.input.focus();
            }
        }, 100);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Update recent searches display
        renderRecentSearches();
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('searchPopupOpened'));
    }

    function close() {
        if (!state.isOpen) return;
        
        state.isOpen = false;
        
        elements.overlay.classList.remove('active');
        elements.popup.classList.remove('active');
        elements.overlay.setAttribute('aria-hidden', 'true');
        
        // Clear input
        if (elements.input) {
            elements.input.value = '';
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('searchPopupClosed'));
    }

    function toggle() {
        if (state.isOpen) {
            close();
        } else {
            open();
        }
    }

    // ==========================================================================
    // CATEGORY HANDLING
    // ==========================================================================
    function setCategory(categoryId) {
        state.activeCategory = categoryId;
        
        // Update tab states
        const tabs = document.querySelectorAll('.search-tab');
        tabs.forEach(tab => {
            const isActive = tab.dataset.category === categoryId;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive);
        });
        
        // Update placeholder based on category
        const placeholders = {
            'all': 'Search destinations, stays, experiences...',
            'stays': 'Search hotels, resorts, guesthouses...',
            'flights': 'Search flights to Abidjan, Yamoussoukro...',
            'cars': 'Search car rentals, transfers...',
            'experiences': 'Search tours, activities, attractions...',
            'packages': 'Search travel packages, deals...'
        };
        
        if (elements.input) {
            elements.input.placeholder = placeholders[categoryId] || placeholders['all'];
            elements.input.focus();
        }
    }

    // ==========================================================================
    // SEARCH HANDLING
    // ==========================================================================
    function search(query, category = state.activeCategory) {
        if (!query || query.trim() === '') return;
        
        query = query.trim();
        
        // Save to recent searches
        saveRecentSearch(query, category);
        
        // Build search URL
        const searchParams = new URLSearchParams();
        searchParams.set('q', query);
        if (category !== 'all') {
            searchParams.set('category', category);
        }
        
        // Redirect to search results page
        const searchUrl = `/country-specific/pages/search-results.html?${searchParams.toString()}`;
        
        // Close popup
        close();
        
        // Navigate (or dispatch event for SPA handling)
        window.location.href = searchUrl;
    }

    function handleInputChange(e) {
        const query = e.target.value;
        
        // TODO: Implement live search suggestions
        // For now, just handle empty state
        if (query.length > 0) {
            // Could show live suggestions here
        }
    }

    function handleInputKeydown(e) {
        if (e.key === 'Enter') {
            const query = e.target.value;
            if (query.trim()) {
                search(query);
            }
        }
    }

    // ==========================================================================
    // RECENT SEARCHES
    // ==========================================================================
    function loadRecentSearches() {
        try {
            const stored = localStorage.getItem(CONFIG.recentSearchesKey);
            state.recentSearches = stored ? JSON.parse(stored) : [];
        } catch (e) {
            state.recentSearches = [];
        }
    }

    function saveRecentSearch(query, category) {
        // Remove if already exists
        state.recentSearches = state.recentSearches.filter(item => item.query !== query);
        
        // Add to beginning
        state.recentSearches.unshift({
            query: query,
            category: category,
            timestamp: Date.now()
        });
        
        // Limit to max
        state.recentSearches = state.recentSearches.slice(0, CONFIG.maxRecentSearches);
        
        // Save to localStorage
        try {
            localStorage.setItem(CONFIG.recentSearchesKey, JSON.stringify(state.recentSearches));
        } catch (e) {
            console.warn('[SearchPopup] Could not save recent searches:', e);
        }
        
        renderRecentSearches();
    }

    function removeRecentSearch(index) {
        state.recentSearches.splice(index, 1);
        
        try {
            localStorage.setItem(CONFIG.recentSearchesKey, JSON.stringify(state.recentSearches));
        } catch (e) {
            console.warn('[SearchPopup] Could not update recent searches:', e);
        }
        
        renderRecentSearches();
    }

    function renderRecentSearches() {
        const section = document.getElementById('recentSearchesSection');
        const list = document.getElementById('recentSearchesList');
        
        if (!section || !list) return;
        
        if (state.recentSearches.length === 0) {
            section.style.display = 'none';
            return;
        }
        
        section.style.display = 'block';
        
        list.innerHTML = state.recentSearches.map((item, index) => `
            <div class="search-recent-item" onclick="window.SearchPopup.search('${item.query.replace(/'/g, "\\'")}', '${item.category}')">
                <div class="search-recent-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="search-recent-text">
                    <div class="search-recent-query">${item.query}</div>
                    <div class="search-recent-meta">${getCategoryLabel(item.category)} • ${getRelativeTime(item.timestamp)}</div>
                </div>
                <button class="search-recent-remove" onclick="event.stopPropagation(); window.SearchPopup.removeRecent(${index})" aria-label="Remove from recent">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    // ==========================================================================
    // CLICK HANDLERS
    // ==========================================================================
    function handleChipClick(event, query, category) {
        event.preventDefault();
        search(query, category);
    }

    function handleDestinationClick(event, destinationName) {
        event.preventDefault();
        saveRecentSearch(destinationName, 'all');
        close();
        
        // Navigate to destination
        const url = event.currentTarget.href;
        if (url && url !== '#') {
            window.location.href = url;
        }
    }

    function openDia() {
        close();
        
        // Try to open Dia concierge if available
        if (typeof window.openDia === 'function') {
            window.openDia();
        } else if (typeof window.openDiaModal === 'function') {
            window.openDiaModal();
        } else {
            // Fallback: navigate to concierge page
            window.location.href = '/concierge.html';
        }
    }

    // ==========================================================================
    // UTILITY FUNCTIONS
    // ==========================================================================
    function isInputFocused() {
        const active = document.activeElement;
        return active && (
            active.tagName === 'INPUT' ||
            active.tagName === 'TEXTAREA' ||
            active.isContentEditable
        );
    }

    function getCategoryLabel(categoryId) {
        const cat = CONFIG.categories.find(c => c.id === categoryId);
        return cat ? cat.label : 'All';
    }

    function getRelativeTime(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
        
        return new Date(timestamp).toLocaleDateString();
    }

    // ==========================================================================
    // PUBLIC API
    // ==========================================================================
    window.SearchPopup = {
        open: open,
        close: close,
        toggle: toggle,
        search: search,
        setCategory: setCategory,
        handleChipClick: handleChipClick,
        handleDestinationClick: handleDestinationClick,
        openDia: openDia,
        removeRecent: removeRecentSearch,
        
        // For debugging
        getState: () => ({ ...state }),
        getConfig: () => ({ ...CONFIG })
    };

    // ==========================================================================
    // AUTO-INIT ON DOM READY
    // ==========================================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    console.log('[SearchPopup] Module loaded. API available at window.SearchPopup');

})();


/**
 * ==============================================
 * MEGA MENU v2.0 - JavaScript Controller
 * Côte d'Ivoire Tourism Platform
 * Block 0: Top Nav & Mega Menu
 * Last Updated: December 29, 2025
 * ==============================================
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION (Super Admin Managed)
    // ============================================
    const CONFIG = {
        // Available Languages (Super Admin adds more)
        languages: [
            { code: 'fr', name: 'Français', flag: 'fr' },
            { code: 'en', name: 'English', flag: 'gb' }
        ],
        
        // Default Settings
        defaultLanguage: 'fr',
        defaultCurrency: 'XOF',
        defaultCountry: 'ci',
        
        // Timezone for local time
        timezone: 'Africa/Abidjan',
        
        // Weather API (placeholder - connect to real API)
        weatherEnabled: true,
        
        // Taglines (can be rotated)
        taglines: [
            'Land of Hospitality',
            'A Land of Diversity and Wonder',
            'Where Africa Meets the World'
        ]
    };

    // ============================================
    // STATE MANAGEMENT
    // ============================================
    const STATE = {
        isLoggedIn: false,
        user: null,
        cartItems: 0,
        notifications: 0,
        currentLanguage: CONFIG.defaultLanguage,
        mobileMenuOpen: false,
        activeMegaMenu: null
    };

    // ============================================
    // DOM REFERENCES
    // ============================================
    const DOM = {
        // Will be populated on init
    };

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        console.log('[MegaMenu v2.0] Initializing...');
        
        // Cache DOM elements
        cacheDOM();
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize components
        initTime();
        initWeather();
        initMegaMenus();
        initMobileMenu();
        initKeyboardNavigation();
        
        // Check login state (from localStorage/session)
        checkLoginState();
        
        console.log('[MegaMenu v2.0] Ready!');
    }

    function cacheDOM() {
        DOM.header = document.querySelector('.site-header');
        DOM.localTime = document.getElementById('localTime');
        DOM.weatherTemp = document.getElementById('weatherTemp');
        DOM.weatherTempLarge = document.getElementById('weatherTempLarge');
        DOM.weatherTimeFull = document.getElementById('weatherTimeFull');
        DOM.weatherPopup = document.getElementById('weatherPopup');
        DOM.weatherWidget = document.getElementById('weatherWidget');
        DOM.profileDropdown = document.getElementById('profileDropdown');
        DOM.profileWelcome = document.getElementById('profileWelcome');
        DOM.mobileMenu = document.getElementById('mobileMenu');
        DOM.mobileOverlay = document.getElementById('mobileOverlay');
        DOM.megaOverlay = document.getElementById('megaOverlay');
        DOM.hamburgerMenu = document.querySelector('.hamburger-menu');
        DOM.navItems = document.querySelectorAll('.nav-item.has-mega');
        DOM.megaMenus = document.querySelectorAll('.mega-menu');
        DOM.megaLinks = document.querySelectorAll('.mega-link');
        DOM.cartBtn = document.getElementById('cartBtn');
        DOM.cartCount = document.getElementById('cartCount');
        DOM.notificationBtn = document.getElementById('notificationBtn');
        DOM.notificationCount = document.getElementById('notificationCount');
        DOM.logoTagline = document.getElementById('logoTagline');
    }

    // ============================================
    // TIME & WEATHER
    // ============================================
    function initTime() {
        updateTime();
        setInterval(updateTime, 60000); // Update every minute
    }

    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: CONFIG.timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        
        const timeStr = now.toLocaleTimeString('en-GB', options);
        
        if (DOM.localTime) {
            DOM.localTime.textContent = timeStr;
        }
        
        if (DOM.weatherTimeFull) {
            DOM.weatherTimeFull.textContent = `${timeStr} GMT`;
        }
    }

    function initWeather() {
        if (!CONFIG.weatherEnabled) return;
        
        // Placeholder - In production, connect to weather API
        // For demo, using static data
        const weatherData = {
            temp: 27,
            condition: 'Partly cloudy',
            icon: '🌤️'
        };
        
        updateWeatherDisplay(weatherData);
    }

    function updateWeatherDisplay(data) {
        if (DOM.weatherTemp) {
            DOM.weatherTemp.textContent = `${data.temp}°`;
        }
        if (DOM.weatherTempLarge) {
            DOM.weatherTempLarge.textContent = `${data.temp}°C`;
        }
    }

    // ============================================
    // MEGA MENU LOGIC
    // ============================================
    function initMegaMenus() {
        DOM.navItems.forEach(item => {
            // Mouse enter
            item.addEventListener('mouseenter', () => {
                openMegaMenu(item);
            });
            
            // Focus for keyboard navigation
            const button = item.querySelector('.nav-link');
            if (button) {
                button.addEventListener('focus', () => {
                    openMegaMenu(item);
                });
            }
        });

        // Close on mouse leave from mega menu area
        DOM.megaMenus.forEach(menu => {
            menu.addEventListener('mouseleave', (e) => {
                // Check if moving to nav item
                const relatedTarget = e.relatedTarget;
                if (!relatedTarget || !relatedTarget.closest('.nav-item.has-mega')) {
                    closeMegaMenus();
                }
            });
        });

        // Overlay click
        if (DOM.megaOverlay) {
            DOM.megaOverlay.addEventListener('click', closeMegaMenus);
        }

        // Setup dynamic hero image swapping
        setupDynamicHero();
    }

    function openMegaMenu(navItem) {
        const menuId = navItem.dataset.mega;
        const menu = document.getElementById('mega-' + menuId);
        
        if (!menu) return;
        
        // Close all menus first
        DOM.megaMenus.forEach(m => m.classList.remove('open'));
        DOM.navItems.forEach(n => {
            n.classList.remove('active');
            const btn = n.querySelector('.nav-link');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        
        // Open this menu
        menu.classList.add('open');
        navItem.classList.add('active');
        
        const btn = navItem.querySelector('.nav-link');
        if (btn) btn.setAttribute('aria-expanded', 'true');
        
        // Show overlay
        if (DOM.megaOverlay) {
            DOM.megaOverlay.classList.add('visible');
        }
        
        STATE.activeMegaMenu = menuId;
    }

    function closeMegaMenus() {
        DOM.megaMenus.forEach(m => m.classList.remove('open'));
        DOM.navItems.forEach(n => {
            n.classList.remove('active');
            const btn = n.querySelector('.nav-link');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        
        if (DOM.megaOverlay) {
            DOM.megaOverlay.classList.remove('visible');
        }
        
        STATE.activeMegaMenu = null;
    }

    function setupDynamicHero() {
        DOM.megaLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const container = this.closest('.mega-grid');
                if (!container) return;
                
                // Update active state
                container.querySelectorAll('.mega-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Get hero elements
                const hero = container.querySelector('.mega-hero');
                if (!hero) return;
                
                const img = hero.querySelector('.mega-hero-img');
                const title = hero.querySelector('.mega-hero-title');
                const desc = hero.querySelector('.mega-hero-desc');
                const badge = hero.querySelector('.mega-hero-badge');
                const cta = hero.querySelector('.mega-hero-cta');
                
                // Animate image swap
                if (img && this.dataset.img) {
                    img.classList.add('fade-out');
                    setTimeout(() => {
                        img.src = this.dataset.img;
                        img.alt = this.dataset.title || '';
                        img.classList.remove('fade-out');
                    }, 200);
                }
                
                // Update text content
                if (title && this.dataset.title) {
                    title.textContent = this.dataset.title;
                }
                if (desc && this.dataset.desc) {
                    desc.textContent = this.dataset.desc;
                }
                if (badge && this.dataset.badge) {
                    badge.textContent = this.dataset.badge;
                }
                
                // Update CTA
                if (cta) {
                    const ctaText = cta.querySelector('span');
                    if (ctaText && this.dataset.cta) {
                        ctaText.textContent = this.dataset.cta;
                    }
                    cta.href = this.href;
                }
            });
        });
    }

    // ============================================
    // MOBILE MENU
    // ============================================
    function initMobileMenu() {
        // Mobile overlay click
        if (DOM.mobileOverlay) {
            DOM.mobileOverlay.addEventListener('click', toggleMobileMenu);
        }
    }

    function toggleMobileMenu() {
        STATE.mobileMenuOpen = !STATE.mobileMenuOpen;
        
        if (STATE.mobileMenuOpen) {
            DOM.mobileMenu?.classList.add('open');
            DOM.mobileOverlay?.classList.add('visible');
            DOM.hamburgerMenu?.setAttribute('aria-expanded', 'true');
            DOM.mobileMenu?.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        } else {
            DOM.mobileMenu?.classList.remove('open');
            DOM.mobileOverlay?.classList.remove('visible');
            DOM.hamburgerMenu?.setAttribute('aria-expanded', 'false');
            DOM.mobileMenu?.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    // ============================================
    // PROFILE & AUTH
    // ============================================
    function toggleProfile(event) {
        if (event) event.stopPropagation();
        DOM.profileDropdown?.classList.toggle('active');
    }

    function checkLoginState() {
        // Check localStorage for user session
        const savedUser = localStorage.getItem('bridge55_user');
        
        if (savedUser) {
            try {
                STATE.user = JSON.parse(savedUser);
                STATE.isLoggedIn = true;
                updateUIForLoggedInUser();
            } catch (e) {
                console.warn('Failed to parse user data');
            }
        }
    }

    function updateUIForLoggedInUser() {
        if (!STATE.isLoggedIn || !STATE.user) return;
        
        // Update welcome message
        if (DOM.profileWelcome) {
            DOM.profileWelcome.textContent = `Hi, ${STATE.user.firstName || STATE.user.name}!`;
        }
        
        // Show notification bell
        if (DOM.notificationBtn) {
            DOM.notificationBtn.style.display = 'flex';
        }
        
        // Show logged-in only menu items
        document.querySelectorAll('.logged-in-only').forEach(el => {
            el.style.display = 'flex';
        });
        
        // Update tagline with welcome
        if (DOM.logoTagline) {
            DOM.logoTagline.innerHTML = `<span style="color:var(--primary);font-weight:700">Welcome, ${STATE.user.firstName || 'Traveler'}</span>`;
        }
    }

    function simulateLogin() {
        // Demo function to simulate login
        STATE.user = {
            firstName: 'Jean-Philippe',
            lastName: 'Kourouma',
            email: 'jp@example.com'
        };
        STATE.isLoggedIn = true;
        
        localStorage.setItem('bridge55_user', JSON.stringify(STATE.user));
        updateUIForLoggedInUser();
        
        // Add some notifications
        updateNotificationCount(3);
    }

    function simulateLogout() {
        STATE.user = null;
        STATE.isLoggedIn = false;
        
        localStorage.removeItem('bridge55_user');
        
        // Reset UI
        if (DOM.profileWelcome) {
            DOM.profileWelcome.textContent = 'Welcome, Guest!';
        }
        if (DOM.notificationBtn) {
            DOM.notificationBtn.style.display = 'none';
        }
        if (DOM.logoTagline) {
            DOM.logoTagline.textContent = CONFIG.taglines[0];
        }
        
        document.querySelectorAll('.logged-in-only').forEach(el => {
            el.style.display = 'none';
        });
    }

    // ============================================
    // CART & NOTIFICATIONS
    // ============================================
    function addToCart() {
        STATE.cartItems++;
        updateCartCount(STATE.cartItems);
    }

    function updateCartCount(count) {
        if (!DOM.cartCount) return;
        
        if (count > 0) {
            DOM.cartCount.textContent = count > 9 ? '9+' : count;
            DOM.cartCount.style.display = 'flex';
        } else {
            DOM.cartCount.style.display = 'none';
        }
    }

    function updateNotificationCount(count) {
        STATE.notifications = count;
        
        if (!DOM.notificationCount) return;
        
        if (count > 0) {
            DOM.notificationCount.textContent = count > 9 ? '9+' : count;
            DOM.notificationCount.style.display = 'flex';
        } else {
            DOM.notificationCount.style.display = 'none';
        }
    }

    // ============================================
    // POPUPS & MODALS
    // ============================================
    function toggleWeatherPopup(event) {
        if (event) event.stopPropagation();
        DOM.weatherPopup?.classList.toggle('active');
    }

    function openDia() {
        // Trigger Dia AI Concierge
        console.log('[Dia] Opening AI Concierge...');
        
        // If Dia is available globally, call it
        if (window.DiaAI && typeof window.DiaAI.open === 'function') {
            window.DiaAI.open();
        } else {
            // Fallback - dispatch custom event
            window.dispatchEvent(new CustomEvent('dia:open'));
            
            // Demo alert
            alert('🤖 Dia AI Concierge\n\nHello! I\'m Dia, your AI travel assistant.\nHow can I help you plan your trip to Côte d\'Ivoire?');
        }
    }

    function openSearch() {
        console.log('[Search] Opening search modal...');
        
        // If search modal exists, open it
        if (window.SearchModal && typeof window.SearchModal.open === 'function') {
            window.SearchModal.open();
        } else {
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('search:open'));
        }
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key closes menus
            if (e.key === 'Escape') {
                closeMegaMenus();
                if (STATE.mobileMenuOpen) {
                    toggleMobileMenu();
                }
                DOM.profileDropdown?.classList.remove('active');
                DOM.weatherPopup?.classList.remove('active');
            }
            
            // Tab navigation for mega menu
            if (e.key === 'Tab' && STATE.activeMegaMenu) {
                // Allow natural tab flow within mega menu
            }
        });
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    function setupEventListeners() {
        // Close dropdowns on outside click
        document.addEventListener('click', (e) => {
            // Close profile dropdown
            if (!e.target.closest('.profile-wrapper')) {
                DOM.profileDropdown?.classList.remove('active');
            }
            
            // Close weather popup
            if (!e.target.closest('#weatherWidget')) {
                DOM.weatherPopup?.classList.remove('active');
            }
            
            // Close mega menu (only if not clicking nav item)
            if (!e.target.closest('.nav-item') && !e.target.closest('.mega-menu')) {
                closeMegaMenus();
            }
        });

        // Scroll behavior
        let lastScrollY = 0;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Optional: Hide/show header on scroll
            // if (currentScrollY > lastScrollY && currentScrollY > 200) {
            //     DOM.header?.classList.add('header-hidden');
            // } else {
            //     DOM.header?.classList.remove('header-hidden');
            // }
            
            lastScrollY = currentScrollY;
        });
    }

    // ============================================
    // EXPOSE GLOBAL FUNCTIONS
    // ============================================
    window.toggleMobileMenu = toggleMobileMenu;
    window.toggleProfile = toggleProfile;
    window.toggleWeatherPopup = toggleWeatherPopup;
    window.openDia = openDia;
    window.openSearch = openSearch;
    window.simulateLogin = simulateLogin;
    window.simulateLogout = simulateLogout;
    window.addToCart = addToCart;

    // Export for module usage
    window.MegaMenuV2 = {
        init,
        toggleMobileMenu,
        openMegaMenu,
        closeMegaMenus,
        updateCartCount,
        updateNotificationCount,
        simulateLogin,
        simulateLogout,
        CONFIG,
        STATE
    };

    // ============================================
    // AUTO-INIT ON DOM READY
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();


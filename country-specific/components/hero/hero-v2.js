/**
 * ============================================================================
 * BLOCK 1: HERO SECTION v2.0 - JAVASCRIPT
 * ============================================================================
 * 
 * PURPOSE: Auto-rotating hero slideshow with campaign tab navigation
 * MANAGED BY: Super Admin Dashboard
 * 
 * FEATURES:
 * - Auto-rotating slides (8 seconds interval)
 * - Campaign tab navigation
 * - Keyboard navigation (Arrow keys)
 * - Touch swipe support for mobile
 * - Pause on hover
 * - Smooth Ken Burns zoom effect
 * - Accessible focus management
 * 
 * ============================================================================
 */

(function() {
    'use strict';

    /**
     * HERO v2 SLIDESHOW
     * ==================
     * Manages auto-rotating slides with campaign tab navigation
     */
    const HeroSlideshow = {
        // Configuration (can be overridden by Super Admin)
        config: {
            autoPlayInterval: 8000,    // 8 seconds per slide
            transitionDuration: 1200,   // 1.2 seconds transition
            pauseOnHover: true,         // Pause auto-play on hover
            enableKeyboard: true,       // Enable arrow key navigation
            enableSwipe: true           // Enable touch swipe on mobile
        },

        // Internal state
        state: {
            currentSlide: 0,
            totalSlides: 0,
            autoPlayTimer: null,
            isPaused: false,
            isInitialized: false
        },

        // DOM element cache
        DOM: {
            container: null,
            slides: [],
            tabs: [],
            indicators: []
        },

        /**
         * Initialize the slideshow
         * @param {Object} customConfig - Optional custom configuration
         */
        init(customConfig = {}) {
            // Merge custom config
            this.config = { ...this.config, ...customConfig };

            // Find container
            this.DOM.container = document.querySelector('.hero-v2');
            if (!this.DOM.container) {
                console.warn('[Hero v2] Container not found');
                return;
            }

            // Cache DOM elements
            this.DOM.slides = Array.from(this.DOM.container.querySelectorAll('.hero-slide'));
            this.DOM.tabs = Array.from(this.DOM.container.querySelectorAll('.campaign-tab'));
            this.DOM.indicators = Array.from(this.DOM.container.querySelectorAll('.hero-indicator'));

            this.state.totalSlides = this.DOM.slides.length;

            if (this.state.totalSlides === 0) {
                console.warn('[Hero v2] No slides found');
                return;
            }

            // Bind events
            this.bindEvents();

            // Start auto-play
            this.startAutoPlay();

            // Mark as initialized
            this.state.isInitialized = true;

            console.log('[Hero v2] Initialized with', this.state.totalSlides, 'slides');
        },

        /**
         * Bind all event listeners
         */
        bindEvents() {
            // Campaign tab clicks
            this.DOM.tabs.forEach((tab, index) => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetSlide = parseInt(tab.dataset.target, 10);
                    this.goToSlide(targetSlide);
                });

                // Keyboard support for tabs
                tab.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const targetSlide = parseInt(tab.dataset.target, 10);
                        this.goToSlide(targetSlide);
                    }
                });
            });

            // Pause on hover
            if (this.config.pauseOnHover) {
                this.DOM.container.addEventListener('mouseenter', () => {
                    this.state.isPaused = true;
                });

                this.DOM.container.addEventListener('mouseleave', () => {
                    this.state.isPaused = false;
                });
            }

            // Keyboard navigation
            if (this.config.enableKeyboard) {
                document.addEventListener('keydown', (e) => {
                    if (!this.isHeroVisible()) return;
                    
                    if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        this.nextSlide();
                    } else if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        this.prevSlide();
                    }
                });
            }

            // Touch swipe support
            if (this.config.enableSwipe) {
                this.setupSwipeSupport();
            }

            // Visibility change (pause when tab is hidden)
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.pauseAutoPlay();
                } else {
                    this.resumeAutoPlay();
                }
            });
        },

        /**
         * Setup touch swipe support for mobile
         */
        setupSwipeSupport() {
            let touchStartX = 0;
            let touchStartY = 0;
            let touchEndX = 0;
            let touchEndY = 0;

            this.DOM.container.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            this.DOM.container.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                touchEndY = e.changedTouches[0].clientY;

                const diffX = touchStartX - touchEndX;
                const diffY = Math.abs(touchStartY - touchEndY);

                // Only trigger if horizontal swipe is greater than vertical
                if (Math.abs(diffX) > 50 && diffY < 100) {
                    if (diffX > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            }, { passive: true });
        },

        /**
         * Go to a specific slide
         * @param {number} index - Target slide index
         */
        goToSlide(index) {
            if (index < 0 || index >= this.state.totalSlides) return;
            if (index === this.state.currentSlide) return;

            const previousSlide = this.state.currentSlide;

            // Update slides
            this.DOM.slides.forEach((slide, i) => {
                const isActive = i === index;
                slide.classList.toggle('active', isActive);
                slide.setAttribute('aria-hidden', !isActive);
                
                // Reset animations for new active slide
                if (isActive) {
                    this.resetAnimations(slide);
                }
            });

            // Update tabs
            this.DOM.tabs.forEach((tab, i) => {
                const isActive = i === index;
                tab.classList.toggle('active', isActive);
                tab.setAttribute('aria-selected', isActive);
                tab.setAttribute('tabindex', isActive ? '0' : '-1');
            });

            // Update indicators (if present)
            this.DOM.indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });

            // Update state
            this.state.currentSlide = index;

            // Restart auto-play timer
            this.restartAutoPlay();

            // Dispatch custom event
            this.DOM.container.dispatchEvent(new CustomEvent('slideChange', {
                detail: {
                    current: index,
                    previous: previousSlide,
                    total: this.state.totalSlides
                }
            }));
        },

        /**
         * Reset entrance animations for a slide
         * @param {HTMLElement} slide - Slide element
         */
        resetAnimations(slide) {
            const animatedElements = slide.querySelectorAll(
                '.hero-badge-v2, .hero-headline-v2, .hero-subheadline-v2, .hero-cta-v2'
            );
            
            animatedElements.forEach(el => {
                // Force animation restart
                el.style.animation = 'none';
                void el.offsetWidth; // Trigger reflow
                el.style.animation = '';
            });
        },

        /**
         * Go to next slide
         */
        nextSlide() {
            const next = (this.state.currentSlide + 1) % this.state.totalSlides;
            this.goToSlide(next);
        },

        /**
         * Go to previous slide
         */
        prevSlide() {
            const prev = (this.state.currentSlide - 1 + this.state.totalSlides) % this.state.totalSlides;
            this.goToSlide(prev);
        },

        /**
         * Start auto-play
         */
        startAutoPlay() {
            if (this.state.autoPlayTimer) return;

            this.state.autoPlayTimer = setInterval(() => {
                if (!this.state.isPaused && !document.hidden) {
                    this.nextSlide();
                }
            }, this.config.autoPlayInterval);
        },

        /**
         * Pause auto-play
         */
        pauseAutoPlay() {
            this.state.isPaused = true;
        },

        /**
         * Resume auto-play
         */
        resumeAutoPlay() {
            this.state.isPaused = false;
        },

        /**
         * Restart auto-play timer
         */
        restartAutoPlay() {
            if (this.state.autoPlayTimer) {
                clearInterval(this.state.autoPlayTimer);
                this.state.autoPlayTimer = null;
            }
            this.startAutoPlay();
        },

        /**
         * Stop auto-play completely
         */
        stopAutoPlay() {
            if (this.state.autoPlayTimer) {
                clearInterval(this.state.autoPlayTimer);
                this.state.autoPlayTimer = null;
            }
        },

        /**
         * Check if hero is visible in viewport
         * @returns {boolean}
         */
        isHeroVisible() {
            if (!this.DOM.container) return false;
            const rect = this.DOM.container.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        },

        /**
         * Update slide content dynamically (for Super Admin)
         * @param {number} index - Slide index
         * @param {Object} content - New content
         */
        updateSlideContent(index, content) {
            const slide = this.DOM.slides[index];
            if (!slide) return;

            if (content.image) {
                const bg = slide.querySelector('.hero-slide-bg');
                if (bg) bg.style.backgroundImage = `url('${content.image}')`;
            }

            if (content.badge) {
                const badge = slide.querySelector('.hero-badge-v2 span');
                if (badge) badge.textContent = content.badge;
            }

            if (content.headline) {
                const headline = slide.querySelector('.hero-headline-v2');
                if (headline) headline.innerHTML = content.headline;
            }

            if (content.subheadline) {
                const sub = slide.querySelector('.hero-subheadline-v2');
                if (sub) sub.textContent = content.subheadline;
            }

            if (content.ctaText) {
                const cta = slide.querySelector('.hero-cta-v2');
                if (cta) {
                    // Preserve the icon
                    cta.innerHTML = `${content.ctaText} <i class="fa-solid fa-arrow-right"></i>`;
                }
            }

            if (content.ctaUrl) {
                const cta = slide.querySelector('.hero-cta-v2');
                if (cta) cta.href = content.ctaUrl;
            }

            if (content.theme) {
                slide.dataset.theme = content.theme;
            }
        },

        /**
         * Get current slide info
         * @returns {Object}
         */
        getCurrentSlide() {
            return {
                index: this.state.currentSlide,
                element: this.DOM.slides[this.state.currentSlide],
                total: this.state.totalSlides
            };
        },

        /**
         * Destroy the slideshow instance
         */
        destroy() {
            this.stopAutoPlay();
            this.state.isInitialized = false;
            console.log('[Hero v2] Destroyed');
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => HeroSlideshow.init());
    } else {
        HeroSlideshow.init();
    }

    // Expose globally for external access and debugging
    window.HeroSlideshow = HeroSlideshow;

})();


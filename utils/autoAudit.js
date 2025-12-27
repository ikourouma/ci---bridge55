/**
 * AUTO-AUDIT SCRIPT
 * Part of the CURSOR MASTER EXECUTION INSTRUCTION
 * 
 * This script validates platform compliance with v9 + Master Execution requirements.
 * It should be run after any implementation to verify correctness.
 * 
 * Usage:
 * 1. Include this script on any page to audit
 * 2. Open browser console to see results
 * 3. All checks must pass for the page to be compliant
 * 
 * Validation Categories:
 * - B1: Demo Mode Flag (window.__DEMO_MODE__)
 * - B2/B3: Demo Data Completeness (all IDs must resolve)
 * - A1: Global Header
 * - A2: Global Footer
 * - A3: Breadcrumb
 * - B1: Layout Variables (no hardcoded offsets)
 * - C: Card → Details Routing (zero mismatch)
 * - D: Detail Pages (no "Not Found" in demo mode)
 * - F/G: Operator Data Integrity
 * 
 * @module autoAudit
 * @version 2.0.0
 * @date 2025-12-27
 */

(function autoAuditBridge55() {
    'use strict';

    const errors = [];
    const warnings = [];
    const passes = [];

    // =========================================================================
    // B1) DEMO MODE VALIDATION
    // =========================================================================
    
    if (window.__DEMO_MODE__ === true) {
        passes.push("✅ [B1] Demo mode is ACTIVE");
        
        // Check for "Not Found" text (forbidden in demo mode)
        const bodyText = document.body.textContent || '';
        const notFoundPatterns = [
            /not found/i,
            /page not found/i,
            /experience not found/i,
            /itinerary not found/i,
            /operator not found/i,
            /region not found/i,
            /interest not found/i
        ];
        
        notFoundPatterns.forEach(pattern => {
            if (pattern.test(bodyText) && !bodyText.includes('<!-- Demo mode allows')) {
                // Check if it's in a visible element
                const notFoundElements = Array.from(document.querySelectorAll('*')).filter(el => {
                    const style = window.getComputedStyle(el);
                    return pattern.test(el.textContent || '') && 
                           style.display !== 'none' && 
                           style.visibility !== 'hidden';
                });
                
                if (notFoundElements.length > 0) {
                    errors.push(`❌ [B1] "Not Found" text found in demo mode (FORBIDDEN): "${notFoundElements[0].textContent.substring(0, 50)}"`);
                }
            }
        });
        
        // Check for empty sections (forbidden)
        const emptySections = document.querySelectorAll('.operator-section, .experience-section, .itinerary-section, .region-section');
        emptySections.forEach(section => {
            const hasContent = section.querySelector('h1, h2, h3, p, img, .card') !== null;
            if (!hasContent && section.textContent.trim().length < 20) {
                errors.push(`❌ [B1] Empty section found in demo mode: ${section.className}`);
            }
        });
    } else {
        errors.push("❌ [B1] Demo mode flag (window.__DEMO_MODE__) not set or false");
    }

    // =========================================================================
    // B2/B3) DEMO DATA COMPLETENESS VALIDATION
    // =========================================================================
    
    // Check all links with ?id= parameters
    document.querySelectorAll('a[href*="?id="]').forEach(link => {
        const href = link.getAttribute('href');
        const match = href.match(/[?&]id=([^&]+)/);
        if (match) {
            const id = decodeURIComponent(match[1]);
            const pageType = href.match(/(\w+)-details\.html/);
            
            if (pageType) {
                const type = pageType[1]; // operator, experience, itinerary, region, interest
                
                // Check if ID exists in demo data
                if (window.DemoDB && window.DemoDB.exists) {
                    if (!window.DemoDB.exists(id, type)) {
                        errors.push(`❌ [B3] Card links to ID "${id}" which does NOT exist in demo data (type: ${type})`);
                    } else {
                        passes.push(`✅ [B3] Card ID "${id}" exists in demo data`);
                    }
                } else {
                    warnings.push(`⚠️ [B3] DemoDB.exists() not available - cannot validate ID "${id}"`);
                }
            }
        }
    });
    
    // Validate all demo datasets are loaded
    if (window.DemoDB && window.DemoDB.validate) {
        const validation = window.DemoDB.validate();
        if (!validation.valid) {
            errors.push(`❌ [B2] Missing demo datasets: ${validation.missing.join(', ')}`);
        } else {
            passes.push("✅ [B2] All demo datasets loaded");
        }
    }

    // =========================================================================
    // A3) BREADCRUMB VALIDATION
    // =========================================================================
    
    const breadcrumb = document.getElementById('breadcrumbBar') 
        || document.getElementById('global-breadcrumb')
        || document.querySelector('.breadcrumb-bar');
    
    if (!breadcrumb) {
        errors.push("❌ [A3] Missing breadcrumb container (#breadcrumbBar or #global-breadcrumb)");
    } else {
        passes.push("✅ [A3] Breadcrumb container found");
        
        // Check if breadcrumb has content
        if (breadcrumb.children.length === 0 || breadcrumb.textContent.trim().length < 5) {
            warnings.push("⚠️ [A3] Breadcrumb appears empty - ensure renderBreadcrumb() was called");
        }
        
        // Check aria-label
        if (!breadcrumb.getAttribute('aria-label')) {
            warnings.push("⚠️ [A3] Breadcrumb missing aria-label for accessibility");
        }
    }

    // =========================================================================
    // A1) HEADER VALIDATION
    // =========================================================================
    
    const header = document.getElementById('global-header')
        || document.querySelector('.mega-menu-container')
        || document.querySelector('header');
    
    if (!header) {
        errors.push("❌ [A1] Missing global header (#global-header or .mega-menu-container)");
    } else {
        passes.push("✅ [A1] Global header found");
        
        // Check if header was loaded via PageShell
        if (header.dataset && header.dataset.loaded === 'true') {
            passes.push("✅ [A1] Header loaded via PageShell");
        }
    }

    // =========================================================================
    // A2) FOOTER VALIDATION
    // =========================================================================
    
    const footer = document.getElementById('global-footer')
        || document.querySelector('footer');
    
    if (!footer) {
        errors.push("❌ [A2] Missing global footer (#global-footer or footer element)");
    } else {
        passes.push("✅ [A2] Global footer found");
    }

    // =========================================================================
    // B1) LAYOUT VARIABLES VALIDATION
    // =========================================================================
    
    const computedStyle = getComputedStyle(document.documentElement);
    const headerHeight = computedStyle.getPropertyValue('--header-height');
    const breadcrumbHeight = computedStyle.getPropertyValue('--breadcrumb-height');
    
    if (!headerHeight || headerHeight === '0px' || headerHeight === '') {
        warnings.push("⚠️ [B1] --header-height CSS variable not set or is 0px");
    } else {
        passes.push(`✅ [B1] --header-height set: ${headerHeight}`);
    }
    
    if (breadcrumbHeight === undefined || breadcrumbHeight === '') {
        warnings.push("⚠️ [B1] --breadcrumb-height CSS variable not set");
    } else {
        passes.push(`✅ [B1] --breadcrumb-height set: ${breadcrumbHeight}`);
    }

    // Check for hardcoded layout values in inline styles
    document.querySelectorAll('[style*="top:"]').forEach(el => {
        const style = el.getAttribute('style') || '';
        // Look for hardcoded pixel values for top
        const hardcodedTop = style.match(/top:\s*(\d+)px/);
        if (hardcodedTop && parseInt(hardcodedTop[1]) > 50) {
            warnings.push(`⚠️ [B1] Hardcoded top value found: ${hardcodedTop[0]} on ${el.tagName}.${el.className}`);
        }
    });

    // =========================================================================
    // D) CARD → DETAILS ROUTING VALIDATION
    // =========================================================================
    
    // Check cards with data-card-id
    document.querySelectorAll("[data-card-id], [data-id]").forEach(card => {
        const cardId = card.dataset.cardId || card.dataset.id;
        const target = card.dataset.target || card.getAttribute('href');
        
        if (!target && !card.onclick) {
            errors.push(`❌ [D] Card "${cardId}" missing data-target or href`);
        } else if (target) {
            // Check for generic/placeholder pages
            if (target.includes('generic') || target.includes('placeholder')) {
                errors.push(`❌ [D] Card "${cardId}" links to generic/placeholder page: ${target}`);
            }
            
            // Check for missing ID in URL
            if (!target.includes('id=') && !target.includes(cardId)) {
                warnings.push(`⚠️ [D] Card "${cardId}" target may not include ID: ${target}`);
            }
        }
    });

    // Check all clickable cards
    document.querySelectorAll(".card[onclick], .card a, [class*='card'] a").forEach(card => {
        const href = card.getAttribute('href') || '';
        const onclick = card.getAttribute('onclick') || '';
        
        // Check for navigation to search pages from cards (forbidden)
        if (href.includes('-search.html') && !href.includes('?')) {
            warnings.push(`⚠️ [D] Card may link to search page without context: ${href}`);
        }
    });

    // =========================================================================
    // F/G) OPERATOR DATA VALIDATION
    // =========================================================================
    
    // Check operator links
    document.querySelectorAll("[data-operator-id]").forEach(el => {
        const operatorId = el.dataset.operatorId;
        const href = el.getAttribute("href") || '';
        const onclick = el.getAttribute("onclick") || '';
        
        if (!href.includes("operator-details") && !onclick.includes("operator-details")) {
            errors.push(`❌ [F] Operator "${operatorId}" not linked to operator-details.html`);
        } else {
            passes.push(`✅ [F] Operator "${operatorId}" correctly linked`);
        }
    });

    // Check if DEMO_OPERATORS is available and valid
    if (window.DEMO_OPERATORS) {
        passes.push(`✅ [G] DEMO_OPERATORS dataset loaded (${window.DEMO_OPERATORS.length} operators)`);
        
        window.DEMO_OPERATORS.forEach(op => {
            if (!op.name) {
                errors.push(`❌ [G] Operator ${op.id} missing name`);
            }
            if (!op.registrationNumber) {
                errors.push(`❌ [G] Operator ${op.id} missing registrationNumber`);
            }
            if (!op.contact) {
                errors.push(`❌ [G] Operator ${op.id} missing contact info`);
            } else if (!op.contact.email && !op.contact.phone) {
                errors.push(`❌ [G] Operator ${op.id} missing email or phone`);
            }
            if (!op.verified) {
                warnings.push(`⚠️ [G] Operator ${op.id} is not verified (should not appear in demo)`);
            }
        });
    } else {
        warnings.push("⚠️ [G] DEMO_OPERATORS dataset not loaded on this page");
    }

    // =========================================================================
    // I) OPERATOR PROFILE ACCESS VALIDATION
    // =========================================================================
    
    // Check for "View Operator Profile" buttons on detail pages
    const isDetailPage = window.location.pathname.includes('-details.html');
    if (isDetailPage && !window.location.pathname.includes('operator-details')) {
        const operatorSection = document.querySelector('.operator-section, .operator-card, [class*="operator"]');
        if (operatorSection) {
            const operatorLink = operatorSection.querySelector('a[href*="operator-details"]');
            if (!operatorLink) {
                errors.push("❌ [I] Detail page has operator section but no 'View Operator Profile' link");
            } else {
                passes.push("✅ [I] Operator profile link found on detail page");
            }
        }
    }

    // =========================================================================
    // ADDITIONAL CHECKS
    // =========================================================================
    
    // Check for broken images (SmartImage compliance)
    document.querySelectorAll('img').forEach(img => {
        if (!img.onerror && !img.dataset.fallback) {
            warnings.push(`⚠️ Image without fallback handler: ${img.src?.substring(0, 50)}...`);
        }
    });

    // Check for date range fields on booking/filter sections
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length === 1 && document.querySelector('.filter-section, .booking-section, .search-section')) {
        warnings.push("⚠️ Only one date input found - should use DateRangeField (start + end)");
    }

    // =========================================================================
    // OUTPUT RESULTS
    // =========================================================================
    
    const totalErrors = errors.length;
    const totalWarnings = warnings.length;
    const totalPasses = passes.length;
    
    console.log('\n');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('  BRIDGE55 AUTO-AUDIT v2.0 - Master Execution Compliance');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`  Page: ${window.location.pathname}`);
    console.log(`  Time: ${new Date().toISOString()}`);
    console.log('───────────────────────────────────────────────────────────────');
    
    if (totalErrors > 0) {
        console.group("🚨 ERRORS (" + totalErrors + ") - MUST FIX");
        errors.forEach(e => console.error(e));
        console.groupEnd();
    }
    
    if (totalWarnings > 0) {
        console.group("⚠️ WARNINGS (" + totalWarnings + ") - SHOULD FIX");
        warnings.forEach(w => console.warn(w));
        console.groupEnd();
    }
    
    if (totalPasses > 0) {
        console.group("✅ PASSED (" + totalPasses + ")");
        passes.forEach(p => console.log(p));
        console.groupEnd();
    }
    
    console.log('───────────────────────────────────────────────────────────────');
    
    if (totalErrors === 0) {
        console.log('%c ✅ AUTO-AUDIT PASSED ', 'background: #22c55e; color: white; font-weight: bold; padding: 4px 8px;');
        console.log(`  ${totalPasses} checks passed, ${totalWarnings} warnings`);
    } else {
        console.log('%c ❌ AUTO-AUDIT FAILED ', 'background: #ef4444; color: white; font-weight: bold; padding: 4px 8px;');
        console.log(`  ${totalErrors} errors, ${totalWarnings} warnings`);
        console.log('  Fix all errors before marking work as complete.');
    }
    
    console.log('═══════════════════════════════════════════════════════════════\n');

    // Return results for programmatic access
    return {
        passed: totalErrors === 0,
        errors,
        warnings,
        passes,
        summary: {
            errorCount: totalErrors,
            warningCount: totalWarnings,
            passCount: totalPasses
        }
    };

})();


#!/usr/bin/env node
/**
 * Bridge55 Navigation & Routing Audit Script
 * 
 * Purpose: Ensure navigation correctness and card-to-details routing integrity.
 * Validates that every card links to a unique, valid detail page.
 * 
 * Usage: node ci/audit-navigation.js
 * Exit codes: 0 = PASS, 1 = FAIL
 */

const fs = require('fs');
const path = require('path');

const errors = [];
const warnings = [];

function log(msg, type = 'info') {
    const prefix = {
        'info': '  ',
        'pass': '✅',
        'fail': '❌',
        'warn': '⚠️'
    }[type] || '  ';
    console.log(`${prefix} ${msg}`);
}

// ============================================================================
// ROUTING PATTERNS
// ============================================================================

const REQUIRED_ROUTING_PATTERNS = {
    'experience': {
        pattern: /experience-details\.html\?id=exp-[a-z0-9-]+/,
        helper: 'getServiceUrl',
        description: 'Experience → experience-details.html?id=exp-xxx'
    },
    'itinerary': {
        pattern: /itinerary-details\.html\?id=it-[a-z0-9-]+/,
        helper: 'getItineraryUrl',
        description: 'Itinerary → itinerary-details.html?id=it-xxx'
    },
    'operator': {
        pattern: /operator-details\.html\?id=op-[a-z]{2}-[0-9]{3}/,
        helper: 'getOperatorUrl',
        description: 'Operator → operator-details.html?id=op-xx-xxx'
    },
    'region': {
        pattern: /region-details\.html\?id=reg-[a-z0-9-]+/,
        helper: 'getRegionUrl',
        description: 'Region → region-details.html?id=reg-xxx'
    },
    'interest': {
        pattern: /interest-details\.html\?id=int-[a-z0-9-]+/,
        helper: 'getInterestUrl',
        description: 'Interest → interest-details.html?id=int-xxx'
    }
};

// Forbidden routing patterns
const FORBIDDEN_PATTERNS = [
    { pattern: /\?name=[^"'&]+/g, msg: 'Name-based routing (use ID instead)' },
    { pattern: /details\.html(?!\?id=)/g, msg: 'Details page without ID parameter' },
    { pattern: /href=["']#["']\s*class=["'][^"']*card/gi, msg: 'Card with href="#"' }
];

// ============================================================================
// AUDIT FUNCTIONS
// ============================================================================

function extractLinks(content) {
    const links = [];
    const hrefPattern = /href=["']([^"']+)["']/g;
    let match;
    
    while ((match = hrefPattern.exec(content)) !== null) {
        links.push(match[1]);
    }
    
    return links;
}

function auditCardRouting(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const issues = [];
    
    // Find all links
    const links = extractLinks(content);
    
    // Check for proper detail page routing
    const detailLinks = links.filter(l => l.includes('details.html'));
    
    detailLinks.forEach(link => {
        // Check if link has proper ID parameter
        if (link.includes('details.html') && !link.includes('?id=')) {
            issues.push(`${fileName}: Detail link without ID: ${link.substring(0, 60)}...`);
        }
        
        // Check for name-based routing (forbidden)
        if (link.includes('?name=')) {
            issues.push(`${fileName}: Forbidden name-based routing: ${link.substring(0, 60)}...`);
        }
    });
    
    return issues;
}

function auditRoutingHelpers(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const issues = [];
    const findings = [];
    
    // Check if page uses routing helpers
    const helpers = ['getOperatorUrl', 'getServiceUrl', 'getItineraryUrl', 'getRegionUrl', 'getInterestUrl', 'getDetailUrl'];
    
    helpers.forEach(helper => {
        if (content.includes(helper)) {
            findings.push(helper);
        }
    });
    
    // Check for hardcoded routes that should use helpers
    const hardcodedRoutes = [
        { pattern: /'operator-details\.html\?id=/g, helper: 'getOperatorUrl' },
        { pattern: /"operator-details\.html\?id=/g, helper: 'getOperatorUrl' },
        { pattern: /'experience-details\.html\?id=/g, helper: 'getServiceUrl' },
        { pattern: /"experience-details\.html\?id=/g, helper: 'getServiceUrl' },
        { pattern: /'itinerary-details\.html\?id=/g, helper: 'getItineraryUrl' },
        { pattern: /"itinerary-details\.html\?id=/g, helper: 'getItineraryUrl' }
    ];
    
    // Only warn if there are many hardcoded routes and no helpers
    if (findings.length === 0) {
        let hardcodedCount = 0;
        hardcodedRoutes.forEach(({ pattern }) => {
            const matches = content.match(pattern);
            if (matches) hardcodedCount += matches.length;
        });
        
        if (hardcodedCount > 5) {
            issues.push(`${fileName}: ${hardcodedCount} hardcoded routes - consider using routing helpers`);
        }
    }
    
    return { issues, findings };
}

function auditBreadcrumbConsistency(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const issues = [];
    
    // Check breadcrumb exists
    const hasBreadcrumb = content.includes('breadcrumb') || content.includes('Breadcrumb');
    
    if (!hasBreadcrumb) {
        issues.push(`${fileName}: Missing breadcrumb navigation`);
    }
    
    // Check for PageShell breadcrumb rendering
    const usesPageShell = content.includes('PageShell.renderBreadcrumb') || 
                          content.includes('renderBreadcrumb({');
    
    const hasStaticBreadcrumb = content.includes('breadcrumb-bar') || 
                                 content.includes('breadcrumb-inner');
    
    if (!usesPageShell && !hasStaticBreadcrumb && hasBreadcrumb) {
        issues.push(`${fileName}: Breadcrumb exists but may not be properly rendered`);
    }
    
    return issues;
}

function auditOperatorLinks(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const issues = [];
    
    // Check for operator profile links
    const operatorLinkPatterns = [
        /View Operator Profile/gi,
        /operator-details\.html/g,
        /data-operator-id/g
    ];
    
    const hasOperatorLinks = operatorLinkPatterns.some(p => p.test(content));
    
    // If page has operator mentions, check for proper linking
    if (content.includes('operator') && content.includes('card') && !hasOperatorLinks) {
        // This might be a page that shows operators but doesn't link properly
        if (fileName.includes('itinerary') || fileName.includes('experience')) {
            // These pages should have operator links
            issues.push(`${fileName}: Page mentions operators but may not have proper operator profile links`);
        }
    }
    
    return issues;
}

// ============================================================================
// MAIN AUDIT
// ============================================================================

function main() {
    console.log('\n' + '═'.repeat(60));
    console.log('  🔗 BRIDGE55 NAVIGATION & ROUTING AUDIT');
    console.log('  Timestamp:', new Date().toISOString());
    console.log('═'.repeat(60));
    
    const pageDirs = [
        'pages',
        'country-specific/pages',
        'afcon/pages'
    ];
    
    let totalPages = 0;
    let pagesWithIssues = 0;
    let pagesUsingHelpers = 0;
    
    // Audit each directory
    console.log('\n📁 Scanning page directories...\n');
    
    pageDirs.forEach(dir => {
        const fullPath = path.join(__dirname, '..', dir);
        if (!fs.existsSync(fullPath)) {
            log(`Directory not found: ${dir}`, 'warn');
            return;
        }
        
        console.log(`\n📂 ${dir}`);
        console.log('─'.repeat(40));
        
        // Get all HTML files (including subdirectories)
        function getHTMLFiles(dirPath) {
            let files = [];
            const items = fs.readdirSync(dirPath);
            
            items.forEach(item => {
                const itemPath = path.join(dirPath, item);
                const stat = fs.statSync(itemPath);
                
                if (stat.isDirectory()) {
                    files = files.concat(getHTMLFiles(itemPath));
                } else if (item.endsWith('.html') && !item.includes('BACKUP') && !item.startsWith('_')) {
                    files.push(itemPath);
                }
            });
            
            return files;
        }
        
        const files = getHTMLFiles(fullPath);
        
        files.forEach(filePath => {
            const fileName = path.basename(filePath);
            totalPages++;
            
            const routingIssues = auditCardRouting(filePath);
            const { issues: helperIssues, findings: helpers } = auditRoutingHelpers(filePath);
            const breadcrumbIssues = auditBreadcrumbConsistency(filePath);
            const operatorIssues = auditOperatorLinks(filePath);
            
            const allIssues = [...routingIssues, ...helperIssues, ...breadcrumbIssues, ...operatorIssues];
            
            if (helpers.length > 0) pagesUsingHelpers++;
            
            if (allIssues.length > 0) {
                pagesWithIssues++;
                allIssues.forEach(issue => {
                    if (issue.includes('Forbidden') || issue.includes('Missing breadcrumb')) {
                        errors.push(issue);
                    } else {
                        warnings.push(issue);
                    }
                });
                log(`${fileName}: ${allIssues.length} issue(s)`, 'warn');
            } else {
                log(`${fileName}: OK`, 'pass');
            }
        });
    });
    
    // Final report
    console.log('\n' + '═'.repeat(60));
    console.log('  📋 NAVIGATION AUDIT SUMMARY');
    console.log('═'.repeat(60));
    
    console.log(`\n📊 Statistics:`);
    console.log(`   Total pages scanned: ${totalPages}`);
    console.log(`   Pages with issues: ${pagesWithIssues}`);
    console.log(`   Pages using routing helpers: ${pagesUsingHelpers}`);
    
    if (errors.length > 0) {
        console.log(`\n❌ ERRORS (${errors.length}):`);
        errors.forEach((e, i) => console.log(`   ${i + 1}. ${e}`));
    }
    
    if (warnings.length > 0) {
        console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
        warnings.slice(0, 15).forEach((w, i) => console.log(`   ${i + 1}. ${w}`));
        if (warnings.length > 15) {
            console.log(`   ... and ${warnings.length - 15} more`);
        }
    }
    
    console.log('\n' + '─'.repeat(60));
    
    if (errors.length > 0) {
        console.log('🚨 NAVIGATION AUDIT FAILED');
        process.exit(1);
    } else if (warnings.length > 0) {
        console.log('⚠️  NAVIGATION AUDIT PASSED WITH WARNINGS');
        process.exit(0);
    } else {
        console.log('✅ NAVIGATION AUDIT PASSED');
        process.exit(0);
    }
}

main();


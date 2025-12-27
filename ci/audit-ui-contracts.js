#!/usr/bin/env node
/**
 * Bridge55 UI Contract Audit Script
 * 
 * Purpose: Guarantee UX consistency across the entire platform.
 * Validates global header, footer, breadcrumb, and menu presence.
 * 
 * Usage: node ci/audit-ui-contracts.js
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
// UI CONTRACT REQUIREMENTS
// ============================================================================

const UI_CONTRACTS = {
    globalHeader: {
        name: 'Global Header',
        required: true,
        patterns: [
            /id=["']global-header["']/,
            /class=["'][^"']*global-header[^"']*["']/,
            /loadGlobalShell/,
            /mega-menu/i
        ],
        errorMessage: 'Missing or invalid global header'
    },
    globalFooter: {
        name: 'Global Footer',
        required: true,
        patterns: [
            /id=["']global-footer["']/,
            /class=["'][^"']*global-footer[^"']*["']/,
            /global-footer.*\.html/
        ],
        errorMessage: 'Missing or invalid global footer'
    },
    breadcrumb: {
        name: 'Breadcrumb Navigation',
        required: true,
        patterns: [
            /breadcrumb-bar/i,
            /breadcrumbBar/,
            /global-breadcrumb/,
            /aria-label=["']Breadcrumb["']/i
        ],
        errorMessage: 'Missing breadcrumb navigation'
    },
    megaMenu: {
        name: 'Mega Menu',
        required: false,
        patterns: [
            /mega-menu/i,
            /initMegaMenu/,
            /mega-menu-styles\.css/
        ],
        errorMessage: 'Mega menu not initialized'
    },
    hamburgerMenu: {
        name: 'Mobile Menu',
        required: false,
        patterns: [
            /hamburger/i,
            /mobile-menu/i,
            /toggleMobileMenu/,
            /fa-bars/
        ],
        errorMessage: 'Mobile menu may be missing'
    },
    globalLayoutCSS: {
        name: 'Global Layout CSS',
        required: false,
        patterns: [
            /global-layout\.css/,
            /--bridge-max-width/,
            /--header-height/
        ],
        errorMessage: 'Global layout CSS not included'
    }
};

// Pages that are exempt from certain checks
const EXEMPTIONS = {
    globalHeader: ['index.html'], // Demo hub has different header
    globalFooter: ['index.html'],
    breadcrumb: [] // Breadcrumb required on ALL pages
};

// ============================================================================
// AUDIT FUNCTIONS
// ============================================================================

function checkContract(content, contract) {
    return contract.patterns.some(pattern => pattern.test(content));
}

function auditPage(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const issues = [];
    const passed = [];
    
    Object.entries(UI_CONTRACTS).forEach(([key, contract]) => {
        // Check exemptions
        if (EXEMPTIONS[key] && EXEMPTIONS[key].includes(fileName)) {
            return;
        }
        
        const hasContract = checkContract(content, contract);
        
        if (!hasContract) {
            if (contract.required) {
                issues.push({
                    type: 'error',
                    contract: contract.name,
                    message: `${fileName}: ${contract.errorMessage}`
                });
            } else {
                issues.push({
                    type: 'warning',
                    contract: contract.name,
                    message: `${fileName}: ${contract.errorMessage}`
                });
            }
        } else {
            passed.push(contract.name);
        }
    });
    
    // Additional checks
    
    // Check for duplicate headers
    const headerMatches = content.match(/id=["']global-header["']/g);
    if (headerMatches && headerMatches.length > 1) {
        issues.push({
            type: 'error',
            contract: 'Global Header',
            message: `${fileName}: Duplicate global headers (${headerMatches.length} found)`
        });
    }
    
    // Check for duplicate footers
    const footerMatches = content.match(/id=["']global-footer["']/g);
    if (footerMatches && footerMatches.length > 1) {
        issues.push({
            type: 'error',
            contract: 'Global Footer',
            message: `${fileName}: Duplicate global footers (${footerMatches.length} found)`
        });
    }
    
    // Check for local header overrides (forbidden)
    if (content.includes('<header') && !content.includes('global-header')) {
        const headerCount = (content.match(/<header/g) || []).length;
        if (headerCount > 0 && !content.includes('dashboard') && !content.includes('admin')) {
            issues.push({
                type: 'warning',
                contract: 'Global Header',
                message: `${fileName}: Local header element found - should use global header`
            });
        }
    }
    
    return { issues, passed };
}

function auditPageShellUsage(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const findings = {
        usesPageShell: false,
        rendersBreadcrumb: false,
        syncsLayoutVars: false
    };
    
    findings.usesPageShell = content.includes('page-shell.js') || content.includes('PageShell');
    findings.rendersBreadcrumb = content.includes('renderBreadcrumb');
    findings.syncsLayoutVars = content.includes('syncLayoutVars');
    
    return findings;
}

// ============================================================================
// MAIN AUDIT
// ============================================================================

function main() {
    console.log('\n' + '═'.repeat(60));
    console.log('  🎨 BRIDGE55 UI CONTRACT AUDIT');
    console.log('  Timestamp:', new Date().toISOString());
    console.log('═'.repeat(60));
    
    console.log('\n📋 Required UI Contracts:');
    Object.entries(UI_CONTRACTS).forEach(([key, contract]) => {
        const status = contract.required ? '✓ Required' : '○ Optional';
        console.log(`   ${status}: ${contract.name}`);
    });
    
    const pageDirs = [
        'pages',
        'country-specific/pages'
    ];
    
    let totalPages = 0;
    let compliantPages = 0;
    let pageShellPages = 0;
    
    console.log('\n📁 Auditing pages...\n');
    
    pageDirs.forEach(dir => {
        const fullPath = path.join(__dirname, '..', dir);
        if (!fs.existsSync(fullPath)) return;
        
        console.log(`\n📂 ${dir}`);
        console.log('─'.repeat(40));
        
        const files = fs.readdirSync(fullPath).filter(f => 
            f.endsWith('.html') && 
            !f.includes('BACKUP') && 
            !f.startsWith('_')
        );
        
        files.forEach(file => {
            const filePath = path.join(fullPath, file);
            totalPages++;
            
            const { issues, passed } = auditPage(filePath);
            const pageShell = auditPageShellUsage(filePath);
            
            if (pageShell.usesPageShell) pageShellPages++;
            
            const errorIssues = issues.filter(i => i.type === 'error');
            const warningIssues = issues.filter(i => i.type === 'warning');
            
            if (errorIssues.length === 0) {
                compliantPages++;
            }
            
            // Log results
            if (issues.length === 0) {
                log(`${file}: All contracts satisfied`, 'pass');
            } else if (errorIssues.length === 0) {
                log(`${file}: ${warningIssues.length} warning(s)`, 'warn');
                warningIssues.forEach(i => warnings.push(i.message));
            } else {
                log(`${file}: ${errorIssues.length} error(s)`, 'fail');
                errorIssues.forEach(i => errors.push(i.message));
                warningIssues.forEach(i => warnings.push(i.message));
            }
        });
    });
    
    // Final report
    console.log('\n' + '═'.repeat(60));
    console.log('  📋 UI CONTRACT AUDIT SUMMARY');
    console.log('═'.repeat(60));
    
    console.log(`\n📊 Statistics:`);
    console.log(`   Total pages audited: ${totalPages}`);
    console.log(`   Fully compliant: ${compliantPages}`);
    console.log(`   Using PageShell: ${pageShellPages}`);
    console.log(`   Compliance rate: ${Math.round((compliantPages / totalPages) * 100)}%`);
    
    if (errors.length > 0) {
        console.log(`\n❌ ERRORS (${errors.length}):`);
        errors.forEach((e, i) => console.log(`   ${i + 1}. ${e}`));
    }
    
    if (warnings.length > 0) {
        console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
        warnings.slice(0, 10).forEach((w, i) => console.log(`   ${i + 1}. ${w}`));
        if (warnings.length > 10) {
            console.log(`   ... and ${warnings.length - 10} more`);
        }
    }
    
    console.log('\n' + '─'.repeat(60));
    
    if (errors.length > 0) {
        console.log('🚨 UI CONTRACT AUDIT FAILED');
        console.log(`   ${errors.length} required contracts not satisfied`);
        process.exit(1);
    } else {
        console.log('✅ UI CONTRACT AUDIT PASSED');
        console.log(`   All pages satisfy required UI contracts`);
        process.exit(0);
    }
}

main();


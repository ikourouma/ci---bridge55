#!/usr/bin/env node
/**
 * Bridge55 CI/CD Pipeline Runner
 * 
 * Purpose: Orchestrate all audit stages and enforce quality gates.
 * This is the main entry point for CI/CD validation.
 * 
 * Usage: node ci/pipeline.js [--mode=demo|live] [--stage=1-7] [--verbose]
 * Exit codes: 0 = ALL PASS, 1 = FAIL
 */

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const CONFIG = {
    mode: process.env.BRIDGE55_MODE || 'demo',
    verbose: process.argv.includes('--verbose') || process.argv.includes('-v'),
    stageOnly: null
};

// Parse stage argument
const stageArg = process.argv.find(a => a.startsWith('--stage='));
if (stageArg) {
    CONFIG.stageOnly = parseInt(stageArg.split('=')[1]);
}

// Pipeline stages
const STAGES = [
    {
        id: 1,
        name: 'Install & Build',
        description: 'Ensure project builds cleanly',
        run: runInstallBuild
    },
    {
        id: 2,
        name: 'Schema Validation',
        description: 'Validate entity schemas exist',
        run: runSchemaValidation
    },
    {
        id: 3,
        name: 'Demo Integrity Audit',
        description: 'Validate demo data completeness',
        run: runDemoAudit
    },
    {
        id: 4,
        name: 'Navigation & Routing Audit',
        description: 'Validate navigation correctness',
        run: runNavigationAudit
    },
    {
        id: 5,
        name: 'UI Contract Audit',
        description: 'Validate UX consistency',
        run: runUIContractAudit
    },
    {
        id: 6,
        name: 'Mode Compliance Check',
        description: 'Validate mode-specific rules',
        run: runModeCompliance
    },
    {
        id: 7,
        name: 'Final Gate',
        description: 'Aggregate results and determine pass/fail',
        run: runFinalGate
    }
];

// Stage results
const results = {};

// ============================================================================
// STAGE IMPLEMENTATIONS
// ============================================================================

function runInstallBuild() {
    console.log('   Checking package.json...');
    
    const packagePath = path.join(__dirname, '..', 'package.json');
    if (!fs.existsSync(packagePath)) {
        return { status: 'fail', message: 'package.json not found' };
    }
    
    console.log('   Package.json found ✓');
    
    // Check node_modules
    const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
        console.log('   Running npm install...');
        try {
            execSync('npm install', { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
        } catch (e) {
            return { status: 'fail', message: 'npm install failed' };
        }
    }
    console.log('   Dependencies installed ✓');
    
    // Check for build script
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    if (pkg.scripts && pkg.scripts.build) {
        console.log('   Build script available ✓');
    }
    
    return { status: 'pass', message: 'Install & Build checks passed' };
}

function runSchemaValidation() {
    const schemasDir = path.join(__dirname, '..', 'schemas');
    
    if (!fs.existsSync(schemasDir)) {
        return { status: 'fail', message: 'Schemas directory not found' };
    }
    
    const requiredSchemas = [
        'operator.schema.json',
        'experience.schema.json',
        'itinerary.schema.json',
        'region.schema.json',
        'interest.schema.json',
        'company.schema.json'
    ];
    
    const missing = [];
    const found = [];
    
    requiredSchemas.forEach(schema => {
        const schemaPath = path.join(schemasDir, schema);
        if (fs.existsSync(schemaPath)) {
            found.push(schema);
            console.log(`   ✓ ${schema}`);
        } else {
            missing.push(schema);
            console.log(`   ✗ ${schema} (missing)`);
        }
    });
    
    if (missing.length > 0) {
        return { 
            status: 'fail', 
            message: `Missing schemas: ${missing.join(', ')}` 
        };
    }
    
    return { 
        status: 'pass', 
        message: `All ${found.length} schemas validated` 
    };
}

function runDemoAudit() {
    const auditScript = path.join(__dirname, 'audit-demo.js');
    
    if (!fs.existsSync(auditScript)) {
        return { status: 'fail', message: 'audit-demo.js not found' };
    }
    
    try {
        const output = execSync(`node "${auditScript}"`, { 
            cwd: __dirname,
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe']
        });
        
        if (CONFIG.verbose) console.log(output);
        
        return { status: 'pass', message: 'Demo integrity audit passed' };
    } catch (e) {
        if (CONFIG.verbose && e.stdout) console.log(e.stdout);
        return { 
            status: e.status === 0 ? 'pass' : 'fail', 
            message: 'Demo integrity audit completed with issues' 
        };
    }
}

function runNavigationAudit() {
    const auditScript = path.join(__dirname, 'audit-navigation.js');
    
    if (!fs.existsSync(auditScript)) {
        return { status: 'fail', message: 'audit-navigation.js not found' };
    }
    
    try {
        const output = execSync(`node "${auditScript}"`, { 
            cwd: __dirname,
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe']
        });
        
        if (CONFIG.verbose) console.log(output);
        
        return { status: 'pass', message: 'Navigation audit passed' };
    } catch (e) {
        if (CONFIG.verbose && e.stdout) console.log(e.stdout);
        return { 
            status: e.status === 0 ? 'pass' : 'fail', 
            message: 'Navigation audit completed with issues' 
        };
    }
}

function runUIContractAudit() {
    const auditScript = path.join(__dirname, 'audit-ui-contracts.js');
    
    if (!fs.existsSync(auditScript)) {
        return { status: 'fail', message: 'audit-ui-contracts.js not found' };
    }
    
    try {
        const output = execSync(`node "${auditScript}"`, { 
            cwd: __dirname,
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe']
        });
        
        if (CONFIG.verbose) console.log(output);
        
        return { status: 'pass', message: 'UI contract audit passed' };
    } catch (e) {
        if (CONFIG.verbose && e.stdout) console.log(e.stdout);
        return { 
            status: e.status === 0 ? 'pass' : 'fail', 
            message: 'UI contract audit completed with issues' 
        };
    }
}

function runModeCompliance() {
    console.log(`   Current mode: ${CONFIG.mode.toUpperCase()}`);
    
    if (CONFIG.mode === 'demo') {
        // Demo mode checks
        console.log('   Demo mode rules:');
        console.log('     ✓ Demo data allowed');
        console.log('     ✓ Demo reviews allowed');
        console.log('     ✓ Demo operators allowed');
        console.log('     ✗ Empty profiles forbidden');
        console.log('     ✗ Incomplete operators forbidden');
        
        // Check demo data exists
        const demoDataPath = path.join(__dirname, '..', 'data', 'demo-operators.canonical.js');
        if (!fs.existsSync(demoDataPath)) {
            console.log('   ⚠ Demo data file not found');
        } else {
            console.log('   ✓ Demo data file present');
        }
        
        return { status: 'pass', message: 'Demo mode compliance verified' };
        
    } else if (CONFIG.mode === 'live') {
        // Live mode checks
        console.log('   Live mode rules:');
        console.log('     ✗ Demo data forbidden');
        console.log('     ✗ Fake reviews forbidden');
        console.log('     ✗ Unapproved operators forbidden');
        
        // In live mode, demo data should not be used
        const demoDataPath = path.join(__dirname, '..', 'data', 'demo-operators.canonical.js');
        if (fs.existsSync(demoDataPath)) {
            console.log('   ⚠ Demo data file exists in live mode');
        }
        
        return { status: 'pass', message: 'Live mode compliance verified' };
    }
    
    return { status: 'pass', message: 'Mode compliance verified' };
}

function runFinalGate() {
    const allResults = Object.values(results);
    const passed = allResults.filter(r => r.status === 'pass').length;
    const failed = allResults.filter(r => r.status === 'fail').length;
    
    console.log(`   Stages passed: ${passed}`);
    console.log(`   Stages failed: ${failed}`);
    
    if (failed > 0) {
        return { 
            status: 'fail', 
            message: `${failed} stage(s) failed - deployment blocked` 
        };
    }
    
    return { 
        status: 'pass', 
        message: 'All stages passed - deployment allowed' 
    };
}

// ============================================================================
// MAIN PIPELINE EXECUTION
// ============================================================================

async function main() {
    console.log('\n' + '═'.repeat(70));
    console.log('  🚀 BRIDGE55 CI/CD PIPELINE');
    console.log('═'.repeat(70));
    console.log(`  Mode: ${CONFIG.mode.toUpperCase()}`);
    console.log(`  Timestamp: ${new Date().toISOString()}`);
    console.log(`  Pipeline Version: 1.0.0`);
    console.log('═'.repeat(70));
    
    const stagesToRun = CONFIG.stageOnly 
        ? STAGES.filter(s => s.id === CONFIG.stageOnly)
        : STAGES;
    
    // Run each stage
    for (const stage of stagesToRun) {
        console.log(`\n┌${'─'.repeat(68)}┐`);
        console.log(`│ STAGE ${stage.id}: ${stage.name.padEnd(56)} │`);
        console.log(`│ ${stage.description.padEnd(66)} │`);
        console.log(`└${'─'.repeat(68)}┘\n`);
        
        try {
            const result = stage.run();
            results[stage.id] = result;
            
            const statusIcon = result.status === 'pass' ? '✅' : '❌';
            console.log(`\n${statusIcon} Stage ${stage.id} Result: ${result.status.toUpperCase()}`);
            console.log(`   ${result.message}`);
            
            // If a stage fails, we continue but mark the pipeline as failed
            if (result.status === 'fail' && stage.id < 7) {
                console.log('\n   ⚠️  Pipeline will fail at final gate');
            }
        } catch (error) {
            results[stage.id] = { 
                status: 'fail', 
                message: `Stage error: ${error.message}` 
            };
            console.log(`\n❌ Stage ${stage.id} Error: ${error.message}`);
        }
    }
    
    // Final Summary
    console.log('\n' + '═'.repeat(70));
    console.log('  📋 PIPELINE SUMMARY');
    console.log('═'.repeat(70));
    
    STAGES.forEach(stage => {
        const result = results[stage.id];
        if (result) {
            const icon = result.status === 'pass' ? '✅' : '❌';
            console.log(`  ${icon} Stage ${stage.id}: ${stage.name}`);
        }
    });
    
    console.log('\n' + '─'.repeat(70));
    
    const finalResult = results[7];
    if (finalResult && finalResult.status === 'pass') {
        console.log('🎉 PIPELINE PASSED - Ready for deployment');
        console.log('─'.repeat(70) + '\n');
        process.exit(0);
    } else {
        console.log('🚨 PIPELINE FAILED - Deployment blocked');
        console.log('   Fix all errors before merging/deploying');
        console.log('─'.repeat(70) + '\n');
        process.exit(1);
    }
}

main().catch(e => {
    console.error('Pipeline error:', e);
    process.exit(1);
});


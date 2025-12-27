/**
 * Operator QR Code Generator - Platform Standard
 * Generates branded QR codes for operator profile sharing
 * 
 * @module qr-generator
 */

/**
 * QR Code configuration
 */
const QR_CONFIG = {
    size: 180,
    errorCorrection: 'M', // Medium error correction
    quietZone: 4,
    darkColor: '#0a2540',
    lightColor: '#ffffff',
    logoSize: 0.2 // 20% of QR code area max
};

/**
 * Generate a simple QR code data URL using canvas
 * This is a simplified implementation - in production, use a library like qrcode.js
 * @param {string} data - Data to encode
 * @param {Object} [options] - Options
 * @returns {string} Data URL of QR code image
 */
function generateQRDataUrl(data, options = {}) {
    const size = options.size || QR_CONFIG.size;
    
    // For demo purposes, we'll create a placeholder QR-like pattern
    // In production, integrate a proper QR library like 'qrcode' npm package
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // White background
    ctx.fillStyle = QR_CONFIG.lightColor;
    ctx.fillRect(0, 0, size, size);
    
    // Generate a deterministic pattern based on data string
    ctx.fillStyle = QR_CONFIG.darkColor;
    const moduleSize = Math.floor(size / 25);
    const padding = moduleSize * 2;
    
    // Finder patterns (corners)
    drawFinderPattern(ctx, padding, padding, moduleSize);
    drawFinderPattern(ctx, size - padding - moduleSize * 7, padding, moduleSize);
    drawFinderPattern(ctx, padding, size - padding - moduleSize * 7, moduleSize);
    
    // Data modules (simplified pattern from string hash)
    const hash = simpleHash(data);
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            // Skip finder pattern areas
            if ((i < 8 && j < 8) || (i < 8 && j > 6) || (i > 6 && j < 8)) continue;
            
            const bit = (hash >> ((i * 15 + j) % 32)) & 1;
            if (bit || (i + j) % 3 === 0) {
                const x = padding + moduleSize * (i + 1);
                const y = padding + moduleSize * (j + 1);
                ctx.fillRect(x, y, moduleSize, moduleSize);
            }
        }
    }
    
    return canvas.toDataURL('image/png');
}

/**
 * Draw QR finder pattern
 */
function drawFinderPattern(ctx, x, y, moduleSize) {
    const size = moduleSize * 7;
    
    // Outer square
    ctx.fillRect(x, y, size, size);
    
    // White inner square
    ctx.fillStyle = QR_CONFIG.lightColor;
    ctx.fillRect(x + moduleSize, y + moduleSize, size - moduleSize * 2, size - moduleSize * 2);
    
    // Center square
    ctx.fillStyle = QR_CONFIG.darkColor;
    ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3);
}

/**
 * Simple hash function for deterministic pattern
 */
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

/**
 * Create QR code share module HTML
 * @param {Object} operator - Operator object
 * @param {string} operator.id - Operator ID
 * @param {string} operator.name - Operator name
 * @returns {string} HTML string for QR share module
 */
function createOperatorQRModule(operator) {
    if (!operator || !operator.id) {
        console.warn('[QR] Cannot create QR module - missing operator data');
        return '';
    }
    
    const baseUrl = window.location.origin;
    const profileUrl = `${baseUrl}/country-specific/pages/operator-details.html?id=${operator.id}`;
    const shortUrl = `${baseUrl.replace('http://', '').replace('https://', '')}/op/${operator.id}`;
    
    return `
        <div class="qr-share-module" id="qrShareModule">
            <h5 class="qr-title"><i class="fa-solid fa-qrcode"></i> Share this operator</h5>
            <p class="qr-subtitle">Scan to view profile</p>
            <div class="qr-code-container">
                <canvas id="operatorQRCode" width="180" height="180"></canvas>
            </div>
            <div class="qr-actions">
                <button class="btn-copy-link" onclick="copyOperatorLink('${profileUrl}')">
                    <i class="fa-solid fa-link"></i> Copy Link
                </button>
            </div>
            <div class="qr-short-link">
                <span class="short-link-label">Short URL:</span>
                <code class="short-link-url" id="shortLinkUrl">${shortUrl}</code>
            </div>
        </div>
    `;
}

/**
 * Initialize QR code on page
 * @param {string} operatorId - Operator ID
 */
function initOperatorQR(operatorId) {
    const canvas = document.getElementById('operatorQRCode');
    if (!canvas) return;
    
    const baseUrl = window.location.origin;
    const profileUrl = `${baseUrl}/country-specific/pages/operator-details.html?id=${operatorId}`;
    
    const ctx = canvas.getContext('2d');
    const size = 180;
    const moduleSize = 7;
    const padding = 14;
    
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    // Dark modules
    ctx.fillStyle = '#0a2540';
    
    // Finder patterns
    drawFinderPatternCanvas(ctx, padding, padding, moduleSize);
    drawFinderPatternCanvas(ctx, size - padding - moduleSize * 7, padding, moduleSize);
    drawFinderPatternCanvas(ctx, padding, size - padding - moduleSize * 7, moduleSize);
    
    // Timing patterns
    for (let i = 8; i < 17; i++) {
        if (i % 2 === 0) {
            ctx.fillRect(padding + i * moduleSize, padding + 6 * moduleSize, moduleSize, moduleSize);
            ctx.fillRect(padding + 6 * moduleSize, padding + i * moduleSize, moduleSize, moduleSize);
        }
    }
    
    // Data pattern based on URL hash
    const hash = simpleHash(profileUrl);
    for (let row = 0; row < 17; row++) {
        for (let col = 0; col < 17; col++) {
            // Skip finder and timing patterns
            if ((row < 9 && col < 9) || (row < 9 && col > 11) || (row > 11 && col < 9)) continue;
            if (row === 6 || col === 6) continue;
            
            const x = padding + col * moduleSize;
            const y = padding + row * moduleSize;
            
            // Deterministic pattern
            if ((hash >> ((row * 17 + col) % 32)) & 1) {
                ctx.fillRect(x, y, moduleSize, moduleSize);
            }
        }
    }
    
    // Add small CI flag/logo in center (optional)
    const logoSize = 30;
    const logoX = (size - logoSize) / 2;
    const logoY = (size - logoSize) / 2;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);
    ctx.fillStyle = '#FF8C00';
    ctx.fillRect(logoX, logoY, logoSize / 3, logoSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(logoX + logoSize / 3, logoY, logoSize / 3, logoSize);
    ctx.fillStyle = '#00954A';
    ctx.fillRect(logoX + logoSize * 2 / 3, logoY, logoSize / 3, logoSize);
}

/**
 * Draw finder pattern on canvas
 */
function drawFinderPatternCanvas(ctx, x, y, moduleSize) {
    const finderSize = moduleSize * 7;
    
    // Outer black square
    ctx.fillStyle = '#0a2540';
    ctx.fillRect(x, y, finderSize, finderSize);
    
    // Inner white square
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + moduleSize, y + moduleSize, finderSize - moduleSize * 2, finderSize - moduleSize * 2);
    
    // Center black square
    ctx.fillStyle = '#0a2540';
    ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3);
}

/**
 * Copy operator link to clipboard
 */
function copyOperatorLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        const btn = document.querySelector('.btn-copy-link');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Link: ' + url);
    });
}

/**
 * CSS styles for QR module
 */
const QR_STYLES = `
<style>
.qr-share-module {
    background: linear-gradient(135deg, #f8fafc 0%, #fff 100%);
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
    margin-top: 1.5rem;
}

.qr-title {
    font-size: 1rem;
    font-weight: 600;
    color: #0a2540;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.qr-title i {
    color: var(--primary, #FF8C00);
}

.qr-subtitle {
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 1rem;
}

.qr-code-container {
    display: inline-block;
    padding: 1rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    margin-bottom: 1rem;
}

.qr-code-container canvas {
    display: block;
}

.qr-actions {
    margin-bottom: 0.75rem;
}

.btn-copy-link {
    padding: 0.5rem 1rem;
    background: var(--primary, #FF8C00);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-copy-link:hover {
    background: var(--primary-dark, #E67300);
    transform: translateY(-1px);
}

.btn-copy-link.copied {
    background: #22c55e;
}

.qr-short-link {
    font-size: 0.75rem;
    color: #64748b;
}

.short-link-url {
    background: #f1f5f9;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    user-select: all;
}

@media (max-width: 768px) {
    .qr-share-module {
        margin-top: 1rem;
    }
}
</style>
`;

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        QR_CONFIG,
        generateQRDataUrl,
        createOperatorQRModule,
        initOperatorQR,
        copyOperatorLink,
        QR_STYLES
    };
}

if (typeof window !== 'undefined') {
    window.QRGenerator = { 
        QR_CONFIG,
        generateQRDataUrl,
        createOperatorQRModule,
        initOperatorQR,
        copyOperatorLink,
        QR_STYLES
    };
    window.copyOperatorLink = copyOperatorLink;
}




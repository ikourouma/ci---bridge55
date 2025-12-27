/**
 * Verified Review System - Platform Standard
 * Reviews displayed publicly must be verified and approved by Super Admin
 * 
 * @module reviews
 */

/**
 * Country flag emoji mapping
 */
const COUNTRY_FLAGS = {
    'CI': '🇨🇮', 'US': '🇺🇸', 'GB': '🇬🇧', 'FR': '🇫🇷', 'DE': '🇩🇪',
    'IT': '🇮🇹', 'ES': '🇪🇸', 'PT': '🇵🇹', 'NL': '🇳🇱', 'BE': '🇧🇪',
    'CH': '🇨🇭', 'AT': '🇦🇹', 'CA': '🇨🇦', 'AU': '🇦🇺', 'NZ': '🇳🇿',
    'JP': '🇯🇵', 'CN': '🇨🇳', 'KR': '🇰🇷', 'IN': '🇮🇳', 'BR': '🇧🇷',
    'MX': '🇲🇽', 'ZA': '🇿🇦', 'NG': '🇳🇬', 'GH': '🇬🇭', 'KE': '🇰🇪',
    'SN': '🇸🇳', 'ML': '🇲🇱', 'BF': '🇧🇫', 'TG': '🇹🇬', 'BJ': '🇧🇯',
    'NE': '🇳🇪', 'CM': '🇨🇲', 'GA': '🇬🇦', 'CG': '🇨🇬', 'CD': '🇨🇩',
    'AE': '🇦🇪', 'SA': '🇸🇦', 'EG': '🇪🇬', 'MA': '🇲🇦', 'TN': '🇹🇳',
    'RU': '🇷🇺', 'PL': '🇵🇱', 'SE': '🇸🇪', 'NO': '🇳🇴', 'DK': '🇩🇰',
    'FI': '🇫🇮', 'IE': '🇮🇪', 'GR': '🇬🇷', 'TR': '🇹🇷', 'IL': '🇮🇱',
    'SG': '🇸🇬', 'MY': '🇲🇾', 'TH': '🇹🇭', 'ID': '🇮🇩', 'PH': '🇵🇭',
    'VN': '🇻🇳', 'AR': '🇦🇷', 'CL': '🇨🇱', 'CO': '🇨🇴', 'PE': '🇵🇪'
};

/**
 * Country name mapping
 */
const COUNTRY_NAMES = {
    'CI': 'Côte d\'Ivoire', 'US': 'United States', 'GB': 'United Kingdom',
    'FR': 'France', 'DE': 'Germany', 'IT': 'Italy', 'ES': 'Spain',
    'PT': 'Portugal', 'NL': 'Netherlands', 'BE': 'Belgium', 'CH': 'Switzerland',
    'AT': 'Austria', 'CA': 'Canada', 'AU': 'Australia', 'NZ': 'New Zealand',
    'JP': 'Japan', 'CN': 'China', 'KR': 'South Korea', 'IN': 'India',
    'BR': 'Brazil', 'MX': 'Mexico', 'ZA': 'South Africa', 'NG': 'Nigeria',
    'GH': 'Ghana', 'KE': 'Kenya', 'SN': 'Senegal', 'ML': 'Mali',
    'AE': 'UAE', 'SA': 'Saudi Arabia', 'EG': 'Egypt', 'MA': 'Morocco'
};

/**
 * Review status types
 */
const REVIEW_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
};

/**
 * Filter reviews for public display
 * Only returns approved and verified reviews
 * @param {Array} reviews - Array of review objects
 * @returns {Array} Filtered reviews
 */
function filterPublicReviews(reviews) {
    if (!Array.isArray(reviews)) return [];
    return reviews.filter(r => r.status === REVIEW_STATUS.APPROVED && r.verified === true);
}

/**
 * Get country flag emoji
 * @param {string} countryCode - ISO country code
 * @returns {string} Flag emoji or default globe
 */
function getCountryFlag(countryCode) {
    return COUNTRY_FLAGS[countryCode?.toUpperCase()] || '🌍';
}

/**
 * Get country name
 * @param {string} countryCode - ISO country code
 * @returns {string} Country name
 */
function getCountryName(countryCode) {
    return COUNTRY_NAMES[countryCode?.toUpperCase()] || countryCode || 'Unknown';
}

/**
 * Generate star rating HTML
 * @param {number} rating - Rating value (0-5)
 * @returns {string} HTML string with stars
 */
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (halfStar ? '½' : '') + 
           '☆'.repeat(emptyStars);
}

/**
 * Render a single review card
 * @param {Object} review - Review object
 * @returns {string} HTML string for review card
 */
function renderReviewCard(review) {
    if (!review) return '';
    
    const flag = getCountryFlag(review.countryCode);
    const countryName = getCountryName(review.countryCode);
    const stars = generateStarRating(review.rating || 5);
    const avatar = review.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name || 'Guest')}&background=random`;
    
    return `
        <div class="review-card">
            <div class="review-header">
                <img src="${avatar}" alt="${review.name}" class="review-avatar" 
                     onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(review.name || 'G')}&background=random'">
                <div class="review-meta">
                    <div class="review-name">${review.name || 'Guest'}</div>
                    <div class="review-date">${review.date || 'Recent'}</div>
                </div>
                <div class="review-country">
                    <span class="country-flag">${flag}</span>
                    <span class="country-name">${countryName}</span>
                </div>
            </div>
            <div class="review-rating">
                <span class="review-stars">${stars}</span>
                ${review.verified ? '<span class="verified-badge"><i class="fa-solid fa-check-circle"></i> Verified</span>' : ''}
            </div>
            <p class="review-text">${review.text || ''}</p>
        </div>
    `;
}

/**
 * Render reviews section
 * @param {Array} reviews - Array of review objects
 * @param {Object} [options] - Options
 * @param {number} [options.limit] - Max reviews to show
 * @param {boolean} [options.showEmpty] - Show message when no reviews
 * @returns {string} HTML string for reviews section
 */
function renderReviewsSection(reviews, options = {}) {
    const { limit = 10, showEmpty = true } = options;
    const publicReviews = filterPublicReviews(reviews);
    
    if (publicReviews.length === 0) {
        return showEmpty ? `
            <div class="reviews-empty">
                <i class="fa-solid fa-star"></i>
                <p>No reviews yet. Be the first to review!</p>
            </div>
        ` : '';
    }
    
    const displayReviews = publicReviews.slice(0, limit);
    const avgRating = (publicReviews.reduce((sum, r) => sum + (r.rating || 5), 0) / publicReviews.length).toFixed(1);
    
    return `
        <div class="reviews-summary">
            <div class="avg-rating">
                <span class="rating-value">${avgRating}</span>
                <span class="rating-stars">${generateStarRating(parseFloat(avgRating))}</span>
                <span class="rating-count">(${publicReviews.length} verified reviews)</span>
            </div>
        </div>
        <div class="reviews-list">
            ${displayReviews.map(r => renderReviewCard(r)).join('')}
        </div>
        ${publicReviews.length > limit ? `
            <button class="btn btn-secondary btn-sm show-more-reviews" onclick="showMoreReviews()">
                Show all ${publicReviews.length} reviews
            </button>
        ` : ''}
    `;
}

/**
 * CSS styles for reviews
 */
const REVIEW_STYLES = `
<style>
.review-card {
    background: #fff;
    border-radius: 12px;
    padding: 1.25rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    border: 1px solid #eee;
}

.review-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
}

.review-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}

.review-meta {
    flex: 1;
}

.review-name {
    font-weight: 600;
    color: #1a1a2e;
}

.review-date {
    font-size: 0.85rem;
    color: #666;
}

.review-country {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    background: #f8f9fa;
    border-radius: 20px;
    font-size: 0.85rem;
}

.country-flag {
    font-size: 1.25rem;
}

.country-name {
    color: #666;
}

.review-rating {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
}

.review-stars {
    color: #FFB800;
    font-size: 1.1rem;
    letter-spacing: 2px;
}

.verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.2rem 0.6rem;
    background: #e8f5e9;
    color: #2e7d32;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
}

.verified-badge i {
    font-size: 0.7rem;
}

.review-text {
    color: #444;
    line-height: 1.6;
    margin: 0;
}

.reviews-summary {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: linear-gradient(135deg, #fff9e6 0%, #fff 100%);
    border-radius: 12px;
    border: 1px solid #ffe082;
}

.avg-rating {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.rating-value {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a2e;
}

.rating-stars {
    color: #FFB800;
    font-size: 1.25rem;
}

.rating-count {
    color: #666;
    font-size: 0.9rem;
}

.reviews-empty {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.reviews-empty i {
    font-size: 2rem;
    color: #ddd;
    margin-bottom: 0.5rem;
}

.show-more-reviews {
    width: 100%;
    margin-top: 1rem;
}
</style>
`;

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        COUNTRY_FLAGS,
        COUNTRY_NAMES,
        REVIEW_STATUS,
        filterPublicReviews,
        getCountryFlag,
        getCountryName,
        generateStarRating,
        renderReviewCard,
        renderReviewsSection,
        REVIEW_STYLES
    };
}

if (typeof window !== 'undefined') {
    window.ReviewHelpers = { 
        COUNTRY_FLAGS,
        COUNTRY_NAMES,
        REVIEW_STATUS,
        filterPublicReviews,
        getCountryFlag,
        getCountryName,
        generateStarRating,
        renderReviewCard,
        renderReviewsSection,
        REVIEW_STYLES
    };
}




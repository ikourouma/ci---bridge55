/**
 * Search Filters - Platform Standard
 * Smart, context-aware filtering system for all search result pages
 * 
 * @module search-filters
 */

/**
 * Filter types
 */
const FILTER_TYPES = {
    RANGE: 'range',
    CHECKBOX: 'checkbox',
    SELECT: 'select',
    DATE_RANGE: 'date_range',
    RATING: 'rating',
    TOGGLE: 'toggle'
};

/**
 * Service-specific filter schemas
 */
const FILTER_SCHEMAS = {
    experiences: {
        category: { type: FILTER_TYPES.CHECKBOX, label: 'Category', options: ['Beach', 'Culture', 'Adventure', 'Food', 'Nature', 'Nightlife', 'Wellness'] },
        priceRange: { type: FILTER_TYPES.RANGE, label: 'Price Range', min: 0, max: 500, unit: '$' },
        rating: { type: FILTER_TYPES.RATING, label: 'Rating', min: 3 },
        duration: { type: FILTER_TYPES.SELECT, label: 'Duration', options: ['Half Day', 'Full Day', '2-3 Days', '4+ Days'] },
        verified: { type: FILTER_TYPES.TOGGLE, label: 'Verified Operators Only' },
        freeCancel: { type: FILTER_TYPES.TOGGLE, label: 'Free Cancellation' },
        instantConfirm: { type: FILTER_TYPES.TOGGLE, label: 'Instant Confirmation' }
    },
    stays: {
        type: { type: FILTER_TYPES.CHECKBOX, label: 'Property Type', options: ['Hotel', 'Resort', 'Villa', 'Guesthouse', 'Lodge', 'Boutique'] },
        priceRange: { type: FILTER_TYPES.RANGE, label: 'Price per Night', min: 0, max: 1000, unit: '$' },
        rating: { type: FILTER_TYPES.RATING, label: 'Rating', min: 3 },
        amenities: { type: FILTER_TYPES.CHECKBOX, label: 'Amenities', options: ['Pool', 'WiFi', 'Spa', 'Restaurant', 'Gym', 'Beach Access', 'Parking'] },
        verified: { type: FILTER_TYPES.TOGGLE, label: 'Verified Properties Only' },
        freeCancel: { type: FILTER_TYPES.TOGGLE, label: 'Free Cancellation' }
    },
    itineraries: {
        type: { type: FILTER_TYPES.CHECKBOX, label: 'Type', options: ['Beach & Heritage', 'Culture & History', 'Adventure', 'Wildlife', 'Multi-City'] },
        duration: { type: FILTER_TYPES.SELECT, label: 'Duration', options: ['2-3 Days', '4-5 Days', '6-7 Days', '8+ Days'] },
        priceRange: { type: FILTER_TYPES.RANGE, label: 'Price Range', min: 0, max: 2000, unit: '$' },
        rating: { type: FILTER_TYPES.RATING, label: 'Rating', min: 4 },
        diaPick: { type: FILTER_TYPES.TOGGLE, label: "Dia's Picks Only" },
        verified: { type: FILTER_TYPES.TOGGLE, label: 'Verified Operators' }
    },
    regions: {
        area: { type: FILTER_TYPES.CHECKBOX, label: 'Area', options: ['Coastal', 'Eastern', 'Central', 'Western', 'Northern'] },
        experiences: { type: FILTER_TYPES.SELECT, label: 'Experience Count', options: ['1-5', '6-10', '11-20', '20+'] }
    },
    operators: {
        services: { type: FILTER_TYPES.CHECKBOX, label: 'Services', options: ['Tours', 'Transfers', 'Packages', 'Accommodations'] },
        rating: { type: FILTER_TYPES.RATING, label: 'Rating', min: 4 },
        verified: { type: FILTER_TYPES.TOGGLE, label: 'Verified Only' },
        topRated: { type: FILTER_TYPES.TOGGLE, label: 'Top Rated' }
    }
};

/**
 * Get filter schema for a service type
 * @param {string} serviceType - Type of service
 * @returns {Object} Filter schema
 */
function getFilterSchema(serviceType) {
    return FILTER_SCHEMAS[serviceType] || FILTER_SCHEMAS.experiences;
}

/**
 * Parse filters from URL query parameters
 * @param {string} [queryString] - URL query string
 * @returns {Object} Parsed filter values
 */
function parseFiltersFromUrl(queryString = window.location.search) {
    const params = new URLSearchParams(queryString);
    const filters = {};
    
    params.forEach((value, key) => {
        if (filters[key]) {
            if (Array.isArray(filters[key])) {
                filters[key].push(value);
            } else {
                filters[key] = [filters[key], value];
            }
        } else {
            filters[key] = value;
        }
    });
    
    return filters;
}

/**
 * Build URL query string from filter values
 * @param {Object} filters - Filter values
 * @returns {string} Query string (without leading ?)
 */
function buildFilterQueryString(filters) {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') return;
        if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
        } else {
            params.set(key, value);
        }
    });
    
    return params.toString();
}

/**
 * Update URL with current filters
 * @param {Object} filters - Filter values
 */
function updateUrlWithFilters(filters) {
    const queryString = buildFilterQueryString(filters);
    const newUrl = `${window.location.pathname}${queryString ? '?' + queryString : ''}`;
    window.history.pushState({ filters }, '', newUrl);
}

/**
 * Apply filters to a data array
 * @param {Array} data - Data to filter
 * @param {Object} filters - Filter values
 * @param {Object} schema - Filter schema
 * @returns {Array} Filtered data
 */
function applyFilters(data, filters, schema) {
    if (!Array.isArray(data)) return [];
    
    return data.filter(item => {
        for (const [key, config] of Object.entries(schema)) {
            const filterValue = filters[key];
            if (filterValue === undefined || filterValue === null || filterValue === '') continue;
            
            switch (config.type) {
                case FILTER_TYPES.RANGE:
                    const [min, max] = Array.isArray(filterValue) ? filterValue : filterValue.split('-').map(Number);
                    const itemPrice = item.price || 0;
                    if (min !== undefined && itemPrice < min) return false;
                    if (max !== undefined && itemPrice > max) return false;
                    break;
                    
                case FILTER_TYPES.CHECKBOX:
                    const selectedOptions = Array.isArray(filterValue) ? filterValue : [filterValue];
                    const itemValue = item[key] || item.category || item.type;
                    if (selectedOptions.length > 0 && !selectedOptions.some(opt => 
                        itemValue?.toLowerCase().includes(opt.toLowerCase())
                    )) return false;
                    break;
                    
                case FILTER_TYPES.SELECT:
                    if (filterValue && item[key] !== filterValue) return false;
                    break;
                    
                case FILTER_TYPES.RATING:
                    const minRating = parseFloat(filterValue);
                    if (!isNaN(minRating) && (item.rating || 0) < minRating) return false;
                    break;
                    
                case FILTER_TYPES.TOGGLE:
                    if (filterValue === 'true' || filterValue === true) {
                        if (!item[key]) return false;
                    }
                    break;
            }
        }
        return true;
    });
}

/**
 * Render filter sidebar HTML
 * @param {Object} schema - Filter schema
 * @param {Object} [currentFilters] - Current filter values
 * @returns {string} HTML string for filter sidebar
 */
function renderFilterSidebar(schema, currentFilters = {}) {
    let html = '<div class="filter-sidebar">';
    html += '<h3 class="filter-title"><i class="fa-solid fa-sliders"></i> Filters</h3>';
    
    for (const [key, config] of Object.entries(schema)) {
        html += `<div class="filter-group" data-filter="${key}">`;
        html += `<h4 class="filter-label">${config.label}</h4>`;
        
        switch (config.type) {
            case FILTER_TYPES.RANGE:
                const currentMin = currentFilters[`${key}Min`] || config.min;
                const currentMax = currentFilters[`${key}Max`] || config.max;
                html += `
                    <div class="filter-range">
                        <input type="range" class="range-slider" id="${key}Range" 
                               min="${config.min}" max="${config.max}" 
                               value="${currentMax}" 
                               oninput="SearchFilters.handleRangeChange('${key}', this.value)">
                        <div class="range-values">
                            <span>${config.unit}${config.min}</span>
                            <span>${config.unit}<span id="${key}Value">${currentMax}</span></span>
                        </div>
                    </div>
                `;
                break;
                
            case FILTER_TYPES.CHECKBOX:
                html += '<div class="filter-options">';
                config.options.forEach(option => {
                    const checked = currentFilters[key]?.includes(option) ? 'checked' : '';
                    html += `
                        <label class="filter-checkbox">
                            <input type="checkbox" name="${key}" value="${option}" ${checked}
                                   onchange="SearchFilters.handleCheckboxChange('${key}')">
                            <span>${option}</span>
                        </label>
                    `;
                });
                html += '</div>';
                break;
                
            case FILTER_TYPES.SELECT:
                html += `
                    <select class="filter-select" id="${key}Select" onchange="SearchFilters.handleSelectChange('${key}', this.value)">
                        <option value="">All</option>
                        ${config.options.map(opt => `<option value="${opt}" ${currentFilters[key] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                    </select>
                `;
                break;
                
            case FILTER_TYPES.RATING:
                html += `
                    <div class="filter-rating">
                        ${[5, 4, 3].map(r => `
                            <label class="rating-option">
                                <input type="radio" name="${key}" value="${r}" ${currentFilters[key] == r ? 'checked' : ''}
                                       onchange="SearchFilters.handleRatingChange('${key}', ${r})">
                                <span class="rating-stars">${'★'.repeat(r)}${'☆'.repeat(5-r)}</span>
                                <span>& up</span>
                            </label>
                        `).join('')}
                    </div>
                `;
                break;
                
            case FILTER_TYPES.TOGGLE:
                const isChecked = currentFilters[key] === 'true' || currentFilters[key] === true;
                html += `
                    <label class="filter-toggle">
                        <input type="checkbox" id="${key}Toggle" ${isChecked ? 'checked' : ''}
                               onchange="SearchFilters.handleToggleChange('${key}', this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                `;
                break;
        }
        
        html += '</div>';
    }
    
    html += `
        <div class="filter-actions">
            <button class="btn btn-primary btn-sm" onclick="SearchFilters.applyAllFilters()">
                <i class="fa-solid fa-check"></i> Apply Filters
            </button>
            <button class="btn btn-secondary btn-sm" onclick="SearchFilters.clearAllFilters()">
                <i class="fa-solid fa-times"></i> Clear All
            </button>
        </div>
    `;
    html += '</div>';
    
    return html;
}

/**
 * Filter state management
 */
const filterState = {
    currentFilters: {},
    schema: {},
    onFilterChange: null
};

/**
 * Initialize filters
 * @param {Object} schema - Filter schema
 * @param {Function} onFilterChange - Callback when filters change
 */
function initFilters(schema, onFilterChange) {
    filterState.schema = schema;
    filterState.onFilterChange = onFilterChange;
    filterState.currentFilters = parseFiltersFromUrl();
}

/**
 * Handle range slider change
 */
function handleRangeChange(key, value) {
    document.getElementById(`${key}Value`).textContent = value;
    filterState.currentFilters[`${key}Max`] = value;
}

/**
 * Handle checkbox change
 */
function handleCheckboxChange(key) {
    const checked = Array.from(document.querySelectorAll(`input[name="${key}"]:checked`)).map(cb => cb.value);
    filterState.currentFilters[key] = checked;
}

/**
 * Handle select change
 */
function handleSelectChange(key, value) {
    filterState.currentFilters[key] = value;
}

/**
 * Handle rating change
 */
function handleRatingChange(key, value) {
    filterState.currentFilters[key] = value;
}

/**
 * Handle toggle change
 */
function handleToggleChange(key, checked) {
    filterState.currentFilters[key] = checked;
}

/**
 * Apply all filters
 */
function applyAllFilters() {
    updateUrlWithFilters(filterState.currentFilters);
    if (filterState.onFilterChange) {
        filterState.onFilterChange(filterState.currentFilters);
    }
}

/**
 * Clear all filters
 */
function clearAllFilters() {
    filterState.currentFilters = {};
    window.history.pushState({}, '', window.location.pathname);
    if (filterState.onFilterChange) {
        filterState.onFilterChange({});
    }
    // Reset UI
    document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.filter-sidebar input[type="radio"]').forEach(rb => rb.checked = false);
    document.querySelectorAll('.filter-sidebar select').forEach(sel => sel.selectedIndex = 0);
}

/**
 * CSS styles for filters
 */
const FILTER_STYLES = `
<style>
.filter-sidebar {
    background: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.filter-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1a1a2e;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.filter-group {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
}

.filter-group:last-of-type {
    border-bottom: none;
}

.filter-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.75rem;
}

.filter-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.filter-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    color: #444;
}

.filter-checkbox input {
    accent-color: var(--primary, #FF6B00);
}

.filter-select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
}

.filter-range {
    padding: 0.5rem 0;
}

.range-slider {
    width: 100%;
    accent-color: var(--primary, #FF6B00);
}

.range-values {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #666;
    margin-top: 0.5rem;
}

.filter-rating {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.rating-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
}

.rating-option input {
    accent-color: var(--primary, #FF6B00);
}

.rating-stars {
    color: #FFB800;
}

.filter-toggle {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 26px;
}

.filter-toggle input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: #ccc;
    border-radius: 26px;
    transition: 0.3s;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background: white;
    border-radius: 50%;
    transition: 0.3s;
}

.filter-toggle input:checked + .toggle-slider {
    background: var(--primary, #FF6B00);
}

.filter-toggle input:checked + .toggle-slider:before {
    transform: translateX(22px);
}

.filter-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

.filter-actions .btn {
    flex: 1;
}
</style>
`;

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        FILTER_TYPES,
        FILTER_SCHEMAS,
        getFilterSchema,
        parseFiltersFromUrl,
        buildFilterQueryString,
        updateUrlWithFilters,
        applyFilters,
        renderFilterSidebar,
        initFilters,
        handleRangeChange,
        handleCheckboxChange,
        handleSelectChange,
        handleRatingChange,
        handleToggleChange,
        applyAllFilters,
        clearAllFilters,
        FILTER_STYLES
    };
}

if (typeof window !== 'undefined') {
    window.SearchFilters = { 
        FILTER_TYPES,
        FILTER_SCHEMAS,
        getFilterSchema,
        parseFiltersFromUrl,
        buildFilterQueryString,
        updateUrlWithFilters,
        applyFilters,
        renderFilterSidebar,
        initFilters,
        handleRangeChange,
        handleCheckboxChange,
        handleSelectChange,
        handleRatingChange,
        handleToggleChange,
        applyAllFilters,
        clearAllFilters,
        filterState,
        FILTER_STYLES
    };
}




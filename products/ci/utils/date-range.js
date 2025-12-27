/**
 * Date Range Field - Platform Standard
 * Shared date range component with context-aware behavior
 * 
 * @module date-range
 */

/**
 * Date range modes based on service type
 */
const DATE_RANGE_MODES = {
    FULL: 'full',           // Both start and end required
    SINGLE_DAY: 'single',   // End date disabled, auto-set to start
    OPEN_ENDED: 'open'      // Start required, end optional
};

/**
 * Get date range mode based on service type or page context
 * @param {string} serviceType - Type of service
 * @returns {string} Date range mode
 */
function getDateRangeMode(serviceType) {
    const type = (serviceType || '').toLowerCase();
    
    // Single-day activities
    if (type.includes('day-trip') || 
        type.includes('half-day') || 
        type.includes('single-day') ||
        type.includes('walking-tour') ||
        type.includes('food-tour')) {
        return DATE_RANGE_MODES.SINGLE_DAY;
    }
    
    // Full range required
    if (type.includes('stay') || 
        type.includes('hotel') || 
        type.includes('lodge') ||
        type.includes('multi-day') ||
        type.includes('itinerary') ||
        type.includes('package') ||
        type.includes('flight') ||
        type.includes('round-trip') ||
        type.includes('car-rental')) {
        return DATE_RANGE_MODES.FULL;
    }
    
    // Default to full for experiences (can be multi-day)
    return DATE_RANGE_MODES.FULL;
}

/**
 * Create date range field HTML
 * @param {Object} options - Configuration options
 * @param {string} [options.startId] - Start date input ID
 * @param {string} [options.endId] - End date input ID
 * @param {string} [options.startLabel] - Start date label
 * @param {string} [options.endLabel] - End date label
 * @param {string} [options.mode] - Date range mode
 * @param {string} [options.startValue] - Initial start date
 * @param {string} [options.endValue] - Initial end date
 * @param {number} [options.duration] - Duration in days (for auto-calculating end date)
 * @returns {string} HTML string for date range fields
 */
function createDateRangeField(options = {}) {
    const {
        startId = 'startDate',
        endId = 'endDate',
        startLabel = 'Departure Date',
        endLabel = 'End Date',
        mode = DATE_RANGE_MODES.FULL,
        startValue = '',
        endValue = '',
        duration = null
    } = options;
    
    const isSingleDay = mode === DATE_RANGE_MODES.SINGLE_DAY;
    const today = new Date().toISOString().split('T')[0];
    
    return `
        <div class="date-range-field">
            <div class="date-field">
                <label class="form-label" for="${startId}">${startLabel} <span class="required">*</span></label>
                <div class="date-picker-wrapper">
                    <input 
                        type="date" 
                        class="date-picker" 
                        id="${startId}" 
                        name="${startId}"
                        value="${startValue}"
                        min="${today}"
                        required
                        onchange="DateRangeHelpers.handleStartDateChange('${startId}', '${endId}', ${duration || 'null'}, '${mode}')"
                    >
                    <i class="fa-solid fa-calendar date-picker-icon"></i>
                </div>
            </div>
            <div class="date-field ${isSingleDay ? 'disabled' : ''}">
                <label class="form-label" for="${endId}">
                    ${endLabel}
                    ${isSingleDay ? '' : '<span class="required">*</span>'}
                </label>
                <div class="date-picker-wrapper">
                    <input 
                        type="date" 
                        class="date-picker" 
                        id="${endId}" 
                        name="${endId}"
                        value="${endValue}"
                        ${isSingleDay ? 'readonly disabled' : 'required'}
                        ${duration ? `data-duration="${duration}"` : ''}
                    >
                    <i class="fa-solid fa-calendar date-picker-icon"></i>
                </div>
                ${isSingleDay ? '<small class="helper-text">Single-day activity</small>' : ''}
            </div>
        </div>
    `;
}

/**
 * Handle start date change - update end date accordingly
 * @param {string} startId - Start date input ID
 * @param {string} endId - End date input ID
 * @param {number|null} duration - Fixed duration in days
 * @param {string} mode - Date range mode
 */
function handleStartDateChange(startId, endId, duration, mode) {
    const startInput = document.getElementById(startId);
    const endInput = document.getElementById(endId);
    
    if (!startInput || !endInput) return;
    
    const startDate = new Date(startInput.value);
    
    if (!startInput.value || isNaN(startDate.getTime())) {
        endInput.value = '';
        return;
    }
    
    // For single-day activities, set end = start
    if (mode === DATE_RANGE_MODES.SINGLE_DAY) {
        endInput.value = startInput.value;
        return;
    }
    
    // For fixed duration, calculate end date
    if (duration && duration > 0) {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + duration - 1);
        endInput.value = endDate.toISOString().split('T')[0];
        return;
    }
    
    // Set minimum for end date
    endInput.min = startInput.value;
    
    // If end date is before start, reset it
    if (endInput.value && new Date(endInput.value) < startDate) {
        endInput.value = '';
    }
}

/**
 * Validate date range
 * @param {string} startDate - Start date string
 * @param {string} endDate - End date string
 * @param {string} mode - Date range mode
 * @returns {{valid: boolean, error: string|null}}
 */
function validateDateRange(startDate, endDate, mode = DATE_RANGE_MODES.FULL) {
    if (!startDate) {
        return { valid: false, error: 'Please select a departure date' };
    }
    
    const start = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (start < today) {
        return { valid: false, error: 'Departure date cannot be in the past' };
    }
    
    if (mode === DATE_RANGE_MODES.SINGLE_DAY) {
        return { valid: true, error: null };
    }
    
    if (mode === DATE_RANGE_MODES.FULL && !endDate) {
        return { valid: false, error: 'Please select an end date' };
    }
    
    if (endDate) {
        const end = new Date(endDate);
        if (end < start) {
            return { valid: false, error: 'End date cannot be before departure date' };
        }
    }
    
    return { valid: true, error: null };
}

/**
 * CSS styles for date range field
 */
const DATE_RANGE_STYLES = `
<style>
.date-range-field {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.date-field {
    display: flex;
    flex-direction: column;
}

.date-field.disabled {
    opacity: 0.6;
}

.date-field.disabled .date-picker {
    background: #f5f5f5;
    cursor: not-allowed;
}

.date-picker-wrapper {
    position: relative;
}

.date-picker {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.date-picker:focus {
    outline: none;
    border-color: var(--primary, #FF6B00);
    box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
}

.date-picker-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    pointer-events: none;
}

.helper-text {
    font-size: 0.75rem;
    color: #666;
    margin-top: 0.25rem;
}

.required {
    color: #dc3545;
}

@media (max-width: 576px) {
    .date-range-field {
        grid-template-columns: 1fr;
    }
}
</style>
`;

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        DATE_RANGE_MODES,
        getDateRangeMode,
        createDateRangeField,
        handleStartDateChange,
        validateDateRange,
        DATE_RANGE_STYLES
    };
}

if (typeof window !== 'undefined') {
    window.DateRangeHelpers = { 
        DATE_RANGE_MODES,
        getDateRangeMode,
        createDateRangeField,
        handleStartDateChange,
        validateDateRange,
        DATE_RANGE_STYLES
    };
}




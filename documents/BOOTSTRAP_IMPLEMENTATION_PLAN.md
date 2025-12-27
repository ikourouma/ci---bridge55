# Bridge55 Bootstrap Implementation - Strict Plan

## Issue Analysis
The previous Tailwind-based implementation failed because:
1. ❌ Missing Bootstrap dropdown system (data-bs-toggle="dropdown")
2. ❌ No Bootstrap-datetimepicker integration
3. ❌ jQuery event handlers not properly bound
4. ❌ Missing Bootstrap grid for multi-city segments
5. ❌ No Bootstrap modal/dropdown z-index management

## Solution: Complete Bootstrap Migration

### Phase 1: Dependencies (CRITICAL)
```html
<!-- Bootstrap 5.3.2 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css">

<!-- Font Awesome 6.5.1 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<!-- Bootstrap Datetimepicker -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css">

<!-- jQuery 3.7.1 (BEFORE Bootstrap) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

<!-- Bootstrap 5.3.2 JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>

<!-- Moment.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

<!-- Bootstrap Datetimepicker -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>

<!-- Keep Tailwind for layout -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Keep Lucide for navigation -->
<script src="https://unpkg.com/lucide@latest"></script>
```

### Phase 2: CSS Variables (Bridge55 Colors)
```css
:root {
    /* Bootstrap defaults */
    --bs-primary: #FF6B35; /* Bridge55 Primary */
    --bs-secondary: #004E89; /* Bridge55 Secondary */
    --bs-dark: #212529;
    --bs-light: #f8f9fa;
    --bs-white: #fff;
    --color-default: #6c757d;
    
    /* Bridge55 specific */
    --primary: #FF6B35;
    --primary-dark: #E64A19;
    --secondary: #004E89;
    --secondary-dark: #003366;
    --gradient: linear-gradient(135deg, #FF6B35 0%, #004E89 100%);
    
    /* AI Colors */
    --ai-purple: #8A2BE2;
    --ai-pink: #FF69B4;
    --ai-gradient: linear-gradient(45deg, var(--ai-purple), var(--ai-pink));
}
```

### Phase 3: HTML Structure

#### Tab Navigation (Bootstrap)
```html
<div class="card-header">
    <ul class="nav">
        <li class="nav-item">
            <a href="#" class="nav-link active" data-bs-toggle="tab" data-bs-target="#flight">
                <i class="fa-solid fa-plane-up me-2"></i>Flights
            </a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" data-bs-toggle="tab" data-bs-target="#Stays">
                <i class="fa-solid fa-bed me-2"></i>Stays
            </a>
        </li>
        <!-- ... more tabs -->
    </ul>
</div>
```

#### Dropdown System (Bootstrap)
```html
<div class="form-item dropdown">
    <div data-bs-toggle="dropdown" data-bs-auto-close="outside" class="w-100 h-100">
        <label class="form-label">From</label>
        <input type="text" class="form-control location-input" value="New York (JFK)">
        <p class="fs-12 mb-0 text-muted sub-text">John F. Kennedy Airport</p>
    </div>
    <div class="dropdown-menu dropdown-md p-0">
        <div class="input-search p-3 border-bottom">
            <input type="text" class="form-control dropdown-filter-input" placeholder="Search Location">
        </div>
        <ul class="suggestion-list">
            <li><a class="dropdown-item suggestion" data-maintext="New York (JFK)" data-subtext="John F. Kennedy Airport" href="#">New York (JFK)</a></li>
        </ul>
    </div>
</div>
```

#### Guest Counter (Bootstrap + Font Awesome)
```html
<div class="custom-increment">
    <div class="input-group">
        <button type="button" class="quantity-left-minus btn btn-light">
            <span><i class="fa-solid fa-minus"></i></span>
        </button>
        <input type="text" name="adults" class="input-number" value="1">
        <button type="button" class="quantity-right-plus btn btn-light">
            <span><i class="fa-solid fa-plus"></i></span>
        </button>
    </div>
</div>
```

### Phase 4: JavaScript (jQuery-based)

#### Date Picker Initialization
```javascript
function initPickers($context = $('body')) {
    $context.find('.datetimepicker').each(function() {
        if (!$(this).data('DateTimePicker')) {
            $(this).datetimepicker({
                format: 'DD-MM-YYYY',
                defaultDate: moment(),
                icons: {
                    up: "fa-solid fa-chevron-up",
                    down: "fa-solid fa-chevron-down",
                    previous: "fa-solid fa-chevron-left",
                    next: "fa-solid fa-chevron-right"
                }
            });
        }
    });
}
```

#### Guest Counter Logic
```javascript
$('body').on('click', '.quantity-right-plus', function(e) {
    e.stopPropagation();
    var $input = $(this).closest('.input-group').find('.input-number');
    $input.val(parseInt($input.val()) + 1);
    updateSummaryText($(this).closest('.dropdown-menu'));
});

$('body').on('click', '.quantity-left-minus', function(e) {
    e.stopPropagation();
    var $input = $(this).closest('.input-group').find('.input-number');
    var val = parseInt($input.val());
    if (val > 0) { $input.val(val - 1); }
    updateSummaryText($(this).closest('.dropdown-menu'));
});
```

#### Summary Text Update
```javascript
function updateSummaryText($dropdownMenu) {
    if ($dropdownMenu.find('.traveler-summary-input').length) {
        let adults = parseInt($dropdownMenu.find('input[name="adults"]').val()) || 0;
        let children = parseInt($dropdownMenu.find('input[name="children"]').val()) || 0;
        let infants = parseInt($dropdownMenu.find('input[name="infants"]').val()) || 0;
        let totalTravelers = adults + children + infants;
        let cabinClass = $dropdownMenu.find('input[name="cabin-class"]:checked').val();
        
        let summary = `${totalTravelers} Person${totalTravelers !== 1 ? 's' : ''}`;
        if (cabinClass) {
            summary += `, ${cabinClass}`;
        }
        
        $dropdownMenu.closest('.form-item').find('.traveler-summary-input').val(summary);
    }
}
```

### Phase 5: Critical Fixes

#### 1. Z-Index Issue
```css
.dropdown-menu {
    z-index: 1050 !important; /* Bootstrap default */
}

.banner-form {
    z-index: 1;
}
```

#### 2. Multi-City Segments
```javascript
function addFlightSegment() {
    if (segmentCounter >= MAX_SEGMENTS) {
        alert(`Maximum ${MAX_SEGMENTS} flight segments allowed.`);
        return;
    }
    segmentCounter++;
    const $template = $('#flight-segment-template').contents().clone();
    $template.find('.segment-number').text(segmentCounter);
    
    const $segmentsContainer = $('#flight-segments-container');
    $segmentsContainer.append($template);
    initPickers($segmentsContainer.children().last());
    updateRemoveButtons();
}
```

#### 3. Dropdown Filtering
```javascript
$('body').on('keyup', '.form-control.location-input, .dropdown-filter-input', function() {
    const $input = $(this);
    const filter = $input.val().toLowerCase();
    const $dropdownMenu = $input.closest('.dropdown-menu') || $input.closest('.dropdown').find('.dropdown-menu');
    
    $dropdownMenu.find('.suggestion-list li').each(function() {
        const $suggestion = $(this).find('a');
        const mainText = ($suggestion.data('maintext') || '').toLowerCase();
        const subText = ($suggestion.data('subtext') || '').toLowerCase();
        if (mainText.includes(filter) || subText.includes(filter)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});
```

## Testing Checklist

### ✅ Dropdown System
- [ ] Click location field → dropdown opens
- [ ] Type in search → filters suggestions
- [ ] Click suggestion → populates field

### ✅ Guest Counters
- [ ] + button increments value
- [ ] - button decrements value
- [ ] Min value enforced (0 or 1)
- [ ] Summary text updates in real-time

### ✅ Date Pickers
- [ ] Click date field → calendar opens
- [ ] Select date → populates field
- [ ] Icon buttons work

### ✅ Multi-City
- [ ] Select Multi-City → shows segments
- [ ] Add segment → creates new segment with 3 fields
- [ ] Remove segment → deletes segment
- [ ] Segments renumber correctly

### ✅ Tab Switching
- [ ] Click tab → shows corresponding form
- [ ] CTA text updates
- [ ] Previous tab hides

### ✅ Sub-Services
- [ ] Cars: Rental/Taxi/Rideshare toggle
- [ ] Experiences: Things to Do/Tours/Events toggle

## Next Steps

1. ✅ Create complete HTML file with all dependencies
2. ✅ Port ALL CSS from reference file
3. ✅ Port ALL HTML structure
4. ✅ Port ALL JavaScript functions
5. ✅ Test in browser
6. ✅ Fix any Bootstrap/Tailwind conflicts
7. ✅ Verify Bridge55 theming works

## Expected Result

A fully functional search hub that:
- ✅ Uses Bootstrap dropdowns (not custom)
- ✅ Uses Bootstrap-datetimepicker (not Flatpickr)
- ✅ Uses jQuery for all interactions
- ✅ Maintains Bridge55 branding (#FF6B35, #004E89)
- ✅ Works exactly like online_viewer_net(21).html
- ✅ Keeps Bridge55 navigation (Lucide icons, Tailwind layout)


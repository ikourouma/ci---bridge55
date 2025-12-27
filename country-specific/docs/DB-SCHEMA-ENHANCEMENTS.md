# 🗃️ Database Schema Enhancements

## Overview
This document outlines the database schema changes required to support the enhanced platform features.

---

## 1. Operators Table

```sql
CREATE TABLE operators (
    id VARCHAR(50) PRIMARY KEY,           -- e.g., 'op-001'
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(500),
    logo_url TEXT,
    description TEXT,
    
    -- Contact
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    
    -- Registration & Verification
    registration_number VARCHAR(100),     -- e.g., 'MTI-2024-00123'
    tourism_board_id VARCHAR(100),
    verified BOOLEAN DEFAULT FALSE,
    verification_expiry DATE,
    insurance_status VARCHAR(50),
    
    -- Stats
    rating DECIMAL(2,1),
    review_count INT DEFAULT 0,
    founding_year INT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    status ENUM('active', 'pending', 'suspended') DEFAULT 'pending'
);
```

## 2. Operator Services Table

```sql
CREATE TABLE operator_services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operator_id VARCHAR(50) REFERENCES operators(id),
    service_name VARCHAR(255),
    service_category VARCHAR(100)
);
```

## 3. Operator Gallery Table

```sql
CREATE TABLE operator_gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operator_id VARCHAR(50) REFERENCES operators(id),
    image_url TEXT,
    caption VARCHAR(500),
    sort_order INT DEFAULT 0
);
```

## 4. Enhanced Experiences Table

```sql
ALTER TABLE experiences ADD COLUMN operator_id VARCHAR(50) REFERENCES operators(id);
ALTER TABLE experiences ADD COLUMN end_date_required BOOLEAN DEFAULT FALSE;
```

## 5. Enhanced Itineraries Table

```sql
ALTER TABLE itineraries ADD COLUMN operator_id VARCHAR(50) REFERENCES operators(id);
ALTER TABLE itineraries ADD COLUMN nights INT;
```

## 6. User Favorites Table

```sql
CREATE TABLE user_favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50),
    item_type ENUM('experience', 'itinerary', 'region', 'operator', 'recommendation'),
    item_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_favorite (user_id, item_type, item_id)
);
```

## 7. Operator Reviews Table

```sql
CREATE TABLE operator_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operator_id VARCHAR(50) REFERENCES operators(id),
    user_id VARCHAR(50),
    user_name VARCHAR(255),
    user_avatar_url TEXT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_booking BOOLEAN DEFAULT FALSE
);
```

## 8. Operator Verification Log

```sql
CREATE TABLE operator_verification_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operator_id VARCHAR(50) REFERENCES operators(id),
    verified_by VARCHAR(100),             -- Admin user ID
    verification_type ENUM('initial', 'annual', 'special'),
    verification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date DATE,
    notes TEXT
);
```

---

## Key Relationships

```
┌─────────────────┐      ┌──────────────────┐
│   operators     │──────│   experiences    │
└─────────────────┘      └──────────────────┘
         │
         ├────────────────┐
         │                │
┌────────▼────────┐ ┌─────▼───────────┐
│ operator_services│ │ operator_gallery │
└─────────────────┘ └─────────────────┘
         │
┌────────▼────────┐
│ operator_reviews │
└─────────────────┘
```

---

## Admin Dashboard Features

### Super Admin (Tourism Board)
- Approve/reject operator registrations
- Assign registration numbers
- Manage annual verification
- View all operator metrics
- Suspend non-compliant operators

### Operator Dashboard
- Manage profile & description
- Upload gallery images
- Manage listings
- View reviews & respond
- Track bookings
- View analytics

---

## API Endpoints (Suggested)

```
GET    /api/operators                    - List all verified operators
GET    /api/operators/:id                - Get operator details
POST   /api/operators                    - Register new operator (requires approval)
PUT    /api/operators/:id                - Update operator (owner only)
POST   /api/operators/:id/verify         - Verify operator (admin only)
GET    /api/operators/:id/reviews        - Get operator reviews
POST   /api/operators/:id/reviews        - Add review (verified booking)
POST   /api/users/favorites              - Add to favorites
DELETE /api/users/favorites/:id          - Remove from favorites
GET    /api/users/favorites              - Get user favorites
```

---

## Edge Function Integration

All filter endpoints support the operator data:

```javascript
// Example edge function filter for operators
export async function filterOperators(request) {
    const { services, rating, verified, region } = await request.json();
    
    let query = supabase.from('operators').select('*');
    
    if (verified) query = query.eq('verified', true);
    if (rating) query = query.gte('rating', rating);
    if (region) query = query.eq('region', region);
    
    return query;
}
```

---

## Migration Notes

1. Run migrations in order
2. Populate operator data from existing experience/itinerary `operator` fields
3. Update frontend to use new operator relationships
4. Enable admin dashboard for operator management




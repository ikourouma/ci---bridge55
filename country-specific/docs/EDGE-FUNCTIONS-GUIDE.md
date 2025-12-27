# Edge Functions for CI Tourism Platform

## Overview

Edge functions provide low-latency dynamic filtering for the Côte d'Ivoire Tourism Platform. They are deployed at the edge of the CDN network, ensuring fast response times globally.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                           │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │ Search Page     │    │ EdgeFilterClient │                    │
│  │ (experiences,   │───▶│ (filter-client.js)                    │
│  │  itineraries)   │    └────────┬────────┘                    │
│  └─────────────────┘             │                              │
└──────────────────────────────────┼──────────────────────────────┘
                                   │
                                   ▼
┌──────────────────────────────────────────────────────────────────┐
│                     Edge Network (CDN)                          │
│                                                                 │
│  ┌─────────────────┐                                            │
│  │ Edge Function   │  Deployed to:                              │
│  │ (filter-handler │  • Vercel Edge Functions                   │
│  │      .js)       │  • Cloudflare Workers                      │
│  └────────┬────────┘  • Netlify Edge Functions                  │
│           │                                                     │
│           │ Cache (5 min TTL)                                   │
└───────────┼─────────────────────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────────────────────────────────┐
│                     Data Source                                 │
│  • Database (production)                                        │
│  • In-memory data (development)                                 │
│  • Admin Dashboard CMS                                          │
└──────────────────────────────────────────────────────────────────┘
```

## Files

| File | Purpose |
|------|---------|
| `edge-functions/filter-handler.js` | Server-side edge function handler |
| `edge-functions/filter-client.js` | Client-side JavaScript library |

## API Endpoints

### GET /api/filter/experiences

Filter experiences and recommendations.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | Filter by type (Experience, Stay, Event) |
| `interest` | string | Filter by interest category |
| `region` | string | Filter by region |
| `minPrice` | number | Minimum price |
| `maxPrice` | number | Maximum price |
| `minRating` | number | Minimum rating |
| `sortBy` | string | Sort order (price-asc, price-desc, rating-desc, name) |

**Example:**
```
GET /api/filter/experiences?type=Experience&region=Comoé&minRating=4.5&sortBy=price-asc
```

### GET /api/filter/itineraries

Filter curated itineraries.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `duration` | string | Duration category (short, medium, long) |
| `type` | string | Itinerary type |
| `featured` | boolean | Filter Dia's picks |
| `destination` | string | Search in route cities |
| `minPrice` | number | Minimum price |
| `maxPrice` | number | Maximum price |
| `sortBy` | string | Sort order |

**Example:**
```
GET /api/filter/itineraries?duration=short&featured=true&sortBy=rating-desc
```

### GET /api/filter/regions

Filter regions and districts.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `area` | string | Geographic area (Coastal/South, Eastern, Central, etc.) |
| `ethnic` | string | Ethnic group filter |
| `minExperiences` | number | Minimum experience count |
| `sortBy` | string | Sort order (name, experiences-desc) |

**Example:**
```
GET /api/filter/regions?area=Coastal&sortBy=experiences-desc
```

## Client Usage

### Include the Client Library

```html
<script src="../edge-functions/filter-client.js"></script>
```

### Filter Experiences

```javascript
// Get filtered experiences
const filters = {
    type: 'Experience',
    region: 'Comoé',
    minRating: 4.5,
    sortBy: 'price-asc'
};

const experiences = await EdgeFilterClient.filterExperiences(filters, localExperiencesData);
renderExperiences(experiences);
```

### Filter Itineraries

```javascript
const filters = {
    duration: 'short',
    featured: true
};

const itineraries = await EdgeFilterClient.filterItineraries(filters, localItinerariesData);
renderItineraries(itineraries);
```

### Filter Regions

```javascript
const filters = {
    area: 'Coastal/South',
    ethnic: 'Akan'
};

const regions = await EdgeFilterClient.filterRegions(filters, localRegionsData);
renderRegions(regions);
```

### Clear Cache

```javascript
EdgeFilterClient.clearCache();
```

### Configure Client

```javascript
EdgeFilterClient.configure({
    baseUrl: 'https://your-edge-function-url.com/api/filter',
    timeout: 10000,
    cacheEnabled: true,
    cacheTTL: 600000 // 10 minutes
});
```

## Deployment

### Vercel Edge Functions

1. Create `vercel.json`:
```json
{
  "functions": {
    "api/filter/**/*.js": {
      "runtime": "edge"
    }
  }
}
```

2. Deploy:
```bash
vercel deploy
```

### Cloudflare Workers

1. Create `wrangler.toml`:
```toml
name = "bridge55-ci-filter"
main = "edge-functions/filter-handler.js"
compatibility_date = "2024-01-01"
```

2. Deploy:
```bash
wrangler deploy
```

### Netlify Edge Functions

1. Create `netlify/edge-functions/filter.js`:
```javascript
export { default } from '../../country-specific/edge-functions/filter-handler.js';
```

2. Deploy:
```bash
netlify deploy --prod
```

## Local Development

For local development, the client library automatically falls back to local filtering when edge functions are unavailable. This ensures the application works seamlessly in development environments.

## Performance Benefits

| Metric | Traditional API | Edge Function |
|--------|-----------------|---------------|
| Average latency | 200-500ms | 20-50ms |
| Global availability | Regional | Global |
| Caching | Server-side | Edge + Client |
| Cold start | 1-5s | <100ms |

## Error Handling

The client library includes automatic fallback:

1. **Primary**: Fetch from edge function
2. **Fallback**: Filter locally using JavaScript
3. **Cache**: Use cached data if available

```javascript
try {
    const data = await EdgeFilterClient.filterExperiences(filters, localData);
    // Edge function succeeded
} catch (error) {
    // Automatic fallback to local filtering
    console.warn('Edge function unavailable, using local filter');
}
```

## Favorites Integration

The edge function client works seamlessly with the favorites system:

```javascript
// Get favorites from localStorage
const favorites = JSON.parse(localStorage.getItem('ci_favorite_experiences') || '[]');

// Filter experiences
const experiences = await EdgeFilterClient.filterExperiences(filters, localData);

// Mark favorites
experiences.forEach(exp => {
    exp.isFavorite = favorites.includes(exp.id);
});

renderExperiences(experiences);
```

## SEO Considerations

- Edge functions support server-side rendering for SEO
- Initial page load includes pre-filtered data
- Client-side updates use edge functions for interactivity
- Cache headers enable CDN caching

## Security

- CORS headers restrict access to allowed origins
- Rate limiting can be implemented at edge
- No sensitive data exposed in edge functions
- All data validation happens server-side

## Monitoring

Recommended monitoring setup:
- Vercel Analytics for edge function performance
- Client-side error tracking (Sentry, LogRocket)
- Cache hit/miss ratio logging

---

*Last Updated: December 2024*
*Version: 1.0.0*




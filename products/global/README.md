# Bridge55 Global - Pan-African Travel Platform

> **Product**: Core SaaS Travel Platform  
> **Domain**: `bridge55.co`  
> **Status**: Foundation

## Overview

Bridge55 Global is the core pan-African travel technology platform that powers:
- Flight booking and comparison
- Hotel and accommodation search
- Car rentals and transfers
- Travel experiences and activities
- Insurance and visa services
- User accounts and rewards

## Quick Start

### Local Development

```bash
cd products/global
npx serve .
# Open http://localhost:3000
```

## Key Sections

| Section | Path | Description |
|---------|------|-------------|
| **Home** | `/index.html` | Main search hub |
| **Flights** | `/flights/` | Flight search & booking |
| **Stays** | `/stays/` | Hotel search & booking |
| **Cars** | `/cars/` | Car rental |
| **Transfers** | `/transfers/` | Airport transfers |
| **Experiences** | `/experiences/` | Activities & tours |
| **Insurance** | `/insurance/` | Travel insurance |
| **User** | `/user/` | Profile, bookings, wallet |
| **Admin** | `/admin/` | Admin dashboards |

## Architecture

This product serves as the global shell and provides:
- Unified navigation components
- Shared booking flows
- User authentication (future)
- Payment processing (future)
- Analytics and tracking (future)

## Configuration

### Environment Variables (Future)
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
STRIPE_PUBLIC_KEY=xxx
```

## Deployment

### Netlify
- Config: `netlify.toml`
- Domain: `bridge55.co`

## Related Products

- [Visit Côte d'Ivoire](../ci/) - Country demo
- [AfCON Hub](../afcon/) - Sports events

---

**Version**: 1.0  
**Last Updated**: December 27, 2025  
**Maintainer**: Bridge55 Platform Team


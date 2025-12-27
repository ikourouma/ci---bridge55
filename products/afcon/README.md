# Bridge55 Sports - AfCON 2025 Hub

> **Product**: Event-Based Travel Platform  
> **Domain**: `afcon.bridge55.co`  
> **Status**: In Development

## Overview

The AfCON 2025 Hub is a specialized travel platform for the Africa Cup of Nations 2025, hosted in Côte d'Ivoire. It provides:

- Match schedules and stadium information
- Ticket bundles with travel packages
- Official hospitality packages
- Fan community features
- Travel coordination (flights, stays, transfers)

## Quick Start

### Local Development

```bash
cd products/afcon
npx serve .
# Open http://localhost:3000
```

## Key Pages

| Page | Path | Description |
|------|------|-------------|
| **Hub Home** | `/pages/index.html` | AfCON landing page |
| **Matches** | `/pages/matches/` | Match schedule |
| **Stadiums** | `/pages/stadiums/` | Venue information |
| **Tickets** | `/pages/tickets/` | Ticket bundles |
| **Hospitality** | `/pages/hospitality/` | VIP packages |
| **Travel** | `/pages/travel/` | Flights, stays, transfers |
| **Community** | `/pages/community/` | Fan hub, marketplace |

## Event Details

### AfCON 2025
- **Host Country**: Côte d'Ivoire
- **Dates**: January - February 2025
- **Host Cities**: Abidjan, Yamoussoukro, Bouaké, Korhogo, San-Pédro
- **Stadiums**: 6 venues

## Integration with Bridge55 Global

This product integrates with Bridge55 Global for:
- Flight bookings (via `/flights/`)
- Hotel bookings (via `/stays/`)
- Transfers (via `/transfers/`)
- User accounts and payments

## Deployment

### Netlify
- Config: `netlify.toml`
- Domain: `afcon.bridge55.co`

## Related Products

- [Bridge55 Global](../global/) - Core platform
- [Visit Côte d'Ivoire](../ci/) - Country demo

---

**Version**: 1.0  
**Last Updated**: December 27, 2025  
**Maintainer**: Bridge55 Platform Team


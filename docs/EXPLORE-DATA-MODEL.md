# Explore (pages/explore.html) — Data Model / “Database” Plan

This document defines the **canonical data structure** for powering `pages/explore.html` (Pan‑African Explore hub) and future country‑specific Explore pages.

## Goals
- **Single source of truth** for Explore content (countries, regions, cities, smart routes, recommendations).
- **Theme-safe**: all UI uses CSS variables derived from `data-country`.
- **Scalable**: supports white‑label tourism board deployments (different domains + country defaults).

## Core Entities (Collections / Tables)

### 1) `countries`
**Purpose**: partner country registry + localization defaults + Explore landing behavior.

**Fields**
- `code` (string, PK): Bridge55 country code (e.g. `ke`, `ng`). Pan‑African uses `pan-african`.
- `iso2` (string): ISO‑3166‑1 alpha‑2 (e.g. `KE`)
- `name` (string): English display name
- `flag` (string): Emoji or asset reference
- `region` (string): `west|east|north|central|southern`
- `currency` (string): ISO currency (e.g. `KES`)
- `primaryLanguage` (string): `en|fr|ar|pt|sw`
- `timeZone` (string): IANA TZ (e.g. `Africa/Nairobi`)
- `active` (boolean): partner enabled
- `exploreSlug` (string): optional for country‑specific Explore route

### 2) `themes`
**Purpose**: country branding tokens used by UI (buttons, chips, links, CTA gradients).

**Fields**
- `countryCode` (string, PK/FK → `countries.code`)
- `primary` (hex)
- `primaryHover` (hex)
- `primaryLight` (rgba/hex)
- `secondary` (hex)
- `accent` (hex)
- `headerGradient` (css gradient string)

**Contract**
- If `countryCode` is unknown → use `pan-african`

### 3) `regions`
**Purpose**: Explore “Explore by Region” tabs and content grouping.

**Fields**
- `code` (string, PK): `west|east|north|central|southern|all`
- `name` (string)
- `emoji` (string)
- `priority` (number)

### 4) `destinations` (cities/areas)
**Purpose**: location autocomplete + city cards + SEO link lists.

**Fields**
- `id` (string, PK)
- `type` (enum): `city|region|country`
- `name` (string)
- `countryCode` (string, FK → `countries.code`, nullable for pan‑African/region types)
- `regionCode` (string, FK → `regions.code`)
- `geo` (object): `{ lat, lon }`
- `heroImage` (url/path)
- `tags` (string[])
- `popularityScore` (number)
- `active` (boolean)

### 5) `interests`
**Purpose**: “Explore by Interest” cards.

**Fields**
- `code` (string, PK): e.g. `beach`, `safari`, `culture`, `food`
- `title` (string)
- `subtitle` (string)
- `image` (url/path)
- `destinationCount` (number)

### 6) `smartRoutes`
**Purpose**: “Smart Routes by Dia” (multi‑leg itineraries).

**Fields**
- `id` (string, PK)
- `title` (string) e.g. `Nairobi → Maasai Mara → Zanzibar`
- `countryCodes` (string[])
- `regionCode` (string)
- `durationDays` (number)
- `cities` (string[])
- `startingPrice` (number)
- `currency` (string)
- `badges` (string[]) e.g. `Visa-light`, `Safari`
- `active` (boolean)

### 7) `recommendations`
**Purpose**: “Recommended for You” feed.

**Fields**
- `id` (string, PK)
- `type` (enum): `stay|experience|event|route`
- `title` (string)
- `locationLabel` (string)
- `countryCode` (string)
- `price` (number)
- `priceUnit` (string): `night|ticket|person`
- `rating` (number)
- `badge` (string) e.g. `Top Rated`
- `image` (url/path)
- `active` (boolean)

## Storage Format (Phase 1 — Static JSON)
For the current static architecture, store these as versioned JSON:
- `data/explore/countries.json`
- `data/explore/themes.json`
- `data/explore/regions.json`
- `data/explore/destinations.json`
- `data/explore/interests.json`
- `data/explore/smartRoutes.json`
- `data/explore/recommendations.json`

## Storage Format (Phase 2 — API / DB)
When migrating to a backend:
- **Relational (Postgres)**: normalized tables with indexed `country_code`, `region_code`, `popularity_score`.
- **Document (Mongo/Firestore)**: `countries/{code}`, `destinations/{id}`, plus materialized “Explore feeds”.

## Geolocation → Country Selection Rules
- If user manually selected a country → persist (`bridge55-country-manual=true`) and always use it.
- Else detect via geolocation (reverse geocode).
- If detected country is not in `countries.active=true` → **fallback to `pan-african`**.

## Theme Application Rules (Non‑Negotiable)
- JS sets: `document.documentElement.setAttribute('data-country', code)`
- CSS reads tokens from `[data-country="..."]`
- All UI must use CSS variables (`var(--primary)`, etc.) rather than hardcoded colors.











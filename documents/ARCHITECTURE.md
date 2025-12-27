# 🏗️ Bridge55 Federated Architecture

## System Architecture Overview

Bridge55 uses a **hub-and-spoke federated architecture** that enables both centralized discovery and decentralized country-specific operations.

---

## 🎯 Architecture Principles

### 1. Federation Over Centralization
- Each country instance can operate independently
- Central hub aggregates and federates data
- Bi-directional synchronization
- Graceful degradation (offline capability)

### 2. Data Sovereignty
- Country data stored locally
- Complies with local regulations
- Government control over their data
- Privacy-first design

### 3. Multi-Tenancy
- Single codebase, multiple deployments
- Tenant isolation at database level
- Shared services with tenant context
- Customization per tenant

### 4. API-First Design
- All features accessible via API
- Federation protocol documented
- Versioned APIs
- Backward compatibility

---

## 🏛️ System Components

### Layer 1: Core Platform (bridge55.com)

```typescript
// Core Platform Services

interface CorePlatform {
  // Data Services
  inventoryHub: MasterInventoryDatabase;
  searchEngine: GlobalSearchService;
  analyticsEngine: CrossPlatformAnalytics;
  
  // Business Services
  operatorPortal: OperatorManagementService;
  paymentHub: PaymentProcessingHub;
  notificationService: RealTimeNotifications;
  
  // Federation Services
  federationAPI: FederationAPIServer;
  syncScheduler: DataSynchronizationService;
  conflictResolver: ConflictResolutionEngine;
  
  // Authentication
  authProvider: CentralAuthService; // SSO
  userManagement: UserProfileService;
}
```

**Responsibilities:**
- Aggregate inventory from all country instances
- Provide global search across all countries
- Manage operator accounts (single registration)
- Process payments centrally
- Sync data to/from country instances
- Analytics and reporting
- SSO authentication

**Technology:**
- **Database**: PostgreSQL (multi-tenant schema)
- **Search**: Elasticsearch
- **Cache**: Redis
- **Queue**: RabbitMQ for async processing
- **Storage**: S3-compatible object storage
- **Hosting**: AWS/Azure (African regions)

---

### Layer 2: Country Instances (bridge55.ci, bridge55.ke, etc.)

```typescript
// Country Instance Services

interface CountryInstance {
  // Identity
  instanceId: string;              // 'CI', 'KE', 'ZA'
  countryCode: string;
  domain: string;                  // 'bridge55.ci'
  
  // Local Data
  localDatabase: CountryDatabase;  // PostgreSQL
  localCache: RedisCache;
  localSearch: SearchEngine;
  
  // Services
  localInventory: InventoryService;
  localBookings: BookingService;
  localPayments: PaymentService;
  
  // White-Label
  branding: BrandingConfiguration;
  customization: UICustomization;
  content: ContentManagementService;
  
  // Federation
  federationClient: FederationClient;
  syncEngine: SyncEngine;
  
  // Fallback
  offlineMode: OfflineCapability;
}
```

**Responsibilities:**
- Serve country-specific content
- Fast local search
- Handle local bookings
- Process payments (local gateways)
- Sync with core platform
- Custom branding
- Work offline if needed

**Technology:**
- **Database**: PostgreSQL (local instance)
- **Search**: Local Elasticsearch or Algolia
- **Cache**: Redis
- **Hosting**: Regional hosting (in-country preferred)
- **CDN**: CloudFlare or similar

---

### Layer 3: Federation Protocol

```typescript
// Federation API Specification

interface FederationAPI {
  // Inventory Management
  pushInventory(listings: Listing[]): Promise<SyncResult>;
  pullInventory(filters: InventoryFilter): Promise<Listing[]>;
  updateInventory(updates: InventoryUpdate[]): Promise<void>;
  deleteInventory(listingIds: string[]): Promise<void>;
  
  // Booking Flow
  createBooking(booking: BookingRequest): Promise<BookingResult>;
  confirmBooking(bookingId: string): Promise<void>;
  cancelBooking(bookingId: string, reason: string): Promise<void>;
  syncBookings(since: Date): Promise<Booking[]>;
  
  // User Management (with consent)
  syncUserProfile(userId: string): Promise<UserProfile>;
  syncUserPreferences(userId: string): Promise<Preferences>;
  
  // Analytics & Reporting
  reportMetrics(metrics: MetricsData): Promise<void>;
  getGlobalTrends(): Promise<TrendsData>;
  getCountryInsights(countryCode: string): Promise<Insights>;
  
  // Cross-Instance Search
  federatedSearch(query: SearchQuery): Promise<SearchResults>;
  aggregateResults(queries: SearchQuery[]): Promise<AggregatedResults>;
  
  // Health & Status
  ping(): Promise<PingResponse>;
  getStatus(): Promise<InstanceStatus>;
  getVersion(): Promise<VersionInfo>;
}
```

---

## 🔄 Data Flow Examples

### Example 1: Operator Lists Safari in Kenya

```
1. Operator logs into bridge55.com operator portal
2. Creates listing: "5-Day Masai Mara Safari"
3. Listing saved to Core Platform database
4. Sync scheduler triggers
5. Federation API pushes listing to bridge55.ke
6. bridge55.ke stores in local database
7. Listing now appears on:
   - bridge55.com (all African safaris)
   - bridge55.ke (Kenya experiences)
   - Search results globally
```

### Example 2: User Books from Côte d'Ivoire Instance

```
1. User visits bridge55.ci
2. Searches for "beach hotels Abidjan"
3. Local search returns results from CI database
4. User also sees "Explore Africa" section
5. Clicks on "Kenya Safari"
6. Federation client queries bridge55.com
7. Returns Kenya listings
8. User books Kenya safari from CI instance
9. Booking created on bridge55.com
10. Synced to bridge55.ke
11. Confirmation sent to user
12. Revenue split: 60% Bridge55, 40% CI instance
```

### Example 3: Cross-Instance Analytics

```
1. Kenya Tourism Board views dashboard
2. Requests: "Where are our visitors coming from?"
3. Federation API aggregates data:
   - bookings from bridge55.com
   - bookings from all country instances
4. Returns: "30% direct, 25% from bridge55.ci, 20% from bridge55.za..."
5. Tourism board gets insights into their market
```

---

## 🗄️ Database Architecture

### Multi-Tenant Schema Design

```sql
-- Core Platform Schema

-- Tenants (Country Instances)
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  country_code CHAR(2) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'active',
  config JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Operators (Global)
CREATE TABLE operators (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  country_code CHAR(2),
  status VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Listings (Master Inventory)
CREATE TABLE listings (
  id UUID PRIMARY KEY,
  operator_id UUID REFERENCES operators(id),
  tenant_id UUID REFERENCES tenants(id),
  type VARCHAR(50), -- 'stay', 'flight', 'car', 'tour', etc.
  title VARCHAR(500) NOT NULL,
  description TEXT,
  location JSONB,
  price_data JSONB,
  availability JSONB,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  synced_at TIMESTAMPTZ
);

-- Bookings (Central)
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  listing_id UUID REFERENCES listings(id),
  tenant_id UUID REFERENCES tenants(id),
  status VARCHAR(50),
  booking_data JSONB,
  payment_status VARCHAR(50),
  amount DECIMAL(10,2),
  currency CHAR(3),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sync Log (Audit Trail)
CREATE TABLE sync_log (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  action VARCHAR(50), -- 'push', 'pull', 'update', 'delete'
  entity_type VARCHAR(50), -- 'listing', 'booking', 'user'
  entity_id UUID,
  status VARCHAR(50), -- 'success', 'failed', 'pending'
  error_message TEXT,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Country Instance Schema

```sql
-- Country-Specific Schema (e.g., bridge55.ci)

-- Local Listings Cache
CREATE TABLE local_listings (
  id UUID PRIMARY KEY,
  master_id UUID UNIQUE, -- Reference to core platform
  data JSONB,
  is_local BOOLEAN DEFAULT false, -- true if originated here
  last_synced TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Local Bookings
CREATE TABLE local_bookings (
  id UUID PRIMARY KEY,
  master_id UUID, -- Reference to core platform
  listing_id UUID,
  user_data JSONB,
  booking_data JSONB,
  status VARCHAR(50),
  synced BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sync Queue (for offline mode)
CREATE TABLE sync_queue (
  id UUID PRIMARY KEY,
  action VARCHAR(50),
  entity_type VARCHAR(50),
  entity_data JSONB,
  retry_count INT DEFAULT 0,
  status VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔐 Authentication & Authorization

### Single Sign-On (SSO) Architecture

```typescript
// Authentication Flow

interface AuthenticationSystem {
  // Central Auth Provider (bridge55.com)
  centralAuth: {
    provider: 'Supabase Auth',
    methods: ['email', 'google', 'facebook', 'phone'],
    tokenType: 'JWT',
    tokenExpiry: '7 days'
  };
  
  // Country Instance Auth
  federatedAuth: {
    protocol: 'OAuth 2.0',
    flow: 'Authorization Code with PKCE',
    scopes: ['profile', 'bookings', 'preferences']
  };
  
  // Token Exchange
  tokenExchange: {
    // User logs in on bridge55.ci
    // Gets local token + federated token
    // Can access bridge55.com resources
  };
}
```

**User Login Flow:**
1. User visits bridge55.ci
2. Clicks "Sign In"
3. Redirected to bridge55.com/auth
4. Logs in (or registers)
5. Gets JWT token
6. Redirected back to bridge55.ci with token
7. bridge55.ci validates token with bridge55.com
8. User is authenticated on both platforms

---

## 🔄 Synchronization Strategy

### Real-Time vs. Batch Sync

```typescript
// Sync Configuration

interface SyncStrategy {
  // Real-Time (WebSocket)
  realTime: {
    entities: ['bookings', 'availability'],
    direction: 'bidirectional',
    latency: '< 1 second'
  };
  
  // Near Real-Time (Polling)
  nearRealTime: {
    entities: ['inventory', 'prices'],
    interval: '5 minutes',
    direction: 'bidirectional'
  };
  
  // Batch (Scheduled)
  batch: {
    entities: ['analytics', 'reports'],
    schedule: 'hourly',
    direction: 'push to core'
  };
  
  // On-Demand
  onDemand: {
    entities: ['user profiles', 'reviews'],
    trigger: 'user request',
    direction: 'bidirectional'
  };
}
```

### Conflict Resolution

```typescript
// When same entity updated in multiple places

interface ConflictResolutionStrategy {
  // Last-Write-Wins (default)
  lastWriteWins: {
    rule: 'Most recent timestamp wins',
    applies: ['user preferences', 'profile updates']
  };
  
  // Source Priority
  sourcePriority: {
    rule: 'Core platform wins',
    applies: ['operator data', 'listings']
  };
  
  // Manual Resolution
  manualResolution: {
    rule: 'Flag for admin review',
    applies: ['pricing conflicts', 'availability conflicts']
  };
  
  // Merge
  merge: {
    rule: 'Combine non-conflicting fields',
    applies: ['analytics data', 'aggregated stats']
  };
}
```

---

## 📡 API Gateway Architecture

```typescript
// API Gateway Pattern

interface APIGateway {
  // Routes incoming requests
  routing: {
    '/api/search': 'Search Service',
    '/api/bookings': 'Booking Service',
    '/api/operators': 'Operator Service',
    '/api/federation': 'Federation Service'
  };
  
  // Authentication
  auth: {
    validateToken: () => boolean,
    checkPermissions: () => boolean,
    rateLimit: () => boolean
  };
  
  // Load Balancing
  loadBalancer: {
    algorithm: 'round-robin',
    healthCheck: true,
    fallback: 'regional instance'
  };
  
  // Caching
  cache: {
    strategy: 'cache-aside',
    ttl: '5 minutes',
    invalidation: 'event-driven'
  };
}
```

---

## 🚨 Disaster Recovery & High Availability

### Redundancy Strategy

```
Primary: Core Platform (bridge55.com)
├─ Region 1: East Africa (Kenya)
├─ Region 2: West Africa (Nigeria)
└─ Region 3: Southern Africa (South Africa)

Failover:
- If Region 1 fails → Region 2 takes over
- If core fails → Country instances work independently
- Daily backups to 3 regions
- 99.9% uptime SLA
```

### Offline Mode

```typescript
// Country Instance Offline Capability

interface OfflineMode {
  // What works offline
  available: [
    'View cached listings',
    'Search local inventory',
    'View past bookings',
    'Queue new bookings'
  ];
  
  // What doesn't work
  unavailable: [
    'Cross-country search',
    'Real-time availability',
    'Payment processing',
    'Live updates'
  ];
  
  // Sync when back online
  syncOnReconnect: true;
}
```

---

## 📊 Monitoring & Observability

```typescript
// Monitoring Stack

interface MonitoringSystem {
  // Application Performance Monitoring
  apm: {
    tool: 'New Relic / DataDog',
    metrics: ['response time', 'error rate', 'throughput']
  };
  
  // Logging
  logging: {
    tool: 'ELK Stack / CloudWatch',
    retention: '90 days',
    levels: ['error', 'warn', 'info', 'debug']
  };
  
  // Alerts
  alerting: {
    channels: ['PagerDuty', 'Slack', 'Email'],
    rules: [
      'API response time > 500ms',
      'Error rate > 1%',
      'Sync failed 3 times',
      'Instance offline > 5 minutes'
    ]
  };
  
  // Federation Health
  federationHealth: {
    check: 'every 1 minute',
    metrics: ['sync lag', 'connection status', 'data consistency']
  };
}
```

---

## 🔧 Development & Deployment

### CI/CD Pipeline

```yaml
# Deployment Pipeline

stages:
  - test
  - build
  - deploy-core
  - deploy-instances
  - verify

test:
  - unit tests
  - integration tests
  - e2e tests
  - security scans

deploy-core:
  target: bridge55.com
  strategy: blue-green
  rollback: automatic

deploy-instances:
  target: [bridge55.ci, bridge55.ke, ...]
  strategy: rolling
  parallel: 3
  rollback: manual
```

---

## 📚 Additional Documentation

- **API_DOCUMENTATION.md** - Complete API reference
- **DEPLOYMENT_GUIDE.md** - Deployment instructions
- **SECURITY.md** - Security best practices
- **SCALING.md** - Scaling strategies

---

**Version**: 1.0.0
**Last Updated**: November 12, 2025
**Status**: Architecture Complete

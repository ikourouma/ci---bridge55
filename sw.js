/**
 * Bridge55 Service Worker v1.0
 * ============================
 * Enables offline mode for African travel platform
 * 
 * Features:
 * - Cache static assets (CSS, JS, images)
 * - Cache language packs
 * - Cache API responses
 * - Offline fallback pages
 * 
 * AFRICAN CONTEXT:
 * - Essential for low-connectivity regions
 * - Allows booking info access offline
 * - Caches critical travel documents
 */

const CACHE_NAME = 'bridge55-v1';
const OFFLINE_URL = '/pages/offline.html';

// Assets to cache immediately on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/bridge55-search-hub-FINAL.html',
    '/pages/about.html',
    '/pages/contact.html',
    '/pages/faq.html',
    '/pages/destinations.html',
    '/pages/terms.html',
    '/components/global-header.html',
    '/components/global-footer.html',
    '/css/global-layout.css',
    // CDN assets (will be fetched and cached)
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('📦 Bridge55 Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Caching static assets');
                return cache.addAll(STATIC_ASSETS.filter(url => !url.startsWith('http')));
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('✅ Bridge55 Service Worker: Activated');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => {
                        console.log('🗑️ Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) return;
    
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    // Return cached response and update cache in background
                    fetchAndCache(request);
                    return cachedResponse;
                }
                
                // Not in cache, fetch from network
                return fetchAndCache(request);
            })
            .catch(() => {
                // Network failed and not in cache
                if (request.headers.get('Accept').includes('text/html')) {
                    return caches.match(OFFLINE_URL);
                }
                
                // Return empty response for other resources
                return new Response('Offline', { status: 503 });
            })
    );
});

// Fetch and cache helper
async function fetchAndCache(request) {
    try {
        const response = await fetch(request);
        
        // Don't cache non-successful responses
        if (!response.ok) return response;
        
        // Clone the response before caching
        const responseToCache = response.clone();
        
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, responseToCache);
        
        return response;
    } catch (error) {
        console.warn('⚠️ Fetch failed:', request.url);
        throw error;
    }
}

// Handle messages from the main thread
self.addEventListener('message', event => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
    
    if (event.data.action === 'cacheBooking') {
        // Cache booking details for offline access
        const bookingData = event.data.booking;
        caches.open(CACHE_NAME).then(cache => {
            const response = new Response(JSON.stringify(bookingData));
            cache.put(`/bookings/${bookingData.id}`, response);
            console.log('📦 Booking cached for offline:', bookingData.id);
        });
    }
});

// Background sync for offline bookings
self.addEventListener('sync', event => {
    if (event.tag === 'sync-bookings') {
        console.log('🔄 Background sync: Syncing offline bookings');
        event.waitUntil(syncOfflineBookings());
    }
});

async function syncOfflineBookings() {
    // Get pending bookings from IndexedDB or cache
    // This would be implemented with a proper database
    console.log('📤 Syncing offline bookings to server...');
}

// Push notifications for booking updates
self.addEventListener('push', event => {
    const data = event.data?.json() || {};
    
    const options = {
        body: data.body || 'You have a booking update',
        icon: '/images/bridge55-icon.png',
        badge: '/images/bridge55-badge.png',
        data: data.url || '/',
        actions: [
            { action: 'view', title: 'View Details' },
            { action: 'dismiss', title: 'Dismiss' }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || 'Bridge55', options)
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow(event.notification.data)
        );
    }
});

console.log('🌍 Bridge55 Service Worker loaded - Enabling offline mode for Africa');












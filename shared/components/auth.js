/**
 * Bridge55 Shared Authentication Component
 * =========================================
 * 
 * Unified authentication system for all Bridge55 SaaS platforms:
 * - Bridge55 Core
 * - Country-Specific (Tourism Boards)
 * - AfCON (Sports Edition)
 * 
 * Features:
 * - User session management
 * - BridgeWallet integration
 * - Social login support
 * - Role-based access control
 * 
 * @version 1.0.0
 * @author Afronovation
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const AUTH_CONFIG = {
    storageKey: 'bridge55-auth',
    sessionDuration: 7 * 24 * 60 * 60 * 1000, // 7 days
    walletKey: 'bridge55-wallet',
    roles: ['guest', 'user', 'partner', 'admin', 'super-admin']
};

// ═══════════════════════════════════════════════════════════════════════════
// USER SESSION MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get current user session
 * @returns {Object|null} User session or null if not logged in
 */
export function getSession() {
    try {
        const stored = localStorage.getItem(AUTH_CONFIG.storageKey);
        if (!stored) return null;
        
        const session = JSON.parse(stored);
        
        // Check if session is expired
        if (session.expiresAt && Date.now() > session.expiresAt) {
            clearSession();
            return null;
        }
        
        return session;
    } catch (e) {
        console.error('Error reading session:', e);
        return null;
    }
}

/**
 * Set user session
 * @param {Object} user - User data
 * @param {boolean} remember - Whether to extend session duration
 */
export function setSession(user, remember = false) {
    const session = {
        ...user,
        loggedInAt: Date.now(),
        expiresAt: remember 
            ? Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
            : Date.now() + AUTH_CONFIG.sessionDuration
    };
    
    localStorage.setItem(AUTH_CONFIG.storageKey, JSON.stringify(session));
    
    // Dispatch event for UI updates
    window.dispatchEvent(new CustomEvent('authChange', { 
        detail: { type: 'login', user: session } 
    }));
    
    return session;
}

/**
 * Clear user session (logout)
 */
export function clearSession() {
    localStorage.removeItem(AUTH_CONFIG.storageKey);
    
    window.dispatchEvent(new CustomEvent('authChange', { 
        detail: { type: 'logout' } 
    }));
}

/**
 * Check if user is logged in
 * @returns {boolean}
 */
export function isLoggedIn() {
    return getSession() !== null;
}

/**
 * Check if user has specific role
 * @param {string} role - Role to check
 * @returns {boolean}
 */
export function hasRole(role) {
    const session = getSession();
    if (!session) return role === 'guest';
    return session.role === role || session.roles?.includes(role);
}

/**
 * Check if user has any of the specified roles
 * @param {Array} roles - Roles to check
 * @returns {boolean}
 */
export function hasAnyRole(roles) {
    return roles.some(role => hasRole(role));
}

// ═══════════════════════════════════════════════════════════════════════════
// BRIDGEWALLET INTEGRATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get BridgeWallet balance
 * @returns {Object} Wallet data
 */
export function getWallet() {
    try {
        const stored = localStorage.getItem(AUTH_CONFIG.walletKey);
        if (!stored) {
            return {
                balance: 0,
                currency: 'USD',
                transactions: [],
                lastUpdated: null
            };
        }
        return JSON.parse(stored);
    } catch (e) {
        console.error('Error reading wallet:', e);
        return { balance: 0, currency: 'USD', transactions: [] };
    }
}

/**
 * Update BridgeWallet
 * @param {Object} walletData - Wallet update data
 */
export function updateWallet(walletData) {
    const current = getWallet();
    const updated = {
        ...current,
        ...walletData,
        lastUpdated: Date.now()
    };
    
    localStorage.setItem(AUTH_CONFIG.walletKey, JSON.stringify(updated));
    
    window.dispatchEvent(new CustomEvent('walletChange', { 
        detail: updated 
    }));
    
    return updated;
}

/**
 * Add transaction to wallet
 * @param {Object} transaction - Transaction details
 */
export function addTransaction(transaction) {
    const wallet = getWallet();
    const newTransaction = {
        id: `txn_${Date.now()}`,
        timestamp: Date.now(),
        ...transaction
    };
    
    wallet.transactions = [newTransaction, ...(wallet.transactions || [])];
    wallet.balance = transaction.type === 'credit' 
        ? wallet.balance + transaction.amount 
        : wallet.balance - transaction.amount;
    
    return updateWallet(wallet);
}

// ═══════════════════════════════════════════════════════════════════════════
// DEMO USER PROFILES (for testing)
// ═══════════════════════════════════════════════════════════════════════════

export const DEMO_USERS = {
    guest: {
        id: 'guest',
        name: 'Guest User',
        email: null,
        role: 'guest',
        avatar: null
    },
    user: {
        id: 'demo_user_001',
        name: 'Amara Diallo',
        email: 'amara@bridge55.co',
        role: 'user',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara',
        country: 'sn',
        preferences: {
            language: 'fr',
            currency: 'XOF',
            favoriteTeam: 'Senegal'
        }
    },
    partner: {
        id: 'demo_partner_001',
        name: 'Kofi Tours Ltd',
        email: 'kofi@partner.bridge55.co',
        role: 'partner',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=KT',
        companyName: 'Kofi Tours Ltd',
        country: 'gh',
        verified: true
    },
    admin: {
        id: 'demo_admin_001',
        name: 'Sarah Admin',
        email: 'sarah@admin.bridge55.co',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        permissions: ['users', 'content', 'partners']
    },
    superAdmin: {
        id: 'demo_superadmin_001',
        name: 'Bridge55 Super Admin',
        email: 'super@bridge55.co',
        role: 'super-admin',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=B55',
        permissions: ['*']
    }
};

/**
 * Login as demo user
 * @param {string} type - Demo user type ('user', 'partner', 'admin', 'superAdmin')
 */
export function loginAsDemo(type = 'user') {
    const demoUser = DEMO_USERS[type] || DEMO_USERS.user;
    return setSession(demoUser, true);
}

// ═══════════════════════════════════════════════════════════════════════════
// UI COMPONENTS (HTML generators)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate login form HTML
 * @param {Object} options - Form options
 * @returns {string} HTML string
 */
export function renderLoginForm(options = {}) {
    const { 
        showSocial = true, 
        showRemember = true,
        redirectUrl = '/',
        platform = 'Bridge55'
    } = options;
    
    return `
    <div class="auth-form-container">
        <div class="auth-form-header">
            <h2>Welcome to ${platform}</h2>
            <p>Sign in to continue</p>
        </div>
        
        <form class="auth-form" id="loginForm">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required 
                       placeholder="your@email.com">
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required 
                       placeholder="Enter your password">
            </div>
            
            ${showRemember ? `
            <div class="form-group form-check">
                <input type="checkbox" id="remember" name="remember">
                <label for="remember">Remember me for 30 days</label>
            </div>
            ` : ''}
            
            <button type="submit" class="btn-themed btn-block">
                Sign In
            </button>
            
            <div class="auth-links">
                <a href="#forgot">Forgot password?</a>
                <a href="#register">Create account</a>
            </div>
        </form>
        
        ${showSocial ? `
        <div class="auth-divider">
            <span>or continue with</span>
        </div>
        
        <div class="social-buttons">
            <button class="btn-social btn-google" onclick="Bridge55Auth.socialLogin('google')">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Google
            </button>
            <button class="btn-social btn-apple" onclick="Bridge55Auth.socialLogin('apple')">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M17.05,20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24,0c-1.44.62-2.2.44-3.06-.35C2.79,15.25,3.51,7.59,9.05,7.31c1.35.07,2.29.74,3.08.8c1.18-.24,2.31-.93,3.57-.84c1.51.12,2.65.72,3.4,1.8c-3.12,1.87-2.38,5.98.48,7.13c-.57,1.5-1.31,2.99-2.54,4.09zM12.03,7.25c-.15-2.23,1.66-4.07,3.74-4.25c.29,2.58-2.34,4.5-3.74,4.25z"/>
                </svg>
                Apple
            </button>
        </div>
        ` : ''}
        
        <div class="demo-login">
            <p>Demo accounts:</p>
            <div class="demo-buttons">
                <button onclick="Bridge55Auth.loginAsDemo('user')">User</button>
                <button onclick="Bridge55Auth.loginAsDemo('partner')">Partner</button>
                <button onclick="Bridge55Auth.loginAsDemo('admin')">Admin</button>
            </div>
        </div>
    </div>
    `;
}

/**
 * Generate user menu HTML
 * @returns {string} HTML string
 */
export function renderUserMenu() {
    const session = getSession();
    
    if (!session) {
        return `
        <div class="user-menu guest">
            <a href="user/login.html" class="btn-login">Sign In</a>
            <a href="user/register.html" class="btn-register">Get Started</a>
        </div>
        `;
    }
    
    return `
    <div class="user-menu logged-in">
        <button class="user-avatar-btn" onclick="Bridge55Auth.toggleUserDropdown()">
            <img src="${session.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + session.name}" 
                 alt="${session.name}" class="user-avatar">
            <span class="user-name">${session.name?.split(' ')[0] || 'User'}</span>
        </button>
        
        <div class="user-dropdown" id="userDropdown">
            <div class="dropdown-header">
                <img src="${session.avatar}" alt="" class="dropdown-avatar">
                <div>
                    <div class="dropdown-name">${session.name}</div>
                    <div class="dropdown-email">${session.email || ''}</div>
                </div>
            </div>
            <div class="dropdown-divider"></div>
            <a href="user/profile.html" class="dropdown-item">
                <i class="fa fa-user"></i> My Profile
            </a>
            <a href="user/bookings.html" class="dropdown-item">
                <i class="fa fa-suitcase"></i> My Trips
            </a>
            <a href="user/wallet.html" class="dropdown-item">
                <i class="fa fa-wallet"></i> BridgeWallet
            </a>
            <a href="user/settings.html" class="dropdown-item">
                <i class="fa fa-cog"></i> Settings
            </a>
            ${hasAnyRole(['admin', 'super-admin']) ? `
            <div class="dropdown-divider"></div>
            <a href="admin/" class="dropdown-item">
                <i class="fa fa-shield"></i> Admin Panel
            </a>
            ` : ''}
            <div class="dropdown-divider"></div>
            <button class="dropdown-item logout" onclick="Bridge55Auth.logout()">
                <i class="fa fa-sign-out"></i> Sign Out
            </button>
        </div>
    </div>
    `;
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Toggle user dropdown menu
 */
export function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

/**
 * Logout and redirect
 * @param {string} redirectUrl - URL to redirect after logout
 */
export function logout(redirectUrl = '/') {
    clearSession();
    window.location.href = redirectUrl;
}

/**
 * Social login handler (placeholder)
 * @param {string} provider - 'google', 'apple', 'facebook'
 */
export function socialLogin(provider) {
    console.log(`Social login with ${provider} - implement OAuth flow`);
    // In production, this would initiate OAuth flow
    alert(`${provider} login coming soon!`);
}

/**
 * Require authentication - redirect if not logged in
 * @param {string} loginUrl - Login page URL
 */
export function requireAuth(loginUrl = '/user/login.html') {
    if (!isLoggedIn()) {
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = `${loginUrl}?redirect=${currentUrl}`;
        return false;
    }
    return true;
}

/**
 * Require specific role - redirect if not authorized
 * @param {string|Array} roles - Required role(s)
 * @param {string} unauthorizedUrl - Redirect URL if not authorized
 */
export function requireRole(roles, unauthorizedUrl = '/unauthorized.html') {
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    
    if (!hasAnyRole(rolesArray)) {
        window.location.href = unauthorizedUrl;
        return false;
    }
    return true;
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTO-INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════

if (typeof window !== 'undefined') {
    window.Bridge55Auth = {
        getSession,
        setSession,
        clearSession,
        isLoggedIn,
        hasRole,
        hasAnyRole,
        getWallet,
        updateWallet,
        addTransaction,
        loginAsDemo,
        renderLoginForm,
        renderUserMenu,
        toggleUserDropdown,
        logout,
        socialLogin,
        requireAuth,
        requireRole,
        DEMO_USERS
    };
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('userDropdown');
        const avatarBtn = document.querySelector('.user-avatar-btn');
        
        if (dropdown && !dropdown.contains(e.target) && !avatarBtn?.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}





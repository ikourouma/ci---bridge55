# 🌍 Bridge55 React Navigation App

Complete React + TypeScript implementation of Bridge55's federated navigation system.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to the project folder
cd bridge55-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

---

## 📁 Project Structure

```
bridge55-app/
├── src/
│   ├── components/
│   │   └── navigation/
│   │       ├── TopNav.tsx          # Top navigation bar
│   │       ├── SideMenu.tsx        # Hamburger side menu
│   │       └── BottomNav.tsx       # Mobile bottom navigation
│   ├── config/
│   │   ├── countries.ts            # Country configurations
│   │   └── navigation.ts           # Menu configurations
│   ├── types/
│   │   ├── country.ts              # Country-related types
│   │   └── navigation.ts           # Navigation types
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Tailwind CSS
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ✨ Features Implemented

### ✅ Top Navigation
- Sticky header that follows on scroll
- Logo with optional country name
- Desktop navigation links
- Language & currency selectors
- Notifications with badge
- Responsive design

### ✅ Side Menu (Hamburger)
- Slide-in animation
- Adaptive content (Pan-African vs Country-Specific)
- Collapsible sections
- Icon support (Lucide icons)
- Sub-menu support
- ESC key to close
- Click overlay to close

### ✅ Bottom Navigation (Mobile)
- 5 tabs: Home, Explore, AI, Trips, Account
- Active state styling
- Smooth transitions
- Touch-optimized

### ✅ Adaptive Navigation
- Pan-African mode: "Discover Africa"
- Country-Specific mode: "Discover Côte d'Ivoire"
- Dynamic menu generation
- Role-based menu items

---

## 🎨 Customization

### Change Platform Mode

Edit `src/App.tsx`:

```typescript
// Pan-African Mode
const platformMode = 'pan-african';
const countryCode = undefined;
const countryName = undefined;

// Country-Specific Mode (Côte d'Ivoire)
const platformMode = 'country-specific';
const countryCode = 'CI';
const countryName = "Côte d'Ivoire";
```

### Add New Country

1. Edit `src/config/countries.ts`
2. Add new config following the example
3. Update `COUNTRY_CONFIGS` object

### Customize Menu Items

Edit `src/config/navigation.ts`:
- Modify `getMenuConfig` function
- Add/remove sections
- Change menu items
- Update icons

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#FF6B35',  // Your color here
    // ...
  }
}
```

---

## 🎯 Key Components

### TopNav
**Location**: `src/components/navigation/TopNav.tsx`

**Props:**
- `onMenuClick: () => void` - Callback when hamburger clicked
- `platformMode?: 'pan-african' | 'country-specific'`
- `countryName?: string` - Display country name in logo

**Features:**
- Scroll detection
- Language/currency switchers
- Notification badge
- Responsive design

### SideMenu
**Location**: `src/components/navigation/SideMenu.tsx`

**Props:**
- `isOpen: boolean` - Menu open state
- `onClose: () => void` - Callback to close menu
- `sections: MenuSection[]` - Menu configuration

**Features:**
- Slide-in animation
- Overlay backdrop
- ESC key support
- Body scroll lock
- Collapsible sections
- Sub-menus

### BottomNav
**Location**: `src/components/navigation/BottomNav.tsx`

**Features:**
- Fixed bottom position
- 5 main tabs
- Active state
- Only visible on mobile (<1024px)

---

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 📱 Responsive Breakpoints

```
Mobile: < 768px
  - Bottom navigation visible
  - Hamburger menu
  - Simplified top nav

Tablet: 768px - 1023px
  - No bottom navigation
  - Hamburger menu
  - More top nav items

Desktop: ≥ 1024px
  - Full top navigation
  - No bottom navigation
  - All features visible
```

---

## 🎨 Design Tokens

### Colors
```
Primary: #FF6B35 (Bridge55 Orange)
Secondary: #004E89 (Professional Blue)
Accent: #F7B32B (Golden Yellow)
Success: #00A86B (Green)
```

### Typography
```
Font: System font stack (-apple-system, BlinkMacSystemFont, etc.)
Sizes: text-xs (12px) to text-5xl (48px)
Weights: 400 (normal) to 800 (extrabold)
```

### Spacing
```
Nav Height: 64px
Bottom Nav Height: 64px
Side Menu Width: 320px (max 85% on mobile)
```

---

## 🔧 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **PostCSS** - CSS processing

---

## 🚀 Next Steps

### Immediate Enhancements
1. **Add React Router** for actual navigation
2. **Connect to Supabase** for backend
3. **Implement user authentication**
4. **Add search functionality**
5. **Build service pages** (Flights, Stays, etc.)

### Future Features
1. **BridgeAI integration** (chat interface)
2. **User profile management**
3. **Booking flow**
4. **Payment integration**
5. **Operator portal**
6. **Mobile app** (React Native)

---

## 📚 Related Documentation

See the project documentation files:
- `README.md` - Project overview
- `ARCHITECTURE.md` - System architecture
- `NAVIGATION_SPEC.md` - Complete navigation specs
- `IMPLEMENTATION_ROADMAP.md` - Development timeline

---

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Module not found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind not working
```bash
# Rebuild CSS
npm run build
```

---

## 📝 Notes

### Icon Names
Icons use Lucide React. Convert kebab-case to PascalCase:
- `home` → `Home`
- `map-pin` → `MapPin`
- `chevron-down` → `ChevronDown`

### Menu Configuration
Menu dynamically changes based on:
- Platform mode (pan-african vs country-specific)
- User role (traveler, operator, admin)
- Country code

### Performance
- Code splitting ready (via Vite)
- Lazy loading icons
- Optimized Tailwind CSS
- Production build < 200KB

---

## ✅ What's Working

- ✅ Top navigation (desktop & mobile)
- ✅ Side menu with animations
- ✅ Bottom navigation (mobile)
- ✅ Responsive design
- ✅ Adaptive content (Pan-African vs Country)
- ✅ Icon system (Lucide)
- ✅ TypeScript types
- ✅ Tailwind styling
- ✅ Smooth animations
- ✅ Accessibility basics

---

## 🎉 You're Ready!

This is a fully functional navigation system. Now you can:

1. **Customize** the design
2. **Add** more pages
3. **Connect** to backend
4. **Deploy** to production

**Happy building!** 🚀🌍

---

**Version**: 1.0.0
**Last Updated**: November 12, 2025
**Status**: ✅ Ready to Use

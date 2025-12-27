# 🎨 Figma-Ready Design Specifications
## Country-Specific Tourism Board Platform

> **Version:** 1.0  
> **Last Updated:** December 25, 2025  
> **Primary Demo:** Côte d'Ivoire Tourism Board

---

## 📐 Design System Overview

### Grid System
- **Base Unit:** 8px
- **Container Max Width:** 1440px
- **Content Max Width:** 1200px
- **Gutter:** 24px
- **Columns:** 12

### Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| `xs` | 320px | Small phones |
| `sm` | 375px | Standard phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1440px | Large screens |

---

## 🎨 Color Palette

### Côte d'Ivoire Theme

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--primary` | `#FF8C00` | 255, 140, 0 | Primary buttons, links, accents |
| `--primary-dark` | `#E67300` | 230, 115, 0 | Hover states |
| `--primary-light` | `#FFF3E6` | 255, 243, 230 | Backgrounds |
| `--secondary` | `#00954A` | 0, 149, 74 | Secondary accents |
| `--secondary-dark` | `#007A3D` | 0, 122, 61 | Hover states |

### Neutrals

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--gray-900` | `#1F2937` | 31, 41, 55 | Primary text |
| `--gray-700` | `#374151` | 55, 65, 81 | Secondary text |
| `--gray-500` | `#6B7280` | 107, 114, 128 | Muted text |
| `--gray-400` | `#9CA3AF` | 156, 163, 175 | Placeholder |
| `--gray-200` | `#E5E7EB` | 229, 231, 235 | Borders |
| `--gray-100` | `#F3F4F6` | 243, 244, 246 | Light bg |
| `--gray-50` | `#F9FAFB` | 249, 250, 251 | Page bg |
| `--white` | `#FFFFFF` | 255, 255, 255 | Cards, panels |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--success` | `#10B981` | Success states |
| `--warning` | `#F59E0B` | Warnings |
| `--error` | `#EF4444` | Errors |
| `--info` | `#3B82F6` | Information |

---

## 📝 Typography

### Font Family
**Primary:** Inter  
**Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

### Type Scale

| Style | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `display` | 48px | 800 | 1.1 | -0.02em |
| `h1` | 36px | 700 | 1.2 | -0.01em |
| `h2` | 30px | 700 | 1.25 | -0.01em |
| `h3` | 24px | 600 | 1.3 | 0 |
| `h4` | 20px | 600 | 1.35 | 0 |
| `h5` | 18px | 600 | 1.4 | 0 |
| `body-lg` | 18px | 400 | 1.6 | 0 |
| `body` | 16px | 400 | 1.5 | 0 |
| `body-sm` | 14px | 400 | 1.5 | 0 |
| `caption` | 12px | 400 | 1.4 | 0.02em |
| `overline` | 12px | 600 | 1.4 | 0.1em |

---

## 📏 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Small gaps |
| `--space-3` | 12px | Compact spacing |
| `--space-4` | 16px | Default padding |
| `--space-5` | 20px | Medium spacing |
| `--space-6` | 24px | Section padding |
| `--space-8` | 32px | Large gaps |
| `--space-10` | 40px | Extra large |
| `--space-12` | 48px | Section gaps |
| `--space-16` | 64px | Page sections |
| `--space-20` | 80px | Hero sections |
| `--space-24` | 96px | Major sections |

---

## 🔲 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Small elements, badges |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Large cards |
| `--radius-2xl` | 24px | Modal, panels |
| `--radius-full` | 9999px | Pills, avatars |

---

## 🌫️ Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | Cards |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Dropdowns |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1)` | Modals |
| `--shadow-2xl` | `0 25px 50px -12px rgba(0,0,0,0.25)` | Hero overlays |

---

## 📱 Header Component Specifications

### Overall Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           UTILITY BAR (40px)                                │
│  Height: 40px | Background: #111827 | Text: rgba(255,255,255,0.9)          │
├─────────────────────────────────────────────────────────────────────────────┤
│                           MAIN NAV (80px)                                   │
│  Height: 80px | Background: #FFFFFF | Border-bottom: 1px solid #E5E7EB     │
├─────────────────────────────────────────────────────────────────────────────┤
│                           MEGA MENU (variable)                              │
│  Border-top: 3px solid #FF8C00 | Padding: 48px 24px                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Utility Bar (40px)

| Element | Specification |
|---------|---------------|
| **Height** | 40px |
| **Background** | `#111827` (gray-900) |
| **Padding** | 0 24px |
| **Font Size** | 14px |
| **Font Weight** | 500 |
| **Text Color** | `rgba(255,255,255,0.9)` |
| **Link Hover** | `#FF8C00` (primary) |

**Language Selector:**
- Background: `rgba(255,255,255,0.1)`
- Border Radius: 4px
- Padding: 4px 8px
- Active Button: `#FF8C00` bg, white text

### Main Navigation (80px)

| Element | Specification |
|---------|---------------|
| **Height** | 80px |
| **Background** | `#FFFFFF` |
| **Border Bottom** | 1px solid `#E5E7EB` |
| **Container Padding** | 0 24px |
| **Max Width** | 1440px |

**Logo:**
- Flag Size: 40px × 28px
- Flag Border Radius: 4px
- Gap (flag to text): 12px
- "visit" Size: 14px, weight 500, color `#FF8C00`
- Country Name: 18px, weight 800, color `#1F2937`

**Nav Links:**
- Font Size: 16px
- Font Weight: 500
- Padding: 12px 16px
- Color: `#1F2937`
- Hover Color: `#FF8C00`
- Hover Background: `rgba(255,140,0,0.05)`
- Border Radius: 8px
- Active Indicator: 3px bottom border `#FF8C00`

**eVisa Button:**
- Padding: 8px 20px
- Background: `#FF8C00`
- Color: `#FFFFFF`
- Font Size: 14px
- Font Weight: 600
- Border Radius: 8px
- Hover: `#E67300` bg, translateY(-1px)

**Icon Buttons:**
- Size: 40px × 40px
- Border: 1px solid `#E5E7EB`
- Border Radius: 50%
- Icon Size: 16px
- Hover Border: `#FF8C00`

### Mega Menu Panel

| Element | Specification |
|---------|---------------|
| **Position** | Absolute, below main nav |
| **Width** | 100% |
| **Background** | `#FFFFFF` |
| **Border Top** | 3px solid `#FF8C00` |
| **Shadow** | `0 10px 40px rgba(0,0,0,0.12)` |
| **Padding** | 48px 24px |
| **Animation** | 300ms ease-out slide |

**Grid Layout:**
- Columns: `1fr 1fr 1.5fr`
- Gap: 48px
- Max Width: 1440px (centered)

**Column 1 & 2 Links:**
- Font Size: 16px
- Color: `#6B7280`
- Padding: 8px 0
- Hover Color: `#FF8C00`
- Hover Padding-Left: 8px

**Category Header:**
- Font Size: 18px
- Font Weight: 600
- Color: `#FF8C00`
- Margin Bottom: 12px
- Arrow: 16px, transitions right on hover

**Divider:**
- Height: 1px
- Background: `#E5E7EB`
- Margin: 12px 0

**Hero Column:**
- Background: linear-gradient(180deg, `#F9FAFB` 0%, `#FFFFFF` 100%)
- Border Radius: 16px
- Padding: 24px

**Hero Title:**
- Font Size: 24px
- Font Weight: 700
- Color: `#FF8C00`
- Margin Bottom: 12px

**Hero Description:**
- Font Size: 14px
- Color: `#6B7280`
- Line Height: 1.6
- Margin Bottom: 16px

**Hero Image:**
- Width: 100%
- Height: 180px
- Object Fit: cover
- Border Radius: 12px

**Featured Card:**
- Background: `#FFFFFF`
- Border Radius: 12px
- Shadow: `0 1px 2px rgba(0,0,0,0.05)`
- Padding: 16px
- Gap: 16px
- Image Size: 60px × 60px
- Image Border Radius: 8px
- Title: 14px, weight 600
- Subtitle: 12px, color `#9CA3AF`

---

## 📱 Mobile Navigation Specifications

### Mobile Header (768px and below)

| Element | Specification |
|---------|---------------|
| **Height** | 80px (utility bar hidden) |
| **Hamburger Size** | 44px × 44px |
| **Hamburger Lines** | 24px × 2px, gap 5px |

### Mobile Menu

| Element | Specification |
|---------|---------------|
| **Position** | Fixed, below header |
| **Background** | `#FFFFFF` |
| **Animation** | translateX slide, 300ms |
| **Padding** | 24px |

**Accordion Item:**
- Border Bottom: 1px solid `#E5E7EB`
- Padding: 16px 0
- Font Size: 18px
- Font Weight: 500
- Arrow transitions rotate(180deg)

**Submenu Links:**
- Padding: 8px 16px
- Font Size: 16px
- Color: `#6B7280`

**CTA Button:**
- Width: 100%
- Padding: 16px
- Margin Top: 24px

**Language Toggle:**
- Background: `#F3F4F6`
- Border Radius: 12px
- Padding: 16px
- Gap: 16px

---

## 🧩 Component Library

### Button Variants

| Variant | Background | Text | Border | Padding |
|---------|------------|------|--------|---------|
| Primary | `#FF8C00` | white | none | 12px 24px |
| Primary Large | `#FF8C00` | white | none | 16px 32px |
| Secondary | `#00954A` | white | none | 12px 24px |
| Outline | transparent | `#FF8C00` | 2px `#FF8C00` | 10px 22px |
| Ghost | transparent | `#FF8C00` | none | 12px 24px |

**Button States:**
- Hover: darken 10%, translateY(-1px)
- Active: darken 15%
- Disabled: opacity 0.5, cursor not-allowed

### Card Component

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border Radius | 12px |
| Shadow | `0 1px 2px rgba(0,0,0,0.05)` |
| Hover Shadow | `0 4px 6px rgba(0,0,0,0.1)` |
| Padding | 24px |
| Image Border Radius | 8px (top corners for full-width) |

### Input Component

| Property | Value |
|----------|-------|
| Height | 48px |
| Border | 1px solid `#E5E7EB` |
| Border Radius | 8px |
| Padding | 12px 16px |
| Font Size | 16px |
| Focus Border | `#FF8C00` |
| Focus Shadow | `0 0 0 3px rgba(255,140,0,0.1)` |

### Badge Component

| Variant | Background | Text | Padding |
|---------|------------|------|---------|
| Default | `#F3F4F6` | `#374151` | 4px 8px |
| Primary | `#FFF3E6` | `#FF8C00` | 4px 8px |
| Success | `#D1FAE5` | `#059669` | 4px 8px |
| Warning | `#FEF3C7` | `#D97706` | 4px 8px |
| Error | `#FEE2E2` | `#DC2626` | 4px 8px |

---

## 📐 Layout Templates

### Landing Page Hero

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Height: 600px (desktop) / 500px (mobile)                                  │
│  Background: Full-bleed image with gradient overlay                        │
│  Overlay: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))               │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  Container: max-width 1200px, centered                               │  │
│  │  Content: max-width 600px, left-aligned                              │  │
│  │                                                                      │  │
│  │  Headline: 48px, white, weight 800                                   │  │
│  │  Subheadline: 20px, white, weight 400, opacity 0.9                   │  │
│  │  CTA Button: 16px padding, primary                                   │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Search Bar (optional):                                                    │
│  Position: absolute bottom -40px                                           │
│  Background: white                                                         │
│  Shadow: xl                                                                │
│  Border Radius: 16px                                                       │
│  Padding: 24px                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Card Grid

```
Desktop (1280px+):     4 columns, gap 24px
Laptop (1024px):       3 columns, gap 24px
Tablet (768px):        2 columns, gap 16px
Mobile (<768px):       1 column, gap 16px (or horizontal scroll)
```

### Section Spacing

| Element | Desktop | Mobile |
|---------|---------|--------|
| Section Padding | 80px 0 | 48px 0 |
| Section Title | 36px, mb 16px | 28px, mb 12px |
| Section Subtitle | 18px, mb 48px | 16px, mb 32px |
| Grid Gap | 24px | 16px |

---

## 🎯 Figma Frame Sizes

### Desktop Frames
- **Landing Page:** 1440 × 3000 (scrollable)
- **List Page:** 1440 × 2500
- **Detail Page:** 1440 × 4000
- **Checkout:** 1440 × 2000
- **Dashboard:** 1440 × 1200

### Mobile Frames
- **iPhone 14 Pro:** 393 × 852
- **iPhone SE:** 375 × 667
- **Landing (full):** 375 × 3500

### Component Frames
- **Header:** 1440 × 120
- **Mega Menu:** 1440 × 400
- **Footer:** 1440 × 400
- **Card:** 320 × 400
- **Button Set:** 400 × 200

---

## ✅ Figma Export Settings

### Assets
- **Icons:** SVG (outline stroke)
- **Images:** 2x resolution
- **Logos:** SVG + PNG @1x, @2x, @3x

### Handoff
- Use Figma Dev Mode
- Include CSS variables
- Export as design tokens JSON

---

*Design Specifications v1.0 | December 25, 2025*




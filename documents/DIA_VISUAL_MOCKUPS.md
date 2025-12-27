# 🎨 DIA AI ASSISTANT - VISUAL MOCKUP SPECIFICATIONS

## 📱 SCREEN-BY-SCREEN DETAILED MOCKUPS

---

## 🏠 SCREEN 1: WELCOME / LANDING STATE

### **Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [Bridge55]                            [× Close]    │ ← 60px header
├─────────────────────────────────────────────────────┤
│                                                     │
│                                                     │
│                    💜                               │ ← 100px from top
│                                                     │
│                 Hi, I'm Dia!                        │ ← 36px, Bold
│                                                     │
│         Your AI travel friend for Africa            │ ← 18px, Regular
│                                                     │
│                                                     │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │  Where would you like to explore? 🌍         │ │ ← Input field
│  └───────────────────────────────────────────────┘ │
│                                                     │
│                                                     │
│  Or try asking:                                     │ ← 14px, Gray
│                                                     │
│  • Plan a 7-day safari in Kenya                    │ ← Clickable
│  • Find beach resorts in Zanzibar                  │
│  • Best time to visit Victoria Falls               │
│  • Complete Morocco itinerary                      │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│  Trusted by 50,000+ travelers across Africa        │ ← Trust signal
│                                                     │
└─────────────────────────────────────────────────────┘
```

### **Specifications:**

**Colors:**
- Background: `#FFFFFF`
- Dia icon: `#7C3AED` (purple)
- Primary text: `#1F2937` (dark gray)
- Secondary text: `#6B7280` (medium gray)
- Input border: `#E5E7EB` (light gray)
- Input focus: `#7C3AED` (purple)

**Typography:**
- "Hi, I'm Dia!": `Inter Bold 36px`
- Subtitle: `Inter Regular 18px`
- Input placeholder: `Inter Regular 16px`
- Suggestions: `Inter Regular 15px`
- Trust text: `Inter Regular 13px, #9CA3AF`

**Spacing:**
- Icon to heading: `24px`
- Heading to subtitle: `16px`
- Subtitle to input: `48px`
- Input to suggestions: `32px`
- Between suggestions: `16px`

**Input Field:**
- Height: `56px`
- Padding: `16px 20px`
- Border: `2px solid #E5E7EB`
- Border radius: `12px`
- Focus border: `2px solid #7C3AED`
- Shadow on focus: `0 0 0 4px rgba(124, 58, 237, 0.1)`

---

## 💬 SCREEN 2: CONVERSATION STARTED

### **Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [Bridge55]     Dia                    [× Close]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────┐          │
│  │                                      │          │ ← Dia's message
│  │  Hi! I'm Dia 👋                      │          │
│  │                                      │          │
│  │  I'm your personal travel friend     │          │
│  │  for Africa.                         │          │
│  │                                      │          │
│  │  What adventure are you dreaming     │          │
│  │  about?                              │          │
│  │                                      │          │
│  └──────────────────────────────────────┘          │
│                                                     │
│                     ┌──────────────────────────┐   │
│                     │                          │   │ ← User's message
│                     │  I want to go on safari  │   │
│                     │  in Kenya                │   │
│                     │                          │   │
│                     └──────────────────────────┘   │
│                                                     │
│  ┌──────────────────────────────────────┐          │
│  │                                      │          │
│  │  Exciting! 🦁 Let me help you find   │          │
│  │  the perfect safari.                 │          │
│  │                                      │          │
│  │  A few quick questions:              │          │
│  │                                      │          │
│  │  🗓️ When are you thinking?           │          │
│  │                                      │          │
│  │  [This Month] [Next Month] [Flexible]│          │ ← Quick replies
│  │                                      │          │
│  └──────────────────────────────────────┘          │
│                                                     │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │  Type your message...                         │ │ ← Input
│  └───────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### **Specifications:**

**Message Bubbles (Dia):**
- Background: `#F5F3FF` (light purple)
- Text color: `#1F2937` (dark gray)
- Padding: `16px 20px`
- Border radius: `18px 18px 18px 4px` (pointed bottom-left)
- Max width: `75%`
- Margin bottom: `12px`
- Font: `Inter Regular 16px`
- Line height: `1.6`

**Message Bubbles (User):**
- Background: `#F3F4F6` (light gray)
- Text color: `#1F2937`
- Padding: `16px 20px`
- Border radius: `18px 18px 4px 18px` (pointed bottom-right)
- Max width: `75%`
- Align: `right`
- Margin bottom: `12px`

**Quick Reply Buttons:**
- Background: `#FFFFFF`
- Border: `2px solid #E5E7EB`
- Padding: `10px 20px`
- Border radius: `24px` (full pill)
- Font: `Inter Medium 14px`
- Color: `#4B5563`
- Hover: `border-color: #7C3AED, background: #F5F3FF`
- Active: `background: #7C3AED, color: #FFFFFF`
- Min width: `100px`
- Height: `44px`
- Gap between: `8px`

---

## 🎴 SCREEN 3: VISUAL RESULTS EMBEDDED

### **Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [Bridge55]     Dia                    [× Close]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────┐          │
│  │                                      │          │
│  │  Perfect! I found 3 amazing safaris  │          │
│  │  for you in Kenya 🇰🇪                │          │
│  │                                      │          │
│  │  Here's my top pick:                 │          │
│  │                                      │          │
│  └──────────────────────────────────────┘          │
│                                                     │
│  ┌────────────────────────────────────────────────┐│
│  │ ┌──────────────────────────────────────────┐  ││ ← Result card
│  │ │ [Photo: Masai Mara landscape]            │  ││
│  │ │ • • • ○ ○                                │  ││ ← Gallery dots
│  │ └──────────────────────────────────────────┘  ││
│  │                                                ││
│  │  🦁 3-Day Masai Mara Safari                   ││
│  │                                                ││
│  │  ⭐ 4.9 (342 reviews) • Nairobi                ││
│  │  [🏠 Tour Package]                             ││
│  │                                                ││
│  │  Highlights:                                   ││
│  │  ✓ All meals included                         ││
│  │  ✓ Expert safari guide                        ││
│  │  ✓ Daily game drives                          ││
│  │  ✓ Luxury tented camp                         ││
│  │                                                ││
│  │  💰 $450 per person                            ││
│  │  $900 total for 2 guests                       ││
│  │                                                ││
│  │  ✅ Free cancellation until 48h before         ││
│  │                                                ││
│  │  [View Full Details]  [Book Now →]            ││
│  │                                                ││
│  └────────────────────────────────────────────────┘│
│                                                     │
│  ┌──────────────────────────────────────┐          │
│  │                                      │          │
│  │  This is our most popular safari!    │          │
│  │                                      │          │
│  │  Want to see 2 more options?         │          │
│  │                                      │          │
│  │  [Yes, show more] [This is perfect!] │          │
│  │                                      │          │
│  └──────────────────────────────────────┘          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### **Specifications:**

**Result Card:**
- Background: `#FFFFFF`
- Border: `1px solid #E5E7EB`
- Border radius: `12px`
- Padding: `16px`
- Margin: `12px 0`
- Shadow: `0 2px 8px rgba(0, 0, 0, 0.08)`
- Hover shadow: `0 4px 16px rgba(0, 0, 0, 0.12)`

**Photo Gallery:**
- Height: `200px`
- Border radius: `8px`
- Margin bottom: `12px`
- Gallery dots: `6px diameter, 4px gap`
- Active dot: `#7C3AED`
- Inactive dot: `#D1D5DB`

**Title:**
- Font: `Inter Bold 18px`
- Color: `#1F2937`
- Margin bottom: `8px`

**Rating & Location:**
- Font: `Inter Medium 14px`
- Star: `#F59E0B` (amber)
- Reviews: `#6B7280` (gray)
- Location: `#6B7280`

**Badge (Tour Package):**
- Background: `#F3F4F6`
- Color: `#4B5563`
- Padding: `4px 12px`
- Border radius: `12px`
- Font: `Inter Medium 12px`

**Highlights List:**
- Font: `Inter Regular 14px`
- Color: `#4B5563`
- Line height: `1.8`
- Checkmark: `#10B981` (green)

**Price:**
- Primary: `Inter Bold 24px, #1F2937`
- Secondary: `Inter Regular 14px, #6B7280`

**Free Cancellation Badge:**
- Background: `#D1FAE5` (light green)
- Color: `#065F46` (dark green)
- Font: `Inter Medium 12px`
- Padding: `6px 12px`
- Border radius: `6px`

**Action Buttons:**
- "View Full Details": 
  - Background: `transparent`
  - Border: `2px solid #7C3AED`
  - Color: `#7C3AED`
  - Padding: `12px 24px`
  - Border radius: `8px`
  
- "Book Now":
  - Background: `linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)`
  - Color: `#FFFFFF`
  - Padding: `12px 32px`
  - Border radius: `8px`
  - Shadow: `0 4px 12px rgba(124, 58, 237, 0.3)`

---

## 🎯 SCREEN 4: EXPANDED DETAILS IN CHAT

### **Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [← Back]       Masai Mara Safari      [× Close]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────────────────────────────────────────────┐│
│  │ [Photo Gallery - Swipeable]                    ││
│  │ ← [Photo 1 of 12] →                            ││
│  └────────────────────────────────────────────────┘│
│                                                     │
│  🦁 3-Day Masai Mara Safari                         │
│  Departing from Nairobi                             │
│                                                     │
│  ⭐ 4.9 Exceptional (342 reviews)                   │
│  🏆 Top Rated Safari                                │
│                                                     │
│  ────────────────────────────────────────────       │
│                                                     │
│  📅 Your Dates: Jun 15-17, 2025                     │
│  👥 Guests: 2 adults                                │
│                                                     │
│  💰 Price Breakdown:                                │
│  Safari package (2 guests) .......... $800          │
│  Park fees .......................... $100          │
│  ────────────────────────────────────               │
│  Total ............................... $900          │
│                                                     │
│  ✅ Free cancellation until Jun 13                  │
│                                                     │
│  ────────────────────────────────────────────       │
│                                                     │
│  What's Included:                                   │
│  ✓ 2 nights luxury tented accommodation            │
│  ✓ All meals (breakfast, lunch, dinner)            │
│  ✓ 6 game drives with expert guide                 │
│  ✓ Park entrance fees                               │
│  ✓ Transportation from/to Nairobi                   │
│  ✓ Bottled water during drives                      │
│                                                     │
│  ────────────────────────────────────────────       │
│                                                     │
│  Itinerary:                                         │
│                                                     │
│  Day 1: Nairobi → Masai Mara                        │
│  • 6:00 AM pickup from hotel                        │
│  • Scenic drive through Rift Valley                 │
│  • Afternoon game drive                             │
│  • Sunset at camp                                   │
│                                                     │
│  [See Full Itinerary ▼]                             │
│                                                     │
│  ────────────────────────────────────────────       │
│                                                     │
│  ⚠️ Only 2 spots left at this price!                │
│                                                     │
│  [Reserve Now - $900]                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### **Specifications:**

**Header:**
- Background: `#FFFFFF`
- Border bottom: `1px solid #E5E7EB`
- Padding: `16px`
- Back button: `#7C3AED`

**Photo Gallery:**
- Height: `300px` (desktop), `250px` (mobile)
- Swipeable
- Arrows on hover (desktop)
- Photo counter: `Inter Medium 14px, #FFFFFF`
- Overlay gradient: `linear-gradient(0deg, rgba(0,0,0,0.3), transparent)`

**Section Dividers:**
- Border: `1px solid #E5E7EB`
- Margin: `24px 0`

**Price Breakdown:**
- Dotted lines between items
- Item: `Inter Regular 15px`
- Price: `Inter Medium 15px`
- Total: `Inter Bold 18px`

**Urgency Badge:**
- Background: `#FEF3C7` (light yellow)
- Color: `#92400E` (dark yellow)
- Border: `1px solid #FCD34D`
- Icon: `⚠️`
- Padding: `12px 16px`
- Border radius: `8px`
- Font: `Inter Medium 14px`

**Reserve Button:**
- Full width
- Height: `56px`
- Background: `linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)`
- Color: `#FFFFFF`
- Font: `Inter Bold 16px`
- Border radius: `12px`
- Shadow: `0 8px 24px rgba(124, 58, 237, 0.4)`
- Hover: Lift effect with increased shadow

---

## 📊 SCREEN 5: MULTIPLE OPTIONS COMPARISON

### **Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [Bridge55]     Dia                    [× Close]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────┐          │
│  │                                      │          │
│  │  Great! Here are 3 safaris, each     │          │
│  │  with something special:             │          │
│  │                                      │          │
│  └──────────────────────────────────────┘          │
│                                                     │
│  ┌────────────────────────────────────┐            │
│  │ 🏆 MOST POPULAR                    │            │ ← Badge
│  │                                    │            │
│  │ [Photo] 3-Day Masai Mara           │            │
│  │                                    │            │
│  │ ⭐ 4.9 (342) • $450/person          │            │
│  │ ✓ All meals • Expert guide         │            │
│  │                                    │            │
│  │ [Details] [Book →]                 │            │
│  └────────────────────────────────────┘            │
│                                                     │
│  ┌────────────────────────────────────┐            │
│  │ 💎 BEST VALUE                      │            │
│  │                                    │            │
│  │ [Photo] 5-Day Amboseli             │            │
│  │                                    │            │
│  │ ⭐ 4.7 (156) • $320/person          │            │
│  │ ✓ See Mt. Kilimanjaro • Elephants │            │
│  │                                    │            │
│  │ [Details] [Book →]                 │            │
│  └────────────────────────────────────┘            │
│                                                     │
│  ┌────────────────────────────────────┐            │
│  │ ✨ MOST UNIQUE                     │            │
│  │                                    │            │
│  │ [Photo] 7-Day Migration Safari     │            │
│  │                                    │            │
│  │ ⭐ 5.0 (89) • $890/person           │            │
│  │ ✓ Witness migration • Luxury camp  │            │
│  │                                    │            │
│  │ [Details] [Book →]                 │            │
│  └────────────────────────────────────┘            │
│                                                     │
│  ┌──────────────────────────────────────┐          │
│  │                                      │          │
│  │  Still deciding? I can:              │          │
│  │                                      │          │
│  │  • Compare these side-by-side        │          │
│  │  • Show more options                 │          │
│  │  • Answer any questions              │          │
│  │                                      │          │
│  │  What would help?                    │          │
│  │                                      │          │
│  └──────────────────────────────────────┘          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### **Specifications:**

**Category Badges:**
- "Most Popular": `#7C3AED background, #FFFFFF text`
- "Best Value": `#10B981 background, #FFFFFF text`
- "Most Unique": `#F59E0B background, #FFFFFF text`
- Font: `Inter Bold 11px uppercase`
- Padding: `4px 12px`
- Position: `absolute top-left`
- Border radius: `8px 0 8px 0`

**Compact Cards:**
- Height: `auto` (flexible)
- Padding: `16px`
- Border: `1px solid #E5E7EB`
- Margin bottom: `12px`
- Image: `80px × 80px` (small thumbnail)
- Image position: `left`

**Card Layout (Horizontal):**
```
┌──────────────────────────────┐
│ [Img] Title                  │
│       Rating • Price         │
│       Features...            │
│       [Details] [Book]       │
└──────────────────────────────┘
```

---

## 💬 SCREEN 6: CHATBOT WIDGET (COLLAPSED)

### **Layout (Bottom-Right Corner):**
```
                              ┌────────────┐
                              │    💜      │ ← Chat bubble
                              │            │
                              │  Need help?│
                              │  Ask Dia!  │
                              │            │
                              └────────────┘
                                    ↑
                           [56×56px button]
```

### **Specifications:**

**Collapsed State:**
- Size: `56px × 56px`
- Position: `fixed bottom-right`
- Offset: `24px from bottom, 24px from right`
- Background: `linear-gradient(135deg, #7C3AED, #EC4899)`
- Shadow: `0 4px 16px rgba(124, 58, 237, 0.4)`
- Icon: `💜` or custom Dia icon
- Pulse animation on first load

**Tooltip (on hover):**
- Background: `#1F2937`
- Color: `#FFFFFF`
- Padding: `8px 12px`
- Border radius: `8px`
- Font: `Inter Medium 13px`
- Appears 300ms after hover

**Badge (unread messages):**
- Size: `20px × 20px`
- Background: `#EF4444` (red)
- Color: `#FFFFFF`
- Position: `absolute top-right (-4px, -4px)`
- Font: `Inter Bold 11px`
- Shows message count

---

## 💬 SCREEN 7: CHATBOT WIDGET (EXPANDED)

### **Layout:**
```
                    ┌──────────────────────────┐
                    │ Dia • Online        [─][×]│ ← Header
                    ├──────────────────────────┤
                    │                          │
                    │ ┌──────────────────────┐ │
                    │ │ Hi! 👋              │ │
                    │ │ How can I help?     │ │
                    │ └──────────────────────┘ │
                    │                          │
                    │        ┌───────────────┐ │
                    │        │ Show me Kenya │ │
                    │        │ safaris       │ │
                    │        └───────────────┘ │
                    │                          │
                    │ [Quick suggestions...]   │
                    │                          │
                    ├──────────────────────────┤
                    │ [Type message...]    [→] │ ← Input
                    └──────────────────────────┘
                         ↑
                  [360×520px window]
```

### **Specifications:**

**Expanded State:**
- Width: `360px` (desktop), `100vw` (mobile)
- Height: `520px` (desktop), `100vh` (mobile)
- Position: `fixed bottom-right`
- Offset: `24px from bottom/right` (desktop)
- Background: `#FFFFFF`
- Border radius: `16px` (desktop), `0` (mobile)
- Shadow: `0 8px 32px rgba(0, 0, 0, 0.16)`

**Header:**
- Height: `60px`
- Background: `linear-gradient(135deg, #7C3AED, #EC4899)`
- Color: `#FFFFFF`
- Padding: `16px`
- Border radius: `16px 16px 0 0`
- "Dia": `Inter Bold 16px`
- "Online": `Inter Regular 13px, opacity 0.9`
- Minimize: `[─]`
- Close: `[×]`

**Chat Area:**
- Background: `#F9FAFB` (light gray)
- Padding: `16px`
- Overflow: `scroll`
- Max messages: `50` (then pagination)

**Footer (Input):**
- Height: `60px`
- Background: `#FFFFFF`
- Border top: `1px solid #E5E7EB`
- Padding: `12px`

---

## 🌐 RESPONSIVE BREAKPOINTS

### **Mobile (<768px):**
- Full width chatbot
- Full height chatbot
- Stacked cards
- Larger touch targets (48px min)
- Bottom input bar

### **Tablet (768-1024px):**
- 400px wide chatbot
- 600px height
- 2-column card grid
- Standard touch targets

### **Desktop (>1024px):**
- 360px wide chatbot
- 520px height
- 3-column card grid
- Hover states enabled

---

## 🎨 ANIMATION SPECIFICATIONS

### **Message Appearance:**
- Fade in + slide up
- Duration: `300ms`
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Stagger: `100ms` between messages

### **Quick Reply Buttons:**
- Fade in + scale
- Duration: `200ms`
- Easing: `ease-out`
- Hover: Scale `1.02`, lift `translateY(-2px)`

### **Result Cards:**
- Fade in + slide up
- Duration: `400ms`
- Easing: `ease-out`
- Hover: Lift with shadow increase

### **Photo Gallery:**
- Swipe: `300ms ease-in-out`
- Dots: Color transition `200ms`

### **Typing Indicator:**
- Three dots
- Bounce animation
- Duration: `1.4s infinite`
- Color: `#7C3AED`

---

## ✅ ACCESSIBILITY SPECIFICATIONS

### **Keyboard Navigation:**
- Tab order: Natural flow
- Focus visible: `2px solid #7C3AED`
- Escape: Close chatbot
- Enter: Send message
- Arrow keys: Navigate buttons

### **Screen Readers:**
- All images have alt text
- Messages have ARIA labels
- Buttons have descriptive text
- Loading states announced
- Errors announced

### **Color Contrast:**
- Text on white: Minimum 4.5:1
- Text on purple: Minimum 4.5:1
- Links: Underlined or 3:1 ratio

### **Touch Targets:**
- Minimum: `48px × 48px`
- Spacing: `8px` between
- Large enough for thumbs

---

**These mockups ensure Dia is simple, elegant, and conversion-optimized!** 🎨✨

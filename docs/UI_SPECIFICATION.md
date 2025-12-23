# Love Ledger MVP - Brutal Minimalism Spec
**Target:** Ship in 30 days | Test with 50 users in 60 days | Government accessibility compliant

---

## Design Philosophy: "Swish for Social Capital"

**What we're copying:** Swish (Sweden's ubiquitous payment app)
- Everyone already understands it
- Minimal cognitive load
- Works on grandma's phone
- Government-trusted design patterns

**What we're innovating:** Hidden transaction amounts (the "gift" mechanic)

**What we're cutting:** Everything else.

---

## Core Screens (5 Total)

### 1. HOME SCREEN
```
┌─────────────────────────────┐
│  ☰                    ⚙️    │ (Menu, Settings)
├─────────────────────────────┤
│                             │
│      [Your Name]            │
│      [Profile Photo]        │
│                             │
│   🔥 240 Hearts             │  ← Fire icon preserves "warmth" metaphor
│   🍃 85 Leaves              │
│                             │
│  ┌──────────────────────┐   │
│  │  Skicka Värme        │   │
│  └──────────────────────┘   │
│                             │
│  ┌──────────────────────┐   │
│  │  Skanna QR           │   │
│  └──────────────────────┘   │
│                             │
├─────────────────────────────┤
│ SENASTE AKTIVITET           │
│                             │
│ 🫀 Anna skickade värme      │ ← No number visible
│    "Tack för hjälpen!"      │
│    2 tim sedan              │
│                             │
│ 🍃 Du tjänade Leaves        │
│    +15 (Cyklade till jobbet)│
│    idag 08:45               │
│                             │
│ 🫀 Du skickade till Sven    │
│    "För snöskottning"       │
│    igår 14:30               │
│                             │
└─────────────────────────────┘
```

**Key decisions:**
- **No fire animation.** Just numbers. Like a bank balance.
- **Activity feed shows gesture, not amount** (unless you sent it - then you know)
- **Profile photo required** (builds trust, reduces anonymity abuse)
- **Two primary actions:** Send Hearts OR Scan QR (for Leaves)

---

### 2. SEND HEARTS SCREEN
```
┌─────────────────────────────┐
│  ← Tillbaka                 │
├─────────────────────────────┤
│                             │
│   Skicka värme till:        │
│                             │
│  ┌──────────────────────┐   │
│  │  🔍 Sök kontakt...   │   │
│  └──────────────────────┘   │
│                             │
│  SENASTE                    │
│  ○ Anna Svensson            │
│  ○ Sven Andersson           │
│  ○ Maria Johansson          │
│                             │
│  GRANNAR (INOM 500M)        │
│  ○ Erik Nilsson             │
│  ○ Lisa Bergström           │
│                             │
└─────────────────────────────┘

[Select Anna] →

┌─────────────────────────────┐
│  ← Tillbaka                 │
├─────────────────────────────┤
│                             │
│   Till: Anna Svensson       │
│   [Photo]                   │
│                             │
│   Hur mycket?               │
│   ┌────────────────────┐    │
│   │ ○ 25  ○ 50  ○ 100  │    │  ← Quick select
│   │ ○ Annat: [___]     │    │
│   └────────────────────┘    │
│                             │
│   Meddelande (valfritt)     │
│   ┌────────────────────┐    │
│   │ Tack för...        │    │
│   └────────────────────┘    │
│                             │
│  🔥 Ditt saldo: 240 Hearts  │
│                             │
│  ┌──────────────────────┐   │
│  │  SKICKA              │   │
│  └──────────────────────┘   │
│                             │
└─────────────────────────────┘

[After sending] →

┌─────────────────────────────┐
│         ✓                   │
│                             │
│   Skickat till Anna!        │
│                             │
│   🫀 50 Hearts              │
│   "Tack för hjälpen!"       │
│                             │
│  ┌──────────────────────┐   │
│  │  Klar                │   │
│  └──────────────────────┘   │
│                             │
└─────────────────────────────┘
```

**Key decisions:**
- **Pre-set amounts** (25/50/100) - reduces decision paralysis
- **Shows YOUR balance** - prevents overdraft
- **Optional message** - social warmth without forcing it
- **No sliding gestures** - just tap and confirm (arthritis-friendly)

---

### 3. RECEIVE HEARTS (Notification → Detail)
```
[Push notification]
"🫀 Anna skickade värme"

[Tap notification] →

┌─────────────────────────────┐
│  ← Tillbaka                 │
├─────────────────────────────┤
│                             │
│   Från: Anna Svensson       │
│   [Photo]                   │
│                             │
│  ┌──────────────────────┐   │
│  │  🫀                  │   │
│  │                      │   │  ← Simple, static
│  │  "Tack för hjälpen   │   │
│  │   med flyttlådorna!" │   │
│  │                      │   │
│  └──────────────────────┘   │
│                             │
│  [Tryck för att se belopp]  │  ← THE KEY INNOVATION
│                             │
└─────────────────────────────┘

[Tap to reveal] →

┌─────────────────────────────┐
│  ← Tillbaka                 │
├─────────────────────────────┤
│                             │
│   Från: Anna Svensson       │
│   [Photo]                   │
│                             │
│  ┌──────────────────────┐   │
│  │  🫀 +75 Hearts       │   │  ← Revealed
│  │                      │   │
│  │  "Tack för hjälpen   │   │
│  │   med flyttlådorna!" │   │
│  │                      │   │
│  └──────────────────────┘   │
│                             │
│  Nytt saldo: 315 Hearts     │
│                             │
│  2024-12-23 14:30           │
│                             │
└─────────────────────────────┘
```

**Key decisions:**
- **No "lootbox" animation** - just a tap to reveal (fast, accessible)
- **Message comes first** - the amount is secondary
- **Timestamp shown** - builds trust/auditability
- **Simple confirmation** - no need to "accept" (auto-credited)

---

### 4. SCAN QR (For Leaves - Bus/Wellness Points)
```
┌─────────────────────────────┐
│  ✕ Stäng                    │
├─────────────────────────────┤
│                             │
│  ┌──────────────────────┐   │
│  │                      │   │
│  │   [Camera viewfinder]│   │
│  │                      │   │
│  │   Rikta mot QR-kod   │   │
│  │                      │   │
│  └──────────────────────┘   │
│                             │
│  Scanna koden på:           │
│  • Buss 172/173             │
│  • Friskvårdspunkt          │
│  • Vila-vagnen              │
│                             │
└─────────────────────────────┘

[Scan success] →

┌─────────────────────────────┐
│         ✓                   │
│                             │
│   Buss 172 - Bekräftad!     │
│                             │
│   🍃 +5 Leaves              │
│   För hållbar pendling      │
│                             │
│   Nytt saldo: 90 Leaves     │
│                             │
│  ┌─────────────────────┐    │
│  │  Klar               │    │
│  └─────────────────────┘    │
│                             │
└─────────────────────────────┘
```

**Key decisions:**
- **No AR overlays** - just standard QR scanning
- **Instant feedback** - you earned Leaves, done
- **Shows what you did** - builds narrative ("sustainable commuting")
- **No gamification** - this is utility, not a game

---

### 5. CRISIS MODE (Toggle in Settings)
```
[Settings] → [Krisläge]

┌─────────────────────────────┐
│  ← Tillbaka                 │
├─────────────────────────────┤
│                             │
│   ⚠️ KRISLÄGE               │
│                             │
│   Aktivera vid:             │
│   • Internetavbrott         │
│   • MSB-varning             │
│   • Nödsituation            │
│                             │
│   [OFF] ─────○────── [ON]   │  ← Simple toggle
│                             │
│   När aktiverat:            │
│   ✓ Offline-läge            │
│   ✓ Hög kontrast            │
│   ✓ Synliga belopp          │
│   ✓ Resurskarta             │
│                             │
└─────────────────────────────┘

[Toggle ON] →

┌─────────────────────────────┐
│  ☰                    ⚙️    │
├─────────────────────────────┤
│  ⚠️ KRISLÄGE AKTIVT         │  ← Yellow banner
├─────────────────────────────┤
│                             │
│   [Björn K. Holmström]      │
│   [Photo]                   │
│                             │
│   🫀 240 Hearts             │  ← Numbers ALWAYS visible
│   🍃 85 Leaves              │
│                             │
│  OFFLINE - Senast synk:     │
│  2024-12-23 12:30           │
│                             │
│  ┌─────────────────────┐    │
│  │  Skicka (offline)   │    │
│  └─────────────────────┘    │
│                             │
├─────────────────────────────┤
│ SENASTE (LOKAL LOGG)        │
│                             │
│ 🫀 Anna → 75 Hearts         │  ← AMOUNTS VISIBLE
│    "Tack för hjälpen!"      │
│    2 tim sedan              │
│                             │
│ 🫀 Du → Sven: 50 Hearts     │
│    "För snöskottning"       │
│    igår 14:30               │
│                             │
│  [Resurskarta]              │  ← NEW: Crisis resource map
│                             │
└─────────────────────────────┘
```

**Key decisions:**
- **Manual toggle** (not automatic) - user control reduces panic
- **Yellow warning banner** - always visible when active
- **All amounts revealed** - transparency in crisis
- **Offline capability shown** - last sync timestamp
- **Resource map** - shows nearby food/medical/skills (MSB feature)

---

## Accessibility Requirements (DOS lagen compliance)

### Font Sizes
- **Minimum body text:** 16px (adjustable to 24px in settings)
- **Minimum touch targets:** 44x44px
- **Line height:** 1.5 (readability)

### Color Contrast
- **WCAG AAA compliant** (7:1 ratio minimum)
- **Crisis mode:** Black text on white (highest contrast)
- **Color blindness:** No red/green for critical info

### Screen Reader Support
- **All buttons labeled** for VoiceOver/TalkBack
- **Amount reveals announced:** "75 Hearts from Anna"
- **Balance changes announced:** "New balance: 240 Hearts"

### Low-End Phone Performance
- **Target:** Works on Android 8+ (2017 phones)
- **Image sizes:** <100kb per photo
- **No background processes** that drain battery
- **Offline-first architecture** (works without internet)

---

## User Flows (Happy Paths)

### Flow 1: First-Time User (Onboarding)
```
1. Download app
2. BankID verification (Swedish standard)
3. Add profile photo + name
4. See tutorial (3 screens):
   - "This is your Hearts balance"
   - "Send warmth to neighbors"
   - "Tap gifts to see amount"
5. Land on home screen with 0 Hearts
6. System gives you 100 Hearts (starter gift)
7. Prompt: "Send your first Hearts to say hello!"
```

### Flow 2: Send Hearts to Neighbor (Social Transaction)
```
1. Home screen → "Skicka Hearts"
2. Search/select Anna
3. Choose amount (50) + message ("Tack!")
4. Confirm → Success screen
5. Anna gets push notification
6. Return to home screen
```

### Flow 3: Receive Hearts (The Core Innovation)
```
1. Push notification: "Anna skickade värme"
2. Tap notification → See message (no amount)
3. Tap "Tryck för att se belopp"
4. Reveal: +50 Hearts
5. Return to home screen (balance updated)
```

### Flow 4: Earn Leaves (Wellness Points)
```
1. Ride bus 172
2. Open app → "Skanna QR"
3. Scan QR code on bus
4. Success: +5 Leaves
5. Return to home screen
```

### Flow 5: Crisis Mode Activation
```
1. Settings → Krisläge → Toggle ON
2. Home screen changes (high contrast)
3. All amounts visible in feed
4. Offline transactions enabled
5. Access to resource map
```

---

## What We're Cutting (Save for v2.0)

❌ **Fireplace balance visualization** → Just show number  
❌ **Amber orb animations** → Just tap to reveal  
❌ **Growing forest backgrounds** → Simple badge icons  
❌ **AR overlays** → Standard QR scan  
❌ **Haptic feedback** → System defaults only  
❌ **Sliding gestures** → Tap and confirm  
❌ **Custom sounds** → System notification sounds  
❌ **Social feed** → Just activity log  
❌ **Leaderboards** → Anti-pattern for Jantelagen  
❌ **Complex gamification** → Simple earning mechanics  

---

## Technical Stack (30-Day Build)

### Frontend
- **Framework:** React Native (iOS + Android from one codebase)
- **UI Library:** React Native Paper (Material Design, accessibility built-in)
- **State:** Zustand (simple, no Redux complexity)

### Backend
- **Database:** Holochain DHT (your existing architecture)
- **Auth:** BankID integration (Swedish standard)
- **Push Notifications:** Firebase Cloud Messaging

### Development Timeline
- **Week 1:** Core screens (Home, Send, Receive)
- **Week 2:** QR scanning + Leaves logic
- **Week 3:** Crisis mode + offline sync
- **Week 4:** Accessibility audit + bug fixes

---

## Success Metrics (60-Day Pilot)

### Behavioral Metrics
- **Daily Active Users (DAU):** >30% of pilot cohort (15/50)
- **Hearts sent per user per week:** >2 (proves social engagement)
- **Leaves earned per user per week:** >5 (proves bus usage)
- **Crisis mode toggled:** >10% try it (proves awareness)

### UX Validation
- **"Hidden number" mechanic:**
  - Do users understand it? (survey)
  - Do they like it? (NPS score >40)
  - Does it reduce transactionalism? (qualitative interviews)

### Technical Validation
- **Offline sync success rate:** >95%
- **App crashes:** <1% of sessions
- **Battery drain:** <5% per hour of active use
- **Works on 5+ year old phones:** Yes/No

### MSB Validation
- **Crisis mode comprehension:** >80% understand purpose
- **Resource map usefulness:** >60% find it relevant
- **Would recommend to neighbors:** >70%

---

## Design System (Copy Swish)

### Branding & Naming
**Working names to test:**
- **"Stuga"** - The cottage (simple, Swedish, evokes warmth and safety)
- **"Värme"** - Swedish for warmth (direct, emotion-focused)

**Recommendation:** Paper prototype test "Stuga" vs "Stuga Pay". The word "Pay" borrows trust from Swish/Apple Pay but may feel transactional. Pure "Stuga" is warmer but less obvious.

**Icon theme:** 🔥 (fire/hearth) used consistently to anchor "warmth at the cottage" metaphor without heavy visual complexity.

### Colors
- **Primary:** #004080 (Dark blue, government trust)
- **Hearts:** #7A3530 (Falu Red - Swedish cottage warmth, not warning)
- **Leaves:** #558B2F (Forest green)
- **Crisis:** #FFC107 (Amber warning, Swedish standard)
- **Text:** #212121 (Near-black, high contrast)
- **Background:** #FFFFFF (Pure white)

### Typography
- **Primary font:** SF Pro (iOS) / Roboto (Android)
- **Sizes:** 16px body / 20px headings / 14px captions

### Spacing
- **Base unit:** 8px
- **Touch targets:** 48px minimum
- **Screen padding:** 16px

---

## Prototype-First Approach

**Before building ANYTHING:**

1. **Paper prototype** (2 days)
   - Print these screens
   - Test with 5 elderly neighbors
   - Observe: Do they understand the "tap to reveal" mechanic?

2. **Figma clickable prototype** (3 days)
   - Build exact flows above
   - Test with 10 target users
   - Validate: Does crisis mode make sense?

3. **Code only after validation** (30 days)
   - You now know the design works
   - Reduce wasted development time

---

## The Brutal Truth

This MVP is **intentionally minimal** - but not soulless.

**What we cut (the complex animations):**
- No particle effects
- No animated forest backgrounds
- No AR magic
- No custom audio design
- No 3D fireplace visualization

**What we KEEP (the simple metaphors):**
- 🔥 Fire icon for Hearts balance ("warmth at the cottage")
- "Skickade värme" language (not "sent money")
- Falu Red #7A3530 (cottage warmth, not banking)
- "Stuga" branding (Swedish cultural resonance)
- Hidden amounts mechanic (gift psychology)

**The strategy:** Preserve the emotional design through zero-cost elements (icons, color, words) while cutting the expensive animations. Test the psychology first, add the magic later.

**Core hypotheses to test:**
- Does "hidden amounts" reduce transactionalism?
- Will people use a social currency?
- Does crisis mode provide real value?
- Do simple metaphors (🔥 icon, "värme" language) convey warmth without animations?

**If this works,** THEN you add the fireplace visualization, forest backgrounds, AR overlays.

**If this fails,** those features won't save it.

---

## Next Actions

1. **Create Figma prototype** (I can help spec this further)
2. **Test with 5 people** (neighbors, family, elderly)
3. **Iterate based on feedback** (expect to change 30%)
4. **Build in React Native** (with existing Holochain backend)
5. **Launch pilot with 50 users** (archipelago + bus 172)
6. **Measure for 60 days** (behavioral + UX metrics)
7. **Decide:** Scale up OR pivot OR add features

**Timeline:** Prototype in 1 week, build in 30 days, pilot in 60 days.

**Total:** You could have validated data by March 2026.

Want me to help with the Figma spec or the React Native architecture next?

# Love Ledger Hearts Categories System 💚

## Core Love Ledger Categories

### 🤝 Community Hearts (Golden Yellow #fbbf24)
- **Purpose**: General community building, organizing, social connection
- **Examples**: Community meetings, neighborhood events, conflict resolution
- **Energy**: Warm, welcoming, collaborative

### 🧡 Care & Healing Hearts (Warm Red #ef4444) 
- **Purpose**: Direct care for people - physical, emotional, mental health
- **Examples**: Elder care, childcare, disability support, grief counseling
- **Energy**: Nurturing, protective, compassionate

### 🌱 Ecology Hearts (Living Green #22c55e)
- **Purpose**: Environmental stewardship, land healing, sustainability
- **Examples**: Tree planting, permaculture, wildlife protection, cleanup
- **Energy**: Growing, regenerative, grounding

### 🎭 Cultural Weaving Hearts (Deep Purple #8b5cf6)
- **Purpose**: Arts, traditions, storytelling, cultural preservation
- **Examples**: Music, dance, ceremonies, language preservation
- **Energy**: Creative, spiritual, connecting past and future

## Expanded Categories

### 💙 Healing & Medicine Hearts (Cyan Blue #06b6d4)
- **Purpose**: Healthcare, traditional medicine, wellness practices
- **Examples**: Herbal medicine, healing ceremonies, medical care
- **Energy**: Cleansing, flowing, restorative

### ❤️ Wisdom Hearts (Deep Red #dc2626)
- **Purpose**: Teaching, mentoring, sharing knowledge
- **Examples**: Elder teaching, apprenticeships, skill sharing
- **Energy**: Deep, grounded, transformative

### 🎨 Creative Arts Hearts (Royal Purple #a855f7)
- **Purpose**: Artistic expression, beauty creation, inspiration
- **Examples**: Painting, music, poetry, craft-making
- **Energy**: Inspiring, expressive, transcendent

### 🖤 Protection Hearts (Dark Slate #475569)
- **Purpose**: Safety, security, boundary-setting, advocacy
- **Examples**: Community safety, legal advocacy, crisis response
- **Energy**: Strong, steady, protective

### 🤍 Peace Hearts (Pure White #f8fafc)
- **Purpose**: Conflict resolution, unity building, reconciliation
- **Examples**: Mediation, peace-making, bridge-building
- **Energy**: Clear, pure, harmonizing

### 🤎 Earth Hearts (Earth Brown #92400e)
- **Purpose**: Land-based work, agriculture, soil health
- **Examples**: Farming, gardening, land restoration, geology
- **Energy**: Rooted, stable, foundational

## Elemental Hearts (Seasonal/Spiritual)

### 🔥 Fire Hearts (Bright Red #dc2626)
- **Purpose**: Transformation, passion, energy, breakthrough
- **Examples**: Life transitions, activism, leadership, innovation
- **Energy**: Dynamic, transformative, powerful

### 💧 Water Hearts (Ocean Blue #0ea5e9)
- **Purpose**: Flow, adaptation, emotional healing, cleansing
- **Examples**: Water ceremonies, emotional support, flexibility
- **Energy**: Flowing, adaptive, cleansing

### 🌬️ Air Hearts (Light Gray #e5e7eb)
- **Purpose**: Communication, breath, movement, freedom
- **Examples**: Messaging, travel assistance, communication facilitation
- **Energy**: Light, moving, connecting

### ✨ Spirit Hearts (Lavender #f3e8ff)
- **Purpose**: Prayer, ceremony, spiritual practice, sacred work
- **Examples**: Ritual work, sacred space tending, spiritual guidance
- **Energy**: Transcendent, sacred, mysterious

## Implementation Guide

### Color Usage in UI
```css
.hearts-community { background: linear-gradient(135deg, #fbbf24, #f59e0b); }
.hearts-care { background: linear-gradient(135deg, #ef4444, #dc2626); }
.hearts-ecology { background: linear-gradient(135deg, #22c55e, #16a34a); }
.hearts-culture { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
```

### Category Selection Logic
- **Auto-detect**: Use keywords in care act descriptions
- **User Choice**: Dropdown with visual heart colors
- **Community Validation**: Community Weavers can adjust categories
- **Cultural Adaptation**: Communities can rename/recolor categories

### Mixing Categories
- Most care acts combine categories (e.g., community + ecology)
- Visual: Show primary heart color with secondary heart as accent
- Calculation: Bonus multipliers can stack from multiple categories

### Accessibility Notes
- Each category has distinct icons beyond just color
- Gradients provide visual interest while maintaining contrast
- Color-blind friendly alternative: patterns or symbols
- Screen reader friendly: semantic meaning in category names

## Cultural Adaptation Examples

### Indigenous Communities
- **Sacred Hearts**: For ceremony and traditional practices
- **Ancestor Hearts**: For honoring elders and lineage
- **Land Hearts**: For traditional ecological knowledge

### Urban Communities  
- **Tech Hearts**: For digital literacy and innovation
- **Transport Hearts**: For mobility and accessibility
- **Housing Hearts**: For shelter and housing justice

### Faith Communities
- **Prayer Hearts**: For spiritual practice and worship
- **Service Hearts**: For faith-based community service
- **Fellowship Hearts**: For community building and connection

## Technical Implementation

### Component Usage
```svelte
<ColorShiftingHeart 
  size="md" 
  category="ecology" 
  speed="slow" 
/>

<HeartsBadge 
  hearts={47} 
  type="care" 
  size="lg" 
/>
```

### Database Schema
```sql
care_acts (
  category_primary VARCHAR, -- Main category
  category_secondary VARCHAR, -- Optional second category  
  category_custom VARCHAR, -- Community-defined category
  hearts_color VARCHAR, -- Hex color for this act
)
```

This system grows with communities while maintaining beautiful, meaningful visual identity! 🌈💚

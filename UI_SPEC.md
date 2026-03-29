# UI Redesign Spec — Anime Character Analyzer (Tether.to Style)

## Design Inspiration
tether.to/en/ — crypto/fintech dark theme with muted Tether Green (#50AF95) as the primary accent. Clean, professional, minimal.

## Color Palette (Tether-Inspired)

| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#060B14` | Page background (darker than before) |
| `--bg-secondary` | `#0A1520` | Section backgrounds |
| `--bg-card` | `#0F1E2E` | Card backgrounds |
| `--bg-card-hover` | `#142535` | Card hover state |
| `--border` | `rgba(255,255,255,0.05)` | Subtle borders |
| `--border-strong` | `rgba(255,255,255,0.1)` | Stronger borders |
| `--text-primary` | `#F0F4F8` | Primary text |
| `--text-secondary` | `#8A9BAD` | Secondary text |
| `--text-muted` | `#4A5A6B` | Muted text |
| `--accent` | `#50AF95` | **Tether Green** (primary accent) |
| `--accent-dim` | `rgba(80,175,149,0.1)` | Accent background tint |
| `--accent-border` | `rgba(80,175,149,0.25)` | Accent border |
| `--accent-hover` | `#67C4AA` | Hover state |
| `--accent-glow` | `rgba(80,175,149,0.15)` | Glow effect |

## Typography
- **Headings**: Space Grotesk (700) — geometric, modern
- **Body**: Inter (400/500/600) — clean readability
- **Mono/Badges**: IBM Plex Mono — technical credibility
- Already loaded via Google Fonts in layout.tsx

## Layout
- Max content width: 1200px centered
- Generous vertical padding (80-100px sections)
- Card radius: 12-16px (subtle rounding, not bubbly)
- Border weight: 1-1.5px

## Key UI Changes

### 1. Upload Zone
- Border: dashed 1.5px `--accent-border`
- Background: `--accent-dim` with subtle radial glow
- Hover: border brightens, slight glow
- Drag-over: pulsing glow effect
- Max-width 580px centered

### 2. Cards
- Background: `--bg-card` with `--border` border
- Hover: `--bg-card-hover` + border brightens
- Subtle box-shadow: `0 4px 24px rgba(0,0,0,0.3)`

### 3. Header
- Sticky, blur backdrop
- Logo: Tether-green icon + bold text
- Nav links: subtle hover highlight
- Badge: "AI Engine v2.0" with pulsing dot

### 4. Hero Section
- Centered layout, large heading
- Accent badge at top
- Stats row at bottom (character count, analyses, accuracy)
- Ambient background: single large radial gradient in Tether green

### 5. Results Section
- Full card with image + info side-by-side
- Trait bars with gradient fills
- Action buttons: primary (accent fill) + outline

### 6. Ambient Effects
- Remove multi-color blobs (purple/pink/cyan)
- Single soft green radial glow centered in hero
- Subtle geometric grid pattern on background

## Implementation
- Edit `app/globals.css` — update all CSS variables
- Edit `app/page.tsx` — update accent colors throughout
- Verify `.gitignore` excludes node_modules/ and .next/ ✓

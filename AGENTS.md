# Instructions for Codex

These instructions apply throughout this repository.

## Branches and pull requests

- Start each new task on a separate branch based on the latest `main`. Use a descriptive name such as `fix/login-error` or `feature/player-search`.
- If the current session already has a branch dedicated to this task, continue on it. Do not discard uncommitted work or overwrite another person's changes.
- Never commit or push directly to `main`. Do not force-push.
- Keep each branch and pull request focused on one task.
- Run relevant checks, review the diff, then open a pull request targeting `main` when the changes are ready.
- Do not merge pull requests unless the repository owner explicitly asks.
- If repository access or permissions prevent this workflow, explain the blocker instead of changing `main`.

## Making and checking changes

- Read the README and any applicable directory instructions before editing.
- Follow the existing project structure and coding conventions. Keep changes limited to the requested task.
- Use the project's documented checks when available. For behavior changes, verify the affected functionality; for visual changes, check the page in a browser when possible.
- Do not invent test commands or claim checks passed when they were not run. Explain any checks that could not be completed.
- For documentation-only changes, review the text and diff; application tests are not required.
- Never commit passwords, API keys, tokens, or private user data.

## Explaining the work

- Use beginner-friendly language and explain unfamiliar Git or coding terms when needed.
- In the pull request, describe what changed, why it changed, and how it was checked. Mention any remaining limitations.
- Share the pull request link and explain the next step for the owner.


# Design System: The Player Lab, "Mech Hangar HUD"

A vibrant, high-energy interface that treats building a player like
configuring a mech in a hangar bay. Angular armored panels, glowing
power lines, segmented gauges, and a pilot-readout summary. Think
Armored Core / Titanfall / Gundam customization screens, applied to
an NBA 2K player builder.

## Scope (read first)
Restyle visually only. Do NOT change functionality or logic:
- Player info fields (name, league type, position, height, weight,
  wingspan), the attribute inputs and their defaults (25), badge
  qualification calculations, live summary updates, Randomize Player,
  and Reset Player must work exactly as before.
- Do not change calculations, data structures, or input validation.
- Keep the logo asset (`assets/icons/TPL Logo.svg`), page title, and
  the disclaimer text ("not affiliated with NBA2K, Take 2 Interactive,
  or the NBA") unchanged.
- Keep the viewport meta tag. Remain responsive and accessible.

## Vibe in one line
Dark armored chassis, electric glow, color-coded subsystems, and every
number feels like live telemetry.

## Step 1: Tokens
Define in :root and use ONLY these variables (no hard-coded colors in
components). I could not see the site's rendered colors, so if the
logo SVG has a dominant brand color, adopt it as --primary instead of
the cyan below and derive the rest from it.

:root {
  /* Chassis (backgrounds): deep blue-black, never pure black */
  --bg: #0b0f1a;
  --bg-elevated: #121828;
  --panel: #151c2e;
  --panel-inset: #0a0e18;
  --seam: rgba(120, 170, 255, 0.14);        /* panel seam lines */
  --seam-strong: rgba(120, 170, 255, 0.30);

  /* Primary energy color */
  --primary: #19e6ff;                       /* electric cyan */
  --primary-hover: #66f0ff;
  --primary-glow: rgba(25, 230, 255, 0.35);
  --primary-tint: rgba(25, 230, 255, 0.10);
  --on-primary: #04121a;

  /* Secondary energy color: used for highlights and warnings */
  --secondary: #ff3d81;                     /* hot magenta-pink */
  --secondary-glow: rgba(255, 61, 129, 0.35);

  /* Subsystem colors: one per attribute category */
  --sys-finishing: #3b82ff;                 /* blue */
  --sys-shooting: #2ee66b;                  /* green */
  --sys-playmaking: #ff8a1f;                /* orange */
  --sys-defense: #ff3b4e;                   /* red */
  --sys-rebounding: #a35bff;                /* purple */
  --sys-physicals: #ffd21f;                 /* yellow */

  /* Badge tiers */
  --tier-bronze: #cd7f32;
  --tier-silver: #c9d3e0;
  --tier-gold: #ffc531;
  --tier-hof: #c15bff;                      /* Hall of Fame, holographic */

  --text: #eef3ff;
  --text-muted: rgba(220, 232, 255, 0.64);
  --text-dim: rgba(220, 232, 255, 0.38);

  --warn: #ffb020;
  --radius: 0;                              /* angled, not rounded */
  --cut: 12px;                              /* chamfer size for clip-paths */

  --font-display: "Chakra Petch", "Rajdhani", system-ui, sans-serif;
  --font-body: "Rajdhani", "Chakra Petch", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Share Tech Mono", ui-monospace, monospace;
}

## Step 2: Typography
- Load from Google Fonts: Chakra Petch (500, 600, 700), Rajdhani
  (500, 600, 700), JetBrains Mono (500, 700).
- Page and section titles: var(--font-display), uppercase, bold,
  letter-spacing 0.06em. Section titles get a "//" or "▌" prefix
  glyph in var(--primary) as a console marker.
- Labels (Close Shot, Speed, Player Name, etc.): var(--font-body),
  uppercase, 13px, 600, letter-spacing 0.1em, var(--text-muted).
- All numbers (attribute values, summary stats, badge counts):
  var(--font-mono), bold, tabular-nums, so digits never jitter as
  they change.
- Body/help text: var(--font-body), 15-16px minimum on mobile.

## Step 3: Global look
- Background: var(--bg) with layered effects (all `pointer-events:
  none`, all behind content, all subtle):
  1. A faint hex-grid or blueprint grid pattern in var(--seam) at
     ~5% opacity.
  2. Two large soft glows: var(--primary-glow) top-left and
     var(--secondary-glow) bottom-right at ~8% opacity.
  3. A very light horizontal scanline overlay (1px lines every 3-4px
     at ~2% opacity). Disable with `prefers-reduced-motion` if
     animated.
- **Angular geometry everywhere:** use chamfered (cut-corner) shapes
  via clip-path, not rounded corners. Standard chamfer:
  `clip-path: polygon(var(--cut) 0, 100% 0, 100% calc(100% -
  var(--cut)), calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut));`
- **Armor panel detail:** main panels have a 1px var(--seam) border
  (simulated with a pseudo-element since clip-path clips borders),
  tiny corner "rivets" (4px dots in var(--seam-strong)), and a short
  var(--primary) accent segment on the top edge.
- **Hazard stripe:** a thin diagonal yellow/black stripe band (6-8px)
  used sparingly, e.g. above the Reset button or on warning notes.
  Never on large areas.
- Respect `env(safe-area-inset-*)` on mobile.

## Step 4: Components

### Header
- Logo (TPL Logo.svg) with "THE / PLAYER LAB" wordmark. Tagline
  "MyNBA Player Generator & Badge Analyzer" in uppercase
  var(--text-muted), small, letter-spaced.
- Header bar: var(--bg-elevated) with a 1px var(--seam) bottom edge
  and a glowing 2px var(--primary) line (soft glow with
  var(--primary-glow)) that fades out toward the right.
- Add a small status chip at the right: "SYSTEM ONLINE" with a
  pulsing var(--primary) dot (decorative only).

### Panels ("Player Information", "Player Attributes",
### "Player Summary", "Qualified Badges")
- background var(--panel), chamfered top-right and bottom-left
  corners, var(--seam) border, corner rivets.
- Panel header strip: panel title left in display type with a "//"
  prefix, a small index tag at right in mono ("SYS-01", "SYS-02",
  "SYS-03", "SYS-04") in var(--text-dim).
- Intro/help text under each title: var(--text-muted).
- The "i" info notes become callout boxes: var(--primary-tint)
  background, 3px var(--primary) left bar, small chevron icon,
  chamfered corner.

### Inputs, selects, number fields
- Background var(--panel-inset), 1px var(--seam-strong), square
  corners (clip one corner if easy), text in var(--font-mono) for
  numeric fields.
- Focus: border var(--primary) plus a soft var(--primary-glow)
  outer glow. Labels sit above in uppercase small caps style.
- ft / in fields: pair into one unit group with a small unit tag
  ("FT", "IN") in var(--text-dim).
- Selects (League Type, Position): same inset style with a custom
  chevron in var(--primary). Keep native behavior.

### League Type and Position selectors
- If they render as selects, keep them. If implemented as button
  groups, style as segmented controls: chamfered segments, active
  segment filled with var(--primary) and var(--on-primary) text,
  inactive segments inset with muted text, hover border in
  var(--primary).

### Attribute rows (the heart of the builder)
Group attributes into six subsystem cards, each with its own color:
Finishing (--sys-finishing), Shooting (--sys-shooting), Playmaking
(--sys-playmaking), Defense (--sys-defense), Rebounding
(--sys-rebounding), Physicals (--sys-physicals).
- Each card: panel styling, with a 3px top bar and a small icon-free
  header tag in that subsystem color, and the title in uppercase.
  Subtle inner glow in the subsystem color at ~6% opacity.
- Each attribute row: label left, a **segmented gauge** in the
  middle, number input right.
  - Gauge: 20 small angled segments (skewed -20deg), filled in the
    subsystem color up to the current value (value/99), unfilled
    segments in var(--panel-inset). The leading segment glows.
  - Gauge must update live with the input and animate smoothly
    (100-150ms). Do not change input behavior or the default of 25.
  - Value input: var(--font-mono), bold, right-aligned, narrow,
    chamfered, inset. At 90+ the number takes the subsystem color
    and a faint glow; at 99 add a small "MAX" tag.
- Rows are separated by 1px var(--seam) dividers, ~48px tall,
  with 56px minimum tap height on mobile.
- Show a per-card average or total in the card header, in mono,
  only if it can be derived from existing values without new logic.

### Buttons
- **Primary ("Randomize Player"):** background var(--primary), text
  var(--on-primary), bold uppercase, letter-spacing 0.08em,
  chamfered corners, soft var(--primary-glow) outer glow. Hover:
  var(--primary-hover) and stronger glow. Active: 1px press-down
  plus a quick brightness flash. Add a small dice or bolt glyph only
  if using an existing inline SVG icon, no emoji.
- **Secondary ("Reset Player"):** transparent, 1px var(--secondary)
  border, var(--secondary) text, chamfered. Hover: fill with
  var(--secondary) at 15% and text white. Place a thin hazard stripe
  above it as a "caution" cue.
- Disabled: 40% opacity, no glow.

### Player Summary ("pilot readout")
- Style as a spec sheet / unit readout: a header strip "UNIT
  READOUT", then key stats in a grid of readout tiles (label tiny
  uppercase, value large in mono, optional unit tag).
- Overall rating (if present) displayed as a large circular or
  hexagonal gauge in var(--primary) with a glowing arc; the number
  centered in mono.
- If the summary has category averages, show them as horizontal
  bars in each subsystem color.
- If a radar/hexagon chart is feasible with the existing data, a
  six-axis radar in the six subsystem colors with a translucent
  fill is a strong centerpiece. Only add it if it can be drawn from
  existing values with no logic changes.
- Empty state ("Adjust the player attributes to build the player
  summary"): a dim wireframe silhouette or scan-line placeholder
  with a blinking cursor "AWAITING INPUT_".

### Qualified Badges
- Tier filter chips (Bronze, Silver, Gold, Hall of Fame): chamfered
  toggle chips, each with a small colored hex marker in its tier
  color; active chip gets a tier-colored border and glow.
- Badge cards: chamfered tiles with the badge name, tier color
  frame, and tier glow (Bronze/Silver/Gold use their metal colors;
  Hall of Fame uses var(--tier-hof) with a subtle animated
  holographic shimmer).
- When a badge newly qualifies, play a short "power-up" animation
  (150-250ms scale-in plus a glow pulse). Do not delay rendering.
- Group badges by tier with section headers like "GOLD // 12
  QUALIFIED" in mono for the count.
- Empty state ("Adjust the player attributes to see qualified
  badges"): "NO BADGES DETECTED // ADJUST ATTRIBUTES" in a dashed
  chamfered box.

### Footer
- "The Player Lab, A Sole Lab Project": display type, muted.
  Tagline "Basketball Player Creation, Analysis & Simulation Tools"
  small and uppercase. Disclaimer remains legible small text in
  var(--text-dim). A thin var(--primary) line with end caps above it.

## Step 5: Motion (tasteful, fast)
- Panels fade and slide in 200ms on first load (staggered, 40ms).
- Gauge fills animate 100-150ms with ease-out.
- Number changes tick (brief color flash to var(--primary)).
- Button hover/press under 150ms.
- Glow pulses (status dot, hazard accents) are slow, subtle loops
  only on decorative elements.
- Respect `prefers-reduced-motion`: disable slide-ins, pulses,
  shimmer, and scanline animation; keep instant state color changes.
- Motion must never delay typing, selection, or recalculation.

## Step 6: Rules
- Vibrant but organized: color is assigned by purpose. Cyan is the
  system accent, magenta is the secondary/warning accent, the six
  subsystem colors appear only in attribute cards and summary bars,
  and tier colors appear only on badges. Do not mix them freely.
- Avoid: rounded pill shapes, soft drop shadows, emoji icons,
  glassmorphism blur, and heavy gradients on large surfaces. Glow
  is allowed but must stay subtle and purposeful.
- Keep text high contrast: body text on panels must meet WCAG AA.
  Check muted labels on var(--panel) and the subsystem colors used as
  text on dark backgrounds; adjust var(--text-muted) or use a
  lighter tint if needed.
- Every interactive element needs :hover, :active, and
  :focus-visible states (focus ring in var(--primary)).
- Decorative layers (grid, scanlines, glows, rivets) use
  `pointer-events: none` and must not hurt performance. No large
  images or heavy filters.
- Mobile-first: panels stack to one column below ~768px; subsystem
  cards go 1 column on phones, 2 on tablets, 3 on desktop. Number
  inputs stay at least 44px tall.
- Do not rename labels or reorder fields. Only restyle.

## Workflow
1. Add tokens, fonts, and the global background layers (grid, glows,
   scanlines).
2. Build shared pieces: chamfered panel, inputs, selects, buttons,
   callouts, status chip.
3. Restyle the Player Information panel.
4. Restyle the six attribute subsystem cards with segmented gauges
   (keep inputs as the source of truth).
5. Restyle Player Summary (readout tiles, gauge) and Qualified Badges
   (tier chips, tier-colored cards, empty states).
6. Add motion and the reduced-motion fallback.
7. Final polish: spacing, alignment, hover/focus states, mobile
   layout.
8. Verify everything still works: attribute entry, randomize,
   reset, league type, position, height/weight/wingspan, badge
   qualification results unchanged.

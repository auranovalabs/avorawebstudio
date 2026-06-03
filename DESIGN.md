---
name: Auranova Labs Visual Identity
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e3e2e2'
  on-secondary-container: '#646464'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.04em
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-xs:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  display-xl-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 64px
  margin-tablet: 32px
  margin-mobile: 20px
  stack-lg: 80px
  stack-md: 48px
  stack-sm: 24px
---

## Brand & Style
This design system is built on the principles of **High-Craft Minimalism** and **Editorial Intent**. It targets a sophisticated audience that values precision, technical excellence, and clarity. The aesthetic is inspired by the "Linear-Vercel" school of design: heavy on whitespace, razor-sharp borders, and a complete absence of decorative noise. 

The emotional response is one of calm authority. By stripping away gradients and shadows, we elevate the content and the grid, signaling a product that is purposeful and engineered with care. The style is strictly **Minimalist** with a **Corporate Modern** structural backbone, ensuring every pixel serves a functional or communicative role.

## Colors
The palette is monochromatic and high-contrast, designed to provide an expansive, "gallery-like" feel.

- **Primary (#000000):** Used for all primary typography, iconography, and high-emphasis call-to-action components.
- **Secondary (#737373):** Reserved for metadata, secondary labels, and de-emphasized body text.
- **Tertiary (#E5E5E5):** The standard border color for cards, inputs, and dividers.
- **Neutral (#F5F5F5):** Used for surface backgrounds and hover states to provide subtle depth without breaking the white space.

The system relies on pure `#FFFFFF` for the page background to maintain an airy, editorial atmosphere.

## Typography
Typography is the core of this design system. We utilize **Hanken Grotesk** for headlines to achieve a sharp, modern editorial look. Headings should utilize tight tracking (letter-spacing) to create a "locked-in" visual density.

**Geist** is used for all body text and UI elements. Its monolinear, technical construction complements the studio's web development focus. For labels and small caps, we use slightly increased letter spacing to ensure legibility and a refined "studio" feel.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. Content is contained within a 1440px max-width wrapper, centered on the screen. We utilize a 12-column grid on desktop, transitioning to 8 columns on tablet and 4 columns on mobile.

Spacing is generous to promote a feeling of luxury and focus. We use a base-8 scale for all internal padding and margins. Vertical rhythm is established through "Stack" tokens: use `stack-lg` for separating major sections and `stack-md` for component groups. All margins should be strictly adhered to—empty space is considered a functional element in this design system.

## Elevation & Depth
Depth is created through **Backdrop Blurs** and **Low-Contrast Outlines** rather than traditional shadows. 

1.  **Surfaces:** Use `#FFFFFF` for the base level. Floating elements (like cards or menus) should use a 1px border of `Tertiary (#E5E5E5)`.
2.  **Navigation:** The primary navigation bar is sticky and uses a background blur (`backdrop-filter: blur(12px)`) with a semi-transparent white fill (`rgba(255, 255, 255, 0.8)`).
3.  **No Shadows:** Standard UI elements like buttons and cards do not have shadows. Depth is communicated via the subtle shift from white to `#F5F5F5` on hover.

## Shapes
The shape language is "Soft-Technical." We avoid sharp 90-degree corners to maintain approachability, but we also avoid pill-shapes to keep the professional, engineered vibe. 

- **Standard Elements (Buttons, Inputs):** 4px (`0.25rem`) corner radius.
- **Large Elements (Cards, Containers):** 8px (`0.5rem`) corner radius.
- **Icons:** Should follow a 2px stroke width with squared-off caps to match the typography.

## Components

### Buttons
- **Primary:** Solid `#000000` background with `#FFFFFF` Geist Medium text. No border.
- **Secondary:** Transparent background with a 1px `#E5E5E5` border. On hover, background shifts to `#F5F5F5`.
- **Ghost:** No border or background. Transitions to a 40% opacity on press.

### Cards
Cards are defined by a 1px border of `#E5E5E5`. There is no drop shadow. Internal padding should be generous (minimum 32px). For featured cards, use a slightly thicker 1.5px border.

### Input Fields
Inputs use a `#F5F5F5` background and a bottom-only 1px border of `#000000` for an editorial, "form-like" look, or a full 1px border of `#E5E5E5` for standard SaaS-style layouts. Focus states are indicated by a 1px solid black border.

### Chips & Tags
Small, 12px Geist SemiBold text. Use a light gray background (`#F5F5F5`) with a 4px border radius. Used for technical categories or status indicators.

### Navigation
The navbar is minimal, height-restricted to 64px, featuring a sticky blur effect. Links use `label-sm` typography with a subtle underline appearing only on hover.
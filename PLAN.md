# Engineering Plan: Avorawebstudios Portfolio Platform

This comprehensive specification architecture dictates the development execution framework for the creation of the multi-page Avorawebstudios static digital platform.

---

## 1. Project Overview
Avorawebstudios is engineered as a clean, premium, high-performance agency interface managed by a core developer partnership. The system relies on an intentional, minimalist visual philosophy designed to project modern authority. It provides prospective clients with immediate clarity regarding visual capability, technical mandates, execution pricing metrics, and explicit pathways to initiate a new professional engagement.

---

## 2. Recommended Tech Stack

| Layer | Technology Choice | Selection Context |
| :--- | :--- | :--- |
| **Core Rendering Layer** | HTML5 / Semantic Layout Markup | Ensures excellent SEO visibility, minimal overhead, and native cross-device layout processing. |
| **Style & Utility System** | Tailwind CSS Framework (v3.4+) | Delivers uniform design tokens, precise tracking metrics, and a utility architecture that optimizes for minimal runtime footprints. |
| **Dynamic Execution Engine** | Vanilla JavaScript (ECMAScript 2022+) | Eliminates heavy runtime framework overhead. Handles DOM parsing, structural animation states, and data fetching natively. |
| **Dynamic Content Gateway** | Sheety API Wrapper + Google Sheets | Serves as an effortless, cloud-managed backend engine that allows non-technical updates without changing source code files. |
| **Typography Infrastructure** | Google Fonts CDN Delivery Engine | Delivers 'Hanken Grotesk' for display elements and 'Geist' for clean typography scales. |
| **Iconography Assets** | Material Symbols Outlined System | Handles all vector icons smoothly across different dynamic screen sizes. |

---

## 3. Architecture Decisions

### Decoupled Dynamic Hydration Architecture
To bypass the overhead of complex content management backends (like Headless WordPress, Sanity, or Strapi), the portfolio ecosystem decouples content storage from layout rendering. Content managers maintain a centralized spreadsheet data table. The client interface captures this row data asynchronously at run-time via secure fetch patterns, keeping the setup highly performant.

### Absolute CSS Framework via Tailwind Engine
By configuring absolute styling properties directly within a centralized tailwind layout initialization utility, structural style leakage across disparate pages is completely minimized. Pages reference identical spatial configuration names (`px-margin-desktop`, `gap-gutter`), maintaining a unified layout structure throughout the user journey.

---

## 4. Dynamic Content Strategy (Google Sheets & Sheety API)

To maintain a clean portfolio section without modifying source code files, execution logic hooks dynamic page containers into a live spreadsheet grid.

### Spreadsheet Schema Protocol
The target cloud data worksheet tab must map exactly to the following single-row header tokens:
+-----------------------------------------------------------------------------------------+
|    title     |     description     |    category    |  year  |  imageUrl   | projectUrl |
+-----------------------------------------------------------------------------------------+
| Project Alpha| Clean legal site... | LOCAL BUSINESS |  2026  | /asset.jpg  | https://.. |
+-----------------------------------------------------------------------------------------+

### Script Execution Logic Flow (`assets/js/app.js`)
1. **Network Initialization**: Dispatch an asynchronous request via `window.addEventListener('DOMContentLoaded')` targeting the secure Sheety dynamic endpoint resource.
2. **Skeleton UI Rendering Phase**: Build matching placeholder visual frames within the parent DOM card node using animated gray Tailwind block primitives (`animate-pulse bg-neutral-200`). This maintains visual stability and eliminates sudden layout shifts while the network request resolves.
3. **Array Mutation Iteration**: 
   - On the Home page (`index.html`), parse only the 3 newest record keys into the visual matrix.
   - On the Works index page (`work.html`), parse the entire database sequence into the container.
4. **Error Handling Architecture**: If a connection timeout occurs or a bad status code is received, clear the skeleton containers and gracefully render a clean, human-readable structural string outlining manual fallback contact methods.

---

## 5. Folder Structure
avorawebstudios/
├── index.html              # Core landing interface containing structural showcase blocks
├── work.html               # Dynamic portfolio ledger directory displaying comprehensive records
├── about.html              # Structural corporate principles and developer overview columns
├── contact.html            # Intake form, client interactive pricing system, and accordions
├── privacy.html            # Minimalist 800px legal disclosure canvas
└── assets/
├── css/
│   └── style.css       # Layout overrides, custom keyframe animations, and font hooks
├── js/
│   └── app.js          # Unified script engine managing Sheety hydration and layout interactions
└── images/
└── placeholders/   # Fallback static graphic assets if network interruptions occur

---

## 6. Coding Standards
- **Markup Consistency**: All element structures must conform strictly to semantic guidelines (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Class Management**: Group Tailwind classes logically (Layout -> Box Model -> Typography -> Visual Effects -> Interaction/States).
- **JavaScript Isolation**: Inline script configurations inside document blocks are prohibited. Encapsulate execution parameters within structured module blocks inside `assets/js/app.js`. Use explicit variable declaration mappings (`const`, `let`) and complete modern arrow mapping configurations.

---

## 7. SEO Requirements
- **Dynamic Meta Control**: Ensure each unique template uses descriptive header tags.
- **Header Hierarchies**: Maintain a single, prominent logical structural title (`<h1>`) per page. Flow downstream text into structured sub-headers (`<h2>`, `<h3>`) sequentially without skipping structural levels.
- **Media Optimization**: Ensure image properties specify fixed layout width and height parameters to preserve exact aspect ratio footprints during page rendering.

---

## 8. Accessibility Requirements (WCAG 2.1 AA Compliance)
- **Contrast Integrity**: Maintain a contrast level above 4.5:1 for standard body text strings relative to background plates.
- **Form Interactivity Access**: Pair all input tags in the project inquiries block explicitly with matching structural text labels or clear `aria-label` definitions.
- **Focus Indicator Traps**: Interactive state configurations must remain accessible via standard tab keystrokes. Use distinct color focus states to provide keyboard-navigating users with clear visual feedback.

---

## 9. Performance Targets
- **Google Lighthouse Target Scores**: 
  * Performance: > 95
  * Accessibility: 100
  * Best Practices: 100
  * SEO: 100
- **Visual Stability Metric**: Cumulative Layout Shift (CLS) must remain below 0.05 by using structured skeleton loaders and explicitly defining image boundary parameters.
- **Network Footprint Optimization**: Keep the initial payload small by utilizing minified stylesheet logic, optimized vector icons, and lazy loading assets (`loading="lazy"`) for graphics below the fold.

---

## 10. Deployment Strategy
- **Platform Recommendation**: Deploy via Vercel or Netlify to utilize their fast, globally distributed Edge CDN networks.
- **Continuous Integration Flow**: Connect the hosting platform directly to your main GitHub repository branch to trigger atomic builds automatically with each code commit.
- **Resource Caching Configuration**: Configure server headers to securely cache static asset paths for extended periods, maximizing speeds for returning users.

---

## 11. Future Scalability Considerations
- **Transitioning to Structural SSG Frameworks**: The underlying folder and class architecture is designed for easy migration to static site engines (like Astro, Next.js, or Nuxt) if the business requires complex server-side behaviors down the road.
- **Database Scalability**: If the portfolio scales past the data limits of a basic spreadsheet layout, you can swap out the Sheety middleware component for a more robust backend solution (like Supabase or a headless CMS instance) without needing to overhaul your core frontend design templates.
# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
Static personal portfolio website for Anthony Conte, hosted on GitHub Pages at anthonyconte.io. Built with vanilla HTML, CSS, and JavaScript—no build system or package manager.

## Development Commands

### Local Development
```bash
# Start a local server (Python)
python3 -m http.server 8000

# Or with Node.js
npx serve .
```

Then open http://localhost:8000 in a browser.

### Deployment
Push to `main` branch triggers automatic GitHub Pages deployment.

## Architecture

### File Structure
- `index.html` - Single-page application with all content sections
- `style.css` - All styling including animations and responsive breakpoints
- `script.js` - Interactive features and visual effects
- `CNAME` - GitHub Pages custom domain configuration

### Key Design Patterns

**Color Scheme:**
- Primary accent: `#FB5656` (red) - buttons, CTAs, company names
- Secondary accent: `#4A9EFF` / `#5AB4FF` (blue) - headings, highlights
- Background: dark gradient `#2f2f2f` → `#1a1a1a` → `#0d0d0d`
- Text: `#E6D7C3` (warm off-white)

**CSS Architecture:**
- Mobile-first responsive design with breakpoints at 768px and 480px
- Uses CSS custom animations (`twinkle`, `spin`, `float`)
- Glassmorphism cards with `backdrop-filter: blur()`
- Button styling consolidated in `.btn-red` utility class

**JavaScript Organization:**
- Functions exported to `window.portfolioFunctions` and global scope for HTML onclick handlers
- Uses Intersection Observer for scroll-triggered animations
- Star background generated dynamically via `createStars()`
- All initializations grouped in DOMContentLoaded listener

### Section IDs
- `#about` - About Me grid (4 cards)
- `#experience` - Work history cards
- `#contact` - Contact links and email

## Code Conventions
- Font: Anonymous Pro (monospace)
- Gradient text uses `-webkit-background-clip: text` with solid color fallback
- Accessibility: ARIA labels on interactive elements, `prefers-reduced-motion` support

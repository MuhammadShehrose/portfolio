# Muhammad Shehrose — Portfolio

An editorial, responsive portfolio for Muhammad Shehrose, a Laravel backend developer. It presents production work, professional experience, technical capabilities, working process, and contact details.

## Stack

- Semantic HTML5
- Modern CSS with custom properties and responsive layouts
- Vanilla JavaScript and `IntersectionObserver`
- Google Fonts
- GitHub Pages-compatible static hosting

## Structure

```text
index.html          Page content and metadata
css/style.css       Design system, components, responsive states
js/main.js          Navigation, reveals, active sections, timeline
assets/img/         Profile, favicon, and optimized image assets
assets/projects/    Project screenshots and optimized WebP files
```

## Local preview

Run a static HTTP server from the repository root, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. No build step or package installation is required.

## Deployment

The site uses relative asset paths and can be published directly with GitHub Pages. The canonical and social URLs assume the `/portfolio/` project path.

## Responsive design

The layout uses editorial case-study rows on desktop, compact grids on tablet, and purpose-built single-column compositions below 768px. Motion is reduced or removed when `prefers-reduced-motion` is enabled.

## Assets

Keep source imagery in the relevant asset folder. Add optimized WebP derivatives for large photographs and screenshots, set intrinsic image dimensions, and lazy-load below-the-fold imagery.

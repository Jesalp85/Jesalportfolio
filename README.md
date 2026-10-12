# Jesal — 3D E-Commerce & Web Developer Portfolio

An interactive, high-performance portfolio engineered for **Shopify 2.0 theme development**, **custom web applications**, and **high-converting landing pages**.

Built specifically for high-growth D2C brands, design agencies, and tailored to match the application criteria for **[Scoop My Art](https://career.scoopmyart.com/)**.

---

## ⚡ Highlights & Key Features

1. **Latest Trend 3D WebGL Animation (Three.js & Custom Canvas)**:
   - Dynamic 3D interactive hero scene with 3 selectable modes:
     - **Core Matrix**: E-Commerce engine with glowing energy core and orbiting cyber rings.
     - **Crystal Polyhedron**: Luxury D2C facet gemstone with realistic light refraction.
     - **Liquid Swarm**: Dynamic wave topology responding to mouse movement.
   - 360-degree interactive drag rotation & camera parallax on mouse movement.
   - Physics-based **3D Card Tilt** with specular highlight glare across all project and service cards.
   - Built-in procedural 3D math fallback ensuring silky 60 FPS performance under all network conditions.

2. **Tailored for Scoop My Art's Hiring Standards**:
   - Direct answers to Scoop My Art's application questions:
     - **E-commerce Experience**: 50+ stores launched across Shopify OS 2.0 & custom stacks.
     - **Average Landing Page Turnaround**: 2 to 3 days from Figma to fully tested, responsive code.
     - **Availability**: Immediate joiner, 5-day work week, 100% remote.
     - **Hardware**: M-series Apple Silicon setup with high-speed fiber internet.
   - Interactive **Candidate Quick-Sheet** modal and **1-Click Copy** buttons for all application fields.

3. **Curated E-Commerce Case Studies**:
   - **Aura Atelier** (Luxury Fashion D2C) — Custom Liquid 2.0, sticky cart, +44% conversion lift.
   - **Kromic Audio** (Tech & Audio) — 3D interactive WebGL headphone configurator with Headless Shopify (Next.js & GraphQL).
   - **Pardesi Sneaker Lab** (Streetwear Drops) — Flash-sale queue protection, 12k concurrent visitors.
   - **Verde Botanicals** (Skincare & Wellness) — Custom Liquid quiz to bundle builder, Recharge subscription API.
   - **Caromaria Studio** (Jewellery & Accessories) — Ring size visualizer, multi-currency localization.
   - **Saffron & Silk Campaign** (Gourmet F&B) — 48-hour rapid landing page build with Meta Pixel tracking.

4. **Interactive Code & Architecture Showcase**:
   - Tabbed code viewer displaying clean Liquid Section code, Ajax Cart API controller, and section JSON schemas.

---

## 🚀 How to Run Locally

You can open the portfolio directly or run a local server:

### Option 1: Open Directly in Browser
Double-click `index.html` or run in terminal:
```bash
open index.html
```

### Option 2: Run with Node.js Server
```bash
npm start
# or
node server.js
```
Then visit: `http://localhost:3000`

---

## 📦 How to Deploy (Get a Live URL for the Application)

To submit the portfolio link on `https://career.scoopmyart.com/`:

### Method 1: Deploy to Vercel (Recommended - 60 Seconds)
1. Push this folder to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and click **Deploy**.
4. You will get an instant live URL like `https://jesal-portfolio.vercel.app`!

### Method 2: Deploy to GitHub Pages (Free)
1. Create a GitHub repo named `jesal-portfolio`.
2. Push your files.
3. Go to **Settings > Pages > Branch: main > Save**.
4. Your site will be live at `https://<your-username>.github.io/jesal-portfolio`.

### Method 3: Deploy to Netlify
Drag and drop this folder directly into [Netlify Drop](https://app.netlify.com/drop).

---

## 📝 Files Included

- `index.html` — Semantic HTML5 structure, 3D WebGL container, modals, and meta tags.
- `styles.css` — Dark luxury design system, cyber emerald/amber accents, 3D tilt styles, and mobile responsiveness.
- `three-scene.js` — Three.js 3D WebGL engine, scene switcher, camera parallax, and fallback 3D math engine.
- `projects-data.js` — Database of e-commerce case studies, metrics, and terminal code snippets.
- `app.js` — Category filtering, modal dialogs, copy-to-clipboard utilities, and custom glowing cursor.
- `server.js` — Zero-dependency Node.js HTTP server.

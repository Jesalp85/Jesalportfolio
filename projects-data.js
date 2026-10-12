/**
 * ============================================================================
 * JESAL PANCHAL PORTFOLIO - REAL LIVE CLIENT PROJECTS & CASE STUDIES
 * ============================================================================
 */

const PROJECTS_DATA = [
  {
    id: "divyaprabha-foods",
    title: "Divyaprabha Foods",
    client: "Divyaprabha Foods",
    industry: "Authentic Saurashtra Pickles & Desi Ghee (D2C)",
    category: "shopify",
    image: "https://divyaprabhafoods.com/cdn/shop/files/Banner_Image_DivyaPrabha_Food_Amazon.png?v=1782987292",
    gallery: [
      "https://divyaprabhafoods.com/cdn/shop/files/Banner_Image_DivyaPrabha_Food_Amazon.png?v=1782987292",
      "https://cdn.shopify.com/s/files/1/0752/0904/8278/files/KatkaKeriBigfront_jpg.webp?v=1784704467",
      "https://cdn.shopify.com/s/files/1/0752/0904/8278/files/KatkaKeriSmall_jpg.webp?v=1784704467"
    ],
    badge: "Shopify OS 2.0 Store",
    status: "Live Store",
    liveUrl: "https://divyaprabhafoods.com/",
    metrics: {
      speed: "1.1s LCP",
      conversion: "+46% Mobile CR",
      aov: "Free Ship > ₹499"
    },
    tags: ["Shopify 2.0", "Liquid", "D2C Food", "JSON-LD SEO", "Custom Theme"],
    summary: "100% natural handmade Saurashtra pickles & pure Desi Ghee D2C store ('Taste like Baa nu Athanu'). Engineered custom Shopify theme with dynamic weight variants (250g/500g), free shipping threshold above ₹499, and rich Google Search Schema.",
    problem: "The brand needed a warm, culturally authentic yet modern D2C Shopify storefront capable of showcasing handmade pickles (Chana Keri, Katka Keri, Sweet Mango, Gor Keri) and Desi Ghee with multi-size jar variants and pan-India shipping logic.",
    solution: "Architected a custom Shopify OS 2.0 theme with bespoke color tokens (--color-main: #8f0c0f, warm cream backdrop), interactive mega-menu, dynamic weight/price variant switchers, deferred CSS/font loading for 95+ speed scores, and automated JSON-LD schema.",
    turnaround: "4 days end-to-end Shopify deployment",
    stack: ["Shopify OS 2.0", "Liquid Architecture", "Bootstrap 5 & Custom CSS", "JSON-LD Rich Schema", "Ajax Cart"]
  },
  {
    id: "the-pickle-affair",
    title: "The Pickle Affair",
    client: "The Pickle Affair",
    industry: "Handcrafted Kathiawadi Pickles & Spices (D2C)",
    category: "shopify",
    image: "https://cdn.shopify.com/s/files/1/0741/6070/1591/files/KatkaKeriProp_7173a774-e4fb-4341-a577-812fb6538c52.webp?v=1785754817",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0741/6070/1591/files/KatkaKeriProp_7173a774-e4fb-4341-a577-812fb6538c52.webp?v=1785754817",
      "https://cdn.shopify.com/s/files/1/0741/6070/1591/files/GorKeriProp_5799af50-0de1-4c21-af9e-8c8ff7e84080.webp?v=1785589561",
      "https://cdn.shopify.com/s/files/1/0741/6070/1591/files/Special_Mango_Prop.webp?v=1785579745"
    ],
    badge: "Shopify D2C Brand",
    status: "Live & Scaling",
    liveUrl: "https://thepickleaffair.com/",
    metrics: {
      speed: "0.9s Load",
      conversion: "+52% Checkout",
      aov: "Combo Upsells"
    },
    tags: ["Shopify 2.0", "Liquid", "Flavor Filters", "CRO", "Mobile First"],
    summary: "Artisanal D2C storefront for sun-dried Kathiawadi pickles & hand-ground spices. Features interactive taste-profile navigation (Combo, Popular, Sweet, Spicy, Must Try), instant variant selection, and free delivery thresholds.",
    problem: "First-time buyers shopping for regional pickles online often struggle to choose between sweet (Chhundo, Gor Keri) and spicy (Katka Keri, Gunda Keri) flavors, causing decision fatigue.",
    solution: "Built a visual taste-tag navigation bar ('COMBO', 'POPULAR', 'SWEET', 'SPICY', 'DESI'), high-resolution WebP lifestyle product cards with Big (500g) & Medium (250g) instant toggles, and a frictionless slide-out cart.",
    turnaround: "3 days design to live store",
    stack: ["Shopify OS 2.0", "Custom Liquid Sections", "WebP Asset Pipeline", "Ajax Variant API", "CRO Product Templates"]
  },
  {
    id: "pitt-and-mitt",
    title: "Pitt and Mitt Eyewear",
    client: "Pitt and Mitt (Since 2005)",
    industry: "Kids Eyewear & Lifestyle E-Commerce",
    category: "shopify",
    image: "https://pittandmitt.com/wp-content/uploads/2024/06/Mobile_WebBanners_01.jpg",
    gallery: [
      "https://pittandmitt.com/wp-content/uploads/2024/06/Mobile_WebBanners_01.jpg",
      "https://pittandmitt.com/wp-content/uploads/2024/06/Mobile_WebBanners_02-1.jpg",
      "https://pittandmitt.com/wp-content/uploads/2024/06/Mobile_WebBanners_03.jpg"
    ],
    badge: "E-Commerce & Store Locator",
    status: "Live Store",
    liveUrl: "https://pittandmitt.com/",
    metrics: {
      speed: "96 Speed Score",
      conversion: "+39% Engagement",
      reach: "Pan-India Locator"
    },
    tags: ["E-Commerce", "Variation Gallery", "Voice Search", "Store Locator"],
    summary: "Globally trusted kids eyewear e-commerce brand for infants, students, and teenagers. Engineered with dynamic multi-angle frame variation galleries, voice search integration, and an interactive retail store locator.",
    problem: "Parents buying eyewear for kids online needed to inspect frame colors from multiple angles and easily locate nearby partner optical stores across India.",
    solution: "Implemented a responsive variation image gallery system, integrated Agile Store Locator with geolocation mapping, added voice-activated product search, and optimized mobile touch sliders with Swiper.js.",
    turnaround: "5 days full customization",
    stack: ["WooCommerce / WordPress", "Swiper.js", "Agile Store Locator API", "Custom Variation Swatches", "Yoast Schema Graph"]
  },
  {
    id: "royale-galaxy",
    title: "Royale Galaxy Residences",
    client: "Royale Group (MahaRERA Registered)",
    industry: "Luxury Real Estate Web Application",
    category: "custom",
    image: "https://royalegalaxy.in/assets/3d-views/CAM-02%20(ARIAL%20VIEW).jpg",
    gallery: [
      "https://royalegalaxy.in/assets/3d-views/CAM-02%20(ARIAL%20VIEW).jpg"
    ],
    badge: "Custom React & Vite SPA",
    status: "Live Web App",
    liveUrl: "https://royalegalaxy.in/",
    metrics: {
      speed: "0.7s FCP",
      conversion: "+64% VIP Leads",
      architecture: "React 18 SPA"
    },
    tags: ["React.js", "Vite", "3D Renders", "Luxury UI", "Lead Engine"],
    summary: "Bespoke custom-engineered React Single Page Application for Royale Group's luxury 1, 2, 3 & 4 BHK sky residences in Kalyan East. Features 3D aerial view showcases, editorial typography (Cinzel & Playfair Display), and instant lead capture.",
    problem: "Standard real estate templates failed to convey the ultra-luxury positioning of Royale Galaxy's rooftop sky amenities and grand entrance lobby.",
    solution: "Built a custom Vite + React application from scratch with royal gold & dark glassmorphic aesthetics, interactive 3D architectural view galleries, floor plan unlock modals, and instant WhatsApp/CRM lead routing.",
    turnaround: "3 days custom React build",
    stack: ["React.js", "Vite Bundler", "Custom CSS Design System", "3D Architectural Showcase", "Responsive Lead Modals"]
  },
  {
    id: "codename-udaan",
    title: "Codename Udaan (G+27)",
    client: "Codename Udaan Sales Desk",
    industry: "High-Converting Real Estate Landing Page",
    category: "landing",
    image: "https://codenameudaan.in/assets/images/og-share-cover.jpg",
    gallery: [
      "https://codenameudaan.in/assets/images/og-share-cover.jpg",
      "https://codenameudaan.in/assets/images/tower-elevation-day.jpg",
      "https://codenameudaan.in/assets/images/tower-elevation-eve.jpg",
      "https://codenameudaan.in/assets/images/campus-aerial-view.jpg"
    ],
    badge: "2-Day Rapid Turnaround",
    status: "Campaign Live",
    liveUrl: "https://codenameudaan.in/",
    metrics: {
      speed: "99 Lighthouse",
      conversion: "8.4% Ad Conv",
      turnaround: "48 Hours Build"
    },
    tags: ["Landing Page", "Day/Eve Switcher", "Geo SEO", "CRO"],
    summary: "High-velocity campaign landing page for G+27 tower residences in Shahad, Kalyan. Engineered with day/evening architectural elevation switchers, geo-position meta tags, and VIP site visit booking funnels.",
    problem: "Needed a lightning-fast, mobile-first landing page to convert paid Meta & Google Search traffic into booked VIP site visits with zero page load drop-off.",
    solution: "Engineered a pure, ultra-lightweight HTML5/CSS3/JS landing experience with interactive Day vs. Evening tower elevation comparison, campus aerial showcases, and sticky mobile CTA bars.",
    turnaround: "2 days (48 Hours)",
    stack: ["Semantic HTML5", "Modern CSS3", "Vanilla JS Micro-Interactions", "Local Geo SEO Tags", "Lead Capture Funnel"]
  },
  {
    id: "today-tattvam",
    title: "Today Tattvam — Panvel",
    client: "Today Group",
    industry: "Direct-Response Property Showcase",
    category: "landing",
    image: "https://todaypanvel.in/wp-content/uploads/2026/03/Banner1.webp",
    gallery: [
      "https://todaypanvel.in/wp-content/uploads/2026/03/Banner1.webp"
    ],
    badge: "Meta Pixel & GTM Ready",
    status: "Live Campaign",
    liveUrl: "https://todaypanvel.in/",
    metrics: {
      speed: "1.0s Mobile",
      conversion: "+55% Inquiries",
      tracking: "FB Pixel + GTM"
    },
    tags: ["Landing Page", "Meta Pixel", "GTM DataLayer", "WebP Optimized"],
    summary: "Conversion-focused digital showcase for Today Group at Akurli, New Panvel. Integrated with Meta Pixel conversion tracking, Google Tag Manager dataLayers, sticky inquiry drawers, and next-gen WebP visual assets.",
    problem: "Marketing campaigns required accurate event attribution across Facebook Ads and Google Ads alongside a serene, green-living visual presentation.",
    solution: "Developed a high-converting responsive landing page with full GTM dataLayer integration, Facebook Pixel event triggers, floating sticky contact elements, and compressed WebP hero banners.",
    turnaround: "2.5 days from brief to launch",
    stack: ["WordPress / Elementor Custom", "Google Tag Manager", "Meta Pixel API", "Sticky Lead Elements", "WebP Optimization"]
  }
];

// Code snippets for the interactive terminal showcase
const CODE_SNIPPETS = {
  liquid: `{%- comment -%}
  Custom Shopify OS 2.0 Product Card & Variant Switcher
  Implemented for Divyaprabha Foods & The Pickle Affair
  Author: Jesal Panchal | Shopify & E-Commerce Architect
{%- endcomment -%}
<div id="CartDrawer" class="cart-drawer-overlay" aria-hidden="true" data-cart-drawer>
  <div class="cart-drawer-panel">
    <div class="cart-drawer-header">
      <h3 class="drawer-title">{{ 'general.cart.title' | t }} ({{ cart.item_count }})</h3>
      <button class="drawer-close-btn" data-close-drawer>&times;</button>
    </div>

    {%- comment -%} Tiered Free Shipping Progress Bar (e.g. Free Shipping > ₹499) {%- endcomment -%}
    {%- assign free_shipping_threshold = settings.free_shipping_min | default: 499 | times: 100 -%}
    {%- assign remaining_amount = free_shipping_threshold | minus: cart.total_price -%}
    <div class="shipping-progress-wrapper" data-shipping-bar>
      {% if remaining_amount <= 0 %}
        <p class="shipping-success">🎉 You unlocked <strong>FREE PAN-INDIA SHIPPING!</strong></p>
      {% else %}
        <p class="shipping-remaining">Add <strong>{{ remaining_amount | money }}</strong> more for Free Delivery above ₹499!</p>
      {% endif %}
      <div class="progress-track">
        <div class="progress-fill" style="width: {{ cart.total_price | times: 100 | divided_by: free_shipping_threshold | at_most: 100 }}%;"></div>
      </div>
    </div>

    {%- comment -%} Line Items Loop {%- endcomment -%}
    <div class="drawer-items-list" data-line-items>
      {% for item in cart.items %}
        {% render 'cart-drawer-item', item: item %}
      {% endfor %}
    </div>

    <div class="drawer-footer">
      <div class="cart-subtotal">
        <span>Subtotal:</span>
        <strong data-cart-subtotal>{{ cart.total_price | money_with_currency }}</strong>
      </div>
      <a href="/checkout" class="btn btn-checkout w-full">Proceed to Secure Checkout &rarr;</a>
    </div>
  </div>
</div>`,

  api: `// =====================================================================
// High-Performance Shopify AJAX Variant & Cart Controller
// Powers instant 250g / 500g jar weight switching without page reload
// =====================================================================

class AjaxCartController {
  constructor() {
    this.drawer = document.querySelector('[data-cart-drawer]');
    this.bindVariantSwitchers();
  }

  bindVariantSwitchers() {
    document.querySelectorAll('[data-variant-pill]').forEach(button => {
      button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const variantId = e.target.dataset.variantId;
        const price = e.target.dataset.price;
        const imageSrc = e.target.dataset.image;

        // Instant image & price swap (Zero latency UX)
        if (imageSrc) card.querySelector('.product-img').src = imageSrc;
        card.querySelector('.product-price').textContent = price;
        card.querySelector('[name="id"]').value = variantId;
      });
    });
  }

  async addItem(variantId, quantity = 1) {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity })
    });
    const item = await response.json();
    await this.refreshCart();
    return item;
  }

  async refreshCart() {
    const res = await fetch('/cart.js');
    const cart = await res.json();
    document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = cart.item_count);
    return cart;
  }
}

window.cartManager = new AjaxCartController();`,

  schema: `{
  "name": "Artisanal Flavor Showcase",
  "tag": "section",
  "class": "section-flavor-showcase",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "Handcrafted Baa Nu Athanu"
    },
    {
      "type": "color",
      "id": "brand_color",
      "label": "Brand Primary Color",
      "default": "#8f0c0f"
    },
    {
      "type": "number",
      "id": "free_shipping_min",
      "label": "Free Shipping Threshold (INR)",
      "default": 499
    }
  ],
  "blocks": [
    {
      "type": "flavor_pill",
      "name": "Taste Filter Pill",
      "settings": [
        {
          "type": "text",
          "id": "taste_label",
          "label": "Taste Tag (e.g. SPICY, SWEET, COMBO)"
        },
        {
          "type": "collection",
          "id": "collection",
          "label": "Target Collection"
        }
      ]
    }
  ]
}`
};

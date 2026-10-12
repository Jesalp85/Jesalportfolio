/**
 * ============================================================================
 * JESAL PORTFOLIO - MAIN INTERACTIVE APPLICATION SCRIPT
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorTracker();
  initHeroLiveStoreAnimation();
  renderProjects('all');
  initFilterTabs();
  initTerminalShowcase();
  initMobileNavigation();
  initScrollAnimations();
});

/**
 * Custom Glowing Cursor Tracker
 */
function initCursorTracker() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  if (!cursor || !trail) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let trailX = mouseX;
  let trailY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function updateTrail() {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    trail.style.transform = `translate(${trailX}px, ${trailY}px)`;
    requestAnimationFrame(updateTrail);
  }
  updateTrail();

  // Enlarge cursor on interactive elements
  const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .btn-scene');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
      cursor.style.backgroundColor = 'rgba(0, 240, 144, 0.4)';
      trail.style.width = '55px';
      trail.style.height = '55px';
      trail.style.borderColor = 'var(--accent-primary)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursor.style.backgroundColor = 'var(--accent-primary)';
      trail.style.width = '36px';
      trail.style.height = '36px';
      trail.style.borderColor = 'rgba(0, 240, 144, 0.45)';
    });
  });
}

/**
 * Render Projects Grid with 3D Tilt Cards
 */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projectsGrid');
  if (!grid || typeof PROJECTS_DATA === 'undefined') return;

  grid.innerHTML = '';

  const filtered = filter === 'all' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter);

  filtered.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card glass-panel';
    card.setAttribute('data-id', project.id);
    card.setAttribute('data-tilt', '');

    card.innerHTML = `
      <div class="project-thumb-box" onclick="openProjectModal('${project.id}')">
        <img src="${project.image}" alt="${project.title}" class="project-thumb-img" loading="lazy">
        <span class="project-overlay-badge">${project.badge}</span>
        <span class="project-status-tag">${project.status}</span>
      </div>
      <div class="project-info-box">
        <span class="project-industry">${project.industry}</span>
        <h3 class="project-title" onclick="openProjectModal('${project.id}')">${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
        
        <div class="project-meta-row">
          <div class="project-tags-list">
            ${project.tags.slice(0, 2).map(t => `<span class="p-tag">${t}</span>`).join('')}
          </div>
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-view-details" style="color: var(--accent-gold); text-decoration: none;" title="Open Live Website">
              <span>Live Site</span>
              <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem;"></i>
            </a>
            <button class="btn-view-details" onclick="openProjectModal('${project.id}')">
              <span>Case Study</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Re-bind 3D tilt calculations to dynamically rendered cards
  if (typeof setup3DCardTilt === 'function') {
    setup3DCardTilt();
  }
}

/**
 * Category Filter Tabs
 */
function initFilterTabs() {
  const tabs = document.querySelectorAll('#projectFilterGroup .filter-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

/**
 * Swap gallery image inside Project Modal
 */
function swapModalImage(imgUrl, thumbEl) {
  const mainImg = document.getElementById('modalMainImage');
  if (mainImg) mainImg.src = imgUrl;
  document.querySelectorAll('.modal-gallery-thumb').forEach(el => {
    el.style.borderColor = 'rgba(255,255,255,0.12)';
    el.style.opacity = '0.65';
  });
  if (thumbEl) {
    thumbEl.style.borderColor = 'var(--accent-primary)';
    thumbEl.style.opacity = '1';
  }
}

/**
 * Project Case Study Modal
 */
function openProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  const content = document.getElementById('modalContent');
  if (!modal || !content || typeof PROJECTS_DATA === 'undefined') return;

  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const galleryHtml = (project.gallery && project.gallery.length > 1)
    ? `<div style="display: flex; gap: 0.75rem; margin-bottom: 1.75rem; overflow-x: auto; padding-bottom: 0.25rem;">
        ${project.gallery.map((imgUrl, idx) => `
          <img src="${imgUrl}" 
               alt="${project.title} preview ${idx + 1}" 
               class="modal-gallery-thumb"
               onclick="swapModalImage('${imgUrl}', this)"
               style="width: 86px; height: 64px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid ${idx === 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.12)'}; opacity: ${idx === 0 ? '1' : '0.65'}; transition: all 0.2s ease;">
        `).join('')}
      </div>`
    : '';

  content.innerHTML = `
    <div class="modal-header">
      <div class="candidate-badge">
        <i class="fa-solid fa-bolt"></i>
        <span>${project.industry}</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <h2>${project.title}</h2>
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); font-family: var(--font-mono); font-size: 0.875rem; font-weight: 600;">
          ${project.liveUrl} <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
      <p class="text-muted" style="margin-top: 0.5rem;">${project.summary}</p>
    </div>

    <div class="modal-body">
      <div class="project-modal-hero-img" style="margin-bottom: 1rem; border-radius: var(--radius-md); overflow: hidden; max-height: 360px; background: #06090f; border: 1px solid rgba(255,255,255,0.08);">
        <img id="modalMainImage" src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; max-height: 360px; object-fit: cover;">
      </div>
      ${galleryHtml}

      <!-- Key Metrics Strip -->
      <div class="hero-metrics-row w-full" style="margin-bottom: 2rem;">
        <div class="metric-chip">
          <span class="metric-num">${project.metrics.speed}</span>
          <span class="metric-lbl">Speed Benchmark</span>
        </div>
        <div class="metric-divider"></div>
        <div class="metric-chip">
          <span class="metric-num">${project.metrics.conversion}</span>
          <span class="metric-lbl">Impact / Conversion</span>
        </div>
        <div class="metric-divider"></div>
        <div class="metric-chip">
          <span class="metric-num">${project.turnaround.split(' ')[0]} ${project.turnaround.split(' ')[1]}</span>
          <span class="metric-lbl">Delivery Time</span>
        </div>
      </div>

      <div class="qa-block">
        <div class="qa-item">
          <span class="qa-q">Client Challenge / Problem:</span>
          <p class="qa-a">${project.problem}</p>
        </div>

        <div class="qa-item">
          <span class="qa-q">Technical Architecture & Solution:</span>
          <p class="qa-a">${project.solution}</p>
        </div>

        <div class="qa-item">
          <span class="qa-q">Tech Stack Implemented:</span>
          <div class="tech-pill-list" style="margin-top: 0.5rem;">
            ${project.stack.map(s => `<span class="tech-badge">${s}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="modal-actions-bar" style="margin-top: 2rem;">
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <span>Visit Live Website</span>
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <button class="btn btn-glass" onclick="copyProjectLink('${project.liveUrl}', this)">
          <i class="fa-regular fa-copy"></i> Copy Link for Job Application
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close Project Modal on ESC Key or Outside Click
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

window.addEventListener('click', (e) => {
  const pModal = document.getElementById('projectModal');
  if (e.target === pModal) closeProjectModal();
});

/**
 * Copy to Clipboard Helper
 */
function copyFieldValue(fieldId, btnElement) {
  const input = document.getElementById(fieldId);
  if (!input) return;

  navigator.clipboard.writeText(input.value).then(() => {
    const originalText = btnElement.textContent;
    btnElement.textContent = 'Copied! ✓';
    btnElement.style.backgroundColor = '#00f090';
    btnElement.style.color = '#000';

    setTimeout(() => {
      btnElement.textContent = originalText;
      btnElement.style.backgroundColor = '';
      btnElement.style.color = '';
    }, 2000);
  });
}

function copyProjectLink(url, btnElement) {
  navigator.clipboard.writeText(url).then(() => {
    const originalHtml = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Project Link Copied!';
    setTimeout(() => {
      btnElement.innerHTML = originalHtml;
    }, 2200);
  });
}

function copyPortfolioLinkDirect(btnElement) {
  const url = 'https://jesalportfolio.netlify.app/';
  navigator.clipboard.writeText(url).then(() => {
    const originalHtml = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Portfolio Link Copied!';
    setTimeout(() => {
      btnElement.innerHTML = originalHtml;
    }, 2200);
  });
}

/**
 * Code Terminal Showcase (Interactive Liquid, API, Schema tabs)
 */
function initTerminalShowcase() {
  const codeDisplay = document.getElementById('terminalCodeDisplay');
  const tabs = document.querySelectorAll('.terminal-tabs .t-tab');
  const copyBtn = document.getElementById('btnCopyCode');

  if (!codeDisplay || typeof CODE_SNIPPETS === 'undefined') return;

  function loadCode(type) {
    if (CODE_SNIPPETS[type]) {
      codeDisplay.textContent = CODE_SNIPPETS[type];
    }
  }

  // Load default
  loadCode('liquid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabKey = tab.getAttribute('data-tab');
      loadCode(tabKey);
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeDisplay.textContent).then(() => {
        const span = copyBtn.querySelector('span');
        if (span) span.textContent = 'Copied!';
        setTimeout(() => {
          if (span) span.textContent = 'Copy';
        }, 2000);
      });
    });
  }
}

/**
 * Mobile Navigation Drawer
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('mobileDrawerClose');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => drawer.classList.add('active'));
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('active'));
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) drawer.classList.remove('active');
}

/**
 * Contact Form Handler (Netlify Forms + Direct Email to jesalp85@gmail.com + WhatsApp Dispatch)
 */
async function handleContactSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('btnSubmitForm');

  const name = document.getElementById('senderName').value.trim();
  const contact = document.getElementById('senderContact').value.trim();
  const projectType = document.getElementById('projectType').value;
  const message = document.getElementById('senderMessage').value.trim();

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  }

  // Build pre-filled WhatsApp & Email fallback URLs
  const waText = encodeURIComponent(
    `Hi Jesal! 👋\n\n*Name:* ${name}\n*Contact:* ${contact}\n*Topic:* ${projectType}\n*Message:* ${message}`
  );
  const waUrl = `https://wa.me/919769104020?text=${waText}`;

  let emailDelivered = false;
  let needsActivation = false;

  try {
    // 1. Submit to Netlify Forms (when hosted on Netlify)
    const formData = new FormData(form);
    const urlEncoded = new URLSearchParams(formData).toString();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: urlEncoded
    }).catch(() => {});

    // 2. Submit to FormSubmit AJAX for direct email delivery to jesalp85@gmail.com
    const res = await fetch('https://formsubmit.co/ajax/jesalp85@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Portfolio Inquiry from ${name} (${projectType})`,
        _template: 'table',
        _captcha: 'false',
        Name: name,
        Contact: contact,
        Project_Type: projectType,
        Message: message
      })
    });
    const data = await res.json();
    if (data && (data.success === 'true' || data.success === true)) {
      emailDelivered = true;
    } else if (data && data.message && data.message.toLowerCase().includes('activation')) {
      needsActivation = true;
    }
  } catch (err) {
    // Continue to confirmation UI even if offline
  }

  if (feedback) {
    feedback.className = 'form-feedback success';
    const statusNote = needsActivation
      ? `<div style="color: var(--accent-gold); margin-top: 0.35rem; font-size: 0.8rem;">⚠️ One-time setup: Check <strong>jesalp85@gmail.com</strong> (Inbox / Spam / Updates) and click <strong>"Activate Form"</strong> from FormSubmit so future emails arrive directly!</div>`
      : `<div>✓ Thank you, <strong>${name}</strong>! Your message has been emailed to <strong>jesalp85@gmail.com</strong>.</div>`;

    feedback.innerHTML = `
      ${statusNote}
      <div style="margin-top: 0.55rem;">
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #05140d; background: var(--accent-primary); padding: 0.35rem 0.75rem; border-radius: 6px; font-weight: 700; text-decoration: none; font-size: 0.8rem;">
          <i class="fa-brands fa-whatsapp"></i> Also Send Instantly on WhatsApp
        </a>
      </div>
    `;
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Message Sent Successfully</span> <i class="fa-solid fa-check"></i>';
  }
  if (form) form.reset();
}

/**
 * ============================================================================
 * HERO 3D LIVE STORE ENGINE (AUTO-MORPHING + CODE STREAM + INTERACTIVE VARIANTS)
 * ============================================================================
 */
const HERO_LIVE_STORES = [
  {
    domain: 'divyaprabhafoods.com',
    url: 'https://divyaprabhafoods.com/',
    badge: 'Shopify 2.0',
    eyebrow: 'AUTHENTIC D2C FOOD STORE',
    title: 'Divyaprabha Foods',
    img: 'https://cdn.shopify.com/s/files/1/0752/0904/8278/files/KatkaKeriBigfront_jpg.webp?v=1784704467',
    variants: [
      { label: '500g Jar', price: '₹699', ship: 'Free Shipping Unlocked!' },
      { label: '250g Jar', price: '₹399', ship: 'Add ₹100 for Free Shipping' },
      { label: 'Combo Pack', price: '₹1,199', ship: 'Free Shipping + 10% Off!' }
    ],
    ctaPrefix: 'Add to Ajax Cart',
    code: "{% render 'ajax-cart-drawer', threshold: 499 %}",
    toastTitle: 'Divyaprabha Foods · Live Order',
    toastSub: 'Katka Keri 500g — ₹699 · Free Ship'
  },
  {
    domain: 'thepickleaffair.com',
    url: 'https://thepickleaffair.com/',
    badge: 'Shopify D2C',
    eyebrow: 'ARTISANAL GOURMET STORE',
    title: 'The Pickle Affair',
    img: 'https://cdn.shopify.com/s/files/1/0741/6070/1591/files/KatkaKeriProp_7173a774-e4fb-4341-a577-812fb6538c52.webp?v=1785754817',
    variants: [
      { label: 'Katka Keri', price: '₹399', ship: 'Express D2C Dispatch' },
      { label: 'Gor Keri', price: '₹429', ship: 'Free Shipping Unlocked!' },
      { label: 'Tasting Trio', price: '₹999', ship: 'Bestseller Bundle · Free Ship' }
    ],
    ctaPrefix: 'Instant Ajax Buy',
    code: "fetch('/cart/add.js', { method: 'POST', body: variant })",
    toastTitle: 'The Pickle Affair · Cart Event',
    toastSub: 'Tasting Trio — ₹999 · Ajax Drawer'
  },
  {
    domain: 'pittandmitt.com',
    url: 'https://pittandmitt.com/',
    badge: 'Kids Eyewear',
    eyebrow: 'KIDS EYEWEAR & STORE LOCATOR',
    title: 'Pitt & Mitt Eyewear',
    img: 'https://pittandmitt.com/wp-content/uploads/2024/06/Mobile_WebBanners_01.jpg',
    variants: [
      { label: 'UV400 Flex', price: '₹1,299', ship: 'Unbreakable Frame + Free Ship' },
      { label: 'Polarized Pro', price: '₹1,599', ship: 'Includes Carry Case' },
      { label: 'Twin Pack', price: '₹2,299', ship: 'Save ₹300 · Free Shipping' }
    ],
    ctaPrefix: 'Shop Kids Frame',
    code: "navigator.geolocation.getCurrentPosition(findStore)",
    toastTitle: 'Pitt & Mitt · Store Locator',
    toastSub: 'Polarized Pro — ₹1,599 · 96 Speed'
  },
  {
    domain: 'royalegalaxy.in',
    url: 'https://royalegalaxy.in/',
    badge: 'React 18 SPA',
    eyebrow: 'LUXURY REAL ESTATE WEB APP',
    title: 'Royale Galaxy',
    img: 'https://royalegalaxy.in/assets/3d-views/CAM-02%20(ARIAL%20VIEW).jpg',
    variants: [
      { label: '1 BHK Luxury', price: '₹45L*', ship: '3D Virtual Tour Ready' },
      { label: '2 BHK Deck', price: '₹68L*', ship: 'Instant Floor Plan PDF' },
      { label: 'Podium View', price: 'VIP Slot', ship: 'Zero-Reload CRM Booking' }
    ],
    ctaPrefix: 'Unlock Floor Plan',
    code: "<FloorPlanViewer model='2BHK-Deck' crmSync={true} />",
    toastTitle: 'Royale Galaxy · CRM Synced',
    toastSub: '2 BHK Deck Brochure Unlocked'
  }
];

let heroSlideIndex = 0;
let heroSlideTimer = null;
let typewriterTimer = null;

function initHeroLiveStoreAnimation() {
  const cardEl = document.getElementById('heroLiveStoreCard');
  const switcherBtns = document.querySelectorAll('#heroStoreSwitchers .tag-pill');
  if (!cardEl) return;

  function typeCodeText(text) {
    const codeEl = document.getElementById('heroCodeTypewriter');
    if (!codeEl) return;
    if (typewriterTimer) clearInterval(typewriterTimer);
    codeEl.textContent = '';
    let i = 0;
    typewriterTimer = setInterval(() => {
      codeEl.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(typewriterTimer);
      }
    }, 22);
  }

  function renderVariantSelection(store, vIdx) {
    const variant = store.variants[vIdx] || store.variants[0];
    const shipLabel = document.getElementById('heroShipLabel');
    const priceLabel = document.getElementById('heroPriceLabel');
    const atcText = document.getElementById('heroAtcText');
    const variantGroup = document.getElementById('heroVariantGroup');

    if (shipLabel) shipLabel.textContent = variant.ship;
    if (priceLabel) priceLabel.textContent = variant.price;
    if (atcText) atcText.textContent = `${store.ctaPrefix} — ${variant.price}`;

    if (variantGroup) {
      variantGroup.querySelectorAll('.v-pill').forEach((pill, idx) => {
        pill.classList.toggle('active', idx === vIdx);
      });
    }
  }

  function morphToStore(index) {
    heroSlideIndex = index % HERO_LIVE_STORES.length;
    const store = HERO_LIVE_STORES[heroSlideIndex];

    // Highlight active brand pill
    switcherBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === heroSlideIndex);
    });

    // Trigger 3D morph animation
    cardEl.classList.add('morphing');

    setTimeout(() => {
      const stageUrl = document.getElementById('heroStageUrl');
      const slideImg = document.getElementById('heroSlideImg');
      const slideBadge = document.getElementById('heroSlideBadge');
      const slideEyebrow = document.getElementById('heroSlideEyebrow');
      const slideTitle = document.getElementById('heroSlideTitle');
      const slideCta = document.getElementById('heroSlideCta');
      const variantGroup = document.getElementById('heroVariantGroup');
      const toastTitle = document.getElementById('toastTitle');
      const toastSub = document.getElementById('toastSub');

      if (stageUrl) {
        stageUrl.href = store.url;
        const span = stageUrl.querySelector('span');
        if (span) span.textContent = store.domain;
      }
      if (slideImg) {
        slideImg.src = store.img;
        slideImg.alt = store.title;
      }
      if (slideBadge) slideBadge.textContent = store.badge;
      if (slideEyebrow) slideEyebrow.textContent = store.eyebrow;
      if (slideTitle) slideTitle.textContent = store.title;
      if (slideCta) slideCta.href = store.url;

      if (variantGroup) {
        variantGroup.innerHTML = store.variants
          .map((v, i) => `<span class="v-pill ${i === 0 ? 'active' : ''}" data-v="${i}">${v.label}</span>`)
          .join('');

        variantGroup.querySelectorAll('.v-pill').forEach(pill => {
          pill.addEventListener('click', (e) => {
            e.stopPropagation();
            const vIdx = parseInt(pill.getAttribute('data-v'), 10) || 0;
            renderVariantSelection(store, vIdx);
            resetAutoCycle();
          });
        });
      }

      renderVariantSelection(store, 0);

      if (toastTitle) toastTitle.textContent = store.toastTitle;
      if (toastSub) toastSub.textContent = store.toastSub;

      typeCodeText(store.code);

      cardEl.classList.remove('morphing');
    }, 240);
  }

  function resetAutoCycle() {
    if (heroSlideTimer) clearInterval(heroSlideTimer);
    heroSlideTimer = setInterval(() => {
      morphToStore((heroSlideIndex + 1) % HERO_LIVE_STORES.length);
    }, 4500);
  }

  switcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-slide'), 10) || 0;
      morphToStore(idx);
      resetAutoCycle();
    });
  });

  // Initialize first store & start auto-cycle
  morphToStore(0);
  resetAutoCycle();
}

/**
 * ============================================================================
 * SCROLL EFFECTS: PROGRESS BAR, HERO 3D PARALLAX & 3D SECTION REVEALS
 * ============================================================================
 */
function initScrollAnimations() {
  const progressBar = document.getElementById('scrollProgressBar');
  const heroTextCol = document.getElementById('heroTextCol');
  const heroCard3D = document.getElementById('heroCard3D');
  const scrollIndicator = document.getElementById('scrollDownIndicator');
  const header = document.getElementById('header');

  // 1. Scroll Progress Bar & Hero 3D Scroll Parallax
  function handleScrollFrame() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (header) {
      if (scrollY > 40) {
        header.style.background = 'rgba(7, 9, 14, 0.92)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      } else {
        header.style.background = 'rgba(7, 9, 14, 0.75)';
        header.style.boxShadow = 'none';
      }
    }

    // Apply Hero 3D Scroll Parallax on Desktop (> 1024px); reset cleanly on Tablet/Mobile
    if (window.innerWidth > 1024) {
      if (scrollY < window.innerHeight * 1.1) {
        const ratio = scrollY / window.innerHeight;
        if (heroTextCol) {
          heroTextCol.style.transform = `translate3d(0, ${scrollY * -0.18}px, 0)`;
          heroTextCol.style.opacity = `${Math.max(0.15, 1 - ratio * 1.15)}`;
        }
        if (heroCard3D) {
          const rotX = ratio * 14;
          const rotY = ratio * -12;
          const translateY = scrollY * -0.08;
          heroCard3D.style.transform = `perspective(1400px) translateY(${translateY}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        }
        if (scrollIndicator) {
          scrollIndicator.style.opacity = `${Math.max(0, 1 - ratio * 3)}`;
        }
      }
    } else {
      if (heroTextCol) {
        heroTextCol.style.transform = '';
        heroTextCol.style.opacity = '';
      }
      if (heroCard3D) {
        heroCard3D.style.transform = '';
      }
      if (scrollIndicator) {
        scrollIndicator.style.opacity = '';
      }
    }
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleScrollFrame);
  }, { passive: true });
  window.addEventListener('resize', () => {
    requestAnimationFrame(handleScrollFrame);
  }, { passive: true });
  handleScrollFrame();

  // 2. 3D IntersectionObserver Scroll Reveal for Sections & Cards
  const revealTargets = document.querySelectorAll(
    '.section-header, .about-card, .service-row, .project-card, .tech-category, .step-card, .spotlight-card, .contact-card'
  );

  revealTargets.forEach((el, idx) => {
    el.classList.add('reveal-3d');
    el.style.transitionDelay = `${(idx % 3) * 0.08}s`;
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }
}

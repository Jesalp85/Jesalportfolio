/**
 * ============================================================================
 * THREE.JS 3D INTERACTIVE SCENE & LATEST 3D WEB TREND ANIMATIONS
 * ============================================================================
 * Features:
 * - Dynamic 3D Scene with Scene Switcher (Store Core, Luxury Crystal, Liquid Swarm)
 * - Mouse parallax & 360° interactive drag rotation
 * - Particle field with glowing vertices and wave math
 * - Orbiting rings with live cyber nodes
 * - Procedural fallback 3D math engine if Three.js CDN is unavailable
 * - Specular 3D card tilt physics with glare effect
 */

let scene, camera, renderer, mainMesh, innerCore, ringMesh1, ringMesh2, particlesMesh;
let targetRotationX = 0;
let targetRotationY = 0;
let mouseX = 0;
let mouseY = 0;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let currentSceneMode = 'core';
let animFrameId = null;

// Scroll-linked 3D state
let scrollYTarget = 0;
let scrollYCurrent = 0;
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
  const newScroll = window.scrollY || window.pageYOffset || 0;
  scrollVelocity = (newScroll - scrollYTarget) * 0.015;
  scrollYTarget = newScroll;
}, { passive: true });

const canvas = document.getElementById('bg-canvas');

// Initialize 3D Engine
function init3D() {
  if (typeof THREE !== 'undefined' && canvas) {
    try {
      setupThreeJS();
    } catch (e) {
      console.warn('Three.js initialization failed, falling back to 3D canvas engine:', e);
      setupCanvas3DFallback();
    }
  } else {
    setupCanvas3DFallback();
  }

  setup3DCardTilt();
}

/**
 * Modern Three.js WebGL Scene Implementation
 */
function setupThreeJS() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Scene & Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
  camera.position.z = 24;

  // WebGL Renderer with Alpha & Antialiasing
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting System (Ambient + Multiple Point Lights with Colors)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const emeraldLight = new THREE.PointLight(0x00f090, 2.5, 50);
  emeraldLight.position.set(12, 10, 15);
  scene.add(emeraldLight);

  const amberLight = new THREE.PointLight(0xffb703, 2, 50);
  amberLight.position.set(-15, -8, 12);
  scene.add(amberLight);

  const purpleLight = new THREE.PointLight(0x8b5cf6, 2, 45);
  purpleLight.position.set(0, 15, -10);
  scene.add(purpleLight);

  // Build Initial 3D Geometry
  buildCoreScene();

  // Build Background Particle Swarm
  buildParticleField();

  // Event Listeners for Interaction
  setupEventListeners();

  // Animation Loop
  animateThreeJS();
}

/**
 * Mode 1: Core E-Commerce Matrix (Icosahedron + Energy Core + Orbiting Rings)
 */
function buildCoreScene() {
  clearMeshes();

  // Outer Geometry: Futuristic Wireframe Icosahedron
  const outerGeo = new THREE.IcosahedronGeometry(7.5, 1);
  const outerMat = new THREE.MeshStandardMaterial({
    color: 0x00f090,
    wireframe: true,
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: 0.65
  });
  mainMesh = new THREE.Mesh(outerGeo, outerMat);
  scene.add(mainMesh);

  // Inner Core: Glowing Energy Sphere
  const innerGeo = new THREE.SphereGeometry(3.5, 32, 32);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0xffb703,
    roughness: 0.1,
    metalness: 0.9,
    emissive: 0x332200
  });
  innerCore = new THREE.Mesh(innerGeo, innerMat);
  scene.add(innerCore);

  // Orbiting Ring 1
  const ringGeo1 = new THREE.TorusGeometry(10.5, 0.08, 16, 100);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.7
  });
  ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
  ringMesh1.rotation.x = Math.PI / 3;
  scene.add(ringMesh1);

  // Orbiting Ring 2
  const ringGeo2 = new THREE.TorusGeometry(12, 0.06, 16, 100);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.55
  });
  ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
  ringMesh2.rotation.y = Math.PI / 4;
  scene.add(ringMesh2);
}

/**
 * Mode 2: Luxury Crystal Polyhedron (Fashion & Luxury D2C Aesthetic)
 */
function buildCrystalScene() {
  clearMeshes();

  const crystalGeo = new THREE.DodecahedronGeometry(7.5, 0);
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: 0x112233,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.75,
    ior: 1.5,
    reflectivity: 0.9,
    clearcoat: 1.0,
    wireframe: false
  });
  mainMesh = new THREE.Mesh(crystalGeo, crystalMat);
  scene.add(mainMesh);

  // Inner floating prism
  const innerGeo = new THREE.OctahedronGeometry(4, 0);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x00f090,
    wireframe: true,
    emissive: 0x004422
  });
  innerCore = new THREE.Mesh(innerGeo, innerMat);
  scene.add(innerCore);

  // Crystal Rings
  const ringGeo = new THREE.TorusGeometry(11, 0.12, 8, 6);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xffb703,
    wireframe: true
  });
  ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
  scene.add(ringMesh1);
}

/**
 * Mode 3: Liquid Swarm Wave Matrix
 */
function buildLiquidScene() {
  clearMeshes();

  const torusKnotGeo = new THREE.TorusKnotGeometry(6, 1.6, 120, 16);
  const torusKnotMat = new THREE.MeshStandardMaterial({
    color: 0x00f090,
    wireframe: true,
    roughness: 0.3,
    metalness: 0.7
  });
  mainMesh = new THREE.Mesh(torusKnotGeo, torusKnotMat);
  scene.add(mainMesh);

  const innerGeo = new THREE.SphereGeometry(2.5, 16, 16);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true
  });
  innerCore = new THREE.Mesh(innerGeo, innerMat);
  scene.add(innerCore);
}

/**
 * Clear existing dynamic meshes
 */
function clearMeshes() {
  if (mainMesh) scene.remove(mainMesh);
  if (innerCore) scene.remove(innerCore);
  if (ringMesh1) scene.remove(ringMesh1);
  if (ringMesh2) scene.remove(ringMesh2);
}

/**
 * Particle Cloud (3D Floating Stardust responding to cursor)
 */
function buildParticleField() {
  const particleCount = 450;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color(0x00f090);
  const color2 = new THREE.Color(0xffb703);
  const color3 = new THREE.Color(0x8b5cf6);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 80;
    positions[i + 1] = (Math.random() - 0.5) * 80;
    positions[i + 2] = (Math.random() - 0.5) * 60;

    const chosenColor = Math.random() > 0.6 ? color1 : (Math.random() > 0.5 ? color2 : color3);
    colors[i] = chosenColor.r;
    colors[i + 1] = chosenColor.g;
    colors[i + 2] = chosenColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.35,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  particlesMesh = new THREE.Points(geometry, material);
  scene.add(particlesMesh);
}

/**
 * Event Listeners for Interaction & Dragging
 */
function setupEventListeners() {
  window.addEventListener('resize', onWindowResize);

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.006;
      targetRotationX += deltaY * 0.006;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });

  window.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Support for Mobile
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
  }, { passive: true });

  // 3D Scene Switcher Buttons in Hero
  const sceneButtons = document.querySelectorAll('.btn-scene');
  sceneButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      sceneButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sceneType = btn.getAttribute('data-scene');
      switch3DScene(sceneType);
    });
  });
}

function switch3DScene(mode) {
  currentSceneMode = mode;
  if (mode === 'core') buildCoreScene();
  else if (mode === 'crystal') buildCrystalScene();
  else if (mode === 'particles') buildLiquidScene();
}

function onWindowResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Main Three.js Animation Loop (With Scroll-Linked 3D Camera & Geometry Journey)
 */
function animateThreeJS() {
  animFrameId = requestAnimationFrame(animateThreeJS);

  const time = Date.now() * 0.001;

  // Smoothly interpolate scroll position & decay velocity
  scrollYCurrent += (scrollYTarget - scrollYCurrent) * 0.08;
  scrollVelocity *= 0.9;
  const scrollProgress = scrollYCurrent / Math.max(1, window.innerHeight);

  // Smooth Rotation, Floating & Scroll-Driven 3D Orbit
  if (mainMesh) {
    mainMesh.rotation.y += 0.004 + scrollVelocity * 0.04;
    mainMesh.rotation.x += 0.002 + scrollVelocity * 0.02;
    mainMesh.position.y = Math.sin(time * 0.8) * 0.6;
    mainMesh.position.x = Math.sin(scrollProgress * 1.6) * 3.2;
    mainMesh.rotation.y += (targetRotationY + scrollProgress * 1.8 - mainMesh.rotation.y) * 0.05;
    mainMesh.rotation.x += (targetRotationX + scrollProgress * 0.9 - mainMesh.rotation.x) * 0.05;
  }

  if (innerCore) {
    innerCore.rotation.y -= 0.008 + scrollVelocity * 0.05;
    innerCore.rotation.z += 0.005;
    innerCore.position.x = mainMesh ? mainMesh.position.x : 0;
    const pulse = 1 + Math.sin(time * 2) * 0.06 + Math.min(0.25, Math.abs(scrollVelocity) * 0.4);
    innerCore.scale.set(pulse, pulse, pulse);
  }

  if (ringMesh1) {
    ringMesh1.rotation.z += 0.007 + scrollVelocity * 0.03;
    ringMesh1.rotation.x = Math.PI / 3 + scrollProgress * 1.1;
    ringMesh1.position.x = mainMesh ? mainMesh.position.x : 0;
  }

  if (ringMesh2) {
    ringMesh2.rotation.z -= 0.005 + scrollVelocity * 0.03;
    ringMesh2.rotation.y = Math.PI / 4 + scrollProgress * 1.4;
    ringMesh2.position.x = mainMesh ? mainMesh.position.x : 0;
  }

  if (particlesMesh) {
    particlesMesh.rotation.y = time * 0.03 + scrollProgress * 0.55;
    particlesMesh.rotation.x = Math.sin(time * 0.02) * 0.1 + scrollProgress * 0.25;
  }

  // Camera Parallax + Scroll Dolly Zoom
  const targetCamZ = 24 - Math.sin(Math.min(scrollProgress, Math.PI)) * 3.5;
  camera.position.z += (targetCamZ - camera.position.z) * 0.05;
  camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.04;
  camera.position.y += (mouseY * 2.5 - camera.position.y) * 0.04;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

/**
 * ============================================================================
 * PROCEDURAL CANVAS 3D FALLBACK (Pure Math 3D Projection)
 * ============================================================================
 * Ensures smooth 3D experience even without external libraries or offline!
 */
function setupCanvas3DFallback() {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Generate 3D Vertices for a Cyber Polyhedron & Particle Cloud
  const nodes = [];
  const totalNodes = 120;
  for (let i = 0; i < totalNodes; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const radius = 220 + Math.random() * 80;

    nodes.push({
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.sin(phi) * Math.sin(theta),
      z: radius * Math.cos(phi),
      color: i % 3 === 0 ? '#00f090' : (i % 2 === 0 ? '#ffb703' : '#38bdf8')
    });
  }

  let angleX = 0;
  let angleY = 0;

  function renderFallback() {
    ctx.clearRect(0, 0, width, height);

    scrollYCurrent += (scrollYTarget - scrollYCurrent) * 0.08;
    scrollVelocity *= 0.9;

    angleY += 0.005 + mouseX * 0.002 + scrollVelocity * 0.02;
    angleX += 0.003 - mouseY * 0.002 + scrollVelocity * 0.01;

    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    const projected = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Rotate Y
      let x1 = node.x * cosY - node.z * sinY;
      let z1 = node.z * cosY + node.x * sinY;

      // Rotate X
      let y2 = node.y * cosX - z1 * sinX;
      let z2 = z1 * cosX + node.y * sinX;

      // Perspective Projection with scroll depth
      const fov = 400;
      const distance = 650 - Math.sin(scrollYCurrent * 0.0015) * 60;
      const scale = fov / (distance + z2);

      const px = x1 * scale + width / 2;
      const py = y2 * scale + height / 2;

      projected.push({ x: px, y: py, scale: scale, color: node.color });

      // Draw Node
      ctx.beginPath();
      ctx.arc(px, py, Math.max(1, 2.5 * scale), 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.globalAlpha = Math.min(1, Math.max(0.2, scale * 1.5));
      ctx.fill();
    }

    // Connect close nodes with glowing lines
    ctx.lineWidth = 0.6;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].x - projected[j].x;
        const dy = projected[i].y - projected[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 85) {
          ctx.beginPath();
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
          ctx.strokeStyle = '#00f090';
          ctx.globalAlpha = (1 - dist / 85) * 0.35;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(renderFallback);
  }

  renderFallback();
}

/**
 * ============================================================================
 * 3D CARD TILT & SPECULAR HIGHLIGHT (PHYSICS-BASED HOVER)
 * ============================================================================
 */
function setup3DCardTilt() {
  const tiltElements = document.querySelectorAll('[data-tilt], .project-card, .service-row, .about-card');

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      el.style.transition = 'transform 0.4s ease';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
    });
  });

  // Hero Card Specialized 3D Tilt
  const heroCard = document.getElementById('heroCard3D');
  if (heroCard) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      heroCard.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
    });
  }
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', init3D);

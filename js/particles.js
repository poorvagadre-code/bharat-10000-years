/* ============================================================
   BHARAT: 10,000 YEARS — Ink/Dust Particle Effects
   Subtle particle bursts at era transitions as you scroll
   ============================================================ */
(function () {
  'use strict';

  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const PARTICLE_COUNT = 18;
  const PARTICLE_LIFETIME = 1800; // ms

  let canvas, ctx;
  let particles = [];
  let animating = false;
  let lastBurstTime = 0;

  function setupCanvas() {
    canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 25;
      opacity: 0.6;
    `;
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    // Reset transform then scale (avoids compounding on repeated resize)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function createParticle(x, y, color) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 2;
    const size = 1.5 + Math.random() * 3;
    return {
      x: x + (Math.random() - 0.5) * window.innerWidth * 0.6,
      y: y + (Math.random() - 0.5) * 30,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.5, // slight upward drift
      size,
      color,
      born: performance.now(),
      lifetime: PARTICLE_LIFETIME + Math.random() * 600,
      shape: Math.random() > 0.5 ? 'circle' : 'dot' // variety
    };
  }

  function burst(color) {
    const now = performance.now();
    // Debounce: no more than one burst per 800ms
    if (now - lastBurstTime < 800) return;
    lastBurstTime = now;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(centerX, centerY, color));
    }

    if (!animating) {
      animating = true;
      requestAnimationFrame(animate);
    }
  }

  function animate(timestamp) {
    // Clear canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Update + draw each particle
    particles = particles.filter(p => {
      const age = timestamp - p.born;
      if (age > p.lifetime) return false;

      // Physics
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.01; // gentle gravity
      p.vx *= 0.995; // drag

      // Fade out
      const progress = age / p.lifetime;
      const alpha = 1 - progress;
      const scale = 1 - progress * 0.5;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = hexToRGBA(p.color, alpha);

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Small square "dust" particle
        const s = p.size * scale;
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      }

      ctx.restore();
      return true;
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      animating = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  // Attach ScrollTrigger at each era boundary
  function initParticles() {
    // Check for GSAP at init time (after deferred scripts have loaded)
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    setupCanvas();
    resize();
    window.addEventListener('resize', resize);

    const chapters = document.querySelectorAll('.era-chapter');

    chapters.forEach(ch => {
      const eraId = ch.getAttribute('data-era');
      const era = window.BHARAT_ERAS.find(e => e.id === eraId);
      if (!era) return;

      ScrollTrigger.create({
        trigger: ch,
        start: 'top center',
        onEnter: () => burst(era.palette.accent),
        onEnterBack: () => burst(era.palette.accent)
      });
    });
  }

  // Initialize after DOM + app.js timeline build
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initParticles, 250));
  } else {
    setTimeout(initParticles, 250);
  }
})();

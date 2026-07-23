/* ============================================================
   BHARAT: 10,000 YEARS — Coin-Flip Micro-Interactions
   Clickable CSS 3D coin flips for Kushana, Gupta, and Chola coins
   ============================================================ */
(function () {
  'use strict';

  const COINS = [
    {
      era: 'classical',
      label: 'Kushana Gold Dinar',
      desc: 'Kanishka I, c. 127 CE — The Kushanas minted bilingual coins blending Greek, Indian, and Iranian traditions.',
      color: '#c9a345',
      front: {
        // Standing king with flames at shoulders (Kanishka)
        paths: [
          // Coin rim
          { d: 'M60,10 A50,50 0 1,1 59.9,10', stroke: '#c9a345' },
          // Inner rim
          { d: 'M60,18 A42,42 0 1,1 59.9,18', stroke: '#c9a345', dash: '2,2' },
          // Standing figure (simplified Kanishka)
          { d: 'M60,35 L60,80 M60,50 L45,60 M60,50 L75,60 M60,80 L50,100 M60,80 L70,100', stroke: '#c9a345' },
          // Crown
          { d: 'M52,35 L60,25 L68,35', stroke: '#c9a345' },
          // Flame at shoulders
          { d: 'M45,42 Q42,35 45,30 M75,42 Q78,35 75,30', stroke: '#c9a345' },
        ]
      },
      back: {
        // Seated Buddha or Shiva
        paths: [
          { d: 'M60,10 A50,50 0 1,1 59.9,10', stroke: '#c9a345' },
          { d: 'M60,18 A42,42 0 1,1 59.9,18', stroke: '#c9a345', dash: '2,2' },
          // Seated figure cross-legged
          { d: 'M60,40 L60,70 M45,70 Q60,78 75,70 M60,45 L48,55 M60,45 L72,55', stroke: '#c9a345' },
          // Halo
          { d: 'M45,35 Q60,20 75,35', stroke: '#c9a345' },
          // Lotus seat
          { d: 'M42,75 Q50,72 55,75 Q60,78 65,75 Q70,72 78,75', stroke: '#c9a345' },
        ]
      }
    },
    {
      era: 'gupta',
      label: 'Gupta Gold Dinar',
      desc: 'Chandragupta II, c. 400 CE — Gupta coins reached an artistic peak, depicting kings as archers, horsemen, and lion-slayers.',
      color: '#8a7fd6',
      front: {
        // Archer king (Chandragupta II)
        paths: [
          { d: 'M60,10 A50,50 0 1,1 59.9,10', stroke: '#8a7fd6' },
          { d: 'M60,18 A42,42 0 1,1 59.9,18', stroke: '#8a7fd6', dash: '2,2' },
          // Standing archer figure
          { d: 'M55,35 L55,80 M55,80 L45,100 M55,80 L65,100', stroke: '#8a7fd6' },
          // Bow
          { d: 'M55,45 L40,55 Q35,60 40,65 L55,70', stroke: '#8a7fd6' },
          // Arrow
          { d: 'M55,55 L75,48', stroke: '#8a7fd6' },
          // Crown
          { d: 'M48,35 L55,26 L62,35', stroke: '#8a7fd6' },
        ]
      },
      back: {
        // Goddess Lakshmi seated on lotus
        paths: [
          { d: 'M60,10 A50,50 0 1,1 59.9,10', stroke: '#8a7fd6' },
          { d: 'M60,18 A42,42 0 1,1 59.9,18', stroke: '#8a7fd6', dash: '2,2' },
          // Seated Lakshmi
          { d: 'M60,38 L60,68 M45,68 Q60,76 75,68', stroke: '#8a7fd6' },
          // Arms holding lotus
          { d: 'M60,48 L42,42 M60,48 L78,42', stroke: '#8a7fd6' },
          // Lotus flowers in hands
          { d: 'M38,42 Q42,36 46,42 M74,42 Q78,36 82,42', stroke: '#8a7fd6' },
          // Lotus seat
          { d: 'M40,73 Q48,70 54,73 Q60,76 66,73 Q72,70 80,73', stroke: '#8a7fd6' },
        ]
      }
    },
    {
      era: 'regional-empires',
      label: 'Chola Gold Kahavanu',
      desc: 'Rajendra Chola I, c. 1025 CE — The Chola tiger emblem appeared on coins from the Maldives to Southeast Asia.',
      color: '#c26b4a',
      front: {
        // Standing king with tiger emblem
        paths: [
          { d: 'M60,10 A50,50 0 1,1 59.9,10', stroke: '#c26b4a' },
          { d: 'M60,18 A42,42 0 1,1 59.9,18', stroke: '#c26b4a', dash: '2,2' },
          // Tiger (Chola emblem)
          { d: 'M40,55 L55,55 L55,45 L65,45 L65,55 L80,55 M65,45 Q70,38 65,32 M40,55 L38,62 M55,55 L55,62 M65,55 L65,62 M80,55 L82,48', stroke: '#c26b4a' },
          // Two fish (Pandya + Chera emblems beneath)
          { d: 'M35,80 Q40,75 45,80 Q40,85 35,80 M75,80 Q80,75 85,80 Q80,85 75,80', stroke: '#c26b4a' },
        ]
      },
      back: {
        // Seated ruler or deity
        paths: [
          { d: 'M60,10 A50,50 0 1,1 59.9,10', stroke: '#c26b4a' },
          { d: 'M60,18 A42,42 0 1,1 59.9,18', stroke: '#c26b4a', dash: '2,2' },
          // Seated figure (king or deity)
          { d: 'M60,35 L60,68 M45,68 Q60,76 75,68', stroke: '#c26b4a' },
          { d: 'M60,42 L45,50 M60,42 L75,50', stroke: '#c26b4a' },
          // Lamp/deepam
          { d: 'M30,50 L30,60 L35,60 L35,50 M32,50 Q32,44 35,50', stroke: '#c26b4a' },
          // Conch
          { d: 'M85,50 Q88,45 85,40 Q82,45 85,50', stroke: '#c26b4a' },
        ]
      }
    }
  ];

  function createCoinSVG(face, size) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 120 120');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.style.cssText = 'display:block;';

    face.paths.forEach(p => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', p.d);
      path.setAttribute('stroke', p.stroke);
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      if (p.dash) path.setAttribute('stroke-dasharray', p.dash);
      svg.appendChild(path);
    });

    return svg;
  }

  function initCoins() {
    // Check for reduced motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    COINS.forEach(coin => {
      const eraSection = document.getElementById('era-' + coin.era);
      if (!eraSection) return;

      // Create coin container
      const wrapper = document.createElement('div');
      wrapper.className = 'coin-flip-wrapper';
      wrapper.setAttribute('role', 'button');
      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('aria-label', `${coin.label} — click to flip`);

      const inner = document.createElement('div');
      inner.className = 'coin-inner';

      // Front face
      const front = document.createElement('div');
      front.className = 'coin-face coin-front';
      front.appendChild(createCoinSVG(coin.front, 100));

      // Back face
      const back = document.createElement('div');
      back.className = 'coin-face coin-back';
      back.appendChild(createCoinSVG(coin.back, 100));

      inner.appendChild(front);
      inner.appendChild(back);
      wrapper.appendChild(inner);

      // Label
      const label = document.createElement('div');
      label.className = 'coin-label';
      label.style.color = coin.color;
      label.textContent = coin.label;

      // Description (shown on hover/flip)
      const desc = document.createElement('div');
      desc.className = 'coin-desc';
      desc.textContent = coin.desc;

      // Container
      const container = document.createElement('div');
      container.className = 'coin-container';
      container.appendChild(wrapper);
      container.appendChild(label);
      container.appendChild(desc);

      // Flip on click
      let flipped = false;
      function toggleFlip() {
        flipped = !flipped;
        if (reduceMotion) {
          // Instant swap without 3D transform
          front.style.display = flipped ? 'none' : 'block';
          back.style.display = flipped ? 'block' : 'none';
        } else {
          inner.style.transform = flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        }
        desc.classList.toggle('visible', flipped);
      }

      wrapper.addEventListener('click', toggleFlip);
      wrapper.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFlip();
        }
      });

      // Insert after the timeline track in the era section
      const track = eraSection.querySelector('.timeline-track');
      if (track) {
        track.after(container);
      }
    });
  }

  // Initialize after DOM + app.js timeline build
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initCoins, 150));
  } else {
    setTimeout(initCoins, 150);
  }
})();

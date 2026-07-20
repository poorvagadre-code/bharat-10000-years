/* ============================================================
   BHARAT: 10,000 YEARS — SVG Monument Line-Drawing Animations
   Each monument draws itself as you scroll into its era chapter
   ============================================================ */
(function () {
  'use strict';

  // SVG path data for 5 key monuments
  const MONUMENTS = {
    // Sanchi Stupa — appears in Maurya era
    'maurya': {
      id: 'monument-sanchi',
      title: 'The Great Stupa at Sanchi',
      width: 400, height: 300,
      paths: [
        // Base platform
        { d: 'M50,250 L350,250 L350,270 L50,270 Z', stroke: '#c9a13b', fill: 'none' },
        // Drum (cylindrical base)
        { d: 'M80,250 L80,200 Q80,195 85,195 L315,195 Q320,195 320,200 L320,250', stroke: '#c9a13b', fill: 'none' },
        // Dome (anda)
        { d: 'M80,200 Q80,120 200,100 Q320,120 320,200', stroke: '#c9a13b', fill: 'none' },
        // Harmika (square railing on top)
        { d: 'M175,105 L175,85 L225,85 L225,105', stroke: '#c9a13b', fill: 'none' },
        // Chattra (umbrella)
        { d: 'M200,85 L200,60 M180,65 L220,65 M185,70 L215,70 M190,75 L210,75', stroke: '#c9a13b', fill: 'none' },
        // Torana (gateway) - left
        { d: 'M55,270 L55,160 M45,165 L65,165 M45,175 L65,175 M45,185 L65,185', stroke: '#c9a13b', fill: 'none' },
        // Torana (gateway) - right
        { d: 'M345,270 L345,160 M335,165 L355,165 M335,175 L355,175 M335,185 L355,185', stroke: '#c9a13b', fill: 'none' },
        // Pradakshina path (circumambulatory walkway)
        { d: 'M70,255 Q70,240 85,240 L315,240 Q330,240 330,255', stroke: '#c9a13b', fill: 'none', dash: '4,3' },
      ]
    },

    // Brihadeeswara Temple — appears in Regional Empires era
    'regional-empires': {
      id: 'monument-brihadeeswara',
      title: 'Brihadeeswara Temple, Thanjavur',
      width: 400, height: 400,
      paths: [
        // Base platform steps
        { d: 'M40,380 L360,380 L360,370 L40,370 Z', stroke: '#c26b4a', fill: 'none' },
        { d: 'M60,370 L340,370 L340,360 L60,360 Z', stroke: '#c26b4a', fill: 'none' },
        // Mandapa (hall)
        { d: 'M70,360 L170,360 L170,310 L70,310 Z', stroke: '#c26b4a', fill: 'none' },
        // Mandapa pillars
        { d: 'M85,360 L85,310 M100,360 L100,310 M115,360 L115,310 M130,360 L130,310 M145,360 L145,310 M160,360 L160,310', stroke: '#c26b4a', fill: 'none' },
        // Antarala (vestibule)
        { d: 'M170,360 L220,360 L220,300 L170,300 Z', stroke: '#c26b4a', fill: 'none' },
        // Garbhagriha (sanctum)
        { d: 'M220,360 L320,360 L320,290 L220,290 Z', stroke: '#c26b4a', fill: 'none' },
        // Vimana tower - tier 1
        { d: 'M225,290 L315,290 L310,260 L230,260 Z', stroke: '#c26b4a', fill: 'none' },
        // Vimana tower - tier 2
        { d: 'M232,260 L308,260 L304,235 L236,235 Z', stroke: '#c26b4a', fill: 'none' },
        // Vimana tower - tier 3
        { d: 'M238,235 L302,235 L298,210 L242,210 Z', stroke: '#c26b4a', fill: 'none' },
        // Vimana tower - tiers 4-8 (progressively narrower)
        { d: 'M244,210 L296,210 L292,185 L248,185 Z', stroke: '#c26b4a', fill: 'none' },
        { d: 'M250,185 L290,185 L287,165 L253,165 Z', stroke: '#c26b4a', fill: 'none' },
        { d: 'M255,165 L285,165 L282,145 L258,145 Z', stroke: '#c26b4a', fill: 'none' },
        { d: 'M259,145 L281,145 L278,125 L262,125 Z', stroke: '#c26b4a', fill: 'none' },
        // Shikhara (dome/capstone)
        { d: 'M264,125 L276,125 Q280,100 270,70 Q260,100 264,125', stroke: '#c26b4a', fill: 'none' },
        // Kalasha (finial)
        { d: 'M268,70 L272,70 L272,55 L268,55 Z M265,55 L275,55 L270,40 Z', stroke: '#c26b4a', fill: 'none' },
        // Nandi mandapa (separate small structure)
        { d: 'M80,285 L80,270 L120,270 L120,285 M85,270 L100,255 L115,270', stroke: '#c26b4a', fill: 'none' },
      ]
    },

    // Taj Mahal — appears in Mughal era
    'mughal': {
      id: 'monument-taj',
      title: 'Taj Mahal, Agra',
      width: 400, height: 350,
      paths: [
        // Base platform
        { d: 'M50,320 L350,320 L350,310 L50,310 Z', stroke: '#d4af5a', fill: 'none' },
        { d: 'M70,310 L330,310 L330,300 L70,300 Z', stroke: '#d4af5a', fill: 'none' },
        // Main structure base
        { d: 'M100,300 L300,300 L300,220 L100,220 Z', stroke: '#d4af5a', fill: 'none' },
        // Central arch
        { d: 'M160,300 L160,250 Q200,220 240,250 L240,300', stroke: '#d4af5a', fill: 'none' },
        // Side arches (left)
        { d: 'M110,300 L110,270 Q125,255 140,270 L140,300', stroke: '#d4af5a', fill: 'none' },
        // Side arches (right)
        { d: 'M260,300 L260,270 Q275,255 290,270 L290,300', stroke: '#d4af5a', fill: 'none' },
        // Drum (base of dome)
        { d: 'M140,220 L260,220 L260,200 L140,200 Z', stroke: '#d4af5a', fill: 'none' },
        // Main dome
        { d: 'M145,200 Q150,130 200,100 Q250,130 255,200', stroke: '#d4af5a', fill: 'none' },
        // Finial on dome
        { d: 'M198,100 L202,100 L202,80 Q200,75 198,80 Z', stroke: '#d4af5a', fill: 'none' },
        // Crescent on finial
        { d: 'M196,78 Q200,70 204,78', stroke: '#d4af5a', fill: 'none' },
        // Minaret - left
        { d: 'M60,320 L60,140 M55,145 L65,145 M55,150 Q60,140 65,150 L65,320', stroke: '#d4af5a', fill: 'none' },
        { d: 'M57,140 Q60,125 63,140', stroke: '#d4af5a', fill: 'none' },
        // Minaret - right
        { d: 'M335,320 L335,140 M330,145 L340,145 M330,150 Q335,140 340,150 L340,320', stroke: '#d4af5a', fill: 'none' },
        { d: 'M332,140 Q335,125 338,140', stroke: '#d4af5a', fill: 'none' },
        // Small domes (chhatris)
        { d: 'M125,220 Q130,200 135,220', stroke: '#d4af5a', fill: 'none' },
        { d: 'M265,220 Q270,200 275,220', stroke: '#d4af5a', fill: 'none' },
        // Reflecting pool
        { d: 'M150,340 L250,340', stroke: '#d4af5a', fill: 'none', dash: '8,4' },
      ]
    },

    // Konark Sun Temple Wheel — appears in Regional Empires era (as secondary)
    'gupta': {
      id: 'monument-iron-pillar',
      title: 'The Rustless Iron Pillar',
      width: 200, height: 350,
      paths: [
        // Base (Mehrauli platform)
        { d: 'M40,330 L160,330 L160,320 L40,320 Z', stroke: '#8a7fd6', fill: 'none' },
        // Pillar shaft (tapered)
        { d: 'M88,320 L88,60 L112,60 L112,320', stroke: '#8a7fd6', fill: 'none' },
        // Capital (bell shape)
        { d: 'M85,60 Q85,45 100,35 Q115,45 115,60', stroke: '#8a7fd6', fill: 'none' },
        // Decorative bands
        { d: 'M86,80 L114,80 M86,100 L114,100 M86,280 L114,280 M86,300 L114,300', stroke: '#8a7fd6', fill: 'none' },
        // Sanskrit inscription area (indicated by horizontal lines)
        { d: 'M90,120 L110,120 M90,130 L110,130 M90,140 L110,140 M90,150 L110,150 M90,160 L110,160', stroke: '#8a7fd6', fill: 'none', dash: '2,2' },
        // Garuda capital top
        { d: 'M95,35 L100,20 L105,35', stroke: '#8a7fd6', fill: 'none' },
      ]
    },

    // Konark Sun Temple Wheel — in the Sultanate era (Odisha)
    'sultanate': {
      id: 'monument-konark-wheel',
      title: 'Konark Sun Temple Wheel',
      width: 300, height: 300,
      paths: [
        // Outer rim
        { d: 'M150,20 A130,130 0 1,1 149.9,20', stroke: '#9c6b8a', fill: 'none' },
        // Inner rim
        { d: 'M150,50 A100,100 0 1,1 149.9,50', stroke: '#9c6b8a', fill: 'none' },
        // Hub
        { d: 'M150,120 A30,30 0 1,1 149.9,120', stroke: '#9c6b8a', fill: 'none' },
        // Spokes (12, like a clock — representing months)
        { d: 'M150,90 L150,20', stroke: '#9c6b8a', fill: 'none' },
        { d: 'M180,95 L240,35', stroke: '#9c6b8a', fill: 'none' },
        { d: 'M190,120 L265,75', stroke: '#9c6b8a', fill: 'none' },
        { d: 'M210,150 L280,150', stroke: '#9c6b8a', fill: 'none' },
        { d: 'M190,180 L265,225', stroke: '#9c6b8a', fill: 'none' },
        { d: 'M180,205 L240,265', stroke: '#9c6b8a', fill: 'none' },
        { d: 'M150,210 L150,280', stroke: '#9c6b8a', fill: 'none' },
        { d: 'M120,205 L60,265', stroke: '#9c6b8a', fill: 'none' },
        { d: 'M110,180 L35,225', stroke: '#9c6b8a', fill: 'none' },
        { d: 'M90,150 L20,150', stroke: '#9c6b8a', fill: 'none' },
        { d: 'M110,120 L35,75', stroke: '#9c6b8a', fill: 'none' },
        { d: 'M120,95 L60,35', stroke: '#9c6b8a', fill: 'none' },
        // Decorative carved details between spokes (arcs)
        { d: 'M150,50 Q170,60 180,50', stroke: '#9c6b8a', fill: 'none', dash: '3,2' },
        { d: 'M180,50 Q195,65 200,55', stroke: '#9c6b8a', fill: 'none', dash: '3,2' },
      ]
    }
  };

  function createMonumentSVG(config) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${config.width} ${config.height}`);
    svg.setAttribute('class', 'monument-svg');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', config.title);
    svg.id = config.id;
    svg.style.cssText = 'width:100%;max-width:20rem;height:auto;margin:var(--sp-8) auto;display:block;opacity:0.7;';

    config.paths.forEach((p, i) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', p.d);
      path.setAttribute('stroke', p.stroke);
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('fill', p.fill || 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      if (p.dash) path.setAttribute('stroke-dasharray', p.dash);

      // Calculate path length for draw animation
      svg.appendChild(path);
    });

    // Title label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', config.width / 2);
    text.setAttribute('y', config.height - 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'rgba(255,255,255,0.3)');
    text.setAttribute('font-family', 'var(--font-mono)');
    text.setAttribute('font-size', '9');
    text.textContent = config.title;
    svg.appendChild(text);

    return svg;
  }

  function initMonuments() {
    // Insert each monument into its era chapter
    Object.entries(MONUMENTS).forEach(([eraId, config]) => {
      const eraSection = document.getElementById('era-' + eraId);
      if (!eraSection) return;

      const svg = createMonumentSVG(config);
      const header = eraSection.querySelector('.era-header');
      if (header) {
        header.after(svg);
      }

      // Animate path drawing with GSAP if available
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const paths = svg.querySelectorAll('path');
        paths.forEach((path, i) => {
          // Get computed length
          const length = path.getTotalLength ? path.getTotalLength() : 500;
          // Set initial state: hidden
          const existingDash = path.getAttribute('stroke-dasharray');
          if (!existingDash) {
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
          }

          // Animate on scroll
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.5,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: svg,
              start: 'top 80%',
              once: true
            }
          });
        });

        // Fade in the whole SVG
        gsap.fromTo(svg,
          { opacity: 0 },
          {
            opacity: 0.7,
            duration: 1,
            scrollTrigger: {
              trigger: svg,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    });
  }

  // Initialize after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMonuments);
  } else {
    // Wait a tick for the main app.js to build the timeline first
    setTimeout(initMonuments, 100);
  }
})();

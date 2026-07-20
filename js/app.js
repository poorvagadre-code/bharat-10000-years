/* ============================================================
   BHARAT: 10,000 YEARS — Core Application
   Deep Time Scroll engine, HUD, timeline, map, and all 8 games
   ============================================================ */
(function () {
  'use strict';

  // ---- State ----
  const STATE = {
    currentEra: null,
    currentYear: 2026,
    activeTheme: 'all',
    scores: { duel: 0, duelStreak: 0, whoami: 0, whoamiRound: 1, match: 0, indus: 0 },
    deepestYear: 2026,
    selectedEmpire: null
  };

  // ---- Region descriptions for map ----
  const REGION_INFO = {
    kashmir:   { name: "Kashmir", desc: "Land of Lalitaditya's empire, Shaivism, and the Rajatarangini — India's first historical chronicle. Home to Karkota and later Lohara dynasties." },
    punjab:    { name: "Punjab — Land of Five Rivers", desc: "Cradle of the Sindhu–Saraswati civilization, birthplace of Sikhism, and frontier of empires from the Mauryas to Ranjit Singh." },
    gandhara:  { name: "Gandhara", desc: "Northwest frontier home to Takshashila, the Gandhara school of art, and a cultural bridge between India and Central Asia." },
    haryana:   { name: "Haryana", desc: "Bhirrana and Rakhigarhi — among the oldest Sindhu–Saraswati sites. Kurukshetra, the battlefield of the Mahabharata." },
    rajasthan: { name: "Rajputana", desc: "Chittorgarh, Haldighati, Jaisalmer — land of forts, valor, and the Rajput clans who resisted every invader for a millennium." },
    up:        { name: "Uttar Pradesh — Aryavarta", desc: "Ayodhya, Varanasi, Mathura, Sarnath — the spiritual heartland. From the Kuru-Panchala janapadas to the Mughal capitals." },
    bihar:     { name: "Bihar — Magadha", desc: "Seat of Magadha's power, birthplace of Buddhism and Jainism. Nalanda, Vikramashila, Pataliputra — the intellectual capital of ancient India." },
    bengal:    { name: "Bengal", desc: "Pala dynasty, Sena dynasty, Sangam-era trade. Land of Tagore, the Bengal Renaissance, and the freedom struggle's earliest fires." },
    assam:     { name: "Northeast — Ahom Kingdom", desc: "Six hundred years of Ahom sovereignty, the Battle of Saraighat, Manipur's martial traditions. India's unconquered frontier." },
    odisha:    { name: "Kalinga (Odisha)", desc: "The land that changed Ashoka. Konark Sun Temple, Jagannath Puri, Odissi dance — a civilization of art, devotion, and fierce independence." },
    mp:        { name: "Central India", desc: "Sanchi, Bhimbetka rock shelters, Khajuraho. The Chandela, Paramara, and Gond kingdoms. India's geographic and cultural crossroads." },
    gujarat:   { name: "Gujarat", desc: "From Lothal's ancient dockyard to Somnath to the Swadeshi movement. Maritime trade, the Maratha confederacy's western arm, and Gandhi's Sabarmati." },
    maharashtra:{ name: "Maharashtra", desc: "Ajanta, Ellora, Raigad. The Satavahanas, Rashtrakutas, and the Maratha swarajya of Shivaji. Land of forts, saints, and the Bhakti movement." },
    ap:        { name: "Andhra Pradesh", desc: "Satavahana heartland, Amaravati stupa, Kakatiya Warangal. Gateway between north and south, with a Buddhist heritage stretching back to Ashoka." },
    telangana: { name: "Telangana", desc: "Kakatiya kingdom, Rudrama Devi, the thousand-pillared temple. A Telugu-speaking heartland of medieval South India." },
    karnataka: { name: "Karnataka", desc: "Badami Chalukyas, Rashtrakutas, Hoysalas, Vijayanagara at Hampi. One of India's richest repositories of temple architecture and political history." },
    goa:       { name: "Goa", desc: "Ancient Kadamba kingdom, later Portuguese Goa. A unique cultural fusion of Indian and Iberian traditions on the Konkan coast." },
    kerala:    { name: "Kerala", desc: "Chera dynasty, Muziris trade with Rome, Shankaracharya's birthplace, Travancore's victory over the Dutch. The spice coast that connected India to the world." },
    tn:        { name: "Tamil Nadu", desc: "Chola, Pandya, Pallava. Sangam poetry, Mahabalipuram, Brihadeeswara. Tamil — one of the world's oldest continuously spoken languages — is the soul of this land." },
    sindh:     { name: "Sindh", desc: "The Sindhu (Indus) gave India its name. Mohenjo-daro, the world's most sophisticated Bronze Age city, rose on its banks 4,600 years ago." }
  };

  // ---- Utilities ----
  function formatYear(y) {
    if (y < 0) return Math.abs(y).toLocaleString() + ' BCE';
    return y.toLocaleString() + ' CE';
  }
  function yearsAgo(y) {
    const ago = y < 0 ? 2026 + Math.abs(y) : 2026 - y;
    if (ago <= 0) return 'Today';
    return ago.toLocaleString() + ' years ago';
  }

  // ---- Odometer (rolling digit animation for HUD year) ----
  const Odometer = {
    _built: false,
    _container: null,
    _lastStr: '',

    build(container) {
      container.innerHTML = '';
      container.classList.add('odo-container');
      this._container = container;
      this._built = true;
      this._lastStr = '';
    },

    set(yearStr) {
      if (!this._built) return;
      if (yearStr === this._lastStr) return;
      this._lastStr = yearStr;
      const container = this._container;

      // Check prefers-reduced-motion
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Build character slots to match the target string
      // Reuse existing slots where possible, add/remove as needed
      const chars = yearStr.split('');
      const existingSlots = container.children;

      // Rebuild if character count changed or first render
      if (existingSlots.length !== chars.length) {
        container.innerHTML = '';
        chars.forEach((ch, i) => {
          const slot = document.createElement('span');
          if (/\d/.test(ch)) {
            slot.className = 'odo-col';
            // Create the digit strip: 0 1 2 3 4 5 6 7 8 9
            let stripHTML = '';
            for (let d = 0; d <= 9; d++) {
              stripHTML += `<span class="odo-d">${d}</span>`;
            }
            slot.innerHTML = `<span class="odo-strip">${stripHTML}</span>`;
            const digit = parseInt(ch);
            slot.style.setProperty('--digit', digit);
            if (reduceMotion) slot.classList.add('no-motion');
          } else {
            // Static character (comma, space, B, C, E)
            slot.className = 'odo-static';
            slot.setAttribute('data-char', ch);
            slot.textContent = ch;
          }
          container.appendChild(slot);
        });
      } else {
        // Update existing slots in place
        chars.forEach((ch, i) => {
          const slot = existingSlots[i];
          if (/\d/.test(ch) && slot.classList.contains('odo-col')) {
            slot.style.setProperty('--digit', parseInt(ch));
          } else if (!(/\d/.test(ch)) && slot.classList.contains('odo-static')) {
            if (slot.textContent !== ch) slot.textContent = ch;
          } else {
            // Type mismatch — rebuild this slot
            const newSlot = document.createElement('span');
            if (/\d/.test(ch)) {
              newSlot.className = 'odo-col';
              let stripHTML = '';
              for (let d = 0; d <= 9; d++) {
                stripHTML += `<span class="odo-d">${d}</span>`;
              }
              newSlot.innerHTML = `<span class="odo-strip">${stripHTML}</span>`;
              newSlot.style.setProperty('--digit', parseInt(ch));
              if (reduceMotion) newSlot.classList.add('no-motion');
            } else {
              newSlot.className = 'odo-static';
              newSlot.textContent = ch;
            }
            slot.replaceWith(newSlot);
          }
        });
      }
    }
  };
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---- Build Timeline ----
  function buildTimeline() {
    const main = document.getElementById('timeline-start');
    const nav = document.getElementById('chapter-nav');

    // Sort events by year
    const events = window.BHARAT_EVENTS.sort((a, b) => a.year - b.year);
    // Sort eras by start (but keep display order)
    const eraOrder = ['dawn','sindhu-saraswati','vedic','epic','mahajanapadas','maurya','classical','gupta','regional-empires','sultanate','mughal','colonial','republic'];

    // === Deep Time Scroll: compute proportional era heights ===
    // Uses sqrt scaling so ancient eras are noticeably taller without being absurdly long.
    // Dawn (~4700 yrs) ≈ 7–8x Republic (~79 yrs), per the brief's "~10x" target.
    const REF_DURATION = 79; // Republic of India — shortest era
    function deepTimeHeight(era) {
      const duration = Math.abs(era.end - era.start);
      const scale = Math.sqrt(duration / REF_DURATION);
      // Clamp: min 100vh (1 screenful), max 500vh
      return Math.max(100, Math.min(500, Math.round(scale * 100)));
    }

    // Build century tick marks for eras > 300 years
    function buildCenturySpine(era, accentColor) {
      const duration = Math.abs(era.end - era.start);
      if (duration < 300) return null; // skip short eras

      const spine = document.createElement('div');
      spine.className = 'deep-time-spine';
      spine.setAttribute('aria-hidden', 'true');

      // Determine century step — use 500yr ticks for very long eras, 100yr for shorter
      const step = duration > 2000 ? 500 : (duration > 800 ? 200 : 100);
      const startYear = Math.ceil(era.start / step) * step;
      const endYear = era.end;

      for (let y = startYear; y <= endYear; y += step) {
        if (y === era.start) continue; // skip start (already shown in header)
        const pct = ((y - era.start) / duration) * 100;
        const tick = document.createElement('div');
        tick.className = 'spine-tick';
        tick.style.top = pct + '%';
        tick.innerHTML = `<span class="spine-year" style="color:${accentColor}">${formatYear(y)}</span>`;
        spine.appendChild(tick);
      }
      return spine;
    }

    eraOrder.forEach(eraId => {
      const era = window.BHARAT_ERAS.find(e => e.id === eraId);
      if (!era) return;

      // Chapter section
      const section = document.createElement('section');
      section.className = 'era-chapter';
      section.id = 'era-' + era.id;
      section.setAttribute('data-era', era.id);
      section.style.setProperty('--era-bg', era.palette.bg);
      section.style.setProperty('--era-accent', era.palette.accent);
      section.style.setProperty('--era-ink', era.palette.ink);
      section.style.backgroundColor = era.palette.bg;

      // Deep Time: apply proportional min-height
      const dtHeight = deepTimeHeight(era);
      section.style.minHeight = dtHeight + 'vh';
      section.setAttribute('data-duration', Math.abs(era.end - era.start));

      // Header
      const header = document.createElement('div');
      header.className = 'era-header container';
      header.innerHTML = `
        <div class="era-label">${era.range}</div>
        <h2 class="era-title">${era.label}</h2>
        <p class="era-hook">${era.hook}</p>
        <p style="margin-top:var(--sp-4);color:${era.palette.ink};opacity:0.7;max-width:42rem;margin-left:auto;margin-right:auto;">${era.summary}</p>
        ${Math.abs(era.end - era.start) >= 300 ? `<div class="deep-time-badge"><span>${Math.abs(era.end - era.start).toLocaleString()} years</span></div>` : ''}
      `;
      section.appendChild(header);

      // Century spine (visual depth indicator)
      const spine = buildCenturySpine(era, era.palette.accent);
      if (spine) section.appendChild(spine);

      // Events track
      const track = document.createElement('div');
      track.className = 'timeline-track container';

      const eraEvents = events.filter(ev => ev.era === era.id);
      eraEvents.forEach(ev => {
        // World context?
        const wc = window.BHARAT_WORLD_CONTEXT.find(w => Math.abs(w.year - ev.year) < 50 && !w._used);
        if (wc) wc._used = true;

        const card = document.createElement('article');
        card.className = 'event-card';
        card.setAttribute('data-themes', ev.themes.join(','));
        card.setAttribute('data-year', ev.year);
        card.innerHTML = `
          <div class="event-year">${formatYear(ev.year)}</div>
          <h3 class="event-title">${ev.title}</h3>
          <p class="event-summary">${ev.summary}</p>
          ${ev.fact ? `<p class="event-fact">${ev.fact}</p>` : ''}
          <div class="event-themes">${ev.themes.map(t => `<span class="theme-tag">${t}</span>`).join('')}</div>
        `;
        track.appendChild(card);

        // World context ribbon
        if (wc) {
          const ribbon = document.createElement('div');
          ribbon.className = 'world-context';
          ribbon.innerHTML = `<span class="wc-icon">🌍</span><span class="wc-text"><strong>${wc.label}</strong> — Meanwhile: ${wc.world}</span>`;
          track.appendChild(ribbon);
        }
      });
      section.appendChild(track);
      main.appendChild(section);

      // Nav dot
      const dot = document.createElement('button');
      dot.className = 'nav-dot';
      dot.setAttribute('data-era', era.id);
      dot.setAttribute('aria-label', era.label);
      dot.innerHTML = `<span class="nav-label">${era.label}</span>`;
      dot.addEventListener('click', () => {
        document.getElementById('era-' + era.id).scrollIntoView({ behavior: 'smooth' });
      });
      nav.appendChild(dot);
    });
  }

  // ---- HUD + Scroll Engine ----
  function initScrollEngine() {
    const hud = document.getElementById('hud');
    const hudYear = hud.querySelector('.hud-year');
    const hudEra = hud.querySelector('.hud-era');
    const hudAgo = hud.querySelector('.hud-ago');
    const hudProgress = hud.querySelector('.hud-progress');
    const heroEl = document.getElementById('hero');
    const chapters = document.querySelectorAll('.era-chapter');
    const dots = document.querySelectorAll('#chapter-nav .nav-dot');

    // Show HUD after hero
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: heroEl,
        start: 'bottom top',
        onEnter: () => hud.classList.add('visible'),
        onLeaveBack: () => hud.classList.remove('visible')
      });

      // Era chapters scroll reveals
      chapters.forEach(ch => {
        const header = ch.querySelector('.era-header');
        const cards = ch.querySelectorAll('.event-card');

        ScrollTrigger.create({
          trigger: header,
          start: 'top 80%',
          onEnter: () => header.classList.add('revealed'),
          once: true
        });

        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              setTimeout(() => card.classList.add('revealed'), i * 60);
            },
            once: true
          });
        });

        // HUD updates on era enter
        const eraId = ch.getAttribute('data-era');
        const era = window.BHARAT_ERAS.find(e => e.id === eraId);
        if (era) {
          ScrollTrigger.create({
            trigger: ch,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => updateHUD(era, dots),
            onEnterBack: () => updateHUD(era, dots)
          });
        }
      });

      // Overall progress
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => {
          hudProgress.style.width = (self.progress * 100) + '%';
        }
      });

    } else {
      // Fallback without GSAP
      hud.classList.add('visible');
      document.querySelectorAll('.era-header').forEach(h => h.classList.add('revealed'));
      document.querySelectorAll('.event-card').forEach(c => c.classList.add('revealed'));
    }

    // Initialize the odometer on first call
    Odometer.build(hudYear);

    function updateHUD(era, dots) {
      STATE.currentEra = era.id;
      const midYear = Math.round((era.start + era.end) / 2);
      STATE.currentYear = midYear;
      if (midYear < STATE.deepestYear) STATE.deepestYear = midYear;

      // Rolling odometer animation for year
      Odometer.set(formatYear(midYear));
      hudEra.textContent = era.label;
      hudEra.style.color = era.palette.accent;
      hudAgo.textContent = yearsAgo(midYear);

      // Update root CSS vars for era palette
      document.documentElement.style.setProperty('--era-accent', era.palette.accent);

      // Nav dots
      dots.forEach(d => {
        d.classList.toggle('active', d.getAttribute('data-era') === era.id);
      });
    }
  }

  // ---- Hero ----
  function initHero() {
    const hero = document.getElementById('hero');
    const quoteEl = hero.querySelector('.hero-quote');

    // Random loading quote
    const q = window.BHARAT_QUOTES[Math.floor(Math.random() * window.BHARAT_QUOTES.length)];
    quoteEl.innerHTML = `"${q.text}" <br><span style="font-style:normal;font-size:var(--text-xs);color:var(--ink-medium);">— ${q.source}</span>`;

    // Activate hero animation after a beat
    requestAnimationFrame(() => {
      setTimeout(() => hero.classList.add('active'), 200);
    });
  }

  // ---- Theme Filters ----
  function initThemeFilters() {
    const btns = document.querySelectorAll('#theme-bar .theme-filters button');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        STATE.activeTheme = btn.dataset.theme;
        filterEvents();
      });
    });
  }

  function filterEvents() {
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
      if (STATE.activeTheme === 'all') {
        card.style.display = '';
      } else {
        const themes = card.getAttribute('data-themes');
        card.style.display = themes.includes(STATE.activeTheme) ? '' : 'none';
      }
    });
  }

  // ---- Map & Empire Painter ----
  function initMap() {
    const regions = document.querySelectorAll('.region');
    const infoPanel = document.getElementById('region-info');
    const nameEl = document.getElementById('region-name');
    const descEl = document.getElementById('region-desc');
    const controlsEl = document.querySelector('.empire-controls');
    const scrubber = document.getElementById('empire-scrubber');
    const empireG = document.getElementById('map-empires');

    // Region hover/click
    regions.forEach(reg => {
      reg.addEventListener('mouseenter', e => {
        const key = reg.dataset.region;
        const info = REGION_INFO[key];
        if (!info) return;
        nameEl.textContent = info.name;
        descEl.textContent = info.desc;
        infoPanel.style.display = 'block';
        const rect = reg.getBoundingClientRect();
        const container = document.querySelector('.map-container').getBoundingClientRect();
        infoPanel.style.left = (rect.left - container.left + rect.width / 2) + 'px';
        infoPanel.style.top = (rect.top - container.top - 10) + 'px';
        infoPanel.style.transform = 'translate(-50%, -100%)';
      });
      reg.addEventListener('mouseleave', () => { infoPanel.style.display = 'none'; });
    });

    // Empire painter buttons
    const paintableEmpires = window.BHARAT_EMPIRES.filter(e =>
      ['maurya','gupta','chola','vijayanagara','maratha','mughal'].includes(e.id)
    );

    paintableEmpires.forEach(emp => {
      const btn = document.createElement('button');
      btn.className = 'empire-btn';
      btn.textContent = emp.name;
      btn.dataset.empire = emp.id;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.empire-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.selectedEmpire = emp.id;
        paintEmpire(emp);
      });
      controlsEl.appendChild(btn);
    });

    function paintEmpire(emp) {
      // Highlight regions belonging to this empire
      regions.forEach(reg => {
        const regionKey = reg.dataset.region;
        if (emp.regions.includes(regionKey)) {
          reg.style.fill = emp.color;
          reg.style.opacity = '0.5';
          reg.classList.add('active');
        } else {
          reg.style.fill = '';
          reg.style.opacity = '';
          reg.classList.remove('active');
        }
      });
    }
  }

  // ====== GAME: Timeline Duel ======
  function initTimelineDuel() {
    const container = document.getElementById('duel-cards');
    const checkBtn = document.getElementById('duel-check');
    const newBtn = document.getElementById('duel-new');
    const scoreEl = document.getElementById('duel-score');
    const streakEl = document.getElementById('duel-streak');
    const deckBtns = document.querySelectorAll('#game-timeline-duel .theme-filters button');
    let currentDeck = 'general';
    let currentCards = [];

    function loadRound() {
      const deck = window.BHARAT_QUIZ_DECKS[currentDeck] || window.BHARAT_QUIZ_DECKS.general;
      currentCards = shuffle(deck).slice(0, 8);
      renderCards();
    }

    function renderCards() {
      container.innerHTML = '';
      currentCards.forEach((card, i) => {
        const el = document.createElement('div');
        el.className = 'duel-card';
        el.setAttribute('draggable', 'true');
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'listitem');
        el.setAttribute('aria-label', card.label);
        el.dataset.index = i;
        el.dataset.year = card.year;
        el.innerHTML = `<div class="card-label">${card.label}</div><div class="card-year">${formatYear(card.year)}</div>`;

        // Drag events
        el.addEventListener('dragstart', e => {
          e.dataTransfer.setData('text/plain', i);
          el.style.opacity = '0.5';
        });
        el.addEventListener('dragend', () => { el.style.opacity = ''; });
        el.addEventListener('dragover', e => { e.preventDefault(); el.style.borderColor = 'var(--turmeric-gold)'; });
        el.addEventListener('dragleave', () => { el.style.borderColor = ''; });
        el.addEventListener('drop', e => {
          e.preventDefault();
          el.style.borderColor = '';
          const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
          const toIdx = parseInt(el.dataset.index);
          if (fromIdx !== toIdx) {
            const temp = currentCards[fromIdx];
            currentCards[fromIdx] = currentCards[toIdx];
            currentCards[toIdx] = temp;
            renderCards();
          }
        });

        // Keyboard reorder
        el.addEventListener('keydown', e => {
          const idx = parseInt(el.dataset.index);
          if (e.key === 'ArrowUp' && idx > 0) {
            [currentCards[idx], currentCards[idx - 1]] = [currentCards[idx - 1], currentCards[idx]];
            renderCards();
            container.children[idx - 1].focus();
          } else if (e.key === 'ArrowDown' && idx < currentCards.length - 1) {
            [currentCards[idx], currentCards[idx + 1]] = [currentCards[idx + 1], currentCards[idx]];
            renderCards();
            container.children[idx + 1].focus();
          }
        });

        container.appendChild(el);
      });
    }

    checkBtn.addEventListener('click', () => {
      const sorted = [...currentCards].sort((a, b) => a.year - b.year);
      let allCorrect = true;
      container.querySelectorAll('.duel-card').forEach((el, i) => {
        el.classList.add('revealed');
        if (currentCards[i].id === sorted[i].id) {
          el.classList.add('correct');
        } else {
          el.classList.add('wrong');
          allCorrect = false;
        }
      });
      if (allCorrect) {
        STATE.scores.duel += 10;
        STATE.scores.duelStreak++;
      } else {
        STATE.scores.duelStreak = 0;
      }
      scoreEl.textContent = STATE.scores.duel;
      streakEl.textContent = STATE.scores.duelStreak;
    });

    newBtn.addEventListener('click', loadRound);

    deckBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        deckBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDeck = btn.dataset.deck;
        loadRound();
      });
    });

    loadRound();
  }

  // ====== GAME: Chanakya's Gambit ======
  function initGambit() {
    const panel = document.getElementById('gambit-panel');
    const restartBtn = document.getElementById('gambit-restart');
    const tree = window.BHARAT_GAMBIT;

    function showNode(nodeId) {
      const node = tree.nodes[nodeId];
      if (!node) return;

      let html = `<p class="gambit-text">${node.text}</p>`;
      if (node.outcome) {
        html += `<div class="score-display" style="margin-top:var(--sp-4);">Score: ${node.score}/100</div>`;
        restartBtn.style.display = 'inline-block';
      } else if (node.choices) {
        html += '<div class="gambit-choices">';
        node.choices.forEach(c => {
          html += `<button class="gambit-choice" data-next="${c.next}">${c.label}</button>`;
        });
        html += '</div>';
      }
      panel.innerHTML = html;

      // Bind choice buttons
      panel.querySelectorAll('.gambit-choice').forEach(btn => {
        btn.addEventListener('click', () => showNode(btn.dataset.next));
      });
    }

    function start() {
      restartBtn.style.display = 'none';
      panel.innerHTML = `<p class="gambit-text">${tree.intro}</p><button class="gambit-choice" id="gambit-begin">Begin</button>`;
      document.getElementById('gambit-begin').addEventListener('click', () => showNode('start'));
    }

    restartBtn.addEventListener('click', start);
    start();
  }

  // ====== GAME: Who Am I? ======
  function initWhoAmI() {
    const panel = document.getElementById('whoami-panel');
    const scoreEl = document.getElementById('whoami-score');
    const roundEl = document.getElementById('whoami-round');
    const figures = window.BHARAT_FIGURES.filter(f => f.clues && f.clues.length >= 3);
    let queue = shuffle(figures).slice(0, 10);
    let currentIdx = 0;
    let clueIdx = 0;

    function showRound() {
      if (currentIdx >= queue.length) {
        panel.innerHTML = `<p class="whoami-clue">Game over! Final score: ${STATE.scores.whoami}</p>
          <button class="gambit-choice" id="whoami-restart">Play Again</button>`;
        document.getElementById('whoami-restart').addEventListener('click', () => {
          STATE.scores.whoami = 0;
          currentIdx = 0;
          clueIdx = 0;
          queue = shuffle(figures).slice(0, 10);
          showRound();
        });
        return;
      }

      const fig = queue[currentIdx];
      clueIdx = 0;
      roundEl.textContent = currentIdx + 1;

      // Pick 3 wrong options
      const wrongs = shuffle(figures.filter(f => f.id !== fig.id)).slice(0, 3);
      const options = shuffle([fig, ...wrongs]);

      renderClueUI(fig, options);
    }

    function renderClueUI(fig, options) {
      const maxPoints = 4 - clueIdx; // 4 pts for first clue, 1 for last
      panel.innerHTML = `
        <p class="whoami-clue">"${fig.clues[clueIdx]}"</p>
        <p style="color:var(--ink-light);font-size:var(--text-sm);margin-bottom:var(--sp-4);">Clue ${clueIdx + 1}/${fig.clues.length} — ${maxPoints > 0 ? maxPoints : 1} point${maxPoints !== 1 ? 's' : ''} if correct</p>
        <div class="whoami-options">
          ${options.map(o => `<button class="whoami-option" data-id="${o.id}">${o.name}</button>`).join('')}
        </div>
        ${clueIdx < fig.clues.length - 1 ? '<button class="gambit-choice" id="whoami-next-clue" style="margin-top:var(--sp-4);">Need another clue</button>' : ''}
      `;

      // Bind options
      panel.querySelectorAll('.whoami-option').forEach(btn => {
        btn.addEventListener('click', () => {
          const correct = btn.dataset.id === fig.id;
          btn.classList.add(correct ? 'correct' : 'wrong');
          if (correct) {
            STATE.scores.whoami += Math.max(1, 4 - clueIdx);
            scoreEl.textContent = STATE.scores.whoami;
          }
          // Show answer
          panel.querySelectorAll('.whoami-option').forEach(b => {
            if (b.dataset.id === fig.id) b.classList.add('correct');
            b.style.pointerEvents = 'none';
          });
          panel.insertAdjacentHTML('beforeend', `<p style="margin-top:var(--sp-4);color:var(--palm-leaf-cream);font-size:var(--text-sm);">${fig.summary}</p>`);
          setTimeout(() => { currentIdx++; showRound(); }, 2500);
        });
      });

      // Next clue button
      const nextClueBtn = document.getElementById('whoami-next-clue');
      if (nextClueBtn) {
        nextClueBtn.addEventListener('click', () => {
          clueIdx++;
          renderClueUI(fig, options);
        });
      }
    }

    showRound();
  }

  // ====== GAME: Match the Marvel ======
  function initMatchMarvel() {
    const invGrid = document.getElementById('match-inventions');
    const eraGrid = document.getElementById('match-eras');
    const countEl = document.getElementById('match-count');
    const feedbackEl = document.getElementById('match-feedback');
    const pairs = window.BHARAT_MATCH_PAIRS;
    let selectedInv = null;
    let matchCount = 0;

    const shuffledInv = shuffle(pairs);
    const shuffledEra = shuffle(pairs);

    shuffledInv.forEach(p => {
      const card = document.createElement('button');
      card.className = 'match-card';
      card.dataset.id = p.id;
      card.dataset.type = 'invention';
      card.innerHTML = `<strong>${p.invention}</strong>`;
      card.addEventListener('click', () => selectMatch(card));
      invGrid.appendChild(card);
    });

    shuffledEra.forEach(p => {
      const card = document.createElement('button');
      card.className = 'match-card';
      card.dataset.id = p.id;
      card.dataset.type = 'era';
      card.innerHTML = `<span style="font-size:var(--text-sm);color:var(--turmeric-light);">${p.era}</span>`;
      card.addEventListener('click', () => selectMatch(card));
      eraGrid.appendChild(card);
    });

    function selectMatch(card) {
      if (card.classList.contains('matched')) return;

      if (!selectedInv) {
        document.querySelectorAll('.match-card.selected').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedInv = card;
      } else {
        if (selectedInv === card) { selectedInv = null; card.classList.remove('selected'); return; }
        if (selectedInv.dataset.type === card.dataset.type) {
          selectedInv.classList.remove('selected');
          selectedInv = card;
          card.classList.add('selected');
          return;
        }

        // Check match
        if (selectedInv.dataset.id === card.dataset.id) {
          selectedInv.classList.remove('selected');
          selectedInv.classList.add('matched');
          card.classList.add('matched');
          matchCount++;
          countEl.textContent = matchCount;
          const pair = pairs.find(p => p.id === card.dataset.id);
          feedbackEl.textContent = pair ? pair.fact : 'Correct!';
        } else {
          selectedInv.classList.remove('selected');
          card.classList.add('wrong');
          selectedInv.classList.add('wrong');
          feedbackEl.textContent = 'Not quite — try again!';
          setTimeout(() => {
            document.querySelectorAll('.match-card.wrong').forEach(c => c.classList.remove('wrong'));
          }, 800);
        }
        selectedInv = null;
      }
    }
  }

  // ====== GAME: Build the Brihadeeswara ======
  function initTempleBuilder() {
    const canvas = document.getElementById('temple-canvas');
    const parts = document.getElementById('temple-parts');
    const infoEl = document.getElementById('temple-info');
    const tiers = window.BHARAT_BRIHADEESWARA_TIERS;
    const shuffled = shuffle(tiers);
    let nextOrder = 1;

    shuffled.forEach(tier => {
      const el = document.createElement('div');
      el.className = 'temple-part';
      el.setAttribute('draggable', 'true');
      el.setAttribute('tabindex', '0');
      el.dataset.order = tier.order;
      el.textContent = tier.label;

      el.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', tier.order);
        el.style.opacity = '0.5';
      });
      el.addEventListener('dragend', () => { el.style.opacity = ''; });

      // Click to place (easier on mobile)
      el.addEventListener('click', () => tryPlace(tier, el));
      el.addEventListener('keydown', e => { if (e.key === 'Enter') tryPlace(tier, el); });

      parts.appendChild(el);
    });

    canvas.addEventListener('dragover', e => e.preventDefault());
    canvas.addEventListener('drop', e => {
      e.preventDefault();
      const order = parseInt(e.dataTransfer.getData('text/plain'));
      const tier = tiers.find(t => t.order === order);
      const el = parts.querySelector(`[data-order="${order}"]`);
      if (tier && el) tryPlace(tier, el);
    });

    function tryPlace(tier, el) {
      if (tier.order === nextOrder) {
        // Correct placement
        el.classList.add('placed');
        const placed = document.createElement('div');
        placed.style.cssText = `width:100%;padding:var(--sp-2) var(--sp-4);background:rgba(212,160,60,0.15);border:1px solid rgba(212,160,60,0.3);border-radius:4px;text-align:center;font-size:var(--text-sm);color:var(--turmeric-light);margin-top:var(--sp-1);`;
        placed.textContent = tier.label;
        // Insert before the placeholder text
        const placeholder = canvas.querySelector('p');
        if (placeholder) placeholder.remove();
        canvas.appendChild(placed);
        infoEl.textContent = tier.desc;
        nextOrder++;

        if (nextOrder > tiers.length) {
          infoEl.innerHTML = '<strong style="color:var(--turmeric-gold);">The Brihadeeswara stands complete!</strong> Built in 1010 CE by Rajaraja Chola I — a feat of engineering, devotion, and human will that still inspires awe a thousand years later.';
        }
      } else {
        infoEl.textContent = `That's not the right piece yet. The temple needs its ${tiers.find(t => t.order === nextOrder)?.label || 'next tier'} first.`;
        el.style.borderColor = 'var(--madder-red)';
        setTimeout(() => { el.style.borderColor = ''; }, 800);
      }
    }
  }

  // ====== GAME: Decode the Indus ======
  function initDecodeIndus() {
    const grid = document.getElementById('indus-grid');
    const countEl = document.getElementById('indus-count');
    const msgEl = document.getElementById('indus-message');
    const seals = window.BHARAT_INDUS_SEALS;

    // Create a memory-match game: pairs of (glyph symbol, animal name)
    const sealSymbols = [
      '𓃰','𓃱','𓃲','𓃳','𓃴','𓃵','𓃶','𓃷' // Unicode animal-ish symbols as stand-ins
    ];

    // Create cards: one with symbol, one with animal name
    let cards = [];
    seals.forEach((seal, i) => {
      cards.push({ pairId: seal.id, type: 'glyph', display: sealSymbols[i] || '⬡', animal: seal.animal });
      cards.push({ pairId: seal.id, type: 'name', display: seal.animal, animal: seal.animal });
    });
    cards = shuffle(cards);

    let flipped = [];
    let matchedCount = 0;

    cards.forEach((card, i) => {
      const el = document.createElement('button');
      el.className = 'seal-card';
      el.dataset.idx = i;
      el.dataset.pairId = card.pairId;
      el.setAttribute('aria-label', 'Hidden seal card');
      el.innerHTML = `<span style="font-size:${card.type === 'glyph' ? '2rem' : 'var(--text-sm)'};opacity:0;">
        ${card.display}
      </span>`;

      el.addEventListener('click', () => {
        if (el.classList.contains('flipped') || el.classList.contains('matched') || flipped.length >= 2) return;

        el.classList.add('flipped');
        el.querySelector('span').style.opacity = '1';
        el.setAttribute('aria-label', card.display);
        flipped.push({ el, card });

        if (flipped.length === 2) {
          const [a, b] = flipped;
          if (a.card.pairId === b.card.pairId && a.card.type !== b.card.type) {
            a.el.classList.add('matched');
            b.el.classList.add('matched');
            matchedCount++;
            countEl.textContent = matchedCount;
            const seal = seals.find(s => s.id === a.card.pairId);
            msgEl.textContent = seal ? seal.description : 'Matched!';
            flipped = [];

            if (matchedCount === seals.length) {
              msgEl.innerHTML = 'All seals matched! Yet the Indus script remains one of archaeology\'s great mysteries. <em>Perhaps you will be the one to decode it.</em>';
            }
          } else {
            setTimeout(() => {
              a.el.classList.remove('flipped');
              b.el.classList.remove('flipped');
              a.el.querySelector('span').style.opacity = '0';
              b.el.querySelector('span').style.opacity = '0';
              a.el.setAttribute('aria-label', 'Hidden seal card');
              b.el.setAttribute('aria-label', 'Hidden seal card');
              flipped = [];
            }, 900);
          }
        }
      });

      grid.appendChild(el);
    });
  }

  // ---- End Card ----
  function initEndCard() {
    const shareBtn = document.getElementById('share-btn');
    const endYears = document.getElementById('end-years');

    // Calculate deepest year traveled
    const update = () => {
      const depth = STATE.deepestYear < 0 ? 2026 + Math.abs(STATE.deepestYear) : 2026 - STATE.deepestYear;
      endYears.textContent = depth > 0 ? depth.toLocaleString() : '0';
    };

    // Update on scroll to end
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: '#end-card',
        start: 'top 80%',
        onEnter: update,
        once: true
      });
    }

    shareBtn.addEventListener('click', () => {
      const depth = STATE.deepestYear < 0 ? 2026 + Math.abs(STATE.deepestYear) : 2026 - STATE.deepestYear;
      const text = `I just traveled ${depth.toLocaleString()} years through Indian civilization on "Bharat: 10,000 Years" — the world's oldest living culture, one scroll at a time.`;
      if (navigator.share) {
        navigator.share({ title: 'Bharat: 10,000 Years', text });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        shareBtn.textContent = 'Copied to clipboard!';
        setTimeout(() => { shareBtn.textContent = 'Share Your Journey'; }, 2000);
      }
    });
  }

  // ---- Diya Cursor (desktop only, subtle) ----
  function initDiyaCursor() {
    if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const trail = [];
      const TRAIL_LENGTH = 6;

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const dot = document.createElement('div');
        dot.className = 'diya-cursor';
        dot.style.cssText = `position:fixed;width:${4 + i}px;height:${4 + i}px;border-radius:50%;background:var(--turmeric-gold);pointer-events:none;z-index:9999;opacity:${0.4 - i * 0.06};transition:transform ${0.1 + i * 0.03}s ease;`;
        document.body.appendChild(dot);
        trail.push(dot);
      }

      document.addEventListener('mousemove', e => {
        trail.forEach((dot, i) => {
          setTimeout(() => {
            dot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
          }, i * 40);
        });
      });
    }
  }

  // ---- Initialize Everything ----
  function init() {
    buildTimeline();
    initHero();
    initScrollEngine();
    initThemeFilters();
    initMap();
    initTimelineDuel();
    initGambit();
    initWhoAmI();
    initMatchMarvel();
    initTempleBuilder();
    initDecodeIndus();
    initEndCard();
    initDiyaCursor();
  }

  // Wait for DOM + GSAP
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

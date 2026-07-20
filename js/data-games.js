/* Bharat: 10,000 Years — Game Data: Quiz decks, Chanakya's Gambit, Match the Marvel, etc. */

// ====== TIMELINE DUEL DECKS ======
window.BHARAT_QUIZ_DECKS = {
  general: [
    { id:"td-mehrgarh", label:"Mehrgarh founded", year:-8000 },
    { id:"td-mohenjo", label:"Mohenjo-daro rises", year:-2600 },
    { id:"td-mahabharat", label:"Mahabharata War (trad.)", year:-3102 },
    { id:"td-buddha", label:"Buddha's enlightenment", year:-528 },
    { id:"td-maurya", label:"Maurya Empire founded", year:-321 },
    { id:"td-ashoka-kalinga", label:"Ashoka conquers Kalinga", year:-261 },
    { id:"td-gupta", label:"Gupta Golden Age begins", year:320 },
    { id:"td-aryabhata", label:"Aryabhatiya composed", year:499 },
    { id:"td-kailasa", label:"Kailasa Temple carved", year:756 },
    { id:"td-shivaji", label:"Shivaji crowned Chhatrapati", year:1674 },
    { id:"td-plassey", label:"Battle of Plassey", year:1757 },
    { id:"td-1857", label:"First War of Independence", year:1857 },
    { id:"td-independence", label:"Indian Independence", year:1947 },
    { id:"td-chandrayaan3", label:"Chandrayaan-3 Moon landing", year:2023 }
  ],
  southIndia: [
    { id:"td-sangam", label:"Sangam Age flourishes", year:-100 },
    { id:"td-pallava", label:"Mahabalipuram carved", year:640 },
    { id:"td-rajaraja", label:"Rajaraja Chola crowned", year:985 },
    { id:"td-brihadeeswara", label:"Brihadeeswara completed", year:1010 },
    { id:"td-rajendra-navy", label:"Rajendra's SE Asian campaign", year:1025 },
    { id:"td-vijayanagara", label:"Vijayanagara founded", year:1336 },
    { id:"td-krishnadevaraya", label:"Krishnadevaraya's reign", year:1509 },
    { id:"td-talikota", label:"Battle of Talikota", year:1565 },
    { id:"td-travancore", label:"Travancore defeats the Dutch", year:1741 },
    { id:"td-mangalyaan", label:"Mangalyaan reaches Mars", year:2014 }
  ],
  science: [
    { id:"td-dentistry", label:"World's first dentistry (Mehrgarh)", year:-7000 },
    { id:"td-lothal", label:"Lothal dockyard built", year:-2400 },
    { id:"td-panini", label:"Panini's Ashtadhyayi", year:-500 },
    { id:"td-sushruta", label:"Sushruta Samhita", year:-600 },
    { id:"td-aryabhata2", label:"Aryabhata's pi approximation", year:499 },
    { id:"td-brahmagupta", label:"Brahmagupta formalizes zero", year:628 },
    { id:"td-iron-pillar", label:"Rustless Iron Pillar erected", year:402 },
    { id:"td-railway", label:"India's first railway", year:1853 },
    { id:"td-pokhran", label:"Pokhran-I nuclear test", year:1974 },
    { id:"td-chandrayaan1", label:"Chandrayaan-1 finds lunar water", year:2008 }
  ],
  freedomStruggle: [
    { id:"td-plassey2", label:"Battle of Plassey", year:1757 },
    { id:"td-bengal-famine", label:"Bengal Famine", year:1770 },
    { id:"td-1857b", label:"Rani Lakshmibai at Jhansi", year:1857 },
    { id:"td-inc", label:"Indian National Congress founded", year:1885 },
    { id:"td-swadeshi", label:"Swadeshi Movement", year:1905 },
    { id:"td-jallianwala", label:"Jallianwala Bagh massacre", year:1919 },
    { id:"td-dandi", label:"Dandi Salt March", year:1930 },
    { id:"td-bhagat", label:"Bhagat Singh hanged", year:1931 },
    { id:"td-quit", label:"Quit India Movement", year:1942 },
    { id:"td-ina", label:"Bose forms the INA", year:1943 }
  ]
};

// ====== MATCH THE MARVEL ======
window.BHARAT_MATCH_PAIRS = [
  { id:"mm-zero", invention:"Zero as a number", era:"Gupta / Early Medieval (~500–628 CE)", inventor:"Aryabhata & Brahmagupta", fact:"Without the Indian zero, modern computing, banking, and science would be impossible." },
  { id:"mm-chess", invention:"Chess (Chaturanga)", era:"Gupta Age (~6th century CE)", inventor:"Unknown — Indian origin", fact:"The four divisions of chaturanga — infantry, cavalry, elephants, chariots — mirror the Indian army." },
  { id:"mm-wootz", invention:"Wootz steel (crucible steel)", era:"~300 BCE onward", inventor:"South Indian smiths", fact:"Damascus steel blades, legendary for their sharpness, were forged from Indian wootz steel ingots exported by sea." },
  { id:"mm-surgery", invention:"Plastic surgery (rhinoplasty)", era:"~600 BCE", inventor:"Sushruta", fact:"Sushruta's forehead-flap rhinoplasty was re-discovered by British surgeons in 1794, who watched Indian practitioners perform it." },
  { id:"mm-grammar", invention:"Formal grammar (Ashtadhyayi)", era:"~500 BCE", inventor:"Panini", fact:"Panini's algebraic grammar system was described by Noam Chomsky as the most complete grammar of any language." },
  { id:"mm-yoga", invention:"Yoga", era:"Pre-Vedic / Vedic (3000+ BCE)", inventor:"Indian yogic tradition", fact:"A seal from Mohenjo-daro showing a figure in a yogic posture suggests yoga's roots go back to the Sindhu–Saraswati era." },
  { id:"mm-decimal", invention:"Decimal place-value system", era:"Gupta Age (~5th century CE)", inventor:"Indian mathematicians", fact:"Arab scholars learned the system from Indian texts and transmitted it to Europe, where it was (misleadingly) called 'Arabic numerals.'" },
  { id:"mm-ayurveda", invention:"Ayurveda", era:"Vedic / Post-Vedic (~1500 BCE+)", inventor:"Charaka, Sushruta", fact:"The Charaka Samhita describes over 600 medicines derived from plants, minerals, and animal products — an ancient pharmacopoeia still in clinical use." }
];

// ====== CHANAKYA'S GAMBIT — branching decision tree ======
window.BHARAT_GAMBIT = {
  title: "Chanakya's Gambit",
  intro: "You are a young warrior named Chandragupta. A brilliant Brahmin strategist called Chanakya has found you, trained you, and believes you can overthrow the corrupt Nanda dynasty. But the path to an empire is paved with hard choices. Will you make the right ones?",
  nodes: {
    start: {
      text: "Chanakya approaches you in secret: 'The Nanda king humiliated me and oppresses his people. I can give you a throne — but you must trust me completely.' Do you follow Chanakya?",
      choices: [
        { label: "Follow Chanakya into the wilderness to train", next: "train" },
        { label: "Refuse — the Nandas are too powerful to challenge", next: "refuse" }
      ]
    },
    refuse: {
      text: "You live a quiet life in obscurity. The Nanda dynasty continues to oppress the people for another generation. History forgets your name. Sometimes the greatest risk is not taking one.",
      outcome: true, score: 0
    },
    train: {
      text: "After years of training, you have gathered a small but loyal force. Chanakya presents two strategies: raise a border rebellion to draw the Nanda army out, or march directly on Pataliputra, the capital.",
      choices: [
        { label: "Start from the borders — weaken the periphery first", next: "borders" },
        { label: "March on Pataliputra directly — strike the head", next: "direct" }
      ]
    },
    direct: {
      text: "Your small force is crushed by the Nanda army in open battle. Chanakya pulls you from the wreckage and says: 'We must learn from the grass — it bends at the edges before it conquers the center.' You start over from the borders.",
      choices: [
        { label: "Accept the lesson and begin the border campaign", next: "borders" }
      ]
    },
    borders: {
      text: "Your border campaign succeeds brilliantly. Province after province falls. Now the Greek general Seleucus Nicator, Alexander's successor, threatens from the northwest. What do you do?",
      choices: [
        { label: "Offer a marriage alliance — diplomacy is cheaper than war", next: "diplomacy" },
        { label: "Fight Seleucus on the battlefield — show India's strength", next: "fight_seleucus" }
      ]
    },
    fight_seleucus: {
      text: "You defeat Seleucus decisively! He sues for peace, ceding all territory east of the Hindu Kush. Impressed, he sends his ambassador Megasthenes to your court. Your western frontier is secure.",
      choices: [
        { label: "Continue to consolidate the empire", next: "consolidate" }
      ]
    },
    diplomacy: {
      text: "Seleucus accepts the alliance. He sends Megasthenes as ambassador, and you exchange war elephants for peace. Your western border is secure. Chanakya nods approvingly — 'the best victory is one that costs no blood.'",
      choices: [
        { label: "Turn your attention to governing the empire", next: "consolidate" }
      ]
    },
    consolidate: {
      text: "Your empire now stretches from Afghanistan to Bengal — the largest India has ever seen. But unrest brews in Kalinga. Chanakya warns: 'Conquer it now, or your grandson will pay in blood.' Do you invade?",
      choices: [
        { label: "Invade Kalinga and secure the empire's coast", next: "invade_kalinga" },
        { label: "Leave Kalinga for now — focus on good governance", next: "leave_kalinga" }
      ]
    },
    invade_kalinga: {
      text: "Kalinga fights fiercely. The war is won, but thousands die. You are haunted by the cost. History would wait two generations before your grandson Ashoka would face this same choice — and be broken by it.",
      choices: [
        { label: "Continue to the final choice", next: "final" }
      ]
    },
    leave_kalinga: {
      text: "You focus on governance and prosperity. Kalinga remains independent — fierce and proud. Decades later, your grandson Ashoka will invade it, and the 100,000 dead will transform him from emperor to peacemaker. Perhaps some lessons must be learned in blood.",
      choices: [
        { label: "Continue to the final choice", next: "final" }
      ]
    },
    final: {
      text: "You are old now. The empire is vast and prosperous. Chanakya's Arthashastra governs every province. A Jain monk invites you to renounce the world. Do you cling to the throne, or walk away?",
      choices: [
        { label: "Renounce the throne and become an ascetic — true power is letting go", next: "renounce" },
        { label: "Stay on the throne — the empire needs you", next: "stay" }
      ]
    },
    renounce: {
      text: "You travel south to Shravanabelagola, give up everything, and fast unto death in the Jain tradition of sallekhana. History remembers Chandragupta Maurya as one of the very few empire-builders who chose to walk away from power. Your dynasty endures for another century, and your grandson Ashoka becomes the most famous ethical ruler in world history.",
      outcome: true, score: 100
    },
    stay: {
      text: "You rule until your last breath. The empire is stable, but your successors quarrel over the succession. Eventually your grandson Ashoka takes the throne, fights Kalinga, and transforms himself — and the empire — through dharma. Perhaps letting go would have set a different example. Your legacy endures either way.",
      outcome: true, score: 70
    }
  }
};

// ====== DECODE THE INDUS — seal glyph matching puzzle ======
window.BHARAT_INDUS_SEALS = [
  { id:"seal-1", glyph:"U+1", animal:"Unicorn Bull", description:"The most common Indus seal motif — a bull-like animal with a single horn, often shown before a ritual stand." },
  { id:"seal-2", glyph:"U+2", animal:"Elephant", description:"A majestic elephant, depicted with careful anatomical accuracy, suggesting close familiarity." },
  { id:"seal-3", glyph:"U+3", animal:"Rhinoceros", description:"The one-horned rhinoceros — evidence that these animals still roamed the Indus plains 4,500 years ago." },
  { id:"seal-4", glyph:"U+4", animal:"Tiger", description:"A tiger in profile, powerful and alert — the forests of the Sindhu–Saraswati basin still held large predators." },
  { id:"seal-5", glyph:"U+5", animal:"Water Buffalo", description:"A massive water buffalo with sweeping horns, likely connected to agricultural life." },
  { id:"seal-6", glyph:"U+6", animal:"Yogic Figure", description:"The famous 'Pashupati' seal — a seated figure in a yogic posture, surrounded by animals, hinting at proto-Shiva worship." },
  { id:"seal-7", glyph:"U+7", animal:"Hare", description:"A small hare, less common but beautifully rendered, showing the artists' range." },
  { id:"seal-8", glyph:"U+8", animal:"Gharial", description:"A fish-eating crocodilian still found in Indian rivers — the seal confirms Harappan familiarity with riverine ecosystems." }
];

// ====== BUILD THE BRIHADEESWARA — temple assembly tiers ======
window.BHARAT_BRIHADEESWARA_TIERS = [
  { id:"tier-base", label:"Adhishthana (base platform)", order:1, height:15, desc:"The massive granite base platform, establishing the temple's sacred footprint and elevation above the earth." },
  { id:"tier-wall", label:"Bhitti (temple wall)", order:2, height:20, desc:"Thick granite walls carved with deities, dancers, and inscriptions recording Rajaraja Chola's donations to the temple." },
  { id:"tier-inner", label:"Garbhagriha (sanctum)", order:3, height:15, desc:"The innermost chamber housing the Shiva lingam — the spiritual heart of the temple, dark and resonant." },
  { id:"tier-neck", label:"Griva (neck)", order:4, height:10, desc:"The transitional section between the main body and the soaring tower above, decorated with miniature shrines." },
  { id:"tier-v1", label:"Vimana Tier 1", order:5, height:12, desc:"The first receding storey of the pyramidal tower, each tier slightly smaller than the one below." },
  { id:"tier-v2", label:"Vimana Tier 2", order:6, height:10, desc:"The second storey — the tower narrows as it rises, creating the illusion of even greater height." },
  { id:"tier-v3", label:"Vimana Tier 3", order:7, height:10, desc:"The third storey — by this height, builders worked with ramps stretching kilometres to raise the stones." },
  { id:"tier-v4", label:"Vimana Tier 4–13", order:8, height:30, desc:"Nine more receding stories rise one atop the other, each carved before placement — 66 metres and counting." },
  { id:"tier-cupola", label:"Shikhara (cupola / capstone)", order:9, height:10, desc:"The crowning glory — an 80-tonne monolithic granite dome hauled up a ramp estimated at 6 kilometres long. No crane. No modern machinery. Just human will and engineering genius, in 1010 CE." }
];

// ====== WORLD CONTEXT MARKERS (comparison ribbon) ======
window.BHARAT_WORLD_CONTEXT = [
  { year:-8000, label:"Mehrgarh established", world:"Jericho is one of the few other settlements this old" },
  { year:-4500, label:"Mature Mehrgarh culture", world:"Sumer's earliest cities still centuries away" },
  { year:-3100, label:"Sindhu–Saraswati cities flourish", world:"Egypt's first dynasty begins around this time" },
  { year:-2600, label:"Mohenjo-daro at peak", world:"The Great Pyramid at Giza being built" },
  { year:-2400, label:"Lothal dockyard operational", world:"Stonehenge under construction in Britain" },
  { year:-1200, label:"Late Vedic janapadas", world:"Trojan War (traditional Greek dating)" },
  { year:-753, label:"Indian janapadas thriving", world:"Rome is traditionally founded this year" },
  { year:-500, label:"Panini writes grammar; Buddha teaches", world:"Athens enters its Golden Age" },
  { year:-326, label:"Alexander reaches India, turns back", world:"Alexander has conquered Persia and Egypt" },
  { year:-250, label:"Ashoka's peace edicts", world:"Rome fighting the Punic Wars" },
  { year:1, label:"Indo-Roman trade booming", world:"Roman Empire at its height" },
  { year:476, label:"Aryabhata writes the Aryabhatiya", world:"Western Roman Empire falls" },
  { year:800, label:"Shankaracharya's philosophical missions", world:"Charlemagne crowned in Europe" },
  { year:1010, label:"Brihadeeswara Temple completed", world:"Viking Leif Erikson reaches North America" },
  { year:1215, label:"Delhi Sultanate established", world:"Magna Carta signed in England" },
  { year:1453, label:"Vijayanagara at its peak", world:"Constantinople falls to the Ottomans" },
  { year:1492, label:"India's economy among the world's largest", world:"Columbus reaches the Americas" },
  { year:1600, label:"India produces ~25% of world GDP", world:"Shakespeare writing in England" },
  { year:1776, label:"British consolidating control of India", world:"American Declaration of Independence" },
  { year:1947, label:"Indian Independence", world:"The United Nations is two years old" },
  { year:2023, label:"Chandrayaan-3 on the Moon", world:"Only 4 countries have ever soft-landed on the Moon" }
];

// ====== LOADING QUOTES ======
window.BHARAT_QUOTES = [
  { text: "Truth alone triumphs.", source: "Mundaka Upanishad", era: "Vedic" },
  { text: "Of what use is a pot of milk, when the entire ocean is churned?", source: "Thirukkural", era: "Sangam" },
  { text: "I searched for God and found only myself. I searched for myself and found only God.", source: "Kabir", era: "Bhakti" },
  { text: "Where the mind is without fear and the head is held high, into that heaven of freedom, my Father, let my country awake.", source: "Rabindranath Tagore", era: "Colonial" },
  { text: "Dream is not that which you see while sleeping. It is something that does not let you sleep.", source: "A.P.J. Abdul Kalam", era: "Republic" },
  { text: "Let noble thoughts come to us from every direction.", source: "Rigveda", era: "Vedic" },
  { text: "Swaraj is my birthright, and I shall have it.", source: "Bal Gangadhar Tilak", era: "Colonial" },
  { text: "In a gentle way, you can shake the world.", source: "Mahatma Gandhi", era: "Colonial" }
];

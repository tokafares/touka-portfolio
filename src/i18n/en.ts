import type { Translations } from './types'

export const en: Translations = {
  meta: {
    role: 'Frontend & Full-stack Developer',
    description:
      'Freelance frontend and full-stack developer building fast, polished web apps with React, TypeScript, Node.js and PostgreSQL, in English, Arabic or both.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    mainNav: 'Main',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLanguage: 'Switch to Arabic',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    opensInNewTab: '(opens in a new tab)',
    openImage: (caption) => `Open image: ${caption}`,
    closeGallery: 'Close gallery',
    previousImage: 'Previous image',
    nextImage: 'Next image',
    imageCount: (current, total) => `Image ${current} of ${total}`,
  },
  nav: {
    services: 'Services',
    work: 'Work',
    skills: 'Skills',
    process: 'Process',
    contact: 'Contact',
  },
  languageToggle: 'عربي',
  hero: {
    available: 'Available for freelance work',
    role: 'Frontend & *Full-stack* Developer',
    lead: 'I build fast, polished web apps with React, TypeScript, Node.js and PostgreSQL, in English, Arabic or both, with right-to-left layouts done properly.',
    viewProjects: 'View projects',
    contactMe: 'Contact me',
    specFile: 'profile.ts',
    spec: {
      focus: ['focus', 'Web apps, dashboards, booking systems'],
      stack: ['stack', 'React · TypeScript · Node.js · PostgreSQL'],
      languages: ['languages', 'English · Arabic (RTL)'],
      availability: ['status', 'Taking on new projects'],
    },
  },
  services: {
    eyebrow: 'Services',
    title: 'What I can *build* for you',
    intro: 'Freelance work across the stack, from a single landing page to a full system with a database behind it.',
    items: {
      landing: {
        title: 'Landing pages & business websites',
        body: 'Fast, responsive pages that present your business clearly, load quickly on phones and are set up properly for search engines.',
      },
      dashboards: {
        title: 'Admin dashboards',
        body: 'Data tables, filters, charts and forms that make internal tools pleasant to use, with dark mode and layouts that work on any screen.',
      },
      ecommerce: {
        title: 'E-commerce storefronts',
        body: 'Product listings with filtering and search, variants, a cart and a validated checkout flow, ready to connect to your payment provider.',
      },
      booking: {
        title: 'Booking & management systems',
        body: 'Full-stack apps with scheduling, live availability, admin panels and a PostgreSQL database that keeps your data consistent.',
      },
      rtl: {
        title: 'Arabic / English RTL websites',
        body: 'Bilingual sites with real right-to-left layouts, Arabic typography and number formatting, not just mirrored text.',
      },
    },
  },
  work: {
    eyebrow: 'Work',
    title: 'Selected *projects*',
    intro: 'All of them are open source and most have a live demo, so you can try them and read the code. Concept projects are fictional businesses built to show the kind of work I deliver.',
    concept: 'Concept project',
    personal: 'Personal project',
    caseStudy: 'Case study',
    live: 'Live',
    code: 'Code',
    comingSoon: 'Live demo coming soon',
    moreTech: (count) => `+${count} more`,
  },
  skills: {
    eyebrow: 'Skills',
    title: 'Tools I *work* with',
    intro: 'The stack behind the projects above.',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      tools: 'Tools',
    },
  },
  process: {
    eyebrow: 'Process',
    title: 'How I *work*',
    intro: 'A simple, transparent process, so you always know what is happening and what comes next.',
    steps: [
      {
        title: 'Understand',
        body: 'We talk through your goals, your users and the must-haves. I ask questions until the scope is clear, then send a written plan with milestones.',
      },
      {
        title: 'Design',
        body: 'I sketch the structure and the visual direction, agree on it with you, and only then start building.',
      },
      {
        title: 'Build',
        body: 'I build in small, reviewable steps and share a live preview link, so you can follow progress and give feedback early.',
      },
      {
        title: 'Deliver & support',
        body: 'You get the deployed site, the source code and short documentation. I stay available for fixes and follow-up changes after launch.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's build *something*",
    intro: 'Tell me about your project, in English or Arabic, and we can take it from there.',
    channelsTitle: 'Reach me directly',
    channels: {
      email: 'Email',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      upwork: 'Upwork',
      mostaql: 'Mostaql',
      khamsat: 'Khamsat',
      github: 'GitHub',
    },
    form: {
      title: 'Send a message',
      name: 'Your name',
      namePlaceholder: 'e.g. Sara Ahmed',
      type: 'Project type',
      types: {
        landing: 'Landing page / business website',
        dashboards: 'Admin dashboard',
        ecommerce: 'E-commerce storefront',
        booking: 'Booking / management system',
        rtl: 'Arabic / English website',
        other: 'Something else',
      },
      message: 'About your project',
      messagePlaceholder: 'What do you want to build, and by when?',
      submit: 'Open email',
      note: 'This opens your email app with the message filled in. Nothing is sent until you press send there.',
      errors: {
        name: 'Please add your name.',
        message: 'Please write at least a sentence about the project.',
      },
      subject: (type, name) => `Project enquiry: ${type} (${name})`,
      body: (message, type, name) => `Hi,\n\n${message}\n\nProject type: ${type}\n\n${name}`,
      opened: 'Your email app should open now. If it did not, use the direct links instead.',
    },
  },
  footer: {
    builtWith: 'Built with React, TypeScript and Tailwind CSS.',
    backToTop: 'Back to top',
    source: 'Source code',
  },
  project: {
    back: 'All projects',
    overview: 'Overview',
    features: 'Key features',
    stack: 'Tech stack',
    highlights: 'Technical highlights',
    gallery: 'Screenshots',
    galleryHint: 'Select a screenshot to view it full size.',
    liveDemo: 'Live demo',
    sourceCode: 'Source code',
    comingSoon: 'Live demo coming soon',
    conceptNote: 'Concept project: a fictional business built for my portfolio. All data in the demo is made up.',
    personalNote: 'Personal project that I designed, built and maintain.',
    localScreenshots: 'Screenshots were captured from the app running locally.',
    next: 'Next project',
    mobile: 'Mobile',
  },
  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for does not exist or has moved.',
    home: 'Back to home',
  },
  projects: {
    'nour-clinic': {
      name: 'Nour Dental Clinic',
      oneLiner: 'Full-stack appointment booking with live availability and a staff dashboard.',
      overview: [
        'A booking system for a small dental clinic. Patients choose a treatment, a dentist and a time in a guided flow, and availability is calculated on the server from each dentist’s working hours and existing bookings.',
        'Staff sign in to a protected dashboard to follow today’s schedule, manage appointments, edit services and set working hours. The demo data resets every day through a scheduled job.',
      ],
      features: [
        'Guided booking flow with live, server-calculated time slots',
        'Booking reference, plus look-up and cancellation with reference and phone',
        'Admin overview: today, this week, upcoming and cancellation rate',
        'Appointments list with views, filters, search, pagination and inline status changes',
        'Services management and a weekly working-hours editor',
        'Daily demo reset via a Vercel Cron job',
      ],
      highlights: [
        {
          title: 'Double booking blocked in the database',
          body: 'A PostgreSQL exclusion constraint rejects any overlapping time range for the same dentist. When two requests race for one slot, the second gets a clear “slot taken” message and goes back to fresh availability.',
        },
        {
          title: 'Tested against real Postgres',
          body: 'Vitest runs the real migrations on PGlite (Postgres in WebAssembly): slot logic, the HTTP API, and a test where six simultaneous requests for one slot produce exactly one booking.',
        },
        {
          title: 'Timezone-safe scheduling',
          body: 'Times are stored in UTC and all scheduling happens in the clinic’s timezone, Africa/Cairo, including daylight saving, with tests for summer and winter offsets.',
        },
        {
          title: 'Secure admin sessions',
          body: 'JWT in an httpOnly cookie, bcrypt password hashing, Zod validation on every request and rate limiting on public endpoints.',
        },
      ],
      shots: {
        home: 'Home page',
        booking: 'Choosing a day and time slot',
        confirmation: 'Booking confirmation with reference',
        'admin-overview': 'Admin overview',
        'admin-appointments': 'Admin appointments list',
        'admin-hours': 'Working hours editor',
        'mobile-booking': 'Booking flow on mobile',
      },
    },
    ember: {
      name: 'Ember',
      oneLiner: 'Minimalist home-goods storefront with URL-synced filters, cart and checkout.',
      overview: [
        'An e-commerce frontend for a fictional home-goods brand: 34 products across four categories, with variants, stock levels and sale prices, served by a typed fake API with realistic latency.',
        'It covers the whole shopping journey, from browsing and filtering to a validated three-step checkout and an order confirmation page.',
      ],
      features: [
        'Shop with category, price range, sorting, search and pagination',
        'Product pages with an image gallery, colour and size variants and stock messages',
        'Cart drawer and cart page with a free-shipping progress bar',
        'Three-step checkout: shipping, payment and review',
        'Wishlist and toast notifications',
        'Cart and wishlist synced across browser tabs',
      ],
      highlights: [
        {
          title: 'Shop state lives in the URL',
          body: 'Filters, sorting, search and page are query parameters, so every view can be shared and back/forward behave as expected. Changing a filter resets to page one without jumping the scroll position.',
        },
        {
          title: 'Checkout that validates like a real one',
          body: 'Inline errors with focus moved to the first invalid field, a Luhn card check with brand detection and auto-formatting, expiry and CVC rules, and a decline path to test errors.',
        },
        {
          title: 'Persistence without a backend',
          body: 'Cart and wishlist are saved to localStorage and synced across tabs, the shipping draft lives in sessionStorage, and card details are never stored.',
        },
        {
          title: 'Accessible overlays',
          body: 'Focus-trapped drawers that close on Escape and return focus, a skip link, keyboard-only focus rings and reduced-motion support.',
        },
      ],
      shots: {
        home: 'Home page',
        shop: 'Shop with filters',
        product: 'Product page',
        cart: 'Cart drawer with two items',
        checkout: 'Checkout, shipping step',
        mobile: 'Shop on mobile',
      },
    },
    sahtein: {
      name: 'Sahtein',
      oneLiner: 'Bilingual Arabic/English restaurant site with real RTL, WhatsApp ordering and reservations.',
      overview: [
        'A landing page for a fictional Egyptian-Levantine restaurant in Zamalek, Cairo. Arabic is the default language with a full right-to-left layout, and English is one tap away.',
        'Visitors browse the menu, build an order that is sent through WhatsApp, and reserve a table with custom date and time pickers.',
      ],
      features: [
        'Arabic/English toggle, saved and applied before the first paint',
        'Menu with five category tabs and twenty dishes',
        'WhatsApp order cart with an itemised, pre-filled message',
        'Reservation form with custom date chips and time slots',
        'Photo gallery with a keyboard-friendly lightbox',
        'Opening hours, contact links and an embedded map',
      ],
      highlights: [
        {
          title: 'RTL done properly',
          body: 'The layout uses logical properties only, directional icons mirror in RTL, and arrow keys follow the reading direction in tabs, pickers and the lightbox.',
        },
        {
          title: 'Arabic formatting',
          body: 'Prices, dates and counts use the Intl API with Arabic-Indic digits, and Arabic plural rules are handled for item and guest counts.',
        },
        {
          title: 'Ordering through WhatsApp',
          body: 'The cart builds an itemised order message in the current language and opens WhatsApp, so a restaurant can take orders without a backend.',
        },
        {
          title: 'Typed translations',
          body: 'Every string lives in typed Arabic and English files. A missing key is a compile error, so the two languages can’t drift apart.',
        },
      ],
      shots: {
        'hero-ar': 'Hero section in Arabic',
        'menu-ar': 'Menu section in Arabic',
        'hero-en': 'Hero section in English',
        reservation: 'Reservation form with a time slot selected',
        'mobile-menu': 'Arabic menu on mobile with items in the cart',
      },
    },
    'pulse-analytics': {
      name: 'Pulse Analytics',
      oneLiner: 'SaaS admin dashboard with KPI cards, charts, a customer directory and dark mode.',
      overview: [
        'An admin dashboard for a fictional SaaS product, with a login screen, an overview of KPIs and charts, a customer directory and a settings page.',
        'All data comes from a mock API layer with simulated network delay, so real loading and empty states are visible, and connecting a real backend means replacing one file.',
      ],
      features: [
        'KPI cards with month-over-month change',
        'Revenue line chart and signups-by-channel bar chart',
        'Searchable, sortable, filterable customer table with a detail drawer',
        'Settings form with client-side validation',
        'Dark and light themes',
        'Responsive layout with a mobile navigation drawer',
      ],
      highlights: [
        {
          title: 'Charts that follow the theme',
          body: 'Recharts line and bar charts with custom tooltips, styled for both dark and light mode.',
        },
        {
          title: 'Theme that remembers you',
          body: 'The dark/light choice is saved to localStorage and the system preference is respected on the first visit.',
        },
        {
          title: 'Real loading and empty states',
          body: 'Skeleton placeholders while data loads and clear empty states when filters return nothing.',
        },
        {
          title: 'Backend-ready data layer',
          body: 'Every data function lives in one file and returns typed Promises, so a real API can replace the mocks without touching the UI.',
        },
      ],
      shots: {
        'overview-dark': 'Overview in dark mode',
        'overview-light': 'Overview in light mode',
        'customers-drawer': 'Customers with the detail drawer open',
        login: 'Login screen',
        'mobile-overview': 'Overview on mobile',
      },
    },
    gamersense: {
      name: 'GamerSense',
      oneLiner: 'League of Legends training platform with quizzes, timed drills and real-time 1v1 duels.',
      overview: [
        'A chess.com-style trainer for League of Legends game sense. Real in-game situations (rotations, trades, fights and macro decisions) become quizzes, timed drills and head-to-head matches.',
        'It is a full-stack app: a React frontend, a Fastify API with a Socket.io server, PostgreSQL through Prisma, Redis, and a separate admin panel for managing content.',
        'The live demo runs without the backend. A demo build answers the API in the browser from the real seed data, so every single-player mode, XP levels and the leaderboard work as a guest. Live duels need the game server, so the demo explains that instead.',
      ],
      features: [
        'Scenario quizzes per lane, with hints and explanations',
        'Blitz mode on a 25-second timer',
        'Guess the Rank from gameplay clips, with a community vote breakdown',
        'Real-time 1v1 trivia and Guess the Rank duels via invite link',
        'Champion knowledge hub on live Data Dragon data',
        'XP levels with a level-up popup, per-lane ranks and a leaderboard',
      ],
      highlights: [
        {
          title: 'Server-authoritative duels',
          body: 'The Socket.io server owns the match state: it sends each round on a 20-second timer, scores answers, decides the winner (including draws) and lets players reconnect, resume and rematch. Invite tokens live in Redis.',
        },
        {
          title: 'Backend-free demo build',
          body: 'With one build flag, the API client answers requests in the browser using the backend’s own rules (scoring, tiers, the XP curve) and seed data, so the app can be tried without running any server.',
        },
        {
          title: 'Always on the latest patch',
          body: 'Champion data and art come from Riot’s Data Dragon at runtime, with request de-duplication and an in-memory cache.',
        },
        {
          title: 'Content managed separately',
          body: 'A separate admin app with role-based access is used to manage questions and Guess the Rank rounds, and to rename, re-role or remove users.',
        },
      ],
      shots: {
        landing: 'Landing page',
        scenarios: 'Scenario answered, with the correct call highlighted',
        'guess-rank': 'Guess the Rank: watching a clip and picking a rank',
        'guess-rank-results': 'Guess the Rank results and vote breakdown',
        profile: 'Profile with XP level and stats',
        'knowledge-hub': 'Champion knowledge hub',
        champion: 'Champion detail page',
        'mobile-landing': 'Landing page on mobile',
      },
    },
  },
}

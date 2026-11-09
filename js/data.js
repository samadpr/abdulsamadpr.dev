/* ==========================================================================
   CONTENT DATA – project case studies and AI pipeline.
   Only information from the existing portfolio / CV / owner brief is used.
   `links` stays empty when no public link exists – never add placeholders.
   ========================================================================== */
window.PROJECTS = {
  infoasset: {
    icon: 'fa-boxes-stacked', tags: ['Enterprise SaaS', 'Infome Technologies LLC'],
    title: 'InfoAsset – Smart Asset Management System',
    sub: 'Multi-tenant enterprise platform · ASP.NET Core · Angular · SQL Server',
    overview: 'An enterprise platform to register, track, assign and maintain organisational assets across multiple companies, sites and branches, with reporting, subscriptions and an AI-powered assistant (IVA).',
    problem: 'Organisations with assets spread over departments, locations and users need one reliable source of truth for the full asset lifecycle, from registration to maintenance, instead of manual tracking.',
    solution: 'A multi-tenant SaaS platform: each organisation is isolated as a tenant, with role-based access, automated asset IDs, barcode/QR generation, bulk import, issue and maintenance workflows, analytics and an AI assistant.',
    role: 'Software Engineer on the product: RESTful API development with ASP.NET Core, SQL Server design and optimisation, Angular dashboards, authentication and RBAC, and AI assistant integration.',
    features: [
      'Multi-company, multi-site and multi-branch management',
      'Asset registration and tracking with automated asset ID generation',
      'Barcode and QR code generation',
      'Bulk import using Excel / CSV',
      'Asset issue and maintenance management',
      'Reporting and analytics dashboards',
      'Subscription and tenant management',
      'RFID / GPS tracking integrations',
      'AI-powered predictive-maintenance concepts',
      'IVA – AI-powered assistant (Azure AI Foundry, RAG)'
    ],
    impact: ['SQL Server optimisation (stored procedures, indexing) improved query performance by about 30%, as measured during development.'],
    arch: { type: 'flow', nodes: [['Angular', 'Admin dashboards'], ['ASP.NET Core API', 'JWT · RBAC · Swagger'], ['SQL Server', 'Tenant-aware data'], ['Integrations', 'RFID · GPS · AI (IVA)']] },
    stack: ['ASP.NET Core Web API', 'Angular', 'SQL Server', 'JWT', 'RBAC', 'Azure DevOps', 'Docker', 'Azure AI Foundry'],
    links: [{ label: 'Visit infoasset.me', href: 'https://infoasset.me' }]
  },

  infoid: {
    icon: 'fa-id-card', tags: ['Desktop Application', 'Enterprise Software'],
    title: 'InfoID – ID Card Designing & Printing Software',
    sub: 'Avalonia UI desktop app · layered .NET architecture · ASP.NET Core API',
    overview: 'Desktop software for designing and printing ID cards, centred on a custom drag-and-drop card designer and its rendering pipeline. The desktop client uses Avalonia UI (not WPF).',
    problem: 'Organisations need to produce ID cards in several physical formats, combining design, cardholder data, barcodes and magnetic-stripe encoding, without juggling separate tools.',
    solution: 'A cross-layer solution: an Avalonia desktop designer and print workspace backed by an ASP.NET Core API, with a separate admin application, SQLite persistence and licensing.',
    role: 'Desktop application development in C# / .NET, covering the designer canvas, layered architecture and API integration.',
    features: [
      'Advanced ID card designer with a drag-and-drop canvas',
      'Card templates and custom layouts',
      'Multiple card formats: CR79, CR80, CR90, CR100',
      'Text, shapes, images, line and pen tools',
      'Barcode and QR code integration',
      'Magnetic stripe support',
      'Employee / cardholder management',
      'Batch printing and print preview',
      'Multi-document workspace',
      'Organisation and branch management',
      'Licensing functionality'
    ],
    arch: { type: 'layers', nodes: [['Desktop Application', 'Avalonia UI – designer, canvas, print preview'], ['Admin Application', 'Organisation, branch and license management'], ['API Layer', 'ASP.NET Core'], ['Application Layer', 'Use cases and orchestration'], ['Domain Layer', 'Entities and business rules'], ['Infrastructure Layer', 'SQLite persistence, services'], ['Shared Layer', 'Contracts and common code']] },
    stack: ['C#', '.NET', 'Avalonia UI', 'ASP.NET Core', 'SQLite'],
    links: [],
    note: 'Private commercial product, so no public repository or demo is available.'
  },

  assistant: {
    icon: 'fa-robot', tags: ['AI', 'Enterprise'],
    title: 'AI-Powered Enterprise Assistant',
    sub: 'Azure AI Foundry · LLMs · RAG · integrated into InfoAsset',
    overview: 'An Azure AI-powered assistant integrated into InfoAsset. It uses Retrieval-Augmented Generation to answer questions from live organisational data while respecting each user\'s permissions.',
    problem: 'Enterprise users need quick, accurate answers about assets and operations without navigating many screens or building reports by hand.',
    solution: 'An LLM-based conversational assistant grounded in the platform\'s own data through RAG and semantic search, with prompt engineering that makes answers role-aware and organisation-specific.',
    role: 'Integrated Azure AI Foundry and LLMs with the ASP.NET Core APIs and Angular frontend; worked on retrieval, prompt design, chat session management and permission-aware responses.',
    features: [
      'Azure AI Foundry and LLM integration',
      'RAG for contextual, data-aware responses',
      'Semantic and vector-based knowledge retrieval',
      'Advanced prompt engineering for role-aware outputs',
      'Chat session management with conversation history',
      'Permission-aware answers: users only see data they are authorised to access',
      'AI-assisted asset information retrieval and reporting help'
    ],
    arch: { type: 'flow', nodes: [['Angular chat UI', 'Conversation'], ['ASP.NET Core API', 'Auth · permissions · sessions'], ['Retrieval', 'Semantic search over tenant data'], ['Azure AI Foundry', 'LLM response'], ['Answer', 'Role-aware result']] },
    stack: ['Azure AI Foundry', 'LLMs', 'RAG', 'Prompt Engineering', 'Semantic Search', 'ASP.NET Core', 'Angular'],
    links: []
  },

  agents: {
    icon: 'fa-diagram-project', tags: ['AI', 'Intelligent Automation', 'Learning & exploration'],
    title: 'AI Agent Development',
    sub: 'Agent architecture and capabilities · what is implemented vs. what I am exploring',
    overview: 'A showcase of how I approach AI agents: an LLM that plans, selects tools and calls APIs or databases to produce a grounded result. It is not a single product; see the status of each capability below.',
    problem: 'Plain chat models cannot reliably act on real systems. Useful automation needs reasoning, tool use and access to trusted data.',
    solution: 'Agent pipeline: User Request → AI Agent → Reasoning & Planning → Tool Selection → API / Database / External Services → Result.',
    role: 'Implemented the LLM, RAG and conversational parts inside InfoAsset. Studying agent planning, tool calling and multi-agent orchestration through the Google × Kaggle AI Agents Intensive.',
    features: [
      '<span class="status impl">Implemented</span> LLM integration',
      '<span class="status impl">Implemented</span> Retrieval-Augmented Generation and semantic search',
      '<span class="status impl">Implemented</span> Context and chat-session management; conversational interface',
      '<span class="status impl">Implemented</span> API and database interaction through the assistant\'s backend',
      '<span class="status learn">Learning</span> Agent reasoning and planning',
      '<span class="status learn">Learning</span> Tool calling and function execution',
      '<span class="status learn">Learning</span> Multi-agent orchestration and workflow automation (Gemini-based agents)'
    ],
    arch: { type: 'flow', nodes: [['User Request', 'Natural language'], ['AI Agent', 'LLM + context'], ['Reasoning & Planning', 'Break down the task'], ['Tool Selection', 'Choose a function'], ['API / DB / Services', 'Execute'], ['Result', 'Grounded output']] },
    stack: ['LLMs', 'Azure AI Foundry', 'RAG', 'Prompt Engineering', 'Gemini', 'Tool Calling'],
    links: [{ label: 'Kaggle certificate', href: 'https://www.kaggle.com/certification/badges/abdulsamadpr/105' }],
    note: 'Learning items are not claimed as production features.'
  },

  events: {
    icon: 'fa-qrcode', tags: ['Mobile', 'IoT', 'Infome Technologies LLC'],
    title: 'Event Check-In & QR Scanning App',
    sub: 'Flutter · REST APIs · deployed in Saudi Arabia',
    overview: 'A high-performance Flutter app for attendee verification and entry management, used at Netflix promotional events in Saudi Arabia (Wednesday Season 2, Stranger Things Season 5).',
    problem: 'Large events need fast, reliable entry control so thousands of guests are verified without long queues.',
    solution: 'A scanner app that validates QR codes against registration data through a secure backend and gives an instant go / no-go result.',
    role: 'Built the Flutter application and its API integration as part of the InfoEventz work at Infome Technologies.',
    features: ['Real-time QR scanning with instant visual feedback', 'Secure backend validation against registration data', 'Real-time data synchronisation', 'UI optimised for high-throughput check-in'],
    impact: ['Deployed at Netflix events in Saudi Arabia, handling thousands of attendee entries.'],
    arch: { type: 'flow', nodes: [['Flutter app', 'QR scanner'], ['REST API', 'Validate attendee'], ['Event data', 'Registrations'], ['Result', 'Go / no-go']] },
    stack: ['Flutter', 'Dart', 'REST APIs', 'QR Scanning', 'Firebase'],
    links: []
  },

  fii: {
    icon: 'fa-id-badge', tags: ['IoT', 'Mobile', 'Enterprise'],
    title: 'FII Guest Entry & UHF RFID Monitoring',
    sub: 'Flutter · .NET Worker Services · .NET MAUI Blazor · FII Conference, Riyadh',
    overview: 'Entry management and UHF RFID monitoring deployed at the FII Global Investment Conference in Riyadh, tracking attendees across zones and monitoring anti-theft gates in real time.',
    problem: 'A multi-zone conference needs accurate attendee movement tracking and gate security at scale.',
    solution: 'A Flutter entry app plus UHF RFID readers processed by .NET Worker Services, with a .NET MAUI Blazor Hybrid monitoring interface.',
    role: 'Developed the entry app, RFID integration services and the monitoring interface (InfoEventz work at Infome Technologies).',
    features: ['Multi-zone QR check-in / check-out tracking', 'UHF RFID badge detection via .NET Worker Services', 'Monitoring UI built with .NET MAUI Blazor Hybrid', 'Real-time sync across multiple RFID gate devices', 'Automated alerts and different access levels per zone'],
    arch: { type: 'flow', nodes: [['UHF RFID gates', 'Badge reads'], ['Worker Services', '.NET processing'], ['ASP.NET Core API', 'Real-time sync'], ['MAUI Blazor UI', 'Monitoring & alerts']] },
    stack: ['Flutter', 'Dart', '.NET Worker Services', 'UHF RFID', '.NET MAUI Blazor Hybrid', 'ASP.NET Core'],
    links: []
  },

  rfid: {
    icon: 'fa-book', tags: ['IoT', 'Enterprise', 'Aitrich Technologies'],
    title: 'RFID Anti-Theft – InfoBookz Library System',
    sub: '.NET Core · RFID device integration · Thrissur, India',
    overview: 'RFID-based security integration for the InfoBookz Library Management System that detects books leaving without checkout and triggers alerts.',
    problem: 'Manual checks for unauthorised book removal are slow and unreliable.',
    solution: 'RFID gates connected to secure backend APIs validate each item\'s issue status in real time and raise visual and alarm alerts for unauthorised movement.',
    role: 'Integrated the RFID devices with the backend during my internship at Aitrich Technologies.',
    features: ['Secure API integration with RFID detection devices', 'Real-time detection of non-checked-out items at the gate', 'Validation logic against issue records', 'Visual alerts and alarm mechanisms'],
    arch: { type: 'flow', nodes: [['RFID gate', 'Tag read'], ['Backend API', 'Check issue status'], ['InfoBookz DB', 'Library records'], ['Alarm', 'Alert if unauthorised']] },
    stack: ['.NET Core', 'C#', 'RFID', 'SQL Server', 'REST APIs'],
    links: []
  },

  invoice: {
    icon: 'fa-file-invoice', tags: ['Mobile', 'Infome Technologies LLC'],
    title: 'Invoice Management & PDF Generation (InfoPos)',
    sub: 'Flutter · Dart · PDF export',
    overview: 'A cross-platform Flutter app for creating and managing invoices with automatic VAT calculation and PDF preview / export.',
    problem: 'Small businesses need quick, accurate invoicing on mobile.',
    solution: 'Form-based invoice creation with live VAT and totals, then professional PDF generation and sharing.',
    role: 'Built the Flutter application and PDF generation.',
    features: ['Invoice creation with form-based entry', 'Automatic VAT calculation and billing summary', 'PDF preview before export', 'PDF export and sharing', 'Multiple invoice templates'],
    stack: ['Flutter', 'Dart', 'PDF generation'],
    links: []
  },

  saudi: {
    icon: 'fa-globe', tags: ['Freelance', 'Web'],
    title: 'Custom Web Applications – Saudi Arabia',
    sub: 'Freelance (remote) · Nov 2024 – 2025',
    overview: 'Custom ASP.NET Core web applications for Saudi-based clients with automated reporting, secure APIs and managed hosting.',
    problem: 'Clients needed tailored business applications with printable reports and reliable hosting.',
    solution: 'Bespoke ASP.NET Core apps with FastReport PDF reports, MySQL data layers and IIS-hosted deployment.',
    role: 'Sole developer: development, API design, report generation, database and server configuration.',
    features: ['Applications tailored to each client\'s requirements', 'Secure REST APIs, tested with Postman', 'PDF report generators (FastReport Community Edition)', 'IIS configuration and management', 'MySQL schema design and query optimisation'],
    stack: ['ASP.NET Core', 'C#', 'MySQL', 'FastReport', 'IIS', 'Postman'],
    links: [],
    note: 'Client work, so names and links are not published.'
  },

  jobportal: {
    icon: 'fa-briefcase', tags: ['Enterprise', 'Web', 'Internship'],
    title: 'Job Portal Application',
    sub: 'Aitrich Technologies Pvt Ltd · ASP.NET Core · Angular',
    overview: 'A full-stack job portal built as my main internship project, taken through the full SDLC with Agile practices.',
    problem: 'Employers and job seekers need a simple place to list, find and manage applications.',
    solution: 'Dashboards for employers and job seekers with search, filtering and role-based access.',
    role: 'Contributed end-to-end: requirements, design, development, testing and deployment, with sprints and code reviews.',
    features: ['Job listing, search, filtering and application management', 'Employer and job-seeker dashboards', 'ASP.NET Core and SQL Server backend', 'Angular and Bootstrap frontend', 'Agile: stand-ups, sprint planning, code reviews on Git'],
    stack: ['ASP.NET Core', 'Angular', 'C#', 'SQL Server', 'Bootstrap', 'Git'],
    links: []
  },

  astralution: {
    icon: 'fa-satellite-dish', tags: ['Web', 'Freelance'],
    title: 'Astralution – AI Drone Technology Website',
    sub: 'Freelance · 2022 – 2023 · HTML · CSS · JavaScript',
    overview: 'A responsive corporate website for Astralution presenting AI-powered drone services: technical inspection, crisis management and precision agriculture.',
    problem: 'The company needed a credible, fast web presence explaining specialised services.',
    solution: 'A responsive, accessible site with dedicated service content and smooth interactions.',
    role: 'Designed and built the website as a freelance frontend developer.',
    features: ['Responsive across devices', 'Hero section and animations', 'Dedicated service content', 'Optimised for accessibility and speed', 'Cross-browser compatible'],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive design'],
    links: [{ label: 'View live site', href: 'https://samadpr.github.io/astralution-website/' }]
  }
};

/* AI pipeline: status "impl" = shipped in a real project, "learn" = studied / exploring */
window.AI_STEPS = [
  { title: 'User Request', text: 'Everything starts with a natural-language question or task from a user, such as "Which assets are due for maintenance at the Kochi branch?".',
    items: [['impl', 'Conversational interface in the product UI'], ['impl', 'Chat session and conversation history tracking']] },
  { title: 'AI Agent', text: 'An LLM, backed by system instructions and context, interprets the request. Context management decides what the model sees: history, user role and retrieved data.',
    items: [['impl', 'LLM integration through Azure AI Foundry'], ['impl', 'Prompt engineering for role-aware outputs'], ['impl', 'Context management across a chat session']] },
  { title: 'Reasoning & Planning', text: 'For multi-step tasks an agent breaks the goal into steps and decides the order of actions. This is the area I am actively studying.',
    items: [['learn', 'Agent reasoning and planning patterns'], ['learn', 'Multi-agent orchestration (Google × Kaggle AI Agents Intensive)']] },
  { title: 'Tool Selection', text: 'The agent chooses which function or service to call (search, query, report) and with which parameters. This is function / tool calling.',
    items: [['learn', 'Tool calling and function execution with Gemini-based agents'], ['learn', 'Workflow automation across tools']] },
  { title: 'API / Database / Services', text: 'The chosen action runs against real systems: the application\'s REST APIs, SQL Server data and retrieval indexes, always inside the user\'s permissions.',
    items: [['impl', 'Retrieval-Augmented Generation over live organisational data'], ['impl', 'Semantic / vector-based knowledge retrieval'], ['impl', 'API and database access through ASP.NET Core backend'], ['impl', 'Permission-aware access to data']] },
  { title: 'Result', text: 'The answer comes back grounded in retrieved data and filtered to what the user is allowed to see, ready to read, act on or export.',
    items: [['impl', 'Contextual, role-aware responses'], ['impl', 'AI-assisted asset information retrieval and reporting help']] }
];

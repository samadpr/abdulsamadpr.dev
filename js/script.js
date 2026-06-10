/* ===== TYPED ANIMATION ===== */
var typed = new Typed(".typing", {
    strings: ["", "Full Stack Developer", "ASP.NET Core Expert", "Flutter Developer", "Azure AI Engineer", "Cloud & DevOps Engineer", "IoT Integration Specialist"],
    typeSpeed: 100, backSpeed: 60, loop: true
});

/* ===== NAVIGATION ===== */
const nav = document.querySelector(".nav");
const navList = nav.querySelectorAll("li");
const totalNavList = navList.length;
const allSection = document.querySelectorAll(".section");
const totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector("a").addEventListener("click", function () {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) addBackSection(j);
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
        if (window.innerWidth < 1200) asideSectionTogglerBtn();
    });
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) allSection[i].classList.remove("back-section");
}
function addBackSection(num) { allSection[num].classList.add("back-section"); }
function showSection(element) {
    for (let i = 0; i < totalSection; i++) allSection[i].classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
    animateSkillBars();
}
function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
            navList[i].querySelector("a").classList.add("active");
    }
}

document.querySelector(".hire-me").addEventListener("click", function () {
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(this.getAttribute("data-section-index"));
});

const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => asideSectionTogglerBtn());

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) allSection[i].classList.toggle("open");
}

/* ===== PROFILE IMAGE (DARK / LIGHT) ===== */
function updateProfileImage() {
    const img = document.getElementById('profile-img');
    if (!img) return;
    const isDark = document.body.classList.contains('dark');
    img.src = isDark ? 'images/MyProfile3.png' : 'images/MyProfile3Light.png';
}
// Run on load
updateProfileImage();

/* ===== SKILL BAR ANIMATION ===== */
function animateSkillBars() {
    document.querySelectorAll('.progress-in').forEach(bar => {
        const target = bar.getAttribute('data-width');
        if (target) setTimeout(() => { bar.style.width = target; }, 200);
    });
}
window.addEventListener('load', animateSkillBars);

/* ===== EXPERIENCE / EDUCATION CAROUSEL ===== */
function createCarousel(trackId, dotsId, prevId, nextId) {
    const track = document.getElementById(trackId);
    const dotsContainer = document.getElementById(dotsId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const cards = track.querySelectorAll('.exp-card');
    let current = 0;

    // Build dots
    cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        current = (index + cards.length) % cards.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) =>
            d.classList.toggle('active', i === current));
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Touch swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });
}

createCarousel('exp-track', 'exp-dots', 'exp-prev', 'exp-next');
createCarousel('edu-track', 'edu-dots', 'edu-prev', 'edu-next');

// Tab switching
document.querySelectorAll('.exp-tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.exp-tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const tab = this.dataset.tab;
        document.getElementById('exp-carousel').style.display = tab === 'experience' ? 'block' : 'none';
        document.getElementById('edu-carousel').style.display = tab === 'education' ? 'block' : 'none';
    });
});

/* ===== SERVICE MODALS ===== */
function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeModal(e, id) {
    if (e.target === document.getElementById(id)) {
        document.getElementById(id).classList.remove('open');
        document.body.style.overflow = '';
    }
}

/* ===== PROJECT DATA ===== */
const projects = {
    sams: {
        icon: 'fa-boxes-stacked', iconColor: '#1854b4',
        title: 'Smart Asset Management System (SAMS)',
        subtitle: 'InfoAsset — Infome Technologies LLC · Kochi, India',
        category: ['Enterprise', 'AI', 'IoT'],
        description: 'Enterprise-level platform designed to manage, monitor, and track organizational assets across multiple departments, locations, and users. Provides centralized control over the complete asset lifecycle from registration to disposal, with an AI-powered enterprise assistant and RFID-based physical tracking.',
        features: [
            'Core backend architecture with scalable RESTful APIs for complete asset lifecycle management',
            'Comprehensive modules for asset registration, assignment, location tracking, and audit history',
            'Secure JWT authentication with multi-role access control (admins, managers, users)',
            'Multi-tenant subscription architecture — multiple organizations on a single scalable platform',
            'SQL Server optimization with stored procedures and indexing, improving performance by ~30%',
            'Angular-based admin dashboards with real-time asset allocation and utilization insights',
            'AI-powered enterprise assistant using Azure AI Foundry and LLMs with RAG capabilities',
            'RFID-based physical asset tracking for automated identification and monitoring',
            'Background services for automated monitoring, notifications, and periodic reporting',
        ],
        impact: [
            'Improved overall asset tracking efficiency by ~40% through automation and centralization',
            'Reduced manual tracking errors and administrative workload significantly',
            'Provided organizations with real-time asset visibility and improved accountability',
        ],
        tech: ['ASP.NET Core Web API', 'Angular', 'SQL Server', 'JWT Auth', 'Azure AI Foundry', 'LLMs', 'RAG', 'RFID Integration', 'Clean Architecture', 'Docker'],
        link: 'https://infoasset.me',
    },
    events: {
        icon: 'fa-qrcode', iconColor: '#fa5b0f',
        title: 'Event Check-In & QR Scanning Application',
        subtitle: 'InfoEventz — Infome Technologies LLC · Deployed in Saudi Arabia',
        category: ['Mobile', 'IoT', 'Flutter'],
        description: 'High-performance Flutter mobile application for large-scale event attendee verification and entry management. Deployed for major Netflix promotional events in Saudi Arabia including the Wednesday Season 2 and Stranger Things Season 5 launches, handling thousands of concurrent attendee entries.',
        features: [
            'Real-time QR code scanning with instant attendee verification and go/no-go visual feedback',
            'Secure backend API integration for participant validation against event registration data',
            'Real-time data synchronization ensuring accurate and up-to-date attendee records',
            'Optimized for handling thousands of attendee entries simultaneously with minimal latency',
            'Fast and responsive UI designed for high-throughput event check-in operations',
        ],
        impact: [
            'Successfully deployed for Netflix promotional events in Saudi Arabia (Wednesday S2, Stranger Things S5)',
            'Handled thousands of simultaneous attendee entries with minimal latency',
            'Significantly reduced queue times with instant QR verification',
        ],
        tech: ['Flutter', 'Dart', 'REST APIs', 'QR Scanning', 'Real-time Sync', 'Firebase'],
        link: null,
    },
    fii: {
        icon: 'fa-id-badge', iconColor: '#37b182',
        title: 'FII Guest Entry & UHF RFID Monitoring System',
        subtitle: 'InfoEventz — FII Global Investment Conference, Riyadh, Saudi Arabia',
        category: ['Enterprise', 'Mobile', 'IoT', 'RFID'],
        description: 'Enterprise event entry management and UHF RFID-based monitoring system deployed during the FII (Future Investment Initiative) Global Investment Conference in Riyadh, Saudi Arabia — one of the world\'s largest investment forums. Managed multi-zone attendee tracking and anti-theft gate monitoring in real time.',
        features: [
            'Flutter-based multi-zone event entry app with QR scanning and real-time check-in/check-out tracking',
            'UHF RFID badge detection using .NET Worker Services for attendee movement monitoring',
            '.NET MAUI Blazor Hybrid monitoring interface for RFID tag tracking and anti-theft gate management',
            'Real-time backend synchronization across multiple RFID gate devices simultaneously',
            'Automated event security through continuous RFID badge detection and alert systems',
            'Multi-zone entry management supporting different access levels and conference areas',
        ],
        impact: [
            'Deployed at the FII Global Investment Conference, Riyadh — a world-class investment forum',
            'Managed large-scale multi-zone attendee tracking with real-time data accuracy',
            'Enhanced event security through automated RFID monitoring and instant alerts',
        ],
        tech: ['Flutter', 'Dart', '.NET Worker Services', 'UHF RFID Integration', '.NET MAUI Blazor Hybrid', 'Real-time APIs', 'ASP.NET Core'],
        link: null,
    },
    rfid: {
        icon: 'fa-book', iconColor: '#1854b4',
        title: 'RFID Anti-Theft Integration — InfoBookz Library System',
        subtitle: 'Aitrich Technologies Pvt Ltd · Thrissur, India',
        category: ['IoT', 'Enterprise', '.NET'],
        description: 'RFID-based security integration developed for library inventory monitoring and automated theft prevention. Enables real-time validation of library materials passing through security gates, with automated visual alerts and alarm mechanisms for unauthorized book movement.',
        features: [
            'Integrated RFID detection devices via secure backend APIs for automated inventory monitoring',
            'Real-time detection of un-checked-out books passing through RFID security gates',
            'Validation logic ensuring only properly issued library materials can pass without alert',
            'Visual alert and alarm mechanisms triggered on unauthorized book movement detection',
            'Improved inventory control and significant reduction in manual security checks',
            'Backend API integration with the existing InfoBookz Library Management System',
        ],
        impact: [
            'Eliminated need for manual book security checks through full automation',
            'Reduced unauthorized book movement with instant automated alarms',
            'Streamlined library inventory tracking and management',
        ],
        tech: ['.NET Core', 'C#', 'RFID Device Integration', 'SQL Server', 'REST APIs', 'ASP.NET Core'],
        link: null,
    },
    invoice: {
        icon: 'fa-file-invoice', iconColor: '#f021b2',
        title: 'Invoice Management & PDF Generation App',
        subtitle: 'InfoPos — Infome Technologies LLC',
        category: ['Mobile', 'Flutter'],
        description: 'Cross-platform Flutter mobile application for creating, managing, and exporting professional invoices. Features automatic VAT calculations, dynamic invoice generation with accurate financial summaries, and PDF document preview and export functionality for seamless business billing and record keeping.',
        features: [
            'Intuitive invoice creation with user-friendly form-based data entry',
            'Automatic VAT calculations and real-time billing summary computation',
            'Dynamic invoice generation ensuring accurate financial data and formatting',
            'PDF document generation with full preview before export or sharing',
            'Easy PDF export and sharing functionality for business record keeping',
            'Support for multiple invoice templates and customization options',
        ],
        tech: ['Flutter', 'Dart', 'PDF Generation Library', 'State Management', 'VAT Calculations'],
        link: null,
    },
    jobportal: {
        icon: 'fa-briefcase', iconColor: '#ec1839',
        title: 'Job Portal Application',
        subtitle: 'Internship Project — Aitrich Technologies Pvt Ltd · Thrissur, India',
        category: ['Enterprise', 'Web', 'ASP.NET Core'],
        description: 'Full-stack job portal application developed as the primary internship project at Aitrich Technologies. Built through the complete Software Development Life Cycle using Agile methodology — from requirements gathering and system design through development, testing, and deployment.',
        features: [
            'Complete job listing, search, filtering, and application management system',
            'Employer and job seeker dashboards with role-based feature access',
            'Backend functionality built with ASP.NET Core, C#, and SQL Server',
            'Responsive frontend developed with Angular and Bootstrap',
            'Full SDLC: requirements, design, development, testing, deployment phases',
            'Agile participation: daily stand-ups, sprint planning, retrospectives, code reviews',
            'Git-based version control and collaborative code review workflows',
        ],
        tech: ['ASP.NET Core', 'Angular', 'C#', 'SQL Server', 'HTML/CSS', 'Bootstrap', 'Git', 'Agile/Scrum'],
        link: null,
    },
    astralution: {
        icon: 'fa-satellite-dish', iconColor: '#37b182',
        title: 'Astralution — AI Drone Technology Website',
        subtitle: 'Freelance Project · 2022–2023',
        category: ['Web', 'Frontend', 'Freelance'],
        description: 'Responsive corporate website designed and developed as a freelance project for Astralution — showcasing AI-powered drone technology and innovative solutions. The site presents services including technical inspection, crisis management, and precision agriculture through a visually engaging, high-performance interface.',
        features: [
            'Fully responsive design with seamless experience across all screen sizes and devices',
            'Visually engaging hero section and animations showcasing AI-powered drone technology',
            'Dedicated service pages: technical inspection, crisis management, precision agriculture',
            'Optimized for accessibility and performance with fast load times',
            'Clean, modern UI/UX design with smooth user interactions and transitions',
            'Cross-browser compatible implementation',
        ],
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX Design', 'Performance Optimization'],
        link: 'https://samadpr.github.io/astralution-website/',
    },
    ai_assistant: {
        icon: 'fa-robot', iconColor: '#fa5b0f',
        title: 'AI Enterprise Assistant (RAG System)',
        subtitle: 'InfoAsset — Infome Technologies LLC · Integrated into SAMS',
        category: ['AI', 'Enterprise', 'Azure'],
        description: 'Azure AI-powered enterprise assistant integrated into the Smart Asset Management System. Leverages Retrieval-Augmented Generation (RAG) to deliver contextual, data-aware responses from live organizational data, with advanced prompt engineering and strict role-based permission controls.',
        features: [
            'Azure AI Foundry and LLM integration for intelligent enterprise assistance',
            'RAG capabilities providing contextual responses from live asset and operational data',
            'Advanced prompt engineering for accurate, role-aware, and organization-specific AI outputs',
            'AI chat session management with full conversation history tracking',
            'Semantic search and vector-based knowledge retrieval across organizational data',
            'Permission-aware AI responses — users access only their authorized data',
            'AI-driven asset information retrieval and automated reporting assistance',
            'Integration with ASP.NET Core APIs and Angular frontend for seamless UX',
        ],
        impact: [
            'Enabled AI-driven decision-making and operational insights for enterprise users',
            'Automated routine data retrieval and reporting tasks significantly',
            'Reduced time-to-insight for asset-related queries through conversational AI',
        ],
        tech: ['Azure AI Foundry', 'Large Language Models (LLMs)', 'RAG', 'Prompt Engineering', 'Vector Search', 'Semantic Search', 'ASP.NET Core', 'Angular'],
        link: null,
    },
    saudi_apps: {
        icon: 'fa-globe', iconColor: '#1854b4',
        title: 'Custom Web Applications — Saudi Arabia',
        subtitle: 'Freelance Projects (Remote) · Nov 2024–2025',
        category: ['Enterprise', 'Web', 'Freelance'],
        description: 'Multiple custom web applications developed for Saudi Arabia-based clients, delivering tailored enterprise solutions. Work included automated report generation, secure REST API backends, IIS server configuration, and MySQL database management.',
        features: [
            'Custom ASP.NET Core web applications tailored to specific Saudi-based business requirements',
            'Secure REST API development for efficient front-end to back-end data transfer',
            'PDF Report Generators using FastReport Community Edition for automated reporting',
            'IIS server configuration and management for high-availability ASP.NET Core hosting',
            'MySQL schema design, query optimization, and large dataset management',
            'API testing and validation with Postman ensuring data integrity across all endpoints',
        ],
        tech: ['ASP.NET Core', 'C#', 'MySQL', 'FastReport', 'IIS', 'REST APIs', 'Postman', 'HTML/CSS'],
        link: null,
    },
};

/* ===== OPEN PROJECT DETAIL ===== */
function openProject(key) {
    const p = projects[key];
    if (!p) return;

    // Icon
    const iconWrap = document.getElementById('pd-icon');
    iconWrap.style.background = p.iconColor;
    iconWrap.innerHTML = `<i class="fa ${p.icon}" style="color:#fff;font-size:24px"></i>`;

    // Categories
    document.getElementById('pd-categories').innerHTML =
        p.category.map(c => `<span class="pd-cat-tag">${c}</span>`).join('');

    // Text
    document.getElementById('pd-title').textContent = p.title;
    document.getElementById('pd-subtitle').textContent = p.subtitle;
    document.getElementById('pd-description').textContent = p.description;

    // Features
    document.getElementById('pd-features').innerHTML =
        p.features.map(f => `<li>${f}</li>`).join('');

    // Impact (optional)
    const impactSection = document.getElementById('pd-impact-section');
    if (p.impact && p.impact.length) {
        document.getElementById('pd-impact').innerHTML =
            p.impact.map(i => `<li>${i}</li>`).join('');
        impactSection.style.display = 'block';
    } else {
        impactSection.style.display = 'none';
    }

    // Tech stack
    document.getElementById('pd-tech').innerHTML =
        p.tech.map(t => `<span class="modal-tech-tag">${t}</span>`).join('');

    // Footer link (optional)
    const footer = document.getElementById('pd-footer');
    if (p.link) {
        footer.innerHTML = `
            <a href="${p.link}" target="_blank" rel="noopener" class="pd-live-btn">
                <i class="fa fa-external-link-alt"></i> View Live Project
            </a>`;
    } else {
        footer.innerHTML = '';
    }

    // Open modal
    document.getElementById('project-detail-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal(e) {
    if (e.target === document.getElementById('project-detail-modal')) {
        document.getElementById('project-detail-modal').classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Close project modal button
document.getElementById('pd-close-btn').addEventListener('click', () => {
    document.getElementById('project-detail-modal').classList.remove('open');
    document.body.style.overflow = '';
});

// Close all modals on Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => {
            m.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
});

/* ===== PORTFOLIO FILTER ===== */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.portfolio-item').forEach(item => {
            const cats = item.dataset.category || '';
            if (filter === 'all' || cats.includes(filter)) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});

/* ===== SUCCESS POPUP HELPERS (called from scriptForm.js) ===== */
let successTimer = null;
function showSuccessPopup() {
    const popup = document.getElementById('success-popup');
    popup.classList.add('show');
    // Auto-hide after 4s
    if (successTimer) clearTimeout(successTimer);
    successTimer = setTimeout(hideSuccessPopup, 4500);
}
function hideSuccessPopup() {
    const popup = document.getElementById('success-popup');
    popup.classList.remove('show');
}
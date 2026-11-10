/* ==========================================================================
   Professional experience: DATA first, then a small renderer.
   SOURCE OF TRUTH: "Abdul Samad - Resume.pdf" (WORK EXPERIENCE, SUMMARY, EDUCATIONAL BACKGROUND).
   Wording follows the resume. Nothing is added from outside it: no extra roles, tools, dates or metrics.
   Each entry:  highlights = shown by default  ·  more = revealed by "View responsibilities"
   ========================================================================== */
window.EXPERIENCE_SUMMARY = 'Full Stack .NET Developer with 2+ years of experience building enterprise web applications, REST APIs, mobile applications, and IoT integrated solutions using ASP.NET Core, Angular, Flutter, SQL Server, and Azure. Experienced in Asset Management Systems, RFID integrations, AI powered enterprise assistants, and large scale event technology platforms. Passionate about designing scalable, secure, and high performance software solutions.';

window.EXPERIENCE = [
  {
    id: 'infome', initials: 'IM', current: true,
    role: '.NET Software Engineer', company: 'Infome Technologies LLC', location: 'Kochi, India',
    period: 'February 2025 – Present', short: 'Feb 2025 – Present',
    summary: 'Full-Stack .NET Developer contributing to enterprise asset management platforms, AI solutions, IoT integrations, and event technology systems. Focused on building scalable backend services, cross-platform applications, and intelligent enterprise solutions.',
    highlights: [
      'Developed secure REST APIs using ASP.NET Core (5/8/9/10) Web API for enterprise asset management, AI solutions, and event management platforms supporting production enterprise applications.',
      'Built and maintained Angular front-end modules integrated with .NET Core REST APIs, delivering responsive, data-driven enterprise dashboards.',
      'Established Clean Architecture, Repository Pattern, Docker, and Azure DevOps CI/CD pipelines, automating deployments for ASP.NET Core Web APIs and Angular production applications.',
      'Developed AI-powered features using Google Gemini AI, LLMs, and RAG to automate information retrieval and improve business productivity.',
      'Integrated RFID devices, QR scanners, IoT hardware, and .NET Worker Services, enabling real-time asset and event tracking.'
    ],
    more: [
      'Worked with SQL Server, PostgreSQL, SQLite and MongoDB for structured and unstructured data storage, querying, and performance optimization across multiple enterprise applications.',
      'Built cross-platform Flutter and .NET applications for Windows and Android, delivering enterprise mobile and desktop solutions.',
      'Implemented JWT and OAuth-based authentication/authorization with role-based access control (RBAC) to secure REST APIs across multiple projects.',
      'Collaborated with cross-functional teams in an Agile/Scrum environment (sprint planning, daily stand-ups, and code reviews) on enterprise architecture, cloud deployment, AI integration, API documentation, debugging, and monitoring across multiple production projects.',
      'Used Git for version control and collaborative development across all projects.'
    ],
    tech: ['ASP.NET Core', 'C#', 'Angular', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Flutter', 'Docker', 'Azure DevOps', 'Google Gemini AI', 'RFID', 'JWT / OAuth']
  },
  {
    id: 'freelance', initials: 'FP', current: false,
    role: 'ASP.NET Core Full Stack Developer', company: 'Freelance Projects', location: 'Saudi Arabia',
    period: 'November 2024 – 2025', short: 'Nov 2024 – 2025',
    summary: 'Delivered custom ASP.NET Core web applications and REST APIs for Saudi Arabian clients, meeting diverse business requirements.',
    highlights: [
      'Designed automated PDF reporting solutions using FastReport Community Edition, reducing manual report generation.',
      'Configured and maintained IIS-hosted ASP.NET Core applications for reliable production deployments.',
      'Designed and optimized MySQL databases to support efficient data storage and query performance.',
      'Tested and validated REST APIs using Postman to ensure functionality, performance, and data integrity before deployment.'
    ],
    more: [],
    tech: ['ASP.NET Core', 'REST APIs', 'FastReport', 'IIS', 'MySQL', 'Postman']
  },
  {
    id: 'aitrich', initials: 'AT', current: false,
    role: 'ASP.NET Core Full Stack Developer', company: 'Aitrich Technologies Pvt Ltd', location: 'Thrissur, India',
    period: 'December 2023 – 2025', short: 'Dec 2023 – 2025',
    summary: 'Developed and contributed to the creation of a Job Portal Application during my intern period at Aitrich Technologies.',
    highlights: [
      'Contributed to the development of an ASP.NET Core Job Portal application using C#, SQL Server, HTML, CSS, and JavaScript.',
      'Participated in Agile sprint planning, daily stand-ups, testing, deployment, and SDLC activities to deliver project milestones.',
      'Implemented backend modules and collaborated on code reviews and Git-based version control to maintain code quality.'
    ],
    more: [],
    tech: ['C#', 'ASP.NET Core', 'SQL Server', 'HTML', 'CSS', 'JavaScript', 'Git', 'Agile']
  }
];

window.EDUCATION = [
  { icon: 'fa-graduation-cap', title: 'Bachelor of Computer Applications (BCA)', org: 'Bharathidasan University (BDU)', period: 'July 2023 – 2026' },
  { icon: 'fa-laptop-code', title: 'ASP.NET Core Full-Stack Web Development', org: 'Aitrich Technologies', period: 'December 2023 – 2025' }
];

(function () {
  'use strict';
  var list = document.getElementById('xp-list');
  var data = window.EXPERIENCE;
  if (!list || !data) return;

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function bullets(arr) { return '<ul class="xp-bullets">' + arr.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'; }

  var intro = document.getElementById('xp-intro-text');
  if (intro) intro.textContent = window.EXPERIENCE_SUMMARY;

  list.innerHTML = data.map(function (e, i) {
    var more = e.more && e.more.length;
    var moreId = 'xp-more-' + e.id;
    return '<li class="xp-item reveal' + (e.current ? ' current' : '') + '" style="--i:' + Math.min(i, 3) + '">' +
      '<div class="xp-rail" aria-hidden="true"><span class="xp-period">' + esc(e.short) + '</span><span class="xp-state">' + (e.current ? 'Current' : 'Previous') + '</span></div>' +
      '<span class="xp-dot" aria-hidden="true"></span>' +
      '<article class="xp-card" aria-labelledby="xp-h-' + e.id + '">' +
        '<header class="xp-head">' +
          '<span class="xp-logo" aria-hidden="true">' + esc(e.initials) + '</span>' +
          '<div class="xp-id"><h3 id="xp-h-' + e.id + '">' + esc(e.role) + '</h3><p class="xp-co">' + esc(e.company) + '</p></div>' +
          '<span class="xp-status' + (e.current ? ' is-current' : '') + '">' + (e.current ? 'Current' : 'Previous') + '</span>' +
        '</header>' +
        '<ul class="xp-meta"><li><i class="fa-regular fa-calendar" aria-hidden="true"></i><span class="sr-only">Period: </span>' + esc(e.period) + '</li>' +
        '<li><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span class="sr-only">Location: </span>' + esc(e.location) + '</li></ul>' +
        '<p class="xp-summary-text">' + esc(e.summary) + '</p>' +
        '<h4 class="xp-label">Key responsibilities</h4>' + bullets(e.highlights) +
        (more ? '<div class="xp-more" id="' + moreId + '"><div class="xp-more-inner"><h4 class="xp-label">Additional responsibilities</h4>' + bullets(e.more) + '</div></div>' : '') +
        '<div class="xp-foot"><ul class="chip-row" aria-label="Technologies">' + e.tech.map(function (t) { return '<li class="chip">' + esc(t) + '</li>'; }).join('') + '</ul>' +
        (more ? '<button class="xp-toggle" type="button" aria-expanded="false" aria-controls="' + moreId + '"><span class="xp-toggle-label">View responsibilities</span><span class="xp-toggle-n">+' + e.more.length + '</span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>' : '') +
        '</div>' +
      '</article></li>';
  }).join('');

  // education & training (from the resume's EDUCATIONAL BACKGROUND)
  var edu = document.getElementById('xp-edu-list');
  if (edu && window.EDUCATION) {
    edu.innerHTML = window.EDUCATION.map(function (d, i) {
      return '<li class="xp-edu-card reveal" style="--i:' + i + '"><span class="xp-edu-ic" aria-hidden="true"><i class="fa-solid ' + d.icon + '"></i></span>' +
        '<div><b>' + esc(d.title) + '</b>' + (d.org ? '<span>' + esc(d.org) + '</span>' : '') + '<small><i class="fa-regular fa-calendar" aria-hidden="true"></i>' + esc(d.period) + '</small></div></li>';
    }).join('');
  }

  // one delegated listener handles every View responsibilities / Show Less button
  list.addEventListener('click', function (ev) {
    var btn = ev.target.closest('.xp-toggle');
    if (!btn) return;
    var open = btn.getAttribute('aria-expanded') !== 'true';
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('open', open);
    btn.querySelector('.xp-toggle-label').textContent = open ? 'Show Less' : 'View responsibilities';
    btn.querySelector('.xp-toggle-n').hidden = open;
  });
})();

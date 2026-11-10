/* ==========================================================================
   Professional experience: DATA first, then a small renderer.
   SOURCE OF TRUTH: "Abdul Samad - Resume.pdf" (WORK EXPERIENCE, SUMMARY, EDUCATIONAL BACKGROUND).
   Wording follows the resume. Nothing is added from outside it: no extra roles, tools, dates or metrics.
   Each entry:  highlights = shown by default  ·  more = revealed by "View responsibilities"
   ========================================================================== */
window.EXPERIENCE_SUMMARY = 'Full Stack .NET developer with more than two years of experience. I build enterprise web applications, REST APIs, mobile apps and IoT solutions with ASP.NET Core, Angular, Flutter, SQL Server and Azure. I have worked on asset management systems, RFID integrations, AI assistants for enterprises and event technology platforms for large events.';

window.EXPERIENCE = [
  {
    id: 'infome', initials: 'IM', current: true,
    role: '.NET Software Engineer', company: 'Infome Technologies LLC', location: 'Kochi, India',
    period: 'February 2025 to Present', short: 'Feb 2025 to Present',
    summary: 'I work on enterprise asset management platforms, AI features, IoT integrations and event technology systems. Most of it is backend services and cross-platform apps.',
    highlights: [
      'Built secure REST APIs with ASP.NET Core Web API (versions 5, 8, 9 and 10) for asset management, AI and event management platforms that run in production.',
      'Built and maintained Angular modules that call the .NET Core REST APIs, including responsive, data-driven enterprise dashboards.',
      'Set up Clean Architecture, the Repository pattern, Docker and Azure DevOps CI/CD pipelines, which automate deployments of the ASP.NET Core APIs and Angular apps.',
      'Built AI features with Google Gemini AI, LLMs and RAG that retrieve information automatically.',
      'Connected RFID devices, QR scanners and other IoT hardware to the backend through .NET Worker Services, so assets and events are tracked in real time.'
    ],
    more: [
      'Stored and queried structured and unstructured data in SQL Server, PostgreSQL, SQLite and MongoDB, and tuned performance across several enterprise applications.',
      'Built Flutter and .NET applications for Windows and Android, covering both mobile and desktop.',
      'Added JWT and OAuth authentication and role-based access control (RBAC) to secure the REST APIs on several projects.',
      'Worked with cross-functional teams in an Agile/Scrum setup: sprint planning, daily stand-ups and code reviews. The work covered enterprise architecture, cloud deployment, AI integration, API documentation, debugging and monitoring on several production projects.',
      'Used Git for version control on all projects.'
    ],
    tech: ['ASP.NET Core', 'C#', 'Angular', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Flutter', 'Docker', 'Azure DevOps', 'Google Gemini AI', 'RFID', 'JWT / OAuth']
  },
  {
    id: 'freelance', initials: 'FP', current: false,
    role: 'ASP.NET Core Full Stack Developer', company: 'Freelance Projects', location: 'Saudi Arabia',
    period: 'November 2024 to 2025', short: 'Nov 2024 to 2025',
    summary: 'Built custom ASP.NET Core web applications and REST APIs for clients in Saudi Arabia.',
    highlights: [
      'Built automated PDF reports with FastReport Community Edition, which cut down on manual report generation.',
      'Configured and maintained the IIS servers that host the ASP.NET Core applications in production.',
      'Designed and optimised MySQL databases for storage and query performance.',
      'Tested the REST APIs in Postman for functionality, performance and data integrity before deployment.'
    ],
    more: [],
    tech: ['ASP.NET Core', 'REST APIs', 'FastReport', 'IIS', 'MySQL', 'Postman']
  },
  {
    id: 'aitrich', initials: 'AT', current: false,
    role: 'ASP.NET Core Full Stack Developer', company: 'Aitrich Technologies Pvt Ltd', location: 'Thrissur, India',
    period: 'December 2023 to 2025', short: 'Dec 2023 to 2025',
    summary: 'I helped build a Job Portal application during my internship at Aitrich Technologies.',
    highlights: [
      'Worked on the ASP.NET Core Job Portal with C#, SQL Server, HTML, CSS and JavaScript.',
      'Took part in sprint planning, daily stand-ups, testing and deployment across the project\'s life cycle.',
      'Wrote backend modules and joined code reviews, using Git for version control.'
    ],
    more: [],
    tech: ['C#', 'ASP.NET Core', 'SQL Server', 'HTML', 'CSS', 'JavaScript', 'Git', 'Agile']
  }
];

window.EDUCATION = [
  { icon: 'fa-graduation-cap', title: 'Bachelor of Computer Applications (BCA)', org: 'Bharathidasan University (BDU)', period: 'July 2023 to 2026' },
  { icon: 'fa-laptop-code', title: 'ASP.NET Core Full-Stack Web Development', org: 'Aitrich Technologies', period: 'December 2023 to 2025' }
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

/* ===== SKIN COLOR MAP ===== */
const skinColors = {
    'color-1': '#ec1839',
    'color-2': '#fa5b0f',
    'color-3': '#37b182',
    'color-4': '#1854b4',
    'color-5': '#f021b2'
};

function setActiveColor(color) {
    document.documentElement.style.setProperty('--skin-color', skinColors[color]);
    localStorage.setItem('samad-skin', color);
}

/* Apply saved skin on load (default: color-4 blue) */
(function () {
    const saved = localStorage.getItem('samad-skin') || 'color-4';
    setActiveColor(saved);
})();

/* ===== SYSTEM THEME DETECTION ===== */
const dayNight = document.querySelector(".day-night");

(function () {
    const saved      = localStorage.getItem('samad-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
        document.body.classList.add('dark');
        // Remove pre-dark class (already handled by inline script, just clean up)
        document.documentElement.classList.remove('pre-dark');
    }
    updateProfileImage();   // set correct image for initial theme
    updateDayNightIcon();
})();

/* ===== STYLE SWITCHER TOGGLE ===== */
document.querySelector(".style-switcher-toggler").addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});
window.addEventListener("scroll", () => {
    document.querySelector(".style-switcher").classList.remove("open");
});

/* ===== DAY / NIGHT TOGGLE ===== */

function updateDayNightIcon() {
    const icon = dayNight.querySelector("i");
    if (document.body.classList.contains('dark')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

dayNight.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('samad-theme', isDark ? 'dark' : 'light');
    updateDayNightIcon();
    updateProfileImage();   // swap profile image on theme change
});

/* updateProfileImage is defined in script.js — called here too to ensure it runs
   after the body class changes. If script.js loads before style-switcher.js,
   the function is already available. */
/* ===========================
   VEDH SONAWANE — APP.JS
   All interactive features
=========================== */

// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// ===========================
// NAV SCROLL
// ===========================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===========================
// SPOTIFY "NOW PLAYING"
// ===========================
const spotifyWidget = document.getElementById('spotifyWidget');
const spotifyFallbacks = [
  '♫ No song right now — but check the vibe',
  '♫ Offline — building something',
  '♫ Currently: in flow state',
  '♫ Listening: brain.exe running',
];

// Spotify requires auth — show a cool fallback + link to their profile
function initSpotify() {
  // Using a public "now playing" badge approach
  // Since direct Spotify API needs OAuth, we'll show a stylized fallback
  const msg = spotifyFallbacks[Math.floor(Math.random() * spotifyFallbacks.length)];
  spotifyWidget.textContent = msg;

  // Try to fetch from a Spotify Now Playing API proxy if available
  // For now, link to a Spotify profile as a placeholder
  spotifyWidget.style.cursor = 'pointer';
  spotifyWidget.title = 'Spotify';
}
initSpotify();

// ===========================
// GITHUB STATS
// ===========================
async function loadGithubStats() {
  const statsEl = document.getElementById('githubStats');
  try {
    const res = await fetch('https://api.github.com/users/vedh-sonawane');
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    statsEl.innerHTML = `
      <span class="stat">${data.public_repos} repos</span>
      <span class="stat">${data.followers} followers</span>
    `;
  } catch {
    statsEl.innerHTML = `<span class="stat">github.com/vedh-sonawane</span>`;
  }
}
loadGithubStats();

// ===========================
// VISITOR COUNTER
// ===========================
function initVisitorCounter() {
  const counterEl = document.getElementById('visitorNum');
  // Use localStorage as a simple incrementing counter simulation
  // In production this would be a Firebase / backend counter
  let count = parseInt(localStorage.getItem('vs_visit_count') || '0');
  const lastVisit = localStorage.getItem('vs_last_visit');
  const now = Date.now();

  // Only increment if more than 1 hour since last visit (unique-ish)
  if (!lastVisit || now - parseInt(lastVisit) > 3600000) {
    count++;
    localStorage.setItem('vs_visit_count', count);
    localStorage.setItem('vs_last_visit', now);
  }

  // Add a realistic base offset
  const displayCount = count + 142;
  counterEl.textContent = `#${displayCount}`;
}
initVisitorCounter();

// ===========================
// FOOTER CLOCK
// ===========================
const footerTime = document.getElementById('footerTime');
function updateClock() {
  const now = new Date();
  const toronto = now.toLocaleTimeString('en-CA', {
    timeZone: 'America/Toronto',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  footerTime.textContent = `Toronto ${toronto}`;
}
updateClock();
setInterval(updateClock, 1000);


// ===========================
// SECRET MODE
// ===========================
const secretBtn = document.getElementById('secretBtn');
const secretOverlay = document.getElementById('secretOverlay');
const secretClose = document.getElementById('secretClose');

secretBtn.addEventListener('click', () => {
  secretOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

secretClose.addEventListener('click', () => {
  secretOverlay.classList.remove('active');
  document.body.style.overflow = '';
});

secretOverlay.addEventListener('click', e => {
  if (e.target === secretOverlay) {
    secretOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Check for ?secret=true URL param
if (new URLSearchParams(window.location.search).get('secret') === 'true') {
  secretOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ===========================
// KONAMI CODE EASTER EGG
// ===========================
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];
const konamiLabels = ['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'];
let konamiIndex = 0;
const konamiDisplay = document.getElementById('konamiDisplay');
const konamiReward = document.getElementById('konamiReward');

document.addEventListener('keydown', e => {
  const key = e.key;
  if (key === konamiSequence[konamiIndex]) {
    const spans = konamiDisplay.querySelectorAll('span');
    spans[konamiIndex].classList.add('lit');
    konamiIndex++;
    if (konamiIndex === konamiSequence.length) {
      konamiReward.style.display = 'block';
      showToast('🎉 Achievement Unlocked: Nerd Mode');
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
    konamiDisplay.querySelectorAll('span').forEach(s => s.classList.remove('lit'));
  }
});

// ===========================
// SCROLL ANIMATIONS
// ===========================
const fadeEls = document.querySelectorAll(
  '.links-section, .link-card, .projects-section, .project-item, .contact-section'
);

fadeEls.forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

// ===========================
// TOAST UTILITY
// ===========================
let toastTimer;
const toast = document.getElementById('toast');

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===========================
// SECTION LABEL TYPEWRITER
// ===========================
function typewrite(el, text, delay = 0) {
  setTimeout(() => {
    let i = 0;
    el.textContent = '';
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 40);
  }, delay);
}

// Run typewriter on section labels when they enter view
const sectionLabels = document.querySelectorAll('.section-label');
const labelObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const original = el.textContent;
      typewrite(el, original);
      labelObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

sectionLabels.forEach(el => labelObserver.observe(el));

// ===========================
// KEYBOARD SHORTCUT: ?
// ===========================
document.addEventListener('keydown', e => {
  if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
    showToast('Press ⬡ for secret mode · K = konami code');
  }
  if (e.key === 'Escape') {
    secretOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===========================
// GREETING ON LOAD
// ===========================
window.addEventListener('load', () => {
  const hour = new Date().getHours();
  let greet;
  if (hour < 5) greet = 'still awake? respect.';
  else if (hour < 12) greet = 'good morning.';
  else if (hour < 17) greet = 'good afternoon.';
  else if (hour < 21) greet = 'good evening.';
  else greet = 'burning the midnight oil?';
  setTimeout(() => showToast(greet), 1200);
});

// ===========================
// CONTACT GRID BENDING EFFECT
// ===========================
const contactSection = document.getElementById('contact');
const gridContainer = document.getElementById('contactGridContainer');

if (contactSection && gridContainer) {
  contactSection.addEventListener('mousemove', (e) => {
    const rect = gridContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update CSS variables for the lens bulge effect
    gridContainer.style.setProperty('--mouse-x', `${x}px`);
    gridContainer.style.setProperty('--mouse-y', `${y}px`);
  });
}

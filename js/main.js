/* ============================================================
   BENDER EXPORTS — MAIN JAVASCRIPT
   js/main.js

   Sections:
   1.  Navigation (scroll effect + mobile menu)
   2.  Hero Slideshow
   3.  Scroll Reveal Animation
   4.  Smooth Scroll
   5.  Contact Form → sends to benderexportsltd@gmail.com
   ============================================================ */


/* ── 1. NAVIGATION ─────────────────────────────────────── */

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 50);
}, { passive: true });

const menuBtn    = document.getElementById('menuBtn');
const mobOverlay = document.getElementById('mobOverlay');

menuBtn.addEventListener('click', () => {
  mobOverlay.classList.toggle('show');
});

mobOverlay.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobOverlay.classList.remove('show'));
});


/* ── 2. HERO SLIDESHOW ─────────────────────────────────── */

const slides = document.querySelectorAll('.hslide');
const dots   = document.querySelectorAll('.hdot');
let current  = 0;
let timer;

function goToSlide(index) {
  slides[current].classList.remove('on');
  dots[current].classList.remove('on');
  current = index;
  slides[current].classList.add('on');
  dots[current].classList.add('on');
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(timer);
    goToSlide(i);
    timer = setInterval(() => goToSlide((current + 1) % slides.length), 5500);
  });
});

timer = setInterval(() => goToSlide((current + 1) % slides.length), 5500);


/* ── 3. SCROLL REVEAL ANIMATION ─────────────────────────── */

const revealEls = document.querySelectorAll('.rv');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));


/* ── 4. SMOOTH SCROLL ──────────────────────────────────── */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 70,
        behavior: 'smooth'
      });
    }
  });
});


/* ── 5. CONTACT FORM ───────────────────────────────────────
   All enquiries are sent to: benderexportsltd@gmail.com
   Powered by Formspree (free, no backend needed)

   ┌─────────────────────────────────────────────────────┐
   │  ONE-TIME SETUP — DO THIS ONCE (takes 2 minutes)   │
   ├─────────────────────────────────────────────────────┤
   │  1. Open https://formspree.io in your browser       │
   │  2. Click "Get Started Free"                        │
   │  3. Sign up with benderexportsltd@gmail.com          │
   │  4. Click "+ New Form"                              │
   │  5. Name it: "Bender Exports Enquiries"             │
   │  6. Copy your Form ID (e.g.  xpwzabcd )            │
   │  7. Paste it below replacing YOUR_FORM_ID_HERE      │
   │                                                     │
   │  Example:                                           │
   │    const FORMSPREE_ID = 'xpwzabcd';                │
   │                                                     │
   │  Done! Every form submission will arrive in         │
   │  benderexportsltd@gmail.com with all details.        │
   └─────────────────────────────────────────────────────┘
   ─────────────────────────────────────────────────────── */

const FORMSPREE_ID = 'xeepggdj'; /* <── PASTE YOUR ID HERE */
const RECIPIENT    = 'benderexportsltd@gmail.com';
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

const submitBtn = document.getElementById('submitBtn');

if (submitBtn) {
  submitBtn.addEventListener('click', async function () {

    /* Collect all form field values */
    const firstName = document.getElementById('fn').value.trim();
    const lastName  = document.getElementById('ln').value.trim();
    const email     = document.getElementById('em').value.trim();
    const company   = document.getElementById('co').value.trim();
    const country   = document.getElementById('ct').value.trim();
    const role      = document.getElementById('role').value;
    const interest  = document.getElementById('interest').value;
    const message   = document.getElementById('msg').value.trim();

    /* Validation */
    if (!firstName || !email || !country) {
      showError('Please fill in your first name, email address, and country.');
      return;
    }
    if (!isValidEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    setBtn('loading');

    /* ── If Formspree ID not yet set → open Gmail as fallback ── */
    if (FORMSPREE_ID === 'YOUR_FORM_ID_HERE') {
      const sub  = encodeURIComponent(`Bender Exports Enquiry — ${interest || 'General'} — ${firstName} ${lastName}`);
      const body = encodeURIComponent(buildBody({ firstName, lastName, email, company, country, role, interest, message }));
      window.open(`https://mail.google.com/mail/?view=cm&to=${RECIPIENT}&su=${sub}&body=${body}`, '_blank');
      setBtn('success');
      setTimeout(() => setBtn('idle'), 5000);
      return;
    }

    /* ── Send via Formspree ── */
    try {
      const res = await fetch(FORMSPREE_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject:       `[Bender Exports] ${interest || 'Enquiry'} from ${firstName} ${lastName} (${country})`,
          _replyto:       email,
          'First Name':   firstName,
          'Last Name':    lastName,
          'Email':        email,
          'Company':      company   || '—',
          'Country':      country,
          'Role':         role      || '—',
          'Interested In': interest || '—',
          'Message':      message   || '(no message)',
        })
      });

      if (res.ok) {
        setBtn('success');
        clearForm();
        setTimeout(() => setBtn('idle'), 6000);
      } else {
        const data = await res.json().catch(() => ({}));
        const msg  = data?.errors?.map(e => e.message).join(', ')
                     || 'Something went wrong. Please email us directly.';
        setBtn('error');
        showError(msg);
        setTimeout(() => setBtn('idle'), 5000);
      }

    } catch (err) {
      /* Network failure → fallback to mailto */
      setBtn('error');
      showError('Connection error. Opening your email app as a backup…');
      setTimeout(() => {
        const sub  = encodeURIComponent(`Bender Exports Enquiry — ${firstName} ${lastName}`);
        const body = encodeURIComponent(buildBody({ firstName, lastName, email, company, country, role, interest, message }));
        window.location.href = `mailto:${RECIPIENT}?subject=${sub}&body=${body}`;
      }, 1800);
      setTimeout(() => setBtn('idle'), 5000);
    }

  });
}


/* ── HELPERS ─────────────────────────────────────────────── */

function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function setBtn(state) {
  const b = document.getElementById('submitBtn');
  if (!b) return;
  const map = {
    idle:    { label: 'Send Enquiry →',         bg: '',         disabled: false },
    loading: { label: 'Sending…',               bg: '#4a2e10',  disabled: true  },
    success: { label: 'Enquiry Sent ✓',         bg: '#2d5a27',  disabled: false },
    error:   { label: 'Failed — Try Again →',   bg: '#8b0000',  disabled: false },
  };
  const s = map[state] || map.idle;
  b.textContent       = s.label;
  b.style.background  = s.bg;
  b.disabled          = s.disabled;
}

function clearForm() {
  ['fn','ln','em','co','ct','msg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['role','interest'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.selectedIndex = 0;
  });
}

function showError(msg) {
  const old = document.getElementById('_form_err');
  if (old) old.remove();
  const el = document.createElement('p');
  el.id = '_form_err';
  el.textContent = msg;
  Object.assign(el.style, {
    color: '#c0392b', fontSize: '0.8rem', fontWeight: '500',
    marginTop: '10px', textAlign: 'center', padding: '8px 14px',
    background: '#fdf0ee', border: '1px solid #e8b4b0',
    fontFamily: 'Poppins, sans-serif'
  });
  const b = document.getElementById('submitBtn');
  if (b) b.insertAdjacentElement('afterend', el);
  setTimeout(() => el.remove(), 6000);
}

function buildBody({ firstName, lastName, email, company, country, role, interest, message }) {
  return [
    'BENDER EXPORTS — WEBSITE ENQUIRY',
    '==================================',
    `Name:      ${firstName} ${lastName}`,
    `Email:     ${email}`,
    `Company:   ${company || '—'}`,
    `Country:   ${country}`,
    `Role:      ${role || '—'}`,
    `Interest:  ${interest || '—'}`,
    '',
    'Message:',
    message || '(none)',
    '',
    '==================================',
    'Sent from bender-exports.com',
    `Reply to: ${email}`
  ].join('\n');
}

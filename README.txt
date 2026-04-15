╔══════════════════════════════════════════════════════════════╗
║         BENDER EXPORTS — WEBSITE PROJECT                     ║
║         Professional Coffee Exporter Website                 ║
║         Contact email: benderexportsltd@gmail.com            ║
╚══════════════════════════════════════════════════════════════╝

HOW TO OPEN THE WEBSITE
────────────────────────────────────────────────────────────────
Double-click index.html to open in your browser.
Or right-click → Open With → Chrome / Firefox / Edge.


PROJECT STRUCTURE
────────────────────────────────────────────────────────────────
bender-exports/
│
├── index.html                ← MAIN PAGE
├── README.txt                ← THIS FILE
│
├── css/
│   ├── theme.css             ← COLORS, FONTS, SPACING
│   └── main.css              ← ALL SECTION LAYOUTS
│
├── js/
│   └── main.js               ← INTERACTIONS + FORM (edit here for email)
│
└── assets/
    └── images/
        ├── IMAGES_README.txt ← Full list of image filenames
        ├── logo.png
        ├── hero-1.jpg  …  hero-4.jpg
        ├── about.jpg
        ├── station-musaza.jpg
        ├── station-nyungwe.jpg
        ├── station-nyarubaka.jpg
        ├── photostrip-1/2/3.jpg
        ├── process-1/2/3.jpg
        ├── impact-main.jpg
        ├── impact-accent.jpg
        └── og-image.jpg


════════════════════════════════════════════════════════════════
STEP 1 — ADD YOUR IMAGES
════════════════════════════════════════════════════════════════
Copy your photos into: assets/images/
Rename them to match the filenames in IMAGES_README.txt exactly.

Recommended sizes:
  Hero slides    → 1920 x 1080px
  About photo    → 900 x 1100px (portrait)
  Station photos → 1200 x 800px (landscape)
  Process photos → 800 x 500px
  Logo           → 300px wide, transparent PNG


════════════════════════════════════════════════════════════════
STEP 2 — CHANGE COLORS
════════════════════════════════════════════════════════════════
Open: css/theme.css

All colors are at the top as CSS variables. Change them to
update the entire site at once.

Main colors to know:
  --gold          #c49a35   → Brand accent (buttons, highlights)
  --gold-light    #dbb655   → Hover states, light-bg headings
  --dark          #160e06   → Dark section backgrounds
  --cream         #f8f3eb   → Light section backgrounds


════════════════════════════════════════════════════════════════
STEP 3 — EDIT TEXT CONTENT
════════════════════════════════════════════════════════════════
Open: index.html

Every editable section is marked with a ✏️ comment.
Search for "✏️" to jump to each editable area quickly.

Key things to update:
  • Hero headline and subtitle
  • About section paragraphs
  • Founder names and titles
  • Station descriptions and metrics
  • Stats bar numbers
  • Marquee ticker text


════════════════════════════════════════════════════════════════
STEP 4 — ACTIVATE THE CONTACT FORM
        (sends emails to benderexportsltd@gmail.com)
════════════════════════════════════════════════════════════════

Service: Formspree (free, no coding, no backend)
All enquiries go directly to: benderexportsltd@gmail.com

DO THIS ONCE — TAKES 2 MINUTES:
────────────────────────────────

  1. Open:  https://formspree.io

  2. Click "Get Started Free"

  3. Sign up with:  benderexportsltd@gmail.com

  4. Click "+ New Form"
     Name:  Bender Exports Enquiries
     Email: benderexportsltd@gmail.com

  5. Copy your Form ID
     It looks like:  xpwzabcd

  6. Open:  js/main.js

  7. Find this line (near line 85):

       const FORMSPREE_ID = 'YOUR_FORM_ID_HERE';

     Change it to your real ID:

       const FORMSPREE_ID = 'xpwzabcd';

  8. Save main.js. DONE.

From now on, every form submission on the website sends an email
to benderexportsltd@gmail.com containing:
  - Full name
  - Email address (reply directly from Gmail)
  - Company
  - Country
  - Role (Roaster / Importer / Distributor / etc.)
  - What they're interested in
  - Their message

IMPORTANT NOTE:
Until you complete this setup, the form still works as a fallback —
it will open Gmail with the message pre-filled so you won't miss
any enquiry while setting up Formspree.

Formspree free plan: 50 submissions/month.
If you need more, upgrade at formspree.io (paid plans start cheap).


════════════════════════════════════════════════════════════════
STEP 5 — PUT THE WEBSITE ONLINE (DEPLOY)
════════════════════════════════════════════════════════════════
Upload the entire bender-exports/ folder to a web host.

FREE OPTIONS (recommended):
  Netlify   → netlify.com   → Drag & drop the folder. Done. Free.
  Vercel    → vercel.com    → Same as Netlify. Free.

PAID (if you want hosting + custom domain together):
  Hostinger → hostinger.com → ~$3/month. Good value.
  Namecheap → namecheap.com → ~$2/month.

After going live, update these two lines in index.html:
  <link rel="canonical" href="https://YOUR-DOMAIN.com/"/>
  <meta property="og:url" content="https://YOUR-DOMAIN.com/"/>


════════════════════════════════════════════════════════════════
CONTACT DETAILS IN THE WEBSITE
════════════════════════════════════════════════════════════════
Email shown on site: benderexportsltd@gmail.com
Email shown in footer: benderexportsltd@gmail.com
Form sends to: benderexportsltd@gmail.com

To update the phone number, open index.html and search for:
  +250 000 000 000
Replace with the real number.


════════════════════════════════════════════════════════════════
NEED HELP?
════════════════════════════════════════════════════════════════
Open Claude (claude.ai) and paste this:

  "I'm editing the Bender Exports website project.
   Help me: [your question here]"

Examples:
  "Help me add a 4th washing station to the website"
  "How do I change the gold color to green?"
  "How do I make the text bigger on mobile?"
  "The Formspree form isn't sending — help me fix it"
  "How do I put the website online for free?"

────────────────────────────────────────────────────────────────
Built with Claude by Anthropic · March 2026
benderexportsltd@gmail.com

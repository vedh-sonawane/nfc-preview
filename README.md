# Vedh Sonawane — NFC Smart Card Hub

A complete personal profile page designed for NFC card interaction.

## Setup

1. Drop your `pfp.jpg` into the root folder (same level as `index.html`)
2. Drop your resume PDF as `Vedh_Sonawane_Resume.pdf` into the root folder
3. Deploy to Vercel, Netlify, or GitHub Pages
4. Store your URL on the NFC tag

## Files

```
/
├── index.html          ← Main page (tap → this)
├── recruiter.html      ← Recruiter-mode page
├── css/
│   └── style.css
├── js/
│   └── app.js
└── pfp.jpg             ← ADD THIS (your photo)
    Vedh_Sonawane_Resume.pdf  ← ADD THIS
```

## Features

- ✅ Custom cursor + noise texture
- ✅ Spotify "Now Playing" widget (eyebrow)
- ✅ GitHub stats auto-fetched from API
- ✅ Visitor counter (localStorage + base offset)
- ✅ Secret mode (click ⬡ in nav, or add `?secret=true` to URL)
- ✅ Konami code easter egg inside secret mode
- ✅ Save Contact (.vcf vCard download)
- ✅ Copy email to clipboard
- ✅ Live Toronto clock in footer
- ✅ Time-based greeting toast on load
- ✅ Scroll-triggered fade-up animations
- ✅ Section label typewriter effect
- ✅ Recruiter mode page (`/recruiter.html`)

## Multi-Mode NFC

Before any event/meeting, update your NFC tag URL:
- Friends → `yoursite.com/` (main page)
- Recruiters → `yoursite.com/recruiter.html`
- Secret → `yoursite.com/?secret=true`

## Spotify (optional upgrade)

To show real "Now Playing" data:
1. Create a Vercel serverless function with Spotify OAuth
2. Point `spotifyWidget` to your `/api/now-playing` endpoint
3. See: github.com/leerob/leerob.io for reference implementation

# TaffyDevs Website — Setup Guide

## 📁 Folder Structure

```
taffydevs/
├── index.html                   ← Homepage
├── css/
│   └── style.css                ← All styles (single file)
├── js/
│   └── main.js                  ← All JavaScript (single file)
├── pages/
│   ├── about.html               ← About / Founder page
│   ├── services.html            ← Services & Pricing
│   ├── portfolio.html           ← Portfolio (websites, design, testimonials)
│   ├── blog.html                ← Blog articles & YouTube videos
│   ├── article.html             ← Full blog article (dynamic, URL-param driven)
│   ├── contact.html             ← Contact form & details
│   └── booking.html             ← 6-step project booking form
└── assets/
    ├── cv.pdf                   ← Your CV (place here)
    └── img/
        ├── logos/               ← Site logos (see below)
        ├── founder/             ← Founder photo
        ├── clients/             ← Client/brand logos (logo strip)
        ├── portfolio/
        │   ├── websites/        ← Website project screenshots
        │   ├── design/          ← Design & logo project images
        │   └── testimonials/    ← Client testimonial avatars
        └── blog/                ← Blog article cover images & YouTube thumbnails
```

---

## 🖼️ Image Placement Guide

### 1. Logos (assets/img/logos/)

| File | Used for | Notes |
|------|----------|-------|
| `logo-blue.png` | Navbar (English), loader (EN) | Transparent bg, min 300×300px |
| `logo-red.png` | Navbar (Polish), loader (PL) | Transparent bg, min 300×300px |
| `logo-dark.png` | Footer (both languages) | Light/white version for dark bg |

> **Tip:** All three logos are already in your uploads. Rename them:
> - Image 1 (blue) → `logo-blue.png`
> - Image 2 (red) → `logo-red.png`
> - Image 3 (dark/transparent) → `logo-dark.png`

---

### 2. Founder Photo (assets/img/founder/)

| File | Used on | Recommended size |
|------|---------|-----------------|
| `daniel.jpg` | About page, blog article author box | 500×600px portrait, JPG/PNG |

---

### 3. Client Logo Strip (assets/img/clients/)

Place client/brand logos here. The strip auto-scrolls with fallback text if images are missing.

| File | Brand |
|------|-------|
| `juam.png` | JUAM Corporate Services |
| `phenomenal-wear.png` | Phenomenal Wear |
| `rr-catering.png` | R&R Catering |
| `buildhive.png` | BuildHive |
| `wnc.png` | Women's Network Conference |
| `client6.png` | Your next client |
| `client7.png` | Your next client |

> **Format:** PNG with transparent background, max height 48px display. Original files can be larger.
> **To add more clients:** Copy a client strip item block in `index.html` and duplicate it (both the original and the duplicate sets for seamless looping).

---

### 4. Portfolio — Websites (assets/img/portfolio/websites/)

Screenshots of your live websites. Shown as card thumbnails.

| File | Project |
|------|---------|
| `juam.jpg` | JUAM Corporate Services |
| `phenomenal-wear.jpg` | Phenomenal Wear |
| `rr-catering.jpg` | R&R Catering |
| `buildhive.jpg` | BuildHive |
| `wnc.jpg` | Women's Network Conference |

> **How to take screenshots:** Use [GoFullPage](https://gofullpage.com/) Chrome extension for full-page screenshots. Recommended: 1200×800px, JPG quality 85%.

---

### 5. Portfolio — Design & Logo (assets/img/portfolio/design/)

Images showing your graphic design and branding work.

| File | Project |
|------|---------|
| `taffydevs-brand.jpg` | TaffyDevs Brand Identity |
| `juam-identity.jpg` | JUAM Corporate Identity |
| `rr-catering-brand.jpg` | R&R Catering Branding |
| `phenomenal-wear-brand.jpg` | Phenomenal Wear Branding |
| `buildhive-identity.jpg` | BuildHive Visual Identity |
| `wnc-branding.jpg` | WNC Event Branding |

> **Recommended size:** 800×600px or similar 4:3 / 16:9 ratio, JPG quality 85%.

---

### 6. Portfolio — Testimonials (assets/img/portfolio/testimonials/)

Client headshot/avatar photos for testimonial cards.

| File | Person |
|------|--------|
| `anna-k.jpg` | Anna Kowalska (JUAM) |
| `james-r.jpg` | James Richardson (R&R Catering) |
| `tendai-m.jpg` | Tendai Moyo (BuildHive) |

> **Format:** 200×200px square, JPG. Falls back to a user icon SVG if missing.

---

### 7. Blog Article Images (assets/img/blog/)

Cover/hero images for blog articles. Also YouTube video thumbnails.

**Article covers:**
| File | Article |
|------|---------|
| `website-2025.jpg` | Why Your Business Needs a Website in 2025 |
| `conversion-mistakes.jpg` | 5 Mistakes Killing Your Conversion |
| `africa-europe-digital.jpg` | Digital Transformation for African Business |
| `seo-small-business.jpg` | SEO for Small Businesses |
| `brand-colours-fonts.jpg` | How to Choose Colours and Fonts |
| `ecommerce-guide.jpg` | How to Build an Online Shop |
| `zimbabwe-poland-markets.jpg` | Zimbabwe and Poland: Two Markets |

**YouTube thumbnails:**
| File | Video |
|------|-------|
| `video-thumb-1.jpg` | How to Build a Website for a Small Business |
| `video-thumb-2.jpg` | Web Design for Businesses in Poland |
| `video-thumb-3.jpg` | BuildHive Case Study |
| `video-thumb-4.jpg` | 5 Things You Should NEVER Do |
| `video-thumb-5.jpg` | TaffyDevs Agency Story |
| `video-thumb-6.jpg` | How to Choose a Web Designer |

> **Recommended size:** 800×450px (16:9), JPG. All images have graceful fallback placeholders if missing.

---

## 🚀 Deployment

### Netlify (Recommended)
1. Drag and drop the entire `taffydevs/` folder onto [netlify.com/drop](https://app.netlify.com/drop)
2. Your site is live instantly with a `.netlify.app` URL
3. Connect your custom domain in Netlify settings

### GitHub Pages
1. Create a new GitHub repository
2. Upload all files maintaining the folder structure
3. Go to Settings → Pages → Source: main branch → / (root)
4. Your site is live at `https://yourusername.github.io/repository-name/`

### Custom Hosting (cPanel, etc.)
Upload all files to `public_html/` maintaining the exact folder structure.

---

## 🌐 Language System

- **Default language:** English (blue theme)
- **Toggle:** PL/EN switch in the navbar and footer
- **Persistence:** Language choice is saved to `localStorage` and remembered across pages
- **Theme:** English = Blue | Polish = Red — colours change automatically on toggle

---

## 📝 Adding New Blog Articles

1. Open `pages/article.html`
2. Find the `ARTICLES` JavaScript object
3. Add a new entry following this pattern:
```javascript
'your-article-id': {
  en: {
    title: 'Your Article Title',
    cat: 'Category',
    date: '01 Jan 2026',
    img: '../assets/img/blog/your-image.jpg',
    imgAlt: 'Image description',
    content: `<p>Your HTML content here...</p>`
  },
  pl: {
    title: 'Tytuł po polsku',
    cat: 'Kategoria',
    date: '01 Jan 2026',
    img: '../assets/img/blog/your-image.jpg',
    imgAlt: 'Opis obrazu',
    content: `<p>Treść po polsku...</p>`
  }
}
```

4. Open `pages/blog.html` and add a new `<a href="article.html?id=your-article-id">` card in the articles grid
5. Add the cover image to `assets/img/blog/your-image.jpg`

---

## 🎨 Customisation

### Changing colours
Edit the CSS variables at the top of `css/style.css`:
- Blue theme (EN): under `:root { }`
- Red theme (PL): under `html.lang-pl { }`

### Updating pricing
Find the pricing cards in `pages/services.html` and update the `data-pln`, `data-eur`, `data-usd` attributes on `.pricing-price` elements.

### Adding portfolio items
In `pages/portfolio.html`, copy an existing `<article class="portfolio-card">` block and update the image src, name, description and link.

### Adding client logos to the strip
In `index.html`, find `<!-- CLIENT LOGO STRIP -->` and add items to BOTH the original and duplicate sets (required for seamless scrolling).

---

## 📞 Contact Details (update these in all pages)

- **Phone:** +48 600 762 551
- **Email:** taffydevs@gmail.com
- **YouTube:** https://www.youtube.com/@Taffydevs
- **GitHub:** https://github.com/TaffyDevs11
- **LinkedIn:** https://www.linkedin.com/in/tafadzwa-kamanga-3255a5321
- **X/Twitter:** https://x.com/TaffyDevs

---

## ✅ Pre-launch Checklist

- [ ] Place `logo-blue.png`, `logo-red.png`, `logo-dark.png` in `assets/img/logos/`
- [ ] Place `daniel.jpg` in `assets/img/founder/`
- [ ] Place client logos in `assets/img/clients/`
- [ ] Place portfolio screenshots in `assets/img/portfolio/websites/`
- [ ] Place design portfolio images in `assets/img/portfolio/design/`
- [ ] Place testimonial avatars in `assets/img/portfolio/testimonials/`
- [ ] Place blog article covers in `assets/img/blog/`
- [ ] Place `cv.pdf` in `assets/`
- [ ] Update Stripe payment links (search for `#stripe-payment` in booking.html)
- [ ] Test all pages on mobile and desktop
- [ ] Test language toggle (EN/PL) on all pages
- [ ] Submit sitemap to Google Search Console after deployment

---

*Built by TaffyDevs — Solving Everyday Problems with IT Solutions*

# ⚡ Pankaj Sikheriya — Personal Portfolio

A sleek, responsive, and high-performance personal portfolio website built with modern web aesthetics (pitch-black cyberpunk theme, electric cyan accents, interactive particle canvas, and glassmorphism).

🔗 **Live Demo:** [https://pankaj200801.github.io/portfolio/](https://pankaj200801.github.io/portfolio/)

---

## ✨ Key Features

- **Linear / Aceternity Spotlight Cards**: Radial cursor illumination effect following exact mouse coordinates across all cards.
- **Interactive Developer CLI Terminal**: Embedded terminal window with commands (`help`, `bio`, `skills`, `projects`, `contact`, `github`, `date`, `clear`) simulating a real developer environment.
- **About Bento Grid**: High-density 2026 bento layout featuring live India Standard Time (IST) digital clock, college education snapshot, and quick-copy email badge.
- **Category-Filtered Skills**: Real-time filtering across Frontend, Backend, Tools, and Core CS with animated proficiency meters.
- **Live GitHub API Stats**: Real-time profile card fetching live repository counts, followers, and bio directly from the GitHub REST API (`@Pankaj200801`).
- **Dynamic Data Layer (`info.json`)**: All personal details, bio, education, skills, projects, and contact info centralized in `info.json` with cache-busting instant updates.
- **Ambient Cyber Particle Canvas**: HTML5 Canvas particle network that drifts and repels dynamically based on cursor proximity.
- **1-Click Copy & Cyber Toast**: Clickable email badge with instant clipboard copy and floating cyberpunk notification.
- **Top Scroll Progress & Back to Top**: Dynamic reading depth indicator and smooth floating back-to-top button.
- **100% Responsive & Offline-Ready**: Flawless experience across mobile, tablet, and ultra-wide screens with full semantic fallback if JavaScript is disabled.

---

## 🛠️ Built With

- **HTML5** — Semantic structure & SEO optimization
- **CSS3** — Custom properties, glassmorphism, flexbox, grid, keyframe animations
- **Vanilla JavaScript** — `info.json` hydration, HTML5 Canvas particles, IntersectionObserver, scroll spy
- **FontAwesome 6** & **Google Fonts (Poppins)**

---

## 📁 Project Structure

```text
portfolio/
├── index.html       # Main HTML markup and semantic fallback
├── style.css        # Complete styling, animations, and theme variables
├── script.js        # Dynamic hydration, particle canvas, and interactions
├── info.json        # Central data store for all portfolio information
├── README.md        # Project documentation
└── assets/
    └── hero.jpg     # 3D isometric developer illustration
```

---

## ⚙️ Customization

To update your information, simply edit [`info.json`](./info.json):

1. **Personal Information**: Update your name, greeting, availability status, resume link, and social profiles.
2. **Education**: Add or modify school/college entries in the `education.items` array.
3. **Skills**: Add or remove skills and their corresponding FontAwesome icons in `skills.items`.
4. **Projects**: Add your own project titles, descriptions, tags, and repository links in `projects.items`.

---

## 🚀 Deployment

This project is 100% static and requires no build tools. To deploy on **GitHub Pages**:

1. Push this repository to GitHub.
2. Go to **Repository Settings** > **Pages**.
3. Under **Branch**, choose `main` and `/ (root)`, then click **Save**.
4. Your website will be live in ~1-2 minutes at:
   `https://<your-username>.github.io/<repo-name>/`

---

## 📬 Contact & Connect

- **LinkedIn**: [Pankaj Sikheriya](https://www.linkedin.com/in/pankaj-sikheriya-373b50434)
- **GitHub**: [@Pankaj200801](https://github.com/Pankaj200801)

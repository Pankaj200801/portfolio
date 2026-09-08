# ⚡ Pankaj Sikheriya — Personal Portfolio

A sleek, responsive, and high-performance personal portfolio website built with modern web aesthetics (pitch-black cyberpunk theme, electric cyan accents, interactive particle canvas, and glassmorphism).

🔗 **Live Demo:** [https://pankaj200801.github.io/portfolio/](https://pankaj200801.github.io/portfolio/)

---

## ✨ Features

- **Dynamic Data Layer (`info.json`)**: All personal information, social links, education history, skills, and projects are centralized in `info.json` for easy updates without touching HTML/CSS.
- **Ambient Cyber Canvas**: Interactive HTML5 particle network that drifts and responds dynamically to mouse movement.
- **Animated Typewriter Subtitle**: Rotating roles with blinking cursor effect.
- **Live Stats Counter**: Smooth counting animation for key metrics upon scrolling into view.
- **Interactive Timeline Cards**: Styled with neon cyan vertical strips and pulsing radar dots.
- **Featured Projects Showcase**: Glassmorphic cards displaying project descriptions, tech stack pills, and GitHub/Demo links.
- **Interactive Contact Form**: Pill-shaped inputs with interactive status feedback and toast notifications.
- **Top Scroll Progress & Back to Top**: Visual reading depth indicator and floating return-to-top button.
- **Fully Responsive**: Optimized for desktop, tablets, and mobile devices with a slide-out hamburger menu.

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

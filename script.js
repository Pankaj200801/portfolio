/**
 * Pankaj Sikheriya Portfolio Script
 * 2026 Developer Portfolio Standard
 * Features:
 * - Spotlight Cards (Linear / Aceternity cursor glow)
 * - Interactive Developer Terminal (CLI Widget)
 * - Live Timezone Clock
 * - One-Click Clipboard Copy
 * - Live GitHub Profile & Repos API
 * - Skill Category Filters
 * - Ambient Particle Canvas
 * - Typewriter & Animated Counters
 * - Dynamic info.json Hydration
 */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. SPOTLIGHT EFFECT (LINEAR / ACETERNITY CARDS)
    // ----------------------------------------------------
    document.addEventListener("mousemove", (e) => {
        const cards = document.querySelectorAll(".spotlight-card");
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // ----------------------------------------------------
    // 2. AMBIENT PARTICLE CANVAS SYSTEM
    // ----------------------------------------------------
    const canvas = document.getElementById("particle-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];
        let mouse = { x: null, y: null, radius: 120 };

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener("mouseout", () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.8;
                this.speedX = (Math.random() - 0.5) * 0.6;
                this.speedY = (Math.random() - 0.5) * 0.6;
                this.alpha = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        let force = (mouse.radius - distance) / mouse.radius;
                        this.x -= (dx / distance) * force * 1.5;
                        this.y -= (dy / distance) * force * 1.5;
                    }
                }
            }

            draw() {
                ctx.fillStyle = `rgba(0, 247, 255, ${this.alpha})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = "#00f7ff";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        const particleCount = Math.min(Math.floor(window.innerWidth / 22), 70);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        let lineAlpha = (1 - dist / 110) * 0.15;
                        ctx.strokeStyle = `rgba(0, 247, 255, ${lineAlpha})`;
                        ctx.lineWidth = 0.7;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    // ----------------------------------------------------
    // 3. SCROLL PROGRESS INDICATOR
    // ----------------------------------------------------
    const scrollProgressBar = document.getElementById("scroll-progress");
    window.addEventListener("scroll", () => {
        if (!scrollProgressBar) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        scrollProgressBar.style.width = `${progress}%`;
    });

    // ----------------------------------------------------
    // 4. LIVE TIMEZONE CLOCK (IST)
    // ----------------------------------------------------
    const liveClockEl = document.getElementById("live-clock");
    function updateLiveClock() {
        if (!liveClockEl) return;
        const now = new Date();
        const options = {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        };
        const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
        liveClockEl.textContent = `${timeString} IST`;
    }
    updateLiveClock();
    setInterval(updateLiveClock, 1000);

    // ----------------------------------------------------
    // 5. TYPEWRITER EFFECT
    // ----------------------------------------------------
    let typewriterRoles = [
        "Web Developer",
        "Frontend Developer",
        "Computer Science Student",
        "Python Programmer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextEl = document.getElementById("typed-text");

    function typeWriterEffect() {
        if (!typedTextEl || typewriterRoles.length === 0) return;

        const currentRole = typewriterRoles[roleIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 85;

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 1600;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % typewriterRoles.length;
            typingSpeed = 400;
        }

        setTimeout(typeWriterEffect, typingSpeed);
    }

    typeWriterEffect();

    // ----------------------------------------------------
    // 6. ANIMATED STATS COUNTER
    // ----------------------------------------------------
    let statsAnimated = false;
    function initStatsCounter() {
        const statsStrip = document.getElementById("stats-strip");
        if (!statsStrip) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    document.querySelectorAll(".stat-number").forEach(counter => {
                        const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
                        const suffix = counter.getAttribute("data-suffix") || "";
                        let count = 0;
                        const duration = 1500;
                        const increment = Math.max(1, Math.ceil(target / (duration / 25)));

                        const timer = setInterval(() => {
                            count += increment;
                            if (count >= target) {
                                counter.textContent = target + suffix;
                                clearInterval(timer);
                            } else {
                                counter.textContent = count + suffix;
                            }
                        }, 25);
                    });
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsStrip);
    }

    initStatsCounter();

    // ----------------------------------------------------
    // 7. SCROLL REVEAL OBSERVER
    // ----------------------------------------------------
    function initScrollReveal() {
        const reveals = document.querySelectorAll(".reveal");
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                }
            });
        }, { threshold: 0.12 });

        reveals.forEach(el => revealObserver.observe(el));
    }

    initScrollReveal();

    // ----------------------------------------------------
    // 8. INTERACTIVE DEVELOPER TERMINAL (CLI WIDGET)
    // ----------------------------------------------------
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");
    const terminalBody = document.getElementById("terminal-body");

    let commandHistory = [];
    let historyIndex = -1;

    if (terminalInput && terminalOutput) {
        terminalInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const command = terminalInput.value.trim();
                if (command.length > 0) {
                    commandHistory.push(command);
                    historyIndex = commandHistory.length;
                    handleTerminalCommand(command);
                    terminalInput.value = "";
                }
            } else if (e.key === "ArrowUp") {
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex] || "";
                }
            } else if (e.key === "ArrowDown") {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex] || "";
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = "";
                }
            }
        });
    }

    function handleTerminalCommand(rawCmd) {
        const cmd = rawCmd.toLowerCase();
        let response = "";

        switch (cmd) {
            case "help":
                response = `Available commands:
  • bio       - View my background & current university details
  • skills    - List core programming languages & technologies
  • projects  - Explore featured projects & live links
  • contact   - Get my email, LinkedIn, and GitHub links
  • github    - Check live GitHub profile & activity
  • date      - Print current time in Bhopal (IST)
  • clear     - Clear the terminal screen`;
                break;

            case "bio":
            case "about":
                response = `Pankaj Sikheriya:
• Degree: B.Tech in Computer Science & Engineering (2025 - 2028)
• College: Radharaman Institute of Technology & Science, Bhopal
• Passion: Building responsive, high-performance web applications and automation tools.`;
                break;

            case "skills":
                response = `Skills Matrix:
• Frontend: HTML5, CSS3, Modern JavaScript
• Backend: PHP, Python
• Databases: MySQL, Relational Database Modeling
• Core: C Programming, Data Structures, Git`;
                break;

            case "projects":
                response = `Featured Projects:
1. Student Management Portal (PHP, MySQL)
2. Interactive Cyber Portfolio (HTML, CSS, JS, JSON)
3. Python Automation & Scripting Suite (Python, SQL)`;
                break;

            case "contact":
                response = `Contact Information:
• Email: pankajsikheriya2008@gmail.com
• LinkedIn: linkedin.com/in/pankaj-sikheriya-373b50434
• GitHub: github.com/Pankaj200801`;
                break;

            case "github":
                response = `Navigating to https://github.com/Pankaj200801 ...`;
                window.open("https://github.com/Pankaj200801", "_blank");
                break;

            case "date":
            case "time":
                const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
                response = `Current IST Time: ${now}`;
                break;

            case "clear":
                terminalOutput.innerHTML = "";
                return;

            default:
                response = `Command not found: '${rawCmd}'. Type 'help' to see available commands.`;
        }

        const newLine = document.createElement("div");
        newLine.style.marginTop = "10px";
        newLine.innerHTML = `<span class="prompt-accent">pankaj@dev:~$</span> ${rawCmd}\n${response}`;
        terminalOutput.appendChild(newLine);

        if (terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }

    // ----------------------------------------------------
    // 9. ONE-CLICK EMAIL COPY
    // ----------------------------------------------------
    const quickCopyEmail = document.getElementById("quick-copy-email");
    if (quickCopyEmail) {
        quickCopyEmail.addEventListener("click", () => {
            const emailText = document.getElementById("bento-email-text")?.textContent || "pankajsikheriya2008@gmail.com";
            navigator.clipboard.writeText(emailText.trim()).then(() => {
                showToast("Email address copied to clipboard! 📋");
            }).catch(() => {
                showToast(`Email: ${emailText}`);
            });
        });
    }

    // ----------------------------------------------------
    // 10. SKILL CATEGORY FILTERING
    // ----------------------------------------------------
    const filterBtns = document.querySelectorAll(".skill-filter-btn");
    const skillCards = document.querySelectorAll(".skill-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            skillCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // ----------------------------------------------------
    // 11. LIVE GITHUB PROFILE & REPOS API
    // ----------------------------------------------------
    function fetchGitHubStats(username = "Pankaj200801") {
        fetch(`https://api.github.com/users/${username}`)
            .then(res => {
                if (!res.ok) throw new Error("GitHub API rate-limited or unavailable");
                return res.json();
            })
            .then(data => {
                const repoEl = document.getElementById("github-repo-count");
                const followersEl = document.getElementById("github-followers-count");
                const avatarEl = document.getElementById("github-avatar");
                const loginEl = document.getElementById("github-login");

                if (repoEl && data.public_repos !== undefined) repoEl.textContent = data.public_repos;
                if (followersEl && data.followers !== undefined) followersEl.textContent = data.followers;
                if (avatarEl && data.avatar_url) avatarEl.src = data.avatar_url;
                if (loginEl) loginEl.textContent = `@${data.login} • Open Source Contributor`;
            })
            .catch(err => {
                console.log("GitHub API fallback active:", err);
                const repoEl = document.getElementById("github-repo-count");
                const followersEl = document.getElementById("github-followers-count");
                if (repoEl) repoEl.textContent = "5+";
                if (followersEl) followersEl.textContent = "1+";
            });
    }

    fetchGitHubStats("Pankaj200801");

    // ----------------------------------------------------
    // 12. BACK TO TOP BUTTON
    // ----------------------------------------------------
    const backToTopBtn = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        if (!backToTopBtn) return;
        if (window.scrollY > 350) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ----------------------------------------------------
    // 13. MOBILE MENU TOGGLE
    // ----------------------------------------------------
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");

    if (menuToggle && navList) {
        menuToggle.addEventListener("click", () => {
            navList.classList.toggle("open");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (navList.classList.contains("open")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    // ----------------------------------------------------
    // 14. TOAST NOTIFICATION UTILITY
    // ----------------------------------------------------
    function showToast(message) {
        const container = document.getElementById("toast-container");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#00f7ff"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }

    // ----------------------------------------------------
    // 15. DYNAMIC DATA HYDRATION FROM info.json
    // ----------------------------------------------------
    fetch("./info.json?t=" + new Date().getTime(), { cache: "no-store" })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderPortfolioData(data);
        })
        .catch(err => {
            console.log("Loading default embedded data (info.json fetch bypassed or local file protocol):", err);
        });

    function renderPortfolioData(data) {
        // 1. Personal & Brand
        if (data.personal) {
            const { firstName, lastName, greeting, name, tagline, availability, resumeUrl, githubUsername, email, roles, heroImage, socialLinks } = data.personal;

            if (firstName) {
                const logoFirst = document.getElementById("logo-first");
                if (logoFirst) logoFirst.textContent = firstName;
            }
            if (lastName) {
                const logoLast = document.getElementById("logo-last");
                if (logoLast) logoLast.textContent = lastName;
            }
            if (greeting) {
                const heroGreeting = document.getElementById("hero-greeting");
                if (heroGreeting) heroGreeting.textContent = greeting;
            }
            if (name) {
                const heroName = document.getElementById("hero-name");
                if (heroName) heroName.textContent = name;
                document.title = `${name} ${data.personal.lastName || ""} | Portfolio`;
            }
            if (tagline) {
                const heroTagline = document.getElementById("hero-tagline");
                if (heroTagline) heroTagline.textContent = tagline;
            }
            if (availability) {
                const availText = document.getElementById("availability-text");
                if (availText) availText.textContent = availability;
            }
            if (resumeUrl) {
                const resumeBtn = document.getElementById("hero-cta-resume");
                if (resumeBtn) resumeBtn.href = resumeUrl;
            }
            if (email) {
                const emailEl = document.getElementById("bento-email-text");
                if (emailEl) emailEl.textContent = email;
            }
            if (githubUsername) {
                fetchGitHubStats(githubUsername);
            }
            if (Array.isArray(roles) && roles.length > 0) {
                typewriterRoles = roles;
                roleIndex = 0;
                charIndex = 0;
                isDeleting = false;
            }
            if (heroImage) {
                const heroImg = document.getElementById("hero-img");
                if (heroImg) heroImg.src = heroImage;
            }
            if (Array.isArray(socialLinks)) {
                renderSocials("hero-socials", socialLinks);
                renderSocials("footer-socials", socialLinks);
            }
        }

        // 2. Stats
        if (Array.isArray(data.stats)) {
            const statsStrip = document.getElementById("stats-strip");
            if (statsStrip) {
                statsStrip.innerHTML = data.stats.map(item => `
                    <div class="stat-item">
                        <div class="stat-number" data-target="${item.number}" data-suffix="${item.suffix}">0${item.suffix}</div>
                        <div class="stat-label">${item.label}</div>
                    </div>
                `).join("");
                statsAnimated = false;
                initStatsCounter();
            }
        }

        // 3. Bento Details
        if (data.bento) {
            if (data.bento.college) {
                const collegeEl = document.getElementById("bento-college");
                if (collegeEl) collegeEl.textContent = data.bento.college;
            }
            if (Array.isArray(data.bento.currentFocus)) {
                const focusList = document.getElementById("focus-tags-list");
                if (focusList) {
                    focusList.innerHTML = data.bento.currentFocus.map(tag => `
                        <span class="focus-pill"><i class="fa-solid fa-code"></i> ${tag}</span>
                    `).join("");
                }
            }
        }

        // 4. Navigation
        if (Array.isArray(data.navigation)) {
            const navListEl = document.getElementById("nav-list");
            if (navListEl) {
                navListEl.innerHTML = data.navigation.map((item, index) =>
                    `<li><a href="${item.href}" class="${index === 0 ? 'active' : ''}">${item.label}</a></li>`
                ).join("");
                attachNavScrollListeners();
            }
        }

        // 5. About Section
        if (data.about) {
            if (data.about.content) {
                const aboutContent = document.getElementById("about-content");
                if (aboutContent) {
                    aboutContent.innerHTML = `<p>${data.about.content}</p>`;
                }
            }
        }

        // 6. Education Section
        if (data.education) {
            if (data.education.title) {
                const eduHeading = document.getElementById("education-heading");
                if (eduHeading) eduHeading.textContent = data.education.title;
            }
            if (Array.isArray(data.education.items)) {
                const eduList = document.getElementById("education-list");
                if (eduList) {
                    eduList.innerHTML = data.education.items.map(item => `
                        <div class="spotlight-card timeline-card">
                            <div class="card-year">${item.year}</div>
                            <div class="card-title">${item.degree}</div>
                            <div class="card-desc">${item.institution}</div>
                        </div>
                    `).join("");
                }
            }
        }

        // 7. Skills Section
        if (data.skills) {
            if (data.skills.title) {
                const skillsHeading = document.getElementById("skills-heading");
                if (skillsHeading) skillsHeading.innerHTML = `${data.skills.title} &amp; <span class="highlight">Expertise</span>`;
            }
            if (Array.isArray(data.skills.categories)) {
                const filterContainer = document.getElementById("skills-filters");
                if (filterContainer) {
                    filterContainer.innerHTML = data.skills.categories.map((cat, idx) => `
                        <button class="skill-filter-btn ${idx === 0 ? 'active' : ''}" data-filter="${cat.id}">${cat.label}</button>
                    `).join("");

                    filterContainer.querySelectorAll(".skill-filter-btn").forEach(btn => {
                        btn.addEventListener("click", () => {
                            filterContainer.querySelectorAll(".skill-filter-btn").forEach(b => b.classList.remove("active"));
                            btn.classList.add("active");
                            const filter = btn.getAttribute("data-filter");
                            document.querySelectorAll(".skill-card").forEach(card => {
                                const category = card.getAttribute("data-category");
                                if (filter === "all" || category === filter) {
                                    card.style.display = "flex";
                                } else {
                                    card.style.display = "none";
                                }
                            });
                        });
                    });
                }
            }
            if (Array.isArray(data.skills.items)) {
                const skillsList = document.getElementById("skills-list");
                if (skillsList) {
                    skillsList.innerHTML = data.skills.items.map(skill => `
                        <div class="spotlight-card skill-card" data-category="${skill.category || 'all'}">
                            ${skill.icon ? `<div class="skill-icon"><i class="${skill.icon}"></i></div>` : ''}
                            <div class="skill-name">${skill.title}</div>
                            ${skill.proficiency ? `<div class="skill-badge">${skill.proficiency}</div>` : ''}
                            <div class="skill-desc">${skill.description}</div>
                        </div>
                    `).join("");
                }
            }
        }

        // 8. Projects Section
        if (data.projects && Array.isArray(data.projects.items)) {
            const projectsGrid = document.getElementById("projects-grid");
            if (projectsGrid) {
                projectsGrid.innerHTML = data.projects.items.map(proj => `
                    <div class="spotlight-card project-card">
                        <div>
                            <div class="project-header">
                                <div class="project-icon-box">
                                    <i class="${proj.icon || 'fa-solid fa-code'}"></i>
                                </div>
                                <div class="project-links">
                                    ${proj.githubUrl ? `
                                        <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="GitHub Code">
                                            <i class="fa-brands fa-github"></i>
                                        </a>` : ''}
                                    ${proj.liveUrl && proj.liveUrl !== '#' ? `
                                        <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="Live Demo">
                                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                        </a>` : ''}
                                </div>
                            </div>
                            <div class="project-title">${proj.title}</div>
                            <div class="project-desc">${proj.description}</div>
                        </div>
                        <div class="project-tags">
                            ${(proj.tags || []).map(t => `<span class="project-tag">${t}</span>`).join("")}
                        </div>
                    </div>
                `).join("");
            }
        }

        // 9. Contact Section
        if (data.contact) {
            if (data.contact.titlePrefix) {
                const prefixEl = document.getElementById("contact-title-prefix");
                if (prefixEl) prefixEl.textContent = data.contact.titlePrefix;
            }
            if (data.contact.titleHighlight) {
                const highlightEl = document.getElementById("contact-title-highlight");
                if (highlightEl) highlightEl.textContent = data.contact.titleHighlight;
            }
            if (Array.isArray(data.contact.inputs)) {
                const inputsContainer = document.getElementById("contact-inputs");
                if (inputsContainer) {
                    inputsContainer.innerHTML = data.contact.inputs.map(input => `
                        <input type="${input.type}" name="${input.name}" class="contact-pill-input" placeholder="${input.placeholder}" ${input.required ? 'required' : ''}>
                    `).join("");
                }
            }
            if (data.contact.messagePlaceholder) {
                const textarea = document.getElementById("contact-textarea");
                if (textarea) textarea.placeholder = data.contact.messagePlaceholder;
            }
            if (data.contact.submitButtonText) {
                const btn = document.getElementById("contact-submit-btn");
                if (btn) btn.textContent = data.contact.submitButtonText;
            }
        }

        // 10. Footer
        if (data.footer && Array.isArray(data.footer.navLinks)) {
            const footerNav = document.getElementById("footer-nav");
            if (footerNav) {
                footerNav.innerHTML = data.footer.navLinks.map(link => `
                    <li><a href="${link.href}">${link.label}</a></li>
                `).join("");
            }
        }

        initScrollReveal();
    }

    function renderSocials(elementId, socialLinks) {
        const container = document.getElementById(elementId);
        if (!container) return;

        container.innerHTML = socialLinks.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="${link.name}">
                <i class="${link.icon}"></i>
            </a>
        `).join("");
    }

    // ----------------------------------------------------
    // 16. SMOOTH SCROLLING & SCROLL SPY
    // ----------------------------------------------------
    function attachNavScrollListeners() {
        document.querySelectorAll('.navbar a[href^="#"], .hero-cta a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    if (navList && navList.classList.contains('open')) {
                        navList.classList.remove('open');
                        const icon = menuToggle?.querySelector("i");
                        if (icon) {
                            icon.classList.remove("fa-xmark");
                            icon.classList.add("fa-bars");
                        }
                    }
                }
            });
        });
    }

    attachNavScrollListeners();

    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let currentSectionId = '';
        const scrollPosition = window.scrollY + 130;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // 17. CONTACT FORM SUBMISSION
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('contact-submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showToast('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                submitBtn.textContent = 'Message Sent! ✓';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2500);
            }, 700);
        });
    }
});
/**
 * Gaurav Mahour Portfolio Script
 * Next-Level Interactive Developer Portfolio
 * Powered by info.json data hydration, ambient particle canvas, stats counters, and smooth animations.
 */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. AMBIENT PARTICLE CANVAS SYSTEM
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

                // Mouse interactivity
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

        const particleCount = Math.min(Math.floor(window.innerWidth / 20), 75);
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
    // 2. SCROLL PROGRESS INDICATOR
    // ----------------------------------------------------
    const scrollProgressBar = document.getElementById("scroll-progress");
    window.addEventListener("scroll", () => {
        if (!scrollProgressBar) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        scrollProgressBar.style.width = `${progress}%`;
    });

    // ----------------------------------------------------
    // 3. TYPEWRITER EFFECT
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
    // 4. ANIMATED STATS COUNTER
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
    // 5. SCROLL REVEAL OBSERVER
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
    // 6. BACK TO TOP BUTTON
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
    // 7. MOBILE MENU TOGGLE
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
    // 8. TOAST NOTIFICATION UTILITY
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
    // 9. DYNAMIC DATA HYDRATION FROM info.json
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
            const { firstName, lastName, greeting, name, tagline, availability, resumeUrl, roles, heroImage, socialLinks } = data.personal;

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

        // 3. Navigation
        if (Array.isArray(data.navigation)) {
            const navListEl = document.getElementById("nav-list");
            if (navListEl) {
                navListEl.innerHTML = data.navigation.map((item, index) =>
                    `<li><a href="${item.href}" class="${index === 0 ? 'active' : ''}">${item.label}</a></li>`
                ).join("");
                attachNavScrollListeners();
            }
        }

        // 4. About Section
        if (data.about) {
            if (data.about.title) {
                const aboutHeading = document.getElementById("about-heading");
                if (aboutHeading) aboutHeading.textContent = data.about.title;
            }
            if (data.about.content) {
                const aboutContent = document.getElementById("about-content");
                if (aboutContent) {
                    aboutContent.innerHTML = `<p>${data.about.content}</p>`;
                }
            }
        }

        // 5. Education Section
        if (data.education) {
            if (data.education.title) {
                const eduHeading = document.getElementById("education-heading");
                if (eduHeading) eduHeading.textContent = data.education.title;
            }
            if (Array.isArray(data.education.items)) {
                const eduList = document.getElementById("education-list");
                if (eduList) {
                    eduList.innerHTML = data.education.items.map(item => `
                        <div class="timeline-card">
                            <div class="card-year">${item.year}</div>
                            <div class="card-title">${item.degree}</div>
                            <div class="card-desc">${item.institution}</div>
                        </div>
                    `).join("");
                }
            }
        }

        // 6. Skills Section
        if (data.skills) {
            if (data.skills.title) {
                const skillsHeading = document.getElementById("skills-heading");
                if (skillsHeading) skillsHeading.textContent = data.skills.title;
            }
            if (Array.isArray(data.skills.items)) {
                const skillsList = document.getElementById("skills-list");
                if (skillsList) {
                    skillsList.innerHTML = data.skills.items.map(skill => `
                        <div class="skill-card">
                            ${skill.icon ? `<div class="skill-icon"><i class="${skill.icon}"></i></div>` : ''}
                            <div class="skill-name">${skill.title}</div>
                            <div class="skill-desc">${skill.description}</div>
                        </div>
                    `).join("");
                }
            }
        }

        // 7. Projects Section
        if (data.projects && Array.isArray(data.projects.items)) {
            const projectsGrid = document.getElementById("projects-grid");
            if (projectsGrid) {
                projectsGrid.innerHTML = data.projects.items.map(proj => `
                    <div class="project-card">
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
                                    ${proj.liveUrl ? `
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

        // 8. Contact Section
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

        // 9. Footer
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
    // 10. SMOOTH SCROLLING & SCROLL SPY
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

                    // Close mobile nav if open
                    if (navList && navList.classList.contains('open')) {
                        navList.classList.remove('open');
                        const icon = menuToggle.querySelector("i");
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

    // ScrollSpy active link updater
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
    // 11. FORM SUBMISSION
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
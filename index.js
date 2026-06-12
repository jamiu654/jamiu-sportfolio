/* ========================================
   JAMIU PORTFOLIO - SCRIPT.JS
   Interactive Functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // NAVIGATION
    // ========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section, header');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ========================================
    // HERO STATS COUNTER ANIMATION
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        const heroSection = document.querySelector('.hero');
        const rect = heroSection.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;

            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                const isDecimal = target % 1 !== 0;
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function (ease-out-cubic)
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = target * easeOut;

                    if (isDecimal) {
                        stat.textContent = current.toFixed(1);
                    } else {
                        stat.textContent = Math.floor(current);
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (isDecimal) {
                            stat.textContent = target.toFixed(1);
                        } else {
                            stat.textContent = target;
                        }
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealElements = document.querySelectorAll('.section-header, .about-grid, .timeline-item, .skill-category, .project-card, .contact-grid');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // ========================================
    // SKILLS PROGRESS BARS
    // ========================================
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
                skillsObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillsObserver.observe(bar));

    // ========================================
    // INTERACTIVE TERMINAL (API-POWERED)
    // ========================================
    const terminalBody = document.getElementById('terminalBody');
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const termClear = document.getElementById('termClear');

    // API Base URL - change this for production
    const API_BASE = window.location.origin;

    // Terminal command definitions (fallback when API is unavailable)
    const commands = {
        help: {
            description: 'Show available commands',
            execute: () => {
                return `
Available commands:

${formatList([
                    ['help', 'Show this help message'],
                    ['about', 'Learn about me'],
                    ['skills', 'View my technical skills'],
                    ['projects', 'See my featured projects'],
                    ['experience', 'View my work experience'],
                    ['contact', 'Get my contact information'],
                    ['clear', 'Clear the terminal'],
                    ['whoami', 'Display user info'],
                    ['date', 'Show current date and time']
                ])}

Type any command to explore. Use ↑/↓ arrows for history.`;
            }
        },

        about: {
            description: 'Learn about me',
            execute: () => {
                return `
${colorize('=== ABOUT JAMIU ===', 'violet')}

Name: Jamiu
Role: Full Stack Developer
Experience: 2.5 Years
Location: Available Worldwide

${colorize('Philosophy:', 'teal')}
• Problem-first approach to development
• Scale-minded architecture decisions  
• Collaborative team player
• Clean code advocate

I believe great software bridges elegant UX with
robust backend architecture. Every line of code
should serve a purpose and stand the test of time.`;
            }
        },

        skills: {
            description: 'View technical skills',
            execute: () => {
                return `
${colorize('=== TECHNICAL SKILLS ===', 'violet')}

${colorize('Frontend:', 'teal')}
${renderBar('React / Next.js', 92)}
${renderBar('TypeScript', 88)}
${renderBar('Tailwind CSS', 90)}
${renderBar('HTML5 / CSS3', 95)}

${colorize('Backend:', 'teal')}
${renderBar('APIs (Django)', 90)}
${renderBar('Python / Django', 78)}
${renderBar('REST API Design', 88)}
${renderBar('GraphQL', 75)}

${colorize('Databases & Cloud:', 'teal')}
${renderBar('PostgreSQL', 85)}
${renderBar('MongoDB', 80)}
${renderBar('Docker', 78)}
${renderBar('AWS / Vercel', 76)}`;
            }
        },

        projects: {
            description: 'View featured projects',
            execute: () => {
                return `
${colorize('=== FEATURED PROJECTS ===', 'violet')}

${colorize('1. DevConnect', 'teal')} — Developer Social Network
    Tech: React, Django, WebSockets, MongoDB
   Features: Real-time messaging, code sharing
   Status: Production Ready

${colorize('2. FinSphere', 'teal')} — Finance Dashboard  
   Tech: Next.js, Python, PostgreSQL, D3.js
   Features: Expense tracking, AI insights
   Status: Production Ready

${colorize('3. ShopPulse', 'teal')} — E-commerce Platform
    Tech: React, Django, Redis, Stripe
   Features: Inventory, payments, PWA
   Status: Production Ready

${colorize('Total Projects: 30+', 'violet')}`;
            }
        },

        experience: {
            description: 'View work experience',
            execute: () => {
                return `
${colorize('=== PROFESSIONAL EXPERIENCE ===', 'violet')}

${colorize('Full Stack Developer', 'teal')} | Tech Solutions Inc.
2023 — Present | 1.5 Years
• Leading client integrations
• Scalable RESTful APIs (10K+ daily requests)
• DB query optimization (40% latency reduction)
• Microservices architecture

${colorize('Junior Developer', 'teal')} | Digital Agency Co.
2022 — 2023 | 1 Year  
• React components & UI libraries
• Unit testing with Jest (85% coverage)
• Django (DRF) REST APIs
• E-commerce platform development

${colorize('Software Intern', 'teal')} | StartupHub
2022 — 2022
• Full-stack fundamentals
• CRUD applications
• Git workflows & open-source`;
            }
        },

        contact: {
            description: 'Get contact info',
            execute: () => {
                return `
${colorize('=== CONTACT INFORMATION ===', 'violet')}

Email:    jamiu.dev@email.com
GitHub:   github.com/jamiu-dev
LinkedIn: linkedin.com/in/jamiu-dev
Location: Available Worldwide

${colorize('Status: Open to opportunities', 'teal')}

Feel free to reach out for collaborations,
job opportunities, or just to say hello!`;
            }
        },

        whoami: {
            description: 'User info',
            execute: () => {
                return `
visitor@portfolio

You are a curious recruiter or developer
exploring Jamiu's interactive portfolio.

${colorize('Tip:', 'teal')} Try the 'skills' or 'projects' command
to learn more about my work.`;
            }
        },

        date: {
            description: 'Current date/time',
            execute: () => {
                const now = new Date();
                return `
${now.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}
${now.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit',
                    hour12: true 
                })}

Server time: UTC${now.getTimezoneOffset() > 0 ? '-' : '+'}${Math.abs(now.getTimezoneOffset() / 60)}`;
            }
        },

        welcome: {
            description: 'Welcome message',
            execute: () => {
                return `
${colorize(`
    ██╗ █████╗ ███╗   ███╗██╗██╗   ██╗
    ██║██╔══██╗████╗ ████║██║██║   ██║
    ██║███████║██╔████╔██║██║██║   ██║
    ██║██╔══██║██║╚██╔╝██║██║██║   ██║
    ██║██║  ██║██║ ╚═╝ ██║██║╚██████╔╝
    ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝ ╚═════╝ 
`, 'violet')}
Welcome to my interactive portfolio terminal!

Type ${colorize('help', 'highlight')} to see available commands.`;
            }
        }
    };

    // Helper functions for terminal formatting
    function colorize(text, color) {
        const colors = {
            violet: '[35m',
            teal: '[36m', 
            highlight: '[33m',
            reset: '[0m'
        };
        // For HTML rendering, we use spans instead
        const colorMap = {
            violet: 'var(--accent-violet)',
            teal: 'var(--accent-teal)',
            highlight: 'var(--accent-violet)'
        };
        return `<span style="color: ${colorMap[color] || colorMap.violet}; font-weight: 600;">${text}</span>`;
    }

    function formatList(items) {
        return items.map(([cmd, desc]) => 
            `  <span class="cmd-name">${cmd}</span><span class="cmd-desc">${desc}</span>`
        ).join('\n');
    }

    function renderBar(label, percent) {
        const width = Math.round(percent / 2);
        const bar = '█'.repeat(width) + '░'.repeat(50 - width);
        return `  ${label.padEnd(20)} ${bar} ${percent}%`;
    }

    // Command history
    let commandHistory = [];
    let historyIndex = -1;

    // Process command
    function processCommand(cmd) {
        const trimmed = cmd.trim().toLowerCase();

        if (!trimmed) return '';

        commandHistory.push(trimmed);
        historyIndex = commandHistory.length;

        if (trimmed === 'clear') {
            terminalOutput.innerHTML = '';
            return null;
        }

        const command = commands[trimmed];

        if (command) {
            return command.execute();
        } else {
            return `<span class="term-error">Command not found: '${trimmed}'</span>

Type <span class="term-highlight">help</span> to see available commands.`;
        }
    }

    // Add line to terminal
    function addLine(content, isInput = false) {
        const line = document.createElement('div');
        line.className = isInput ? 'term-line' : 'term-response';

        if (isInput) {
            line.innerHTML = `
                <span class="term-prompt">jamiu@portfolio:~$</span>
                <span class="term-cmd">${escapeHtml(content)}</span>
            `;
        } else {
            line.innerHTML = `<div style="white-space: pre-wrap; line-height: 1.6;">${content}</div>`;
        }

        terminalOutput.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Handle input
    terminalInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value;

            if (cmd.trim()) {
                addLine(cmd, true);
                terminalInput.value = '';
                terminalInput.disabled = true;

                const response = await processCommand(cmd);

                if (response !== null) {
                    setTimeout(() => {
                        addLine(response);
                        terminalInput.disabled = false;
                        terminalInput.focus();
                    }, 150);
                } else {
                    terminalInput.disabled = false;
                    terminalInput.focus();
                }
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex] || '';
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });

    // Clear button
    termClear.addEventListener('click', () => {
        terminalOutput.innerHTML = '';
        terminalInput.focus();
    });

    // Focus terminal on click
    terminalBody.addEventListener('click', () => {
        terminalInput.focus();
    });

    // Auto-focus terminal when section is visible
    const terminalSection = document.querySelector('.terminal-section');
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => terminalInput.focus(), 500);
            }
        });
    }, { threshold: 0.5 });

    terminalObserver.observe(terminalSection);

    // ========================================
    // PROJECTS FILTER
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ========================================
    // CONTACT FORM
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(message, type = 'success') {
        toastMessage.textContent = message;
        const icon = toast.querySelector('i');

        if (type === 'error') {
            icon.className = 'fas fa-exclamation-circle';
            icon.style.color = '#ef4444';
            toast.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        } else {
            icon.className = 'fas fa-check-circle';
            icon.style.color = 'var(--accent-teal)';
            toast.style.borderColor = 'rgba(20, 184, 166, 0.3)';
        }

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showToast('Please fill in all fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Form submission failed');
            }

            showToast('Message sent successfully! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            showToast('Message could not be sent. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    });

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // PARALLAX EFFECT FOR HERO GLOWS
    // ========================================
    const heroGlows = document.querySelectorAll('.hero-glow');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        heroGlows.forEach((glow, index) => {
            const speed = 0.2 + (index * 0.1);
            glow.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ========================================
    // MOUSE FOLLOW EFFECT FOR PROJECT CARDS
    // ========================================
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ========================================
    // TYPING EFFECT FOR HERO (Optional enhancement)
    // ========================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(20px)';

            setTimeout(() => {
                line.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        });
    }

    // ========================================
    // CURSOR GLOW EFFECT
    // ========================================
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transition: transform 0.1s ease;
        mix-blend-mode: screen;
    `;
    document.body.appendChild(cursorGlow);

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX - 150;
        mouseY = e.clientY - 150;
    });

    function animateCursorGlow() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px)`;
        requestAnimationFrame(animateCursorGlow);
    }

    // Only enable on non-touch devices
    if (!window.matchMedia('(pointer: coarse)').matches) {
        animateCursorGlow();
    } else {
        cursorGlow.remove();
    }

    // Log visitor
    fetch(`${API_BASE}/api/visitor/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname, referrer: document.referrer })
    }).catch(() => {});

    // Health check
    fetch(`${API_BASE}/api/health`)
        .then(r => r.json())
        .then(data => console.log('API Status:', data.status))
        .catch(() => console.log('API: Running in offline mode'));

    console.log('%c Jamiu Portfolio ', 'background: linear-gradient(135deg, #a855f7, #14b8a6); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c Welcome to the console! Try typing commands in the terminal section. ', 'color: #94a3b8; font-size: 12px;');
});

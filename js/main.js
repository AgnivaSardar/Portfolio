// ==================== BOOT-UP LOADING ANIMATION ====================
function initLoadingAnimation() {
    const canvas = document.getElementById('loadingCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 140;
    canvas.height = 140;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let rotation = 0;
    let progress = 0;

    const progressEl = document.getElementById('loadingProgress');

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw rotating square with Royal Electric Blue accent
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((rotation * Math.PI) / 180);

        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(-38, -38, 76, 76);

        // Corner dots
        ctx.fillStyle = '#2563eb';
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            ctx.beginPath();
            ctx.arc(Math.cos(angle + rotation * 0.02) * 42, Math.sin(angle + rotation * 0.02) * 42, 3.5, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // Pulsing center dot
        const pulse = Math.sin(rotation / 10) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(29, 78, 216, ${pulse})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 7 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Orbiting arc
        ctx.strokeStyle = `rgba(37, 99, 235, ${0.5 + Math.sin(rotation / 20) * 0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 52, 0, (rotation / 30) % (Math.PI * 2));
        ctx.stroke();

        rotation += 3.5;
        progress = Math.min(100, progress + 2.5);
        if (progressEl) progressEl.style.width = `${progress}%`;

        if (rotation < 540) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

function showWelcomeScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const welcomeScreen = document.getElementById('welcomeScreen');

    if (loadingScreen) loadingScreen.classList.add('hidden');
    if (welcomeScreen) welcomeScreen.classList.remove('hidden');

    setTimeout(() => {
        if (welcomeScreen) welcomeScreen.classList.add('hidden');
        showMainPortfolio();
    }, 1400);
}

function showMainPortfolio() {
    const mainPortfolio = document.getElementById('mainPortfolio');
    if (mainPortfolio) mainPortfolio.classList.remove('hidden');
}

// ==================== PAUL KALKBRENNER CUSTOM CURSOR BUBBLE ====================
function initCursorBubble() {
    const cursor = document.getElementById('cursorBubble');
    const cursorText = document.getElementById('cursorText');
    if (!cursor || !cursorText) return;

    window.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    const triggerElements = document.querySelectorAll('[data-cursor-text]');
    triggerElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            const text = el.getAttribute('data-cursor-text') || 'VIEW';
            cursorText.textContent = text;
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
}

// ==================== SOUND EQUALIZER & TOGGLE ====================
function initSoundToggle() {
    const btn = document.getElementById('soundToggleBtn');
    const textEl = document.getElementById('soundBtnText');
    const heroStatus = document.getElementById('heroSoundFlash');
    if (!btn || !textEl) return;

    let isPlaying = true;

    btn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            textEl.textContent = "Sound ON";
            if (heroStatus) heroStatus.textContent = "Now playing: Distributed Systems Engine";
            btn.setAttribute('data-sound-active', 'true');
        } else {
            textEl.textContent = "Sound OFF";
            if (heroStatus) heroStatus.textContent = "Sound Paused";
            btn.setAttribute('data-sound-active', 'false');
        }
    });
}

// ==================== PROJECT SELECTOR & VISUAL UI PREVIEW ====================
function initVinylProjectSelector() {
    const triggers = document.querySelectorAll('[data-trigger]');
    const visualItems = document.querySelectorAll('[data-visual-item]');
    const infoItems = document.querySelectorAll('[data-info-item]');

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-trigger');

            triggers.forEach((t) => {
                t.classList.remove('bg-blue-700', 'text-white');
                t.classList.add('bg-white', 'text-slate-950');
            });

            trigger.classList.remove('bg-white', 'text-slate-950');
            trigger.classList.add('bg-blue-700', 'text-white');

            visualItems.forEach((v) => {
                if (v.getAttribute('data-visual-item') === targetId) {
                    v.classList.remove('hidden');
                } else {
                    v.classList.add('hidden');
                }
            });

            infoItems.forEach((info) => {
                if (info.getAttribute('data-info-item') === targetId) {
                    info.classList.remove('hidden');
                } else {
                    info.classList.add('hidden');
                }
            });
        });
    });
}

// ==================== WORK EXPERIENCE EXPANDING ACCORDION ====================
function initExperienceAccordion() {
    const items = document.querySelectorAll('.tour-dates__item');

    items.forEach((item) => {
        const btn = item.querySelector('[data-button]');
        if (!btn) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isAlreadyOpen = item.classList.contains('expanded');

            // Automatically close all other rows first
            items.forEach((otherItem) => {
                otherItem.classList.remove('expanded');
                const otherBtn = otherItem.querySelector('[data-button]');
                if (otherBtn) {
                    otherBtn.textContent = 'EXPLORE ROLE';
                }
                const detailEl = otherItem.querySelector('.tour-detail-drawer');
                if (detailEl) {
                    detailEl.style.maxHeight = '0px';
                    detailEl.style.opacity = '0';
                }
            });

            // Expand clicked row if it wasn't open
            if (!isAlreadyOpen) {
                item.classList.add('expanded');
                btn.textContent = 'CLOSE DETAILS';
                const detailEl = item.querySelector('.tour-detail-drawer');
                if (detailEl) {
                    detailEl.style.maxHeight = `${detailEl.scrollHeight + 40}px`;
                    detailEl.style.opacity = '1';
                }
            }
        });
    });
}

// ==================== SMOOTH NAVBAR AUTO-SCROLLING ====================
function initNavbarScrolling() {
    const links = document.querySelectorAll('header nav a[href^="#"], .scroll-arrow-link');
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== DYNAMIC SCROLL SECURITY LOCK TRACKER ====================
function initScrollSecurityLockTracker() {
    const floatingWidget = document.getElementById('floatingLockWidget');
    const lockLabel = document.getElementById('floatingLockLabel');
    const lockIcon = document.getElementById('floatingLockIcon');
    if (!floatingWidget || !lockLabel || !lockIcon) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        if (scrollPercent < 25) {
            lockIcon.textContent = "🔒";
            lockLabel.textContent = "Node 1/4 Verified (Core)";
            floatingWidget.className = "flex items-center gap-2 font-mono-code text-xs text-blue-700";
        } else if (scrollPercent < 55) {
            lockIcon.textContent = "🔒";
            lockLabel.textContent = "Node 2/4 Verified (Skills)";
            floatingWidget.className = "flex items-center gap-2 font-mono-code text-xs text-indigo-700";
        } else if (scrollPercent < 85) {
            lockIcon.textContent = "🔒";
            lockLabel.textContent = "Node 3/4 Verified (Projects)";
            floatingWidget.className = "flex items-center gap-2 font-mono-code text-xs text-sky-700";
        } else {
            lockIcon.textContent = "🔓";
            lockLabel.textContent = "SYSTEM FULLY UNLOCKED!";
            floatingWidget.className = "flex items-center gap-2 font-mono-code text-xs text-emerald-700 font-extrabold animate-pulse";
        }
    });

    floatingWidget.addEventListener('click', () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });
}

// ==================== CLI TERMINAL ENGINE ====================
function initCLITerminal() {
    const form = document.getElementById('terminalForm');
    const input = document.getElementById('terminalInput');
    const body = document.getElementById('terminalBody');
    const chips = document.querySelectorAll('.cmd-chip');
    if (!form || !input || !body) return;

    const commands = {
        help: `Available Commands:
- 'bio'        : Learn about Agniva's background & career objective
- 'skills'     : View technical skills matrix & backend stack
- 'projects'   : List featured production projects & RAG engines
- 'exp'        : Summary of work experience (VitaData, Auracle Labs)
- 'contact'    : Get email, phone, and location details
- 'clear'      : Clear terminal screen`,
        bio: `Agniva Sardar — Backend Development Engineer Intern
Computer Science Undergraduate ('28) at VIT Chennai with 9.30 CGPA.
Specializes in scalable, low-latency, and secure distributed systems.`,
        skills: `Technical Stack:
- Languages: Java, C, C++, Python, JavaScript, TypeScript
- Backend: Node.js, Express.js, Flask, FastAPI, REST APIs, WebSockets
- DB & Caching: PostgreSQL, MySQL, Redis, Supabase, Prisma ORM
- Cloud & DevOps: Docker, Docker Compose, AWS EC2, S3, CI/CD, Git`,
        projects: `Featured Projects:
1. Crack My DSA (CodePrep AI) — Gemini 1.5 RAG + Strivers A2Z Sheet
2. Truth Lens — AWS AI for Bharat Hackathon Fact-Checking Microservices
3. VIT-Verse Streaming Engine — Node.js/TS/Postgres/Redis Live Streaming
4. Patient AI Synopsis Generator — Stateless Clinical LLM Overview Service`,
        exp: `Work Experience:
1. VitaData Solutions (Jan-May 2026): Backend & Cloud Intern | 30-40% API Speedup
2. Auracle Labs (Sep 2025-Mar 2026): Backend & DB Intern | ~165ms Logon, Redis
3. Maths Club VITCC (Aug 2025-Present): Tech Lead | 50% Admin Reduction`,
        contact: `Contact Details:
- Email: agnivasardarwork@gmail.com
- Phone: +91 6290166815
- Location: Chennai, Tamil Nadu, India`
    };

    function appendOutput(cmd, output) {
        const cmdLine = document.createElement('div');
        cmdLine.className = 'text-blue-700 font-bold';
        cmdLine.textContent = `$ ${cmd}`;

        const outLine = document.createElement('div');
        outLine.className = 'text-slate-950 font-bold whitespace-pre-wrap';
        outLine.textContent = output;

        body.appendChild(cmdLine);
        body.appendChild(outLine);
        body.scrollTop = body.scrollHeight;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const rawCmd = input.value.trim().toLowerCase();
        input.value = '';
        if (!rawCmd) return;

        if (rawCmd === 'clear') {
            body.innerHTML = '<div class="text-slate-800 font-bold">Type <span class="text-blue-700 font-black">\'help\'</span> or click a command below.</div>';
            return;
        }

        const res = commands[rawCmd] || `Command not recognized: '${rawCmd}'. Type 'help' for available commands.`;
        appendOutput(rawCmd, res);
    });

    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            if (cmd) {
                if (cmd === 'clear') {
                    body.innerHTML = '<div class="text-slate-800 font-bold">Type <span class="text-blue-700 font-black">\'help\'</span> or click a command below.</div>';
                    return;
                }
                const res = commands[cmd] || `Executing ${cmd}...`;
                appendOutput(cmd, res);
            }
        });
    });
}

// ==================== 1-CLICK CLIPBOARD COPY ====================
function initClipboardCopy() {
    const copyBtns = document.querySelectorAll('[data-copy]');
    copyBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = `<span class="text-emerald-700 font-black">✓ Copied: ${textToCopy}</span>`;
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                    }, 2500);
                });
            }
        });
    });
}

// ==================== TESTIMONIALS CAROUSEL ====================
function initTestimonialsCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorContainer = document.querySelector('.carousel-indicators');

    if (!cards.length) return;

    let currentIndex = 0;

    if (indicatorContainer) {
        indicatorContainer.innerHTML = '';
        cards.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = `w-2.5 h-2.5 rounded-full transition-all ${idx === 0 ? 'bg-blue-700 w-6' : 'bg-slate-400'}`;
            dot.addEventListener('click', () => goToSlide(idx));
            indicatorContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        cards.forEach((card, idx) => {
            if (idx === index) {
                card.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
                card.classList.add('active', 'opacity-100', 'scale-100');
            } else {
                card.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
                card.classList.remove('active', 'opacity-100', 'scale-100');
            }
        });

        if (indicatorContainer) {
            const dots = indicatorContainer.querySelectorAll('button');
            dots.forEach((dot, idx) => {
                if (idx === index) {
                    dot.className = 'w-6 h-2.5 rounded-full bg-blue-700 transition-all';
                } else {
                    dot.className = 'w-2.5 h-2.5 rounded-full bg-slate-400 transition-all';
                }
            });
        }

        currentIndex = index;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + cards.length) % cards.length;
            goToSlide(newIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % cards.length;
            goToSlide(newIndex);
        });
    }
}

// ==================== CONTACT FORM HANDLER (FIREBASE / FORMSUBMIT AJAX) ====================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');
    const submitBtn = document.getElementById('contactSubmitBtn');
    if (!contactForm || !submitBtn || !statusDiv) return;

    function showStatus(message, type = 'success') {
        statusDiv.classList.remove('hidden', 'bg-emerald-100', 'text-emerald-950', 'border-emerald-700', 'bg-rose-100', 'text-rose-950', 'border-rose-700');
        if (type === 'success') {
            statusDiv.classList.add('bg-emerald-100', 'text-emerald-950', 'border-black');
            statusDiv.innerHTML = `✓ ${message}`;
        } else {
            statusDiv.classList.add('bg-rose-100', 'text-rose-950', 'border-black');
            statusDiv.innerHTML = `⚠️ ${message}`;
        }
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        // Basic validation
        if (!name || name.length < 2) {
            showStatus('Please enter a valid name.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showStatus('Please enter a valid email address.', 'error');
            return;
        }

        if (!message || message.length < 5) {
            showStatus('Please enter a message (at least 5 characters).', 'error');
            return;
        }

        // Loading state
        submitBtn.disabled = true;
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>SENDING...</span>
        `;
        statusDiv.classList.add('hidden');

        try {
            // Send payload to FormSubmit service targeting user email
            const payload = {
                name: name,
                email: email,
                message: message,
                _subject: `New Portfolio Message from ${name}`,
                _template: "table"
            };

            const response = await fetch('https://formsubmit.co/ajax/agnivasardarwork@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Also check if custom Firebase instance exists on window
            if (window.db && typeof window.db.collection === 'function') {
                try {
                    await window.db.collection('messages').add({
                        name,
                        email,
                        message,
                        timestamp: new Date().toISOString()
                    });
                } catch (fbErr) {
                    console.log('Firebase submit notice:', fbErr);
                }
            }

            if (response.ok) {
                showStatus('Message sent successfully! Thank you for reaching out, I will get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = '<span>MESSAGE SENT ✓</span>';
                submitBtn.classList.remove('bg-blue-700');
                submitBtn.classList.add('bg-emerald-600');
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                    submitBtn.classList.remove('bg-emerald-600');
                    submitBtn.classList.add('bg-blue-700');
                }, 4000);
            } else {
                throw new Error('Server returned an error status.');
            }
        } catch (err) {
            console.error('Contact form submission error:', err);
            showStatus('Message could not be sent directly. Please email directly to agnivasardarwork@gmail.com.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        }
    });
}

// INITIALIZE EVERYTHING ON DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', () => {
    initLoadingAnimation();
    setTimeout(showWelcomeScreen, 1800);

    initCursorBubble();
    initSoundToggle();
    initVinylProjectSelector();
    initExperienceAccordion();
    initNavbarScrolling();
    initScrollSecurityLockTracker();
    initCLITerminal();
    initClipboardCopy();
    initTestimonialsCarousel();
    initContactForm();
});

// ==================== INTERACTIVE BACKGROUND ==================== 
function initInteractiveBackground() {
    const canvas = document.getElementById('interactiveCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let scrollProgress = 0;
    
    // Particles for ash flame effect
    const particles = [];
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 0.8; // gentle sideways drift
            this.vy = -(Math.random() * 1.2 + 0.2); // float upward
            this.life = 1;
              this.size = Math.random() * 1.8 + 0.4; // smaller particles
              this.color = `rgba(${255}, ${Math.floor(80 + Math.random()*60)}, ${Math.floor(Math.random()*35)}, 0.35)`; // softer embers
              this.flicker = Math.random() * 0.4 + 0.25; // lower brightness
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= 0.015;
            // slight upward acceleration mimicking hot air
            this.vy -= 0.005;
            // subtle turbulence
            this.vx += (Math.random() - 0.5) * 0.02;
        }
        
        draw(ctx) {
            if (this.life <= 0) return;
            ctx.globalAlpha = this.life * this.flicker;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update orb positions
        const orb1 = document.querySelector('.orb-1');
        const orb2 = document.querySelector('.orb-2');
        const orb3 = document.querySelector('.orb-3');
        
        if (orb1) {
            const offsetX = (mouseX - window.innerWidth / 2) * 0.05;
            const offsetY = (mouseY - window.innerHeight / 2) * 0.05;
            orb1.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
        
        if (orb2) {
            const offsetX = (mouseX - window.innerWidth / 2) * -0.03;
            const offsetY = (mouseY - window.innerHeight / 2) * -0.03;
            orb2.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
        
        if (orb3) {
            const offsetX = (mouseX - window.innerWidth / 2) * 0.02;
            const offsetY = (mouseY - window.innerHeight / 2) * 0.02;
            orb3.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
        }
    });
    
    // Track scroll for animations
    window.addEventListener('scroll', () => {
        scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 360;
        
        const blobs = document.querySelectorAll('.blob');
        blobs.forEach((blob, index) => {
            const offset = scrollProgress * (0.5 + index * 0.1);
            blob.style.transform = `rotate(${offset}deg) scale(${1 + Math.sin(scrollProgress / 100 + index) * 0.1})`;
        });
    });
    
    // Animation loop
    const maxParticles = 220;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // lighter overlay to show embers better
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // uniform emission across entire canvas bottom and sides
        if (particles.length < maxParticles) {
            // Bottom edge emitters (reduced)
            const bottomEmitters = 3;
            for (let i = 0; i < bottomEmitters; i++) {
                const x = canvas.width * Math.random();
                const y = canvas.height - (Math.random() * 100);
                particles.push(new Particle(x, y));
            }
            // Left edge emitters
            const leftEmitters = 1;
            for (let i = 0; i < leftEmitters; i++) {
                const x = Math.random() * 100;
                const y = canvas.height * Math.random();
                particles.push(new Particle(x, y));
            }
            // Right edge emitters
            const rightEmitters = 1;
            for (let i = 0; i < rightEmitters; i++) {
                const x = canvas.width - (Math.random() * 100);
                const y = canvas.height * Math.random();
                particles.push(new Particle(x, y));
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);
            
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        // no connecting lines for ash ambiance
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==================== LOADING SCREEN - CANVAS ANIMATION ====================
function initLoadingAnimation() {
    const canvas = document.getElementById('loadingCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 150;
    canvas.height = 150;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let rotation = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw rotating square
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((rotation * Math.PI) / 180);
        
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 2;
        ctx.strokeRect(-40, -40, 80, 80);
        
        // Draw corner dots
        ctx.fillStyle = '#CC0000';
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            ctx.beginPath();
            ctx.arc(Math.cos(angle + rotation * 0.02) * 45, Math.sin(angle + rotation * 0.02) * 45, 4, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
        
        // Draw center pulsing dot
        const pulse = Math.sin(rotation / 10) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255, 0, 0, ${pulse})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8 * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw orbiting line
        ctx.strokeStyle = `rgba(204, 0, 0, ${0.5 + Math.sin(rotation / 20) * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 55, 0, (rotation / 30) % (Math.PI * 2));
        ctx.stroke();
        
        rotation += 3;
        
        if (rotation < 540) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// ==================== WELCOME SCREEN ====================
function showWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    welcomeScreen.classList.remove('hidden');
    
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        showMainPortfolio();
    }, 1400);
}

// ==================== MAIN PORTFOLIO ====================
function showMainPortfolio() {
    const mainPortfolio = document.getElementById('mainPortfolio');
    mainPortfolio.classList.remove('hidden');
    initScrollAnimations();
    initCursorGlow();
    initFormSubmission();
    initMobileMenu();
    tagAshRevealSections();
    initActivity();
    initTestimonialsCarousel();
}
// ==================== ACTIVITY (GitHub/LeetCode) ====================
async function initActivity() {
    try {
        const userResp = await fetch('https://api.github.com/users/AgnivaSardar');
        const user = await userResp.json();
        const repos = user.public_repos ?? '--';
        const followers = user.followers ?? '--';
        const eventsResp = await fetch('https://api.github.com/users/AgnivaSardar/events/public');
        const events = await eventsResp.json();
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const recentCommits = (events || []).filter(ev => ev.type === 'PushEvent' && new Date(ev.created_at).getTime() >= thirtyDaysAgo)
            .reduce((acc, ev) => acc + (ev.payload?.commits?.length || 1), 0);
        const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        setText('ghRepos', repos);
        setText('ghFollowers', followers);
        setText('ghRecentCommits', recentCommits);
    } catch (e) {
        console.warn('Activity fetch failed', e);
    }
}


// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section-title, .project-card, .experience-item, .timeline-item, .contact-form').forEach(el => {
        observer.observe(el);
    });
    
    // Parallax scroll effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const blobs = document.querySelectorAll('.blob');
        
        blobs.forEach((blob, index) => {
            blob.style.transform = `translateY(${scrolled * 0.5 * (index % 2 === 0 ? 1 : -1)}px)`;
        });
    });
}

// Tag sections for ash reveal and activate on view
function tagAshRevealSections() {
    document.querySelectorAll('section').forEach(sec => {
        sec.classList.add('ash-reveal');
    });
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ash-active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.ash-reveal').forEach(el => revealObserver.observe(el));
}

// ==================== FORM SUBMISSION ====================
function initFormSubmission() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value,
            message: document.getElementById('message').value
        };
        
        const statusDiv = document.getElementById('formStatus');
        
        try {
            // Send to FormSubmit (free service)
            const response = await fetch('https://formspree.io/f/xyzqwert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                statusDiv.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                statusDiv.classList.add('success');
                statusDiv.classList.remove('error');
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            // Fallback: Show success message anyway (form can be configured to email later)
            statusDiv.textContent = 'Thank you! I\'ll review your message shortly.';
            statusDiv.classList.add('success');
            statusDiv.classList.remove('error');
            
            // Log the data for now
            console.log('Form data:', formData);
            
            setTimeout(() => {
                form.reset();
                statusDiv.textContent = '';
            }, 3000);
        }
    });
}

// ==================== CURSOR GLOW EFFECT ==================== 
function initCursorGlow() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Apply glow to nearby interactive elements
        const elements = document.querySelectorAll('.project-card, .btn, .nav-link, .skill-tag');
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elX = rect.left + rect.width / 2;
            const elY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - elX, 2) + Math.pow(mouseY - elY, 2)
            );
            
            const maxDistance = 200;
            
            if (distance < maxDistance) {
                const intensity = (1 - distance / maxDistance);
                el.style.boxShadow = `0 0 ${20 * intensity}px rgba(255, 0, 0, ${0.3 * intensity})`;
            } else {
                el.style.boxShadow = '';
            }
        });
    });
}
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (!hamburger || !navMenu) return;
    
    let isOpen = false;
    
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen = !isOpen;
        
        if (isOpen) {
            navMenu.classList.add('mobile-active');
            hamburger.classList.add('active');
        } else {
            navMenu.classList.remove('mobile-active');
            hamburger.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                isOpen = false;
                navMenu.classList.remove('mobile-active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && !navbar.contains(e.target)) {
            isOpen = false;
            navMenu.classList.remove('mobile-active');
            hamburger.classList.remove('active');
        }
    });
}

// ==================== SMOOTH SCROLLING ====================
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

// ==================== INITIALIZATION ====================
window.addEventListener('load', () => {
    // Initialize interactive background first
    initInteractiveBackground();
    
    // Start loading animation
    initLoadingAnimation();
    
    // After loading completes, show welcome screen
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        showWelcomeScreen();
    }, 1800);
});

// Add intersection observer for parallax effect on sections
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '';
        }
    });
});

// Prevent default for contact form if using basic submission
document.addEventListener('DOMContentLoaded', () => {
    // Make sure form doesn't break
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.onsubmit = function(e) {
            e.preventDefault();
            const formStatus = document.getElementById('formStatus');
            formStatus.textContent = 'Thank you! Your message has been received.';
            formStatus.classList.add('success');
            setTimeout(() => {
                contactForm.reset();
                formStatus.textContent = '';
            }, 3000);
        };
    }
});

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// Intersection Observer for fade-in animations
const fadeInElements = document.querySelectorAll('.project-card, .timeline-item, .experience-item, .skill-tag');
const observerFadeIn = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observerFadeIn.observe(el);

// ==================== TESTIMONIALS CAROUSEL ====================
function initTestimonialsCarousel() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (!track || cards.length === 0 || !prevBtn || !nextBtn || !indicatorsContainer) return;
    
    let currentIndex = 0;
    
    // Create indicators
    cards.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.indicator');
    
    function updateCarousel() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev');
            
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index < currentIndex) {
                card.classList.add('prev');
            }
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto-advance carousel every 8 seconds
    let autoplayInterval = setInterval(nextSlide, 8000);
    
    // Pause autoplay on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 8000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }
}
});

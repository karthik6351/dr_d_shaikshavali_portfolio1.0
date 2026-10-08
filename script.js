/* ========================================================
   Dr. Dudekula Shaikshavali — Portfolio JavaScript
   Handles navigation, animations, typing effect, counters
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleNavScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // ---- Mobile Navigation Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ---- Active Navigation Link ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 150;
        let activeSectionId = 'hero'; // Default to hero

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                activeSectionId = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ---- Scroll Reveal Animation ----
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation slightly
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Animated Counters ----
    const counterElements = document.querySelectorAll('[data-target]');

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counterElements.forEach(el => counterObserver.observe(el));

    // ---- Typing Effect ----
    const typedTextElement = document.getElementById('typedText');
    const phrases = [
        'an Assistant Professor',
        'a VLSI Expert',
        'a Semiconductor Device Physicist',
        'a Microwave Engineering Researcher',
        'a Ph.D. in VLSI Domain'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 60;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect
    setTimeout(typeEffect, 1000);

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Contact Form (Visual Feedback Only) ----
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #1db954, #1ed760)';

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                this.reset();
            }, 3000);
        });
    }

    // ---- Parallax Effect for Hero Orbs ----
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        window.addEventListener('mousemove', (e) => {
            const orbs = document.querySelectorAll('.gradient-orb');
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 10;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

    // ---- Navbar Link Highlight on Hover ----
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.background = 'rgba(201, 169, 110, 0.06)';
            }
        });

        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.background = '';
            }
        });
    });

    // ---- Card Hover Glow Effect ----
    const cards = document.querySelectorAll('.project-card, .award-card, .metric-card, .exp-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--glow-x', `${x}px`);
            card.style.setProperty('--glow-y', `${y}px`);
        });
    });

    // ---- Show More Publications ----
    const showMorePubsBtn = document.getElementById('showMorePubs');
    if (showMorePubsBtn) {
        let currentlyVisible = 4;
        const pubsToRevealPerClick = 4;

        showMorePubsBtn.addEventListener('click', () => {
            const pubs = document.querySelectorAll('.pub-item');
            let newlyVisible = 0;

            for (let i = currentlyVisible; i < pubs.length; i++) {
                if (newlyVisible < pubsToRevealPerClick) {
                    pubs[i].style.display = 'flex';
                    pubs[i].classList.remove('pub-hidden');
                    newlyVisible++;
                }
            }

            currentlyVisible += newlyVisible;

            if (currentlyVisible >= pubs.length) {
                showMorePubsBtn.style.display = 'none';
            }
        });
    }

});

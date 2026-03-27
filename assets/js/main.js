// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.from('.nav-links li', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });

    tl.from('.hero-content h1', {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    }, "-=0.5");

    tl.from('.hero-content p', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, "-=0.8");

    tl.from('.hero-btns', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, "-=0.6");

    tl.from('.hero-image', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
    }, "-=1");
});

// Scroll Animations for Sections
const sections = document.querySelectorAll('section');

sections.forEach(section => {
    const header = section.querySelector('.section-header');
    const cards = section.querySelectorAll('.skill-card, .timeline-item, .stat');
    
    if (header) {
        gsap.from(header, {
            scrollTrigger: {
                trigger: section,
                start: "top 90%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    }

    if (cards.length > 0) {
        cards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: index % 3 * 0.1, // Small staggered delay for visual interest
                ease: "power2.out"
            });
        });
    }
});

// TikTok Section Animation
gsap.from('.tiktok .hero-content', {
    scrollTrigger: {
        trigger: '.tiktok',
        start: "top 70%",
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from('.tiktok img', {
    scrollTrigger: {
        trigger: '.tiktok',
        start: "top 70%",
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Navbar change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.padding = '0.5rem 0';
        nav.style.boxShadow = 'var(--shadow)';
    } else {
        nav.style.padding = '1rem 0';
        nav.style.boxShadow = 'none';
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Envoi en cours...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.style.display = 'block';
                formStatus.style.color = 'var(--primary-color)';
                formStatus.innerText = "Merci ! Votre message a été envoyé avec succès.";
                contactForm.reset();
            } else {
                const result = await response.json();
                formStatus.style.display = 'block';
                formStatus.style.color = '#ef4444';
                formStatus.innerText = result.error || 'Oups ! Un problème est survenu lors de l\'envoi.';
            }
        } catch (error) {
            formStatus.style.display = 'block';
            formStatus.style.color = '#ef4444';
            formStatus.innerText = 'Une erreur est survenue lors de l\'envoi du message.';
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    });
}

// Gallery Video logic
const galleryVideos = document.querySelectorAll('.gallery-item video');
galleryVideos.forEach(video => {
    video.addEventListener('play', function() {
        // Optional: stop other videos when one plays
        galleryVideos.forEach(v => {
            if (v !== video) v.pause();
        });
    });
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
}


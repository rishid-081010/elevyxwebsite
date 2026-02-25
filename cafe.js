// Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const loaderLogo = document.querySelector('.loader-logo');

    gsap.to(loaderLogo, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out'
    });

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 2500);
});

// Initialize Lucide Icons
lucide.createIcons();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Navbar Scroll Effect
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Hero Animations
gsap.from('.hero-title', {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: 'power4.out',
    delay: 0.5
});

gsap.from('.hero-desc', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
    delay: 0.8
});

gsap.from('.hero-btns', {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: 'power3.out',
    delay: 1.1
});

// Section Reveal Animations
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    gsap.from(section.querySelectorAll('.section-tag, .section-title, .section-text, .grid > *, .menu-item'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });
});

// Parallax Effect on Hero Background
gsap.to('.hero-bg', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 200,
    scale: 1.3
});

// Mouse Move Interaction for Hero Content
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { width, height } = hero.getBoundingClientRect();
    const xPercent = (clientX / width - 0.5) * 20;
    const yPercent = (clientY / height - 0.5) * 20;

    gsap.to(heroContent, {
        x: xPercent,
        y: yPercent,
        duration: 1,
        ease: 'power2.out'
    });
});

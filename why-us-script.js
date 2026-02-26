/* ═══════════════════════════════════════════════════════════
   Why Choose Us Logic — Parallax & Entrance
═══════════════════════════════════════════════════════════ */

(function () {
    const rows = document.querySelectorAll('.why-us__row');
    const decos = document.querySelectorAll('.why-us__deco');

    // ── Intersection Observer for Entrance Animation ──
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, observerOptions);

    rows.forEach(row => observer.observe(row));

    // ── Mouse depth effect for wireframes (optional polish) ──
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        document.querySelectorAll('.wireframe-box').forEach(box => {
            box.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
        });
    });

    // ── Strong Parallax Scroll Logic ──
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const vh = window.innerHeight;

        // 1. BG Arrows (Varying speeds for extra depth)
        document.querySelectorAll('.why-us__arrow').forEach((arrow, i) => {
            const speed = 0.1 + ((i % 5) * 0.05); // speeds from 0.1 to 0.3
            arrow.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // 2. Decorative Elements (Varying speeds)
        decos.forEach((deco, i) => {
            const speed = 0.2 + (i * 0.1);
            deco.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });

        // 3. Rows (Text Parallax ONLY)
        rows.forEach((row, index) => {
            const rect = row.getBoundingClientRect();
            const centerOffset = (rect.top + rect.height / 2) - vh / 2;

            // Only process if partially in viewport
            if (rect.top < vh && rect.bottom > 0) {
                const text = row.querySelector('.why-us__text');
                const image = row.querySelector('.why-us__image-container');

                // Text: subtle drift
                if (text) {
                    const tY = centerOffset * 0.1;
                    text.style.transform = `translateY(${tY}px)`;
                }

                // Image/Video: Locked to its grid position
                if (image) {
                    image.style.transform = 'none';
                }
            }
        });
    });
})();

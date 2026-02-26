/**
 * ELEVYX — Universal Nebula Particle Engine
 * Feature: Lightweight, floating white particle field.
 * Purpose: Adds a "Starfield / Nebula" ambiance across all pages.
 */

(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'nebula-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.zIndex = '0'; // Near fluid and glow
        canvas.style.pointerEvents = 'none';
        canvas.style.background = 'transparent';
    }

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;

            // Slow, drifting velocity
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Simple wrapping
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
    }

    function createParticles() {
        particles = [];
        const count = 120; // Perfect density for nebula feel
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        initCanvas();
        // Option: re-init particles or just keep them
    });

    initCanvas();
    createParticles();
    animate();
})();

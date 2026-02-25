/* ═══════════════════════════════════════════════════════════
   ELEVYX — Global Cursor Glow Logic
   script.js
   ─────────────────────────────────────────────────────────
   • Soft radial-gradient glow: #8A2BE2 (violet) → #00CED1 (teal)
   • Tracks mouse via clientX/clientY (viewport, not page coords)
     → stays correctly positioned even when scrolled
   • Lerp-smoothed rAF loop for fluid, lag-free motion
   • z-index: 0 (set in style.css) — always behind content
   • Video is never touched
═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    // ── Raw target (updated on mousemove) ──────────────────────
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;

    // ── Smoothed position (lerped each rAF frame) ──────────────
    let cx = tx;
    let cy = ty;

    // Smoothing factor: 0.10 = silky fluid lag
    // Raise to 0.20 for a snappier feel
    const LERP = 0.10;

    function lerp(a, b, t) { return a + (b - a) * t; }

    // ── clientX/Y = viewport-relative — correct on any scroll ──
    document.addEventListener('mousemove', (e) => {
        tx = e.clientX;
        ty = e.clientY;
    });

    // ── rAF draw loop ──────────────────────────────────────────
    (function tick() {
        // Smooth the position
        cx = lerp(cx, tx, LERP);
        cy = lerp(cy, ty, LERP);

        // Build the gradient:
        // Inner core  → #8A2BE2 (BlueViolet) at 40% opacity
        // Mid ring    → #00CED1 (DarkTurquoise) at 20% opacity
        // Outer edge  → fully transparent
        glow.style.background = `
      radial-gradient(
        circle 520px at ${cx}px ${cy}px,
        rgba(138, 43, 226, 0.38)   0%,
        rgba(0,  206, 209, 0.22)  42%,
        rgba(0,  206, 209, 0.06)  62%,
        transparent                75%
      )
    `;

        requestAnimationFrame(tick);
    })();
})();

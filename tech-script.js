/* ═══════════════════════════════════════════════════════════
   Tech Stack Modal & 3D Cube Logic
═══════════════════════════════════════════════════════════ */

(function () {
    const modal = document.getElementById('tech-modal');
    const cube = document.getElementById('cube');
    const closeBtn = document.getElementById('close-modal');
    const squares = document.querySelectorAll('.tech-square');

    let isDragging = false;
    let startX, startY;
    let rotateX = -25, rotateY = 32;

    // Event Delegation for squares (handles multiple rows)
    document.addEventListener('click', (e) => {
        const square = e.target.closest('.tech-square');
        if (!square) return;

        const imgSrc = square.querySelector('img').src;
        // Set source for ALL 6 faces
        const cubeImages = modal.querySelectorAll('.cube-img');
        cubeImages.forEach(img => img.src = imgSrc);

        modal.classList.add('active');
        // Initial position
        rotateX = -25;
        rotateY = 32;
        updateCube();
    });

    // Close Modal
    function closeModal() {
        modal.classList.remove('active');
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // ── 3D Cube Rotation Logic ──
    modal.addEventListener('mousedown', (e) => {
        if (e.target.closest('.cube')) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;

        startX = e.clientX;
        startY = e.clientY;

        updateCube();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    function updateCube() {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    // Handle touch
    modal.addEventListener('touchstart', (e) => {
        if (e.target.closest('.cube')) {
            isDragging = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        updateCube();
    });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

})();

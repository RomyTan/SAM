/* =========================================== */
/* ======= CORE ANIMATION & INTERACTION ======= */
/* =========================================== */

// 1. Trigger saat halaman Load
window.addEventListener('DOMContentLoaded', () => {
    // Reveal Hero Section
    setTimeout(() => {
        document.body.classList.add('hero-visible');
    }, 100); 
    
    // Pecah teks bubble untuk animasi huruf jatuh
    initLetterFalling();
    
    // Jalankan auto-play Cube (Why Section)
    startAutoPlay();
});

// --- Fungsi Animasi Huruf Jatuh ---
function initLetterFalling() {
    const typeElements = document.querySelectorAll('.type-effect');
    typeElements.forEach(el => {
        const text = el.getAttribute('data-text');
        if (!text) return;
        el.innerHTML = ''; 
        [...text].forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = char === ' ' ? 'space' : 'letter';
            el.appendChild(span);
        });
    });
}

// --- Intersection Observer (Trigger Scroll) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
            
            // Animasi Huruf (Hanya untuk Mobile About)
            if (entry.target.classList.contains('about-us-mobile')) {
                const letters = entry.target.querySelectorAll('.letter');
                letters.forEach((letter, index) => {
                    setTimeout(() => {
                        letter.classList.add('fell');
                    }, 1500 + (index * 25)); // Percepat sedikit delay per hurufnya (25ms)
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 }); // Threshold lebih sensitif biar gak nunggu lama

// Pantau Section
const sectionsToWatch = ['.about-us', '.why-section', '.about-us-mobile'];
sectionsToWatch.forEach(selector => {
    const section = document.querySelector(selector);
    if (section) observer.observe(section);
});


const villaContainer = document.querySelector('.villa-container');
const dots = document.querySelectorAll('.dot');

if (villaContainer && dots.length > 0) {
    villaContainer.addEventListener('scroll', () => {
        // Ambil lebar satu card (selebar layar)
        const containerWidth = villaContainer.offsetWidth;
        // Hitung index berdasarkan posisi scroll
        const activeIndex = Math.round(villaContainer.scrollLeft / containerWidth);

        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });
}

const whyGrid = document.querySelector('.why-grid-container');
const whyDots = document.querySelectorAll('.w-dot');

if (whyGrid) {
    whyGrid.addEventListener('scroll', () => {
        const cardWidth = whyGrid.querySelector('.why-card').offsetWidth;
        const index = Math.round(whyGrid.scrollLeft / cardWidth);
        
        whyDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    });
}
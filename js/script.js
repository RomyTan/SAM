window.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Hero Section
    setTimeout(() => {
        document.body.classList.add('hero-visible');
    }, 100); 

    // 2. Pecah teks bubble
    initLetterFalling();

    // 3. Logic Hamburger Menu & Overlay
    const menuBtn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('mobile-overlay');
    const closeBtn = document.getElementById('close-menu');
    const body = document.body;

    // Fungsi Gabungan Buka/Tutup
    function toggleMobileMenu(isOpen) {
        if (isOpen) {
            overlay.classList.add('open');
            menuBtn.classList.add('open');
            body.style.overflow = 'hidden'; // Kunci scroll
        } else {
            overlay.classList.remove('open');
            menuBtn.classList.remove('open');
            body.style.overflow = ''; // Aktifkan scroll
        }
    }

    if (menuBtn && overlay) {
        // Klik Hamburger
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !overlay.classList.contains('open');
            toggleMobileMenu(isOpen);
        });

        // Klik Tombol Close (X)
        if (closeBtn) {
            closeBtn.addEventListener('click', () => toggleMobileMenu(false));
        }

        // Klik Link Menu otomatis tutup
        const mobileLinks = document.querySelectorAll('.btn-menu, .overlay-content a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMobileMenu(false));
        });
    }

    // 4. Inisialisasi Intersection Observer
    initObserver();
});

/* --- Tetap di luar --- */

// Language Switcher Logic
const langSwitcher = document.getElementById('lang-switcher');
if (langSwitcher) {
    langSwitcher.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // Jangan toggle kalau klik bendera
        langSwitcher.classList.toggle('open');
        e.stopPropagation();
    });
}

document.addEventListener('click', () => {
    if (langSwitcher) langSwitcher.classList.remove('open');
});

// Slider Dot Logic
const villaContainer = document.querySelector('.villa-container');
const dots = document.querySelectorAll('.dot');
if (villaContainer && dots.length > 0) {
    villaContainer.addEventListener('scroll', () => {
        const activeIndex = Math.round(villaContainer.scrollLeft / villaContainer.offsetWidth);
        dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
    });
}

/* --- Fungsi Pendukung --- */
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

function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
                if (entry.target.classList.contains('about-us-mobile')) {
                    const letters = entry.target.querySelectorAll('.letter');
                    letters.forEach((letter, index) => {
                        setTimeout(() => {
                            letter.classList.add('fell');
                        }, 1500 + (index * 25));
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const sectionsToWatch = ['.about-us', '.why-section', '.about-us-mobile'];
    sectionsToWatch.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) observer.observe(section);
    });
}
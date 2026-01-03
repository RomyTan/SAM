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

// Tambahkan ini di bawah file HTML lo sebelum tag </body>
document.querySelectorAll('.next').forEach(button => {
    button.addEventListener('click', () => {
        const container = button.parentElement.querySelector('.slider-container');
        container.scrollBy({ left: 300, behavior: 'smooth' });
    });
});

document.querySelectorAll('.prev').forEach(button => {
    button.addEventListener('click', () => {
        const container = button.parentElement.querySelector('.slider-container');
        container.scrollBy({ left: -300, behavior: 'smooth' });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Klik tombol Next
    document.querySelectorAll('.v-next').forEach(btn => {
    btn.onclick = function() {
        // Cari container yang sejajar
        const container = this.parentElement.querySelector('.v-slider-container');
        container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
    };
});

    // Klik tombol Prev
    document.querySelectorAll('.v-prev').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const container = this.parentElement.querySelector('.v-slider-container');
            container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
        };
    });
});

document.querySelector('.v-btn-search').addEventListener('click', function() {
    // 1. Ambil angka dari select
    const selectedGuests = parseInt(document.querySelector('.v-filter-input').value);
    
    // 2. Scan semua villa
    document.querySelectorAll('.v-card').forEach(card => {
        // Ambil angka dari teks "👤 25 Guests"
        const capacityText = card.querySelector('.v-amenities span:first-child').innerText;
        const capacityValue = parseInt(capacityText.replace(/[^0-9]/g, ''));

        // 3. Logika Filter
        // Khusus pilihan "≤5", kita tampilkan semua villa (asumsi semua villa muat 5 orang)
        // Untuk pilihan "≥10" dst, hanya tampilkan villa yang kapasitasnya memadai
        if (selectedGuests === 5 || capacityValue >= selectedGuests) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Smooth scroll ke section villa setelah search
    document.querySelector('.v-listing-section').scrollIntoView({ behavior: 'smooth' });
});
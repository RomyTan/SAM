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

    function toggleMobileMenu(isOpen) {
        if (isOpen) {
            overlay.classList.add('open');
            menuBtn.classList.add('open');
            body.style.overflow = 'hidden'; 
        } else {
            overlay.classList.remove('open');
            menuBtn.classList.remove('open');
            body.style.overflow = ''; 
        }
    }

    if (menuBtn && overlay) {
        menuBtn.addEventListener('click', () => {
            const isOpen = !overlay.classList.contains('open');
            toggleMobileMenu(isOpen);
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => toggleMobileMenu(false));
        }

        const mobileLinks = document.querySelectorAll('.btn-menu, .overlay-content a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMobileMenu(false));
        });
    }

    // 4. Inisialisasi Fitur Lainnya
    initObserver();
    initSliders(); 
    initSearchFilter();
});

/* --- Fungsi Pendukung --- */

function initSliders() {
    // 1. Slider Foto di Dalam Card (Villas Page & Home)
    const photoContainers = document.querySelectorAll('.v-slider-container');
    
    photoContainers.forEach(container => {
        const parent = container.parentElement;
        const btnNext = parent.querySelector('.v-next');
        const btnPrev = parent.querySelector('.v-prev');

        if (btnNext) {
            btnNext.onclick = (e) => {
                e.preventDefault();
                // Pakai hitungan sisa scroll biar gak nyangkut di akhir
                const target = container.scrollLeft + container.clientWidth;
                container.scrollTo({ left: target, behavior: 'smooth' });
            };
        }
        if (btnPrev) {
            btnPrev.onclick = (e) => {
                e.preventDefault();
                // Kurangi 2-5 pixel ekstra untuk "memancing" browser keluar dari snap point
                const target = container.scrollLeft - container.clientWidth - 2;
                container.scrollTo({ left: target, behavior: 'smooth' });
            };
        }
    });

    // --- 2. LOGIKA DOTS UNTUK VILLA SECTION (HOME) ---
    const villaContainer = document.querySelector('.villa-container');
    const villaDots = document.querySelectorAll('.slider-dots .dot');

    if (villaContainer && villaDots.length > 0) {
        villaContainer.addEventListener('scroll', () => {
            const index = Math.round(villaContainer.scrollLeft / villaContainer.offsetWidth);
            villaDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        });

        villaDots.forEach((dot, i) => {
            dot.onclick = () => villaContainer.scrollTo({ left: villaContainer.offsetWidth * i, behavior: 'smooth' });
        });
    }

    // --- 3. LOGIKA DOTS UNTUK WHY SECTION (MOBILE HOME) ---
    const whyContainer = document.querySelector('.why-grid-container');
    const whyDots = document.querySelectorAll('.why-dots .w-dot');

    if (whyContainer && whyDots.length > 0) {
        whyContainer.addEventListener('scroll', () => {
            const index = Math.round(whyContainer.scrollLeft / whyContainer.offsetWidth);
            whyDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        });

        whyDots.forEach((dot, i) => {
            dot.onclick = () => whyContainer.scrollTo({ left: whyContainer.offsetWidth * i, behavior: 'smooth' });
        });
    }
}

function initSearchFilter() {
    const searchBtn = document.querySelector('.v-btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const selectedGuests = parseInt(document.querySelector('.v-filter-input').value);
            
            document.querySelectorAll('.v-card').forEach(card => {
                const capacityText = card.querySelector('.v-amenities span:first-child').innerText;
                const capacityValue = parseInt(capacityText.replace(/[^0-9]/g, ''));

                if (selectedGuests === 5 || capacityValue >= selectedGuests) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            document.querySelector('.v-listing-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

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

// Modal Logic
const modalData = {
    rules: `<h2>Peraturan Villa</h2>
            <ul>
                <li>Dilarang merokok di dalam kamar.</li>
                <li>Check-in jam 14.00, Check-out jam 12.00.</li>
                <li>Menjaga ketenangan setelah jam 22.00.</li>
            </ul>`,
    survey: `<h2>Syarat Survei</h2>
            <ul>
                <li>Harap membuat janji minimal 1 hari sebelumnya.</li>
                <li>Survei hanya bisa dilakukan saat villa kosong.</li>
            </ul>`
};

function openModal(type) {
    const modal = document.getElementById('rules-modal');
    const content = document.getElementById('modal-text-content');
    if (modal && content) {
        content.innerHTML = modalData[type];
        modal.style.display = 'flex';
    }
}

const closeModalBtn = document.getElementById('close-rules');
if (closeModalBtn) {
    closeModalBtn.onclick = () => {
        document.getElementById('rules-modal').style.display = 'none';
    };
}

window.onclick = (event) => {
    const modal = document.getElementById('rules-modal');
    if (event.target == modal) modal.style.display = 'none';
};
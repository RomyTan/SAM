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
    initSliders(); // Fungsi slider yang sudah dirapikan
    initSearchFilter();
});

/* --- Fungsi Pendukung --- */

function initSliders() {
    // Tombol Next
    document.querySelectorAll('.v-next').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const container = this.parentElement.querySelector('.v-slider-container');
            // Geser ke kanan sejauh lebar container (1 foto penuh)
            container.scrollTo({
                left: container.scrollLeft + container.offsetWidth,
                behavior: 'smooth'
            });
        };
    });

    // Tombol Prev (Back)
    document.querySelectorAll('.v-prev').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const container = this.parentElement.querySelector('.v-slider-container');
            // Geser ke kiri sejauh lebar container
            container.scrollTo({
                left: container.scrollLeft - container.offsetWidth,
                behavior: 'smooth'
            });
        };
    });
}

function initSearchFilter() {
    const searchBtn = document.querySelector('.v-btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const selectedGuests = parseInt(document.querySelector('.v-filter-input').value);
            
            document.querySelectorAll('.v-card').forEach(card => {
                const capacityText = card.querySelector('.v-amenities span:first-child').innerText;
                const capacityValue = parseInt(capacityText.replace(/[^0-9]/g, ''));

                // Logika Filter: Tampilkan jika tamu <=5 atau kapasitas memadai
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

// Language Switcher Logic
const langSwitcher = document.getElementById('lang-switcher');
if (langSwitcher) {
    langSwitcher.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; 
        langSwitcher.classList.toggle('open');
        e.stopPropagation();
    });
}

document.addEventListener('click', () => {
    if (langSwitcher) langSwitcher.classList.remove('open');
});

// Share Function
async function shareVilla(title, url) {
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                text: 'Cek villa keren di Batu ini: ' + title,
                url: url,
            });
        } catch (err) {
            console.log('Share dibatalkan');
        }
    } else {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link villa berhasil disalin!');
        });
    }
}
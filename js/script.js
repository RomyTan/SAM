// 1. Trigger untuk Hero & Logo saat halaman Load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Kita pasang di body supaya semua elemen (nav & hero) bisa aktif
        document.body.classList.add('hero-visible');
    }, 100); 
});

// 2. Trigger untuk About Us saat di-Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
        }
    });
}, { threshold: 0.2 });

const aboutSection = document.querySelector('.about-us');
if (aboutSection) {
    observer.observe(aboutSection);
}

const whySection = document.querySelector('.why-section');
if (whySection) {
    observer.observe(whySection);
}
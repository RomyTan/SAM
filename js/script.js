const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Pas section About Us kelihatan 20% di layar, jalankan!
            entry.target.classList.add('show-animate');
        }
    });
}, { threshold: 0.2 });

// Daftarkan section about-us ke dalam pengawasan observer
const aboutSection = document.querySelector('.about-us');
if (aboutSection) {
    observer.observe(aboutSection);
}
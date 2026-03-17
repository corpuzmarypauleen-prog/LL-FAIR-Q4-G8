window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    setTimeout(() => {
        heroContent.classList.add('animate');
        heroImage.classList.add('animate');
    }, 300);
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsNav = document.querySelector('.carousel-dots');
    const dots = Array.from(document.querySelectorAll('.dot'));
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });
    
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('active');
        targetSlide.classList.add('active');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('active');
        targetDot.classList.add('active');
    };
    
    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    };
   
    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.active') || slides[0];
        const currentIndex = slides.findIndex(slide => slide === currentSlide);
        const nextIndex = (currentIndex + 1) % slides.length;
        const nextSlide = slides[nextIndex];
        const currentDot = dotsNav.querySelector('.active') || dots[0];
        const nextDot = dots[nextIndex];
        
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    });
    
    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.active') || slides[0];
        const currentIndex = slides.findIndex(slide => slide === currentSlide);
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        const prevSlide = slides[prevIndex];
        const currentDot = dotsNav.querySelector('.active') || dots[0];
        const prevDot = dots[prevIndex];
        
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    });
   
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('span');
        
        if (!targetDot) return;
        
        const currentSlide = track.querySelector('.active') || slides[0];
        const currentDot = dotsNav.querySelector('.active') || dots[0];
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];
        
        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });
    

    let slideInterval = setInterval(() => {
        const currentSlide = track.querySelector('.active') || slides[0];
        const currentIndex = slides.findIndex(slide => slide === currentSlide);
        const nextIndex = (currentIndex + 1) % slides.length;
        const nextSlide = slides[nextIndex];
        const currentDot = dotsNav.querySelector('.active') || dots[0];
        const nextDot = dots[nextIndex];
        
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    }, 5000);
    
    track.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    

    track.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            const currentSlide = track.querySelector('.active') || slides[0];
            const currentIndex = slides.findIndex(slide => slide === currentSlide);
            const nextIndex = (currentIndex + 1) % slides.length;
            const nextSlide = slides[nextIndex];
            const currentDot = dotsNav.querySelector('.active') || dots[0];
            const nextDot = dots[nextIndex];
            
            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
        }, 5000);
    });
    

    slides[0].classList.add('active');
});

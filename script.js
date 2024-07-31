document.addEventListener('DOMContentLoaded', function() {
    // Lenis smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Carousel functionality
    const carouselItems = document.querySelectorAll('.carousel-item');
    const parallaxContainer = document.querySelector('.parallax-container');
    let currentItem = 0;
    let isTransitioning = false;

    function showNextItem() {
        if (isTransitioning) return;
        isTransitioning = true;

        const current = carouselItems[currentItem];
        currentItem = (currentItem + 1) % carouselItems.length;
        const next = carouselItems[currentItem];

        // Start transition
        next.classList.add('next');
        
        setTimeout(() => {
            current.classList.remove('active');
            next.classList.add('active');
            next.classList.remove('next');
            
            setTimeout(() => {
                isTransitioning = false;
            }, 50);
        }, 50);
    }

    setInterval(showNextItem, 5000); // Change image every 5 seconds

    // Parallax effect
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        const val = scroll * 0.5;
        parallaxContainer.style.transform = `translate3d(0, ${val}px, 0)`;
    });

    // Burger menu functionality
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
});

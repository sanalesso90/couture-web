document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
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

    setInterval(showNextItem, 4000); // Change image every 5 seconds

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
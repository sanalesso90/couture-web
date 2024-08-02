document.addEventListener('DOMContentLoaded', function() {
    // Hero Carousel functionality
    const carouselItems = document.querySelectorAll('.carousel-item');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content p');
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
            
            // Update hero content
            heroTitle.textContent = next.dataset.title;
            heroSubtitle.textContent = next.dataset.subtitle;

            // Fade in new text
            heroTitle.style.opacity = 0;
            heroSubtitle.style.opacity = 0;
            setTimeout(() => {
                heroTitle.style.opacity = 1;
                heroSubtitle.style.opacity = 1;
            }, 50);

            setTimeout(() => {
                isTransitioning = false;
            }, 50);
        }, 50);
    }

    setInterval(showNextItem, 5000); // Change image every 5 seconds

    // Parallax effect
    const parallaxContainer = document.querySelector('.parallax-container');
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const val = scrolled * 0.5;
        parallaxContainer.style.transform = `translate3d(0, ${val}px, 0)`;
    }

    window.addEventListener('scroll', handleParallax);

    // Smooth scrolling with Lenis
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

    // Virtual Try-On functionality
    const modelImage = document.querySelector('.model-image');
    const garmentOverlay = document.querySelector('.garment-overlay');
    const designOptions = document.querySelectorAll('.design-option');
    const designName = document.querySelector('.info .name');
    const designDescription = document.querySelector('.info .job');

    const designs = {
        design1: {
            name: "Ethereal Elegance",
            description: "Haute Couture Gown",
            image: "./img/1.jpg"
        },
        design2: {
            name: "Noir Mystique",
            description: "Avant-Garde Evening Wear",
            image: "./img/upscale.jpg"
        },
        design3: {
            name: "Floral Reverie",
            description: "Enchanting Garden-Inspired Dress",
            image: "./img/h3.jpg"
        },
        design4: {
            name: "Avant-Garde Fusion",
            description: "Futuristic Couture Ensemble",
            image: "./img/New folder/design1.jpg"
        }
    };

    designOptions.forEach(option => {
        option.addEventListener('click', function() {
            const designId = this.getAttribute('data-design');
            const design = designs[designId];
            
            // Animate the model image
            modelImage.style.transform = 'scale(1.05)';
            setTimeout(() => {
                modelImage.style.transform = 'scale(1)';
            }, 500);

            // Change the garment overlay
            garmentOverlay.style.opacity = '0';
            setTimeout(() => {
                garmentOverlay.style.backgroundImage = `url(${design.image})`;
                garmentOverlay.style.opacity = '1';
            }, 250);

            // Update design info
            designName.textContent = design.name;
            designDescription.textContent = design.description;

            // Highlight the selected design
            designOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement);
            }
        });
    });

    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });

    // Video Showcase functionality
    const mainVideo = document.getElementById('main-video');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');
    const timelineItems = document.querySelectorAll('.timeline-item');

    let isPlaying = false;

    function togglePlayPause() {
        if (isPlaying) {
            mainVideo.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            mainVideo.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }

    playPauseBtn.addEventListener('click', togglePlayPause);

    function changeVideo(videoSrc, title, description) {
        mainVideo.src = videoSrc;
        videoTitle.textContent = title;
        videoDescription.textContent = description;
        mainVideo.load();
        if (isPlaying) {
            mainVideo.play();
        }
    }

    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');

            changeVideo(videoSrc, title, description);

            timelineItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Intersection Observer for timeline items
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // What's New Swiper Carousel
    const whatsNewSwiper = new Swiper('.whats-new-carousel', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000, // 4 seconds
            disableOnInteraction: false,
        },
        pagination: {
            el: '.whats-new-nav',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + ' whats-new-nav-item"></span>';
            },
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Add hover effect to pause autoplay for What's New carousel
    const swiperContainer = document.querySelector('.whats-new-carousel');
    swiperContainer.addEventListener('mouseenter', function() {
        whatsNewSwiper.autoplay.stop();
    });
    swiperContainer.addEventListener('mouseleave', function() {
        whatsNewSwiper.autoplay.start();
    });

    // Fashion Fusion Gallery functionality
    const whatsNewSection = document.querySelector('.whats-new');
    const fashionFusionGallery = document.querySelector('.fashion-fusion-gallery');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryOverlay = document.querySelector('.gallery-overlay');
    const overlayContent = document.querySelector('.overlay-content');
    const closeOverlay = document.querySelector('.close-overlay');

    // Set initial styles for the Fashion Fusion Gallery
    fashionFusionGallery.style.transform = 'translateY(100%)';
    fashionFusionGallery.style.transition = 'transform 0.5s ease-out';

    // Reveal effect
    function revealGallery() {
        const whatsNewBottom = whatsNewSection.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (whatsNewBottom < windowHeight) {
            const translateY = Math.max(0, 100 - (windowHeight - whatsNewBottom) / 2);
            fashionFusionGallery.style.transform = `translateY(${translateY}%)`;
        }
    }

    // Throttle function to limit the frequency of function calls
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Add scroll event listener with throttling
    window.addEventListener('scroll', throttle(revealGallery, 50));

    // Gallery item click event
    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('item-link')) {
                e.preventDefault();
                const title = item.querySelector('h3').textContent;
                const description = item.querySelector('p').textContent;
                const image = item.querySelector('img').src;
                const tags = Array.from(item.querySelectorAll('.item-tags span')).map(tag => tag.textContent);

                overlayContent.innerHTML = `
                    <h3>${title}</h3>
                    <img src="${image}" alt="${title}" style="max-width: 100%; border-radius: 10px; margin-bottom: 1rem;">
                    <p>${description}</p>
                    <div class="overlay-tags">${tags.map(tag => `<span>${tag}</span>`).join('')}</div>
                    <button class="close-overlay">Close</button>
                `;

                galleryOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close overlay
    galleryOverlay.addEventListener('click', (e) => {
        if (e.target === galleryOverlay || e.target.classList.contains('close-overlay')) {
            galleryOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add animation to gallery items
    const galleryAppearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };

    const galleryAppearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, galleryAppearOptions);

    galleryItems.forEach(item => {
        item.classList.add('fade-in');
        galleryAppearOnScroll.observe(item);
    });
});
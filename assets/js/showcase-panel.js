// const featureItems = document.querySelectorAll('.feature-item');
// const showcaseContents = document.querySelectorAll('.showcase-content');
// const featuresWrapper = document.querySelector('.showcase-panel'); // Parent container
// let currentIndex = 0;

// function updateActive(index) {
//     // Remove active classes
//     featureItems.forEach(item => item.classList.remove('active'));
//     showcaseContents.forEach(content => content.classList.remove('active'));

//     // Add active classes to current index
//     featureItems[index].classList.add('active');
//     showcaseContents[index].classList.add('active');

//     // Change the background image of the parent element based on the active child content
//     const activeContent = showcaseContents[index];
//     const contentBackgroundImage = activeContent.getAttribute('data-background-image');

//     if (contentBackgroundImage) {
//         featuresWrapper.style.backgroundImage = `url(${contentBackgroundImage})`;
//     }
// }

// // Initialize with the first content active
// updateActive(currentIndex);

// // Add hover handlers to change content on mouseover
// featureItems.forEach((item, index) => {
//     item.addEventListener('mouseenter', () => {
//         currentIndex = index;
//         updateActive(currentIndex);
//     });
// });

// // Optional: Add click handlers for manual selection if you still need them
// featureItems.forEach((item, index) => {
//     item.addEventListener('click', () => {
//         currentIndex = index;
//         updateActive(currentIndex);
//     });
// });


document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let isAnimating = false;

    function updateSlide(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const nextSlide = (currentSlide + direction + slides.length) % slides.length;
        const current = slides[currentSlide];
        const next = slides[nextSlide];

        // Set initial states
        gsap.set(next, { visibility: 'visible' });
        
        // Create timeline for smooth transition
        const tl = gsap.timeline({
            onComplete: () => {
                current.classList.remove('active');
                next.classList.add('active');
                gsap.set(current, { visibility: 'hidden' });
                currentSlide = nextSlide;
                isAnimating = false;
            }
        });

        // Animate out current slide
        tl.to(current.querySelector('.main-content'), {
            opacity: 0,
            y: 50,
            duration: 0.5,
            ease: 'power2.inOut'
        })
        .to(current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut'
        }, '-=0.3');

        // Animate in next slide
        tl.fromTo(next, 
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.inOut'
            },
            '-=0.3'
        )
        .fromTo(next.querySelector('.main-content'),
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            },
            '-=0.2'
        );
    }

    // Event listeners for navigation
    prevBtn.addEventListener('click', () => updateSlide(-1));
    nextBtn.addEventListener('click', () => updateSlide(1));

    // Initial animation
    gsap.from('.header', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.main-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') updateSlide(-1);
        if (e.key === 'ArrowRight') updateSlide(1);
    });
});
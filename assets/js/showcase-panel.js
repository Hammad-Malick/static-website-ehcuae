const featureItems = document.querySelectorAll('.feature-box');
const showcaseContents = document.querySelectorAll('.showcase-content');
const featuresWrapper = document.querySelector('.showcase-panel'); // Parent container
let currentIndex = 0;
let interval;

function updateActive(index) {
    // Remove active classes
    featureItems.forEach(item => item.classList.remove('active'));
    showcaseContents.forEach(content => content.classList.remove('active'));

    // Add active classes to current index
    featureItems[index].classList.add('active');
    showcaseContents[index].classList.add('active');

    // Change the background image of the parent element based on the active child content
    const activeContent = showcaseContents[index];
    const contentBackgroundImage = activeContent.getAttribute('data-background-image'); // Assuming each content has a 'data-background-image' attribute

    if (contentBackgroundImage) {
        featuresWrapper.style.backgroundImage = `url(${contentBackgroundImage})`; // Change parent background image
    }
}

function autoRotate() {
    currentIndex = (currentIndex + 1) % featureItems.length;
    updateActive(currentIndex);
}

// Start auto-rotation
interval = setInterval(autoRotate, 3000);

// Add click handlers for manual selection
featureItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = index;
        updateActive(currentIndex);
        interval = setInterval(autoRotate, 3000);
    });
});

// Pause auto-rotation on hover
featuresWrapper.addEventListener('mouseenter', () => {
    clearInterval(interval);
});

// Resume auto-rotation when mouse leaves
featuresWrapper.addEventListener('mouseleave', () => {
    interval = setInterval(autoRotate, 3000);
});

const featureItems = document.querySelectorAll('.feature-item');
const showcaseContents = document.querySelectorAll('.showcase-content');
const featuresWrapper = document.querySelector('.showcase-panel'); // Parent container
let currentIndex = 0;

function updateActive(index) {
    // Remove active classes
    featureItems.forEach(item => item.classList.remove('active'));
    showcaseContents.forEach(content => content.classList.remove('active'));

    // Add active classes to current index
    featureItems[index].classList.add('active');
    showcaseContents[index].classList.add('active');

    // Change the background image of the parent element based on the active child content
    const activeContent = showcaseContents[index];
    const contentBackgroundImage = activeContent.getAttribute('data-background-image');

    if (contentBackgroundImage) {
        featuresWrapper.style.backgroundImage = `url(${contentBackgroundImage})`;
    }
}

// Initialize with the first content active
updateActive(currentIndex);

// Add hover handlers to change content on mouseover
featureItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        currentIndex = index;
        updateActive(currentIndex);
    });
});

// Optional: Add click handlers for manual selection if you still need them
featureItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        updateActive(currentIndex);
    });
});

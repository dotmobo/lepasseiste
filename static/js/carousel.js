document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const prevButton = carousel.querySelector('.carousel-control-prev');
    const nextButton = carousel.querySelector('.carousel-control-next');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    let currentIndex = 0;
    let intervalId;

    // Function to show a specific item
    function showItem(index) {
        const oldIndex = currentIndex; // Store the current index

        carouselItems[oldIndex].classList.remove('active');
        if (indicatorsContainer.children[oldIndex]) {
            indicatorsContainer.children[oldIndex].classList.remove('active'); // Remove active class from old indicator
            indicatorsContainer.children[oldIndex].setAttribute('aria-selected', 'false');
        }

        currentIndex = (index + carouselItems.length) % carouselItems.length;

        carouselItems[currentIndex].classList.add('active');
        if (indicatorsContainer.children[currentIndex]) {
            indicatorsContainer.children[currentIndex].classList.add('active'); // Add active class to new indicator
            indicatorsContainer.children[currentIndex].setAttribute('aria-selected', 'true');
        }
    }

    // Function to show the next item
    function showNextItem() {
        showItem(currentIndex + 1);
    }

    // Function to show the previous item
    function showPrevItem() {
        showItem(currentIndex - 1);
    }

    // Create indicators
    carouselItems.forEach((item, index) => {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', `carousel-item-${index}`);
        button.setAttribute('aria-label', `Aller à la diapositive ${index + 1}`);
        if (index === 0) {
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
        } else {
            button.setAttribute('aria-selected', 'false');
        }
        button.addEventListener('click', () => {
            resetInterval();
            showItem(index);
        });
        indicatorsContainer.appendChild(button);
        item.setAttribute('id', `carousel-item-${index}`); // Add ID for aria-controls
    });

    // Event listeners for buttons
    prevButton.addEventListener('click', () => {
        resetInterval();
        showPrevItem();
    });

    nextButton.addEventListener('click', () => {
        resetInterval();
        showNextItem();
    });

    // Auto-play functionality
    function startInterval() {
        intervalId = setInterval(showNextItem, 3000);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    startInterval(); // Start auto-play on load
});
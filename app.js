// Hamburger menu toggle (make sure selectors match your HTML)
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header'); // changed from '.header.container' assuming 'header' is class only

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobile_menu.classList.toggle('active');
});

menu_item.forEach(item => {
  item.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
  });
});


// Carousel scroll logic - single DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.service-items-container');
  const itemsContainer = document.querySelector('.service-items');
  const items = document.querySelectorAll('.service-item');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');

  // These values should match your CSS exactly
  const itemWidth = 180; 
  const gap = 10; 

  let currentPosition = 0;
  let visibleItems = Math.floor(container.clientWidth / (itemWidth + gap));
  let maxPosition = items.length - visibleItems;

  // Show/hide buttons based on position
  function updateButtons() {
    prevBtn.classList.toggle('hidden', currentPosition <= 0);
    nextBtn.classList.toggle('hidden', currentPosition >= maxPosition);
  }

  // Scroll to calculated position
  function scrollToPosition() {
    const scrollAmount = currentPosition * (itemWidth + gap);
    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  // Button click handlers
  nextBtn.addEventListener('click', () => {
    if (currentPosition < maxPosition) {
      currentPosition++;
      scrollToPosition();
    }
    updateButtons();
  });

  prevBtn.addEventListener('click', () => {
    if (currentPosition > 0) {
      currentPosition--;
      scrollToPosition();
    }
    updateButtons();
  });

  // Update on window resize
  window.addEventListener('resize', () => {
    visibleItems = Math.floor(container.clientWidth / (itemWidth + gap));
    maxPosition = items.length - visibleItems;
    if (currentPosition > maxPosition) currentPosition = maxPosition;
    scrollToPosition();
    updateButtons();
  });

  // Initial button update
  updateButtons();

  // Optional touch support for swipe on mobile
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});

  function handleSwipe() {
    const difference = touchStartX - touchEndX;
    if (difference > 50) { // swipe left
      if (currentPosition < maxPosition) {
        currentPosition++;
        scrollToPosition();
      }
    } else if (difference < -50) { // swipe right
      if (currentPosition > 0) {
        currentPosition--;
        scrollToPosition();
      }
    }
    updateButtons();
  }
});

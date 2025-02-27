// Get the slideshow elements
const slideshow = document.getElementById('slideshow');
const slides = document.querySelectorAll('.slide');
const prevSlide = document.querySelector('.prev-slide');
const nextSlide = document.querySelector('.next-slide');
const indicators = document.querySelectorAll('.indicator');

// Set the current slide index
let currentSlideIndex = 0;

// Function to show the next slide
function showNextSlide() {
  currentSlideIndex++;
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }
  showSlide(currentSlideIndex);
}

// Function to show the previous slide
function showPrevSlide() {
  currentSlideIndex--;
  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  showSlide(currentSlideIndex);
}

// Function to show a slide
function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => {
    slide.style.display = 'none';
  });

  // Show the current slide
  slides[index].style.display = 'block';

  // Update the indicators
  indicators.forEach((indicator, i) => {
    if (i === index) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Add event listeners to the prev and next buttons
prevSlide.addEventListener('click', showPrevSlide);
nextSlide.addEventListener('click', showNextSlide);

// Add event listeners to the indicators
indicators.forEach((indicator, i) => {
  indicator.addEventListener('click', () => {
    showSlide(i);
  });
});

// Show the first slide
showSlide(0);

// Set up the autoplay
setInterval(showNextSlide, 3000); // Change the interval time as needed

// ========================== Preloader ==============================

// Set the minimum time 
const minimumDisplayTime = 100;
let isPageLoaded = false;

// Delay promise that resolves after the minimum display time
const delay = new Promise(resolve => setTimeout(resolve, minimumDisplayTime));

// Listen for the page load event
window.addEventListener("load", () => {
  isPageLoaded = true;
});

// Wait for both the delay and the page load event to complete
Promise.all([delay, new Promise(resolve => {
  if (isPageLoaded) resolve();
  else window.addEventListener("load", resolve);
})]).then(() => {
  document.getElementById("preloader").style.display = "none";
  const mainContent = document.getElementById("mainContent");
  mainContent.style.display = "block";

  console.log("Main content is now visible. Initializing ScrollMagic...");

  // Initialize ScrollMagic explicitly after the content is fully visible
  initializeHorizontalScroll();
});


// ========================== Tech Bug ==============================
document.addEventListener("DOMContentLoaded", () => {
  const techBugSection = document.querySelector('.tech-bug');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        techBugSection.classList.add('animate');
        observer.unobserve(techBugSection);
      }
    });
  }, {
    threshold: 0.5 
  });

  observer.observe(techBugSection);
});

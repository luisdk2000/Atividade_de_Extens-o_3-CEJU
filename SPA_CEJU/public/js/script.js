// Define o helper jsonParse
Handlebars.registerHelper('jsonParse', function(jsonString) {
    return JSON.parse(jsonString);
});
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileBtn = document.querySelector('#mobile-btn');
  if (mobileBtn) {
      mobileBtn.addEventListener('click', function() {
          const mobileMenu = document.querySelector('#mobile-menu');
          if (mobileMenu) {
              mobileMenu.classList.toggle('active');
              const icon = mobileBtn.querySelector('i');
              if (icon) {
                  icon.classList.toggle('fa-x');
                  icon.classList.toggle('fa-bars');
              }
          }
      });
  }
},

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = carousel.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
  
    let currentIndex = 0;
  
    function moveToSlide(index) {
      const slideWidth = slides[0].clientWidth;
      const offset = -index * slideWidth;
      carousel.style.transform = `translateX(${offset}px)`;
      currentIndex = index;
    }
  
    prevBtn.addEventListener('click', function() {
      if (currentIndex === 0) {
        currentIndex = slides.length - 1;
      } else {
        currentIndex--;
      }
      moveToSlide(currentIndex);
    });
  
    nextBtn.addEventListener('click', function() {
      if (currentIndex === slides.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      moveToSlide(currentIndex);
    });
  
    // Opcional: Mudança automática de slides
    // setInterval(function() {
    //   if (currentIndex === slides.length - 1) {
    //     currentIndex = 0;
    //   } else {
    //     currentIndex++;
    //   }
    //   moveToSlide(currentIndex);
    // }, 5000); // Altera os slides a cada 5 segundos
  }))
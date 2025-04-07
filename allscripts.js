function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - 100;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  document.querySelector('.discover-btn').addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll('#articles', 1500);
  });

  const phrases = [
    "công nghệ", 
    "kinh tế", 
    "xã hội", 
    "văn hóa", 
    "giải trí", 
    "các xu hướng đột phá toàn cầu"
  ];

  const typewriterElement = document.getElementById("typewriter-text");
  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100; 
  const pauseBetween = 2000; 

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting) {

      typewriterElement.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
      if (letterIndex === currentPhrase.length) {
        setTimeout(() => { 
          isDeleting = true;
          type();
        }, pauseBetween);
        return;
      }
    } else {

      typewriterElement.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
      if (letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    const currentSpeed = isDeleting ? typingSpeed / 2 : typingSpeed;
    setTimeout(type, currentSpeed);
  }

  document.addEventListener("DOMContentLoaded", type);

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const hamburger = document.querySelector('.hamburger');

  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });

  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  function updateDateTime() {
    const now = new Date();
    const options = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    };
    document.getElementById('current-time').textContent = now.toLocaleTimeString('vi-VN', options);
  }

  async function getWeather(coords) {
    try {
      const API_KEY = "c65dc3d2c9d9d8e18f9ec9a124c502f7"; 
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric&lang=vi`
      );
      const data = await response.json();
      
      document.getElementById('location').textContent = data.name;
      document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    } catch (error) {
      console.error('Lỗi tải thời tiết:', error);
      document.getElementById('temperature').textContent = '--°C';
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          getWeather(position.coords);
        },
        error => {
          console.error('Lỗi định vị:', error);
          document.getElementById('location').textContent = 'Vị trí ẩn';
          document.getElementById('temperature').textContent = '--°C';
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      document.getElementById('location').textContent = 'Không hỗ trợ định vị';
    }
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
  getLocation();
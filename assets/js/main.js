// ===================================
// MAIN JAVASCRIPT - KITESURFING SCHOOL
// ===================================

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = document.getElementById('themeIcon');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    localStorage.setItem('theme', newTheme);
    htmlElement.setAttribute('data-theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

// RTL Toggle Functionality
const rtlToggle = document.getElementById('rtlToggle');

// Check for saved RTL preference
const currentDir = localStorage.getItem('dir') || 'ltr';
htmlElement.setAttribute('dir', currentDir);
updateRtlButton(currentDir);

if (rtlToggle) {
  rtlToggle.addEventListener('click', () => {
    const dir = htmlElement.getAttribute('dir');
    const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
    
    htmlElement.setAttribute('dir', newDir);
    localStorage.setItem('dir', newDir);
    updateRtlButton(newDir);
  });
}

function updateRtlButton(dir) {
  if (rtlToggle) {
    rtlToggle.textContent = dir === 'ltr' ? 'RTL' : 'LTR'; // Toggle between Text
  }
}

function updateThemeIcon(theme) {
  if (themeIcon) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}

// ===================================
// MOBILE NAVIGATION
// ===================================

const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
  // We let Bootstrap handle the toggle button natively via data-bs-toggle
  // But we still want to close the menu when clicking outside or on a link

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
      navbarCollapse.classList.remove('show');
    }
  });

  // Close mobile menu when clicking a nav link (but NOT for dropdown toggles)
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle), .dropdown-item');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        // Use Bootstrap's collapse method if available, otherwise fallback to class removal
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
}

// ===================================
// ACTIVE PAGE HIGHLIGHTING
// ===================================

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
    link.classList.add('active');
  }
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.card, .stat-card, .pricing-card, .testimonial-card, .gallery-item');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// ===================================
// SMOOTH SCROLL TO SECTIONS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===================================
// FORM VALIDATION
// ===================================

const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      const errorElement = input.nextElementSibling;
      
      // Remove previous error state
      input.classList.remove('error');
      if (errorElement && errorElement.classList.contains('form-error')) {
        errorElement.style.display = 'none';
      }
      
      // Validate input
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
        if (errorElement && errorElement.classList.contains('form-error')) {
          errorElement.textContent = 'This field is required';
          errorElement.style.display = 'block';
        }
      } else if (input.type === 'email' && !isValidEmail(input.value)) {
        isValid = false;
        input.classList.add('error');
        if (errorElement && errorElement.classList.contains('form-error')) {
          errorElement.textContent = 'Please enter a valid email address';
          errorElement.style.display = 'block';
        }
      } else if (input.type === 'tel' && !isValidPhone(input.value)) {
        isValid = false;
        input.classList.add('error');
        if (errorElement && errorElement.classList.contains('form-error')) {
          errorElement.textContent = 'Please enter a valid phone number';
          errorElement.style.display = 'block';
        }
      }
    });
    
    if (isValid) {
      showSuccessMessage(form);
      form.reset();
    }
  });
  
  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        this.classList.add('error');
      } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
        this.classList.add('error');
      } else {
        this.classList.remove('error');
      }
    });
    
    input.addEventListener('input', function() {
      if (this.classList.contains('error') && this.value.trim()) {
        this.classList.remove('error');
        const errorElement = this.nextElementSibling;
        if (errorElement && errorElement.classList.contains('form-error')) {
          errorElement.style.display = 'none';
        }
      }
    });
  });
});

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidPhone(phone) {
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showSuccessMessage(form) {
  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success mt-3';
  successDiv.style.cssText = 'padding: 1rem; background-color: #d1fae5; color: #065f46; border-radius: 0.5rem; margin-top: 1rem;';
  successDiv.innerHTML = '<strong>Success!</strong> Your message has been sent. We\'ll get back to you soon!';
  
  form.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// ===================================
// BOOKING FILTERS
// ===================================

const skillFilter = document.getElementById('skillFilter');
const windFilter = document.getElementById('windFilter');
const lessonCards = document.querySelectorAll('.lesson-card');

if (skillFilter) {
  skillFilter.addEventListener('change', filterLessons);
}

if (windFilter) {
  windFilter.addEventListener('change', filterLessons);
}

function filterLessons() {
  const selectedSkill = skillFilter ? skillFilter.value : 'all';
  const selectedWind = windFilter ? windFilter.value : 'all';
  
  lessonCards.forEach(card => {
    const cardSkill = card.getAttribute('data-skill');
    const cardWind = card.getAttribute('data-wind');
    
    const skillMatch = selectedSkill === 'all' || cardSkill === selectedSkill;
    const windMatch = selectedWind === 'all' || cardWind === selectedWind;
    
    if (skillMatch && windMatch) {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

// ===================================
// GALLERY LIGHTBOX (Simple)
// ===================================

const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', function() {
    const src = this.src;
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 8px;';
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', () => {
      lightbox.remove();
    });
  });
});

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + (element.getAttribute('data-suffix') || '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (element.getAttribute('data-suffix') || '');
    }
  }, 16);
}

const statNumbers = document.querySelectorAll('.stat-number[data-count]');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      animateCounter(entry.target);
      entry.target.classList.add('counted');
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
  statsObserver.observe(stat);
});

// ===================================
// STICKY NAVBAR ON SCROLL
// ===================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
  }
  
  lastScroll = currentScroll;
});

// ===================================
// BOOKING CALENDAR DATE SELECTION
// ===================================

const calendarDays = document.querySelectorAll('.calendar-day');

calendarDays.forEach(day => {
  day.addEventListener('click', function() {
    calendarDays.forEach(d => d.classList.remove('selected'));
    this.classList.add('selected');
    
    const date = this.querySelector('.day-number').textContent;
    const windCondition = this.classList.contains('low') ? 'Low Wind' :
                         this.classList.contains('medium') ? 'Medium Wind' : 'High Wind';
    
    console.log(`Selected: Day ${date} - ${windCondition}`);
  });
});

// ===================================
// TESTIMONIAL SLIDER (Simple)
// ===================================

const testimonialContainer = document.querySelector('.testimonial-slider');
if (testimonialContainer) {
  let currentTestimonial = 0;
  const testimonials = testimonialContainer.querySelectorAll('.testimonial-card');
  
  if (testimonials.length > 1) {
    // Hide all except first
    testimonials.forEach((t, index) => {
      if (index !== 0) t.style.display = 'none';
    });
    
    // Auto rotate every 5 seconds
    setInterval(() => {
      testimonials[currentTestimonial].style.display = 'none';
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      testimonials[currentTestimonial].style.display = 'block';
    }, 5000);
  }
}

// ===================================
// CONSOLE INFO
// ===================================

console.log('%c🏄 Kitesurfing School Template', 'font-size: 20px; color: #0ea5e9; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, JavaScript, Bootstrap 5, and Tailwind CSS', 'color: #64748b;');
console.log('%cReady for deployment! 🚀', 'color: #10b981; font-weight: bold;');

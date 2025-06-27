// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(currentTheme + '-theme');

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const phrases = [
  'Computer Science Student',
  'AI/ML Enthusiast',
  'Data Science Explorer',
  'Cybersecurity Learner',
  'Python Developer',
  'Problem Solver'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; // Pause before next phrase
  }
  
  setTimeout(typeEffect, typeSpeed);
}

// Start typing animation
typeEffect();

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop;
  
  // Add background to navbar when scrolling
  if (scrollTop > 50) {
    navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    if (body.classList.contains('light-theme')) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
  } else {
    navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    if (body.classList.contains('light-theme')) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
  }
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      
      // Animate skill progress bars
      if (entry.target.classList.contains('skill-item')) {
        const skillLevel = entry.target.getAttribute('data-skill');
        const progressBar = entry.target.querySelector('.skill-fill');
        if (progressBar) {
          setTimeout(() => {
            progressBar.style.width = skillLevel + '%';
          }, 200);
        }
      }
      
      // Animate counters when hero section is visible
      if (entry.target.classList.contains('hero')) {
        setTimeout(animateCounters, 500);
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .timeline-item, .skill-item, .hero').forEach(el => {
  observer.observe(el);
});

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(this);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // Simulate form submission
  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = 'var(--success)';
    
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      this.reset();
      
      // Show success message
      showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    }, 2000);
  }, 1500);
});

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
    <span>${message}</span>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-left: 4px solid ${type === 'success' ? 'var(--success)' : 'var(--primary)'};
    color: var(--text);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px var(--shadow);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0;
    margin-left: auto;
  `;
  
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.particle');
  
  parallaxElements.forEach((element, index) => {
    const speed = (index + 1) * 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Add CSS for loading state
  const style = document.createElement('style');
  style.textContent = `
    body:not(.loaded) {
      overflow: hidden;
    }
    
    body:not(.loaded)::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--bg);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    body:not(.loaded)::after {
      content: '';
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      border: 3px solid var(--border);
      border-top: 3px solid var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      z-index: 10001;
    }
    
    @keyframes spin {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});

// Add CSS for mobile menu
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: 80px;
      left: 0;
      width: 100%;
      background: var(--bg);
      border-top: 1px solid var(--border);
      flex-direction: column;
      padding: 2rem 0;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
    }
    
    .nav-links.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .nav-links li {
      margin: 0.5rem 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
`;
document.head.appendChild(mobileMenuStyle);

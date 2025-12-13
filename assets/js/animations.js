/**
 * Transformation Cluster - Animation Controller
 * Handles scroll-triggered animations using Intersection Observer
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    threshold: 0.1,        // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px'  // Start slightly before element enters viewport
  };

  /**
   * Initialize scroll animations
   */
  function initScrollAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      const elements = document.querySelectorAll('.animate-on-scroll, .fade-in-left, .fade-in-right, .scale-in');
      elements.forEach(el => el.classList.add('animated'));
      return;
    }

    // Create observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animated class when element enters viewport
          entry.target.classList.add('animated');
          
          // Optional: unobserve after animation (one-time animation)
          // observer.unobserve(entry.target);
        }
      });
    }, config);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .fade-in-left, .fade-in-right, .scale-in'
    );

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Add scrolled class to header for shadow effect
   */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Skip if it's just "#"
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Update URL without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  /**
   * Add active class to current nav link
   */
  function initActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.page-link');
    
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Initialize ripple effect on buttons
   */
  function initRippleEffect() {
    const rippleButtons = document.querySelectorAll('.ripple-effect');
    
    rippleButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /**
   * Lazy load images
   */
  function initLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }
          
          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  /**
   * Add staggered animation delays to grid items
   */
  function initStaggeredGrids() {
    const grids = document.querySelectorAll('.team-grid, .projects-grid');
    
    grids.forEach(grid => {
      const items = grid.children;
      
      Array.from(items).forEach((item, index) => {
        // Add class if not already present
        if (!item.classList.contains('animate-on-scroll')) {
          item.classList.add('animate-on-scroll');
        }
        
        // Set custom delay based on index
        item.style.transitionDelay = `${index * 0.1}s`;
      });
    });
  }

  /**
   * Initialize all animations and interactions
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Initialize features
    initScrollAnimations();
    initHeaderScroll();
    initSmoothScroll();
    initActiveNav();
    initRippleEffect();
    initLazyLoading();
    initStaggeredGrids();

    // Log initialization
    console.log('✨ Animations initialized');
  }

  // Start initialization
  init();

})();

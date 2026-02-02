document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Search icon click handler
  const searchIcon = document.querySelector('.search-icon');
  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      console.log('Search clicked');
      // Add your search functionality here
    });
  }

  // Subscribe form handler
  const subscribeForm = document.getElementById('subscribeForm');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      
      if (!email) {
        alert('Please enter a valid email');
        return;
      }

      const btn = subscribeForm.querySelector('.btn-send');
      const originalSvg = btn.innerHTML;
      btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12m-1.4 1.4L9 19 21 7"></path></svg>';
      btn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        subscribeForm.reset();
        btn.innerHTML = originalSvg;
        btn.disabled = false;
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
          position: fixed;
          top: 100px;
          right: 20px;
          background: #10b981;
          color: white;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          font-size: 14px;
          z-index: 9999;
          animation: slideIn 0.3s ease-out;
        `;
        successMsg.textContent = 'Subscribed successfully!';
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
          successMsg.style.animation = 'slideOut 0.3s ease-out';
          setTimeout(() => successMsg.remove(), 300);
        }, 3000);
      }, 600);
    });
  }

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideOut {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }
  `;
  document.head.appendChild(style);

  // Intersection Observer for scroll animations
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

  document.querySelectorAll('.feature, .instruction-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Header background on scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
    } else {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
  });

  // Mobile menu toggle (if needed)
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      const nav = document.querySelector('.main-nav');
      nav.classList.toggle('active');
    });
  }
});

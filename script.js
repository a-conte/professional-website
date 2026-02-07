// Generate random stars for the animated background
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 100;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = `star ${['small', 'medium', 'large'][Math.floor(Math.random() * 3)]}`;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        fragment.appendChild(star);
    }

    starsContainer.appendChild(fragment);
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Navigation click handlers for smooth scrolling
function initNavigation() {
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Scroll to top helper
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile menu toggle handler
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    mobileMenuToggle?.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
        const isOpen = nav.classList.contains('mobile-open');
        mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    });
}

// Back to top button visibility
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) {
        return;
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// Loading screen removal
function initLoadingScreen() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            document.querySelector('.loading-screen')?.remove();
        }, 500);
    });
}

// Hook for external link tracking (optional)
function initExternalLinkTracking() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', () => {
            // Reserved for analytics tracking
        });
    });
}

// Add floating animation to geometric shapes
function animateGeometry() {
    const shapes = document.querySelectorAll('.geometric-shape');
    shapes.forEach((shape, index) => {
        // Add subtle floating animation with different delays
        shape.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite alternate`;
        shape.style.animationDelay = `${index * 0.3}s`;
    });
}

// CSS animation for floating shapes
function addFloatingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
            100% { transform: translateY(-10px) rotate(var(--rotation, 0deg)); }
        }
    `;
    document.head.appendChild(style);
}

// Add parallax effect to background elements
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.geometric-shape');

        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform += ` translateY(${yPos}px)`;
        });
    });
}

// Enhanced star twinkling effect
function enhanceStarEffects() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        // Add random twinkling intervals for more natural effect
        const randomDelay = Math.random() * 5;
        const randomDuration = 2 + Math.random() * 3;
        star.style.animationDelay = randomDelay + 's';
        star.style.animationDuration = randomDuration + 's';
    });
}

// Add loading animation
function addLoadingAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    createStars();
    initScrollAnimations();
    initNavigation();
    initMobileMenu();
    initBackToTop();
    initLoadingScreen();
    initExternalLinkTracking();

    // Enhanced effects
    addFloatingAnimation();
    animateGeometry();
    enhanceStarEffects();
    addLoadingAnimation();

    // Optional: Add parallax (comment out if performance is an issue)
    // initParallax();

});

// Export functions for potential external use
window.portfolioFunctions = {
    scrollToSection,
    scrollToTop,
    createStars,
    initScrollAnimations
};

window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;

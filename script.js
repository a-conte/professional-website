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
        
        // Randomize animation delays and durations for natural twinkling effect
        const randomDelay = Math.random() * 5;
        const randomDuration = 2 + Math.random() * 3;
        star.style.animationDelay = randomDelay + 's';
        star.style.animationDuration = randomDuration + 's';
        
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
    animateGeometry();
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

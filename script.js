// Generate random stars for the animated background
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;

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

// Smooth scrolling function with focus management
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        // Focus the target section for accessibility, then restore natural tab order
        element.setAttribute('tabindex', '-1');
        element.focus({ preventScroll: true });
        element.addEventListener('blur', () => element.removeAttribute('tabindex'), { once: true });
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

// Navigation — event delegation on nav element
function initNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    nav.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);

        // Close mobile menu after navigation
        if (nav.classList.contains('mobile-open')) {
            nav.classList.remove('mobile-open');
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
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
    if (!mobileMenuToggle || !nav) return;

    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
        const isOpen = nav.classList.contains('mobile-open');
        mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('mobile-open')) {
            nav.classList.remove('mobile-open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.focus();
        }
    });
}

// Back to top button visibility — IntersectionObserver instead of scroll listener
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    // Create a sentinel element at 300px from top
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:300px;width:1px;height:1px;pointer-events:none;';
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When sentinel scrolls out of view (user scrolled past 300px), show button
            if (!entry.isIntersecting) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }, { threshold: 0 });

    observer.observe(sentinel);

    // Wire up click handler (moved from inline onclick)
    backToTop.addEventListener('click', scrollToTop);
}

// Wire up learn-more button (moved from inline onclick)
function initLearnMore() {
    const btn = document.querySelector('.learn-more-btn');
    if (btn) {
        btn.addEventListener('click', () => scrollToSection('about'));
    }
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

// Add floating animation to geometric shapes
function animateGeometry() {
    const shapes = document.querySelectorAll('.geometric-shape');
    shapes.forEach((shape, index) => {
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
    initLearnMore();
    initLoadingScreen();

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

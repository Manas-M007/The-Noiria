// Animations JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll animation
    const scroll = new SmoothScroll('a[href*="#"]', {
        speed: 800,
        speedAsDuration: true,
        offset: 80,
        easing: 'easeInOutCubic'
    });
    
    // Parallax effect for hero section
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroVideo.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    }
    
    // Text animation on hero section
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        // Trigger animation after a short delay
        setTimeout(function() {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-header, .product-card, .story-image, .story-content, .experience-card, .newsletter-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('in-view');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Then run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Micro-interactions for buttons
    const buttons = document.querySelectorAll('.button, .product-button, .hero-cta, .story-link, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Currency formatting
    const priceElements = document.querySelectorAll('.product-price');
    
    priceElements.forEach(element => {
        const price = parseFloat(element.textContent.replace('₹', '').replace(',', ''));
        element.textContent = '₹' + price.toLocaleString('en-IN');
    });
});
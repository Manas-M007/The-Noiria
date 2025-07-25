// Product Interaction JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Product hover effect - 3D tilt
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productImage = card.querySelector('.product-image');
        
        card.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            productImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        card.addEventListener('mouseenter', function() {
            productImage.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', function() {
            productImage.style.transition = 'transform 0.5s ease';
            productImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    });
    
    // Product expanded view
    const discoverBtns = document.querySelectorAll('.discover-btn');
    const closeExpandedBtns = document.querySelectorAll('.close-expanded');
    const expandedViews = document.querySelectorAll('.product-expanded');
    
    discoverBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            expandedViews[index].classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeExpandedBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.product-expanded').classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close expanded view when clicking outside
    expandedViews.forEach(view => {
        view.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});
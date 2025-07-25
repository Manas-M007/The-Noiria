// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 600);
        }, 1000);
    });
    
    // Navigation
    const navbar = document.querySelector('.navbar');
    const navMenuBtn = document.querySelector('.nav-menu');
    const navLinks = document.querySelector('.nav-links');
    const navCartBtn = document.querySelector('.nav-cart');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCartBtn = document.querySelector('.close-cart');
    
    // Toggle mobile menu
    navMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Toggle cart sidebar
    navCartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate when in view
    document.querySelectorAll('.section-header, .product-card, .story-image, .story-content, .experience-card, .newsletter-content').forEach(element => {
        observer.observe(element);
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your server
                console.log('Subscribed email:', email);
                alert('Thank you for subscribing to NOIRIA. Welcome to our world of luxury chocolates.');
                emailInput.value = '';
            }
        });
    }
    
    // Checkout functionality
    const checkoutBtn = document.querySelector('.checkout-btn');
    const checkoutModal = document.querySelector('.checkout-modal');
    const checkoutOverlay = document.querySelector('.checkout-overlay');
    const closeCheckoutBtn = document.querySelector('.close-checkout');
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            checkoutModal.classList.add('active');
            checkoutOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener('click', closeCheckout);
    }
    
    if (checkoutOverlay) {
        checkoutOverlay.addEventListener('click', closeCheckout);
    }
    
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', closeCheckout);
    }
    
    function closeCheckout() {
        checkoutModal.classList.remove('active');
        checkoutOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Checkout steps navigation
    const nextStepBtns = document.querySelectorAll('.next-step');
    const prevStepBtns = document.querySelectorAll('.prev-step');
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    nextStepBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = this.closest('.checkout-step');
            const nextStepNum = parseInt(currentStep.classList[1].split('-')[1]) + 1;
            const nextStep = document.querySelector(`.step-${nextStepNum}`);
            
            if (nextStep) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
                
                // Update step indicator
                document.querySelectorAll('.step').forEach(step => {
                    step.classList.remove('active');
                });
                
                document.querySelector(`.step[data-step="${nextStepNum}"]`).classList.add('active');
            }
        });
    });
    
    prevStepBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = this.closest('.checkout-step');
            const prevStepNum = parseInt(currentStep.classList[1].split('-')[1]) - 1;
            const prevStep = document.querySelector(`.step-${prevStepNum}`);
            
            if (prevStep) {
                currentStep.classList.remove('active');
                prevStep.classList.add('active');
                
                // Update step indicator
                document.querySelectorAll('.step').forEach(step => {
                    step.classList.remove('active');
                });
                
                document.querySelector(`.step[data-step="${prevStepNum}"]`).classList.add('active');
            }
        });
    });
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodType = this.getAttribute('data-method');
            
            // Update active payment method
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding payment form
            document.querySelectorAll('.payment-form').forEach(form => {
                form.style.display = 'none';
            });
            
            document.querySelector(`.${methodType}-form`).style.display = 'block';
        });
    });
    
    // Place order
    const placeOrderBtn = document.querySelector('.place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Here you would typically process the payment and submit the order
            // For demo purposes, we'll just show the confirmation step
            
            const currentStep = this.closest('.checkout-step');
            const nextStepNum = parseInt(currentStep.classList[1].split('-')[1]) + 1;
            const nextStep = document.querySelector(`.step-${nextStepNum}`);
            
            if (nextStep) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
                
                // Update step indicator
                document.querySelectorAll('.step').forEach(step => {
                    step.classList.remove('active');
                });
                
                document.querySelector(`.step[data-step="${nextStepNum}"]`).classList.add('active');
            }
        });
    }
    
    // Initialize cart functionality
    initCart();
});

// Cart functionality
function initCart() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart, .expanded-add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSubtotal = document.querySelector('.cart-subtotal');
    const cartTotal = document.querySelector('.cart-total');
    const cartItemCount = document.querySelector('.nav-cart');
    
    let cart = JSON.parse(localStorage.getItem('noiria-cart')) || [];
    let itemCount = 0;
    
    // Update cart count on page load
    updateCartCount();
    
    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card, .expanded-content');
            const product = {
                id: productCard.querySelector('.product-title').textContent,
                title: productCard.querySelector('.product-title').textContent,
                price: parseFloat(productCard.querySelector('.product-price').textContent.replace('₹', '').replace(',', '')),
                image: productCard.querySelector('.product-image').src,
                quantity: 1
            };
            
            addToCart(product);
            updateCartUI();
            
            // Close expanded view if adding from there
            const expandedView = this.closest('.product-expanded');
            if (expandedView && expandedView.classList.contains('active')) {
                expandedView.classList.remove('active');
            }
            
            // Open cart sidebar if not already open
            const cartSidebar = document.querySelector('.cart-sidebar');
            if (!cartSidebar.classList.contains('active')) {
                openCart();
            }
        });
    });
    
    // Add to cart function
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }
        
        saveCart();
        updateCartCount();
    }
    
    // Remove from cart function
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
        updateCartCount();
    }
    
    // Update quantity function
    function updateQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity = newQuantity;
            
            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else {
                saveCart();
                updateCartUI();
                updateCartCount();
            }
        }
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('noiria-cart', JSON.stringify(cart));
    }
    
    // Update cart UI
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        
        let subtotal = 0;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartSubtotal.textContent = '₹0';
            cartTotal.textContent = '₹0';
            return;
        }
        
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">₹${item.price.toLocaleString()}</p>
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="remove-item">Remove</button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
            
            // Add event listeners to quantity buttons
            const minusBtn = cartItemElement.querySelector('.minus');
            const plusBtn = cartItemElement.querySelector('.plus');
            const quantityValue = cartItemElement.querySelector('.quantity-value');
            const removeBtn = cartItemElement.querySelector('.remove-item');
            
            minusBtn.addEventListener('click', function() {
                updateQuantity(item.id, parseInt(quantityValue.textContent) - 1);
            });
            
            plusBtn.addEventListener('click', function() {
                updateQuantity(item.id, parseInt(quantityValue.textContent) + 1);
            });
            
            removeBtn.addEventListener('click', function() {
                removeFromCart(item.id);
            });
            
            subtotal += item.price * item.quantity;
        });
        
        cartSubtotal.textContent = `₹${subtotal.toLocaleString()}`;
        cartTotal.textContent = `₹${subtotal.toLocaleString()}`;
    }
    
    // Update cart count in navbar
    function updateCartCount() {
        itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartItemCount.setAttribute('data-count', itemCount > 0 ? itemCount : '');
    }
    
    // Open cart function (defined in main.js)
    function openCart() {
        document.querySelector('.cart-sidebar').classList.add('active');
        document.querySelector('.cart-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCartUI();
    }
}
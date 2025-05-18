document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
      });
  });
  
  // Hero Slider
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds
  
  // Initialize slider
  function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
  }
  
  // Next slide
  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  }
  
  // Previous slide
  function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
  }
  
  // Auto slide
  let slideTimer = setInterval(nextSlide, slideInterval);
  
  // Reset timer on interaction
  function resetTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, slideInterval);
  }
  
  // Button events
  nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
  });
  
  prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer();
  });
  
  // Pause on hover
  const sliderContainer = document.querySelector('.slider-container');
  sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(slideTimer);
  });
  
  sliderContainer.addEventListener('mouseleave', resetTimer);
  
  // Initialize first slide
  showSlide(currentSlide);

  
 
  
// Cart functionality
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalPriceElement = document.querySelector('.total-price');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Open/close cart
cartIcon.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// EVENT DELEGATION FOR ADD TO CART
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const button = e.target;
        const productCard = button.closest('.product-card');
        
        // Check if we found the product card
        if (!productCard) return;
        
        const productId = productCard.dataset.id || Date.now();
        const productTitle = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImg = productCard.querySelector('img').src;
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id == productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                title: productTitle,
                price: productPrice,
                img: productImg,
                quantity: 1
            });
        }
        
        saveCart();
        updateCart();
        
        // Animation feedback
        button.textContent = 'Added!';
        button.style.backgroundColor = '#db7093';  
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '#ffb6c1';  
        }, 1000);
    }
    
    // Handle remove from cart
    if (e.target.classList.contains('cart-item-remove') || 
       e.target.closest('.cart-item-remove')) {
        removeFromCart(e);
    }
});

// Update cart UI
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let itemCount = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalPriceElement.textContent = '$0.00';
        cartCount.textContent = '0';
        return;
    }
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">${item.price} × ${item.quantity}</p>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
        
        // Calculate total
        const price = parseFloat(item.price.replace('$', ''));
        total += price * item.quantity;
        itemCount += item.quantity;
    });
    
    // Update total and count
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = itemCount;
}

function removeFromCart(e) {
    const removeBtn = e.target.closest('.cart-item-remove');
    if (!removeBtn) return;
    
    const productId = removeBtn.dataset.id;
    cart = cart.filter(item => item.id != productId);
    saveCart();
    updateCart();
    showRemovalFeedback();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showRemovalFeedback() {
    const feedback = document.createElement('div');
    feedback.textContent = 'Item removed from cart';
    feedback.className = 'cart-feedback';
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

// Initialize cart on page load
updateCart();
  
// Beauty Tips Carousel Auto-scroll
function setupTipsCarousel() {
    const carousel = document.querySelector('.tips-carousel');
    let scrollAmount = 0;
    const scrollStep = 330; // Width of card + gap
    
    function autoScroll() {
        scrollAmount += scrollStep;
        if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = 0;
        }
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
    
    // Auto-scroll every 5 seconds
    setInterval(autoScroll, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupTipsCarousel();
    
    // Add click handlers for Instagram posts
    document.querySelectorAll('.post').forEach(post => {
        post.addEventListener('click', function() {
            // In a real implementation, this would link to Instagram
            window.open('https://www.instagram.com/sheglambeauty', '_blank');
        });
    });
}); 

  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input');
      alert(`Thank you for subscribing with ${emailInput.value}!`);
      emailInput.value = '';
  });
  
  // Quick view functionality
  const quickViewButtons = document.querySelectorAll('.quick-view');
  quickViewButtons.forEach(button => {
      button.addEventListener('click', function() {
          const productCard = this.closest('.product-card');
          const productTitle = productCard.querySelector('h3').textContent;
          const productPrice = productCard.querySelector('.price').textContent;
          const productImg = productCard.querySelector('img').src;
          
          // In a real implementation, this would open a modal with more details
          alert(`Quick View: ${productTitle}\nPrice: ${productPrice}`);
      });
  });
  
  // Video play button
  const playBtn = document.querySelector('.play-btn');
  const videoContainer = document.querySelector('.video-container video');
  
  playBtn.addEventListener('click', function() {
      if (videoContainer.paused) {
          videoContainer.play();
          this.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
          videoContainer.pause();
          this.innerHTML = '<i class="fas fa-play"></i>';
      }
  });
  
  // Add animations on scroll
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.product-card, .section-title, .video-container');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (elementPosition < screenPosition) {
              element.classList.add('fade-in');
          }
      });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});

  // Animation triggers
  document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card, .category-card').forEach(card => {
        animateOnScroll.observe(card);
    });

    // Video play button
    const playBtn = document.querySelector('.play-btn');
    const tutorialVideo = document.querySelector('.tutorial-video video');
    
    playBtn.addEventListener('click', function() {
        tutorialVideo.play();
        playBtn.style.display = 'none';
    });
    
    tutorialVideo.addEventListener('click', function() {
        if (tutorialVideo.paused) {
            tutorialVideo.play();
            playBtn.style.display = 'none';
        } else {
            tutorialVideo.pause();
            playBtn.style.display = 'flex';
        }
    });
});

   
  
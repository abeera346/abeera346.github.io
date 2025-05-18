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
   
 // Main Script for SheGlam Lip Page
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile Navigation Toggle
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            hamburger.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                this.innerHTML = navLinks.classList.contains('active') ? 
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });
            
            // Testimonial Slider
            const testimonials = document.querySelectorAll('.testimonial');
            const dots = document.querySelectorAll('.dot');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            let currentTestimonial = 0;
            
            function showTestimonial(index) {
                testimonials.forEach(testimonial => testimonial.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                testimonials[index].classList.add('active');
                dots[index].classList.add('active');
                currentTestimonial = index;
            }
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => showTestimonial(index));
            });
            
            prevBtn.addEventListener('click', () => {
                let newIndex = currentTestimonial - 1;
                if (newIndex < 0) newIndex = testimonials.length - 1;
                showTestimonial(newIndex);
            });
            
            nextBtn.addEventListener('click', () => {
                let newIndex = currentTestimonial + 1;
                if (newIndex >= testimonials.length) newIndex = 0;
                showTestimonial(newIndex);
            });
            
            // Auto-rotate testimonials
            setInterval(() => {
                let newIndex = currentTestimonial + 1;
                if (newIndex >= testimonials.length) newIndex = 0;
                showTestimonial(newIndex);
            }, 5000);
            
            // Newsletter Form Submission
            const newsletterForm = document.querySelector('.newsletter-form');
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input').value;
                if (email && email.includes('@')) {
                    alert('Thank you for subscribing to SheGlam!');
                    this.querySelector('input').value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            });
            
            // Initialize animations
            const animateElements = document.querySelectorAll('[class*="animate-"]');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        if (entry.target.classList.contains('animate-slide-up')) {
                            entry.target.style.transform = 'translateY(0)';
                        }
                        if (entry.target.classList.contains('animate-scale-in')) {
                            entry.target.style.transform = 'scale(1)';
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            animateElements.forEach(element => {
                observer.observe(element);
            });
            
            // Add hover effects to product cards
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.classList.add('hover-grow');
                });
                
                card.addEventListener('mouseleave', () => {
                    card.classList.remove('hover-grow');
                });
            });
            
            // Custom Kit Builder Implementation
            const lipProducts = [
                { id: 1, name: "Juicy Lip Gloss - Berry Pop", price: 9.99, image: "https://i.pinimg.com/736x/3d/74/b3/3d74b3e8c5d47c759eab87d1d98f98a9.jpg", popular: true },
                { id: 2, name: "Lip Plumping Serum - rose Perfect", price: 9.99, image: "https://cdn.salla.sa/DGdDlG/738bce62-01aa-4478-a7a2-4ba687ed5dae-500x500-J1uO1AyR9CxEIGt8dJyr1e7cMsTMbiDSCRsp4Jev.jpg ", popular: false },
                { id: 3, name: "Longwear Lip Stain - Rose Romance", price: 12.99, image: "https://xoxo-eg.com/cdn/shop/files/SHEGLAM-For-The-Flush-Lip-Cheek-Tint-XOXO-Beauty-C-2496.jpg?v=1740780931", popular: true },
                { id: 4, name: "Pocket friendly lip jam - Nude Vibes", price: 12.99, image: "https://static.wixstatic.com/media/28bc1a_1979a66b2b3747e7aae51df40624edaa~mv2.webp/v1/fill/w_980,h_1305,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/28bc1a_1979a66b2b3747e7aae51df40624edaa~mv2.webptps://via.placeholder.com/150?text=Nude+Stain", popular: false },
                { id: 5, name: "Precision Lip Liner - Spice", price: 8.99, image: "https://veelabeauty.com/image/cache/catalog/IMG/SHEGLAM/Sheglam-Glam-Glam-101-Lipstick-Liner-Duo-Deep-Caramel-900x900.jpg.webp ", popular: false },
                { id: 6, name: "24 hours stain lip stick - Clear", price: 18.50, image: "https://shaimabeauty.ae/cdn/shop/products/16657408860343d5f339d9fed6881afe1d4ef627cc_thumbnail_600x_4478799b-6343-436d-9626-2c503903b270.webp?v=1701415228", popular: true },
                { id: 7, name: "Hydrating Lip Balm - Pink Sugar", price: 7.99, image: "https://qasrjamal.com/cdn/shop/files/Sheglam_Jelly_Licious_Hydrating_Lip_and_Blush_Tint_-_cheerio_460x@2x.png?v=1736685868", popular: false },
                { id: 8, name: "Overnight lip mask - Berry Bliss", price: 11.99, image: "https://img.ltwebstatic.com/images3_pi/2025/01/22/d1/1737533267e7ff15d0f4a354baf6be0d01d45c6327_thumbnail_405x.webp", popular: true },
                { id: 9, name: "Lip Plumping Serum", price: 14.99, image: "https://cdn.salla.sa/DGdDlG/738bce62-01aa-4478-a7a2-4ba687ed5dae-500x500-J1uO1AyR9CxEIGt8dJyr1e7cMsTMbiDSCRsp4Jev.jpg", popular: true },
                { id: 10, name: "Lip Scrub - Sweet Mint", price: 6.99, image: "https://trb-cosmetics.com/cdn/shop/files/IMG-1381.jpg?v=1742938263&width=1080", popular: false }
            ];
            
            const kitProductsContainer = document.querySelector('.kit-products');
            const kitSummary = document.querySelector('.kit-summary');
            const productSelectionModal = document.querySelector('.product-selection-modal');
            const closeSelectionModal = document.querySelector('.close-selection-modal');
            const productSelectionGrid = document.querySelector('.product-selection-grid');
            const addToBagBtn = document.querySelector('.add-to-bag');
            
            let currentSlot = null;
            const selectedProducts = {};
            
            // Initialize Kit Builder
            function initKitBuilder() {
                // Create 5 empty slots
                for (let i = 1; i <= 5; i++) {
                    const slot = document.createElement('div');
                    slot.className = 'kit-slot empty';
                    slot.dataset.slot = i;
                    slot.innerHTML = `
                        <div class="add-product">+ Add Product ${i}</div>
                    `;
                    
                    slot.addEventListener('click', function() {
                        if (this.classList.contains('empty')) {
                            openProductSelectionModal(this.dataset.slot);
                        }
                    });
                    
                    kitProductsContainer.appendChild(slot);
                }
                
                // Populate product selection grid
                populateProductSelection();
            }
            
            // Populate product selection modal
            function populateProductSelection() {
                productSelectionGrid.innerHTML = '';
                
                lipProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'selection-product';
                    productCard.innerHTML = `
                        <div class="selection-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="selection-details">
                            <div class="selection-name">${product.name}</div>
                            <div class="selection-price">$${product.price}</div>
                            ${product.popular ? '<div class="popular-badge">BESTSELLER</div>' : ''}
                        </div>
                    `;
                    
                    productCard.addEventListener('click', () => selectProductForSlot(product));
                    productSelectionGrid.appendChild(productCard);
                });
            }
            
            // Open product selection modal for a specific slot
            function openProductSelectionModal(slotNumber) {
                currentSlot = slotNumber;
                productSelectionModal.style.display = 'block';
            }
            
            // Select product for the current slot
            function selectProductForSlot(product) {
                if (currentSlot) {
                    selectedProducts[currentSlot] = product;
                    updateKitSlot(currentSlot, product);
                    updateKitSummary();
                    productSelectionModal.style.display = 'none';
                }
            }
            
            // Update kit slot with selected product
            function updateKitSlot(slotNumber, product) {
                const slot = document.querySelector(`.kit-slot[data-slot="${slotNumber}"]`);
                slot.classList.remove('empty');
                slot.classList.add('filled');
                slot.innerHTML = `
                    <div class="slot-content">
                        <div class="slot-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="slot-details">
                            <div class="slot-name">${product.name}</div>
                            <div class="slot-price">$${product.price}</div>
                        </div>
                        <div class="slot-actions">
                            <button class="edit-slot">Edit</button>
                            <button class="remove-slot">Remove</button>
                        </div>
                    </div>
                `;
                
                // Add event listeners for edit and remove
                slot.querySelector('.edit-slot').addEventListener('click', () => openProductSelectionModal(slotNumber));
                slot.querySelector('.remove-slot').addEventListener('click', () => removeProductFromSlot(slotNumber));
            }
            
            // Remove product from slot
            function removeProductFromSlot(slotNumber) {
                delete selectedProducts[slotNumber];
                const slot = document.querySelector(`.kit-slot[data-slot="${slotNumber}"]`);
                slot.classList.remove('filled');
                slot.classList.add('empty');
                slot.innerHTML = `
                    <div class="add-product">+ Add Product ${slotNumber}</div>
                `;
                
                slot.addEventListener('click', function() {
                    if (this.classList.contains('empty')) {
                        openProductSelectionModal(this.dataset.slot);
                    }
                });
                
                updateKitSummary();
            }
            
            // Update kit summary information
            function updateKitSummary() {
                const itemCount = Object.keys(selectedProducts).length;
                const individualValue = Object.values(selectedProducts).reduce((sum, product) => sum + product.price, 0);
                
                document.querySelector('.item-count').textContent = `${itemCount}/5`;
                document.querySelector('.individual-value').textContent = `$${individualValue.toFixed(2)}`;
                document.querySelector('.original-price').textContent = `$${individualValue.toFixed(2)}`;
                
                if (itemCount === 5) {
                    addToBagBtn.disabled = false;
                } else {
                    addToBagBtn.disabled = true;
                }
            }
            
            // Close product selection modal
            closeSelectionModal.addEventListener('click', () => {
                productSelectionModal.style.display = 'none';
            });
            
            window.addEventListener('click', (e) => {
                if (e.target === productSelectionModal) {
                    productSelectionModal.style.display = 'none';
                }
            });
            
            // Add to bag button
            addToBagBtn.addEventListener('click', () => {
                if (Object.keys(selectedProducts).length === 5) {
                    alert('Your custom lip kit has been added to your bag!');
                    // Here you would typically send the selected products to your cart system
                }
            });
            
            // Initialize the kit builder
            initKitBuilder();
        });

            document.addEventListener('DOMContentLoaded', function() {
            const sliderTrack = document.getElementById('sliderTrack');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const sliderIndicators = document.getElementById('sliderIndicators');
            const productCards = document.querySelectorAll('.product-card');
            const cardWidth = productCards[0].offsetWidth + 20; // width + gap
            let currentPosition = 0;
            let currentSlide = 0;
            const slidesToShow = 4;
            const totalSlides = Math.ceil(productCards.length / slidesToShow);
            
            // Create indicators
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => goToSlide(i));
                sliderIndicators.appendChild(indicator);
            }
            
            const indicators = document.querySelectorAll('.indicator');

            function updateSlider() {
                sliderTrack.style.transform = `translateX(${-currentSlide * cardWidth * slidesToShow}px)`;
                
                // Update indicators
                indicators.forEach((ind, index) => {
                    ind.classList.toggle('active', index === currentSlide);
                });
            }

            function nextSlide() {
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                } else {
                    currentSlide = 0;
                }
                updateSlider();
            }

            function prevSlide() {
                if (currentSlide > 0) {
                    currentSlide--;
                } else {
                    currentSlide = totalSlides - 1;
                }
                updateSlider();
            }

            function goToSlide(slideIndex) {
                currentSlide = slideIndex;
                updateSlider();
            }

            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);

            // Auto-slide
            let autoSlideInterval = setInterval(nextSlide, 5000);

            // Pause on hover
            sliderTrack.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            sliderTrack.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(nextSlide, 5000);
            });

            // Touch support
            let touchStartX = 0;
            sliderTrack.addEventListener('touchstart', e => {
                touchStartX = e.touches[0].clientX;
                clearInterval(autoSlideInterval);
            });

            sliderTrack.addEventListener('touchend', e => {
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
                autoSlideInterval = setInterval(nextSlide, 5000);
            });

            // Adjust on resize
            window.addEventListener('resize', function() {
                const newCardWidth = productCards[0].offsetWidth + 20;
                if (newCardWidth !== cardWidth) {
                    cardWidth = newCardWidth;
                    updateSlider();
                }
            });
        });
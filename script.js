// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Process Tabs Functionality
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.process-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // ABM Interactive Tabs Functionality
    const abmTabs = document.querySelectorAll('.abm-tab-btn');
    const abmPanels = document.querySelectorAll('.abm-tab-panel');
    
    abmTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            abmTabs.forEach(t => t.classList.remove('active'));
            abmPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                // Small delay for smooth transition
                setTimeout(() => {
                    targetPanel.classList.add('active');
                    
                    // Restart animations for callouts and lines
                    const callouts = targetPanel.querySelectorAll('.feature-callout');
                    const goalBadge = targetPanel.querySelector('.goal-badge');
                    const connectionLines = targetPanel.querySelectorAll('.connection-line');
                    
                    // Reset and restart callout animations
                    callouts.forEach((callout, index) => {
                        callout.style.animation = 'none';
                        setTimeout(() => {
                            callout.style.animation = `slideInUp 0.6s ease forwards`;
                            callout.style.animationDelay = `${0.2 + (index * 0.2)}s`;
                        }, 50);
                    });
                    
                    // Reset and restart goal badge animation
                    if (goalBadge) {
                        goalBadge.style.animation = 'none';
                        setTimeout(() => {
                            goalBadge.style.animation = 'slideInLeft 0.8s ease 1s both';
                        }, 50);
                    }
                    
                    // Reset and restart connection line animations
                    connectionLines.forEach((line, index) => {
                        line.style.animation = 'none';
                        setTimeout(() => {
                            line.style.animation = `drawLine 2s ease-in-out both`;
                            line.style.animationDelay = `${1.4 + (index * 0.2)}s`;
                        }, 50);
                    });
                }, 100);
            }
        });
    });
    
    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.problem-item, .benefit-card, .testimonial-card, .industry-card, .abm-stage, .stat-card, .audience-card, .blog-card');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Counter Animation for Stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number, .stat-bar-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    const text = statNumber.textContent;
                    const number = parseInt(text.match(/\d+/)[0]);
                    const tempText = statNumber.innerHTML;
                    
                    // Clear the content temporarily
                    statNumber.textContent = '0';
                    
                    // Animate the number
                    animateCounter(statNumber, number);
                    
                    // Add back the suffix after animation
                    setTimeout(() => {
                        statNumber.innerHTML = tempText;
                    }, 2000);
                }
            }
        });
    }, observerOptions);
    
    const statCards = document.querySelectorAll('.stat-card, .stat-bar-item');
    statCards.forEach(card => {
        statsObserver.observe(card);
    });

    // Animated Bar Chart Observer
    const barChartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartSection = entry.target;
                const barItems = chartSection.querySelectorAll('.stat-bar-item');
                
                // Trigger bar animations
                barItems.forEach((item, index) => {
                    const bar = item.querySelector('.stat-bar');
                    const content = item.querySelector('.stat-bar-content');
                    const delay = parseFloat(item.getAttribute('data-delay')) || 0;
                    
                    if (bar && !bar.classList.contains('animated')) {
                        bar.classList.add('animated');
                        
                        // Set the height based on data attribute
                        const height = item.getAttribute('data-height');
                        setTimeout(() => {
                            bar.style.height = height;
                        }, delay * 1000);
                        
                        // Animate the number counter
                        const numberElement = item.querySelector('.stat-bar-number');
                        if (numberElement) {
                            setTimeout(() => {
                                const text = numberElement.textContent;
                                const number = parseInt(text.match(/\d+/)[0]);
                                const originalHTML = numberElement.innerHTML;
                                
                                numberElement.textContent = '0';
                                animateCounter(numberElement, number, 1500);
                                
                                setTimeout(() => {
                                    numberElement.innerHTML = originalHTML;
                                }, 1500);
                            }, (delay + 0.8) * 1000);
                        }
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    const chartSections = document.querySelectorAll('.success-chart-section');
    chartSections.forEach(section => {
        barChartObserver.observe(section);
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Form Submission Handlers (Placeholder)
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large, .hero-cta, .blog-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show a placeholder modal or alert
            showModal('Thank you for your interest!', 'This is a demo website. In a real implementation, this would open a contact form or redirect to a booking page.');
        });
    });
    
    // Modal Functionality
    function showModal(title, message) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('demo-modal');
        if (!modal) {
            modal = createModal();
        }
        
        // Update modal content
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-message').textContent = message;
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function createModal() {
        const modal = document.createElement('div');
        modal.id = 'demo-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title"></h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p class="modal-message"></p>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-btn-close">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
            align-items: center;
            justify-content: center;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 25px rgba(0,0,0,0.3);
        `;
        
        const modalHeader = modal.querySelector('.modal-header');
        modalHeader.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e2e8f0;
        `;
        
        const modalClose = modal.querySelector('.modal-close');
        modalClose.style.cssText = `
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
        `;
        
        const modalBtnClose = modal.querySelector('.modal-btn-close');
        modalBtnClose.style.cssText = `
            background: #4f46e5;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 1rem;
        `;
        
        // Add close functionality
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        modalClose.addEventListener('click', closeModal);
        modalBtnClose.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.body.appendChild(modal);
        return modal;
    }
    
    // Dropdown Menu Enhancements
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        let timeout;
        
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(timeout);
            dropdownContent.style.display = 'grid';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            timeout = setTimeout(() => {
                dropdownContent.style.display = 'none';
            }, 100);
        });
    });
    
    // Lazy Loading for Images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Progress Bar on Scroll
    function createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #4f46e5, #7c3aed);
            z-index: 10001;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / windowHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }
    
    createProgressBar();
    
    // Initialize tooltips for interactive elements
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.textContent = this.getAttribute('data-tooltip');
                tooltip.style.cssText = `
                    position: absolute;
                    background: #1a202c;
                    color: white;
                    padding: 0.5rem;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    z-index: 1000;
                    pointer-events: none;
                `;
                
                this.appendChild(tooltip);
                
                // Position tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.top = rect.height + 5 + 'px';
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
            });
            
            element.addEventListener('mouseleave', function() {
                const tooltip = this.querySelector('div');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }
    
    initTooltips();
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization for scroll events
const optimizedScrollHandler = throttle(function() {
    // Scroll-based animations and effects go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'assets/1.jpg',
        'assets/2.jpg',
        'assets/3.jpg',
        'assets/4.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages(); 

// Testimonials Carousel
function initTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    const cards = document.querySelectorAll('.testimonial-carousel-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (!carousel || !cards.length) return;
    
    let currentIndex = 0;
    let autoScrollInterval;
    let isScrolling = false;
    
    // Calculate card width including gap
    function getCardWidth() {
        const cardElement = cards[0];
        const computedStyle = window.getComputedStyle(cardElement);
        const cardWidth = cardElement.offsetWidth;
        const gap = parseInt(window.getComputedStyle(carousel).gap) || 32;
        return cardWidth + gap;
    }
    
    // Update carousel position
    function updateCarousel(index, smooth = true) {
        if (isScrolling) return;
        
        const cardWidth = getCardWidth();
        const scrollPosition = index * cardWidth;
        
        if (smooth) {
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        } else {
            carousel.scrollLeft = scrollPosition;
        }
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // Navigate to next slide
    function nextSlide() {
        if (currentIndex >= cards.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateCarousel(currentIndex);
    }
    
    // Navigate to previous slide
    function prevSlide() {
        if (currentIndex <= 0) {
            currentIndex = cards.length - 1;
        } else {
            currentIndex--;
        }
        updateCarousel(currentIndex);
    }
    
    // Start auto-scroll
    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(nextSlide, 5000);
    }
    
    // Stop auto-scroll
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoScroll();
            nextSlide();
            setTimeout(startAutoScroll, 3000);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoScroll();
            prevSlide();
            setTimeout(startAutoScroll, 3000);
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoScroll();
            updateCarousel(index);
            setTimeout(startAutoScroll, 3000);
        });
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;
    
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
        stopAutoScroll();
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
        setTimeout(startAutoScroll, 2000);
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        scrollLeft = carousel.scrollLeft;
        stopAutoScroll();
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        carousel.scrollLeft = scrollLeft + diff;
    });
    
    carousel.addEventListener('touchend', () => {
        startX = 0;
        setTimeout(startAutoScroll, 2000);
    });
    
    // Pause auto-scroll on hover
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);
    
    // Handle scroll events to update active dot
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            const cardWidth = getCardWidth();
            const newIndex = Math.round(carousel.scrollLeft / cardWidth);
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < cards.length) {
                currentIndex = newIndex;
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        }, 150);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (carousel.closest('section').getBoundingClientRect().top < window.innerHeight &&
            carousel.closest('section').getBoundingClientRect().bottom > 0) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stopAutoScroll();
                prevSlide();
                setTimeout(startAutoScroll, 3000);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                stopAutoScroll();
                nextSlide();
                setTimeout(startAutoScroll, 3000);
            }
        }
    });
    
    // Intersection Observer for auto-scroll
    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoScroll();
            } else {
                stopAutoScroll();
            }
        });
    }, { threshold: 0.5 });
    
    carouselObserver.observe(carousel);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel(currentIndex, false);
        }, 250);
    });
    
    // Initialize carousel
    updateCarousel(0, false);
    
    // Add fade-in animation for cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
    
    console.log('✨ Testimonials carousel initialized with auto-scroll and touch support');
}

// Initialize testimonials carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initTestimonialsCarousel);
// Hero section slideshow functionality
let currentSlide = 0;
const dots = document.querySelectorAll('.dot');
const totalSlides = dots.length;

function updateSlide(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Arrow navigation
document.querySelector('.fa-arrow-left').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide(currentSlide);
});

document.querySelector('.fa-arrow-right').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide(currentSlide);
});

// Automatic slideshow
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide(currentSlide);
}, 5000);

// Initial animations when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Collection text animation with 3D flip
    gsap.to(".collection-text div", {
        duration: 1,
        opacity: 1,
        rotateX: 0,
        stagger: 0.3,
        ease: "back.out(1.7)"
    });

    // Search container animation
    gsap.to(".search-container", {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        delay: 0.5
    });

    // Info panel slide-in
    gsap.to(".info-panel", {
        duration: 1,
        opacity: 1,
        x: 0,
        ease: "power2.out",
        delay: 1
    });
    gsap.to(".footer-text", {
        duration: 0.8,
        opacity: 1,
        x: 0,
        stagger: 0.2,
        ease: "power2.out",
        delay: 1.2
    });
});

// Hover animation for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            duration: 0.3,
            scale: 1.1,
            ease: "power2.out"
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            duration: 0.3,
            scale: 1,
            ease: "power2.out"
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const bgImage = document.getElementById('bgImage');
    const mainImage = document.getElementById('mainArtwork');
    const artworkTitles = document.querySelectorAll('.artwork-title');
    const menuItems = document.querySelectorAll('.menu-item');
    const artistHeading = document.getElementById('artistHeading');

    // Add animation class to background after load
    bgImage.classList.add('animate');

    // Function to update artwork display
    function changeArtwork(artworkEl) {
        // Remove previous animations
        mainImage.classList.remove('rotate-image');
        
        // Update active states
        artworkTitles.forEach(title => title.classList.remove('active'));
        artworkEl.classList.add('active');

        // Get new image sources
        const newImage = artworkEl.dataset.image;
        const newBg = artworkEl.dataset.bg;
        const artworkName = artworkEl.querySelector('span:last-child').textContent;

        // Animate changes
        mainImage.classList.add('changing');
        bgImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = newImage;
            bgImage.src = newBg;
            mainImage.classList.remove('changing');
            bgImage.style.opacity = '0.15';
            artistHeading.textContent = artworkName;
            
            // Re-add rotation animation
            setTimeout(() => {
                mainImage.classList.add('rotate-image');
            }, 100);
        }, 300);
    }

    // Function to update artist section
    function changeArtist(menuItem) {
        menuItems.forEach(item => item.classList.remove('active'));
        menuItem.classList.add('active');
        artistHeading.textContent = menuItem.dataset.artist;
    }

    // Add click handlers
    artworkTitles.forEach(title => {
        title.addEventListener('click', () => changeArtwork(title));
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => changeArtist(item));
    });

    // Initialize with first artwork
    const firstArtwork = document.querySelector('.artwork-title');
    changeArtwork(firstArtwork);
});
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Button Interactions
    const selectButtons = document.querySelectorAll('.select-button');
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('.fas');
            icon.classList.toggle('fa-chevron-up');
            icon.classList.toggle('fa-chevron-down');
            
            // Add rotation animation
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'none';
            }, 500);

            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        });

        // Add hover effects
        button.addEventListener('mouseover', function() {
            this.classList.add('pulse');
        });

        button.addEventListener('mouseout', function() {
            this.classList.remove('pulse');
        });
    });

    // 3D Tilt Effect for Ticket Sections
    const ticketSections = document.querySelectorAll('.ticket-section');
    ticketSections.forEach(section => {
        section.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 30;
            const angleY = (centerX - x) / 30;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });

        section.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Image Card Parallax Effect
    const imageCards = document.querySelectorAll('.image-card');
    imageCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            this.querySelector('img').style.transform = 
                `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Smooth Scroll Animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    lazyImages.forEach(img => imageObserver.observe(img));

    // Dynamic Background Color Change
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (st / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        const hue = Math.min(30 + scrollPercent / 2, 60); // Varies between brown shades
        document.body.style.setProperty('--primary-brown', `hsl(${hue}, 50%, 30%)`);
        
        lastScrollTop = st <= 0 ? 0 : st;
    });

    // Add Animation Classes on Scroll
    const animatedElements = document.querySelectorAll('.fade-in, .floating');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    // Ticket Section Expansion
    document.querySelectorAll('.ticket-section').forEach(section => {
        const button = section.querySelector('.select-button');
        const content = document.createElement('div');
        content.classList.add('ticket-content', 'hidden');
        content.innerHTML = `
           <div class="p-4 mt-4" style="background-color: #8B4513; opacity: 0.8;" class="rounded">
<h3 class="text-lg font-semibold mb-2">Additional Information</h3>
<ul class="space-y-2">
    <li>⏰ Available Time Slots</li>
    <li>💰 Pricing Details</li>
    <li>ℹ️ Important Information</li>
</ul>
</div>
        `;
        section.appendChild(content);

        button.addEventListener('click', () => {
            content.classList.toggle('hidden');
            section.classList.toggle('expanded');
        });
    });

    // Add Loading Animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate elements sequentially
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    });

    // Handle Window Resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
});

// Add to Cart Functionality
const cart = {
    items: [],
    total: 0,
    
    addItem(item) {
        this.items.push(item);
        this.updateTotal();
        this.updateCartUI();
    },
    
    removeItem(index) {
        this.items.splice(index, 1);
        this.updateTotal();
        this.updateCartUI();
    },
    
    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + item.price, 0);
    },
    
    updateCartUI() {
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            cartCounter.textContent = this.items.length;
            cartCounter.classList.add('pulse');
            setTimeout(() => cartCounter.classList.remove('pulse'), 500);
        }
    }
};

// Initialize tooltips
const tooltipElements = document.querySelectorAll('[data-tooltip]');
tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', e => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = element.dataset.tooltip;
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
    });
    
    element.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    });
});
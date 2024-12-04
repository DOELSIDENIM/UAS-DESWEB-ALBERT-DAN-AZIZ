// Initial animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Navbar animation
    gsap.to('.main-nav', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });

    // Video overlay animation
    gsap.to('.overlay', {
        opacity: 1,
        duration: 1,
        delay: 0.5
    });

    // Video scale animation
    gsap.to('.hero1-video', {
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
    });

    // Forms and tabs animation
    gsap.to('.tabs', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
            trigger: '.tabs',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.to('.form-container', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
            trigger: '.form-container',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        }
    });

    // Footer animation
    gsap.to('footer', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: 'footer',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        }
    });
});

// Tab switching function
function switchTab(tabId) {
    // Remove active class from all tabs and sections
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.form-section').forEach(section => section.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding section
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Form submission
function submitForm(event) {
    event.preventDefault();
    alert('Form submitted successfully!');
    event.target.reset();
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
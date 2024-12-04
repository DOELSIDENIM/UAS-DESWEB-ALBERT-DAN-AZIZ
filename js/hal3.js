    // Elegant navbar transformation on scroll
       // Ubah event listener scroll menjadi:
       window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        
        // Selalu set transparent di semua kondisi
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.borderBottom = 'none';
    });

        // Smooth scroll animation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Intersection Observer for elegant fade animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.visibility = 'visible';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
            el.style.visibility = 'hidden';
            observer.observe(el);
        });
        document.addEventListener('DOMContentLoaded', function() {
            // Enhanced intersection observer with threshold array
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'none';
                        entry.target.offsetHeight;
                        entry.target.style.animation = null;
                        
                        // Add elegant entrance class
                        entry.target.classList.add('animate-entrance');
                    }
                });
            }, {
                threshold: [0.1, 0.5],
                rootMargin: '0px'
            });

            // Observe all animated elements
            document.querySelectorAll('.welcome-text, .history-text, .description, .read-more, .museum-image-1, .museum-image-2')
                .forEach(el => observer.observe(el));

            // Smooth scroll handling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Enhanced hover effects
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('mouseover', function() {
                    this.style.transform = 'scale(1.03) translateY(-5px)';
                    this.style.boxShadow = '0 15px 30px rgba(92, 64, 51, 0.2)';
                });
                img.addEventListener('mouseout', function() {
                    this.style.transform = 'scale(1) translateY(0)';
                    this.style.boxShadow = '0 10px 20px rgba(92, 64, 51, 0.1)';
                });
            });
        });
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Enhanced hover animations
        $('.exhibition-item').hover(function() {
            $(this).find('img').css('transform', 'scale(1.1) skew(-2deg, 0) rotate(2deg)');
        }, function() {
            $(this).find('img').css('transform', 'scale(1) skew(0, 0) rotate(0)');
        });
        // Featured Collection Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Fade in elements on scroll
    const featuredFadeElements = document.querySelectorAll('.featured-fade-in');

    const featuredFadeInOnScroll = () => {
        featuredFadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };

    // Initial check for elements in view
    featuredFadeInOnScroll();

    // Listen for scroll
    window.addEventListener('scroll', featuredFadeInOnScroll);

    // Add hover animations
    document.querySelectorAll('.featured-image-container').forEach(container => {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            container.style.transform = `
                scale(1.02)
                rotateY(${(x - 0.5) * 10}deg)
                rotateX(${(y - 0.5) * -10}deg)
            `;
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = 'scale(1) rotateY(0) rotateX(0)';
        });
    });
});
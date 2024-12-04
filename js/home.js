document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP timeline
    const tl = gsap.timeline();

    // Initial animations
    tl.to('.hero-video', {
        scale: 1,
        duration: 1.5,
        ease: 'power2.out'
    })
    .to('.overlay', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, "-=1.5")
    .to('.main-nav', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    })
    .to('.hero-content', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    })
    .to('.hero-image', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out"
    })
    .to('.cta-button', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    })
    .to('.scroll-indicator', {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    });

    // Split text animation for title
    const title = document.querySelector('.exhibition-title');
    if (title) {
        const words = title.textContent.split(' ');
        title.textContent = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.className = 'split-text';
            title.appendChild(span);
            
            tl.to(span, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, `-=${index > 0 ? 0.3 : 0}`);
        });
    }

    // Particle effect on button hover
    const button = document.querySelector('.learn-more-btn');
    if (button) {
        button.addEventListener('mouseover', createParticles);
    }

    function createParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            document.body.appendChild(particle);

            const size = Math.random() * 4 + 2;
            const destinationX = (Math.random() - 0.5) * 100;
            const destinationY = (Math.random() - 0.5) * 100;

            gsap.set(particle, {
                x: button.offsetLeft + button.offsetWidth / 2,
                y: button.offsetTop + button.offsetHeight / 2,
                width: size,
                height: size
            });

            gsap.to(particle, {
                x: `+=${destinationX}`,
                y: `+=${destinationY}`,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => particle.remove()
            });
        }
    }

    // Unified scroll handler
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const heroImage = document.querySelector('.hero-image img');
        const scrolled = window.pageYOffset;
        
        // Navbar and scroll indicator visibility
        if (scrolled > 50) {
            navbar?.classList.add('scrolled');
            scrollIndicator?.classList.remove('visible');
        } else {
            navbar?.classList.remove('scrolled');
            scrollIndicator?.classList.add('visible');
        }
        
        // Parallax effects
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        gsap.to('.hero-video', {
            y: scrolled * 0.5,
            duration: 0.5,
            ease: 'none'
        });
    });

    // Initialize intersection observer for lazy loading
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all exhibition cards
    document.querySelectorAll('.exhibition-card1').forEach(card => {
        observer.observe(card);
    });

    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more-btn1');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', handleLoadMore);
    }

    async function handleLoadMore() {
        try {
            loadMoreBtn.disabled = true;
            loadMoreBtn.innerHTML = 'Loading...';

            await new Promise(resolve => setTimeout(resolve, 1000));

            const container = document.querySelector('.exhibitions-container1');
            const newExhibition = createExhibitionCard({
                title: 'New Exhibition',
                date: 'May 1, 2024 – June 30, 2024',
                description: 'New exhibition description goes here...',
                image: '/api/placeholder/400/300'
            });

            container.appendChild(newExhibition);
            observer.observe(newExhibition);

        } catch (error) {
            console.error('Error loading more exhibitions:', error);
        } finally {
            loadMoreBtn.disabled = false;
            loadMoreBtn.innerHTML = 'LOAD MORE';
        }
    }

    // Helper function to create new exhibition cards
    function createExhibitionCard({ title, date, description, image }) {
        const article = document.createElement('article');
        article.className = 'exhibition-card';
        article.innerHTML = `
            <div class="exhibition-image1">
                <img src="${image}" alt="${title}" />
            </div>
            <div class="exhibition-content1">
                <h2 class="exhibition-title1">${title}</h2>
                <p class="exhibition-date1">${date}</p>
                <p class="exhibition-description1">${description}</p>
                <button class="more-info-btn1">MORE INFO</button>
            </div>
        `;
        return article;
    }

    // Unified smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: target,
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // Button hover effects
    document.querySelectorAll('.more-info-btn1').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
});

// Modal functionality (keep outside DOMContentLoaded as it's referenced by HTML)
function openModal(artwork) {
    const modal = document.getElementById('artworkModal');
    const modalContent = document.getElementById('modalContent');
    const artworkContent = artwork.cloneNode(true);
    
    const artworkImage = artworkContent.querySelector('.artwork-image img');
    artworkImage.style.transform = 'none';
    
    modalContent.innerHTML = '';
    modalContent.appendChild(artworkContent);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('artworkModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Modal event listeners
document.getElementById('artworkModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('artworkModal')?.classList.contains('active')) {
        closeModal();
    }
});
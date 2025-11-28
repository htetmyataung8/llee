   
        // ==================== INITIALIZATION ====================
        document.addEventListener('DOMContentLoaded', function() {
            const preloader = document.getElementById('preloader');
            const zoomContainer = document.getElementById('zoom-container');
            const sections = document.querySelectorAll('.page-section');
            const header = document.getElementById('header');
            const navDotsContainer = document.getElementById('navDots');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const nav = document.getElementById('nav');

            // Hide preloader
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1500);

            // Create navigation dots
            sections.forEach((section, index) => {
                const dot = document.createElement('div');
                dot.className = 'nav-dot' + (index === 0 ? ' active' : '');
                dot.setAttribute('data-title', section.id.toUpperCase());
                dot.addEventListener('click', () => {
                    section.scrollIntoView({ behavior: 'smooth' });
                });
                navDotsContainer.appendChild(dot);
            });

            const navDots = document.querySelectorAll('.nav-dot');

            // ==================== ZOOM SCROLL LOGIC ====================
            let currentSection = 0;
            let isScrolling = false;
            let scrollTimeout;

            function updateSections() {
                const scrollTop = zoomContainer.scrollTop;
                const windowHeight = window.innerHeight;

                // Smooth scroll detection
                clearTimeout(scrollTimeout);
                isScrolling = true;
                
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 150);

                // Find active section with smoother threshold
                let newSection = currentSection;
                let maxVisible = 0;

                sections.forEach((section, index) => {
                    const rect = section.getBoundingClientRect();
                    const visible = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
                    const percent = Math.max(0, visible / windowHeight);

                    if (percent > maxVisible) {
                        maxVisible = percent;
                        newSection = index;
                    }
                });

                // Only update if section changed and not rapidly scrolling
                if (newSection !== currentSection) {
                    currentSection = newSection;
                    updateNav();
                }

                // Apply zoom states with smooth timing
                sections.forEach((section, index) => {
                    section.classList.remove('active', 'above', 'below');
                    if (index === currentSection) {
                        section.classList.add('active');
                    } else if (index < currentSection) {
                        section.classList.add('above');
                    } else {
                        section.classList.add('below');
                    }
                });

                // Update header with smooth transition
                if (scrollTop > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }

            function updateNav() {
                navDots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSection);
                });
            }

            // Scroll event with RAF and debouncing
            let rafId = null;
            zoomContainer.addEventListener('scroll', () => {
                if (!rafId) {
                    rafId = requestAnimationFrame(() => {
                        updateSections();
                        rafId = null;
                    });
                }
            }, { passive: true });

            // Initial update
            updateSections();

            // ==================== IMAGE CAROUSEL ====================
            const carousels = document.querySelectorAll('.image-wrapper');
            carousels.forEach(carousel => {
                const images = carousel.querySelectorAll('.carousel-img');
                let current = 0;

                setInterval(() => {
                    images[current].classList.remove('active');
                    current = (current + 1) % images.length;
                    images[current].classList.add('active');
                }, 4000);
            });

            // ==================== SMOOTH SCROLLING ====================
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        nav.classList.remove('active');
                    }
                });
            });

            // ==================== MOBILE MENU ====================
            mobileMenuBtn.addEventListener('click', () => {
                nav.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });

            // ==================== NEWSLETTER FORM ====================
            document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                alert(`Thank you for subscribing with ${emailInput.value}!`);
                emailInput.value = '';
            });
        });

        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
                e.preventDefault();             const emailInput = this.querySelector('input[type="email"]');
                alert(`Thank you for subscribing with ${emailInput.value}!`);
                emailInput.value = '';
            });
  
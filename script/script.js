document.addEventListener('DOMContentLoaded', function () {
    // Faq toggle functionality
    const toggles = document.querySelectorAll('.faq-toggle');
    toggles.forEach((toggle, i) => {
        toggle.addEventListener('click', () => {
            toggles.forEach((otherToggle, j) => {
                const answer = otherToggle.nextElementSibling;
                const icon = otherToggle.querySelector('span');

                if (toggle === otherToggle) {
                    answer.classList.toggle('hidden');
                    icon.textContent = answer.classList.contains('hidden') ? '+' : '–';
                } else {
                    answer.classList.add('hidden');
                    icon.textContent = '+';
                }
            });
        });
    });
    // Trusted companies slider
    const marquee = {
        wrapper: document.querySelector('.marquee-wrapper'),
        slides: document.querySelectorAll('.marquee-slide'),
        speed: 1, // pixels per frame
        position: 0,
        requestId: null,
        paused: false,

        init: function () {
            // Clone slides for seamless looping
            this.slides.forEach(slide => {
                const clone = slide.cloneNode(true);
                this.wrapper.appendChild(clone);
            });

            // Start animation
            this.animate();

            // Pause on hover
            document.querySelector('.marquee-container').addEventListener('mouseenter', () => {
                this.paused = true;
            });
            document.querySelector('.marquee-container').addEventListener('mouseleave', () => {
                this.paused = false;
                if (!this.requestId) this.animate();
            });
        },

        animate: function () {
            if (this.paused) {
                this.requestId = null;
                return;
            }

            this.position -= this.speed;

            // Reset position when we've scrolled all original slides
            if (this.position < -this.wrapper.scrollWidth / 2) {
                this.position = 0;
            }

            this.wrapper.style.transform = `translateX(${this.position}px)`;
            this.requestId = requestAnimationFrame(this.animate.bind(this));
        },

        handleResize: function () {
            cancelAnimationFrame(this.requestId);
            this.position = 0;
            this.wrapper.style.transform = 'translateX(0)';
            this.animate();
        }
    };
    // Initialize marquee
    marquee.init();
    // Handle resize
    window.addEventListener('resize', function () {
        marquee.handleResize();
    });

    // menu toggle
    const menuBtn = document.getElementById('menuToggle');
    menuBtn.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('hidden');
    });

    // Chatbot functionality
    const chatbotBtn = document.getElementById('chatbot-btn');
    const chatbotBox = document.getElementById('chatbot-box');
    const closeBtn = document.getElementById('close-chatbot');

    chatbotBtn.addEventListener('click', () => {
        chatbotBox.classList.remove('hidden');
        chatbotBox.classList.add('flex');
    });

    closeBtn.addEventListener('click', () => {
        chatbotBox.classList.add('hidden');
    });

    // Transform challenge card functionality
    const cards = document.querySelectorAll('.case-card');
    const wrapper = document.getElementById('case-study-wrapper');
    const nextBtn = document.getElementById('next-card-btn');
    const seeMore = document.getElementById('see-more-card-btn');

    let startIndex = 0;

    function renderCards() {
        cards.forEach((card, index) => {
            if (index >= startIndex && index < startIndex + 2) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Initial render
    renderCards();
    nextBtn.addEventListener('click', () => {
        if (startIndex + 2 < cards.length) {
            startIndex++;
            renderCards();
        } else {
            // Optional: Loop back to start
            startIndex = 0;
            renderCards();
        }
    });
    seeMore.addEventListener('click', () => {
        // Show all cards from current index
        cards.forEach((card, index) => {
            card.classList.remove('hidden');
        });
        // Hide the "See More" button
        seeMore.classList.add('hidden');
    });
});
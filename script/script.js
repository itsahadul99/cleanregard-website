document.addEventListener('DOMContentLoaded', function () {
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
    const toggleMenu = () => {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('hidden');
    }

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
});
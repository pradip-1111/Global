/**
 * Homepage specific JavaScript
 * Handles counters and other home page animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initScrollAnimations();
    initInfraSlider();
});

/**
 * Initialize number counters for stats section
 */
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-counter'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Animate a single counter
 */
function animateCounter(element, target) {
    let start = 0;
    const duration = 2000; // 2 seconds
    const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);

        element.textContent = Math.floor(progress * target);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = target + "+"; // Add + sign at the end
        }
    };

    window.requestAnimationFrame(step);
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in-up');

    if (animatedElements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize Infrastructure Slider
 */
function initInfraSlider() {
    const slider = document.getElementById('infra-slider');
    if (!slider) return;

    // Clone children for infinite scroll effect
    const children = Array.from(slider.children);
    children.forEach(child => {
        const clone = child.cloneNode(true);
        slider.appendChild(clone);
    });

    let scrollPos = 0;
    const speed = 1; // Pixels per frame

    function autoScroll() {
        scrollPos += speed;
        // Reset when first set of images is fully scrolled
        if (scrollPos >= slider.scrollWidth / 2) {
            scrollPos = 0;
        }
        slider.scrollLeft = scrollPos;
        requestAnimationFrame(autoScroll);
    }

    // Start auto-scroll
    // requestAnimationFrame(autoScroll); 
    // Note: Simple CSS overflow-x-auto is safer for now, let's just enable manual scroll 
    // and maybe a slow auto-scroll if requested. 
    // For now, let's stick to the CSS implementation in the HTML which used overflow-x-hidden.
    // Wait, the HTML used overflow-x-hidden, so user can't scroll? 
    // I should probably make it overflow-x-auto or implement the JS scroll.

    // Let's implement the JS auto-scroll properly.

    // Pause on hover
    let isPaused = false;
    slider.addEventListener('mouseenter', () => isPaused = true);
    slider.addEventListener('mouseleave', () => isPaused = false);

    function animate() {
        if (!isPaused) {
            scrollPos += 0.5; // Slower speed
            if (scrollPos >= slider.scrollWidth / 2) {
                scrollPos = 0;
            }
            slider.scrollLeft = scrollPos;
        }
        requestAnimationFrame(animate);
    }

    animate();
}

// Modal Functions
window.openModal = function (product) {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const image = document.getElementById('modal-image');

    if (modal && title && body) {
        title.textContent = product.title;
        body.textContent = product.description;
        if (image && product.image) {
            image.src = product.image;
            image.style.display = 'block';
        } else if (image) {
            image.style.display = 'none';
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
};

window.closeModal = function () {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
};

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('product-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

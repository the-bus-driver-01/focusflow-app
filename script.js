// ============================================
// FocusFlow App - Interactive JavaScript
// ============================================

/**
 * Debug mode flag
 */
const DEBUG_MODE = false;

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeButtons();
    initializeNavigation();
    observeElements();
});

/**
 * Initialize button interactions
 */
function initializeButtons() {
    try {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                try {
                    // Add ripple effect
                    const ripple = createRipple(e);
                    if (ripple && button) {
                        button.appendChild(ripple);
                    }

                    // Handle specific button actions
                    const buttonText = button.textContent.toLowerCase();

                    if (buttonText.includes('started') || buttonText.includes('trial')) {
                        handleGetStarted(button);
                    } else if (buttonText.includes('demo')) {
                        handleWatchDemo(button);
                    } else if (buttonText.includes('contact')) {
                        handleContactSales(button);
                    }
                } catch (error) {
                    if (DEBUG_MODE) console.error('Error handling button click:', error);
                }
            });
        });
    } catch (error) {
        if (DEBUG_MODE) console.error('Error initializing buttons:', error);
    }
}

/**
 * Create ripple effect for buttons
 */
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    return ripple;
}

/**
 * Handle "Get Started" button click
 */
function handleGetStarted(button) {
    if (DEBUG_MODE) console.log('Get Started clicked');
    showNotification('Welcome to FocusFlow! Starting your free trial...', 'success');

    // Simulate navigation to sign-up page
    setTimeout(() => {
        if (DEBUG_MODE) console.log('Navigating to sign-up page...');
    }, 1500);
}

/**
 * Handle "Watch Demo" button click
 */
function handleWatchDemo(button) {
    if (DEBUG_MODE) console.log('Watch Demo clicked');
    showModal('Demo Video', 'Demo video would play here. Feature coming soon!');
}

/**
 * Handle "Contact Sales" button click
 */
function handleContactSales(button) {
    if (DEBUG_MODE) console.log('Contact Sales clicked');
    showNotification('Redirecting to contact form...', 'info');
}

/**
 * Initialize navigation smooth scrolling
 */
function initializeNavigation() {
    try {
        const navLinks = document.querySelectorAll('.nav-links a, a[href^="#"]');

        navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    } catch (error) {
        if (DEBUG_MODE) console.error('Error initializing navigation:', error);
    }
}

/**
 * Observe elements for scroll animations
 */
function observeElements() {
    try {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card) => {
            observer.observe(card);
        });

        // Observe pricing cards
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach((card) => {
            observer.observe(card);
        });

        // Observe steps
        const steps = document.querySelectorAll('.step');
        steps.forEach((step) => {
            observer.observe(step);
        });
    } catch (error) {
        if (DEBUG_MODE) console.error('Error observing elements:', error);
    }
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    try {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles inline for notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 20px',
            backgroundColor: getNotificationColor(type),
            color: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            animation: 'slideIn 0.3s ease-out',
            maxWidth: '400px'
        });

        if (document.body) {
            document.body.appendChild(notification);
        }

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    } catch (error) {
        if (DEBUG_MODE) console.error('Error showing notification:', error);
    }
}

/**
 * Get notification color based on type
 */
function getNotificationColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#4f46e5'
    };
    return colors[type] || colors['info'];
}

/**
 * Show modal dialog
 */
function showModal(title, message) {
    try {
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';

        const content = document.createElement('div');
        content.className = 'modal-content';

        const titleEl = document.createElement('h2');
        titleEl.textContent = title;

        const messageEl = document.createElement('p');
        messageEl.textContent = message;

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.className = 'btn btn-primary';
        closeButton.addEventListener('click', () => {
            content.remove();
            backdrop.remove();
        });

        // Add styles
        Object.assign(backdrop.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '9998'
        });

        Object.assign(content.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 20px 25px rgba(0, 0, 0, 0.2)',
            zIndex: '9999',
            maxWidth: '500px',
            width: '90%'
        });

        content.appendChild(titleEl);
        content.appendChild(messageEl);
        content.appendChild(closeButton);

        if (document.body) {
            document.body.appendChild(backdrop);
            document.body.appendChild(content);
        }

        // Close modal on backdrop click
        backdrop.addEventListener('click', () => {
            content.remove();
            backdrop.remove();
        });
    } catch (error) {
        if (DEBUG_MODE) console.error('Error showing modal:', error);
    }
}


// ============================================
// FocusFlow App - Interactive JavaScript
// ============================================

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
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = createRipple(e);
            button.appendChild(ripple);

            // Handle specific button actions
            const buttonText = button.textContent.toLowerCase();

            if (buttonText.includes('started') || buttonText.includes('trial')) {
                handleGetStarted(button);
            } else if (buttonText.includes('demo')) {
                handleWatchDemo(button);
            } else if (buttonText.includes('contact')) {
                handleContactSales(button);
            }
        });
    });
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
    console.log('Get Started clicked');
    showNotification('Welcome to FocusFlow! Starting your free trial...', 'success');

    // Simulate navigation to sign-up page
    setTimeout(() => {
        console.log('Navigating to sign-up page...');
    }, 1500);
}

/**
 * Handle "Watch Demo" button click
 */
function handleWatchDemo(button) {
    console.log('Watch Demo clicked');
    showModal('Demo Video', 'Demo video would play here. Feature coming soon!');
}

/**
 * Handle "Contact Sales" button click
 */
function handleContactSales(button) {
    console.log('Contact Sales clicked');
    showNotification('Redirecting to contact form...', 'info');
}

/**
 * Initialize navigation smooth scrolling
 */
function initializeNavigation() {
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
}

/**
 * Observe elements for scroll animations
 */
function observeElements() {
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
    document.querySelectorAll('.feature-card').forEach((card) => {
        observer.observe(card);
    });

    // Observe pricing cards
    document.querySelectorAll('.pricing-card').forEach((card) => {
        observer.observe(card);
    });

    // Observe steps
    document.querySelectorAll('.step').forEach((step) => {
        observer.observe(step);
    });
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
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

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
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
    const modal = document.createElement('div');
    modal.className = 'modal';

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
        modal.remove();
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

    document.body.appendChild(backdrop);
    document.body.appendChild(content);

    // Close modal on backdrop click
    backdrop.addEventListener('click', () => {
        modal.remove();
        backdrop.remove();
    });
}

/**
 * Add CSS animation styles dynamically
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add animation styles when script loads
addAnimationStyles();

// Export functions for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        showModal,
        handleGetStarted,
        handleWatchDemo
    };
}

// GreenScape JavaScript Functionality

// Scroll listener to make nav text white when scrolling
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-link-text');
    if (window.scrollY > 50) {
        navLinks.forEach(link => link.classList.add('scroll-white'));
    } else {
        navLinks.forEach(link => link.classList.remove('scroll-white'));
    }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// FAQ Accordion
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('.text-green-600');

        // Close other open items
        faqToggles.forEach(otherToggle => {
            if (otherToggle !== toggle) {
                otherToggle.nextElementSibling.classList.add('hidden');
                otherToggle.querySelector('.text-green-600').textContent = '+';
            }
        });

        // Toggle current item
        content.classList.toggle('hidden');
        icon.textContent = content.classList.contains('hidden') ? '+' : '−';
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Here you would normally send the data to a server
        // For now, we'll just show a success message
        console.log('Form Data:', data);
        showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();
    });
}

function showFormMessage(message, type) {
    if (!formMessage) return;

    formMessage.classList.remove('hidden');
    formMessage.textContent = message;

    if (type === 'success') {
        formMessage.classList.add('bg-green-100', 'text-green-800');
        formMessage.classList.remove('bg-red-100', 'text-red-800');
    } else {
        formMessage.classList.add('bg-red-100', 'text-red-800');
        formMessage.classList.remove('bg-green-100', 'text-green-800');
    }

    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioGrid = document.getElementById('portfolio-grid');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-green-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-800');
            });
            button.classList.remove('bg-gray-200', 'text-gray-800');
            button.classList.add('bg-green-600', 'text-white');

            // Filter items with animation
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filter === 'all' || itemCategory === filter) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Counter Animation for Statistics Section
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Observe counter section and trigger animation when visible
const counterSection = document.querySelector('.bg-gradient-to-br');
if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counters-animated')) {
                animateCounters();
                entry.target.classList.add('counters-animated');
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterObserver.observe(counterSection);
}

// Simple error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
        console.warn('Image failed to load:', img.src);
        // Image has fallback in HTML using onerror attribute
    });
});

// Add active state to navigation based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('text-green-200');
            link.classList.remove('hover:text-green-200');
        }
    });
}

setActiveNavLink();

// Log page load
console.log('GreenScape website loaded successfully!');

// --- Footer: dynamic year, newsletter and back-to-top ---
document.addEventListener('DOMContentLoaded', () => {
    // Dynamic year
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Newsletter handling (client-only)
    const newsletterForm = document.getElementById('footer-newsletter');
    const emailInput = document.getElementById('footer-newsletter-email');
    const newsletterMsg = document.getElementById('footer-newsletter-msg');

    function showNewsletterMessage(text, success = true) {
        if (!newsletterMsg) return;
        newsletterMsg.textContent = text;
        newsletterMsg.classList.remove('hidden');
        newsletterMsg.style.color = success ? '#bbf7d0' : '#fecaca';
        setTimeout(() => newsletterMsg.classList.add('hidden'), 5000);
    }

    if (newsletterForm && emailInput) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNewsletterMessage('Please enter a valid email address.', false);
                return;
            }

            // Simulate subscribe action
            console.log('Newsletter subscribe:', email);
            try {
                // store a simple record locally (optional)
                const subs = JSON.parse(localStorage.getItem('phl_newsletter') || '[]');
                subs.push({ email, date: new Date().toISOString() });
                localStorage.setItem('phl_newsletter', JSON.stringify(subs));
            } catch (err) {
                // ignore storage errors
            }

            emailInput.value = '';
            showNewsletterMessage('Thanks — you are subscribed!', true);
        });
    }

    // Back to top
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

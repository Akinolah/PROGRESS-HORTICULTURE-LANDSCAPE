

window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-link-text');
    if (window.scrollY > 50) {
        navLinks.forEach(link => link.classList.add('scroll-white'));
    } else {
        navLinks.forEach(link => link.classList.remove('scroll-white'));
    }
});


const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}


const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('.text-green-600');

        
        faqToggles.forEach(otherToggle => {
            if (otherToggle !== toggle) {
                otherToggle.nextElementSibling.classList.add('hidden');
                otherToggle.querySelector('.text-green-600').textContent = '+';
            }
        });

        
        content.classList.toggle('hidden');
        icon.textContent = content.classList.contains('hidden') ? '+' : '−';
    });
});


const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        
        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        
        
        console.log('Form Data:', data);
        showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');

        
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

    
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}


const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioGrid = document.getElementById('portfolio-grid');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-green-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-800');
            });
            button.classList.remove('bg-gray-200', 'text-gray-800');
            button.classList.add('bg-green-600', 'text-white');

            
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


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


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


document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; 
        const increment = target / (duration / 16); 
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


document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
        console.warn('Image failed to load:', img.src);
        
    });
});


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


console.log('GreenScape website loaded successfully!');


document.addEventListener('DOMContentLoaded', () => {
    
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    
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

            
            console.log('Newsletter subscribe:', email);
            try {
                
                const subs = JSON.parse(localStorage.getItem('phl_newsletter') || '[]');
                subs.push({ email, date: new Date().toISOString() });
                localStorage.setItem('phl_newsletter', JSON.stringify(subs));
            } catch (err) {
                
            }

            emailInput.value = '';
            showNewsletterMessage('Thanks — you are subscribed!', true);
        });
    }

    
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('puzzle-grid');
    if (!grid) return; 

    const shuffleBtn = document.getElementById('shuffle-btn');
    const solveBtn = document.getElementById('solve-btn');
    const modal = document.getElementById('puzzle-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.getElementById('modal-close');

    const imgs = Array.from({length:13}, (_,i)=>`../assets/${i+1}.jpg`);
    const captions = ['Modern Garden Design', 'Commercial Landscaping', 'Tropical Outdoor Living', 'Contemporary Hardscape', 'Residential Makeover', 'Zen Garden Retreat', 'Outdoor Entertainment Space', 'Eco-Friendly Landscape', 'Mediterranean Garden', 'Urban Park Development', 'Water Feature Installation', 'Seasonal Garden Transformation', 'Premium Estate Design'];

    const tiles = [];
    for(let i=0;i<imgs.length;i++){
        const el = document.createElement('button');
        el.type='button';
        el.className='puzzle-tile relative overflow-hidden w-full h-full puzzle-animate';
        el.style.backgroundImage = `url("${imgs[i]}")`;
        el.dataset.src = imgs[i];
        el.setAttribute('aria-label', captions[i] || 'Project image');

        
        const cap = document.createElement('span');
        cap.className = 'puzzle-caption';
        cap.textContent = captions[i];
        el.appendChild(cap);

        el.addEventListener('click', ()=>{
            if(modalImg) modalImg.src = el.dataset.src;
            if(modal){ modal.classList.remove('hidden'); modal.classList.add('flex'); }
        });
        tiles.push(el);
    }

    function render(ordered){
        grid.innerHTML='';
        ordered.forEach((tile, idx)=>{
            const wrapper = document.createElement('div');
            const cls = (idx%7===0) ? 'col-span-2 row-span-2' : '';
            wrapper.className = cls;
            wrapper.appendChild(tile);
            grid.appendChild(wrapper);
        });
    }

    render(tiles.slice());

    function closeModal(){
        if(!modal) return;
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        if(modalImg) modalImg.src='';
    }

    if(modalClose) modalClose.addEventListener('click', closeModal);
    if(modal) modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

    function shuffleAnimate(){
        const current = Array.from(tiles);
        current.forEach((t)=>{
            const rx = (Math.random()*160)-80;
            const ry = (Math.random()*120)-60;
            const rrot = (Math.random()*30)-15;
            t.style.transition = 'transform 700ms cubic-bezier(.2,.8,.2,1), opacity 700ms';
            t.style.transform = `translate(${rx}px, ${ry}px) rotate(${rrot}deg) scale(.92)`;
            t.style.opacity = '0.85';
        });

        setTimeout(()=>{
            for(let i=current.length-1;i>0;i--){
                const j = Math.floor(Math.random()*(i+1));
                [current[i], current[j]] = [current[j], current[i]];
            }
            render(current);
            requestAnimationFrame(()=>{
                const newTiles = grid.querySelectorAll('.puzzle-tile');
                newTiles.forEach((t)=>{
                    t.style.transition = 'transform 900ms cubic-bezier(.2,.8,.2,1), opacity 900ms';
                    t.style.transform = 'translate(0,0) rotate(0deg) scale(1)';
                    t.style.opacity = '1';
                });
            });
            while(tiles.length) tiles.pop();
            current.forEach(t=>tiles.push(t));
        }, 420);
    }

    function arrangeAnimate(){
        const ordered = Array.from(tiles).sort((a,b)=> a.dataset.src.localeCompare(b.dataset.src));
        render(ordered);
        const newTiles = grid.querySelectorAll('.puzzle-tile');
        newTiles.forEach((t,i)=>{
            t.style.opacity='0';
            t.style.transform='translateY(24px) scale(.96)';
            setTimeout(()=>{
                t.style.transition='transform 600ms cubic-bezier(.2,.8,.2,1), opacity 600ms';
                t.style.transform='translateY(0) scale(1)';
                t.style.opacity='1';
            }, i*80);
        });
        while(tiles.length) tiles.pop();
        ordered.forEach(t=>tiles.push(t));
    }

    if(shuffleBtn) shuffleBtn.addEventListener('click', shuffleAnimate);
    if(solveBtn) solveBtn.addEventListener('click', arrangeAnimate);

    document.addEventListener('keydown', (e)=>{ if(e.key==='Enter' && tiles[0]) { if(modalImg) modalImg.src = tiles[0].dataset.src; if(modal){ modal.classList.remove('hidden'); modal.classList.add('flex'); } } });
});



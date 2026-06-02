document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileDrawer();
    initCanvasHero();
    initFAQAccordions();
    initPortfolioHydration();
});

/* ==========================================================================
   1. NAVIGATION & ROUTING
   ========================================================================== */
function initNavigation() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Select all nav links across desktop and mobile
    const links = document.querySelectorAll('nav a, #mobile-drawer a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        // Match path exactly, or handle active root hash redirects
        if (href === currentPath || (currentPath === 'index.html' && href === '#')) {
            link.classList.add('nav-link-active');
            link.classList.remove('text-on-surface-variant', 'text-secondary', 'dark:text-surface-variant');
        } else {
            link.classList.remove('nav-link-active');
        }
    });

    // Shadow scroll effect on header
    const mainNav = document.getElementById('main-nav') || document.querySelector('nav');
    if (mainNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                mainNav.classList.add('nav-scroll-shadow');
            } else {
                mainNav.classList.remove('nav-scroll-shadow');
            }
        });
    }
}

/* ==========================================================================
   2. MOBILE DRAWER TRIGGER
   ========================================================================== */
function initMobileDrawer() {
    const triggers = document.querySelectorAll('.mobile-menu-trigger');
    const closeBtn = document.getElementById('close-drawer');
    const drawer = document.getElementById('mobile-drawer');

    if (drawer) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                drawer.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden'; // Lock scrolling
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                drawer.classList.add('translate-x-full');
                document.body.style.overflow = ''; // Unlock scrolling
            });
        }

        // Close drawer if clicking on links
        const drawerLinks = drawer.querySelectorAll('a');
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                drawer.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }
}

/* ==========================================================================
   3. INTERACTIVE CANVAS HERO (Particles Web Network)
   ========================================================================== */
function initCanvasHero() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;

    window.addEventListener('resize', () => {
        if (!canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    });

    const particles = [];
    const maxParticles = 50;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    let mouse = { x: null, y: null, radius: 120 };
    const parentSection = canvas.parentElement;

    parentSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    parentSection.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p, idx) => {
            p.update();
            p.draw();

            // Connect lines between nearby nodes
            for (let j = idx + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Connect to mouse interaction coordinates
            if (mouse.x !== null && mouse.y !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.25 * (1 - dist / mouse.radius)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   4. FAQ ACCORDIONS WITH MAX-HEIGHT DYNAMICS
   ========================================================================== */
function initFAQAccordions() {
    const accordions = document.querySelectorAll('.faq-accordion');
    
    accordions.forEach(acc => {
        const trigger = acc.querySelector('.faq-trigger');
        const panel = acc.querySelector('.faq-panel');

        if (trigger && panel) {
            trigger.addEventListener('click', () => {
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                
                // Toggle state attributes
                trigger.setAttribute('aria-expanded', !isExpanded);
                
                if (!isExpanded) {
                    // Open accordion: Set max-height to its scrollHeight
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                } else {
                    // Close accordion: Reset max-height
                    panel.style.maxHeight = '0px';
                }
            });
        }
    });
}

/* ==========================================================================
   5. ASYNCHRONOUS PORTFOLIO HYDRATION (SHEETY API)
   ========================================================================== */
const SHEETY_API_URL = 'https://api.sheety.co/1619ced54722cb867bf6e168214216ca/works/workdetails';

// If your Sheety endpoint has Authorization enabled on your Sheety dashboard,
// paste your Bearer Token here (e.g. 'yoursecrettoken123').
// If you want it public, disable Authentication in your Sheety project settings.
const SHEETY_BEARER_TOKEN = 'avorawebstudiosheetytoken'; 

async function initPortfolioHydration() {
    const featuredContainer = document.getElementById('featured-work-container');
    const portfolioContainer = document.getElementById('portfolio-container');

    // Return if neither target exists on the page
    if (!featuredContainer && !portfolioContainer) return;

    try {
        // Prevent browser caching using cache: 'no-store' and a random cache-buster query parameter
        const fetchUrl = `${SHEETY_API_URL}?cb=${new Date().getTime()}`;
        const fetchOptions = {
            cache: 'no-store',
            headers: {}
        };

        if (SHEETY_BEARER_TOKEN) {
            fetchOptions.headers['Authorization'] = `Bearer ${SHEETY_BEARER_TOKEN}`;
        }

        const response = await fetch(fetchUrl, fetchOptions);
        if (!response.ok) {
            throw new Error(`API returned HTTP status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle sheet-wrapped lists or flat arrays
        const rawProjects = Array.isArray(data) 
            ? data 
            : (data.workdetails || data.works || Object.values(data)[0] || []);

        // Sort projects by year descending (newest first)
        const projects = rawProjects.sort((a, b) => {
            const yearA = parseInt(a.year) || 0;
            const yearB = parseInt(b.year) || 0;
            return yearB - yearA;
        });

        if (projects.length === 0) {
            throw new Error('Project array is empty');
        }

        // Hydrate targets
        if (featuredContainer) {
            hydrateFeaturedGrid(featuredContainer, projects.slice(0, 3));
        }

        if (portfolioContainer) {
            hydratePortfolioGrid(portfolioContainer, projects);
        }

    } catch (error) {
        console.error('Portfolio Hydration Engine Error:', error);
        
        // Handle Error State: Clear skeletons and render fallback text
        const fallbackHTML = `
            <div class="col-span-full py-12 px-6 border border-dashed border-outline-variant bg-surface-container-lowest rounded text-center">
                <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                    Our selected portfolio is temporarily updating. Please view our contact page to discuss our standard client implementations.
                </p>
            </div>
        `;

        if (featuredContainer) {
            featuredContainer.innerHTML = fallbackHTML;
        }
        if (portfolioContainer) {
            portfolioContainer.innerHTML = fallbackHTML;
        }
    }
}

function hydrateFeaturedGrid(container, items) {
    container.innerHTML = ''; // Clear skeleton blocks

    items.forEach(item => {
        const card = document.createElement('a');
        card.className = 'group block opacity-0 transition-all duration-500 transform translate-y-4';
        card.href = item.projectUrl || '#';
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        card.innerHTML = `
            <div class="aspect-[4/3] border border-surface-variant bg-surface-container overflow-hidden mb-4 rounded relative">
                <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300">
            </div>
            <div class="flex justify-between items-start">
                <div class="pr-4">
                    <h3 class="font-headline-sm text-headline-sm text-primary group-hover:underline transition-all">${item.title}</h3>
                    <p class="font-body-md text-body-md text-on-surface-variant mt-1">${item.description}</p>
                </div>
                <span class="font-label-xs text-label-xs bg-surface-container-high px-2 py-1 rounded text-primary flex-shrink-0">${item.year}</span>
            </div>
        `;

        container.appendChild(card);
        
        // Trigger smooth fade-in entry effect
        setTimeout(() => {
            card.classList.remove('opacity-0', 'translate-y-4');
        }, 50);
    });
}

function hydratePortfolioGrid(container, items) {
    container.innerHTML = ''; // Clear skeleton blocks

    items.forEach((item, index) => {
        const article = document.createElement('article');
        // Alternating staggered layout grid using margin-top offset on even items on medium screens+
        const staggeredClass = index % 2 === 1 ? 'md:mt-[80px]' : '';
        article.className = `group cursor-pointer opacity-0 transition-all duration-500 transform translate-y-4 ${staggeredClass}`;

        article.innerHTML = `
            <a href="${item.projectUrl || '#'}" target="_blank" rel="noopener noreferrer" class="block">
                <div class="relative w-full aspect-[4/3] bg-surface-container overflow-hidden mb-6 border border-surface-variant rounded">
                    <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300">
                </div>
                <div class="flex justify-between items-start">
                    <div class="pr-4">
                        <h3 class="font-headline-sm text-headline-sm text-primary mb-1 group-hover:underline transition-all">${item.title}</h3>
                        <p class="font-body-md text-body-md text-on-surface-variant">${item.description}</p>
                    </div>
                    <span class="font-label-xs text-label-xs bg-surface-container text-on-surface px-2 py-1 rounded flex-shrink-0">${item.category}</span>
                </div>
            </a>
        `;

        container.appendChild(article);
        
        // Trigger smooth fade-in entry effect
        setTimeout(() => {
            article.classList.remove('opacity-0', 'translate-y-4');
        }, 50 * index); // Stagger element fade-in animations
    });
}

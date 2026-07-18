document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById('featured-work-grid');
    const portfolioContainer = document.getElementById('portfolio-container');

    // Premium monochrome abstract placeholder image to use if an item lacks an image
    const DEFAULT_PROJECT_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';

    if (featuredContainer) {
        renderFeaturedGrid(featuredContainer, featuredWork.slice(0, 3), DEFAULT_PROJECT_IMAGE);

        const viewAllLink = document.getElementById('view-all-link');
        if (viewAllLink) {
            viewAllLink.addEventListener('click', (e) => {
                e.preventDefault();
                initializeFeaturedSlider(featuredContainer, featuredWork, DEFAULT_PROJECT_IMAGE, viewAllLink);
            });
        }
    }

    if (portfolioContainer) {
        renderPortfolioGrid(portfolioContainer, featuredWork, DEFAULT_PROJECT_IMAGE);
    }
});

/**
 * Initializes the Featured Work horizontal slider
 */
function initializeFeaturedSlider(container, items, defaultImage, viewAllLink) {
    // Show View All link as activated (bolder, pointer events disabled)
    if (viewAllLink) {
        viewAllLink.classList.add('font-bold', 'pointer-events-none');
    }

    // Reconfigure grid container to be a viewport container
    container.innerHTML = '';
    container.className = 'w-full overflow-hidden relative block';

    // Create flex track
    const track = document.createElement('div');
    track.id = 'featured-work-track';
    track.className = 'flex transition-transform duration-500 ease-in-out';
    track.style.gap = '32px';
    track.style.transform = 'translateX(0px)';
    container.appendChild(track);

    // Filter valid items
    const validItems = items.filter(item => item.title && item.title.trim());

    function getCardFlexBasis() {
        if (window.innerWidth >= 1024) {
            return '0 0 calc(33.333% - 21.33px)';
        } else if (window.innerWidth >= 768) {
            return '0 0 calc(50% - 16px)';
        } else {
            return '0 0 100%';
        }
    }

    function getItemsVisible() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    // Render cards
    validItems.forEach((item, index) => {
        const imageUrl = item.image && item.image.trim() ? item.image : defaultImage;

        const card = document.createElement('a');
        card.className = 'group block opacity-0 transition-all duration-500 transform translate-y-4';
        card.href = item.link || '#';
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.style.flex = getCardFlexBasis();

        card.innerHTML = `
            <div class="aspect-[4/3] border border-surface-variant bg-surface-container overflow-hidden mb-4 rounded relative">
                <img src="${imageUrl}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-300">
            </div>
            <div class="flex justify-between items-start">
                <div class="pr-4">
                    <h3 class="font-headline-sm text-headline-sm text-primary group-hover:underline transition-all">${item.title}</h3>
                    <p class="font-body-md text-body-md text-on-surface-variant mt-1">${item.caption || ''}</p>
                </div>
                ${item.year ? `<span class="font-label-xs text-label-xs bg-surface-container-high px-2 py-1 rounded text-primary flex-shrink-0">${item.year}</span>` : ''}
            </div>
        `;
        track.appendChild(card);

        setTimeout(() => {
            card.classList.remove('opacity-0', 'translate-y-4');
        }, 50 * index);
    });

    // Create and append control buttons
    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'featured-work-controls';
    controlsContainer.className = 'flex justify-end gap-4 mt-8 opacity-0 transition-opacity duration-500';
    controlsContainer.innerHTML = `
        <button id="slider-prev" style="border-radius: 50%;" class="w-12 h-12 border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary cursor-pointer" aria-label="Previous Project" disabled>
            <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <button id="slider-next" style="border-radius: 50%;" class="w-12 h-12 border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary cursor-pointer" aria-label="Next Project">
            <span class="material-symbols-outlined">arrow_forward</span>
        </button>
    `;
    container.parentElement.appendChild(controlsContainer);
    setTimeout(() => controlsContainer.classList.remove('opacity-0'), 100);

    let currentIndex = 0;
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');

    function updateSliderPosition() {
        const cardWidth = track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width : 0;
        const gap = 32;
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;

        const itemsVisible = getItemsVisible();
        const maxIndex = Math.max(0, validItems.length - itemsVisible);

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    nextBtn.addEventListener('click', () => {
        const itemsVisible = getItemsVisible();
        const maxIndex = Math.max(0, validItems.length - itemsVisible);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    // Debounced resize listener
    let resizeTimer;
    const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const flexBasis = getCardFlexBasis();
            const cards = track.querySelectorAll('a');
            cards.forEach(card => {
                card.style.flex = flexBasis;
            });

            const itemsVisible = getItemsVisible();
            const maxIndex = Math.max(0, validItems.length - itemsVisible);
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            updateSliderPosition();
        }, 150);
    };

    window.addEventListener('resize', handleResize);
    
    // Initial position update to handle correct state on start
    setTimeout(updateSliderPosition, 100);
}

/**
 * Renders the Home page featured portfolio grid (up to 3 items)
 */
function renderFeaturedGrid(container, items, defaultImage) {
    container.innerHTML = ''; // Clear skeleton blocks

    items.forEach(item => {
        // Error handling: If title is missing, skip the card
        if (!item.title || !item.title.trim()) return;

        // Error handling: If image is missing, show placeholder image
        const imageUrl = item.image && item.image.trim() ? item.image : defaultImage;

        const card = document.createElement('a');
        card.className = 'group block opacity-0 transition-all duration-500 transform translate-y-4';
        card.href = item.link || '#';
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        card.innerHTML = `
            <div class="aspect-[4/3] border border-surface-variant bg-surface-container overflow-hidden mb-4 rounded relative">
                <img src="${imageUrl}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-300">
            </div>
            <div class="flex justify-between items-start">
                <div class="pr-4">
                    <h3 class="font-headline-sm text-headline-sm text-primary group-hover:underline transition-all">${item.title}</h3>
                    <p class="font-body-md text-body-md text-on-surface-variant mt-1">${item.caption || ''}</p>
                </div>
                ${item.year ? `<span class="font-label-xs text-label-xs bg-surface-container-high px-2 py-1 rounded text-primary flex-shrink-0">${item.year}</span>` : ''}
            </div>
        `;

        container.appendChild(card);
        
        // Trigger smooth fade-in entry effect
        setTimeout(() => {
            card.classList.remove('opacity-0', 'translate-y-4');
        }, 50);
    });
}

/**
 * Renders the Work index page dynamic portfolio grid (staggered alternating layout)
 */
function renderPortfolioGrid(container, items, defaultImage) {
    container.innerHTML = ''; // Clear skeleton blocks

    items.forEach((item, index) => {
        // Error handling: If title is missing, skip the card
        if (!item.title || !item.title.trim()) return;

        // Error handling: If image is missing, show placeholder image
        const imageUrl = item.image && item.image.trim() ? item.image : defaultImage;

        const article = document.createElement('article');
        // Alternating staggered layout grid using margin-top offset on even items on medium screens+
        const staggeredClass = index % 2 === 1 ? 'md:mt-[80px]' : '';
        article.className = `group cursor-pointer opacity-0 transition-all duration-500 transform translate-y-4 ${staggeredClass}`;

        article.innerHTML = `
            <a href="${item.link || '#'}" target="_blank" rel="noopener noreferrer" class="block">
                <div class="relative w-full aspect-[4/3] bg-surface-container overflow-hidden mb-6 border border-surface-variant rounded">
                    <img src="${imageUrl}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-300">
                </div>
                <div class="flex justify-between items-start">
                    <div class="pr-4">
                        <h3 class="font-headline-sm text-headline-sm text-primary mb-1 group-hover:underline transition-all">${item.title}</h3>
                        <p class="font-body-md text-body-md text-on-surface-variant">${item.caption || ''}</p>
                    </div>
                    ${item.category ? `<span class="font-label-xs text-label-xs bg-surface-container text-on-surface px-2 py-1 rounded flex-shrink-0">${item.category}</span>` : ''}
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

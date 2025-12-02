/**
 * Product Catalog JavaScript
 * Handles dynamic product rendering, filtering, search, and modal interactions
 */

// Product Data Array (20 Items)
const products = [
    {
        id: 'me-001',
        name: 'Advanced Patient Monitor',
        category: 'medical-equipment',
        image: '../assets/products/monitor.jpg',
        description: 'Multi-parameter patient monitor for ICU and critical care settings. Features ECG, SpO2, NIBP, and temperature monitoring.',
        features: ['12.1" High-resolution display', 'Arrhythmia analysis', 'Built-in recorder', 'Network capability']
    },
    {
        id: 'me-002',
        name: 'ICU Ventilator System',
        category: 'medical-equipment',
        image: '../assets/products/icu_ventilator_1764525414886.png',
        description: 'High-performance ventilator designed for adult and pediatric patients. Offers invasive and non-invasive ventilation modes.',
        features: ['Touchscreen interface', 'Battery backup (4 hours)', 'Lung mechanics monitoring', 'Low noise operation']
    },
    {
        id: 'me-003',
        name: 'Digital X-Ray System',
        category: 'medical-equipment',
        image: '../assets/products/xray.png',
        description: 'State-of-the-art digital radiography system providing high-quality imaging with low radiation dose.',
        features: ['Max speed 15000 RPM', 'Digital timer', 'Safety lid lock', 'Brushless motor']
    },
    {
        id: 'li-004',
        name: 'Hematology Analyzer',
        category: 'laboratory-instruments',
        image: '../assets/products/hemato.jpeg',
        description: '3-part differential automated hematology analyzer for CBC testing.',
        features: ['60 samples/hour', '10.4" Touchscreen', 'Low reagent consumption', 'Large storage']
    },
    {
        id: 'li-005',
        name: 'Autoclave Sterilizer',
        category: 'laboratory-instruments',
        image: '../assets/products/autoconcave.jpeg',
        description: 'Vertical steam sterilizer for laboratory glassware and media.',
        features: ['Digital temperature control', 'Safety valve', 'Stainless steel chamber', 'Auto shut-off']
    },
    {
        id: 'ph-001',
        name: 'Amoxicillin Capsules',
        category: 'pharmaceuticals',
        image: '../assets/products/amoxicillin.jpg',
        description: 'Broad-spectrum antibiotic for treating bacterial infections.',
        features: ['500mg dosage', 'Blister pack', 'WHO-GMP certified', 'Long shelf life']
    },
    {
        id: 'ph-002',
        name: 'Paracetamol Tablets',
        category: 'pharmaceuticals',
        image: '../assets/products/paracetamol.jpg',
        description: 'Effective analgesic and antipyretic for pain relief and fever reduction.',
        features: ['650mg dosage', 'Fast acting', 'Safety coated', 'Bulk packaging available']
    },
    {
        id: 'ph-003',
        name: 'Vitamin C Supplements',
        category: 'pharmaceuticals',
        image: '../assets/products/vitaminc.jpg',
        description: 'Immunity boosting Vitamin C chewable tablets.',
        features: ['500mg Ascorbic Acid', 'Orange flavor', 'Sugar-free option', 'Antioxidant support']
    },
    {
        id: 'ph-004',
        name: 'Insulin Injection',
        category: 'pharmaceuticals',
        image: '../assets/products/insulin.jpeg',
        description: 'Rapid-acting insulin for diabetes management.',
        features: ['100 IU/ml', 'Vial or cartridge', 'Cold chain delivery', 'High purity']
    },
    {
        id: 'ph-005',
        name: 'Surgical Gloves',
        category: 'pharmaceuticals',
        image: '../assets/products/Gloves.jpeg',
        description: 'Sterile latex surgical gloves for medical procedures.',
        features: ['Powder-free', 'Micro-textured', 'High tensile strength', 'AQL 1.5']
    },
    {
        id: 'ph-006',
        name: 'N95 Respirator Masks',
        category: 'pharmaceuticals',
        image: '../assets/products/masks.jpg',
        description: 'High-filtration face masks for protection against airborne particles.',
        features: ['5-layer protection', 'Adjustable nose clip', 'Comfortable ear loops', 'NIOSH approved']
    },
    {
        id: 'me-007',
        name: 'Infusion Pump',
        category: 'medical-equipment',
        image: '../assets/products/infusion.png',
        description: 'Volumetric infusion pump for precise fluid delivery.',
        features: ['Flow rate 0.1-1200 ml/h', 'KVO function', 'Air bubble detection', 'Occlusion alarm']
    },
    {
        id: 'li-006',
        name: 'Pipette Set',
        category: 'laboratory-instruments',
        image: '../assets/products/pipette.jpg',
        description: 'Variable volume micropipettes for liquid handling.',
        features: ['Autoclavable', 'Ergonomic design', 'High accuracy', 'Volume lock']
    },
    {
        id: 'ph-007',
        name: 'First Aid Kit',
        category: 'pharmaceuticals',
        image: '../assets/products/firstaid.jpg',
        description: 'Comprehensive first aid kit for emergency response.',
        features: ['ISO certified contents', 'Durable case', 'Wall mountable', 'Multi-purpose']
    }
];

console.log('Products array loaded:', products.length, 'products');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');

    // Check if we are on the catalog page by looking for the grid
    const gridContainer = document.getElementById('product-grid');
    console.log('Grid container found:', !!gridContainer);

    if (gridContainer) {
        console.log('Rendering products...');
        renderProducts('all');

        // Search Listener
        const searchInput = document.getElementById('equipment-search');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                performSearch(e.target.value);
            });
        }
    } else {
        console.error('Product grid container not found!');
    }
});

/**
 * Render products based on category
 * @param {string} category - Category to filter by ('all' or specific category)
 */
function renderProducts(category) {
    console.log('renderProducts called with category:', category);
    const container = document.getElementById('product-grid');
    if (!container) {
        console.error('Container not found in renderProducts!');
        return;
    }

    container.innerHTML = ''; // Clear existing
    console.log('Container cleared');

    const filteredProducts = category === 'all'
        ? products
        : products.filter(p => p.category === category);

    console.log('Filtered products count:', filteredProducts.length);

    if (filteredProducts.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-10 text-text-secondary">No products found.</div>';
        return;
    }

    filteredProducts.forEach((product, index) => {
        console.log(`Rendering product ${index + 1}:`, product.name);
        const card = document.createElement('div');
        card.className = 'product-item bg-white rounded-2xl border border-border overflow-hidden hover:shadow-medium transition-all group cursor-pointer';

        // Modal Trigger
        card.onclick = () => {
            console.log('Card clicked for product:', product.id);
            openProductModal(product.id);
        };

        card.innerHTML = `
            <div class="h-48 bg-surface-100 relative overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span class="opacity-0 group-hover:opacity-100 bg-white/90 text-primary-700 px-4 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        View Details
                    </span>
                </div>
            </div>
            <div class="p-6">
                <div class="flex gap-2 mb-3">
                    <span class="text-xs font-bold px-2 py-1 bg-primary-50 text-primary-700 rounded uppercase tracking-wider">${product.category.replace('-', ' ')}</span>
                </div>
                <h4 class="text-lg font-bold text-text-primary mb-2">${product.name}</h4>
                <p class="text-text-secondary text-sm mb-4 line-clamp-2">${product.description}</p>
                <button class="w-full py-2.5 border border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                    View Details
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    console.log('All products rendered successfully');
}

function openProductModal(productId) {
    console.log('Opening modal for product:', productId);
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    const modal = document.getElementById('product-modal');
    if (!modal) {
        console.error('Modal element not found!');
        return;
    }

    // Populate Modal Data
    const modalImage = document.getElementById('modal-image');
    if (modalImage) modalImage.src = product.image;

    const modalCategory = document.getElementById('modal-category');
    if (modalCategory) modalCategory.textContent = product.category.replace('-', ' ');

    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) modalTitle.textContent = product.name;

    const modalDescription = document.getElementById('modal-description');
    if (modalDescription) modalDescription.textContent = product.description;

    const modalContactBtn = document.getElementById('modal-contact-btn');
    if (modalContactBtn) modalContactBtn.href = `contact_and_support.html?inquiry=${product.id}`;

    // Populate Features
    const featuresList = document.getElementById('modal-features');
    if (featuresList) {
        featuresList.innerHTML = product.features.map(f => `
            <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>${f}</span>
            </li>
        `).join('');
    }

    // Show Modal
    console.log('Removing hidden class from modal');
    modal.classList.remove('hidden');
    modal.style.display = 'block'; // Force display
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Close Product Modal
 */
window.closeProductModal = function () {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none'; // Force hide
        document.body.style.overflow = ''; // Restore scrolling
    }
};

/**
 * Filter by Category Button Click
 */
window.filterByCategory = function (category) {
    // Update active state
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderProducts(category);
};

/**
 * Search Functionality
 */
window.performSearch = function (query) {
    const term = query.toLowerCase().trim();
    const container = document.getElementById('product-grid');
    if (!container) return;

    container.innerHTML = '';

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );

    if (filteredProducts.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-10 text-text-secondary">No products found matching your search.</div>';
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-item bg-white rounded-2xl border border-border overflow-hidden hover:shadow-medium transition-all group cursor-pointer';

        // Modal Trigger
        card.onclick = () => openProductModal(product.id);

        card.innerHTML = `
            <div class="h-48 bg-surface-100 relative overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div class="p-6">
                <div class="flex gap-2 mb-3">
                    <span class="text-xs font-bold px-2 py-1 bg-primary-50 text-primary-700 rounded uppercase tracking-wider">${product.category.replace('-', ' ')}</span>
                </div>
                <h4 class="text-lg font-bold text-text-primary mb-2">${product.name}</h4>
                <p class="text-text-secondary text-sm mb-4 line-clamp-2">${product.description}</p>
                <button class="w-full py-2.5 border border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                    View Details
                </button>
            </div>
        `;
        container.appendChild(card);
    });
};

/**
 * Filters Panel Toggle
 */
window.toggleFilters = function () {
    const panel = document.getElementById('filters-panel');
    if (panel) {
        panel.classList.toggle('hidden');
    }
};

window.resetFilters = function () {
    renderProducts('all');
    const panel = document.getElementById('filters-panel');
    if (panel) panel.classList.add('hidden');
};

window.applyFilters = function () {
    // Placeholder for advanced filter logic
    const panel = document.getElementById('filters-panel');
    if (panel) panel.classList.add('hidden');
};

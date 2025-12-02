/**
 * 3D Model Viewer for Medical Equipment
 * Handles Three.js scene setup, model loading, and user interactions
 */

// Model configuration
const MODELS = [
    {
        file: 'medical_ventilator.glb',
        name: 'Medical Ventilator',
        description: 'Advanced life support equipment with precision controls for critical care'
    },
    {
        file: 'wheel_chair.glb',
        name: 'Wheelchair',
        description: 'Ergonomic wheelchair designed for patient comfort and mobility'
    },
    {
        file: 'stretcher.glb',
        name: 'Medical Stretcher',
        description: 'Professional stretcher for safe patient transport'
    },
    {
        file: 'microscope.glb',
        name: 'Laboratory Microscope',
        description: 'High-precision microscope for medical diagnostics and research'
    },
    {
        file: 'sci-fi_medical_scanner2.glb',
        name: 'Medical Scanner',
        description: 'Advanced diagnostic scanning equipment for detailed medical imaging'
    },
    {
        file: 'neonatal_unit_of_a_hospital.glb',
        name: 'Neonatal Care Unit',
        description: 'Complete neonatal intensive care unit setup'
    },
    {
        file: 'realistic_medical_equipment_and_accessories_set.glb',
        name: 'Medical Equipment Set',
        description: 'Comprehensive set of medical tools and accessories'
    },
    {
        file: 'lic_trainer_2_equipment_7634.glb',
        name: 'Training Equipment',
        description: 'Professional medical training and simulation equipment'
    },
    {
        file: 'medical_equipment.glb',
        name: 'Medical Equipment',
        description: 'Essential medical equipment for healthcare facilities'
    },
    {
        file: 'medical_equipment (1).glb',
        name: 'Diagnostic Equipment',
        description: 'Advanced diagnostic and monitoring equipment'
    },
    {
        file: '6413b9a40bcf40d8982b6389a165f808.glb',
        name: 'Hospital Equipment',
        description: 'Professional hospital-grade medical equipment'
    }
];

// Check dependencies
if (typeof THREE === 'undefined') {
    console.error('Three.js is not loaded!');
} else {
    console.log(`Three.js loaded. Revision: ${THREE.REVISION}`);
}

class Model3DViewer {
    constructor(canvasId, loadingId) {
        console.log(`Initializing viewer for ${canvasId}`);
        this.canvas = document.getElementById(canvasId);
        this.loadingEl = document.getElementById(loadingId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentModel = null;
        this.animationId = null;

        if (!this.canvas) {
            console.error(`Canvas element ${canvasId} not found`);
            return;
        }

        try {
            this.init();
        } catch (e) {
            console.error(`Error in init for ${canvasId}: ${e.message}`);
        }
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            45,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 2, 5);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        this.scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight1.position.set(5, 5, 5);
        this.scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight2.position.set(-5, 3, -5);
        this.scene.add(directionalLight2);

        const fillLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
        this.scene.add(fillLight);

        // Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 10;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.0;

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Start animation loop
        this.animate();
        console.log(`Viewer initialized for ${this.canvas.id}`);
    }

    loadModel(modelPath) {
        const fullPath = `../assets/${modelPath}`;
        console.log(`Loading: ${modelPath}`);

        // Show loading
        if (this.loadingEl) this.loadingEl.style.display = 'block';

        // Remove existing model
        if (this.currentModel) {
            this.scene.remove(this.currentModel);
            this.currentModel = null;
        }

        // Load new model
        const loader = new THREE.GLTFLoader();

        loader.load(
            fullPath,
            (gltf) => {
                console.log(`Loaded: ${modelPath}`);
                this.currentModel = gltf.scene;

                // Center and scale model
                const box = new THREE.Box3().setFromObject(this.currentModel);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                const maxDim = Math.max(size.x, size.y, size.z);
                // Robust scaling: default to 1 if invalid
                let scale = 1;
                if (maxDim > 0 && isFinite(maxDim)) {
                    scale = 3 / maxDim;
                }

                this.currentModel.scale.multiplyScalar(scale);

                // Center the model
                const scaledCenter = center.clone().multiplyScalar(scale);
                this.currentModel.position.sub(scaledCenter);

                // Lift model slightly above grid
                this.currentModel.position.y += 0.5;

                this.scene.add(this.currentModel);

                // Hide loading
                if (this.loadingEl) this.loadingEl.style.display = 'none';

                // Reset camera
                this.controls.reset();
            },
            (progress) => {
                // Loading progress
            },
            (err) => {
                console.error(`Error loading model ${modelPath}: ${err.message || err}`);
                if (this.loadingEl) {
                    this.loadingEl.innerHTML = '<div style="color: white;">Error loading model</div>';
                }
            }
        );
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        if (!this.canvas.clientWidth || !this.canvas.clientHeight) return;

        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }

    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.controls) {
            this.controls.dispose();
        }
    }
}

// Initialize viewers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');

    // Hero viewer
    try {
        const heroViewer = new Model3DViewer('hero-canvas', 'hero-loading');
        heroViewer.loadModel(MODELS[0].file); // Load featured model
    } catch (e) {
        console.error(`Hero viewer init failed: ${e.message}`);
    }

    // Fullscreen viewer
    let fullscreenViewer = null;

    // Generate gallery cards
    const modelsGrid = document.getElementById('models-grid');
    if (!modelsGrid) {
        console.error('Models grid element not found!');
        return;
    }

    MODELS.forEach((model, index) => {
        const card = document.createElement('div');
        card.className = 'model-card bg-white rounded-2xl shadow-md overflow-hidden border-2 border-gray-100 hover:border-primary transition-all duration-300';

        card.innerHTML = `
      <div class="model-viewer-container gallery-3d-viewer">
        <canvas id="gallery-canvas-${index}" class="model-viewer-canvas"></canvas>
        <div id="gallery-loading-${index}" class="loading-spinner"></div>
      </div>
      <div class="p-6">
        <h3 class="text-xl font-bold text-text-primary mb-2">${model.name}</h3>
        <p class="text-text-secondary text-sm mb-4">${model.description}</p>
        <button onclick="openFullscreen(${index})" 
          class="w-full px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          View in Fullscreen
        </button>
      </div>
    `;

        modelsGrid.appendChild(card);

        // Initialize gallery viewer for this card
        setTimeout(() => {
            try {
                const galleryViewer = new Model3DViewer(`gallery-canvas-${index}`, `gallery-loading-${index}`);
                galleryViewer.loadModel(model.file);
                galleryViewer.controls.autoRotate = true;
                galleryViewer.controls.autoRotateSpeed = 2.0;
            } catch (e) {
                console.error(`Gallery viewer ${index} init failed: ${e.message}`);
            }
        }, index * 100); // Stagger loading
    });

    // Fullscreen functionality
    window.openFullscreen = (modelIndex) => {
        const modal = document.getElementById('fullscreen-modal');
        const model = MODELS[modelIndex];

        // Update info
        document.getElementById('fullscreen-title').textContent = model.name;
        document.getElementById('fullscreen-description').textContent = model.description;

        // Show modal
        modal.classList.add('active');

        // Initialize viewer if not exists
        if (!fullscreenViewer) {
            fullscreenViewer = new Model3DViewer('fullscreen-canvas', 'fullscreen-loading');
        }

        // Load model
        fullscreenViewer.loadModel(model.file);
        fullscreenViewer.controls.autoRotate = false; // Allow manual control
    };

    window.closeFullscreen = () => {
        document.getElementById('fullscreen-modal').classList.remove('active');
    };
});

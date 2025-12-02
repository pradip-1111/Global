/**
 * Interactive 3D Globe
 * Renders a rotating globe that follows cursor movement
 */

class Globe3D {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = this.canvas.offsetWidth;
        this.height = this.canvas.height = this.canvas.offsetHeight;

        // Globe properties
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.radius = Math.min(this.width, this.height) * 0.35;

        // Rotation angles
        this.rotationX = 0;
        this.rotationY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;

        // Mouse tracking
        this.mouseX = 0;
        this.mouseY = 0;

        // Generate globe points
        this.points = this.generateGlobePoints();

        // Start animation
        this.animate();
        this.setupEventListeners();
    }

    generateGlobePoints() {
        const points = [];
        const numPoints = 800; // Number of points on globe

        for (let i = 0; i < numPoints; i++) {
            // Fibonacci sphere algorithm for even distribution
            const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            const x = this.radius * Math.sin(phi) * Math.cos(theta);
            const y = this.radius * Math.sin(phi) * Math.sin(theta);
            const z = this.radius * Math.cos(phi);

            points.push({ x, y, z, originalZ: z });
        }

        return points;
    }

    setupEventListeners() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left - this.centerX;
            this.mouseY = e.clientY - rect.top - this.centerY;

            // Calculate target rotation based on mouse position
            this.targetRotationY = (this.mouseX / this.width) * Math.PI * 0.3;
            this.targetRotationX = -(this.mouseY / this.height) * Math.PI * 0.3;
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.width = this.canvas.width = this.canvas.offsetWidth;
            this.height = this.canvas.height = this.canvas.offsetHeight;
            this.centerX = this.width / 2;
            this.centerY = this.height / 2;
            this.radius = Math.min(this.width, this.height) * 0.35;
            this.points = this.generateGlobePoints();
        });
    }

    rotatePoint(point, angleX, angleY) {
        // Rotate around Y axis
        let x = point.x * Math.cos(angleY) - point.z * Math.sin(angleY);
        let z = point.x * Math.sin(angleY) + point.z * Math.cos(angleY);

        // Rotate around X axis
        let y = point.y * Math.cos(angleX) - z * Math.sin(angleX);
        z = point.y * Math.sin(angleX) + z * Math.cos(angleX);

        return { x, y, z };
    }

    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Smooth rotation interpolation
        this.rotationX += (this.targetRotationX - this.rotationX) * 0.05;
        this.rotationY += (this.targetRotationY - this.rotationY) * 0.05;

        // Auto-rotation when mouse is not moving
        this.rotationY += 0.002;

        // Sort points by z-depth for proper rendering
        const rotatedPoints = this.points.map(point => {
            const rotated = this.rotatePoint(point, this.rotationX, this.rotationY);
            return {
                ...rotated,
                distance: rotated.z
            };
        }).sort((a, b) => a.distance - b.distance);

        // Draw points
        rotatedPoints.forEach(point => {
            // Calculate screen position
            const scale = 300 / (300 + point.z);
            const x2d = point.x * scale + this.centerX;
            const y2d = point.y * scale + this.centerY;

            // Calculate opacity based on z-position (depth)
            const opacity = (point.z + this.radius) / (2 * this.radius);

            // Calculate size based on depth
            const size = 1.5 + opacity * 1.5;

            // Draw point
            this.ctx.beginPath();
            this.ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.8})`; // Blue color
            this.ctx.fill();

            // Add glow effect for front-facing points
            if (opacity > 0.7) {
                this.ctx.beginPath();
                this.ctx.arc(x2d, y2d, size * 2, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(147, 197, 253, ${(opacity - 0.7) * 0.3})`;
                this.ctx.fill();
            }
        });

        // Draw subtle grid lines
        this.drawGridLines();

        // Continue animation
        requestAnimationFrame(() => this.animate());
    }

    drawGridLines() {
        const numLatitudes = 12;
        const numLongitudes = 18;

        this.ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
        this.ctx.lineWidth = 1;

        // Draw latitude lines
        for (let i = 0; i < numLatitudes; i++) {
            const lat = (i / numLatitudes) * Math.PI;
            this.drawLatitudeLine(lat);
        }

        // Draw longitude lines
        for (let i = 0; i < numLongitudes; i++) {
            const lon = (i / numLongitudes) * Math.PI * 2;
            this.drawLongitudeLine(lon);
        }
    }

    drawLatitudeLine(lat) {
        const points = [];
        const segments = 50;

        for (let i = 0; i <= segments; i++) {
            const lon = (i / segments) * Math.PI * 2;
            const x = this.radius * Math.sin(lat) * Math.cos(lon);
            const y = this.radius * Math.cos(lat);
            const z = this.radius * Math.sin(lat) * Math.sin(lon);

            const rotated = this.rotatePoint({ x, y, z }, this.rotationX, this.rotationY);

            if (rotated.z > -this.radius * 0.3) { // Only draw visible parts
                const scale = 300 / (300 + rotated.z);
                points.push({
                    x: rotated.x * scale + this.centerX,
                    y: rotated.y * scale + this.centerY
                });
            }
        }

        if (points.length > 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(points[0].x, points[0].y);
            points.forEach(p => this.ctx.lineTo(p.x, p.y));
            this.ctx.stroke();
        }
    }

    drawLongitudeLine(lon) {
        const points = [];
        const segments = 50;

        for (let i = 0; i <= segments; i++) {
            const lat = (i / segments) * Math.PI;
            const x = this.radius * Math.sin(lat) * Math.cos(lon);
            const y = this.radius * Math.cos(lat);
            const z = this.radius * Math.sin(lat) * Math.sin(lon);

            const rotated = this.rotatePoint({ x, y, z }, this.rotationX, this.rotationY);

            if (rotated.z > -this.radius * 0.3) { // Only draw visible parts
                const scale = 300 / (300 + rotated.z);
                points.push({
                    x: rotated.x * scale + this.centerX,
                    y: rotated.y * scale + this.centerY
                });
            }
        }

        if (points.length > 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(points[0].x, points[0].y);
            points.forEach(p => this.ctx.lineTo(p.x, p.y));
            this.ctx.stroke();
        }
    }
}

// Initialize globe when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const globeCanvas = document.getElementById('globe-canvas');
    if (globeCanvas) {
        new Globe3D('globe-canvas');
    }
});

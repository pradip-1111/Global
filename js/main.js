/**
 * Main JavaScript file for Aryan Global Commerce
 * Handles common functionality like mobile menu and global interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Aryan Global Commerce JS loaded');
    
    // Initialize mobile menu
    initMobileMenu();
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('button[onclick="toggleMobileMenu()"]');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Remove inline onclick handler to keep JS separate
        mobileMenuBtn.removeAttribute('onclick');
        
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                // Optional: Add slide down animation class if you have one
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Global function for backward compatibility if onclick is kept in HTML
window.toggleMobileMenu = function() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
};

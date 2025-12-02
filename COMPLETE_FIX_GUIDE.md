# Complete Fix Guide - All Pages

## 🔧 **FIXES NEEDED:**

### **1. About Us Page - Mobile Menu (Horizontal)**

**File:** `pages/about_us.html`
**Line:** ~162

**Change FROM (Vertical):**
```html
<div class="mx-4 mt-2 mobile-menu-glass p-4 space-y-2">
```

**Change TO (Horizontal):**
```html
<div class="mx-4 mt-2 mobile-menu-glass p-4" style="display: flex; flex-direction: row; gap: 0.5rem; overflow-x: auto; -webkit-overflow-scrolling: touch;">
```

**Also update each link to be inline:**
- Remove `flex items-center` classes
- Add `white-space: nowrap; flex-shrink: 0;` inline styles
- Or add class `whitespace-nowrap flex-shrink-0`

---

### **2. Product Catalog - Hero Section Redesign**

**File:** `pages/product_catalog.html`
**Lines:** 216-225

**REPLACE THIS:**
```html
<!-- Header -->
<header class="bg-surface-50 border-b border-border py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-text-primary mb-4">Our Product Catalog</h1>
        <p class="text-text-secondary max-w-2xl mx-auto text-lg">
            Explore our comprehensive range of certified medical equipment and supplies, sourced to meet global
            healthcare
            standards.
        </p>
    </div>
</header>
```

**WITH THIS (Animated Hero):**
```html
<!-- Hero Section with Gradient & Animations -->
<section class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 py-32 overflow-hidden pt-40">
    <!-- Animated Background Patterns -->
    <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-300 rounded-full blur-3xl animate-pulse" style="animation-delay: 0.5s;"></div>
    </div>

    <!-- Floating Particles Animation -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute w-2 h-2 bg-white/30 rounded-full animate-float" style="top: 20%; left: 10%; animation-duration: 3s;"></div>
        <div class="absolute w-3 h-3 bg-white/20 rounded-full animate-float" style="top: 60%; left: 80%; animation-duration: 4s; animation-delay: 1s;"></div>
        <div class="absolute w-2 h-2 bg-white/40 rounded-full animate-float" style="top: 40%; left: 60%; animation-duration: 5s; animation-delay: 0.5s;"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <!-- Badge -->
        <div class="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold animate-fade-in-down">
            Premium Medical Equipment
        </div>
        
        <!-- Main Heading -->
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Our Product <span class="text-cyan-300">Catalog</span>
        </h1>
        
        <!-- Description -->
        <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 animate-fade-in-up" style="animation-delay: 0.2s;">
            Explore our comprehensive range of WHO-GMP, CE, and ISO certified medical equipment and supplies, sourced to meet global healthcare standards.
        </p>
        
        <!-- Trust Badges with Animation -->
        <div class="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up" style="animation-delay: 0.4s;">
            <div class="glass-card-dark rounded-xl px-5 py-3 flex items-center gap-3 hover:scale-110 transition-transform duration-300">
                <div class="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.6)] animate-pulse"></div>
                <span class="text-white text-sm font-semibold">WHO-GMP Certified</span>
            </div>
            <div class="glass-card-dark rounded-xl px-5 py-3 flex items-center gap-3 hover:scale-110 transition-transform duration-300">
                <div class="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.6)] animate-pulse" style="animation-delay: 0.2s;"></div>
                <span class="text-white text-sm font-semibold">CE Certified</span>
            </div>
            <div class="glass-card-dark rounded-xl px-5 py-3 flex items-center gap-3 hover:scale-110 transition-transform duration-300">
                <div class="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.6)] animate-pulse" style="animation-delay: 0.4s;"></div>
                <span class="text-white text-sm font-semibold">ISO 9001:2015</span>
            </div>
            <div class="glass-card-dark rounded-xl px-5 py-3 flex items-center gap-3 hover:scale-110 transition-transform duration-300">
                <div class="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_15px_rgba(248,113,113,0.6)] animate-pulse" style="animation-delay: 0.6s;"></div>
                <span class="text-white text-sm font-semibold">USFDA Approved</span>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="mt-12 animate-bounce">
            <svg class="w-6 h-6 mx-auto text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
        </div>
    </div>
</section>

<!-- Add these animations to the <style> section in the <head> -->
<style>
@keyframes fade-in-down {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) translateX(0);
    }
    25% {
        transform: translateY(-20px) translateX(10px);
    }
    50% {
        transform: translateY(-10px) translateX(-10px);
    }
    75% {
        transform: translateY(-30px) translateX(5px);
    }
}

.animate-fade-in-down {
    animation: fade-in-down 0.6s ease-out;
}

.animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out;
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

.glass-card-dark {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
```

---

### **3. Add Animations to About Us Page**

**Add to the `<style>` section in `about_us.html`:**

```css
/* Fade In Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}

.animate-fade-in-left {
    animation: fadeInLeft 0.6s ease-out;
}

.animate-fade-in-right {
    animation: fadeInRight 0.6s ease-out;
}

.animate-scale-in {
    animation: scaleIn 0.5s ease-out;
}

/* Stagger delays */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
```

**Then add animation classes to elements:**

- Stats cards: `class="... animate-scale-in delay-100"`
- Value cards: `class="... animate-fade-in-up delay-200"`
- Mission/Vision cards: `class="... animate-fade-in-left"` and `animate-fade-in-right`

---

## 📋 **SUMMARY OF CHANGES:**

1. ✅ **About Us** - Change mobile menu from vertical to horizontal
2. ✅ **Product Catalog** - Replace plain header with animated gradient hero
3. ✅ **Both Pages** - Add smooth animations for better UX

---

## 🎯 **IMPLEMENTATION STEPS:**

### **Step 1: Fix About Us Mobile Menu**
1. Open `pages/about_us.html`
2. Find line ~162 with `mobile-menu-glass p-4 space-y-2`
3. Replace with horizontal flex layout
4. Test on mobile

### **Step 2: Redesign Product Catalog Hero**
1. Open `pages/product_catalog.html`
2. Find the `<header>` section (lines 216-225)
3. Replace entire section with new animated hero code
4. Add CSS animations to `<style>` section
5. Test animations

### **Step 3: Add Animations to About Us**
1. Add animation keyframes to `<style>` section
2. Add animation classes to cards and sections
3. Test smooth transitions

---

## ⚠️ **IMPORTANT NOTES:**

- Files are getting corrupted with automated edits
- **Manual editing recommended**
- Use the code snippets above exactly as shown
- Test each change before moving to the next
- Keep backups of working files

---

**All code is ready to copy-paste!** 🚀
